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

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faCog,
  faComment,
  faHeart,
  faHome,
  faPhone,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import type { CSSTransitionProperties } from 'react-native-reanimated';
import Animated, { cubicBezier } from 'react-native-reanimated';


import { colors, flex, iconSizes, radius, sizes, spacing } from '../../util/theme';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function CircularPopupMenu() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CircularMenu />
    </ScrollView>
  );
}

const MENU_ITEMS = [
  { icon: faHome },
  { icon: faHeart },
  { icon: faComment },
  { icon: faStar },
  { icon: faPhone },
  { icon: faCog },
];

function CircularMenu() {
  const [open, setOpen] = useState(false);

  return (
    <GestureHandlerRootView>
    <View style={flex.center}>
      {MENU_ITEMS.map((item, index) => (
        <MenuItem icon={item.icon} index={index} key={index} open={open} />
      ))}
      <GestureDetector
        gesture={Gesture.Tap()
          .onEnd(() => setOpen(!open))
          .runOnJS(true)}>
        <Animated.View
          style={[
            styles.menuButtonWrapper,
            {
              backgroundColor: open ? colors.primaryDark : colors.primary,
              transform: [{ scale: open ? 0.75 : 1 }],
              transitionDuration: 400,
              transitionProperty: ['all', 'backgroundColor'],
              transitionTimingFunction: [
                cubicBezier(0.175, 0.885, 0.32, 1.275),
                'ease-out',
              ],
            },
          ]}>
          <MenuButton open={open} />
        </Animated.View>
      </GestureDetector>
    </View>
    </GestureHandlerRootView>
  );
}

const BUTTON_SIZE = sizes.xs;

type MenuButtonProps = {
  open: boolean;
};

function MenuButton({ open }: MenuButtonProps) {
  const transitionProperties: CSSTransitionProperties = {
    transitionDuration: 200,
    transitionProperty: 'all',
  };
  const lineStyle = [transitionProperties, styles.menuButtonLine];

  return (
    <View style={styles.menuButton}>
      <Animated.View
        style={[
          lineStyle,
          {
            transform: open
              ? [{ rotate: '45deg' }]
              : [{ translateY: -0.3 * BUTTON_SIZE }],
          },
        ]}
      />
      <Animated.View
        style={[
          lineStyle,
          {
            opacity: open ? 0 : 1,
          },
        ]}
      />
      <Animated.View
        style={[
          lineStyle,
          {
            transform: open
              ? [{ rotate: '-45deg' }]
              : [{ translateY: 0.3 * BUTTON_SIZE }],
          },
        ]}
      />
    </View>
  );
}

type MenuItemProps = {
  icon: IconDefinition;
  open: boolean;
  index: number;
};

function MenuItem({ icon, index, open }: MenuItemProps) {
  const angle = 180 + (index * 360) / MENU_ITEMS.length;

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.menuItem,
        {
          transform: open
            ? [
                { rotate: `${angle}deg` },
                { translateY: 3.5 * BUTTON_SIZE },
                { rotate: `-${angle}deg` },
                { scale: 1.2 },
              ]
            : [
                { rotate: `${angle}deg` },
                { translateY: 0 },
                { rotate: `-${angle}deg` },
              ],
          transitionDuration: open ? 180 + index * 100 : 200,
          transitionProperty: 'transform',
          transitionTimingFunction: cubicBezier(0.935, 0, 0.34, 1.33),
        },
      ]}>
      <FontAwesomeIcon color={colors.white} icon={icon} size={iconSizes.lg} />
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...flex.center,
  },
  menuButton: {
    ...flex.center,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
  },
  menuButtonLine: {
    backgroundColor: colors.white,
    borderRadius: radius.full,
    height: 3,
    position: 'absolute',
    width: '100%',
  },
  menuButtonWrapper: {
    borderRadius: radius.full,
    padding: spacing.lg,
  },
  menuItem: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    padding: spacing.md,
    position: 'absolute',
  },
});
