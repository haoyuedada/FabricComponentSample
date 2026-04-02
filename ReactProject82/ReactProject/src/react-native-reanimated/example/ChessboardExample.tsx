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
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from '@react-native-ohos/react-native-reanimated';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const colors = [
  ['lime', 'green'],
  ['blue', 'cyan'],
];

function useLoop() {
  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = 0;
    sv.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [sv]);

  return sv;
}

const N = 12;

export default function ChessboardExample() {
  const [state, setState] = React.useState(0);

  const sv = useLoop();

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      console.log("ssss---->shouldReduceMotion:" + shouldReduceMotion);
      return;
    }
    const id = setInterval(() => {
      setState((s) => 1 - s);
    }, 10);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: 10 + sv.value * 20,
      height: 10 + sv.value * 20,
    };
  }, []);

  return (
    <View style={styles.workaround} collapsable={false}>
      <View style={styles.chessboard}>
        <View style={styles.border}>
          {[...Array(N).keys()].map((i) => (
            <View style={styles.row} key={i}>
              {[...Array(N).keys()].map((j) => (
                <Animated.View
                  key={j}
                  style={[
                    { backgroundColor: colors[state % 2][(i + j) % 2] },
                    animatedStyle,
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  workaround: {
    height: 400,
    // prevents calling _state->updateState from RNScreens after each change because of view flattening
  },
  chessboard: {
    alignItems: 'flex-start',
  },
  border: {
    borderWidth: 10,
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
  },
});
