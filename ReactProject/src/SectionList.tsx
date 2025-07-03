import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

// const SECTIONS = [
//   {
//     title: 'Fruits',
//     data: ['Apple', 'Banana', 'Orange', 'Mango'],
//   },
//   {
//     title: 'Vegetables',
//     data: ['Carrot', 'Broccoli', 'Peas', 'Spinach'],
//   },
//   {
//     title: 'Grains',
//     data: ['Rice', 'Wheat', 'Oats', 'Barley'],
//   },
// ];

const SECTIONS = {}
const MySectionList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  return (
    <SectionList
      sections={SECTIONS}
      keyExtractor={(item, index) => item + index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={true}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerContainer: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default MySectionList;
