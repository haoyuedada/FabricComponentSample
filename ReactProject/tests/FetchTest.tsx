import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet, FlatList } from 'react-native';

const FastFetchExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 使用响应更快的测试API
  const API_URL = 'https://api.zippopotam.us/us/90210';

  // 使用 useCallback 避免不必要的函数重建
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setData(null);
      
      // 添加超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
      
      const startTime = Date.now();
      
      // 发起GET请求
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 可添加缓存控制
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId); // 清除超时定时器
      
      // 检查响应状态
      if (!response.ok) {
        throw new Error(`HTTP错误! 状态码: ${response.status}`);
      }
      console.log("chy fetchTest JS response:", response);
      // 解析JSON数据
      const result = await response.json();
      console.log("chy fetchTest JS result:", result);
      const requestTime = Date.now() - startTime;
      console.log('请求成功:', result);
      console.log(`请求耗时: ${requestTime}ms`);
      setData({...result, requestTime});
    } catch (err) {
      console.error('请求失败:', err);
      setError(err.name === 'AbortError' ? '请求超时' : err.message || '未知错误');
    } finally {
      setLoading(false);
    }
  }, []);

  // 组件挂载时自动获取数据
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 渲染UI
  return (
    <View style={styles.container}>
      <Button 
        title={loading ? "请求中..." : "重新加载"} 
        onPress={fetchData} 
        disabled={loading} 
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>快速获取数据中...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ 错误: {error}</Text>
          <Text style={styles.solutionText}>建议: 检查网络连接或稍后重试</Text>
        </View>
      )}
      
      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.title}>{data.country || '无标题'}</Text>
        </View>
      )}
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  dataContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  timeText: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  errorContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fdecea',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  errorText: {
    color: '#c0392b',
    fontWeight: 'bold',
  },
  solutionText: {
    marginTop: 5,
    color: '#e67e22',
  },
});

export default FastFetchExample;