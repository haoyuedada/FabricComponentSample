# PauseCommit 对比 Demo 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个纯 JS 的 RN Demo,以视觉对比方式观察 `ReanimatedCommitHook.cpp:94` 处 `pauseReanimatedCommits()` 注释前后的运行表现差异。

**Architecture:** 单文件 Demo,屏幕分两区:上区是 Reanimated 高频动画方块(5 prop 同时驱动,制造 UI 线程持续提交负载),下区是 RN `setState` 秒表计数对照 Reanimated UI 线程基准计数。动画运行时观察 RN 计数是否落后。

**Tech Stack:** React Native 0.77 + OpenHarmony,`@react-native-ohos/react-native-reanimated` 3.18.2(`useSharedValue` / `useAnimatedStyle` / `useFrameCallback` / `useDerivedValue` / `interpolateColor` / `AnimatedText` 组件)

**Spec:** `docs/superpowers/specs/2026-08-10-pause-reanimated-commits-demo-design.md`

**注意:** 本 Demo 无自动化测试(纯视觉对比工具,spec 明确声明"不做自动化断言")。验证方式为 `npm run lint` + 人工跑应用观察。

---

## 文件结构

| 文件 | 职责 |
|------|------|
| **Create:** `tests/react-native-reanimated/PauseCommitDemo.tsx` | 完整 Demo(单文件,包含 `AnimationBlock` 子组件 + 主屏) |
| **Modify:** `index.js:87` | 将注册入口从 `ReanimateListDemo` 切换到 `PauseCommitDemo` |

### 关键依赖

- `AnimatedText` 组件来自 `tests/react-native-reanimated/example/AnimatedText.tsx`,通过 `useAnimatedProps` + `AnimatedTextInput` 在 UI 线程驱动文本内容,不触发 RN 提交。该组件在模块加载时调用 `Animated.addWhitelistedNativeProps({ text: true })`(幂等,可安全导入)。
- 所有 reanimated API 从 `@react-native-ohos/react-native-reanimated` 导入(与 `AnimatedText` 同包,保证 `SharedValue` 类型兼容)。

---

## Task 1: 创建 PauseCommitDemo.tsx

**Files:**
- Create: `tests/react-native-reanimated/PauseCommitDemo.tsx`

- [ ] **Step 1: 创建 Demo 文件**

创建 `tests/react-native-reanimated/PauseCommitDemo.tsx`,完整内容如下:

