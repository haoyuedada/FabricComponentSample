// ImageBackgroundBase64Fix.js
import React from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, StyleSheet } from 'react-native';

export default function ImageBackgroundBase64Fix() {

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>ImageBackground base64 演示</Text>

      {/* 固定尺寸，便于调试（flex:1 有时会因为图片 1x1 或透明看不到） */}
      <Image
        // source={{ uri: "./assets/mp4/245_1752306538.mp4" }}
        style={styles.bg}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
        layerScaleFilter= 'Nearest'
      >
      </Image>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 18, marginBottom: 12 },
  bg: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ddd', // 如果图片加载失败，可以看到灰色背景
  },
  imageStyle: { borderRadius: 10 },
  overlay: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 8, borderRadius: 6 },
  text: { color: '#fff' },
  sub: { marginTop: 18, marginBottom: 8 },
  thumb: { width: 100, height: 100, borderRadius: 8, backgroundColor: '#eee' },
});
