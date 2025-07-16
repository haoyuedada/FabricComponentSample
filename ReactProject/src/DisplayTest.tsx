import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';

const ToggleDisplayDemo = () => {
  const [display, setDisplay] = useState('none');

  const toggleDisplay = () => {
    setDisplay(prev => (prev === 'none' ? 'flex' : 'none'));
  };

  return (
    <View style={styles.container}>
      <Button title="切换显示/隐藏" onPress={toggleDisplay} />
      <View style={[styles.box, { display }]}> 
        <Image source={require("../assets/fig-without-poppy.jpeg")} onLoad={() => {
          console.log('Image loaded successfully');
        }}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  box: {
    top: 150,
    width: 200,
    height: 100,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ToggleDisplayDemo;
