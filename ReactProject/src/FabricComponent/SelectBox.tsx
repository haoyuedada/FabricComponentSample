/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */


import React, { useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  UIManager,
  findNodeHandle,
  View,
} from 'react-native';
import SelectBox from "fabric-component-sample-package/src/specs/v1/SelectBox";

const DATA = [
  {
    id: 0,
    text: '选项1',
  },
  {
    id: 1,
    text: '选项2',
  },
  {
    id: 2,
    text: '选项3',
  },
];

const App = () => {
  const [value, setValue] = useState([1, 2])
  const [mutil, setMutil] = useState(false)
  const boxRef = useRef(null)

  const onChange = (event: any) => {
    setValue(event.nativeEvent.value)
    console.log("Native 向 RN 发消息", event.nativeEvent)
  }

  return (
    <View style={styles.container}>
      <SelectBox
        ref={boxRef}
        style={{
          flex: 1
        }}
        value={value}
        data={DATA}
        onChangeInSelectBox={onChange}
        onDismiss={() => {
          console.log("chy onDismiss")
        }}
        source={{uri: 'https://gw.alicdn.com/tfs/TB1mYh8X7L0gK0jSZFAXXcA9pXa-64-64.png'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 250,
    justifyContent: 'center',
    marginTop: 100
  },
  title: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 20,
    padding: 8,
    textAlign: 'center'
  }
});

export default App;
