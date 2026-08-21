/**
 * ScrollView 状态栏点击测试 - 简单版
 * 向下滚动后点击屏幕最顶部（状态栏区域），观察是否自动滚回顶部
 */

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const ScrollViewStatusBarTest = () => {
  return (
    <ScrollView style={styles.scrollView} scrollsToTop={false}>
      {Array.from({ length: 50 }, (_, i) => (
        <View
          key={i}
          style={[styles.item, { backgroundColor: `hsl(${i * 7}, 70%, 60%)` }]}
        >
          <Text style={styles.text}>Item {i + 1}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  item: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ScrollViewStatusBarTest;
