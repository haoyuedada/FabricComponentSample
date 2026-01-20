import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ScaleAnimationDemo = () => {
  // 创建一个用于缩放的动画值
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    // 创建缩放动画序列
    const scaleAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    // 无限循环播放动画
    const animationLoop = Animated.loop(scaleAnimation);
    animationLoop.start();

    // 清理函数
    return () => {
      animationLoop.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
});

export default ScaleAnimationDemo;