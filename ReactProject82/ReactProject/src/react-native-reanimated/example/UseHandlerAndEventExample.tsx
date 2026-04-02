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

import React, { useEffect } from 'react';
import Animated, {
  useHandler,
  useEvent,
  useSharedValue,
  useAnimatedProps,
  type ScrollEvent,
} from 'react-native-reanimated';
import { TextInput, SafeAreaView, View, StyleSheet } from 'react-native';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function UseHandlerAndEventExample() {
  const offsetY = useSharedValue(0);

  const handlers = {
    onScroll: (event: ScrollEvent) => {
      'worklet';
      offsetY.value = event.contentOffset.y;
    },
  };

  const { context, doDependenciesDiffer } = useHandler(handlers);

  const scrollHandler = useEvent(
    (event: ScrollEvent) => {
      'worklet';
      const { onScroll } = handlers;
      if (onScroll) {
        onScroll(event);
      }
    },
    ['onScroll'],
    doDependenciesDiffer
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      text: `Scroll offset: ${Math.round(offsetY.value)}px`,
      defaultValue: `Scroll offset: ${offsetY.value}px`,
    };
  });

  const BRAND_COLORS = ['#fa7f7c', '#b58df1', '#ffe780', '#82cab2', '#87cce8'];

  const content = BRAND_COLORS.map((color, index) => (
    <View
      key={index}
      style={[
        styles.section,
        {
          backgroundColor: color,
        },
      ]}
    />
  ));

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedTextInput
        animatedProps={animatedProps}
        editable={false}
        style={[styles.header]}
      />
      <Animated.ScrollView onScroll={scrollHandler}>
        <View style={styles.container}>{content}</View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default UseHandlerAndEventExample;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    height: 350,
    backgroundColor:"white"
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    textAlign: 'center',
    fontFamily: 'Aeonik',
    width:"100%",
    height:80
  },
  section: {
    height: 150,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
