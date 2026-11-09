import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '1 Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '2 Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '3 Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb328ba',
    title: '4 Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd914aa97f63',
    title: '5 Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455571e29d72',
    title: '6 Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '7 Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91a2a97f63',
    title: '8 Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455471e29d72',
    title: '9 Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53a3bb328ba',
    title: '10 Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd914a2a97f63',
    title: '11 Item',
  },
  {
    id: '58694a40f-3da1-471f-bd96-1455571e29d72',
    title: '12 Item',
  },
];

const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const App = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
}

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

export default App;