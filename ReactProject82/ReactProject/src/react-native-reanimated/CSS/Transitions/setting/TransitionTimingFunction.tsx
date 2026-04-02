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
import Animated, { cubicBezier, linear, steps } from 'react-native-reanimated';

import { colors, radius, sizes } from '../../util/theme';

import ExampleScreen from '../components/ExampleScreen';

export default function TransitionTimingFunction() {
  const transitionProperties: CSSTransitionProperties = {
    transitionDuration: '1.5s',
    transitionProperty: ['left', 'transform'],
  };

  const transitionStyles: Array<StyleProps> = [
    { left: '0%', transform: [{ translateX: '0%' }] },
    { left: '100%', transform: [{ translateX: '-100%' }] },
  ];

  const renderExample = (
    exampleConfig: CSSTransitionProperties,
    style: StyleProps
  ) => (
    <View style={styles.outerWrapper}>
      <View style={styles.innerWrapper}>
        <Animated.View style={[styles.box, exampleConfig, style]} />
      </View>
    </View>
  );
  
  return (
    <ExampleScreen
      cards={[
        {
          items: [
            { label: 'ease', transitionTimingFunction: 'ease' },
            { label: 'ease-in', transitionTimingFunction: 'ease-in' },
            { label: 'ease-out', transitionTimingFunction: 'ease-out' },
            {
              label: 'ease-in-out',
              transitionTimingFunction: 'ease-in-out',
            },
            { label: 'linear', transitionTimingFunction: 'linear' },
            { label: 'step-start', transitionTimingFunction: 'step-start' },
            {
              label: 'step-end',
              transitionTimingFunction: 'step-end',
            },
            {
              label: 'cubicBezier(\n 0.2, 0.9, 0.8, 0.25\n)',
              transitionTimingFunction: cubicBezier(0.2, 0.9, 0.8, 0.25),
            },
            {
              label: 'cubicBezier(\n 0.1, 1.5, 0.8, 1.5\n)',
              transitionTimingFunction: cubicBezier(0.1, 1.5, 0.8, 1.5),
            },
            {
              label: 'cubicBezier(\n 0.3, 0, 1, 0\n)',
              transitionTimingFunction: cubicBezier(0.3, 0, 1, 0),
            },
            {
              label: steps(2, 'jump-start').toString(),
              transitionTimingFunction: steps(2, 'jump-start'),
            },
            {
              label: steps(4, 'jump-end').toString(),
              transitionTimingFunction: steps(4, 'jump-end'),
            }
          ],
          title: 'Predefined Easings',
        },
      ]}
      renderExample={renderExample}
      transitionProperties={transitionProperties}
      transitionStyles={transitionStyles}
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
  innerWrapper: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.sm,
  },
  outerWrapper: {
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    overflow: 'hidden',
    paddingHorizontal: sizes.sm / 2,
  },
});
