import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PagerView from "react-native-pager-view";

const MyPager = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.page}>
        <Text>First page</Text>
      </View>
      <View key="2" style={styles.page}>
        <Text>Second page</Text>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
	  pagerView: {
	    flex: 1,
	  },
	  page: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    flex: 1,
	  },
	});
	
export default MyPager;