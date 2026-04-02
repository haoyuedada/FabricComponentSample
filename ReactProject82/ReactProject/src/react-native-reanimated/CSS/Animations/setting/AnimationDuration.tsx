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
import type {
  CSSAnimationProperties,
  CSSAnimationSettings,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {  spacing,colors, radius, sizes } from '../../util/theme';
import {ExampleItemProps,ExamplesListCardProps} from '../ReanimatedExampleProps'

const cardArray =[
    {
        title: 'Positive Duration',
        items:[
            { animationDuration: '500ms', label: '500ms' },
            { animationDuration: '2s', label: '2s' },
            { animationDuration: 3500, label: '3500' },
        ]
    }
]

const animation={
    animationDuration: '3s',
    animationFillMode: 'forwards',
    animationName: {
      from: {
        width: 0,
      },
      to: {
        width: '100%',
      },
    },
  }

const renderExample=(animation: CSSAnimationProperties) => (
<View style={styles.wrapper}>
    <Animated.View style={[styles.box, animation]} />
</View>
)

function AnimationDurationItem({
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

export default function AnimationDuration(){
    return (
        <View style={{backgroundColor:"white",flex:1}}>
        {cardArray.map((card) => (
               <AnimationDurationItem
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
        width: 0,
      },
      wrapper: {
        backgroundColor: colors.primaryLight,
        borderRadius: radius.sm,
        overflow: 'hidden',
      },
  });