/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {useState} from 'react';
import {Modal, ScrollView, View, Button} from 'react-native';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

/**
 * 主页面组件
 * @param {NavigationComponentProps} props Navigation 组件属性
 * @returns {*}  React 元素
 */
const App = (): React.JSX.Element => {
  const [visible, setVisible] = useState(false);

  return (
    <ScrollView>
      <View style={{width: 400, height: 400}} />
      {Array.from(new Array(100)).map((_, index) => {
        return (
          <View
            style={{width: 1, height: 10, backgroundColor: 'red'}}
            key={index}
          />
        );
      })}
      <Button
        title="点击"
        onPress={() => {
          setVisible(true);
        }}
      />
      <Modal
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
        transparent>
        <GestureHandlerRootView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <GestureDetector
            gesture={Gesture.Race(
              Gesture.Pan()
                .activeOffsetX([-20, 20])
                .onStart(() => {
                  console.log('onStart');
                }),
            )}>
            <View style={{width: 200, height: 200, backgroundColor: 'red'}} />
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    </ScrollView>
  );
};

export default App;
