# RNOH react-native-screens pop 白屏问题：根因分析与快照垫底修复方案

> **环境**：RNOH 0.77（`@react-native-ohos/react-native-screens` 4.8.3-rc.2，CAPI 架构，`enableCAPIArchitecture: true`），测试 Demo：`tests/NavigationPushPopDemo`（@react-navigation/native-stack）
> **状态**：POC 已真机验证（白屏 / 快照错位 / 替换闪变全部消除），补丁可直接套用
> **日期**：2026-10-10

---

## 一、问题现象

点击 "pop 返回上一页"（`navigation.pop()`）：

- **Android**（react-native-screens 4.14.1）：上一页从左向右滑入（不透明），当前页原地淡出——正常。
- **HarmonyOS**：当前页从左往右整页滑出，**内容被立即卸载，出现一帧白屏**。

## 二、根因分析

JS 层两端完全一致（react-navigation 在同一次 React commit 就把 route 从 state 移除），差异全在原生层：

### Android（Fragment 方案，三重保护）

1. **像素冻结**：Fabric 移除子节点走被重写的 `ScreenStackViewManager.removeViewAt` → `startRemovalTransition()` 递归对每个后代调 `ViewGroup.startViewTransition()`，把整页内容冻结为 hardware layer 快照——React 立即卸载也不影响屏幕像素。
2. **延迟销毁**：真正的移除是 `ScreenStack.onUpdate()` 里的 FragmentTransaction（`setCustomAnimations(exit_in, exit_out)` + `transaction.remove(fragment)`）；FragmentManager 平台行为保证**带出场动画的 fragment view 要等动画播完才 destroy**。
3. **动画设计**：默认 pop 动画（API 33+，`res/v33/anim-v33/rns_default_exit_in/out.xml`）是**下方页面**滑入盖上来（translate -10%→0，不透明），当前页原地淡出（alpha 1→0）——reveal 不依赖被卸载页的渲染。

### HarmonyOS（RNOH CAPI，三重缺失）

1. **pop 由同一次 Fabric commit 触发**：`RNSScreenStack.onDescriptorChange` → `updateStack` → `stackController.popToIndex()`（来自 REMOVE_CHILD descriptor mutation，与 React 卸载同一次 commit）。
2. **内容同步销毁、无任何延迟/冻结**：`MountingManagerCAPI::doMount`（MountingManagerCAPI.cpp:239-243、269-280）中 `Delete` → `deleteByTag` → `FallbackComponentInstance` 析构 → `dispose()` → `__deleteContentForTag`。RN 内容通过 `ContentSlot(ctx.getContentForTag(tag))`（RNSScreen.ets:662）渲染，该 NodeContent 的子节点在这次 commit 里全部销毁。
3. **动画设计**：`AnimationHandler.ets:78-79` 把 `'default'` 映射为 `slideFromRight`，pop 执行 `fromParam.hideAnimation`（顶部页 translate 0→100% 整页滑出，下方页静止）——**reveal 完全依赖"正在被销毁的那一页"持续渲染内容**。ArkUI 的 `customNavContentTransition` + `transitionProxy` 只保住 NavDestination **空壳**。

### 差异总结

| | Android | HarmonyOS (RNOH) |
|---|---|---|
| pop 动画主体 | 下方不透明页滑入覆盖；当前页原地淡出 | 当前页整页右滑出，下方页静止 |
| 被弹页面 native 内容 | 冻结像素 + fragment view 延迟到动画结束销毁 | 同一次 commit 内同步销毁 |
| 过渡期间页面存续 | 整棵 view 树存活至动画结束 | 只有 NavDestination 空壳，内容已卸载 |

### 补充：为什么手势返回不白屏

`RNSScreen.ets` 手势 `onActionStart` 时原生 `stackController?.pop()`（动画先行），React 树要到手势结束才移除——动画期间内容一直活着。这证明"动画先于卸载"的时序是可行的，是方案 B 的依据。

## 三、方案选型

