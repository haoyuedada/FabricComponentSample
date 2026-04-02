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

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Platform, StyleSheet, View,Button,Text,Pressable } from 'react-native';

import Animated, {
  FadeInDown,
  FadeOutDown,
  LayoutAnimationConfig,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, flex, radius, spacing } from '../../util/theme';

import ExpandableCard from './ExpandableCard';

import { type LabelType, TitleWithLabels } from '../../util/misc';
import { CodeBlock } from '../../layout/CodeBlock';

export type ExampleCardProps = PropsWithChildren<{
  code: string;
  title?: string;
  labelTypes?: Array<LabelType>;
  collapsedCode?: string;
  description?: Array<string> | string;
  collapsedExampleHeight?: number;
  minExampleHeight?: number;
  showRestartButton?: boolean;
}>;

export default function ExampleCard({
  children,
  code,
  collapsedCode,
  collapsedExampleHeight = 150,
  description,
  labelTypes,
  minExampleHeight,
  showRestartButton,
  title,
}: ExampleCardProps) {
  const [key, setKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const exampleContainerDimensions = useSharedValue<{
    width: number;
    height: number;
  } | null>(null);

  const animatedExampleStyle = useAnimatedStyle(() => {
    if (!exampleContainerDimensions.value) {
      return {};
    }

    const { height, width } = exampleContainerDimensions.value;

    return {
      height: withTiming(height),
      width: withTiming(width),
    };
  });

  const itemWrapperStyle: StyleProp<ViewStyle> = [
    styles.itemWrapper,
    {
      width: isExpanded ? undefined : '50%',
    },
  ];

  return (
    <LayoutAnimationConfig skipEntering skipExiting>
      <ExpandableCard
        expanded={isExpanded}
        showExpandOverlay
        onChange={setIsExpanded}>
        <View style={styles.titleRow}>
          <TitleWithLabels
            labelTypes={labelTypes}
            title={title}
            variant="subHeading2"
          />
          {showRestartButton && (
            <Button
              title="Restart"
              onPress={() => setKey((prev) => prev + 1)}
            />
          )}
        </View>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
        <View
          style={[
            styles.itemsContainer,
            isExpanded
              ? styles.itemsContainerExpanded
              : styles.itemsContainerCollapsed,
            { height: isExpanded ? 'auto' : collapsedExampleHeight },
          ]}>
          {/* Code block */}
          <Animated.View layout={LinearTransition} style={itemWrapperStyle}>
            <CodeBlock code={code} />
            {/* Render collapsedCode block as an overlay to ensure that the layout
            transition is smooth when the container is expanded/collapsed */}
            {collapsedCode && !isExpanded && (
              <Animated.View
                entering={FadeInDown}
                exiting={FadeOutDown}
                style={styles.collapsedCodeOverlay}>
                <Pressable
                  style={flex.fill}
                  onPress={() => setIsExpanded(true)}>
                  <CodeBlock code={collapsedCode} />
                </Pressable>
              </Animated.View>
            )}
          </Animated.View>
          {/* Example */}
          <Animated.View
            layout={LinearTransition}
            style={[
              flex.center,
              itemWrapperStyle,
              {
                minHeight:
                  minExampleHeight ??
                  Math.min(minExampleHeight ?? 150, collapsedExampleHeight),
              },
            ]}
            onLayout={({
              nativeEvent: {
                layout: { height, width },
              },
            }) => {
              exampleContainerDimensions.value = { height, width };
            }}>
            {/* This is a tricky way to ensure that the example is centered within
            the parent container during the layout transition. To do this, we wrap the
            example in a parent with 0x0 dimensions, which is centered in its parent and
            render another example wrapper with measured example container dimensions set
            via the animated style. Thanks to this, the example always stays centered inside
            the parent component and its dimensions are smoothly updated when the layout
            changes. */}
            <Animated.View
              layout={LinearTransition}
              style={styles.exampleOuterContainer}>
              <Animated.View
                key={key}
                style={[flex.center, animatedExampleStyle]}>
                {children}
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
      </ExpandableCard>
    </LayoutAnimationConfig>
  );
}

const styles = StyleSheet.create({
  collapsedCodeOverlay: {
    ...Platform.select<ViewStyle>({
      default: StyleSheet.absoluteFillObject,
      web: { height: '100%', position: 'absolute', width: '100%' },
    }),
    backgroundColor: colors.background2,
    padding: spacing.xs,
  },
  description: {
    marginBottom: spacing.sm,
  },
  exampleOuterContainer: {
    ...flex.center,
    height: 0,
    width: 0,
  },
  itemWrapper: {
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    overflow: 'hidden',
    padding: spacing.xs,
  },
  itemsContainer: {
    gap: spacing.sm,
  },
  itemsContainerCollapsed: {
    flexDirection: 'row',
    paddingRight: spacing.sm,
  },
  itemsContainerExpanded: {
    flexDirection: 'column',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
});
