
import React from 'react';
import {
  View,
  Button,
  Animated,
  Easing,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import RCTMessageDialog from "fabric-component-sample-package/src/specs/v1/RCTMessageDialog";

export default class Page11 extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      modalVisible: false
    }
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
        <RCTMessageDialog
          title='123456'
          style={{
              width: 250,
              height: 50
          }}
          onTouchStart={() => {
            console.log("chy RCTMessage onTouchStart")
          }}
        ></RCTMessageDialog>
        <Button title='跳转到page2页面' onPress={() => {
          this.props.navigation.navigate('Page2')
        }}></Button>
        <Button title='显示 or 隐藏 modal' onPress={() => {
          setTimeout(() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }, 2000);
        }}></Button>
      </View>
    );
  }
}