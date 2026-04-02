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

export default function TransitionDelay() {
  return (
    <ExampleScreen
      transitionStyles={[{ width: 0 }, { width: '100%' }]}
      cards={[
        {
          items: [
            { label: '0s (default)' },
            { label: '500ms', transitionDelay: '500ms' },
            { label: '2s', transitionDelay: '2s' },
            { label: '3500', transitionDelay: 3500 },
          ],
          title: 'Positive Delay',
        },
        {
          description:
            'A negative value causes the transition to begin immediately, but partway through its cycle. For example, if you specify -1s as the transition delay time, the transition will begin immediately but will start 1 second into the transition.',
          items: [
            { label: '0s (default)' },
            { label: '-500ms', transitionDelay: '-500ms' },
            { label: '-1s', transitionDelay: '-1s' },
            { label: '-3000', transitionDelay: -3000 },
          ],
          title: 'Negative Delay',
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
        transitionDuration: '3s',
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
