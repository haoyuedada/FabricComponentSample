import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
  withPause,
  useDerivedValue,
} from 'react-native-reanimated';

/**
 * Reanimated 简单 Demo
 * 演示 useSharedValue / useAnimatedStyle / withTiming / withSpring / withRepeat /
 * withSequence / useDerivedValue / 手势拖拽 等常用 API
 */
export default function SimpleReanimatedDemo() {
  // ===== 1. 平移 + 缩放（withTiming / withSpring） =====
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
      ],
    };
  });

  const toggleMove = () => {
    if (translateX.value === 0) {
      translateX.value = withSpring(120);
      scale.value = withTiming(1.5, { duration: 400 });
    } else {
      translateX.value = withSpring(0);
      scale.value = withTiming(1, { duration: 400 });
    }
  };

  // ===== 2. 循环旋转动画（withRepeat + withTiming） =====
  const rotation = useSharedValue(0);
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(rotation.value, [0, 1], [0, 360])}deg` }],
  }));

  const startSpin = () => {
    // 取消上一次动画再重新开始，可重复点击
    rotation.value = 0;
    rotation.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1, // -1 表示无限循环
      false,
    );
  };

  const stopSpin = () => {
    rotation.value = withPause(rotation, false).value; // 停在当前角度
    // 直接重新赋值以打断 repeat
    rotation.value = rotation.value;
  };

  // ===== 3. 闪烁/呼吸动画（withSequence 组合） =====
  const opacity = useSharedValue(1);
  const breathStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: interpolate(opacity.value, [0.3, 1], [0.8, 1.1]) }],
  }));

  const startBreath = () => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800 }),
        withTiming(1, { duration: 800 }),
      ),
      -1,
      true, // reverse 每次反向播放
    );
  };

  // ===== 4. 手势拖拽（Gesture + useAnimatedStyle） =====
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value }, { translateY: dragY.value }],
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      dragX.value = e.translationX;
      dragY.value = e.translationY;
    })
    .onEnd(() => {
      dragX.value = withSpring(0);
      dragY.value = withSpring(0);
    });

  // ===== 5. useDerivedValue 派生值 =====
  const derived = useDerivedValue(() => `${Math.round(scale.value * 100)}%`);

  const derivedStyle = useAnimatedStyle(() => ({
    fontSize: 16 + scale.value * 8,
  }));

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Reanimated 简单 Demo</Text>

        {/* 1. 平移 + 缩放 */}
        <View style={styles.section}>
          <Text style={styles.label}>1. withSpring / withTiming 平移+缩放</Text>
          <View style={styles.stage}>
            <AnimatedBox style={[styles.box, styles.boxBlue, boxStyle]} />
          </View>
          <TouchableOpacity style={styles.btn} onPress={toggleMove}>
            <Text style={styles.btnText}>移动 / 复位</Text>
          </TouchableOpacity>
        </View>

        {/* 2. 循环旋转 */}
        <View style={styles.section}>
          <Text style={styles.label}>2. withRepeat 无限旋转</Text>
          <View style={styles.stage}>
            <AnimatedBox style={[styles.box, styles.boxGreen, spinStyle]} />
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.btnHalf]} onPress={startSpin}>
              <Text style={styles.btnText}>开始旋转</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnHalf]} onPress={stopSpin}>
              <Text style={styles.btnText}>停止</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. 呼吸闪烁 */}
        <View style={styles.section}>
          <Text style={styles.label}>3. withRepeat + withSequence 呼吸</Text>
          <View style={styles.stage}>
            <AnimatedBox style={[styles.box, styles.boxOrange, breathStyle]} />
          </View>
          <TouchableOpacity style={styles.btn} onPress={startBreath}>
            <Text style={styles.btnText}>开始呼吸</Text>
          </TouchableOpacity>
        </View>

        {/* 4. 手势拖拽 */}
        <View style={styles.section}>
          <Text style={styles.label}>4. Gesture.Pan 手势拖拽（松手回弹）</Text>
          <View style={styles.stage}>
            <GestureDetector gesture={panGesture}>
              <AnimatedBox style={[styles.box, styles.boxPurple, dragStyle]} />
            </GestureDetector>
          </View>
        </View>

        {/* 5. useDerivedValue */}
        <View style={styles.section}>
          <Text style={styles.label}>5. useDerivedValue 派生值</Text>
          <AnimatedBox style={[styles.derivedText, derivedStyle]}>
            <Text>scale: {derived.value}</Text>
          </AnimatedBox>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

/**
 * 简单封装：避免每次手写 Reanimated.View
 */
function AnimatedBox({ style, children }: { style: any; children?: React.ReactNode }) {
  const Reanimated = require('react-native-reanimated').default;
  return <Reanimated.View style={style}>{children}</Reanimated.View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#333',
  },
  section: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  stage: {
    height: 100,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  boxBlue: { backgroundColor: '#4a90d9' },
  boxGreen: { backgroundColor: '#34c759' },
  boxOrange: { backgroundColor: '#ff9500' },
  boxPurple: { backgroundColor: '#af52de' },
  derivedText: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  btn: {
    marginTop: 8,
    backgroundColor: '#4a90d9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnHalf: {
    flex: 1,
    marginHorizontal: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
