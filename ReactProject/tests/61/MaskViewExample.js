/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

'use strict';

const React = require('react');

const {
  Animated,
  Image,
  MaskedViewIOS,
  StyleSheet,
  Text,
  View,
} = require('react-native');

type Props = $ReadOnly<{||}>;
type ChangingChildrenState = {|
  alternateChildren: boolean,
|};

class AnimatedMaskExample extends React.Component<Props> {
  _maskRotateAnimatedValue = new Animated.Value(0);
  _maskScaleAnimatedValue = new Animated.Value(1);

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this._maskScaleAnimatedValue, {
          toValue: 1.3,
          timing: 750,
          useNativeDriver: true,
        }),
        Animated.timing(this._maskScaleAnimatedValue, {
          toValue: 1,
          timing: 750,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(this._maskRotateAnimatedValue, {
        toValue: 360,
        timing: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }

  render(): React.Node {
    return (
      <View style={styles.exampleWrapperStyle}>
        <MaskedViewIOS
          style={styles.flexStyle}
          maskElement={
            <Animated.View
              style={[
                styles.maskContainerStyle,
                {transform: [{scale: this._maskScaleAnimatedValue}]},
              ]}>
              <Text style={styles.maskTextStyle}>会动的 Mask</Text>
            </Animated.View>
          }>
          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  rotate: this._maskRotateAnimatedValue.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}>
            <View style={styles.blueStyle} />
            <View style={styles.redStyle} />
          </Animated.View>
        </MaskedViewIOS>
      </View>
    );
  }
}

class ChangingChildrenMaskExample extends React.Component<
  Props,
  ChangingChildrenState,
> {
  state: ChangingChildrenState = {
    alternateChildren: true,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        alternateChildren: !state.alternateChildren,
      }));
    }, 1000);
  }

  render(): React.Node {
    return (
      <View style={styles.exampleWrapperStyle}>
        <MaskedViewIOS
          style={styles.flexStyle}
          maskElement={
            <View style={styles.maskContainerStyle}>
              <Text style={styles.maskTextStyle}>Basic Mask</Text>
            </View>
          }>
          {this.state.alternateChildren
            ? [
                <View key={1} style={styles.blueStyle} />,
                <View key={2} style={styles.redStyle} />,
              ]
            : null}
        </MaskedViewIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exampleWrapperStyle: {
    width: 340,
    height: 300,
    alignSelf: 'center',
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
  maskContainerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskTextStyle: {
    backgroundColor: 'transparent',
    fontSize: 40,
    fontWeight: 'bold',
  },
  blueStyle: {
    flex: 1,
    backgroundColor: 'blue',
  },
  redStyle: {
    flex: 1,
    backgroundColor: 'red',
  },
  grayStyle: {
    backgroundColor: '#eeeeee',
  },
  flexStyle: {
    flex: 1,
  },
});

exports.title = 'MaskedViewIOS';
exports.description =
  'Renders the child view with a mask specified in the `renderMask` prop.';
exports.examples = [
  {
    title: '基本蒙层',
    render: function(): React.Element<typeof View> {
      return (
        <View style={styles.exampleWrapperStyle}>
          <MaskedViewIOS
            style={styles.flexStyle}
            maskElement={
              <View style={styles.maskContainerStyle}>
                <Text style={styles.maskTextStyle}>123 Mask</Text>
              </View>
            }>
            <View style={styles.blueStyle} />
            <View style={styles.redStyle} />
          </MaskedViewIOS>
        </View>
      );
    },
  },
  {
    title: '图片蒙层',
    render: function(): React.Element<typeof View> {
      return (
        <View style={[styles.exampleWrapperStyle, styles.grayStyle]}>
          <MaskedViewIOS
            style={styles.flexStyle}
            maskElement={
              <View style={styles.maskContainerStyle}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../../assets/hawk.png')}
                />
              </View>
            }>
            <View style={styles.maskContainerStyle}>
              <Image
                resizeMode="cover"
                style={styles.imageStyle}
                source={{
                  uri:
                    'https://legacy.reactjs.org/logo-og.png',
                }}
              />
            </View>
          </MaskedViewIOS>
        </View>
      );
    },
  },
  {
    title: '动画蒙层',
    render: function(): React.Element<typeof AnimatedMaskExample> {
      return <AnimatedMaskExample />;
    },
  },
  {
    title: 'Mask w/ Changing Children',
    render: function(): React.Element<typeof ChangingChildrenMaskExample> {
      return <ChangingChildrenMaskExample />;
    },
  },
];
