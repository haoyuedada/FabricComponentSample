import React from 'react';
import { StyleSheet, SafeAreaView, Image, View } from 'react-native';
// import { Svg, Path } from '@react-native-oh-tpl/react-native-svg';
// import MyIcon from './MyIcon';
import MyIcon from '../assets/icon_alarm.svg'; // Adjust the path as necessary

export default function App() {
  return (
    <View style={{ height: '100%', width: '100%', paddingTop: 200 }}>
      <MyIcon />
      {/* <Image source={require("./assets/icon_alarm.svg")}></Image> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});