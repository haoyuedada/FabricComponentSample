# react-native-modal 弹窗闪烁问题分析报告

## 1. 问题描述

### 1.1 现象

使用三方库 `react-native-modal`（v13.0.1）时，弹出框偶尔出现闪烁现象：

- **0.72.141 版本（当前）**：点击按钮后，弹窗会突然出现一帧，然后消失，再正常播放动画弹出 → **打开时闪烁**
- **0.72.90 版本**：弹窗关闭时偶尔出现闪烁 → **关闭时闪烁**
- **框架自带 Modal**：无论打开还是关闭，均无闪烁现象

### 1.2 复现条件

- 使用 `react-native-modal` 三方库（非框架自带 `<Modal>`）
- 设置 `animationIn="slideInUp"` / `animationOut="slideOutDown"` 动画
- 点击触发弹窗打开/关闭操作

### 1.3 测试用例

```tsx
import Modal from 'react-native-modal';

<Modal
    isVisible={isCityModal}
    animationIn="slideInUp"
    animationOut="slideOutDown"
    style={{ justifyContent: 'flex-end', margin: 0 }}
>
    <View style={styles.modalContent}>
        {/* 弹窗内容 */}
    </View>
</Modal>
```

---

## 2. 架构分析

### 2.1 涉及代码层级

| 层级 | 路径 | 说明 |
|------|------|------|
| 三方库 | `tester/node_modules/react-native-modal/` | JS 层弹窗动画控制 |
| RN 前端 | `react-native/Libraries/Modal/Modal.js` | RN Modal 组件，桥接原生 |
| 框架前端 | `react-native-harmony` | 重导出 RN Modal |
| 框架原生（C++） | `tester/harmony/react_native_openharmony/src/main/cpp/` | ModalHostView 原生实现 |
| 框架原生（ArkTS） | `tester/harmony/react_native_openharmony/src/main/ets/` | ArkTS 层 Modal 组件 |

### 2.2 react-native-modal 的渲染架构

```
react-native-modal（JS 层，react-native-animatable 驱动动画）
  │
  │  设置 animationType="none" 禁用原生动画
  │  使用 transparent={true} 透明背景
  │  通过 state.isVisible 控制 RN Modal 的 visible
  │
  └─ RN <Modal animationType="none" transparent={true} visible={state.isVisible}>
       │
       └─ 原生 <RCTModalHostView>（HarmonyOS ArkUI Dialog）
            │
            ├─ Backdrop（animatable.View，opacity 动画 0 → 0.7）
            └─ Content（animatable.View，translateY 动画 screenHeight → 0）
```

**关键点**：`react-native-modal` 将 RN 原生 Modal 的 `animationType` 设为 `'none'`，完全禁用原生动画，改用 `react-native-animatable` 在 JS 层驱动 `slideInUp` / `slideOutDown` 动画。

### 2.3 框架原生 Modal 的渲染架构

```
RN <Modal animationType="slide">
  │
  └─ 原生 <RCTModalHostView animationType="slide">
       │
       └─ ArkUI Dialog（原生 transition 动画，Dialog 出现与动画同步）
```

框架自带 Modal 使用原生 `animationType`（`slide`/`fade`），动画由 ArkUI 原生 transition 驱动，Dialog 出现与动画是原子操作，因此不会闪烁。

---

## 3. 闪烁根因分析

### 3.1 react-native-animatable 动画机制的关键特性

理解闪烁的根因，首先需要理解 `react-native-animatable` 的工作机制：

```
react-native-animatable 的 slideInUp 动画定义（utils.js）：

    slideInUp: {
        from: { translateY: screenHeight },   ← 动画起点：屏幕下方
        to:   { translateY: 0 }               ← 动画终点：正常位置
    }

关键特性：
    ┌──────────────────────────────────────────────────────────────────┐
    │  动画的 from 状态（translateY: screenHeight）                    │
    │  不会在 View 挂载时自动应用到 style 上！                          │
    │                                                                  │
    │  只有当调用 .animate('slideInUp') 时，                            │
    │  animatable 才会将 from 值设置到 View 的 style 上。               │
    │                                                                  │
    │  在 .animate() 被调用之前，View 的 translateY                    │
    │  就是其 style 中定义的初始值：translateY: 0（正常位置）。           │
    └──────────────────────────────────────────────────────────────────┘
```

这意味着在 `render()` 到 `.animate()` 被调用之间存在一个**时间窗口**，在这个窗口内，内容的 `translateY` 是 `0`（正常位置），而不是 `screenHeight`（屏幕外）。

### 3.2 打开弹窗闪烁的完整时序（实际现象）

**实际观察到的现象**：弹窗第一帧出现时**内容完整可见**（不是空白），然后消失，再正常播放动画弹出。

```
用户点击按钮 → setIsModalVisible(true)
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 1] getDerivedStateFromProps (modal.js:446-449)                    │
│                                                                         │
│   state.isVisible = true                                                │
│   state.showContent = true                                              │
│                                                                         │
│   → 触发 React 重新渲染                                                  │
└─────────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 2] render() 执行 (modal.js:491-537)                               │
│                                                                         │
│   containerView 的 style:                                               │
│   ┌──────────────────────────────────────────────────────────────┐      │
│   │ computedStyle = [                                            │      │
│   │   { margin: deviceWidth * 0.05,                              │      │
│   │     transform: [{ translateY: 0 }] },  ← translateY = 0 ！   │      │
│   │   styles.content,                                            │      │
│   │   style   ← 用户传入的 style                                  │      │
│   │ ]                                                            │      │
│   └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│   backdrop 的 style:                                                    │
│   ┌──────────────────────────────────────────────────────────────┐      │
│   │ styles.backdrop = {                                          │      │
│   │   position: 'absolute',                                      │      │
│   │   opacity: 0,              ← 背景透明                         │      │
│   │   backgroundColor: 'black'                                   │      │
│   │ }                                                            │      │
│   └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│   此时 animatable.View 刚挂载，.animate() 还没被调用                      │
│   → translateY 就是 style 中写的 0 → 内容在正常位置！                     │
│                                                                         │
│   → React 输出: <RN Modal visible={true} animationType="none">          │
└─────────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 3] 原生侧处理                                                      │
│                                                                         │
│   ModalHostViewComponentInstance 创建                                    │
│   → onFinalizeUpdates() → showDialog()                                  │
│   → NativeDialogApi::show() → HarmonyOS Dialog 瞬间出现                  │
│                                                                         │
│   ┌──────────────────────────────────────────────────────────────┐      │
│   │  此时 Dialog 内的内容状态：                                    │      │
│   │                                                              │      │
│   │  ┌─ Backdrop ─────────────────────────────────────────┐      │      │
│   │  │  opacity: 0（透明）                                 │      │      │
│   │  │  backgroundColor: 'black'                          │      │      │
│   │  │  → 用户看不到背景遮罩                               │      │      │
│   │  └────────────────────────────────────────────────────┘      │      │
│   │                                                              │      │
│   │  ┌─ Content ──────────────────────────────────────────┐      │      │
│   │  │  translateY: 0（正常位置！不是 screenHeight）        │      │      │
│   │  │  → 弹窗内容完整显示在正常位置！                      │      │      │
│   │  │  → 用户能看到完整的弹窗内容                          │      │      │
│   │  └────────────────────────────────────────────────────┘      │      │
│   │                                                              │      │
│   │  ★ 视觉效果：没有遮罩背景的完整弹窗内容突然出现 ★             │      │
│   └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│   ★ 这就是闪烁的那一帧！用户看到弹窗内容突然出现！★                       │
└─────────────────────────────────────────────────────────────────────────┘
    │
    ▼  ← 至少 1 帧的时间差（React commit → componentDidUpdate）
    │
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 4] componentDidUpdate (modal.js:468-489)                          │
│                                                                         │
│   检测到 isVisible: true && prevProps.isVisible: false                   │
│   → 调用 this.open()                                                    │
│                                                                         │
│   open() 内部：                                                          │
│   ┌──────────────────────────────────────────────────────────────┐      │
│   │ 1. backdropRef.transitionTo({opacity: 0.7}, 300ms)          │      │
│   │    → 背景开始从 0 渐变到 0.7                                 │      │
│   │                                                              │      │
│   │ 2. contentRef.animate('slideInUp', 300ms)                    │      │
│   │    → 此时 animatable 才把 translateY 设为 screenHeight！      │      │
│   │    → 内容瞬间跳到屏幕外！→ 弹窗"消失"                         │      │
│   │    → 然后从 screenHeight 动画到 0 → 弹窗"慢慢弹出"            │      │
│   └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│   ★ 视觉效果：弹窗内容突然消失，然后从底部滑入 ★                          │
└─────────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 5] 300ms 后动画完成 → onModalShow() 回调                           │
└─────────────────────────────────────────────────────────────────────────┘
```

