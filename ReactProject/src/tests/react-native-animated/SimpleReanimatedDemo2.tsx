import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
  useAnimatedProps,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';

/**
 * Reanimated 简单 Demo 2
 * 演示场景：
 *   1. 卡片 3D 翻转（rotateY + perspective）
 *   2. 进度条动画（interpolate + withTiming）
 *   3. 计数器：useDerivedValue + runOnJS 回调
 */
export default function SimpleReanimatedDemo2() {
  // ===== 1. 卡片翻转 =====
  const flip = useSharedValue(0); // 0 正面, 1 背面

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(flip.value, [0, 1], [0, 180])}deg` },
    ],
    opacity: flip.value < 0.5 ? 1 : 0,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(flip.value, [0, 1], [180, 360])}deg` },
    ],
    opacity: flip.value >= 0.5 ? 1 : 0,
  }));

  const toggleFlip = () => {
    flip.value = withTiming(flip.value === 0 ? 1 : 0, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  };

  // ===== 2. 进度条 =====
  const progress = useSharedValue(0);

  const barStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progress.value, [0, 1], [0, 100])}%`,
  }));

  const fillProgress = () => {
    progress.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.cubic) });
  };

  const resetProgress = () => {
    progress.value = withTiming(0, { duration: 300 });
  };

  // ===== 3. useDerivedValue + runOnJS =====
  const count = useSharedValue(0);
  const displayCount = useDerivedValue(() => Math.round(count.value));

  const startCount = () => {
    count.value = 0;
    count.value = withTiming(100, { duration: 2000 }, (finished) => {
      if (finished) {
        runOnJS(alert)(`计数完成: ${Math.round(count.value)}`);
      }
    });
  };

  const countStyle = useAnimatedStyle(() => ({
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4a90d9',
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated 简单 Demo 2</Text>

      {/* 1. 卡片翻转 */}
      <View style={styles.section}>
        <Text style={styles.label}>1. 卡片 3D 翻转</Text>
        <View style={styles.cardStage}>
          <Animated.View style={[styles.card, styles.cardFront, frontStyle]}>
            <Text style={styles.cardText}>正面</Text>
          </Animated.View>
          <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
            <Text style={styles.cardText}>背面</Text>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={toggleFlip}>
          <Text style={styles.btnText}>翻转卡片</Text>
        </TouchableOpacity>
      </View>

      {/* 2. 进度条 */}
      <View style={styles.section}>
        <Text style={styles.label}>2. 进度条动画</Text>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, barStyle]} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, styles.btnHalf]} onPress={fillProgress}>
            <Text style={styles.btnText}>填充</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnHalf, styles.btnGray]}
            onPress={resetProgress}>
            <Text style={styles.btnText}>重置</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. 计数器 */}
      <View style={styles.section}>
        <Text style={styles.label}>3. useDerivedValue + runOnJS 回调</Text>
        <View style={styles.countStage}>
          <Animated.Text style={countStyle}>
            {displayCount.value}
          </Animated.Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={startCount}>
          <Text style={styles.btnText}>开始计数 0→100</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  // 卡片
  cardStage: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: 140,
    height: 180,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: '#4a90d9',
  },
  cardBack: {
    backgroundColor: '#ff9500',
  },
  cardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // 进度条
  barTrack: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#34c759',
    borderRadius: 10,
  },
  // 计数器
  countStage: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  // 按钮
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
  btnGray: {
    backgroundColor: '#999',
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
