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

import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { spacing } from '../util/theme';

import Stagger from './Stagger';

type GridProps = PropsWithChildren<{
  columns: number;
  columnGap?: number;
  rowGap?: number;
  gap?: number;
  squareCells?: boolean;
  style?: ViewStyle;
  staggerInterval?: number;
}>;

export default function Grid({
  children,
  columnGap,
  columns,
  gap,
  rowGap,
  squareCells,
  staggerInterval = -1,
  style,
}: GridProps) {
  const cGap = columnGap ?? gap ?? spacing.none;
  const rGap = rowGap ?? gap ?? spacing.none;

  const cellStyle = useMemo<ViewStyle>(
    () => ({
      ...styles.cell,
      alignItems: 'stretch',
      aspectRatio: squareCells ? 1 : undefined,
      flexBasis: `${100 / columns}%`,
      paddingHorizontal: cGap / 2,
      paddingVertical: rGap / 2,
    }),
    [columns, squareCells, cGap, rGap]
  );

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        styles.container,
        {
          marginHorizontal: -cGap / 2,
          marginVertical: -rGap / 2,
        },
        style,
      ]}>
      <Stagger interval={staggerInterval} wrapperStye={() => cellStyle}>
        {children}
      </Stagger>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
