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
  useAnimatedSensor,
  SensorType,
} from '@react-native-ohos/react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function AnimatedSensorGravityExample() {
  const gravity = useAnimatedSensor(SensorType.GRAVITY);

  const animatedStyle = useAnimatedStyle(() => {
    console.log('gravity.sensor.value', gravity.sensor.value);
    return {
      top: -gravity.sensor.value.y * 300,
      left: gravity.sensor.value.x * 200,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>
          Device must be parallel to the ground with screen facing up and top
          edge of the screen facing forward
        </Text>
        <Text>
          On tilt right, the box should move to the right of the screen
        </Text>
        <Text>On tilt left, the box should move to the left of the screen</Text>
        <Text>
          On tilt forward, the box should move to the top of the screen
        </Text>
        <Text>
          On tilt backward, the box should move to the bottom of the screen
        </Text>
      </View>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white"
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'navy',
  },
  textContainer: {
    position: 'absolute',
    margin: 16,
    top: 0,
  },
});