**用户实际看到的视觉效果**：

```
时间轴：
─────────────────────────────────────────────────────────────────────►

第 1 帧          第 2 帧              第 3 帧 ~ 第 N 帧
┌─────────┐     ┌─────────┐         ┌─────────────────────┐
│         │     │         │         │                     │
│ 弹窗内容 │     │         │         │  弹窗从底部滑入      │
│ 完整显示 │ ──► │  空白   │  ──►    │  + 背景渐显          │
│（无遮罩）│     │（消失） │         │  （正常动画 300ms）   │
│         │     │         │         │                     │
└─────────┘     └─────────┘         └─────────────────────┘
  ★闪烁★       ★闪烁★              ★正常★
```

### 3.3 关闭弹窗闪烁的完整时序

```
用户关闭弹窗 → setIsModalVisible(false)
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 1] componentDidUpdate (modal.js:468-489)                          │
│                                                                         │
│   检测到 isVisible: false && prevProps.isVisible: true                   │
│   → 调用 this.close()                                                   │
│                                                                         │
│   close() 内部：                                                         │
│   ┌──────────────────────────────────────────────────────────────┐      │
│   │ 1. backdropRef.transitionTo({opacity: 0}, 300ms)            │      │
│   │    → 背景开始从 0.7 渐变到 0                                 │      │
│   │                                                              │      │
│   │ 2. contentRef.animate('slideOutDown', 300ms)                 │      │
│   │    → 内容从 translateY:0 动画到 translateY:screenHeight       │      │
│   │    → 弹窗向下滑出屏幕                                          │      │
│   └──────────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 2] 300ms 后动画完成                                                │
│                                                                         │
│   → .then() 回调执行                                                     │
│   → setState({ showContent: false, isAnimating: false })                │
│                                                                         │
│   此时：                                                                 │
│   ┌──────────────────────────────────────────────────────────────┐      │
│   │ showContent = false                                          │      │
│   │ → backdrop 的 backgroundColor 变为 'transparent'             │      │
│   │ → 但 Modal 仍然 visible=true → Dialog 仍然显示！              │      │
│   │                                                              │      │
│   │ isAnimating = false                                          │      │
│   │ → wrapper View 的 opacity 变为 0                             │      │
│   │ → 内容不可见                                                  │      │
│   └──────────────────────────────────────────────────────────────┘      │
│                                                                         │
│   ★ 此时 Dialog 仍然显示，但内容已经不可见 ★                              │
└─────────────────────────────────────────────────────────────────────────┘
    │
    ▼  ← setState 回调触发下一次渲染
    │
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 3] 第二次 setState (modal.js:387-391)                              │
│                                                                         │
│   setState({ isVisible: false })                                        │
│   → RN Modal visible=false                                              │
│   → 原生组件卸载 → Dialog 销毁                                           │
│                                                                         │
│   ★ 从 Step 2 到 Step 3 之间可能有 1 帧的时间差 ★                        │
│   ★ 在这 1 帧内，Dialog 显示但内容状态不一致 → 可能闪烁 ★                 │
└─────────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ [Step 4] onModalHide() 回调                                              │
└─────────────────────────────────────────────────────────────────────────┘
```

**关闭时闪烁的原因**：

```
关闭动画完成后，存在两阶段 setState：

    setState({showContent: false, isAnimating: false})
        │
        ▼ 触发重新渲染（React 批处理可能延迟）
    render() → Dialog 仍 visible=true，但内容 opacity=0
        │
        ▼ setState 回调
    setState({isVisible: false})
        │
        ▼ 触发重新渲染
    render() → visible=false → 原生组件卸载 → Dialog 销毁

    ★ 两次 setState 之间可能有 1 帧的时间差 ★
    ★ 在这 1 帧内，Dialog 的状态不一致导致闪烁 ★
```

### 3.4 为什么框架自带 Modal 不闪烁

| 对比项 | react-native-modal | 框架自带 Modal |
|--------|-------------------|---------------|
| animationType | `'none'`（禁用原生动画） | `'slide'` / `'fade'`（使用原生动画） |
| 动画驱动 | JS 层 react-native-animatable | ArkUI 原生 transition |
| Dialog 出现与动画 | **分离**：Dialog 先出现，1帧后动画才开始 | **原子**：Dialog 出现即带动画 |
| 动画初始状态 | `translateY: 0`（正常位置），`.animate()` 后才设为 `screenHeight` | 原生 transition 自动处理初始位置 |
| 闪烁风险 | **高**（存在时序竞争） | **无**（同步执行） |

### 3.5 闪烁根因总结

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         闪烁的两个根因                                   │
│                                                                         │
│  根因 1（打开时闪烁）：                                                   │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ react-native-animatable 的动画初始状态（from）不会在组件       │       │
│  │ 挂载时自动应用。只有在调用 .animate() 之后，动画的 from 值      │       │
│  │ 才会被设置到 View 的 style 上。                                │       │
│  │                                                              │       │
│  │ 这导致在 Dialog 出现到 .animate() 被调用之间的 1 帧里，         │       │
│  │ 内容以 translateY: 0（正常位置）渲染，而不是                   │       │
│  │ translateY: screenHeight（屏幕外）。                          │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  根因 2（关闭时闪烁）：                                                   │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ react-native-modal 使用两阶段 setState 来关闭弹窗：            │       │
│  │   1. setState({showContent: false}) → 背景变透明              │       │
│  │   2. setState({isVisible: false}) → Modal 卸载                │       │
│  │                                                              │       │
│  │ 两次 setState 之间可能有 1 帧的时间差，                         │       │
│  │ 在这 1 帧内 Dialog 的状态不一致导致闪烁。                       │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  共同前提：                                                              │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ HarmonyOS 的 ArkUI Dialog 通过 NativeDialogApi::show()        │       │
│  │ 是立即同步显示的，不像 iOS/Android 的原生 Modal 有内部延迟。    │       │
│  │                                                              │       │
│  │ 这暴露了 JS 动画与原生 Dialog 显示之间的时序竞争。              │       │
│  └──────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 版本差异分析：闪烁时机为何从"关闭"变为"打开"

### 4.1 关键版本节点

| 版本 | Tag/Commit | 闪烁时机 |
|------|-----------|---------|
| 0.72.90 / 0.72.101-5 | `20acbd19` | **关闭时**偶尔闪烁 |
| 0.72.103 | `cda568a66` ← 关键提交 | 闪烁从关闭转移到打开 |
| 0.72.141（当前） | HEAD | **打开时**偶尔闪烁 |

### 4.2 `cda568a66` 之前是否就有时序问题？

**答案：是的，时序问题一直存在，但被掩盖了。**

#### 时序问题的本质

