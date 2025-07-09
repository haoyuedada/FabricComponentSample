import React, { Component, StatusBar } from 'react';

import {
  TouchableOpacity,
  View,
  Animated,
  Dimensions
} from 'react-native';

const c_duration = 200;
const c_deviceHeight = Math.max(Dimensions.get("window").height, Dimensions.get("window").width);
const DEVICE_WIDTH = Math.min(Dimensions.get("window").height, Dimensions.get("window").width);
export default class CoverLayer extends Component {

    static popupMode = {
      center: "center",
      bottom: "bottom"
    };

    // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        isShow: false,
        opacityValue: new Animated.Value(0),
        scaleValue: new Animated.Value(1.1),
        bottom: new Animated.Value(-c_deviceHeight),
        renderContent: this.props.renderContent,
        coverLayerEvent: this.props.coverLayerEvent,
        coverLayerColor: this.props.coverLayerColor,
        displayMode: null
      };
      this.showAnimated = null;
      this.hideAnimated = null;
    }

    /**
     * 显示弹框(该方法是为了简化一个界面有多个弹框的情况)
     * renderContent: func, 渲染弹框内容的方法, 会覆盖this.props.renderContent
     * coverLayerEvent: func, 点击背景触发的事件, 会覆盖this.props.coverLayerEvent
     * */
    async showWithContent(renderContent, coverLayerEvent, displayMode) {
      
      if (this.state.isShow) {
        this.hide(async() => {
          await this.setState({
            coverLayerEvent: coverLayerEvent,
            renderContent: renderContent
          });

          this.show(displayMode);
        });
      } else {
        await this.setState({
          coverLayerEvent: coverLayerEvent,
          renderContent: renderContent
        });

        this.show(displayMode);
      }
    }

    // 显示弹框
  show(displayMode) {
    this.props.CoverLayerState(true);
      this.setState({
        displayMode: displayMode,
        isShow: true
      });

      if (CoverLayer.popupMode.bottom == displayMode) {
        this.showAnimated = this.showFromBottom;
        this.hideAnimated = this.hideFromBottom;
      } else {
        this.showAnimated = this.showFromCenter;
        this.hideAnimated = this.hideFromCenter;
      }

      Animated.parallel([
        Animated.timing(this.state.opacityValue, {
          toValue: 1,
          duration: c_duration,
          useNativeDriver: false
        }),
        this.showAnimated()
      ]).start();
    }


    // 从中间弹出界面
    showFromCenter() {
      return (Animated.timing(this.state.scaleValue, {
        toValue: 1,
        duration: c_duration,
        useNativeDriver: false
      }));
    }


    // 从底部弹出界面
    showFromBottom() {
      return (Animated.timing(this.state.bottom, {
        toValue: 0,
        duration: c_duration,
        useNativeDriver: false
      }));
    }


    // 隐藏弹框
    hide(callback) {
      this.props.CoverLayerState(false);
      Animated.parallel([
        Animated.timing(this.state.opacityValue, {
          toValue: 0,
          duration: c_duration,
          useNativeDriver: false
        }),
        this.hideAnimated()
      ]).start(async() => {
        await this.setState({ isShow: false });
        callback && callback();
      });
    }

    // 从中间隐藏
    hideFromCenter() {
      return (Animated.timing(this.state.scaleValue, {
        toValue: 1.1,
        duration: c_duration,
        useNativeDriver: false
      }));
    }

    // 从底部隐藏
    hideFromBottom() {
      return (Animated.timing(this.state.bottom, {
        toValue: -c_deviceHeight,
        duration: c_duration,
        useNativeDriver: false
      }));
    }

    render() {
      // return (
      //   <View style={{width: '100%', height: 100, backgroundColor: 'red'}}></View>
      // )
      return (
        this.state.isShow &&
            <Animated.View style={{ width: DEVICE_WIDTH, justifyContent: CoverLayer.popupMode.bottom == this.state.displayMode ? 'flex-end' : 'center',
              alignItems: 'center', backgroundColor: this.props.coverLayerColor ? this.props.coverLayerColor : 'rgba(0,0,0,0.4)',
              position: 'absolute', top: 0, bottom: 0, opacity: this.state.opacityValue }}>

              <TouchableOpacity style={{ width: DEVICE_WIDTH, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0 }}
                activeOpacity={1}
                onPress={() => { this.state.coverLayerEvent && this.state.coverLayerEvent(); }}/>
              <Animated.View style={CoverLayer.popupMode.bottom == this.state.displayMode ? { bottom: this.state.bottom } : { transform: [{ scale: this.state.scaleValue }] }}>
                {this.state.renderContent && this.state.renderContent()}
                {/* <View style={{ width: '100%', height: 100, backgroundColor: 'red' }}></View> */}
              </Animated.View>
            </Animated.View>
      );
    }
}
