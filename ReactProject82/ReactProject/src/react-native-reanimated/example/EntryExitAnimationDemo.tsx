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

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  SlideOutRight,
  EntryOrExitLayoutType,
  Keyframe, 
} from 'react-native-reanimated';

/**
 * EntryOrExitLayoutType 为 entering及其exiting赋值类型 
 * 其原库定义：  entering?: EntryOrExitLayoutType;
 *              exiting?: EntryOrExitLayoutType;
 * 
 * 故这个用例可以测试EntryOrExitLayoutType达到效果
*/
export default function EntryExitLayoutDemo() {
  const [visibleItems, setVisibleItems] = useState<number[]>([1, 2]);

  const addItem = () => {
    setVisibleItems(prev => [...prev, prev.length + 1]);
  };

  const removeItem = () => {
    setVisibleItems(prev => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>添加项目</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={removeItem}>
        <Text style={styles.buttonText}>删除项目</Text>
      </TouchableOpacity>
      {visibleItems.map((item, index) => (
        <Animated.View
          key={item}
          style={styles.item}
          entering={FadeIn.duration(500)}  
          exiting={SlideOutRight.duration(500)}
        >
          <Text style={styles.itemText}>项目 {item}</Text>
        </Animated.View>
      ))}
      <CustomAnimatedView />
    </View>
  );
}

const customKeyframe:EntryOrExitLayoutType = new Keyframe({
  '0': { 
    opacity: 1,
  },
  '50': { 
    opacity: 0.5,
  },
  '100': { 
    opacity: 0,
  }
})
.duration(1000)
.withCallback((finished) => {
  'worklet';
  if (finished) {
    console.log('关键帧动画完成');
  }
});

const customEntering:EntryOrExitLayoutType = new Keyframe({
  0: {
    originX: 50,
    transform: [{ rotate: '45deg' }],
  },
  30: {
    originX: 10,
    transform: [{ rotate: '-90deg' }],
  },
  100: {
    originX: 0,
    transform: [{ rotate: '0deg' }],
  },
}).duration(2000);
function CustomAnimatedView() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.customContainer}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.buttonText}>切换自定义动画</Text>
      </TouchableOpacity>
      
      {isVisible && (
        <Animated.View
          style={[styles.item, { backgroundColor: '#FF6B6B' }]}
          entering={customEntering}
          exiting={customKeyframe}
        >
          <Text style={styles.itemText}>自定义动画项目</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  customContainer: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#45B7D1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


