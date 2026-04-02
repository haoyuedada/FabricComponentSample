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

import type React from 'react';
import {
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type JSX,
} from 'react';
import { StyleSheet, View,Button ,Text} from 'react-native';
import type {
  CSSTransitionDelay,
  CSSTransitionDuration,
  CSSTransitionProperties,
  CSSTransitionSettings,
  StyleProps,
} from 'react-native-reanimated';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { TransitionStyleChange } from '../components';
import { useDebounce, useStableCallback } from '../../util/utils';
import { colors, spacing } from '../../util/theme';

const MIN_STYLE_CHANGE_DURATION = 2500;

const timeToNumber = (duration?: CSSTransitionDuration): number => {
  if (!duration) {
    return 0;
  }
  if (typeof duration === 'number') {
    return duration;
  }
  if (duration.endsWith('ms')) {
    return parseFloat(duration);
  }
  return parseFloat(duration) * 1000;
};

type TimeUnit = CSSTransitionDelay;

const getTimeUnit = (
  timeUnit: Array<TimeUnit> | TimeUnit | undefined
): number => {
  if (!timeUnit) {
    return 0;
  }
  return Array.isArray(timeUnit)
    ? Math.max(...timeUnit.map(timeToNumber))
    : timeToNumber(timeUnit);
};

const getTimeout = (settings: CSSTransitionSettings): number => {
  const duration = getTimeUnit(settings.transitionDuration);
  const delay = getTimeUnit(settings.transitionDelay);
  return Math.max(duration + delay, MIN_STYLE_CHANGE_DURATION);
};

export type ExampleItemProps = {
  label: string;
} & Partial<CSSTransitionProperties>;

type ExamplesListCardProps = {
  transitionProperties: Partial<CSSTransitionProperties>;
  transitionStyles: Array<StyleProps>;
  items: Array<ExampleItemProps>;
  displayStyleChanges: boolean;
  renderExample: (
    transition: CSSTransitionProperties,
    style: StyleProps
  ) => JSX.Element;
};

export default function ExamplesListCard({
  displayStyleChanges: inDisplayStyleChanges,
  items,
  renderExample,
  transitionProperties,
  transitionStyles,
}: ExamplesListCardProps) {
  const [displayStyleChanges, setDisplayStyleChanges] = useState(
    inDisplayStyleChanges
  );
  const exampleRefsRef = useRef<Record<string, ExampleRef | null>>({});

  const handleReset = useCallback(() => {
    Object.values(exampleRefsRef.current).forEach((ref) => {
      ref?.reset();
    });
  }, []);

  const handleRunAll = useCallback(() => {
    Object.values(exampleRefsRef.current).forEach((ref) => {
      ref?.run();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        {items.length > 1 && (
          <Button size="small" title="Run all" onPress={handleRunAll} />
        )}
        <Button size="small" title="Reset all" onPress={handleReset} />
      </View>
      {items.map((item, index) => (
        <Example
          displayStyleChanges={displayStyleChanges}
          item={item}
          key={index}
          renderExample={renderExample}
          transitionProperties={transitionProperties}
          transitionStyles={transitionStyles}
          ref={(ref) => {
            exampleRefsRef.current[item.label] = ref;
          }}
        />
      ))}
      <Animated.View layout={LinearTransition} style={styles.cardFooter}>
        <Button  title="Display style changes" onPress={()=>{
          setDisplayStyleChanges(!displayStyleChanges)
        }} />
      </Animated.View>
    </View>
  );
}

type ExampleRef = {
  run: () => void;
  reset: () => void;
};

type ExampleProps = {
  transitionProperties: Partial<CSSTransitionProperties>;
  transitionStyles: Array<StyleProps>;
  item: ExampleItemProps;
  displayStyleChanges: boolean;
  renderExample: (
    config: CSSTransitionProperties,
    style: StyleProps
  ) => JSX.Element;
  ref: React.Ref<ExampleRef>;
};

const Example = memo(function Example({
  displayStyleChanges,
  item,
  ref,
  renderExample,
  transitionProperties,
  transitionStyles,
}: ExampleProps) {
  const [key, setKey] = useState(0);
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [showStyleChange, setShowStyleChange] = useState(false);
  const styleChangeCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedStyleIndex = useDebounce(currentStyleIndex, 500);
  const currentTransitionStyle = transitionStyles[currentStyleIndex];

  const handlePress = useStableCallback(() => {
    const nextIndex = (currentStyleIndex + 1) % transitionStyles.length;
    setCurrentStyleIndex(nextIndex);

    setTimeout(() => {
      if (displayStyleChanges) {
        setShowStyleChange(true);
        clearTimeout(styleChangeCloseTimeoutRef.current!);
        styleChangeCloseTimeoutRef.current = setTimeout(() => {
          setShowStyleChange(false);
        }, getTimeout(item));
      }
    }, 0);
  });

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setCurrentStyleIndex(0);
        setShowStyleChange(false);
        setKey((prevKey) => prevKey + 1);
      },
      run: handlePress,
    }),
    [handlePress]
  );

  const { label, ...rest } = item;

  return (
    <Animated.View layout={LinearTransition} style={{ overflow: 'hidden' }}>
      <View style={styles.exampleRow}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label} variant="label2">
            {label}
          </Text>
        </View>
        <View key={key} style={styles.example}>
          {renderExample(
            {
              transitionProperty: 'all',
              ...transitionProperties,
              ...rest,
            },
            currentTransitionStyle
          )}
        </View>
        <Button size="small" title="Run" onPress={handlePress} />
      </View>
      {displayStyleChanges && showStyleChange && (
        <TransitionStyleChange
          activeStyleIndex={debouncedStyleIndex}
          transitionStyles={transitionStyles}
        />
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  cardFooter: {
    backgroundColor: colors.background1,
    marginTop: spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'flex-end',
  },
  container: {
    gap: spacing.xs,
  },
  example: {
    flexGrow: 1,
  },
  exampleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  label: {
    flexShrink: 1,
  },
  labelWrapper: {
    flexBasis: '40%',
  },
});
