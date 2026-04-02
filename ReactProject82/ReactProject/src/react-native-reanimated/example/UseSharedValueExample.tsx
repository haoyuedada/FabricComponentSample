/**
 * MIT License
 *
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  useAnimatedReaction,
  runOnUI
} from '@react-native-ohos/react-native-reanimated';

export default function SharedValueDemo() {
  const setValue = useSharedValue(100);
  const [setDisplay, setSetDisplay] = React.useState(setValue.value);
  const [getValue, getValue_] = React.useState(setValue.value);
  const modifyValue = useSharedValue(100);
  const [modifyDisplay, setModifyDisplay] = React.useState(modifyValue.value);

  const listenerValue = useSharedValue(100);
  const [listenerDisplay, setListenerDisplay] = React.useState(listenerValue.value);
  const listenerIdRef = useRef(null);

  const animatedValue = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedValue.value,
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 10,
  }));

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      const LISTENER_ID = 1;
      listenerIdRef.current = LISTENER_ID;
      listenerValue.addListener(listenerIdRef.current, (value) => {
        'worklet';
        console.log('Listener 触发:', value);
        runOnJS(setListenerDisplay)(value);
      });

      console.log('Listener 已添加，ID:', listenerIdRef.current);
    })();

    return () => {
      runOnUI(() => {
        'worklet';
        listenerValue.removeListener(1);
        console.log('Listener 已移除，ID: 1');
      })();
    };
  }, []);

  const handleSetPress = () => {
    setValue.set(setValue.value + 50);
    console.log('After get():' + setValue.get())
    setSetDisplay(setValue.value);
    getValue_(setValue.get())
    console.log('After set():', setValue.value);
  };

  const handleModifyPress = () => {
    runOnUI(() => {
      'worklet';
      modifyValue.modify((v) => {
        const newValue = v + 30;
        runOnJS(setModifyDisplay)(newValue);
        return newValue;
      });
      console.log('UI Thread Log:', modifyValue.value);
    })();
  };

  const handleListenerPress = () => {
    listenerValue.value = listenerValue.value + 20;
    console.log('Listener value changed:', listenerValue.value);
  };

  const handleAnimatePress = () => {
    animatedValue.value = withTiming(animatedValue.value + 50, { duration: 500 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Animated Value (对比):</Text>
      <Animated.View style={animatedStyle} />
      <Button title="Animate +50" onPress={handleAnimatePress} />
      
      <Text style={styles.label}>set() 测试: {setDisplay}</Text>
      <Text style={styles.label}>get() 测试: {getValue}</Text>
      <Button title="set +50" onPress={handleSetPress} />

      <Text style={styles.label}>modify() 测试: {modifyDisplay}</Text>
      <Button title="modify +30" onPress={handleModifyPress} />

      <Text style={styles.label}>listener 测试: {listenerDisplay}</Text>
      <Button title="listener +20" onPress={handleListenerPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
});
