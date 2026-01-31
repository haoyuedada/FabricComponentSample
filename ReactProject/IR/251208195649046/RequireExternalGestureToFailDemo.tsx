import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from "react-native-reanimated";

export default function RequireExternalGestureToFailDemo() {
  const [message, setMessage] = useState("尝试点击或长按下方的方块");
  const boxScale = useSharedValue(1);

  // 1. 创建一个长按手势
  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      runOnJS(setMessage)("长按手势被识别！");
      boxScale.value = withSpring(1.2);
    })
    .onFinalize(() => {
      boxScale.value = withSpring(1);
    })
    .minDuration(500);

  // 2. 创建一个双击手势
  const doubleTapGesture = Gesture.Tap()
    .onStart(() => {
      console.log("chy 双击手势被识别")
      runOnJS(setMessage)("双击手势被识别！");
      boxScale.value = withSpring(1.4);
    })
    .onFinalize(() => {
      boxScale.value = withSpring(1);
    })
    .numberOfTaps(2);

  // 3. 创建一个点击手势，要求长按手势和双击手势都失败后才会被识别
  const tapGesture = Gesture.Tap()
    .onStart(() => {
      console.log("chy 点击手势被识别")
      runOnJS(setMessage)("点击手势被识别！（长按和双击手势都失败了）");
      boxScale.value = withSpring(0.9);
    })
    .onFinalize(() => {
      boxScale.value = withSpring(1);
    })
    .requireExternalGestureToFail(longPressGesture)
    .requireExternalGestureToFail(doubleTapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: boxScale.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>requireExternalGestureToFail 演示</Text>
        <Text style={styles.subtitle}>
          手势识别优先级：双击 > 点击 > 长按
        </Text>
        <Text style={styles.message}>{message}</Text>

        <GestureDetector
          gesture={Gesture.Simultaneous(longPressGesture, tapGesture, doubleTapGesture)}
        >
          <Animated.View style={[styles.box, animatedStyle]}>
            <Text style={styles.boxText}>点我试试</Text>
          </Animated.View>
        </GestureDetector>

        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>操作说明：</Text>
          <Text style={styles.instructionText}>
            • 短按（{'< 500ms'}）：点击手势被识别
          </Text>
          <Text style={styles.instructionText}>
            • 长按（≥ 500ms）：长按手势被识别
          </Text>
          <Text style={styles.instructionText}>
            • 双击：双击手势被识别
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "#007AFF",
    marginBottom: 30,
    textAlign: "center",
    minHeight: 60,
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  instructions: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    lineHeight: 20,
  },
});
