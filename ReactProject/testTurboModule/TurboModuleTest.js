import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, UIManager, findNodeHandle, Dimensions, DeviceEventEmitter } from 'react-native';
import SampleTurboModule from 'turbo-module/src/specs/v1/SampleTurboModule';

const execuTurboModule = async () => {
  console.log("chy obj111111")
  let obj1 = {};
  let obj2 = { ref: obj1};
  obj1.ref = obj2;
  console.log("chy obj222222")
  SampleTurboModule.testParamsEmpty(obj1);
}
// 测试用例
const Test = () => {
  // console.log("chy start")
  execuTurboModule();

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
