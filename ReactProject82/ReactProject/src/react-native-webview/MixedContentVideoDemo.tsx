import { useState } from 'react';
import React, { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview'

const screenWidth = Dimensions.get('screen').width;

export default () => {

  return (
    <SafeAreaView>
        <View style={{ width: '100%', height: 2000}}>
            <WebView source={{ uri: "http://m.tuihaowu.com/d.aspx?id=6827356&u_name=hw_8626052A0&mmb=mmbwx&source=mmbapp&device=harmony" }}></WebView>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    width: screenWidth, // 每个页面宽度等于屏幕宽度
    height: 400, // 固定高度
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
