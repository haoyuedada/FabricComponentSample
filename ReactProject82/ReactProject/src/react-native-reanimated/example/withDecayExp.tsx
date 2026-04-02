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
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withDecay
} from '@react-native-ohos/react-native-reanimated';
import { View, Button, StyleSheet, LayoutChangeEvent, Text } from 'react-native';
import React from 'react';

const withDecayExp = () => {
  const offsetWith = useSharedValue<number>(20);
  const randomWidth = useSharedValue(120);
  const width = useSharedValue<number>(0);

  const config = {
    duration: 500,
    easing: Easing.bezierFn(0.5, 0.01, 0, 1),
  };

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
  };

  const animatedStylesWidthDeley = useAnimatedStyle(() => ({
    width: withTiming(randomWidth.value, config),
    transform: [{ translateX: offsetWith.value }],
  }));

  const startAnimation = () => {
    offsetWith.value = withDecay({
      velocity: 0.2,
      rubberBandEffect: true,
      clamp: [-(width.value / 2) + 120 / 2, width.value / 2 - 120 / 2],
    });
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStylesWidthDeley]} />
      <Button title="Start animation" onPress={startAnimation} />
    </View>
  );
}
const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    height: 50,
    width: 50,
    backgroundColor: '#b58df1',
    borderRadius: 50,
    marginRight: 80,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default withDecayExp;