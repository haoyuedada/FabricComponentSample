/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface IBasicLoadingParam{
  style?: StyleProp<ViewStyle>,
  size?: number | 'small' | 'large' | undefined;
}
// 基础 Loading 组件
const basicLoading: React.FC<IBasicLoadingParam> = (param: IBasicLoadingParam) => {
  return (
    <View style={[styles.loadingContainer, param.style]}>
      {/* 原生 Loading 图标 */}
      <ActivityIndicator
        size= {param?.size ?? 'large'} // 大小：'small'（20px）、'large'（36px）或数字（如 40）
        color="#999999" // 颜色（支持十六进制、rgb、主题色）
        animating={true} // 是否播放动画（false 时隐藏）
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)', // 半透明遮罩
    zIndex: 999,
  },
});

export default basicLoading;