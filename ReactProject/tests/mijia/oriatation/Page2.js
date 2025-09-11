'use strict';

import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation';

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
    console.log('Page2 constructor');
  }

  render() {
    // 锁定方向为横向，并且是向右旋转的方向
    const setLockToLandscapeRight = () => {
      Orientation.lockToLandscapeRight();
    };

    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <Text>44234</Text>
        <TouchableOpacity onPress={setLockToLandscapeRight}>
          <Text>锁定当前屏幕为横屏,右旋转</Text>
        </TouchableOpacity>
      </View>
    );
  }
}