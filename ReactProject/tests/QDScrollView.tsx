import QDScrollViewNativeComponent from 'fabric-component-sample-package/src/specs/v2/QDScrollViewNativeComponent';
import React, { useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, View, StatusBar, Button, Pressable, UIManager, findNodeHandle, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const App = () => {
  const floatRef = useRef(null)
  return (
    <SafeAreaView style={styles.container}>
      <QDScrollViewNativeComponent style={styles.scrollView}>
        {/* <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text> */}
        {/* <View style={{ width: '100%', height: 1000, backgroundColor: 'yellow' }}> */}
          <Pressable onPress={() => {
            console.log("chy Pressable ")
            if (floatRef.current) {
              console.log("chy dispatchViewManagerCommand ")
              // RN向原生发送消息
              UIManager.dispatchViewManagerCommand(
                findNodeHandle(floatRef.current),
                'scrollTo',
                [ScreenHeight, true, [1,23]]
              );
            }
          }}>
            <Text style={{ fontSize: 50, color: 'red' }}>QDScrollViewNativeComponent 点我滚到顶</Text>
          </Pressable>
        {/* </View> */}
      </QDScrollViewNativeComponent>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default App;
