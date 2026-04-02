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
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';


import { ExamplesScreen, VerticalExampleCard } from '../../../components';
import { colors, radius, sizes, spacing } from '../../../../util/theme';
import type { Transforms } from '../../../../util/types';

export default function Skew() {
  return (
    <ExamplesScreen<{ from: Transforms; to: Transforms }>
      buildAnimation={({ from, to }) => ({
        animationDirection: 'alternate',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationName: {
          from: {
            transform: from,
          },
          to: {
            transform: to,
          },
        },
      })}
      renderExample={({ animation }) => (
        <Animated.View style={[styles.box, animation]} />
      )}
      sections={[
        {
          description: 'Skewing an element along the x-axis.',
          examples: [
            {
              from: [{ skewX: '0deg' }],
              title: 'skewX from 0° to 45°',
              to: [{ skewX: '45deg' }],
            },
            {
              from: [{ skewX: '0rad' }],
              title: 'skewX from 0 to -π/3',
              to: [{ skewX: `-${Math.PI / 3}rad` }],
            },
          ],
          title: 'X skew',
        },
        {
          description: 'Skewing an element along the y-axis.',
          examples: [
            {
              from: [{ skewY: '0deg' }],
              title: 'skewY from 0° to 45°',
              to: [{ skewY: '45deg' }],
            },
            {
              from: [{ skewY: '0rad' }],
              title: 'skewY from 0 to π/3',
              to: [{ skewY: `${Math.PI / 3}rad` }],
            },
          ],
          title: 'Y skew',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: sizes.md,
    width: sizes.md,
  },
});
