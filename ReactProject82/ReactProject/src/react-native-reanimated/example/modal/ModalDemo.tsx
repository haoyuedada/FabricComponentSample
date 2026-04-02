/**
 * MIT License
 *
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import ActionSheet, { Action } from './ActionSheet';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

// 使用示例
const ActionSheetDemo = () => {
  const actionSheetRef = useRef<any>(null);
  const customActionSheetRef = useRef<any>(null);

  const actions: Action[] = [
    { text: '拍摄', key: 'pic' },
    { text: '从相册上传', key: 'upload' },
  ];

  const customView = (
    <View style={styles.customView}>
      <Text style={styles.customText}>这是一个自定义视图</Text>
      <Button title="关闭" onPress={() => customActionSheetRef.current?.hide()} color="#007AFF" />
    </View>
  );

  const height = useSharedValue(100);
  const width = useSharedValue(100);
  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.animatedBox, { width }]} />
      <Button onPress={handlePress} title="Click me" />
      {/* 筛选弹窗按钮 */}
      <Button title="打开筛选弹窗" onPress={() =>{
          actionSheetRef.current?.show()
      }} color="#007AFF" />

      {/* 单取消按钮类型弹窗 */}
      <ActionSheet
        ref={actionSheetRef}
        actions={actions}
        cancelText="取消"
        closeOnAction={true}
        closeOnMaskClick={true}
        showTitle={true}
        title="这是一个提示"
        onClose={() => {
          actionSheetRef?.current?.hide();
          console.log('onClose');
        }}
        onAction={(action) => console.log('onAction' + action.key)}
        afterClose={() => console.log('afterClose' + '完全关闭')}
      />

      {/* 自定义视图弹窗按钮 */}
      <Button
        title="打开自定义视图弹窗"
        onPress={() => customActionSheetRef.current?.show()}
        color="#FF9500"
      />

      {/* 自定义视图类型弹窗 */}
      <ActionSheet
        ref={customActionSheetRef}
        customView={customView}
        cancelText="取消"
        closeOnMaskClick
        onClose={() => {
          console.log('Custom onClose');
        }}
        afterClose={() => console.log('Custom afterClose' + '完全关闭')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  customView: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  customText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  animatedBox: {
    height: 100,
    backgroundColor: 'violet',
  },
});

export default ActionSheetDemo;
// export default {
//   displayName: "ReanimatedDemo",
//   framework: "React",
//   category: "Animated",
//   title: "ReanimatedDemo",
//   documentationURL: "https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/react-native-reanimated.md",
//   description: "动画库",
//   examples: [
//     {
//       title: "reanimated",
//       render: function (): any {
//         return <ActionSheetDemo />;
//       },
//     },
//   ],
// };