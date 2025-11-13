import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button, Animated, Easing } from 'react-native';

export default function CrossFadeBackground() {
  const opaqueOpacity = useRef(new Animated.Value(0)).current;

  const toOpaque = () => {
    Animated.timing(opaqueOpacity, {
      toValue: 1,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: true, // 关键：在 UI 线程运行，性能好
    }).start();
  };

  const toTransparent = () => {
    Animated.timing(opaqueOpacity, {
      toValue: 0,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cross-fade 背景（useNativeDriver: true）</Text>

      <View style={styles.box}>
        {/* 底层：透明背景（可视为起点） */}
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,122,255,0)' }]} />

        {/* 顶层：不透明背景，通过 opacity 控制淡入/淡出 */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,122,255,1)', opacity: opaqueOpacity },
          ]}
        />

        {/* 内容层：放最上面，不会被背景 opacity 影响 */}
        <View style={styles.content}>
          <Text style={styles.contentText}>这里是内容，不随背景透明度变化</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Button title="To Opaque" onPress={toOpaque} />
        <Button title="To Transparent" onPress={toTransparent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  box: { height: 160, borderRadius: 10, overflow: 'hidden', marginBottom: 12 },
  content: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  contentText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
});
