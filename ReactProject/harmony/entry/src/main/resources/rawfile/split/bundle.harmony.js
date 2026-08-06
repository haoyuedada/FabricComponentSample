__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PersonalPage = void 0;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/classCallCheck"));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/createClass"));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/possibleConstructorReturn"));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "@babel/runtime/helpers/getPrototypeOf"));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "@babel/runtime/helpers/inherits"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/tests/Vmall/Tab/activity-default/Personal.tsx";
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // BottomTabNavigatorWithComplexContent.js
  var Personal = /*#__PURE__*/function (_React$PureComponent) {
    function Personal(props) {
      var _props$navigation;
      var _this;
      (0, _classCallCheck2.default)(this, Personal);
      _this = _callSuper(this, Personal, [props]);
      // 生成我的页面复杂数据
      _this.generateProfileData = function () {
        return {
          userInfo: {
            name: '张三',
            level: 'VIP会员',
            avatar: 'https://via.placeholder.com/80x80/007AFF/FFFFFF?text=头像',
            points: 1250,
            balance: 2500.50
          },
          quickActions: [{
            id: 1,
            title: '我的订单',
            icon: '📦',
            count: 12
          }, {
            id: 2,
            title: '我的收藏',
            icon: '❤️',
            count: 24
          }, {
            id: 3,
            title: '收货地址',
            icon: '📍',
            count: 3
          }, {
            id: 4,
            title: '优惠券',
            icon: '💰',
            count: 5
          }, {
            id: 5,
            title: '积分商城',
            icon: '🏆',
            count: 0
          }, {
            id: 6,
            title: '设置',
            icon: '⚙️',
            count: 0
          }],
          services: [{
            id: 1,
            title: '客户服务',
            icon: '💬'
          }, {
            id: 2,
            title: '意见反馈',
            icon: '📝'
          }, {
            id: 3,
            title: '帮助中心',
            icon: '❓'
          }, {
            id: 4,
            title: '关于我们',
            icon: 'ℹ️'
          }],
          recentActivity: [{
            id: 1,
            action: '购买商品',
            time: '5分钟前',
            detail: 'iPhone 15 Pro'
          }, {
            id: 2,
            action: '收藏商品',
            time: '1小时前',
            detail: 'MacBook Air'
          }, {
            id: 3,
            action: '浏览页面',
            time: '2小时前',
            detail: '优惠活动'
          }, {
            id: 4,
            action: '查看订单',
            time: '1天前',
            detail: '订单号#123456'
          }, {
            id: 5,
            action: '购买商品',
            time: '5分钟前',
            detail: 'iPhone 15 Pro'
          }, {
            id: 6,
            action: '收藏商品',
            time: '1小时前',
            detail: 'MacBook Air'
          }, {
            id: 7,
            action: '浏览页面',
            time: '2小时前',
            detail: '优惠活动'
          }, {
            id: 8,
            action: '查看订单',
            time: '1天前',
            detail: '订单号#123456'
          }, {
            id: 9,
            action: '购买商品',
            time: '5分钟前',
            detail: 'iPhone 15 Pro'
          }, {
            id: 10,
            action: '收藏商品',
            time: '1小时前',
            detail: 'MacBook Air'
          }, {
            id: 11,
            action: '浏览页面',
            time: '2小时前',
            detail: '优惠活动'
          }, {
            id: 12,
            action: '查看订单',
            time: '1天前',
            detail: '订单号#123456'
          }]
        };
      };
      (_props$navigation = props.navigation) == null ? void 0 : _props$navigation.addListener('focus', function () {
        console.log('xchhh Personal focus', new Date().getTime());
      });
      _this.state = {
        activeTab: 0,
        // 模拟复杂的数据结构
        profileData: _this.generateProfileData()
      };
      return _this;
    }
    (0, _inherits2.default)(Personal, _React$PureComponent);
    return (0, _createClass2.default)(Personal, [{
      key: "render",
      value:
      // 渲染首页内容
      function render() {
        var _this2 = this;
        var _this$state$profileDa = this.state.profileData,
          userInfo = _this$state$profileDa.userInfo,
          quickActions = _this$state$profileDa.quickActions,
          services = _this$state$profileDa.services,
          recentActivity = _this$state$profileDa.recentActivity;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            flex: 1
          },
          children: Array.from({
            length: 2000
          }).map(function (_, index) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: {
                height: 30,
                backgroundColor: 'blue',
                marginBottom: 3
              }
            }, index);
          })
        });
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
          style: styles.contentContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.section,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.userInfoContainer,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                source: {
                  uri: userInfo.avatar
                },
                style: styles.userAvatar
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.userInfo,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.userName,
                  children: userInfo.name
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.userLevel,
                  children: userInfo.level
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.userStats,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.statItem,
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.statValue,
                      children: userInfo.points
                    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.statLabel,
                      children: "\u79EF\u5206"
                    })]
                  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.statItem,
                    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                      style: styles.statValue,
                      children: ["\xA5", userInfo.balance]
                    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.statLabel,
                      children: "\u4F59\u989D"
                    })]
                  })]
                })]
              })]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u5FEB\u6377\u64CD\u4F5C"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.quickActionsGrid,
              children: quickActions.map(function (action) {
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.quickActionItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.quickActionIcon,
                    children: action.icon
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.quickActionTitle,
                    children: action.title
                  }), action.count > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.quickActionCount,
                    children: action.count
                  })]
                }, action.id);
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u670D\u52A1\u529F\u80FD"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.servicesGrid,
              children: services.map(function (service) {
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.serviceItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.serviceIcon,
                    children: service.icon
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.serviceTitle,
                    children: service.title
                  })]
                }, service.id);
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u6700\u8FD1\u6D3B\u52A8"
            }), recentActivity.map(function (activity) {
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.activityItem,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.activityInfo,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.activityAction,
                    children: activity.action
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.activityDetail,
                    children: activity.detail
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.activityTime,
                  children: activity.time
                })]
              }, activity.id);
            })]
          })]
        });
      }
    }]);
  }(_react.default.PureComponent);
  var PersonalPage = exports.PersonalPage = Personal;
  var styles = _reactNative.StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      height: 50,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowOpacity: 0.1,
      shadowRadius: 4
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8
    },
    activeTabItem: {
      backgroundColor: '#f0f8ff'
    },
    tabIcon: {
      fontSize: 20,
      marginBottom: 4
    },
    activeTabIcon: {
      fontSize: 20,
      marginBottom: 4,
      color: '#007AFF'
    },
    tabLabel: {
      fontSize: 12,
      color: '#666'
    },
    activeTabLabel: {
      fontSize: 12,
      color: '#007AFF'
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5'
    },
    section: {
      backgroundColor: '#ffffff',
      margin: 10,
      borderRadius: 8,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333'
    },
    // 轮播图样式
    bannerContainer: {
      height: 150
    },
    bannerItem: {
      width: 300,
      marginRight: 10,
      borderRadius: 8,
      overflow: 'hidden'
    },
    bannerImage: {
      width: 300,
      height: 150
    },
    bannerTitle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: '#fff',
      padding: 5,
      textAlign: 'center'
    },
    // 产品推荐样式
    productItem: {
      width: 150,
      marginRight: 10,
      alignItems: 'center'
    },
    productImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    productName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    productPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 分类样式
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    categoryItem: {
      width: '30%',
      alignItems: 'center',
      marginBottom: 15
    },
    categoryIcon: {
      fontSize: 30,
      marginBottom: 5
    },
    categoryName: {
      fontSize: 12,
      color: '#333'
    },
    // 新闻样式
    newsItem: {
      backgroundColor: '#f8f9fa',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    newsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333'
    },
    newsContent: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5
    },
    newsTime: {
      fontSize: 12,
      color: '#999'
    },
    // 促销活动样式
    promotionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e8f4f8',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10
    },
    promotionInfo: {
      flex: 1
    },
    promotionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    promotionDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    promotionDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B'
    },
    // 搜索历史样式
    searchHistory: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    historyItem: {
      backgroundColor: '#e8f4f8',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    historyText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 热门关键词样式
    keywordsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    keywordItem: {
      backgroundColor: '#f0f8ff',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    keywordText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 特色分类样式
    featuredCategoryItem: {
      width: 120,
      marginRight: 10,
      alignItems: 'center'
    },
    featuredCategoryImage: {
      width: 100,
      height: 100,
      borderRadius: 8
    },
    featuredCategoryName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5
    },
    featuredCategoryCount: {
      fontSize: 12,
      color: '#666',
      marginTop: 3
    },
    // 热门商品样式
    trendingProductItem: {
      width: 150,
      margin: 5,
      alignItems: 'center'
    },
    trendingProductImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    trendingProductName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    trendingProductPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 特殊优惠样式
    specialOfferItem: {
      backgroundColor: '#fff8e1',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    specialOfferTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    specialOfferDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    specialOfferDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B',
      marginTop: 5
    },
    // 用户信息样式
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    userAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15
    },
    userInfo: {
      flex: 1
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
    },
    userLevel: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    userStats: {
      flexDirection: 'row',
      marginTop: 10
    },
    statItem: {
      alignItems: 'center',
      marginRight: 20
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007AFF'
    },
    statLabel: {
      fontSize: 12,
      color: '#666'
    },
    // 快操作样式
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    quickActionItem: {
      width: '30%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    quickActionIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    quickActionTitle: {
      fontSize: 12,
      color: '#333'
    },
    quickActionCount: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: '#FF6B6B',
      color: '#fff',
      fontSize: 10,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 2
    },
    // 服务功能样式
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    serviceItem: {
      width: '45%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    serviceIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    serviceTitle: {
      fontSize: 14,
      color: '#333'
    },
    // 活动记录样式
    activityItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      marginBottom: 10
    },
    activityInfo: {
      flex: 1
    },
    activityAction: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    activityDetail: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    activityTime: {
      fontSize: 12,
      color: '#999'
    },
    defaultText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#666',
      marginTop: 50
    }
  });
},-174,[7,16,17,50,52,53,2,5,89],"tests/Vmall/Tab/activity-default/Personal.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DiscoveryPage = void 0;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/classCallCheck"));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/createClass"));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/possibleConstructorReturn"));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "@babel/runtime/helpers/getPrototypeOf"));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "@babel/runtime/helpers/inherits"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/tests/Vmall/Tab/activity-default/Discovery.tsx";
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // BottomTabNavigatorWithComplexContent.js
  var Discovery = /*#__PURE__*/function (_React$PureComponent) {
    function Discovery(props) {
      var _props$navigation;
      var _this;
      (0, _classCallCheck2.default)(this, Discovery);
      _this = _callSuper(this, Discovery, [props]);
      // 生成发现页面复杂数据
      _this.generateDiscoverData = function () {
        return {
          searchHistory: ['iPhone 15', 'MacBook Pro', 'AirPods', 'iPad', '小米手机'],
          popularKeywords: ['手机', '电脑', '耳机', '平板', '手表', '相机', '游戏机', '智能手表'],
          featuredCategories: [{
            id: 1,
            name: '手机数码',
            count: 1234,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 2,
            name: '家用电器',
            count: 987,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 3,
            name: '服饰鞋包',
            count: 567,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 4,
            name: '美妆个护',
            count: 345,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 5,
            name: '手机数码',
            count: 1234,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 6,
            name: '家用电器',
            count: 987,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 7,
            name: '服饰鞋包',
            count: 567,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 8,
            name: '美妆个护',
            count: 345,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 9,
            name: '手机数码',
            count: 1234,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 10,
            name: '家用电器',
            count: 987,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 11,
            name: '服饰鞋包',
            count: 567,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 12,
            name: '美妆个护',
            count: 345,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 13,
            name: '手机数码',
            count: 1234,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 14,
            name: '家用电器',
            count: 987,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 15,
            name: '服饰鞋包',
            count: 567,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 16,
            name: '美妆个护',
            count: 345,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 17,
            name: '服饰鞋包',
            count: 567,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 18,
            name: '美妆个护',
            count: 345,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 19,
            name: '手机数码',
            count: 1234,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 20,
            name: '家用电器',
            count: 987,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 21,
            name: '服饰鞋包',
            count: 567,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 22,
            name: '美妆个护',
            count: 345,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 23,
            name: '手机数码',
            count: 1234,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 24,
            name: '家用电器',
            count: 987,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 25,
            name: '服饰鞋包',
            count: 567,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }, {
            id: 26,
            name: '美妆个护',
            count: 345,
            image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg'
          }],
          trendingProducts: [{
            id: 1,
            name: 'iPhone 15',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 2,
            name: 'MacBook Pro',
            price: '¥18999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 3,
            name: 'AirPods',
            price: '¥1899',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 4,
            name: 'iPad',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 5,
            name: '智能手表',
            price: '¥1299',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 6,
            name: '游戏机',
            price: '¥2999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 7,
            name: 'iPhone 15',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 8,
            name: 'MacBook Pro',
            price: '¥18999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 9,
            name: 'AirPods',
            price: '¥1899',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 10,
            name: 'iPad',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 11,
            name: '智能手表',
            price: '¥1299',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 12,
            name: '游戏机',
            price: '¥2999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 13,
            name: 'iPhone 15',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 14,
            name: 'MacBook Pro',
            price: '¥18999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 16,
            name: 'iPad',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 17,
            name: '智能手表',
            price: '¥1299',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 18,
            name: '游戏机',
            price: '¥2999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 19,
            name: 'iPad',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 20,
            name: '智能手表',
            price: '¥1299',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 21,
            name: '游戏机',
            price: '¥2999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 22,
            name: 'iPad',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 23,
            name: '智能手表',
            price: '¥1299',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 24,
            name: '游戏机',
            price: '¥2999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 25,
            name: 'iPhone 15',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 26,
            name: 'MacBook Pro',
            price: '¥18999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 27,
            name: 'iPad',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 28,
            name: '智能手表',
            price: '¥1299',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 29,
            name: '游戏机',
            price: '¥2999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 30,
            name: 'iPad',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 31,
            name: '智能手表',
            price: '¥1299',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }, {
            id: 32,
            name: '游戏机',
            price: '¥2999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png'
          }],
          specialOffers: [{
            id: 1,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 2,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 3,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 4,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 5,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 6,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 7,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 8,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 9,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 10,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 11,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 12,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 13,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 14,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 15,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 16,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 17,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 18,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 19,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 20,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 21,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 22,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 23,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 24,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 25,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 26,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 27,
            title: '品牌特卖',
            description: '全场品牌商品低至5折',
            discount: '5折'
          }, {
            id: 28,
            title: '限时秒杀',
            description: '每日限量秒杀',
            discount: '秒杀'
          }, {
            id: 29,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }, {
            id: 30,
            title: '会员专享',
            description: 'VIP会员专属优惠',
            discount: '专享'
          }]
        };
      };
      (_props$navigation = props.navigation) == null ? void 0 : _props$navigation.addListener('focus', function () {
        console.log('xchhh Discovery focus', new Date().getTime());
      });
      _this.state = {
        activeTab: 0,
        // 模拟复杂的数据结构
        discoverData: _this.generateDiscoverData()
      };
      return _this;
    }
    (0, _inherits2.default)(Discovery, _React$PureComponent);
    return (0, _createClass2.default)(Discovery, [{
      key: "render",
      value:
      // 渲染首页内容
      function render() {
        var _this2 = this;
        var _this$state$discoverD = this.state.discoverData,
          searchHistory = _this$state$discoverD.searchHistory,
          popularKeywords = _this$state$discoverD.popularKeywords,
          featuredCategories = _this$state$discoverD.featuredCategories,
          trendingProducts = _this$state$discoverD.trendingProducts,
          specialOffers = _this$state$discoverD.specialOffers;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
          style: styles.contentContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.section,
              children: "Title\u641C\u7D22\u5386\u53F2"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.searchHistory,
              children: searchHistory.map(function (item, index) {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: styles.historyItem,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.historyText,
                    children: item
                  })
                }, index);
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u70ED\u95E8\u641C\u7D22"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.keywordsGrid,
              children: popularKeywords.map(function (keyword, index) {
                return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
                  style: styles.keywordItem,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.keywordText,
                    children: keyword
                  })
                }, index);
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u7279\u8272\u5206\u7C7B"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
              data: featuredCategories,
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              keyExtractor: function keyExtractor(item) {
                return item.id.toString();
              },
              renderItem: function renderItem(_ref) {
                var item = _ref.item;
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.featuredCategoryItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                    source: {
                      uri: item.image
                    },
                    style: styles.featuredCategoryImage
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.featuredCategoryName,
                    children: item.name
                  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                    style: styles.featuredCategoryCount,
                    children: [item.count, "\u4EF6\u5546\u54C1"]
                  })]
                });
              }
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u70ED\u95E8\u5546\u54C1"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
              data: trendingProducts,
              numColumns: 2,
              keyExtractor: function keyExtractor(item) {
                return item.id.toString();
              },
              renderItem: function renderItem(_ref2) {
                var item = _ref2.item;
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.trendingProductItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                    source: {
                      uri: item.image
                    },
                    style: styles.trendingProductImage
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.trendingProductName,
                    children: item.name
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.trendingProductPrice,
                    children: item.price
                  })]
                });
              }
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u7279\u6B8A\u4F18\u60E0"
            }), specialOffers.map(function (item) {
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.specialOfferItem,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.specialOfferTitle,
                  children: item.title
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.specialOfferDescription,
                  children: item.description
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.specialOfferDiscount,
                  children: item.discount
                })]
              }, item.id);
            })]
          })]
        });
      }
    }]);
  }(_react.default.PureComponent);
  var DiscoveryPage = exports.DiscoveryPage = Discovery;
  var styles = _reactNative.StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      height: 50,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowOpacity: 0.1,
      shadowRadius: 4
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8
    },
    activeTabItem: {
      backgroundColor: '#f0f8ff'
    },
    tabIcon: {
      fontSize: 20,
      marginBottom: 4
    },
    activeTabIcon: {
      fontSize: 20,
      marginBottom: 4,
      color: '#007AFF'
    },
    tabLabel: {
      fontSize: 12,
      color: '#666'
    },
    activeTabLabel: {
      fontSize: 12,
      color: '#007AFF'
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5'
    },
    section: {
      backgroundColor: '#ffffff',
      margin: 10,
      borderRadius: 8,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333'
    },
    // 轮播图样式
    bannerContainer: {
      height: 150
    },
    bannerItem: {
      width: 300,
      marginRight: 10,
      borderRadius: 8,
      overflow: 'hidden'
    },
    bannerImage: {
      width: 300,
      height: 150
    },
    bannerTitle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: '#fff',
      padding: 5,
      textAlign: 'center'
    },
    // 产品推荐样式
    productItem: {
      width: 150,
      marginRight: 10,
      alignItems: 'center'
    },
    productImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    productName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    productPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 分类样式
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    categoryItem: {
      width: '30%',
      alignItems: 'center',
      marginBottom: 15
    },
    categoryIcon: {
      fontSize: 30,
      marginBottom: 5
    },
    categoryName: {
      fontSize: 12,
      color: '#333'
    },
    // 新闻样式
    newsItem: {
      backgroundColor: '#f8f9fa',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    newsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333'
    },
    newsContent: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5
    },
    newsTime: {
      fontSize: 12,
      color: '#999'
    },
    // 促销活动样式
    promotionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e8f4f8',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10
    },
    promotionInfo: {
      flex: 1
    },
    promotionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    promotionDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    promotionDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B'
    },
    // 搜索历史样式
    searchHistory: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    historyItem: {
      backgroundColor: '#e8f4f8',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    historyText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 热门关键词样式
    keywordsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    keywordItem: {
      backgroundColor: '#f0f8ff',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    keywordText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 特色分类样式
    featuredCategoryItem: {
      width: 120,
      marginRight: 10,
      alignItems: 'center'
    },
    featuredCategoryImage: {
      width: 100,
      height: 100,
      borderRadius: 8
    },
    featuredCategoryName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5
    },
    featuredCategoryCount: {
      fontSize: 12,
      color: '#666',
      marginTop: 3
    },
    // 热门商品样式
    trendingProductItem: {
      width: 150,
      margin: 5,
      alignItems: 'center'
    },
    trendingProductImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    trendingProductName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    trendingProductPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 特殊优惠样式
    specialOfferItem: {
      backgroundColor: '#fff8e1',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    specialOfferTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    specialOfferDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    specialOfferDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B',
      marginTop: 5
    },
    // 用户信息样式
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    userAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15
    },
    userInfo: {
      flex: 1
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
    },
    userLevel: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    userStats: {
      flexDirection: 'row',
      marginTop: 10
    },
    statItem: {
      alignItems: 'center',
      marginRight: 20
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007AFF'
    },
    statLabel: {
      fontSize: 12,
      color: '#666'
    },
    // 快操作样式
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    quickActionItem: {
      width: '30%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    quickActionIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    quickActionTitle: {
      fontSize: 12,
      color: '#333'
    },
    quickActionCount: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: '#FF6B6B',
      color: '#fff',
      fontSize: 10,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 2
    },
    // 服务功能样式
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    serviceItem: {
      width: '45%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    serviceIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    serviceTitle: {
      fontSize: 14,
      color: '#333'
    },
    // 活动记录样式
    activityItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      marginBottom: 10
    },
    activityInfo: {
      flex: 1
    },
    activityAction: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    activityDetail: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    activityTime: {
      fontSize: 12,
      color: '#999'
    },
    defaultText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#666',
      marginTop: 50
    }
  });
},-173,[7,16,17,50,52,53,2,5,89],"tests/Vmall/Tab/activity-default/Discovery.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HomePage = void 0;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/classCallCheck"));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/createClass"));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/possibleConstructorReturn"));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "@babel/runtime/helpers/getPrototypeOf"));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "@babel/runtime/helpers/inherits"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/tests/Vmall/Tab/activity-default/Home.tsx";
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // BottomTabNavigatorWithComplexContent.js
  var Home = /*#__PURE__*/function (_React$PureComponent) {
    function Home(props) {
      var _props$navigation;
      var _this;
      (0, _classCallCheck2.default)(this, Home);
      _this = _callSuper(this, Home, [props]);
      // 生成首页复杂数据
      _this.generateHomeData = function () {
        return {
          banner: [{
            id: 1,
            title: '新品上市',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 2,
            title: '限时优惠',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 3,
            title: '品牌特卖',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 4,
            title: '新品上市',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 5,
            title: '限时优惠',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 6,
            title: '品牌特卖',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 7,
            title: '新品上市',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 8,
            title: '限时优惠',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 9,
            title: '品牌特卖',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 10,
            title: '新品上市',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 11,
            title: '限时优惠',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 12,
            title: '品牌特卖',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }],
          recommendations: [{
            id: 1,
            name: 'iPhone 15 Pro',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 2,
            name: 'MacBook Air',
            price: '¥12999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 3,
            name: 'iPad Pro',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 4,
            name: 'AirPods Pro',
            price: '¥1899',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 5,
            name: 'iPhone 15 Pro',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 6,
            name: 'MacBook Air',
            price: '¥12999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 7,
            name: 'iPad Pro',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 8,
            name: 'AirPods Pro',
            price: '¥1899',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 9,
            name: 'iPhone 15 Pro',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 10,
            name: 'MacBook Air',
            price: '¥12999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 11,
            name: 'iPad Pro',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 12,
            name: 'AirPods Pro',
            price: '¥1899',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 13,
            name: 'iPhone 15 Pro',
            price: '¥9999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 14,
            name: 'MacBook Air',
            price: '¥12999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 15,
            name: 'iPad Pro',
            price: '¥7999',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }, {
            id: 16,
            name: 'AirPods Pro',
            price: '¥1899',
            image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg'
          }],
          categories: [{
            id: 1,
            name: '手机数码',
            icon: '📱'
          }, {
            id: 2,
            name: '家用电器',
            icon: '📺'
          }, {
            id: 3,
            name: '服饰鞋包',
            icon: '👕'
          }, {
            id: 4,
            name: '美妆个护',
            icon: '💄'
          }, {
            id: 5,
            name: '家居生活',
            icon: '🏠'
          }, {
            id: 6,
            name: '运动户外',
            icon: '⚽'
          }, {
            id: 7,
            name: '手机数码',
            icon: '📱'
          }, {
            id: 8,
            name: '家用电器',
            icon: '📺'
          }, {
            id: 9,
            name: '服饰鞋包',
            icon: '👕'
          }, {
            id: 10,
            name: '美妆个护',
            icon: '💄'
          }, {
            id: 11,
            name: '家居生活',
            icon: '🏠'
          }, {
            id: 12,
            name: '运动户外',
            icon: '⚽'
          }, {
            id: 13,
            name: '手机数码',
            icon: '📱'
          }, {
            id: 14,
            name: '家用电器',
            icon: '📺'
          }, {
            id: 15,
            name: '服饰鞋包',
            icon: '👕'
          }, {
            id: 16,
            name: '美妆个护',
            icon: '💄'
          }, {
            id: 17,
            name: '家居生活',
            icon: '🏠'
          }, {
            id: 18,
            name: '运动户外',
            icon: '⚽'
          }],
          news: [{
            id: 1,
            title: '新品发布',
            content: '最新产品现已上线，欢迎体验',
            time: '2小时前'
          }, {
            id: 2,
            title: '限时优惠',
            content: '全场满减活动进行中',
            time: '5小时前'
          }, {
            id: 3,
            title: '会员专享',
            content: 'VIP会员享受更多优惠',
            time: '1天前'
          }, {
            id: 4,
            title: '新品发布',
            content: '最新产品现已上线，欢迎体验',
            time: '2小时前'
          }, {
            id: 5,
            title: '限时优惠',
            content: '全场满减活动进行中',
            time: '5小时前'
          }, {
            id: 6,
            title: '会员专享',
            content: 'VIP会员享受更多优惠',
            time: '1天前'
          }, {
            id: 7,
            title: '新品发布',
            content: '最新产品现已上线，欢迎体验',
            time: '2小时前'
          }, {
            id: 8,
            title: '限时优惠',
            content: '全场满减活动进行中',
            time: '5小时前'
          }, {
            id: 9,
            title: '会员专享',
            content: 'VIP会员享受更多优惠',
            time: '1天前'
          }, {
            id: 10,
            title: '新品发布',
            content: '最新产品现已上线，欢迎体验',
            time: '2小时前'
          }, {
            id: 11,
            title: '限时优惠',
            content: '全场满减活动进行中',
            time: '5小时前'
          }, {
            id: 12,
            title: '会员专享',
            content: 'VIP会员享受更多优惠',
            time: '1天前'
          }, {
            id: 13,
            title: '新品发布',
            content: '最新产品现已上线，欢迎体验',
            time: '2小时前'
          }, {
            id: 14,
            title: '限时优惠',
            content: '全场满减活动进行中',
            time: '5小时前'
          }, {
            id: 15,
            title: '会员专享',
            content: 'VIP会员享受更多优惠',
            time: '1天前'
          }, {
            id: 16,
            title: '新品发布',
            content: '最新产品现已上线，欢迎体验',
            time: '2小时前'
          }, {
            id: 17,
            title: '限时优惠',
            content: '全场满减活动进行中',
            time: '5小时前'
          }, {
            id: 18,
            title: '会员专享',
            content: 'VIP会员享受更多优惠',
            time: '1天前'
          }, {
            id: 19,
            title: '新品发布',
            content: '最新产品现已上线，欢迎体验',
            time: '2小时前'
          }, {
            id: 20,
            title: '限时优惠',
            content: '全场满减活动进行中',
            time: '5小时前'
          }, {
            id: 21,
            title: '会员专享',
            content: 'VIP会员享受更多优惠',
            time: '1天前'
          }],
          promotions: [{
            id: 1,
            title: '满减活动',
            description: '满500减50',
            discount: '50'
          }, {
            id: 2,
            title: '买一送一',
            description: '精选商品买一送一',
            discount: '100%'
          }, {
            id: 3,
            title: '积分兑换',
            description: '积分兑换好礼',
            discount: '1000积分'
          }, {
            id: 4,
            title: '满减活动',
            description: '满500减50',
            discount: '50'
          }, {
            id: 5,
            title: '买一送一',
            description: '精选商品买一送一',
            discount: '100%'
          }, {
            id: 6,
            title: '积分兑换',
            description: '积分兑换好礼',
            discount: '1000积分'
          }, {
            id: 7,
            title: '满减活动',
            description: '满500减50',
            discount: '50'
          }, {
            id: 8,
            title: '买一送一',
            description: '精选商品买一送一',
            discount: '100%'
          }, {
            id: 9,
            title: '积分兑换',
            description: '积分兑换好礼',
            discount: '1000积分'
          }, {
            id: 10,
            title: '满减活动',
            description: '满500减50',
            discount: '50'
          }, {
            id: 11,
            title: '买一送一',
            description: '精选商品买一送一',
            discount: '100%'
          }, {
            id: 12,
            title: '积分兑换',
            description: '积分兑换好礼',
            discount: '1000积分'
          }]
        };
      };
      (_props$navigation = props.navigation) == null ? void 0 : _props$navigation.addListener('focus', function () {
        console.log('xchhh renderHomeContent focus', new Date().getTime());
      });
      _this.state = {
        activeTab: 0,
        // 模拟复杂的数据结构
        homeData: _this.generateHomeData()
      };
      return _this;
    }
    (0, _inherits2.default)(Home, _React$PureComponent);
    return (0, _createClass2.default)(Home, [{
      key: "render",
      value:
      // 渲染首页内容
      function render() {
        var _this2 = this;
        var _this$state$homeData = this.state.homeData,
          banner = _this$state$homeData.banner,
          recommendations = _this$state$homeData.recommendations,
          categories = _this$state$homeData.categories,
          news = _this$state$homeData.news,
          promotions = _this$state$homeData.promotions;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
          style: styles.contentContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u8F6E\u64AD\u56FE"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              style: styles.bannerContainer,
              children: banner.map(function (item) {
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.bannerItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                    source: {
                      uri: item.image
                    },
                    style: styles.bannerImage
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.bannerTitle,
                    children: item.title
                  })]
                }, item.id);
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u63A8\u8350\u5546\u54C1"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
              data: recommendations,
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              keyExtractor: function keyExtractor(item) {
                return item.id.toString();
              },
              renderItem: function renderItem(_ref) {
                var item = _ref.item;
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.productItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
                    source: {
                      uri: item.image
                    },
                    style: styles.productImage
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.productName,
                    children: item.name
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.productPrice,
                    children: item.price
                  })]
                });
              }
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u5546\u54C1\u5206\u7C7B"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.categoryGrid,
              children: categories.map(function (category) {
                return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
                  style: styles.categoryItem,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.categoryIcon,
                    children: category.icon
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.categoryName,
                    children: category.name
                  })]
                }, category.id);
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u6700\u65B0\u52A8\u6001"
            }), news.map(function (item) {
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.newsItem,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.newsTitle,
                  children: item.title
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.newsContent,
                  children: item.content
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.newsTime,
                  children: item.time
                })]
              }, item.id);
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.section,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.sectionTitle,
              children: "\u4FC3\u9500\u6D3B\u52A8"
            }), promotions.map(function (item) {
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.promotionItem,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.promotionInfo,
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.promotionTitle,
                    children: item.title
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.promotionDescription,
                    children: item.description
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.promotionDiscount,
                  children: item.discount
                })]
              }, item.id);
            })]
          })]
        });
      }
    }]);
  }(_react.default.PureComponent);
  var HomePage = exports.HomePage = Home;
  var styles = _reactNative.StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      height: 50,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowOpacity: 0.1,
      shadowRadius: 4
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8
    },
    activeTabItem: {
      backgroundColor: '#f0f8ff'
    },
    tabIcon: {
      fontSize: 20,
      marginBottom: 4
    },
    activeTabIcon: {
      fontSize: 20,
      marginBottom: 4,
      color: '#007AFF'
    },
    tabLabel: {
      fontSize: 12,
      color: '#666'
    },
    activeTabLabel: {
      fontSize: 12,
      color: '#007AFF'
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5'
    },
    section: {
      backgroundColor: '#ffffff',
      margin: 10,
      borderRadius: 8,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333'
    },
    // 轮播图样式
    bannerContainer: {
      height: 150
    },
    bannerItem: {
      width: 300,
      marginRight: 10,
      borderRadius: 8,
      overflow: 'hidden'
    },
    bannerImage: {
      width: 300,
      height: 150
    },
    bannerTitle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: '#fff',
      padding: 5,
      textAlign: 'center'
    },
    // 产品推荐样式
    productItem: {
      width: 150,
      marginRight: 10,
      alignItems: 'center'
    },
    productImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    productName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    productPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 分类样式
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    categoryItem: {
      width: '30%',
      alignItems: 'center',
      marginBottom: 15
    },
    categoryIcon: {
      fontSize: 30,
      marginBottom: 5
    },
    categoryName: {
      fontSize: 12,
      color: '#333'
    },
    // 新闻样式
    newsItem: {
      backgroundColor: '#f8f9fa',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    newsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333'
    },
    newsContent: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5
    },
    newsTime: {
      fontSize: 12,
      color: '#999'
    },
    // 促销活动样式
    promotionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e8f4f8',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10
    },
    promotionInfo: {
      flex: 1
    },
    promotionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    promotionDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    promotionDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B'
    },
    // 搜索历史样式
    searchHistory: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    historyItem: {
      backgroundColor: '#e8f4f8',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    historyText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 热门关键词样式
    keywordsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    keywordItem: {
      backgroundColor: '#f0f8ff',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    keywordText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 特色分类样式
    featuredCategoryItem: {
      width: 120,
      marginRight: 10,
      alignItems: 'center'
    },
    featuredCategoryImage: {
      width: 100,
      height: 100,
      borderRadius: 8
    },
    featuredCategoryName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5
    },
    featuredCategoryCount: {
      fontSize: 12,
      color: '#666',
      marginTop: 3
    },
    // 热门商品样式
    trendingProductItem: {
      width: 150,
      margin: 5,
      alignItems: 'center'
    },
    trendingProductImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    trendingProductName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    trendingProductPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 特殊优惠样式
    specialOfferItem: {
      backgroundColor: '#fff8e1',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    specialOfferTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    specialOfferDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    specialOfferDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B',
      marginTop: 5
    },
    // 用户信息样式
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    userAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15
    },
    userInfo: {
      flex: 1
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
    },
    userLevel: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    userStats: {
      flexDirection: 'row',
      marginTop: 10
    },
    statItem: {
      alignItems: 'center',
      marginRight: 20
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007AFF'
    },
    statLabel: {
      fontSize: 12,
      color: '#666'
    },
    // 快操作样式
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    quickActionItem: {
      width: '30%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    quickActionIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    quickActionTitle: {
      fontSize: 12,
      color: '#333'
    },
    quickActionCount: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: '#FF6B6B',
      color: '#fff',
      fontSize: 10,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 2
    },
    // 服务功能样式
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    serviceItem: {
      width: '45%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    serviceIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    serviceTitle: {
      fontSize: 14,
      color: '#333'
    },
    // 活动记录样式
    activityItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      marginBottom: 10
    },
    activityInfo: {
      flex: 1
    },
    activityAction: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    activityDetail: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    activityTime: {
      fontSize: 12,
      color: '#999'
    },
    defaultText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#666',
      marginTop: 50
    }
  });
},-172,[7,16,17,50,52,53,2,5,89],"tests/Vmall/Tab/activity-default/Home.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useBottomTabBarHeight;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _BottomTabBarHeightContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./BottomTabBarHeightContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useBottomTabBarHeight() {
    var height = React.useContext(_BottomTabBarHeightContext.default);
    if (height === undefined) {
      throw new Error("Couldn't find the bottom tab bar height. Are you inside a screen in Bottom Tab Navigator?");
    }
    return height;
  }
},-171,[7,2,-8],"node_modules/@react-navigation/bottom-tabs/src/utils/useBottomTabBarHeight.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useTransitionProgress;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _TransitionProgressContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./TransitionProgressContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useTransitionProgress() {
    var progress = React.useContext(_TransitionProgressContext.default);
    if (progress === undefined) {
      throw new Error("Couldn't find values for transition progress. Are you inside a screen in Native Stack?");
    }
    return progress;
  }
},-170,[7,2,-155],"node_modules/react-native-screens/src/useTransitionProgress.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0], "react-native");
  /* eslint-disable @typescript-eslint/ban-types */
  var _default = exports.default = _reactNative.TurboModuleRegistry.get('RNSModule');
},-169,[5],"node_modules/react-native-screens/src/fabric/NativeScreensModule.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSFullWindowOverlay', {});
},-168,[7,270],"node_modules/react-native-screens/src/fabric/FullWindowOverlayNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2], "react-native");
  var _FullWindowOverlayNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "../fabric/FullWindowOverlayNativeComponent"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-native-screens/src/components/FullWindowOverlay.tsx"; // Native components
  var NativeFullWindowOverlay = _FullWindowOverlayNativeComponent.default;
  function FullWindowOverlay(props) {
    if (_reactNative.Platform.OS !== 'ios') {
      console.warn('Using FullWindowOverlay is only valid on iOS devices.');
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({}, props));
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeFullWindowOverlay, {
      style: {
        position: 'absolute',
        width: '100%',
        height: '100%'
      },
      children: props.children
    });
  }
  var _default = exports.default = FullWindowOverlay;
},-167,[7,2,5,-168,89],"node_modules/react-native-screens/src/components/FullWindowOverlay.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Commands = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  var _codegenNativeCommands = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "react-native/Libraries/Utilities/codegenNativeCommands"));
  /* eslint-disable */

  var Commands = exports.Commands = (0, _codegenNativeCommands.default)({
    supportedCommands: ['blur', 'focus', 'clearText', 'toggleCancelButton', 'setText', 'cancelSearch']
  });
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSSearchBar', {});
},-166,[7,270,258],"node_modules/react-native-screens/src/fabric/SearchBarNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.NativeSearchBarCommands = exports.NativeSearchBar = void 0;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2], "react-native");
  var _SearchBarNativeComponent = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "../fabric/SearchBarNativeComponent"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-native-screens/src/components/SearchBar.tsx"; // Native components
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var NativeSearchBar = exports.NativeSearchBar = _SearchBarNativeComponent.default;
  var NativeSearchBarCommands = exports.NativeSearchBarCommands = _SearchBarNativeComponent.Commands;
  function SearchBar(props, ref) {
    var searchBarRef = _react.default.useRef(null);
    _react.default.useImperativeHandle(ref, function () {
      return {
        blur: function blur() {
          _callMethodWithRef(function (ref) {
            return NativeSearchBarCommands.blur(ref);
          });
        },
        focus: function focus() {
          _callMethodWithRef(function (ref) {
            return NativeSearchBarCommands.focus(ref);
          });
        },
        toggleCancelButton: function toggleCancelButton(flag) {
          _callMethodWithRef(function (ref) {
            return NativeSearchBarCommands.toggleCancelButton(ref, flag);
          });
        },
        clearText: function clearText() {
          _callMethodWithRef(function (ref) {
            return NativeSearchBarCommands.clearText(ref);
          });
        },
        setText: function setText(text) {
          _callMethodWithRef(function (ref) {
            return NativeSearchBarCommands.setText(ref, text);
          });
        },
        cancelSearch: function cancelSearch() {
          _callMethodWithRef(function (ref) {
            return NativeSearchBarCommands.cancelSearch(ref);
          });
        }
      };
    });
    var _callMethodWithRef = _react.default.useCallback(function (method) {
      var ref = searchBarRef.current;
      if (ref) {
        method(ref);
      } else {
        console.warn('Reference to native search bar component has not been updated yet');
      }
    }, [searchBarRef]);
    if (!_$$_REQUIRE(_dependencyMap[5], "react-native-screens").isSearchBarAvailableForCurrentPlatform) {
      console.warn('Importing SearchBar is only valid on iOS and Android devices.');
      return _reactNative.View;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeSearchBar, Object.assign({
      ref: searchBarRef
    }, props, {
      onSearchFocus: props.onFocus,
      onSearchBlur: props.onBlur,
      onSearchButtonPress: props.onSearchButtonPress,
      onCancelButtonPress: props.onCancelButtonPress,
      onChangeText: props.onChangeText
    }));
  }
  var _default = exports.default = _react.default.forwardRef(SearchBar);
},-165,[7,2,5,-166,89,-146],"node_modules/react-native-screens/src/components/SearchBar.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  // eslint-disable-next-line @typescript-eslint/ban-types
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSScreenStack', {});
},-164,[7,270],"node_modules/react-native-screens/src/fabric/ScreenStackNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _DelayedFreeze = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./helpers/DelayedFreeze"));
  var _ScreenStackNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "../fabric/ScreenStackNativeComponent"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-native-screens/src/components/ScreenStack.tsx";
  var _excluded = ["children", "gestureDetectorBridge"]; // Native components
  var NativeScreenStack = _ScreenStackNativeComponent.default;
  function isFabric() {
    return 'nativeFabricUIManager' in global;
  }
  function ScreenStack(props) {
    var _this = this;
    var children = props.children,
      gestureDetectorBridge = props.gestureDetectorBridge,
      rest = (0, _objectWithoutProperties2.default)(props, _excluded);
    var ref = _react.default.useRef(null);
    var size = _react.default.Children.count(children);
    // freezes all screens except the top one
    var childrenWithFreeze = _react.default.Children.map(children, function (child, index) {
      var _props$descriptor, _props$descriptors, _descriptor$options$f, _descriptor$options;
      // @ts-expect-error it's either SceneView in v6 or RouteView in v5
      var props = child.props,
        key = child.key;
      var descriptor = (_props$descriptor = props == null ? void 0 : props.descriptor) != null ? _props$descriptor : props == null ? void 0 : (_props$descriptors = props.descriptors) == null ? void 0 : _props$descriptors[key];
      var isFreezeEnabled = (_descriptor$options$f = descriptor == null ? void 0 : (_descriptor$options = descriptor.options) == null ? void 0 : _descriptor$options.freezeOnBlur) != null ? _descriptor$options$f : (0, _$$_REQUIRE(_dependencyMap[6], "react-native-screens").freezeEnabled)();

      // On Fabric, when screen is frozen, animated and reanimated values are not updated
      // due to component being unmounted. To avoid this, we don't freeze the previous screen there
      var freezePreviousScreen = isFabric() ? size - index > 2 : size - index > 1;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DelayedFreeze.default, {
        freeze: isFreezeEnabled && freezePreviousScreen,
        children: child
      });
    });
    _react.default.useEffect(function () {
      if (gestureDetectorBridge) {
        gestureDetectorBridge.current.stackUseEffectCallback(ref);
      }
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeScreenStack, Object.assign({}, rest, {
      ref: ref,
      children: childrenWithFreeze
    }));
  }
  var _default = exports.default = ScreenStack;
},-163,[7,151,2,-156,-164,89,-146],"node_modules/react-native-screens/src/components/ScreenStack.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSScreenNavigationContainer', {});
},-162,[7,270],"node_modules/react-native-screens/src/fabric/ScreenNavigationContainerNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSScreenContainer', {});
},-161,[7,270],"node_modules/react-native-screens/src/fabric/ScreenContainerNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.NativeScreenNavigationContainer = exports.NativeScreenContainer = void 0;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2], "react-native");
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _ScreenContainerNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "../fabric/ScreenContainerNativeComponent"));
  var _ScreenNavigationContainerNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "../fabric/ScreenNavigationContainerNativeComponent"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[6], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-native-screens/src/components/ScreenContainer.tsx";
  var _excluded = ["enabled", "hasTwoStates"]; // Native components
  var NativeScreenContainer = exports.NativeScreenContainer = _reactNative.Platform.OS !== 'web' ? _ScreenContainerNativeComponent.default : _reactNative.View;
  var NativeScreenNavigationContainer = exports.NativeScreenNavigationContainer = _reactNative.Platform.OS !== 'web' ? _ScreenNavigationContainerNativeComponent.default : _reactNative.View;
  function ScreenContainer(props) {
    var _props$enabled = props.enabled,
      enabled = _props$enabled === void 0 ? (0, _$$_REQUIRE(_dependencyMap[7], "../core").screensEnabled)() : _props$enabled,
      hasTwoStates = props.hasTwoStates,
      rest = (0, _objectWithoutProperties2.default)(props, _excluded);
    if (enabled && _$$_REQUIRE(_dependencyMap[7], "../core").isNativePlatformSupported) {
      if (hasTwoStates) {
        var ScreenNavigationContainer = _reactNative.Platform.OS === 'ios' ? NativeScreenNavigationContainer : NativeScreenContainer;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenNavigationContainer, Object.assign({}, rest));
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeScreenContainer, Object.assign({}, rest));
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({}, rest));
  }
  var _default = exports.default = ScreenContainer;
},-160,[7,151,5,2,-161,-162,89,-151],"node_modules/react-native-screens/src/components/ScreenContainer.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  // eslint-disable-next-line @typescript-eslint/ban-types
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSModalScreen', {
    interfaceOnly: true
  });
},-159,[7,270],"node_modules/react-native-screens/src/fabric/ModalScreenNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  // eslint-disable-next-line @typescript-eslint/ban-types
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSScreen', {
    interfaceOnly: true
  });
},-158,[7,270],"node_modules/react-native-screens/src/fabric/ScreenNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Freeze = Freeze;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[1], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-freeze/src/index.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var infiniteThenable = {
    then: function then() {}
  };
  function Suspender(_ref) {
    var freeze = _ref.freeze,
      children = _ref.children;
    if (freeze) {
      throw infiniteThenable;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
      children: children
    });
  }
  function Freeze(_ref2) {
    var freeze = _ref2.freeze,
      children = _ref2.children,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? null : _ref2$placeholder;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
      fallback: placeholder,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Suspender, {
        freeze: freeze,
        children: children
      })
    });
  }
},-157,[2,89],"node_modules/react-freeze/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[3], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-native-screens/src/components/helpers/DelayedFreeze.tsx";
  // This component allows one more render before freezing the screen.
  // Allows activityState to reach the native side and useIsFocused to work correctly.
  function DelayedFreeze(_ref) {
    var freeze = _ref.freeze,
      children = _ref.children;
    // flag used for determining whether freeze should be enabled
    var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      freezeState = _React$useState2[0],
      setFreezeState = _React$useState2[1];
    _react.default.useEffect(function () {
      var id = setImmediate(function () {
        setFreezeState(freeze);
      });
      return function () {
        clearImmediate(id);
      };
    }, [freeze]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[4], "react-freeze").Freeze, {
      freeze: freeze ? freezeState : false,
      children: children
    });
  }
  var _default = exports.default = DelayedFreeze;
},-156,[7,28,2,89,-157],"node_modules/react-native-screens/src/components/helpers/DelayedFreeze.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _default = exports.default = React.createContext(undefined);
},-155,[2],"node_modules/react-native-screens/src/TransitionProgressContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.ScreenContext = exports.NativeScreen = exports.InnerScreen = void 0;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _TransitionProgressContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "../TransitionProgressContext"));
  var _DelayedFreeze = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./helpers/DelayedFreeze"));
  var _ScreenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "../fabric/ScreenNativeComponent"));
  var _ModalScreenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "../fabric/ModalScreenNativeComponent"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-native-screens/src/components/Screen.tsx",
    _this = this;
  var _excluded = ["enabled", "freezeOnBlur"],
    _excluded2 = ["active", "activityState", "children", "isNativeStack", "gestureResponseDistance", "onGestureCancel"],
    _excluded3 = ["active", "activityState", "style", "onComponentRef"]; // Native components
  var NativeScreen = exports.NativeScreen = _ScreenNativeComponent.default;
  var AnimatedNativeScreen = _reactNative.Animated.createAnimatedComponent(NativeScreen);
  var AnimatedNativeModalScreen = _reactNative.Animated.createAnimatedComponent(_ModalScreenNativeComponent.default);

  // Incomplete type, all accessible properties available at:
  // react-native/Libraries/Components/View/ReactNativeViewViewConfig.js

  var InnerScreen = exports.InnerScreen = _react.default.forwardRef(function InnerScreen(props, ref) {
    var innerRef = _react.default.useRef(null);
    _react.default.useImperativeHandle(ref, function () {
      return innerRef.current;
    }, []);
    var setRef = function setRef(ref) {
      innerRef.current = ref;
      props.onComponentRef == null ? void 0 : props.onComponentRef(ref);
    };
    var closing = _react.default.useRef(new _reactNative.Animated.Value(0)).current;
    var progress = _react.default.useRef(new _reactNative.Animated.Value(0)).current;
    var goingForward = _react.default.useRef(new _reactNative.Animated.Value(0)).current;
    var _props$enabled = props.enabled,
      enabled = _props$enabled === void 0 ? (0, _$$_REQUIRE(_dependencyMap[9], "../core").screensEnabled)() : _props$enabled,
      _props$freezeOnBlur = props.freezeOnBlur,
      freezeOnBlur = _props$freezeOnBlur === void 0 ? (0, _$$_REQUIRE(_dependencyMap[9], "../core").freezeEnabled)() : _props$freezeOnBlur,
      rest = (0, _objectWithoutProperties2.default)(props, _excluded);

    // To maintain default behavior of formSheet stack presentation style and to have reasonable
    // defaults for new medium-detent iOS API we need to set defaults here
    var _rest$sheetAllowedDet = rest.sheetAllowedDetents,
      sheetAllowedDetents = _rest$sheetAllowedDet === void 0 ? 'large' : _rest$sheetAllowedDet,
      _rest$sheetLargestUnd = rest.sheetLargestUndimmedDetent,
      sheetLargestUndimmedDetent = _rest$sheetLargestUnd === void 0 ? 'all' : _rest$sheetLargestUnd,
      _rest$sheetGrabberVis = rest.sheetGrabberVisible,
      sheetGrabberVisible = _rest$sheetGrabberVis === void 0 ? false : _rest$sheetGrabberVis,
      _rest$sheetCornerRadi = rest.sheetCornerRadius,
      sheetCornerRadius = _rest$sheetCornerRadi === void 0 ? -1.0 : _rest$sheetCornerRadi,
      _rest$sheetExpandsWhe = rest.sheetExpandsWhenScrolledToEdge,
      sheetExpandsWhenScrolledToEdge = _rest$sheetExpandsWhe === void 0 ? true : _rest$sheetExpandsWhe,
      stackPresentation = rest.stackPresentation;
    if (enabled && _$$_REQUIRE(_dependencyMap[9], "../core").isNativePlatformSupported) {
      var _gestureResponseDista, _gestureResponseDista2, _gestureResponseDista3, _gestureResponseDista4;
      // Due to how Yoga resolves layout, we need to have different components for modal nad non-modal screens
      var AnimatedScreen = _reactNative.Platform.OS === 'android' || stackPresentation === undefined || stackPresentation === 'push' || stackPresentation === 'containedModal' || stackPresentation === 'containedTransparentModal' ? AnimatedNativeScreen : AnimatedNativeModalScreen;
      var active = rest.active,
        activityState = rest.activityState,
        children = rest.children,
        isNativeStack = rest.isNativeStack,
        gestureResponseDistance = rest.gestureResponseDistance,
        onGestureCancel = rest.onGestureCancel,
        _props = (0, _objectWithoutProperties2.default)(rest, _excluded2);
      if (active !== undefined && activityState === undefined) {
        console.warn('It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens');
        activityState = active !== 0 ? 2 : 0; // in the new version, we need one of the screens to have value of 2 after the transition
      }
      var handleRef = function handleRef(ref) {
        var _ref$viewConfig, _ref$viewConfig$valid, _ref$_viewConfig, _ref$_viewConfig$vali;
        if (ref != null && (_ref$viewConfig = ref.viewConfig) != null && (_ref$viewConfig$valid = _ref$viewConfig.validAttributes) != null && _ref$viewConfig$valid.style) {
          ref.viewConfig.validAttributes.style = Object.assign({}, ref.viewConfig.validAttributes.style, {
            display: false
          });
          setRef(ref);
        } else if (ref != null && (_ref$_viewConfig = ref._viewConfig) != null && (_ref$_viewConfig$vali = _ref$_viewConfig.validAttributes) != null && _ref$_viewConfig$vali.style) {
          ref._viewConfig.validAttributes.style = Object.assign({}, ref._viewConfig.validAttributes.style, {
            display: false
          });
          setRef(ref);
        }
      };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DelayedFreeze.default, {
        freeze: freezeOnBlur && activityState === 0,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(AnimatedScreen, Object.assign({}, _props, {
          activityState: activityState,
          sheetAllowedDetents: sheetAllowedDetents,
          sheetLargestUndimmedDetent: sheetLargestUndimmedDetent,
          sheetGrabberVisible: sheetGrabberVisible,
          sheetCornerRadius: sheetCornerRadius,
          sheetExpandsWhenScrolledToEdge: sheetExpandsWhenScrolledToEdge,
          gestureResponseDistance: {
            start: (_gestureResponseDista = gestureResponseDistance == null ? void 0 : gestureResponseDistance.start) != null ? _gestureResponseDista : -1,
            end: (_gestureResponseDista2 = gestureResponseDistance == null ? void 0 : gestureResponseDistance.end) != null ? _gestureResponseDista2 : -1,
            top: (_gestureResponseDista3 = gestureResponseDistance == null ? void 0 : gestureResponseDistance.top) != null ? _gestureResponseDista3 : -1,
            bottom: (_gestureResponseDista4 = gestureResponseDistance == null ? void 0 : gestureResponseDistance.bottom) != null ? _gestureResponseDista4 : -1
          }
          // This prevents showing blank screen when navigating between multiple screens with freezing
          // https://github.com/software-mansion/react-native-screens/pull/1208
          ,
          ref: handleRef,
          onTransitionProgress: !isNativeStack ? undefined : _reactNative.Animated.event([{
            nativeEvent: {
              progress: progress,
              closing: closing,
              goingForward: goingForward
            }
          }], {
            useNativeDriver: true
          }),
          onGestureCancel: onGestureCancel != null ? onGestureCancel : function () {
            // for internal use
          },
          children: !isNativeStack ?
          // see comment of this prop in types.tsx for information why it is needed
          children : /*#__PURE__*/(0, _jsxRuntime.jsx)(_TransitionProgressContext.default.Provider, {
            value: {
              progress: progress,
              closing: closing,
              goingForward: goingForward
            },
            children: children
          })
        }))
      });
    } else {
      // same reason as above
      var _active = rest.active,
        _activityState = rest.activityState,
        style = rest.style,
        onComponentRef = rest.onComponentRef,
        _props2 = (0, _objectWithoutProperties2.default)(rest, _excluded3);
      if (_active !== undefined && _activityState === undefined) {
        _activityState = _active !== 0 ? 2 : 0;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, Object.assign({
        style: [style, {
          display: _activityState !== 0 ? 'flex' : 'none'
        }],
        ref: setRef
      }, _props2));
    }
  });

  // context to be used when the user wants to use enhanced implementation
  // e.g. to use `useReanimatedTransitionProgress` (see `reanimated` folder in repo)
  var ScreenContext = exports.ScreenContext = _react.default.createContext(InnerScreen);
  var Screen = function Screen(props) {
    var ScreenWrapper = _react.default.useContext(ScreenContext) || InnerScreen;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenWrapper, Object.assign({}, props));
  };
  var _default = exports.default = Screen;
},-154,[7,151,2,5,-155,-156,-158,-159,89,-151],"node_modules/react-native-screens/src/components/Screen.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
},-153,[],"node_modules/react-native-screens/src/types.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.executeNativeBackPress = executeNativeBackPress;
  exports.isSearchBarAvailableForCurrentPlatform = exports.isNewBackTitleImplementation = void 0;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0], "react-native");
  var isSearchBarAvailableForCurrentPlatform = exports.isSearchBarAvailableForCurrentPlatform = ['ios', 'android'].includes(_reactNative.Platform.OS);
  function executeNativeBackPress() {
    // This function invokes the native back press event
    _reactNative.BackHandler.exitApp();
    return true;
  }

  // Because of a bug introduced in https://github.com/software-mansion/react-native-screens/pull/1646
  // react-native-screens v3.21 changed how header's backTitle handles whitespace strings in https://github.com/software-mansion/react-native-screens/pull/1726
  // To allow for backwards compatibility in @react-navigation/native-stack we need a way to check if this version or newer is used.
  // See https://github.com/react-navigation/react-navigation/pull/11423 for more context.
  var isNewBackTitleImplementation = exports.isNewBackTitleImplementation = true;
},-152,[5],"node_modules/react-native-screens/src/utils.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.enableFreeze = enableFreeze;
  exports.enableScreens = enableScreens;
  exports.freezeEnabled = freezeEnabled;
  exports.isNativePlatformSupported = void 0;
  exports.screensEnabled = screensEnabled;
  exports.shouldUseActivityState = void 0;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0], "react-native");
  // const that tells if the library should use new implementation, will be undefined for older versions
  var shouldUseActivityState = exports.shouldUseActivityState = true;
  var isNativePlatformSupported = exports.isNativePlatformSupported = _reactNative.Platform.OS === 'ios' || _reactNative.Platform.OS === 'android' || _reactNative.Platform.OS === 'windows';
  var ENABLE_SCREENS = isNativePlatformSupported;
  function enableScreens() {
    var shouldEnableScreens = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    ENABLE_SCREENS = shouldEnableScreens;
    if (!isNativePlatformSupported) {
      return;
    }
    if (ENABLE_SCREENS && !_reactNative.UIManager.getViewManagerConfig('RNSScreen')) {
      console.error("Screen native module hasn't been linked. Please check the react-native-screens README for more details");
    }
  }
  var ENABLE_FREEZE = false;
  function enableFreeze() {
    var shouldEnableReactFreeze = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (!isNativePlatformSupported) {
      return;
    }
    ENABLE_FREEZE = shouldEnableReactFreeze;
  }
  function screensEnabled() {
    return ENABLE_SCREENS;
  }
  function freezeEnabled() {
    return ENABLE_FREEZE;
  }
},-151,[5],"node_modules/react-native-screens/src/core.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSScreenStackHeaderSubview', {});
},-150,[7,270],"node_modules/react-native-screens/src/fabric/ScreenStackHeaderSubviewNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNSScreenStackHeaderConfig', {});
},-149,[7,270],"node_modules/react-native-screens/src/fabric/ScreenStackHeaderConfigNativeComponent.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ScreenStackHeaderSubview = exports.ScreenStackHeaderSearchBarView = exports.ScreenStackHeaderRightView = exports.ScreenStackHeaderLeftView = exports.ScreenStackHeaderConfig = exports.ScreenStackHeaderCenterView = exports.ScreenStackHeaderBackButtonImage = void 0;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2], "react-native");
  var _ScreenStackHeaderConfigNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "../fabric/ScreenStackHeaderConfigNativeComponent"));
  var _ScreenStackHeaderSubviewNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "../fabric/ScreenStackHeaderSubviewNativeComponent"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5], "react/jsx-runtime");
  var _this = this,
    _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/react-native-screens/src/components/ScreenStackHeaderConfig.tsx"; // Native components
  var ScreenStackHeaderConfig = exports.ScreenStackHeaderConfig = _ScreenStackHeaderConfigNativeComponent.default;
  var ScreenStackHeaderSubview = exports.ScreenStackHeaderSubview = _ScreenStackHeaderSubviewNativeComponent.default;
  var ScreenStackHeaderBackButtonImage = exports.ScreenStackHeaderBackButtonImage = function ScreenStackHeaderBackButtonImage(props) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenStackHeaderSubview, {
      type: "back",
      style: styles.headerSubview,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, Object.assign({
        resizeMode: "center",
        fadeDuration: 0
      }, props))
    });
  };
  var ScreenStackHeaderRightView = exports.ScreenStackHeaderRightView = function ScreenStackHeaderRightView(props) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenStackHeaderSubview, Object.assign({}, props, {
      type: "right",
      style: styles.headerSubview
    }));
  };
  var ScreenStackHeaderLeftView = exports.ScreenStackHeaderLeftView = function ScreenStackHeaderLeftView(props) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenStackHeaderSubview, Object.assign({}, props, {
      type: "left",
      style: styles.headerSubview
    }));
  };
  var ScreenStackHeaderCenterView = exports.ScreenStackHeaderCenterView = function ScreenStackHeaderCenterView(props) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenStackHeaderSubview, Object.assign({}, props, {
      type: "center",
      style: styles.headerSubview
    }));
  };
  var ScreenStackHeaderSearchBarView = exports.ScreenStackHeaderSearchBarView = function ScreenStackHeaderSearchBarView(props) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenStackHeaderSubview, Object.assign({}, props, {
      type: "searchBar",
      style: styles.headerSubview
    }));
  };
  var styles = _reactNative.StyleSheet.create({
    headerSubview: {
      position: 'absolute',
      top: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
},-148,[7,2,5,-149,-150,89],"node_modules/react-native-screens/src/components/ScreenStackHeaderConfig.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GHContext = void 0;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[2], "react/jsx-runtime");
  // context to be used when the user wants full screen swipe (see `gesture-handler` folder in repo)
  var GHContext = exports.GHContext = _react.default.createContext(function (props) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: props.children
    });
  });
},-147,[7,2,89],"node_modules/react-native-screens/src/native-stack/contexts/GHContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    enableScreens: true,
    enableFreeze: true,
    screensEnabled: true,
    freezeEnabled: true,
    shouldUseActivityState: true,
    Screen: true,
    NativeScreen: true,
    InnerScreen: true,
    ScreenContext: true,
    ScreenContainer: true,
    NativeScreenContainer: true,
    NativeScreenNavigationContainer: true,
    ScreenStack: true,
    ScreenStackHeaderConfig: true,
    ScreenStackHeaderSubview: true,
    ScreenStackHeaderLeftView: true,
    ScreenStackHeaderCenterView: true,
    ScreenStackHeaderRightView: true,
    ScreenStackHeaderBackButtonImage: true,
    ScreenStackHeaderSearchBarView: true,
    SearchBar: true,
    NativeSearchBar: true,
    NativeSearchBarCommands: true,
    FullWindowOverlay: true,
    NativeScreensModule: true,
    GHContext: true,
    isSearchBarAvailableForCurrentPlatform: true,
    isNewBackTitleImplementation: true,
    executeNativeBackPress: true,
    useTransitionProgress: true
  };
  Object.defineProperty(exports, "FullWindowOverlay", {
    enumerable: true,
    get: function get() {
      return _FullWindowOverlay.default;
    }
  });
  Object.defineProperty(exports, "GHContext", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[1], "./native-stack/contexts/GHContext").GHContext;
    }
  });
  Object.defineProperty(exports, "InnerScreen", {
    enumerable: true,
    get: function get() {
      return _Screen.InnerScreen;
    }
  });
  Object.defineProperty(exports, "NativeScreen", {
    enumerable: true,
    get: function get() {
      return _Screen.NativeScreen;
    }
  });
  Object.defineProperty(exports, "NativeScreenContainer", {
    enumerable: true,
    get: function get() {
      return _ScreenContainer.NativeScreenContainer;
    }
  });
  Object.defineProperty(exports, "NativeScreenNavigationContainer", {
    enumerable: true,
    get: function get() {
      return _ScreenContainer.NativeScreenNavigationContainer;
    }
  });
  Object.defineProperty(exports, "NativeScreensModule", {
    enumerable: true,
    get: function get() {
      return _NativeScreensModule.default;
    }
  });
  Object.defineProperty(exports, "NativeSearchBar", {
    enumerable: true,
    get: function get() {
      return _SearchBar.NativeSearchBar;
    }
  });
  Object.defineProperty(exports, "NativeSearchBarCommands", {
    enumerable: true,
    get: function get() {
      return _SearchBar.NativeSearchBarCommands;
    }
  });
  Object.defineProperty(exports, "Screen", {
    enumerable: true,
    get: function get() {
      return _Screen.default;
    }
  });
  Object.defineProperty(exports, "ScreenContainer", {
    enumerable: true,
    get: function get() {
      return _ScreenContainer.default;
    }
  });
  Object.defineProperty(exports, "ScreenContext", {
    enumerable: true,
    get: function get() {
      return _Screen.ScreenContext;
    }
  });
  Object.defineProperty(exports, "ScreenStack", {
    enumerable: true,
    get: function get() {
      return _ScreenStack.default;
    }
  });
  Object.defineProperty(exports, "ScreenStackHeaderBackButtonImage", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[2], "./components/ScreenStackHeaderConfig").ScreenStackHeaderBackButtonImage;
    }
  });
  Object.defineProperty(exports, "ScreenStackHeaderCenterView", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[2], "./components/ScreenStackHeaderConfig").ScreenStackHeaderCenterView;
    }
  });
  Object.defineProperty(exports, "ScreenStackHeaderConfig", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[2], "./components/ScreenStackHeaderConfig").ScreenStackHeaderConfig;
    }
  });
  Object.defineProperty(exports, "ScreenStackHeaderLeftView", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[2], "./components/ScreenStackHeaderConfig").ScreenStackHeaderLeftView;
    }
  });
  Object.defineProperty(exports, "ScreenStackHeaderRightView", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[2], "./components/ScreenStackHeaderConfig").ScreenStackHeaderRightView;
    }
  });
  Object.defineProperty(exports, "ScreenStackHeaderSearchBarView", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[2], "./components/ScreenStackHeaderConfig").ScreenStackHeaderSearchBarView;
    }
  });
  Object.defineProperty(exports, "ScreenStackHeaderSubview", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[2], "./components/ScreenStackHeaderConfig").ScreenStackHeaderSubview;
    }
  });
  Object.defineProperty(exports, "SearchBar", {
    enumerable: true,
    get: function get() {
      return _SearchBar.default;
    }
  });
  Object.defineProperty(exports, "enableFreeze", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[3], "./core").enableFreeze;
    }
  });
  Object.defineProperty(exports, "enableScreens", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[3], "./core").enableScreens;
    }
  });
  Object.defineProperty(exports, "executeNativeBackPress", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[4], "./utils").executeNativeBackPress;
    }
  });
  Object.defineProperty(exports, "freezeEnabled", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[3], "./core").freezeEnabled;
    }
  });
  Object.defineProperty(exports, "isNewBackTitleImplementation", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[4], "./utils").isNewBackTitleImplementation;
    }
  });
  Object.defineProperty(exports, "isSearchBarAvailableForCurrentPlatform", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[4], "./utils").isSearchBarAvailableForCurrentPlatform;
    }
  });
  Object.defineProperty(exports, "screensEnabled", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[3], "./core").screensEnabled;
    }
  });
  Object.defineProperty(exports, "shouldUseActivityState", {
    enumerable: true,
    get: function get() {
      return _$$_REQUIRE(_dependencyMap[3], "./core").shouldUseActivityState;
    }
  });
  Object.defineProperty(exports, "useTransitionProgress", {
    enumerable: true,
    get: function get() {
      return _useTransitionProgress.default;
    }
  });
  Object.keys(_$$_REQUIRE(_dependencyMap[5], "./types")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[5], "./types")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[5], "./types")[key];
      }
    });
  });
  var _Screen = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6], "./components/Screen"));
  var _ScreenContainer = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7], "./components/ScreenContainer"));
  var _ScreenStack = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./components/ScreenStack"));
  var _SearchBar = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9], "./components/SearchBar"));
  var _FullWindowOverlay = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./components/FullWindowOverlay"));
  var _NativeScreensModule = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11], "./fabric/NativeScreensModule"));
  var _useTransitionProgress = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12], "./useTransitionProgress"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
},-146,[7,-147,-148,-151,-152,-153,-154,-160,-163,-165,-167,-169,-170],"node_modules/react-native-screens/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MaybeScreen = MaybeScreen;
  exports.MaybeScreenContainer = void 0;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _excluded = ["enabled"],
    _excluded2 = ["visible", "children"];
  var _this = this,
    _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/bottom-tabs/src/views/ScreenFallback.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var Screens;
  try {
    Screens = _$$_REQUIRE(_dependencyMap[5], "react-native-screens");
  } catch (e) {
    // Ignore
  }
  var MaybeScreenContainer = exports.MaybeScreenContainer = function MaybeScreenContainer(_ref) {
    var _Screens;
    var enabled = _ref.enabled,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    if ((_Screens = Screens) != null && _Screens.screensEnabled != null && _Screens.screensEnabled()) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Screens.ScreenContainer, Object.assign({
        enabled: enabled
      }, rest));
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({}, rest));
  };
  function MaybeScreen(_ref2) {
    var _Screens2;
    var visible = _ref2.visible,
      children = _ref2.children,
      rest = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
    if ((_Screens2 = Screens) != null && _Screens2.screensEnabled != null && _Screens2.screensEnabled()) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Screens.Screen, Object.assign({
        activityState: visible ? 2 : 0
      }, rest, {
        children: children
      }));
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[6], "@react-navigation/elements").ResourceSavingView, Object.assign({
      visible: visible
    }, rest, {
      children: children
    }));
  }
},-145,[7,151,2,5,89,-146,-123],"node_modules/@react-navigation/bottom-tabs/src/views/ScreenFallback.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
},-144,[],"node_modules/@react-navigation/elements/src/types.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Screen;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _Background = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./Background"));
  var _getDefaultHeaderHeight = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./Header/getDefaultHeaderHeight"));
  var _HeaderHeightContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./Header/HeaderHeightContext"));
  var _HeaderShownContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./Header/HeaderShownContext"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/Screen.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function Screen(props) {
    var dimensions = (0, _$$_REQUIRE(_dependencyMap[9], "react-native-safe-area-context").useSafeAreaFrame)();
    var insets = (0, _$$_REQUIRE(_dependencyMap[9], "react-native-safe-area-context").useSafeAreaInsets)();
    var isParentHeaderShown = React.useContext(_HeaderShownContext.default);
    var parentHeaderHeight = React.useContext(_HeaderHeightContext.default);
    var focused = props.focused,
      _props$modal = props.modal,
      modal = _props$modal === void 0 ? false : _props$modal,
      header = props.header,
      _props$headerShown = props.headerShown,
      headerShown = _props$headerShown === void 0 ? true : _props$headerShown,
      headerTransparent = props.headerTransparent,
      _props$headerStatusBa = props.headerStatusBarHeight,
      headerStatusBarHeight = _props$headerStatusBa === void 0 ? isParentHeaderShown ? 0 : insets.top : _props$headerStatusBa,
      navigation = props.navigation,
      route = props.route,
      children = props.children,
      style = props.style;
    var _React$useState = React.useState(function () {
        return (0, _getDefaultHeaderHeight.default)(dimensions, modal, headerStatusBarHeight);
      }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      headerHeight = _React$useState2[0],
      setHeaderHeight = _React$useState2[1];
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Background.default, {
      accessibilityElementsHidden: !focused,
      importantForAccessibility: focused ? 'auto' : 'no-hide-descendants',
      style: [styles.container, style],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.content,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderShownContext.default.Provider, {
          value: isParentHeaderShown || headerShown !== false,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderHeightContext.default.Provider, {
            value: headerShown ? headerHeight : parentHeaderHeight != null ? parentHeaderHeight : 0,
            children: children
          })
        })
      }), headerShown ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[10], "@react-navigation/native").NavigationContext.Provider, {
        value: navigation,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[10], "@react-navigation/native").NavigationRouteContext.Provider, {
          value: route,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            onLayout: function onLayout(e) {
              var height = e.nativeEvent.layout.height;
              setHeaderHeight(height);
            },
            style: headerTransparent ? styles.absolute : null,
            children: header
          })
        })
      }) : null]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column-reverse'
    },
    // This is necessary to avoid applying 'column-reverse' to screen content
    content: {
      flex: 1
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    }
  });
},-143,[7,28,2,5,-124,-125,-138,-129,89,-114,-18],"node_modules/@react-navigation/elements/src/Screen.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = SafeAreaProviderCompat;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/SafeAreaProviderCompat.tsx",
    _this = this;
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    _Dimensions$get$width = _Dimensions$get.width,
    width = _Dimensions$get$width === void 0 ? 0 : _Dimensions$get$width,
    _Dimensions$get$heigh = _Dimensions$get.height,
    height = _Dimensions$get$heigh === void 0 ? 0 : _Dimensions$get$heigh;

  // To support SSR on web, we need to have empty insets for initial values
  // Otherwise there can be mismatch between SSR and client output
  // We also need to specify empty values to support tests environments
  var initialMetrics = _reactNative.Platform.OS === 'web' || _$$_REQUIRE(_dependencyMap[5], "react-native-safe-area-context").initialWindowMetrics == null ? {
    frame: {
      x: 0,
      y: 0,
      width: width,
      height: height
    },
    insets: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  } : _$$_REQUIRE(_dependencyMap[5], "react-native-safe-area-context").initialWindowMetrics;
  function SafeAreaProviderCompat(_ref) {
    var children = _ref.children,
      style = _ref.style;
    var insets = React.useContext(_$$_REQUIRE(_dependencyMap[5], "react-native-safe-area-context").SafeAreaInsetsContext);
    if (insets) {
      // If we already have insets, don't wrap the stack in another safe area provider
      // This avoids an issue with updates at the cost of potentially incorrect values
      // https://github.com/react-navigation/react-navigation/issues/174
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.container, style],
        children: children
      });
    }
    if (_reactNative.Platform.OS === 'web') {
      children = /*#__PURE__*/(0, _jsxRuntime.jsx)(SafeAreaFrameProvider, {
        initialMetrics: initialMetrics,
        children: children
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[5], "react-native-safe-area-context").SafeAreaProvider, {
      initialMetrics: initialMetrics,
      style: style,
      children: children
    });
  }

  // FIXME: On the Web, the safe area frame value doesn't update on resize
  // So we workaround this by measuring the frame on resize
  var SafeAreaFrameProvider = function SafeAreaFrameProvider(_ref2) {
    var initialMetrics = _ref2.initialMetrics,
      children = _ref2.children;
    var element = React.useRef(null);
    var _React$useState = React.useState(initialMetrics.frame),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      frame = _React$useState2[0],
      setFrame = _React$useState2[1];
    React.useEffect(function () {
      if (element.current == null) {
        return;
      }
      var rect = element.current.getBoundingClientRect();
      setFrame({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      });
      var timeout;
      var observer = new ResizeObserver(function (entries) {
        var entry = entries[0];
        if (entry) {
          var _entry$contentRect = entry.contentRect,
            x = _entry$contentRect.x,
            y = _entry$contentRect.y,
            _width = _entry$contentRect.width,
            _height = _entry$contentRect.height;

          // Debounce the frame updates to avoid too many updates in a short time
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            setFrame({
              x: x,
              y: y,
              width: _width,
              height: _height
            });
          }, 100);
        }
      });
      observer.observe(element.current);
      return function () {
        observer.disconnect();
        clearTimeout(timeout);
      };
    }, []);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_$$_REQUIRE(_dependencyMap[5], "react-native-safe-area-context").SafeAreaFrameContext.Provider, {
      value: frame,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ref: element,
        style: Object.assign({}, _reactNative.StyleSheet.absoluteFillObject, {
          pointerEvents: 'none',
          visibility: 'hidden'
        })
      }), children]
    });
  };
  SafeAreaProviderCompat.initialMetrics = initialMetrics;
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1
    }
  });
},-142,[7,28,2,5,89,-114],"node_modules/@react-navigation/elements/src/SafeAreaProviderCompat.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ResourceSavingScene;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/ResourceSavingView.tsx";
  var _excluded = ["visible", "children", "style"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var FAR_FAR_AWAY = 30000; // this should be big enough to move the whole view out of its container

  function ResourceSavingScene(_ref) {
    var visible = _ref.visible,
      children = _ref.children,
      style = _ref.style,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    if (_reactNative.Platform.OS === 'web') {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View
      // @ts-expect-error: hidden exists on web, but not in React Native
      , Object.assign({
        hidden: !visible,
        style: [{
          display: visible ? 'flex' : 'none'
        }, styles.container, style],
        pointerEvents: visible ? 'auto' : 'none'
      }, rest, {
        children: children
      }));
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.container, style]
      // box-none doesn't seem to work properly on Android
      ,
      pointerEvents: visible ? 'auto' : 'none',
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        collapsable: false,
        removeClippedSubviews:
        // On iOS & macOS, set removeClippedSubviews to true only when not focused
        // This is an workaround for a bug where the clipped view never re-appears
        _reactNative.Platform.OS === 'ios' || _reactNative.Platform.OS === 'macos' ? !visible : true,
        pointerEvents: visible ? 'auto' : 'none',
        style: visible ? styles.attached : styles.detached,
        children: children
      })
    });
  }
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden'
    },
    attached: {
      flex: 1
    },
    detached: {
      flex: 1,
      top: FAR_FAR_AWAY
    }
  });
},-141,[7,151,2,5,89],"node_modules/@react-navigation/elements/src/ResourceSavingView.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = MissingIcon;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[2], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/MissingIcon.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function MissingIcon(_ref) {
    var color = _ref.color,
      size = _ref.size,
      style = _ref.style;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.icon, {
        color: color,
        fontSize: size
      }, style],
      children: "\u23F7"
    });
  }
  var styles = _reactNative.StyleSheet.create({
    icon: {
      backgroundColor: 'transparent'
    }
  });
},-140,[2,5,89],"node_modules/@react-navigation/elements/src/MissingIcon.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useHeaderHeight;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _HeaderHeightContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./HeaderHeightContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useHeaderHeight() {
    var height = React.useContext(_HeaderHeightContext.default);
    if (height === undefined) {
      throw new Error("Couldn't find the header height. Are you inside a screen in a navigator with a header?");
    }
    return height;
  }
},-139,[7,2,-138],"node_modules/@react-navigation/elements/src/Header/useHeaderHeight.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _getNamedContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "../getNamedContext"));
  var HeaderHeightContext = (0, _getNamedContext.default)('HeaderHeightContext', undefined);
  var _default = exports.default = HeaderHeightContext;
},-138,[7,-130],"node_modules/@react-navigation/elements/src/Header/HeaderHeightContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _getNamedContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "../getNamedContext"));
  var HeaderBackContext = (0, _getNamedContext.default)('HeaderBackContext', undefined);
  var _default = exports.default = HeaderBackContext;
},-137,[7,-130],"node_modules/@react-navigation/elements/src/Header/HeaderBackContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0], "react-native/Libraries/Image/AssetRegistry").registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/node_modules/@react-navigation/elements/src/assets",
    "width": 50,
    "height": 85,
    "scales": [1],
    "hash": "5223c8d9b0d08b82a5670fb5f71faf78",
    "name": "back-icon-mask",
    "type": "png"
  });
},-136,[443],"node_modules/@react-navigation/elements/src/assets/back-icon-mask.png");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0], "react-native/Libraries/Image/AssetRegistry").registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/node_modules/@react-navigation/elements/src/assets",
    "width": 96,
    "height": 96,
    "scales": [1],
    "hash": "35ba0eaec5a4f5ed12ca16fabeae451d",
    "name": "back-icon",
    "type": "png"
  });
},-135,[443],"node_modules/@react-navigation/elements/src/assets/back-icon.png");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = PlatformPressable;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/PlatformPressable.tsx";
  var _excluded = ["onPressIn", "onPressOut", "android_ripple", "pressColor", "pressOpacity", "style"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var AnimatedPressable = _reactNative.Animated.createAnimatedComponent(_reactNative.Pressable);
  var ANDROID_VERSION_LOLLIPOP = 21;
  var ANDROID_SUPPORTS_RIPPLE = _reactNative.Platform.OS === 'android' && _reactNative.Platform.Version >= ANDROID_VERSION_LOLLIPOP;

  /**
   * PlatformPressable provides an abstraction on top of Pressable to handle platform differences.
   */
  function PlatformPressable(_ref) {
    var onPressIn = _ref.onPressIn,
      onPressOut = _ref.onPressOut,
      android_ripple = _ref.android_ripple,
      pressColor = _ref.pressColor,
      _ref$pressOpacity = _ref.pressOpacity,
      pressOpacity = _ref$pressOpacity === void 0 ? 0.3 : _ref$pressOpacity,
      style = _ref.style,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var _useTheme = (0, _$$_REQUIRE(_dependencyMap[6], "@react-navigation/native").useTheme)(),
      dark = _useTheme.dark;
    var _React$useState = React.useState(function () {
        return new _reactNative.Animated.Value(1);
      }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      opacity = _React$useState2[0];
    var animateTo = function animateTo(toValue, duration) {
      if (ANDROID_SUPPORTS_RIPPLE) {
        return;
      }
      _reactNative.Animated.timing(opacity, {
        toValue: toValue,
        duration: duration,
        easing: _reactNative.Easing.inOut(_reactNative.Easing.quad),
        useNativeDriver: true
      }).start();
    };
    var handlePressIn = function handlePressIn(e) {
      animateTo(pressOpacity, 0);
      onPressIn == null ? void 0 : onPressIn(e);
    };
    var handlePressOut = function handlePressOut(e) {
      animateTo(1, 200);
      onPressOut == null ? void 0 : onPressOut(e);
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(AnimatedPressable, Object.assign({
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
      android_ripple: ANDROID_SUPPORTS_RIPPLE ? Object.assign({
        color: pressColor !== undefined ? pressColor : dark ? 'rgba(255, 255, 255, .32)' : 'rgba(0, 0, 0, .32)'
      }, android_ripple) : undefined,
      style: [{
        opacity: !ANDROID_SUPPORTS_RIPPLE ? opacity : 1
      }, style]
    }, rest));
  }
},-134,[7,28,151,2,5,89,-18],"node_modules/@react-navigation/elements/src/PlatformPressable.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = MaskedView;
  /**
   * Use a stub for MaskedView on all Platforms that don't support it.
   */

  function MaskedView(_ref) {
    var children = _ref.children;
    return children;
  }
},-133,[],"node_modules/@react-navigation/elements/src/MaskedView.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = HeaderBackButton;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _MaskedView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "../MaskedView"));
  var _PlatformPressable = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "../PlatformPressable"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[6], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/Header/HeaderBackButton.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function HeaderBackButton(_ref) {
    var _this = this;
    var disabled = _ref.disabled,
      allowFontScaling = _ref.allowFontScaling,
      backImage = _ref.backImage,
      label = _ref.label,
      labelStyle = _ref.labelStyle,
      _ref$labelVisible = _ref.labelVisible,
      labelVisible = _ref$labelVisible === void 0 ? _reactNative.Platform.OS === 'ios' : _ref$labelVisible,
      onLabelLayout = _ref.onLabelLayout,
      onPress = _ref.onPress,
      pressColor = _ref.pressColor,
      pressOpacity = _ref.pressOpacity,
      screenLayout = _ref.screenLayout,
      customTintColor = _ref.tintColor,
      titleLayout = _ref.titleLayout,
      _ref$truncatedLabel = _ref.truncatedLabel,
      truncatedLabel = _ref$truncatedLabel === void 0 ? 'Back' : _ref$truncatedLabel,
      _ref$accessibilityLab = _ref.accessibilityLabel,
      accessibilityLabel = _ref$accessibilityLab === void 0 ? label && label !== 'Back' ? label + ", back" : 'Go back' : _ref$accessibilityLab,
      testID = _ref.testID,
      style = _ref.style;
    var _useTheme = (0, _$$_REQUIRE(_dependencyMap[7], "@react-navigation/native").useTheme)(),
      colors = _useTheme.colors;
    var _React$useState = React.useState(undefined),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      initialLabelWidth = _React$useState2[0],
      setInitialLabelWidth = _React$useState2[1];
    var tintColor = customTintColor !== undefined ? customTintColor : _reactNative.Platform.select({
      ios: colors.primary,
      default: colors.text
    });
    var handleLabelLayout = function handleLabelLayout(e) {
      onLabelLayout == null ? void 0 : onLabelLayout(e);
      setInitialLabelWidth(e.nativeEvent.layout.x + e.nativeEvent.layout.width);
    };
    var shouldTruncateLabel = function shouldTruncateLabel() {
      return !label || initialLabelWidth && titleLayout && screenLayout && (screenLayout.width - titleLayout.width) / 2 < initialLabelWidth + 26;
    };
    var renderBackImage = function renderBackImage() {
      if (backImage) {
        return backImage({
          tintColor: tintColor
        });
      } else {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
          style: [styles.icon, Boolean(labelVisible) && styles.iconWithLabel, Boolean(tintColor) && {
            tintColor: tintColor
          }],
          source: _$$_REQUIRE(_dependencyMap[8], "../assets/back-icon.png"),
          fadeDuration: 0
        });
      }
    };
    var renderLabel = function renderLabel() {
      var leftLabelText = shouldTruncateLabel() ? truncatedLabel : label;
      if (!labelVisible || leftLabelText === undefined) {
        return null;
      }
      var labelElement = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: screenLayout ?
        // We make the button extend till the middle of the screen
        // Otherwise it appears to cut off when translating
        [styles.labelWrapper, {
          minWidth: screenLayout.width / 2 - 27
        }] : null,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.Text, {
          accessible: false,
          onLayout:
          // This measurement is used to determine if we should truncate the label when it doesn't fit
          // Only measure it when label is not truncated because we want the measurement of full label
          leftLabelText === label ? handleLabelLayout : undefined,
          style: [styles.label, tintColor ? {
            color: tintColor
          } : null, labelStyle],
          numberOfLines: 1,
          allowFontScaling: !!allowFontScaling,
          children: leftLabelText
        })
      });
      if (backImage || _reactNative.Platform.OS !== 'ios') {
        // When a custom backimage is specified, we can't mask the label
        // Otherwise there might be weird effect due to our mask not being the same as the image
        return labelElement;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MaskedView.default, {
        maskElement: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.iconMaskContainer,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
            source: _$$_REQUIRE(_dependencyMap[9], "../assets/back-icon-mask.png"),
            style: styles.iconMask
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.iconMaskFillerRect
          })]
        }),
        children: labelElement
      });
    };
    var handlePress = function handlePress() {
      return onPress && requestAnimationFrame(onPress);
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PlatformPressable.default, {
      disabled: disabled,
      accessible: true,
      accessibilityRole: "button",
      accessibilityLabel: accessibilityLabel,
      testID: testID,
      onPress: disabled ? undefined : handlePress,
      pressColor: pressColor,
      pressOpacity: pressOpacity,
      android_ripple: androidRipple,
      style: [styles.container, disabled && styles.disabled, style],
      hitSlop: _reactNative.Platform.select({
        ios: undefined,
        default: {
          top: 16,
          right: 16,
          bottom: 16,
          left: 16
        }
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [renderBackImage(), renderLabel()]
      })
    });
  }
  var androidRipple = {
    borderless: true,
    foreground: _reactNative.Platform.OS === 'android' && _reactNative.Platform.Version >= 23,
    radius: 20
  };
  var styles = _reactNative.StyleSheet.create({
    container: Object.assign({
      alignItems: 'center',
      flexDirection: 'row',
      minWidth: _reactNative.StyleSheet.hairlineWidth
    }, _reactNative.Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11
      }
    })),
    disabled: {
      opacity: 0.5
    },
    label: {
      fontSize: 17,
      // Title and back label are a bit different width due to title being bold
      // Adjusting the letterSpacing makes them coincide better
      letterSpacing: 0.35
    },
    labelWrapper: {
      // These styles will make sure that the label doesn't fill the available space
      // Otherwise it messes with the measurement of the label
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    icon: _reactNative.Platform.select({
      ios: {
        height: 21,
        width: 13,
        marginLeft: 8,
        marginRight: 22,
        marginVertical: 12,
        resizeMode: 'contain',
        transform: [{
          scaleX: _reactNative.I18nManager.getConstants().isRTL ? -1 : 1
        }]
      },
      default: {
        height: 24,
        width: 24,
        margin: 3,
        resizeMode: 'contain',
        transform: [{
          scaleX: _reactNative.I18nManager.getConstants().isRTL ? -1 : 1
        }]
      }
    }),
    iconWithLabel: _reactNative.Platform.OS === 'ios' ? {
      marginRight: 6
    } : {},
    iconMaskContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    iconMaskFillerRect: {
      flex: 1,
      backgroundColor: '#000'
    },
    iconMask: {
      height: 21,
      width: 13,
      marginLeft: -14.5,
      marginVertical: 12,
      alignSelf: 'center',
      resizeMode: 'contain',
      transform: [{
        scaleX: _reactNative.I18nManager.getConstants().isRTL ? -1 : 1
      }]
    }
  });
},-132,[7,28,2,5,-133,-134,89,-18,-135,-136],"node_modules/@react-navigation/elements/src/Header/HeaderBackButton.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = HeaderTitle;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/Header/HeaderTitle.tsx";
  var _excluded = ["tintColor", "style"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function HeaderTitle(_ref) {
    var tintColor = _ref.tintColor,
      style = _ref.style,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var _useTheme = (0, _$$_REQUIRE(_dependencyMap[5], "@react-navigation/native").useTheme)(),
      colors = _useTheme.colors;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.Text, Object.assign({
      accessibilityRole: "header",
      "aria-level": "1",
      numberOfLines: 1
    }, rest, {
      style: [styles.title, {
        color: tintColor === undefined ? colors.text : tintColor
      }, style]
    }));
  }
  var styles = _reactNative.StyleSheet.create({
    title: _reactNative.Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '600'
      },
      android: {
        fontSize: 20,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal'
      },
      default: {
        fontSize: 18,
        fontWeight: '500'
      }
    })
  });
},-131,[7,151,2,5,89,-18],"node_modules/@react-navigation/elements/src/Header/HeaderTitle.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getNamedContext;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  var _global$contexts;
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var contexts = '__react_navigation__elements_contexts';
  // We use a global variable to keep our contexts so that we can reuse same contexts across packages
  global[contexts] = (_global$contexts = global[contexts]) != null ? _global$contexts : new Map();
  function getNamedContext(name, initialValue) {
    var context = global[contexts].get(name);
    if (context) {
      return context;
    }
    context = React.createContext(initialValue);
    context.displayName = name;
    global[contexts].set(name, context);
    return context;
  }
},-130,[2],"node_modules/@react-navigation/elements/src/getNamedContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _getNamedContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "../getNamedContext"));
  var HeaderShownContext = (0, _getNamedContext.default)('HeaderShownContext', false);
  var _default = exports.default = HeaderShownContext;
},-129,[7,-130],"node_modules/@react-navigation/elements/src/Header/HeaderShownContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = HeaderBackground;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/Header/HeaderBackground.tsx";
  var _excluded = ["style"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function HeaderBackground(_ref) {
    var style = _ref.style,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var _useTheme = (0, _$$_REQUIRE(_dependencyMap[5], "@react-navigation/native").useTheme)(),
      colors = _useTheme.colors;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, Object.assign({
      style: [styles.container, {
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
        shadowColor: colors.border
      }, style]
    }, rest));
  }
  var styles = _reactNative.StyleSheet.create({
    container: Object.assign({
      flex: 1
    }, _reactNative.Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowOpacity: 0.85,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: _reactNative.StyleSheet.hairlineWidth
        }
      },
      default: {
        borderBottomWidth: _reactNative.StyleSheet.hairlineWidth
      }
    }))
  });
},-128,[7,151,2,5,89,-18],"node_modules/@react-navigation/elements/src/Header/HeaderBackground.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Header;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _getDefaultHeaderHeight = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./getDefaultHeaderHeight"));
  var _HeaderBackground = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./HeaderBackground"));
  var _HeaderShownContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./HeaderShownContext"));
  var _HeaderTitle = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./HeaderTitle"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/Header/Header.tsx";
  var _excluded = ["height", "minHeight", "maxHeight", "backgroundColor", "borderBottomColor", "borderBottomEndRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStartRadius", "borderBottomWidth", "borderColor", "borderEndColor", "borderEndWidth", "borderLeftColor", "borderLeftWidth", "borderRadius", "borderRightColor", "borderRightWidth", "borderStartColor", "borderStartWidth", "borderStyle", "borderTopColor", "borderTopEndRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderTopStartRadius", "borderTopWidth", "borderWidth", "boxShadow", "elevation", "shadowColor", "shadowOffset", "shadowOpacity", "shadowRadius", "opacity", "transform"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var warnIfHeaderStylesDefined = function warnIfHeaderStylesDefined(styles) {
    Object.keys(styles).forEach(function (styleProp) {
      var value = styles[styleProp];
      if (styleProp === 'position' && value === 'absolute') {
        console.warn("position: 'absolute' is not supported on headerStyle. If you would like to render content under the header, use the 'headerTransparent' option.");
      } else if (value !== undefined) {
        console.warn(styleProp + " was given a value of " + value + ", this has no effect on headerStyle.");
      }
    });
  };
  function Header(props) {
    var _this = this;
    var insets = (0, _$$_REQUIRE(_dependencyMap[9], "react-native-safe-area-context").useSafeAreaInsets)();
    var frame = (0, _$$_REQUIRE(_dependencyMap[9], "react-native-safe-area-context").useSafeAreaFrame)();
    var isParentHeaderShown = React.useContext(_HeaderShownContext.default);

    // On models with Dynamic Island the status bar height is smaller than the safe area top inset.
    var hasDynamicIsland = _reactNative.Platform.OS === 'ios' && insets.top > 50;
    var statusBarHeight = hasDynamicIsland ? insets.top - 5 : insets.top;
    var _props$layout = props.layout,
      layout = _props$layout === void 0 ? frame : _props$layout,
      _props$modal = props.modal,
      modal = _props$modal === void 0 ? false : _props$modal,
      title = props.title,
      customTitle = props.headerTitle,
      _props$headerTitleAli = props.headerTitleAlign,
      headerTitleAlign = _props$headerTitleAli === void 0 ? _reactNative.Platform.select({
        ios: 'center',
        default: 'left'
      }) : _props$headerTitleAli,
      headerLeft = props.headerLeft,
      headerLeftLabelVisible = props.headerLeftLabelVisible,
      headerTransparent = props.headerTransparent,
      headerTintColor = props.headerTintColor,
      headerBackground = props.headerBackground,
      headerRight = props.headerRight,
      titleAllowFontScaling = props.headerTitleAllowFontScaling,
      titleStyle = props.headerTitleStyle,
      leftContainerStyle = props.headerLeftContainerStyle,
      rightContainerStyle = props.headerRightContainerStyle,
      titleContainerStyle = props.headerTitleContainerStyle,
      backgroundContainerStyle = props.headerBackgroundContainerStyle,
      customHeaderStyle = props.headerStyle,
      headerShadowVisible = props.headerShadowVisible,
      headerPressColor = props.headerPressColor,
      headerPressOpacity = props.headerPressOpacity,
      _props$headerStatusBa = props.headerStatusBarHeight,
      headerStatusBarHeight = _props$headerStatusBa === void 0 ? isParentHeaderShown ? 0 : statusBarHeight : _props$headerStatusBa;
    var defaultHeight = (0, _getDefaultHeaderHeight.default)(layout, modal, headerStatusBarHeight);
    var _ref = _reactNative.StyleSheet.flatten(customHeaderStyle || {}),
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? defaultHeight : _ref$height,
      minHeight = _ref.minHeight,
      maxHeight = _ref.maxHeight,
      backgroundColor = _ref.backgroundColor,
      borderBottomColor = _ref.borderBottomColor,
      borderBottomEndRadius = _ref.borderBottomEndRadius,
      borderBottomLeftRadius = _ref.borderBottomLeftRadius,
      borderBottomRightRadius = _ref.borderBottomRightRadius,
      borderBottomStartRadius = _ref.borderBottomStartRadius,
      borderBottomWidth = _ref.borderBottomWidth,
      borderColor = _ref.borderColor,
      borderEndColor = _ref.borderEndColor,
      borderEndWidth = _ref.borderEndWidth,
      borderLeftColor = _ref.borderLeftColor,
      borderLeftWidth = _ref.borderLeftWidth,
      borderRadius = _ref.borderRadius,
      borderRightColor = _ref.borderRightColor,
      borderRightWidth = _ref.borderRightWidth,
      borderStartColor = _ref.borderStartColor,
      borderStartWidth = _ref.borderStartWidth,
      borderStyle = _ref.borderStyle,
      borderTopColor = _ref.borderTopColor,
      borderTopEndRadius = _ref.borderTopEndRadius,
      borderTopLeftRadius = _ref.borderTopLeftRadius,
      borderTopRightRadius = _ref.borderTopRightRadius,
      borderTopStartRadius = _ref.borderTopStartRadius,
      borderTopWidth = _ref.borderTopWidth,
      borderWidth = _ref.borderWidth,
      boxShadow = _ref.boxShadow,
      elevation = _ref.elevation,
      shadowColor = _ref.shadowColor,
      shadowOffset = _ref.shadowOffset,
      shadowOpacity = _ref.shadowOpacity,
      shadowRadius = _ref.shadowRadius,
      opacity = _ref.opacity,
      transform = _ref.transform,
      unsafeStyles = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    if (process.env.NODE_ENV !== 'production') {
      warnIfHeaderStylesDefined(unsafeStyles);
    }
    var safeStyles = {
      backgroundColor: backgroundColor,
      borderBottomColor: borderBottomColor,
      borderBottomEndRadius: borderBottomEndRadius,
      borderBottomLeftRadius: borderBottomLeftRadius,
      borderBottomRightRadius: borderBottomRightRadius,
      borderBottomStartRadius: borderBottomStartRadius,
      borderBottomWidth: borderBottomWidth,
      borderColor: borderColor,
      borderEndColor: borderEndColor,
      borderEndWidth: borderEndWidth,
      borderLeftColor: borderLeftColor,
      borderLeftWidth: borderLeftWidth,
      borderRadius: borderRadius,
      borderRightColor: borderRightColor,
      borderRightWidth: borderRightWidth,
      borderStartColor: borderStartColor,
      borderStartWidth: borderStartWidth,
      borderStyle: borderStyle,
      borderTopColor: borderTopColor,
      borderTopEndRadius: borderTopEndRadius,
      borderTopLeftRadius: borderTopLeftRadius,
      borderTopRightRadius: borderTopRightRadius,
      borderTopStartRadius: borderTopStartRadius,
      borderTopWidth: borderTopWidth,
      borderWidth: borderWidth,
      // @ts-expect-error: boxShadow is only for Web
      boxShadow: boxShadow,
      elevation: elevation,
      shadowColor: shadowColor,
      shadowOffset: shadowOffset,
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
      opacity: opacity,
      transform: transform
    };

    // Setting a property to undefined triggers default style
    // So we need to filter them out
    // Users can use `null` instead
    for (var styleProp in safeStyles) {
      // @ts-expect-error: typescript wrongly complains that styleProp cannot be used to index safeStyles
      if (safeStyles[styleProp] === undefined) {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete safeStyles[styleProp];
      }
    }
    var backgroundStyle = [safeStyles, headerShadowVisible === false && {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }];
    var leftButton = headerLeft ? headerLeft({
      tintColor: headerTintColor,
      pressColor: headerPressColor,
      pressOpacity: headerPressOpacity,
      labelVisible: headerLeftLabelVisible
    }) : null;
    var rightButton = headerRight ? headerRight({
      tintColor: headerTintColor,
      pressColor: headerPressColor,
      pressOpacity: headerPressOpacity
    }) : null;
    var headerTitle = typeof customTitle !== 'function' ? function (props) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderTitle.default, Object.assign({}, props));
    } : customTitle;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
        pointerEvents: "box-none",
        style: [_reactNative.StyleSheet.absoluteFill, {
          zIndex: 0
        }, backgroundContainerStyle],
        children: headerBackground ? headerBackground({
          style: backgroundStyle
        }) : headerTransparent ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderBackground.default, {
          style: backgroundStyle
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
        pointerEvents: "box-none",
        style: [{
          height: height,
          minHeight: minHeight,
          maxHeight: maxHeight,
          opacity: opacity,
          transform: transform
        }],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          pointerEvents: "none",
          style: {
            height: headerStatusBarHeight
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          pointerEvents: "box-none",
          style: styles.content,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
            pointerEvents: "box-none",
            style: [styles.left, headerTitleAlign === 'center' && styles.expand, {
              marginStart: insets.left
            }, leftContainerStyle],
            children: leftButton
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
            pointerEvents: "box-none",
            style: [styles.title, {
              // Avoid the title from going offscreen or overlapping buttons
              maxWidth: headerTitleAlign === 'center' ? layout.width - ((leftButton ? headerLeftLabelVisible !== false ? 80 : 32 : 16) + Math.max(insets.left, insets.right)) * 2 : layout.width - ((leftButton ? 72 : 16) + (rightButton ? 72 : 16) + insets.left - insets.right)
            }, titleContainerStyle],
            children: headerTitle({
              children: title,
              allowFontScaling: titleAllowFontScaling,
              tintColor: headerTintColor,
              style: titleStyle
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
            pointerEvents: "box-none",
            style: [styles.right, styles.expand, {
              marginEnd: insets.right
            }, rightContainerStyle],
            children: rightButton
          })]
        })]
      })]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    title: {
      marginHorizontal: 16,
      justifyContent: 'center'
    },
    left: {
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    right: {
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    expand: {
      flexGrow: 1,
      flexBasis: 0
    }
  });
},-127,[7,151,2,5,-125,-128,-129,-131,89,-114],"node_modules/@react-navigation/elements/src/Header/Header.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getHeaderTitle;
  function getHeaderTitle(options, fallback) {
    return typeof options.headerTitle === 'string' ? options.headerTitle : options.title !== undefined ? options.title : fallback;
  }
},-126,[],"node_modules/@react-navigation/elements/src/Header/getHeaderTitle.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getDefaultHeaderHeight;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0], "react-native");
  function getDefaultHeaderHeight(layout, modalPresentation, statusBarHeight) {
    var headerHeight;
    var isLandscape = layout.width > layout.height;
    if (_reactNative.Platform.OS === 'ios') {
      if (_reactNative.Platform.isPad || _reactNative.Platform.isTV) {
        if (modalPresentation) {
          headerHeight = 56;
        } else {
          headerHeight = 50;
        }
      } else {
        if (isLandscape) {
          headerHeight = 32;
        } else {
          if (modalPresentation) {
            headerHeight = 56;
          } else {
            headerHeight = 44;
          }
        }
      }
    } else if (_reactNative.Platform.OS === 'android') {
      headerHeight = 56;
    } else {
      headerHeight = 64;
    }
    return headerHeight + statusBarHeight;
  }
},-125,[5],"node_modules/@react-navigation/elements/src/Header/getDefaultHeaderHeight.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Background;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/elements/src/Background.tsx";
  var _excluded = ["style"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function Background(_ref) {
    var style = _ref.style,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var _useTheme = (0, _$$_REQUIRE(_dependencyMap[5], "@react-navigation/native").useTheme)(),
      colors = _useTheme.colors;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, Object.assign({}, rest, {
      style: [{
        flex: 1,
        backgroundColor: colors.background
      }, style]
    }));
  }
},-124,[7,151,2,5,89,-18],"node_modules/@react-navigation/elements/src/Background.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    Assets: true,
    Background: true,
    getDefaultHeaderHeight: true,
    getHeaderTitle: true,
    Header: true,
    HeaderBackButton: true,
    HeaderBackContext: true,
    HeaderBackground: true,
    HeaderHeightContext: true,
    HeaderShownContext: true,
    HeaderTitle: true,
    useHeaderHeight: true,
    MissingIcon: true,
    PlatformPressable: true,
    ResourceSavingView: true,
    SafeAreaProviderCompat: true,
    Screen: true
  };
  exports.Assets = void 0;
  Object.defineProperty(exports, "Background", {
    enumerable: true,
    get: function get() {
      return _Background.default;
    }
  });
  Object.defineProperty(exports, "Header", {
    enumerable: true,
    get: function get() {
      return _Header.default;
    }
  });
  Object.defineProperty(exports, "HeaderBackButton", {
    enumerable: true,
    get: function get() {
      return _HeaderBackButton.default;
    }
  });
  Object.defineProperty(exports, "HeaderBackContext", {
    enumerable: true,
    get: function get() {
      return _HeaderBackContext.default;
    }
  });
  Object.defineProperty(exports, "HeaderBackground", {
    enumerable: true,
    get: function get() {
      return _HeaderBackground.default;
    }
  });
  Object.defineProperty(exports, "HeaderHeightContext", {
    enumerable: true,
    get: function get() {
      return _HeaderHeightContext.default;
    }
  });
  Object.defineProperty(exports, "HeaderShownContext", {
    enumerable: true,
    get: function get() {
      return _HeaderShownContext.default;
    }
  });
  Object.defineProperty(exports, "HeaderTitle", {
    enumerable: true,
    get: function get() {
      return _HeaderTitle.default;
    }
  });
  Object.defineProperty(exports, "MissingIcon", {
    enumerable: true,
    get: function get() {
      return _MissingIcon.default;
    }
  });
  Object.defineProperty(exports, "PlatformPressable", {
    enumerable: true,
    get: function get() {
      return _PlatformPressable.default;
    }
  });
  Object.defineProperty(exports, "ResourceSavingView", {
    enumerable: true,
    get: function get() {
      return _ResourceSavingView.default;
    }
  });
  Object.defineProperty(exports, "SafeAreaProviderCompat", {
    enumerable: true,
    get: function get() {
      return _SafeAreaProviderCompat.default;
    }
  });
  Object.defineProperty(exports, "Screen", {
    enumerable: true,
    get: function get() {
      return _Screen.default;
    }
  });
  Object.defineProperty(exports, "getDefaultHeaderHeight", {
    enumerable: true,
    get: function get() {
      return _getDefaultHeaderHeight.default;
    }
  });
  Object.defineProperty(exports, "getHeaderTitle", {
    enumerable: true,
    get: function get() {
      return _getHeaderTitle.default;
    }
  });
  Object.defineProperty(exports, "useHeaderHeight", {
    enumerable: true,
    get: function get() {
      return _useHeaderHeight.default;
    }
  });
  var _Background = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./Background"));
  var _getDefaultHeaderHeight = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./Header/getDefaultHeaderHeight"));
  var _getHeaderTitle = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./Header/getHeaderTitle"));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./Header/Header"));
  var _HeaderBackButton = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./Header/HeaderBackButton"));
  var _HeaderBackContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./Header/HeaderBackContext"));
  var _HeaderBackground = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./Header/HeaderBackground"));
  var _HeaderHeightContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./Header/HeaderHeightContext"));
  var _HeaderShownContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9], "./Header/HeaderShownContext"));
  var _HeaderTitle = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./Header/HeaderTitle"));
  var _useHeaderHeight = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11], "./Header/useHeaderHeight"));
  var _MissingIcon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12], "./MissingIcon"));
  var _PlatformPressable = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13], "./PlatformPressable"));
  var _ResourceSavingView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14], "./ResourceSavingView"));
  var _SafeAreaProviderCompat = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15], "./SafeAreaProviderCompat"));
  var _Screen = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16], "./Screen"));
  Object.keys(_$$_REQUIRE(_dependencyMap[17], "./types")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[17], "./types")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[17], "./types")[key];
      }
    });
  });
  var Assets = exports.Assets = [
  // eslint-disable-next-line import/no-commonjs
  _$$_REQUIRE(_dependencyMap[18], "./assets/back-icon.png"),
  // eslint-disable-next-line import/no-commonjs
  _$$_REQUIRE(_dependencyMap[19], "./assets/back-icon-mask.png")];
},-123,[7,-124,-125,-126,-127,-132,-137,-128,-138,-129,-131,-139,-140,-134,-141,-142,-143,-144,-135,-136],"node_modules/@react-navigation/elements/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
},-122,[],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/node_modules/react-native-safe-area-context/src/SafeArea.types.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0], "react-native");
  var _default = exports.default = _reactNative.TurboModuleRegistry.get('RNCSafeAreaContext');
},-121,[5],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/node_modules/react-native-safe-area-context/src/specs/NativeSafeAreaContext.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialWindowSafeAreaInsets = exports.initialWindowMetrics = void 0;
  var _NativeSafeAreaContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./specs/NativeSafeAreaContext"));
  var _NativeSafeAreaContex, _NativeSafeAreaContex2;
  var initialWindowMetrics = exports.initialWindowMetrics = (_NativeSafeAreaContex = _NativeSafeAreaContext.default == null ? void 0 : _NativeSafeAreaContext.default.getConstants == null ? void 0 : (_NativeSafeAreaContex2 = _NativeSafeAreaContext.default.getConstants()) == null ? void 0 : _NativeSafeAreaContex2.initialWindowMetrics) != null ? _NativeSafeAreaContex : null;

  /**
   * @deprecated
   */
  var initialWindowSafeAreaInsets = exports.initialWindowSafeAreaInsets = initialWindowMetrics == null ? void 0 : initialWindowMetrics.insets;
},-120,[7,-121],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/node_modules/react-native-safe-area-context/src/InitialWindow.native.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNCSafeAreaView', {
    interfaceOnly: true
  });
},-119,[7,270],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/src/specs/NativeSafeAreaView.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SafeAreaView = void 0;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var React = _react;
  var _NativeSafeAreaView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./specs/NativeSafeAreaView"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5], "react/jsx-runtime");
  var _excluded = ["edges"];
  var _this = this,
    _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-native-oh-tpl/react-native-safe-area-context/src/SafeAreaView.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var defaultEdges = {
    top: 'additive',
    left: 'additive',
    bottom: 'additive',
    right: 'additive'
  };
  var isOnChange = false;
  var realTop = 0;
  var realLeft = 0;
  var realBottom = 0;
  var realRight = 0;
  var safeAreaTop = 0;
  var safeAreaLeft = 0;
  var safeAreaBottom = 0;
  var safeAreaRight = 0;
  function getEdgeValue(edgeMode, insetValue, edgeValue) {
    if (edgeMode === 'off') {
      return edgeValue;
    } else if (edgeMode === 'maximum') {
      return Math.max(insetValue, edgeValue);
    } else {
      return insetValue + edgeValue;
    }
  }
  var SafeAreaView = exports.SafeAreaView = React.forwardRef(function (_ref, ref) {
    var edges = _ref.edges,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var nativeEdges = (0, _react.useMemo)(function () {
      var _edgesObj$top, _edgesObj$right, _edgesObj$bottom, _edgesObj$left;
      if (edges == null) {
        return defaultEdges;
      }
      var edgesObj = Array.isArray(edges) ? edges.reduce(function (acc, edge) {
        acc[edge] = 'additive';
        return acc;
      }, {}) :
      // ts has trouble with refining readonly arrays.
      edges;

      // make sure that we always pass all edges, required for fabric
      var requiredEdges = {
        top: (_edgesObj$top = edgesObj.top) != null ? _edgesObj$top : 'off',
        right: (_edgesObj$right = edgesObj.right) != null ? _edgesObj$right : 'off',
        bottom: (_edgesObj$bottom = edgesObj.bottom) != null ? _edgesObj$bottom : 'off',
        left: (_edgesObj$left = edgesObj.left) != null ? _edgesObj$left : 'off'
      };
      return requiredEdges;
    }, [edges]);
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isFirstRefresh = _useState2[0],
      setIsFirstRefresh = _useState2[1];
    var safeAreaStyle = [props.style];
    var rawPadding = 0;
    var rawMargin = 0;
    var rawPaddingTop = undefined;
    var rawPaddingLeft = undefined;
    var rawPaddingBottom = undefined;
    var rawPaddingRight = undefined;
    var rawMarginTop = undefined;
    var rawMarginLeft = undefined;
    var rawMarginBottom = undefined;
    var rawMarginRight = undefined;
    var safeAreaChange = function safeAreaChange(e) {
      var _e$nativeEvent$safeAr, _e$nativeEvent$safeAr3, _e$nativeEvent$safeAr5, _e$nativeEvent$safeAr7;
      if ((_e$nativeEvent$safeAr = e.nativeEvent.safeAreaViewInsetsValue) != null && _e$nativeEvent$safeAr.top) {
        var _e$nativeEvent$safeAr2;
        safeAreaTop = (_e$nativeEvent$safeAr2 = e.nativeEvent.safeAreaViewInsetsValue) == null ? void 0 : _e$nativeEvent$safeAr2.top;
      }
      if ((_e$nativeEvent$safeAr3 = e.nativeEvent.safeAreaViewInsetsValue) != null && _e$nativeEvent$safeAr3.right) {
        var _e$nativeEvent$safeAr4;
        safeAreaRight = (_e$nativeEvent$safeAr4 = e.nativeEvent.safeAreaViewInsetsValue) == null ? void 0 : _e$nativeEvent$safeAr4.right;
      }
      if ((_e$nativeEvent$safeAr5 = e.nativeEvent.safeAreaViewInsetsValue) != null && _e$nativeEvent$safeAr5.bottom) {
        var _e$nativeEvent$safeAr6;
        safeAreaBottom = (_e$nativeEvent$safeAr6 = e.nativeEvent.safeAreaViewInsetsValue) == null ? void 0 : _e$nativeEvent$safeAr6.bottom;
      }
      if ((_e$nativeEvent$safeAr7 = e.nativeEvent.safeAreaViewInsetsValue) != null && _e$nativeEvent$safeAr7.left) {
        var _e$nativeEvent$safeAr8;
        safeAreaLeft = (_e$nativeEvent$safeAr8 = e.nativeEvent.safeAreaViewInsetsValue) == null ? void 0 : _e$nativeEvent$safeAr8.left;
      }
      if (!isOnChange) {
        setIsFirstRefresh(true);
      }
      isOnChange = true;
    };
    var rawProp = props.style;
    var i;
    if (rawProp && rawProp.length > 0) {
      for (i = 0; i < rawProp.length; i++) {
        var _rawProp$i, _rawProp$i3, _rawProp$i5, _rawProp$i7, _rawProp$i9, _rawProp$i1, _rawProp$i11, _rawProp$i13, _rawProp$i15, _rawProp$i17;
        if ((_rawProp$i = rawProp[i]) != null && _rawProp$i.padding) {
          var _rawProp$i2;
          rawPadding = (_rawProp$i2 = rawProp[i]) == null ? void 0 : _rawProp$i2.padding;
        }
        if ((_rawProp$i3 = rawProp[i]) != null && _rawProp$i3.margin) {
          var _rawProp$i4;
          rawMargin = (_rawProp$i4 = rawProp[i]) == null ? void 0 : _rawProp$i4.margin;
        }
        if ((_rawProp$i5 = rawProp[i]) != null && _rawProp$i5.paddingTop) {
          var _rawProp$i6;
          rawPaddingTop = (_rawProp$i6 = rawProp[i]) == null ? void 0 : _rawProp$i6.paddingTop;
        }
        if ((_rawProp$i7 = rawProp[i]) != null && _rawProp$i7.paddingLeft) {
          var _rawProp$i8;
          rawPaddingLeft = (_rawProp$i8 = rawProp[i]) == null ? void 0 : _rawProp$i8.paddingLeft;
        }
        if ((_rawProp$i9 = rawProp[i]) != null && _rawProp$i9.paddingRight) {
          var _rawProp$i0;
          rawPaddingRight = (_rawProp$i0 = rawProp[i]) == null ? void 0 : _rawProp$i0.paddingRight;
        }
        if ((_rawProp$i1 = rawProp[i]) != null && _rawProp$i1.paddingBottom) {
          var _rawProp$i10;
          rawPaddingBottom = (_rawProp$i10 = rawProp[i]) == null ? void 0 : _rawProp$i10.paddingBottom;
        }
        if ((_rawProp$i11 = rawProp[i]) != null && _rawProp$i11.marginTop) {
          var _rawProp$i12;
          rawMarginTop = (_rawProp$i12 = rawProp[i]) == null ? void 0 : _rawProp$i12.marginTop;
        }
        if ((_rawProp$i13 = rawProp[i]) != null && _rawProp$i13.marginLeft) {
          var _rawProp$i14;
          rawMarginLeft = (_rawProp$i14 = rawProp[i]) == null ? void 0 : _rawProp$i14.marginLeft;
        }
        if ((_rawProp$i15 = rawProp[i]) != null && _rawProp$i15.marginRight) {
          var _rawProp$i16;
          rawMarginRight = (_rawProp$i16 = rawProp[i]) == null ? void 0 : _rawProp$i16.marginRight;
        }
        if ((_rawProp$i17 = rawProp[i]) != null && _rawProp$i17.marginBottom) {
          var _rawProp$i18;
          rawMarginBottom = (_rawProp$i18 = rawProp[i]) == null ? void 0 : _rawProp$i18.marginBottom;
        }
      }
    }
    if (!rawPaddingTop) {
      rawPaddingTop = rawPadding;
    }
    if (!rawPaddingLeft) {
      rawPaddingLeft = rawPadding;
    }
    if (!rawPaddingRight) {
      rawPaddingRight = rawPadding;
    }
    if (!rawPaddingBottom) {
      rawPaddingBottom = rawPadding;
    }
    if (!rawMarginTop) {
      rawMarginTop = rawMargin;
    }
    if (!rawMarginLeft) {
      rawMarginLeft = rawMargin;
    }
    if (!rawMarginRight) {
      rawMarginRight = rawMargin;
    }
    if (!rawMarginBottom) {
      rawMarginBottom = rawMargin;
    }
    if (isOnChange) {
      if (props.mode === 'margin') {
        realTop = getEdgeValue(nativeEdges.top, safeAreaTop, rawMarginTop);
        realLeft = getEdgeValue(nativeEdges.left, safeAreaLeft, rawMarginLeft);
        realBottom = getEdgeValue(nativeEdges.bottom, safeAreaBottom, rawMarginBottom);
        realRight = getEdgeValue(nativeEdges.right, safeAreaRight, rawMarginRight);
        safeAreaStyle = [props.style, {
          marginTop: realTop,
          marginLeft: realLeft,
          marginBottom: realBottom,
          marginRight: realRight
        }];
      } else {
        realTop = getEdgeValue(nativeEdges.top, safeAreaTop, rawPaddingTop);
        realLeft = getEdgeValue(nativeEdges.left, safeAreaLeft, rawPaddingLeft);
        realBottom = getEdgeValue(nativeEdges.bottom, safeAreaBottom, rawPaddingBottom);
        realRight = getEdgeValue(nativeEdges.right, safeAreaRight, rawPaddingRight);
        safeAreaStyle = [props.style, {
          paddingTop: realTop,
          paddingLeft: realLeft,
          paddingBottom: realBottom,
          paddingRight: realRight
        }];
      }
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NativeSafeAreaView.default, Object.assign({}, props, {
      style: safeAreaStyle,
      edges: nativeEdges,
      isFirstRefresh: isFirstRefresh,
      onSafeAreaValueChange: safeAreaChange,
      ref: ref
    }));
  });
},-118,[7,28,151,2,-119,89],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/src/SafeAreaView.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react-native/Libraries/Utilities/codegenNativeComponent"));
  var _default = exports.default = (0, _codegenNativeComponent.default)('RNCSafeAreaProvider');
},-117,[7,270],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/node_modules/react-native-safe-area-context/src/specs/NativeSafeAreaProvider.ts");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "NativeSafeAreaProvider", {
    enumerable: true,
    get: function get() {
      return _NativeSafeAreaProvider.default;
    }
  });
  var _NativeSafeAreaProvider = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./specs/NativeSafeAreaProvider"));
},-116,[7,-117],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/node_modules/react-native-safe-area-context/src/NativeSafeAreaProvider.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SafeAreaInsetsContext = exports.SafeAreaFrameContext = exports.SafeAreaContext = exports.SafeAreaConsumer = void 0;
  exports.SafeAreaProvider = SafeAreaProvider;
  exports.useSafeArea = useSafeArea;
  exports.useSafeAreaFrame = useSafeAreaFrame;
  exports.useSafeAreaInsets = useSafeAreaInsets;
  exports.withSafeAreaInsets = withSafeAreaInsets;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-native-oh-tpl/react-native-safe-area-context/node_modules/react-native-safe-area-context/src/SafeAreaContext.tsx";
  var _excluded = ["children", "initialMetrics", "initialSafeAreaInsets", "style"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var isDev = process.env.NODE_ENV !== 'production';
  var SafeAreaInsetsContext = exports.SafeAreaInsetsContext = React.createContext(null);
  if (isDev) {
    SafeAreaInsetsContext.displayName = 'SafeAreaInsetsContext';
  }
  var SafeAreaFrameContext = exports.SafeAreaFrameContext = React.createContext(null);
  if (isDev) {
    SafeAreaFrameContext.displayName = 'SafeAreaFrameContext';
  }
  function SafeAreaProvider(_ref) {
    var _ref2, _ref3, _initialMetrics$inset, _ref4, _initialMetrics$frame;
    var children = _ref.children,
      initialMetrics = _ref.initialMetrics,
      initialSafeAreaInsets = _ref.initialSafeAreaInsets,
      style = _ref.style,
      others = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var parentInsets = useParentSafeAreaInsets();
    var parentFrame = useParentSafeAreaFrame();
    var _React$useState = React.useState((_ref2 = (_ref3 = (_initialMetrics$inset = initialMetrics == null ? void 0 : initialMetrics.insets) != null ? _initialMetrics$inset : initialSafeAreaInsets) != null ? _ref3 : parentInsets) != null ? _ref2 : null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      insets = _React$useState2[0],
      setInsets = _React$useState2[1];
    var _React$useState3 = React.useState((_ref4 = (_initialMetrics$frame = initialMetrics == null ? void 0 : initialMetrics.frame) != null ? _initialMetrics$frame : parentFrame) != null ? _ref4 : {
        // Backwards compat so we render anyway if we don't have frame.
        x: 0,
        y: 0,
        width: _reactNative.Dimensions.get('window').width,
        height: _reactNative.Dimensions.get('window').height
      }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      frame = _React$useState4[0],
      setFrame = _React$useState4[1];
    var onInsetsChange = React.useCallback(function (event) {
      var _event$nativeEvent = event.nativeEvent,
        nextFrame = _event$nativeEvent.frame,
        nextInsets = _event$nativeEvent.insets;
      setFrame(function (frame) {
        if (
        // Backwards compat with old native code that won't send frame.
        nextFrame && (nextFrame.height !== frame.height || nextFrame.width !== frame.width || nextFrame.x !== frame.x || nextFrame.y !== frame.y)) {
          return nextFrame;
        } else {
          return frame;
        }
      });
      setInsets(function (insets) {
        if (!insets || nextInsets.bottom !== insets.bottom || nextInsets.left !== insets.left || nextInsets.right !== insets.right || nextInsets.top !== insets.top) {
          return nextInsets;
        } else {
          return insets;
        }
      });
    }, []);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[6], "./NativeSafeAreaProvider").NativeSafeAreaProvider, Object.assign({
      style: _reactNative.StyleSheet.compose(styles.fill, style),
      onInsetsChange: onInsetsChange
    }, others, {
      children: insets != null ? /*#__PURE__*/(0, _jsxRuntime.jsx)(SafeAreaFrameContext.Provider, {
        value: frame,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SafeAreaInsetsContext.Provider, {
          value: insets,
          children: children
        })
      }) : null
    }));
  }
  var styles = _reactNative.StyleSheet.create({
    fill: {
      flex: 1
    }
  });
  function useParentSafeAreaInsets() {
    return React.useContext(SafeAreaInsetsContext);
  }
  function useParentSafeAreaFrame() {
    return React.useContext(SafeAreaFrameContext);
  }
  var NO_INSETS_ERROR = 'No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.';
  function useSafeAreaInsets() {
    var insets = React.useContext(SafeAreaInsetsContext);
    if (insets == null) {
      throw new Error(NO_INSETS_ERROR);
    }
    return insets;
  }
  function useSafeAreaFrame() {
    var frame = React.useContext(SafeAreaFrameContext);
    if (frame == null) {
      throw new Error(NO_INSETS_ERROR);
    }
    return frame;
  }
  function withSafeAreaInsets(WrappedComponent) {
    var _this = this;
    return React.forwardRef(function (props, ref) {
      var insets = useSafeAreaInsets();
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, Object.assign({}, props, {
        insets: insets,
        ref: ref
      }));
    });
  }

  /**
   * @deprecated
   */
  function useSafeArea() {
    return useSafeAreaInsets();
  }

  /**
   * @deprecated
   */
  var SafeAreaConsumer = exports.SafeAreaConsumer = SafeAreaInsetsContext.Consumer;

  /**
   * @deprecated
   */
  var SafeAreaContext = exports.SafeAreaContext = SafeAreaInsetsContext;
},-115,[7,28,151,2,5,89,-116],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/node_modules/react-native-safe-area-context/src/SafeAreaContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_$$_REQUIRE(_dependencyMap[0], "react-native-safe-area-context/src/SafeAreaContext")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[0], "react-native-safe-area-context/src/SafeAreaContext")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[0], "react-native-safe-area-context/src/SafeAreaContext")[key];
      }
    });
  });
  Object.keys(_$$_REQUIRE(_dependencyMap[1], "./SafeAreaView")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[1], "./SafeAreaView")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[1], "./SafeAreaView")[key];
      }
    });
  });
  Object.keys(_$$_REQUIRE(_dependencyMap[2], "react-native-safe-area-context/src//InitialWindow")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[2], "react-native-safe-area-context/src//InitialWindow")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[2], "react-native-safe-area-context/src//InitialWindow")[key];
      }
    });
  });
  Object.keys(_$$_REQUIRE(_dependencyMap[3], "react-native-safe-area-context/src//SafeArea.types")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[3], "react-native-safe-area-context/src//SafeArea.types")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[3], "react-native-safe-area-context/src//SafeArea.types")[key];
      }
    });
  });
},-114,[-115,-118,-120,-122],"node_modules/@react-native-oh-tpl/react-native-safe-area-context/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useScrollToTop;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function getScrollableNode(ref) {
    if (ref.current == null) {
      return null;
    }
    if ('scrollToTop' in ref.current || 'scrollTo' in ref.current || 'scrollToOffset' in ref.current || 'scrollResponderScrollTo' in ref.current) {
      // This is already a scrollable node.
      return ref.current;
    } else if ('getScrollResponder' in ref.current) {
      // If the view is a wrapper like FlatList, SectionList etc.
      // We need to use `getScrollResponder` to get access to the scroll responder
      return ref.current.getScrollResponder();
    } else if ('getNode' in ref.current) {
      // When a `ScrollView` is wraped in `Animated.createAnimatedComponent`
      // we need to use `getNode` to get the ref to the actual scrollview.
      // Note that `getNode` is deprecated in newer versions of react-native
      // this is why we check if we already have a scrollable node above.
      return ref.current.getNode();
    } else {
      return ref.current;
    }
  }
  function useScrollToTop(ref) {
    var navigation = React.useContext(_$$_REQUIRE(_dependencyMap[1], "@react-navigation/core").NavigationContext);
    var route = (0, _$$_REQUIRE(_dependencyMap[1], "@react-navigation/core").useRoute)();
    if (navigation === undefined) {
      throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
    }
    React.useEffect(function () {
      var tabNavigations = [];
      var currentNavigation = navigation;
      // If the screen is nested inside multiple tab navigators, we should scroll to top for any of them
      // So we need to find all the parent tab navigators and add the listeners there
      while (currentNavigation) {
        if (currentNavigation.getState().type === 'tab') {
          tabNavigations.push(currentNavigation);
        }
        currentNavigation = currentNavigation.getParent();
      }
      if (tabNavigations.length === 0) {
        return;
      }
      var unsubscribers = tabNavigations.map(function (tab) {
        return tab.addListener(
        // We don't wanna import tab types here to avoid extra deps
        // in addition, there are multiple tab implementations
        // @ts-expect-error
        'tabPress', function (e) {
          // We should scroll to top only when the screen is focused
          var isFocused = navigation.isFocused();

          // In a nested stack navigator, tab press resets the stack to first screen
          // So we should scroll to top only when we are on first screen
          var isFirst = tabNavigations.includes(navigation) || navigation.getState().routes[0].key === route.key;

          // Run the operation in the next frame so we're sure all listeners have been run
          // This is necessary to know if preventDefault() has been called
          requestAnimationFrame(function () {
            var scrollable = getScrollableNode(ref);
            if (isFocused && isFirst && scrollable && !e.defaultPrevented) {
              if ('scrollToTop' in scrollable) {
                scrollable.scrollToTop();
              } else if ('scrollTo' in scrollable) {
                scrollable.scrollTo({
                  y: 0,
                  animated: true
                });
              } else if ('scrollToOffset' in scrollable) {
                scrollable.scrollToOffset({
                  offset: 0,
                  animated: true
                });
              } else if ('scrollResponderScrollTo' in scrollable) {
                scrollable.scrollResponderScrollTo({
                  y: 0,
                  animated: true
                });
              }
            }
          });
        });
      });
      return function () {
        unsubscribers.forEach(function (unsubscribe) {
          return unsubscribe();
        });
      };
    }, [navigation, ref, route.key]);
  }
},-113,[2,-23],"node_modules/@react-navigation/native/src/useScrollToTop.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useLinkBuilder;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _LinkingContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./LinkingContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _getRootStateForNavigate = function getRootStateForNavigate(navigation, state) {
    var parent = navigation.getParent();
    if (parent) {
      var parentState = parent.getState();
      return _getRootStateForNavigate(parent, {
        index: 0,
        routes: [Object.assign({}, parentState.routes[parentState.index], {
          state: state
        })]
      });
    }
    return state;
  };

  /**
   * Build destination link for a navigate action.
   * Useful for showing anchor tags on the web for buttons that perform navigation.
   */
  function useLinkBuilder() {
    var navigation = React.useContext(_$$_REQUIRE(_dependencyMap[3], "@react-navigation/core").NavigationHelpersContext);
    var linking = React.useContext(_LinkingContext.default);
    var buildLink = React.useCallback(function (name, params) {
      var options = linking.options;
      if ((options == null ? void 0 : options.enabled) === false) {
        return undefined;
      }
      var state = navigation ? _getRootStateForNavigate(navigation, {
        index: 0,
        routes: [{
          name: name,
          params: params
        }]
      }) :
      // If we couldn't find a navigation object in context, we're at root
      // So we'll construct a basic state object to use
      {
        index: 0,
        routes: [{
          name: name,
          params: params
        }]
      };
      var path = options != null && options.getPathFromState ? options.getPathFromState(state, options == null ? void 0 : options.config) : (0, _$$_REQUIRE(_dependencyMap[3], "@react-navigation/core").getPathFromState)(state, options == null ? void 0 : options.config);
      return path;
    }, [linking, navigation]);
    return buildLink;
  }
},-112,[7,2,-21,-23],"node_modules/@react-navigation/native/src/useLinkBuilder.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
},-111,[],"node_modules/@react-navigation/native/src/types.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useTheme;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _ThemeContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./ThemeContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useTheme() {
    var theme = React.useContext(_ThemeContext.default);
    return theme;
  }
},-110,[7,2,-100],"node_modules/@react-navigation/native/src/theming/useTheme.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var DarkTheme = {
    dark: true,
    colors: {
      primary: 'rgb(10, 132, 255)',
      background: 'rgb(1, 1, 1)',
      card: 'rgb(18, 18, 18)',
      text: 'rgb(229, 229, 231)',
      border: 'rgb(39, 39, 41)',
      notification: 'rgb(255, 69, 58)'
    }
  };
  var _default = exports.default = DarkTheme;
},-109,[],"node_modules/@react-navigation/native/src/theming/DarkTheme.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var ServerContext = React.createContext(undefined);
  var _default = exports.default = ServerContext;
},-108,[2],"node_modules/@react-navigation/native/src/ServerContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _ServerContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./ServerContext"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[3], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/native/src/ServerContainer.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Container component for server rendering.
   *
   * @param props.location Location object to base the initial URL for SSR.
   * @param props.children Child elements to render the content.
   * @param props.ref Ref object which contains helper methods.
   */
  var _default = exports.default = React.forwardRef(function ServerContainer(_ref, ref) {
    var children = _ref.children,
      location = _ref.location;
    React.useEffect(function () {
      console.error("'ServerContainer' should only be used on the server with 'react-dom/server' for SSR.");
    }, []);
    var current = {};
    if (ref) {
      var value = {
        getCurrentOptions: function getCurrentOptions() {
          return current.options;
        }
      };

      // We write to the `ref` during render instead of `React.useImperativeHandle`
      // This is because `useImperativeHandle` will update the ref after 'commit',
      // and there's no 'commit' phase during SSR.
      // Mutating ref during render is unsafe in concurrent mode, but we don't care about it for SSR.
      if (typeof ref === 'function') {
        ref(value);
      } else {
        // @ts-expect-error: the TS types are incorrect and say that ref.current is readonly
        ref.current = value;
      }
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ServerContext.default.Provider, {
      value: {
        location: location
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[4], "@react-navigation/core").CurrentRenderContext.Provider, {
        value: current,
        children: children
      })
    });
  });
},-107,[7,2,-108,89,-23],"node_modules/@react-navigation/native/src/ServerContainer.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useThenable;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/asyncToGenerator"));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useThenable(create) {
    var _React$useState = React.useState(create),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      promise = _React$useState2[0];
    var initialState = [false, undefined];

    // Check if our thenable is synchronous
    promise.then(function (result) {
      initialState = [true, result];
    });
    var _React$useState3 = React.useState(initialState),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      state = _React$useState4[0],
      setState = _React$useState4[1];
    var _state = (0, _slicedToArray2.default)(state, 1),
      resolved = _state[0];
    React.useEffect(function () {
      var cancelled = false;
      var resolve = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)(function* () {
          var result;
          try {
            result = yield promise;
          } finally {
            if (!cancelled) {
              setState([true, result]);
            }
          }
        });
        return function resolve() {
          return _ref.apply(this, arguments);
        };
      }();
      if (!resolved) {
        resolve();
      }
      return function () {
        cancelled = true;
      };
    }, [promise, resolved]);
    return state;
  }
},-106,[7,84,28,2],"node_modules/@react-navigation/native/src/useThenable.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = function (string) {
    if (typeof string !== 'string') {
      throw new TypeError('Expected a string');
    }

    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a \unnnn escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
  };
},-105,[],"node_modules/@react-navigation/native/node_modules/escape-string-regexp/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = extractPathFromURL;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _escapeStringRegexp = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "escape-string-regexp"));
  function extractPathFromURL(prefixes, url) {
    for (var prefix of prefixes) {
      var _prefix$match$, _prefix$match;
      var protocol = (_prefix$match$ = (_prefix$match = prefix.match(/^[^:]+:/)) == null ? void 0 : _prefix$match[0]) != null ? _prefix$match$ : '';
      var host = prefix.replace(new RegExp("^" + (0, _escapeStringRegexp.default)(protocol)), '').replace(/\/+/g, '/') // Replace multiple slash (//) with single ones
      .replace(/^\//, ''); // Remove extra leading slash

      var prefixRegex = new RegExp("^" + (0, _escapeStringRegexp.default)(protocol) + "(/)*" + host.split('.').map(function (it) {
        return it === '*' ? '[^/]+' : (0, _escapeStringRegexp.default)(it);
      }).join('\\.'));
      var _url$split = url.split('?'),
        _url$split2 = (0, _slicedToArray2.default)(_url$split, 2),
        originAndPath = _url$split2[0],
        searchParams = _url$split2[1];
      var normalizedURL = originAndPath.replace(/\/+/g, '/').concat(searchParams ? "?" + searchParams : '');
      if (prefixRegex.test(normalizedURL)) {
        return normalizedURL.replace(prefixRegex, '');
      }
    }
    return undefined;
  }
},-104,[7,28,-105],"node_modules/@react-navigation/native/src/extractPathFromURL.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useLinking;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2], "react-native");
  var _extractPathFromURL = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./extractPathFromURL"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var linkingHandlers = [];
  function useLinking(ref, _ref) {
    var independent = _ref.independent,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      prefixes = _ref.prefixes,
      filter = _ref.filter,
      config = _ref.config,
      _ref$getInitialURL = _ref.getInitialURL,
      getInitialURL = _ref$getInitialURL === void 0 ? function () {
        return Promise.race([_reactNative.Linking.getInitialURL(), new Promise(function (resolve) {
          return (
            // Timeout in 150ms if `getInitialState` doesn't resolve
            // Workaround for https://github.com/facebook/react-native/issues/25675
            setTimeout(resolve, 150)
          );
        })]);
      } : _ref$getInitialURL,
      _ref$subscribe = _ref.subscribe,
      subscribe = _ref$subscribe === void 0 ? function (listener) {
        var _Linking$removeEventL;
        var callback = function callback(_ref2) {
          var url = _ref2.url;
          return listener(url);
        };
        var subscription = _reactNative.Linking.addEventListener('url', callback);

        // Storing this in a local variable stops Jest from complaining about import after teardown
        // @ts-expect-error: removeEventListener is not present in newer RN versions
        var removeEventListener = (_Linking$removeEventL = _reactNative.Linking.removeEventListener) == null ? void 0 : _Linking$removeEventL.bind(_reactNative.Linking);
        return function () {
          // https://github.com/facebook/react-native/commit/6d1aca806cee86ad76de771ed3a1cc62982ebcd7
          if (subscription != null && subscription.remove) {
            subscription.remove();
          } else {
            removeEventListener == null ? void 0 : removeEventListener('url', callback);
          }
        };
      } : _ref$subscribe,
      _ref$getStateFromPath = _ref.getStateFromPath,
      getStateFromPath = _ref$getStateFromPath === void 0 ? _$$_REQUIRE(_dependencyMap[4], "@react-navigation/core").getStateFromPath : _ref$getStateFromPath,
      _ref$getActionFromSta = _ref.getActionFromState,
      getActionFromState = _ref$getActionFromSta === void 0 ? _$$_REQUIRE(_dependencyMap[4], "@react-navigation/core").getActionFromState : _ref$getActionFromSta;
    React.useEffect(function () {
      if (process.env.NODE_ENV === 'production') {
        return undefined;
      }
      if (independent) {
        return undefined;
      }
      if (enabled !== false && linkingHandlers.length) {
        console.error(['Looks like you have configured linking in multiple places. This is likely an error since deep links should only be handled in one place to avoid conflicts. Make sure that:', "- You don't have multiple NavigationContainers in the app each with 'linking' enabled", '- Only a single instance of the root component is rendered', _reactNative.Platform.OS === 'android' ? "- You have set 'android:launchMode=singleTask' in the '<activity />' section of the 'AndroidManifest.xml' file to avoid launching multiple instances" : ''].join('\n').trim());
      }
      var handler = Symbol();
      if (enabled !== false) {
        linkingHandlers.push(handler);
      }
      return function () {
        var index = linkingHandlers.indexOf(handler);
        if (index > -1) {
          linkingHandlers.splice(index, 1);
        }
      };
    }, [enabled, independent]);

    // We store these options in ref to avoid re-creating getInitialState and re-subscribing listeners
    // This lets user avoid wrapping the items in `React.useCallback` or `React.useMemo`
    // Not re-creating `getInitialState` is important coz it makes it easier for the user to use in an effect
    var enabledRef = React.useRef(enabled);
    var prefixesRef = React.useRef(prefixes);
    var filterRef = React.useRef(filter);
    var configRef = React.useRef(config);
    var getInitialURLRef = React.useRef(getInitialURL);
    var getStateFromPathRef = React.useRef(getStateFromPath);
    var getActionFromStateRef = React.useRef(getActionFromState);
    React.useEffect(function () {
      enabledRef.current = enabled;
      prefixesRef.current = prefixes;
      filterRef.current = filter;
      configRef.current = config;
      getInitialURLRef.current = getInitialURL;
      getStateFromPathRef.current = getStateFromPath;
      getActionFromStateRef.current = getActionFromState;
    });
    var getStateFromURL = React.useCallback(function (url) {
      if (!url || filterRef.current && !filterRef.current(url)) {
        return undefined;
      }
      var path = (0, _extractPathFromURL.default)(prefixesRef.current, url);
      return path !== undefined ? getStateFromPathRef.current(path, configRef.current) : undefined;
    }, []);
    var getInitialState = React.useCallback(function () {
      var state;
      if (enabledRef.current) {
        var url = getInitialURLRef.current();
        if (url != null && typeof url !== 'string') {
          return url.then(function (url) {
            var state = getStateFromURL(url);
            return state;
          });
        }
        state = getStateFromURL(url);
      }
      var thenable = {
        then: function then(onfulfilled) {
          return Promise.resolve(onfulfilled ? onfulfilled(state) : state);
        },
        catch: function _catch() {
          return thenable;
        }
      };
      return thenable;
    }, [getStateFromURL]);
    React.useEffect(function () {
      var listener = function listener(url) {
        if (!enabled) {
          return;
        }
        var navigation = ref.current;
        var state = navigation ? getStateFromURL(url) : undefined;
        if (navigation && state) {
          // Make sure that the routes in the state exist in the root navigator
          // Otherwise there's an error in the linking configuration
          var rootState = navigation.getRootState();
          if (state.routes.some(function (r) {
            return !(rootState != null && rootState.routeNames.includes(r.name));
          })) {
            console.warn("The navigation state parsed from the URL contains routes not present in the root navigator. This usually means that the linking configuration doesn't match the navigation structure. See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.");
            return;
          }
          var action = getActionFromStateRef.current(state, configRef.current);
          if (action !== undefined) {
            try {
              navigation.dispatch(action);
            } catch (e) {
              // Ignore any errors from deep linking.
              // This could happen in case of malformed links, navigation object not being initialized etc.
              console.warn("An error occurred when trying to handle the link '" + url + "': " + (typeof e === 'object' && e != null && 'message' in e ? e.message : e));
            }
          } else {
            navigation.resetRoot(state);
          }
        }
      };
      return subscribe(listener);
    }, [enabled, getStateFromURL, ref, subscribe]);
    return {
      getInitialState: getInitialState
    };
  }
},-103,[7,2,5,-104,-23],"node_modules/@react-navigation/native/src/useLinking.native.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useDocumentTitle;
  function useDocumentTitle() {
    // Noop for React Native
  }
},-102,[],"node_modules/@react-navigation/native/src/useDocumentTitle.native.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useBackButton;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1], "react-native");
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useBackButton(ref) {
    React.useEffect(function () {
      var subscription = _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        var navigation = ref.current;
        if (navigation == null) {
          return false;
        }
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      });
      return function () {
        return subscription.remove();
      };
    }, [ref]);
  }
},-101,[2,5],"node_modules/@react-navigation/native/src/useBackButton.native.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _DefaultTheme = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./DefaultTheme"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var ThemeContext = React.createContext(_DefaultTheme.default);
  ThemeContext.displayName = 'ThemeContext';
  var _default = exports.default = ThemeContext;
},-100,[7,2,-98],"node_modules/@react-navigation/native/src/theming/ThemeContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ThemeProvider;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _ThemeContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./ThemeContext"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[3], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/native/src/theming/ThemeProvider.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function ThemeProvider(_ref) {
    var value = _ref.value,
      children = _ref.children;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext.default.Provider, {
      value: value,
      children: children
    });
  }
},-99,[7,2,-100,89],"node_modules/@react-navigation/native/src/theming/ThemeProvider.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var DefaultTheme = {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(216, 216, 216)',
      notification: 'rgb(255, 59, 48)'
    }
  };
  var _default = exports.default = DefaultTheme;
},-98,[],"node_modules/@react-navigation/native/src/theming/DefaultTheme.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _LinkingContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./LinkingContext"));
  var _DefaultTheme = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./theming/DefaultTheme"));
  var _ThemeProvider = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./theming/ThemeProvider"));
  var _useBackButton = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./useBackButton"));
  var _useDocumentTitle = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./useDocumentTitle"));
  var _useLinking2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9], "./useLinking"));
  var _useThenable3 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./useThenable"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[11], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/native/src/NavigationContainer.tsx";
  var _excluded = ["theme", "linking", "fallback", "documentTitle", "onReady"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  global.REACT_NAVIGATION_DEVTOOLS = new WeakMap();
  /**
   * Container component which holds the navigation state designed for React Native apps.
   * This should be rendered at the root wrapping the whole app.
   *
   * @param props.initialState Initial state object for the navigation tree. When deep link handling is enabled, this will override deep links when specified. Make sure that you don't specify an `initialState` when there's a deep link (`Linking.getInitialURL()`).
   * @param props.onReady Callback which is called after the navigation tree mounts.
   * @param props.onStateChange Callback which is called with the latest navigation state when it changes.
   * @param props.theme Theme object for the navigators.
   * @param props.linking Options for deep linking. Deep link handling is enabled when this prop is provided, unless `linking.enabled` is `false`.
   * @param props.fallback Fallback component to render until we have finished getting initial state when linking is enabled. Defaults to `null`.
   * @param props.documentTitle Options to configure the document title on Web. Updating document title is handled by default unless `documentTitle.enabled` is `false`.
   * @param props.children Child elements to render the content.
   * @param props.ref Ref object which refers to the navigation object containing helper methods.
   */
  function NavigationContainerInner(_ref, ref) {
    var _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? _DefaultTheme.default : _ref$theme,
      linking = _ref.linking,
      _ref$fallback = _ref.fallback,
      fallback = _ref$fallback === void 0 ? null : _ref$fallback,
      documentTitle = _ref.documentTitle,
      onReady = _ref.onReady,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var isLinkingEnabled = linking ? linking.enabled !== false : false;
    if (linking != null && linking.config) {
      (0, _$$_REQUIRE(_dependencyMap[12], "@react-navigation/core").validatePathConfig)(linking.config);
    }
    var refContainer = React.useRef(null);
    (0, _useBackButton.default)(refContainer);
    (0, _useDocumentTitle.default)(refContainer, documentTitle);
    var _useLinking = (0, _useLinking2.default)(refContainer, Object.assign({
        independent: rest.independent,
        enabled: isLinkingEnabled,
        prefixes: []
      }, linking)),
      getInitialState = _useLinking.getInitialState;

    // Add additional linking related info to the ref
    // This will be used by the devtools
    React.useEffect(function () {
      if (refContainer.current) {
        REACT_NAVIGATION_DEVTOOLS.set(refContainer.current, {
          get linking() {
            var _linking$prefixes, _linking$getStateFrom, _linking$getPathFromS, _linking$getActionFro;
            return Object.assign({}, linking, {
              enabled: isLinkingEnabled,
              prefixes: (_linking$prefixes = linking == null ? void 0 : linking.prefixes) != null ? _linking$prefixes : [],
              getStateFromPath: (_linking$getStateFrom = linking == null ? void 0 : linking.getStateFromPath) != null ? _linking$getStateFrom : _$$_REQUIRE(_dependencyMap[12], "@react-navigation/core").getStateFromPath,
              getPathFromState: (_linking$getPathFromS = linking == null ? void 0 : linking.getPathFromState) != null ? _linking$getPathFromS : _$$_REQUIRE(_dependencyMap[12], "@react-navigation/core").getPathFromState,
              getActionFromState: (_linking$getActionFro = linking == null ? void 0 : linking.getActionFromState) != null ? _linking$getActionFro : _$$_REQUIRE(_dependencyMap[12], "@react-navigation/core").getActionFromState
            });
          }
        });
      }
    });
    var _useThenable = (0, _useThenable3.default)(getInitialState),
      _useThenable2 = (0, _slicedToArray2.default)(_useThenable, 2),
      isResolved = _useThenable2[0],
      initialState = _useThenable2[1];
    React.useImperativeHandle(ref, function () {
      return refContainer.current;
    });
    var linkingContext = React.useMemo(function () {
      return {
        options: linking
      };
    }, [linking]);
    var isReady = rest.initialState != null || !isLinkingEnabled || isResolved;
    var onReadyRef = React.useRef(onReady);
    React.useEffect(function () {
      onReadyRef.current = onReady;
    });
    React.useEffect(function () {
      if (isReady) {
        onReadyRef.current == null ? void 0 : onReadyRef.current();
      }
    }, [isReady]);
    if (!isReady) {
      // This is temporary until we have Suspense for data-fetching
      // Then the fallback will be handled by a parent `Suspense` component
      return fallback;
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkingContext.default.Provider, {
      value: linkingContext,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeProvider.default, {
        value: theme,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[12], "@react-navigation/core").BaseNavigationContainer, Object.assign({}, rest, {
          initialState: rest.initialState == null ? initialState : rest.initialState,
          ref: refContainer
        }))
      })
    });
  }
  var NavigationContainer = React.forwardRef(NavigationContainerInner);
  var _default = exports.default = NavigationContainer;
},-97,[7,28,151,2,-21,-98,-99,-101,-102,-103,-106,89,-23],"node_modules/@react-navigation/native/src/NavigationContainer.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useRoute;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationRouteContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to access the route prop of the parent screen anywhere.
   *
   * @returns Route prop of the parent screen.
   */
  function useRoute() {
    var route = React.useContext(_NavigationRouteContext.default);
    if (route === undefined) {
      throw new Error("Couldn't find a route object. Is your component inside a screen in a navigator?");
    }
    return route;
  }
},-96,[7,2,-32],"node_modules/@react-navigation/core/src/useRoute.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = usePreventRemoveContext;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _PreventRemoveContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./PreventRemoveContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function usePreventRemoveContext() {
    var value = React.useContext(_PreventRemoveContext.default);
    if (value == null) {
      throw new Error("Couldn't find the prevent remove context. Is your component inside NavigationContent?");
    }
    return value;
  }
},-95,[7,2,-68],"node_modules/@react-navigation/core/src/usePreventRemoveContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = usePreventRemove;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _useLatestCallback = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "use-latest-callback"));
  var _useNavigation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./useNavigation"));
  var _usePreventRemoveContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./usePreventRemoveContext"));
  var _useRoute2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./useRoute"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to prevent screen from being removed. Can be used to prevent users from leaving the screen.
   *
   * @param preventRemove Boolean indicating whether to prevent screen from being removed.
   * @param callback Function which is executed when screen was prevented from being removed.
   */
  function usePreventRemove(preventRemove, callback) {
    var _React$useState = React.useState(function () {
        return (0, _$$_REQUIRE(_dependencyMap[7], "nanoid/non-secure").nanoid)();
      }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      id = _React$useState2[0];
    var navigation = (0, _useNavigation.default)();
    var _useRoute = (0, _useRoute2.default)(),
      routeKey = _useRoute.key;
    var _usePreventRemoveCont = (0, _usePreventRemoveContext.default)(),
      setPreventRemove = _usePreventRemoveCont.setPreventRemove;
    React.useEffect(function () {
      setPreventRemove(id, routeKey, preventRemove);
      return function () {
        setPreventRemove(id, routeKey, false);
      };
    }, [setPreventRemove, id, routeKey, preventRemove]);
    var beforeRemoveListener = (0, _useLatestCallback.default)(function (e) {
      if (!preventRemove) {
        return;
      }
      e.preventDefault();
      callback({
        data: e.data
      });
    });
    React.useEffect(function () {
      return navigation == null ? void 0 : navigation.addListener('beforeRemove', beforeRemoveListener);
    }, [navigation, beforeRemoveListener]);
  }
},-94,[7,28,2,-70,-73,-95,-96,-44],"node_modules/@react-navigation/core/src/usePreventRemove.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useNavigationState;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _useNavigation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./useNavigation"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to get a value from the current navigation state using a selector.
   *
   * @param selector Selector function to get a value from the state.
   */
  function useNavigationState(selector) {
    var navigation = (0, _useNavigation.default)();

    // We don't care about the state value, we run the selector again at the end
    // The state is only to make sure that there's a re-render when we have a new value
    var _React$useState = React.useState(function () {
        return selector(navigation.getState());
      }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      setResult = _React$useState2[1];

    // We store the selector in a ref to avoid re-subscribing listeners every render
    var selectorRef = React.useRef(selector);
    React.useEffect(function () {
      selectorRef.current = selector;
    });
    React.useEffect(function () {
      var unsubscribe = navigation.addListener('state', function (e) {
        setResult(selectorRef.current(e.data.state));
      });
      return unsubscribe;
    }, [navigation]);
    return selector(navigation.getState());
  }
},-93,[7,28,2,-73],"node_modules/@react-navigation/core/src/useNavigationState.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useNavigationContainerRef;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _createNavigationContainerRef = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./createNavigationContainerRef"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useNavigationContainerRef() {
    var navigation = React.useRef(null);
    if (navigation.current == null) {
      navigation.current = (0, _createNavigationContainerRef.default)();
    }
    return navigation.current;
  }
},-92,[7,2,-40],"node_modules/@react-navigation/core/src/useNavigationContainerRef.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useRegisterNavigator;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Register a navigator in the parent context (either a navigation container or a screen).
   * This is used to prevent multiple navigators under a single container or screen.
   */
  function useRegisterNavigator() {
    var _React$useState = React.useState(function () {
        return (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)();
      }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      key = _React$useState2[0];
    var container = React.useContext(_$$_REQUIRE(_dependencyMap[4], "./EnsureSingleNavigator").SingleNavigatorContext);
    if (container === undefined) {
      throw new Error("Couldn't register the navigator. Have you wrapped your app with 'NavigationContainer'?\n\nThis can also happen if there are multiple copies of '@react-navigation' packages installed.");
    }
    React.useEffect(function () {
      var register = container.register,
        unregister = container.unregister;
      register(key);
      return function () {
        return unregister(key);
      };
    }, [container, key]);
    return key;
  }
},-91,[7,28,2,-44,-27],"node_modules/@react-navigation/core/src/useRegisterNavigator.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useOnRouteFocus;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationBuilderContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to handle focus actions for a route.
   * Focus action needs to be treated specially, coz when a nested route is focused,
   * the parent navigators also needs to be focused.
   */
  function useOnRouteFocus(_ref) {
    var router = _ref.router,
      getState = _ref.getState,
      sourceRouteKey = _ref.key,
      setState = _ref.setState;
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      onRouteFocusParent = _React$useContext.onRouteFocus;
    return React.useCallback(function (key) {
      var state = getState();
      var result = router.getStateForRouteFocus(state, key);
      if (result !== state) {
        setState(result);
      }
      if (onRouteFocusParent !== undefined && sourceRouteKey !== undefined) {
        onRouteFocusParent(sourceRouteKey);
      }
    }, [getState, onRouteFocusParent, router, setState, sourceRouteKey]);
  }
},-90,[7,2,-29],"node_modules/@react-navigation/core/src/useOnRouteFocus.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useOnGetState;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _isArrayEqual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./isArrayEqual"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./NavigationBuilderContext"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./NavigationRouteContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useOnGetState(_ref) {
    var getState = _ref.getState,
      getStateListeners = _ref.getStateListeners;
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      addKeyedListener = _React$useContext.addKeyedListener;
    var route = React.useContext(_NavigationRouteContext.default);
    var key = route ? route.key : 'root';
    var getRehydratedState = React.useCallback(function () {
      var state = getState();

      // Avoid returning new route objects if we don't need to
      var routes = state.routes.map(function (route) {
        var _getStateListeners$ro;
        var childState = (_getStateListeners$ro = getStateListeners[route.key]) == null ? void 0 : _getStateListeners$ro.call(getStateListeners);
        if (route.state === childState) {
          return route;
        }
        return Object.assign({}, route, {
          state: childState
        });
      });
      if ((0, _isArrayEqual.default)(state.routes, routes)) {
        return state;
      }
      return Object.assign({}, state, {
        routes: routes
      });
    }, [getState, getStateListeners]);
    React.useEffect(function () {
      return addKeyedListener == null ? void 0 : addKeyedListener('getState', key, getRehydratedState);
    }, [addKeyedListener, getRehydratedState, key]);
  }
},-89,[7,2,-76,-29,-32],"node_modules/@react-navigation/core/src/useOnGetState.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useOnPreventRemove;
  exports.shouldPreventRemove = void 0;
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/defineProperty"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./NavigationBuilderContext"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./NavigationRouteContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var VISITED_ROUTE_KEYS = Symbol('VISITED_ROUTE_KEYS');
  var shouldPreventRemove = exports.shouldPreventRemove = function shouldPreventRemove(emitter, beforeRemoveListeners, currentRoutes, nextRoutes, action) {
    var _action$VISITED_ROUTE;
    var nextRouteKeys = nextRoutes.map(function (route) {
      return route.key;
    });

    // Call these in reverse order so last screens handle the event first
    var removedRoutes = currentRoutes.filter(function (route) {
      return !nextRouteKeys.includes(route.key);
    }).reverse();
    var visitedRouteKeys = // @ts-expect-error: add this property to mark that we've already emitted this action
    (_action$VISITED_ROUTE = action[VISITED_ROUTE_KEYS]) != null ? _action$VISITED_ROUTE : new Set();
    var beforeRemoveAction = Object.assign({}, action, (0, _defineProperty2.default)({}, VISITED_ROUTE_KEYS, visitedRouteKeys));
    for (var route of removedRoutes) {
      var _beforeRemoveListener;
      if (visitedRouteKeys.has(route.key)) {
        // Skip if we've already emitted this action for this screen
        continue;
      }

      // First, we need to check if any child screens want to prevent it
      var isPrevented = (_beforeRemoveListener = beforeRemoveListeners[route.key]) == null ? void 0 : _beforeRemoveListener.call(beforeRemoveListeners, beforeRemoveAction);
      if (isPrevented) {
        return true;
      }
      visitedRouteKeys.add(route.key);
      var event = emitter.emit({
        type: 'beforeRemove',
        target: route.key,
        data: {
          action: beforeRemoveAction
        },
        canPreventDefault: true
      });
      if (event.defaultPrevented) {
        return true;
      }
    }
    return false;
  };
  function useOnPreventRemove(_ref) {
    var getState = _ref.getState,
      emitter = _ref.emitter,
      beforeRemoveListeners = _ref.beforeRemoveListeners;
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      addKeyedListener = _React$useContext.addKeyedListener;
    var route = React.useContext(_NavigationRouteContext.default);
    var routeKey = route == null ? void 0 : route.key;
    React.useEffect(function () {
      if (routeKey) {
        return addKeyedListener == null ? void 0 : addKeyedListener('beforeRemove', routeKey, function (action) {
          var state = getState();
          return shouldPreventRemove(emitter, beforeRemoveListeners, state.routes, [], action);
        });
      }
    }, [addKeyedListener, beforeRemoveListeners, emitter, getState, routeKey]);
  }
},-88,[7,203,2,-29,-32],"node_modules/@react-navigation/core/src/useOnPreventRemove.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useOnAction;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationBuilderContext"));
  var _useOnPreventRemove = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "./useOnPreventRemove"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to handle actions for a navigator, including state updates and bubbling.
   *
   * Bubbling an action is achieved in 2 ways:
   * 1. To bubble action to parent, we expose the action handler in context and then access the parent context
   * 2. To bubble action to child, child adds event listeners subscribing to actions from parent
   *
   * When the action handler handles as action, it returns `true`, otherwise `false`.
   */
  function useOnAction(_ref) {
    var router = _ref.router,
      getState = _ref.getState,
      setState = _ref.setState,
      key = _ref.key,
      actionListeners = _ref.actionListeners,
      beforeRemoveListeners = _ref.beforeRemoveListeners,
      routerConfigOptions = _ref.routerConfigOptions,
      emitter = _ref.emitter;
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      onActionParent = _React$useContext.onAction,
      onRouteFocusParent = _React$useContext.onRouteFocus,
      addListenerParent = _React$useContext.addListener,
      onDispatchAction = _React$useContext.onDispatchAction;
    var routerConfigOptionsRef = React.useRef(routerConfigOptions);
    React.useEffect(function () {
      routerConfigOptionsRef.current = routerConfigOptions;
    });
    var onAction = React.useCallback(function (action) {
      var visitedNavigators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
      var state = getState();

      // Since actions can bubble both up and down, they could come to the same navigator again
      // We keep track of navigators which have already tried to handle the action and return if it's already visited
      if (visitedNavigators.has(state.key)) {
        return false;
      }
      visitedNavigators.add(state.key);
      if (typeof action.target !== 'string' || action.target === state.key) {
        var result = router.getStateForAction(state, action, routerConfigOptionsRef.current);

        // If a target is specified and set to current navigator, the action shouldn't bubble
        // So instead of `null`, we use the state object for such cases to signal that action was handled
        result = result === null && action.target === state.key ? state : result;
        if (result !== null) {
          onDispatchAction(action, state === result);
          if (state !== result) {
            var isPrevented = (0, _useOnPreventRemove.shouldPreventRemove)(emitter, beforeRemoveListeners, state.routes, result.routes, action);
            if (isPrevented) {
              return true;
            }
            setState(result);
          }
          if (onRouteFocusParent !== undefined) {
            // Some actions such as `NAVIGATE` also want to bring the navigated route to focus in the whole tree
            // This means we need to focus all of the parent navigators of this navigator as well
            var shouldFocus = router.shouldActionChangeFocus(action);
            if (shouldFocus && key !== undefined) {
              onRouteFocusParent(key);
            }
          }
          return true;
        }
      }
      if (onActionParent !== undefined) {
        // Bubble action to the parent if the current navigator didn't handle it
        if (onActionParent(action, visitedNavigators)) {
          return true;
        }
      }

      // If the action wasn't handled by current navigator or a parent navigator, let children handle it
      for (var i = actionListeners.length - 1; i >= 0; i--) {
        var listener = actionListeners[i];
        if (listener(action, visitedNavigators)) {
          return true;
        }
      }
      return false;
    }, [actionListeners, beforeRemoveListeners, emitter, getState, key, onActionParent, onDispatchAction, onRouteFocusParent, router, setState]);
    (0, _useOnPreventRemove.default)({
      getState: getState,
      emitter: emitter,
      beforeRemoveListeners: beforeRemoveListeners
    });
    React.useEffect(function () {
      return addListenerParent == null ? void 0 : addListenerParent('action', onAction);
    }, [addListenerParent, onAction]);
    return onAction;
  }
},-87,[7,2,-29,-88],"node_modules/@react-navigation/core/src/useOnAction.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useNavigationHelpers;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationContext"));
  var _UnhandledActionContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./UnhandledActionContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  // This is to make TypeScript compiler happy
  // eslint-disable-next-line babel/no-unused-expressions
  _$$_REQUIRE(_dependencyMap[4], "./types").PrivateValueStore;
  /**
   * Navigation object with helper methods to be used by a navigator.
   * This object includes methods for common actions as well as methods the parent screen's navigation object.
   */
  function useNavigationHelpers(_ref) {
    var navigatorId = _ref.id,
      onAction = _ref.onAction,
      getState = _ref.getState,
      emitter = _ref.emitter,
      router = _ref.router;
    var onUnhandledAction = React.useContext(_UnhandledActionContext.default);
    var parentNavigationHelpers = React.useContext(_NavigationContext.default);
    return React.useMemo(function () {
      var dispatch = function dispatch(op) {
        var action = typeof op === 'function' ? op(getState()) : op;
        var handled = onAction(action);
        if (!handled) {
          onUnhandledAction == null ? void 0 : onUnhandledAction(action);
        }
      };
      var actions = Object.assign({}, router.actionCreators, _$$_REQUIRE(_dependencyMap[5], "@react-navigation/routers").CommonActions);
      var helpers = Object.keys(actions).reduce(function (acc, name) {
        // @ts-expect-error: name is a valid key, but TypeScript is dumb
        acc[name] = function () {
          return dispatch(actions[name].apply(actions, arguments));
        };
        return acc;
      }, {});
      var navigationHelpers = Object.assign({}, parentNavigationHelpers, helpers, {
        dispatch: dispatch,
        emit: emitter.emit,
        isFocused: parentNavigationHelpers ? parentNavigationHelpers.isFocused : function () {
          return true;
        },
        canGoBack: function canGoBack() {
          var state = getState();
          return router.getStateForAction(state, _$$_REQUIRE(_dependencyMap[5], "@react-navigation/routers").CommonActions.goBack(), {
            routeNames: state.routeNames,
            routeParamList: {},
            routeGetIdList: {}
          }) !== null || (parentNavigationHelpers == null ? void 0 : parentNavigationHelpers.canGoBack()) || false;
        },
        getId: function getId() {
          return navigatorId;
        },
        getParent: function getParent(id) {
          if (id !== undefined) {
            var current = navigationHelpers;
            while (current && id !== current.getId()) {
              current = current.getParent();
            }
            return current;
          }
          return parentNavigationHelpers;
        },
        getState: getState
      });
      return navigationHelpers;
    }, [navigatorId, emitter.emit, getState, onAction, onUnhandledAction, parentNavigationHelpers, router]);
  }
},-86,[7,2,-31,-34,-71,-41],"node_modules/@react-navigation/core/src/useNavigationHelpers.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useFocusEvents;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to take care of emitting `focus` and `blur` events.
   */
  function useFocusEvents(_ref) {
    var state = _ref.state,
      emitter = _ref.emitter;
    var navigation = React.useContext(_NavigationContext.default);
    var lastFocusedKeyRef = React.useRef();
    var currentFocusedKey = state.routes[state.index].key;

    // When the parent screen changes its focus state, we also need to change child's focus
    // Coz the child screen can't be focused if the parent screen is out of focus
    React.useEffect(function () {
      return navigation == null ? void 0 : navigation.addListener('focus', function () {
        lastFocusedKeyRef.current = currentFocusedKey;
        emitter.emit({
          type: 'focus',
          target: currentFocusedKey
        });
      });
    }, [currentFocusedKey, emitter, navigation]);
    React.useEffect(function () {
      return navigation == null ? void 0 : navigation.addListener('blur', function () {
        lastFocusedKeyRef.current = undefined;
        emitter.emit({
          type: 'blur',
          target: currentFocusedKey
        });
      });
    }, [currentFocusedKey, emitter, navigation]);
    React.useEffect(function () {
      var lastFocusedKey = lastFocusedKeyRef.current;
      lastFocusedKeyRef.current = currentFocusedKey;

      // We wouldn't have `lastFocusedKey` on initial mount
      // Fire focus event for the current route on mount if there's no parent navigator
      if (lastFocusedKey === undefined && !navigation) {
        emitter.emit({
          type: 'focus',
          target: currentFocusedKey
        });
      }

      // We should only emit events when the focused key changed and navigator is focused
      // When navigator is not focused, screens inside shouldn't receive focused status either
      if (lastFocusedKey === currentFocusedKey || !(navigation ? navigation.isFocused() : true)) {
        return;
      }
      if (lastFocusedKey === undefined) {
        // Only fire events after initial mount
        return;
      }
      emitter.emit({
        type: 'blur',
        target: lastFocusedKey
      });
      emitter.emit({
        type: 'focus',
        target: currentFocusedKey
      });
    }, [currentFocusedKey, emitter, navigation]);
  }
},-85,[7,2,-31],"node_modules/@react-navigation/core/src/useFocusEvents.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useFocusedListenersChildrenAdapter;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationBuilderContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook for passing focus callback to children
   */
  function useFocusedListenersChildrenAdapter(_ref) {
    var navigation = _ref.navigation,
      focusedListeners = _ref.focusedListeners;
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      addListener = _React$useContext.addListener;
    var listener = React.useCallback(function (callback) {
      if (navigation.isFocused()) {
        for (var _listener of focusedListeners) {
          var _listener2 = _listener(callback),
            handled = _listener2.handled,
            result = _listener2.result;
          if (handled) {
            return {
              handled: handled,
              result: result
            };
          }
        }
        return {
          handled: true,
          result: callback(navigation)
        };
      } else {
        return {
          handled: false,
          result: null
        };
      }
    }, [focusedListeners, navigation]);
    React.useEffect(function () {
      return addListener == null ? void 0 : addListener('focus', listener);
    }, [addListener, listener]);
  }
},-84,[7,2,-29],"node_modules/@react-navigation/core/src/useFocusedListenersChildrenAdapter.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useNavigationCache;
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/defineProperty"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./NavigationBuilderContext"));
  var _excluded = ["emit"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to cache navigation objects for each screen in the navigator.
   * It's important to cache them to make sure navigation objects don't change between renders.
   * This lets us apply optimizations like `React.memo` to minimize re-rendering screens.
   */
  function useNavigationCache(_ref) {
    var state = _ref.state,
      getState = _ref.getState,
      navigation = _ref.navigation,
      _setOptions = _ref.setOptions,
      router = _ref.router,
      emitter = _ref.emitter;
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      stackRef = _React$useContext.stackRef;

    // Cache object which holds navigation objects for each screen
    // We use `React.useMemo` instead of `React.useRef` coz we want to invalidate it when deps change
    // In reality, these deps will rarely change, if ever
    var cache = React.useMemo(function () {
      return {
        current: {}
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getState, navigation, _setOptions, router, emitter]);
    var actions = Object.assign({}, router.actionCreators, _$$_REQUIRE(_dependencyMap[5], "@react-navigation/routers").CommonActions);
    cache.current = state.routes.reduce(function (acc, route) {
      var previous = cache.current[route.key];
      if (previous) {
        // If a cached navigation object already exists, reuse it
        acc[route.key] = previous;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var emit = navigation.emit,
          rest = (0, _objectWithoutProperties2.default)(navigation, _excluded);
        var _dispatch = function dispatch(thunk) {
          var action = typeof thunk === 'function' ? thunk(getState()) : thunk;
          if (action != null) {
            navigation.dispatch(Object.assign({
              source: route.key
            }, action));
          }
        };
        var withStack = function withStack(callback) {
          var isStackSet = false;
          try {
            if (process.env.NODE_ENV !== 'production' && stackRef && !stackRef.current) {
              // Capture the stack trace for devtools
              stackRef.current = new Error().stack;
              isStackSet = true;
            }
            callback();
          } finally {
            if (isStackSet && stackRef) {
              stackRef.current = undefined;
            }
          }
        };
        var helpers = Object.keys(actions).reduce(function (acc, name) {
          acc[name] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            return withStack(function () {
              return (
                // @ts-expect-error: name is a valid key, but TypeScript is dumb
                _dispatch(actions[name].apply(actions, args))
              );
            });
          };
          return acc;
        }, {});
        acc[route.key] = Object.assign({}, rest, helpers, emitter.create(route.key), {
          dispatch: function dispatch(thunk) {
            return withStack(function () {
              return _dispatch(thunk);
            });
          },
          getParent: function getParent(id) {
            if (id !== undefined && id === rest.getId()) {
              // If the passed id is the same as the current navigation id,
              // we return the cached navigation object for the relevant route
              return acc[route.key];
            }
            return rest.getParent(id);
          },
          setOptions: function setOptions(options) {
            return _setOptions(function (o) {
              return Object.assign({}, o, (0, _defineProperty2.default)({}, route.key, Object.assign({}, o[route.key], options)));
            });
          },
          isFocused: function isFocused() {
            var state = getState();
            if (state.routes[state.index].key !== route.key) {
              return false;
            }

            // If the current screen is focused, we also need to check if parent navigator is focused
            // This makes sure that we return the focus state in the whole tree, not just this navigator
            return navigation ? navigation.isFocused() : true;
          }
        });
      }
      return acc;
    }, {});
    return cache.current;
  }
},-83,[7,203,151,2,-29,-41],"node_modules/@react-navigation/core/src/useNavigationCache.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Component which prevents updates for children if no props changed
   */
  function StaticContainer(props) {
    return props.children;
  }
  var _default = exports.default = React.memo(StaticContainer, function (prevProps, nextProps) {
    var prevPropKeys = Object.keys(prevProps);
    var nextPropKeys = Object.keys(nextProps);
    if (prevPropKeys.length !== nextPropKeys.length) {
      return false;
    }
    for (var key of prevPropKeys) {
      if (key === 'children') {
        continue;
      }
      if (prevProps[key] !== nextProps[key]) {
        return false;
      }
    }
    return true;
  });
},-82,[2],"node_modules/@react-navigation/core/src/StaticContainer.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = SceneView;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _EnsureSingleNavigator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./EnsureSingleNavigator"));
  var _NavigationStateContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./NavigationStateContext"));
  var _StaticContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./StaticContainer"));
  var _useOptionsGetters2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./useOptionsGetters"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[6], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/core/src/SceneView.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Component which takes care of rendering the screen for a route.
   * It provides all required contexts and applies optimizations when applicable.
   */
  function SceneView(_ref) {
    var screen = _ref.screen,
      route = _ref.route,
      navigation = _ref.navigation,
      routeState = _ref.routeState,
      getState = _ref.getState,
      setState = _ref.setState,
      options = _ref.options,
      clearOptions = _ref.clearOptions;
    var navigatorKeyRef = React.useRef();
    var getKey = React.useCallback(function () {
      return navigatorKeyRef.current;
    }, []);
    var _useOptionsGetters = (0, _useOptionsGetters2.default)({
        key: route.key,
        options: options,
        navigation: navigation
      }),
      addOptionsGetter = _useOptionsGetters.addOptionsGetter;
    var setKey = React.useCallback(function (key) {
      navigatorKeyRef.current = key;
    }, []);
    var getCurrentState = React.useCallback(function () {
      var state = getState();
      var currentRoute = state.routes.find(function (r) {
        return r.key === route.key;
      });
      return currentRoute ? currentRoute.state : undefined;
    }, [getState, route.key]);
    var setCurrentState = React.useCallback(function (child) {
      var state = getState();
      setState(Object.assign({}, state, {
        routes: state.routes.map(function (r) {
          return r.key === route.key ? Object.assign({}, r, {
            state: child
          }) : r;
        })
      }));
    }, [getState, route.key, setState]);
    var isInitialRef = React.useRef(true);
    React.useEffect(function () {
      isInitialRef.current = false;
    });

    // Clear options set by this screen when it is unmounted
    React.useEffect(function () {
      return clearOptions;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var getIsInitial = React.useCallback(function () {
      return isInitialRef.current;
    }, []);
    var context = React.useMemo(function () {
      return {
        state: routeState,
        getState: getCurrentState,
        setState: setCurrentState,
        getKey: getKey,
        setKey: setKey,
        getIsInitial: getIsInitial,
        addOptionsGetter: addOptionsGetter
      };
    }, [routeState, getCurrentState, setCurrentState, getKey, setKey, getIsInitial, addOptionsGetter]);
    var ScreenComponent = screen.getComponent ? screen.getComponent() : screen.component;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationStateContext.default.Provider, {
      value: context,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_EnsureSingleNavigator.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_StaticContainer.default, {
          name: screen.name,
          render: ScreenComponent || screen.children,
          navigation: navigation,
          route: route,
          children: ScreenComponent !== undefined ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ScreenComponent, {
            navigation: navigation,
            route: route
          }) : screen.children !== undefined ? screen.children({
            navigation: navigation,
            route: route
          }) : null
        })
      })
    });
  }
},-81,[7,2,-27,-33,-82,-38,89],"node_modules/@react-navigation/core/src/SceneView.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useDescriptors;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/toConsumableArray"));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4], "react"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./NavigationBuilderContext"));
  var _NavigationContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./NavigationContext"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./NavigationRouteContext"));
  var _SceneView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./SceneView"));
  var _useNavigationCache = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9], "./useNavigationCache"));
  var _useRouteCache = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./useRouteCache"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[11], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/core/src/useDescriptors.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  /**
   * Hook to create descriptor objects for the child routes.
   *
   * A descriptor object provides 3 things:
   * - Helper method to render a screen
   * - Options specified by the screen for the navigator
   * - Navigation object intended for the route
   */
  function useDescriptors(_ref) {
    var state = _ref.state,
      screens = _ref.screens,
      navigation = _ref.navigation,
      screenOptions = _ref.screenOptions,
      defaultScreenOptions = _ref.defaultScreenOptions,
      onAction = _ref.onAction,
      getState = _ref.getState,
      setState = _ref.setState,
      addListener = _ref.addListener,
      addKeyedListener = _ref.addKeyedListener,
      onRouteFocus = _ref.onRouteFocus,
      router = _ref.router,
      emitter = _ref.emitter;
    var _React$useState = React.useState({}),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      options = _React$useState2[0],
      setOptions = _React$useState2[1];
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      onDispatchAction = _React$useContext.onDispatchAction,
      onOptionsChange = _React$useContext.onOptionsChange,
      stackRef = _React$useContext.stackRef;
    var context = React.useMemo(function () {
      return {
        navigation: navigation,
        onAction: onAction,
        addListener: addListener,
        addKeyedListener: addKeyedListener,
        onRouteFocus: onRouteFocus,
        onDispatchAction: onDispatchAction,
        onOptionsChange: onOptionsChange,
        stackRef: stackRef
      };
    }, [navigation, onAction, addListener, addKeyedListener, onRouteFocus, onDispatchAction, onOptionsChange, stackRef]);
    var navigations = (0, _useNavigationCache.default)({
      state: state,
      getState: getState,
      navigation: navigation,
      setOptions: setOptions,
      router: router,
      emitter: emitter
    });
    var routes = (0, _useRouteCache.default)(state.routes);
    return routes.reduce(function (acc, route, i) {
      var config = screens[route.name];
      var screen = config.props;
      var navigation = navigations[route.key];
      var optionsList = [
      // The default `screenOptions` passed to the navigator
      screenOptions].concat((0, _toConsumableArray2.default)(config.options ? config.options.filter(Boolean) : []), [
      // The `options` prop passed to `Screen` elements,
      screen.options,
      // The options set via `navigation.setOptions`
      options[route.key]]);
      var customOptions = optionsList.reduce(function (acc, curr) {
        return Object.assign(acc,
        // @ts-expect-error: we check for function but TS still complains
        typeof curr !== 'function' ? curr : curr({
          route: route,
          navigation: navigation
        }));
      }, {});
      var mergedOptions = Object.assign({}, typeof defaultScreenOptions === 'function' ?
      // @ts-expect-error: ts gives incorrect error here
      defaultScreenOptions({
        route: route,
        navigation: navigation,
        options: customOptions
      }) : defaultScreenOptions, customOptions);
      var clearOptions = function clearOptions() {
        return setOptions(function (o) {
          if (route.key in o) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _route$key = route.key,
              _ = o[_route$key],
              rest = (0, _objectWithoutProperties2.default)(o, [_route$key].map(_toPropertyKey));
            return rest;
          }
          return o;
        });
      };
      acc[route.key] = {
        route: route,
        // @ts-expect-error: it's missing action helpers, fix later
        navigation: navigation,
        render: function render() {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationBuilderContext.default.Provider, {
            value: context,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationContext.default.Provider, {
              value: navigation,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationRouteContext.default.Provider, {
                value: route,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SceneView.default, {
                  navigation: navigation,
                  route: route,
                  screen: screen,
                  routeState: state.routes[i].state,
                  getState: getState,
                  setState: setState,
                  options: mergedOptions,
                  clearOptions: clearOptions
                })
              })
            })
          }, route.key);
        },
        options: mergedOptions
      };
      return acc;
    }, {});
  }
},-80,[7,151,10,28,2,-29,-31,-32,-81,-83,-56,89],"node_modules/@react-navigation/core/src/useDescriptors.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useCurrentRender;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _CurrentRenderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./CurrentRenderContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Write the current options, so that server renderer can get current values
   * Mutating values like this is not safe in async mode, but it doesn't apply to SSR
   */
  function useCurrentRender(_ref) {
    var state = _ref.state,
      navigation = _ref.navigation,
      descriptors = _ref.descriptors;
    var current = React.useContext(_CurrentRenderContext.default);
    if (current && navigation.isFocused()) {
      current.options = descriptors[state.routes[state.index].key].options;
    }
  }
},-79,[7,2,-53],"node_modules/@react-navigation/core/src/useCurrentRender.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useComponent;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[1], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/core/src/useComponent.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var NavigationContent = function NavigationContent(_ref) {
    var render = _ref.render,
      children = _ref.children;
    return render(children);
  };
  function useComponent(render) {
    var _this = this;
    var renderRef = React.useRef(render);

    // Normally refs shouldn't be mutated in render
    // But we return a component which will be rendered
    // So it's just for immediate consumption
    renderRef.current = render;
    React.useEffect(function () {
      renderRef.current = null;
    });
    return React.useRef(function (_ref2) {
      var children = _ref2.children;
      var render = renderRef.current;
      if (render === null) {
        throw new Error('The returned component must be rendered in the same render phase as the hook.');
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(NavigationContent, {
        render: render,
        children: children
      });
    }).current;
  }
},-78,[2,89],"node_modules/@react-navigation/core/src/useComponent.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isRecordEqual;
  /**
   * Compare two records with primitive values as the content.
   */
  function isRecordEqual(a, b) {
    if (a === b) {
      return true;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(function (key) {
      return a[key] === b[key];
    });
  }
},-77,[],"node_modules/@react-navigation/core/src/isRecordEqual.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isArrayEqual;
  /**
   * Compare two arrays with primitive values as the content.
   * We need to make sure that both values and order match.
   */
  function isArrayEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (a.length !== b.length) {
      return false;
    }
    return a.every(function (it, index) {
      return it === b[index];
    });
  }
},-76,[],"node_modules/@react-navigation/core/src/isArrayEqual.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useNavigationBuilder;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/defineProperty"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/objectWithoutProperties"));
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "@babel/runtime/helpers/toConsumableArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5], "react"));
  var _Group = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./Group"));
  var _isArrayEqual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./isArrayEqual"));
  var _isRecordEqual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./isRecordEqual"));
  var _NavigationHelpersContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9], "./NavigationHelpersContext"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./NavigationRouteContext"));
  var _NavigationStateContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11], "./NavigationStateContext"));
  var _PreventRemoveProvider = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12], "./PreventRemoveProvider"));
  var _Screen = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13], "./Screen"));
  var _useChildListeners2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14], "./useChildListeners"));
  var _useComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15], "./useComponent"));
  var _useCurrentRender = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16], "./useCurrentRender"));
  var _useDescriptors = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17], "./useDescriptors"));
  var _useEventEmitter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18], "./useEventEmitter"));
  var _useFocusedListenersChildrenAdapter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19], "./useFocusedListenersChildrenAdapter"));
  var _useFocusEvents = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20], "./useFocusEvents"));
  var _useKeyedChildListeners = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21], "./useKeyedChildListeners"));
  var _useNavigationHelpers = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22], "./useNavigationHelpers"));
  var _useOnAction = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23], "./useOnAction"));
  var _useOnGetState = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[24], "./useOnGetState"));
  var _useOnRouteFocus = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25], "./useOnRouteFocus"));
  var _useRegisterNavigator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26], "./useRegisterNavigator"));
  var _useScheduleUpdate = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[27], "./useScheduleUpdate"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[28], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/core/src/useNavigationBuilder.tsx";
  var _excluded = ["children", "screenListeners"]; // This is to make TypeScript compiler happy
  // eslint-disable-next-line babel/no-unused-expressions
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  _$$_REQUIRE(_dependencyMap[29], "./types").PrivateValueStore;
  var isValidKey = function isValidKey(key) {
    return key === undefined || typeof key === 'string' && key !== '';
  };

  /**
   * Extract route config object from React children elements.
   *
   * @param children React Elements to extract the config from.
   */
  var _getRouteConfigsFromChildren = function getRouteConfigsFromChildren(children, groupKey, groupOptions) {
    var configs = React.Children.toArray(children).reduce(function (acc, child) {
      var _child$type, _child$props;
      if (React.isValidElement(child)) {
        if (child.type === _Screen.default) {
          // We can only extract the config from `Screen` elements
          // If something else was rendered, it's probably a bug

          if (!isValidKey(child.props.navigationKey)) {
            throw new Error("Got an invalid 'navigationKey' prop (" + JSON.stringify(child.props.navigationKey) + ") for the screen '" + child.props.name + "'. It must be a non-empty string or 'undefined'.");
          }
          acc.push({
            keys: [groupKey, child.props.navigationKey],
            options: groupOptions,
            props: child.props
          });
          return acc;
        }
        if (child.type === React.Fragment || child.type === _Group.default) {
          if (!isValidKey(child.props.navigationKey)) {
            throw new Error("Got an invalid 'navigationKey' prop (" + JSON.stringify(child.props.navigationKey) + ") for the group. It must be a non-empty string or 'undefined'.");
          }

          // When we encounter a fragment or group, we need to dive into its children to extract the configs
          // This is handy to conditionally define a group of screens
          acc.push.apply(acc, (0, _toConsumableArray2.default)(_getRouteConfigsFromChildren(child.props.children, child.props.navigationKey, child.type !== _Group.default ? groupOptions : groupOptions != null ? [].concat((0, _toConsumableArray2.default)(groupOptions), [child.props.screenOptions]) : [child.props.screenOptions])));
          return acc;
        }
      }
      throw new Error("A navigator can only contain 'Screen', 'Group' or 'React.Fragment' as its direct children (found " + (React.isValidElement(child) ? "'" + (typeof child.type === 'string' ? child.type : (_child$type = child.type) == null ? void 0 : _child$type.name) + "'" + (child.props != null && typeof child.props === 'object' && 'name' in child.props && (_child$props = child.props) != null && _child$props.name ? " for the screen '" + child.props.name + "'" : '') : typeof child === 'object' ? JSON.stringify(child) : "'" + String(child) + "'") + "). To render this component in the navigator, pass it in the 'component' prop to 'Screen'.");
    }, []);
    if (process.env.NODE_ENV !== 'production') {
      configs.forEach(function (config) {
        var _config$props = config.props,
          name = _config$props.name,
          children = _config$props.children,
          component = _config$props.component,
          getComponent = _config$props.getComponent;
        if (typeof name !== 'string' || !name) {
          throw new Error("Got an invalid name (" + JSON.stringify(name) + ") for the screen. It must be a non-empty string.");
        }
        if (children != null || component !== undefined || getComponent !== undefined) {
          if (children != null && component !== undefined) {
            throw new Error("Got both 'component' and 'children' props for the screen '" + name + "'. You must pass only one of them.");
          }
          if (children != null && getComponent !== undefined) {
            throw new Error("Got both 'getComponent' and 'children' props for the screen '" + name + "'. You must pass only one of them.");
          }
          if (component !== undefined && getComponent !== undefined) {
            throw new Error("Got both 'component' and 'getComponent' props for the screen '" + name + "'. You must pass only one of them.");
          }
          if (children != null && typeof children !== 'function') {
            throw new Error("Got an invalid value for 'children' prop for the screen '" + name + "'. It must be a function returning a React Element.");
          }
          if (component !== undefined && !(0, _$$_REQUIRE(_dependencyMap[30], "react-is").isValidElementType)(component)) {
            throw new Error("Got an invalid value for 'component' prop for the screen '" + name + "'. It must be a valid React Component.");
          }
          if (getComponent !== undefined && typeof getComponent !== 'function') {
            throw new Error("Got an invalid value for 'getComponent' prop for the screen '" + name + "'. It must be a function returning a React Component.");
          }
          if (typeof component === 'function') {
            if (component.name === 'component') {
              // Inline anonymous functions passed in the `component` prop will have the name of the prop
              // It's relatively safe to assume that it's not a component since it should also have PascalCase name
              // We won't catch all scenarios here, but this should catch a good chunk of incorrect use.
              console.warn("Looks like you're passing an inline function for 'component' prop for the screen '" + name + "' (e.g. component={() => <SomeComponent />}). Passing an inline function will cause the component state to be lost on re-render and cause perf issues since it's re-created every render. You can pass the function as children to 'Screen' instead to achieve the desired behaviour.");
            } else if (/^[a-z]/.test(component.name)) {
              console.warn("Got a component with the name '" + component.name + "' for the screen '" + name + "'. React Components must start with an uppercase letter. If you're passing a regular function and not a component, pass it as children to 'Screen' instead. Otherwise capitalize your component's name.");
            }
          }
        } else {
          throw new Error("Couldn't find a 'component', 'getComponent' or 'children' prop for the screen '" + name + "'. This can happen if you passed 'undefined'. You likely forgot to export your component from the file it's defined in, or mixed up default import and named import when importing.");
        }
      });
    }
    return configs;
  };

  /**
   * Hook for building navigators.
   *
   * @param createRouter Factory method which returns router object.
   * @param options Options object containing `children` and additional options for the router.
   * @returns An object containing `state`, `navigation`, `descriptors` objects.
   */
  function useNavigationBuilder(createRouter, options) {
    var _this = this;
    var navigatorKey = (0, _useRegisterNavigator.default)();
    var route = React.useContext(_NavigationRouteContext.default);
    var children = options.children,
      screenListeners = options.screenListeners,
      rest = (0, _objectWithoutProperties2.default)(options, _excluded);
    var _React$useRef = React.useRef(createRouter(Object.assign({}, rest, route != null && route.params && route.params.state == null && route.params.initial !== false && typeof route.params.screen === 'string' ? {
        initialRouteName: route.params.screen
      } : null))),
      router = _React$useRef.current;
    var routeConfigs = _getRouteConfigsFromChildren(children);
    var screens = routeConfigs.reduce(function (acc, config) {
      if (config.props.name in acc) {
        throw new Error("A navigator cannot contain multiple 'Screen' components with the same name (found duplicate screen named '" + config.props.name + "')");
      }
      acc[config.props.name] = config;
      return acc;
    }, {});
    var routeNames = routeConfigs.map(function (config) {
      return config.props.name;
    });
    var routeKeyList = routeNames.reduce(function (acc, curr) {
      acc[curr] = screens[curr].keys.map(function (key) {
        return key != null ? key : '';
      }).join(':');
      return acc;
    }, {});
    var routeParamList = routeNames.reduce(function (acc, curr) {
      var initialParams = screens[curr].props.initialParams;
      acc[curr] = initialParams;
      return acc;
    }, {});
    var routeGetIdList = routeNames.reduce(function (acc, curr) {
      return Object.assign(acc, (0, _defineProperty2.default)({}, curr, screens[curr].props.getId));
    }, {});
    if (!routeNames.length) {
      throw new Error("Couldn't find any screens for the navigator. Have you defined any screens as its children?");
    }
    var isStateValid = React.useCallback(function (state) {
      return state.type === undefined || state.type === router.type;
    }, [router.type]);
    var isStateInitialized = React.useCallback(function (state) {
      return state !== undefined && state.stale === false && isStateValid(state);
    }, [isStateValid]);
    var _React$useContext = React.useContext(_NavigationStateContext.default),
      currentState = _React$useContext.state,
      getCurrentState = _React$useContext.getState,
      setCurrentState = _React$useContext.setState,
      setKey = _React$useContext.setKey,
      getKey = _React$useContext.getKey,
      getIsInitial = _React$useContext.getIsInitial;
    var stateCleanedUp = React.useRef(false);
    var cleanUpState = React.useCallback(function () {
      setCurrentState(undefined);
      stateCleanedUp.current = true;
    }, [setCurrentState]);
    var setState = React.useCallback(function (state) {
      if (stateCleanedUp.current) {
        // State might have been already cleaned up due to unmount
        // We do not want to expose API allowing to override this
        // This would lead to old data preservation on main navigator unmount
        return;
      }
      setCurrentState(state);
    }, [setCurrentState]);
    var _React$useMemo = React.useMemo(function () {
        var _route$params4;
        var initialRouteParamList = routeNames.reduce(function (acc, curr) {
          var _route$params, _route$params2, _route$params3;
          var initialParams = screens[curr].props.initialParams;
          var initialParamsFromParams = (route == null ? void 0 : (_route$params = route.params) == null ? void 0 : _route$params.state) == null && (route == null ? void 0 : (_route$params2 = route.params) == null ? void 0 : _route$params2.initial) !== false && (route == null ? void 0 : (_route$params3 = route.params) == null ? void 0 : _route$params3.screen) === curr ? route.params.params : undefined;
          acc[curr] = initialParams !== undefined || initialParamsFromParams !== undefined ? Object.assign({}, initialParams, initialParamsFromParams) : undefined;
          return acc;
        }, {});

        // If the current state isn't initialized on first render, we initialize it
        // We also need to re-initialize it if the state passed from parent was changed (maybe due to reset)
        // Otherwise assume that the state was provided as initial state
        // So we need to rehydrate it to make it usable
        if ((currentState === undefined || !isStateValid(currentState)) && (route == null ? void 0 : (_route$params4 = route.params) == null ? void 0 : _route$params4.state) == null) {
          return [router.getInitialState({
            routeNames: routeNames,
            routeParamList: initialRouteParamList,
            routeGetIdList: routeGetIdList
          }), true];
        } else {
          var _route$params$state, _route$params5;
          return [router.getRehydratedState((_route$params$state = route == null ? void 0 : (_route$params5 = route.params) == null ? void 0 : _route$params5.state) != null ? _route$params$state : currentState, {
            routeNames: routeNames,
            routeParamList: initialRouteParamList,
            routeGetIdList: routeGetIdList
          }), false];
        }
        // We explicitly don't include routeNames, route.params etc. in the dep list
        // below. We want to avoid forcing a new state to be calculated in those cases
        // Instead, we handle changes to these in the nextState code below. Note
        // that some changes to routeConfigs are explicitly ignored, such as changes
        // to initialParams
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentState, router, isStateValid]),
      _React$useMemo2 = (0, _slicedToArray2.default)(_React$useMemo, 2),
      initializedState = _React$useMemo2[0],
      isFirstStateInitialization = _React$useMemo2[1];
    var previousRouteKeyListRef = React.useRef(routeKeyList);
    React.useEffect(function () {
      previousRouteKeyListRef.current = routeKeyList;
    });
    var previousRouteKeyList = previousRouteKeyListRef.current;
    var state =
    // If the state isn't initialized, or stale, use the state we initialized instead
    // The state won't update until there's a change needed in the state we have initalized locally
    // So it'll be `undefined` or stale until the first navigation event happens
    isStateInitialized(currentState) ? currentState : initializedState;
    var nextState = state;
    if (!(0, _isArrayEqual.default)(state.routeNames, routeNames) || !(0, _isRecordEqual.default)(routeKeyList, previousRouteKeyList)) {
      // When the list of route names change, the router should handle it to remove invalid routes
      nextState = router.getStateForRouteNamesChange(state, {
        routeNames: routeNames,
        routeParamList: routeParamList,
        routeGetIdList: routeGetIdList,
        routeKeyChanges: Object.keys(routeKeyList).filter(function (name) {
          return previousRouteKeyList.hasOwnProperty(name) && routeKeyList[name] !== previousRouteKeyList[name];
        })
      });
    }
    var previousNestedParamsRef = React.useRef(route == null ? void 0 : route.params);
    React.useEffect(function () {
      previousNestedParamsRef.current = route == null ? void 0 : route.params;
    }, [route == null ? void 0 : route.params]);
    if (route != null && route.params) {
      var previousParams = previousNestedParamsRef.current;
      var action;
      if (typeof route.params.state === 'object' && route.params.state != null && route.params !== previousParams) {
        // If the route was updated with new state, we should reset to it
        action = _$$_REQUIRE(_dependencyMap[31], "@react-navigation/routers").CommonActions.reset(route.params.state);
      } else if (typeof route.params.screen === 'string' && (route.params.initial === false && isFirstStateInitialization || route.params !== previousParams)) {
        // If the route was updated with new screen name and/or params, we should navigate there
        action = _$$_REQUIRE(_dependencyMap[31], "@react-navigation/routers").CommonActions.navigate({
          name: route.params.screen,
          params: route.params.params,
          path: route.params.path
        });
      }

      // The update should be limited to current navigator only, so we call the router manually
      var updatedState = action ? router.getStateForAction(nextState, action, {
        routeNames: routeNames,
        routeParamList: routeParamList,
        routeGetIdList: routeGetIdList
      }) : null;
      nextState = updatedState !== null ? router.getRehydratedState(updatedState, {
        routeNames: routeNames,
        routeParamList: routeParamList,
        routeGetIdList: routeGetIdList
      }) : nextState;
    }
    var shouldUpdate = state !== nextState;
    (0, _useScheduleUpdate.default)(function () {
      if (shouldUpdate) {
        // If the state needs to be updated, we'll schedule an update
        setState(nextState);
      }
    });

    // The up-to-date state will come in next render, but we don't need to wait for it
    // We can't use the outdated state since the screens have changed, which will cause error due to mismatched config
    // So we override the state object we return to use the latest state as soon as possible
    state = nextState;
    React.useEffect(function () {
      setKey(navigatorKey);
      if (!getIsInitial()) {
        // If it's not initial render, we need to update the state
        // This will make sure that our container gets notifier of state changes due to new mounts
        // This is necessary for proper screen tracking, URL updates etc.
        setState(nextState);
      }
      return function () {
        // We need to clean up state for this navigator on unmount
        // We do it in a timeout because we need to detect if another navigator mounted in the meantime
        // For example, if another navigator has started rendering, we should skip cleanup
        // Otherwise, our cleanup step will cleanup state for the other navigator and re-initialize it
        setTimeout(function () {
          if (getCurrentState() !== undefined && getKey() === navigatorKey) {
            cleanUpState();
          }
        }, 0);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // We initialize this ref here to avoid a new getState getting initialized
    // whenever initializedState changes. We want getState to have access to the
    // latest initializedState, but don't need it to change when that happens
    var initializedStateRef = React.useRef();
    initializedStateRef.current = initializedState;
    var getState = React.useCallback(function () {
      var currentState = getCurrentState();
      return isStateInitialized(currentState) ? currentState : initializedStateRef.current;
    }, [getCurrentState, isStateInitialized]);
    var emitter = (0, _useEventEmitter.default)(function (e) {
      var _ref;
      var routeNames = [];
      var route;
      if (e.target) {
        var _route;
        route = state.routes.find(function (route) {
          return route.key === e.target;
        });
        if ((_route = route) != null && _route.name) {
          routeNames.push(route.name);
        }
      } else {
        route = state.routes[state.index];
        routeNames.push.apply(routeNames, (0, _toConsumableArray2.default)(Object.keys(screens).filter(function (name) {
          var _route2;
          return ((_route2 = route) == null ? void 0 : _route2.name) === name;
        })));
      }
      if (route == null) {
        return;
      }
      var navigation = descriptors[route.key].navigation;
      var listeners = (_ref = []).concat.apply(_ref, (0, _toConsumableArray2.default)([screenListeners].concat((0, _toConsumableArray2.default)(routeNames.map(function (name) {
        var listeners = screens[name].props.listeners;
        return listeners;
      }))).map(function (listeners) {
        var map = typeof listeners === 'function' ? listeners({
          route: route,
          navigation: navigation
        }) : listeners;
        return map ? Object.keys(map).filter(function (type) {
          return type === e.type;
        }).map(function (type) {
          return map == null ? void 0 : map[type];
        }) : undefined;
      })))
      // We don't want same listener to be called multiple times for same event
      // So we remove any duplicate functions from the array
      .filter(function (cb, i, self) {
        return cb && self.lastIndexOf(cb) === i;
      });
      listeners.forEach(function (listener) {
        return listener == null ? void 0 : listener(e);
      });
    });
    (0, _useFocusEvents.default)({
      state: state,
      emitter: emitter
    });
    React.useEffect(function () {
      emitter.emit({
        type: 'state',
        data: {
          state: state
        }
      });
    }, [emitter, state]);
    var _useChildListeners = (0, _useChildListeners2.default)(),
      childListeners = _useChildListeners.listeners,
      addListener = _useChildListeners.addListener;
    var _useKeyedChildListene = (0, _useKeyedChildListeners.default)(),
      keyedListeners = _useKeyedChildListene.keyedListeners,
      addKeyedListener = _useKeyedChildListene.addKeyedListener;
    var onAction = (0, _useOnAction.default)({
      router: router,
      getState: getState,
      setState: setState,
      key: route == null ? void 0 : route.key,
      actionListeners: childListeners.action,
      beforeRemoveListeners: keyedListeners.beforeRemove,
      routerConfigOptions: {
        routeNames: routeNames,
        routeParamList: routeParamList,
        routeGetIdList: routeGetIdList
      },
      emitter: emitter
    });
    var onRouteFocus = (0, _useOnRouteFocus.default)({
      router: router,
      key: route == null ? void 0 : route.key,
      getState: getState,
      setState: setState
    });
    var navigation = (0, _useNavigationHelpers.default)({
      id: options.id,
      onAction: onAction,
      getState: getState,
      emitter: emitter,
      router: router
    });
    (0, _useFocusedListenersChildrenAdapter.default)({
      navigation: navigation,
      focusedListeners: childListeners.focus
    });
    (0, _useOnGetState.default)({
      getState: getState,
      getStateListeners: keyedListeners.getState
    });
    var descriptors = (0, _useDescriptors.default)({
      state: state,
      screens: screens,
      navigation: navigation,
      screenOptions: options.screenOptions,
      defaultScreenOptions: options.defaultScreenOptions,
      onAction: onAction,
      getState: getState,
      setState: setState,
      onRouteFocus: onRouteFocus,
      addListener: addListener,
      addKeyedListener: addKeyedListener,
      router: router,
      // @ts-expect-error: this should have both core and custom events, but too much work right now
      emitter: emitter
    });
    (0, _useCurrentRender.default)({
      state: state,
      navigation: navigation,
      descriptors: descriptors
    });
    var NavigationContent = (0, _useComponent.default)(function (children) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationHelpersContext.default.Provider, {
        value: navigation,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreventRemoveProvider.default, {
          children: children
        })
      });
    });
    return {
      state: state,
      navigation: navigation,
      descriptors: descriptors,
      NavigationContent: NavigationContent
    };
  }
},-75,[7,28,203,151,10,2,-51,-76,-77,-67,-32,-33,-69,-52,-35,-78,-79,-80,-36,-84,-85,-37,-86,-87,-89,-90,-91,-49,89,-71,302,-41],"node_modules/@react-navigation/core/src/useNavigationBuilder.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useIsFocused;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var React = _react;
  var _useNavigation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./useNavigation"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to get the current focus state of the screen. Returns a `true` if screen is focused, otherwise `false`.
   * This can be used if a component needs to render something based on the focus state.
   */
  function useIsFocused() {
    var navigation = (0, _useNavigation.default)();
    var _useState = (0, _react.useState)(navigation.isFocused),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];
    var valueToReturn = navigation.isFocused();
    if (isFocused !== valueToReturn) {
      // If the value has changed since the last render, we need to update it.
      // This could happen if we missed an update from the event listeners during re-render.
      // React will process this update immediately, so the old subscription value won't be committed.
      // It is still nice to avoid returning a mismatched value though, so let's override the return value.
      // This is the same logic as in https://github.com/facebook/react/tree/master/packages/use-subscription
      setIsFocused(valueToReturn);
    }
    React.useEffect(function () {
      var unsubscribeFocus = navigation.addListener('focus', function () {
        return setIsFocused(true);
      });
      var unsubscribeBlur = navigation.addListener('blur', function () {
        return setIsFocused(false);
      });
      return function () {
        unsubscribeFocus();
        unsubscribeBlur();
      };
    }, [navigation]);
    React.useDebugValue(valueToReturn);
    return valueToReturn;
  }
},-74,[7,28,2,-73],"node_modules/@react-navigation/core/src/useIsFocused.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useNavigation;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationContainerRefContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationContainerRefContext"));
  var _NavigationContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./NavigationContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to access the navigation prop of the parent screen anywhere.
   *
   * @returns Navigation prop of the parent screen.
   */
  function useNavigation() {
    var root = React.useContext(_NavigationContainerRefContext.default);
    var navigation = React.useContext(_NavigationContext.default);
    if (navigation === undefined && root === undefined) {
      throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
    }

    // FIXME: Figure out a better way to do this
    return navigation != null ? navigation : root;
  }
},-73,[7,2,-30,-31],"node_modules/@react-navigation/core/src/useNavigation.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useFocusEffect;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _useNavigation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./useNavigation"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to run an effect in a focused screen, similar to `React.useEffect`.
   * This can be used to perform side-effects such as fetching data or subscribing to events.
   * The passed callback should be wrapped in `React.useCallback` to avoid running the effect too often.
   *
   * @param callback Memoized callback containing the effect, should optionally return a cleanup function.
   */
  function useFocusEffect(effect) {
    var navigation = (0, _useNavigation.default)();
    if (arguments[1] !== undefined) {
      var message = "You passed a second argument to 'useFocusEffect', but it only accepts one argument. " + "If you want to pass a dependency array, you can use 'React.useCallback':\n\n" + 'useFocusEffect(\n' + '  React.useCallback(() => {\n' + '    // Your code here\n' + '  }, [depA, depB])\n' + ');\n\n' + 'See usage guide: https://reactnavigation.org/docs/use-focus-effect';
      console.error(message);
    }
    React.useEffect(function () {
      var isFocused = false;
      var cleanup;
      var callback = function callback() {
        var destroy = effect();
        if (destroy === undefined || typeof destroy === 'function') {
          return destroy;
        }
        if (process.env.NODE_ENV !== 'production') {
          var _message = 'An effect function must not return anything besides a function, which is used for clean-up.';
          if (destroy === null) {
            _message += " You returned 'null'. If your effect does not require clean-up, return 'undefined' (or nothing).";
          } else if (typeof destroy.then === 'function') {
            _message += "\n\nIt looks like you wrote 'useFocusEffect(async () => ...)' or returned a Promise. " + 'Instead, write the async function inside your effect ' + 'and call it immediately:\n\n' + 'useFocusEffect(\n' + '  React.useCallback(() => {\n' + '    async function fetchData() {\n' + '      // You can await here\n' + '      const response = await MyAPI.getData(someId);\n' + '      // ...\n' + '    }\n\n' + '    fetchData();\n' + '  }, [someId])\n' + ');\n\n' + 'See usage guide: https://reactnavigation.org/docs/use-focus-effect';
          } else {
            _message += " You returned '" + JSON.stringify(destroy) + "'.";
          }
          console.error(_message);
        }
      };

      // We need to run the effect on intial render/dep changes if the screen is focused
      if (navigation.isFocused()) {
        cleanup = callback();
        isFocused = true;
      }
      var unsubscribeFocus = navigation.addListener('focus', function () {
        // If callback was already called for focus, avoid calling it again
        // The focus event may also fire on intial render, so we guard against runing the effect twice
        if (isFocused) {
          return;
        }
        if (cleanup !== undefined) {
          cleanup();
        }
        cleanup = callback();
        isFocused = true;
      });
      var unsubscribeBlur = navigation.addListener('blur', function () {
        if (cleanup !== undefined) {
          cleanup();
        }
        cleanup = undefined;
        isFocused = false;
      });
      return function () {
        if (cleanup !== undefined) {
          cleanup();
        }
        unsubscribeFocus();
        unsubscribeBlur();
      };
    }, [effect, navigation]);
  }
},-72,[7,2,-73],"node_modules/@react-navigation/core/src/useFocusEffect.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PrivateValueStore = void 0;
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/createClass"));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/classCallCheck"));
  var PrivateValueStore = exports.PrivateValueStore = /*#__PURE__*/(0, _createClass2.default)(function PrivateValueStore() {
    (0, _classCallCheck2.default)(this, PrivateValueStore);
  });
},-71,[7,17,16],"node_modules/@react-navigation/core/src/types.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var React = _$$_REQUIRE(_dependencyMap[0], "react");
  /**
   * Use `useEffect` during SSR and `useLayoutEffect` in the Browser & React Native to avoid warnings.
   */
  var useClientLayoutEffect = typeof document !== 'undefined' || typeof navigator !== 'undefined' && navigator.product === 'ReactNative' ? React.useLayoutEffect : React.useEffect;
  /**
   * React hook which returns the latest callback without changing the reference.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function useLatestCallback(callback) {
    var ref = React.useRef(callback);
    var latestCallback = React.useRef(function latestCallback() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return ref.current.apply(this, args);
    }).current;
    useClientLayoutEffect(function () {
      ref.current = callback;
    });
    return latestCallback;
  }
  module.exports = useLatestCallback;
},-70,[2],"node_modules/@react-navigation/core/node_modules/use-latest-callback/lib/src/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = PreventRemoveProvider;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/toConsumableArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _useLatestCallback = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "use-latest-callback"));
  var _NavigationHelpersContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./NavigationHelpersContext"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./NavigationRouteContext"));
  var _PreventRemoveContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./PreventRemoveContext"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/core/src/PreventRemoveProvider.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Util function to transform map of prevented routes to a simpler object.
   */
  var transformPreventedRoutes = function transformPreventedRoutes(preventedRoutesMap) {
    var preventedRoutesToTransform = (0, _toConsumableArray2.default)(preventedRoutesMap.values());
    var preventedRoutes = preventedRoutesToTransform.reduce(function (acc, _ref) {
      var _acc$routeKey;
      var routeKey = _ref.routeKey,
        preventRemove = _ref.preventRemove;
      acc[routeKey] = {
        preventRemove: ((_acc$routeKey = acc[routeKey]) == null ? void 0 : _acc$routeKey.preventRemove) || preventRemove
      };
      return acc;
    }, {});
    return preventedRoutes;
  };

  /**
   * Component used for managing which routes have to be prevented from removal in native-stack.
   */
  function PreventRemoveProvider(_ref2) {
    var children = _ref2.children;
    var _React$useState = React.useState(function () {
        return (0, _$$_REQUIRE(_dependencyMap[9], "nanoid/non-secure").nanoid)();
      }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      parentId = _React$useState2[0];
    var _React$useState3 = React.useState(new Map()),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      preventedRoutesMap = _React$useState4[0],
      setPreventedRoutesMap = _React$useState4[1];
    var navigation = React.useContext(_NavigationHelpersContext.default);
    var route = React.useContext(_NavigationRouteContext.default);
    var preventRemoveContextValue = React.useContext(_PreventRemoveContext.default);
    // take `setPreventRemove` from parent context - if exist it means we're in a nested context
    var setParentPrevented = preventRemoveContextValue == null ? void 0 : preventRemoveContextValue.setPreventRemove;
    var setPreventRemove = (0, _useLatestCallback.default)(function (id, routeKey, preventRemove) {
      if (preventRemove && (navigation == null || navigation != null && navigation.getState().routes.every(function (route) {
        return route.key !== routeKey;
      }))) {
        throw new Error("Couldn't find a route with the key " + routeKey + ". Is your component inside NavigationContent?");
      }
      setPreventedRoutesMap(function (prevPrevented) {
        var _prevPrevented$get, _prevPrevented$get2;
        // values haven't changed - do nothing
        if (routeKey === ((_prevPrevented$get = prevPrevented.get(id)) == null ? void 0 : _prevPrevented$get.routeKey) && preventRemove === ((_prevPrevented$get2 = prevPrevented.get(id)) == null ? void 0 : _prevPrevented$get2.preventRemove)) {
          return prevPrevented;
        }
        var nextPrevented = new Map(prevPrevented);
        if (preventRemove) {
          nextPrevented.set(id, {
            routeKey: routeKey,
            preventRemove: preventRemove
          });
        } else {
          nextPrevented.delete(id);
        }
        return nextPrevented;
      });
    });
    var isPrevented = (0, _toConsumableArray2.default)(preventedRoutesMap.values()).some(function (_ref3) {
      var preventRemove = _ref3.preventRemove;
      return preventRemove;
    });
    React.useEffect(function () {
      if ((route == null ? void 0 : route.key) !== undefined && setParentPrevented !== undefined) {
        // when route is defined (and setParentPrevented) it means we're in a nested stack
        // route.key then will be the route key of parent
        setParentPrevented(parentId, route.key, isPrevented);
        return function () {
          setParentPrevented(parentId, route.key, false);
        };
      }
      return;
    }, [parentId, isPrevented, route == null ? void 0 : route.key, setParentPrevented]);
    var value = React.useMemo(function () {
      return {
        setPreventRemove: setPreventRemove,
        preventedRoutes: transformPreventedRoutes(preventedRoutesMap)
      };
    }, [setPreventRemove, preventedRoutesMap]);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreventRemoveContext.default.Provider, {
      value: value,
      children: children
    });
  }
},-69,[7,28,10,2,-70,-67,-32,-68,89,-44],"node_modules/@react-navigation/core/src/PreventRemoveProvider.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * A type of an object that have a route key as an object key
   * and a value whether to prevent that route.
   */

  var PreventRemoveContext = React.createContext(undefined);
  var _default = exports.default = PreventRemoveContext;
},-68,[2],"node_modules/@react-navigation/core/src/PreventRemoveContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Context which holds the navigation helpers of the parent navigator.
   * Navigators should use this context in their view component.
   */
  var NavigationHelpersContext = React.createContext(undefined);
  var _default = exports.default = NavigationHelpersContext;
},-67,[2],"node_modules/@react-navigation/core/src/NavigationHelpersContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = function (string) {
    if (typeof string !== 'string') {
      throw new TypeError('Expected a string');
    }

    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a \unnnn escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
  };
},-66,[],"node_modules/@react-navigation/core/node_modules/escape-string-regexp/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getStateFromPath;
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/defineProperty"));
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/toConsumableArray"));
  var _escapeStringRegexp = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "escape-string-regexp"));
  var queryString = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4], "query-string"));
  var _findFocusedRoute = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./findFocusedRoute"));
  var _validatePathConfig = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./validatePathConfig"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Utility to parse a path string to initial state object accepted by the container.
   * This is useful for deep linking when we need to handle the incoming URL.
   *
   * @example
   * ```js
   * getStateFromPath(
   *   '/chat/jane/42',
   *   {
   *     screens: {
   *       Chat: {
   *         path: 'chat/:author/:id',
   *         parse: { id: Number }
   *       }
   *     }
   *   }
   * )
   * ```
   * @param path Path string to parse and convert, e.g. /foo/bar?count=42.
   * @param options Extra options to fine-tune how to parse the path.
   */
  function getStateFromPath(path, options) {
    var _ref;
    if (options) {
      (0, _validatePathConfig.default)(options);
    }
    var initialRoutes = [];
    if (options != null && options.initialRouteName) {
      initialRoutes.push({
        initialRouteName: options.initialRouteName,
        parentScreens: []
      });
    }
    var screens = options == null ? void 0 : options.screens;
    var remaining = path.replace(/\/+/g, '/') // Replace multiple slash (//) with single ones
    .replace(/^\//, '') // Remove extra leading slash
    .replace(/\?.*$/, ''); // Remove query params which we will handle later

    // Make sure there is a trailing slash
    remaining = remaining.endsWith('/') ? remaining : remaining + "/";
    if (screens === undefined) {
      // When no config is specified, use the path segments as route names
      var _routes = remaining.split('/').filter(Boolean).map(function (segment) {
        var name = decodeURIComponent(segment);
        return {
          name: name
        };
      });
      if (_routes.length) {
        return createNestedStateObject(path, _routes, initialRoutes);
      }
      return undefined;
    }

    // Create a normalized configs array which will be easier to use
    var configs = (_ref = []).concat.apply(_ref, (0, _toConsumableArray2.default)(Object.keys(screens).map(function (key) {
      return _createNormalizedConfigs(key, screens, [], initialRoutes, []);
    }))).sort(function (a, b) {
      // Sort config so that:
      // - the most exhaustive ones are always at the beginning
      // - patterns with wildcard are always at the end

      // If 2 patterns are same, move the one with less route names up
      // This is an error state, so it's only useful for consistent error messages
      if (a.pattern === b.pattern) {
        return b.routeNames.join('>').localeCompare(a.routeNames.join('>'));
      }

      // If one of the patterns starts with the other, it's more exhaustive
      // So move it up
      if (a.pattern.startsWith(b.pattern)) {
        return -1;
      }
      if (b.pattern.startsWith(a.pattern)) {
        return 1;
      }
      var aParts = a.pattern.split('/');
      var bParts = b.pattern.split('/');
      for (var i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        // if b is longer, b get higher priority
        if (aParts[i] == null) {
          return 1;
        }
        // if a is longer, a get higher priority
        if (bParts[i] == null) {
          return -1;
        }
        var aWildCard = aParts[i] === '*' || aParts[i].startsWith(':');
        var bWildCard = bParts[i] === '*' || bParts[i].startsWith(':');
        // if both are wildcard we compare next component
        if (aWildCard && bWildCard) {
          continue;
        }
        // if only a is wild card, b get higher priority
        if (aWildCard) {
          return 1;
        }
        // if only b is wild card, a get higher priority
        if (bWildCard) {
          return -1;
        }
      }
      return bParts.length - aParts.length;
    });

    // Check for duplicate patterns in the config
    configs.reduce(function (acc, config) {
      if (acc[config.pattern]) {
        var a = acc[config.pattern].routeNames;
        var b = config.routeNames;

        // It's not a problem if the path string omitted from a inner most screen
        // For example, it's ok if a path resolves to `A > B > C` or `A > B`
        var intersects = a.length > b.length ? b.every(function (it, i) {
          return a[i] === it;
        }) : a.every(function (it, i) {
          return b[i] === it;
        });
        if (!intersects) {
          throw new Error("Found conflicting screens with the same pattern. The pattern '" + config.pattern + "' resolves to both '" + a.join(' > ') + "' and '" + b.join(' > ') + "'. Patterns must be unique and cannot resolve to more than one screen.");
        }
      }
      return Object.assign(acc, (0, _defineProperty2.default)({}, config.pattern, config));
    }, {});
    if (remaining === '/') {
      // We need to add special handling of empty path so navigation to empty path also works
      // When handling empty path, we should only look at the root level config
      var match = configs.find(function (config) {
        return config.path === '' && config.routeNames.every(
        // Make sure that none of the parent configs have a non-empty path defined
        function (name) {
          var _configs$find;
          return !((_configs$find = configs.find(function (c) {
            return c.screen === name;
          })) != null && _configs$find.path);
        });
      });
      if (match) {
        return createNestedStateObject(path, match.routeNames.map(function (name) {
          return {
            name: name
          };
        }), initialRoutes, configs);
      }
      return undefined;
    }
    var result;
    var current;

    // We match the whole path against the regex instead of segments
    // This makes sure matches such as wildcard will catch any unmatched routes, even if nested
    var _matchAgainstConfigs = matchAgainstConfigs(remaining, configs.map(function (c) {
        return Object.assign({}, c, {
          // Add `$` to the regex to make sure it matches till end of the path and not just beginning
          regex: c.regex ? new RegExp(c.regex.source + '$') : undefined
        });
      })),
      routes = _matchAgainstConfigs.routes,
      remainingPath = _matchAgainstConfigs.remainingPath;
    if (routes !== undefined) {
      // This will always be empty if full path matched
      current = createNestedStateObject(path, routes, initialRoutes, configs);
      remaining = remainingPath;
      result = current;
    }
    if (current == null || result == null) {
      return undefined;
    }
    return result;
  }
  var joinPaths = function joinPaths() {
    var _ref2;
    for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
      paths[_key] = arguments[_key];
    }
    return (_ref2 = []).concat.apply(_ref2, (0, _toConsumableArray2.default)(paths.map(function (p) {
      return p.split('/');
    }))).filter(Boolean).join('/');
  };
  var matchAgainstConfigs = function matchAgainstConfigs(remaining, configs) {
    var routes;
    var remainingPath = remaining;

    // Go through all configs, and see if the next path segment matches our regex
    var _loop = function _loop(config) {
        if (!config.regex) {
          return 0; // continue
        }
        var match = remainingPath.match(config.regex);

        // If our regex matches, we need to extract params from the path
        if (match) {
          var _config$pattern;
          var matchResult = (_config$pattern = config.pattern) == null ? void 0 : _config$pattern.split('/').reduce(function (acc, p, index) {
            if (!p.startsWith(':')) {
              return acc;
            }

            // Path parameter so increment position for the segment
            acc.pos += 1;
            var decodedParamSegment = decodeURIComponent(
            // The param segments appear every second item starting from 2 in the regex match result
            match[(acc.pos + 1) * 2]
            // Remove trailing slash
            .replace(/\/$/, ''));
            Object.assign(acc.matchedParams, (0, _defineProperty2.default)({}, p, Object.assign(acc.matchedParams[p] || {}, (0, _defineProperty2.default)({}, index, decodedParamSegment))));
            return acc;
          }, {
            pos: -1,
            matchedParams: {}
          });
          var matchedParams = matchResult.matchedParams || {};
          routes = config.routeNames.map(function (name) {
            var _routeConfig$pattern$;
            var routeConfig = configs.find(function (c) {
              // Check matching name AND pattern in case same screen is used at different levels in config
              return c.screen === name && config.pattern.startsWith(c.pattern);
            });

            // Normalize pattern to remove any leading, trailing slashes, duplicate slashes etc.
            var normalizedPath = routeConfig == null ? void 0 : routeConfig.path.split('/').filter(Boolean).join('/');

            // Get the number of segments in the initial pattern
            var numInitialSegments = routeConfig == null ? void 0 : (_routeConfig$pattern$ = routeConfig.pattern
            // Extract the prefix from the pattern by removing the ending path pattern (e.g pattern=`a/b/c/d` and normalizedPath=`c/d` becomes `a/b`)
            .replace(new RegExp((0, _escapeStringRegexp.default)(normalizedPath) + "$"), '')) == null ? void 0 : _routeConfig$pattern$.split('/').length;
            var params = normalizedPath == null ? void 0 : normalizedPath.split('/').reduce(function (acc, p, index) {
              var _matchedParams$p;
              if (!p.startsWith(':')) {
                return acc;
              }

              // Get the real index of the path parameter in the matched path
              // by offsetting by the number of segments in the initial pattern
              var offset = numInitialSegments ? numInitialSegments - 1 : 0;
              var value = (_matchedParams$p = matchedParams[p]) == null ? void 0 : _matchedParams$p[index + offset];
              if (value) {
                var _routeConfig$parse;
                var key = p.replace(/^:/, '').replace(/\?$/, '');
                acc[key] = routeConfig != null && (_routeConfig$parse = routeConfig.parse) != null && _routeConfig$parse[key] ? routeConfig.parse[key](value) : value;
              }
              return acc;
            }, {});
            if (params && Object.keys(params).length) {
              return {
                name: name,
                params: params
              };
            }
            return {
              name: name
            };
          });
          remainingPath = remainingPath.replace(match[1], '');
          return 1; // break
        }
      },
      _ret;
    for (var config of configs) {
      _ret = _loop(config);
      if (_ret === 0) continue;
      if (_ret === 1) break;
    }
    return {
      routes: routes,
      remainingPath: remainingPath
    };
  };
  var _createNormalizedConfigs = function createNormalizedConfigs(screen, routeConfig) {
    var routeNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var initials = arguments.length > 3 ? arguments[3] : undefined;
    var parentScreens = arguments.length > 4 ? arguments[4] : undefined;
    var parentPattern = arguments.length > 5 ? arguments[5] : undefined;
    var configs = [];
    routeNames.push(screen);
    parentScreens.push(screen);

    // @ts-expect-error: we can't strongly typecheck this for now
    var config = routeConfig[screen];
    if (typeof config === 'string') {
      // If a string is specified as the value of the key(e.g. Foo: '/path'), use it as the pattern
      var pattern = parentPattern ? joinPaths(parentPattern, config) : config;
      configs.push(createConfigItem(screen, routeNames, pattern, config));
    } else if (typeof config === 'object') {
      var _pattern;

      // if an object is specified as the value (e.g. Foo: { ... }),
      // it can have `path` property and
      // it could have `screens` prop which has nested configs
      if (typeof config.path === 'string') {
        if (config.exact && config.path === undefined) {
          throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
        }
        _pattern = config.exact !== true ? joinPaths(parentPattern || '', config.path || '') : config.path || '';
        configs.push(createConfigItem(screen, routeNames, _pattern, config.path, config.parse));
      }
      if (config.screens) {
        // property `initialRouteName` without `screens` has no purpose
        if (config.initialRouteName) {
          initials.push({
            initialRouteName: config.initialRouteName,
            parentScreens: parentScreens
          });
        }
        Object.keys(config.screens).forEach(function (nestedConfig) {
          var _pattern2;
          var result = _createNormalizedConfigs(nestedConfig, config.screens, routeNames, initials, (0, _toConsumableArray2.default)(parentScreens), (_pattern2 = _pattern) != null ? _pattern2 : parentPattern);
          configs.push.apply(configs, (0, _toConsumableArray2.default)(result));
        });
      }
    }
    routeNames.pop();
    return configs;
  };
  var createConfigItem = function createConfigItem(screen, routeNames, pattern, path, parse) {
    // Normalize pattern to remove any leading, trailing slashes, duplicate slashes etc.
    pattern = pattern.split('/').filter(Boolean).join('/');
    var regex = pattern ? new RegExp("^(" + pattern.split('/').map(function (it) {
      if (it.startsWith(':')) {
        return "(([^/]+\\/)" + (it.endsWith('?') ? '?' : '') + ")";
      }
      return (it === '*' ? '.*' : (0, _escapeStringRegexp.default)(it)) + "\\/";
    }).join('') + ")") : undefined;
    return {
      screen: screen,
      regex: regex,
      pattern: pattern,
      path: path,
      // The routeNames array is mutated, so copy it to keep the current state
      routeNames: (0, _toConsumableArray2.default)(routeNames),
      parse: parse
    };
  };
  var findParseConfigForRoute = function findParseConfigForRoute(routeName, flatConfig) {
    for (var config of flatConfig) {
      if (routeName === config.routeNames[config.routeNames.length - 1]) {
        return config.parse;
      }
    }
    return undefined;
  };

  // Try to find an initial route connected with the one passed
  var findInitialRoute = function findInitialRoute(routeName, parentScreens, initialRoutes) {
    for (var config of initialRoutes) {
      if (parentScreens.length === config.parentScreens.length) {
        var sameParents = true;
        for (var i = 0; i < parentScreens.length; i++) {
          if (parentScreens[i].localeCompare(config.parentScreens[i]) !== 0) {
            sameParents = false;
            break;
          }
        }
        if (sameParents) {
          return routeName !== config.initialRouteName ? config.initialRouteName : undefined;
        }
      }
    }
    return undefined;
  };

  // returns state object with values depending on whether
  // it is the end of state and if there is initialRoute for this level
  var createStateObject = function createStateObject(initialRoute, route, isEmpty) {
    if (isEmpty) {
      if (initialRoute) {
        return {
          index: 1,
          routes: [{
            name: initialRoute
          }, route]
        };
      } else {
        return {
          routes: [route]
        };
      }
    } else {
      if (initialRoute) {
        return {
          index: 1,
          routes: [{
            name: initialRoute
          }, Object.assign({}, route, {
            state: {
              routes: []
            }
          })]
        };
      } else {
        return {
          routes: [Object.assign({}, route, {
            state: {
              routes: []
            }
          })]
        };
      }
    }
  };
  var createNestedStateObject = function createNestedStateObject(path, routes, initialRoutes, flatConfig) {
    var state;
    var route = routes.shift();
    var parentScreens = [];
    var initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
    parentScreens.push(route.name);
    state = createStateObject(initialRoute, route, routes.length === 0);
    if (routes.length > 0) {
      var nestedState = state;
      while (route = routes.shift()) {
        initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
        var nestedStateIndex = nestedState.index || nestedState.routes.length - 1;
        nestedState.routes[nestedStateIndex].state = createStateObject(initialRoute, route, routes.length === 0);
        if (routes.length > 0) {
          nestedState = nestedState.routes[nestedStateIndex].state;
        }
        parentScreens.push(route.name);
      }
    }
    route = (0, _findFocusedRoute.default)(state);
    route.path = path;
    var params = parseQueryParams(path, flatConfig ? findParseConfigForRoute(route.name, flatConfig) : undefined);
    if (params) {
      route.params = Object.assign({}, route.params, params);
    }
    return state;
  };
  var parseQueryParams = function parseQueryParams(path, parseConfig) {
    var query = path.split('?')[1];
    var params = queryString.parse(query);
    if (parseConfig) {
      Object.keys(params).forEach(function (name) {
        if (Object.hasOwnProperty.call(parseConfig, name) && typeof params[name] === 'string') {
          params[name] = parseConfig[name](params[name]);
        }
      });
    }
    return Object.keys(params).length ? params : undefined;
  };
},-65,[7,203,10,-66,-58,-28,-64],"node_modules/@react-navigation/core/src/getStateFromPath.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validatePathConfig;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var formatToList = function formatToList(items) {
    return items.map(function (key) {
      return "- " + key;
    }).join('\n');
  };
  function validatePathConfig(config) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var validKeys = ['initialRouteName', 'screens'];
    if (!root) {
      validKeys.push('path', 'exact', 'stringify', 'parse');
    }
    var invalidKeys = Object.keys(config).filter(function (key) {
      return !validKeys.includes(key);
    });
    if (invalidKeys.length) {
      throw new Error("Found invalid properties in the configuration:\n" + formatToList(invalidKeys) + "\n\nDid you forget to specify them under a 'screens' property?\n\nYou can only specify the following properties:\n" + formatToList(validKeys) + "\n\nSee https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.");
    }
    if (config.screens) {
      Object.entries(config.screens).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          _ = _ref2[0],
          value = _ref2[1];
        if (typeof value !== 'string') {
          validatePathConfig(value, false);
        }
      });
    }
  }
},-64,[7,28],"node_modules/@react-navigation/core/src/validatePathConfig.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fromEntries;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  // Object.fromEntries is not available in older iOS versions
  function fromEntries(entries) {
    return entries.reduce(function (acc, _ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];
      if (acc.hasOwnProperty(k)) {
        throw new Error("A value for key '" + k + "' already exists in the object.");
      }
      acc[k] = v;
      return acc;
    }, {});
  }
},-63,[7,28],"node_modules/@react-navigation/core/src/fromEntries.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = function (obj, predicate) {
    var ret = {};
    var keys = Object.keys(obj);
    var isArr = Array.isArray(predicate);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = obj[key];
      if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
        ret[key] = val;
      }
    }
    return ret;
  };
},-62,[],"node_modules/filter-obj/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = function (string, separator) {
    if (!(typeof string === 'string' && typeof separator === 'string')) {
      throw new TypeError('Expected the arguments to be of type `string`');
    }
    if (separator === '') {
      return [string];
    }
    var separatorIndex = string.indexOf(separator);
    if (separatorIndex === -1) {
      return [string];
    }
    return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
  };
},-61,[],"node_modules/split-on-first/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var token = '%[a-f0-9]{2}';
  var singleMatcher = new RegExp('(' + token + ')|([^%]+?)', 'gi');
  var multiMatcher = new RegExp('(' + token + ')+', 'gi');
  function decodeComponents(components, split) {
    try {
      // Try to decode the entire string first
      return [decodeURIComponent(components.join(''))];
    } catch (err) {
      // Do nothing
    }
    if (components.length === 1) {
      return components;
    }
    split = split || 1;

    // Split the array in 2 parts
    var left = components.slice(0, split);
    var right = components.slice(split);
    return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
  }
  function decode(input) {
    try {
      return decodeURIComponent(input);
    } catch (err) {
      var tokens = input.match(singleMatcher) || [];
      for (var i = 1; i < tokens.length; i++) {
        input = decodeComponents(tokens, i).join('');
        tokens = input.match(singleMatcher) || [];
      }
      return input;
    }
  }
  function customDecodeURIComponent(input) {
    // Keep track of all the replacements and prefill the map with the `BOM`
    var replaceMap = {
      '%FE%FF': "\uFFFD\uFFFD",
      '%FF%FE': "\uFFFD\uFFFD"
    };
    var match = multiMatcher.exec(input);
    while (match) {
      try {
        // Decode as big chunks as possible
        replaceMap[match[0]] = decodeURIComponent(match[0]);
      } catch (err) {
        var result = decode(match[0]);
        if (result !== match[0]) {
          replaceMap[match[0]] = result;
        }
      }
      match = multiMatcher.exec(input);
    }

    // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
    replaceMap['%C2'] = "\uFFFD";
    var entries = Object.keys(replaceMap);
    for (var i = 0; i < entries.length; i++) {
      // Replace all decoded components
      var key = entries[i];
      input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
    }
    return input;
  }
  module.exports = function (encodedURI) {
    if (typeof encodedURI !== 'string') {
      throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
    }
    try {
      encodedURI = encodedURI.replace(/\+/g, ' ');

      // Try the built in decoder first
      return decodeURIComponent(encodedURI);
    } catch (err) {
      // Fallback to a more advanced decoder
      return customDecodeURIComponent(encodedURI);
    }
  };
},-60,[],"node_modules/decode-uri-component/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = function (str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (x) {
      return "%" + x.charCodeAt(0).toString(16).toUpperCase();
    });
  };
},-59,[],"node_modules/strict-uri-encode/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _defineProperty = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/defineProperty");
  var _slicedToArray = _$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray");
  var _toConsumableArray = _$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/toConsumableArray");
  var isNullOrUndefined = function isNullOrUndefined(value) {
    return value === null || value === undefined;
  };
  var encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case 'index':
        return function (key) {
          return function (result, value) {
            var index = result.length;
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), '[', index, ']'].join('')]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')]);
          };
        };
      case 'bracket':
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), '[]'].join('')]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), '[]=', encode(value, options)].join('')]);
          };
        };
      case 'colon-list-separator':
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), ':list='].join('')]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), ':list=', encode(value, options)].join('')]);
          };
        };
      case 'comma':
      case 'separator':
      case 'bracket-separator':
        {
          var keyValueSep = options.arrayFormat === 'bracket-separator' ? '[]=' : '=';
          return function (key) {
            return function (result, value) {
              if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
                return result;
              }

              // Translate null to an empty string so that it doesn't serialize as 'null'
              value = value === null ? '' : value;
              if (result.length === 0) {
                return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
              }
              return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
            };
          };
        }
      default:
        return function (key) {
          return function (result, value) {
            if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [encode(key, options)]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), '=', encode(value, options)].join('')]);
          };
        };
    }
  }
  function parserForArrayFormat(options) {
    var result;
    switch (options.arrayFormat) {
      case 'index':
        return function (key, value, accumulator) {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, '');
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === undefined) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      case 'bracket':
        return function (key, value, accumulator) {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, '');
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === undefined) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case 'colon-list-separator':
        return function (key, value, accumulator) {
          result = /(:list)$/.exec(key);
          key = key.replace(/:list$/, '');
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === undefined) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case 'comma':
      case 'separator':
        return function (key, value, accumulator) {
          var isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
          var isEncodedArray = typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          var newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(function (item) {
            return decode(item, options);
          }) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };
      case 'bracket-separator':
        return function (key, value, accumulator) {
          var isArray = /(\[\])$/.test(key);
          key = key.replace(/\[\]$/, '');
          if (!isArray) {
            accumulator[key] = value ? decode(value, options) : value;
            return;
          }
          var arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map(function (item) {
            return decode(item, options);
          });
          if (accumulator[key] === undefined) {
            accumulator[key] = arrayValue;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], arrayValue);
        };
      default:
        return function (key, value, accumulator) {
          if (accumulator[key] === undefined) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== 'string' || value.length !== 1) {
      throw new TypeError('arrayFormatSeparator must be single character string');
    }
  }
  function encode(value, options) {
    if (options.encode) {
      return options.strict ? _$$_REQUIRE(_dependencyMap[3], "strict-uri-encode")(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode(value, options) {
    if (options.decode) {
      return _$$_REQUIRE(_dependencyMap[4], "decode-uri-component")(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (typeof input === 'object') {
      return keysSorter(Object.keys(input)).sort(function (a, b) {
        return Number(a) - Number(b);
      }).map(function (key) {
        return input[key];
      });
    }
    return input;
  }
  function removeHash(input) {
    var hashStart = input.indexOf('#');
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    var hash = '';
    var hashStart = url.indexOf('#');
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function extract(input) {
    input = removeHash(input);
    var queryStart = input.indexOf('?');
    if (queryStart === -1) {
      return '';
    }
    return input.slice(queryStart + 1);
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
      value = value.toLowerCase() === 'true';
    }
    return value;
  }
  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ',',
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    var formatter = parserForArrayFormat(options);

    // Create an object with no prototype
    var ret = Object.create(null);
    if (typeof query !== 'string') {
      return ret;
    }
    query = query.trim().replace(/^[?#&]/, '');
    if (!query) {
      return ret;
    }
    for (var param of query.split('&')) {
      if (param === '') {
        continue;
      }
      var _splitOnFirst = _$$_REQUIRE(_dependencyMap[5], "split-on-first")(options.decode ? param.replace(/\+/g, ' ') : param, '='),
        _splitOnFirst2 = _slicedToArray(_splitOnFirst, 2),
        key = _splitOnFirst2[0],
        value = _splitOnFirst2[1];

      // Missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
      formatter(decode(key, options), value, ret);
    }
    for (var _key of Object.keys(ret)) {
      var _value = ret[_key];
      if (typeof _value === 'object' && _value !== null) {
        for (var k of Object.keys(_value)) {
          _value[k] = parseValue(_value[k], options);
        }
      } else {
        ret[_key] = parseValue(_value, options);
      }
    }
    if (options.sort === false) {
      return ret;
    }
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce(function (result, key) {
      var value = ret[key];
      if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
        // Sort object keys, not values
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }
      return result;
    }, Object.create(null));
  }
  exports.extract = extract;
  exports.parse = parse;
  exports.stringify = function (object, options) {
    if (!object) {
      return '';
    }
    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: 'none',
      arrayFormatSeparator: ','
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    var shouldFilter = function shouldFilter(key) {
      return options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';
    };
    var formatter = encoderForArrayFormat(options);
    var objectCopy = {};
    for (var key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }
    var keys = Object.keys(objectCopy);
    if (options.sort !== false) {
      keys.sort(options.sort);
    }
    return keys.map(function (key) {
      var value = object[key];
      if (value === undefined) {
        return '';
      }
      if (value === null) {
        return encode(key, options);
      }
      if (Array.isArray(value)) {
        if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
          return encode(key, options) + '[]';
        }
        return value.reduce(formatter(key), []).join('&');
      }
      return encode(key, options) + '=' + encode(value, options);
    }).filter(function (x) {
      return x.length > 0;
    }).join('&');
  };
  exports.parseUrl = function (url, options) {
    options = Object.assign({
      decode: true
    }, options);
    var _splitOnFirst3 = _$$_REQUIRE(_dependencyMap[5], "split-on-first")(url, '#'),
      _splitOnFirst4 = _slicedToArray(_splitOnFirst3, 2),
      url_ = _splitOnFirst4[0],
      hash = _splitOnFirst4[1];
    return Object.assign({
      url: url_.split('?')[0] || '',
      query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? {
      fragmentIdentifier: decode(hash, options)
    } : {});
  };
  exports.stringifyUrl = function (object, options) {
    options = Object.assign(_defineProperty({
      encode: true,
      strict: true
    }, encodeFragmentIdentifier, true), options);
    var url = removeHash(object.url).split('?')[0] || '';
    var queryFromUrl = exports.extract(object.url);
    var parsedQueryFromUrl = exports.parse(queryFromUrl, {
      sort: false
    });
    var query = Object.assign(parsedQueryFromUrl, object.query);
    var queryString = exports.stringify(query, options);
    if (queryString) {
      queryString = "?" + queryString;
    }
    var hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      hash = "#" + (options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier);
    }
    return "" + url + queryString + hash;
  };
  exports.pick = function (input, filter, options) {
    options = Object.assign(_defineProperty({
      parseFragmentIdentifier: true
    }, encodeFragmentIdentifier, false), options);
    var _exports$parseUrl = exports.parseUrl(input, options),
      url = _exports$parseUrl.url,
      query = _exports$parseUrl.query,
      fragmentIdentifier = _exports$parseUrl.fragmentIdentifier;
    return exports.stringifyUrl({
      url: url,
      query: _$$_REQUIRE(_dependencyMap[6], "filter-obj")(query, filter),
      fragmentIdentifier: fragmentIdentifier
    }, options);
  };
  exports.exclude = function (input, filter, options) {
    var exclusionFilter = Array.isArray(filter) ? function (key) {
      return !filter.includes(key);
    } : function (key, value) {
      return !filter(key, value);
    };
    return exports.pick(input, exclusionFilter, options);
  };
},-58,[203,28,10,-59,-60,-61,-62],"node_modules/@react-navigation/core/node_modules/query-string/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getPathFromState;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray"));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/slicedToArray"));
  var queryString = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "query-string"));
  var _fromEntries = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./fromEntries"));
  var _validatePathConfig = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./validatePathConfig"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _getActiveRoute = function getActiveRoute(state) {
    var route = typeof state.index === 'number' ? state.routes[state.index] : state.routes[state.routes.length - 1];
    if (route.state) {
      return _getActiveRoute(route.state);
    }
    return route;
  };

  /**
   * Utility to serialize a navigation state object to a path string.
   *
   * @example
   * ```js
   * getPathFromState(
   *   {
   *     routes: [
   *       {
   *         name: 'Chat',
   *         params: { author: 'Jane', id: 42 },
   *       },
   *     ],
   *   },
   *   {
   *     screens: {
   *       Chat: {
   *         path: 'chat/:author/:id',
   *         stringify: { author: author => author.toLowerCase() }
   *       }
   *     }
   *   }
   * )
   * ```
   *
   * @param state Navigation state to serialize.
   * @param options Extra options to fine-tune how to serialize the path.
   * @returns Path representing the state, e.g. /foo/bar?count=42.
   */
  function getPathFromState(state, options) {
    if (state == null) {
      throw Error("Got 'undefined' for the navigation state. You must pass a valid state object.");
    }
    if (options) {
      (0, _validatePathConfig.default)(options);
    }

    // Create a normalized configs object which will be easier to use
    var configs = options != null && options.screens ? createNormalizedConfigs(options == null ? void 0 : options.screens) : {};
    var path = '/';
    var current = state;
    var allParams = {};
    var _loop = function _loop() {
      var index = typeof current.index === 'number' ? current.index : 0;
      var route = current.routes[index];
      var pattern;
      var focusedParams;
      var focusedRoute = _getActiveRoute(state);
      var currentOptions = configs;

      // Keep all the route names that appeared during going deeper in config in case the pattern is resolved to undefined
      var nestedRouteNames = [];
      var hasNext = true;
      var _loop2 = function _loop2() {
        pattern = currentOptions[route.name].pattern;
        nestedRouteNames.push(route.name);
        if (route.params) {
          var _currentOptions$route;
          var stringify = (_currentOptions$route = currentOptions[route.name]) == null ? void 0 : _currentOptions$route.stringify;
          var currentParams = (0, _fromEntries.default)(Object.entries(route.params).map(function (_ref) {
            var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            return [key, stringify != null && stringify[key] ? stringify[key](value) : String(value)];
          }));
          if (pattern) {
            Object.assign(allParams, currentParams);
          }
          if (focusedRoute === route) {
            var _pattern;
            // If this is the focused route, keep the params for later use
            // We save it here since it's been stringified already
            focusedParams = Object.assign({}, currentParams);
            (_pattern = pattern) == null ? void 0 : _pattern.split('/').filter(function (p) {
              return p.startsWith(':');
            })
            // eslint-disable-next-line no-loop-func
            .forEach(function (p) {
              var name = getParamName(p);

              // Remove the params present in the pattern since we'll only use the rest for query string
              if (focusedParams) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete focusedParams[name];
              }
            });
          }
        }

        // If there is no `screens` property or no nested state, we return pattern
        if (!currentOptions[route.name].screens || route.state === undefined) {
          hasNext = false;
        } else {
          index = typeof route.state.index === 'number' ? route.state.index : route.state.routes.length - 1;
          var nextRoute = route.state.routes[index];
          var nestedConfig = currentOptions[route.name].screens;

          // if there is config for next route name, we go deeper
          if (nestedConfig && nextRoute.name in nestedConfig) {
            route = nextRoute;
            currentOptions = nestedConfig;
          } else {
            // If not, there is no sense in going deeper in config
            hasNext = false;
          }
        }
      };
      while (route.name in currentOptions && hasNext) {
        _loop2();
      }
      if (pattern === undefined) {
        pattern = nestedRouteNames.join('/');
      }
      if (currentOptions[route.name] !== undefined) {
        path += pattern.split('/').map(function (p) {
          var name = getParamName(p);

          // We don't know what to show for wildcard patterns
          // Showing the route name seems ok, though whatever we show here will be incorrect
          // Since the page doesn't actually exist
          if (p === '*') {
            return route.name;
          }

          // If the path has a pattern for a param, put the param in the path
          if (p.startsWith(':')) {
            var _value = allParams[name];
            if (_value === undefined && p.endsWith('?')) {
              // Optional params without value assigned in route.params should be ignored
              return '';
            }
            return encodeURIComponent(_value);
          }
          return encodeURIComponent(p);
        }).join('/');
      } else {
        path += encodeURIComponent(route.name);
      }
      if (!focusedParams) {
        focusedParams = focusedRoute.params;
      }
      if (route.state) {
        path += '/';
      } else if (focusedParams) {
        for (var param in focusedParams) {
          if (focusedParams[param] === 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete focusedParams[param];
          }
        }
        var query = queryString.stringify(focusedParams, {
          sort: false
        });
        if (query) {
          path += "?" + query;
        }
      }
      current = route.state;
    };
    while (current) {
      _loop();
    }

    // Remove multiple as well as trailing slashes
    path = path.replace(/\/+/g, '/');
    path = path.length > 1 ? path.replace(/\/$/, '') : path;
    return path;
  }
  var getParamName = function getParamName(pattern) {
    return pattern.replace(/^:/, '').replace(/\?$/, '');
  };
  var joinPaths = function joinPaths() {
    var _ref3;
    for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
      paths[_key] = arguments[_key];
    }
    return (_ref3 = []).concat.apply(_ref3, (0, _toConsumableArray2.default)(paths.map(function (p) {
      return p.split('/');
    }))).filter(Boolean).join('/');
  };
  var createConfigItem = function createConfigItem(config, parentPattern) {
    var _pattern3;
    if (typeof config === 'string') {
      // If a string is specified as the value of the key(e.g. Foo: '/path'), use it as the pattern
      var _pattern2 = parentPattern ? joinPaths(parentPattern, config) : config;
      return {
        pattern: _pattern2
      };
    }

    // If an object is specified as the value (e.g. Foo: { ... }),
    // It can have `path` property and `screens` prop which has nested configs
    var pattern;
    if (config.exact && config.path === undefined) {
      throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
    }
    pattern = config.exact !== true ? joinPaths(parentPattern || '', config.path || '') : config.path || '';
    var screens = config.screens ? createNormalizedConfigs(config.screens, pattern) : undefined;
    return {
      // Normalize pattern to remove any leading, trailing slashes, duplicate slashes etc.
      pattern: (_pattern3 = pattern) == null ? void 0 : _pattern3.split('/').filter(Boolean).join('/'),
      stringify: config.stringify,
      screens: screens
    };
  };
  var createNormalizedConfigs = function createNormalizedConfigs(options, pattern) {
    return (0, _fromEntries.default)(Object.entries(options).map(function (_ref4) {
      var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
        name = _ref5[0],
        c = _ref5[1];
      var result = createConfigItem(c, pattern);
      return [name, result];
    }));
  };
},-57,[7,10,28,-58,-63,-64],"node_modules/@react-navigation/core/src/getPathFromState.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CHILD_STATE = void 0;
  exports.default = useRouteCache;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _excluded = ["state"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Utilites such as `getFocusedRouteNameFromRoute` need to access state.
   * So we need a way to suppress the warning for those use cases.
   * This is fine since they are internal utilities and this is not public API.
   */
  var CHILD_STATE = exports.CHILD_STATE = Symbol('CHILD_STATE');

  /**
   * Hook to cache route props for each screen in the navigator.
   * This lets add warnings and modifications to the route object but keep references between renders.
   */
  function useRouteCache(routes) {
    // Cache object which holds route objects for each screen
    var cache = React.useMemo(function () {
      return {
        current: new Map()
      };
    }, []);
    if (process.env.NODE_ENV === 'production') {
      // We don't want the overhead of creating extra maps every render in prod
      return routes;
    }
    cache.current = routes.reduce(function (acc, route) {
      var previous = cache.current.get(route);
      if (previous) {
        // If a cached route object already exists, reuse it
        acc.set(route, previous);
      } else {
        var state = route.state,
          proxy = (0, _objectWithoutProperties2.default)(route, _excluded);
        Object.defineProperty(proxy, CHILD_STATE, {
          enumerable: false,
          value: state
        });
        acc.set(route, proxy);
      }
      return acc;
    }, new Map());
    return Array.from(cache.current.values());
  }
},-56,[7,151,2],"node_modules/@react-navigation/core/src/useRouteCache.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getFocusedRouteNameFromRoute;
  function getFocusedRouteNameFromRoute(route) {
    var _route$CHILD_STATE, _state$index;
    // @ts-expect-error: this isn't in type definitions coz we want this private
    var state = (_route$CHILD_STATE = route[_$$_REQUIRE(_dependencyMap[0], "./useRouteCache").CHILD_STATE]) != null ? _route$CHILD_STATE : route.state;
    var params = route.params;
    var routeName = state ?
    // Get the currently active route name in the nested navigator
    state.routes[// If we have a partial state without index, for tab/drawer, first screen will be focused one, and last for stack
    // The type property will only exist for rehydrated state and not for state from deep link
    (_state$index = state.index) != null ? _state$index : typeof state.type === 'string' && state.type !== 'stack' ? 0 : state.routes.length - 1].name :
    // If state doesn't exist, we need to default to `screen` param if available
    typeof (params == null ? void 0 : params.screen) === 'string' ? params.screen : undefined;
    return routeName;
  }
},-55,[-56],"node_modules/@react-navigation/core/src/getFocusedRouteNameFromRoute.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getActionFromState;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  function getActionFromState(state, options) {
    var _state$index, _normalizedConfig$scr;
    // Create a normalized configs object which will be easier to use
    var normalizedConfig = options ? createNormalizedConfigItem(options) : {};
    var routes = state.index != null ? state.routes.slice(0, state.index + 1) : state.routes;
    if (routes.length === 0) {
      return undefined;
    }
    if (!(routes.length === 1 && routes[0].key === undefined || routes.length === 2 && routes[0].key === undefined && routes[0].name === (normalizedConfig == null ? void 0 : normalizedConfig.initialRouteName) && routes[1].key === undefined)) {
      return {
        type: 'RESET',
        payload: state
      };
    }
    var route = state.routes[(_state$index = state.index) != null ? _state$index : state.routes.length - 1];
    var current = route == null ? void 0 : route.state;
    var config = normalizedConfig == null ? void 0 : (_normalizedConfig$scr = normalizedConfig.screens) == null ? void 0 : _normalizedConfig$scr[route == null ? void 0 : route.name];
    var params = Object.assign({}, route.params);
    var payload = route ? {
      name: route.name,
      path: route.path,
      params: params
    } : undefined;
    while (current) {
      var _config, _config2, _config2$screens;
      if (current.routes.length === 0) {
        return undefined;
      }
      var _routes = current.index != null ? current.routes.slice(0, current.index + 1) : current.routes;
      var _route = _routes[_routes.length - 1];

      // Explicitly set to override existing value when merging params
      Object.assign(params, {
        initial: undefined,
        screen: undefined,
        params: undefined,
        state: undefined
      });
      if (_routes.length === 1 && _routes[0].key === undefined) {
        params.initial = true;
        params.screen = _route.name;
      } else if (_routes.length === 2 && _routes[0].key === undefined && _routes[0].name === ((_config = config) == null ? void 0 : _config.initialRouteName) && _routes[1].key === undefined) {
        params.initial = false;
        params.screen = _route.name;
      } else {
        params.state = current;
        break;
      }
      if (_route.state) {
        params.params = Object.assign({}, _route.params);
        params = params.params;
      } else {
        params.path = _route.path;
        params.params = _route.params;
      }
      current = _route.state;
      config = (_config2 = config) == null ? void 0 : (_config2$screens = _config2.screens) == null ? void 0 : _config2$screens[_route.name];
    }
    if (!payload) {
      return;
    }

    // Try to construct payload for a `NAVIGATE` action from the state
    // This lets us preserve the navigation state and not lose it
    return {
      type: 'NAVIGATE',
      payload: payload
    };
  }
  var createNormalizedConfigItem = function createNormalizedConfigItem(config) {
    return typeof config === 'object' && config != null ? {
      initialRouteName: config.initialRouteName,
      screens: config.screens != null ? createNormalizedConfigs(config.screens) : undefined
    } : {};
  };
  var createNormalizedConfigs = function createNormalizedConfigs(options) {
    return Object.entries(options).reduce(function (acc, _ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];
      acc[k] = createNormalizedConfigItem(v);
      return acc;
    }, {});
  };
},-54,[7,28],"node_modules/@react-navigation/core/src/getActionFromState.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Context which holds the values for the current navigation tree.
   * Intended for use in SSR. This is not safe to use on the client.
   */
  var CurrentRenderContext = React.createContext(undefined);
  var _default = exports.default = CurrentRenderContext;
},-53,[2],"node_modules/@react-navigation/core/src/CurrentRenderContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Screen;
  /**
   * Empty component used for specifying route configuration.
   */
  function Screen(_) {
    /* istanbul ignore next */
    return null;
  }
},-52,[],"node_modules/@react-navigation/core/src/Screen.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Group;
  /**
   * Empty component used for grouping screen configs.
   */
  function Group(_) {
    /* istanbul ignore next */
    return null;
  }
},-51,[],"node_modules/@react-navigation/core/src/Group.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createNavigatorFactory;
  var _Group = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./Group"));
  var _Screen = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./Screen"));
  /**
   * Higher order component to create a `Navigator` and `Screen` pair.
   * Custom navigators should wrap the navigator component in `createNavigator` before exporting.
   *
   * @param Navigator The navigtor component to wrap.
   * @returns Factory method to create a `Navigator` and `Screen` pair.
   */
  function createNavigatorFactory(Navigator) {
    return function () {
      if (arguments[0] !== undefined) {
        throw new Error("Creating a navigator doesn't take an argument. Maybe you are trying to use React Navigation 4 API? See https://reactnavigation.org/docs/hello-react-navigation for the latest API and guides.");
      }
      return {
        Navigator: Navigator,
        Group: _Group.default,
        Screen: _Screen.default
      };
    };
  }
},-50,[7,-51,-52],"node_modules/@react-navigation/core/src/createNavigatorFactory.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ScheduleUpdateContext = void 0;
  exports.default = useScheduleUpdate;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var MISSING_CONTEXT_ERROR = "Couldn't find a schedule context.";
  var ScheduleUpdateContext = exports.ScheduleUpdateContext = React.createContext({
    scheduleUpdate: function scheduleUpdate() {
      throw new Error(MISSING_CONTEXT_ERROR);
    },
    flushUpdates: function flushUpdates() {
      throw new Error(MISSING_CONTEXT_ERROR);
    }
  });

  /**
   * When screen config changes, we want to update the navigator in the same update phase.
   * However, navigation state is in the root component and React won't let us update it from a child.
   * This is a workaround for that, the scheduled update is stored in the ref without actually calling setState.
   * It lets all subsequent updates access the latest state so it stays correct.
   * Then we call setState during after the component updates.
   */
  function useScheduleUpdate(callback) {
    var _React$useContext = React.useContext(ScheduleUpdateContext),
      scheduleUpdate = _React$useContext.scheduleUpdate,
      flushUpdates = _React$useContext.flushUpdates;
    scheduleUpdate(callback);
    React.useEffect(flushUpdates);
  }
},-49,[2],"node_modules/@react-navigation/core/src/useScheduleUpdate.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
},-48,[],"node_modules/@react-navigation/routers/src/types.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.StackActions = void 0;
  exports.default = StackRouter;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray"));
  var _BaseRouter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./BaseRouter"));
  var StackActions = exports.StackActions = {
    replace: function replace(name, params) {
      return {
        type: 'REPLACE',
        payload: {
          name: name,
          params: params
        }
      };
    },
    push: function push(name, params) {
      return {
        type: 'PUSH',
        payload: {
          name: name,
          params: params
        }
      };
    },
    pop: function pop() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return {
        type: 'POP',
        payload: {
          count: count
        }
      };
    },
    popToTop: function popToTop() {
      return {
        type: 'POP_TO_TOP'
      };
    }
  };
  function StackRouter(options) {
    var router = Object.assign({}, _BaseRouter.default, {
      type: 'stack',
      getInitialState: function getInitialState(_ref) {
        var routeNames = _ref.routeNames,
          routeParamList = _ref.routeParamList;
        var initialRouteName = options.initialRouteName !== undefined && routeNames.includes(options.initialRouteName) ? options.initialRouteName : routeNames[0];
        return {
          stale: false,
          type: 'stack',
          key: "stack-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
          index: 0,
          routeNames: routeNames,
          routes: [{
            key: initialRouteName + "-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
            name: initialRouteName,
            params: routeParamList[initialRouteName]
          }]
        };
      },
      getRehydratedState: function getRehydratedState(partialState, _ref2) {
        var routeNames = _ref2.routeNames,
          routeParamList = _ref2.routeParamList;
        var state = partialState;
        if (state.stale === false) {
          return state;
        }
        var routes = state.routes.filter(function (route) {
          return routeNames.includes(route.name);
        }).map(function (route) {
          return Object.assign({}, route, {
            key: route.key || route.name + "-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
            params: routeParamList[route.name] !== undefined ? Object.assign({}, routeParamList[route.name], route.params) : route.params
          });
        });
        if (routes.length === 0) {
          var initialRouteName = options.initialRouteName !== undefined ? options.initialRouteName : routeNames[0];
          routes.push({
            key: initialRouteName + "-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
            name: initialRouteName,
            params: routeParamList[initialRouteName]
          });
        }
        return {
          stale: false,
          type: 'stack',
          key: "stack-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
          index: routes.length - 1,
          routeNames: routeNames,
          routes: routes
        };
      },
      getStateForRouteNamesChange: function getStateForRouteNamesChange(state, _ref3) {
        var routeNames = _ref3.routeNames,
          routeParamList = _ref3.routeParamList,
          routeKeyChanges = _ref3.routeKeyChanges;
        var routes = state.routes.filter(function (route) {
          return routeNames.includes(route.name) && !routeKeyChanges.includes(route.name);
        });
        if (routes.length === 0) {
          var initialRouteName = options.initialRouteName !== undefined && routeNames.includes(options.initialRouteName) ? options.initialRouteName : routeNames[0];
          routes.push({
            key: initialRouteName + "-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
            name: initialRouteName,
            params: routeParamList[initialRouteName]
          });
        }
        return Object.assign({}, state, {
          routeNames: routeNames,
          routes: routes,
          index: Math.min(state.index, routes.length - 1)
        });
      },
      getStateForRouteFocus: function getStateForRouteFocus(state, key) {
        var index = state.routes.findIndex(function (r) {
          return r.key === key;
        });
        if (index === -1 || index === state.index) {
          return state;
        }
        return Object.assign({}, state, {
          index: index,
          routes: state.routes.slice(0, index + 1)
        });
      },
      getStateForAction: function getStateForAction(state, action, options) {
        var routeParamList = options.routeParamList;
        switch (action.type) {
          case 'REPLACE':
            {
              var index = action.target === state.key && action.source ? state.routes.findIndex(function (r) {
                return r.key === action.source;
              }) : state.index;
              if (index === -1) {
                return null;
              }
              var _action$payload = action.payload,
                name = _action$payload.name,
                key = _action$payload.key,
                params = _action$payload.params;
              if (!state.routeNames.includes(name)) {
                return null;
              }
              return Object.assign({}, state, {
                routes: state.routes.map(function (route, i) {
                  return i === index ? {
                    key: key !== undefined ? key : name + "-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
                    name: name,
                    params: routeParamList[name] !== undefined ? Object.assign({}, routeParamList[name], params) : params
                  } : route;
                })
              });
            }
          case 'PUSH':
            if (state.routeNames.includes(action.payload.name)) {
              var getId = options.routeGetIdList[action.payload.name];
              var id = getId == null ? void 0 : getId({
                params: action.payload.params
              });
              var route = id ? state.routes.find(function (route) {
                return route.name === action.payload.name && id === (getId == null ? void 0 : getId({
                  params: route.params
                }));
              }) : undefined;
              var routes;
              if (route) {
                routes = state.routes.filter(function (r) {
                  return r.key !== route.key;
                });
                routes.push(Object.assign({}, route, {
                  params: routeParamList[action.payload.name] !== undefined ? Object.assign({}, routeParamList[action.payload.name], action.payload.params) : action.payload.params
                }));
              } else {
                routes = [].concat((0, _toConsumableArray2.default)(state.routes), [{
                  key: action.payload.name + "-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
                  name: action.payload.name,
                  params: routeParamList[action.payload.name] !== undefined ? Object.assign({}, routeParamList[action.payload.name], action.payload.params) : action.payload.params
                }]);
              }
              return Object.assign({}, state, {
                index: routes.length - 1,
                routes: routes
              });
            }
            return null;
          case 'POP':
            {
              var _index = action.target === state.key && action.source ? state.routes.findIndex(function (r) {
                return r.key === action.source;
              }) : state.index;
              if (_index > 0) {
                var _count = Math.max(_index - action.payload.count + 1, 1);
                var _routes = state.routes.slice(0, _count).concat(state.routes.slice(_index + 1));
                return Object.assign({}, state, {
                  index: _routes.length - 1,
                  routes: _routes
                });
              }
              return null;
            }
          case 'POP_TO_TOP':
            return router.getStateForAction(state, {
              type: 'POP',
              payload: {
                count: state.routes.length - 1
              }
            }, options);
          case 'NAVIGATE':
            if (action.payload.name !== undefined && !state.routeNames.includes(action.payload.name)) {
              return null;
            }
            if (action.payload.key || action.payload.name) {
              var _action$payload$path;
              // If the route already exists, navigate to that
              var _index2 = -1;
              var _getId =
              // `getId` and `key` can't be used together
              action.payload.key === undefined && action.payload.name !== undefined ? options.routeGetIdList[action.payload.name] : undefined;
              var _id = _getId == null ? void 0 : _getId({
                params: action.payload.params
              });
              if (_id) {
                _index2 = state.routes.findIndex(function (route) {
                  return route.name === action.payload.name && _id === (_getId == null ? void 0 : _getId({
                    params: route.params
                  }));
                });
              } else if (state.routes[state.index].name === action.payload.name && action.payload.key === undefined || state.routes[state.index].key === action.payload.key) {
                _index2 = state.index;
              } else {
                for (var i = state.routes.length - 1; i >= 0; i--) {
                  if (state.routes[i].name === action.payload.name && action.payload.key === undefined || state.routes[i].key === action.payload.key) {
                    _index2 = i;
                    break;
                  }
                }
              }
              if (_index2 === -1 && action.payload.key && action.payload.name === undefined) {
                return null;
              }
              if (_index2 === -1 && action.payload.name !== undefined) {
                var _action$payload$key;
                var _routes2 = [].concat((0, _toConsumableArray2.default)(state.routes), [{
                  key: (_action$payload$key = action.payload.key) != null ? _action$payload$key : action.payload.name + "-" + (0, _$$_REQUIRE(_dependencyMap[3], "nanoid/non-secure").nanoid)(),
                  name: action.payload.name,
                  path: action.payload.path,
                  params: routeParamList[action.payload.name] !== undefined ? Object.assign({}, routeParamList[action.payload.name], action.payload.params) : action.payload.params
                }]);
                return Object.assign({}, state, {
                  routes: _routes2,
                  index: _routes2.length - 1
                });
              }
              var _route = state.routes[_index2];
              var _params;
              if (action.payload.merge) {
                _params = action.payload.params !== undefined || routeParamList[_route.name] !== undefined ? Object.assign({}, routeParamList[_route.name], _route.params, action.payload.params) : _route.params;
              } else {
                _params = routeParamList[_route.name] !== undefined ? Object.assign({}, routeParamList[_route.name], action.payload.params) : action.payload.params;
              }
              return Object.assign({}, state, {
                index: _index2,
                routes: [].concat((0, _toConsumableArray2.default)(state.routes.slice(0, _index2)), [_params !== _route.params || action.payload.path && action.payload.path !== _route.path ? Object.assign({}, _route, {
                  path: (_action$payload$path = action.payload.path) != null ? _action$payload$path : _route.path,
                  params: _params
                }) : state.routes[_index2]])
              });
            }
            return null;
          case 'GO_BACK':
            if (state.index > 0) {
              return router.getStateForAction(state, {
                type: 'POP',
                payload: {
                  count: 1
                },
                target: action.target,
                source: action.source
              }, options);
            }
            return null;
          default:
            return _BaseRouter.default.getStateForAction(state, action);
        }
      },
      actionCreators: StackActions
    });
    return router;
  }
},-47,[7,10,-43,-44],"node_modules/@react-navigation/routers/src/StackRouter.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TabActions = void 0;
  exports.default = TabRouter;
  var _BaseRouter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./BaseRouter"));
  var TYPE_ROUTE = 'route';
  var TabActions = exports.TabActions = {
    jumpTo: function jumpTo(name, params) {
      return {
        type: 'JUMP_TO',
        payload: {
          name: name,
          params: params
        }
      };
    }
  };
  var getRouteHistory = function getRouteHistory(routes, index, backBehavior, initialRouteName) {
    var history = [{
      type: TYPE_ROUTE,
      key: routes[index].key
    }];
    var initialRouteIndex;
    switch (backBehavior) {
      case 'order':
        for (var i = index; i > 0; i--) {
          history.unshift({
            type: TYPE_ROUTE,
            key: routes[i - 1].key
          });
        }
        break;
      case 'firstRoute':
        if (index !== 0) {
          history.unshift({
            type: TYPE_ROUTE,
            key: routes[0].key
          });
        }
        break;
      case 'initialRoute':
        initialRouteIndex = routes.findIndex(function (route) {
          return route.name === initialRouteName;
        });
        initialRouteIndex = initialRouteIndex === -1 ? 0 : initialRouteIndex;
        if (index !== initialRouteIndex) {
          history.unshift({
            type: TYPE_ROUTE,
            key: routes[initialRouteIndex].key
          });
        }
        break;
      case 'history':
        // The history will fill up on navigation
        break;
    }
    return history;
  };
  var changeIndex = function changeIndex(state, index, backBehavior, initialRouteName) {
    var history;
    if (backBehavior === 'history') {
      var currentKey = state.routes[index].key;
      history = state.history.filter(function (it) {
        return it.type === 'route' ? it.key !== currentKey : false;
      }).concat({
        type: TYPE_ROUTE,
        key: currentKey
      });
    } else {
      history = getRouteHistory(state.routes, index, backBehavior, initialRouteName);
    }
    return Object.assign({}, state, {
      index: index,
      history: history
    });
  };
  function TabRouter(_ref) {
    var initialRouteName = _ref.initialRouteName,
      _ref$backBehavior = _ref.backBehavior,
      backBehavior = _ref$backBehavior === void 0 ? 'firstRoute' : _ref$backBehavior;
    var router = Object.assign({}, _BaseRouter.default, {
      type: 'tab',
      getInitialState: function getInitialState(_ref2) {
        var routeNames = _ref2.routeNames,
          routeParamList = _ref2.routeParamList;
        var index = initialRouteName !== undefined && routeNames.includes(initialRouteName) ? routeNames.indexOf(initialRouteName) : 0;
        var routes = routeNames.map(function (name) {
          return {
            name: name,
            key: name + "-" + (0, _$$_REQUIRE(_dependencyMap[2], "nanoid/non-secure").nanoid)(),
            params: routeParamList[name]
          };
        });
        var history = getRouteHistory(routes, index, backBehavior, initialRouteName);
        return {
          stale: false,
          type: 'tab',
          key: "tab-" + (0, _$$_REQUIRE(_dependencyMap[2], "nanoid/non-secure").nanoid)(),
          index: index,
          routeNames: routeNames,
          history: history,
          routes: routes
        };
      },
      getRehydratedState: function getRehydratedState(partialState, _ref3) {
        var _state$routes, _state$index, _state$history$filter, _state$history;
        var routeNames = _ref3.routeNames,
          routeParamList = _ref3.routeParamList;
        var state = partialState;
        if (state.stale === false) {
          return state;
        }
        var routes = routeNames.map(function (name) {
          var route = state.routes.find(function (r) {
            return r.name === name;
          });
          return Object.assign({}, route, {
            name: name,
            key: route && route.name === name && route.key ? route.key : name + "-" + (0, _$$_REQUIRE(_dependencyMap[2], "nanoid/non-secure").nanoid)(),
            params: routeParamList[name] !== undefined ? Object.assign({}, routeParamList[name], route ? route.params : undefined) : route ? route.params : undefined
          });
        });
        var index = Math.min(Math.max(routeNames.indexOf((_state$routes = state.routes[(_state$index = state == null ? void 0 : state.index) != null ? _state$index : 0]) == null ? void 0 : _state$routes.name), 0), routes.length - 1);
        var history = (_state$history$filter = (_state$history = state.history) == null ? void 0 : _state$history.filter(function (it) {
          return routes.find(function (r) {
            return r.key === it.key;
          });
        })) != null ? _state$history$filter : [];
        return changeIndex({
          stale: false,
          type: 'tab',
          key: "tab-" + (0, _$$_REQUIRE(_dependencyMap[2], "nanoid/non-secure").nanoid)(),
          index: index,
          routeNames: routeNames,
          history: history,
          routes: routes
        }, index, backBehavior, initialRouteName);
      },
      getStateForRouteNamesChange: function getStateForRouteNamesChange(state, _ref4) {
        var routeNames = _ref4.routeNames,
          routeParamList = _ref4.routeParamList,
          routeKeyChanges = _ref4.routeKeyChanges;
        var routes = routeNames.map(function (name) {
          return state.routes.find(function (r) {
            return r.name === name && !routeKeyChanges.includes(r.name);
          }) || {
            name: name,
            key: name + "-" + (0, _$$_REQUIRE(_dependencyMap[2], "nanoid/non-secure").nanoid)(),
            params: routeParamList[name]
          };
        });
        var index = Math.max(0, routeNames.indexOf(state.routes[state.index].name));
        var history = state.history.filter(
        // Type will always be 'route' for tabs, but could be different in a router extending this (e.g. drawer)
        function (it) {
          return it.type !== 'route' || routes.find(function (r) {
            return r.key === it.key;
          });
        });
        if (!history.length) {
          history = getRouteHistory(routes, index, backBehavior, initialRouteName);
        }
        return Object.assign({}, state, {
          history: history,
          routeNames: routeNames,
          routes: routes,
          index: index
        });
      },
      getStateForRouteFocus: function getStateForRouteFocus(state, key) {
        var index = state.routes.findIndex(function (r) {
          return r.key === key;
        });
        if (index === -1 || index === state.index) {
          return state;
        }
        return changeIndex(state, index, backBehavior, initialRouteName);
      },
      getStateForAction: function getStateForAction(state, action, _ref5) {
        var routeParamList = _ref5.routeParamList,
          routeGetIdList = _ref5.routeGetIdList;
        switch (action.type) {
          case 'JUMP_TO':
          case 'NAVIGATE':
            {
              var index = -1;
              if (action.type === 'NAVIGATE' && action.payload.key) {
                index = state.routes.findIndex(function (route) {
                  return route.key === action.payload.key;
                });
              } else {
                index = state.routes.findIndex(function (route) {
                  return route.name === action.payload.name;
                });
              }
              if (index === -1) {
                return null;
              }
              return changeIndex(Object.assign({}, state, {
                routes: state.routes.map(function (route, i) {
                  if (i !== index) {
                    return route;
                  }
                  var getId = routeGetIdList[route.name];
                  var currentId = getId == null ? void 0 : getId({
                    params: route.params
                  });
                  var nextId = getId == null ? void 0 : getId({
                    params: action.payload.params
                  });
                  var key = currentId === nextId ? route.key : route.name + "-" + (0, _$$_REQUIRE(_dependencyMap[2], "nanoid/non-secure").nanoid)();
                  var params;
                  if (action.type === 'NAVIGATE' && action.payload.merge && currentId === nextId) {
                    params = action.payload.params !== undefined || routeParamList[route.name] !== undefined ? Object.assign({}, routeParamList[route.name], route.params, action.payload.params) : route.params;
                  } else {
                    params = routeParamList[route.name] !== undefined ? Object.assign({}, routeParamList[route.name], action.payload.params) : action.payload.params;
                  }
                  var path = action.type === 'NAVIGATE' && action.payload.path != null ? action.payload.path : route.path;
                  return params !== route.params || path !== route.path ? Object.assign({}, route, {
                    key: key,
                    path: path,
                    params: params
                  }) : route;
                })
              }), index, backBehavior, initialRouteName);
            }
          case 'GO_BACK':
            {
              if (state.history.length === 1) {
                return null;
              }
              var previousKey = state.history[state.history.length - 2].key;
              var _index = state.routes.findIndex(function (route) {
                return route.key === previousKey;
              });
              if (_index === -1) {
                return null;
              }
              return Object.assign({}, state, {
                history: state.history.slice(0, -1),
                index: _index
              });
            }
          default:
            return _BaseRouter.default.getStateForAction(state, action);
        }
      },
      shouldActionChangeFocus: function shouldActionChangeFocus(action) {
        return action.type === 'NAVIGATE';
      },
      actionCreators: TabActions
    });
    return router;
  }
},-46,[7,-43,-44],"node_modules/@react-navigation/routers/src/TabRouter.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DrawerActions = void 0;
  exports.default = DrawerRouter;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var _TabRouter = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "./TabRouter"));
  var _excluded = ["defaultStatus"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var DrawerActions = exports.DrawerActions = Object.assign({}, _TabRouter.TabActions, {
    openDrawer: function openDrawer() {
      return {
        type: 'OPEN_DRAWER'
      };
    },
    closeDrawer: function closeDrawer() {
      return {
        type: 'CLOSE_DRAWER'
      };
    },
    toggleDrawer: function toggleDrawer() {
      return {
        type: 'TOGGLE_DRAWER'
      };
    }
  });
  function DrawerRouter(_ref) {
    var _ref$defaultStatus = _ref.defaultStatus,
      defaultStatus = _ref$defaultStatus === void 0 ? 'closed' : _ref$defaultStatus,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var router = (0, _TabRouter.default)(rest);
    var isDrawerInHistory = function isDrawerInHistory(state) {
      var _state$history;
      return Boolean((_state$history = state.history) == null ? void 0 : _state$history.some(function (it) {
        return it.type === 'drawer';
      }));
    };
    var addDrawerToHistory = function addDrawerToHistory(state) {
      if (isDrawerInHistory(state)) {
        return state;
      }
      return Object.assign({}, state, {
        history: [].concat((0, _toConsumableArray2.default)(state.history), [{
          type: 'drawer',
          status: defaultStatus === 'open' ? 'closed' : 'open'
        }])
      });
    };
    var removeDrawerFromHistory = function removeDrawerFromHistory(state) {
      if (!isDrawerInHistory(state)) {
        return state;
      }
      return Object.assign({}, state, {
        history: state.history.filter(function (it) {
          return it.type !== 'drawer';
        })
      });
    };
    var openDrawer = function openDrawer(state) {
      if (defaultStatus === 'open') {
        return removeDrawerFromHistory(state);
      }
      return addDrawerToHistory(state);
    };
    var closeDrawer = function closeDrawer(state) {
      if (defaultStatus === 'open') {
        return addDrawerToHistory(state);
      }
      return removeDrawerFromHistory(state);
    };
    return Object.assign({}, router, {
      type: 'drawer',
      getInitialState: function getInitialState(_ref2) {
        var routeNames = _ref2.routeNames,
          routeParamList = _ref2.routeParamList,
          routeGetIdList = _ref2.routeGetIdList;
        var state = router.getInitialState({
          routeNames: routeNames,
          routeParamList: routeParamList,
          routeGetIdList: routeGetIdList
        });
        return Object.assign({}, state, {
          default: defaultStatus,
          stale: false,
          type: 'drawer',
          key: "drawer-" + (0, _$$_REQUIRE(_dependencyMap[4], "nanoid/non-secure").nanoid)()
        });
      },
      getRehydratedState: function getRehydratedState(partialState, _ref3) {
        var routeNames = _ref3.routeNames,
          routeParamList = _ref3.routeParamList,
          routeGetIdList = _ref3.routeGetIdList;
        if (partialState.stale === false) {
          return partialState;
        }
        var state = router.getRehydratedState(partialState, {
          routeNames: routeNames,
          routeParamList: routeParamList,
          routeGetIdList: routeGetIdList
        });
        if (isDrawerInHistory(partialState)) {
          // Re-sync the drawer entry in history to correct it if it was wrong
          state = removeDrawerFromHistory(state);
          state = addDrawerToHistory(state);
        }
        return Object.assign({}, state, {
          default: defaultStatus,
          type: 'drawer',
          key: "drawer-" + (0, _$$_REQUIRE(_dependencyMap[4], "nanoid/non-secure").nanoid)()
        });
      },
      getStateForRouteFocus: function getStateForRouteFocus(state, key) {
        var result = router.getStateForRouteFocus(state, key);
        return closeDrawer(result);
      },
      getStateForAction: function getStateForAction(state, action, options) {
        switch (action.type) {
          case 'OPEN_DRAWER':
            return openDrawer(state);
          case 'CLOSE_DRAWER':
            return closeDrawer(state);
          case 'TOGGLE_DRAWER':
            if (isDrawerInHistory(state)) {
              return removeDrawerFromHistory(state);
            }
            return addDrawerToHistory(state);
          case 'JUMP_TO':
          case 'NAVIGATE':
            {
              var result = router.getStateForAction(state, action, options);
              if (result != null && result.index !== state.index) {
                return closeDrawer(result);
              }
              return result;
            }
          case 'GO_BACK':
            if (isDrawerInHistory(state)) {
              return removeDrawerFromHistory(state);
            }
            return router.getStateForAction(state, action, options);
          default:
            return router.getStateForAction(state, action, options);
        }
      },
      actionCreators: DrawerActions
    });
  }
},-45,[7,10,151,-46,-44],"node_modules/@react-navigation/routers/src/DrawerRouter.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nanoid = exports.customAlphabet = void 0;
  var urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  var customAlphabet = exports.customAlphabet = function customAlphabet(alphabet) {
    var defaultSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 21;
    return function () {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSize;
      var id = '';
      var i = size | 0;
      while (i-- > 0) {
        id += alphabet[Math.random() * alphabet.length | 0];
      }
      return id;
    };
  };
  var nanoid = exports.nanoid = function nanoid() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
    var id = '';
    var i = size | 0;
    while (i-- > 0) {
      id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
  };
},-44,[],"node_modules/nanoid/non-secure/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  /**
   * Base router object that can be used when writing custom routers.
   * This provides few helper methods to handle common actions such as `RESET`.
   */
  var BaseRouter = {
    getStateForAction: function getStateForAction(state, action) {
      switch (action.type) {
        case 'SET_PARAMS':
          {
            var index = action.source ? state.routes.findIndex(function (r) {
              return r.key === action.source;
            }) : state.index;
            if (index === -1) {
              return null;
            }
            return Object.assign({}, state, {
              routes: state.routes.map(function (r, i) {
                return i === index ? Object.assign({}, r, {
                  params: Object.assign({}, r.params, action.payload.params)
                }) : r;
              })
            });
          }
        case 'RESET':
          {
            var nextState = action.payload;
            if (nextState.routes.length === 0 || nextState.routes.some(function (route) {
              return !state.routeNames.includes(route.name);
            })) {
              return null;
            }
            if (nextState.stale === false) {
              if (state.routeNames.length !== nextState.routeNames.length || nextState.routeNames.some(function (name) {
                return !state.routeNames.includes(name);
              })) {
                return null;
              }
              return Object.assign({}, nextState, {
                routes: nextState.routes.map(function (route) {
                  return route.key ? route : Object.assign({}, route, {
                    key: route.name + "-" + (0, _$$_REQUIRE(_dependencyMap[0], "nanoid/non-secure").nanoid)()
                  });
                })
              });
            }
            return nextState;
          }
        default:
          return null;
      }
    },
    shouldActionChangeFocus: function shouldActionChangeFocus(action) {
      return action.type === 'NAVIGATE';
    }
  };
  var _default = exports.default = BaseRouter;
},-43,[-44],"node_modules/@react-navigation/routers/src/BaseRouter.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.goBack = goBack;
  exports.navigate = navigate;
  exports.reset = reset;
  exports.setParams = setParams;
  function goBack() {
    return {
      type: 'GO_BACK'
    };
  }

  // eslint-disable-next-line no-redeclare

  // eslint-disable-next-line no-redeclare
  function navigate() {
    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
      return {
        type: 'NAVIGATE',
        payload: {
          name: arguments.length <= 0 ? undefined : arguments[0],
          params: arguments.length <= 1 ? undefined : arguments[1]
        }
      };
    } else {
      var payload = (arguments.length <= 0 ? undefined : arguments[0]) || {};
      if (!payload.hasOwnProperty('key') && !payload.hasOwnProperty('name')) {
        throw new Error('You need to specify name or key when calling navigate with an object as the argument. See https://reactnavigation.org/docs/navigation-actions#navigate for usage.');
      }
      return {
        type: 'NAVIGATE',
        payload: payload
      };
    }
  }
  function reset(state) {
    return {
      type: 'RESET',
      payload: state
    };
  }
  function setParams(params) {
    return {
      type: 'SET_PARAMS',
      payload: {
        params: params
      }
    };
  }
},-42,[],"node_modules/@react-navigation/routers/src/CommonActions.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    CommonActions: true,
    BaseRouter: true,
    DrawerActions: true,
    DrawerRouter: true,
    StackActions: true,
    StackRouter: true,
    TabActions: true,
    TabRouter: true
  };
  Object.defineProperty(exports, "BaseRouter", {
    enumerable: true,
    get: function get() {
      return _BaseRouter.default;
    }
  });
  exports.CommonActions = void 0;
  Object.defineProperty(exports, "DrawerActions", {
    enumerable: true,
    get: function get() {
      return _DrawerRouter.DrawerActions;
    }
  });
  Object.defineProperty(exports, "DrawerRouter", {
    enumerable: true,
    get: function get() {
      return _DrawerRouter.default;
    }
  });
  Object.defineProperty(exports, "StackActions", {
    enumerable: true,
    get: function get() {
      return _StackRouter.StackActions;
    }
  });
  Object.defineProperty(exports, "StackRouter", {
    enumerable: true,
    get: function get() {
      return _StackRouter.default;
    }
  });
  Object.defineProperty(exports, "TabActions", {
    enumerable: true,
    get: function get() {
      return _TabRouter.TabActions;
    }
  });
  Object.defineProperty(exports, "TabRouter", {
    enumerable: true,
    get: function get() {
      return _TabRouter.default;
    }
  });
  var CommonActions = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "./CommonActions"));
  exports.CommonActions = CommonActions;
  var _BaseRouter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./BaseRouter"));
  var _DrawerRouter = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "./DrawerRouter"));
  var _StackRouter = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4], "./StackRouter"));
  var _TabRouter = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5], "./TabRouter"));
  Object.keys(_$$_REQUIRE(_dependencyMap[6], "./types")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[6], "./types")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[6], "./types")[key];
      }
    });
  });
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
},-41,[7,-42,-43,-45,-47,-46,-48],"node_modules/@react-navigation/routers/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NOT_INITIALIZED_ERROR = void 0;
  exports.default = createNavigationContainerRef;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/toConsumableArray"));
  var NOT_INITIALIZED_ERROR = exports.NOT_INITIALIZED_ERROR = "The 'navigation' object hasn't been initialized yet. This might happen if you don't have a navigator mounted, or if the navigator hasn't finished mounting. See https://reactnavigation.org/docs/navigating-without-navigation-prop#handling-initialization for more details.";
  function createNavigationContainerRef() {
    var methods = [].concat((0, _toConsumableArray2.default)(Object.keys(_$$_REQUIRE(_dependencyMap[3], "@react-navigation/routers").CommonActions)), ['addListener', 'removeListener', 'resetRoot', 'dispatch', 'isFocused', 'canGoBack', 'getRootState', 'getState', 'getParent', 'getCurrentRoute', 'getCurrentOptions']);
    var listeners = {};
    var removeListener = function removeListener(event, callback) {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter(function (cb) {
          return cb !== callback;
        });
      }
    };
    var current = null;
    var ref = Object.assign({
      get current() {
        return current;
      },
      set current(value) {
        current = value;
        if (value != null) {
          Object.entries(listeners).forEach(function (_ref) {
            var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              event = _ref2[0],
              callbacks = _ref2[1];
            callbacks.forEach(function (callback) {
              value.addListener(event, callback);
            });
          });
        }
      },
      isReady: function isReady() {
        if (current == null) {
          return false;
        }
        return current.isReady();
      }
    }, methods.reduce(function (acc, name) {
      acc[name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (current == null) {
          switch (name) {
            case 'addListener':
              {
                var event = args[0],
                  callback = args[1];
                listeners[event] = listeners[event] || [];
                listeners[event].push(callback);
                return function () {
                  return removeListener(event, callback);
                };
              }
            case 'removeListener':
              {
                var _event = args[0],
                  _callback = args[1];
                removeListener(_event, _callback);
                break;
              }
            default:
              console.error(NOT_INITIALIZED_ERROR);
          }
        } else {
          var _current;
          // @ts-expect-error: this is ok
          return (_current = current)[name].apply(_current, args);
        }
      };
      return acc;
    }, {}));
    return ref;
  }
},-40,[7,28,10,-41],"node_modules/@react-navigation/core/src/createNavigationContainerRef.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useSyncState;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var UNINTIALIZED_STATE = {};

  /**
   * This is definitely not compatible with concurrent mode, but we don't have a solution for sync state yet.
   */
  function useSyncState(initialState) {
    var stateRef = React.useRef(UNINTIALIZED_STATE);
    var isSchedulingRef = React.useRef(false);
    var isMountedRef = React.useRef(true);
    React.useEffect(function () {
      isMountedRef.current = true;
      return function () {
        isMountedRef.current = false;
      };
    }, []);
    if (stateRef.current === UNINTIALIZED_STATE) {
      stateRef.current =
      // @ts-expect-error: initialState is a function, but TypeScript doesn't think so
      typeof initialState === 'function' ? initialState() : initialState;
    }
    var _React$useState = React.useState(stateRef.current),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      trackingState = _React$useState2[0],
      setTrackingState = _React$useState2[1];
    var getState = React.useCallback(function () {
      return stateRef.current;
    }, []);
    var setState = React.useCallback(function (state) {
      if (state === stateRef.current || !isMountedRef.current) {
        return;
      }
      stateRef.current = state;
      if (!isSchedulingRef.current) {
        setTrackingState(state);
      }
    }, []);
    var scheduleUpdate = React.useCallback(function (callback) {
      isSchedulingRef.current = true;
      try {
        callback();
      } finally {
        isSchedulingRef.current = false;
      }
    }, []);
    var flushUpdates = React.useCallback(function () {
      if (!isMountedRef.current) {
        return;
      }

      // Make sure that the tracking state is up-to-date.
      // We call it unconditionally, but React should skip the update if state is unchanged.
      setTrackingState(stateRef.current);
    }, []);

    // If we're rendering and the tracking state is out of date, update it immediately
    // This will make sure that our updates are applied as early as possible.
    if (trackingState !== stateRef.current) {
      setTrackingState(stateRef.current);
    }
    var state = stateRef.current;
    React.useDebugValue(state);
    return [state, getState, setState, scheduleUpdate, flushUpdates];
  }
},-39,[7,28,2],"node_modules/@react-navigation/core/src/useSyncState.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useOptionsGetters;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./NavigationBuilderContext"));
  var _NavigationStateContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./NavigationStateContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useOptionsGetters(_ref) {
    var key = _ref.key,
      options = _ref.options,
      navigation = _ref.navigation;
    var optionsRef = React.useRef(options);
    var optionsGettersFromChildRef = React.useRef({});
    var _React$useContext = React.useContext(_NavigationBuilderContext.default),
      onOptionsChange = _React$useContext.onOptionsChange;
    var _React$useContext2 = React.useContext(_NavigationStateContext.default),
      parentAddOptionsGetter = _React$useContext2.addOptionsGetter;
    var optionsChangeListener = React.useCallback(function () {
      var _navigation$isFocused;
      var isFocused = (_navigation$isFocused = navigation == null ? void 0 : navigation.isFocused()) != null ? _navigation$isFocused : true;
      var hasChildren = Object.keys(optionsGettersFromChildRef.current).length;
      if (isFocused && !hasChildren) {
        var _optionsRef$current;
        onOptionsChange((_optionsRef$current = optionsRef.current) != null ? _optionsRef$current : {});
      }
    }, [navigation, onOptionsChange]);
    React.useEffect(function () {
      optionsRef.current = options;
      optionsChangeListener();
      return navigation == null ? void 0 : navigation.addListener('focus', optionsChangeListener);
    }, [navigation, options, optionsChangeListener]);
    var getOptionsFromListener = React.useCallback(function () {
      for (var _key in optionsGettersFromChildRef.current) {
        if (optionsGettersFromChildRef.current.hasOwnProperty(_key)) {
          var _optionsGettersFromCh, _optionsGettersFromCh2;
          var result = (_optionsGettersFromCh = (_optionsGettersFromCh2 = optionsGettersFromChildRef.current)[_key]) == null ? void 0 : _optionsGettersFromCh.call(_optionsGettersFromCh2);

          // null means unfocused route
          if (result !== null) {
            return result;
          }
        }
      }
      return null;
    }, []);
    var getCurrentOptions = React.useCallback(function () {
      var _navigation$isFocused2;
      var isFocused = (_navigation$isFocused2 = navigation == null ? void 0 : navigation.isFocused()) != null ? _navigation$isFocused2 : true;
      if (!isFocused) {
        return null;
      }
      var optionsFromListener = getOptionsFromListener();
      if (optionsFromListener !== null) {
        return optionsFromListener;
      }
      return optionsRef.current;
    }, [navigation, getOptionsFromListener]);
    React.useEffect(function () {
      return parentAddOptionsGetter == null ? void 0 : parentAddOptionsGetter(key, getCurrentOptions);
    }, [getCurrentOptions, parentAddOptionsGetter, key]);
    var addOptionsGetter = React.useCallback(function (key, getter) {
      optionsGettersFromChildRef.current[key] = getter;
      optionsChangeListener();
      return function () {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete optionsGettersFromChildRef.current[key];
        optionsChangeListener();
      };
    }, [optionsChangeListener]);
    return {
      addOptionsGetter: addOptionsGetter,
      getCurrentOptions: getCurrentOptions
    };
  }
},-38,[7,2,-29,-33],"node_modules/@react-navigation/core/src/useOptionsGetters.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useKeyedChildListeners;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook which lets child navigators add getters to be called for obtaining rehydrated state.
   */
  function useKeyedChildListeners() {
    var _React$useRef = React.useRef(Object.assign(Object.create(null), {
        getState: {},
        beforeRemove: {}
      })),
      keyedListeners = _React$useRef.current;
    var addKeyedListener = React.useCallback(function (type, key, listener) {
      // @ts-expect-error: according to ref stated above you can use `key` to index type
      keyedListeners[type][key] = listener;
      return function () {
        // @ts-expect-error: according to ref stated above you can use `key` to index type
        keyedListeners[type][key] = undefined;
      };
    }, [keyedListeners]);
    return {
      keyedListeners: keyedListeners,
      addKeyedListener: addKeyedListener
    };
  }
},-37,[2],"node_modules/@react-navigation/core/src/useKeyedChildListeners.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useEventEmitter;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook to manage the event system used by the navigator to notify screens of various events.
   */
  function useEventEmitter(listen) {
    var listenRef = React.useRef(listen);
    React.useEffect(function () {
      listenRef.current = listen;
    });
    var listeners = React.useRef(Object.create(null));
    var create = React.useCallback(function (target) {
      var removeListener = function removeListener(type, callback) {
        var callbacks = listeners.current[type] ? listeners.current[type][target] : undefined;
        if (!callbacks) {
          return;
        }
        var index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      };
      var addListener = function addListener(type, callback) {
        listeners.current[type] = listeners.current[type] || {};
        listeners.current[type][target] = listeners.current[type][target] || [];
        listeners.current[type][target].push(callback);
        var removed = false;
        return function () {
          // Prevent removing other listeners when unsubscribing same listener multiple times
          if (!removed) {
            removed = true;
            removeListener(type, callback);
          }
        };
      };
      return {
        addListener: addListener,
        removeListener: removeListener
      };
    }, []);
    var emit = React.useCallback(function (_ref) {
      var _items$target, _ref2;
      var type = _ref.type,
        data = _ref.data,
        target = _ref.target,
        canPreventDefault = _ref.canPreventDefault;
      var items = listeners.current[type] || {};

      // Copy the current list of callbacks in case they are mutated during execution
      var callbacks = target !== undefined ? (_items$target = items[target]) == null ? void 0 : _items$target.slice() : (_ref2 = []).concat.apply(_ref2, (0, _toConsumableArray2.default)(Object.keys(items).map(function (t) {
        return items[t];
      }))).filter(function (cb, i, self) {
        return self.lastIndexOf(cb) === i;
      });
      var event = {
        get type() {
          return type;
        }
      };
      if (target !== undefined) {
        Object.defineProperty(event, 'target', {
          enumerable: true,
          get: function get() {
            return target;
          }
        });
      }
      if (data !== undefined) {
        Object.defineProperty(event, 'data', {
          enumerable: true,
          get: function get() {
            return data;
          }
        });
      }
      if (canPreventDefault) {
        var defaultPrevented = false;
        Object.defineProperties(event, {
          defaultPrevented: {
            enumerable: true,
            get: function get() {
              return defaultPrevented;
            }
          },
          preventDefault: {
            enumerable: true,
            value: function value() {
              defaultPrevented = true;
            }
          }
        });
      }
      listenRef.current == null ? void 0 : listenRef.current(event);
      callbacks == null ? void 0 : callbacks.forEach(function (cb) {
        return cb(event);
      });
      return event;
    }, []);
    return React.useMemo(function () {
      return {
        create: create,
        emit: emit
      };
    }, [create, emit]);
  }
},-36,[7,10,2],"node_modules/@react-navigation/core/src/useEventEmitter.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useChildListeners;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Hook which lets child navigators add action listeners.
   */
  function useChildListeners() {
    var _React$useRef = React.useRef({
        action: [],
        focus: []
      }),
      listeners = _React$useRef.current;
    var addListener = React.useCallback(function (type, listener) {
      listeners[type].push(listener);
      var removed = false;
      return function () {
        var index = listeners[type].indexOf(listener);
        if (!removed && index > -1) {
          removed = true;
          listeners[type].splice(index, 1);
        }
      };
    }, [listeners]);
    return {
      listeners: listeners,
      addListener: addListener
    };
  }
},-35,[2],"node_modules/@react-navigation/core/src/useChildListeners.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var UnhandledActionContext = React.createContext(undefined);
  var _default = exports.default = UnhandledActionContext;
},-34,[2],"node_modules/@react-navigation/core/src/UnhandledActionContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var MISSING_CONTEXT_ERROR = "Couldn't find a navigation context. Have you wrapped your app with 'NavigationContainer'? See https://reactnavigation.org/docs/getting-started for setup instructions.";
  var _default = exports.default = React.createContext({
    isDefault: true,
    get getKey() {
      throw new Error(MISSING_CONTEXT_ERROR);
    },
    get setKey() {
      throw new Error(MISSING_CONTEXT_ERROR);
    },
    get getState() {
      throw new Error(MISSING_CONTEXT_ERROR);
    },
    get setState() {
      throw new Error(MISSING_CONTEXT_ERROR);
    },
    get getIsInitial() {
      throw new Error(MISSING_CONTEXT_ERROR);
    }
  });
},-33,[2],"node_modules/@react-navigation/core/src/NavigationStateContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Context which holds the route prop for a screen.
   */
  var NavigationRouteContext = React.createContext(undefined);
  var _default = exports.default = NavigationRouteContext;
},-32,[2],"node_modules/@react-navigation/core/src/NavigationRouteContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Context which holds the navigation prop for a screen.
   */
  var NavigationContext = React.createContext(undefined);
  var _default = exports.default = NavigationContext;
},-31,[2],"node_modules/@react-navigation/core/src/NavigationContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Context which holds the route prop for a screen.
   */
  var NavigationContainerRefContext = React.createContext(undefined);
  var _default = exports.default = NavigationContainerRefContext;
},-30,[2],"node_modules/@react-navigation/core/src/NavigationContainerRefContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Context which holds the required helpers needed to build nested navigators.
   */
  var NavigationBuilderContext = React.createContext({
    onDispatchAction: function onDispatchAction() {
      return undefined;
    },
    onOptionsChange: function onOptionsChange() {
      return undefined;
    }
  });
  var _default = exports.default = NavigationBuilderContext;
},-29,[2],"node_modules/@react-navigation/core/src/NavigationBuilderContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = findFocusedRoute;
  function findFocusedRoute(state) {
    var _current2, _current$index3, _current3;
    var current = state;
    while (((_current = current) == null ? void 0 : _current.routes[(_current$index = current.index) != null ? _current$index : 0].state) != null) {
      var _current, _current$index, _current$index2;
      current = current.routes[(_current$index2 = current.index) != null ? _current$index2 : 0].state;
    }
    var route = (_current2 = current) == null ? void 0 : _current2.routes[(_current$index3 = (_current3 = current) == null ? void 0 : _current3.index) != null ? _current$index3 : 0];
    return route;
  }
},-28,[],"node_modules/@react-navigation/core/src/findFocusedRoute.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SingleNavigatorContext = void 0;
  exports.default = EnsureSingleNavigator;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[1], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/core/src/EnsureSingleNavigator.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var MULTIPLE_NAVIGATOR_ERROR = "Another navigator is already registered for this container. You likely have multiple navigators under a single \"NavigationContainer\" or \"Screen\". Make sure each navigator is under a separate \"Screen\" container. See https://reactnavigation.org/docs/nesting-navigators for a guide on nesting.";
  var SingleNavigatorContext = exports.SingleNavigatorContext = React.createContext(undefined);

  /**
   * Component which ensures that there's only one navigator nested under it.
   */
  function EnsureSingleNavigator(_ref) {
    var children = _ref.children;
    var navigatorKeyRef = React.useRef();
    var value = React.useMemo(function () {
      return {
        register: function register(key) {
          var currentKey = navigatorKeyRef.current;
          if (currentKey !== undefined && key !== currentKey) {
            throw new Error(MULTIPLE_NAVIGATOR_ERROR);
          }
          navigatorKeyRef.current = key;
        },
        unregister: function unregister(key) {
          var currentKey = navigatorKeyRef.current;
          if (key !== currentKey) {
            return;
          }
          navigatorKeyRef.current = undefined;
        }
      };
    }, []);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(SingleNavigatorContext.Provider, {
      value: value,
      children: children
    });
  }
},-27,[2,89],"node_modules/@react-navigation/core/src/EnsureSingleNavigator.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = checkSerializable;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray"));
  var _checkSerializableWithoutCircularReference = function checkSerializableWithoutCircularReference(o, seen, location) {
    if (o === undefined || o === null || typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string') {
      return {
        serializable: true
      };
    }
    if (Object.prototype.toString.call(o) !== '[object Object]' && !Array.isArray(o)) {
      return {
        serializable: false,
        location: location,
        reason: typeof o === 'function' ? 'Function' : String(o)
      };
    }
    if (seen.has(o)) {
      return {
        serializable: false,
        reason: 'Circular reference',
        location: location
      };
    }
    seen.add(o);
    if (Array.isArray(o)) {
      for (var i = 0; i < o.length; i++) {
        var childResult = _checkSerializableWithoutCircularReference(o[i], new Set(seen), [].concat((0, _toConsumableArray2.default)(location), [i]));
        if (!childResult.serializable) {
          return childResult;
        }
      }
    } else {
      for (var key in o) {
        var _childResult = _checkSerializableWithoutCircularReference(o[key], new Set(seen), [].concat((0, _toConsumableArray2.default)(location), [key]));
        if (!_childResult.serializable) {
          return _childResult;
        }
      }
    }
    return {
      serializable: true
    };
  };
  function checkSerializable(o) {
    return _checkSerializableWithoutCircularReference(o, new Set(), []);
  }
},-26,[7,10],"node_modules/@react-navigation/core/src/checkSerializable.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = checkDuplicateRouteNames;
  function checkDuplicateRouteNames(state) {
    var duplicates = [];
    var _getRouteNames = function getRouteNames(location, state) {
      state.routes.forEach(function (route) {
        var _route$state, _route$state$routeNam;
        var currentLocation = location ? location + " > " + route.name : route.name;
        (_route$state = route.state) == null ? void 0 : (_route$state$routeNam = _route$state.routeNames) == null ? void 0 : _route$state$routeNam.forEach(function (routeName) {
          if (routeName === route.name) {
            duplicates.push([currentLocation, currentLocation + " > " + route.name]);
          }
        });
        if (route.state) {
          _getRouteNames(currentLocation, route.state);
        }
      });
    };
    _getRouteNames('', state);
    return duplicates;
  }
},-25,[],"node_modules/@react-navigation/core/src/checkDuplicateRouteNames.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _checkDuplicateRouteNames = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./checkDuplicateRouteNames"));
  var _checkSerializable = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./checkSerializable"));
  var _EnsureSingleNavigator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./EnsureSingleNavigator"));
  var _findFocusedRoute = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./findFocusedRoute"));
  var _NavigationBuilderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./NavigationBuilderContext"));
  var _NavigationContainerRefContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9], "./NavigationContainerRefContext"));
  var _NavigationContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./NavigationContext"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11], "./NavigationRouteContext"));
  var _NavigationStateContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12], "./NavigationStateContext"));
  var _UnhandledActionContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13], "./UnhandledActionContext"));
  var _useChildListeners2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14], "./useChildListeners"));
  var _useEventEmitter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15], "./useEventEmitter"));
  var _useKeyedChildListeners = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16], "./useKeyedChildListeners"));
  var _useOptionsGetters2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17], "./useOptionsGetters"));
  var _useSyncState3 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18], "./useSyncState"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[19], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/core/src/BaseNavigationContainer.tsx";
  var _excluded = ["key", "routeNames"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var serializableWarnings = [];
  var duplicateNameWarnings = [];

  /**
   * Remove `key` and `routeNames` from the state objects recursively to get partial state.
   *
   * @param state Initial state object.
   */
  var _getPartialState = function getPartialState(state) {
    if (state === undefined) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var key = state.key,
      routeNames = state.routeNames,
      partialState = (0, _objectWithoutProperties2.default)(state, _excluded);
    return Object.assign({}, partialState, {
      stale: true,
      routes: state.routes.map(function (route) {
        if (route.state === undefined) {
          return route;
        }
        return Object.assign({}, route, {
          state: _getPartialState(route.state)
        });
      })
    });
  };

  /**
   * Container component which holds the navigation state.
   * This should be rendered at the root wrapping the whole app.
   *
   * @param props.initialState Initial state object for the navigation tree.
   * @param props.onStateChange Callback which is called with the latest navigation state when it changes.
   * @param props.children Child elements to render the content.
   * @param props.ref Ref object which refers to the navigation object containing helper methods.
   */
  var BaseNavigationContainer = React.forwardRef(function BaseNavigationContainer(_ref, ref) {
    var initialState = _ref.initialState,
      onStateChange = _ref.onStateChange,
      onUnhandledAction = _ref.onUnhandledAction,
      independent = _ref.independent,
      children = _ref.children;
    var parent = React.useContext(_NavigationStateContext.default);
    if (!parent.isDefault && !independent) {
      throw new Error("Looks like you have nested a 'NavigationContainer' inside another. Normally you need only one container at the root of the app, so this was probably an error. If this was intentional, pass 'independent={true}' explicitly. Note that this will make the child navigators disconnected from the parent and you won't be able to navigate between them.");
    }
    var _useSyncState = (0, _useSyncState3.default)(function () {
        return _getPartialState(initialState == null ? undefined : initialState);
      }),
      _useSyncState2 = (0, _slicedToArray2.default)(_useSyncState, 5),
      state = _useSyncState2[0],
      getState = _useSyncState2[1],
      setState = _useSyncState2[2],
      scheduleUpdate = _useSyncState2[3],
      flushUpdates = _useSyncState2[4];
    var isFirstMountRef = React.useRef(true);
    var navigatorKeyRef = React.useRef();
    var getKey = React.useCallback(function () {
      return navigatorKeyRef.current;
    }, []);
    var setKey = React.useCallback(function (key) {
      navigatorKeyRef.current = key;
    }, []);
    var _useChildListeners = (0, _useChildListeners2.default)(),
      listeners = _useChildListeners.listeners,
      addListener = _useChildListeners.addListener;
    var _useKeyedChildListene = (0, _useKeyedChildListeners.default)(),
      keyedListeners = _useKeyedChildListene.keyedListeners,
      addKeyedListener = _useKeyedChildListene.addKeyedListener;
    var dispatch = React.useCallback(function (action) {
      if (listeners.focus[0] == null) {
        console.error(_$$_REQUIRE(_dependencyMap[20], "./createNavigationContainerRef").NOT_INITIALIZED_ERROR);
      } else {
        listeners.focus[0](function (navigation) {
          return navigation.dispatch(action);
        });
      }
    }, [listeners.focus]);
    var canGoBack = React.useCallback(function () {
      if (listeners.focus[0] == null) {
        return false;
      }
      var _listeners$focus$ = listeners.focus[0](function (navigation) {
          return navigation.canGoBack();
        }),
        result = _listeners$focus$.result,
        handled = _listeners$focus$.handled;
      if (handled) {
        return result;
      } else {
        return false;
      }
    }, [listeners.focus]);
    var resetRoot = React.useCallback(function (state) {
      var _state$key;
      var target = (_state$key = state == null ? void 0 : state.key) != null ? _state$key : keyedListeners.getState.root == null ? void 0 : keyedListeners.getState.root().key;
      if (target == null) {
        console.error(_$$_REQUIRE(_dependencyMap[20], "./createNavigationContainerRef").NOT_INITIALIZED_ERROR);
      } else {
        listeners.focus[0](function (navigation) {
          return navigation.dispatch(Object.assign({}, _$$_REQUIRE(_dependencyMap[21], "@react-navigation/routers").CommonActions.reset(state), {
            target: target
          }));
        });
      }
    }, [keyedListeners.getState, listeners.focus]);
    var getRootState = React.useCallback(function () {
      return keyedListeners.getState.root == null ? void 0 : keyedListeners.getState.root();
    }, [keyedListeners.getState]);
    var getCurrentRoute = React.useCallback(function () {
      var state = getRootState();
      if (state == null) {
        return undefined;
      }
      var route = (0, _findFocusedRoute.default)(state);
      return route;
    }, [getRootState]);
    var emitter = (0, _useEventEmitter.default)();
    var _useOptionsGetters = (0, _useOptionsGetters2.default)({}),
      addOptionsGetter = _useOptionsGetters.addOptionsGetter,
      getCurrentOptions = _useOptionsGetters.getCurrentOptions;
    var navigation = React.useMemo(function () {
      return Object.assign({}, Object.keys(_$$_REQUIRE(_dependencyMap[21], "@react-navigation/routers").CommonActions).reduce(function (acc, name) {
        acc[name] = function () {
          return (
            // @ts-expect-error: this is ok
            dispatch(_$$_REQUIRE(_dependencyMap[21], "@react-navigation/routers").CommonActions[name].apply(_$$_REQUIRE(_dependencyMap[21], "@react-navigation/routers").CommonActions, arguments))
          );
        };
        return acc;
      }, {}), emitter.create('root'), {
        dispatch: dispatch,
        resetRoot: resetRoot,
        isFocused: function isFocused() {
          return true;
        },
        canGoBack: canGoBack,
        getParent: function getParent() {
          return undefined;
        },
        getState: function getState() {
          return stateRef.current;
        },
        getRootState: getRootState,
        getCurrentRoute: getCurrentRoute,
        getCurrentOptions: getCurrentOptions,
        isReady: function isReady() {
          return listeners.focus[0] != null;
        },
        setOptions: function setOptions() {
          throw new Error('Cannot call setOptions outside a screen');
        }
      });
    }, [canGoBack, dispatch, emitter, getCurrentOptions, getCurrentRoute, getRootState, listeners.focus, resetRoot]);
    React.useImperativeHandle(ref, function () {
      return navigation;
    }, [navigation]);
    var onDispatchAction = React.useCallback(function (action, noop) {
      emitter.emit({
        type: '__unsafe_action__',
        data: {
          action: action,
          noop: noop,
          stack: stackRef.current
        }
      });
    }, [emitter]);
    var lastEmittedOptionsRef = React.useRef();
    var onOptionsChange = React.useCallback(function (options) {
      if (lastEmittedOptionsRef.current === options) {
        return;
      }
      lastEmittedOptionsRef.current = options;
      emitter.emit({
        type: 'options',
        data: {
          options: options
        }
      });
    }, [emitter]);
    var stackRef = React.useRef();
    var builderContext = React.useMemo(function () {
      return {
        addListener: addListener,
        addKeyedListener: addKeyedListener,
        onDispatchAction: onDispatchAction,
        onOptionsChange: onOptionsChange,
        stackRef: stackRef
      };
    }, [addListener, addKeyedListener, onDispatchAction, onOptionsChange]);
    var scheduleContext = React.useMemo(function () {
      return {
        scheduleUpdate: scheduleUpdate,
        flushUpdates: flushUpdates
      };
    }, [scheduleUpdate, flushUpdates]);
    var isInitialRef = React.useRef(true);
    var getIsInitial = React.useCallback(function () {
      return isInitialRef.current;
    }, []);
    var context = React.useMemo(function () {
      return {
        state: state,
        getState: getState,
        setState: setState,
        getKey: getKey,
        setKey: setKey,
        getIsInitial: getIsInitial,
        addOptionsGetter: addOptionsGetter
      };
    }, [state, getState, setState, getKey, setKey, getIsInitial, addOptionsGetter]);
    var onStateChangeRef = React.useRef(onStateChange);
    var stateRef = React.useRef(state);
    React.useEffect(function () {
      isInitialRef.current = false;
      onStateChangeRef.current = onStateChange;
      stateRef.current = state;
    });
    React.useEffect(function () {
      var hydratedState = getRootState();
      if (process.env.NODE_ENV !== 'production') {
        if (hydratedState !== undefined) {
          var serializableResult = (0, _checkSerializable.default)(hydratedState);
          if (!serializableResult.serializable) {
            var location = serializableResult.location,
              reason = serializableResult.reason;
            var path = '';
            var pointer = hydratedState;
            var params = false;
            for (var i = 0; i < location.length; i++) {
              var curr = location[i];
              var prev = location[i - 1];
              pointer = pointer[curr];
              if (!params && curr === 'state') {
                continue;
              } else if (!params && curr === 'routes') {
                if (path) {
                  path += ' > ';
                }
              } else if (!params && typeof curr === 'number' && prev === 'routes') {
                var _pointer;
                path += (_pointer = pointer) == null ? void 0 : _pointer.name;
              } else if (!params) {
                path += " > " + curr;
                params = true;
              } else {
                if (typeof curr === 'number' || /^[0-9]+$/.test(curr)) {
                  path += "[" + curr + "]";
                } else if (/^[a-z$_]+$/i.test(curr)) {
                  path += "." + curr;
                } else {
                  path += "[" + JSON.stringify(curr) + "]";
                }
              }
            }
            var message = "Non-serializable values were found in the navigation state. Check:\n\n" + path + " (" + reason + ")\n\nThis can break usage such as persisting and restoring state. This might happen if you passed non-serializable values such as function, class instances etc. in params. If you need to use components with callbacks in your options, you can use 'navigation.setOptions' instead. See https://reactnavigation.org/docs/troubleshooting#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state for more details.";
            if (!serializableWarnings.includes(message)) {
              serializableWarnings.push(message);
              console.warn(message);
            }
          }
          var duplicateRouteNamesResult = (0, _checkDuplicateRouteNames.default)(hydratedState);
          if (duplicateRouteNamesResult.length) {
            var _message = "Found screens with the same name nested inside one another. Check:\n" + duplicateRouteNamesResult.map(function (locations) {
              return "\n" + locations.join(', ');
            }) + "\n\nThis can cause confusing behavior during navigation. Consider using unique names for each screen instead.";
            if (!duplicateNameWarnings.includes(_message)) {
              duplicateNameWarnings.push(_message);
              console.warn(_message);
            }
          }
        }
      }
      emitter.emit({
        type: 'state',
        data: {
          state: state
        }
      });
      if (!isFirstMountRef.current && onStateChangeRef.current) {
        onStateChangeRef.current(hydratedState);
      }
      isFirstMountRef.current = false;
    }, [getRootState, emitter, state]);
    var defaultOnUnhandledAction = React.useCallback(function (action) {
      if (process.env.NODE_ENV === 'production') {
        return;
      }
      var payload = action.payload;
      var message = "The action '" + action.type + "'" + (payload ? " with payload " + JSON.stringify(action.payload) : '') + " was not handled by any navigator.";
      switch (action.type) {
        case 'NAVIGATE':
        case 'PUSH':
        case 'REPLACE':
        case 'JUMP_TO':
          if (payload != null && payload.name) {
            message += "\n\nDo you have a screen named '" + payload.name + "'?\n\nIf you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.";
          } else {
            message += "\n\nYou need to pass the name of the screen to navigate to.\n\nSee https://reactnavigation.org/docs/navigation-actions for usage.";
          }
          break;
        case 'GO_BACK':
        case 'POP':
        case 'POP_TO_TOP':
          message += "\n\nIs there any screen to go back to?";
          break;
        case 'OPEN_DRAWER':
        case 'CLOSE_DRAWER':
        case 'TOGGLE_DRAWER':
          message += "\n\nIs your screen inside a Drawer navigator?";
          break;
      }
      message += "\n\nThis is a development-only warning and won't be shown in production.";
      console.error(message);
    }, []);
    var element = /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationContainerRefContext.default.Provider, {
      value: navigation,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[22], "./useScheduleUpdate").ScheduleUpdateContext.Provider, {
        value: scheduleContext,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationBuilderContext.default.Provider, {
          value: builderContext,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationStateContext.default.Provider, {
            value: context,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnhandledActionContext.default.Provider, {
              value: onUnhandledAction != null ? onUnhandledAction : defaultOnUnhandledAction,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_EnsureSingleNavigator.default, {
                children: children
              })
            })
          })
        })
      })
    });
    if (independent) {
      // We need to clear any existing contexts for nested independent container to work correctly
      element = /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationRouteContext.default.Provider, {
        value: undefined,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavigationContext.default.Provider, {
          value: undefined,
          children: element
        })
      });
    }
    return element;
  });
  var _default = exports.default = BaseNavigationContainer;
},-24,[7,28,151,2,-25,-26,-27,-28,-29,-30,-31,-32,-33,-34,-35,-36,-37,-38,-39,89,-40,-41,-49],"node_modules/@react-navigation/core/src/BaseNavigationContainer.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    BaseNavigationContainer: true,
    createNavigationContainerRef: true,
    createNavigatorFactory: true,
    CurrentRenderContext: true,
    findFocusedRoute: true,
    getActionFromState: true,
    getFocusedRouteNameFromRoute: true,
    getPathFromState: true,
    getStateFromPath: true,
    NavigationContainerRefContext: true,
    NavigationContext: true,
    NavigationHelpersContext: true,
    NavigationRouteContext: true,
    PreventRemoveContext: true,
    PreventRemoveProvider: true,
    useFocusEffect: true,
    useIsFocused: true,
    useNavigation: true,
    useNavigationBuilder: true,
    useNavigationContainerRef: true,
    useNavigationState: true,
    UNSTABLE_usePreventRemove: true,
    usePreventRemoveContext: true,
    useRoute: true,
    validatePathConfig: true
  };
  Object.defineProperty(exports, "BaseNavigationContainer", {
    enumerable: true,
    get: function get() {
      return _BaseNavigationContainer.default;
    }
  });
  Object.defineProperty(exports, "CurrentRenderContext", {
    enumerable: true,
    get: function get() {
      return _CurrentRenderContext.default;
    }
  });
  Object.defineProperty(exports, "NavigationContainerRefContext", {
    enumerable: true,
    get: function get() {
      return _NavigationContainerRefContext.default;
    }
  });
  Object.defineProperty(exports, "NavigationContext", {
    enumerable: true,
    get: function get() {
      return _NavigationContext.default;
    }
  });
  Object.defineProperty(exports, "NavigationHelpersContext", {
    enumerable: true,
    get: function get() {
      return _NavigationHelpersContext.default;
    }
  });
  Object.defineProperty(exports, "NavigationRouteContext", {
    enumerable: true,
    get: function get() {
      return _NavigationRouteContext.default;
    }
  });
  Object.defineProperty(exports, "PreventRemoveContext", {
    enumerable: true,
    get: function get() {
      return _PreventRemoveContext.default;
    }
  });
  Object.defineProperty(exports, "PreventRemoveProvider", {
    enumerable: true,
    get: function get() {
      return _PreventRemoveProvider.default;
    }
  });
  Object.defineProperty(exports, "UNSTABLE_usePreventRemove", {
    enumerable: true,
    get: function get() {
      return _usePreventRemove.default;
    }
  });
  Object.defineProperty(exports, "createNavigationContainerRef", {
    enumerable: true,
    get: function get() {
      return _createNavigationContainerRef.default;
    }
  });
  Object.defineProperty(exports, "createNavigatorFactory", {
    enumerable: true,
    get: function get() {
      return _createNavigatorFactory.default;
    }
  });
  Object.defineProperty(exports, "findFocusedRoute", {
    enumerable: true,
    get: function get() {
      return _findFocusedRoute.default;
    }
  });
  Object.defineProperty(exports, "getActionFromState", {
    enumerable: true,
    get: function get() {
      return _getActionFromState.default;
    }
  });
  Object.defineProperty(exports, "getFocusedRouteNameFromRoute", {
    enumerable: true,
    get: function get() {
      return _getFocusedRouteNameFromRoute.default;
    }
  });
  Object.defineProperty(exports, "getPathFromState", {
    enumerable: true,
    get: function get() {
      return _getPathFromState.default;
    }
  });
  Object.defineProperty(exports, "getStateFromPath", {
    enumerable: true,
    get: function get() {
      return _getStateFromPath.default;
    }
  });
  Object.defineProperty(exports, "useFocusEffect", {
    enumerable: true,
    get: function get() {
      return _useFocusEffect.default;
    }
  });
  Object.defineProperty(exports, "useIsFocused", {
    enumerable: true,
    get: function get() {
      return _useIsFocused.default;
    }
  });
  Object.defineProperty(exports, "useNavigation", {
    enumerable: true,
    get: function get() {
      return _useNavigation.default;
    }
  });
  Object.defineProperty(exports, "useNavigationBuilder", {
    enumerable: true,
    get: function get() {
      return _useNavigationBuilder.default;
    }
  });
  Object.defineProperty(exports, "useNavigationContainerRef", {
    enumerable: true,
    get: function get() {
      return _useNavigationContainerRef.default;
    }
  });
  Object.defineProperty(exports, "useNavigationState", {
    enumerable: true,
    get: function get() {
      return _useNavigationState.default;
    }
  });
  Object.defineProperty(exports, "usePreventRemoveContext", {
    enumerable: true,
    get: function get() {
      return _usePreventRemoveContext.default;
    }
  });
  Object.defineProperty(exports, "useRoute", {
    enumerable: true,
    get: function get() {
      return _useRoute.default;
    }
  });
  Object.defineProperty(exports, "validatePathConfig", {
    enumerable: true,
    get: function get() {
      return _validatePathConfig.default;
    }
  });
  var _BaseNavigationContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./BaseNavigationContainer"));
  var _createNavigationContainerRef = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./createNavigationContainerRef"));
  var _createNavigatorFactory = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./createNavigatorFactory"));
  var _CurrentRenderContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./CurrentRenderContext"));
  var _findFocusedRoute = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./findFocusedRoute"));
  var _getActionFromState = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./getActionFromState"));
  var _getFocusedRouteNameFromRoute = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./getFocusedRouteNameFromRoute"));
  var _getPathFromState = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./getPathFromState"));
  var _getStateFromPath = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9], "./getStateFromPath"));
  var _NavigationContainerRefContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./NavigationContainerRefContext"));
  var _NavigationContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11], "./NavigationContext"));
  var _NavigationHelpersContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12], "./NavigationHelpersContext"));
  var _NavigationRouteContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13], "./NavigationRouteContext"));
  var _PreventRemoveContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14], "./PreventRemoveContext"));
  var _PreventRemoveProvider = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15], "./PreventRemoveProvider"));
  Object.keys(_$$_REQUIRE(_dependencyMap[16], "./types")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[16], "./types")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[16], "./types")[key];
      }
    });
  });
  var _useFocusEffect = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17], "./useFocusEffect"));
  var _useIsFocused = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18], "./useIsFocused"));
  var _useNavigation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19], "./useNavigation"));
  var _useNavigationBuilder = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20], "./useNavigationBuilder"));
  var _useNavigationContainerRef = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21], "./useNavigationContainerRef"));
  var _useNavigationState = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22], "./useNavigationState"));
  var _usePreventRemove = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23], "./usePreventRemove"));
  var _usePreventRemoveContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[24], "./usePreventRemoveContext"));
  var _useRoute = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25], "./useRoute"));
  var _validatePathConfig = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26], "./validatePathConfig"));
  Object.keys(_$$_REQUIRE(_dependencyMap[27], "@react-navigation/routers")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[27], "@react-navigation/routers")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[27], "@react-navigation/routers")[key];
      }
    });
  });
},-23,[7,-24,-40,-50,-53,-28,-54,-55,-57,-65,-30,-31,-67,-32,-68,-69,-71,-72,-74,-73,-75,-92,-93,-94,-95,-96,-64,-41],"node_modules/@react-navigation/core/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useLinkTo;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _LinkingContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./LinkingContext"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useLinkTo() {
    var navigation = React.useContext(_$$_REQUIRE(_dependencyMap[3], "@react-navigation/core").NavigationContainerRefContext);
    var linking = React.useContext(_LinkingContext.default);
    var linkTo = React.useCallback(function (to) {
      if (navigation === undefined) {
        throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
      }
      if (typeof to !== 'string') {
        // @ts-expect-error: This is fine
        navigation.navigate(to.screen, to.params);
        return;
      }
      if (!to.startsWith('/')) {
        throw new Error("The path must start with '/' (" + to + ").");
      }
      var options = linking.options;
      var state = options != null && options.getStateFromPath ? options.getStateFromPath(to, options.config) : (0, _$$_REQUIRE(_dependencyMap[3], "@react-navigation/core").getStateFromPath)(to, options == null ? void 0 : options.config);
      if (state) {
        var action = (0, _$$_REQUIRE(_dependencyMap[3], "@react-navigation/core").getActionFromState)(state, options == null ? void 0 : options.config);
        if (action !== undefined) {
          navigation.dispatch(action);
        } else {
          navigation.reset(state);
        }
      } else {
        throw new Error('Failed to parse the path to a navigation state.');
      }
    }, [linking, navigation]);
    return linkTo;
  }
},-22,[7,2,-21,-23],"node_modules/@react-navigation/native/src/useLinkTo.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var LinkingContext = React.createContext({
    options: undefined
  });
  LinkingContext.displayName = 'LinkingContext';
  var _default = exports.default = LinkingContext;
},-21,[2],"node_modules/@react-navigation/native/src/LinkingContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useLinkProps;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2], "react-native");
  var _LinkingContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./LinkingContext"));
  var _useLinkTo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./useLinkTo"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _getStateFromParams = function getStateFromParams(params) {
    if (params != null && params.state) {
      return params.state;
    }
    if (params != null && params.screen) {
      return {
        routes: [{
          name: params.screen,
          params: params.params,
          // @ts-expect-error
          state: params.screen ? _getStateFromParams(params.params) : undefined
        }]
      };
    }
    return undefined;
  };

  /**
   * Hook to get props for an anchor tag so it can work with in page navigation.
   *
   * @param props.to Absolute path to screen (e.g. `/feeds/hot`).
   * @param props.action Optional action to use for in-page navigation. By default, the path is parsed to an action based on linking config.
   */
  function useLinkProps(_ref) {
    var _options$getPathFromS;
    var to = _ref.to,
      action = _ref.action;
    var root = React.useContext(_$$_REQUIRE(_dependencyMap[5], "@react-navigation/core").NavigationContainerRefContext);
    var navigation = React.useContext(_$$_REQUIRE(_dependencyMap[5], "@react-navigation/core").NavigationHelpersContext);
    var _React$useContext = React.useContext(_LinkingContext.default),
      options = _React$useContext.options;
    var linkTo = (0, _useLinkTo.default)();
    var onPress = function onPress(e) {
      var _e$currentTarget;
      var shouldHandle = false;
      if (_reactNative.Platform.OS !== 'web' || !e) {
        shouldHandle = e ? !e.defaultPrevented : true;
      } else if (!e.defaultPrevented &&
      // onPress prevented default
      // @ts-expect-error: these properties exist on web, but not in React Native
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && (
      // ignore clicks with modifier keys
      // @ts-expect-error: these properties exist on web, but not in React Native
      e.button == null || e.button === 0) &&
      // ignore everything but left clicks
      // @ts-expect-error: these properties exist on web, but not in React Native
      [undefined, null, '', 'self'].includes((_e$currentTarget = e.currentTarget) == null ? void 0 : _e$currentTarget.target) // let browser handle "target=_blank" etc.
      ) {
        e.preventDefault();
        shouldHandle = true;
      }
      if (shouldHandle) {
        if (action) {
          if (navigation) {
            navigation.dispatch(action);
          } else if (root) {
            root.dispatch(action);
          } else {
            throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
          }
        } else {
          linkTo(to);
        }
      }
    };
    var getPathFromStateHelper = (_options$getPathFromS = options == null ? void 0 : options.getPathFromState) != null ? _options$getPathFromS : _$$_REQUIRE(_dependencyMap[5], "@react-navigation/core").getPathFromState;
    var href = typeof to === 'string' ? to : getPathFromStateHelper({
      routes: [{
        name: to.screen,
        // @ts-expect-error
        params: to.params,
        // @ts-expect-error
        state: _getStateFromParams(to.params)
      }]
    }, options == null ? void 0 : options.config);
    return {
      href: href,
      accessibilityRole: 'link',
      onPress: onPress
    };
  }
},-20,[7,2,5,-21,-22,-23],"node_modules/@react-navigation/native/src/useLinkProps.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Link;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  var _useLinkProps = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./useLinkProps"));
  var _excluded = ["to", "action"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  /**
   * Component to render link to another screen using a path.
   * Uses an anchor tag on the web.
   *
   * @param props.to Absolute path to screen (e.g. `/feeds/hot`).
   * @param props.action Optional action to use for in-page navigation. By default, the path is parsed to an action based on linking config.
   * @param props.children Child elements to render the content.
   */
  function Link(_ref) {
    var to = _ref.to,
      action = _ref.action,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var props = (0, _useLinkProps.default)({
      to: to,
      action: action
    });
    var onPress = function onPress(e) {
      if ('onPress' in rest) {
        rest.onPress == null ? void 0 : rest.onPress(e);
      }
      props.onPress(e);
    };
    return React.createElement(_reactNative.Text, Object.assign({}, props, rest, _reactNative.Platform.select({
      web: {
        onClick: onPress
      },
      default: {
        onPress: onPress
      }
    })));
  }
},-19,[7,151,2,5,-20],"node_modules/@react-navigation/native/src/Link.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    Link: true,
    LinkingContext: true,
    NavigationContainer: true,
    ServerContainer: true,
    DarkTheme: true,
    DefaultTheme: true,
    ThemeProvider: true,
    useTheme: true,
    useLinkBuilder: true,
    useLinkProps: true,
    useLinkTo: true,
    useScrollToTop: true
  };
  Object.defineProperty(exports, "DarkTheme", {
    enumerable: true,
    get: function get() {
      return _DarkTheme.default;
    }
  });
  Object.defineProperty(exports, "DefaultTheme", {
    enumerable: true,
    get: function get() {
      return _DefaultTheme.default;
    }
  });
  Object.defineProperty(exports, "Link", {
    enumerable: true,
    get: function get() {
      return _Link.default;
    }
  });
  Object.defineProperty(exports, "LinkingContext", {
    enumerable: true,
    get: function get() {
      return _LinkingContext.default;
    }
  });
  Object.defineProperty(exports, "NavigationContainer", {
    enumerable: true,
    get: function get() {
      return _NavigationContainer.default;
    }
  });
  Object.defineProperty(exports, "ServerContainer", {
    enumerable: true,
    get: function get() {
      return _ServerContainer.default;
    }
  });
  Object.defineProperty(exports, "ThemeProvider", {
    enumerable: true,
    get: function get() {
      return _ThemeProvider.default;
    }
  });
  Object.defineProperty(exports, "useLinkBuilder", {
    enumerable: true,
    get: function get() {
      return _useLinkBuilder.default;
    }
  });
  Object.defineProperty(exports, "useLinkProps", {
    enumerable: true,
    get: function get() {
      return _useLinkProps.default;
    }
  });
  Object.defineProperty(exports, "useLinkTo", {
    enumerable: true,
    get: function get() {
      return _useLinkTo.default;
    }
  });
  Object.defineProperty(exports, "useScrollToTop", {
    enumerable: true,
    get: function get() {
      return _useScrollToTop.default;
    }
  });
  Object.defineProperty(exports, "useTheme", {
    enumerable: true,
    get: function get() {
      return _useTheme.default;
    }
  });
  var _Link = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./Link"));
  var _LinkingContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./LinkingContext"));
  var _NavigationContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./NavigationContainer"));
  var _ServerContainer = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./ServerContainer"));
  var _DarkTheme = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./theming/DarkTheme"));
  var _DefaultTheme = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./theming/DefaultTheme"));
  var _ThemeProvider = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./theming/ThemeProvider"));
  var _useTheme = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8], "./theming/useTheme"));
  Object.keys(_$$_REQUIRE(_dependencyMap[9], "./types")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[9], "./types")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[9], "./types")[key];
      }
    });
  });
  var _useLinkBuilder = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10], "./useLinkBuilder"));
  var _useLinkProps = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11], "./useLinkProps"));
  var _useLinkTo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12], "./useLinkTo"));
  var _useScrollToTop = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13], "./useScrollToTop"));
  Object.keys(_$$_REQUIRE(_dependencyMap[14], "@react-navigation/core")).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _$$_REQUIRE(_dependencyMap[14], "@react-navigation/core")[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _$$_REQUIRE(_dependencyMap[14], "@react-navigation/core")[key];
      }
    });
  });
},-18,[7,-19,-21,-97,-107,-109,-98,-99,-110,-111,-112,-20,-22,-113,-23],"node_modules/@react-navigation/native/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Badge;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var _color = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "color"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[6], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/bottom-tabs/src/views/Badge.tsx";
  var _excluded = ["children", "style", "visible", "size"],
    _excluded2 = ["backgroundColor"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function Badge(_ref) {
    var children = _ref.children,
      style = _ref.style,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? true : _ref$visible,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 18 : _ref$size,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var _React$useState = React.useState(function () {
        return new _reactNative.Animated.Value(visible ? 1 : 0);
      }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      opacity = _React$useState2[0];
    var _React$useState3 = React.useState(visible),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      rendered = _React$useState4[0],
      setRendered = _React$useState4[1];
    var theme = (0, _$$_REQUIRE(_dependencyMap[7], "@react-navigation/native").useTheme)();
    React.useEffect(function () {
      if (!rendered) {
        return;
      }
      _reactNative.Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 150,
        useNativeDriver: true
      }).start(function (_ref2) {
        var finished = _ref2.finished;
        if (finished && !visible) {
          setRendered(false);
        }
      });
      return function () {
        return opacity.stopAnimation();
      };
    }, [opacity, rendered, visible]);
    if (!rendered) {
      if (visible) {
        setRendered(true);
      } else {
        return null;
      }
    }

    // @ts-expect-error: backgroundColor definitely exists
    var _ref3 = _reactNative.StyleSheet.flatten(style) || {},
      _ref3$backgroundColor = _ref3.backgroundColor,
      backgroundColor = _ref3$backgroundColor === void 0 ? theme.colors.notification : _ref3$backgroundColor,
      restStyle = (0, _objectWithoutProperties2.default)(_ref3, _excluded2);
    var textColor = (0, _color.default)(backgroundColor).isLight() ? 'black' : 'white';
    var borderRadius = size / 2;
    var fontSize = Math.floor(size * 3 / 4);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.Text, Object.assign({
      numberOfLines: 1,
      style: [{
        transform: [{
          scale: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
          })
        }],
        color: textColor,
        lineHeight: size - 1,
        height: size,
        minWidth: size,
        opacity: opacity,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        borderRadius: borderRadius
      }, styles.container, restStyle]
    }, rest, {
      children: children
    }));
  }
  var styles = _reactNative.StyleSheet.create({
    container: {
      alignSelf: 'flex-end',
      textAlign: 'center',
      paddingHorizontal: 4,
      overflow: 'hidden'
    }
  });
},-17,[7,28,151,-12,2,5,89,-18],"node_modules/@react-navigation/bottom-tabs/src/views/Badge.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = TabBarIcon;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2], "react-native");
  var _Badge = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./Badge"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[4], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/bottom-tabs/src/views/TabBarIcon.tsx";
  function TabBarIcon(_ref) {
    var _ = _ref.route,
      horizontal = _ref.horizontal,
      badge = _ref.badge,
      badgeStyle = _ref.badgeStyle,
      activeOpacity = _ref.activeOpacity,
      inactiveOpacity = _ref.inactiveOpacity,
      activeTintColor = _ref.activeTintColor,
      inactiveTintColor = _ref.inactiveTintColor,
      renderIcon = _ref.renderIcon,
      style = _ref.style;
    var size = 25;

    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [horizontal ? styles.iconHorizontal : styles.iconVertical, style],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.icon, {
          opacity: activeOpacity
        }],
        children: renderIcon({
          focused: true,
          size: size,
          color: activeTintColor
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.icon, {
          opacity: inactiveOpacity
        }],
        children: renderIcon({
          focused: false,
          size: size,
          color: inactiveTintColor
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Badge.default, {
        visible: badge != null,
        style: [styles.badge, horizontal ? styles.badgeHorizontal : styles.badgeVertical, badgeStyle],
        size: size * 3 / 4,
        children: badge
      })]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    icon: {
      // We render the icon twice at the same position on top of each other:
      // active and inactive one, so we can fade between them:
      // Cover the whole iconContainer:
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      // Workaround for react-native >= 0.54 layout bug
      minWidth: 25
    },
    iconVertical: {
      flex: 1
    },
    iconHorizontal: {
      height: '100%',
      marginTop: 3
    },
    badge: {
      position: 'absolute',
      left: 3
    },
    badgeVertical: {
      top: 3
    },
    badgeHorizontal: {
      top: 7
    }
  });
},-16,[7,2,5,-17,89],"node_modules/@react-navigation/bottom-tabs/src/views/TabBarIcon.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = function isArrayish(obj) {
    if (!obj || typeof obj === 'string') {
      return false;
    }
    return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== 'String');
  };
},-15,[],"node_modules/simple-swizzle/node_modules/is-arrayish/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var concat = Array.prototype.concat;
  var slice = Array.prototype.slice;
  var swizzle = module.exports = function swizzle(args) {
    var results = [];
    for (var i = 0, len = args.length; i < len; i++) {
      var arg = args[i];
      if (_$$_REQUIRE(_dependencyMap[0], "is-arrayish")(arg)) {
        // http://jsperf.com/javascript-array-concat-vs-push/98
        results = concat.call(results, slice.call(arg));
      } else {
        results.push(arg);
      }
    }
    return results;
  };
  swizzle.wrap = function (fn) {
    return function () {
      return fn(swizzle(arguments));
    };
  };
},-14,[-15],"node_modules/simple-swizzle/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /* MIT license */

  var hasOwnProperty = Object.hasOwnProperty;
  var reverseNames = Object.create(null);

  // create a list of reverse color names
  for (var name in _$$_REQUIRE(_dependencyMap[0], "color-name")) {
    if (hasOwnProperty.call(_$$_REQUIRE(_dependencyMap[0], "color-name"), name)) {
      reverseNames[_$$_REQUIRE(_dependencyMap[0], "color-name")[name]] = name;
    }
  }
  var cs = module.exports = {
    to: {},
    get: {}
  };
  cs.get = function (string) {
    var prefix = string.substring(0, 3).toLowerCase();
    var val;
    var model;
    switch (prefix) {
      case 'hsl':
        val = cs.get.hsl(string);
        model = 'hsl';
        break;
      case 'hwb':
        val = cs.get.hwb(string);
        model = 'hwb';
        break;
      default:
        val = cs.get.rgb(string);
        model = 'rgb';
        break;
    }
    if (!val) {
      return null;
    }
    return {
      model: model,
      value: val
    };
  };
  cs.get.rgb = function (string) {
    if (!string) {
      return null;
    }
    var abbr = /^#([a-f0-9]{3,4})$/i;
    var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
    var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var keyword = /^(\w+)$/;
    var rgb = [0, 0, 0, 1];
    var match;
    var i;
    var hexAlpha;
    if (match = string.match(hex)) {
      hexAlpha = match[2];
      match = match[1];
      for (i = 0; i < 3; i++) {
        // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
        var i2 = i * 2;
        rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
      }
      if (hexAlpha) {
        rgb[3] = parseInt(hexAlpha, 16) / 255;
      }
    } else if (match = string.match(abbr)) {
      match = match[1];
      hexAlpha = match[3];
      for (i = 0; i < 3; i++) {
        rgb[i] = parseInt(match[i] + match[i], 16);
      }
      if (hexAlpha) {
        rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
      }
    } else if (match = string.match(rgba)) {
      for (i = 0; i < 3; i++) {
        rgb[i] = parseInt(match[i + 1], 0);
      }
      if (match[4]) {
        if (match[5]) {
          rgb[3] = parseFloat(match[4]) * 0.01;
        } else {
          rgb[3] = parseFloat(match[4]);
        }
      }
    } else if (match = string.match(per)) {
      for (i = 0; i < 3; i++) {
        rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      if (match[4]) {
        if (match[5]) {
          rgb[3] = parseFloat(match[4]) * 0.01;
        } else {
          rgb[3] = parseFloat(match[4]);
        }
      }
    } else if (match = string.match(keyword)) {
      if (match[1] === 'transparent') {
        return [0, 0, 0, 0];
      }
      if (!hasOwnProperty.call(_$$_REQUIRE(_dependencyMap[0], "color-name"), match[1])) {
        return null;
      }
      rgb = _$$_REQUIRE(_dependencyMap[0], "color-name")[match[1]];
      rgb[3] = 1;
      return rgb;
    } else {
      return null;
    }
    for (i = 0; i < 3; i++) {
      rgb[i] = clamp(rgb[i], 0, 255);
    }
    rgb[3] = clamp(rgb[3], 0, 1);
    return rgb;
  };
  cs.get.hsl = function (string) {
    if (!string) {
      return null;
    }
    var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string.match(hsl);
    if (match) {
      var alpha = parseFloat(match[4]);
      var h = (parseFloat(match[1]) % 360 + 360) % 360;
      var s = clamp(parseFloat(match[2]), 0, 100);
      var l = clamp(parseFloat(match[3]), 0, 100);
      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
    }
    return null;
  };
  cs.get.hwb = function (string) {
    if (!string) {
      return null;
    }
    var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string.match(hwb);
    if (match) {
      var alpha = parseFloat(match[4]);
      var h = (parseFloat(match[1]) % 360 + 360) % 360;
      var w = clamp(parseFloat(match[2]), 0, 100);
      var b = clamp(parseFloat(match[3]), 0, 100);
      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
    }
    return null;
  };
  cs.to.hex = function () {
    var rgba = _$$_REQUIRE(_dependencyMap[1], "simple-swizzle")(arguments);
    return '#' + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : '');
  };
  cs.to.rgb = function () {
    var rgba = _$$_REQUIRE(_dependencyMap[1], "simple-swizzle")(arguments);
    return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')' : 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
  };
  cs.to.rgb.percent = function () {
    var rgba = _$$_REQUIRE(_dependencyMap[1], "simple-swizzle")(arguments);
    var r = Math.round(rgba[0] / 255 * 100);
    var g = Math.round(rgba[1] / 255 * 100);
    var b = Math.round(rgba[2] / 255 * 100);
    return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)' : 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
  };
  cs.to.hsl = function () {
    var hsla = _$$_REQUIRE(_dependencyMap[1], "simple-swizzle")(arguments);
    return hsla.length < 4 || hsla[3] === 1 ? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)' : 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
  };

  // hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
  // (hwb have alpha optional & 1 is default value)
  cs.to.hwb = function () {
    var hwba = _$$_REQUIRE(_dependencyMap[1], "simple-swizzle")(arguments);
    var a = '';
    if (hwba.length >= 4 && hwba[3] !== 1) {
      a = ', ' + hwba[3];
    }
    return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
  };
  cs.to.keyword = function (rgb) {
    return reverseNames[rgb.slice(0, 3)];
  };

  // helpers
  function clamp(num, min, max) {
    return Math.min(Math.max(min, num), max);
  }
  function hexDouble(num) {
    var str = Math.round(num).toString(16).toUpperCase();
    return str.length < 2 ? '0' + str : str;
  }
},-13,[101,-14],"node_modules/color-string/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _slicedToArray = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/slicedToArray");
  var _toConsumableArray = _$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray");
  var skippedModels = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  'keyword',
  // Gray conflicts with some method names, and has its own method defined.
  'gray',
  // Shouldn't really be in color-convert either...
  'hex'];
  var hashedModelKeys = {};
  for (var model of Object.keys(_$$_REQUIRE(_dependencyMap[2], "color-convert"))) {
    hashedModelKeys[_toConsumableArray(_$$_REQUIRE(_dependencyMap[2], "color-convert")[model].labels).sort().join('')] = model;
  }
  var limiters = {};
  function Color(object, model) {
    if (!(this instanceof Color)) {
      return new Color(object, model);
    }
    if (model && model in skippedModels) {
      model = null;
    }
    if (model && !(model in _$$_REQUIRE(_dependencyMap[2], "color-convert"))) {
      throw new Error('Unknown model: ' + model);
    }
    var i;
    var channels;
    if (object == null) {
      // eslint-disable-line no-eq-null,eqeqeq
      this.model = 'rgb';
      this.color = [0, 0, 0];
      this.valpha = 1;
    } else if (object instanceof Color) {
      this.model = object.model;
      this.color = _toConsumableArray(object.color);
      this.valpha = object.valpha;
    } else if (typeof object === 'string') {
      var result = _$$_REQUIRE(_dependencyMap[3], "color-string").get(object);
      if (result === null) {
        throw new Error('Unable to parse color from string: ' + object);
      }
      this.model = result.model;
      channels = _$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model].channels;
      this.color = result.value.slice(0, channels);
      this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
    } else if (object.length > 0) {
      this.model = model || 'rgb';
      channels = _$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model].channels;
      var newArray = Array.prototype.slice.call(object, 0, channels);
      this.color = zeroArray(newArray, channels);
      this.valpha = typeof object[channels] === 'number' ? object[channels] : 1;
    } else if (typeof object === 'number') {
      // This is always RGB - can be converted later on.
      this.model = 'rgb';
      this.color = [object >> 16 & 0xFF, object >> 8 & 0xFF, object & 0xFF];
      this.valpha = 1;
    } else {
      this.valpha = 1;
      var keys = Object.keys(object);
      if ('alpha' in object) {
        keys.splice(keys.indexOf('alpha'), 1);
        this.valpha = typeof object.alpha === 'number' ? object.alpha : 0;
      }
      var hashedKeys = keys.sort().join('');
      if (!(hashedKeys in hashedModelKeys)) {
        throw new Error('Unable to parse color from object: ' + JSON.stringify(object));
      }
      this.model = hashedModelKeys[hashedKeys];
      var labels = _$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model].labels;
      var color = [];
      for (i = 0; i < labels.length; i++) {
        color.push(object[labels[i]]);
      }
      this.color = zeroArray(color);
    }

    // Perform limitations (clamping, etc.)
    if (limiters[this.model]) {
      channels = _$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model].channels;
      for (i = 0; i < channels; i++) {
        var limit = limiters[this.model][i];
        if (limit) {
          this.color[i] = limit(this.color[i]);
        }
      }
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha));
    if (Object.freeze) {
      Object.freeze(this);
    }
  }
  Color.prototype = {
    toString: function toString() {
      return this.string();
    },
    toJSON: function toJSON() {
      return this[this.model]();
    },
    string: function string(places) {
      var self = this.model in _$$_REQUIRE(_dependencyMap[3], "color-string").to ? this : this.rgb();
      self = self.round(typeof places === 'number' ? places : 1);
      var args = self.valpha === 1 ? self.color : [].concat(_toConsumableArray(self.color), [this.valpha]);
      return _$$_REQUIRE(_dependencyMap[3], "color-string").to[self.model](args);
    },
    percentString: function percentString(places) {
      var self = this.rgb().round(typeof places === 'number' ? places : 1);
      var args = self.valpha === 1 ? self.color : [].concat(_toConsumableArray(self.color), [this.valpha]);
      return _$$_REQUIRE(_dependencyMap[3], "color-string").to.rgb.percent(args);
    },
    array: function array() {
      return this.valpha === 1 ? _toConsumableArray(this.color) : [].concat(_toConsumableArray(this.color), [this.valpha]);
    },
    object: function object() {
      var result = {};
      var channels = _$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model].channels;
      var labels = _$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model].labels;
      for (var i = 0; i < channels; i++) {
        result[labels[i]] = this.color[i];
      }
      if (this.valpha !== 1) {
        result.alpha = this.valpha;
      }
      return result;
    },
    unitArray: function unitArray() {
      var rgb = this.rgb().color;
      rgb[0] /= 255;
      rgb[1] /= 255;
      rgb[2] /= 255;
      if (this.valpha !== 1) {
        rgb.push(this.valpha);
      }
      return rgb;
    },
    unitObject: function unitObject() {
      var rgb = this.rgb().object();
      rgb.r /= 255;
      rgb.g /= 255;
      rgb.b /= 255;
      if (this.valpha !== 1) {
        rgb.alpha = this.valpha;
      }
      return rgb;
    },
    round: function round(places) {
      places = Math.max(places || 0, 0);
      return new Color([].concat(_toConsumableArray(this.color.map(roundToPlace(places))), [this.valpha]), this.model);
    },
    alpha: function alpha(value) {
      if (value !== undefined) {
        return new Color([].concat(_toConsumableArray(this.color), [Math.max(0, Math.min(1, value))]), this.model);
      }
      return this.valpha;
    },
    // Rgb
    red: getset('rgb', 0, maxfn(255)),
    green: getset('rgb', 1, maxfn(255)),
    blue: getset('rgb', 2, maxfn(255)),
    hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (value) {
      return (value % 360 + 360) % 360;
    }),
    saturationl: getset('hsl', 1, maxfn(100)),
    lightness: getset('hsl', 2, maxfn(100)),
    saturationv: getset('hsv', 1, maxfn(100)),
    value: getset('hsv', 2, maxfn(100)),
    chroma: getset('hcg', 1, maxfn(100)),
    gray: getset('hcg', 2, maxfn(100)),
    white: getset('hwb', 1, maxfn(100)),
    wblack: getset('hwb', 2, maxfn(100)),
    cyan: getset('cmyk', 0, maxfn(100)),
    magenta: getset('cmyk', 1, maxfn(100)),
    yellow: getset('cmyk', 2, maxfn(100)),
    black: getset('cmyk', 3, maxfn(100)),
    x: getset('xyz', 0, maxfn(95.047)),
    y: getset('xyz', 1, maxfn(100)),
    z: getset('xyz', 2, maxfn(108.833)),
    l: getset('lab', 0, maxfn(100)),
    a: getset('lab', 1),
    b: getset('lab', 2),
    keyword: function keyword(value) {
      if (value !== undefined) {
        return new Color(value);
      }
      return _$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model].keyword(this.color);
    },
    hex: function hex(value) {
      if (value !== undefined) {
        return new Color(value);
      }
      return _$$_REQUIRE(_dependencyMap[3], "color-string").to.hex(this.rgb().round().color);
    },
    hexa: function hexa(value) {
      if (value !== undefined) {
        return new Color(value);
      }
      var rgbArray = this.rgb().round().color;
      var alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
      if (alphaHex.length === 1) {
        alphaHex = '0' + alphaHex;
      }
      return _$$_REQUIRE(_dependencyMap[3], "color-string").to.hex(rgbArray) + alphaHex;
    },
    rgbNumber: function rgbNumber() {
      var rgb = this.rgb().color;
      return (rgb[0] & 0xFF) << 16 | (rgb[1] & 0xFF) << 8 | rgb[2] & 0xFF;
    },
    luminosity: function luminosity() {
      // http://www.w3.org/TR/WCAG20/#relativeluminancedef
      var rgb = this.rgb().color;
      var lum = [];
      for (var _ref of rgb.entries()) {
        var _ref2 = _slicedToArray(_ref, 2);
        var i = _ref2[0];
        var element = _ref2[1];
        var chan = element / 255;
        lum[i] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
      }
      return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast: function contrast(color2) {
      // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
      var lum1 = this.luminosity();
      var lum2 = color2.luminosity();
      if (lum1 > lum2) {
        return (lum1 + 0.05) / (lum2 + 0.05);
      }
      return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level: function level(color2) {
      // https://www.w3.org/TR/WCAG/#contrast-enhanced
      var contrastRatio = this.contrast(color2);
      if (contrastRatio >= 7) {
        return 'AAA';
      }
      return contrastRatio >= 4.5 ? 'AA' : '';
    },
    isDark: function isDark() {
      // YIQ equation from http://24ways.org/2010/calculating-color-contrast
      var rgb = this.rgb().color;
      var yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 10000;
      return yiq < 128;
    },
    isLight: function isLight() {
      return !this.isDark();
    },
    negate: function negate() {
      var rgb = this.rgb();
      for (var i = 0; i < 3; i++) {
        rgb.color[i] = 255 - rgb.color[i];
      }
      return rgb;
    },
    lighten: function lighten(ratio) {
      var hsl = this.hsl();
      hsl.color[2] += hsl.color[2] * ratio;
      return hsl;
    },
    darken: function darken(ratio) {
      var hsl = this.hsl();
      hsl.color[2] -= hsl.color[2] * ratio;
      return hsl;
    },
    saturate: function saturate(ratio) {
      var hsl = this.hsl();
      hsl.color[1] += hsl.color[1] * ratio;
      return hsl;
    },
    desaturate: function desaturate(ratio) {
      var hsl = this.hsl();
      hsl.color[1] -= hsl.color[1] * ratio;
      return hsl;
    },
    whiten: function whiten(ratio) {
      var hwb = this.hwb();
      hwb.color[1] += hwb.color[1] * ratio;
      return hwb;
    },
    blacken: function blacken(ratio) {
      var hwb = this.hwb();
      hwb.color[2] += hwb.color[2] * ratio;
      return hwb;
    },
    grayscale: function grayscale() {
      // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
      var rgb = this.rgb().color;
      var value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
      return Color.rgb(value, value, value);
    },
    fade: function fade(ratio) {
      return this.alpha(this.valpha - this.valpha * ratio);
    },
    opaquer: function opaquer(ratio) {
      return this.alpha(this.valpha + this.valpha * ratio);
    },
    rotate: function rotate(degrees) {
      var hsl = this.hsl();
      var hue = hsl.color[0];
      hue = (hue + degrees) % 360;
      hue = hue < 0 ? 360 + hue : hue;
      hsl.color[0] = hue;
      return hsl;
    },
    mix: function mix(mixinColor, weight) {
      // Ported from sass implementation in C
      // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
      if (!mixinColor || !mixinColor.rgb) {
        throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
      }
      var color1 = mixinColor.rgb();
      var color2 = this.rgb();
      var p = weight === undefined ? 0.5 : weight;
      var w = 2 * p - 1;
      var a = color1.alpha() - color2.alpha();
      var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
      var w2 = 1 - w1;
      return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
    }
  };

  // Model conversion methods and static constructors
  var _loop = function _loop(_model) {
    if (skippedModels.includes(_model)) {
      return 1; // continue
    }
    var channels = _$$_REQUIRE(_dependencyMap[2], "color-convert")[_model].channels;

    // Conversion methods
    Color.prototype[_model] = function () {
      if (this.model === _model) {
        return new Color(this);
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length > 0) {
        return new Color(args, _model);
      }
      return new Color([].concat(_toConsumableArray(assertArray(_$$_REQUIRE(_dependencyMap[2], "color-convert")[this.model][_model].raw(this.color))), [this.valpha]), _model);
    };

    // 'static' construction methods
    Color[_model] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var color = args[0];
      if (typeof color === 'number') {
        color = zeroArray(args, channels);
      }
      return new Color(color, _model);
    };
  };
  for (var _model of Object.keys(_$$_REQUIRE(_dependencyMap[2], "color-convert"))) {
    if (_loop(_model)) continue;
  }
  function roundTo(number, places) {
    return Number(number.toFixed(places));
  }
  function roundToPlace(places) {
    return function (number) {
      return roundTo(number, places);
    };
  }
  function getset(model, channel, modifier) {
    model = Array.isArray(model) ? model : [model];
    for (var m of model) {
      (limiters[m] || (limiters[m] = []))[channel] = modifier;
    }
    model = model[0];
    return function (value) {
      var result;
      if (value !== undefined) {
        if (modifier) {
          value = modifier(value);
        }
        result = this[model]();
        result.color[channel] = value;
        return result;
      }
      result = this[model]().color[channel];
      if (modifier) {
        result = modifier(result);
      }
      return result;
    };
  }
  function maxfn(max) {
    return function (v) {
      return Math.max(0, Math.min(max, v));
    };
  }
  function assertArray(value) {
    return Array.isArray(value) ? value : [value];
  }
  function zeroArray(array, length) {
    for (var i = 0; i < length; i++) {
      if (typeof array[i] !== 'number') {
        array[i] = 0;
      }
    }
    return array;
  }
  module.exports = Color;
},-12,[28,10,99,-13],"node_modules/color/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = BottomTabBarItem;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var _color = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "color"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4], "react-native");
  var _TabBarIcon = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./TabBarIcon"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[6], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/bottom-tabs/src/views/BottomTabItem.tsx";
  var _excluded = ["children", "style", "onPress", "to", "accessibilityRole"];
  function BottomTabBarItem(_ref) {
    var _this = this;
    var focused = _ref.focused,
      route = _ref.route,
      descriptor = _ref.descriptor,
      label = _ref.label,
      icon = _ref.icon,
      badge = _ref.badge,
      badgeStyle = _ref.badgeStyle,
      to = _ref.to,
      _ref$button = _ref.button,
      button = _ref$button === void 0 ? function (_ref2) {
        var children = _ref2.children,
          style = _ref2.style,
          _onPress = _ref2.onPress,
          to = _ref2.to,
          accessibilityRole = _ref2.accessibilityRole,
          rest = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
        if (_reactNative.Platform.OS === 'web' && to) {
          // React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
          // We need to use `onClick` to be able to prevent default browser handling of links.
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[7], "@react-navigation/native").Link, Object.assign({}, rest, {
            to: to,
            style: [styles.button, style],
            onPress: function onPress(e) {
              if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && (
              // ignore clicks with modifier keys
              e.button == null || e.button === 0) // ignore everything but left clicks
              ) {
                e.preventDefault();
                _onPress == null ? void 0 : _onPress(e);
              }
            },
            children: children
          }));
        } else {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, Object.assign({}, rest, {
            accessibilityRole: accessibilityRole,
            onPress: _onPress,
            style: style,
            children: children
          }));
        }
      } : _ref$button,
      accessibilityLabel = _ref.accessibilityLabel,
      testID = _ref.testID,
      onPress = _ref.onPress,
      onLongPress = _ref.onLongPress,
      horizontal = _ref.horizontal,
      customActiveTintColor = _ref.activeTintColor,
      customInactiveTintColor = _ref.inactiveTintColor,
      _ref$activeBackground = _ref.activeBackgroundColor,
      activeBackgroundColor = _ref$activeBackground === void 0 ? 'transparent' : _ref$activeBackground,
      _ref$inactiveBackgrou = _ref.inactiveBackgroundColor,
      inactiveBackgroundColor = _ref$inactiveBackgrou === void 0 ? 'transparent' : _ref$inactiveBackgrou,
      _ref$showLabel = _ref.showLabel,
      showLabel = _ref$showLabel === void 0 ? true : _ref$showLabel,
      allowFontScaling = _ref.allowFontScaling,
      labelStyle = _ref.labelStyle,
      iconStyle = _ref.iconStyle,
      style = _ref.style;
    var _useTheme = (0, _$$_REQUIRE(_dependencyMap[7], "@react-navigation/native").useTheme)(),
      colors = _useTheme.colors;
    var activeTintColor = customActiveTintColor === undefined ? colors.primary : customActiveTintColor;
    var inactiveTintColor = customInactiveTintColor === undefined ? (0, _color.default)(colors.text).mix((0, _color.default)(colors.card), 0.5).hex() : customInactiveTintColor;
    var renderLabel = function renderLabel(_ref3) {
      var focused = _ref3.focused;
      if (showLabel === false) {
        return null;
      }
      var color = focused ? activeTintColor : inactiveTintColor;
      if (typeof label === 'string') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          numberOfLines: 1,
          style: [styles.label, {
            color: color
          }, horizontal ? styles.labelBeside : styles.labelBeneath, labelStyle],
          allowFontScaling: allowFontScaling,
          children: label
        });
      }
      var options = descriptor.options;
      var children = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
      return label({
        focused: focused,
        color: color,
        position: horizontal ? 'beside-icon' : 'below-icon',
        children: children
      });
    };
    var renderIcon = function renderIcon(_ref4) {
      var focused = _ref4.focused;
      if (icon === undefined) {
        return null;
      }
      var activeOpacity = focused ? 1 : 0;
      var inactiveOpacity = focused ? 0 : 1;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabBarIcon.default, {
        route: route,
        horizontal: horizontal,
        badge: badge,
        badgeStyle: badgeStyle,
        activeOpacity: activeOpacity,
        inactiveOpacity: inactiveOpacity,
        activeTintColor: activeTintColor,
        inactiveTintColor: inactiveTintColor,
        renderIcon: icon,
        style: iconStyle
      });
    };
    var scene = {
      route: route,
      focused: focused
    };
    var backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
    return button({
      to: to,
      onPress: onPress,
      onLongPress: onLongPress,
      testID: testID,
      accessibilityLabel: accessibilityLabel,
      // FIXME: accessibilityRole: 'tab' doesn't seem to work as expected on iOS
      accessibilityRole: _reactNative.Platform.select({
        ios: 'button',
        default: 'tab'
      }),
      accessibilityState: {
        selected: focused
      },
      // @ts-expect-error: keep for compatibility with older React Native versions
      accessibilityStates: focused ? ['selected'] : [],
      style: [styles.tab, {
        backgroundColor: backgroundColor
      }, horizontal ? styles.tabLandscape : styles.tabPortrait, style],
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
        children: [renderIcon(scene), renderLabel(scene)]
      })
    });
  }
  var styles = _reactNative.StyleSheet.create({
    tab: {
      flex: 1,
      alignItems: 'center'
    },
    tabPortrait: {
      justifyContent: 'flex-end',
      flexDirection: 'column'
    },
    tabLandscape: {
      justifyContent: 'center',
      flexDirection: 'row'
    },
    label: {
      textAlign: 'center',
      backgroundColor: 'transparent'
    },
    labelBeneath: {
      fontSize: 10
    },
    labelBeside: {
      fontSize: 13,
      marginLeft: 20,
      marginTop: 3
    },
    button: {
      display: 'flex'
    }
  });
},-11,[7,151,-12,2,5,-16,89,-18],"node_modules/@react-navigation/bottom-tabs/src/views/BottomTabItem.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useIsKeyboardShown;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3], "react-native");
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function useIsKeyboardShown() {
    var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isKeyboardShown = _React$useState2[0],
      setIsKeyboardShown = _React$useState2[1];
    React.useEffect(function () {
      var handleKeyboardShow = function handleKeyboardShow() {
        return setIsKeyboardShown(true);
      };
      var handleKeyboardHide = function handleKeyboardHide() {
        return setIsKeyboardShown(false);
      };
      var subscriptions;
      if (_reactNative.Platform.OS === 'ios') {
        subscriptions = [_reactNative.Keyboard.addListener('keyboardWillShow', handleKeyboardShow), _reactNative.Keyboard.addListener('keyboardWillHide', handleKeyboardHide)];
      } else {
        subscriptions = [_reactNative.Keyboard.addListener('keyboardDidShow', handleKeyboardShow), _reactNative.Keyboard.addListener('keyboardDidHide', handleKeyboardHide)];
      }
      return function () {
        subscriptions.forEach(function (s) {
          return s.remove();
        });
      };
    }, []);
    return isKeyboardShown;
  }
},-10,[7,28,2,5],"node_modules/@react-navigation/bottom-tabs/src/utils/useIsKeyboardShown.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = BottomTabBar;
  exports.getTabBarHeight = void 0;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/objectWithoutProperties"));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4], "react-native");
  var _BottomTabBarHeightCallbackContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "../utils/BottomTabBarHeightCallbackContext"));
  var _useIsKeyboardShown = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "../utils/useIsKeyboardShown"));
  var _BottomTabItem = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7], "./BottomTabItem"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/bottom-tabs/src/views/BottomTabBar.tsx";
  var _excluded = ["state", "descriptors", "dimensions", "insets", "style"];
  var DEFAULT_TABBAR_HEIGHT = 49;
  var COMPACT_TABBAR_HEIGHT = 32;
  var DEFAULT_MAX_TAB_ITEM_WIDTH = 125;
  var useNativeDriver = _reactNative.Platform.OS !== 'web';
  var shouldUseHorizontalLabels = function shouldUseHorizontalLabels(_ref) {
    var state = _ref.state,
      descriptors = _ref.descriptors,
      layout = _ref.layout,
      dimensions = _ref.dimensions;
    var tabBarLabelPosition = descriptors[state.routes[state.index].key].options.tabBarLabelPosition;
    if (tabBarLabelPosition) {
      switch (tabBarLabelPosition) {
        case 'beside-icon':
          return true;
        case 'below-icon':
          return false;
      }
    }
    if (layout.width >= 768) {
      // Screen size matches a tablet
      var maxTabWidth = state.routes.reduce(function (acc, route) {
        var tabBarItemStyle = descriptors[route.key].options.tabBarItemStyle;
        var flattenedStyle = _reactNative.StyleSheet.flatten(tabBarItemStyle);
        if (flattenedStyle) {
          if (typeof flattenedStyle.width === 'number') {
            return acc + flattenedStyle.width;
          } else if (typeof flattenedStyle.maxWidth === 'number') {
            return acc + flattenedStyle.maxWidth;
          }
        }
        return acc + DEFAULT_MAX_TAB_ITEM_WIDTH;
      }, 0);
      return maxTabWidth <= layout.width;
    } else {
      return dimensions.width > dimensions.height;
    }
  };
  var getPaddingBottom = function getPaddingBottom(insets) {
    return Math.max(insets.bottom - _reactNative.Platform.select({
      ios: 4,
      default: 0
    }), 0);
  };
  var getTabBarHeight = exports.getTabBarHeight = function getTabBarHeight(_ref2) {
    var _StyleSheet$flatten;
    var state = _ref2.state,
      descriptors = _ref2.descriptors,
      dimensions = _ref2.dimensions,
      insets = _ref2.insets,
      style = _ref2.style,
      rest = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
    // @ts-ignore
    var customHeight = (_StyleSheet$flatten = _reactNative.StyleSheet.flatten(style)) == null ? void 0 : _StyleSheet$flatten.height;
    if (typeof customHeight === 'number') {
      return customHeight;
    }
    var isLandscape = dimensions.width > dimensions.height;
    var horizontalLabels = shouldUseHorizontalLabels(Object.assign({
      state: state,
      descriptors: descriptors,
      dimensions: dimensions
    }, rest));
    var paddingBottom = getPaddingBottom(insets);
    if (_reactNative.Platform.OS === 'ios' && !_reactNative.Platform.isPad && isLandscape && horizontalLabels) {
      return COMPACT_TABBAR_HEIGHT + paddingBottom;
    }
    return DEFAULT_TABBAR_HEIGHT + paddingBottom;
  };
  function BottomTabBar(_ref3) {
    var _this = this;
    var state = _ref3.state,
      navigation = _ref3.navigation,
      descriptors = _ref3.descriptors,
      insets = _ref3.insets,
      style = _ref3.style;
    var _useTheme = (0, _$$_REQUIRE(_dependencyMap[9], "@react-navigation/native").useTheme)(),
      colors = _useTheme.colors;
    var buildLink = (0, _$$_REQUIRE(_dependencyMap[9], "@react-navigation/native").useLinkBuilder)();
    var focusedRoute = state.routes[state.index];
    var focusedDescriptor = descriptors[focusedRoute.key];
    var focusedOptions = focusedDescriptor.options;
    var tabBarShowLabel = focusedOptions.tabBarShowLabel,
      _focusedOptions$tabBa = focusedOptions.tabBarHideOnKeyboard,
      tabBarHideOnKeyboard = _focusedOptions$tabBa === void 0 ? false : _focusedOptions$tabBa,
      tabBarVisibilityAnimationConfig = focusedOptions.tabBarVisibilityAnimationConfig,
      tabBarStyle = focusedOptions.tabBarStyle,
      tabBarBackground = focusedOptions.tabBarBackground,
      tabBarActiveTintColor = focusedOptions.tabBarActiveTintColor,
      tabBarInactiveTintColor = focusedOptions.tabBarInactiveTintColor,
      tabBarActiveBackgroundColor = focusedOptions.tabBarActiveBackgroundColor,
      tabBarInactiveBackgroundColor = focusedOptions.tabBarInactiveBackgroundColor;
    var dimensions = (0, _$$_REQUIRE(_dependencyMap[10], "react-native-safe-area-context").useSafeAreaFrame)();
    var isKeyboardShown = (0, _useIsKeyboardShown.default)();
    var onHeightChange = _react.default.useContext(_BottomTabBarHeightCallbackContext.default);
    var shouldShowTabBar = !(tabBarHideOnKeyboard && isKeyboardShown);
    var visibilityAnimationConfigRef = _react.default.useRef(tabBarVisibilityAnimationConfig);
    _react.default.useEffect(function () {
      visibilityAnimationConfigRef.current = tabBarVisibilityAnimationConfig;
    });
    var _React$useState = _react.default.useState(!shouldShowTabBar),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isTabBarHidden = _React$useState2[0],
      setIsTabBarHidden = _React$useState2[1];
    var _React$useState3 = _react.default.useState(function () {
        return new _reactNative.Animated.Value(shouldShowTabBar ? 1 : 0);
      }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 1),
      visible = _React$useState4[0];
    _react.default.useEffect(function () {
      var visibilityAnimationConfig = visibilityAnimationConfigRef.current;
      if (shouldShowTabBar) {
        var _visibilityAnimationC, _visibilityAnimationC2;
        var animation = (visibilityAnimationConfig == null ? void 0 : (_visibilityAnimationC = visibilityAnimationConfig.show) == null ? void 0 : _visibilityAnimationC.animation) === 'spring' ? _reactNative.Animated.spring : _reactNative.Animated.timing;
        animation(visible, Object.assign({
          toValue: 1,
          useNativeDriver: useNativeDriver,
          duration: 250
        }, visibilityAnimationConfig == null ? void 0 : (_visibilityAnimationC2 = visibilityAnimationConfig.show) == null ? void 0 : _visibilityAnimationC2.config)).start(function (_ref4) {
          var finished = _ref4.finished;
          if (finished) {
            setIsTabBarHidden(false);
          }
        });
      } else {
        var _visibilityAnimationC3, _visibilityAnimationC4;
        setIsTabBarHidden(true);
        var _animation = (visibilityAnimationConfig == null ? void 0 : (_visibilityAnimationC3 = visibilityAnimationConfig.hide) == null ? void 0 : _visibilityAnimationC3.animation) === 'spring' ? _reactNative.Animated.spring : _reactNative.Animated.timing;
        _animation(visible, Object.assign({
          toValue: 0,
          useNativeDriver: useNativeDriver,
          duration: 200
        }, visibilityAnimationConfig == null ? void 0 : (_visibilityAnimationC4 = visibilityAnimationConfig.hide) == null ? void 0 : _visibilityAnimationC4.config)).start();
      }
      return function () {
        return visible.stopAnimation();
      };
    }, [visible, shouldShowTabBar]);
    var _React$useState5 = _react.default.useState({
        height: 0,
        width: dimensions.width
      }),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      layout = _React$useState6[0],
      setLayout = _React$useState6[1];
    var handleLayout = function handleLayout(e) {
      var _e$nativeEvent$layout = e.nativeEvent.layout,
        height = _e$nativeEvent$layout.height,
        width = _e$nativeEvent$layout.width;
      onHeightChange == null ? void 0 : onHeightChange(height);
      setLayout(function (layout) {
        if (height === layout.height && width === layout.width) {
          return layout;
        } else {
          return {
            height: height,
            width: width
          };
        }
      });
    };
    var routes = state.routes;
    var paddingBottom = getPaddingBottom(insets);
    var tabBarHeight = getTabBarHeight({
      state: state,
      descriptors: descriptors,
      insets: insets,
      dimensions: dimensions,
      layout: layout,
      style: [tabBarStyle, style]
    });
    var hasHorizontalLabels = shouldUseHorizontalLabels({
      state: state,
      descriptors: descriptors,
      dimensions: dimensions,
      layout: layout
    });
    var tabBarBackgroundElement = tabBarBackground == null ? void 0 : tabBarBackground();
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
      style: [styles.tabBar, {
        backgroundColor: tabBarBackgroundElement != null ? 'transparent' : colors.card,
        borderTopColor: colors.border
      }, {
        transform: [{
          translateY: visible.interpolate({
            inputRange: [0, 1],
            outputRange: [layout.height + paddingBottom + _reactNative.StyleSheet.hairlineWidth, 0]
          })
        }],
        // Absolutely position the tab bar so that the content is below it
        // This is needed to avoid gap at bottom when the tab bar is hidden
        position: isTabBarHidden ? 'absolute' : null
      }, {
        height: tabBarHeight,
        paddingBottom: paddingBottom,
        paddingHorizontal: Math.max(insets.left, insets.right)
      }, tabBarStyle],
      pointerEvents: isTabBarHidden ? 'none' : 'auto',
      onLayout: handleLayout,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        pointerEvents: "none",
        style: _reactNative.StyleSheet.absoluteFill,
        children: tabBarBackgroundElement
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        accessibilityRole: "tablist",
        style: styles.content,
        children: routes.map(function (route, index) {
          var _options$tabBarIcon;
          var focused = index === state.index;
          var options = descriptors[route.key].options;
          var onPress = function onPress() {
            var event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });
            if (!focused && !event.defaultPrevented) {
              navigation.dispatch(Object.assign({}, _$$_REQUIRE(_dependencyMap[9], "@react-navigation/native").CommonActions.navigate({
                name: route.name,
                merge: true
              }), {
                target: state.key
              }));
            }
          };
          var onLongPress = function onLongPress() {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            });
          };
          var label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
          var accessibilityLabel = options.tabBarAccessibilityLabel !== undefined ? options.tabBarAccessibilityLabel : typeof label === 'string' && _reactNative.Platform.OS === 'ios' ? label + ", tab, " + (index + 1) + " of " + routes.length : undefined;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[9], "@react-navigation/native").NavigationContext.Provider, {
            value: descriptors[route.key].navigation,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[9], "@react-navigation/native").NavigationRouteContext.Provider, {
              value: route,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomTabItem.default, {
                route: route,
                descriptor: descriptors[route.key],
                focused: focused,
                horizontal: hasHorizontalLabels,
                onPress: onPress,
                onLongPress: onLongPress,
                accessibilityLabel: accessibilityLabel,
                to: buildLink(route.name, route.params),
                testID: options.tabBarTestID,
                allowFontScaling: options.tabBarAllowFontScaling,
                activeTintColor: tabBarActiveTintColor,
                inactiveTintColor: tabBarInactiveTintColor,
                activeBackgroundColor: tabBarActiveBackgroundColor,
                inactiveBackgroundColor: tabBarInactiveBackgroundColor,
                button: options.tabBarButton,
                icon: (_options$tabBarIcon = options.tabBarIcon) != null ? _options$tabBarIcon : function (_ref5) {
                  var color = _ref5.color,
                    size = _ref5.size;
                  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[11], "@react-navigation/elements").MissingIcon, {
                    color: color,
                    size: size
                  });
                },
                badge: options.tabBarBadge,
                badgeStyle: options.tabBarBadgeStyle,
                label: label,
                showLabel: tabBarShowLabel,
                labelStyle: options.tabBarLabelStyle,
                iconStyle: options.tabBarIconStyle,
                style: options.tabBarItemStyle
              })
            })
          }, route.key);
        })
      })]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    tabBar: {
      left: 0,
      right: 0,
      bottom: 0,
      borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
      elevation: 8
    },
    content: {
      flex: 1,
      flexDirection: 'row'
    }
  });
},-9,[7,28,151,2,5,-7,-10,-11,89,-18,-114,-123],"node_modules/@react-navigation/bottom-tabs/src/views/BottomTabBar.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _default = exports.default = React.createContext(undefined);
},-8,[2],"node_modules/@react-navigation/bottom-tabs/src/utils/BottomTabBarHeightContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "react"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _default = exports.default = React.createContext(undefined);
},-7,[2],"node_modules/@react-navigation/bottom-tabs/src/utils/BottomTabBarHeightCallbackContext.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = BottomTabView;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray"));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/slicedToArray"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4], "react-native");
  var _BottomTabBarHeightCallbackContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "../utils/BottomTabBarHeightCallbackContext"));
  var _BottomTabBarHeightContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "../utils/BottomTabBarHeightContext"));
  var _BottomTabBar = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7], "./BottomTabBar"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/bottom-tabs/src/views/BottomTabView.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function BottomTabView(props) {
    var _this = this;
    var _props$tabBar = props.tabBar,
      tabBar = _props$tabBar === void 0 ? function (props) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomTabBar.default, Object.assign({}, props));
      } : _props$tabBar,
      state = props.state,
      navigation = props.navigation,
      descriptors = props.descriptors,
      safeAreaInsets = props.safeAreaInsets,
      _props$detachInactive = props.detachInactiveScreens,
      detachInactiveScreens = _props$detachInactive === void 0 ? _reactNative.Platform.OS === 'web' || _reactNative.Platform.OS === 'android' || _reactNative.Platform.OS === 'ios' : _props$detachInactive,
      sceneContainerStyle = props.sceneContainerStyle;
    var focusedRouteKey = state.routes[state.index].key;
    var _React$useState = React.useState([focusedRouteKey]),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      loaded = _React$useState2[0],
      setLoaded = _React$useState2[1];
    if (!loaded.includes(focusedRouteKey)) {
      setLoaded([].concat((0, _toConsumableArray2.default)(loaded), [focusedRouteKey]));
    }
    var dimensions = _$$_REQUIRE(_dependencyMap[9], "@react-navigation/elements").SafeAreaProviderCompat.initialMetrics.frame;
    var _React$useState3 = React.useState(function () {
        return (0, _BottomTabBar.getTabBarHeight)({
          state: state,
          descriptors: descriptors,
          dimensions: dimensions,
          layout: {
            width: dimensions.width,
            height: 0
          },
          insets: Object.assign({}, _$$_REQUIRE(_dependencyMap[9], "@react-navigation/elements").SafeAreaProviderCompat.initialMetrics.insets, props.safeAreaInsets),
          style: descriptors[state.routes[state.index].key].options.tabBarStyle
        });
      }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      tabBarHeight = _React$useState4[0],
      setTabBarHeight = _React$useState4[1];
    var renderTabBar = function renderTabBar() {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[10], "react-native-safe-area-context").SafeAreaInsetsContext.Consumer, {
        children: function children(insets) {
          var _ref, _safeAreaInsets$top, _ref2, _safeAreaInsets$right, _ref3, _safeAreaInsets$botto, _ref4, _safeAreaInsets$left;
          return tabBar({
            state: state,
            descriptors: descriptors,
            navigation: navigation,
            insets: {
              top: (_ref = (_safeAreaInsets$top = safeAreaInsets == null ? void 0 : safeAreaInsets.top) != null ? _safeAreaInsets$top : insets == null ? void 0 : insets.top) != null ? _ref : 0,
              right: (_ref2 = (_safeAreaInsets$right = safeAreaInsets == null ? void 0 : safeAreaInsets.right) != null ? _safeAreaInsets$right : insets == null ? void 0 : insets.right) != null ? _ref2 : 0,
              bottom: (_ref3 = (_safeAreaInsets$botto = safeAreaInsets == null ? void 0 : safeAreaInsets.bottom) != null ? _safeAreaInsets$botto : insets == null ? void 0 : insets.bottom) != null ? _ref3 : 0,
              left: (_ref4 = (_safeAreaInsets$left = safeAreaInsets == null ? void 0 : safeAreaInsets.left) != null ? _safeAreaInsets$left : insets == null ? void 0 : insets.left) != null ? _ref4 : 0
            }
          });
        }
      });
    };
    var routes = state.routes;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_$$_REQUIRE(_dependencyMap[9], "@react-navigation/elements").SafeAreaProviderCompat, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[11], "./ScreenFallback").MaybeScreenContainer, {
        enabled: detachInactiveScreens,
        hasTwoStates: true,
        style: styles.container,
        children: routes.map(function (route, index) {
          var descriptor = descriptors[route.key];
          var _descriptor$options = descriptor.options,
            _descriptor$options$l = _descriptor$options.lazy,
            lazy = _descriptor$options$l === void 0 ? true : _descriptor$options$l,
            unmountOnBlur = _descriptor$options.unmountOnBlur;
          var isFocused = state.index === index;
          if (unmountOnBlur && !isFocused) {
            return null;
          }
          if (lazy && !loaded.includes(route.key) && !isFocused) {
            // Don't render a lazy screen if we've never navigated to it
            return null;
          }
          var _descriptor$options2 = descriptor.options,
            freezeOnBlur = _descriptor$options2.freezeOnBlur,
            _descriptor$options2$ = _descriptor$options2.header,
            header = _descriptor$options2$ === void 0 ? function (_ref5) {
              var layout = _ref5.layout,
                options = _ref5.options;
              return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[9], "@react-navigation/elements").Header, Object.assign({}, options, {
                layout: layout,
                title: (0, _$$_REQUIRE(_dependencyMap[9], "@react-navigation/elements").getHeaderTitle)(options, route.name)
              }));
            } : _descriptor$options2$,
            headerShown = _descriptor$options2.headerShown,
            headerStatusBarHeight = _descriptor$options2.headerStatusBarHeight,
            headerTransparent = _descriptor$options2.headerTransparent;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[11], "./ScreenFallback").MaybeScreen, {
            style: [_reactNative.StyleSheet.absoluteFill, {
              zIndex: isFocused ? 0 : -1
            }],
            visible: isFocused,
            enabled: detachInactiveScreens,
            freezeOnBlur: freezeOnBlur,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomTabBarHeightContext.default.Provider, {
              value: tabBarHeight,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[9], "@react-navigation/elements").Screen, {
                focused: isFocused,
                route: descriptor.route,
                navigation: descriptor.navigation,
                headerShown: headerShown,
                headerStatusBarHeight: headerStatusBarHeight,
                headerTransparent: headerTransparent,
                header: header({
                  layout: dimensions,
                  route: descriptor.route,
                  navigation: descriptor.navigation,
                  options: descriptor.options
                }),
                style: sceneContainerStyle,
                children: descriptor.render()
              })
            })
          }, route.key);
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomTabBarHeightCallbackContext.default.Provider, {
        value: setTabBarHeight,
        children: renderTabBar()
      })]
    });
  }
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden'
    }
  });
},-6,[7,10,28,2,5,-7,-8,-9,89,-123,-114,-145],"node_modules/@react-navigation/bottom-tabs/src/views/BottomTabView.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var DEV = process.env.NODE_ENV !== "production";
  var warnings = new Set();
  function warnOnce(condition) {
    if (DEV && condition) {
      var _console;
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      var key = rest.join(" ");
      if (warnings.has(key)) {
        return;
      }
      warnings.add(key);
      (_console = console).warn.apply(_console, rest);
    }
  }
  module.exports = warnOnce;
},-5,[],"node_modules/warn-once/index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/objectWithoutProperties"));
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2], "react"));
  var _warnOnce = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "warn-once"));
  var _BottomTabView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "../views/BottomTabView"));
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[5], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/node_modules/@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator.tsx";
  var _excluded = ["id", "initialRouteName", "backBehavior", "children", "screenListeners", "screenOptions", "sceneContainerStyle"],
    _excluded2 = ["lazy", "tabBarOptions"];
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function BottomTabNavigator(_ref) {
    var id = _ref.id,
      initialRouteName = _ref.initialRouteName,
      backBehavior = _ref.backBehavior,
      children = _ref.children,
      screenListeners = _ref.screenListeners,
      screenOptions = _ref.screenOptions,
      sceneContainerStyle = _ref.sceneContainerStyle,
      restWithDeprecated = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var lazy = restWithDeprecated.lazy,
      tabBarOptions = restWithDeprecated.tabBarOptions,
      rest = (0, _objectWithoutProperties2.default)(restWithDeprecated, _excluded2);
    var defaultScreenOptions = {};
    if (tabBarOptions) {
      var _tabBarOptions$labelP;
      Object.assign(defaultScreenOptions, {
        tabBarHideOnKeyboard: tabBarOptions.keyboardHidesTabBar,
        tabBarActiveTintColor: tabBarOptions.activeTintColor,
        tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
        tabBarActiveBackgroundColor: tabBarOptions.activeBackgroundColor,
        tabBarInactiveBackgroundColor: tabBarOptions.inactiveBackgroundColor,
        tabBarAllowFontScaling: tabBarOptions.allowFontScaling,
        tabBarShowLabel: tabBarOptions.showLabel,
        tabBarLabelStyle: tabBarOptions.labelStyle,
        tabBarIconStyle: tabBarOptions.iconStyle,
        tabBarItemStyle: tabBarOptions.tabStyle,
        tabBarLabelPosition: (_tabBarOptions$labelP = tabBarOptions.labelPosition) != null ? _tabBarOptions$labelP : tabBarOptions.adaptive === false ? 'below-icon' : undefined,
        tabBarStyle: [{
          display: tabBarOptions.tabBarVisible ? 'none' : 'flex'
        }, defaultScreenOptions.tabBarStyle]
      });
      Object.keys(defaultScreenOptions).forEach(function (key) {
        if (defaultScreenOptions[key] === undefined) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete defaultScreenOptions[key];
        }
      });
      (0, _warnOnce.default)(tabBarOptions, "Bottom Tab Navigator: 'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead.\n\nPlace the following in 'screenOptions' in your code to keep current behavior:\n\n" + JSON.stringify(defaultScreenOptions, null, 2) + "\n\nSee https://reactnavigation.org/docs/bottom-tab-navigator#options for more details.");
    }
    if (typeof lazy === 'boolean') {
      defaultScreenOptions.lazy = lazy;
      (0, _warnOnce.default)(true, "Bottom Tab Navigator: 'lazy' in props is deprecated. Move it to 'screenOptions' instead.\n\nSee https://reactnavigation.org/docs/bottom-tab-navigator/#lazy for more details.");
    }
    var _useNavigationBuilder = (0, _$$_REQUIRE(_dependencyMap[6], "@react-navigation/native").useNavigationBuilder)(_$$_REQUIRE(_dependencyMap[6], "@react-navigation/native").TabRouter, {
        id: id,
        initialRouteName: initialRouteName,
        backBehavior: backBehavior,
        children: children,
        screenListeners: screenListeners,
        screenOptions: screenOptions,
        defaultScreenOptions: defaultScreenOptions
      }),
      state = _useNavigationBuilder.state,
      descriptors = _useNavigationBuilder.descriptors,
      navigation = _useNavigationBuilder.navigation,
      NavigationContent = _useNavigationBuilder.NavigationContent;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(NavigationContent, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomTabView.default, Object.assign({}, rest, {
        state: state,
        navigation: navigation,
        descriptors: descriptors,
        sceneContainerStyle: sceneContainerStyle
      }))
    });
  }
  var _default = exports.default = (0, _$$_REQUIRE(_dependencyMap[6], "@react-navigation/native").createNavigatorFactory)(BottomTabNavigator);
},-4,[7,151,2,-5,-6,89,-18],"node_modules/@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "BottomTabBar", {
    enumerable: true,
    get: function get() {
      return _BottomTabBar.default;
    }
  });
  Object.defineProperty(exports, "BottomTabBarHeightCallbackContext", {
    enumerable: true,
    get: function get() {
      return _BottomTabBarHeightCallbackContext.default;
    }
  });
  Object.defineProperty(exports, "BottomTabBarHeightContext", {
    enumerable: true,
    get: function get() {
      return _BottomTabBarHeightContext.default;
    }
  });
  Object.defineProperty(exports, "BottomTabView", {
    enumerable: true,
    get: function get() {
      return _BottomTabView.default;
    }
  });
  Object.defineProperty(exports, "createBottomTabNavigator", {
    enumerable: true,
    get: function get() {
      return _createBottomTabNavigator.default;
    }
  });
  Object.defineProperty(exports, "useBottomTabBarHeight", {
    enumerable: true,
    get: function get() {
      return _useBottomTabBarHeight.default;
    }
  });
  var _createBottomTabNavigator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./navigators/createBottomTabNavigator"));
  var _BottomTabBar = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./views/BottomTabBar"));
  var _BottomTabView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "./views/BottomTabView"));
  var _BottomTabBarHeightCallbackContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "./utils/BottomTabBarHeightCallbackContext"));
  var _BottomTabBarHeightContext = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "./utils/BottomTabBarHeightContext"));
  var _useBottomTabBarHeight = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6], "./utils/useBottomTabBarHeight"));
},-3,[7,-4,-9,-6,-7,-8,-171],"node_modules/@react-navigation/bottom-tabs/src/index.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/classCallCheck"));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/createClass"));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/possibleConstructorReturn"));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4], "@babel/runtime/helpers/getPrototypeOf"));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5], "@babel/runtime/helpers/inherits"));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6], "react"));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7], "react-native");
  var _jsxRuntime = _$$_REQUIRE(_dependencyMap[8], "react/jsx-runtime");
  var _jsxFileName = "/Users/chenhaoyue/Documents/code/RNThridParty/FabricComponentSample/ReactProject/tests/Vmall/Tab/activity-default/index_tab.h.tsx";
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // BottomTabNavigatorWithComplexContent.js
  var Tab = (0, _$$_REQUIRE(_dependencyMap[9], "@react-navigation/bottom-tabs").createBottomTabNavigator)();
  var BottomTabNavigatorWithComplexContent = /*#__PURE__*/function (_PureComponent) {
    function BottomTabNavigatorWithComplexContent(_props) {
      var _this;
      (0, _classCallCheck2.default)(this, BottomTabNavigatorWithComplexContent);
      _this = _callSuper(this, BottomTabNavigatorWithComplexContent, [_props]);
      // 渲染自定义TabBar
      _this.renderCustomTabBar = function (_ref) {
        var state = _ref.state,
          descriptors = _ref.descriptors,
          navigation = _ref.navigation;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.tabBarContainer,
          children: state.routes.map(function (route, index) {
            var options = descriptors[route.key].options;
            var label = options.tabBarLabel || options.title || route.name;
            var isFocused = state.index === index;
            var onPress = function onPress() {
              // 添加点击动画效果
              _this.setState({
                activeTab: index
              });
              console.log('xchhh onpress', new Date().getTime());
              var event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({
                  name: route.name,
                  merge: true
                });
              }
            };
            console.log('xchhh isFocused', state.index, index, new Date().getTime());
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              onPress: onPress,
              style: [styles.tabItem, isFocused && styles.activeTabItem],
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.tabIcon, isFocused && styles.activeTabIcon],
                children: _this.getTabIcons()[index] || '❓'
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.tabLabel, isFocused && styles.activeTabLabel],
                children: label
              })]
            }, index);
          })
        });
      };
      // 获取Tab图标
      _this.getTabIcons = function () {
        return ['🏠', '🔍', '👤'];
      };
      // 渲染发现内容
      _this.renderHomeContent = function (props) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[10], "./Home").HomePage, Object.assign({}, props));
      };
      // 渲染发现内容
      _this.renderDiscoverContent = function (props) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[11], "./Discovery").DiscoveryPage, Object.assign({}, props));
      };
      // 渲染我的内容
      _this.renderProfileContent = function (props) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[12], "./Personal").PersonalPage, Object.assign({}, props));
      };
      // 根据屏幕名称渲染内容
      _this.renderScreenContent = function (screenName, props) {
        switch (screenName) {
          case '首页':
            return _this.renderHomeContent(props);
          case '发现':
            return _this.renderDiscoverContent(props);
          case '我的':
            return _this.renderProfileContent(props);
          default:
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.contentContainer,
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
                style: styles.defaultText,
                children: ["\u8FD9\u662F ", screenName, " \u9875\u9762"]
              })
            });
        }
      };
      _this.state = {
        activeTab: 0
      };
      return _this;
    }
    (0, _inherits2.default)(BottomTabNavigatorWithComplexContent, _PureComponent);
    return (0, _createClass2.default)(BottomTabNavigatorWithComplexContent, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        var tabData = [{
          id: 1,
          name: '首页',
          icon: '🏠',
          screen: 'Home'
        }, {
          id: 2,
          name: '发现',
          icon: '🔍',
          screen: 'Discover'
        }, {
          id: 3,
          name: '我的',
          icon: '👤',
          screen: 'Profile'
        }];
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_$$_REQUIRE(_dependencyMap[13], "@react-navigation/native").NavigationContainer, {
          independent: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Tab.Navigator, {
            tabBar: function tabBar(props) {
              return _this2.renderCustomTabBar(props);
            },
            screenOptions: {
              headerShown: false
            },
            children: tabData.map(function (tab, index) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)(Tab.Screen, {
                name: tab.screen,
                options: {
                  tabBarLabel: tab.name,
                  tabBarIcon: function tabBarIcon(_ref2) {
                    var focused = _ref2.focused;
                    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: focused ? styles.activeTabIcon : styles.tabIcon,
                      children: tab.icon
                    });
                  }
                },
                children: function children(props) {
                  return _this2.renderScreenContent(tab.name, props);
                }
              }, tab.id);
            })
          })
        });
      }
    }]);
  }(_react.PureComponent);
  var styles = _reactNative.StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      backgroundColor: 'green',
      // borderTopWidth: 1,
      // borderTopColor: '#e0e0e0',
      height: 76,
      elevation: 8
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: -2 },
      // shadowOpacity: 0.1,
      // shadowRadius: 4,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8
    },
    activeTabItem: {
      backgroundColor: 'red'
    },
    tabIcon: {
      fontSize: 20,
      marginBottom: 4
    },
    activeTabIcon: {
      fontSize: 20,
      marginBottom: 4,
      color: '#007AFF'
    },
    tabLabel: {
      fontSize: 12,
      color: '#666'
    },
    activeTabLabel: {
      fontSize: 12,
      color: '#007AFF'
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5'
    },
    section: {
      backgroundColor: '#ffffff',
      margin: 10,
      borderRadius: 8,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333'
    },
    // 轮播图样式
    bannerContainer: {
      height: 150
    },
    bannerItem: {
      width: 300,
      marginRight: 10,
      borderRadius: 8,
      overflow: 'hidden'
    },
    bannerImage: {
      width: 300,
      height: 150
    },
    bannerTitle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: '#fff',
      padding: 5,
      textAlign: 'center'
    },
    // 产品推荐样式
    productItem: {
      width: 150,
      marginRight: 10,
      alignItems: 'center'
    },
    productImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    productName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    productPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 分类样式
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    categoryItem: {
      width: '30%',
      alignItems: 'center',
      marginBottom: 15
    },
    categoryIcon: {
      fontSize: 30,
      marginBottom: 5
    },
    categoryName: {
      fontSize: 12,
      color: '#333'
    },
    // 新闻样式
    newsItem: {
      backgroundColor: '#f8f9fa',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    newsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333'
    },
    newsContent: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5
    },
    newsTime: {
      fontSize: 12,
      color: '#999'
    },
    // 促销活动样式
    promotionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e8f4f8',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10
    },
    promotionInfo: {
      flex: 1
    },
    promotionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    promotionDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    promotionDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B'
    },
    // 搜索历史样式
    searchHistory: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    historyItem: {
      backgroundColor: '#e8f4f8',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    historyText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 热门关键词样式
    keywordsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    keywordItem: {
      backgroundColor: '#f0f8ff',
      padding: 8,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10
    },
    keywordText: {
      fontSize: 14,
      color: '#007AFF'
    },
    // 特色分类样式
    featuredCategoryItem: {
      width: 120,
      marginRight: 10,
      alignItems: 'center'
    },
    featuredCategoryImage: {
      width: 100,
      height: 100,
      borderRadius: 8
    },
    featuredCategoryName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5
    },
    featuredCategoryCount: {
      fontSize: 12,
      color: '#666',
      marginTop: 3
    },
    // 热门商品样式
    trendingProductItem: {
      width: 150,
      margin: 5,
      alignItems: 'center'
    },
    trendingProductImage: {
      width: 150,
      height: 150,
      borderRadius: 8
    },
    trendingProductName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
      textAlign: 'center'
    },
    trendingProductPrice: {
      fontSize: 16,
      color: '#FF6B6B',
      fontWeight: 'bold',
      marginTop: 5
    },
    // 特殊优惠样式
    specialOfferItem: {
      backgroundColor: '#fff8e1',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    specialOfferTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    specialOfferDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    specialOfferDiscount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FF6B6B',
      marginTop: 5
    },
    // 用户信息样式
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    userAvatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15
    },
    userInfo: {
      flex: 1
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
    },
    userLevel: {
      fontSize: 14,
      color: '#666',
      marginTop: 5
    },
    userStats: {
      flexDirection: 'row',
      marginTop: 10
    },
    statItem: {
      alignItems: 'center',
      marginRight: 20
    },
    statValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007AFF'
    },
    statLabel: {
      fontSize: 12,
      color: '#666'
    },
    // 快操作样式
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    quickActionItem: {
      width: '30%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    quickActionIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    quickActionTitle: {
      fontSize: 12,
      color: '#333'
    },
    quickActionCount: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: '#FF6B6B',
      color: '#fff',
      fontSize: 10,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 2
    },
    // 服务功能样式
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    serviceItem: {
      width: '45%',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10
    },
    serviceIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    serviceTitle: {
      fontSize: 14,
      color: '#333'
    },
    // 活动记录样式
    activityItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      marginBottom: 10
    },
    activityInfo: {
      flex: 1
    },
    activityAction: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333'
    },
    activityDetail: {
      fontSize: 14,
      color: '#666',
      marginTop: 3
    },
    activityTime: {
      fontSize: 12,
      color: '#999'
    },
    defaultText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#666',
      marginTop: 50
    }
  });
  var _default = exports.default = BottomTabNavigatorWithComplexContent;
},-2,[7,16,17,50,52,53,2,5,89,-3,-172,-173,-174,-18],"tests/Vmall/Tab/activity-default/index_tab.h.tsx");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  var _reactNative = _$$_REQUIRE(_dependencyMap[1], "react-native");
  var _index_tabH = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "./tests/Vmall/Tab/activity-default/index_tab.h.tsx"));
  /**
   * Copyright (c) 2024 Huawei Technologies Co., Ltd.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE-MIT file in the root directory of this source tree.
   *
   * @format
   */
  // initialProps = {};

  // import { name as appName } from './app.json';
  // import App from './src/testTurboModule/test.tsx';
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
  // import App from './src/thridPartyDemo/webView.tsx';
  // import App from './thridPartyDemo/AdaptiveWebView.tsx';
  // import App from './thridPartyDemo/vmall/DTS2025111903544/webviewDemo/webviewDemo/index.tsx'
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
  // import App from './tests/mijia/demo.js';
  // import App from './tests/Gifted/GiftedChatExample4.tsx';
  // import App from './tests/TextFont.tsx';
  // import App from './tests/mijia/kuncheng/Demo.tsx';
  // import App from './FabricComponent/RCTSelectBox1.tsx';
  // import App from './tests/Display.tsx';
  // import App from './IR/251014164852025/OpacityDemo.tsx';
  // import "./svgDemo.js";
  // import App from './thridPartyDemo/vmall/DTS2025111903544/index.tsx'
  // import App from './watermelondb/App'
  // import App from './animated/ScaleAnimationDemo.tsx'
  // import App from './src/IR/251208195649046/GestureHandlerDemo.tsx'
  // import App from './src/IR/251208195649046/RequireExternalGestureToFailDemo.tsx'
  // import App from './thridPartyDemo/skia.tsx'
  // import App from './src/DTS/DTS2026011907680/GestureHandlerDemo'
  // import App from './src/DTS/DTS2025121743837/GestureHandlerDemo.tsx'
  // import App from './src/DTS/DTS2025121743837/GestureHandlerDemo1.tsx'
  // import App from './src/DTS/DTS2025121743837/GesturePreventScrollDemo.tsx'
  // import App from './src/absoluteDemo.tsx'
  // import App from './IR/260116160802092/react-native-clipboard/index.tsx'
  // import App from './tests/netInfo.tsx'
  // import App from './src/keyboardController.tsx'
  // import App from './src/shopify-flash-list/demo.tsx'
  // import App from './src/bottomSheet/App.tsx'
  // import App from './src/react-native-keyboard-controller/KeyboardController.tsx'
  // import App from './src/react-native-keyboard-controller/index.tsx'
  // import App from "./tests/260104193423079 -1/KebApp.tsx"
  // import App from "./tests/260104193423079 -1/transformEvent.tsx"
  // import App from "./tests/smartRefresh/demo.tsx"
  // import App from './tests/ToptabDemo/TopTabDemo/NavigationMaterialTopTabs.tsx'
  // import App from './tests/didi/demo'
  // import App from './tests/didi/demohjy'
  // import App from './tests/refresh.tsx'
  // import App from './tests/lottie/crash_demo_direct.tsx'
  // import App from "./tests/screensDemo.tsx"
  // import App from './tests/crash/pingan/ReanimatedCrashRepro.tsx'
  // import App from './App1.tsx'
  // import App from './tests/camera/Camera.tsx'
  // import App from './tests/react-native-vision-camera/App.tsx'
  // import VisionCameraDemo from './src/xiaoyi/camerapage/VisionCameraDemo';
  // import App from './tests/react-native-animated/App.tsx'
  // import App from './tests/react-native-gesture-handler/App.tsx'
  // import App from './tests/react-native-gesture-handler/RNPanBasicDemo.tsx'
  // import App from './tests/react-native-gesture-handler/RNGestureHandlerDemo.tsx'
  // import App from './tests/react-native-gesture-handler/PinchWithRotationDemo.tsx'
  // import App from './tests/judgeFabric.tsx'
  // import App from './tests/webview/webviewScrollviewDemo.tsx'
  // import App from './tests/webview/webviewFlatlistDemo.tsx'
  // import App from './tests/crash/pingan/ReanimatedCrashRepro2.tsx'
  // import App from './tests/crash/pingan/ReanimatedCrashRepro.tsx'
  // import App from './tests/crash/pingan/ReanimatedCrashRepro2.tsx'
  // import App from './tests/crash/pingan/ReanimatedCrashRepro3.tsx'
  // import App from './tests/crash/pingan/ReanimatedCrashRepro4.tsx'
  // import App from './tests/crash/pingan/ReanimatedCrashRepro5.tsx'
  // import App from './src/GestureWebView/GestureWebViewDemo.tsx'
  // import App from './tests/react-native-gesture-handler/upstreamDemo/App.tsx'
  // import App from "./tests/pinganhaochezhu/webview.tsx"
  // import App from "./tests/react-native-webview/darkon.tsx"
  // import App from "./tests/react-native-elements/App.tsx"

  // import App from "./tests/react-native-spring-scrollview/App.tsx"
  // import App from "./tests/react-native-animated/AnimatedSensorExample2.tsx"

  // 在导航或 App 中注册该组件
  _reactNative.AppRegistry.registerComponent("app_name", function () {
    return _index_tabH.default;
  });
  // import { transform } from "./testTurboModule/buautify_executor.js"
},-1,[7,5,-2],"index.js");
__r(46);
__r(-1);