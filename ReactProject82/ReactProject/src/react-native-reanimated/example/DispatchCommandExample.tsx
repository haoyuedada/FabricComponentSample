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

import Animated, {
  dispatchCommand,
  runOnUI,
  useAnimatedRef,
} from '@react-native-ohos/react-native-reanimated';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import React from 'react';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function DispatchCommandExample() {
  const aref = useAnimatedRef<TextInput>();

  const focusFromJS = () => {
    console.log(_WORKLET);
    aref.current?.focus();
  };

  const blurFromJS = () => {
    console.log(_WORKLET);
    aref.current?.blur();
  };

  const focusFromUI = () => {
    runOnUI(() => {
      console.log(_WORKLET);
      dispatchCommand(aref, 'focus');
    })();
  };

  const blurFromUI = () => {
    runOnUI(() => {
      console.log(_WORKLET);
      dispatchCommand(aref, 'blur');
    })();
  };

  return (
    <View style={styles.container}>
      <AnimatedTextInput ref={aref} style={styles.input} />
      <Button onPress={focusFromJS} title="Focus from JS" />
      <Button onPress={blurFromJS} title="Blur from JS" />
      <Button onPress={focusFromUI} title="Focus from UI" />
      <Button onPress={blurFromUI} title="Blur from UI" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  input: {
    borderWidth: 1,
    width: 200,
    height: 50,
    padding: 5,
    color: "red"
  },
});