```tsx
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useDerivedValue,
  withTiming,
  withRepeat,
  withSequence,
  interpolateColor,
  FrameInfo,
} from '@react-native-ohos/react-native-reanimated';
import {AnimatedText} from './example/AnimatedText';

// 上区:Reanimated 高频动画方块(5 prop 同时驱动,每帧触发 PropsRegistry 更新)
function AnimationBlock() {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withSequence(
        withTiming(80, {duration: 600}),
        withTiming(-80, {duration: 600}),
      ),
      -1,
      true,
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.4, {duration: 500}),
        withTiming(0.7, {duration: 500}),
      ),
      -1,
      true,
    );
    rotate.value = withRepeat(withTiming(360, {duration: 800}), -1, false);
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {duration: 400}),
        withTiming(1, {duration: 400}),
      ),
      -1,
      true,
    );
    colorProgress.value = withRepeat(
      withTiming(1, {duration: 1200}),
      -1,
      true,
    );
  }, [translateX, scale, rotate, opacity, colorProgress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {scale: scale.value},
        {rotate: `${rotate.value}deg`},
      ],
      opacity: opacity.value,
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 0.5, 1],
        ['#6366f1', '#ec4899', '#f59e0b'],
      ),
    };
  });

  return (
    <View style={styles.animationArea}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
}

// 主屏:动画区 + 计数对比区
export default function PauseCommitDemo() {
  const [running, setRunning] = React.useState(false);
  const [actualCount, setActualCount] = React.useState(0);

  // referenceCount:UI 线程基准,useFrameCallback 按经过时间累加
  // 每 300ms +1,不触发 RN 提交
  const refCount = useSharedValue(0);
  const refCountText = useDerivedValue(() => {
    return `${Math.floor(refCount.value)}`;
  });

  // 进度条:UI 线程驱动,每 300ms 一个周期(0→1 锯齿)
  const progress = useSharedValue(0);
  useFrameCallback((info: FrameInfo) => {
    const dt = info.timeSincePreviousFrame ?? 16;
    refCount.value += dt / 300;
    progress.value = (progress.value + dt / 300) % 1;
  });

  // actualCount:RN setState,每 300ms +1,纯 RN 提交路径(被观察对象)
  useEffect(() => {
    const timer = setInterval(() => {
      setActualCount(c => c + 1);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PauseCommit 对比 Demo</Text>

      {/* 上区:动画方块(条件渲染,卸载时 PropsRegistry 移除节点) */}
      <View style={styles.animationContainer}>
        {running ? (
          <AnimationBlock />
        ) : (
          <Text style={styles.placeholder}>动画已停止</Text>
        )}
      </View>

      <Button
        title={running ? '停止动画' : '启动动画'}
        onPress={() => setRunning(r => !r)}
        color={running ? '#e53e3e' : '#6366f1'}
      />

      {/* 下区:计数对比 */}
      <View style={styles.counterArea}>
        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>referenceCount:</Text>
          <AnimatedText text={refCountText} style={styles.counterRef} />
          <Text style={styles.counterDot}>🟢</Text>
        </View>
        <View style={styles.counterRow}>
          <Text style={styles.counterLabel}>actualCount:</Text>
          <Text style={styles.counterActual}>{actualCount}</Text>
          <Text style={styles.counterDot}>🔴</Text>
        </View>

        {/* 进度条:Reanimated 驱动,辅助肉眼对齐 */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
      </View>

      <View style={styles.hintArea}>
        <Text style={styles.hintTitle}>观察说明:</Text>
        <Text style={styles.hintText}>
          1. 动画停止时,两个计数同步走(300ms 一格){'\n'}
          2. 启动动画后,观察 actualCount 是否停滞/掉秒{'\n'}
          3. referenceCount 由 UI 线程驱动,不受影响{'\n'}
          4. 注释 pauseReanimatedCommits() 后差异更明显
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a202c',
    textAlign: 'center',
    paddingVertical: 15,
  },
  animationContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  animationArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  placeholder: {
    fontSize: 16,
    color: '#a0aec0',
  },
  counterArea: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  counterLabel: {
    fontSize: 16,
    color: '#4a5568',
    width: 160,
  },
  counterRef: {
    fontSize: 24,
    fontWeight: '700',
    color: '#22c55e',
    padding: 0,
    borderWidth: 0,
  },
  counterActual: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ef4444',
  },
  counterDot: {
    fontSize: 16,
    marginLeft: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  hintArea: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 20,
  },
});
```

- [ ] **Step 2: 运行 lint 验证语法**

Run: `npm run lint`
Expected: 无与 `PauseCommitDemo.tsx` 相关的 error(可能有现有文件的 warning,忽略即可)

如果出现 `'AnimatedText' is defined but never used` 之类的 error,检查导入路径是否正确。
如果出现 `interpolateColor` / `FrameInfo` 未导出的 error,确认 `@react-native-ohos/react-native-reanimated` 3.18.2 支持这些 API(参考 `example/ColorInterpolationExample.tsx` 和 `example/FrameCallbackExample.tsx`,已验证可用)。

- [ ] **Step 3: Commit**

```bash
git add tests/react-native-reanimated/PauseCommitDemo.tsx
git commit -m "feat: add PauseCommit visual comparison demo for pauseReanimatedCommits()"
```

---

## Task 2: 在 index.js 注册 Demo

**Files:**
- Modify: `index.js:87`

- [ ] **Step 1: 修改 index.js 注册入口**

将 `index.js` 第 87 行从:

```js
import App from "./tests/react-native-reanimated/ReanimateListDemo.tsx"
```

改为:

```js
import App from "./tests/react-native-reanimated/PauseCommitDemo.tsx"
```

其余注释行保持不变。

