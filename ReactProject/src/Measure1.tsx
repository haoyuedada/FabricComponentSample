import React, { useRef } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, StyleSheet, StatusBar,findNodeHandle } from 'react-native';
const TextViewRef = () => {
  const FlatListRef = useRef();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third',
    },
  ];
  const obj:any = {}
  const Item = ({ title }) => {
    let ref = obj[title];
    if (!ref) {
      ref = React.createRef();
      obj[title] = ref;
    }
    return (
      <View ref={ref} style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View
      >
        <FlatList
          ref={FlatListRef}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <Button
          title="measureLayout"
          onPress={() => {
            const viewNode = obj['Second'].current
            // const FlatListNode = findNodeHandle(FlatListRef.current);
            viewNode.measureLayout(
              FlatListRef.current,
              (x, y, width, height) => {
                console.log(`宽高: width：${width}；height：${height}；x：${x}；y：${y}；`);
              },
              error => {
                console.error('测量失败:', error);
              },
            );
          }}
        />
      </View>
    </SafeAreaView>

  );
};
export default TextViewRef;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});