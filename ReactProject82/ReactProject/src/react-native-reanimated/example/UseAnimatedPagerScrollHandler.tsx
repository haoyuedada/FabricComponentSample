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

import { NativeSyntheticEvent } from 'react-native';
import {
  PagerViewOnPageScrollEvent,
  PagerViewOnPageSelectedEvent,
} from '@react-native-ohos/react-native-pager-view';
import { useEvent, useHandler } from '@react-native-ohos/react-native-reanimated';
import type { ReanimatedEvent } from '@react-native-ohos/react-native-reanimated';

export default function UseAnimatedPagerScrollHandler<
  TContext extends Record<string, unknown>
>(
  handlers: {
    onPageScroll: (
      e: ReanimatedEvent<PagerViewOnPageScrollEvent>,
      context: TContext
    ) => void;
  },
  dependencies?: unknown[]
): (e: PagerViewOnPageScrollEvent) => void {
  const { context, doDependenciesDiffer } = useHandler<
    PagerViewOnPageScrollEvent,
    TContext
  >(handlers, dependencies);

  return useEvent<PagerViewOnPageScrollEvent>(
    (event) => {
      'worklet';
      const { onPageScroll } = handlers;

      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    ['onPageScroll'],
    doDependenciesDiffer
  );
}

export function useAnimatedPagerSelectedPageHandler<
  TContext extends Record<string, unknown>
>(
  handlers: {
    onPageSelected: (
      e: ReanimatedEvent<PagerViewOnPageSelectedEvent>,
      context: TContext
    ) => void;
  },
  dependencies?: Array<unknown>
): (e: PagerViewOnPageSelectedEvent) => void {
  const { context, doDependenciesDiffer } = useHandler<
    PagerViewOnPageSelectedEvent,
    TContext
  >(handlers, dependencies);

  return useEvent<PagerViewOnPageSelectedEvent>(
    (event) => {
      'worklet';
      const { onPageSelected } = handlers;

      if (onPageSelected && event.eventName.endsWith('onPageSelected')) {
        onPageSelected(event, context);
      }
    },
    ['onPageSelected'],
    doDependenciesDiffer
  );
}