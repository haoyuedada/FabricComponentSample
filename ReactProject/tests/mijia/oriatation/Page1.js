
import React from 'react';


import {
  View,
  Button,
  Animated, Easing
} from 'react-native';

export default class Page1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center'
        }}>
        <Button title='lalalal' onPress={() => {
          this.props.navigation.navigate('Page2')
        }}></Button>
      </View>
    );
  }
}