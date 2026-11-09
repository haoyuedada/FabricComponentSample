# react-native-reanimated PR de1e694 — UpdatesRegistry 锁协议竞态修复

> 日期：2026-11-06
> 应用：网易云音乐 HarmonyOS（com.netease.cloudmusic.hm 9.6.29）
> 问题来源：线上偶现 CppCrash（SIGSEGV(SEGV_MAPERR)@0x006b7a3ad88934bb，jemalloc 释放填充样式地址）
> 详细分析报告：《CppCrash分析报告-网易云-collectProps-UAF.md》（同目录）

## 问题概述

RNOH_JS 线程在 React commit 的 `ReanimatedCommitHook::shadowTreeWillCommit → UpdatesRegistry::collectProps` 中析构本地副本 `copiedRegistry` 时，对已提前释放的 `shared_ptr<const ShadowNode>` 控制块虚调用 `__on_zero_shared()`，控制块 vptr 已被 jemalloc 释放填充（0x6b6b…）覆盖，触发 SIGSEGV。

根因为 reanimated 的 UpdatesRegistry 家族锁协议不一致，存在两类并发竞争：

1. **updatesRegistry_ 容器写-写竞态（本次崩溃主因）**：UI ticker 线程 `shadowTreeDidMount → handleNodeRemovals → registry->remove(tag)` 仅持 manager 锁直接 erase `updatesRegistry_`；JS 线程的 CSS Transition/Animation 注册/更新/注销 host function 仅持 registry 锁写同一 `unordered_map`。两组路径无公共锁 → hash 节点在仍被引用时被 free 或 shared_ptr 引用计数被多释放 → ShadowNode 控制块提前销毁（UAF）。
2. **updatesBatch_ 写-写竞态（同族窗口）**：UI worklet 线程 `updateProps` 回调无锁调用 `addUpdatesToBatch`，与 MAIN 线程 `flushUpdates`（持 registry 锁 `std::move`+`clear()`）竞争同一 `std::vector`。
3. **cssLoopCallback 读-写竞态（P2 遗留路径，一并修复）**：UI scheduler 线程 `cssLoopCallback` 无锁调用 `hasUpdates()` 读取 registry 成员（`runningTransitionTags_`、`delayedTransitionsManager_`、`runningAnimationIndicesMap_` 等），与 JS 线程持锁写入并发。经核实该回调与 JS 线程之间无任何隐藏串行化保证，属存量缺陷（非本 MR 引入）。

## 变更内容（3 处）

**修改 1** — `package/src/main/cpp/Common/cpp/reanimated/Fabric/updates/UpdatesRegistryManager.cpp:67`（根因修复）

`handleNodeRemovals` 在 manager 锁内调用 `registry->remove(tag)` 前补持对应 registry 的 mutex，与 JS 线程 registry-only 写路径、commit hook / performOperations 的 manager→registry 锁序保持一致，消除对 `updatesRegistry_` 及 CSS registry 成员的并发写。锁序全库统一为 manager → registry，无反向顺序，无死锁风险。

```diff
       for (auto &registry : registries_) {
+        // Must hold the registry mutex while removing: the JS thread mutates
+        // updatesRegistry_ (and CSS registry members) under registry->lock()
+        // only (e.g. updateCSSTransition), so the manager mutex alone does
+        // not exclude concurrent unordered_map writes from the JS thread.
+        auto lock = registry->lock();
         registry->remove(tag);
       }
```

**修改 2** — `package/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp:105`（同族窗口加固）

`updateProps` 回调运行在 UI worklet runtime 线程，写 `updatesBatch_` 前持 `animatedPropsRegistry_` 锁，消除与 MAIN 线程 `flushUpdates` 的 vector 数据竞争。`update()` 内部无嵌套加锁，无死锁风险。

```diff
     const auto timestamp = strongThis->getAnimationTimestamp_();
+    // addUpdatesToBatch (inside update) mutates updatesBatch_, which is also
+    // moved/cleared by flushUpdates on the MAIN thread under the registry
+    // mutex; this callback runs on the UI worklet runtime thread, so the
+    // registry mutex must be held here as well.
+    auto lock = strongThis->animatedPropsRegistry_->lock();
     strongThis->animatedPropsRegistry_->update(rt, operations, timestamp);
```

**修改 3** — `package/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp:607`（P2 读路径补齐）

`cssLoopCallback`（UI scheduler 线程）中两个 `hasUpdates()` 改为各自短临界区内持对应 registry 锁读取。`#ifdef ANDROID` 的 `hasPropsToRevert()` 分支在 Harmony 构建下为死代码（CMake 仅定义 `REANIMATED_HARMONY=1`），保持原样，其加锁属 Android 变体侧后续决策。

