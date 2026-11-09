# CppCrash 问题综合分析报告

> 网易云音乐（com.netease.cloudmusic.hm）线上偶现 CppCrash 分析
> 分析对象：cppcrash.log（已符号化）+ cppcrash-com.netease.cloudmusic.hm-20020285-20261105165424883.log（原始）
> 依赖材料：oh-reanimated-release-20261102（动画库源码）、react_native_openharmony-release-20261102（RNOH 框架源码）、arm64-v8a（应用 so 产物，BuildID 已核对匹配）

## 故障基本信息

- **故障时间**：2026-11-05 16:54:24.883
- **故障进程**：27908 / com.netease.cloudmusic.hm（UID 20020285，版本 9.6.29，后台，进程存活 3415s）
- **故障类型**：CPP_CRASH (NativeCrash)
- **信号类型**：signo=SIGSEGV, code=SEGV_MAPERR
- **崩溃地址**：0x006b7a3ad88934bb
- **崩溃函数**：librnoh_reanimated.so+0x14f890 — `reanimated::UpdatesRegistry::collectProps(std::__n1::unordered_map<facebook::react::ShadowNodeFamily const*, std::__n1::vector<facebook::react::RawProps, std::__n1::allocator<facebook::react::RawProps>>, std::__n1::hash<facebook::react::ShadowNodeFamily const*>, std::__n1::equal_to<facebook::react::ShadowNodeFamily const*>, std::__n1::allocator<std::__n1::pair<facebook::react::ShadowNodeFamily const* const, std::__n1::vector<facebook::react::RawProps, std::__n1::allocator<facebook::react::RawProps>>>>>>&)`
- **崩溃模块**：/data/storage/el1/bundle/libs/arm64/librnoh_reanimated.so（BuildID: ed807a6217525db7cd8f53a8ca124b10e06471ed）
- **故障原因描述**：`Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x006b7a3ad88934bb`
- **LastFatalMessage**：无

## 根因分析

- **诊断结果**：shared_ptr 控制块 Use-After-Free —— reanimated 的 UpdatesRegistry 锁协议不一致（UI 线程 mount hook 仅持 manager 锁、JS 线程仅持 registry 锁，两组路径并发读写同一个 `updatesRegistry_`），导致 ShadowNode shared_ptr 控制块被提前释放；随后 `collectProps` 析构本地副本 `copiedRegistry` 时对最后一个引用做虚调用 `__on_zero_shared()`，控制块 vptr 已被 jemalloc 释放填充（0x6b6b…）覆盖，读 `[vptr+0x10]` 触发 SIGSEGV。
- **故障类别**：UAF（数据竞争引发的对象生命周期破坏）
- **可信度**：HIGH（fault_addr 0x006b 释放填充样式、寄存器 x8、崩溃指令、反汇编、BuildID 匹配符号化、库源码锁分析、RNOH 线程模型七项独立证据交叉验证）

## 三级根因定位（依据 CPP_CRASH 故障模式库）

> 模板判定：本故障**未命中** `memory_corruption_second_scene.md` —— 故障地址虽以 `0x006b` 开头（jemalloc 释放填充样式），但该规则同时要求 `#00` 为 `/system/lib64/` 系统栈；本例 `#00` 为应用自带三方库 `librnoh_reanimated.so`，且已通过反汇编+源码定位到第一现场（锁协议缺陷），故使用模板 A。

> 根因编码规则：`1.1.1.<信号编号>.<si_code编号>`（SIGSEGV=11, SEGV_MAPERR=1）

| 层级 | 根因 | 匹配依据 |
|------|------|----------|
| 一级根因 | CPP_CRASH | `Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x006b7a3ad88934bb` |
| 二级根因 | SIGSEGV (1.1.1.11.0) | `Signal:SIGSEGV` |
| 三级根因 | SEGV_MAPERR (1.1.1.11.1) | 地址 0x006b7a3ad88934bb 未映射，ESR=0x9200004（读访问、level-0 翻译错误） |

## 证据链

### 1. 信号与子码语义分析

- 原始日志：
  `Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x006b7a3ad88934bb`
  `Fault thread info: Tid:28398, Name:RNOH_JS`
