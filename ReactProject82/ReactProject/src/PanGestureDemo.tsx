import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

/**
 * 简单 Pan 手势 Demo
 * 目的：验证 onUpdate 回调是否及时 —— 手指拖动时方块实时跟随
 */
export default function PanGestureDemo() {
  // 记录 translationY 累计偏移
  const translateY = useSharedValue(0);
  // 记录上次结束时的位置，用于下次拖动续接
  const lastY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
        console.log('onUpdate translationY:', e.translationY);
      // onUpdate 在 worklet 线程执行，直接写 SharedValue
      translateY.value = lastY.value + e.translationY;
    })
    .onEnd(() => {
      // 手松开时保存当前位置
      lastY.value = translateY.value;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}> 
      <View style={styles.bg}>
        {/* 刻度线，方便观察跟随延迟 */}
        {[0, 100, 200, 300, 400].map((y) => (
          <View key={y} style={[styles.tick, { top: y }]} />
        ))}

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <Text style={styles.boxText}>拖我</Text>
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintText}>
          用手指上下拖动方块，观察是否实时跟随。
        </Text>
        <Text style={styles.hintText}>
          若 onUpdate 及时，方块无卡顿地贴住手指。
        </Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bg: {
    flex: 1,
    position: 'relative',
  },
  tick: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#ccc',
  },
  box: {
    position: 'absolute',
    top: 100,
    left: 100,
    width: 120,
    height: 120,
    backgroundColor: '#4a90d9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    padding: 16,
    backgroundColor: '#fff',
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
