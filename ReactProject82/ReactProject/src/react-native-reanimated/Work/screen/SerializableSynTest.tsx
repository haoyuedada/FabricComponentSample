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

import { isSynchronizable, createSynchronizable,callMicrotasks } from 'react-native-worklets';
import { useState } from 'react';
import {Animated, Button, ScrollView, StyleSheet, Text, View} from 'react-native';

interface TestDemoProps {
    str: string; 
    obj: any;
  }
export default function IsSerializableRefExample() { 
    const [createSynchronizableStr, setcreateSynchronizableStr] = useState<string>("");
    const [isSynchronizableStr, setIsSynchronizableStr] = useState<string>("");
const TestDemo = ({str, obj }: TestDemoProps) => {
return (
    <View style={{height:80,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
        <Button title={str} onPress={()=>{
                 const synchronizable = createSynchronizable(obj);
                 setcreateSynchronizableStr(JSON.stringify(synchronizable))
                 setIsSynchronizableStr(JSON.stringify(isSynchronizable(synchronizable)))
        }}></Button>
    </View>
);
};

return (
    <Animated.View style={{width:'100%',height:'100%',flexDirection:'column',backgroundColor:'white'}}>
    <Text style={{color:"#000",marginTop:10}}>createSynchronizableSt结果：{createSynchronizableStr}</Text>
    <Text style={{color:"#000",marginTop:5}}>isSynchronizable结果：{isSynchronizableStr}</Text>
    <ScrollView >
        <TestDemo   str={"check if createSynchronizable<number>"} obj={1}/>
        <TestDemo  str={"check if createSynchronizable<string>"} obj={'test'}/>
        <TestDemo  str={"check if createSynchronizable<string>"} obj={'test'}/>
        <TestDemo   str={"check if createSynchronizable<boolean>"} obj={true}/>
        <TestDemo   str={"check if createSynchronizable<undefined>"} obj={undefined}/>
        <TestDemo   str={"check if createSynchronizable<null>"} obj={null}/>
        <TestDemo   str={"check if createSynchronizable<bigint>"} obj={BigInt(123)}/>
        <TestDemo  str={"check if createSynchronizable<array>"} obj={
                        [
                            1,
                            true,
                            false,
                            null,
                            undefined,
                            'a',
                            BigInt(123),
                            { a: 1 },
                            () => 1,
                            [1],
                            () => {
                              'worklet';
                              return 1;
                            },
                            /a/,
                            new ArrayBuffer(3),
                          ]
                    }/>
        <TestDemo   str={"check if createSynchronizable<Set>"} obj={new Set([1, '1', true])}/>
        <TestDemo   str={"check if createSynchronizable<Map>"} obj={new Map<any, any>([
                                    [1, 2],
                                    ['1', '2'],
                                    [true, false],
                                ])}/>

        <TestDemo  str={"check if createSynchronizable<Error>"} obj={new Error('error')}/>
        <TestDemo  str={"check if createSynchronizable<RegExp>"} obj={/a/}/>
        <TestDemo   str={"check if createSynchronizable<complex object>"} obj={{
                            number: 1,
                            true: true,
                            false: false,
                            null: null,
                            undefined: undefined,
                            string: 'test',
                            bigint: BigInt(123),
                            object: { f: 4, g: 'test' },
                            remoteFunction: () => 1,
                            array: [1],
                            workletFunction: () => {
                              'worklet';
                              return 2;
                            },
                            initializer: /test/,
                            arrayBuffer: new ArrayBuffer(3),
                          }}/>


        <TestDemo str={"check if createSynchronizable<function>"} obj={() => {
                                    'worklet';
                                    return 1;
                                }}/>
        <TestDemo str={"check if createSynchronizable<ArrayBuffer>"} obj={new ArrayBuffer(3)}/>
    </ScrollView>
</Animated.View>

);
}