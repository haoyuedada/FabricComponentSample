
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
      <Image source={require('../assets/fig-without-poppy.jpeg')} resizeMode={Image.resizeMode.cover}/>
      <Image source={require('../assets/images/ffig-without-poppy.jpeg')} />
      <Image source={require('../assets/images/nnoise.png')} />
    </View>
  );
}

export default DisplayAnImage;