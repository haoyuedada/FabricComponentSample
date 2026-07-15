import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Button,
  Switch,
  Alert,
} from 'react-native';

/**
 * Demo: ScrollView 默认不可滚动，触摸过程中设置为可滚动
 *
 * 核心思路：
 * 1. scrollEnabled 初始为 false，ScrollView 不可滚动
 * 2. 通过 onTouchStart / onTouchMove 检测触摸，将 scrollEnabled 设为 true
 * 3. 使用 setNativeProps 即时更新原生属性，避免 React 重渲染延迟导致当前手势丢失
 * 4. 提供重置按钮恢复不可滚动状态
 */

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
];

const App = () => {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [useNativeProps, setUseNativeProps] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const enableScroll = () => {
    if (scrollEnabled) return;

    if (useNativeProps && scrollViewRef.current) {
      // 使用 setNativeProps 即时更新，避免重渲染延迟
      // 这样当前触摸手势能被 ScrollView 立即接管
      scrollViewRef.current.setNativeProps({ scrollEnabled: true });
    }
    setScrollEnabled(true);
  };

  const resetScroll = () => {
    if (useNativeProps && scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: false });
    }
    setScrollEnabled(false);
  };

  const items = Array.from({ length: 30 }).map((_, i) => i);

  return (
    <View style={styles.container}>
      {/* 状态指示栏 */}
      <View style={styles.statusBar}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>scrollEnabled:</Text>
          <Text
            style={[
              styles.statusValue,
              { color: scrollEnabled ? '#27ae60' : '#e74c3c' },
            ]}>
            {scrollEnabled ? 'true (可滚动)' : 'false (不可滚动)'}
          </Text>
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>使用 setNativeProps:</Text>
          <Switch
            value={useNativeProps}
            onValueChange={setUseNativeProps}
            trackColor={{ false: '#ccc', true: '#4ECDC4' }}
          />
        </View>

        <Button
          title="重置为不可滚动"
          onPress={resetScroll}
          color="#e74c3c"
        />
      </View>

      {/* ScrollView 区域 */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollEnabled}
        onTouchStart={() => {
          console.log('[touchEnableScroll] onTouchStart -> enable scroll');
          enableScroll();
        }}
        onTouchMove={() => {
          // onTouchMove 作为兜底，确保移动过程中也能启用
          enableScroll();
        }}
        onScroll={(e) => {
          console.log('[touchEnableScroll] scrollY:', e.nativeEvent.contentOffset.y.toFixed(1));
        }}
        scrollEventThrottle={16}
      >
        {items.map((item) => (
          <View
            key={item}
            style={[
              styles.item,
              { backgroundColor: COLORS[item % COLORS.length] },
            ]}>
            <Text style={styles.itemText}>Item {item}</Text>
            <Text style={styles.itemSubText}>
              {scrollEnabled ? '✅ 可滚动' : '❌ 不可滚动'}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* 提示栏 */}
      <View style={styles.tipBar}>
        <Text style={styles.tipText}>
          {useNativeProps
            ? '💡 使用 setNativeProps 即时启用，当前触摸即可滚动'
            : '⚠️ 使用 state 更新，可能需要松开后重新触摸才能滚动'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 44,
    backgroundColor: '#f5f5f5',
  },
  statusBar: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlLabel: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  item: {
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  itemSubText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  tipBar: {
    padding: 12,
    backgroundColor: '#fffbeb',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#f0e0a0',
  },
  tipText: {
    fontSize: 13,
    color: '#92400e',
    textAlign: 'center',
  },
});

export default App;
