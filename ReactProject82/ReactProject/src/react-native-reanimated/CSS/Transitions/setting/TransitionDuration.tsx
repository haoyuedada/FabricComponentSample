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
import Animated from 'react-native-reanimated';

import { colors, radius, sizes } from '../../util/theme';

import ExampleScreen from '../components/ExampleScreen';

export default function TransitionDuration() {
  return (
    <ExampleScreen
      transitionStyles={[{ width: 0 }, { width: '100%' }]}
      cards={[
        {
          items: [
            { label: '800ms', transitionDuration: '800ms' },
            { label: '2s', transitionDuration: '2s' },
            { label: '3500', transitionDuration: 3500 },
          ],
          title: 'Positive Duration',
        },
        {
          description: (
            <>
              If duration is not specified or is set to 0 (0s, 0ms, 0), style
              change will be applied immediately with no animation.
            </>
          ),
          items: [
            {
              label: '0s (default)',
              transitionDuration: '0s',
            },
          ],
          title: 'Zero Duration',
        },
      ]}
      renderExample={(
        exampleConfig: CSSTransitionProperties,
        style: StyleProps
      ) => (
        <View style={styles.wrapper}>
          <Animated.View style={[styles.box, exampleConfig, style]} />
        </View>
      )}
      transitionProperties={{
        transitionProperty: 'width',
        transitionTimingFunction: 'linear',
      }}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: sizes.sm,
  },
  wrapper: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
});
