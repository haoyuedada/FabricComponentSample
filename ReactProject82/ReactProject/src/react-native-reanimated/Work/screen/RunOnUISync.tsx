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

import { runOnUISync  } from 'react-native-worklets';
import Animated, { useSharedValue, useAnimatedStyle,withTiming } from 'react-native-reanimated';  
import React, { useState } from 'react';
import {  StyleSheet, Text, View,Button } from 'react-native';

export default function RunOnUISync() {
const [textResult,setTextResult] = useState<string>("")
const sharedValue = useSharedValue(10);
const runOnUISyncFun = (num: number): string => {
  'worklet';
  return "runOnUISync:"+num;
};


const animatedStyles = useAnimatedStyle(() => ({
  width: sharedValue.value,
}));


const handlerPress =()=>{
  /**
   * 接收数值并更新共享值的worklet回调函数
   *
   * @param num - 要设置的数值
   */
  const callback = async (num: number) => {
    'worklet';
    sharedValue.value = withTiming(num, { duration: 1000 } );
  };
  runOnUISync(callback, 120);
}


 return (
    <View style={styles.container}>
        
        <Text>runOnUIAsync:{textResult}</Text>

        <Button
           title="run"
                onPress={ async() => {
                   const result: string = runOnUISync(runOnUISyncFun, 0);
                  setTextResult(JSON.stringify(result))
                }}
         />

        <Animated.View style={[styles.circle, animatedStyles]} />

        <Button
           title="runAnimation"
                onPress={async () => {
                  handlerPress();
                }}
         />
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:"white"
    },
    text: {
      fontSize: 16,
      marginVertical: 4,
    },
    bold: {
      fontWeight: 'bold',
    },
    circle: {
      height: 120,
      width: 120,
      borderRadius: 500,
      backgroundColor: 'red'
    },
  });