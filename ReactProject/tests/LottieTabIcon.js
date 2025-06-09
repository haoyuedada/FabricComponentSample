/**
 * Created by vengeanliu on 2018/8/2.
 */
import React, { Component } from 'react';
import {
  Animated,
  Easing,
  View,
  Button
} from 'react-native';
import LottieViewOrigin from 'lottie-react-native';
const LottieView = Animated.createAnimatedComponent(LottieViewOrigin);
import PropTypes from 'prop-types';

export default class LottieTabIcon extends Component {
  static propTypes = {
    isActive: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  componentDidMount() {
    // Avoid setting progress in constructor due to older Android issues
    this.state.progress.setValue(this.props.isActive ? 1 : 0);
  }

  play = () => {
    console.log('start play');
    this.state.progress.setValue(0);
    Animated.loop(
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true // progress 不支持原生驱动
      })
    ).start();
  };

  reset = () => {
    this.state.progress.setValue(0);
  };

  render() {
    return (
      <View>
        <LottieView
          style={{ width: 300, height: 300 }}
          source={require('../assets/gradientBall.json')}
          progress={this.state.progress}
        />
        <Button title="Play Animation" onPress={this.play} />
      </View>
    );
  }
}
