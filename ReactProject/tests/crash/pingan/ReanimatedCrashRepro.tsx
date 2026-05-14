/**
 * Reanimated ShareableWorklet 竞态崩溃复现 Demo
 *
 * 崩溃场景：
 * ShareableWorklet::toJSValue 和 ShareableObject::toJSValue 递归展开嵌套 worklet 对象时，
 * 如果 JS Runtime 正在被销毁（页面卸载），会导致 Hermes 引擎内部访问无效内存而 crash。
 *
 * 复现策略：
 * 1. 构造深层嵌套 worklet（worklet 闭包捕获其他 worklet 和复杂对象）
 * 2. 高频调用 runOnUI 将 worklet 调度到 UI 线程
 * 3. 快速反复挂载/卸载组件，制造 runtime teardown 与 worklet 执行的竞态窗口
 */

import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  runOnUI,
  runOnJS,
} from 'react-native-reanimated';

// ============================================================
// 构造深层嵌套的复杂对象，增加 ShareableObject::toJSValue 遍历时间
// ============================================================
function createNestedObject(depth: number): Record<string, any> {
  if (depth <= 0) {
    return {
      value: Math.random(),
      label: 'leaf_node_' + Math.random().toString(36),
      timestamp: Date.now(),
      flags: [true, false, true, false],
      metadata: {x: 1, y: 2, z: 3},
    };
  }
  return {
    left: createNestedObject(depth - 1),
    right: createNestedObject(depth - 1),
    data: {
      id: depth,
      name: 'node_' + depth,
      values: Array.from({length: 10}, (_, i) => i * depth),
    },
  };
}

// ============================================================
// 子组件：包含深层嵌套 worklet 的动画组件
// 每次挂载时会高频调度 worklet 到 UI 线程
// ============================================================
const AnimatedChild: React.FC<{id: number}> = ({id}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // 启动多个并行动画，增加 UI 线程负载
    translateX.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 200}),
        withTiming(-100, {duration: 200}),
      ),
      -1,
      true,
    );
    translateY.value = withRepeat(
      withSequence(
        withTiming(50, {duration: 150}),
        withTiming(-50, {duration: 150}),
      ),
      -1,
      true,
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, {duration: 300}),
        withTiming(0.5, {duration: 300}),
      ),
      -1,
      true,
    );
    rotation.value = withRepeat(withTiming(360, {duration: 1000}), -1, false);
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {duration: 100}),
        withTiming(1, {duration: 100}),
      ),
      -1,
      true,
    );

    // 构造深层嵌套对象，这些会被 worklet 闭包捕获
    // 在 toJSValue 时需要递归展开所有层级
    const complexData = createNestedObject(4);
    const moreData = createNestedObject(3);

    // ============================================================
    // 关键：构造多层嵌套 worklet
    // workletC 被 workletB 捕获，workletB 被 workletA 捕获
    // 这模拟了 crash 栈中看到的 3 层 ShareableWorklet::toJSValue 递归
    // ============================================================
    const workletC = (data: any) => {
      'worklet';
      // 捕获外部复杂对象，增加 ShareableObject 遍历
      const _ref = data;
      const result = _ref.value || 0;
      return result + Math.random();
    };

    const workletB = (outerData: any, innerWorklet: any) => {
      'worklet';
      // 捕获另一个 worklet + 复杂对象
      const _outerRef = outerData;
      const _innerRef = innerWorklet;
      // 在 UI 线程执行嵌套 worklet
      const val = _innerRef(_outerRef.left || {value: 0});
      return val + (_outerRef.data?.id || 0);
    };

    const workletA = (
      dataA: any,
      dataB: any,
      nestedWorklet: any,
    ) => {
      'worklet';
      // 捕获两个复杂对象 + 一个嵌套 worklet
      const _a = dataA;
      const _b = dataB;
      const _nested = nestedWorklet;
      const result = _nested(_a, (d: any) => {
        'worklet';
        return d.value || Math.random();
      });
      return result;
    };

    // ============================================================
    // 高频调度：密集地将嵌套 worklet 发送到 UI 线程
    // 这增加了在组件卸载时仍有 worklet 在 UI 线程排队/执行的概率
    // ============================================================
    const intervalId = setInterval(() => {
      // 每次调度都创建新的 worklet 引用，增加 GC 压力
      const freshData = createNestedObject(3);

      runOnUI(() => {
        'worklet';
        // 在 UI 线程执行深层嵌套 worklet 调用
        // 这会触发 ShareableWorklet::toJSValue -> ShareableObject::toJSValue 递归
        const r = workletA(complexData, freshData, workletB);
        // 再次调用增加执行时间
        const r2 = workletB(moreData, workletC);
        // 使用结果防止优化掉
        translateX.value = (r + r2) * 0.001;
      })();
    }, 5); // 每 5ms 调度一次，非常激进

    // 额外的高频 runOnUI 调度
    const intervalId2 = setInterval(() => {
      runOnUI(() => {
        'worklet';
        const nested = {
          a: complexData,
          b: moreData,
          fn: workletC,
          fn2: workletB,
        };
        // 访问嵌套属性，触发更多 toJSValue
        const _touch = nested.a;
        const _touch2 = nested.b;
        scale.value = 1 + Math.random() * 0.01;
      })();
    }, 3);

    return () => {
      // 组件卸载时清理定时器
      // 但已经调度到 UI 线程的 worklet 仍会继续执行
      // 这就是竞态窗口：clearInterval 后，UI 线程可能还在处理之前排队的 worklet
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
      {rotate: `${rotation.value}deg`},
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.childBox, animatedStyle]}>
      <Text style={styles.childText}>#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 父组件：快速反复挂载/卸载子组件
