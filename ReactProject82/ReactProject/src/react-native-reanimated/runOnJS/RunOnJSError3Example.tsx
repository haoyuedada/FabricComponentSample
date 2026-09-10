/**
 * 错误写法 3：在 Gesture/UI 回调体内定义内联回调再 runOnJS（cb 应放外边）
 *
 * 问题描述：
 *   在 Gesture 回调（如 `Gesture.Pan().onChange`，本质是 worklet 作用域）体内
 *   定义内联回调 `cb` 再传给 `runOnJS(cb)()`，
 *   `cb` 被当作 worklet 捕获，JS 线程永远执行不到 `cb` 的函数体。
 *
 * 正确做法：
 *   把 `cb` 提到组件体顶层（worklet/UI 回调作用域之外）声明为普通函数，
 *   再在 Gesture 回调内 `runOnJS(cb)()`。
 *   详见同目录 doc/reanimated_error_ref.md「正确写法」。
 */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from '@react-native-ohos/react-native-gesture-handler';
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from '@react-native-ohos/react-native-reanimated';

export default function RunOnJSError3Example() {
  const [status, setStatus] = useState('未触发');
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // ✅ 正确：cb 放在外边 —— JS 线程普通函数，声明在 Gesture 回调作用域之外
  const cb = () => {
    setStatus('✅ PanGesture 正确用法：cb 已在 JS 线程执行');
  };

  // ❌ 错误写法 3：在 Gesture 回调体内定义内联回调再 runOnJS（cb 应放外边）
  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
      console.log('PanGestureRepro onChange', event.translationX);
      const cb = () => { // ❌ 放在外边才对
        console.log('PanGestureRepro cb--ing');
        setStatus('❌ 错误3：内联 cb 在 JS 线程执行了（不应该发生）');
      };
      runOnJS(cb)();
    });

  // 对照组：正确用法 —— cb 定义在外部，Gesture 回调内直接 runOnJS(cb)()
  const panCorrect = Gesture.Pan()
    .onBegin(() => {
      console.log("chy Gesture.Pan().onBegin")
    })
    .onChange((event) => {
      translateX.value = withSpring(event.translationX);
      console.log("chy Gesture.Pan().onChange")
      runOnJS(cb)();
    });

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>错误3：Gesture 回调内定义内联 cb</Text>
        <Text style={styles.status}>{status}</Text>

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </GestureDetector>

        <GestureDetector gesture={panCorrect}>
          <View style={styles.dragArea}>
            <Text style={styles.dragHint}>对照组：正确写法（拖我）</Text>
          </View>
        </GestureDetector>

        <Text style={styles.hint}>
          上面方块：错误3 写法，拖动时内联 cb 不会在 JS 线程执行；
          下面区域：正确写法，拖动时 cb 正常回调并更新状态。
        </Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  dragArea: {
    width: 260,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dragHint: {
    fontSize: 13,
    color: '#666',
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#B58DF1',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});
