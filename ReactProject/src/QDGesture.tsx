/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */


import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, UIManager, findNodeHandle, Dimensions } from 'react-native';
import QDGestureFloat from 'fabric-component-sample-package/src/specs/v2/QDGestureFloatNativeComponent';
import SelectBoxApp from './SelectBoxApp'

const ScreenHeight = Dimensions.get('window').height;

// 测试用例
const App = () => {
  const floatRef = useRef(null)
  return (
    <View style={styles.container}>
      <SelectBoxApp />
      {/* <QDGestureFloat
        ref={floatRef}
        style={styles.container}
        stopPercent={0.5}
        stopPercentMax={0.75}
        onScroll={(event) => {
          console.log(event.nativeEvent.offsetY)
        }}
        onTouchStart={() => {
          console.log("chy onTouchStart")
        }}
        testObj1={{ id: 'testObj1' }}
        testObj2={{ id: 'testObj2' }}
        menuItems={[{ label: 'item1', key: 'key1' }, { label: 'item2', key: 'key2' }]}
        contentInset={{ top: 10, left: 10, bottom: 10, right: 10 }}
      >
        <View style={{ width: '100%', height: 1000, backgroundColor: 'yellow' }}>
          <Pressable onPress={() => {
            if (floatRef.current) {
              // RN向原生发送消息
              UIManager.dispatchViewManagerCommand(
                findNodeHandle(floatRef.current),
                'scrollTo',
                [ScreenHeight, true, [1,23]]
              );
            }
          }}>
            <Text style={{ fontSize: 50, color: 'red' }}>点我滚到顶</Text>
          </Pressable>
          <SelectBoxApp />
        </View>
      </QDGestureFloat> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 250
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