// ============================================================
const ReanimatedCrashRepro: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [childCount, setChildCount] = useState(5);

  // 自动模式：快速反复挂载/卸载
  useEffect(() => {
    if (!autoMode) return;

    const toggle = setInterval(() => {
      setMounted(prev => !prev);
      setCycle(prev => prev + 1);
    }, 50); // 每 50ms 切换一次挂载状态，非常激进

    return () => clearInterval(toggle);
  }, [autoMode]);

  const handleStartAuto = useCallback(() => {
    setAutoMode(true);
  }, []);

  const handleStop = useCallback(() => {
    setAutoMode(false);
  }, []);

  const handleManualToggle = useCallback(() => {
    setMounted(prev => !prev);
    setCycle(prev => prev + 1);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated Crash Repro</Text>
      <Text style={styles.info}>
        Cycle: {cycle} | Mounted: {mounted ? 'YES' : 'NO'} | Children:{' '}
        {childCount}
      </Text>
      <Text style={styles.description}>
        此 Demo 通过深层嵌套 worklet + 高频 runOnUI + 快速挂载/卸载{'\n'}
        来复现 ShareableWorklet::toJSValue 竞态崩溃。{'\n'}
        点击 "Auto Toggle" 开始自动快速切换。
      </Text>

      <View style={styles.buttonRow}>
        <Button title="Auto Toggle (50ms)" onPress={handleStartAuto} />
        <Button title="Stop" onPress={handleStop} />
        <Button title="Manual Toggle" onPress={handleManualToggle} />
      </View>
      <View style={styles.buttonRow}>
        <Button
          title="More Children"
          onPress={() => setChildCount(c => c + 3)}
        />
        <Button
          title="Less Children"
          onPress={() => setChildCount(c => Math.max(1, c - 3))}
        />
      </View>

      <View style={styles.animationArea}>
        {mounted &&
          Array.from({length: childCount}, (_, i) => (
            <AnimatedChild key={`child-${cycle}-${i}`} id={i} />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560',
    textAlign: 'center',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#0f3460',
    backgroundColor: '#e8e8e8',
    padding: 8,
    borderRadius: 4,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  animationArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childBox: {
    width: 50,
    height: 50,
    backgroundColor: '#e94560',
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ReanimatedCrashRepro;
