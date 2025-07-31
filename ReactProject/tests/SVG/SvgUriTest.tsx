import React, { Component } from 'react';
import { TextInput, View, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
// import MyIcon from '../assets/icon_alarm.svg'; // Adjust the path as necessary
import Svg from  './svg.js';
const SvgUriTest = () => {

  return (
    <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
        <SvgUri source={Svg.MyIcon} fill={'black'}></SvgUri>
        <SvgUri source={require("../assets/icon_alarm.svg")} fill={'black'}></SvgUri>
        <Image style={{height: 100, width: 100, top: 100 }} source={require("../assets/expo.png")}/>
    </View>
  );
}

export default SvgUriTest;