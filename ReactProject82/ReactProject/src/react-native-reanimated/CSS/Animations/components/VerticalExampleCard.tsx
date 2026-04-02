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
import { useState } from 'react';
import { Pressable, StyleSheet, View,Text,Button } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  LayoutAnimationConfig,
  LinearTransition,
} from 'react-native-reanimated';

import { colors, flex, radius, sizes, spacing } from '../../util/theme';

import ExpandableCard from './ExpandableCard';


import { TitleWithLabels } from '../../util/misc';
import { CodeBlock } from '../../layout/CodeBlock';
import type { ExampleCardProps } from './ExampleCard';

export default function VerticalExampleCard({
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <LayoutAnimationConfig skipEntering skipExiting>
      <ExpandableCard expanded={true}>
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
        <Animated.View style={styles.itemsContainer}>
          {/* Code block */}
          <Animated.View layout={LinearTransition} style={styles.itemWrapper}>
            {collapsedCode && !isExpanded && (
              <Animated.View entering={FadeInDown} style={styles.collapsedCode}>
                <Pressable
                  style={flex.fill}
                  onPress={() => setIsExpanded(true)}>
                  <CodeBlock code={collapsedCode} />
                </Pressable>
              </Animated.View>
            )}
            {code && isExpanded && (
              <Animated.View entering={FadeInUp} style={styles.expandedCode}>
                <CodeBlock code={code} />
              </Animated.View>
            )}
          </Animated.View>
          <Animated.View layout={LinearTransition}>
            <Pressable
              style={styles.expandButton}
              onPress={() => setIsExpanded(!isExpanded)}>
              <FontAwesomeIcon
                color={colors.primary}
                icon={isExpanded ? faChevronUp : faChevronDown}
                size={sizes.xxxs}
              />
              <Text style={styles.expandButtonText} variant="label2">
                {isExpanded ? 'Collapse' : 'Expand'}
              </Text>
            </Pressable>
          </Animated.View>
          {/* Example */}
          <Animated.View
            key={key}
            layout={LinearTransition}
            style={[
              styles.itemWrapper,
              flex.center,
              {
                minHeight:
                  minExampleHeight ??
                  Math.min(
                    minExampleHeight ?? collapsedExampleHeight,
                    collapsedExampleHeight
                  ),
              },
            ]}>
            {children}
          </Animated.View>
        </Animated.View>
      </ExpandableCard>
    </LayoutAnimationConfig>
  );
}

const styles = StyleSheet.create({
  collapsedCode: {
    backgroundColor: colors.background2,
    height: 'auto',
    padding: spacing.xs,
  },
  description: {
    marginBottom: spacing.sm,
  },
  expandButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
  },
  expandButtonText: {
    color: colors.primary,
  },
  expandedCode: {
    backgroundColor: colors.background2,
    height: 'auto',
    padding: spacing.xs,
  },
  itemWrapper: {
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    overflow: 'hidden',
    padding: spacing.xs,
  },
  itemsContainer: {
    flexDirection: 'column',
    gap: spacing.sm,
    height: 'auto',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'space-between',
  },
});
