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

import React, { useEffect } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import type { EasingFunction, EasingFunctionFactory } from 'react-native-reanimated';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ActiveAnimatedComponent = ({
    easing,
    title,
  }: {
    easing: EasingFunction | EasingFunctionFactory | undefined;
    title: string;
  })  => {
    const widthSV = useSharedValue(0);
  
    const style = useAnimatedStyle(() => {
      return {
        width: withTiming(widthSV.value, easing ? { duration: 1000, easing } : { duration: 1000 }),
      };
    });
  
    useEffect(() => {
      widthSV.value = 100;
    }, [widthSV]);
  
    return (
       <View style={{flexDirection:'column',width:'100%',height:100,alignItems:'center'}}>
        <Text>{title}</Text>
        <Animated.View style={[styles.animatedBox, style]} />
      </View>
    );
  };
  
  const PassiveAnimatedComponent = ({ easing }: { easing: EasingFunction | EasingFunctionFactory | undefined }) => {
    const widthSV = useSharedValue(0);
  
    const style = useAnimatedStyle(() => {
      return {
        width: widthSV.value,
      };
    });
  
    useEffect(() => {
      widthSV.value = withTiming(100, easing ? { duration: 1000, easing } : { duration: 1000 });
    });
  
    return (
      <View style={{flex:1}}>
        <Animated.View style={[styles.animatedBox, style]} />
      </View>
    );
  };

  export default function EasingFunctionExample() {
    const linearEasingFactory:EasingFunctionFactory = {
        factory: () => {
            'worklet';
            return Easing.bounce;
        }
    }
    const linearEasingfun:EasingFunction = ()=>{
        'worklet';
        return 6;
    }
    return (
        <View style={styles.container}>
           <ActiveAnimatedComponent easing={Easing.linear} title={'Easing.linear'} />
           <ActiveAnimatedComponent easing={linearEasingfun} title={'Easing.EasingFunction'} />
           <ActiveAnimatedComponent easing={linearEasingFactory} title={'Easing.EasingFunctionFactory'} />
        </View>
    );

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor:'white'
    },
    animatedBox: {
      backgroundColor: '#b58df1',
      height: 80,
    },
  });
  