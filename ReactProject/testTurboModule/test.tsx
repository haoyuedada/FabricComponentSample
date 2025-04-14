/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */


import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, UIManager, findNodeHandle, Dimensions, DeviceEventEmitter } from 'react-native';
import SampleTurboModule from 'turbo-module/src/specs/v1/SampleTurboModule';

const execuTurboModule = async () => {
  SampleTurboModule.testParamsEmpty("12345453");
  // 测试在RNInstance销毁后，turboModule 是否一直还在调用
  setInterval(() => {
    SampleTurboModule.pushStringToHarmony('test', (value) => {
      console.log("chy TubrboModule:pushStringToHarmony Execute value:", value)
    })
  }, 1000)
  await SampleTurboModule.doAsyncJob(true).then((value) => {
    // console.log("chy doAsyncJob value:", value)
  })
  console.log("chy ================", SampleTurboModule);
  SampleTurboModule.pushStringToHarmonyCallBack('test', (value) => {
    // console.log("chy pushStringToHarmonyCallBack value:", value)
  })
}
// 测试用例
const Test = () => {
  execuTurboModule();
  DeviceEventEmitter.addListener('emitEvent', (event) => {
    console.log("chy emitEvent event:", event)
  })


  return (
    <View style={styles.container}>
      <Text>232352</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 20,
    padding: 8,
    textAlign: 'center'
  }
});

export default Test;
