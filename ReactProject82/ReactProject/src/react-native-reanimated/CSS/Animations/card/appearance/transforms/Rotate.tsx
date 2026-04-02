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
import Animated from 'react-native-reanimated';
import { ExamplesScreen, VerticalExampleCard } from '../../../components';
import { colors, radius, sizes, spacing } from '../../../../util/theme';
import type { Transforms } from '../../../../util/types';

export default function Rotate() {
  return (
    <ExamplesScreen<{ from: Transforms; to: Transforms }>
      buildAnimation={({ from, to }) => ({
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
        <Animated.View style={[styles.box, animation]}>
          <View style={styles.dot} />
        </Animated.View>
      )}
      sections={[
        {
          description:
            'Rotating an element around the z-axis. This rotation is also applied when using the `rotate` shorthand property.',
          examples: [
            {
              from: [{ rotate: '0deg' }],
              title: 'rotate from 0° to 360°',
              to: [{ rotate: '360deg' }],
            },
            {
              description:
                'The same as the previous example but using the `rotateZ` property.',
              from: [{ rotateZ: '0deg' }],
              title: 'rotateZ from 0° to 360°',
              to: [{ rotateZ: '360deg' }],
            },
            {
              description:
                'Rotating an element around the z-axis using **radians**. This example is **equivalent** to rotation **from 0° to 180°**.',
              from: [{ rotate: '0rad' }],
              title: 'rotate from 0 to π',
              to: [{ rotate: `${Math.PI}rad` }],
            },
            {
              description:
                'Rotating an element around the z-axis using **degrees** and **radians**. This example is **equivalent** to rotation **from 0° to 270°**.',
              from: [{ rotate: '0rad' }],
              title: 'rotate from 0π to 270°',
              to: [{ rotate: '270deg' }],
            },
          ],
          title: 'Z rotation',
        },
        {
          description: 'Rotating an element around the x-axis.',
          examples: [
            {
              from: [{ rotateX: '0deg' }],
              title: 'rotateX from 0° to 360°',
              to: [{ rotateX: '360deg' }],
            },
          ],
          title: 'X rotation',
        },
        {
          description: 'Rotating an element around the y-axis.',
          examples: [
            {
              from: [{ rotateY: '0deg' }],
              title: 'rotateY from 0° to 360°',
              to: [{ rotateY: '360deg' }],
            },
          ],
          title: 'Y rotation',
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
  dot: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.full,
    height: sizes.xxxs,
    left: spacing.xxs,
    position: 'absolute',
    top: spacing.xxs,
    width: sizes.xxxs,
  },
});
