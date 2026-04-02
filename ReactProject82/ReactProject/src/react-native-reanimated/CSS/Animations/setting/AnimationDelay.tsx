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
import type { CSSAnimationProperties } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {  spacing,colors, radius, sizes } from '../../util/theme';
import { useState } from 'react';
import {ExampleItemProps,ExamplesListCardProps} from '../ReanimatedExampleProps'


const cardArray =[
    {
        items: [
          { label: '0s (default)' },
          { animationDelay: '500ms', label: '500ms' },
          { animationDelay: '2s', label: '2s' },
          { animationDelay: 3500, label: '3500' },
        ],
        title: 'Positive Delay',
      },
      {
        description:
          'A negative value causes the animation to begin immediately, but partway through its cycle. For example, if you specify -1s as the animation delay time, the animation will begin immediately but will start 1 second into the animation sequence.',
        items: [
          { label: '0s (default)' },
          { animationDelay: '-500ms', label: '-500ms' },
          { animationDelay: '-1s', label: '-1s' },
          { animationDelay: -2000, label: '-2000' },
        ],
        title: 'Negative Delay',
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

const renderExample=(animation: CSSAnimationProperties) => (
<View style={styles.wrapper}>
    <Animated.View style={[styles.box, animation]} />
</View>
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
        {cardArray.map((card,index) => (
               <AnimationDelayItem
                key={index}
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
      },
      wrapper: {
        backgroundColor: colors.primaryLight,
        borderRadius: radius.sm,
        overflow: 'hidden',
      },
  });