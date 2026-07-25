# Lottie-Turbo 动画起播事件 `onPlayStart` 需求文档

## 一、需求概述

### 1.1 背景与问题

在 HarmonyOS 侧使用 `lottie-turbo` 时，如果设置 `autoplay: false`，为了展示首帧仍会触发 `onSegmentStart`。业务侧需要的是**动画真正开始播放的时刻**，用于日志与联动，因此需要新增 `onPlayStart`（事件名 `playStart`）与 `lottie-android` 能力对齐。

此外，Android 侧对**主动中断**提供了 `onAnimationCancel` 语义；鸿蒙侧目前只有 `stop`/`complete` 路径，无法区分“自然结束”与“人为打断”。为保证播放语义完整，本次新增`onCancel` 回调。

### 1.2 目标与范围

- 新增 `playStart` 事件，仅在播放启动时触发，不受首帧静态渲染影响。
- 新增 `onCancel` 回调，仅在主动中断播放时触发（d），不与 `complete` 混淆。
- ArkTS 侧通过 `addEventListener` / `removeEventListener` 进行注册与解绑。
- 底层 C++ / NAPI 可识别并安全回调到 ArkTS。
- 保持现有事件体系兼容，确保对存量业务无破坏。

### 1.3 对标原库 (lottie-android) 相关 API

为确保鸿蒙端新增功能与原有平台上游库接口规格一致，对标 Android 端的 `LottieAnimationView` 相关起播事件接口如下：

- **类名/接口名**：起播事件依赖 Android 原生动画接口 `android.animation.Animator.AnimatorListener`，以及 Lottie 侧的方法 `LottieAnimationView.addAnimatorListener` 和 `LottieDrawable.addAnimatorListener`。
- **方法签名与返回值**：
  ```java
  // LottieAnimationView 及 LottieDrawable 中对外暴露的接口
  public void addAnimatorListener(Animator.AnimatorListener listener);
  public void removeAnimatorListener(Animator.AnimatorListener listener);
  
  // 核心的起播回调回调定义 (AnimatorListener 接口成员)
  public interface AnimatorListener {
      void onAnimationStart(Animator animation); // 我们重点对标的起播事件
      void onAnimationEnd(Animator animation);
      void onAnimationCancel(Animator animation);
      void onAnimationRepeat(Animator animation);
  }
  ```
- **参数类型**：监听器接收 `Animator.AnimatorListener`，对应的 `onAnimationStart` 被回调时带入动画对象本身。
- **语义与说明**：在 Android 中，调用 `playAnimation()` 真实开始播放动画时，会主动回调该 `onAnimationStart` 方法。本需求在 ArkTS 端新增的 `'playStart'` 事件严格对标此行为语义。

## 二、当前架构分析

### 2.1 相关项目结构

- `library/src/main/ets/`：ArkTS 侧组件与事件接口定义
- `library/src/main/cpp/`：C++ 动画引擎与 NAPI 桥接层
- `library/src/main/cpp/animator/`：播放控制与帧驱动
- `library/src/main/cpp/controller/`：事件注册与映射
- `library/src/main/cpp/include/`：对外 C API 与事件枚举

### 2.2 动画起播流程

1. ArkTS 侧注册 `addEventListener('playStart', callback)`。
2. NAPI 桥接将 `"playStart"` 映射为 C++ 事件枚举。
3. `LottieHandler::Play()` / `PlaySync()` 执行时，从暂停/停止切换为播放状态。
4. 底层触发 `ON_PLAY_START`，通过监听器回调到 ArkTS。

## 三、实现方案

### 3.1 修改文件清单

