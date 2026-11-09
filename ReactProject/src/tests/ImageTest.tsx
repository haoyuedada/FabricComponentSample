import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

const LocalImageSizeDemo = () => {
  // 状态管理
  const [imageInfo, setImageInfo] = useState({
    width: 0,
    height: 0,
    loading: false,
    error: null,
    uri: null
  });
  
  // 本地图片路径
  const localImage = require('./assets/expo.png');

  // 组件加载时自动获取图片尺寸
  useEffect(() => {
    getImageSize();
  }, []);

  // 获取图片尺寸
  const getImageSize = () => {
    setImageInfo({
      width: 0,
      height: 0,
      loading: true,
      error: null,
      uri: Image.resolveAssetSource(localImage).uri
    });
    
    console.log("chy Image.resolveAssetSource(localImage).uri:", Image.resolveAssetSource(localImage).uri)
    Image.getSize(
      Image.resolveAssetSource(localImage).uri,
      (width, height) => {
        console.log("chy path:", Image.resolveAssetSource(localImage).uri)
        console.log("chy width:", width)
        console.log("chy height:", height)
        setImageInfo({
          width,
          height,
          loading: false,
          error: null,
          uri: Image.resolveAssetSource(localImage).uri
        });
      },
      (error) => {
        setImageInfo({
          width: 0,
          height: 0,
          loading: false,
          error: error.message || '获取图片尺寸失败',
          uri: Image.resolveAssetSource(localImage).uri
        });
      }
    );
  };

  // 计算图片显示尺寸
  const calculateDisplaySize = (width, height) => {
    const maxWidth = Dimensions.get('window').width - 40;
    const ratio = width / height;
    const displayWidth = Math.min(maxWidth, width);
    const displayHeight = displayWidth / ratio;
    
    return { width: displayWidth, height: displayHeight };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>本地图片尺寸获取演示</Text>
      <Text style={styles.subtitle}>路径: ./assets/expo.png</Text>
      
      {/* 尺寸信息显示区域 */}
      <View style={styles.infoContainer}>
        <View style={styles.infoHeader}>
          <Text style={styles.infoTitle}>图片尺寸信息</Text>
          {imageInfo.loading && <ActivityIndicator size="small" color="#6200ee" />}
        </View>
        
        {imageInfo.error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>❌ {imageInfo.error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={getImageSize}>
              <Text style={styles.retryText}>重试</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {imageInfo.width > 0 ? (
              <>
                <View style={styles.sizeRow}>
                  <Text style={styles.sizeLabel}>原始宽度:</Text>
                  <Text style={styles.sizeValue}>{imageInfo.width} px</Text>
                </View>
                <View style={styles.sizeRow}>
                  <Text style={styles.sizeLabel}>原始高度:</Text>
                  <Text style={styles.sizeValue}>{imageInfo.height} px</Text>
                </View>
                <View style={styles.sizeRow}>
                  <Text style={styles.sizeLabel}>宽高比:</Text>
                  <Text style={styles.sizeValue}>
                    {(imageInfo.width / imageInfo.height).toFixed(2)}:1
                  </Text>
                </View>
                <View style={styles.sizeRow}>
                  <Text style={styles.sizeLabel}>文件路径:</Text>
                  <Text style={styles.sizeValue} numberOfLines={1} ellipsizeMode="middle">
                    {imageInfo.uri}
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.loadingText}>正在加载图片尺寸信息...</Text>
            )}
          </View>
        )}
      </View>
      
      {/* 图片预览 */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>图片预览</Text>
        <View style={styles.imageWrapper}>
          {/* {imageInfo.width > 0 ? (
            <Image
              source={localImage}
              style={[
                calculateDisplaySize(imageInfo.width, imageInfo.height),
                styles.previewImage
              ]}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.placeholder}>
              <ActivityIndicator size="large" color="#6200ee" />
              <Text style={styles.placeholderText}>加载图片中...</Text>
            </View>
          )} */}
          <Image
              source={localImage}
            //   style={[
            //     calculateDisplaySize(imageInfo.width, imageInfo.height),
            //     styles.previewImage
            //   ]}
            style={{width: 100, height: 100}}
              resizeMode="contain"
            />
        </View>
      </View>
      
      <TouchableOpacity style={styles.refreshButton} onPress={getImageSize}>
        <Text style={styles.refreshText}>重新获取尺寸</Text>
      </TouchableOpacity>
      
      {/* 技术说明 */}
      <View style={styles.explanation}>
        <Text style={styles.explanationTitle}>本地图片处理说明</Text>
        <Text style={styles.explanationText}>
          1. 使用 require() 导入本地图片{"\n"}
          2. Image.resolveAssetSource() 获取资源路径{"\n"}
          3. Image.getSize() 获取原始尺寸{"\n"}
          4. 无需网络权限，加载速度快
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  sizeLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  sizeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
  },
  errorText: {
    color: '#c62828',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 20,
  },
  previewContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  previewImage: {
    borderRadius: 8,
  },
  placeholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#666',
  },
  refreshButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  refreshText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  explanation: {
    backgroundColor: '#e6f7ff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1890ff',
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0050b3',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: '#004085',
    lineHeight: 24,
  },
});

export default LocalImageSizeDemo;