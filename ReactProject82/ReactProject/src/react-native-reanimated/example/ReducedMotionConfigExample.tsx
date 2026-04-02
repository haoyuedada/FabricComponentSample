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

import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  ReducedMotionConfig,
  ReduceMotion,
} from 'react-native-reanimated';


export default function App() {
  const textColor = { color: '#000000' };
  const [isReduceMotionDisabled, setIsReduceMotionDisabled] = useState(false);
  const sv = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value}deg` }],
  }));

  useEffect(() => {
    sv.value = 0;
    sv.value = withRepeat(withTiming(360, { duration: 2000 }), -1, true);
  }, [textColor, isReduceMotionDisabled]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, textColor]}>Disable reduced motion</Text>
        <Switch
          value={isReduceMotionDisabled}
          onValueChange={setIsReduceMotionDisabled}
        />
      </View>
      <ReducedMotionConfig
        mode={isReduceMotionDisabled ? ReduceMotion.Always : ReduceMotion.System}
      />
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white"
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  text: {
    marginRight: 10,
    fontFamily: 'Aeonik',
    fontSize: 16,
  },
});
