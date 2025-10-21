import React, { useEffect, useState } from "react";
import { View, Text, AppState, AppStateStatus, StyleSheet } from "react-native";

export default function App() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const [message, setMessage] = useState("应用启动");

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove(); // 记得卸载监听器，避免内存泄漏
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    console.log("AppState changed to", nextAppState);
    setAppState(nextAppState);

    if (nextAppState === "active") {
      setMessage("欢迎回来 👋 应用在前台");
    } else if (nextAppState === "background") {
      setMessage("应用进入后台 💤");
    } else if (nextAppState === "inactive") {
      setMessage("应用处于非活跃状态 ⏸️");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AppState 示例</Text>
      <Text style={styles.state}>当前状态: {appState}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  state: { fontSize: 18, marginBottom: 10 },
  message: { fontSize: 16, color: "gray" },
});