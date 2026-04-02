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
    createSerializable,
    createSynchronizable,
    createWorkletRuntime,
    getRuntimeKind,
    runOnUI,
    runOnJS,
    runOnUIAsync,
    registerCustomSerializable,
    runOnUISync,
    scheduleOnRN,
    scheduleOnRuntime,
    isWorkletFunction,
    scheduleOnUI,
    runOnRuntime,
    
  } from 'react-native-worklets';

  import { useState } from 'react';
  import {Animated, Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import {Tester, TestCase, TestSuite} from '@rnoh/testerino';

type IGlobalConstructorCarrier = {
    __isCustomObject: true;
    constructor: any;
  };
function GlobalConstructorCarrierFactory(constructor: any) {
    'worklet';
    // Workaround because `new` keyword is reserved for Worklet Classes...
    const GlobalConstructorCarrier = function GlobalConstructorCarrier(
      this: IGlobalConstructorCarrier,
      constructor: any,
    ) {
      this.__isCustomObject = true;
      this.constructor = constructor;
    } as unknown as {
      new (constructor: any): IGlobalConstructorCarrier;
    };
  
    return new GlobalConstructorCarrier(constructor);
  }

  const determine = (value: object): value is IGlobalConstructorCarrier => {
    'worklet';
    return (value as Record<string, unknown>).__isCustomObject === true;
  };
  
  const pack = (value: IGlobalConstructorCarrier) => {
    'worklet';
    const constructorName = value.constructor.name;
    return { constructorName };
  };
  
  const unpack = (value: { constructorName: string }) => {
    'worklet';
    return GlobalConstructorCarrierFactory((globalThis as any)[value.constructorName]);
  };  
export default function CustomSerializable() { 
  const [createWorkletRuntimeStr, setCreateWorkletRuntimeStr] = useState<string>("");
  const [getRuntimeKindStr, setGetRuntimeKindStr] = useState<string>("");
  const [runOnUIAsyncStr, setRunOnUIAsyncStr] = useState<string>("");
  const [runOnUISyncStr, setRunOnUISyncStr] = useState<string>("");
  const [scheduleOnUI_scheduleOnRNc, setScheduleOnUI_scheduleOnRNcStr] = useState<string>("");
  const [scheduleOnRuntime_scheduleOnRN, setScheduleOnRuntime_scheduleOnRNStr] = useState<string>("");
  const [isWorkletFunctionStr, setIsWorkletFunctionStr] = useState<string>("");
  const [registerCustomSerializableStr1, setRegisterCustomSerializableStr1] = useState<string>("");
  const [registerCustomSerializableStr2, setRegisterCustomSerializableStr2] = useState<string>("");
  const [registerCustomSerializableStr3, setRegisterCustomSerializableStr3] = useState<string>("");
return (
    <Tester style={{flex: 1}}>
        <ScrollView>
            <TestSuite name='CustomSerializable test' > 

            <TestCase itShould="check createWorkletRuntime">
                  <Animated.View style={{height:80,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                      <Text>createWorkletRuntime结果：{createWorkletRuntimeStr} </Text>
                      
                      <Button title={"createWorkletRuntime"} onPress={()=>{
                            const runtime = createWorkletRuntime({ name: 'foo' });
                            setCreateWorkletRuntimeStr(JSON.stringify(runtime))
                            console.log("CustomSerializable runtime:"+JSON.stringify(runtime))
                    }}/>
                  </Animated.View>
                
            </TestCase>       

            <TestCase itShould="check getRuntimeKind">
                    <Animated.View style={{height:150,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                      <Text>getRuntimeKind结果：{getRuntimeKindStr} </Text>
                      <Button title={"getRuntimeKind"} onPress={()=>{
                            setGetRuntimeKindStr(JSON.stringify(getRuntimeKind()))

                    }}/>
                     <Button title={"getRuntimeKind runOnUI"} onPress={()=>{
                              const updateText = (value: number,toValue: number) => {
                                console.log("CustomSerializable getRuntimeKind toValue== value:"+JSON.stringify(toValue== value))
                                setGetRuntimeKindStr(JSON.stringify(value))
                              };
                            const uiThreadLogic = (value: number) => {
                                runOnJS(updateText)(getRuntimeKind(),value);
                            };
                            runOnUI(uiThreadLogic)(2);
                    }}/>

                    <Button title={"getRuntimeKind runOnRuntime"} onPress={()=>{
                              const updateText = (value: number,toValue: number) => {
                                console.log("CustomSerializable getRuntimeKind toValue== value:"+JSON.stringify(toValue== value))
                                setGetRuntimeKindStr(JSON.stringify(value))
                              };
                            const uiThreadLogic = (value: number) => {
                                runOnJS(updateText)(getRuntimeKind(),value);
                            };
                            runOnRuntime(createWorkletRuntime(), uiThreadLogic)(3);
                    }}/>
                  </Animated.View>
                      
            </TestCase>       

            <TestCase itShould="check runOnUIAsync">
                <View style={{height:80,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                      <Text>runOnUIAsync结果：{runOnUIAsyncStr}</Text>
                      <Button title={"runOnUIAsync"} onPress={async ()=>{
                              const result: Promise<string> = runOnUIAsync((): string => {
                                  return "runOnUIAsync";
                              });
                              let str =  await result
                              setRunOnUIAsyncStr(str);
                              console.log("CustomSerializable runOnUIAsync:"+JSON.stringify(str == "runOnUIAsync"))
                      }}/>
                </View>
            </TestCase>  

            <TestCase itShould="check runOnUISync">
                    <View style={{height:80,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                    <Text>runOnUISync的结果：{runOnUISyncStr}</Text>
                    <Button title={"runOnUISync"} onPress={()=>{
                        const myFunction = (num: number): number => {
                          'worklet';
                          return num + 1;
                        };
                        const result: number = runOnUISync(myFunction, 0);
                        setRunOnUISyncStr(JSON.stringify(result))
                        console.log("CustomSerializable runOnUISync:"+JSON.stringify(result==1))
                    }}/>
                </View>
            </TestCase>       

                    
            <TestCase itShould="check scheduleOnUI_scheduleOnRN">
              <View style={{height:80,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                  <Text>ScheduleOnUI_scheduleOnRNc的结果：{scheduleOnUI_scheduleOnRNc}</Text>
                  <Button title={"scheduleOnUI - scheduleOnRN"} onPress={()=>{
                      let result = 0;
                      const func = (result:number) => {
                          result++;
                          console.log("CustomSerializable scheduleOnUI_scheduleOnRN:"+JSON.stringify(result == 2))
                          runOnJS(()=>{
                            setScheduleOnUI_scheduleOnRNcStr(JSON.stringify(result))
                          })()
                      };
                      scheduleOnUI(() => {
                      'worklet';
                      result++;
                      scheduleOnRN(func,result);
                      });
                  }}/>
              </View>
            </TestCase>    



          <TestCase itShould="check scheduleOnRuntime_scheduleOnRN">  
              
              <View style={{height:80,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                  <Text>scheduleOnRuntime_scheduleOnRN结果：{scheduleOnRuntime_scheduleOnRN}</Text>
                  <Button title={"scheduleOnRuntime-scheduleOnRN"} onPress={()=>{
                      const runtime = createWorkletRuntime({ name: 'foo' });
                      let logStr = "";
                      const func = (logStr:string) => {
                          logStr = logStr+' scheduleOnRN';
                          console.log("CustomSerializable scheduleOnRuntime_scheduleOnRN:"+logStr)
                          runOnJS(()=>{
                            setScheduleOnRuntime_scheduleOnRNStr(JSON.stringify(logStr))
                          })()
                      };
                      scheduleOnRuntime(runtime, () => {
                          'worklet';
                          logStr = "scheduleOnRuntime to";
                          scheduleOnRN(func,logStr);
                      });
                  }}/>
                  </View>
          </TestCase>         


          <TestCase itShould="check isWorkletFunction">
                
                <View style={{height:80,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                  <Text>isWorkletFunction结果：{isWorkletFunctionStr}</Text>
                  <Button title={"isWorkletFunction"} onPress={()=>{
                      const workletFunction = () => {
                          'worklet';
                          return 1;
                        };
                      
                      const nonWorkletFunction = () => {
                          return 1;
                        };
                      let result = isWorkletFunction(workletFunction)
                      let result_ = isWorkletFunction(nonWorkletFunction)
                      setIsWorkletFunctionStr(JSON.stringify(result && !result_));
                      console.log("CustomSerializable isWorkletFunction result && !result_:"+JSON.stringify(result && !result_))
                  }}/>
                </View>
          </TestCase>      

          <TestCase itShould="check registerCustomSerializable">
                    <View style={{height:150,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
                      <Text>registerCustomSerializable uiPass结果：{registerCustomSerializableStr1}</Text>
                      <Text>registerCustomSerializable preRuntimePass结果：{registerCustomSerializableStr2}</Text>
                      <Text>registerCustomSerializable postRuntimePass结果：{registerCustomSerializableStr3}</Text>
                      <Button title={"registerCustomSerializable"} onPress={()=>{
                              const preRuntime = createWorkletRuntime();

                              type IGlobalConstructorCarrier2 = {
                                __isCustomObject2: true;
                                constructor: any;
                              };
                          
                              function GlobalConstructorCarrierFactory2(constructor: any) {
                                'worklet';
                                // Workaround because `new` keyword is reserved for Worklet Classes...
                                const GlobalConstructorCarrier2 = function GlobalConstructorCarrier2(
                                  this: IGlobalConstructorCarrier2,
                                  constructor: any,
                                ) {
                                  this.__isCustomObject2 = true;
                                  this.constructor = constructor;
                                } as unknown as {
                                  new (constructor: any): IGlobalConstructorCarrier2;
                                };
                          
                                return new GlobalConstructorCarrier2(constructor);
                              }
                          
                              const determine2 = (value: object): value is IGlobalConstructorCarrier2 => {
                                'worklet';
                                return (value as Record<string, unknown>).__isCustomObject2 === true;
                              };
                          
                              registerCustomSerializable({
                                name: 'registerCustomSerializable test success',
                                determine: determine2 as unknown as typeof determine,
                                pack,
                                unpack,
                              });
                          
                              const postRuntime = createWorkletRuntime();
                          
                              let uiPass = false;
                              const setUiPass = (value: boolean) => {
                                uiPass = value;
                                console.log("CustomSerializable registerCustomSerializable uiPass:"+uiPass)
                                runOnJS(()=>{
                                  setRegisterCustomSerializableStr1(JSON.stringify(uiPass))
                                })()
                              };
                              let preRuntimePass = false;
                              const setPreRuntimePass = (value: boolean) => {
                                preRuntimePass = value;
                                console.log("CustomSerializable registerCustomSerializable preRuntimePass:"+preRuntimePass)
                                runOnJS(()=>{
                                  setRegisterCustomSerializableStr2(JSON.stringify(preRuntimePass))
                                })()
                              };
                              let postRuntimePass = false;
                              const setPostRuntimePass = (value: boolean) => {
                                postRuntimePass = value;
                                console.log("CustomSerializable registerCustomSerializable postRuntimePass:"+postRuntimePass)
                                runOnJS(()=>{
                                  setRegisterCustomSerializableStr3(JSON.stringify(postRuntimePass))
                                })()
                              };
                          
                              // Act
                              scheduleOnUI(() => {
                                'worklet';
                                const testObject = GlobalConstructorCarrierFactory2(Array);
                                const pass = testObject.constructor === Array;
                                scheduleOnRN(setUiPass, pass);
                              });
                          
                              scheduleOnRuntime(preRuntime, () => {
                                'worklet';
                                const testObject = GlobalConstructorCarrierFactory2(Array);
                                const pass = testObject.constructor === Array;
                                scheduleOnRN(setPreRuntimePass, pass);
                            
                              });
                          
                              scheduleOnRuntime(postRuntime, () => {
                                'worklet';
                                const testObject = GlobalConstructorCarrierFactory2(Array);
                                const pass = testObject.constructor === Array;
                                scheduleOnRN(setPostRuntimePass, pass);
                              });
                      }}/>
                  </View>
                
          </TestCase>         
            </TestSuite>
        </ScrollView>
    </Tester>
);
}