| 方案 | 层级 | 说明 | 结论 |
|---|---|---|---|
| A. 挂载层延迟销毁 | RNOH 框架 | RNSScreenStack descriptor 照常更新（动画启动），被弹 RNSScreen 子树的 CAPI Delete 缓存到 `finishTransitioning` 后 flush。语义与 Android 完全对齐，JS 零改动 | **最正确的根治方案**，需改 `@rnoh/react-native-openharmony`，建议作为框架 PR |
| B. 原生 pop 先行 | 三方库 | 对齐手势路径：暴露原生 pop API，pop 动画先跑、等 `finishTransitioning` 再真正移除 route | 可行，需改 screens 包 + native-stack fork，有 500ms 窗口竞态 |
| **C. 快照垫底（本方案）** | 纯三方库 | 页面成为栈顶时截图，快照 Image 垫在内容下层；内容销毁帧垫底图自然露出 | **不改框架不改 JS，POC 已验证** |
| D. 背景色缓解 | 一行 | NavDestination 背景透传页面底色 | 仅缓解观感 |

## 四、快照垫底架构（最终版）

```
NavDestination
└─ RNViewBase
   └─ Stack (含 statusBar 填充/内容/原生 header)
      ├─ Stack (id = snapshotNodeId, 截图目标节点)
      │  ├─ Image(snapshotPixelMap)   ← 垫底快照（常驻渲染）
      │  └─ ContentSlot(RN 内容)      ← 存活时不透明、完全盖住垫底图
      └─ RNSScreenTitleHeader          ← 转场期间存活，保持 live 渲染
```

**核心机制**：页面存活时垫底图被不透明 RN 内容盖住（不可见）；pop commit 销毁内容的**同一渲染帧**，垫底图自然露出。**pop 瞬间 ArkTS 侧零状态切换**——不存在"内容销毁 → 覆盖层上屏"的时序窗口，闪烁在机制上不可能发生。

### 关键设计点（四个踩坑记录，缺一不可）

| # | 坑 | 现象 | 对策 |
|---|---|---|---|
| 1 | **隐藏实例误删缓存**：CAPI 下每个 RNSScreen tag 有两个实例（navDestinationBuilder 的可见实例 + React mutation 创建的隐藏实例），隐藏实例在 pop commit 被 dispose 时 `aboutToDisappear` 先于转场回调执行 | pop 时快照永远不显示 | `captureSnapshot`/`releaseSnapshot` 加 `pageId === 'default'` 守卫（只有 `onReady` 后的真实实例持有/释放快照） |
| 2 | **快照时机早于布局稳定**：`onShown` 时原生 header 高度尚未经 `headerHeightChange` 事件回流 JS 完成重排 | 快照内容整体偏高 ~183px（约一个 header 高度），与状态栏重叠 | onShown 立即拍一张兜底 + **400ms 延迟重拍**覆盖 |
| 3 | **位图盖住存活的 header**：原生 header/状态栏填充在转场期间本就存活，用位图替换会因模糊/抗锯齿还原差异闪变（像素 diff 实测 header 区 6.5% 差异 vs 内容区 1% 噪声级） | 替换瞬间顶部闪一下 | 截图节点与垫底图收窄到**内容 Stack 内部**，header 保持 live |
| 4 | **"覆盖式"上有时序窗口**：无论 HIDE_START 还是 onWillDisappear 触发，都在内容销毁之后 setState，存在漏帧/首渲延迟 | pop 起始闪一下 | 改为**垫底式**（Image 在 ContentSlot 下层、常驻渲染），销毁帧原子露出，无需任何触发 |
| - | **实例 id 冲突**：RNViewBase 内部 Stack 用 tag 做 `.id()`，双实例/多组件下 `componentSnapshot.get` 可能取错节点 | 截图失败或取错 | 自增计数器生成实例唯一 id：`rnss-snap-${nextSnapshotId++}` |

## 五、Patch 与应用步骤

