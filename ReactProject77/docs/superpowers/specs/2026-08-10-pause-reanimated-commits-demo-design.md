# pauseReanimatedCommits() 注释前后差异对比 Demo — 设计文档

日期: 2026-08-10
项目: ReactProject77 (React Native 0.77 + OpenHarmony)

## 目标

用一个纯 JS 的 RN Demo,以**纯视觉卡顿对比**方式,观察 `ReanimatedCommitHook.cpp:94` 处 `propsRegistry_->pauseReanimatedCommits();` 注释与否的运行表现差异。

## 背景:pauseReanimatedCommits() 的作用

### 调用链
- `ReanimatedCommitHook::shadowTreeWillCommit` (ReanimatedCommitHook.cpp:94) 在 **RN 发起的 commit** 经过 Fabric commit hook 时调用,设置 `PropsRegistry::isPaused_ = true`。
- 暂停期间,Reanimated 自己的 UI 线程提交被抑制:
  - `ReanimatedModuleProxy::performOperations` (ReanimatedModuleProxy.cpp:757) 检测 `shouldReanimatedSkipCommit()` → 提前 return,并 `pleaseCommitAfterPause()` 记下待提交。
  - `shadowTree.commit` 回调 (ReanimatedModuleProxy.cpp:783) 检测到暂停 → 返回 `nullptr` 中止。
- `ReanimatedMountHook::shadowTreeDidMount` (ReanimatedMountHook.cpp:42) 在 RN commit 完成挂载后 `unpauseReanimatedCommits()`,并按 `shouldCommitAfterPause()` 重放积压的 Reanimated 提交。

### 语义
序列化 RN(JS 线程)commit 与 Reanimated(UI 线程,~60fps)commit,避免 Reanimated 高频提交挤兑/延迟 RN 渲染。源码注释原话:"if we didn't pause Reanimated commits, it could lead to RN commits being delayed until the animation is finished (very bad)."

### 注释掉之后
Reanimated 不再让路,持续每帧在 UI 线程提交,与 RN 的 JS 线程 commit 争抢同一 shadow tree → RN 驱动的状态更新上屏延迟/掉帧。

## 方案:秒表对比法(方案 A)

屏幕分两区,同时运行:
- **上区**:Reanimated 无限动画,制造高频 UI 线程提交负载。
- **下区**:RN `setState` 驱动的秒表计数(被观察对象)对照 Reanimated UI 线程驱动的基准计数。

动画运行时观察 RN 计数是否落后于基准计数。

## 架构与组件

单文件 Demo:`tests/react-native-reanimated/PauseCommitDemo.tsx`,在 `index.js` 末尾切换注册(沿用现有 demo 惯例,无需导航)。

### 上区 — Reanimated 高频动画区
- `Animated.View` 方块,`useAnimatedStyle` 同时返回 5 个 prop:`translateX` / `scale` / `rotate` / `opacity` / `backgroundColor`。
- 多个 `useSharedValue` 由 `withRepeat(withTiming(..., {duration: 400~800ms}))` 无限驱动。
- 每帧 PropsRegistry 有更新 → `performOperations` 每帧 commit,制造与 RN 争抢 shadow tree 的负载。
- 启停通过**条件渲染** `{running && <Animated.View .../>}`:卸载节点让 PropsRegistry 移除该节点,真正停止 Reanimated 提交(仅 `cancelAnimation` 会让残留值继续触发提交)。

### 下区 — RN 秒表对比区
- `actualCount`:RN state,`setInterval` 每 300ms `setCount(c => c+1)`,纯 RN commit 路径,用普通 `<Text>` 显示。
- `referenceCount`:UI 线程基准,`useFrameCallback` 按真实经过时间累加 `sharedValue`,经 `<Animated.Text>` 显示,~60fps 独立更新,不触发 RN 提交。
- 进度条:Reanimated 驱动,每 300ms 扫一格,辅助肉眼对齐两计数。