- 解读：
  - SEGV_MAPERR = 访问未映射地址。ESR=0x9200004 → WnR=0（**读访问**）、DFSC=0x4（level-0 翻译错误），与崩溃指令 `ldr x8,[x8,#0x10]`（读）吻合。
  - fault_addr 不是接近 0 的空指针，而是 **0x006b 前缀的毒化指针** —— 符合故障模式库记载的 OHOS jemalloc 已释放内存填充值样式（参照案例 `0x006b9cacf62f37a1`，形态完全一致：高位 0x6b6b、低位为残留数据）。这是 UAF/内存破坏证据，非普通野指针。

### 2. 寄存器与故障地址分析

- 原始日志：
  ```
  x0:0000005f3494ac00 x8:6b6b7a3ad88934ab x21:0000005f3494ac00
  lr:0000005bbe8cf868 sp:0000005f30cb2040 pc:0000005bbe8cf890
  ```
- 解读：
  - **x0/this 指针**：x0 = x21 = 0x5f3494ac00，为合法 jemalloc 堆地址（`[anon:native_heap:jemalloc]`，原子减计数 `[x21+8]` 访问成功）——即 shared_ptr **控制块本体仍可寻址，但其首槽 vptr 已是毒化值**，典型的"控制块已被 free、内存被 0x6b 填充后又被部分复用"状态。dump 时该区域已全 0（崩溃后至快照间被其他线程复用清零），佐证该内存已进入分配器空闲池。
  - **fault_addr 与 x8 对比**：fault_addr = x8 + 0x10（0x…34ab+0x10=0x…34bb），x8 高位 0x6b6b 经 TBI 剥离后内核报告 0x006b…，二者完全对应。崩溃点两指令为 `ldr x8,[x21]`（取 vptr）→ `ldr x8,[x8,#0x10]`（取 vtable 第 3 项）→ `blr x8`，即 libc++ `__release_shared()` 中 `__on_zero_shared()` 的虚调用序列。
  - **字符串解码**：崩溃线程栈/堆附近 `0x7974696361706f0e`→"opacity"、`0x0058656c6163730c`→"scaleX"、`0x6f66736e61727412`→"transform…"、`0x616c736e61727414`→"translate…"，另有多组动画 double 值（含 1.0）——正是 `collectProps` 正在收集的动画 RawProps 数据，与崩溃上下文吻合。
  - **填充模式识别**：除 x8 外，堆内 0x5f34ab3140/31b0/3220/3300/33e0 等多个槽位均含 `0x6b6b7a3ad8b6xxxx` 同前缀毒化值 —— 多处 0x6b 前缀 + 毒化 vptr + 残留动画属性数据，多项独立证据交叉指向 **shared_ptr 控制块被提前释放（UAF）**，可信度 HIGH。

### 3. 调用栈关键帧

- 原始日志（已用 BuildID 匹配的 arm64-v8a/librnoh_reanimated.so 反解到函数级）：
  ```
  #00 pc 000000000014f890 librnoh_reanimated.so (reanimated::UpdatesRegistry::collectProps(...))     ← 崩溃帧
  #01 pc 000000000015262c librnoh_reanimated.so (reanimated::UpdatesRegistryManager::collectProps()+64)
  #02 pc 0000000000153814 librnoh_reanimated.so (reanimated::ReanimatedCommitHook::shadowTreeWillCommit(...))
  #03-#09 libreactnative.so (UIManager::shadowTreeWillCommit / ShadowTree::tryCommit/commit
        / UIManager::completeSurface / UIManagerBinding::get 的 JS host function)
  #10-#18 libhermesvm.so (Hermes 解释器执行 JS)
  #19-#24 libreactnative.so / librnoh_core.so (Task::execute / RuntimeScheduler_Modern::runEventLoop
        / rnoh::EventLoopTaskRunner::executeTask)
  #25-#27 libuv.so (uv__async_io / uv__io_poll / uv_run)，#29 ld-musl start
  ```
- 解读：
  - **崩溃帧**：#00 librnoh_reanimated.so（应用侧三方库，/data 路径）
  - **首个非运行时调用方**：#02 `ReanimatedCommitHook::shadowTreeWillCommit`（reanimated commit hook）
  - **首个应用侧帧**：#00 即应用侧（三方 RN 动画库产物）
  - **调用链语义**：RNOH_JS 线程事件循环 → RuntimeScheduler → Hermes 执行 JS，JS 调用 `completeSurface` host function → ShadowTree::commit → commit hook 链 → reanimated 收集动画 props → 崩溃于局部副本 `copiedRegistry` 的析构循环（反汇编确认：遍历 hash 节点链 → 析构 folly::dynamic → `ldaxr/stlxr` 原子减 shared_ptr 引用计数 → 计数归零时经控制块 vptr 虚调用 `__on_zero_shared()`，此时 vptr=0x6b6b7a3ad88934ab 已毒化）。

