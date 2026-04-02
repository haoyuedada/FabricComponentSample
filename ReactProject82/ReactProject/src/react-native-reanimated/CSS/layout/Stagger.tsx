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

import type { PropsWithChildren, ReactNode } from 'react';
import { Children } from 'react';
import type { ViewStyle } from 'react-native';
import type {
  BaseAnimationBuilder,
  LayoutAnimationFunction,
} from 'react-native-reanimated';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';

type StaggerProps = PropsWithChildren<{
  interval?: number;
  delay?: number;
  enabled?: boolean;
  ParentComponent?: React.ComponentType<{
    children: ReactNode;
    style?: ViewStyle;
  }>;
  wrapperStye?: ((index: number) => ViewStyle) | ViewStyle;
  itemLayout?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder;
}>;

export default function Stagger({
  ParentComponent,
  children,
  delay = 0,
  interval = 100,
  enabled = true,
  itemLayout = LinearTransition,
  wrapperStye,
}: StaggerProps) {
  const childrenArray = Children.toArray(children);

  return childrenArray.map((child, index) => {
    const style =
      wrapperStye instanceof Function ? wrapperStye(index) : wrapperStye;

    const wrappedChild = (
      <Animated.View
        key={index}
        layout={itemLayout}
        style={style}
        entering={
          enabled && interval >= 0
            ? FadeInDown.delay(delay + index * interval)
            : undefined
        }>
        {child}
      </Animated.View>
    );

    return ParentComponent ? (
      <ParentComponent key={index} style={style}>
        {wrappedChild}
      </ParentComponent>
    ) : (
      wrappedChild
    );
  });
}
