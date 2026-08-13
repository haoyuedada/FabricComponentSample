import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GestureDetector, Gesture, GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';

const THUMB_SIZE = 40;

/**
 * Pan 手势 hitSlop 使用用例
 *
 * hitSlop 用于扩大手势的触摸响应区域，使得即使手指没有直接按在视图上，
 * 只要落在 hitSlop 扩展后的矩形区域内，手势也能被识别。
 *
 * 本示例展示三种 hitSlop 配置的对比：
 * 1. hitSlop = 0（无扩展，只能精确按在方块上才能拖动）
 * 2. hitSlop = 30（四边各扩展 30px，更容易抓住方块）
 * 3. hitSlop = {top: 60, bottom: 60, left: 10, right: 10}（非对称扩展）
 */
const HitSlopDemo = ({
  label,
  hitSlop,
  color,
}: {
  label: string;
  hitSlop: number | {top: number; bottom: number; left: number; right: number};
  color: string;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isActive = useSharedValue(false);
  const lastOffset = useRef({x: 0, y: 0}).current;

  const pan = Gesture.Pan()
    .hitSlop(hitSlop) // ← 核心：设置 hitSlop 扩大手势识别区域
    .onBegin(() => {
      isActive.value = true;
    })
    .onUpdate((e) => {
      translateX.value = lastOffset.x + e.translationX;
      translateY.value = lastOffset.y + e.translationY;
    })
    .onEnd((e) => {
      lastOffset.x += e.translationX;
      lastOffset.y += e.translationY;
      isActive.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: withSpring(isActive.value ? 1.2 : 1)},
      ],
      backgroundColor: isActive.value ? '#ff6b6b' : color,
    };
  });

  return (
    <View style={styles.demoContainer}>
      <Text style={styles.label}>{label}</Text>
      {/* 可视化 hitSlop 区域（仅用于展示，实际使用时不需要这个边框） */}
      <View style={styles.hitSlopVisualContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.thumb, animatedStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
};

const App2 = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Gesture.Pan() hitSlop 示例</Text>
        <Text style={styles.subtitle}>
          尝试在方块周围的虚线区域内按下并拖动，观察不同 hitSlop 的效果
        </Text>
      </View>

      <HitSlopDemo
        label="hitSlop = 0（无扩展区域）"
        hitSlop={0}
        color="#3498db"
      />

      <HitSlopDemo
        label="hitSlop = 30（四边各扩展 30px）"
        hitSlop={30}
        color="#2ecc71"
      />

      <HitSlopDemo
        label="hitSlop = {top:60, bottom:60, left:10, right:10}"
        hitSlop={{top: 60, bottom: 60, left: 10, right: 10}}
        color="#9b59b6"
      />
    </GestureHandlerRootView>
  );
};

export default App2;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  demoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  // 这个容器用于可视化 hitSlop 的扩展区域
  // 虚线边框代表扩展后的触摸区域
  hitSlopVisualContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    padding: 60, // 给 hitSlop 区域留出可视化空间
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
});
