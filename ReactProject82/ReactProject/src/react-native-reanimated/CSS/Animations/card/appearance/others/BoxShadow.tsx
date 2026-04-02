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
import type { CSSAnimationKeyframes } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { ExamplesScreen, VerticalExampleCard } from '../../../components';
import { colors, radius, sizes, spacing } from '../../../../util/theme';

export default function BoxShadow() {
  return (
    <ExamplesScreen<{ keyframes: CSSAnimationKeyframes }>
      CardComponent={VerticalExampleCard}
      buildAnimation={({ keyframes }) => ({
        animationDirection: 'alternate',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationName: keyframes,
      })}
      renderExample={({ animation }) => (
        <Animated.View style={[styles.box, animation]} />
      )}
      sections={[
        {
          examples: [
            {
              description:
                'All shadow properties are provided as separate values.',
              keyframes: {
                from: {
                  boxShadow: [
                    {
                      blurRadius: radius.md,
                      color: 'cyan',
                      offsetX: 0,
                      offsetY: 0,
                    },
                  ],
                },
                to: {
                  boxShadow: [
                    {
                      blurRadius: radius.lg,
                      color: 'red',
                      offsetX: spacing.lg,
                      offsetY: spacing.md,
                      spreadDistance: 10,
                    },
                  ],
                },
              },
              title: 'Object syntax',
            },
            {
              description:
                "As you can see in this example, you don't have to use the `px` unit for length values in the shadow. It is optional.",
              keyframes: {
                from: {
                  boxShadow: 'cyan',
                },
                to: {
                  boxShadow: '50px 0 10 red',
                },
              },
              title: 'String syntax',
            },
          ],
          title: 'Normal Shadow',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    boxShadow: [
      {
        blurRadius: radius.md,
        color: colors.primary,
        offsetX: '50px',
        offsetY: spacing.md,
      },
    ],
    height: sizes.md,
    width: sizes.md,
  },
});
