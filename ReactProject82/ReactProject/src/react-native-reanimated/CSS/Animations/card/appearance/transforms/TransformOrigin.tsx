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

import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type {
  CSSAnimationProperties,
  CSSAnimationSettings,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { ExamplesScreen, VerticalExampleCard } from '../../../components';
import { colors, radius, sizes, spacing } from '../../../../util/theme';

import { normalizeTransformOrigin } from '../../../../util/utils';


const SHARED_SETTINGS: CSSAnimationSettings = {
  animationDuration: '3s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
};

type TransformOriginProp = ViewStyle['transformOrigin'];

const calculateAnimationStep = (
  transformOrigins: Array<TransformOriginProp>
) => (transformOrigins.length < 2 ? 100 : 100 / (transformOrigins.length - 1));

const calculateOffset = (index: number, step: number) => {
  const offset = index * step;
  return `${offset.toFixed(offset === Math.round(offset) ? 0 : 2)}%`;
};

export default function TransformOrigin() {
  return (
    <ExamplesScreen<{
      transformOrigins: Array<TransformOriginProp>;
    }>
      buildAnimation={({ transformOrigins }) => ({
        animationName: Object.fromEntries(
          transformOrigins.map((origin, index) => {
            return [
              calculateOffset(index, calculateAnimationStep(transformOrigins)),
              {
                transform: [{ rotate: `${index * 360}deg` }],
                transformOrigin: origin,
              },
            ];
          })
        ),
        ...SHARED_SETTINGS,
      })}
      renderExample={({ animation, transformOrigins }) => {
        const originDotAnimation: CSSAnimationProperties = {
          animationName: Object.fromEntries(
            transformOrigins.map((origin, index) => {
              const [x, y] = normalizeTransformOrigin(origin!);
              return [
                calculateOffset(
                  index,
                  calculateAnimationStep(transformOrigins)
                ),
                {
                  left: x,
                  top: y,
                  transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
                },
              ];
            })
          ),
          ...SHARED_SETTINGS,
        };

        return (
          <View style={[styles.box, { backgroundColor: colors.primaryLight }]}>
            <Animated.View style={[styles.box, animation]}>
              <Animated.View style={[styles.originDot, originDotAnimation]} />
            </Animated.View>
          </View>
        );
      }}
      sections={[
        {
          description:
            'When transform origin is a single keyword value. It is applied only to one axis (`right` and `left` to the **x axis**, `top` and `bottom` to the **y axis**, and `center` to both). The second axis is set to `center` by default.',
          examples: [
            {
              title: 'Vertical',
              transformOrigins: ['top', 'bottom'],
            },
            {
              title: 'Horizontal',
              transformOrigins: ['left', 'right'],
            },
            {
              title: 'Through center',
              transformOrigins: ['left', 'center', 'center', 'top'],
            },
          ],
          title: 'Single value',
        },
        {
          description:
            'When transform origin is a combination of two keyword values. The `top`/`bottom` value is applied to the **y axis** and the `left`/`right` value is applied to the **x axis**. `center` is applied to the **x axis** if is used as the first value or to the **y axis** if is used as the second value.',
          examples: [
            {
              title: 'Top left to bottom right',
              transformOrigins: ['top left', 'bottom right'],
            },
            {
              title: 'Bottom left to top right',
              transformOrigins: ['bottom left', 'top right'],
            },
            {
              title: 'Through center',
              transformOrigins: ['left top', 'center', 'right top'],
            },
          ],
          title: 'Two values',
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
  originDot: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.full,
    height: sizes.xxxs,
    position: 'absolute',
    width: sizes.xxxs,
  },
});
