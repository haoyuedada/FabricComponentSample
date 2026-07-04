/**
 * GestureWebViewDemo.tsx
 *
 * 手势库（react-native-gesture-handler）嵌套 WebView —— 滑动卡顿测试。
 *
 * 两种模式可切换对比：
 *  - 模式 A：裸 WebView（对照组）
 *  - 模式 B：GestureDetector + Pan 手势嵌套 WebView（实验组）
 *
 * 判断标准：滑动列表是否跟手、是否掉帧、手势是否冲突。
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { WebView } from 'react-native-webview';

// ────────────────────────────────────────────────────────────
// 测试用 HTML：足够长的可滚动列表
// ────────────────────────────────────────────────────────────
const TEST_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, "PingFang SC", sans-serif; background: #f5f5f5; }
    .header { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; padding: 50px 20px 30px; text-align: center; }
    .header h1 { font-size: 22px; margin-bottom: 6px; }
    .header p { font-size: 13px; opacity: 0.85; }
    .item { background: #fff; margin: 10px 16px; border-radius: 10px; padding: 18px; display: flex; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .item .idx { width: 34px; height: 34px; border-radius: 50%; background: #667eea; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 14px; flex-shrink: 0; }
    .item .text { font-size: 14px; color: #555; line-height: 1.5; }
    .footer { text-align: center; padding: 30px; color: #999; font-size: 13px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📱 WebView 滑动测试</h1>
    <p>上下滑动，观察是否跟手 / 掉帧</p>
  </div>
  ${Array.from({ length: 200 }, (_, i) =>
    `<div class="item"><div class="idx">${i + 1}</div><div class="text">第 ${i + 1} 条 —— 滑动测试内容，用于检测流畅度。</div></div>`
  ).join('')}
  <div class="footer">—— 到底了 ——</div>
</body>
</html>
`;

// ────────────────────────────────────────────────────────────
// 模式 B：Pan 手势嵌套 WebView
// ────────────────────────────────────────────────────────────
function GesturedWebView() {
  const translateY = useSharedValue(0);
  const startY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      // 让 WebView 整体随手势平移，观察是否卡顿
      translateY.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      // 松手回弹
      translateY.value = withSpring(0, { damping: 18, stiffness: 220 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.webViewWrap, animatedStyle]}>
        <WebView
          source={{ html: TEST_HTML }}
          style={styles.webView}
          javaScriptEnabled
        />
      </Animated.View>
    </GestureDetector>
  );
}

// ────────────────────────────────────────────────────────────
// 主组件
// ────────────────────────────────────────────────────────────
export default function GestureWebViewDemo() {
  const [mode, setMode] = useState<'plain' | 'gesture'>('plain');

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* 顶部切换栏 */}
      <View style={styles.topBar}>
        <Text style={styles.title}>WebView 滑动卡顿测试</Text>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, mode === 'plain' && styles.tabActive]}
            onPress={() => setMode('plain')}
          >
            <Text style={[styles.tabText, mode === 'plain' && styles.tabTextActive]}>
              A · 裸 WebView
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, mode === 'gesture' && styles.tabActive]}
            onPress={() => setMode('gesture')}
          >
            <Text style={[styles.tabText, mode === 'gesture' && styles.tabTextActive]}>
              B · 手势嵌套
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>
          {mode === 'plain'
            ? '对照组：无外层手势，WebView 原生滚动'
            : '实验组：GestureDetector + Pan 包裹，整体跟随平移'}
        </Text>
      </View>

      {/* WebView 区域 */}
      {mode === 'plain' ? (
        <View style={styles.webViewWrap}>
          <WebView
            source={{ html: TEST_HTML }}
            style={styles.webView}
            javaScriptEnabled
          />
        </View>
      ) : (
        <GesturedWebView />
      )}
    </GestureHandlerRootView>
  );
}

// ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f5' },
  topBar: {
    backgroundColor: '#667eea',
    paddingTop: 48,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  tabActive: { backgroundColor: '#fff' },
  tabText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#667eea' },
  hint: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
  webViewWrap: { flex: 1, backgroundColor: '#f5f5f5' },
  webView: { flex: 1, backgroundColor: '#f5f5f5' },
});
