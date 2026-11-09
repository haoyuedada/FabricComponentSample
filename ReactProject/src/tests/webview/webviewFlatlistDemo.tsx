import React from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

// WebView 内容：一段可滚动的长 HTML
const HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial; margin: 0; padding: 16px; background: #fafafa; }
    p { font-size: 16px; color: #333; line-height: 1.8; margin-bottom: 20px; }
    .block { background: #e3f2fd; padding: 16px; border-radius: 8px; margin-bottom: 16px; }
  </style>
</head>
<body>
  ${Array.from({ length: 8 }, (_, i) => `<div class="block"><p>WebView 内容段落 ${i + 1}</p><p>在 WebView 内部上下滑动测试内部滚动。</p></div>`).join('')}
</body>
</html>
`;

// 列表数据：前几项原生，中间 WebView，后面继续原生
const DATA: { id: string; type: 'native' | 'webview' }[] = [
  ...Array.from({ length: 5 }, (_, i) => ({ id: `n-${i}`, type: 'native' as const })),
  { id: 'wv-1', type: 'webview' as const },
  { id: 'wv-2', type: 'webview' as const },
  ...Array.from({ length: 5 }, (_, i) => ({ id: `n2-${i}`, type: 'native' as const })),
];

const WebViewFlatlistDemo: React.FC = () => {
  const renderItem = ({ item, index }: { item: typeof DATA[0]; index: number }) => {
    if (item.type === 'webview') {
      return (
        <View style={styles.webviewSection}>
          <Text style={styles.label}>WebView（scrollEnabled=true，测试内部滚动）</Text>
          <WebView
            style={styles.webview}
            source={{ html: HTML }}
            scrollEnabled={true}
          />
        </View>
      );
    }
    return (
      <View style={styles.nativeItem}>
        <Text style={styles.nativeText}>原生列表项 #{index}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 16 },
  nativeItem: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  nativeText: { fontSize: 16, color: '#333' },
  webviewSection: { marginBottom: 12 },
  label: { fontSize: 13, color: '#888', marginBottom: 6 },
  webview: { width: width - 32, height: 300, borderRadius: 8, overflow: 'hidden' },
});

export default WebViewFlatlistDemo;
