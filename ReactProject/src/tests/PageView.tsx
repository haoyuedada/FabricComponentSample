import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PagerView from "@react-native-oh-tpl/react-native-pager-view";

const MyPager = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    width: "100%",
    height: '100%',
    marginTop: 20
  },
});

export default MyPager;