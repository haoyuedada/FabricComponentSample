import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const PALETTE = {
  DARK_BLUE: '#1E3A8A',
};

export default class RotationDemo extends Component {
  constructor(props) {
    super(props);
    // 存储旋转的角度（度数），初始为0
    this.rotationDeg = new Animated.Value(0);
  }

  // 创建旋转手势
  rotationGesture = Gesture.Rotation()
    .onUpdate((event) => {
      console.log('Rotation event:', event);
      // event.rotation 是弧度，转换为度数
      const deg = event.rotation * (180 / Math.PI);
      // 直接更新 Animated.Value 的值
      this.rotationDeg.setValue(deg);
    })
    .onEnd(() => {
      // 可选：松手后让方块慢慢回正（带动画）
      Animated.spring(this.rotationDeg, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 4,
      }).start();
    });

  render() {
    // 将旋转度数转换为 CSS 格式的字符串
    const rotateStyle = {
      transform: [
        {
          rotate: this.rotationDeg.interpolate({
            inputRange: [-360, 360],
            outputRange: ['-360deg', '360deg'],
          }),
        },
      ],
    };

    return (
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={this.rotationGesture}>
          <Animated.View style={[styles.box, rotateStyle]}>
            <Text style={styles.text}>
              ROTATE ME{'\n'}USE TWO FINGERS
            </Text>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  box: {
    width: 200,
    height: 200,
    margin: 48,
    padding: 8,
    alignSelf: 'center',
    backgroundColor: PALETTE.DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});