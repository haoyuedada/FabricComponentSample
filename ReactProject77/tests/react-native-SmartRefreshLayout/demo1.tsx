import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  SmartRefreshControl,
  AnyHeader,
} from "react-native-smartrefreshlayout";

const App = () => {
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <SmartRefreshControl
          // ref={ref => this.rc = ref}
          HeaderComponent={
            // <AnyHeader style = {{ height: 10 }}>
            <Text>This is HeaderComponent</Text>
            // </AnyHeader>
            // <View style={{height: 150, width: "100%", backgroundColor: 'red'}}></View>
          }
          onRefresh={() => {
            console.log("chy onRefresh")
          }}
        >
          <Text>This is SmartRefreshControl Content</Text>
        </SmartRefreshControl>
      }
    >
      <Text>Pull down to see RefreshControl indicator</Text>
    </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;