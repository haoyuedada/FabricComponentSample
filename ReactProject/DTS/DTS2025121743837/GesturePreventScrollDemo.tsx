import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";

export default function GesturePreventScrollDemo() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [gestureActive, setGestureActive] = useState(false);

  // 自定义手势
  const customGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      console.log("手势开始");
      runOnJS(setGestureActive)(true);
    })
    .onUpdate(event => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      'worklet';
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(setGestureActive)(false);
    })
    .onFinalize(() => {
      'worklet';
      runOnJS(setGestureActive)(false);
    });

  // 滚动手势 - 要求自定义手势失败才会激活
  const scrollGesture = Gesture.Native()
    .requireExternalGestureToFail(customGesture);

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>手势阻止滚动演示</Text>
      <Text style={styles.subtitle}>
        手势状态: {gestureActive ? '🟢 手势激活 - ScrollView不能滑动' : '🔴 手势未激活 - ScrollView可以滑动'}
      </Text>

      <Text style={styles.instruction}>
        🔵 蓝色方块：可拖拽的手势区域
        {"\n"}🔴 红色区域：ScrollView（只有手势未激活时可滑动）
      </Text>

      {/* 使用 GestureDetector 包裹整个布局 */}
      <GestureDetector gesture={Gesture.Simultaneous(customGesture, scrollGesture)}>
        <View style={styles.content}>
          {/* 可拖拽的手势区域 */}
          <Animated.View style={[styles.gestureBox, animatedStyle]}>
            <Text style={styles.gestureBoxText}>拖拽我</Text>
          </Animated.View>

          {/* ScrollView */}
          <View style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
              {Array(20).fill(0).map((_, index) => (
                <View key={index} style={styles.scrollItem}>
                  <Text style={styles.scrollItemText}>Item {index + 1}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.note}>
            💡 当你正在拖拽蓝色方块时（手势激活），ScrollView 无法滑动。
            {"\n"}只有当手势结束（蓝色方块弹回原位）后，ScrollView 才能滑动。
          </Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888',
    lineHeight: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  gestureBox: {
    width: 150,
    height: 150,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  gestureBoxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollItem: {
    height: 80,
    backgroundColor: '#ff3b30',
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollItemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    lineHeight: 18,
  },
});
