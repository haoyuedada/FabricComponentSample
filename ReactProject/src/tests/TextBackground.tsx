import React, { Component } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    // 初始化 state count，初始值为 0
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
        <Text backgroundColor="red">sfsafad</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
