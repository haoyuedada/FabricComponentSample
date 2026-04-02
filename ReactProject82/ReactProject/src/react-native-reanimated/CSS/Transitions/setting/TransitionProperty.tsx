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

import { StyleSheet, View } from 'react-native';
import type {
  CSSTransitionProperties,
  StyleProps,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { colors, flex, radius, sizes } from '../../util/theme';

import ExampleScreen from '../components/ExampleScreen';

export default function TransitionProperty() {
  return (
    <ExampleScreen
      cards={[
        {
          description:
            "Only properties listed in 'transitionProperty' will animate when changed. In the examples below, style changes are the same but transition properties are different.",
          items: [
            { label: '"width"', transitionProperty: 'width' },
            { label: '"height"', transitionProperty: 'height' },
            {
              label: '["width", "height"]',
              transitionProperty: ['width', 'height'],
            },
            { label: '"all"', transitionProperty: 'all' },
          ],
          title: 'Transition Property',
        },
      ]}
      renderExample={(
        exampleConfig: CSSTransitionProperties,
        style: StyleProps
      ) => (
        <View style={styles.wrapper}>
          <Animated.View style={[styles.box, exampleConfig, style]} />
        </View>
      )}
      transitionProperties={{
        transitionDuration: '1s',
      }}
      transitionStyles={[
        { backgroundColor: colors.primary, height: sizes.xs, width: sizes.xs },
        {
          backgroundColor: colors.primaryDark,
          height: sizes.lg,
          width: sizes.lg,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: radius.sm,
  },
  wrapper: {
    ...flex.center,
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    height: sizes.xl,
  },
});
