import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  animatedBox: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
});

class PageTwo extends Component {
  constructor(props) {
    super(props);
    this.progress = new Animated.Value(1); // 创建动画值
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{
            borderColor: 'red',
            borderWidth: 1,
            width: '100%',
            height: 50,
            alignItems: 'flex-start',
            marginTop: 100
            }}>
            <Text>PageTwo</Text>
        </View>
      </View>
    );
  }
}

export default PageTwo;