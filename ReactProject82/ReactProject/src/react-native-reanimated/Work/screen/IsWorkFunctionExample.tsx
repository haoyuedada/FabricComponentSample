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

import { isWorkletFunction } from 'react-native-worklets';
  
  import React, { useState } from 'react';
  import { Platform, StyleSheet, Text, View,Button } from 'react-native';

export default function IsWorkFunctionExample() {
const [textResult,setTextResult] = useState<string>("")

const workletFunction = () => {
    'worklet';
    return 1;
  };

  const nonWorkletFunction = () => {
    return 1;
  };

 return (
    <View style={styles.container}>
        
        <Text>isWorkletFunction:{textResult}</Text>

        <Button
           title="Wroklet function"
                onPress={() => {
                    setTextResult(JSON.stringify(isWorkletFunction(workletFunction)))
                }}
         />
        <Button
           title="not Wroklet function"
                onPress={() => {
                    setTextResult(JSON.stringify(isWorkletFunction(nonWorkletFunction)))
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
  });