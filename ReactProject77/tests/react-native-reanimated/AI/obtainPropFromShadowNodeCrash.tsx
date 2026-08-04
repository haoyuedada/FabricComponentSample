// CrashReproApp.tsx
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function CrashReproApp() {
  const sv = useSharedValue(0);

  useEffect(() => {
    // 无限动画：持续 scheduleOnUI，确保队列中有 pending jobs
    sv.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,  // 无限重复
      true
    );
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sv.value * 300 }],
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View
        style={[{ width: 100, height: 100, backgroundColor: "red" }, style]}
      />
    </View>
  );
}