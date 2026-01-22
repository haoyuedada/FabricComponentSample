__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault")(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/classCallCheck"));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault")(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/createClass"));
  var _possibleConstructorReturn2 = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault")(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/possibleConstructorReturn"));
  var _getPrototypeOf2 = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault")(_$$_REQUIRE(_dependencyMap[4], "@babel/runtime/helpers/getPrototypeOf"));
  var _inherits2 = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault")(_$$_REQUIRE(_dependencyMap[5], "@babel/runtime/helpers/inherits"));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7], "react-native");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/MI/FabricComponentSample/ReactProject/tests/mijia/demo.js";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    screenHeight = _Dimensions$get.height;

  // 常量定义
  var EXPANDED_HEIGHT = 500;
  var COLLAPSED_HEIGHT = 100;
  var BOTTOM_OFFSET = 0;
  var DraggablePanel = /*#__PURE__*/function (_Component) {
    function DraggablePanel(props) {
      var _this;
      (0, _classCallCheck2.default)(this, DraggablePanel);
      _this = _callSuper(this, DraggablePanel, [props]);

      // 状态管理（替代 useState）
      _this.state = {
        isExpanded: false
      };

      // 动画值和引用（替代 useRef）
      _this.translateY = new _reactNative.Animated.Value(0);
      _this.startY = 0;

      // 初始化手势响应器
      _this.panResponder = _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
          return true;
        },
        onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture() {
          return true;
        },
        onPanResponderGrant: _this.handlePanGrant.bind(_this),
        onPanResponderMove: _this.handlePanMove.bind(_this),
        onPanResponderRelease: _this.handlePanRelease.bind(_this)
      });
      return _this;
    }

    // 组件挂载时初始化（替代 useEffect）
    (0, _inherits2.default)(DraggablePanel, _Component);
    return (0, _createClass2.default)(DraggablePanel, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var initialPosition = EXPANDED_HEIGHT - COLLAPSED_HEIGHT;
        this.translateY.setValue(initialPosition);
        this.setState({
          isExpanded: false
        });
      }

      // 开始拖动
    }, {
      key: "handlePanGrant",
      value: function handlePanGrant() {
        this.startY = this.translateY._value;
      }

      // 拖动过程
    }, {
      key: "handlePanMove",
      value: function handlePanMove(e, gesture) {
        var newY = this.startY + gesture.dy;
        // 限制拖动范围
        if (newY >= 0 && newY <= EXPANDED_HEIGHT - COLLAPSED_HEIGHT) {
          this.translateY.setValue(newY);
        }
      }

      // 结束拖动
    }, {
      key: "handlePanRelease",
      value: function handlePanRelease(e, gesture) {
        var _this2 = this;
        var finalY = this.startY + gesture.dy;
        var midPoint = (EXPANDED_HEIGHT - COLLAPSED_HEIGHT) / 2;
        if (finalY < midPoint) {
          // 展开动画
          _reactNative.Animated.timing(this.translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
          }).start(function () {
            _this2.setState({
              isExpanded: true
            });
          });
        } else {
          // 收起动画
          _reactNative.Animated.timing(this.translateY, {
            toValue: EXPANDED_HEIGHT - COLLAPSED_HEIGHT,
            duration: 300,
            useNativeDriver: false
          }).start(function () {
            _this2.setState({
              isExpanded: false
            });
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        // 计算面板位置插值
        var panelTranslate = this.translateY.interpolate({
          inputRange: [0, EXPANDED_HEIGHT - COLLAPSED_HEIGHT],
          outputRange: [0, EXPANDED_HEIGHT - COLLAPSED_HEIGHT]
        });
        var isExpanded = this.state.isExpanded;
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsx)(_reactNative.View, {
          style: styles.container,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsxs)(_reactNative.ScrollView, {
            style: styles.scrollView
            // scrollEnabled={false}
            ,
            contentContainerStyle: styles.scrollContent,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsxs)(_reactNative.View, {
              style: styles.backgroundContent,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsx)(_reactNative.Text, {
                style: styles.backgroundText,
                children: "scroll\u9875\u9762\u80CC\u666F\u5185\u5BB9"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsx)(_reactNative.Text, {
                style: styles.backgroundText,
                children: "\u5411\u4E0A\u62D6\u52A8\u5E95\u90E8\u9762\u677F\u5C55\u5F00"
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsxs)(_reactNative.Animated.View, Object.assign({}, this.panResponder.panHandlers, {
              pointerEvents: "box-none",
              style: [styles.draggablePanel, {
                transform: [{
                  translateY: panelTranslate
                }],
                height: EXPANDED_HEIGHT,
                bottom: BOTTOM_OFFSET
              }],
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsx)(_reactNative.View, {
                style: styles.dragHandle,
                onPress: function onPress() {
                  console.log('拖动把手触发了子元素点击事件');
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsxs)(_reactNative.View, {
                style: styles.panelContent,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsx)(_reactNative.Text, {
                  style: styles.panelTitle,
                  onPress: function onPress() {
                    console.log('面板内容触发了子元素点击事件');
                  },
                  children: isExpanded ? '已展开 - 向下拖动收起' : '已收起 - 向上拖动展开'
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsxs)(_reactNative.Text, {
                  style: styles.panelInfo,
                  children: ["\u9762\u677F\u9AD8\u5EA6: ", isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT, "px"]
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsx)(_reactNative.Button, {
                  title: "\u70B9\u51FB"
                }), Array.from({
                  length: 15
                }).map(function (_, index) {
                  return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsx)(_reactNative.View, {
                    style: styles.item,
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime").jsxs)(_reactNative.Text, {
                      style: styles.itemText,
                      children: ["\u5217\u8868\u9879 ", index + 1]
                    })
                  }, index);
                })]
              })]
            }))]
          })
        });
      }
    }]);
  }(_react.Component); // 样式定义
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0'
    },
    backgroundContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    backgroundText: {
      fontSize: 18,
      color: '#666',
      marginVertical: 10
    },
    scrollView: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%'
    },
    scrollContent: {
      flexGrow: 1,
      height: '100%',
      backgroundColor: "#ddf"
    },
    draggablePanel: {
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8
    },
    dragHandle: {
      width: 40,
      height: 5,
      backgroundColor: '#ddd',
      borderRadius: 3,
      alignSelf: 'center',
      marginVertical: 10
    },
    panelContent: {
      flex: 1,
      padding: 20,
      paddingTop: 0
    },
    panelTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 20,
      marginBottom: 20,
      color: '#333',
      textAlign: 'center'
    },
    panelInfo: {
      fontSize: 16,
      color: '#666',
      marginBottom: 20,
      textAlign: 'center'
    },
    item: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    },
    itemText: {
      fontSize: 16,
      color: '#333'
    }
  });
  var _default = exports.default = DraggablePanel;
},-2,[7,10,12,18,20,21,2,5,94],"tests/mijia/demo.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _reactNative = _$$_REQUIRE(_dependencyMap[0], "react-native");
  var _demo = _$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/interopRequireDefault")(_$$_REQUIRE(_dependencyMap[2], "./tests/mijia/demo.js"));
  /**
   * Copyright (c) 2024 Huawei Technologies Co., Ltd.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE-MIT file in the root directory of this source tree.
   *
   * @format
   */
  // initialProps = {};

  // import App from './testTurboModule/test';
  // import Utils from './tests/Utils';

  // import RCTMessage from './tests/RCTMessage';
  // import FastImage from './tests/FastImage';
  // import App from './App'
  // import Modal from './tests/Modal'
  // import ScrollView from './tests/ScrollView'
  // import QDScrollView from './tests/QDScrollView'
  // import RCT from './tests/RCT'
  // import FontSlice from './tests/FontSlice'
  // import App from './tests/Image'
  // import App from './tests/Animatedtwo'
  // import DatePicker from './src/DatePicker'
  // import App from './App'
  // import Shot from './src/Shot'
  // import RefreshControl from './src/RefreshControl'
  // import SVGTest from './tests/SVG/SVGTest'
  // import AlarmVideoUI from './tests/AlarmVideoUI'
  // import VictoryTest from './tests/Victory'
  // import App from './tests/DateTest'
  // require("./tests/requireTest.js")
  // import PromiseTest from './tests/Promise'
  // import MeasureTest from './src/Measure'
  // import MeasureTest from './src/Measure1'
  // import LottieTest from './tests/LottieTabIcon'
  // import PageViewTest from './tests/PageView'
  // import ModalTest from './tests/ModalTest'
  // import ModalTestClass from './tests/ModalTestClass'
  // import TextInputTest from './tests/TextInputTest'
  // import TextInputTest2 from './tests/TextInputTest2'
  // import Demisions from './tests/Demisions'
  // import SelectBoxApp from './src/SelectBoxApp'
  // import Statetest from './src/Statetest'
  // import CMRecipeDetail from './src/CMRecipeDetail'
  // import SectionList from './src/SectionList'
  // import UseTransitionTest from './src/useTransitionTest'
  // import App from './tests/ImageTest'
  // import OnTextInput from './src/onTextInput'
  // import ViewMore from './tests/ViewMore'
  // import App from './tests/mixiding/StorageUI'
  // import SectionList from './tests/SectionList'
  // import StorageUI from './tests/0710/StorageUI'
  // import DefaultTest from './tests/defaultTest'
  // import EvalTest from './tests/EvalTest'
  // import RefTest from './tests/RefTest'
  // import VideoTest from './tests/VideoTest'
  // import DisplayTest from './src/DisplayTest'
  // import MainPage from './tests/MainPage'
  // import SVGTest1 from './tests/SVG/SVGTest1'
  // import SvgUriTest from './tests/SVG/SvgUriTest'
  // import DeviceEventEmitter from './tests/DeviceEventEmitter'
  // import App from './tests/SvgTest'
  // import SvgTest1 from './tests/SVG1/index'
  // import UIManager from './tests/UIManager/UIManager'
  // import PetEdit from './tests/PetEdit'
  // import FlatList from './tests/FlatList'
  // import Toggle from './src/ViewStyle/Toggle.tsx'
  // import ViewTest from './src/ViewStyle/ViewTest'
  // import SliderTest from './src/ViewStyle/SliderTest'
  // import ViewTest1 from './src/ViewStyle/ViewTest1'
  // import App from './tests/TextTest.tsx'
  // AppRegistry.registerComponent("miot.plugin.spec", () => AlarmVideoUI);
  // import AlignItems from './tests/AlignItems'
  // import FlistTest from './tests/projects_com.chuangmi.camera_src_ui_FlatList'
  // import ScaleableTimelineView from './tests/ScaleableTimelineView-2'
  // import App from './testTurboModule/TurboModuleTest'
  // import Root from './tests/Root/index.js'
  // import Text1 from './tests/Text1.tsx'
  // import App from './tests/Hierarchy1/Hierarchy2/index.js';
  // import FetchTest from './tests/FetchTest.tsx';
  // import VideoTest2 from './tests/imageMP4'
  // import WebviewTest from './tests/WebviewTest'
  // import App from './tests/styleDemo'
  // import App from './tests/samplePage'
  // import App from './tests/SafeAreaTest'
  // import SafeArea from './tests/SafeArea'
  // import App from './tests/ImageBackground/ImageBackground1.tsx';
  // import App from './tests/exportTest/App.tsx';
  // import App from './testTurboModule/RunJsBundleTurboModuleParse.tsx';
  // import App from './tests/ViewShotDemo.tsx';
  // import App from './tests/mijia/timeLine/App.tsx';
  // import App from './tests/requireTest/index.js';
  // import App from './tests/FlatListDemo1.js';
  // import App from './tests/RefTest.tsx';
  // import App from './tests/orientation.tsx';
  // import App from './tests/mijia/oriatation/App.tsx';
  // import App from './tests/UIManager/UIManager1.tsx';
  // import App from './FabricComponent/SelectBox.tsx';
  // import App from './src/ImageBackground.tsx';
  // import App from "./src/CMChartWave.js";
  // import App from "./tests/Image2mp4";
  // import App from './testTurboModule/RunJsBundleTurboModuleOptimize.tsx';
  // import App from "./tests/mijia/setTitle";
  // import App from "./tests/AnimatedDemo.tsx";
  // import App from "./tests/yuhui/setState.tsx";
  // import App from "./tests/mijia/noClick/App.tsx";
  // import App from "./tests/mijia/noClickTrue/App.tsx";
  // import App from "./tests/FindIndex.tsx";
  // import "./tests/mijia/router/index.js";
  // import App from './testTurboModule/RunJsBundleTurboModuleBuautifyExecutor.tsx';
  // import App from './testTurboModule/RunJsBundleTurboModuleAssemblyWithMapBorderMiParam.tsx';
  // import App from './tests/TextBackground.tsx';
  // import App from './tests/PointEvent/PointEvent';
  // import App from './tests/PointEvent/PointEvent1.tsx';
  // import App from './tests/mijia/zIndex.tsx';
  // import App from './tests/mijia/SdCardVideoListAndPlayerPage2980.js';
  // import App from './tests/Appstate.tsx';
  // import App from './tests/canOpenUrl.jsx';
  // import App from './tests/mijia/switchTest.js';

  _reactNative.AppRegistry.registerComponent("app_name", function () {
    return _demo.default;
  });
  // import { transform } from "./testTurboModule/buautify_executor.js"
},-1,[5,7,-2],"index.js");
__r(54);
__r(-1);