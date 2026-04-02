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

import { isSerializableRef, createSerializable } from 'react-native-worklets';
import { useState } from 'react';
import {Animated, Button, ScrollView, StyleSheet, Text, View} from 'react-native';

interface TestDemoProps {
    str: string; 
    obj: any;
  }
export default function IsSerializableRefExample() { 
    const [createSerializableStr, setCreateSerializableStr] = useState<string>("");
    const [isSerializableStr, setIsSerializableStr] = useState<string>("");
    const TestDemo = ({str, obj }: TestDemoProps) => {
        return (
            <View style={{height:50,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                <Button title={str} onPress={()=>{
                        const serializableRef = createSerializable(obj);
                        setCreateSerializableStr(JSON.stringify(serializableRef))
                        setIsSerializableStr(JSON.stringify(isSerializableRef(serializableRef)))
                }}></Button>
            </View>
        );
    };

    return (
        <Animated.View style={{width:'100%',height:'100%',flexDirection:'column',backgroundColor:'white'}}>
            <Text style={{color:"#000",marginTop:10}}>createSerializable结果：{createSerializableStr}</Text>
            <Text style={{color:"#000",marginTop:5}}>isSerializableRef结果：{isSerializableStr}</Text>
            <ScrollView >
                <TestDemo  str={"check if createSerializable<number>"} obj={1}/>
                <TestDemo   str={"check if createSerializable<object>"} obj={{ a: 1, b: '2' }}/>
                <TestDemo  str={"check if createSerializable<string>"} obj={'test'}/>
                <TestDemo  str={"check if createSerializable<boolean>"} obj={true}/>
                <TestDemo   str={"check if createSerializable<undefined>"} obj={undefined}/>
                <TestDemo  str={"check if createSerializable<bigint>"} obj={BigInt(123)}/>
                <TestDemo  str={"check if createSerializable<bigint>"} obj={BigInt(123)}/>
                <TestDemo str={"check if createSerializable<array>"} obj={
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
                <TestDemo  str={"check if createSerializable<Set>"} obj={new Set([1, '1', true])}/>

                <TestDemo  str={"check if createSerializable<Map>"} obj={new Map<any, any>([
                        [1, 2],
                        ['1', '2'],
                        [true, false],
                    ])}/>

                <TestDemo  str={"check if createSerializable<Error>"} obj={new Error('error')}/>
                <TestDemo  str={"check if createSerializable<RegExp>"} obj={/a/}/>
                <TestDemo str={"check if createSerializable<complex object>"} obj={{
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

                <TestDemo  str={"check if createSerializable<function>"} obj={() => {
                        'worklet';
                        return 1;
                    }}/>

                <TestDemo str={"check if createSerializable<ArrayBuffer>"} obj={new ArrayBuffer(3)}/>
            </ScrollView>
        </Animated.View>



    

    );
}