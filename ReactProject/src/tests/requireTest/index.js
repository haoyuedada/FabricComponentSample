
import React from 'react';
import { View, Text } from 'react-native';
var strings = require('./Local.js');

console.log("chy index:", strings);
const DisplayAnImage = () => {
  'safasf'.format(1,2,3);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>测试 require</Text>
    </View>
  );
}

export default DisplayAnImage;