import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, StatusBar } from 'react-native';

const App = () => {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <SafeAreaView style={{
      borderWidth: 1,
      borderColor: 'blue',
      height: 200,
      // marginTop: 100,
      // marginBottom: 100,
      paddingBottom: 20
    }}>
      <Text>Page content</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'green',
    flex: 1,
  },
});

export default App;