- [ ] **Step 2: 运行 lint 验证**

Run: `npm run lint`
Expected: 无 error

- [ ] **Step 3: Commit**

```bash
git add index.js
git commit -m "chore: register PauseCommitDemo as app entry"
```

---

## Task 3: 人工验证流程

> 本 Task 不改代码,是操作指引。需 DevEco Studio + 真机/模拟器。

- [ ] **Step 1: 基线验证(不注释 pauseReanimatedCommits)**

1. 确认 `harmony/library/oh_modules/@react-native-ohos/react-native-reanimated/src/main/cpp/Common/cpp/reanimated/Fabric/ReanimatedCommitHook.cpp` 第 94 行 `propsRegistry_->pauseReanimatedCommits();` **未被注释**。
2. DevEco Studio 构建 → 安装到设备。
3. 启动 Metro:`npm run start`
4. 进入 Demo,点"启动动画"。
5. 观察:两个计数基本同步(`actualCount` 轻微落后属正常,无明显停滞)。
6. 点"停止动画",确认恢复同步。

- [ ] **Step 2: 对照验证(注释 pauseReanimatedCommits)**

1. 编辑 `ReanimatedCommitHook.cpp`,注释第 94 行:
   ```cpp
   // propsRegistry_->pauseReanimatedCommits();
   ```
   (可连同第 93 行 LOG 一并注释)
2. DevEco Studio **重新构建** → 安装到设备。
3. 进入 Demo,点"启动动画"。
4. 观察:`actualCount` 出现明显停滞/掉秒,落后 `referenceCount` 越来越多。
5. 点"停止动画",确认 `actualCount` 恢复同步。

- [ ] **Step 3: 对比结论**

两次对比应能看出:
- **不注释**:RN 提交及时上屏(Reanimated 让路)。
- **注释后**:RN 提交被 Reanimated 高频提交挤兑,上屏延迟。

> 注意:差异是概率性的,若不明显可把 `AnimationBlock` 中动画 `duration` 调短(如 200ms)加重负载后重新验证。

---

## Self-Review

### Spec coverage

| Spec 要求 | 对应 Task |
|-----------|-----------|
| 上区:Reanimated 高频动画,5 prop | Task 1 Step 1 — `AnimationBlock` |
| 启停用条件渲染 | Task 1 Step 1 — `{running ? <AnimationBlock /> : ...}` |
| actualCount:setInterval 300ms setState | Task 1 Step 1 — `useEffect` |
| referenceCount:useFrameCallback UI 线程 | Task 1 Step 1 — `useFrameCallback` + `useDerivedValue` |
| 进度条:Reanimated 驱动 | Task 1 Step 1 — `progressStyle` |
| AnimatedText 显示基准计数 | Task 1 Step 1 — `import {AnimatedText}` |
| 关键不变量:referenceCount 不触发 RN 提交 | Task 1 — `useFrameCallback` + `AnimatedText`(useAnimatedProps)全在 UI 线程 |
| 关键不变量:actualCount 走 setState | Task 1 — `setActualCount` |
| index.js 注册 | Task 2 |
| 验证流程:基线(不注释) | Task 3 Step 1 |
| 验证流程:对照(注释) | Task 3 Step 2 |
| 已知局限:概率性,可调 duration | Task 3 Step 3 备注 |

### Placeholder scan

无 TBD/TODO。所有代码块均为完整可执行代码。

### Type consistency

- `refCount`: `SharedValue<number>` — 由 `useSharedValue(0)` 创建,在 `useFrameCallback` 中 `+= dt / 300`。
- `refCountText`: `SharedValue<string>` — 由 `useDerivedValue(() => `${Math.floor(refCount.value)}`)` 创建,传给 `AnimatedText` 的 `text` prop(`SharedValue<string>`)。✓
- `progress`: `SharedValue<number>` — 由 `useSharedValue(0)` 创建,在 `useFrameCallback` 中 `% 1` 循环,由 `useAnimatedStyle` 读取为 `width`。✓
- `actualCount`: `number` — RN state,由 `setActualCount(c => c + 1)` 更新。✓