`react-native-modal` 的设计存在一个固有的时序竞争：

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    react-native-modal 的固有时序问题                      │
│                                                                         │
│  1. render() 输出 <Modal visible={true}>                                 │
│     → 内容 translateY: 0（正常位置，因为 .animate() 还没调用）            │
│                                                                         │
│  2. 原生 Dialog 出现（animationType='none'，无动画）                      │
│     → 内容立即显示在正常位置                                              │
│                                                                         │
│  3. componentDidUpdate → open() → .animate('slideInUp')                 │
│     → 此时才把 translateY 设为 screenHeight（屏幕外）                     │
│     → 然后动画到 0                                                       │
│                                                                         │
│  ★ 步骤 2 和步骤 3 之间至少有 1 帧的时间差 ★                              │
│  ★ 在这 1 帧内，内容以 translateY: 0 显示 → 闪烁 ★                       │
└─────────────────────────────────────────────────────────────────────────┘
```

这个时序问题是 `react-native-modal` 的设计缺陷，在 iOS/Android 上也存在，但被**原生 Modal** 的实现细节掩盖了。

#### iOS 为什么不闪烁（代码依据）

iOS 的 Modal 实现存在**两层异步延迟**，使得 Dialog 的实际显示时机晚于 JS 的 `componentDidUpdate`。

**iOS Paper 架构**（`RCTModalHostViewManager.m:78-86`）：

```objc
// react-native/React/Views/RCTModalHostViewManager.m:78-86
- (void)presentModalHostView:(RCTModalHostView *)modalHostView
          withViewController:(RCTModalHostViewController *)viewController
                    animated:(BOOL)animated
{
  dispatch_block_t completionBlock = ^{
    if (modalHostView.onShow) {
      modalHostView.onShow(nil);
    }
  };
  dispatch_async(dispatch_get_main_queue(), ^{       // ← 第 1 层异步：延迟到下一个 run loop
    [[modalHostView reactViewController] presentViewController:viewController
                                                      animated:animated
                                                    completion:completionBlock];
                                                    // ← 第 2 层异步：UIKit 内部异步呈现
  });
}
```

**iOS Fabric 架构**（`RCTModalHostViewComponentView.mm:148-161`）：

```objc
// react-native/React/Fabric/Mounting/ComponentViews/Modal/RCTModalHostViewComponentView.mm:148-161
- (void)ensurePresentedOnlyIfNeeded
{
  BOOL shouldBePresented = !_isPresented && _shouldPresent && self.window;
  if (shouldBePresented) {
    _isPresented = YES;
    [self presentViewController:self.viewController
                       animated:_shouldAnimatePresentation
                     completion:^{                    // ← UIKit 异步：呈现完成后回调
                       auto eventEmitter = [self modalEventEmitter];
                       if (eventEmitter) {
                         eventEmitter->onShow(ModalHostViewEventEmitter::OnShow{});
                       }
                     }];
  }
}
```

**iOS 时序图**：

```
T0  JS: isVisible=true → render()
T1  原生: ensurePresentedOnlyIfNeeded 被调用
    ┌──────────────────────────────────────────────────────────────┐
    │ Paper: dispatch_async → 延迟到下一个 run loop iteration       │
    │ Fabric: 直接调用 presentViewController                       │
    └──────────────────────────────────────────────────────────────┘
T2  JS: componentDidUpdate → open() → .animate('slideInUp')
    → translateY 设为 screenHeight（屏幕外）
    → 动画开始
T3  [下一个 run loop] UIKit 开始呈现 Modal
    → 但此时内容已经在屏幕外（translateY=screenHeight）
    → 用户看不到任何内容
T4  UIKit 动画完成 → completion block → onShow 事件
```

**关键**：iOS 的 `dispatch_async`（Paper）和 **UIKit 的 `presentViewController:animated:completion**:`（两者）都是**异步的**。Modal 的实际视觉呈现被延迟到下一个 run loop 或更晚，而 JS 的 `componentDidUpdate` 在当前 run loop 内就已经执行了 `.animate()`。因此当 Modal 真正可见时，内容已经在屏幕外了，不会闪烁。

#### Android 为什么不闪烁（代码依据）

Android 的 `Dialog.show()` 虽然是同步调用的，但 Android 系统内部的 `Dialog` 实现也有异步机制。

**Android Modal 显示**（`ReactModalHostView.java:330-331`）：

```java
// react-native/ReactAndroid/src/main/java/com/facebook/react/views/modal/
// ReactModalHostView.java:330-331
if (currentActivity != null && !currentActivity.isFinishing()) {
    mDialog.show();   // ← 同步调用 Dialog.show()
}
```

**Android `onShow` 回调**（`ReactModalHostManager.java:131-138`）：

```java
// ReactModalHostManager.java:131-138
view.setOnShowListener(
    new DialogInterface.OnShowListener() {
        @Override
        public void onShow(DialogInterface dialog) {
            dispatcher.dispatchEvent(
                new ShowEvent(UIManagerHelper.getSurfaceId(reactContext), view.getId()));
        }
    });
```

Android 的 `Dialog.show()` 内部实现（AOSP 源码 `android/app/Dialog.java`）：

```java
// Android AOSP: android/app/Dialog.java (非本项目文件，引用自 Android 开源项目)
public void show() {
    // ...
    WindowManager.LayoutParams l = mWindow.getAttributes();
    // ...
    WindowManagerGlobal.getInstance().addView(mDecor, l);  // ← 同步添加到 WindowManager
    // ...
    // 但 onShow 回调是通过 Handler 异步分发的：
    mListenersHandler.sendMessage(mListenersHandler.obtainMessage(SHOW));
    //                                                    ↑ 异步 Message！
}
```

**Android 时序图**：

```
T0  JS: isVisible=true → render()
T1  原生: showOrUpdate() → mDialog.show()
    ┌──────────────────────────────────────────────────────────────┐
    │ Dialog.show() 内部：                                         │
    │   1. WindowManager.addView() → 同步添加窗口                   │
    │      但窗口不会立即渲染，需要等下一个 vsync                    │
    │   2. mListenersHandler.sendMessage(SHOW) → 异步分发 onShow    │
    └──────────────────────────────────────────────────────────────┘
T2  JS: componentDidUpdate → open() → .animate('slideInUp')
    → translateY 设为 screenHeight（屏幕外）
T3  [下一个 vsync] WindowManager 渲染窗口
    → 但此时内容已经在屏幕外（translateY=screenHeight）
    → 用户看不到任何内容
T4  [下一个 Handler 消息] onShow 回调触发
```

**关键**：Android 的 `WindowManager.addView()` 虽然同步执行，但窗口的**实际渲染**要等到下一个 vsync 信号。而 JS 的 `componentDidUpdate` 在 `addView()` 返回后立即执行（在同一个消息循环内），`.animate()` 在窗口实际渲染之前就被调用了。因此当窗口真正渲染时，内容已经在屏幕外了，不会闪烁。

#### HarmonyOS 为什么暴露了时序问题（代码依据）

**HarmonyOS C++ 路径**（`ArkUIDialogHandler.cpp:31-40`）：

```cpp
// tester/harmony/react_native_openharmony/src/main/cpp/RNOH/arkui/ArkUIDialogHandler.cpp:31-40
void ArkUIDialogHandler::show() {
  if (isShow_) {
    return;
  }
  NativeDialogApi::getInstance()->show(handler_, false);
  onShow();          // ← 同步调用！没有异步分发！
  isShow_ = true;
}
```

**HarmonyOS 时序图**：

```
T0  JS: isVisible=true → render()
T1  原生: onFinalizeUpdates() → showDialog()
    ┌──────────────────────────────────────────────────────────────┐
    │ NativeDialogApi::show() → ArkUI Dialog 立即同步显示！         │
    │ onShow() → 同步调用，没有异步分发                              │
    │                                                              │
    │ ★ Dialog 在当前帧就已经可见了！★                               │
    └──────────────────────────────────────────────────────────────┘
    ★ 此时内容 translateY: 0（正常位置），用户看到完整弹窗内容 ★
T2  JS: componentDidUpdate → open() → .animate('slideInUp')
    → 此时才把 translateY 设为 screenHeight
    → 内容跳到屏幕外，然后动画回来
    → 但已经晚了至少 1 帧！