### 关键不变量
- `referenceCount` 必须完全在 UI 线程计算(`useFrameCallback` + sharedValue + `Animated.Text`),绝不触发 RN 提交,否则失去基准意义。
- `actualCount` 必须走 `setState` → RN commit 路径。
- 动画启停用条件渲染,不用 `cancelAnimation`。

## 数据流与时序

### 不注释 pauseReanimatedCommits()(基线)
1. RN commit 触发 `shadowTreeWillCommit`,遍历 PropsRegistry 应用动画 prop → `pauseReanimatedCommits()` 置 `isPaused_=true`。
2. Reanimated `performOperations` 检测 `shouldReanimatedSkipCommit()` → 跳过本轮 UI 提交,记 `pleaseCommitAfterPause`。
3. RN commit mount 完成 → `ReanimatedMountHook` `unpauseReanimatedCommits()` → 补提交积压。
4. **结果**:RN 提交及时上屏,`actualCount` 跟得上 `referenceCount`。

### 注释掉 pauseReanimatedCommits()(对照)
1. RN commit 触发 `shadowTreeWillCommit`,遍历 PropsRegistry 应用动画 prop,**不暂停**。
2. Reanimated 继续每帧 UI 线程 `shadowTree.commit`,返回带 `ReanimatedCommitTrait` 的树。
3. 两条提交路径争抢同一 shadow tree → RN 提交被挤兑/延迟。
4. **结果**:`actualCount` 停滞或掉秒,`referenceCount` 继续走 → 差距肉眼可见。

## 交互与验证流程

### 屏幕布局
```
┌─────────────────────────────┐
│  PauseCommit 对比 Demo      │
├─────────────────────────────┤
│  [Reanimated 动画方块]      │  上区:Animated.View,5 prop 高频提交
├─────────────────────────────┤
│  启动动画 / 停止动画  按钮   │
├─────────────────────────────┤
│  referenceCount:  42   🟢   │  UI 线程基准(Animated.Text)
│  actualCount:     38   🔴   │  RN setState 计数(普通 Text)
│  ─────────────────────      │
│  ▓▓▓▓▓▓▓▓▓░░░░░ 进度条      │  Reanimated 驱动,辅助对齐
├─────────────────────────────┤
│  观察说明                   │
└─────────────────────────────┘
```

### 操作步骤
1. 进入页面,动画默认**停止**,两计数同步走(300ms 一格),无差异。
2. 点"启动动画"→ 方块开始高频运动。
3. 观察 `actualCount` 是否停滞/掉秒、落后 `referenceCount`。
4. 点"停止动画"→ 方块消失,`actualCount` 恢复同步。

### 验证流程(改 native 两次 + DevEco 重建)
Demo 本身纯 JS,不改 C++。差异靠在 harmony native 层注释/恢复那行 + DevEco 重新构建。

1. **基线(不注释)**:保持 `ReanimatedCommitHook.cpp:94` 原样 → DevEco 构建 → 安装 → 跑 Demo → 动画运行时两计数基本同步。
2. **对照(注释)**:注释第 94 行 `propsRegistry_->pauseReanimatedCommits();`(可连同 93 行 LOG 一并注释)→ DevEco 重新构建 → 安装 → 跑 Demo → 动画运行时 `actualCount` 明显落后/停滞。
3. 两次对比即可看出差异。

native 源码路径:
`harmony/library/oh_modules/@react-native-ohos/react-native-reanimated/src/main/cpp/Common/cpp/reanimated/Fabric/ReanimatedCommitHook.cpp`

## 已知局限
- 差异是**概率性**的(取决于 RN 与 UI 线程实际争抢时机),非 100% 每次必现;动画负载越重越容易复现,因此用 5 个 prop 同时驱动。
- 真机性能差异影响表现;若不明显可把动画 `duration` 调短(如 200ms)加重负载。
- 本 Demo 不做自动化断言,仅作人工视觉对比。

## 不做(YAGNI)
- 不做延迟毫秒级测量(用户已选纯视觉对比)。
- 不做日志时序分析。
- 不做导航多页面(单屏即可)。
- 不改 native 代码本身(仅验证时人工注释/恢复)。
