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

import type {
  CSSAnimationKeyframes,
  CSSAnimationProperties,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import type { StrokeProps } from 'react-native-svg';
import { Circle, Path, Svg } from 'react-native-svg';

import { ExamplesScreen,VerticalExampleCard } from '../../components';
import { colors, flex, radius, sizes, spacing } from '../../../util/theme';
import type { JSX } from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function StrokeExample() {
  return (
    <ExamplesScreen<
      {
        keyframes: CSSAnimationKeyframes<StrokeProps>;
        animationProps?: Omit<CSSAnimationProperties, 'animationName'>;
        props?: StrokeProps;
        render?: (
          props: StrokeProps & {
            animatedProps: CSSAnimationProperties<StrokeProps>;
          }
        ) => JSX.Element;
      },
      StrokeProps
    >
      buildAnimation={({ keyframes, animationProps }) => ({
        animationName: keyframes,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        ...animationProps,
      })}
      renderExample={({ animation, props, render }) =>
        render?.({ ...props, animatedProps: animation }) ?? (
          <Svg height={100} viewBox="0 0 100 100" width={100}>
            <AnimatedCircle
              animatedProps={animation}
              cx={50}
              cy={50}
              fill={'#5F9CC0'}
              r={20}
              stroke={'#113E60'}
              {...props}
            />
          </Svg>
        )
      }
      sections={[
        {
          title: 'Stroke',
          examples: [
            {
              keyframes: {
                from: {
                  stroke: 'blue',
                },
                to: {
                  stroke: 'red',
                },
              },
              title: 'Changing stroke (color)',
              description: '`strokeWidth` is set to `10`',
              props: {
                strokeWidth: 10,
              },
            },
          ],
        }
      ]}
    />
  );
}
