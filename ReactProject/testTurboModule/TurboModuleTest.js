import React, { useRef } from 'react';
import { StyleSheet, Button, View, Pressable, UIManager, findNodeHandle, Dimensions, DeviceEventEmitter } from 'react-native';
import SampleTurboModule from 'turbo-module/src/specs/v1/SampleTurboModule';

const execuTurboModule = async () => {
  console.log("chy obj111111")
  let obj1 = {};
  let obj2 = { ref: obj1 };
  obj1.ref = obj2;
  console.log("chy obj222222")
  SampleTurboModule.doAsyncJob({ key: 23});
  // SampleTurboModule.doAsyncJob(obj1);
}
// 测试用例
const Test = () => {

  return (
    <View style={{ marginTop: 200 }}>
      <Button title='点击调用tm' onPress={() => {
        execuTurboModule();
      }}></Button>
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
