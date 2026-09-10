/**
 * 错误写法 2：传给 runOnJS 的回调函数自身带 `'worklet'` 标记
 *
 * 问题描述：
 *   传给 `runOnJS(...)` 的回调不能带 `'worklet'` 标记。
 *   此处 `capturedWorklet` 函数体内含 `'worklet';` → 回调被标记为 worklet，
 *   在 UI runtime 侧被序列化为 worklet 而不是 JS 函数，
 *   `runOnJS(capturedWorklet)('boom')` 无法在 JS 线程执行回调体。
 *
 * 正确做法：
 *   回调函数体**不要**写 `'worklet';` 指令（保持 JS 线程普通函数）。
 *   详见同目录 doc/reanimated_error_ref.md「正确写法」。
 */

import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { runOnJS } from '@react-native-ohos/react-native-reanimated';
import { scheduleOnUI } from 'react-native-worklets';

// ❌ 错误写法 2：回调函数自身带 'worklet' 标记
function capturedWorklet(message: string): void {
  'worklet'; // ❌ 回调中不能带 worklet 标记
  // 即使这里写了逻辑，JS 线程也永远执行不到
}

export default function RunOnJSError2Example() {
  const [status, setStatus] = useState('未触发');

  const triggerCapturedWorklet = () => {
    scheduleOnUI(() => {
      'worklet';
      runOnJS(capturedWorklet)('boom');
    });
    // 若回调真的回到 JS 线程，理应看到状态更新；实际不会发生
    setStatus('已触发错误写法2（capturedWorklet 未被 JS 线程执行）');
  };

  // 对照组：正确用法（普通函数 + worklet 作用域外声明，无 'worklet' 标记）
  const triggerCorrect = () => {
    const rnCallback = (message: string) => {
      setStatus(`✅ rnCallback 已在 JS 线程执行（${message}）`);
    };
    scheduleOnUI(() => {
      'worklet';
      runOnJS(rnCallback)('来自 UI runtime');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>错误2：回调自带 'worklet' 标记</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.btnGroup}>
        <Button title="触发错误写法2" onPress={triggerCapturedWorklet} />
      </View>
      <View style={styles.btnGroup}>
        <Button title="对照组：正确写法" onPress={triggerCorrect} />
      </View>
      <Text style={styles.hint}>
        点「触发错误写法2」后 capturedWorklet 的回调体不会在 JS 线程执行；
        点「对照组」可见 rnCallback 正常回调。
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
