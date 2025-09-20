
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
import SelectBox from "fabric-component-sample-package/src/specs/v1/SelectBox";

export default class Page1 extends React.Component {
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
        {/* Modal */}
        <Modal
          transparent={true}
          visible={this.state.modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{
              width: 100,
              height: 100,
              backgroundColor: 'red'
            }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false })
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* SelectBox */}
        <SelectBox
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'blue',
            width: 200,
            height: 200,
          }}
          value={2}
          data={[]}
          onChangeInSelectBox={() => {

          }}
          onDismiss={() => {
            console.log("chy onDismiss")
          }}
        />
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