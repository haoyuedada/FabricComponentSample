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