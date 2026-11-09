import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Animated } from 'react-native';

export default class MyFlatList extends React.Component {

  constructor(props) {
    super(props);
    // 初始化数据
    this.state = {
      data: [{ "day": 18, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752768000000, "year": 2025 }, { "day": 18, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752771600000, "year": 2025 }, { "day": 18, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752775200000, "year": 2025 }, { "day": 18, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752778800000, "year": 2025 }, { "day": 18, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752782400000, "year": 2025 }, { "day": 18, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752786000000, "year": 2025 }, { "day": 18, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752789600000, "year": 2025 }, { "day": 18, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752793200000, "year": 2025 }, { "day": 18, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752796800000, "year": 2025 }, { "day": 18, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752800400000, "year": 2025 }, { "day": 18, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752804000000, "year": 2025 }, { "day": 18, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752807600000, "year": 2025 }, { "day": 18, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752811200000, "year": 2025 }, { "day": 18, "hour": 13, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752814800000, "year": 2025 }, { "day": 18, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752818400000, "year": 2025 }, { "day": 18, "hour": 15, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752822000000, "year": 2025 }, { "day": 18, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752825600000, "year": 2025 }, { "day": 18, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752829200000, "year": 2025 }, { "day": 18, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752832800000, "year": 2025 }, { "day": 18, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752836400000, "year": 2025 }, { "day": 18, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752840000000, "year": 2025 }, { "day": 18, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752843600000, "year": 2025 }, { "day": 18, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752847200000, "year": 2025 }, { "day": 18, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752850800000, "year": 2025 }, { "day": 19, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752854400000, "year": 2025 }, { "day": 19, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752858000000, "year": 2025 }, { "day": 19, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752861600000, "year": 2025 }, { "day": 19, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752865200000, "year": 2025 }, { "day": 19, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752868800000, "year": 2025 }, { "day": 19, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752872400000, "year": 2025 }, { "day": 19, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752876000000, "year": 2025 }, { "day": 19, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752879600000, "year": 2025 }, { "day": 19, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752883200000, "year": 2025 }, { "day": 19, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752886800000, "year": 2025 }, { "day": 19, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752890400000, "year": 2025 }, { "day": 19, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752894000000, "year": 2025 }, { "day": 19, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752897600000, "year": 2025 }, { "day": 19, "hour": 13, "mergedArray": [["1"], ["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752901200000, "year": 2025 }, { "day": 19, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752904800000, "year": 2025 }, { "day": 19, "hour": 15, "mergedArray": [["1"], ["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752908400000, "year": 2025 }, { "day": 19, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752912000000, "year": 2025 }, { "day": 19, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752915600000, "year": 2025 }, { "day": 19, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752919200000, "year": 2025 }, { "day": 19, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752922800000, "year": 2025 }, { "day": 19, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752926400000, "year": 2025 }, { "day": 19, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752930000000, "year": 2025 }, { "day": 19, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752933600000, "year": 2025 }, { "day": 19, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752937200000, "year": 2025 }, { "day": 20, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752940800000, "year": 2025 }, { "day": 20, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752944400000, "year": 2025 }, { "day": 20, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752948000000, "year": 2025 }, { "day": 20, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752951600000, "year": 2025 }, { "day": 20, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752955200000, "year": 2025 }, { "day": 20, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752958800000, "year": 2025 }, { "day": 20, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752962400000, "year": 2025 }, { "day": 20, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752966000000, "year": 2025 }, { "day": 20, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752969600000, "year": 2025 }, { "day": 20, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752973200000, "year": 2025 }, { "day": 20, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752976800000, "year": 2025 }, { "day": 20, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752980400000, "year": 2025 }, { "day": 20, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752984000000, "year": 2025 }, { "day": 20, "hour": 13, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752987600000, "year": 2025 }, { "day": 20, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752991200000, "year": 2025 }, { "day": 20, "hour": 15, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752994800000, "year": 2025 }, { "day": 20, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752998400000, "year": 2025 }, { "day": 20, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753002000000, "year": 2025 }, { "day": 20, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753005600000, "year": 2025 }, { "day": 20, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753009200000, "year": 2025 }, { "day": 20, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753012800000, "year": 2025 }, { "day": 20, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753016400000, "year": 2025 }, { "day": 20, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753020000000, "year": 2025 }, { "day": 20, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753023600000, "year": 2025 }]
    };

    setTimeout(() => {
      // this.flatList.scrollToOffset({ offset: 300, animated: false });
    }, 3000)
  }

  // 渲染每个列表项
  renderHourItem({ item, index }) {
    console.log("chy xxx item.day:", item.day, "item.hour:", item.hour, ',index:', index);
    return (
      <MyListItem
        styles={{ margintop: 200 }}
        dataItem={item}
      />
    )
  };

  VIEWABILITY_CONFIG = {
    minimumViewTime: 300, // 滑动
    viewAreaCoveragePercentThreshold: 0,
    waitForInteraction: false
  }
  render() {
    console.log('FlatList length:', this.state.data.length)
    return (
      <View style={{ width: "100%", height: 52, display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" }}>
        <FlatList
          ref={(ref) => { this.flatList = ref; }}
          horizontal={true}
          data={this.state.data}
          renderItem={(item, index) => {
            return this.renderHourItem(item, index)
          }}
          style={{ height: "100%", flexGrow: 1 }}
          viewabilityConfig={this.VIEWABILITY_CONFIG}
          
          keyExtractor={(item, index) => index.toString()}
        // ListHeaderComponent={<Text style={styles.header}>100个项目列表</Text>}
        // ListFooterComponent={<Text style={styles.footer}>列表结束</Text>}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        // removeClippedSubviews={true} // 优化性能，移除不可见的子视图
        // initialNumToRender={24}
        />
      </View>
    );
  }
};

class MyListItem extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let item = this.props.dataItem;
    let dateStr = null;
    let { month, day, hour, minutesArray } = item;
    if (hour == 0) { // 需要添加日期
      dateStr = `${month > 10 ? month : `0${month}`}/${day > 10 ? day : `0${day}`}`;
    }
    let hourStr = hour > 9 ? `${hour}` : `0${hour}`;

    return (
      <Animated.View
        style={{
          backgroundColor: 'transparent', // https://github.com/facebook/react-native/issues/22251 不加这行代码  onbegindrag 和onendDrag偶尔不会被调用到。
          // position: "relative",
          height: "100%",
          width: 180,
        }}>
        <View
          style={styles.lineContainer}
        >
          {this._renderFiveMinutes(minutesArray)}
        </View>

        <View
          style={styles.minutesContainer}>
          {
            item["mergedArray"].map((item, index) => {

              let { hasVideo, flexGrow } = item;
              // todo here should extract eventType && save flag && has video flag  && motion flag 

              return (
                <View style={hasVideo ? { backgroundColor: "#ff5f0026", marginBottom: 0.5, flexGrow: flexGrow } : { marginBottom: 0.5, flexGrow: flexGrow }}
                  key={index}
                />
              );
            })
          }
        </View>

        <View
          style={styles.hourIndicatorContainer}
        >
          <Text
            style={styles.hourIndicatorText}
          >
            {`${hourStr}:00`}
          </Text>

          <Text
            style={styles.hourIndicatorText}
          >
            {`${hourStr}:30`}
          </Text>

        </View>

        <Text
          style={styles.dateIndicatorText}>
          {dateStr}
        </Text>
      </Animated.View>
    );
  }


  _renderFiveMinutes(fiveMinuteArray) {

    return (
      fiveMinuteArray.map((item, index) => {

        let showLongDividerLine = item.minute == 0 || item.minute == 30;
        let hasVideoArray = item.hasVideo;
        return (
          <View style={styles.fiveMinutesContainer}
            key={index}
          >
            {/* <View
              style={styles.minutesContainer}>
              {this._renderMinuteView(hasVideoArray)}
            </View> */}
            <View style={showLongDividerLine ? styles.longLineDivider : styles.shortLineDivider} />
          </View>
        );
      })
    );
  }

  _renderMinuteView(hasVideoArray) {
    let mergedArray = [];
    let lastStatus = hasVideoArray[0].hasVideo;
    let continuedCount = 1;
    for (let i = 1; i < hasVideoArray.length; i++) {
      if (lastStatus != hasVideoArray[i].hasVideo) {
        mergedArray.push({ flexGrow: continuedCount, hasVideo: lastStatus });
        lastStatus = hasVideoArray[i].hasVideo;
        continuedCount = 1;
      } else {
        continuedCount++;
      }
    }
    mergedArray.push({ flexGrow: continuedCount, hasVideo: lastStatus });


    return (
      mergedArray.map((item, index) => {
        if (index >= 5) {
          return null;
        }
        let { hasVideo, flexGrow } = item;
        // todo here should extract eventType && save flag && has video flag  && motion flag 

        return (
          <View style={hasVideo ? { backgroundColor: "#ff5f0026", marginBottom: 0.5, flexGrow: flexGrow } : { marginBottom: 0.5, flexGrow: flexGrow }}
            key={index}
          />
        );
      })

    );
    // return (
    //   hasVideoArray.map((item, index) => {
    //     let hasVideo = item.hasVideo;
    //     return (
    //       <View style={hasVideo ? {backgroundColor:"#ff5f0026", marginBottom:0.5, flexGrow:1} : {marginBottom:0.5, flexGrow: 1}}
    //         key = {index}
    //       ></View>
    //     )
    //   })
    // )
    // return null;
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
    // backgroundColor: "red"
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