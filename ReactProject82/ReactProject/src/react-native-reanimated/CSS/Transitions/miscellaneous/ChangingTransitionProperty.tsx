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

import { useEffect, useState } from 'react';
import { StyleSheet, View ,Button, ScrollView } from 'react-native';
import type {
  CSSTransitionProperties,
  CSSTransitionProperty,
  CSSTransitionSettings,
  StyleProps,
} from 'react-native-reanimated';
import Animated, { LinearTransition } from 'react-native-reanimated';


import {
  TransitionConfiguration,
  TransitionStyleChange,
} from '../components';
import { colors, flex, radius, sizes, spacing } from '../../util/theme';

const PROPERTIES = [
  'none',
  'width',
  'height',
  'transform',
  'backgroundColor',
  'borderRadius',
  'all',
] satisfies Array<CSSTransitionProperty>;

const transitionSettings: CSSTransitionSettings = {
  transitionDuration: '1s',
  transitionTimingFunction: 'ease-in-out',
};

const transitionStyles: Array<StyleProps> = [
  {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: sizes.md,
    width: sizes.md,
  },
  {
    backgroundColor: colors.primaryDark,
    borderRadius: '50%',
    height: sizes.xl,
    transform: [{ rotate: '360deg' }],
    width: sizes.xl,
  },
  {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.xl,
    height: sizes.md,
    width: sizes.xl,
  },
  {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: sizes.xl,
    transform: [{ rotate: '180deg' }],
    width: sizes.md,
  },
];

export default function ChangingTransitionProperty() {
  const [transitionProperty, setTransitionProperty] = useState<
    Array<string> | string
  >('all');
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [displayStyleChanges, setDisplayStyleChanges] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCurrentStyleIndex(1);
    }, 250);
    const interval = setInterval(() => {
      setCurrentStyleIndex((prev) => (prev + 1) % transitionStyles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (propertyName: string) => {
    if (
      propertyName === 'none' ||
      propertyName === 'all' ||
      transitionProperty === 'none' ||
      transitionProperty === 'all'
    ) {
      setTransitionProperty(propertyName);
    } else if (!Array.isArray(transitionProperty)) {
      if (transitionProperty === propertyName) {
        setTransitionProperty('none');
      } else {
        setTransitionProperty([transitionProperty, propertyName]);
      }
    } else {
      const newProperties = transitionProperty.includes(propertyName)
        ? transitionProperty.filter((item) => item !== propertyName)
        : [...transitionProperty, propertyName];
      setTransitionProperty(
        newProperties.length > 1 ? newProperties : newProperties[0]
      );
    }
  };

  const isSelected = (propertyName: string) =>
    Array.isArray(transitionProperty)
      ? transitionProperty.includes(propertyName)
      : transitionProperty === propertyName;

  const transitionProperties: CSSTransitionProperties = {
    transitionProperty: transitionProperty as CSSTransitionProperty,
    ...transitionSettings,
  };

  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.buttons}>
          {PROPERTIES.map((property, index) => (
            <Button
              key={index}
              title={property}
              style={[
                flex.grow,
                isSelected(property)
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handleSelect(property)}
            />
          ))}
        </View>

        <View style={styles.preview}>
          <Animated.View
            style={[
              transitionProperties,
              transitionStyles[currentStyleIndex],
            ]}
          />
        </View>

        <Animated.View
          layout={LinearTransition}
          style={styles.styleChangeWrapper}>
          {displayStyleChanges && (
            <TransitionStyleChange
              activeStyleIndex={currentStyleIndex}
              transitionStyles={transitionStyles}
            />
          )}
        </Animated.View>
        {/* <Checkbox
          label="Display style changes"
          selected={displayStyleChanges}
          onChange={setDisplayStyleChanges}
        /> */}
      </View>

      <TransitionConfiguration
        transitionProperties={transitionProperties}
        transitionStyles={transitionStyles}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: colors.primary,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    justifyContent: 'space-between',
  },
  content: {
    gap: spacing.xs,
  },
  inactiveButton: {
    backgroundColor: colors.primaryLight,
  },
  preview: {
    alignItems: 'center',
    backgroundColor: colors.background2,
    borderRadius: radius.md,
    height: sizes.xxl,
    justifyContent: 'center',
  },
  styleChangeWrapper: {
    overflow: 'hidden',
  },
});