```

#### 三平台对比

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        三平台 Modal 显示时序对比                          │
│                                                                         │
│  iOS (Paper):                                                           │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ render() → dispatch_async → [下一 run loop] → present → 可见 │       │
│  │              ↑                    ↑                           │       │
│  │              │                    │                           │       │
│  │    componentDidUpdate 在这里执行 ──┘                           │       │
│  │    .animate() 在 Dialog 可见之前就被调用了                      │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  Android:                                                               │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ render() → Dialog.show() → [下一 vsync] → 窗口渲染 → 可见     │       │
│  │              ↑                ↑                               │       │
│  │              │                │                               │       │
│  │    componentDidUpdate ────────┘                               │       │
│  │    .animate() 在窗口渲染之前就被调用了                          │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  HarmonyOS:                                                             │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ render() → NativeDialogApi::show() → 立即可见！               │       │
│  │              ↑                                                │       │
│  │              │                                                │       │
│  │    componentDidUpdate 在这里执行（已经晚了！）                  │       │
│  │    .animate() 在 Dialog 可见之后才被调用                        │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  ★ iOS/Android 有异步延迟，HarmonyOS 没有 → 时序问题被暴露 ★             │
└─────────────────────────────────────────────────────────────────────────┘
```

| 平台 | Dialog 显示机制 | 显示时机 | `onShow` 分发 | 闪烁风险 |
|------|----------------|---------|--------------|---------|
| iOS (Paper) | `dispatch_async` + `presentViewController` | 下一 run loop 或更晚 | 异步（completion block） | **低** |
| iOS (Fabric) | `presentViewController` | UIKit 内部异步 | 异步（completion block） | **低** |
| Android | `Dialog.show()` + `WindowManager.addView()` | 下一 vsync | 异步（Handler Message） | **低** |
| HarmonyOS | `NativeDialogApi::show()` | **当前帧立即** | **同步**（inline 调用） | **高** |

### 4.3 `cda568a66` 是否放大了时序问题？

**答案：是的，这笔 PR 放大了时序问题，使闪烁从"关闭时"转移到"打开时"。**

#### `cda568a66` 之前的行为（0.72.101-5 及更早）

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    cda568a66 之前的打开弹窗时序                           │
│                                                                         │
│  T0 [同步] JS: isVisible=true → render() → <Modal visible={true}>       │
│     → 原生组件创建                                                       │
│     → createInitialState() 返回 screenSize={0,0}                        │
│                                                                         │
│  T1 [同步] 原生: onFinalizeUpdates()                                     │
│     → isScreenSizeSet = false（因为 screenSize={0,0}）                   │
│     → shouldShowDialog = false                                          │
│     → Dialog 不显示！等待屏幕尺寸                                        │
│                                                                         │
│  T2 [异步] 原生: onStateChanged() 被调用                                  │
│     → updateDisplaySize() 计算真实尺寸                                   │
│     → state->updateState({screenSize}) ← 异步！                         │
│                                                                         │
│  T3 [异步] 原生: 下一个事件循环 tick                                      │
│     → Shadow thread 处理状态更新                                         │
│     → adopt() 用真实尺寸重新设置 Yoga 节点                                │
│     → Yoga 重新布局                                                      │
│     → onFinalizeUpdates() → isScreenSizeSet=true → showDialog()         │
│     → Dialog 显示                                                        │
│                                                                         │
│  T4 [同步] JS: componentDidUpdate → open() → .animate()                 │
│     → 动画开始                                                           │
│                                                                         │
│  ★ T3 和 T4 之间的时间差：                                               │
│    - T3 是异步的，发生在下一个事件循环                                     │
│    - T4 是同步的，发生在 React 的 componentDidUpdate                     │
│    - 两者可能在同一帧内，也可能相差 1 帧                                   │
│                                                                         │
│  ★ 但由于 T1→T2→T3 的异步延迟，给了 JS 动画准备时间                      │
│    → .animate() 可能在 Dialog 显示之前或同时被调用                        │
│    → 打开时不闪烁（或闪烁不明显）                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**关键点**：`screenSize={0,0}` 导致的异步延迟（T1→T2→T3）**恰好掩盖了时序问题**，让 `.animate()` 有时间在 Dialog 显示之前被调用。

#### `cda568a66` 之后的行为（0.72.103 及之后）

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    cda568a66 之后的打开弹窗时序                           │
│                                                                         │
│  T0 [同步] JS: isVisible=true → render() → <Modal visible={true}>       │
│     → 原生组件创建                                                       │
│     → createInitialState() 预填充 screenSize={真实值}                   │
│                                                                         │
│  T1 [同步] 原生: onFinalizeUpdates()                                     │
│     → isScreenSizeSet = true（因为 screenSize={真实值}）                 │
│     → shouldShowDialog = true                                           │
│     → showDialog() → Dialog 立即显示！                                   │
│                                                                         │
│  ★ 此时内容 translateY: 0（正常位置），用户看到完整弹窗内容 ★             │
│                                                                         │
│  T2 [同步] JS: componentDidUpdate → open() → .animate()                 │
│     → 此时才把 translateY 设为 screenHeight                              │
│     → 内容跳到屏幕外，然后动画回来                                        │
│                                                                         │
│  ★ T1 和 T2 之间至少有 1 帧的时间差 ★                                    │
│  ★ 在这 1 帧内，弹窗内容完整显示 → 闪烁！★                               │
└─────────────────────────────────────────────────────────────────────────┘
```

**关键点**：`screenSize={真实值}` 消除了异步延迟，Dialog 在第一次 `onFinalizeUpdates()` 就显示，**暴露了时序问题**。

#### 对比图

```
cda568a66 之前（screenSize={0,0}）：
─────────────────────────────────────────────────────────────────────► 时间

T0          T1              T2              T3              T4
│           │               │               │               │
JS render   原生 finalize   原生 finalize   原生 finalize   JS componentDidUpdate
isVisible   screenSize=0    异步 updateState showDialog    open() → .animate()
=true       → 不显示        → 重新布局      → 显示
                                            ↑               ↑
                                            │               │
                                            └───── 时间差 ───┘
                                            （可能 0~1 帧，不明显）

cda568a66 之后（screenSize={真实值}）：
─────────────────────────────────────────────────────────────────────► 时间

T0          T1                              T2
│           │                               │
JS render   原生 finalize                   JS componentDidUpdate
isVisible   screenSize=真实值               open() → .animate()
=true       → showDialog() → 显示！
            ↑                               ↑
            │                               │
            └───────── 时间差 ───────────────┘
            （至少 1 帧，明显闪烁！）
```

### 4.4 为什么闪烁时机从"关闭"变为"打开"

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         闪烁时机的转移机制                                │
│                                                                         │
│  cda568a66 之前：                                                        │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ 打开时：                                                     │       │
│  │   - screenSize={0,0} → 异步延迟 → Dialog 显示较晚             │       │
│  │   - .animate() 有时间在 Dialog 显示前被调用                    │       │
│  │   - 不闪烁 ✓                                                 │       │
│  │                                                              │       │
│  │ 关闭时：                                                     │       │
│  │   - 两阶段 setState 的时序问题暴露                            │       │
│  │   - 闪烁 ✗                                                   │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  cda568a66 之后：                                                        │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ 打开时：                                                     │       │
│  │   - screenSize={真实值} → 无延迟 → Dialog 立即显示            │       │
│  │   - .animate() 来不及在 Dialog 显示前被调用                    │       │
│  │   - 闪烁 ✗                                                   │       │
│  │                                                              │       │
│  │ 关闭时：                                                     │       │
│  │   - Dialog 显示时机提前，关闭时的时序竞争减少                  │       │
│  │   - 不闪烁（或闪烁不明显）✓                                   │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  本质：cda568a66 改变了 Dialog 显示的时机，                                │
│        使打开时的时序问题暴露，关闭时的时序问题被掩盖。                     │
└─────────────────────────────────────────────────────────────────────────┘
```



### 4.6 验证结论

通过回退 `cda568a66` 中 `ModalHostViewComponentDescriptor.cpp` 的 `createInitialState` 逻辑（将预填充屏幕尺寸改回 `screenSize = {0, 0}`），实测确认打开闪烁时机降低非常多，验证了上述分析。

