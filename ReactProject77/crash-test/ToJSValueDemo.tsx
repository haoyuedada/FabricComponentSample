import React from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import {executeOnUIRuntimeSync} from 'react-native-reanimated';

/**
 * 最简 Demo：走进 ShareableWorklet::toJSValue
 *
 * executeOnUIRuntimeSync 在 UI Runtime 执行 worklet，
 * 执行完毕后通过 shareableResult->toJSValue(rt) 将结果序列化回 JS Runtime。
 * worklet 返回另一个 worklet → 进入 ShareableWorklet::toJSValue 分支。
 */
const getWorkletFromUI = executeOnUIRuntimeSync((): ((v: number) => number) => {
  'worklet';
  return (v: number) => {
    'worklet';
    console.log('worklet called with:', v);
    return v * 2;
  };
});

export default function ToJSValueDemo({onGoBack}: {onGoBack: () => void}) {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="← 返回" onPress={onGoBack} color="#6366f1" />
      <View style={styles.content}>
        <Text style={styles.title}>ShareableWorklet::toJSValue</Text>
        <Text style={styles.desc}>
          点击按钮，executeOnUIRuntimeSync 执行 worklet 后，结果通过
          toJSValue 序列化回 JS 线程。
        </Text>
        <Button
          title="触发 toJSValue"
          onPress={() => {
            const fn = getWorkletFromUI();
            console.log('returned worklet:', typeof fn);
          }}
          color="#8b5cf6"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0f172a'},
  content: {flex: 1, padding: 16, justifyContent: 'center'},
  title: {color: '#e2e8f0', fontSize: 18, fontWeight: '700', marginBottom: 8},
  desc: {color: '#94a3b8', fontSize: 13, lineHeight: 20, marginBottom: 24},
});
