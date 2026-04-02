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

import { useCallback, useState } from 'react';
import { StyleSheet, View,Button,Text, ScrollView,Pressable } from 'react-native';
import type {
  CSSTransitionProperties,
  CSSTransitionSettings,
  StyleProps,
} from 'react-native-reanimated';
import Animated, {
  cubicBezier,
  LinearTransition,
} from 'react-native-reanimated';


import {
  TransitionConfiguration,
  TransitionStyleChange,
} from '../components';
import { colors, flex, radius, sizes, spacing } from '../../util/theme';
import { typedMemo } from '../../util/utils';

const SETTINGS_OPTIONS = {
  transitionBehavior: ['normal', 'allow-discrete'],
  transitionDelay: ['-5s', '0s', '1s', '2s', '5s'],
  transitionDuration: [0, '250ms', '1s', '2s', '5s', '10s'],
  transitionTimingFunction: [
    'ease',
    'linear',
    'ease-in',
    'ease-out',
    cubicBezier(0.42, 0, 0.58, 1),
  ],
} satisfies {
  [K in keyof CSSTransitionSettings]: Array<CSSTransitionSettings[K]>;
};

const DEFAULT_SETTINGS: {
  [K in keyof typeof SETTINGS_OPTIONS]: (typeof SETTINGS_OPTIONS)[K][number];
} = {
  transitionBehavior: 'normal',
  transitionDelay: '0s',
  transitionDuration: '1s',
  transitionTimingFunction: 'ease',
};

const TRANSITION_STYLES: Array<StyleProps> = [
  { width: sizes.md },
  { width: sizes.xxxl },
];

export default function UpdatingTransitionSettings() {
  const [transitionProperties, setTransitionProperties] =
    useState<CSSTransitionProperties>({
      transitionProperty: 'all',
      ...DEFAULT_SETTINGS,
    });
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [displayStyleChanges, setDisplayStyleChanges] = useState(true);

  const handleResetSettings = useCallback(() => {
    setTransitionProperties((prev) => ({
      ...prev,
      ...DEFAULT_SETTINGS,
    }));
  }, []);

  const handleOptionSelect = useCallback(
    <T extends keyof CSSTransitionSettings>(
      propertyName: T,
      value: CSSTransitionSettings[T]
    ) => {
      setTransitionProperties((prev) => ({
        ...prev,
        [propertyName]: value,
      }));
    },
    []
  );

  return (
    <ScrollView style={{backgroundColor:'white'}}>
          <View style={styles.content}>
            <View style={styles.config}>
              {Object.entries(SETTINGS_OPTIONS).map(
                ([propertyName, options]) => {
                  const key = propertyName as keyof CSSTransitionSettings;
                  console.log("sssss----->key:"+key +":options:"+options)
                  return (
                    <ConfigOptionsRow
                      key={propertyName}
                      options={options}
                      propertyName={key}
                      selected={transitionProperties[key]}
                      onSelect={handleOptionSelect}
                    />
                  );
                }
              )}
            </View>

            <Animated.View layout={LinearTransition} style={styles.buttons}>
              <View style={styles.buttonRow}>
                <Text>Reset settings</Text>
                <Button
                  style={styles.button}
                  title="Reset"
                  onPress={handleResetSettings}
                />
              </View>

              <View style={styles.buttonRow}>
                <Text>Run transition</Text>
                <Button
                  style={styles.button}
                  title="Run"
                  onPress={() =>
                    setCurrentStyleIndex(
                      (prev) => (prev + 1) % TRANSITION_STYLES.length
                    )
                  }
                />
              </View>
            </Animated.View>

            <Animated.View layout={LinearTransition} style={styles.preview}>
              <Animated.View
                style={[
                  styles.box,
                  transitionProperties,
                  TRANSITION_STYLES[currentStyleIndex],
                ]}
              />
            </Animated.View>

            <Animated.View
              layout={LinearTransition}
              style={styles.styleChangeWrapper}>
              {displayStyleChanges && (
                <TransitionStyleChange
                  activeStyleIndex={currentStyleIndex}
                  transitionStyles={TRANSITION_STYLES}
                />
              )}
            </Animated.View>

            <Button
                  style={styles.button}
                  title="Display style changes"
                  onPress={() =>
                    setDisplayStyleChanges(!displayStyleChanges)
                  }
              />
          </View>
 
          <TransitionConfiguration
            transitionProperties={transitionProperties}
            transitionStyles={TRANSITION_STYLES}
          />
    </ScrollView>
  );
}

type ConfigOptionsRowProps<T extends keyof CSSTransitionSettings> = {
  propertyName: T;
  options: Array<CSSTransitionSettings[T]>;
  selected: CSSTransitionSettings[T];
  onSelect: (propertyName: T, value: CSSTransitionSettings[T]) => void;
};

const ConfigOptionsRow = typedMemo(function ConfigOptionsRow<
  T extends keyof typeof SETTINGS_OPTIONS,
>({ onSelect, options, propertyName, selected }: ConfigOptionsRowProps<T>) {
  return (
    <View style={styles.configRow}>
      <Text style={flex.shrink}>
        {propertyName}
      </Text>

      {
      propertyName === 'transitionBehavior' ? (
        <ScrollView style={styles.config}  horizontal={true}>
          <Button
                  style={styles.button}
                  title="normal"
                  onPress={() => onSelect(propertyName, 'normal')}
            />
           <Button
                style={styles.button}
                title="allow-discrete"
                onPress={() => onSelect(propertyName, 'allow-discrete')}
          />
          </ScrollView>
      ) : (
        <ScrollView style={styles.config}  horizontal={true}>
          {
             options.map((option) => (
              <Button
                key={option}
                style={styles.button}
                title={option?.toString() ?? ''}
                onPress={() => onSelect(propertyName, option)}
              />
            ))
          }
 
        </ScrollView>
        // <SelectListDropdown
        //   alignment="right"
        //   selected={selected}
        //   styleOptions={{ inputStyle: styles.selectInput }}
        //   options={options.map((option) => ({
        //     label: option?.toString() ?? '',
        //     value: option,
        //   }))}
        //   onSelect={(option) => onSelect(propertyName, option)}
        // />
      )
      }
    </View>
  );
});

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: sizes.md,
  },
  button: {
    width: 75,
  },
  buttonRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    gap: spacing.xxxs,
  },
  config: {
    gap: spacing.xs,
  },
  configRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  content: {
    gap: spacing.sm,
  },
  preview: {
    alignItems: 'center',
    backgroundColor: colors.background2,
    borderRadius: radius.md,
    height: sizes.xxl,
    justifyContent: 'center',
  },
  selectInput: {
    width: sizes.xxl,
  },
  styleChangeWrapper: {
    overflow: 'hidden',
  },
});