| 序号 | 文件路径 | 修改内容概述 |
| --- | --- | --- |
| 1 | `library/src/main/ets/components/LottieListener.ets` | 新增 `onPlayStart` 回调签名 |
| 2 | `library/src/main/ets/model/Animation.ets` | `AnimationEventName` 增加 `playStart` |
| 3 | `library/src/main/cpp/include/lottie_listener.h` | 增加 `ON_PLAY_START` 枚举 |
| 4 | `library/src/main/cpp/include/lottie_c.h` | C API 事件说明添加 `playStart` |
| 5 | `library/src/main/cpp/controller/lottie_controller_bridge.cpp` | 注册 `playStart` 到事件枚举映射 |
| 6 | `library/src/main/cpp/lottie_bridge.cpp` | 监听绑定与解绑支持 `playStart` |
| 7 | `library/src/main/cpp/animator/lottie_handler.h` | 监听结构体新增 `playStart` |
| 8 | `library/src/main/cpp/animator/lottie_handler.cpp` | 在 `Play/PlaySync` 起播时触发事件 |
| 9 | `README.md` | 事件表格新增 `playStart` |
| 10 | `README_zh.md` | 事件表格新增 `playStart` |
| 11 | `library/src/main/ets/components/LottieListener.ets` | 新增 `onCancel` 回调签名 |
| 12 | `library/src/main/ets/model/Animation.ets` | `AnimationEventName` 增加 `cancel` |
| 13 | `library/src/main/cpp/node/lottie_listener.h` | 事件枚举新增 `ON_CANCEL` |
| 14 | `library/src/main/cpp/node/lottie_listener.cpp` | 事件名映射新增 `onCancel` |
| 15 | `library/src/main/cpp/controller/lottie_controller_bridge.cpp` | 事件字符串映射 `cancel` |
| 16 | `library/src/main/cpp/controller/lottie_handler.h/.cpp` | 新增 `Cancel()` 并触发 `ON_CANCEL` |
| 17 | `library/src/main/cpp/lottie_bridge.cpp` | C 监听注册支持 `cancel` |
| 18 | `library/src/main/cpp/include/lottie_c.h` | 事件名称列表新增 `cancel` |

### 3.2 详细设计

#### 3.2.1 ArkTS 接口定义

- `AnimationEventName` 增加 `'playStart'` 联合类型，保证 TS 类型提示与静态检查。
- `LottieListener` 对外暴露 `onPlayStart?: (name: string) => void`，与现有事件保持一致风格。
- `AnimationEventName` 增加 `'cancel'` 联合类型，保证取消事件类型检查。
- `LottieListener` 对外暴露 `onCancel?: () => void`。

#### 3.2.2 事件注册与映射

- 在 `LottieControllerBridge` 中将字符串 `"playStart"` 映射为 `LottieEventType::ON_PLAY_START`。
- 在 `LottieControllerBridge` 中将字符串 `"cancel"` 映射为 `LottieEventType::ON_CANCEL`。
- 在 `lottie_bridge.cpp` 中将 ArkTS 注册与解绑的函数名正确路由到 C++ 监听器。
- 保持事件名大小写与现有 `addEventListener` 一致，避免业务误用。

#### 3.2.3 触发时机与判定条件

- 在 `LottieHandler::Play()` / `PlaySync()` 内部判定播放状态从 `Paused/Stopped` 切换到 `Playing` 时触发。
- 仅在启动播放时触发一次，不随首帧渲染触发，不受 `setFrame` 等定位行为影响。
- 当多次调用 `play()` 时，若状态未发生切换则不重复触发。
- 在调用 `cancel()` 主动中断播放时触发 `ON_CANCEL`，且不触发 `complete`。

#### 3.2.4 回调线程与安全性

- 事件最终回调在 JS/ArkTS 侧执行，遵循现有监听器回调线程模型。
- 使用现有监听器机制，避免引入新的线程同步风险。

## 四、框架图

```text
  [ ArkTS 应用层 ]
         |
         | (1) 注册 playStart 监听
         ↓
  +--------------------+       (5) 跨线程 JS 事件回调
  | Lottie 组件 / UI   | ←———————————————————————————————+
  | LottieListener     |                                 |
  +--------+-----------+                                 |
           |                                             |
           | (2) NAPI 接口调用                           |
           ↓                                             |
  [ NAPI 桥接层 ]                                        |
  +--------------------+                                 |
  | lottie_bridge      |                                 |
  | ControllerBridge   |                                 |
  +--------+-----------+                                 |
           |                                             |
           | (3) 字符串映射为 C++ 枚举                   |
           ↓                                             |
  [ Lottie C++ 底层引擎 ]                                |
  +--------------------+                                 |
  | 事件分发系统       | ————————————————————————————————+
  | LottieHandler      | (4) 状态机切换为播放，抛出 ON_PLAY_START
  |                    | (4') 主动中断调用 Cancel，抛出 ON_CANCEL
  +--------------------+
```

