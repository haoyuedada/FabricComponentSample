/**
 * @format
 */

// import { AppRegistry, LogBox } from 'react-native';
// import RNTester from './rn-tester';
// import { name as appName } from './app.json';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import { BottomNavBarProvider } from './rn-tester/components/BottomNavBarContext';

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications
// const ReduxConnectApp = () => {
//   return (
//     <Provider store={store}>
//       <BottomNavBarProvider>
//         <RNTester />
//       </BottomNavBarProvider>
//     </Provider>
//   );
// };
// AppRegistry.registerComponent(appName, () => ReduxConnectApp);


import React, { useState, useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet,AppRegistry } from 'react-native';
import Svg, { Rect, Image } from 'react-native-svg';
import { name as appName } from './app.json';
const AnimatedRect = Animated.createAnimatedComponent(Rect);
// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SliderDemo = () => {
  // 滑块尺寸配置
  const sliderHeight = 40;
  const sliderWidth = 300;
  const thumbSize = sliderHeight;

  // 动画值与状态管理
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);

  // 计算当前进度百分比
  const progress = animatedValue.interpolate({
    inputRange: [0, sliderWidth - thumbSize],
    outputRange: [0, 100],
    extrapolate: 'clamp'
  });

  // 创建滑动手势响应器
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDragging(true);
    },
    onPanResponderMove: Animated.event(
      [null, { dx: animatedValue }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      setIsDragging(false);
    },
    onPanResponderTerminate: () => {
      setIsDragging(false);
    }
  });

  // 限制滑块拖动范围
  animatedValue.addListener(({ value }) => {
    if (value < 0) {
      animatedValue.setValue(0);
    } else if (value > sliderWidth - thumbSize) {
      animatedValue.setValue(sliderWidth - thumbSize);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Svg 
          width={sliderWidth} 
          height={sliderHeight} 
          {...panResponder.panHandlers}
        >
          {/* 滑块背景 */}
          <Rect 
            width={sliderWidth} 
            height={sliderHeight} 
            fill="#f1f1f1" 
            rx={20} 
            ry={20} 
          />
          
          <AnimatedRect 
            width={Animated.add(animatedValue, thumbSize / 2)} 
            height={sliderHeight} 
            fill="#feb127" 
            rx={20} 
            ry={20} 
          />
        </Svg>
      </View>
      <View style={styles.progressTextContainer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  progressTextContainer: {
    marginTop: 30,
  },
  progressText: {
    fontSize: 18,
    color: '#333',
  },
});

AppRegistry.registerComponent(appName, () => SliderDemo);