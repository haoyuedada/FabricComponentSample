import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, StatusBar } from 'react-native';

const App = () => {
  const statusBarHeight = StatusBar.currentHeight;

  return (
    <SafeAreaView style={{ marginTop: statusBarHeight, flex: 1 }}>
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