import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";

export default function GestureHandlerDemo1() {
  const translateX = useSharedValue(0);
  const gestureState = useSharedValue('idle');
  const startX = useSharedValue(0);
  const [stateText, setStateText] = useState('等待手势');

  // 更新状态文字的函数
  const updateStateText = (text: string) => {
    setStateText(text);
  };

  // 定义手势
  const panGesture = Gesture.Pan()
    .onBegin(event => {
      'worklet';
      gestureState.value = 'begin';
      startX.value = event.x; // 保存初始位置
      console.log("chy onBegin startX：", startX.value)
      runOnJS(updateStateText)('手势开始');
    })
    .onTouchesMove((event, manager) => {
      'worklet';
      // 简单的逻辑：根据滑动距离决定是否激活或失败手势
      const distance = Math.abs(event.changedTouches[0].x - startX.value);
      console.log("chy onTouchesMove distance：", distance)

      if (distance < 50) {
        // 滑动距离不足，激活手势
        manager.activate();
        gestureState.value = 'activated';
        translateX.value = event.changedTouches[0].x - startX.value;
        runOnJS(updateStateText)('手势已激活');
      } else {
        // 滑动距离过大，失败手势
        manager.fail();
        gestureState.value = 'failed';
        translateX.value = withSpring(0);
        runOnJS(updateStateText)('手势已失败');
      }
    })
    .onFinalize(() => {
      'worklet';
      gestureState.value = 'idle';
      translateX.value = withSpring(0);
      runOnJS(updateStateText)('等待手势');
    })
    .manualActivation(true) // 启用手动激活
    .minDistance(0); // 允许最小滑动距离

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>手势处理演示</Text>
        <Text style={styles.subtitle}>滑动方块进行测试</Text>

        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>
            手势状态: {stateText}
          </Text>
        </View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <Text style={styles.boxText}>滑动我</Text>
          </Animated.View>
        </GestureDetector>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            • 滑动距离 小于等于 50px - 手势激活
          </Text>
          <Text style={styles.instructionText}>
            • 滑动距离 ≥ 50px - 手势失败
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  stateContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructions: {
    marginTop: 40,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
