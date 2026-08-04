import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useEffect, useRef } from "react";

const ANIMATION_COUNT = 30;

export default function App() {
  const values = Array.from({ length: ANIMATION_COUNT }, () =>
    useSharedValue(0)
  );
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    values.forEach((v, i) => {
      v.value = withRepeat(
        withTiming(i % 2 === 0 ? 1 : 0, {
          duration: 300 + (i % 5) * 100,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {ANIMATION_COUNT} animations running
      </Text>

      <View style={styles.animContainer}>
        {values.map((v, i) => {
          const animStyle = useAnimatedStyle(() => ({
            opacity: v.value,
            transform: [{ scale: 0.5 + v.value }],
          }));
          return (
            <Animated.View
              key={i}
              style={[styles.box, animStyle]}
            />
          );
        })}
      </View>

      <Text style={styles.hint}>
        Animations start automatically. Exit page to trigger crash.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  animContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginBottom: 16,
  },
  box: {
    width: 24,
    height: 24,
    backgroundColor: "violet",
    borderRadius: 4,
  },
  hint: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
