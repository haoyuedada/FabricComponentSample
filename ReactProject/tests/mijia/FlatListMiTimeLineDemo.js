import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';

export default class ScaleableTimelineView extends React.Component {

  state = {
    datas: [],
    centerValue: 0,
    centerTimestamp: 0,
    dateArray: [],
    enableScroll: true,
    dayArray: []
  }

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
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
    ).start(() => this.startYellowBoyAnim()); // 一轮动画完成后的回调，这里递归可以形成无限动画
  }

  componentDidMount(){
    // this.startYellowBoyAnim();
    this.initData();
  }

  initData() {
    let hoursArray = [{ "day": 4, "hour": 0, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756915200000, "year": 2025 }, { "day": 4, "hour": 1, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756918800000, "year": 2025 }, { "day": 4, "hour": 2, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756922400000, "year": 2025 }, { "day": 4, "hour": 3, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756926000000, "year": 2025 }, { "day": 4, "hour": 4, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756929600000, "year": 2025 }, { "day": 4, "hour": 5, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756933200000, "year": 2025 }, { "day": 4, "hour": 6, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756936800000, "year": 2025 }, { "day": 4, "hour": 7, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756940400000, "year": 2025 }, { "day": 4, "hour": 8, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756944000000, "year": 2025 }, { "day": 4, "hour": 9, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756947600000, "year": 2025 }, { "day": 4, "hour": 10, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756951200000, "year": 2025 }, { "day": 4, "hour": 11, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756954800000, "year": 2025 }, { "day": 4, "hour": 12, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756958400000, "year": 2025 }, { "day": 4, "hour": 13, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756962000000, "year": 2025 }, { "day": 4, "hour": 14, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756965600000, "year": 2025 }, { "day": 4, "hour": 15, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756969200000, "year": 2025 }, { "day": 4, "hour": 16, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756972800000, "year": 2025 }, { "day": 4, "hour": 17, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756976400000, "year": 2025 }, { "day": 4, "hour": 18, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756980000000, "year": 2025 }, { "day": 4, "hour": 19, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756983600000, "year": 2025 }, { "day": 4, "hour": 20, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756987200000, "year": 2025 }, { "day": 4, "hour": 21, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756990800000, "year": 2025 }, { "day": 4, "hour": 22, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756994400000, "year": 2025 }, { "day": 4, "hour": 23, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1756998000000, "year": 2025 }, { "day": 5, "hour": 0, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757001600000, "year": 2025 }, { "day": 5, "hour": 1, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757005200000, "year": 2025 }, { "day": 5, "hour": 2, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757008800000, "year": 2025 }, { "day": 5, "hour": 3, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757012400000, "year": 2025 }, { "day": 5, "hour": 4, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757016000000, "year": 2025 }, { "day": 5, "hour": 5, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757019600000, "year": 2025 }, { "day": 5, "hour": 6, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757023200000, "year": 2025 }, { "day": 5, "hour": 7, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757026800000, "year": 2025 }, { "day": 5, "hour": 8, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757030400000, "year": 2025 }, { "day": 5, "hour": 9, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757034000000, "year": 2025 }, { "day": 5, "hour": 10, "mergedArray": [[Object], [Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [[Object]], "startTime": 1757037600000, "year": 2025 }, { "day": 5, "hour": 11, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757041200000, "year": 2025 }, { "day": 5, "hour": 12, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757044800000, "year": 2025 }, { "day": 5, "hour": 13, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757048400000, "year": 2025 }, { "day": 5, "hour": 14, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757052000000, "year": 2025 }, { "day": 5, "hour": 15, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757055600000, "year": 2025 }, { "day": 5, "hour": 16, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757059200000, "year": 2025 }, { "day": 5, "hour": 17, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757062800000, "year": 2025 }, { "day": 5, "hour": 18, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757066400000, "year": 2025 }, { "day": 5, "hour": 19, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757070000000, "year": 2025 }, { "day": 5, "hour": 20, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757073600000, "year": 2025 }, { "day": 5, "hour": 21, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757077200000, "year": 2025 }, { "day": 5, "hour": 22, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757080800000, "year": 2025 }, { "day": 5, "hour": 23, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757084400000, "year": 2025 }, { "day": 6, "hour": 0, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757088000000, "year": 2025 }, { "day": 6, "hour": 1, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757091600000, "year": 2025 }, { "day": 6, "hour": 2, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757095200000, "year": 2025 }, { "day": 6, "hour": 3, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757098800000, "year": 2025 }, { "day": 6, "hour": 4, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757102400000, "year": 2025 }, { "day": 6, "hour": 5, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757106000000, "year": 2025 }, { "day": 6, "hour": 6, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757109600000, "year": 2025 }, { "day": 6, "hour": 7, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757113200000, "year": 2025 }, { "day": 6, "hour": 8, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757116800000, "year": 2025 }, { "day": 6, "hour": 9, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757120400000, "year": 2025 }, { "day": 6, "hour": 10, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757124000000, "year": 2025 }, { "day": 6, "hour": 11, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757127600000, "year": 2025 }, { "day": 6, "hour": 12, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757131200000, "year": 2025 }, { "day": 6, "hour": 13, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757134800000, "year": 2025 }, { "day": 6, "hour": 14, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757138400000, "year": 2025 }, { "day": 6, "hour": 15, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757142000000, "year": 2025 }, { "day": 6, "hour": 16, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757145600000, "year": 2025 }, { "day": 6, "hour": 17, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757149200000, "year": 2025 }, { "day": 6, "hour": 18, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757152800000, "year": 2025 }, { "day": 6, "hour": 19, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757156400000, "year": 2025 }, { "day": 6, "hour": 20, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757160000000, "year": 2025 }, { "day": 6, "hour": 21, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757163600000, "year": 2025 }, { "day": 6, "hour": 22, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757167200000, "year": 2025 }, { "day": 6, "hour": 23, "mergedArray": [[Object]], "minutesArray": [[Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object], [Object]], "month": 9, "rangeList": [], "startTime": 1757170800000, "year": 2025 }]
    console.log("chy time hoursArray:", hoursArray)
    this.setState({ dateArray: hoursArray });
  }

  render() {
    let height = 54;
    let containerStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: this.props.fullScreen ? 'rgba(0, 0, 0, 0.4)' : "white"
    };

    let outterStyle = {
      position: "relative",
      width: "100%",
      height: 84
    };
    return (
      <View
        style={outterStyle}
      >
        <View
          style={containerStyle}
        >
          <View
            style={{ width: "100%", height: 30, display: "flex", flexDirection: "row", alignItems: "center" }}
          >
          </View>
          <View style={{ position: "relative", width: "100%", height: height, borderLeftWidth: 0, borderRigthWidth: 0, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#E6E6E6" }}>
            <View
              style={{ width: "100%", height: height, display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" }}
            >
              <FlatList
                data={this.state.dateArray}
                renderItem={(item, index) => {
                  console.log("chy time index:", index)
                  return this.renderHourItem(item);
                }}
                style={{ height: "100%", flexGrow: 1 }}
                horizontal={true}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderHourItem({ item }) {
    return (
      <Text>{item.day}-</Text>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: '100%',
    height: '100%',
    display: "flex",
    flexWrap: "nowrap"
  },

  dayItemSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    marginHorizontal: 7,
    paddingHorizontal: 10,
    backgroundColor: "#32bac0",
    borderRadius: 10
  },

  dayItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    marginHorizontal: 7,
    paddingHorizontal: 10,
    backgroundColor: "#eceef0",
    borderRadius: 10
  },
  dayItemText: {
    color: "#b2b2b2", fontSize: 9
  },
  dayItemTextSelected: {
    color: "#ffffff", fontSize: 9
  },

  lineContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: 'nowrap',
    alignItems: "center"
  },

  hourIndicatorContainer: {
    position: "absolute",
    width: "100%",
    bottom: 6,
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row"
  },

  hourIndicatorText: {
    color: "#808789",
    fontSize: 10,
    flexGrow: 1,
    paddingLeft: 3
  },

  dateIndicatorText: {
    position: "absolute",
    top: 6,
    left: 3,
    color: "#808080",
    fontSize: 10
  },

  fiveMinutesContainer: {
    flexGrow: 1,
    position: "relative",
    height: "100%"
  },

  minutesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },

  longLineDivider: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 0.5,
    height: 48,
    transform: [{ translateY: 3 }],
    backgroundColor: "#a6b0c3"
  },

  shortLineDivider: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 0.5,
    height: 14,
    transform: [{ translateY: 20 }],
    backgroundColor: "#a6b0c3"
  },

  hasFileContent: {
    flexGrow: 1,
    backgroundColor: "#ff5f0026",
    marginBottom: 0.5
  },

  noFileContent: {
    flexGrow: 1,
    marginBottom: 0.5
  }


});