### 4.7 总结

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              结论                                        │
│                                                                         │
│  1. 时序问题是 react-native-modal 的固有设计缺陷                          │
│     → 动画初始状态不会在组件挂载时自动应用                                 │
│     → Dialog 出现和 .animate() 调用之间有时间差                           │
│                                                                         │
│  2. 这个时序问题在 iOS/Android 上被掩盖                                    │
│     → 原生 Modal 有内部延迟，给 .animate() 准备时间                       │
│                                                                         │
│  3. HarmonyOS 的 ArkUI Dialog 暴露了时序问题                              │
│     → NativeDialogApi::show() 立即同步显示                                │
│     → 时间差被用户感知到                                                  │
│                                                                         │
│  4. cda568a66 放大了时序问题                                              │
│     → 消除了 screenSize={0,0} 的异步延迟                                  │
│     → Dialog 显示时机提前，暴露了打开时的时序问题                          │
│     → 同时掩盖了关闭时的时序问题                                          │
│                                                                         │
│  5. 修复方向：                                                            │
│     → 在三方库侧：确保 Dialog 出现时内容不可见（opacity: 0）               │
│     → 在框架侧：当 animationType='none' 时延迟 Dialog 显示                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. 完整时序对比图

### 5.1 0.72.101-5（关闭时闪烁）

```
打开弹窗：
  JS: isVisible=true → RN Modal visible=true → 原生组件创建
  原生: onFinalizeUpdates() → isScreenSizeSet=false → Dialog 不显示（等待）
  原生: onStateChanged() → updateState(真实尺寸) → 触发重新布局
  原生: onFinalizeUpdates() → isScreenSizeSet=true → showDialog()
  JS: open() → 动画开始
  结果: Dialog 显示与动画开始几乎同步 → 不闪烁 ✓

关闭弹窗：
  JS: close() → 动画开始（300ms）
  JS: 动画完成 → setState({showContent: false})  ← 背景变透明，Dialog 仍在
  JS: 下一帧 → setState({isVisible: false})      ← Dialog 销毁
  原生: 组件卸载 → Dialog 销毁
  结果: 两阶段 setState 之间 1 帧状态不一致 → 关闭时闪烁 ✗
```

### 5.2 0.72.103+（打开时闪烁）

```
打开弹窗：
  JS: isVisible=true → RN Modal visible=true → 原生组件创建
  原生: createInitialState() → screenSize={真实值}（预填充）
  原生: onFinalizeUpdates() → isScreenSizeSet=true → showDialog() → Dialog 立即显示！
  ★ 此时内容在屏幕外，背景透明 → 1帧空白弹窗 → 闪烁！
  JS: componentDidUpdate → open() → 动画开始（已晚 1 帧）
  结果: Dialog 先于动画出现 → 打开时闪烁 ✗

关闭弹窗：
  JS: close() → 动画开始（300ms）
  JS: 动画完成 → setState({showContent: false}) → setState({isVisible: false})
  原生: 组件卸载 → Dialog 销毁
  结果: 正常关闭 → 不闪烁 ✓
```

---

## 6. 修复建议

### 6.1 修复思路：参照 iOS/Android 的异步延迟机制

根据第 3.6 节的分析，iOS/Android 不闪烁的核心原因是 **Modal 的实际视觉呈现存在异步延迟**，给了 JS 的 `.animate()` 足够的准备时间。HarmonyOS 可以从两个维度参照这个思路：

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         修复思路总览                                     │
│                                                                         │
│  思路 1：延迟 Dialog 的显示时机（参照 iOS dispatch_async）                │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ 将 NativeDialogApi::show() 延迟到下一帧执行                   │       │
│  │ → 给 JS componentDidUpdate 留出时间调用 .animate()            │       │
│  │ → Dialog 真正可见时，内容已经在屏幕外                          │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  思路 2：Dialog 正常显示，但内容首帧不可见（等效方案）                     │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ Dialog 正常 show()，但设置内容节点 opacity=0                   │       │
│  │ → 下一帧恢复 opacity=1                                        │       │
│  │ → 视觉效果等价于延迟显示，但实现更简单                          │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  思路 3：三方库侧适配（不修改框架）                                       │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │ 在 react-native-modal 的 render() 中设置初始 opacity=0        │       │
│  │ → open() 时设为 opacity=1                                     │       │
│  │ → 纯 JS 层修改，不涉及原生代码                                  │       │
│  └──────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 方案 A：系统侧 — 参照Android和IOS 的系统侧异步机制，系统侧Dialog 变成异步（推荐）

## 6.1 方案概述

**核心思路**：在 HarmonyOS 原生 `NativeDialogApi::show()` 调用处增加异步延迟（1帧/下一个主循环），模拟 iOS/Android 平台的异步显示机制，为 JS 层的 `componentDidUpdate` → `animate()` 执行预留时间窗口。

**目标效果**：使 HarmonyOS 的 Dialog 显示时机从“当前帧同步”推迟到“下一帧或下一个事件循环”，与 iOS/Android 行为对齐，消除 JS 动画准备与 Dialog 显示之间的时序竞争。

## 6.2 修复原理回顾

| 平台               | Dialog 显示时机                                      | 闪烁风险 |
| :----------------- | :--------------------------------------------------- | :------- |
| iOS (Paper)        | 下一个 run loop（`dispatch_async`）                  | 低       |
| iOS (Fabric)       | UIKit 内部异步（`presentViewController`）            | 低       |
| Android            | 下一个 vsync（`WindowManager.addView` + 渲染管线）   | 低       |
| HarmonyOS **当前** | **当前帧同步**（`NativeDialogApi::show()` 立即执行） | **高**   |

方案A通过在 HarmonyOS 原生侧引入人为异步延迟，使 Dialog 实际可见时间点后移，确保 `react-native-modal` 的 `open()` → `animate('slideInUp')` 在 Dialog 显示之前或同时完成初始状态设置。

### 6.2.1 修改文件路径

```
tester/harmony/react_native_openharmony/src/main/cpp/RNOH/arkui/ArkUIDialogHandler.cpp
```

### 6.2.2 代码修改（推荐实现）

**原代码（同步显示）**：

cpp

```
void ArkUIDialogHandler::show() {
  if (isShow_) {
    return;
  }
  NativeDialogApi::getInstance()->show(handler_, false);
  onShow();          // 同步回调
  isShow_ = true;
}
```



**修改后（异步延迟 1 帧）**：

cpp

```
void ArkUIDialogHandler::show() {
  if (isShow_) {
    return;
  }
  // 标记为已显示，防止重复调用
  isShow_ = true;

  // 使用 PostTask 延迟到下一个主循环执行，模拟 iOS dispatch_async
  auto weakThis = weak_from_this();
  rnoh::arkui::UIManager::PostTaskToMain([weakThis]() {
    auto strongThis = weakThis.lock();
    if (!strongThis) return;

    // 再次检查避免重复显示
    if (strongThis->isDialogShown_) return;
    strongThis->isDialogShown_ = true;

    NativeDialogApi::getInstance()->show(strongThis->handler_, false);
    strongThis->onShow();  // 现在 JS 的 animate() 已经执行完毕
  });
}
```



### 6.2.3 延迟时长选择

| 延迟方式                | 延迟时长           | 优点                  | 缺点                   |
| :---------------------- | :----------------- | :-------------------- | :--------------------- |
| **1帧（~16ms）**        | 投递到下一帧 vsync | 与 Android 行为最接近 | 需要依赖渲染循环       |
| **下一个主循环**        | 0ms（仅保证顺序）  | 最轻量，仅保证顺序    | 可能在同帧内，但已足够 |
| **固定延迟（如 50ms）** | 固定值             | 实现简单              | 可能造成卡顿感，不推荐 |

**推荐**：使用 **“下一个主循环”**（PostTask），不引入额外耗时，仅保证 `show()` 在 JS 的 `componentDidUpdate` 之后执行。经测试，此延迟已足以消除闪烁。

**风险**：

- 异步延迟导致弹窗响应变慢

- `NextFrameDispatcher` 的回调在组件销毁后可能仍然执行（已通过 `weak_ptr` 防护）

- **多 Modal 嵌套场景**可能出现显示顺序错乱

  

### 6.3 方案 B：延迟显示 Dialog（参照 iOS `dispatch_async`）

**原理**：**参照 iOS Paper 架构的 `dispatch_async(dispatch_get_main_queue(), ...)` 机制，将 `NativeDialogApi::show()` 延迟到下一帧 vsync 执行。

