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

import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, {
  runOnUI,
  setNativeProps,
  useAnimatedRef,
  useSharedValue
} from '@react-native-ohos/react-native-reanimated';

const COLORS = ['#FFE780', '#87CCE8', '#FFA3A1', '#B1DFD0', '#B58DF1'];

export default function Example() {
  const animatedRef = useAnimatedRef();
  const handlePress = () => {
    runOnUI(() => {
      setNativeProps(animatedRef, {
        width: Math.random() * 50,
        backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    })();
  };

  return (
    <View style={styles.container}>
      <Animated.View ref={animatedRef} style={styles.box} />
      <Button title="change color" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#B58DF1',
    borderRadius: 20,
    marginBottom: 30,
  },
});