### 4. 源码行号与 BuildID

- BuildID 已核对：`librnoh_reanimated.so`（ed807a6217525db7cd8f53a8ca124b10e06471ed）与 `arm64-v8a/librnoh_reanimated.so` 匹配（match_so.py 退出码 0），addr2line/objdump 均基于该产物执行。
- 行号定位：该 so 已剥离 DWARF，**无源文件行号**；但函数级符号 + 反汇编 + 库源码（oh-reanimated-release-20261102）对照已完成定位：
  - 崩溃点：`UpdatesRegistry::collectProps`，UpdatesRegistry.cpp:41-58（`auto copiedRegistry = updatesRegistry_` 的副本析构）
  - 第一现场缺陷代码：`UpdatesRegistryManager::handleNodeRemovals`（UpdatesRegistryManager.cpp:58-77）、`ReanimatedMountHook::shadowTreeDidMount`（ReanimatedMountHook.cpp:43-53）
- 关键帧 BuildID：libreactnative.so: b7c83179971ddef868b0268144f5f29ab5ee7f1d；librnoh_core.so: fa41fd0d708b85611c74fb4d1442c53e38af1d53；libhermesvm.so: eec37dc0c94c383b205778ffacd22d61ed2da158。

### 5. 并发证据（线程模型）

- 进程含 19 个 `RNOH_JS` 线程（多 RN 实例 + worklet runtime）、`RNOH_CLEANUP` 等。
- RNOH 框架源码确认：mounting 由 **UI ticker 线程**驱动（`RNInstanceInternal::onUITick → Scheduler::animationTick → shadowTreeDidMount`），而 commit hook 在 **JS 线程**执行 —— reanimated 库内注释亦自证此并发（ReanimatedModuleProxy.cpp:1188 "performOperations is called on the UI thread while React Native tries to commit a new tree on the JS thread"）。

## 根本原因

- **直接原因**：`UpdatesRegistry::collectProps` 尾部析构本地副本 `copiedRegistry` 时，释放某 `shared_ptr<const ShadowNode>` 的"最后一个引用"，对已被提前释放的共享指针控制块（0x5f3494ac00）虚调用 `__on_zero_shared()`；控制块 vptr 已被 jemalloc 释放填充覆盖为 0x6b6b7a3ad88934ab，`ldr x8,[x8,#0x10]` 读 0x006b7a3ad88934bb 触发 SIGSEGV。
- **深层原因**（锁协议不一致，同一缺陷的多个竞争窗口）：
  1. **主竞争窗口**：UI ticker 线程 `shadowTreeDidMount → handleNodeRemovals → registry->remove(tag)` → `removeFromUpdatesRegistry`（erase `updatesRegistry_`）**仅持 UpdatesRegistryManager 锁，不持 registry 锁**（UpdatesRegistryManager.cpp:67-69）；而 JS 线程的 `registerCSSTransition/updateCSSTransition/unregisterCSSTransition/registerCSSAnimations/unregisterCSSAnimations`（ReanimatedModuleProxy.cpp:449-489）**仅持 registry 锁**写同一个 `updatesRegistry_`（`setInUpdatesRegistry`/`removeFromUpdatesRegistry`/`updatePropsToRevert`）。两组路径无公共锁 → 同一 `std::unordered_map` 并发 erase/insert/find → hash 节点在仍被引用时被 free、或 shared_ptr 引用计数被多释放一次 → ShadowNode 控制块提前销毁（UAF）。
  2. **同族窗口**：`AnimatedPropsRegistry::update`（UI worklet 线程经 `updateProps` 回调调用，ReanimatedModuleProxy.cpp:99-107）**无任何锁**调用 `addUpdatesToBatch` 写 `updatesBatch_`，与 MAIN 线程 `flushUpdates`（持 registry 锁 `std::move(updatesBatch_)`+`clear()`）竞争同一 `std::vector`，可产生同样喂入损坏 shared_ptr 的效果。
