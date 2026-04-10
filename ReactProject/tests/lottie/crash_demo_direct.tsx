import React, { useState, useEffect, useRef } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

// 直接复现崩溃场景的 Demo
// 这个 demo 专注于触发 CanvasRendererBase.js 中的问题
// 关键问题: this.elements[i] 为 undefined 时仍然被访问

const DirectCrashDemo = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [resizeCount, setResizeCount] = useState(0);
  const lottieRef = useRef<LottieView>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  // 模拟问题场景:
  // 1. 动画刚加载还没完全初始化就调用 resize
  // 2. 多次快速调用 resize
  // 3. 在动画播放过程中反复调整尺寸

  useEffect(() => {
    if (!showAnimation) return;

    let round = 0;
    // 快速多次触发 resize 来制造竞争条件
    const resizeInterval = setInterval(() => {
      round++;

      // 在不同尺寸之间快速切换
      const newWidth = 200 + (round % 4) * 50;
      const newHeight = 200 + ((round + 1) % 3) * 50;

      setDimensions({ width: newWidth, height: newHeight });
      setResizeCount(prev => prev + 1);

      // 运行一定次数后停止
      if (round >= 20) {
        clearInterval(resizeInterval);
      }
    }, 50); // 极快速触发

    return () => clearInterval(resizeInterval);
  }, [showAnimation]);

  const restartAnimation = () => {
    setShowAnimation(false);
    // 延迟重新显示来模拟重新加载
    setTimeout(() => {
      setShowAnimation(true);
      setResizeCount(0);
    }, 100);
  };

  const triggerResize = () => {
    const randomWidth = 100 + Math.random() * 400;
    const randomHeight = 100 + Math.random() * 400;
    setDimensions({ width: randomWidth, height: randomHeight });
    setResizeCount(prev => prev + 1);
  };

  const multipleResize = () => {
    // 连续触发多次 resize
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        triggerResize();
      }, i * 30);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lottie 崩溃复现 Demo</Text>
      <Text style={styles.subtitle}>目标: 复现 "Cannot read property prepareFrame of undefined"</Text>

      <View style={styles.buttonRow}>
        <Button title="重启动画" onPress={restartAnimation} />
        <Button title="单次 Resize" onPress={triggerResize} />
      </View>
      <View style={styles.buttonRow}>
        <Button title="连续 Resize" onPress={multipleResize} />
      </View>

      <View style={styles.infoBox}>
        <Text>Resize 次数: {resizeCount}</Text>
        <Text>当前尺寸: {Math.round(dimensions.width)} x {Math.round(dimensions.height)}</Text>
      </View>

      {showAnimation && (
        <View style={styles.animationContainer}>
          <LottieView
            ref={lottieRef}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: '#e0e0e0'
            }}
            source={require("../../assets/gradientBall.json")} // 使用特制的测试动画
            autoPlay
            loop
            resizeMode="contain"
          />
        </View>
      )}

      <Text style={styles.explanation}>
        崩溃原理: 当动画在 resize 过程中,某些图层元素可能还未初始化,
        但代码仍然尝试调用 prepareFrame 方法。
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  animationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  explanation: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default DirectCrashDemo;
