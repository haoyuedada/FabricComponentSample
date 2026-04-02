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
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, { 
  LinearTransition, 
  FadeIn, 
  FadeOut 
} from 'react-native-reanimated';

const AnimatedFlatList = Animated.FlatList;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const initialData = [
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
];

export default function SimpleListAnimation() {
  const [data, setData] = useState(initialData);

  const addItem = () => {
    const newId = (data.length + 1).toString();
    setData([...data, { id: newId, text: `Item ${newId}` }]);
  };

  const removeItem = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <AnimatedTouchable
      onPress={() => removeItem(item.id)}
      style={{
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#3498db',
        borderRadius: 8,
      }}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text style={{ color: 'white' }}>{item.text}</Text>
    </AnimatedTouchable>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity 
        onPress={addItem}
        style={{
          padding: 12,
          backgroundColor: '#2ecc71',
          borderRadius: 8,
          marginBottom: 16,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Add Item</Text>
      </TouchableOpacity>

      <AnimatedFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  );
}