```cpp
// ModalHostViewComponentInstance.cpp

void ModalHostViewComponentInstance::onFinalizeUpdates() {
  auto isScreenSizeSet = m_state && m_state->getData().screenSize.height != 0 &&
      m_state->getData().screenSize.width != 0;
  auto shouldShowDialog = !m_dialogHandler.isShow() && isScreenSizeSet;
  if (shouldShowDialog) {
    if (m_props && m_props->animationType == AnimationType::None) {
      // animationType='none' 意味着 JS 侧会自己做动画（如 react-native-modal）
      // 参照 iOS 的 dispatch_async，延迟到下一帧再显示 Dialog
      // 给 JS 的 componentDidUpdate → open() → .animate() 留出时间
      auto weakSelf = weak_from_this();
      NextFrameDispatcher::Get().post([weakSelf]() {
        if (auto self = std::static_pointer_cast<ModalHostViewComponentInstance>(
                weakSelf.lock())) {
          if (!self->m_dialogHandler.isShow()) {
            self->showDialog();
          }
        }
      });
    } else {
      // animationType='slide'/'fade' 使用原生动画，无需延迟
      showDialog();
    }
  }
  CppComponentInstance::onFinalizeUpdates();
}
```

**实现**：利用 HarmonyOS 已有的 `OH_NativeVSync` API，主动把弹窗延迟一帧。

**时序图**：

```
T0  JS: isVisible=true → render()
T1  原生: onFinalizeUpdates()
    → animationType='none'
    → NextFrameDispatcher::post(showDialog)  ← 注册到下一帧
    → Dialog 不显示
T2  JS: componentDidUpdate → open() → .animate('slideInUp')
    → translateY 设为 screenHeight（屏幕外）
    → 动画开始
T3  [下一帧 vsync] NextFrameDispatcher 回调
    → showDialog() → Dialog 显示
    → 但此时内容已经在屏幕外 → 无闪烁 ✓
```

**优点**：

- 直接参照 iOS 的 `dispatch_async` 机制，原理清晰，需要系统侧一起做
- 不影响 `animationType='slide'`/`'fade'` 的原生动画路径

**风险**：

- 主动做异步延迟，影响所有的modal弹窗；减少1帧范围内的风险

- `NextFrameDispatcher` 的回调在组件销毁后可能仍然执行（已通过 `weak_ptr` 防护）

- **延迟一帧可能导致 Modal 打开时有一帧的"空白"（用户可能感知到延迟）**

  

### 6.4 方案 C：三方库侧 — 内容初始透明

**原理**：在 `react-native-modal` 的 JS 层设置初始 `opacity: 0`，在 `open()` 动画开始时同步设为 `1`。

**实现**（已在 `@react-native-oh-tpl/react-native-modal` 中验证）：

```js
// @react-native-oh-tpl/react-native-modal/dist/modal.js

// 1. 新增 isAnimating 状态
this.state = {
    showContent: true,
    isVisible: false,
    isAnimating: false,  // ← 新增：追踪动画是否正在进行
    // ...
};

// 2. open() 时设置 isAnimating=true
this.open = () => {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.setState({ isAnimating: true });  // ← 新增
    // ... 原有动画逻辑
};

// 3. close() 完成时设置 isAnimating=false
this.close = () => {
    // ...
    .then(() => {
        this.setState({
            showContent: false,
            isAnimating: false,  // ← 新增
        }, () => {
            this.setState({ isVisible: false }, () => {
                this.props.onModalHide();
            });
        });
    });
};

// 4. render() 中用 opacity 包裹 Modal 内容
render() {
    // ...
    const modalContentStyle = {
        flex: 1,
        opacity: this.state.isAnimating ? 1 : 0,  // ← 核心：非动画时不可见
    };
    return React.createElement(Modal, { ... },
        React.createElement(View, { style: modalContentStyle },
            this.makeBackdrop(),
            containerView
        )
    );
}
```

**时序图**：

```
打开弹窗：
  T0  getDerivedStateFromProps → isVisible=true, isAnimating=false（默认）
  T1  render() → opacity=0 → Dialog 出现但内容不可见 → 无闪烁 ✓
  T2  componentDidUpdate → open() → setState({isAnimating: true})
  T3  render() → opacity=1 → 内容可见，动画已在进行中 → 正常 ✓

关闭弹窗：
  T0  close() → 动画开始（isAnimating 保持 true）
  T1  动画完成 → setState({isAnimating: false})
  T2  render() → opacity=0 → 内容不可见
  T3  setState({isVisible: false}) → Dialog 销毁
```

**优点**：
- 不修改框架代码，纯 JS 层修改
- 已在 `@react-native-oh-tpl/react-native-modal` 中验证可行
- 通过 OH-TPL 适配层分发，不影响原始三方库

**缺点**：
- 需要修改三方库源码（通过 OH-TPL 适配层分发）
- 关闭时仍有偶现闪烁（两阶段 `setState` 的时序问题未完全解决）
- 每个使用 `react-native-modal` 的项目都需要使用 OH-TPL 版本

### 6.5 方案对比与推荐

| 维度 | 方案 A（延迟 show） | 方案 B（首帧 opacity=0） | 方案 C（三方库适配） |
|------|-------------------|------------------------|-------------------|
| 修改位置 | 框架 C++ 层 | 框架 C++ 层 | 三方库 JS 层 |
| 实现复杂度 | 高（vsync 生命周期） | **低**（一个标志位） | 中（状态管理） |
| 风险 | 中（回调野指针） | **低**（无新 API） | 低（纯 JS） |
| 解决打开闪烁 | ✓ | ✓ | ✓ |
| 解决关闭闪烁 | ✗ | ✗ | 部分（偶现） |
| 影响范围 | 所有 Modal | 所有 Modal | 仅 react-native-modal |
| 维护成本 | 框架侧维护 | 框架侧维护 | OH-TPL 适配层维护 |
| 参照平台 | iOS `dispatch_async` | iOS/Android 等效 | 无 |

**推荐**：

1. **首选方案 B（框架侧）**：实现最简单，风险最低，效果等价于方案 A。作为框架层的通用修复，所有使用 `animationType='none'` + JS 动画的三方库都能受益。

2. **辅助方案 C（三方库侧）**：作为 OH-TPL 适配层的补充修复，处理关闭时的偶现闪烁。即使框架侧修复了打开闪烁，关闭闪烁仍需要三方库侧配合。

3. **方案 A 可作为备选**：如果方案 B 的 `onFinalizeUpdates()` 调用时机不符合预期（只在首次创建时调用一次），则回退到方案 A 使用 `NextFrameDispatcher`。

### 6.6 关闭闪烁的额外修复

无论选择哪个方案，关闭时的**偶现闪烁（两阶段 `setState` 导致）仍需要在三方库侧处理**。当前方案 C 的实现已经部分解决了这个问题，但仍有偶现。

**根因**：`react-native-modal` 的两阶段 `setState` 在关闭时存在 1 帧的状态不一致：

```js
// 当前实现（modal.js:380-388）
this.setState({ showContent: false }, () => {     // ← 第 1 次 setState
    this.setState({ isVisible: false }, () => {   // ← 第 2 次 setState（在回调中）
        this.props.onModalHide();
    });
});
```

**优化方向**：将两次 `setState` 合并为一次，或在第一次 `setState` 时同时设置 `isAnimating: false`（已在方案 C 中实现），确保 Dialog 销毁前内容已经不可见。

---

## 7. 深度分析：`cda568a66`（0.72.103）— fix: initial screen size for Modal

### 7.1 PR 背景与目的

该 PR 由 Software Mansion 的 arkadiusz.kasprzyk 提交，解决的核心问题是：**在某些场景下，Modal 弹窗完全不显示**。

PR 描述原文：
> Currently, Modal sometimes isn't displayed if screenSize is 0.

问题出在 `ModalHostViewComponentInstance::onFinalizeUpdates()` 中的守卫逻辑：

```cpp
// ModalHostViewComponentInstance.cpp:206-213
void ModalHostViewComponentInstance::onFinalizeUpdates() {
  auto isScreenSizeSet = m_state && m_state->getData().screenSize.height != 0 &&
      m_state->getData().screenSize.width != 0;
  auto shouldShowDialog = !m_dialogHandler.isShow() && isScreenSizeSet;
  if (shouldShowDialog) {
    showDialog();
  }
}
```

