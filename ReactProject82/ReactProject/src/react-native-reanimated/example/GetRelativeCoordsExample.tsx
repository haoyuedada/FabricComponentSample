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

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedRef,
  getRelativeCoords,
} from 'react-native-reanimated';
import { Gesture, GestureDetector,GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    scheduleOnRN
  } from 'react-native-worklets';

const GetRelativeCoordsExample = () => {
  const animatedRef = useAnimatedRef();

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const func = (logStr:any) => {

    setCoords(logStr);
};
  const tapGesture = Gesture.Tap().onEnd((event) => {
    const relativeCoords = getRelativeCoords(
      animatedRef,
      event.absoluteX,
      event.absoluteY
    );
    if (relativeCoords) {
        scheduleOnRN(func,relativeCoords);
    }
  });

  return (
    <GestureHandlerRootView style={styles.container}>
    <View style={styles.container}>
      <Text style={[styles.coordsData]}>
        Relative coordinates to parent:
      </Text>
      <Text style={[styles.coordsData, styles.coords]}>
        x={coords.x.toFixed()} y=
        {coords.y.toFixed()}
      </Text>
      <GestureDetector gesture={tapGesture}>
        <Animated.View ref={animatedRef} style={styles.innerView}>
          <Text style={styles.text}>Tap anywhere inside.</Text>
        </Animated.View>
      </GestureDetector>
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
  },
  innerView: {
    width: 300,
    height: 300,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    cursor: 'pointer',
  },
  coordsData: {
    fontSize: 20,
    fontFamily: 'Aeonik',
  },
  coords: {
    marginBottom: 16,
    fontWeight: '500',
  },
  text: {
    color: 'white',
    fontFamily: 'Aeonik',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GetRelativeCoordsExample;
