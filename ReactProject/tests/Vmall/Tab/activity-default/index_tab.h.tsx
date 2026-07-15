// BottomTabNavigatorWithComplexContent.js
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DiscoveryPage } from './Discovery';
import { HomePage } from './Home';
import { PersonalPage } from './Personal';

const Tab = createBottomTabNavigator();

class BottomTabNavigatorWithComplexContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  // 渲染自定义TabBar
  renderCustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            // 添加点击动画效果
            this.setState({ activeTab: index });
            console.log('xchhh onpress', new Date().getTime());

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };
          console.log('xchhh isFocused', state.index , index, new Date().getTime());
          return (
            <TouchableOpacity key={index} onPress={onPress} style={[styles.tabItem, isFocused && styles.activeTabItem]}>
              <Text style={[styles.tabIcon, isFocused && styles.activeTabIcon]}>
                {this.getTabIcons()[index] || '❓'}
              </Text>
              <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // 获取Tab图标
  getTabIcons = () => {
    return ['🏠', '🔍', '👤'];
  };

  // 渲染发现内容
  renderHomeContent = (props) => {
    return <HomePage {...props} />;
  };

  // 渲染发现内容
  renderDiscoverContent = (props) => {
    return <DiscoveryPage {...props} />;
  };

  // 渲染我的内容
  renderProfileContent = (props) => {
    return <PersonalPage {...props} />;
  };

  // 根据屏幕名称渲染内容
  renderScreenContent = (screenName, props) => {
    switch (screenName) {
      case '首页':
        return this.renderHomeContent(props);
      case '发现':
        return this.renderDiscoverContent(props);
      case '我的':
        return this.renderProfileContent(props);
      default:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.defaultText}>这是 {screenName} 页面</Text>
          </View>
        );
    }
  };

  render() {
    const tabData = [
      {
        id: 1,
        name: '首页',
        icon: '🏠',
        screen: 'Home',
      },
      {
        id: 2,
        name: '发现',
        icon: '🔍',
        screen: 'Discover',
      },
      {
        id: 3,
        name: '我的',
        icon: '👤',
        screen: 'Profile',
      },
    ];

    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          tabBar={(props) => this.renderCustomTabBar(props)}
          screenOptions={{
            headerShown: false,
          }}
        >
          {tabData.map((tab, index) => (
            <Tab.Screen
              key={tab.id}
              name={tab.screen}
              options={{
                tabBarLabel: tab.name,
                tabBarIcon: ({ focused }) => (
                  <Text style={focused ? styles.activeTabIcon : styles.tabIcon}>{tab.icon}</Text>
                ),
              }}
            >
              {(props) => this.renderScreenContent(tab.name, props)}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'green',
    // borderTopWidth: 1,
    // borderTopColor: '#e0e0e0',
    height: 76,
    elevation: 8,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeTabItem: {
    backgroundColor: 'red',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeTabIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#007AFF',
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeTabLabel: {
    fontSize: 12,
    color: '#007AFF',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  // 轮播图样式
  bannerContainer: {
    height: 150,
  },
  bannerItem: {
    width: 300,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    width: 300,
    height: 150,
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    padding: 5,
    textAlign: 'center',
  },
  // 产品推荐样式
  productItem: {
    width: 150,
    marginRight: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginTop: 5,
  },
  // 分类样式
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
  },
  // 新闻样式
  newsItem: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  newsContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  newsTime: {
    fontSize: 12,
    color: '#999',
  },
  // 促销活动样式
  promotionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f4f8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  promotionInfo: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  promotionDiscount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  // 搜索历史样式
  searchHistory: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  historyItem: {
    backgroundColor: '#e8f4f8',
    padding: 8,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 14,
    color: '#007AFF',
  },
  // 热门关键词样式
  keywordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordItem: {
    backgroundColor: '#f0f8ff',
    padding: 8,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  keywordText: {
    fontSize: 14,
    color: '#007AFF',
  },
  // 特色分类样式
  featuredCategoryItem: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  featuredCategoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  featuredCategoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  featuredCategoryCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  // 热门商品样式
  trendingProductItem: {
    width: 150,
    margin: 5,
    alignItems: 'center',
  },
  trendingProductImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  trendingProductName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  trendingProductPrice: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginTop: 5,
  },
  // 特殊优惠样式
  specialOfferItem: {
    backgroundColor: '#fff8e1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  specialOfferTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  specialOfferDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  specialOfferDiscount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 5,
  },
  // 用户信息样式
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userLevel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  userStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  // 快操作样式
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  quickActionTitle: {
    fontSize: 12,
    color: '#333',
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
    paddingVertical: 2,
  },
  // 服务功能样式
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  serviceTitle: {
    fontSize: 14,
    color: '#333',
  },
  // 活动记录样式
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activityDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  defaultText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 50,
  },
});

export default BottomTabNavigatorWithComplexContent;