补丁文件：`/Users/chenhaoyue/Documents/code/RNThridParty/screens/rnsscreen-snapshot-poc.patch`（仅改 `RNSScreen.ets` 一个文件，8 个 hunk，已剔除与本次无关的存量差异，源码仓与 oh_modules 双目标 dry-run 验证通过）。

### 5.1 应用到 oh_modules（POC 快速恢复，ohpm 重装后）

```bash
cd <ReactProject77>/harmony/oh_modules/.ohpm/@react-native-ohos+react-native-screens*/oh_modules/@react-native-ohos/react-native-screens
patch -p1 < /Users/chenhaoyue/Documents/code/RNThridParty/screens/rnsscreen-snapshot-poc.patch
```

> 注意：ohpm 目录名带版本 hash，包版本升级后路径会变；`ohpm install` 会覆盖手工改动。

### 5.2 应用到源码仓（正式化）

```bash
cd /Users/chenhaoyue/Documents/code/RNThridParty/screens/screens-77/tester/harmony/screens
patch -p1 < /Users/chenhaoyue/Documents/code/RNThridParty/screens/rnsscreen-snapshot-poc.patch
# 之后重新打包 screens.har 并替换 node_modules/@react-native-ohos/react-native-screens/harmony/screens.har
```

### 5.3 重新构建与安装（关键：library 是 HSP！）

改 oh_modules 里的 har 源码后，**`assembleHap` 不会触发重编**（entry 的 CompileArkTS 是 UP-TO-DATE），必须重建 library HSP：

```bash
export PATH=/Applications/DevEco-Studio.app/Contents/tools/node/bin:$PATH
export HDC=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc
H=<ReactProject77>/harmony

# 1. 重建 library HSP（RNSScreen.ets 在其中编译）
/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw --mode module -p module=library@default assembleHsp --no-daemon

# 2. （可选）entry hap 本身无变化可不重打
/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw assembleHap --mode module -p product=default --no-daemon

# 3. 安装（hap + hsp 必须一起装）
$HDC shell aa force-stop com.example.fabric77
$HDC shell "rm -rf /data/local/tmp/rnsinstall && mkdir -p /data/local/tmp/rnsinstall"
$HDC file send $H/entry/build/default/outputs/default/entry-default-signed.hap /data/local/tmp/rnsinstall/
$HDC file send $H/library/build/default/outputs/default/library-default-signed.hsp /data/local/tmp/rnsinstall/
$HDC shell "bm install -p /data/local/tmp/rnsinstall"
$HDC shell aa start -a EntryAbility -b com.example.fabric77
```

### 5.4 已知构建/调试坑

- **增量缓存不感知 oh_modules 改动**时：删除 `harmony/library/build/default/cache/default/default@CompileArkTS`（注意 `default/default` 两层）后重编，或 `touch` 被改的 .ets
- hvigor 偶发 `ERROR: 00304004 Not Found`，瞬时错误，重跑即可
- **强停/重装后 metro 反向转发会断**，应用会回退加载 rawfile 旧 bundle：`hdc rport tcp:8081 tcp:8081` 后重进 RN 页（提示 `TCP Port listen failed` 通常表示已存在）
- 重装后应用回到原生 Index 页，需重新点击 "通过RNApp打开RN应用" 进入
- 设备锁屏后：`hdc shell "power-shell wakeup"` + 上滑解锁
- PATH 里的 `diff` 可能是 DevEco toolchains 的（不支持 `-u`），用 `/usr/bin/diff`

## 六、验证方法

### 6.1 日志验证

```bash
$HDC shell hilog -x | grep "RNSScreen snapshot"
```

- push 时每个页面应有 1~2 条 `snapshot captured, tag: N`（立即 + 400ms 延迟）
- pop 时无 `snapshot capture failed` 报错

### 6.2 像素级验证（本次采用的量化手段）

`uitest uiInput click` 驱动 + `snapshot_display` 抓 pop 动画帧，利用 Demo 页独有的橙色按钮 `#f59e0b`（Home 页没有）做定位信号：

