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
import type { CSSAnimationSettings } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { ExamplesScreen,VerticalExampleCard } from '../../../components';
import { colors, flex, radius, sizes, spacing } from '../../../../util/theme';

const SHARED_SETTINGS: CSSAnimationSettings = {
  animationDirection: 'alternate',
  animationDuration: '1s',
  animationIterationCount: 'infinite',
};

const SECTIONS = [
  {
    examples: [
      {
        propertyName: 'borderRadius',
        title: 'borderRadius',
      },
    ],
    title: 'All Corners',
  },
  {
    examples: [
      {
        description: '(borderTopStartRadius / borderStartStartRadius)',
        propertyName: 'borderTopLeftRadius',
        title: 'borderTopLeftRadius',
      },
      {
        description: '(borderTopEndRadius / borderStartEndRadius)',
        propertyName: 'borderTopRightRadius',
        title: 'borderTopRightRadius',
      },
      {
        description: '(borderBottomStartRadius / borderEndStartRadius)',
        propertyName: 'borderBottomLeftRadius',
        title: 'borderBottomLeftRadius',
      },
      {
        description: '(borderBottomEndRadius / borderEndEndRadius)',
        propertyName: 'borderBottomRightRadius',
        title: 'borderBottomRightRadius',
      },
    ],
    title: 'Single Corner',
  },
];

export default function BorderRadius() {
  return (
    <ExamplesScreen<{ propertyName: string }>
      CardComponent={VerticalExampleCard}
      buildAnimation = { ({ propertyName }) => ({
        ...SHARED_SETTINGS,
        animationName: {
          from: {
            [propertyName]: 0,
          },
          to: {
            [propertyName]: radius.xl,
          },
        },
      })}
      renderExample = {
        ({ animation }) => (
          <Animated.View style={[styles.box, animation]} />
        )
      }
      sections={SECTIONS}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primary,
    height: sizes.md,
    width: sizes.md,
  },
  boxesRow: {
    flexDirection: 'row',
    ...flex.center,
    gap: spacing.md,
  },
});
