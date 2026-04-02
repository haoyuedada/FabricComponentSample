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

import type { LabelType } from '../../../util/misc';
import { ExamplesScreen, VerticalExampleCard } from '../../components';
import { colors, radius, sizes, spacing } from '../../../util/theme';

function makeFilterExample(
  title: string,
  from: string,
  to: string,
  labelTypes: Array<LabelType> = ['Android']
) {
  return {
    title,
    keyframes: {
      '0%, 100%': { filter: from },
      '50%': { filter: to },
    },
    labelTypes,
  };
}

const EXAMPLES = [
  makeFilterExample('Brightness', 'brightness(0)', 'brightness(150%)', ['iOS']),
  makeFilterExample('Opacity', 'opacity(1)', 'opacity(0.5)', ['iOS']),
  makeFilterExample('Blur', 'blur(0px)', 'blur(10px)'),
  makeFilterExample('Contrast', 'contrast(100%)', 'contrast(200%)'),
  makeFilterExample(
    'Drop Shadow',
    'dropShadow(0px 0px 0px black)',
    'dropShadow(10px 10px 5px black)'
  ),
  makeFilterExample('Grayscale', 'grayscale(0%)', 'grayscale(100%)'),
  makeFilterExample('Hue Rotate', 'hueRotate(0deg)', 'hueRotate(180deg)'),
  makeFilterExample('Invert', 'invert(0%)', 'invert(100%)'),
  makeFilterExample('Saturate', 'saturate(100%)', 'saturate(300%)'),
  makeFilterExample('Sepia', 'sepia(0%)', 'sepia(100%)'),
];

const STRUCTURE_EXAMPLES = [
  {
    title: 'String syntax',
    keyframes: {
      '0%, 100%': { filter: 'blur(0px) brightness(0)' },
      '50%': { filter: 'blur(10px) brightness(150%)' },
    },
  },
  {
    title: 'Object syntax',
    keyframes: {
      '0%, 100%': { filter: [{ blur: 0 }, { brightness: 0 }] },
      '50%': { filter: [{ blur: 10 }, { brightness: 1.5 }] },
    },
  },
  {
    title: 'Missing properties',
    description:
      'When some filter properties are missing in the keyframes, they will be interpolated to default values.',
    keyframes: {
      '0%, 100%': { filter: [{ blur: 3 }, { brightness: 1.5 }] },
      '50%': { filter: [{ blur: 10 }] },
    },
  },
  {
    title: 'Properties not compatible',
    description:
      'When fromOperations and toOperations are not compatible (different order or different set of filter functions), the keyframe is considered discrete and the filter will abruptly change between the two states.',
    keyframes: {
      '0%, 100%': {
        filter: [{ blur: 0 }, { opacity: 0.5 }, { brightness: 0.7 }],
      },
      '50%': { filter: [{ blur: 10 }, { brightness: 1.5 }] },
    },
  },
];

export default function Filter() {
  return (
    <ExamplesScreen<{ keyframes: CSSAnimationKeyframes }>
      CardComponent={VerticalExampleCard}
      buildAnimation={({ keyframes }) => ({
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationName: keyframes,
        animationTimingFunction: 'linear',
      })}
      renderExample={({ animation }) => (
        <Animated.Image
          source={require('../../../../../../assets/react-native-logo.png')}
          style={[styles.image, animation]}
        />
      )}
      sections={[
        {
          examples: STRUCTURE_EXAMPLES,
          title: 'Filter Structure',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: radius.md,
    height: sizes.xxl,
    width: sizes.xxl,
  },
});
