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

import { StyleSheet, View ,Text} from 'react-native';

import { colors, radius, spacing } from '../../util/theme';


export type FontVariant =
  | 'body1'
  | 'body2'
  | 'body3'
  | 'code'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'inlineCode'
  | 'label1'
  | 'label2'
  | 'label3'
  | 'subHeading1'
  | 'subHeading2'
  | 'subHeading3';

export type LabelType =
  | 'Android'
  | 'iOS'
  | 'needsFix'
  | 'new'
  | 'unimplemented'
  | 'unsupported'
  | 'web';

const labelTexts = {
  Android: 'Android',
  iOS: 'iOS',
  needsFix: 'Needs Fix',
  new: 'New',
  unimplemented: 'Unimplemented',
  unsupported: 'Unsupported',
  web: 'Web',
} satisfies Record<LabelType, string>;

const variants = {
  large: {
    labelStyle: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    text: 'label1',
  },
  medium: {
    labelStyle: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    text: 'label2',
  },
  small: {
    labelStyle: {
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
    },
    text: 'label3',
  },
} as const;

type LabelProps = {
  type: LabelType;
  size?: 'large' | 'medium' | 'small';
};

export default function Label({ size = 'small', type }: LabelProps) {
  const variant = variants[size];
  const color = colors.label[type];

  if (!color || !variant) {
    return null;
  }

  return (
    <View style={[styles.label, variant.labelStyle, { borderColor: color }]}>
      <View style={[styles.background, { backgroundColor: color }]} />
      <Text style={{ color }}>
        {labelTexts[type]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
  },
  label: {
    borderRadius: radius.full,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
});
