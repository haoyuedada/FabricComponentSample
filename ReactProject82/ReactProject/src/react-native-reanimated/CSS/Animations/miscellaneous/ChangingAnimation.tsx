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

import { useState } from 'react';
import { StyleSheet, View ,Text, Button ,ScrollView} from 'react-native';
import type {
  CSSAnimationProperties,
  CSSAnimationSettings,
} from 'react-native-reanimated';
import Animated, { css, LinearTransition } from 'react-native-reanimated';
import { colors, flex, radius, sizes, spacing } from '../../util/theme';
import { stringifyConfig } from '../../util/utils';
const animationSettings: CSSAnimationSettings = {
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
};

const wiggle = css.keyframes({
  '0%, 100%': {
    transform: [{ rotate: '-15deg' }],
  },
  '50%': {
    transform: [{ rotate: '15deg' }],
  },
});

const fade = css.keyframes({
  to: {
    opacity: 0,
  },
});

const color = css.keyframes({
  to: {
    backgroundColor: colors.primaryDark,
  },
});

const jump = css.keyframes({
  '0%, 100%': {
    top: 0,
  },
  '50%': {
    top: '-50%',
    transform: [{ translateY: '50%' }],
  },
});

const roll = css.keyframes({
  to: {
    transform: [{ rotate: '360deg' }],
  },
});

const ANIMATIONS: Array<{ name: string } & CSSAnimationProperties> = [
  { animationDuration: '0.5s', animationName: wiggle, name: 'Wiggle' },
  { animationName: fade, name: 'Fade' },
  { animationName: color, name: 'Color' },
  { animationName: jump, name: 'Jump' },
  { animationName: roll, name: 'Roll' },
];

export default function ChangingAnimation() {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(0);

  const { name, ...animationProps } =
    selectedIndex !== null ? ANIMATIONS[selectedIndex] : { name: undefined };

  return (
    <ScrollView >
      <View style={{flex:1,flexDirection:"column",backgroundColor:'white',paddingTop:20}}>
          <View style={styles.content}>
            <View style={styles.buttonRow}>
              <Text>Remove animation</Text>
              <Button
                title="Remove"
                onPress={() => setSelectedIndex(null)}
              />
            </View>

            <View style={styles.buttons}>
              {ANIMATIONS.map((item, index) => (
                <Button
                  disabled={selectedIndex === index}
                  key={index}
                  style={flex.grow}
                  title={item.name}
                  onPress={() => setSelectedIndex(index)}
                />
              ))}
            </View>

            <View style={styles.preview}>
              <Animated.View
                style={[styles.box, animationSettings, animationProps]}
              />
            </View>
          </View>
                
          <Animated.View layout={LinearTransition} style={styles.codeWrapper}>
             <Text >{stringifyConfig({
                  ...animationSettings,
                  ...animationProps,
                })}</Text>
          </Animated.View>
   
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    height: sizes.md,
    width: sizes.md,
  },
  buttonRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xxs,
    justifyContent: 'space-between',
  },
  codeWrapper: {
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    padding: spacing.xs,
  },
  content: {
    gap: spacing.xs,
  },
  preview: {
    ...flex.center,
    backgroundColor: colors.background2,
    borderRadius: radius.md,
    height: sizes.xxl,
  },
});
