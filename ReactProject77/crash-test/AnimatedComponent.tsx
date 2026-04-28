import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';

export default function AnimatedComponent({onGoBack}: {onGoBack: () => void}) {
  // 创建多个动画值（模拟真实应用中的复杂动画场景）
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);

  // 创建派生值（模拟 useDerivedValue 的使用）
  const opacity = useDerivedValue(() => {
    return 0.5 + progress.value * 0.5;
  });

  // 创建动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {scale: scale.value},
        {rotate: `${rotation.value}deg`},
      ],
      opacity: opacity.value,
    };
  });

  // 启动并发动画（组件挂载时）
  useEffect(() => {
    // Spring 动画：持续弹跳（模拟用户交互动画）
    translateX.value = withRepeat(
      withSequence(
        withSpring(100, {damping: 10, stiffness: 100}),
        withSpring(-100, {damping: 10, stiffness: 100}),
      ),
      -1, // infinite
      true, // reverse
    );

    scale.value = withRepeat(
      withSequence(
        withSpring(1.5, {damping: 8}),
        withSpring(0.8, {damping: 8}),
      ),
      -1,
      true,
    );

    // Timing 动画：无限旋转（模拟进度动画）
    rotation.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1,
      false,
    );

    // DerivedValue 动画：进度变化
    progress.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 3000, easing: Easing.ease}),
        withTiming(0, {duration: 3000, easing: Easing.ease}),
      ),
      -1,
      true,
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>并发动画运行中...</Text>

      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.boxText}>触发崩溃</Text>
      </Animated.View>

      <Text style={styles.warning}>⚠️ 点击返回时动画仍在运行</Text>

      <Button title="返回（触发崩溃）" onPress={onGoBack} color="red" />

      <Text style={styles.hint}>
        在动画运行时返回会触发 PropsRegistry 析构崩溃
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 20,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  warning: {
    fontSize: 14,
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  hint: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginTop: 15,
  },
});