- **白屏**：动画帧按钮带内纯白像素占比（修复前大面积纯白，修复后 ≈0）
- **位置**：动画帧橙色 y 范围应与 live 完全一致（实测修复前上移 183px，修复后 `[1476,1662]` 与 live 相同）
- **闪变**：live 帧 vs 动画帧按滑移量对齐后逐像素 diff（header 区 6.5%→1.7% 噪声级；垫底架构后 pop 瞬间零状态切换）

## 七、已知限制

- 快照为"成为栈顶 400ms 后"的静态画面，期间页面滚动/内容变化不反映（对 500ms 退出动画通常无感）
- RN 页面若有透明区域，会透出垫底图（需页面内容不透明；transparentModal/DIALOG 已跳过）
- 每个栈内页面缓存一张全屏 PixelMap（约 13MB @1216×2688），`onDisAppear` 释放；深栈瞬时内存增加
- 手势返回路径不依赖此机制（内容天然存活）
- replace 流程（detachAnimation 分支）与 `popToTop` 的 toParam.showAnimation 分支未专门处理
- 垫底 Image 常驻渲染有一层全屏 overdraw（性能损耗未量化）

## 八、后续方向

本方案是三方库级 workaround。根因——**pop commit 同步销毁内容 vs ArkUI 转场需要内容存活**——仍建议推动框架级方案 A（`MountingManagerCAPI` 对 RNSScreen 子树延迟销毁，`finishTransitioning` 后 flush，含超时兜底），对齐 Android 的语义后本补丁可整体废弃。

---

## 附：完整 Patch

