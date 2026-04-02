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
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  Easing,
  withRepeat
} from '@react-native-ohos/react-native-reanimated';
import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';

export default function AnimatedKeyboardExample() {
  const colorScheme = useColorScheme();
  const keyboard = useAnimatedKeyboard();
  const randomWidth = useSharedValue(50);
  const offset = useSharedValue<number>(100);
  const config = {
    duration: 500,
    easing: Easing.bezierFn(0.5, 0.01, 0, 1),
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));
  const animatedStylesOffset = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  const startAnimation = () => {
    offset.value = withRepeat(
      withTiming(offset.value > 0 ? 0 : 120, { duration: 1500 }),
      -1,
      true
    );
  };

  React.useEffect(() => {
    startAnimation();
  }, []);
  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyles,
        { backgroundColor: colorScheme === 'light' ? '#fff' : '#000' },
      ]}>
      <View style={styles.box}>
        <TextInput placeholder="Text Input" style={{width: 300, height: 50}}/>
      </View>
	   <Animated.View style={[styles.box_a, animatedStylesOffset]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'bottom',
    borderWidth: 5,
    borderColor: '#782aeb',
    borderRadius: 2,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width:"auto",
    backgroundColor: '#b58df1',
    borderRadius: 5,
    margin: 20,
  },
  box_a: {
    height: 50,
    width: 50,
    backgroundColor: '#00ff00',
    borderRadius: 20,
  },
});