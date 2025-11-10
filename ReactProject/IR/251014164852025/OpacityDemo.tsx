// BackgroundFadeDemo.js
// Demo: 背景色从透明 -> 不透明线性切换（包含两种实现）
// 1) Reanimated v2: 直接在 UI 线程用 interpolateColor 做线性背景色插值（推荐）
// 2) 内置 Animated: 使用两个重叠层交叉淡入（可与 useNativeDriver:true 一起使用）

// 依赖 / 运行提示：
// - Reanimated v2 需要安装并完成原生/JS 配置（Babel 插件与 Reanimated 安装步骤），否则 ReanimatedDemo 会报错。
// - 如果不想安装 Reanimated，可以只使用 CrossFadeOpacityDemo（内置 Animated 实现）。

import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button as RNButton, Animated as RNAnimated } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

// ---------------- Reanimated v2 版本（颜色插值） ----------------
function ReanimatedColorDemo() {
  // t: 0 -> transparent, 1 -> opaque
  const t = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(
      t.value,
      [0, 1],
      [
        'rgba(0,122,255,0)', // 透明状态（蓝色示例）
        'rgba(0,122,255,1)', // 不透明状态
      ]
    );

    return {
      backgroundColor: bg,
    };
  });

  const toOpaque = () => {
    t.value = withTiming(1, { duration: 800, easing: Easing.linear });
  };
  const toTransparent = () => {
    t.value = withTiming(0, { duration: 800, easing: Easing.linear });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Reanimated v2 — 背景色插值 (线性)</Text>

      <Animated.View style={[styles.box, animatedStyle]} />

      <View style={styles.row}>
        <RNButton title="To Opaque" onPress={toOpaque} />
        <RNButton title="To Transparent" onPress={toTransparent} />
      </View>

      <Text style={styles.hint}>说明：使用 interpolateColor 在 UI 线程做颜色（含 alpha）线性插值。</Text>
    </View>
  );
}

// ---------------- 内置 Animated 交叉淡入版本（可用 useNativeDriver） ----------------
function CrossFadeOpacityDemo() {
  // 我们不直接动画 backgroundColor（Animated 无法在 native driver 下做颜色插值），
  // 而是用两个重叠层：透明层 + 不透明层，交叉改变不透明层的 opacity（native driver 可用）。
  const opaqueOpacity = useRef(new RNAnimated.Value(0)).current;

  const toOpaque = () => {
    RNAnimated.timing(opaqueOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  const toTransparent = () => {
    RNAnimated.timing(opaqueOpacity, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Animated + Cross-fade — 背景层交叉淡入 (线性)</Text>

      <View style={styles.box}>
        {/* 透明背景层（低在底部） */}
        <RNAnimated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,122,255,0)' }]}
        />

        {/* 不透明背景层（淡入覆盖） */}
        <RNAnimated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,122,255,1)', opacity: opaqueOpacity },
          ]}
        />

        {/* 内容层：放在最上面，不受背景 opacity 影响 */}
        <View style={styles.contentCenter} pointerEvents="none">
          <Text style={styles.contentText}>内容不会被背景透明度影响</Text>
        </View>
      </View>

      <View style={styles.row}>
        <RNButton title="To Opaque" onPress={toOpaque} />
        <RNButton title="To Transparent" onPress={toTransparent} />
      </View>

      <Text style={styles.hint}>说明：使用 opacity 动画（useNativeDriver: true），性能更好，但不能直接动画颜色。</Text>
    </View>
  );
}

// ---------------- App: 同时展示两个 demo ----------------
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>背景透明 ↔ 不透明 线性切换 Demo</Text>

      <ReanimatedColorDemo />
      <CrossFadeOpacityDemo />

      <Text style={styles.footer}>说明：Reanimated 方案能直接动画颜色（含 alpha）；Animated 方案用交叉淡入避免颜色插值问题。</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    marginBottom: 18,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  box: {
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  contentCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: '#fff',
    fontWeight: '700',
  },
  footer: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
  },
});