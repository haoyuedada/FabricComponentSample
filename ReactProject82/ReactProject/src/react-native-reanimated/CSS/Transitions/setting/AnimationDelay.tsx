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

import { StyleSheet, View ,Button, Text,ScrollView } from 'react-native';
import type {
  CSSTransitionProperties,
  CSSAnimationProperties,
  StyleProps,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { colors, radius, sizes } from '../../util/theme';
import { useState } from 'react';

const cardArray =[
  {
    description: [
      '**Transition behavior** determines whether the transition is applied to **discrete properties**. By default, `transitionBehavior` is `normal`, which applies transition only to **continuous properties** and discrete property changes are **applied immediately**. `allow-discrete` allows transitions to be applied to **discrete properties**, resulting in **delayed changes**.',
      'Discrete-animated properties generally flip between two values **at the midpoint** of the animation, except for the `display` property, which is changed at the moment of the **transition start**.',
    ],
    items: [
      { label: 'normal (default)' },
      { label: 'allow-discrete', transitionBehavior: 'allow-discrete' },
    ],
    title: 'Transition Behavior',
  },
]

const animation={
    animationDuration: '3s',
    animationFillMode: 'backwards',
    animationName: {
      from: {
        width: 0,
      },
      to: {
        width: '100%',
      },
    },
    animationTimingFunction: 'linear',
  }

const renderExample=(    exampleConfig: CSSTransitionProperties, style: StyleProps) => (
    <Animated.View style={[styles.wrapper, exampleConfig, style]}>
    {Array.from({ length: 3 }).map((_, index) => (
      <Animated.View key={index} style={styles.box} />
    ))}
  </Animated.View>
)

function AnimationDelayItem({
    allowPause,
    animation,
    items,
    onTogglePause,
    renderExample,
  }: ExamplesListCardProps) {
    const [isPaused, setIsPaused] = useState(false);

    const animationPlayState = isPaused ? 'paused' : 'running';
    return (
        <View style={styles.container}>
    
          <View style={styles.examples}>
            {/* Labels column */}
            <View style={[styles.column, { flexShrink: 1 }]}>
              {items.map((item, index) => (
                <Text key={index} style={styles.label}>
                  {item.label}
                </Text>
              ))}
            </View>
    
            {/* Examples column */}
            <View style={[styles.column, { flexGrow: 1 }]}>
              {items.map((item, index) => (
                <View key={index}>
                  {renderExample({
                    ...animation,
                    ...item,
                    ...(allowPause ? { animationPlayState } : {}),
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      );
}

export default function AnimationDelay(){
    return (
        <View style={{backgroundColor:"white",flex:1}}>
        {cardArray.map((card) => (
               <AnimationDelayItem
                animation={animation}
                items={card.items}
                renderExample={renderExample}
                />
        ))}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    column: {
      gap: spacing.xs,
      justifyContent: 'space-around',
      maxWidth: '55%',
    },
    container: {
      gap: spacing.xs,
    },
    examples: {
      flexDirection: 'row',
      gap: spacing.xs,
      justifyContent: 'space-between',
    },
    label: {
      flexShrink: 1,
    },
    pauseButton: {
      width: 72,
    },
    box: {
        backgroundColor: colors.primary,
        borderRadius: radius.sm,
        height: sizes.sm,
      },
      wrapper: {
        backgroundColor: colors.primaryLight,
        borderRadius: radius.sm,
        overflow: 'hidden',
      },
  });