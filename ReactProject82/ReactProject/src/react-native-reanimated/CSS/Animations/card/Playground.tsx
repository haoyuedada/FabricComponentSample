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

import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View,Button } from 'react-native';
import Animated from 'react-native-reanimated';


const transitionStyles: Array<ViewStyle> = [
  {
    transform: [{ rotate: '45deg' }, { skewX: '45deg' }],
  },
  {
    transform: [{ translateY: 200 }, { rotate: '45deg' }, { scale: 2 }],
  },
  {
    transform: [{ rotate: '45deg' }, { translateY: 150 }],
    width: 200,
  },
];

export default function PlaygroundDemo() {
  const [state, setState] = useState(0);
  const stateToStyle = (num: number) => {
    return transitionStyles[num % transitionStyles.length];
  };

  return (
      <View style={styles.container}>
        <Button
          title="Change state"
          onPress={() => {
            setState(state + 1);
          }}
        />
        <Animated.View
          style={[
            {
              backgroundColor: 'red',
              height: 65,
              marginTop: 60,
              transitionDuration: '0.5s',
              width: 65,
            },
            stateToStyle(state),
          ]}
        />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});