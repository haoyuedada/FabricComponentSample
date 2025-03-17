/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */


import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, UIManager, findNodeHandle, Dimensions } from 'react-native';
// import SampleTurboModule from 'turbo-module/src/specs/v1/SampleTurboModule';
// import SampleTurboModulevv from 'turbo-module/src/specs/v2/SampleTurboModulevv';
// import MIOTHost from 'turbo-module/src/specs/v2/MIOTHost';


// 测试用例
const Test = () => {
    // SampleTurboModule.pushStringToHarmony('test', (value) => {
    //     console.log("chy pushStringToHarmony value:", value)
    // })

    // SampleTurboModule.pushStringToHarmonyCallBack('test', (value) => {
    //     console.log("chy pushStringToHarmonyCallBack value:", value)
    // })

    // SampleTurboModule.loadInfoCallBack('test', (value) => {
    //   console.log("chy loadInfoCallBack1 value:", value)
    // })
    // SampleTurboModulevv.loadInfoCallBack('test', (value) => {
    //   console.log("chy loadInfoCallBack2 value:", value)
    // })
    // MIOTHost.loadInfoCallBack('test', (value) => {
    //   console.log("chy MIOTHostTurboModule loadInfoCallBack2 value:", value)
    // })
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