当 `screenSize` 为 `{0, 0}` 时，`isScreenSizeSet = false`，Dialog 永远不会被显示。

### 7.2 `screenSize` 的完整数据流

要理解这个 PR，需要先理解 `screenSize` 在整个 Modal 生命周期中的流转路径：

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Shadow Tree（布局层）                              │
│                                                                         │
│  createInitialState()                                                   │
│    → 创建 ModalHostViewState(screenSize)                                │
│    → 返回 ConcreteState                                                 │
│         │                                                               │
│         ▼                                                               │
│  ConcreteComponentDescriptor::createShadowNode()                        │
│    → 创建 ShadowNode                                                    │
│    → 调用 adopt(shadowNode)                                             │
│         │                                                               │
│         ▼                                                               │
│  adopt()                                                                │
│    → 从 state 读取 screenSize                                           │
│    → layoutableShadowNode->setSize(screenSize)                          │
│         │                                                               │
│         ▼                                                               │
│  YogaLayoutableShadowNode::setSize()                                    │
│    → yogaNode_.style.dimensions()[YGDimensionWidth] = screenSize.width  │
│    → yogaNode_.style.dimensions()[YGDimensionHeight] = screenSize.height│
│    → yogaNode_.setDirty(true)                                           │
│         │                                                               │
│         ▼                                                               │
│  Yoga 布局计算                                                           │
│    → 以 screenSize 作为 Modal 容器的 width/height                        │
│    → 计算所有子组件的布局                                                 │
│    → 生成 LayoutMetrics                                                 │
│         │                                                               │
│         ▼                                                               │
│  commit 到原生层                                                         │
│    → ModalHostViewComponentInstance::setLayout(layoutMetrics)           │
│    → ModalHostViewComponentInstance::onStateChanged(state)              │
│    → ModalHostViewComponentInstance::onFinalizeUpdates()                │
│         │                                                               │
│         ▼                                                               │
│  onFinalizeUpdates()                                                    │
│    → 检查 screenSize != {0,0}                                           │
│    → 满足条件 → showDialog()                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.3 上游默认实现 vs RNOH 自定义实现

#### 上游默认 `ModalHostViewComponentDescriptor`

```cpp
// third-party/rn/ReactCommon/react/renderer/components/modal/
// ModalHostViewComponentDescriptor.h

class ModalHostViewComponentDescriptor final
    : public ConcreteComponentDescriptor<ModalHostViewShadowNode> {
 public:
  using ConcreteComponentDescriptor::ConcreteComponentDescriptor;

  void adopt(ShadowNode::Unshared const &shadowNode) const override {
    auto state = std::static_pointer_cast<
        const ModalHostViewShadowNode::ConcreteState>(shadowNode->getState());
    auto stateData = state->getData();

    layoutableShadowNode->setSize(
        Size{stateData.screenSize.width, stateData.screenSize.height});
    layoutableShadowNode->setPositionType(YGPositionTypeAbsolute);

    ConcreteComponentDescriptor::adopt(shadowNode);
  }

  // 注意：没有重写 createInitialState()
  // 默认实现不创建初始 state → screenSize 使用 ModalHostViewState 默认构造
  // ModalHostViewState() {} → screenSize = Size{} = {0, 0}
};
```

上游的 `ConcreteComponentDescriptor` 基类**没有**重写 `createInitialState`，所以使用 `ModalHostViewState` 的默认构造函数，`screenSize` 默认为 `{0, 0}`。

#### RNOH 自定义 `ModalHostViewComponentDescriptor`

```cpp
// RNOHCorePackage/ComponentDescriptors/ModalHostViewComponentDescriptor.h

class ModalHostViewComponentDescriptor final
    : public ConcreteComponentDescriptor<ModalHostViewShadowNode> {
 public:
  // adopt() 逻辑与上游完全一致
  void adopt(ShadowNode::Unshared const &shadowNode) const override { /* 同上 */ }

  // 新增：重写 createInitialState()，预填充真实屏幕尺寸
  virtual State::Shared createInitialState(
      ShadowNodeFragment const &fragment,
      ShadowNodeFamily::Shared const &family) const override;
};
```

```cpp
// RNOHCorePackage/ComponentDescriptors/ModalHostViewComponentDescriptor.cpp

State::Shared ModalHostViewComponentDescriptor::createInitialState(
    ShadowNodeFragment const &fragment,
    ShadowNodeFamily::Shared const &family) const {
  Size screenSize = {0, 0};
  auto rnInstance = contextContainer_->at<weak_ptr<RNInstance>>("RNOH::RNInstance");
  auto maybeSurface = rnInstance.lock()->getSurfaceByRootTag(family->getSurfaceId());
  if (maybeSurface.has_value()) {
    auto surface = maybeSurface.value().lock();
    if (surface) {
      auto displayMetrics = surface->getDisplayMetrics();
      screenSize.height = displayMetrics.windowPhysicalPixels.height / scale;
      screenSize.width = displayMetrics.windowPhysicalPixels.width / scale;
    }
  }
  auto data = make_shared<const ModalHostViewState>(screenSize);
  return make_shared<ConcreteState>(data, family);
}
```

### 7.4 `createInitialState` 预填充代码逐行分析

```cpp
facebook::react::Size screenSize = {0, 0};
```
初始化默认值为 `{0, 0}`，作为兜底值。如果后续获取失败，仍然退化为旧行为。

```cpp
auto rnInstance = contextContainer_->at<std::weak_ptr<rnoh::RNInstance>>(
    "RNOH::RNInstance");
```
从 `contextContainer_`（全局上下文容器）中获取 `RNInstance` 的弱引用。`RNInstance` 是整个 React Native 运行时的核心实例，管理着所有 Surface。这个引用是在 `RNInstanceCAPI::initializeScheduler()` 中注入的（也是本 PR 新增的代码）。

```cpp
auto maybeSurface =
    rnInstance.lock()->getSurfaceByRootTag(family->getSurfaceId());
```
通过 `family->getSurfaceId()` 获取当前 Modal 所属的 Surface ID，然后从 `RNInstance` 中查找对应的 `Surface` 对象。一个应用可能有多个 Surface（例如主页面、Modal 等），每个 Surface 有独立的布局上下文。

```cpp
if (maybeSurface.has_value()) {
    auto surface = maybeSurface.value().lock();
    if (surface) {
```
两层空值检查：先检查 `optional` 是否有值，再检查 `weak_ptr` 是否能 lock 成功。

```cpp
      auto displayMetrics = surface->getDisplayMetrics();
```
调用 `Surface::getDisplayMetrics()` 获取当前 Surface 的显示度量数据。这是本 PR 新增的接口方法，实现在 `ArkUISurface::getDisplayMetrics()` 中：

```cpp
// ArkUISurface.cpp（本 PR 新增）
DisplayMetrics ArkUISurface::getDisplayMetrics() {
  DisplayMetrics result;
  m_taskExecutor->runSyncTask(TaskThread::MAIN, [this, &result] {
    result = ArkTSBridge::getInstance()->getDisplayMetrics();
  });
  return result;
}
```

注意这里通过 `runSyncTask` 在**主线程同步执行**，确保获取到的是最新的屏幕尺寸。`ArkTSBridge::getDisplayMetrics()` 从 ArkTS 层获取 HarmonyOS 系统的显示度量。

```cpp
      screenSize.height = displayMetrics.windowPhysicalPixels.height /
          displayMetrics.windowPhysicalPixels.scale;
      screenSize.width = displayMetrics.windowPhysicalPixels.width /
          displayMetrics.windowPhysicalPixels.scale;
```
将物理像素转换为逻辑像素（dp），与 `updateDisplaySize()` 中的计算方式一致。

### 7.5 为什么需要在 `createInitialState` 而不是 `onStateChanged` 中设置

这是理解本 PR 的关键。两条路径的时序差异决定了行为差异：

#### 路径 A：`onStateChanged` 设置（PR 之前的方式）

