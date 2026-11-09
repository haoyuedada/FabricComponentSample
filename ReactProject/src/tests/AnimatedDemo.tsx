import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, ScrollView } from 'react-native';

const TransformAnimationDemo = () => {
  // 创建多个动画值
  const [rotateValue] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(1));
  const [translateValue] = useState(new Animated.Value(0));
  const [opacityValue] = useState(new Animated.Value(1));
  const [skewValue] = useState(new Animated.Value(0));
  
  // 旋转动画
  const startRotation = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  
  // 缩放动画
  const startScale = () => {
    scaleValue.setValue(1);
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // 平移动画
  const startTranslation = () => {
    translateValue.setValue(0);
    Animated.sequence([
      Animated.timing(translateValue, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // 透明度动画
  const startOpacity = () => {
    opacityValue.setValue(1);
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 0.2,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // 倾斜动画
  const startSkew = () => {
    skewValue.setValue(0);
    Animated.sequence([
      Animated.timing(skewValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(2),
        useNativeDriver: true,
      }),
      Animated.timing(skewValue, {
        toValue: 0,
        duration: 1000,
        easing: Easing.elastic(2),
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // 组合动画
  const startAllAnimations = () => {
    startRotation();
    startScale();
    startTranslation();
    startOpacity();
    startSkew();
  };
  
  // 重置所有动画
  const resetAll = () => {
    rotateValue.setValue(0);
    scaleValue.setValue(1);
    translateValue.setValue(0);
    opacityValue.setValue(1);
    skewValue.setValue(0);
  };
  
  // 插值计算旋转值
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  // 插值计算倾斜值
  const skewInterpolate = skewValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  // 组合transform
  const transformStyle = {
    transform: [
      { rotate: rotateInterpolate },
      { scale: scaleValue },
      { translateX: translateValue },
      { skewX: skewInterpolate },
    ],
    opacity: opacityValue,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Animated.View Transform 演示</Text>
      
      <View style={styles.animationContainer}>
        <Animated.View style={[styles.box, transformStyle]}>
          <Text style={styles.boxText}>动画方块</Text>
        </Animated.View>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.button, styles.rotateButton]} onPress={startRotation}>
          <Text style={styles.buttonText}>旋转</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.scaleButton]} onPress={startScale}>
          <Text style={styles.buttonText}>缩放</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.translateButton]} onPress={startTranslation}>
          <Text style={styles.buttonText}>移动</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.opacityButton]} onPress={startOpacity}>
          <Text style={styles.buttonText}>透明度</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.skewButton]} onPress={startSkew}>
          <Text style={styles.buttonText}>倾斜</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={startAllAnimations}>
          <Text style={styles.buttonText}>全部动画</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetAll}>
          <Text style={styles.buttonText}>重置</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.explanation}>
        <Text style={styles.subtitle}>动画说明:</Text>
        <Text style={styles.text}>• 旋转: 方块顺时针旋转360度</Text>
        <Text style={styles.text}>• 缩放: 方块放大1.5倍后恢复</Text>
        <Text style={styles.text}>• 移动: 方块向右移动100单位后返回</Text>
        <Text style={styles.text}>• 透明度: 方块透明度从1变为0.2再恢复</Text>
        <Text style={styles.text}>• 倾斜: 方块在X轴上倾斜20度后恢复</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  animationContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2980b9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    width: '100%',
  },
  button: {
    padding: 12,
    margin: 5,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  rotateButton: {
    backgroundColor: '#9b59b6',
  },
  scaleButton: {
    backgroundColor: '#2ecc71',
  },
  translateButton: {
    backgroundColor: '#f39c12',
  },
  opacityButton: {
    backgroundColor: '#e74c3c',
  },
  skewButton: {
    backgroundColor: '#1abc9c',
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  resetButton: {
    backgroundColor: '#7f8c8d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  explanation: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#34495e',
  },
});

export default TransformAnimationDemo;