import React from 'react';
import { PanResponder, View, Dimensions, FlatList, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import * as _ from 'lodash';
import Toast from "react-native-root-toast";
import { localStrings as LocalizedStrings } from "../../resources/strings/MHLocalizableString";
import ImiUtil from "../util/ImiUtil";
import { Host } from 'miot';


const itemWidth = 15;
const oneDaysMillis = 24 * 60 * 60 * 1000;// 至少1天以前，才能让最后一个数据/最前一个数字能够被筛选到。
const oneHourMillis = 60 * 60 * 1000;
const fiveMinutesMillis = 1000 * 60 * 5;
const oneMunitesMillis = 1000 * 60;
let animatedValue = new Animated.Value(itemWidth * 12);

const SCROLLSTATE = {
  IDLE: 0,
  SCROLLING: 1,
  DRAGEND: 2,
  FLING: 3,
  FLINGEND: 4
};

export default class ScaleableTimelineView extends React.Component {

  state = {
    datas: [],
    centerValue: 0,
    centerTimestamp: 0,
    // dateArray: [
    //   { "day": 18, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752768000000, "year": 2025 }, { "day": 18, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752771600000, "year": 2025 }, { "day": 18, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752775200000, "year": 2025 }, { "day": 18, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752778800000, "year": 2025 }, { "day": 18, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752782400000, "year": 2025 }, { "day": 18, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752786000000, "year": 2025 }, { "day": 18, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752789600000, "year": 2025 }, { "day": 18, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752793200000, "year": 2025 }, { "day": 18, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752796800000, "year": 2025 }, { "day": 18, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752800400000, "year": 2025 }, { "day": 18, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752804000000, "year": 2025 }, { "day": 18, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752807600000, "year": 2025 }, { "day": 18, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752811200000, "year": 2025 }, { "day": 18, "hour": 13, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752814800000, "year": 2025 }, { "day": 18, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752818400000, "year": 2025 }, { "day": 18, "hour": 15, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752822000000, "year": 2025 }, { "day": 18, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752825600000, "year": 2025 }, { "day": 18, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752829200000, "year": 2025 }, { "day": 18, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752832800000, "year": 2025 }, { "day": 18, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752836400000, "year": 2025 }, { "day": 18, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752840000000, "year": 2025 }, { "day": 18, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752843600000, "year": 2025 }, { "day": 18, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752847200000, "year": 2025 }, { "day": 18, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752850800000, "year": 2025 }, 
    //   { "day": 19, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752854400000, "year": 2025 }, { "day": 19, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752858000000, "year": 2025 }, { "day": 19, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752861600000, "year": 2025 }, { "day": 19, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752865200000, "year": 2025 }, { "day": 19, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752868800000, "year": 2025 }, { "day": 19, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752872400000, "year": 2025 }, { "day": 19, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752876000000, "year": 2025 }, { "day": 19, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752879600000, "year": 2025 }, { "day": 19, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752883200000, "year": 2025 }, { "day": 19, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752886800000, "year": 2025 }, { "day": 19, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752890400000, "year": 2025 }, { "day": 19, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752894000000, "year": 2025 }, { "day": 19, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752897600000, "year": 2025 }, { "day": 19, "hour": 13, "mergedArray": [["1"], ["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752901200000, "year": 2025 }, { "day": 19, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752904800000, "year": 2025 }, { "day": 19, "hour": 15, "mergedArray": [["1"], ["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752908400000, "year": 2025 }, { "day": 19, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752912000000, "year": 2025 }, { "day": 19, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752915600000, "year": 2025 }, { "day": 19, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752919200000, "year": 2025 }, { "day": 19, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752922800000, "year": 2025 }, { "day": 19, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752926400000, "year": 2025 }, { "day": 19, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752930000000, "year": 2025 }, { "day": 19, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752933600000, "year": 2025 }, { "day": 19, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752937200000, "year": 2025 },
    //   { "day": 20, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752940800000, "year": 2025 }, { "day": 20, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752944400000, "year": 2025 }, { "day": 20, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752948000000, "year": 2025 }, { "day": 20, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752951600000, "year": 2025 }, { "day": 20, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752955200000, "year": 2025 }, { "day": 20, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752958800000, "year": 2025 }, { "day": 20, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752962400000, "year": 2025 }, { "day": 20, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752966000000, "year": 2025 }, { "day": 20, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752969600000, "year": 2025 }, { "day": 20, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752973200000, "year": 2025 }, { "day": 20, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752976800000, "year": 2025 }, { "day": 20, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752980400000, "year": 2025 }, { "day": 20, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752984000000, "year": 2025 }, { "day": 20, "hour": 13, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752987600000, "year": 2025 }, { "day": 20, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752991200000, "year": 2025 }, { "day": 20, "hour": 15, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752994800000, "year": 2025 }, { "day": 20, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752998400000, "year": 2025 }, { "day": 20, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753002000000, "year": 2025 }, { "day": 20, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753005600000, "year": 2025 }, { "day": 20, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753009200000, "year": 2025 }, { "day": 20, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753012800000, "year": 2025 }, { "day": 20, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753016400000, "year": 2025 }, { "day": 20, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753020000000, "year": 2025 }, { "day": 20, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753023600000, "year": 2025 }
    // ],
    dateArray: [],
    enableScroll: true,
    dayArray: []
  }

  constructor(props) {
    super(props);

    this.handleViewableItemsChanged = this._onViewableItemsChanged.bind(this);
    // this.debounceHandler = _.debounce(this.onScrollEnd, 1000, { maxWait: 1000 });
    // this.scaleChangedDebounceHandler = _.debounce(this.onScaleChangeEnd, 500, {maxWait: 1000})

    this.scrollToTimestampWithNotify = this.scrollToTimestampWithNotify.bind(this);

    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.zoomLastDistance = 0;


    this.maxScale = 10;
    this.minScale = 0.5;

    this.touchDownDistant = 0;
    this.zoomLastDistance = 0;
    this.zoomCurrentDistance = 0;

    this.scrollX = 0;

    this.scaleFactor = 1;

    this.dateTime = new Date();

    this.dateBeginDayTime = 0;

    this.timeItemList = [];

    this.dayArray = [];

    this.shouldNotify = true;

    this.tmpCenterValue = 0;// 用于在缩放开始前记录centervalue，缩放结束后restore centervalue

    this.isLeftPressed = false;// 标记左边的按钮是否按下了
    this.isLeftLongPressed = false;// 左边的按钮是否长按中
    this.isRightPressed = false;// 标记右边的按钮是否按下了
    this.isRightLongPressed = false;
    this.longLeftPressTimeout = null;// 长按左边的按钮的timeout id
    this.longRightPressTimeout = null;// 长按右边按钮的timeout id

    this.scrollDayIndexTimeout = null;

    this.scrollState = SCROLLSTATE.IDLE;

    this.scrollEndTimeout = null;

    // 初始化
    this.panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt) => {
        let isMulti = evt.nativeEvent.changedTouches.length > 1;
        console.log(`onStartShouldSetPanResponder ${ isMulti }`);
        if (isMulti) { // 多指才拦截
          return true;
        } else {
          return false;
        }
      }, // 是否是多指
      onMoveShouldSetPanResponder: (evt) => {
        let isMulti = evt.nativeEvent.changedTouches.length > 1;
        // console.log("onMoveShouldSetPanResponder:" + isMulti);
        if (isMulti) { // 多指才拦截
          return true;
        } else {
          return false;
        }
      }, // 滑动事件要接收
      onPanResponderTerminationRequest: () => { return false; }, // 在缩放时 其他组件也申请，不让权

      onPanResponderReject: () => {
        this.tmpCenterValue = 0;
        // console.log("onPanResponderReject");
      },

      onPanResponderGrant: (evt) => { // 得到了手势
        // 开始移动的时候禁用listview的滚动
        this.setState({
          enableScroll: false
        });

        this.tmpCenterValue = this.state.centerTimestamp;

        // 开始手势操作
        // console.log("onPanResponderGrant");

        if (evt.nativeEvent.changedTouches.length > 1) { // 双指时的中心点
          let distantX = evt.nativeEvent.changedTouches[1].pageX - evt.nativeEvent.changedTouches[0].pageX;
          let distantY = evt.nativeEvent.changedTouches[1].pageY - evt.nativeEvent.changedTouches[0].pageY;
          this.touchDownDistant = Math.sqrt(distantX * distantX + distantY * distantY);
          // console.log("双指:downDistance" + this.touchDownDistant);
        }

      },

      onPanResponderStart: () => {
        // console.log("onPanResponderStart:" + isMulti);

      },
      onPanResponderMove: (evt) => {
        let isMulti = evt.nativeEvent.changedTouches.length > 1;

        // console.log("onPanResponderMove " + isMulti);
        if (isMulti) {
          let minX = 0;
          let maxX = 0;
          if (evt.nativeEvent.changedTouches[0].locationX > evt.nativeEvent.changedTouches[1].locationX) {
            minX = evt.nativeEvent.changedTouches[1].pageX;
            maxX = evt.nativeEvent.changedTouches[0].pageX;
          } else {
            minX = evt.nativeEvent.changedTouches[0].pageX;
            maxX = evt.nativeEvent.changedTouches[1].pageX;
          }

          let minY = 0;
          let maxY = 0;
          if (evt.nativeEvent.changedTouches[0].locationY > evt.nativeEvent.changedTouches[1].locationY) {
            minY = evt.nativeEvent.changedTouches[1].pageY;
            maxY = evt.nativeEvent.changedTouches[0].pageY;
          } else {
            minY = evt.nativeEvent.changedTouches[0].pageY;
            maxY = evt.nativeEvent.changedTouches[1].pageY;
          }
          const widthDistance = maxX - minX;
          const heightDistance = maxY - minY;
          const diagonalDistance = Math.sqrt(widthDistance * widthDistance + heightDistance * heightDistance);
          this.zoomCurrentDistance = Number.parseInt(diagonalDistance);
          if (this.zoomLastDistance == 0) {
            this.zoomLastDistance = this.zoomCurrentDistance;
            this.touchDownDistant = this.zoomCurrentDistance;
            // console.log("双指刚放下");

          } else {
            let diff = this.zoomCurrentDistance - this.zoomLastDistance;
            let diffScale = Number(((diff / 100)).toFixed(2));
            // console.log("双指:缩放 zoomCurrentDistance:" + this.zoomCurrentDistance + " zoomLastDistance:" + this.zoomLastDistance + " touchDownDistance " + this.touchDownDistant + " diff:" + diff + " diffScale" + diffScale);
            this.onScaleChanged(diffScale);
            this.zoomLastDistance = this.zoomCurrentDistance;
          }
        }

      },

      onPanResponderRelease: () => {
        this.setState({
          enableScroll: true
        });
        // console.log("onPanResponderRelease:" + isMulti);
        // 如果是单个手指、距离上次按住大于预设秒、滑动距离小于预设值, 则可能是单击（如果后续双击间隔内没有开始手势）
        // const stayTime = new Date().getTime() - this.lastTouchStartTime!

        // if (evt.nativeEvent.changedTouches.length === 1) {

        // } else {
        // 多手势结束，或者滑动结束
        this.touchDownDistant = 0;
        this.zoomCurrentDistance = 0;
        this.zoomLastDistance = 0;
        // todo 多手指滑动后 应该再自己滚动到centerValue 
        // }
        // this.onScrollEnd();//通知刷新
        if (this.tmpCenterValue > 0) {
          this.scrollToTimestampWithNotify(this.tmpCenterValue, true);
          this.tmpCenterValue = 0;
        } else {
          this.tmpCenterValue = 0;
        }
      },

      onPanResponderTerminate: () => {
        this.setState({
          enableScroll: true
        });
        // 被抢占了吧  这里要清空


        // console.log("onPanResponderTerminate " + isMulti);

        this.touchDownDistant = 0;
        this.zoomCurrentDistance = 0;
        this.zoomLastDistance = 0;
        // todo 多手指滑动后 应该再自己滚动到centerValue 
        // }
        // this.onScrollEnd();//通知刷新
        if (this.tmpCenterValue > 0) {
          this.scrollToTimestampWithNotify(this.tmpCenterValue, true);
          this.tmpCenterValue = 0;
        } else {
          this.tmpCenterValue = 0;
        }
      },

      onStartShouldSetPanResponderCapture: (evt) => {

        // console.log("onStartShouldSetPanResponderCapture:" + isMulti);
        if (evt.nativeEvent.changedTouches.length > 1) { // 多指才拦截
          return true;
        } else {
          return false;
        }
      },

      onMoveShouldSetPanResponderCapture: (evt) => {

        // console.log("onMoveShouldSetPanResponderCapture " + isMulti);
        if (evt.nativeEvent.changedTouches.length > 1) { // 多指才拦截
          return true;
        } else {
          return false;
        }
      }

    });
    this.dayListRef = null;
    this.viewWidth = 0;
  }

  componentDidMount() {
    // this.initData();
  }

  isTimeLinePressed() {
    return (this.isRightPressed || this.isLeftPressed || this.scrollState != SCROLLSTATE.IDLE);
  }

  bindDataToTimeLineView(timeItemDays) {
    [...this.timestampJson] = timeItemDays;// 是否需要复制一遍呢？
    this.initData();
  }

  initData() {

    // this.timestampJson = require("../../resources/json/json.json")//加载数据
    // 对于丢给renderList的代码，只需要处理天的数据即可。
    // first getFirstItem's startTime
    if (!(this.timestampJson instanceof Array)) {
      return;
    }
    let length = this.timestampJson.length;
    if (length <= 0) {
      return;
    }
    let minTimestamp = this.timestampJson[0].startTime;
    let maxTimestamp = this.timestampJson[length - 1].startTime;

    this.dateTime.setTime(minTimestamp);
    this.dateTime.setHours(0, 0, 0, 0);// 回到当前天的0时刻。
    let beginDayTime = this.dateTime.getTime();// 开始的天的beginTime
    beginDayTime = beginDayTime - oneDaysMillis;// 回到1天前，因为缩到最小时 半边有可能显示不下
    this.dateBeginDayTime = beginDayTime;
    this.dateTime.setTime(maxTimestamp);
    this.dateTime.setHours(0, 0, 0, 0);//
    let endDayTime = this.dateTime.getTime();
    endDayTime = endDayTime + oneDaysMillis * 2 - 1;// 回到一天后的结束时间，缩到最小的时候，有可能有半边显示不了
    this.timeItemList = [];
    let dayItems = [];
    for (let dayItem of this.timestampJson) { // 从数据中得到所有的timeItem
      let day = { startTime: dayItem.startTime, isSelected: false, tag: dayItem.tag };
      dayItems.push(day);
      for (let hourItem of dayItem.timeItemHourList) {
        this.timeItemList.push(...hourItem.timeItemList);
      }
    }

    this.dayArray = dayItems;

    this.timeItemList.sort((a, b) => { return a.startTime - b.startTime; });// 排序一下
    // console.log('所有回看数据---12--',this.timeItemList);

    let hoursArray = [];
    for (let curHourTimestamp = beginDayTime; curHourTimestamp <= endDayTime; curHourTimestamp = curHourTimestamp + oneHourMillis) {
      let hourData = {};
      hourData["startTime"] = curHourTimestamp;
      this.dateTime.setTime(curHourTimestamp);
      hourData["year"] = this.dateTime.getFullYear();
      hourData["month"] = this.dateTime.getMonth() + 1;
      hourData["day"] = this.dateTime.getDate();
      hourData["hour"] = this.dateTime.getHours();
      let tag = `${ hourData["year"] }-${ hourData["month"] }-${ hourData["day"] }`;
      let dayList = this.timestampJson.filter((timestamp) => timestamp.tag === tag);// 找到这天的数据
      // console.log('当前天数据---',dayList.length);
      // 某一天时间之内的数据
      if (dayList.length > 0) {
        let hourList = dayList[0].timeItemHourList;
        if (hourList != null && hourList.length > 0) {
          let filteredHourList = hourList.filter((hour) => hour.hour === hourData["hour"]);
          if (filteredHourList.length > 0) {
            hourData["rangeList"] = filteredHourList[0].timeItemList;
          } else {
            hourData["rangeList"] = [];
          }
        } else {
          hourData["rangeList"] = [];
        }
      } else {
        hourData["rangeList"] = [];
      }
      let fiveMinuteArray = [];
      let previousHasVideo = false;
      for (let timestamp = curHourTimestamp; timestamp < curHourTimestamp + oneHourMillis; timestamp = timestamp + fiveMinutesMillis) {
        let fiveMinuteObj = {};
        let hasVideoArray = [];
        for (let oneMinute = timestamp; oneMinute < timestamp + fiveMinutesMillis; oneMinute = oneMinute + oneMunitesMillis) {
          let oneMinuteArray = hourData["rangeList"].filter((item) => item.startTime >= oneMinute && item.startTime < oneMinute + oneMunitesMillis);
          if (previousHasVideo) { // 如果前面是跨分钟的
            previousHasVideo = false;
            if (oneMinuteArray.length > 0 && oneMinuteArray[0].startTime > oneMinute) { // 如果是横跨分钟的
              // 这种情况跳过，放行给后面的处理
            } else {
              hasVideoArray.push({ hasVideo: true, timeItem: oneMinuteArray[0] });
              previousHasVideo = false;
              continue;//
            }
          }
          if (oneMinuteArray.length <= 0) { // 这个分钟内没有视频
            hasVideoArray.push({ hasVideo: false, timeItem: null });
          } else if (oneMinuteArray[0].startTime == oneMinute) { // 视频的开始时间刚好是 00秒 分钟的开始处
            hasVideoArray.push({ hasVideo: true, timeItem: oneMinuteArray[0] });
          } else if (oneMinuteArray[0].startTime > oneMinute) { // 视频的开始时间刚好是 30秒 分钟的开始处后面 相邻两分钟都标记为有视频
            hasVideoArray.push({ hasVideo: true, timeItem: oneMinuteArray[0] });
            previousHasVideo = true;
          }
        }
        fiveMinuteObj["hasVideo"] = hasVideoArray;
        this.dateTime.setTime(timestamp);
        let minute = this.dateTime.getMinutes();
        fiveMinuteObj["minute"] = minute;
        fiveMinuteArray.push(fiveMinuteObj);
      }

      hourData["minutesArray"] = fiveMinuteArray;
      let hourHasVideoArray = [];
      // 收集一小时内的hasVideo
      for (let i = 0; i < hourData["minutesArray"].length; i++) {
        let minute = hourData["minutesArray"][i];
        let minuteHasVideoArray = minute["hasVideo"];
        hourHasVideoArray.push(...minuteHasVideoArray);
      }

      let mergedArray = [];
      let lastStatus = hourHasVideoArray[0].hasVideo;
      let continuedCount = 1;
      let hasDiff = false; // 标记是否有不同。
      for (let i = 1; i < hourHasVideoArray.length; i++) {
        if (lastStatus != hourHasVideoArray[i].hasVideo) {
          hasDiff = true;// 标记有不同了，入库。
          mergedArray.push({ flexGrow: continuedCount, hasVideo: lastStatus });
          lastStatus = hourHasVideoArray[i].hasVideo;
          continuedCount = 1;
        } else {
          continuedCount++;
          hasDiff = false;
        }
      }
      if (!hasDiff) { // 最后一次 跟之前一样 要入库。
        mergedArray.push({ flexGrow: continuedCount, hasVideo: lastStatus });
      }

      hourData["mergedArray"] = mergedArray;
      hoursArray.push(hourData);
    }

    let hoursArray1 = [
      { "day": 18, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752768000000, "year": 2025 }, { "day": 18, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752771600000, "year": 2025 }, { "day": 18, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752775200000, "year": 2025 }, { "day": 18, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752778800000, "year": 2025 }, { "day": 18, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752782400000, "year": 2025 }, { "day": 18, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752786000000, "year": 2025 }, { "day": 18, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752789600000, "year": 2025 }, { "day": 18, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752793200000, "year": 2025 }, { "day": 18, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752796800000, "year": 2025 }, { "day": 18, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752800400000, "year": 2025 }, { "day": 18, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752804000000, "year": 2025 }, { "day": 18, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752807600000, "year": 2025 }, { "day": 18, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752811200000, "year": 2025 }, { "day": 18, "hour": 13, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752814800000, "year": 2025 }, { "day": 18, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752818400000, "year": 2025 }, { "day": 18, "hour": 15, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752822000000, "year": 2025 }, { "day": 18, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752825600000, "year": 2025 }, { "day": 18, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752829200000, "year": 2025 }, { "day": 18, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752832800000, "year": 2025 }, { "day": 18, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752836400000, "year": 2025 }, { "day": 18, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752840000000, "year": 2025 }, { "day": 18, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752843600000, "year": 2025 }, { "day": 18, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752847200000, "year": 2025 }, { "day": 18, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752850800000, "year": 2025 }, 
      { "day": 19, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752854400000, "year": 2025 }, { "day": 19, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752858000000, "year": 2025 }, { "day": 19, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752861600000, "year": 2025 }, { "day": 19, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752865200000, "year": 2025 }, { "day": 19, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752868800000, "year": 2025 }, { "day": 19, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752872400000, "year": 2025 }, { "day": 19, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752876000000, "year": 2025 }, { "day": 19, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752879600000, "year": 2025 }, { "day": 19, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752883200000, "year": 2025 }, { "day": 19, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752886800000, "year": 2025 }, { "day": 19, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752890400000, "year": 2025 }, { "day": 19, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752894000000, "year": 2025 }, { "day": 19, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752897600000, "year": 2025 }, { "day": 19, "hour": 13, "mergedArray": [["1"], ["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752901200000, "year": 2025 }, { "day": 19, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752904800000, "year": 2025 }, { "day": 19, "hour": 15, "mergedArray": [["1"], ["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "startTime": 1752908400000, "year": 2025 }, { "day": 19, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752912000000, "year": 2025 }, { "day": 19, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752915600000, "year": 2025 }, { "day": 19, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752919200000, "year": 2025 }, { "day": 19, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752922800000, "year": 2025 }, { "day": 19, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752926400000, "year": 2025 }, { "day": 19, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752930000000, "year": 2025 }, { "day": 19, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752933600000, "year": 2025 }, { "day": 19, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752937200000, "year": 2025 },
      { "day": 20, "hour": 0, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752940800000, "year": 2025 }, { "day": 20, "hour": 1, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752944400000, "year": 2025 }, { "day": 20, "hour": 2, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752948000000, "year": 2025 }, { "day": 20, "hour": 3, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752951600000, "year": 2025 }, { "day": 20, "hour": 4, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752955200000, "year": 2025 }, { "day": 20, "hour": 5, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752958800000, "year": 2025 }, { "day": 20, "hour": 6, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752962400000, "year": 2025 }, { "day": 20, "hour": 7, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752966000000, "year": 2025 }, { "day": 20, "hour": 8, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752969600000, "year": 2025 }, { "day": 20, "hour": 9, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752973200000, "year": 2025 }, { "day": 20, "hour": 10, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752976800000, "year": 2025 }, { "day": 20, "hour": 11, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752980400000, "year": 2025 }, { "day": 20, "hour": 12, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752984000000, "year": 2025 }, { "day": 20, "hour": 13, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752987600000, "year": 2025 }, { "day": 20, "hour": 14, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752991200000, "year": 2025 }, { "day": 20, "hour": 15, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752994800000, "year": 2025 }, { "day": 20, "hour": 16, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1752998400000, "year": 2025 }, { "day": 20, "hour": 17, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753002000000, "year": 2025 }, { "day": 20, "hour": 18, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753005600000, "year": 2025 }, { "day": 20, "hour": 19, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753009200000, "year": 2025 }, { "day": 20, "hour": 20, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753012800000, "year": 2025 }, { "day": 20, "hour": 21, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753016400000, "year": 2025 }, { "day": 20, "hour": 22, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753020000000, "year": 2025 }, { "day": 20, "hour": 23, "mergedArray": [["1"]], "minutesArray": [["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"], ["1"]], "month": 7, "rangeList": [], "startTime": 1753023600000, "year": 2025 }
    ];
    this.setState({ dateArray: hoursArray1 });

  }

  getLastTimeitemStartTime() {
    if (this.timeItemList == null || this.timeItemList.length <= 0) {
      return;
    }
    // return this.timeItemList[this.timeItemList.length - 2];
    return this.timeItemList[this.timeItemList.length - 1];
  }

  onScaleChanged(diffScale) { // float  .2
    // refresh centerValue;
    // this.onScrollEnd();

    // console.log("缩放系数diff" + diffScale);
    let tmpScale = this.scaleFactor + diffScale;
    if (tmpScale > this.maxScale) {
      tmpScale = this.maxScale;
    } else if (tmpScale < this.minScale) {
      tmpScale = this.minScale;
    }
    this.scaleFactor = tmpScale;

    // console.log("on scale changed itemWidth:" + (Number.parseInt(itemWidth * tmpScale) * 12));

    animatedValue.setValue(Number.parseInt(itemWidth * tmpScale) * 12);

  }

  render() {

    // if (this.state.dayArray == null || this.state.dayArray.length == 0) {//没有数据  要返回空
    //   return null;
    // }
    let height = 54;
    this.dateTime.setTime(this.state.centerTimestamp);



    let containerStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: this.props.fullScreen ? 'rgba(0, 0, 0, 0.4)' : "white"
      // backgroundColor: "white"
    };

    let outterStyle = {
      position: "relative",
      width: "100%",
      height: 84
    };

    let CenterStyle = {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    };

    let CenterLineStyle = {
      width: 10,
      height: 54
    };

    let disableScroll = !this.state.enableScroll || this.props.isDisabled;

    return (
      <View>
              <FlatList
                // ref={(ref) => { this.flatList = ref; }}
                data={this.state.dateArray}
                renderItem={(item) => {
                  return this.renderHourItem(item);
                }}
                // style={{ height: "100%", flexGrow: 1 }}
                horizontal={true}
                // getItemLayout={this._onItemLayout}
                // onViewableItemsChanged={this.handleViewableItemsChanged}
                // viewabilityConfig={this.VIEWABILITY_CONFIG}
                // onScroll={this.scrollHandler}
                // scrollEnabled={!disableScroll}
                // keyExtractor={this.dayKeyExtractor}
                // onScrollEndDrag={(event) => {
                //   this.onScrollEndDragEvent(event);
                // }}
                // onScrollBeginDrag={(event) => {
                //   this.onScrollBeginDragEvent(event);
                // }}
                // onMomentumScrollEnd={(event) => { // 只有用户主动滑动才会调用到这里，代码里调用scrollToxxx 不会调用。
                //   this.onMomentumScrollEndEvent(event);
                // }}
                // showsHorizontalScrollIndicator={false}
                // initialNumToRender={100}
              />
      </View>
    );
  }

  renderDayItem({ item }) {
    let startTime = item.startTime;
    this.dateTime.setTime(startTime);
    let month = this.dateTime.getMonth() + 1;
    let day = this.dateTime.getDate();
    let str = `${ month > 9 ? month : `0${ month }` }/${ day > 9 ? day : `0${ day }` }`;
    return (
      <View style={item.isSelected ? styles.dayItemSelected : styles.dayItem}
      >
        <Text
          style={item.isSelected ? styles.dayItemTextSelected : styles.dayItemText}
          onPress={() => this.onPressDayItem(item)}
        >
          {str}
        </Text>
      </View>
    );
  }

  onPressDayItem(dayItem) {
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }
    let timestamp = dayItem.startTime;
    console.log('点击开始时间---', timestamp, dayItem);
    // 防止在两边的情况 做一下处理
    this.dateTime.setTime(timestamp);
    this.dateTime.setSeconds(0, 0);// 因为现在改成 秒数在中间也会覆盖到当前分钟的开始处
    this.scrollToTimestampWithNotify(this.dateTime.getTime(), true);
    this.refreshTopDateView(this.dateTime.getTime());
  }

  renderHourItem({ item }) {
    console.log("chy xxx item:", item)
    return (
      <View>
        <Text>{ item.day }</Text>
      </View>
    );
  }


  dayKeyExtractor = (item) => item.startTime.toString();

  getDayItemLayout = (item, index) => {
    return {
      length: 50,
      offset: 50 * index,
      index
    };
  }

  scrollHandler = (event) => {
    let scrollX = event.nativeEvent.contentOffset.x;
    console.log(`移动中：${ this.scrollState }`);
    if (this.scrollState == SCROLLSTATE.DRAGEND) { // 拖拽结束了 还在滚动
      console.log("拖拽结束换成自由滑动");
      clearTimeout(this.scrollEndTimeout);// 没有移动结束
      this.scrollState = SCROLLSTATE.FLING;
    }
    this.scrollX = scrollX;
    this.debounceHandler();
  }

  scrollEndHandler = () => {
    console.log("停止滑动了");
  }

  onScrollEndDragEvent() {
    console.log(`拖拽结束:${ this.scrollState }`);

    if (this.scrollState == SCROLLSTATE.SCROLLING) { // 之前开始滑动了
      this.scrollState = SCROLLSTATE.DRAGEND;
      console.log("拖拽结束了，状态改变为DragEnd");

      this.scrollEndTimeout = setTimeout(() => {
        console.log("end drag");
        this.onScrollIdle();
      }, 1200);
    }

  }

  onScrollBeginDragEvent() { //
    console.log(`开始滑动，取消之前的事件。${ this.scrollState }`);
    this.scrollState = SCROLLSTATE.SCROLLING;
    clearTimeout(this.scrollEndTimeout);
  }

  onMomentumScrollEndEvent() {
    console.log(`滚动动画结束${ this.scrollState }`);
    if (this.scrollState == SCROLLSTATE.FLING) {
      this.scrollState = SCROLLSTATE.FLINGEND;
      console.log("onMomentumScrollEnd, fling idle, just notify");
      this.scrollEndTimeout = setTimeout(() => {
        console.log("momentum end");
        this.onScrollIdle();
      }, 1200);
    }
  }

  onLeftPressed() {
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }
    this.isLeftPressed = false;
    clearTimeout(this.longLeftPressTimeout);
    this.longLeftPressTimeout = null;
    if (!this.isLeftLongPressed) {
      this.onMovePrev();
      return;
    } else {
      this.isLeftLongPressed = false;
      this.notifyTimestampChanged(this.state.centerTimestamp);
    }
  }

  onLeftPressIn() { // 同一触摸序列  只会被调用一次。
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }

    this.isLeftPressed = true;// 标记用户手指是否停在控件上
    this.isLeftLongPressed = false;
    clearTimeout(this.longLeftPressTimeout);
    this.longLeftPressTimeout = setTimeout(() => {
      console.log("on long press left");
      this.handleLongPressLeft();
    }, 1000);
  }

  handleLongPressLeft() {
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }
    this.isLeftLongPressed = true;
    this.onFastMovePrev();
    this.longLeftPressTimeout = setTimeout(() => {
      console.log("on long press left");

      this.handleLongPressLeft();
    }, 50);

  }

  onLeftPressOut() {
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }
    if (!this.isLeftLongPressed) { // 如果不是长按  要移除timeout  避免后续还在滑动
      clearTimeout(this.longLeftPressTimeout);
    }
    this.isLeftPressed = false;// 标记用户手指是否停在控件上
  }

  // touchableopcity组件调用顺序： onpressin onpressout onpress  如果是划出去的  onpress就不调用了
  onRightPressed() {
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }
    this.isRightPressed = false;
    clearTimeout(this.longRightPressTimeout);
    this.longRightPressTimeout = null;
    if (!this.isRightLongPressed) {
      this.onMoveNext();
      return;
    } else {
      this.isRightLongPressed = false;
      this.notifyTimestampChanged(this.state.centerTimestamp);
    }
  }

  onRightPressIn() {
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }
    console.log(`on rightPress in:${ new Date().getSeconds() } ${ new Date().getMilliseconds() }`);
    this.isRightPressed = true;
    this.isRightLongPressed = false;
    clearTimeout(this.longRightPressTimeout);
    this.longRightPressTimeout = setTimeout(() => {
      console.log("on long press right");
      this.handleLongPressRight();
    }, 1000);
  }

  onRightPressOut() {
    if (this.props.isDisabled) {
      Toast.show(LocalizedStrings["recording_block"]);
      return;
    }
    if (!this.isRightLongPressed) {
      clearTimeout(this.longRightPressTimeout);
    }
    this.isRightPressed = false;
  }

  handleLongPressRight() {
    // if (!this.isRightPressed) {//手指已经移开了view
    //   clearTimeout(this.longRightPressTimeout);
    //   return;
    // }

    this.isRightLongPressed = true;
    this.onFastMoveNext();
    console.log(`on repeat fast move end:${ new Date().getSeconds() } ${ new Date().getMilliseconds() }`);

    this.longRightPressTimeout = setTimeout(() => {
      console.log("on long press right");

      console.log(`on repeat fast move:${ new Date().getSeconds() } ${ new Date().getMilliseconds() }`);
      this.handleLongPressRight();
    }, 50);

  }

  onFastMoveNext() {
    if (this.timeItemList.length == 0) {
      return;
    }
    let moveTime = 30000;
    let selectTime = this.state.centerTimestamp + moveTime;
    if (selectTime > this.timeItemList[this.timeItemList.length - 1].endTime) {
      return;
    }
    if (selectTime >= this.timeItemList[this.timeItemList.length - 1].startTime) {
      this.scrollToTimestampWithNotify(selectTime, true);
      return;
    }
    for (let i = this.timeItemList.length - 2; i >= 0; i--) {
      let timeItem = this.timeItemList[i];
      this.dateTime.setTime(timeItem.startTime);
      this.dateTime.setSeconds(0, 0);
      if (selectTime > this.dateTime.getTime()) {
        if (selectTime < timeItem.endTime) {
          this.scrollToTimestamp(selectTime);// 滑动 但是不通知
        } else {
          this.scrollToTimestamp(this.timeItemList[i + 1].startTime);// 滑动但是不通知
        }
        break;
      }
    }

  }

  onFastMovePrev() {
    if (this.timeItemList.length == 0)
      return;
    let moveTime = 30000;
    let selectTime = this.state.centerTimestamp - moveTime;
    this.dateTime.setTime(this.timeItemList[0].startTime);
    this.dateTime.setSeconds(0, 0);
    if (selectTime < this.dateTime.getTime()) { // todo 切换到分钟的开始处
      return;
    }
    if (selectTime < this.timeItemList[0].endTime) {
      this.scrollToTimestamp(selectTime);
      return;
    }
    if (selectTime >= this.timeItemList[this.timeItemList.length - 1].startTime) { // 最后一个文件的时候走不到这里
      if (this.timeItemList.length <= 1) { // 只有一个了 就别跳了吧
        return;
      }
      this.scrollToTimestamp(this.timeItemList[this.timeItemList.length - 2].endTime - moveTime);
      return;
    }
    for (let i = 1, len = this.timeItemList.length; i < len; i++) {
      let timeItem = this.timeItemList[i];
      if (selectTime < timeItem.startTime) {
        if (selectTime < this.timeItemList[i - 1].endTime - moveTime) {
          this.scrollToTimestamp(selectTime);
        } else {
          this.scrollToTimestamp(this.timeItemList[i - 1].endTime - moveTime);
        }
        break;
      }
    }
  }

  onScrollIdle() {
    if (this.scrollState != SCROLLSTATE.FLINGEND && this.scrollState != SCROLLSTATE.DRAGEND) { // 滑动动画结束 或者滑动end
      return;// 说明又开始滑动了。
    }// 只有正常开始滑动 并且结束 才会回调到这里，如果是在1.2s内连续滑动 不调用到这里。
    this.scrollState = SCROLLSTATE.IDLE;

    let scrollX = this.scrollX;
    let smallItemWidth = animatedValue.__getValue();
    let screenWidth = this.viewWidth - 60;
    let totalLength = (scrollX + screenWidth / 2);
    let tmpIndex = Number((totalLength / smallItemWidth).toFixed(2));

    let tmp = this.dateBeginDayTime + Number.parseInt(((totalLength / smallItemWidth).toFixed(6)) * oneHourMillis);
    // refresh Top date listview
    this.setState((state) => {
      this.setState({ centerValue: tmpIndex, centerTimestamp: tmp });

    }, () => {
      this.notifyTimestampChanged(this.state.centerTimestamp);
    });


  }


  onScrollEnd() {

  }

  notifyTimestampChanged(timestamp) {
    this.refreshTopDateView(timestamp);

    if (this.props.onCenterValueChanged != null) { // 通知到外面去
      console.log("onScrollIdle notify outside");
      this.props.onCenterValueChanged(timestamp);
    }
  }

  // here to see what happened  should make a debugger
  refreshTopDateView(centerTimestamp) {
    this.dateTime.setTime(centerTimestamp);
    let year = this.dateTime.getFullYear();
    let month = this.dateTime.getMonth() + 1;
    let day = this.dateTime.getDate();
    let tag = `${ year }-${ month }-${ day }`;
    let selectedDayIndex = -1;
    // 添加一个参数比较两个日期是否是同一天，如果是，不执行滚动到选中日期动画
    let tempIndex = -1;
    for (let j = 0; j < this.dayArray.length; j++) {
      if (this.dayArray[j].isSelected) {
        tempIndex = j;
        break;
      }
    }
    for (let i = 0; i < this.dayArray.length; i++) {
      let day = this.dayArray[i];
      if (day.tag === tag) {
        this.dayArray[i].isSelected = true;
        selectedDayIndex = i;
      } else {
        this.dayArray[i].isSelected = false;
      }
    }
    // if (selectedDayIndex == originalSelectedDayIndex) { // 一样就返回回去。
    //   return;
    // }
    this.setState({ dayArray: this.dayArray });
    clearTimeout(this.scrollDayIndexTimeout);
    this.scrollDayIndexTimeout = setTimeout(() => {
      if (selectedDayIndex < 0) {
        return;
      }
      // 更新日期与原来日期相等，不执行下面的scrollToIndex
      if (tempIndex === selectedDayIndex) {
        console.log("相等的日期时间");
        return;
      }

      // 这里会出现滑动日期 IMI_IPC046_B02-35 滑动后会返回日期位置
      this.dayListRef.scrollToIndex({
        animated: true,
        index: selectedDayIndex
      });
    }, 500);

  }

  // 从外面下了指令跳转，外部会自己保存进度，没有必要通知。
  scrollToTimestamp(timestamp) {
    this.scrollToTimestampWithNotify(timestamp, false);
  }

  scrollToTimestampWithNotify(timestamp, notify) {
    this.shouldNotify = notify;
    let smallItemWidth = animatedValue.__getValue();// 当前每一小时的宽度
    let screenWidth = this.viewWidth - 60;// listview控件的宽度
    let diff = timestamp - this.dateBeginDayTime;
    let diffDistance = (diff / oneHourMillis) * smallItemWidth - screenWidth / 2;
    // this.flatList.scrollToOffset({ offset: diffDistance, animated: false });// 这里不会更新centervalue
    this.refreshTopDateView(timestamp);
    this.setState({ centerTimestamp: timestamp });

    if (this.shouldNotify) { // 不是外面调用scrollto的  是控件自己内部蹦过来的
      this.notifyTimestampChanged(timestamp);
    }
  }

  _onItemLayout = (data, index) => {
    return {
      length: (animatedValue.__getValue()),
      offset: (animatedValue.__getValue() * index),
      index
    };
  }

  // 列表滚动变化事件
  _onViewableItemsChanged = () => {
  }

  VIEWABILITY_CONFIG = {
    minimumViewTime: 300, // 滑动
    viewAreaCoveragePercentThreshold: 0,
    waitForInteraction: false
  }

  componentWillUnmount() {
    this.debounceHandler.cancel();
    clearTimeout(this.scrollDayIndexTimeout);
    clearTimeout(this.scrollEndTimeout);
    clearTimeout(this.longRightPressTimeout);
    clearTimeout(this.longLeftPressTimeout);

  }

  onMoveNext() {
    if (this.timeItemList.length <= 0) {
      return;
    }
    let centerValue = this.state.centerTimestamp;
    if (centerValue >= this.timeItemList[this.timeItemList.length - 1].endTime) {
      return;
    }
    let selectTime = centerValue + 30000;
    // if (selectTime < this.timeItemList[0].startTime) {
    //   //因为现在是对跨分钟的进行左右扩展，切到最边上一个时，+30s也可能依旧比第一个小。。。
    //   selectTime = selectTime + 30000;
    // }
    if (selectTime > this.timeItemList[this.timeItemList.length - 1].endTime) {
      this.onEndReach();
      return;// 不让继续往前跑了
    }
    if (selectTime > this.timeItemList[this.timeItemList.length - 1].startTime) {
      this.onEndReach();
      return;
    }
    let timeItem = this.getNeedItem(selectTime, true);
    if (timeItem != null) {
      this.dateTime.setTime(timeItem.startTime);
      this.dateTime.setSeconds(0, 0);// 因为现在改成 秒数在中间也会覆盖到当前分钟的开始处
      this.scrollToTimestampWithNotify(this.dateTime.getTime(), true);

      // console.log("dengying onMoveNext scrollToTimestampWithNotify");
      return;
    }
    this.onEndReach();
  }

  onMovePrev() {
    if (this.timeItemList.length <= 0) {
      return;
    }
    let currentValue = this.state.centerTimestamp;
    let selectTime = currentValue - 30000;
    this.dateTime.setTime(this.timeItemList[0].startTime);
    this.dateTime.setSeconds(0, 0);// 因为现在改成 秒数在中间也会覆盖到当前分钟的开始处
    let time = this.dateTime.getTime();

    if (selectTime < time) {
      return;// 不让继续往前跑了
    }
    if (selectTime < this.timeItemList[0].endTime) {
      this.dateTime.setTime(this.timeItemList[0].startTime);
      this.dateTime.setSeconds(0, 0);// 因为现在改成 秒数在中间也会覆盖到当前分钟的开始处
      this.scrollToTimestampWithNotify(this.dateTime.getTime(), true);
      return;
    }
    let timeItem = this.getNeedItem(selectTime, false);
    if (timeItem != null) {
      this.dateTime.setTime(timeItem.startTime);
      this.dateTime.setSeconds(0, 0);// 因为现在改成 秒数在中间也会覆盖到当前分钟的开始处
      this.scrollToTimestampWithNotify(this.dateTime.getTime(), true);
      return;
    }
    this.dateTime.setTime(this.timeItemList[0].startTime);
    this.dateTime.setSeconds(0, 0);// 因为现在改成 秒数在中间也会覆盖到当前分钟的开始处
    this.scrollToTimestampWithNotify(this.dateTime.getTime(), true);

  }

  getNeedItem(time, next) {

    // console.log("dengying getNeedItem time="+JSON.stringify(time));

    let lastTime = null;
    if (next) {
      let recordItem = null;
      let lastItem;
      let skip = false;
      for (let i = 0, j = this.timeItemList.length - 1; i <= j; i++) {
        let timeItem = this.timeItemList[i];
        if (!skip) {
          recordItem = timeItem;
        }
        if (i < j) {
          lastItem = this.timeItemList[i + 1];

          // let startTime = ImiUtil.dateFormat(new Date(timeItem.startTime), "yyyy-MM-dd HH:mm:ss");
          // let endTime = ImiUtil.dateFormat(new Date(timeItem.endTime), "yyyy-MM-dd HH:mm:ss");
          // let laststartTime = ImiUtil.dateFormat(new Date(lastItem.startTime), "yyyy-MM-dd HH:mm:ss");
          // let lastendTime = ImiUtil.dateFormat(new Date(lastItem.endTime), "yyyy-MM-dd HH:mm:ss");

          // console.log("dengying timeItem.startTime="+startTime+",timeItem.endTime="+endTime+",laststartTime="+laststartTime+",lastendTime="+lastendTime+",lastItem="+JSON.stringify(lastItem)+",timeItem="+JSON.stringify(timeItem))

          if ((lastItem.startTime - timeItem.endTime) <= 5001) {
            skip = true;
            continue;
          }
        }
        if (i == j - 1 && skip) {
          break;
        }
        skip = false;
        // 因为这里对跨分钟的做了左右拓展，这里就要把startTime的seconds和millis置零
        this.dateTime.setTime(recordItem.startTime);
        this.dateTime.setSeconds(0, 0);
        if (this.dateTime.getTime() >= time) {
          lastTime = recordItem;
          break;
        }
      }

    } else {
      for (let i = this.timeItemList.length - 1, j = 0; i >= j; i--) {
        let timeItem = this.timeItemList[i];
        if (i > 0) {
          let lastItem = this.timeItemList[i - 1];
          if ((timeItem.startTime - lastItem.endTime) <= 5001) {
            continue;
          }
        }
        this.dateTime.setTime(timeItem.startTime);
        this.dateTime.setSeconds(0, 0);

        if (this.dateTime.getTime() <= time) {
          lastTime = timeItem;
          break;
        }

      }
    }
    return lastTime;
  }

  onEndReach() {
    //
    this.scrollToTimestampWithNotify(this.timeItemList[this.timeItemList.length - 1].endTime, true);
  }

}

class MyListItem extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let item = this.props.dataItem;
    let dateStr = null;
    let { month, day, hour, minutesArray } = item;
    if (hour == 0) { // 需要添加日期
      dateStr = `${ month > 10 ? month : `0${ month }` }/${ day > 10 ? day : `0${ day }` }`;
    }
    let hourStr = hour > 9 ? `${ hour }` : `0${ hour }`;

    return (
      <Animated.View
        style={{
          backgroundColor: 'transparent', // https://github.com/facebook/react-native/issues/22251 不加这行代码  onbegindrag 和onendDrag偶尔不会被调用到。
          position: "relative",
          height: "100%",
          width: animatedValue
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
            {`${ hourStr }:00`}
          </Text>

          <Text
            style={styles.hourIndicatorText}
          >
            {`${ hourStr }:30`}
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
    width: Host.isPad ? 0.85 : 0.5,
    height: 48,
    transform: [{ translateY: 3 }],
    backgroundColor: "#a6b0c3"
  },

  shortLineDivider: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Host.isPad ? 0.85 : 0.5,
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