## 五、流程图

```text
    [业务/ArkTS层]                [NAPI桥接层]               [Lottie引擎]
        |                             |                           |
        | ————— 阶段一：事件订阅 —————|                           |
        |                             |                           |
        | —— addEventListener() ————→ |                           |
      |                             | —— 注册 ON_PLAY_START ——→ |
      |                             | —— 注册 ON_CANCEL —————→ |
        |                             | ←—————— 注册完成 ———————— |
        | ←—————— 绑定成功 —————————— |                           |
        |                             |                           |
        | ————— 阶段二：起播触发 —————|                           |
        |                             |                           |
        | —— play() / autoplay —————→ | ————————————————————————→ |
        |                             |                           |
        |                             |          [拦截状态: Paused → Playing]
        |                             |          [校验是否处于首帧之后并开始播放]
        |                             |                           |
        |                             | ←— 抛出 ON_PLAY_START ——— |
        | ←— 调度到 JS 侧进行回调 ——— |                           |
        |                             |                           |
      | ————— 阶段三：取消触发 —————|                           |
      |                             |                           |
      | —— cancel() ————————————→ | ————————————————————————→ |
      |                             |                           |
      |                             | ←— 抛出 ON_CANCEL ———— |
      | ←— 调度到 JS 侧进行回调 ——— |                           |
      |                             |                           |
```

## 六、API 使用示例

```typescript
// 1) 定义起播回调
let onPlayStart = (name: string): void => {
  // 记录日志或做动画联动
  console.log('lottie play start:', name)
}

// 2) 定义取消回调
let onCancel = (): void => {
  console.log('lottie play cancel')
}

// 3) 注册起播/取消回调
this.animationItem.addEventListener('playStart', onPlayStart)
this.animationItem.addEventListener('cancel', onCancel)

// 4) 需要时解绑回调
this.animationItem.removeEventListener('playStart', onPlayStart)
this.animationItem.removeEventListener('cancel', onCancel)

// 5) 主动中断播放
this.controller.cancel()
```

## 七、兼容性考虑

- `playStart` 为新增能力，不改变原有事件语义。
- `cancel` 为新增能力，不改变 `stop()` 行为语义（仍表示自然结束路径）。
- 与 `segmentStart`、`enterFrame` 等事件并存，不影响旧逻辑。
- 未注册该事件时，不引入额外执行路径。

## 八、风险评估

| 风险项 | 影响程度 | 应对措施 |
| --- | --- | --- |
| **重复触发风险** | 中 | 确保仅在状态由非播放切换至播放时才执行触发逻辑，避免多次连续调用 `play()` 产生重复回调 |
| **线程安全风险** | 低 | 遵循框架级统一的事件机制，延续现有监听器线程模型，确保 NAPI/JS 层回调安全 |
| **行为预期风险** | 低 | 在 README 与组件文档中明确声明 `playStart` 仅在动画启动时回调，与首帧静态加载（`onSegmentStart`）做出显著区分 |
| **语义混淆风险** | 低 | 明确 `cancel` 代表主动中断，`stop` 代表自然结束，文档中区分两者行为 |

## 九、验收标准

1. `autoplay: true`：首次播放开始时回调一次 `playStart`。
2. `autoplay: false`：加载首帧不触发，显式调用 `play()` 时触发。
3. 与 `onSegmentStart`、`enterFrame` 等事件并存且互不影响。
4. 调用 `cancel()` 时触发 `cancel` 回调，`complete` 不触发。
5. 调用 `stop()` 仍走 `complete` 逻辑（不触发 `cancel`）。