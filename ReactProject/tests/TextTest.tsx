import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

const App = () => {
  return (
    <View style={{ height:10, marginTop: 100 }}>
        <Text style={{ height: 16 }}>1234567890</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
  },
});

export default App;