- **触发路径**：界面节点卸载（`markNodeAsRemovable` → UI 线程 mount hook 移除 registry 条目）与 JS 侧 CSS Transition/Animation 注册/更新/注销精确并发 → 容器/引用计数损坏（此时不崩）→ 稍后任意一次 React commit → `shadowTreeWillCommit → collectProps` 复制并析构已损坏的 map → 崩溃。损坏点与崩溃点分离，且需要窄时序窗口，与"线上偶现"特征一致。

## 根因模块

- **责任领域**：应用侧（三方动画库 **oh-reanimated / react-native-reanimated(Harmony)** 的锁协议缺陷；非应用业务代码、非 RNOH 框架、非系统）
- **责任模块**：
  - 崩溃访问现场：/data/storage/el1/bundle/libs/arm64/librnoh_reanimated.so!reanimated::UpdatesRegistry::collectProps+0x878（pc 0x14f890）
  - 第一现场（缺陷代码）：`reanimated::UpdatesRegistryManager::handleNodeRemovals`（UpdatesRegistryManager.cpp:58-77，UI 线程侧缺 registry 锁）与 ReanimatedModuleProxy.cpp:449-489（JS 线程侧仅持 registry 锁）的锁协议冲突
- **定界依据**：
  1. 基于故障根本原因定界：反汇编+寄存器证明崩溃为 shared_ptr 控制 UAF；源码分析证明损坏源头是 reanimated 库内部两组持锁不互斥的写入路径（第一现场已在库源码中定位），非系统栈、非 RNOH 框架缺陷（RNOH 的多线程 mounting 属正常新架构行为）。
  2. so 路径归属：#00 为 /data 应用自带三方库。
  3. 非死锁。

## 修复建议（源码可达，给出源码级修复）

**修改 1** — `package/src/main/cpp/Common/cpp/reanimated/Fabric/updates/UpdatesRegistryManager.cpp:67`（`handleNodeRemovals` 内，根因修复：UI 线程移除节点时补持 registry 锁，与 JS 线程 registry-only 路径、commit hook/performOperations 的 manager→registry 锁序保持一致，无死锁风险）

```diff
       for (auto &registry : registries_) {
+        auto lock = registry->lock();
         registry->remove(tag);
       }
```

**修改 2** — `package/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp:105`（`updateProps` 回调，加固同族窗口：worklet 线程写 `updatesBatch_` 前持 registry 锁，消除与 MAIN 线程 `flushUpdates` 的 vector 数据竞争）

```diff
     const auto timestamp = strongThis->getAnimationTimestamp_();
+    auto lock = strongThis->animatedPropsRegistry_->lock();
     strongThis->animatedPropsRegistry_->update(rt, operations, timestamp);
```

3. 锁协议文档化：`UpdatesRegistry` 的全部读写辅助函数（`setInUpdatesRegistry/removeFromUpdatesRegistry/getUpdatesFromRegistry/updatePropsToRevert/flushUpdatesToRegistry`）均不自锁，依赖调用方持锁——建议在头文件注明"必须持有 registry mutex_ 或 manager+registry 双锁"，并对 `hasUpdates()` 等无锁读函数统一补锁，防止后续新增路径再破坏协议。
4. 回归验证：可控构建开 TSAN/ASan，压测"节点卸载（列表滚动、页面销毁）与 CSS Transition/Animation 注册/更新/注销高频并发"场景复现校验；合入修复后观察现网该栈崩溃归零。
5. 库侧修复后随 oh-reanimated 发版，由应用（网易云）升级集成版本。

## 是否需要进一步分析

- [x] 符号文件 BuildID 核对（librnoh_reanimated.so 已匹配并完成反汇编与函数级定位）
- [x] 反汇编分析（pc 附近指令，已确认虚调用序列）
- [ ] HWASan / ASan / TSan 地址越界检测（建议在可控构建中开启用于复现验证）
- [ ] 多次复现对比以排除随机性（建议收集同栈崩溃样本确认同一根因）

---

**未覆盖/风险**：so 已剥离 DWARF，行号基于函数级符号+库源码对照（非 addr2line 行级反解）；损坏经由容器竞争进入的确切交错（updatesRegistry_ 直写 vs updatesBatch_ 竞争）无法从单次 post-mortem 区分，两处修复均已覆盖。
