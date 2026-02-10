import React, {useState, useEffect} from 'react';
import { VirtualizedList, View, StyleSheet, ScrollView, Text } from 'react-native';

// 1. Mock 数据 //
const MOCK_TASKS = Array.from({ length: 3 }).map((_, i) => ({
  id: `${i}`,
  title: `测试任务数据 Item - ${i}`,
  amount: (Math.random() * 1000).toFixed(2),
}));
const App = () => {
  const [rate, setRate] = useState(true);
  // useEffect(() => {
  //   setRate(!rate)
  // }, []); // 仅在初始渲染时输出一次
  return (
    <>
      <VirtualizedList
          overScrollMode='never'
          data={MOCK_TASKS}
          keyExtractor={item => item.id}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          decelerationRate={rate ? 'fast' : 'normal'}
          renderItem={({ item }) => (
            <View>
              <Text >{item.title}</Text>
            </View>
          )}
        />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  zoomableView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default App;