```diff
 void ReanimatedModuleProxy::cssLoopCallback(const double /*timestampMs*/) {
   shouldUpdateCssAnimations_ = true;
-  if (cssAnimationsRegistry_->hasUpdates() || cssTransitionsRegistry_->hasUpdates()
+  // hasUpdates() reads registry members that the JS thread mutates under the
+  // registry mutex (applyCSSAnimations/updateCSSTransition/...), and this
+  // callback runs on the UI scheduler thread, so the reads must hold the
+  // same mutex; short critical sections keep the loop tick cheap.
+  bool hasUpdates;
+  {
+    auto lock = cssAnimationsRegistry_->lock();
+    hasUpdates = cssAnimationsRegistry_->hasUpdates();
+  }
+  {
+    auto lock = cssTransitionsRegistry_->lock();
+    hasUpdates = hasUpdates || cssTransitionsRegistry_->hasUpdates();
+  }
+  if (hasUpdates
 #ifdef ANDROID
       || updatesRegistryManager_->hasPropsToRevert()
 #endif // ANDROID
```

## 完整 Patch（unified diff，可 `git apply`）

```diff
diff --git a/package/src/main/cpp/Common/cpp/reanimated/Fabric/updates/UpdatesRegistryManager.cpp b/package/src/main/cpp/Common/cpp/reanimated/Fabric/updates/UpdatesRegistryManager.cpp
index b98bdc5..9ec4a34 100644
--- a/package/src/main/cpp/Common/cpp/reanimated/Fabric/updates/UpdatesRegistryManager.cpp
+++ b/package/src/main/cpp/Common/cpp/reanimated/Fabric/updates/UpdatesRegistryManager.cpp
@@ -65,6 +65,11 @@ void UpdatesRegistryManager::handleNodeRemovals(const RootShadowNode &rootShadow
 
     if (shadowNode->getFamily().getAncestors(rootShadowNode).empty()) {
       for (auto &registry : registries_) {
+        // Must hold the registry mutex while removing: the JS thread mutates
+        // updatesRegistry_ (and CSS registry members) under registry->lock()
+        // only (e.g. updateCSSTransition), so the manager mutex alone does
+        // not exclude concurrent unordered_map writes from the JS thread.
+        auto lock = registry->lock();
         registry->remove(tag);
       }
       staticPropsRegistry_->remove(tag);
diff --git a/package/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp b/package/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp
index 96f887c..85b7d8b 100644
--- a/package/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp
+++ b/package/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp
@@ -102,6 +102,11 @@ void ReanimatedModuleProxy::init(const PlatformDepMethodsHolder &platformDepMeth
     }
 
     const auto timestamp = strongThis->getAnimationTimestamp_();
+    // addUpdatesToBatch (inside update) mutates updatesBatch_, which is also
+    // moved/cleared by flushUpdates on the MAIN thread under the registry
+    // mutex; this callback runs on the UI worklet runtime thread, so the
+    // registry mutex must be held here as well.
+    auto lock = strongThis->animatedPropsRegistry_->lock();
     strongThis->animatedPropsRegistry_->update(rt, operations, timestamp);
   };
 
@@ -601,7 +606,20 @@ bool ReanimatedModuleProxy::handleRawEvent(const RawEvent &rawEvent, double curr
 
 void ReanimatedModuleProxy::cssLoopCallback(const double /*timestampMs*/) {
   shouldUpdateCssAnimations_ = true;
-  if (cssAnimationsRegistry_->hasUpdates() || cssTransitionsRegistry_->hasUpdates()
+  // hasUpdates() reads registry members that the JS thread mutates under the
+  // registry mutex (applyCSSAnimations/updateCSSTransition/...), and this
+  // callback runs on the UI scheduler thread, so the reads must hold the
+  // same mutex; short critical sections keep the loop tick cheap.
+  bool hasUpdates;
+  {
+    auto lock = cssAnimationsRegistry_->lock();
+    hasUpdates = cssAnimationsRegistry_->hasUpdates();
+  }
+  {
+    auto lock = cssTransitionsRegistry_->lock();
+    hasUpdates = hasUpdates || cssTransitionsRegistry_->hasUpdates();
+  }
+  if (hasUpdates
 #ifdef ANDROID
       || updatesRegistryManager_->hasPropsToRevert()
 #endif // ANDROID
```

## 验证

- Patch 基于原始发布包 `oh-reanimated-release-20261102.tar.gz` 的 pristine 源码生成，对纯净源码 `git apply --check` 通过，实际应用后与修复工作树逐字节一致（CRLF 行尾保持）。
- 锁序核验：全库所有双锁路径均为 manager → registry（commit hook、performOperations、setViewStyle→observer），本次新增持锁不引入反向顺序；`update()`、`hasUpdates()` 内部无嵌套加锁，均无死锁风险。
- 建议回归：可控构建开 TSAN/ASan，压测"节点卸载（列表滚动、页面销毁）与 CSS Transition/Animation 注册/更新/注销高频并发"场景；合入后观察现网 `UpdatesRegistry::collectProps` 栈崩溃归零。

## 未覆盖 / 风险

- 未执行编译验证（需 DevEco/RNOH 完整工程环境）。
- `#ifdef ANDROID` 分支的 `hasPropsToRevert()` 无锁读未处理（Harmony 死代码，Android 变体侧决策）。
- `currentCssTimestamp_` / `shouldUpdateCssAnimations_` 等跨线程单字成员未纳入（单字读写，无容器撕裂风险）。
- 建议后续将 `UpdatesRegistry` 锁协议（"写必须持 registry mutex_ 或 manager+registry 双锁"）写入头文件注释，防止新增路径再破坏协议。
