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

import { useMemo } from 'react';
import type { ScrollViewProps } from 'react-native';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { flex, spacing, style } from '../util/theme';
const BOTTOM_BAR_HEIGHT = 60;
const IS_WEB = false;
export type ScrollProps = {
  fill?: boolean;
  withBottomBarSpacing?: boolean;
  noPadding?: boolean;
  gap?: number;
  rowGap?: number;
} & Omit<ScrollViewProps, 'gap' | 'rowGap'>;

export default function Scroll({
  children,
  contentContainerStyle,
  fill = false,
  horizontal,
  noPadding = false,
  style: styleProp,
  withBottomBarSpacing,
  ...rest
}: ScrollProps) {

  const inset = Platform.select({
    default: BOTTOM_BAR_HEIGHT,
    web: spacing.md,
  });

  const flattenedStyle = useMemo(
    () => StyleSheet.flatten(contentContainerStyle),
    [contentContainerStyle]
  );
  const gap = +(flattenedStyle?.gap ?? flattenedStyle?.rowGap ?? spacing.xxs);

  return (
    <ScrollView
      horizontal={horizontal}
      showsVerticalScrollIndicator={false}
      style={[styleProp, fill && flex.fill]}
      contentContainerStyle={[
        IS_WEB && !horizontal && style.webContainer,
        { gap },
        noPadding
          ? {}
          : {
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            },
        contentContainerStyle,
      ]}
      {...rest}>
      {children}
      {withBottomBarSpacing && (
        <View style={{ height: BOTTOM_BAR_HEIGHT + inset - gap }} />
      )}
    </ScrollView>
  );
}