```
时间线：

T0 [同步] JS 触发 visible=true
    → React reconciler 创建 ModalHostView shadow node
    → createInitialState() 返回 state(screenSize={0,0})
    → adopt() 设置 Yoga 节点尺寸 = 0x0
    → Yoga 布局计算：Modal 容器 0x0，所有子组件布局基于 0x0

T1 [同步] 布局结果 commit 到原生层
    → ComponentInstance 创建
    → onStateChanged(state) 被调用，m_state 为 null（首次）
    → updateDisplaySize() 计算真实尺寸
    → state->updateState({screenSize})  ← 注意：这是异步的！
      内部调用 dispatchRawState()，优先级 = AsynchronousUnbatched

T2 [异步] 下一个事件循环 tick
    → Shadow thread 处理状态更新
    → 克隆 shadow node，adopt() 用真实尺寸重新设置 Yoga 节点
    → Yoga 重新布局
    → 新的 LayoutMetrics commit 到原生层
    → onFinalizeUpdates() → isScreenSizeSet=true → showDialog()
```

**问题**：T0 到 T2 之间存在至少一个完整的渲染周期。在这个窗口内：
- Yoga 布局基于 0x0 计算 → 子组件的 `onLayout` 事件报告的 height 为 0
- `KeyboardAvoidingView` 在第一次 `onLayout` 时捕获 `_initialFrameHeight = 0`，且**永远不会更新**（代码中有 `if (!this._initialFrameHeight)` 守卫）
- 当键盘弹出时，`height = _initialFrameHeight - bottomHeight = 0 - N = 负数` → 视图坍缩

#### 路径 B：`createInitialState` 预填充（PR 之后的方式）

```
时间线：

T0 [同步] JS 触发 visible=true
    → React reconciler 创建 ModalHostView shadow node
    → createInitialState() 同步获取真实屏幕尺寸
      → 通过 RNInstance → Surface → getDisplayMetrics() 获取
      → 返回 state(screenSize={360, 780})  ← 真实尺寸！
    → adopt() 设置 Yoga 节点尺寸 = 360x780
    → Yoga 布局计算：Modal 容器 360x780，子组件正确布局

T1 [同步] 布局结果 commit 到原生层
    → ComponentInstance 创建
    → onStateChanged(state) 被调用（m_state 为 null，首次）
    → updateDisplaySize() 再次设置（可能是相同值）
    → onFinalizeUpdates() → isScreenSizeSet=true → showDialog()
    → Dialog 立即显示，尺寸正确
```

**效果**：
- 第一次 Yoga 布局就使用正确尺寸 → `onLayout` 报告正确的 height
- `KeyboardAvoidingView._initialFrameHeight` 捕获到正确值
- Dialog 在第一次 `onFinalizeUpdates()` 就显示，无需等待异步状态更新

### 7.6 PR 涉及的全部文件变更

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `RNOH/RNInstance.h` | 修改 | `Surface` 接口新增 `getDisplayMetrics()` 纯虚方法 |
| `RNOH/RNInstanceCAPI.cpp` | 修改 | 在 `initializeScheduler()` 中将 `RNInstance` 弱引用注入 `contextContainer_` |
| `RNOH/arkui/ArkUISurface.h` | 修改 | 声明 `getDisplayMetrics()` 重写方法 |
| `RNOH/arkui/ArkUISurface.cpp` | 修改 | 实现 `getDisplayMetrics()`，通过主线程同步获取 `DisplayMetrics` |
| `ComponentDescriptors/ModalHostViewComponentDescriptor.h` | **新增** | 自定义 Descriptor 类，重写 `adopt()` 和 `createInitialState()` |
| `ComponentDescriptors/ModalHostViewComponentDescriptor.cpp` | **新增** | `createInitialState()` 实现，预填充真实屏幕尺寸 |
| `ComponentDescriptors/ModalHostViewComponentDescriptorProvider.h` | **新增** | Descriptor 工厂函数和 Provider |
| `RNOHCorePackage/RNOHCorePackage.h` | 修改 | 将上游 Descriptor 替换为 RNOH 自定义 Descriptor |
| `OAT.xml` | 新增 | 开源审计追踪文件 |
| `CMakeLists.txt` | 修改 | 添加新文件到编译列表 |

### 7.7 PR 的正向收益

1. **修复 Modal 不显示问题**：消除了 `screenSize={0,0}` 导致 Dialog 永远不显示的场景
2. **修复 KeyboardAvoidingView 在 Modal 中失效**：第一次 `onLayout` 就报告正确高度，`_initialFrameHeight` 不再被锁定为 0
3. **减少不必要的布局重算**：不再需要先以 0x0 布局、再以真实尺寸重新布局的两轮计算

### 7.8 PR 的副作用：引入 react-native-modal 打开时闪烁

如第 4 章分析，预填充 `screenSize` 导致 `onFinalizeUpdates()` 中 `isScreenSizeSet` 立即为 `true`，Dialog 在第一次 finalize 时就显示。对于 `react-native-modal`（使用 `animationType='none'` + JS 动画），这意味着：

```
Dialog 立即显示（原生层）
    ↓ 至少 1 帧延迟
JS 动画才开始（componentDidUpdate → open()）
```

这 1 帧的间隙就是闪烁的来源。

**本质上是一个权衡（trade-off）**：

| | PR 之前 | PR 之后 |
|---|---------|---------|
| Modal 不显示 | 偶发 ✗ | 修复 ✓ |
| KeyboardAvoidingView | 失效 ✗ | 正常 ✓ |
| react-native-modal 打开 | 不闪烁 ✓ | 偶尔闪烁 ✗ |
| react-native-modal 关闭 | 偶尔闪烁 ✗ | 不闪烁 ✓ |

### 7.9 理想的修复方向

要同时保留 PR 的收益（修复 Modal 不显示 + KeyboardAvoidingView）又消除闪烁副作用，需要在 `showDialog()` 时机上做精细化控制，而不是回退整个 PR。具体方案见第 6 章。

---

## 8. 附录

### 8.1 关键代码文件索引

| 文件 | 路径 | 关键行 |
|------|------|--------|
| react-native-modal 主组件 | `tester/node_modules/react-native-modal/dist/modal.js` | L441-444 (getDerivedStateFromProps), L483-484 (componentDidUpdate), L526 (render) |
| RN Modal 前端 | `tester/node_modules/react-native/Libraries/Modal/Modal.js` | L222-224 (visible 判断), L248 (RCTModalHostView) |
| C++ 组件实例 | `tester/harmony/.../ComponentInstances/ModalHostViewComponentInstance.cpp` | L206-214 (onFinalizeUpdates), L217-220 (showDialog) |
| C++ 组件描述符 | `tester/harmony/.../ComponentDescriptors/ModalHostViewComponentDescriptor.cpp` | L15-37 (createInitialState) |
| C++ Dialog 处理 | `tester/harmony/.../arkui/ArkUIDialogHandler.cpp` | L31-35 (show), L76-97 (initDialogProperties) |
| ArkTS Modal 组件 | `tester/harmony/.../components/RNModalHostView.ets` | L96-105 (getTransitionEffect), L158-178 (aboutToAppear) |
| MountingManager | `tester/harmony/.../MountingManagerCAPI.cpp` | L330-337 (finalizeMutationUpdates) |

### 8.2 关键 Git 提交

| Commit | Tag/Version | 说明 |
|--------|-------------|------|
| `cda568a66` | 0.72.103 | fix: initial screen size for Modal — **闪烁时机转变的关键** |
| `ea555a954` | 0.72.105 | feat: Optimize finalizeMutationUpdates — 加剧打开时闪烁 |
| `9080d261a` | 0.72.108 | feat: 分帧 — 可能进一步加剧 |

### 8.3 验证方法

1. 在 0.72.141 版本上，将 `ModalHostViewComponentDescriptor.cpp` 中 `createInitialState` 的屏幕尺寸预填充逻辑去掉（只保留 `screenSize = {0, 0}`）
2. 重新编译运行
3. 使用 `react-native-modal` 测试弹窗打开/关闭
4. 预期结果：打开时不再闪烁，关闭时偶尔出现闪烁（与 0.72.101-5 行为一致）
