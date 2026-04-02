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
  LayoutAnimationConfig,
  PinwheelIn,
  PinwheelOut,
} from 'react-native-reanimated';
import { Button, StyleSheet, View } from 'react-native';

export default function App() {
  const [outer, setOuter] = React.useState<boolean>(true);
  const [inner, setInner] = React.useState<boolean>(true);

  return (
    <View style={styles.container}>
      <View style={styles.buttonColumn}>
        <Button
          onPress={() => {
            setOuter(!outer);
          }}
          title={toggleString(outer) + ' outer'}
        />
        <Button
          disabled={!outer}
          onPress={() => {
            setInner(!inner);
          }}
          title={toggleString(inner) + ' inner'}
        />
      </View>
      <LayoutAnimationConfig skipEntering>
        {outer && (
          <Animated.View
            entering={PinwheelIn}
            exiting={PinwheelOut}
            style={styles.outerBox}>
            <LayoutAnimationConfig skipEntering skipExiting>
              {inner && (
                <Animated.View
                  style={styles.box}
                  entering={PinwheelIn}
                  exiting={PinwheelOut}
                />
              )}
            </LayoutAnimationConfig>
          </Animated.View>
        )}
      </LayoutAnimationConfig>
    </View>
  );
}

function toggleString(value: boolean) {
  return value ? 'Hide' : 'Show';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 220,
  },
  buttonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 90,
  },
  outerBox: {
    width: 150,
    height: 150,
    backgroundColor: '#b58df1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 20,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#782aeb',
  },
});