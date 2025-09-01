import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const image = {uri2: 'file:///data/storage/el2/base/haps/phone/files/xxx.jpg'};
const image2 = {uri: '/data/storage/el2/base/haps/phone/files/xxx.jpg'};

const App = () => (
  <View style={styles.container}>
    <ImageBackground resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;