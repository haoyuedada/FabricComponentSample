import PropTypes from "prop-types";
import React from "react";
import { View, Animated, Easing } from "react-native";

import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
/**
 * ---------+------------------------+
 * <-- P -->|<--    T    -->|        |______
 *          |   /\          |   /\   |  ^
 *          |  /  \         |  /  \  |  A
 *          | /    \        | /    \ |  |
 *          |/      \       |/      \|__V___
 *          |        \      /        |  ^
 *          |         \    /         |  |
 *          |          \  /          |  |
 *          |           \/           |  H
 *          |                        |  |
 *          |                        |  |
 * ---------+------------------------+__V___
 */

/**
 * @export
 * @author zilin
 * @module ChartWave
 * @description 水波图
 * @prop {style} style 页面样式
 * @prop {Number} H 水的深度（要绘制的图形总高度-浪高）
 * @prop {rgbaArray} gradientColors 水波的渐变色
 * @prop {Array} waveParams [{A, T, S},...] A浪高，T一个波形的跨度，S运动一个波动周期的时长
 * @prop {string} easing 水波震荡速率，默认为 "linear"
 * 
 * 用法：
 * <ChartWave 
        style={{width: ScreenUtil.screenWidth, height: 302, marginTop: 28}}
        H={277}
        gradientColors={["rgba(0,231,247,1)","rgba(21,191,240,0)"]}
        waveParams={[
            {A:25, T:450, S: 5000}, 
            {A:22, T:450, S: 4000}, 
            {A:18, T:450, S: 3000}
        ]}
    />
 */
export default class CMChartWave extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    H: PropTypes.number,
    gradientColors: PropTypes.array,
    waveParams: PropTypes.array,
    easing: PropTypes.string,
  };
  static defaultProps = {
    easing: "linear",
  };
  constructor(props) {
    super(props);

    this._animValues = [];
    this._animations = [];

    for (let i = 0; i < this.props.waveParams.length; i++) {
      this._animValues.push(new Animated.Value(0));
    }
  }

  componentDidMount() {
    this.startAnim();
  }

  componentWillUnmount() {
    this.stopAnim();
    this._animValues = null;
    this._animations = null;
  }
  viewWhat() {
    let { H, gradientColors, waveParams } = this.props;

    let waves = [];

    // for (let i = 0; i < waveParams.length; i++) {
    //   let { A, T } = waveParams[i];
    //   let translateX = this._animValues[i].interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, -T],
    //   });

    return (
      <AnimatedSvg
        // key={i}
        style={{
          width: 2 * 2,
          height: 2 + H,
          position: "absolute",
          left: 0,
          bottom: 0,
          // transform: [{ translateX }],
        }}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${2 * 2} ${2 + H}`}
      >
        <Defs>
          <LinearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.25} />
            <Stop offset="100%" stopColor={gradientColors[gradientColors.length - 1]} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        {/* <Path
          d={`M 0 0 Q ${T / 4} ${-A} ${T / 2} 0 T ${T} 0 T ${(3 * T) / 2} 0 T ${2 * T} 0 T ${(5 * T) / 2
            } 0 T ${3 * T} 0 V ${H} H 0 Z`}
          fill={"url(#linear)"}
          transform={`translate(${(-i / 4) * T}, ${A + (i / 5) * A})`}
        /> */}
      </AnimatedSvg>
    );
    // waves.push(wave);
    // }
  }
  render() {

    return <View style={[this.props.style, { overflow: "hidden" }]}>{this.viewWhat()}</View>;
  }

  startAnim() {
    this.stopAnim();

    for (let i = 0; i < this._animValues.length; i++) {
      let anim = Animated.loop(
        Animated.timing(this._animValues[i], {
          toValue: 1,
          duration: this.props.waveParams[i].S,
          easing: Easing[this.props.easing],
          useNativeDriver: true,
        })
      );
      this._animations.push(anim);
      anim.start();
    }
  }

  stopAnim() {
    for (let _anim of this._animations) {
      _anim.stop();
      _anim = null;
    }
    this._animations = [];
  }
}
