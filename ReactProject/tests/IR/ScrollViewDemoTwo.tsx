import React, { useCallback, useRef, useMemo } from 'react';
import { ScrollView, View, Animated, StyleSheet, Platform, TextInput } from 'react-native';

const HomePage: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const onScroll = useCallback(
    (e) => {
      let offset = e.nativeEvent.contentOffset.y;
      console.log('chy onScroll  value: ',offset );
      // 如果是 Harmony 平台，就除以 2
      if (Platform.OS === 'harmony') {
        offset = offset / 1;
      }

      scrollY.setValue(offset);
    },
    [scrollY]
  );

  // 计算透明度
  const opacity = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 5000],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    [scrollY]
  );

  // 搜索框的动画位移
  const translateY = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 600],
        outputRange: [0, -60], // 滚动5000时，搜索框上移50
        extrapolate: 'clamp',
      }),
    [scrollY]
  );

  return (
    <View style={styles.container}>
      {/* 搜索框 */}
      <Animated.View
        style={{
          ...styles.searchContainer,
          transform: [{ translateY }],
        }}
      >
        <TextInput style={styles.searchInput} placeholder="搜索..." />
      </Animated.View>

      {/* 叠加在 ScrollView 上方的 View */}
      <Animated.View
        style={{
          ...styles.overlayView,
          opacity: opacity,
        }}
      />

      <ScrollView
        style={{ marginTop: 200 }} // 调整 marginTop 以确保搜索框不会被遮挡
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={() => {
          console.log('onScrollBeginDrag');
        }}
      >
        {Array.from({ length: 1000 }).map((_, index) => (
          <View key={index} style={{ height: 100, backgroundColor: generateRandomColor() }} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  overlayView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    zIndex: 1,
  },
});