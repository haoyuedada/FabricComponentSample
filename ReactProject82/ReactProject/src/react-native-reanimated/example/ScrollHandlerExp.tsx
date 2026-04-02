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
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from '@react-native-ohos/react-native-reanimated';

const size = 40;

export default function ScrollEventExample() {
  const transY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const headerHeight = 60;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log("ssssss--> onScroll");
      transY.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      console.log("ssssss--> onBeginDrag");
      isScrolling.value = true;
    },
    onEndDrag: () => {
      console.log("ssssss--> onEndDrag");
      isScrolling.value = false;
    },
  });

  const stylez = useAnimatedStyle(() => {
    const size = isScrolling.value ? 80 : 40;
    return {
      transform: [
        {
          translateY: transY.value,
        },
      ],
      width: withSpring(size),
      height: withSpring(size),
    };
  });

  const windowHeight = Dimensions.get('window').height - headerHeight;
  const height = Platform.OS === 'web' ? windowHeight : undefined;

  return (
    <View style={styles.container}>
      <View style={[styles.half, { height }]}>
        <Animated.View style={[styles.box, stylez]} />
      </View>
      <View style={[styles.half, { height }]}>
        <Animated.ScrollView style={styles.scroll} onScroll={scrollHandler}>
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  half: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: "white"
  },
  scroll: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  box: {
    alignSelf: 'center',
    backgroundColor: 'green',
  },
  placeholder: {
    width: size,
    height: size,
    backgroundColor: 'brown',
    marginVertical: 300,
  },
});