```diff
--- a/src/main/ets/components/RNSScreen.ets
+++ b/src/main/ets/components/RNSScreen.ets
@@ -33,7 +33,8 @@
 import { RNC } from '../generated/ts';
 import { CustomTransitionCoordinator } from '../animations/CustomTransition';
 import { RNSScreenStackHeaderConfigDescriptor } from './RNSScreenStackHeaderConfig';
-import { window } from '@kit.ArkUI';
+import { window, componentSnapshot } from '@kit.ArkUI';
+import { image } from '@kit.ImageKit';
 import { AnimationHandlerEvent, getNewAnimationState } from '../animations/AnimationHandler';
 import { RNSScreenTitleHeader, hasTransparency } from "./RNSScreenTitleHeader"
 import { TITLEBAR_HEIGHT } from '../Constants';
@@ -101,6 +102,9 @@
   private distance: number = 0;
   private static TOP_PAGEID: string = 'default'
   private static RECORD_TOP_PAGEID: string = 'default'
+  // POC(方案C): 缓存每个页面"成为栈顶时"的截图, pop 转场时用快照顶替已被同一次 commit 销毁的页面内容
+  private static snapshotCache: Map<string, image.PixelMap> = new Map()
+  private static nextSnapshotId: number = 0
   @State isStatusBarShow: boolean = false;
   private statusBarHeight: number = 0;
   private preventNativeDismiss: boolean = false;
@@ -120,6 +124,9 @@
   @State translateXValue: string = '0';
   @State translateYValue: string = '0';
   @State opacityValue: number = 1;
+  // POC(方案C): 实例级快照节点 id(避免与隐藏实例/其他 RNViewBase 的 tag id 冲突) + 垫底快照图
+  private snapshotNodeId: string = `rnss-snap-${RNSScreen.nextSnapshotId++}`
+  @State snapshotPixelMap: image.PixelMap | undefined = undefined
   @State screenOrientation: string = 'default';
   @State sheetAllowedDetents: number[] = [];
   @State sheetLargestUndimmedDetent: number = 0;
@@ -166,6 +173,47 @@
 
   getCurrentOffset(): Position {
     return this.currentOffset
+  }
+
+  private snapshotCacheKey(): string {
+    return `${this.ctx.rnInstance.getId()}-${this.tag}`
+  }
+
+  private captureSnapshot(): void {
+    // 仅由 Navigation 创建的真实页面实例(pageId 在 onReady 后非 default)持有快照;
+    // modal(DIALOG) 模式不走 slide 转场, 也不需要
+    if (this.pageId === 'default' || this.presentationMode === NavDestinationMode.DIALOG) {
+      return
+    }
+    try {
+      const pm = componentSnapshot.getSync(this.snapshotNodeId)
+      const key = this.snapshotCacheKey()
+      const old = RNSScreen.snapshotCache.get(key)
+      RNSScreen.snapshotCache.set(key, pm)
+      if (old !== undefined) {
+        old.release()
+      }
+      // 同步到垫底图(页面存活时被内容盖住, 更新不可见)
+      this.snapshotPixelMap = pm
+      this.logger.debug(`RNSScreen snapshot captured, tag: ${this.tag}`)
+    } catch (err) {
+      this.logger.warn(`RNSScreen snapshot capture failed, tag: ${this.tag}, err: ${JSON.stringify(err)}`)
+    }
+  }
+
+  private releaseSnapshot(): void {
+    // CAPI 架构下每个 RNSScreen tag 还有一个由 React mutation 创建的隐藏实例,
+    // 它在 pop commit 时被 dispose, aboutToDisappear 先于转场回调执行,
+    // 若不跳过会误删并 release 掉真实实例即将使用的快照
+    if (this.pageId === 'default') {
+      return
+    }
+    const key = this.snapshotCacheKey()
+    const pm = RNSScreen.snapshotCache.get(key)
+    if (pm !== undefined) {
+      RNSScreen.snapshotCache.delete(key)
+      pm.release()
+    }
   }
   async aboutToAppear() {
     this.logger = this.ctx!.logger.clone("RNSScreen")
@@ -206,6 +254,7 @@
 
   aboutToDisappear() {
     this.cleanUpCallbacks.forEach(cb => cb())
+    this.releaseSnapshot()
   }
 
   onScreenPropsChange(presentation: string) {
@@ -659,8 +708,21 @@
           }
 
           Stack() {
+            // POC(方案C): 快照垫底而非覆盖 —— 页面存活时被不透明 RN 内容盖住(不可见);
+            // pop commit 销毁内容的同一帧, 垫底图自然露出, 无需任何状态切换,
+            // 从机制上消除"内容销毁→覆盖层上屏"之间的时序窗口(漏帧/闪变)
+            if (this.snapshotPixelMap !== undefined) {
+              Image(this.snapshotPixelMap)
+                .width('100%')
+                .height('100%')
+                .objectFit(ImageFit.Fill)
+                .position({ x: 0, y: 0 })
+                .hitTestBehavior(HitTestMode.None)
+            }
+
             ContentSlot(this.ctx.getContentForTag(this.tag))
           }
+          .id(this.snapshotNodeId)
 
           if (this.stackPresentationMode !== '' && !this.shouldHideTitleBar) {
             this.screenTitleBuilder()
@@ -700,6 +762,12 @@
       await this.updateState(true);
       await this.updateHeaderConfigState();
       this.setScreenOrientation()
+      // 立即拍一张兜底; onShown 时原生 header 高度尚未经 headerHeightChange 回流 JS 完成重排,
+      // 此刻内容比最终布局整体偏高约一个 header 高度, 延迟重拍修正
+      this.captureSnapshot()
+      setTimeout(() => {
+        this.captureSnapshot()
+      }, 400)
     })
     .onWillDisappear(() => {
       this.eventEmitter!.emit("willDisappear", {})
@@ -708,6 +776,8 @@
       this.logger.debug('onDisAppear ' + this.pageId + ' , screenId: ' + this.descriptor.rawProps["screenId"])
       this.customTransitionCoordinator?.unregisterNavParam(this.pageId);
       this.eventEmitter!.emit("disappear", {})
+      this.snapshotPixelMap = undefined
+      this.releaseSnapshot()
     })
     .onBackPressed(() => {
       this.backPressed();
```
