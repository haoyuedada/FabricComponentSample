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

import { StyleSheet } from 'react-native';
import type {
  CSSTransitionProperties,
  StyleProps,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { colors, radius, sizes } from '../../util/theme';

import ExampleScreen from '../components/ExampleScreen';

export default function TransitionBehavior() {
  return (
    <ExampleScreen
      cards={[
        {
          description: [
            '**Transition behavior** determines whether the transition is applied to **discrete properties**. By default, `transitionBehavior` is `normal`, which applies transition only to **continuous properties** and discrete property changes are **applied immediately**. `allow-discrete` allows transitions to be applied to **discrete properties**, resulting in **delayed changes**.',
            'Discrete-animated properties generally flip between two values **at the midpoint** of the animation, except for the `display` property, which is changed at the moment of the **transition start**.',
          ],
          items: [
            { label: 'normal (default)' },
            { label: 'allow-discrete', transitionBehavior: 'allow-discrete' },
          ],
          title: 'Transition Behavior',
        },
      ]}
      renderExample={(
        exampleConfig: CSSTransitionProperties,
        style: StyleProps
      ) => (
        <Animated.View style={[styles.wrapper, exampleConfig, style]}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Animated.View key={index} style={styles.box} />
          ))}
        </Animated.View>
      )}
      transitionProperties={{
        transitionDuration: '1s',
        transitionProperty: 'justifyContent',
        transitionTimingFunction: 'linear',
      }}
      transitionStyles={[
        { justifyContent: 'center' },
        { justifyContent: 'space-between' },
        { justifyContent: 'flex-start' },
        { justifyContent: 'flex-end' },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: sizes.sm,
    width: sizes.sm,
  },
  wrapper: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.sm,
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
