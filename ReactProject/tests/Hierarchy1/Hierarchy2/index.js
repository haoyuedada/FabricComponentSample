
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DisplayAnImage = () => {
  return (
    <View>
      <Image 
        style={{width: 200, height: 200}}
        source={require('./Hierarchy3/Hierarchy4/expo.png')}/>
    </View>
  );
}

export default DisplayAnImage;