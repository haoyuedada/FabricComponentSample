/**
 * 极简崩溃复现 - 基于 AnimatedComponent1.tsx
 *
 * 策略：
 * 1. 极短动画周期（16ms）确保 reload 时动画正在执行
 * 2. 多个组件确保 PropsRegistry 中有足够的 ShadowNode
 * 3. 持续 runOnUI 确保 UI 队列始终有待执行任务
 */

import Animated, {useSharedValue, withRepeat, withTiming, runOnUI} from 'react-native-reanimated';
import {useEffect} from 'react';
import {View, Button, Text, DevSettings, StyleSheet} from 'react-native';

function AnimatedItem({id}: {id: number}) {
  const x = useSharedValue(0);

  useEffect(() => {
    // 极短周期：16ms = 60fps，确保 reload 时正在执行
    x.value = withRepeat(withTiming(100, {duration: 16}), -1, true);
  }, []);

  return (
    <Animated.View
      style={{
        width: 50,
        height: 50,
        backgroundColor: '#6366f1',
        margin: 5,
        transform: [{translateX: x}],
      }}
    />
  );
}

export default function MinimalCrashDemo() {
  useEffect(() => {
    // 持续调度 runOnUI，确保 reload 时 UI 队列有正在执行的 lambda
    const timer = setInterval(() => {
      runOnUI(() => {
        'worklet';
        // 空操作，但 lambda 会持有 weakThis
      })();
    }, 10); // 每 10ms 调度一次

    return () => clearInterval(timer);
  }, []);

  const handleCrash = () => {
    // reload 前再调度一批任务，增加崩溃概率
    for (let i = 0; i < 20; i++) {
      runOnUI(() => {
        'worklet';
      })();
    }

    // 延迟 reload，确保上面的任务已入队
    setTimeout(() => DevSettings.reload(), 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>极简崩溃复现</Text>
      <Text style={styles.desc}>
        10 个组件 × 60fps 动画 + 100Hz runOnUI 调度
      </Text>

      <View style={styles.grid}>
        {Array.from({length: 10}, (_, i) => (
          <AnimatedItem key={i} id={i} />
        ))}
      </View>

      <Button title="🔥 触发崩溃" onPress={handleCrash} color="#dc2626" />
      <Text style={styles.hint}>
        如果没崩溃，多点几次。崩溃是时序相关的竞态条件。
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 8,
  },
  desc: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  hint: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 12,
  },
});
