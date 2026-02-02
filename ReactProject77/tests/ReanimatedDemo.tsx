import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from '@react-native-ohos/react-native-gesture-handler';

// 弹簧动画演示组件
const SpringAnimationDemo = () => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    translateX.value = withSpring(150, {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    });
    scale.value = withSpring(1.5);
    opacity.value = withSpring(0.8);
  };

  const handleReset = () => {
    translateX.value = withSpring(0);
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>弹簧动画 (Spring)</Text>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.boxText}>弹簧动画</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button title="开始动画" onPress={handlePress} />
        <Button title="重置" onPress={handleReset} />
      </View>
    </View>
  );
};

// 时间动画演示组件
const TimingAnimationDemo = () => {
  const rotation = useSharedValue(0);
  const backgroundColor = useSharedValue('#ff6b6b');

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
      backgroundColor: backgroundColor.value,
    };
  });

  const handlePress = () => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(180, { duration: 1000, easing: Easing.ease }),
        withTiming(0, { duration: 500, easing: Easing.bounce })
      ),
      -1,
      true
    );

    backgroundColor.value = withRepeat(
      withSequence(
        withTiming('#ff6b6b', { duration: 1000 }),
        withTiming('#4ecdc4', { duration: 1000 }),
        withTiming('#45b7d1', { duration: 1000 }),
        withTiming('#f9ca24', { duration: 1000 })
      ),
      -1,
      true
    );
  };

  const handleStop = () => {
    rotation.value = withTiming(0);
    backgroundColor.value = withTiming('#ff6b6b');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>时间动画 (Timing)</Text>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.boxText}>旋转动画</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button title="开始旋转" onPress={handlePress} />
        <Button title="停止" onPress={handleStop} />
      </View>
    </View>
  );
};

// 手势驱动动画组件
const GestureAnimationDemo = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>手势驱动动画</Text>
      <GestureHandlerRootView>
        <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Text style={styles.boxText}>拖我!</Text>
        </Animated.View>
      </GestureDetector>
      </GestureHandlerRootView>
      <Text style={styles.description}>
        拖动方块，松开后会弹回原点
      </Text>
    </View>
  );
};

// 派生值动画组件
const DerivedValueDemo = () => {
  const progress = useSharedValue(0);

  const translateX = useDerivedValue(() => {
    return progress.value * 200;
  });

  const rotateZ = useDerivedValue(() => {
    return progress.value * 360;
  });

  const opacity = useDerivedValue(() => {
    return 0.5 + (progress.value * 0.5);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotateZ: `${rotateZ.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    if (progress.value === 0) {
      progress.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    } else {
      progress.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>派生值动画</Text>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.boxText}>
          Progress: {Math.round(progress.value * 100)}%
        </Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button
          title={progress.value === 0 ? '开始动画' : '重置'}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

// 复杂动画组合组件
const ComplexAnimationDemo = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const handlePress = () => {
    const duration = 2000;

    translateX.value = withSequence(
      withTiming(100, { duration: duration / 4, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: duration / 4, easing: Easing.inOut(Easing.ease) })
    );

    translateY.value = withSequence(
      withTiming(-100, { duration: duration / 4, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: duration / 4, easing: Easing.inOut(Easing.ease) })
    );

    scale.value = withSequence(
      withSpring(1.5),
      withSpring(1)
    );

    rotation.value = withSequence(
      withTiming(180, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>复杂动画组合</Text>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.boxText}>复杂动画</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button title="播放动画" onPress={handlePress} />
      </View>
    </View>
  );
};

// 主应用组件
export default function ReanimatedDemo() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>React Native Reanimated Demo</Text>
          <Text style={styles.subHeader}>
            体验强大的原生动画性能
          </Text>
        </View>

        <SpringAnimationDemo />
        <TimingAnimationDemo />
        <GestureAnimationDemo />
        <DerivedValueDemo />
        <ComplexAnimationDemo />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            使用 React Native Reanimated v3.18.0 构建
          </Text>
          <Text style={styles.footerText}>
            支持弹簧、时间、手势等多种动画类型
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  container: {
    padding: 20,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 16,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  description: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 4,
  },
});
