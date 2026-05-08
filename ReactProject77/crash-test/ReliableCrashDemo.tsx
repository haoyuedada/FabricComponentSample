/**
 * 可靠复现 PropsRegistry 析构崩溃的 Demo
 *
 * 核心策略：
 * 1. 创建大量 Animated.View 组件（增加 PropsRegistry 中的 ShadowNode 数量）
 * 2. 每个组件都有独立的高频动画（确保 performOperations 持续调用）
 * 3. 使用极短的动画周期（16ms）确保 reload 时动画正在执行
 * 4. 在 reload 前触发一次 runOnUI，确保 UI 队列有待执行任务
 */

import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Button, DevSettings, ScrollView} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  runOnUI,
  Easing,
} from 'react-native-reanimated';

// 单个动画组件
function AnimatedBox({index}: {index: number}) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    // 极短周期动画（16ms = 60fps），确保 reload 时正在执行
    translateX.value = withRepeat(
      withTiming(50, {duration: 16, easing: Easing.linear}),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withTiming(0.5, {duration: 16, easing: Easing.linear}),
      -1,
      true,
    );

    scale.value = withRepeat(
      withTiming(1.2, {duration: 16, easing: Easing.linear}),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {scale: scale.value},
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <Text style={styles.boxText}>{index}</Text>
    </Animated.View>
  );
}

export default function ReliableCrashDemo({onGoBack}: {onGoBack: () => void}) {
  const reloadCountRef = useRef(0);

  useEffect(() => {
    // 持续调度 runOnUI 任务，确保 UI 队列始终有待执行的 lambda
    const scheduleLoop = () => {
      runOnUI(() => {
        'worklet';
        // 空操作，但这个 lambda 会被调度到 UI 线程
        // 当 reload 时，如果这个 lambda 正在执行，strongThis 会触发析构
      })();
    };

    // 每 10ms 调度一次（比动画周期更频繁）
    const timer = setInterval(scheduleLoop, 10);

    return () => clearInterval(timer);
  }, []);

  const handleReload = () => {
    reloadCountRef.current += 1;
    console.log(`[Crash Demo] Reload attempt #${reloadCountRef.current}`);

    // 在 reload 前再调度一批 UI 任务，增加崩溃概率
    for (let i = 0; i < 10; i++) {
      runOnUI(() => {
        'worklet';
        // 这些 lambda 会在 reload 时仍在队列中
      })();
    }

    // 延迟 reload，确保上面的 runOnUI 已经入队
    setTimeout(() => {
      DevSettings.reload();
    }, 50);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>可靠崩溃复现 Demo</Text>
      <Text style={styles.subtitle}>
        {/* 创建 20 个并发动画组件 */}
        20 个组件 × 3 个动画 × 60fps = 3600 次/秒 PropsRegistry 更新
      </Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {Array.from({length: 20}, (_, i) => (
          <AnimatedBox key={i} index={i + 1} />
        ))}
      </ScrollView>

      <View style={styles.controls}>
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ 崩溃触发条件</Text>
          <Text style={styles.warningText}>
            • 20 个组件正在高频动画（16ms 周期）{'\n'}
            • runOnUI 每 10ms 调度一次{'\n'}
            • reload 前额外调度 10 个 UI 任务{'\n'}
            • 确保 reload 时 UI 队列有正在执行的 lambda
          </Text>
        </View>

        <Button
          title="🔥 触发崩溃 (Reload)"
          onPress={handleReload}
          color="#dc2626"
        />

        <Text style={styles.hint}>
          如果第一次没崩溃，多点几次。{'\n'}
          崩溃概率取决于 reload 时 UI 线程的执行状态。
        </Text>

        <Button
          title="← 安全返回"
          onPress={onGoBack}
          color="#64748b"
        />
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugTitle}>预期崩溃堆栈片段：</Text>
        <Text style={styles.debugText}>
          #03 PropsRegistry::__on_zero_shared(){'\n'}
          #04 ReanimatedModuleProxy::~ReanimatedModuleProxy(){'\n'}
          #05 scheduleOnUI lambda $_9::operator()(){'\n'}
          #06 ReanimatedUIScheduler::scheduleOnUI(){'\n'}
          #07 EventLoopTaskRunner::executeTask()
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  boxText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  controls: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  warningBox: {
    backgroundColor: '#7f1d1d',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fca5a5',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 11,
    color: '#fca5a5',
    lineHeight: 16,
  },
  hint: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 16,
  },
  debugInfo: {
    backgroundColor: '#1e293b',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  debugTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 6,
  },
  debugText: {
    fontSize: 9,
    color: '#64748b',
    fontFamily: 'monospace',
    lineHeight: 12,
  },
});
