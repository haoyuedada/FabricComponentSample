
import React from 'react';


import {
  View,
  Button,
  Animated, Easing
} from 'react-native';

export default class Page1 extends React.Component {
    constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.startYellowBoyAnim();
  }

  startYellowBoyAnim() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false
      }
    ).start(() => this.startYellowBoyAnim());
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