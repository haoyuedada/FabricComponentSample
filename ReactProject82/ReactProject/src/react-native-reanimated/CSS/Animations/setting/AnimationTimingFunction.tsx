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

import { useState, type JSX } from 'react';
import { StyleSheet, View ,Button, Text,ScrollView } from 'react-native';
import type { CSSAnimationProperties,CSSAnimationSettings } from 'react-native-reanimated';
import Animated, { cubicBezier, linear, steps } from 'react-native-reanimated';
import {  spacing,colors, radius, sizes } from '../../util/theme';
import {ExampleItemProps,ExamplesListCardProps} from '../ReanimatedExampleProps'


const animation: CSSAnimationProperties = {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: {
      from: {
        left: 0,
      },
      to: {
        left: '100%',
        transform: [{ translateX: '-100%' }],
      },
    },
  };

const renderExample=(animation: CSSAnimationProperties) => (
<View style={styles.wrapper}>
    <Animated.View style={[styles.box, animation]} />
</View>
)

const cardArray =[
      {
        animation,
        cards: [
          {
            items: [
              { animationTimingFunction: 'ease', label: 'ease' },
              { animationTimingFunction: 'ease-in', label: 'ease-in' },
              { animationTimingFunction: 'ease-out', label: 'ease-out' },
              {
                animationTimingFunction: 'ease-in-out',
                label: 'ease-in-out',
              },
              { animationTimingFunction: 'linear', label: 'linear' },
              { animationTimingFunction: 'step-start', label: 'step-start' },
              {
                animationFillMode: 'forwards',
                animationIterationCount: 1,
                animationTimingFunction: 'step-end',
                label: 'step-end',
              },
            ],
            title: 'Predefined Easings',
          },
        ],
        name: 'Predefined',
        renderExample,
      },
      {
        animation,
        cards: [
          {
            description:
              'Specify a Bézier curve to shape the progress of an animation. It is defined by two control points (x1, y1, x2, y2) that mathematically describe the curve.',
            items: [
              {
                animationTimingFunction: cubicBezier(0.2, 0.9, 0.8, 0.25),
                label: 'cubicBezier(\n 0.2, 0.9, 0.8, 0.25\n)',
              },
              {
                animationTimingFunction: cubicBezier(0.1, 1.5, 0.8, 1.5),
                label: 'cubicBezier(\n 0.1, 1.5, 0.8, 1.5\n)',
              },
              {
                animationTimingFunction: cubicBezier(0.3, 0, 1, 0),
                label: 'cubicBezier(\n 0.3, 0, 1, 0\n)',
              },
            ],
            title: 'Cubic Bezier Easing',
          },
        ],
        name: 'CubicBezier',
        renderExample,
      },
      {
        animation,
        cards: [
          {
            description:
              "Specify a simple polygonal chain that always starts at an x-value of 0 and ends at an x-value of 1. You can either specify the points' y and x coordinates or leave the x coordinates to be inferred.",
            items: [
              {
                animationTimingFunction: linear(0, [0.25, '75%'], 1),
                label: 'linear(\n 0, [0.25, "75%"], 1\n)',
              },
              {
                animationTimingFunction: linear(0, [0.25, '25%', '75%'], 1),
                label: 'linear(\n 0, [0.25, "25%", "75%"], 1\n)',
              },
              {
                animationTimingFunction: linear(
                  [0.6, '0%'],
                  [0.1, '50%'],
                  [1, '100%']
                ),
                label:
                  'linear(\n [0.6, "0%"],\n [0.1, "50%"],\n [1, "100%"]\n)',
              },
            ],
            title: 'Linear Easing with points',
          },
        ],
        name: 'Linear',
        renderExample,
      },
      {
        animation,
        cards: [
          {
            description:
              'Creates an easing function that makes given number of even steps over increasing y-values. The second argument is a modifier that adds jumps before or after the steps.',
            items: [
              {
                animationTimingFunction: steps(2, 'jump-start'),
                label: steps(2, 'jump-start').toString(),
              },
              {
                animationTimingFunction: steps(4, 'jump-end'),
                label: steps(4, 'jump-end').toString(),
              },
              {
                animationTimingFunction: steps(5, 'jump-none'),
                label: steps(5, 'jump-none').toString(),
              },
              {
                animationTimingFunction: steps(3, 'jump-both'),
                label: steps(3, 'jump-both').toString(),
              },
            ],
            title: 'Steps Easing',
          },
        ],
        name: 'Steps',
        renderExample,
      },
]

function AnimationTimingFunctionItem({
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

export default function AnimationTimingFunction(){
    return (
        <ScrollView style={{backgroundColor:"white",flex:1}}>
        {cardArray.map((value,index) => (
                value.cards.map((card,cardIndex)=>(
                    <AnimationTimingFunctionItem
                        animation={value.animation}
                        key={`${index}-${cardIndex}`} 
                        items={card.items}
                        renderExample={value.renderExample}
                        />
             ))
        ))
        }
        </ScrollView>
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
      backgroundColor:'white',
      paddingTop:20
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
        width: sizes.sm,
      },
      innerWrapper: {
        backgroundColor: colors.primaryLight,
        borderRadius: radius.sm,
      },
      outerWrapper: {
        backgroundColor: colors.background2,
        borderRadius: radius.sm,
        overflow: 'hidden',
        paddingHorizontal: sizes.sm / 2,
      },
  });