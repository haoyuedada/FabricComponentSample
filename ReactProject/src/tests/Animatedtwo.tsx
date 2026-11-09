import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import AnimatedParent from './Animated'
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

class DisplayAnImage extends AnimatedParent {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(false), // 初始化动画值
    };
  }

  componentDidMount() {
    // 在组件挂载后启动动画
    Animated.timing(this.state.progress, {
      toValue: 1, // 动画目标值
      duration: 2000, // 动画持续时间（毫秒）
      useNativeDriver: true, // 使用原生驱动
    }).start();

    // this.progress.setValue(0); // 设置动画初始值
    console.log("chy progress", this.progress);
  }

  render() {
    const { progress } = this.state;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              opacity: progress, // 使用动画值控制透明度
            },
          ]}
        />
        <Text>Animated Box</Text>
      </View>
    );
  }
}

export default DisplayAnImage;