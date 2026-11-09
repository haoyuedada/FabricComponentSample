import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

// import styles from '../resources/css/mainPage.js';
import Popover, { PopoverMode } from 'react-native-popover-view';
const deviceW = Dimensions.get('window').width;


export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popIndex: -1, // 点击弹窗下标，1，蓝牙，2网关，3电量
    };
  }
  getIconView(type) {
    return <Popover
      mode={PopoverMode.RN_MODAL}
      from={(
        <TouchableOpacity
          // style={styles.lockStatusBtnStyle}
          onPress={(e) => {
            this.setState({ popIndex: type });
          }}
        >
          <View style={{
            alignItems: "center", borderRadius: 16,
            justifyContent: "center", width: 32, height: 32, backgroundColor: "rgba(0, 0, 0, 0.06)"
          }}>
            <Image style={[{
              width: 24,
              height: 24
            }]}
              source={require('./assets/expo.png')} />
            <View style={!this.isStartAnim ? { display: "none" } : {
              position: 'absolute', top: 0, left: 0,
              // opacity: opt
            }}>
              <View style={{ backgroundColor: "#0097FF", width: 32, height: 32, borderRadius: 16 }}></View>
            </View>
          </View>
        </TouchableOpacity>
      )}>
    </Popover>;
  }
  render() {
    // 蓝牙状态图片
    let bleStatusImage = this.getIconView(1);
    //  网关图片
    let gatewayImage = this.getIconView(2);
    //  门锁电量图片
    let lockPowerImage = this.getIconView(3);

    return (
      <View style={{marginTop: 200, width: "100%", height: "100%"}}>
        <ScrollView style={this.state.isDark ? { flex: 1, backgroundColor: 'xm#000000' } : { flex: 1, backgroundColor: '#f7f7f7' }} >
          <View
            style={{
              position: "absolute", top: this.iconTopDp, left: 0,
              width: deviceW,
              height: 80, justifyContent: 'center', flexDirection: 'row'
            }}
          >
            <View style={{ width: 138, height: 32, position: 'relative' }}>
              <View style={{ position: 'absolute', top: 0, right: 0 }}>
                {lockPowerImage}
              </View>

              <View style={{ position: 'absolute', top: 0, left: 42 }}>
                {gatewayImage}
              </View>

              <View style={{ position: 'absolute', top: 0, left: 0 }}>
                {bleStatusImage}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }

}







