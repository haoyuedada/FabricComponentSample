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

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle} from 'react-native';
import { Pressable, StyleSheet ,Text} from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

import { colors, sizes, spacing } from '../../util/theme';

export type ExpandableCardProps = PropsWithChildren<{
  expanded: boolean;
  onChange?: (expanded: boolean) => void;
  showExpandOverlay?: boolean;
  overlayHeight?: number;
  style?: StyleProp<ViewStyle>;
}>;

export default function ExpandableCard({
  children,
  expanded,
  onChange,
  overlayHeight = sizes.lg,
  showExpandOverlay,
  style,
}: ExpandableCardProps) {
  const animatedGradientStyle = useAnimatedStyle(() => ({
    opacity: withTiming(+!expanded),
  }));

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        styles.container,
        { paddingBottom: showExpandOverlay ? spacing.lg : spacing.sm },
        style,
      ]}>
      {children}

      {/* Overlay */}
      {showExpandOverlay && (
        <Animated.View
          layout={LinearTransition}
          style={[styles.overlay, { height: overlayHeight }]}>
          <Animated.View style={[styles.gradient, animatedGradientStyle]}>
            <Svg height={overlayHeight} width="100%">
              {/* TODO: Fix me */}
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore RNSVG doesn't export types for web, see https://github.com/software-mansion/react-native-svg/pull/2801 */}
              <Defs>
                <LinearGradient
                  id="vertical-gradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1">
                  <Stop
                    offset="0"
                    stopColor={colors.background1}
                    stopOpacity="0"
                  />
                  <Stop
                    offset="0.8"
                    stopColor={colors.background1}
                    stopOpacity="1"
                  />
                </LinearGradient>
              </Defs>

              <Rect fill="url(#vertical-gradient)" height="100%" width="100%" />
            </Svg>
          </Animated.View>

          {/* Expand/Collapse button */}
          <Pressable
            style={styles.expandButton}
            onPress={() => onChange?.(!expanded)}>
            <FontAwesomeIcon
              color={colors.primary}
              icon={expanded ? faChevronUp : faChevronDown}
              size={sizes.xxxs}
            />
            <Text style={styles.expandButtonText}>
              {expanded ? 'Collapse' : 'Expand'}
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  expandButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  expandButtonText: {
    color: colors.primary,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  overlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    pointerEvents: 'box-none',
    position: 'absolute',
    right: 0,
  },
});
