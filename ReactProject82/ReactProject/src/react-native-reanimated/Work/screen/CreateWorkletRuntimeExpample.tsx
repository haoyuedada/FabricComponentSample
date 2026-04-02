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

import {
    createWorkletRuntime,
    scheduleOnRN,
    scheduleOnRuntime,
    scheduleOnUI,
    WorkletRuntime,
  } from 'react-native-worklets';
  import { useState } from 'react';

  import { View,Text,Button } from 'react-native';

  export default function CreateWorkletRuntimeExpample() { 
    const [textResult,setTextResult] = useState<string>("")
    const handlePress = () => {
        const runtime = createWorkletRuntime({ name: 'foo' });
        console.log(runtime);
        console.log(runtime.name);
        console.log(`${runtime}`);
        console.log(String(runtime));
        setTextResult(String(runtime));
      };
    
    return (
        <View style={{backgroundColor: 'white',flex:1}}>

            <Text style={{marginBottom:20,marginTop:20}}>runTime:{textResult}</Text>

            <Button
                   title="CreateWorkletRuntime"
                    onPress={handlePress}
            />

        </View>
    );
  }