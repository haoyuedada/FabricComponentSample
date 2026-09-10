/**
 * 错误写法 1：回调在 `scheduleOnUI` 的 worklet 体内定义后再 runOnJS
 *
 * 问题描述：
 *   在 worklet/UI 作用域内部定义的函数会被 reanimated 插件当作 worklet 处理，
 *   传给 runOnJS 的回调必须是「JS 线程的普通函数」。
 *   此处 `cb` 定义在 worklet 体内 → 回调被 worklet 捕获，
 *   `runOnJS(cb)('boom')` 调用后 JS 线程**永远执行不到** `cb` 的函数体。
 *
 * 正确做法：
 *   把 `cb` 提到 `scheduleOnUI` 外部声明（组件体顶层普通函数，不带 'worklet' 标记）。
 *   详见同目录 doc/reanimated_error_ref.md「正确写法」。
 */

import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { runOnJS } from '@react-native-ohos/react-native-reanimated';
import { scheduleOnUI } from 'react-native-worklets';

export default function RunOnJSError1Example() {
  const [status, setStatus] = useState('未触发');

  // ✅ 正确：JS 线程普通函数，声明在 worklet 作用域之外
  const rnCallback = (message: string) => {
    setStatus(`✅ rnCallback 已在 JS 线程执行（${message}）`);
  };

  // ❌ 错误写法 1：回调定义在 scheduleOnUI 的 worklet 体内，再传给 runOnJS
  const triggerError1 = () => {
    scheduleOnUI(() => {
      // 'worklet';
      const cb = (message: string) => {
        // ❌ 永远执行不到：cb 在 worklet 作用域内定义，被当作 worklet 捕获
        runOnJS(setStatus)(`❌ 错误1 的 cb 被执行了：${message}`);
      };
      runOnJS(cb)('boom');
    });
  };

  // 对照组：正确用法
  const triggerCorrect = () => {
    scheduleOnUI(() => {
      'worklet';
      runOnJS(rnCallback)('来自 UI runtime');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>错误1：worklet 体内定义回调</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.btnGroup}>
        <Button title="触发错误写法1" onPress={triggerError1} />
      </View>
      <View style={styles.btnGroup}>
        <Button title="对照组：正确写法" onPress={triggerCorrect} />
      </View>
      <Text style={styles.hint}>
        点「触发错误写法1」后 cb 不会被 JS 线程执行；点「对照组」可见 rnCallback 正常回调。
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  btnGroup: {
    marginVertical: 8,
    width: 220,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});
