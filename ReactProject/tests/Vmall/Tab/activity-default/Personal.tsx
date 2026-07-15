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

class Personal extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    props.navigation?.addListener('focus', () => {
      console.log('xchhh Personal focus', new Date().getTime());
    });
    this.state = {
      activeTab: 0,
      // 模拟复杂的数据结构
      profileData: this.generateProfileData(),
    };
  }
    // 生成我的页面复杂数据
    generateProfileData = () => {
      return {
        userInfo: {
          name: '张三',
          level: 'VIP会员',
          avatar: 'https://via.placeholder.com/80x80/007AFF/FFFFFF?text=头像',
          points: 1250,
          balance: 2500.50,
        },
        quickActions: [
          { id: 1, title: '我的订单', icon: '📦', count: 12 },
          { id: 2, title: '我的收藏', icon: '❤️', count: 24 },
          { id: 3, title: '收货地址', icon: '📍', count: 3 },
          { id: 4, title: '优惠券', icon: '💰', count: 5 },
          { id: 5, title: '积分商城', icon: '🏆', count: 0 },
          { id: 6, title: '设置', icon: '⚙️', count: 0 },
        ],
        services: [
          { id: 1, title: '客户服务', icon: '💬' },
          { id: 2, title: '意见反馈', icon: '📝' },
          { id: 3, title: '帮助中心', icon: '❓' },
          { id: 4, title: '关于我们', icon: 'ℹ️' },
        ],
        recentActivity: [
          { id: 1, action: '购买商品', time: '5分钟前', detail: 'iPhone 15 Pro' },
          { id: 2, action: '收藏商品', time: '1小时前', detail: 'MacBook Air' },
          { id: 3, action: '浏览页面', time: '2小时前', detail: '优惠活动' },
          { id: 4, action: '查看订单', time: '1天前', detail: '订单号#123456' },
          { id: 5, action: '购买商品', time: '5分钟前', detail: 'iPhone 15 Pro' },
          { id: 6, action: '收藏商品', time: '1小时前', detail: 'MacBook Air' },
          { id: 7, action: '浏览页面', time: '2小时前', detail: '优惠活动' },
          { id: 8, action: '查看订单', time: '1天前', detail: '订单号#123456' },
          { id: 9, action: '购买商品', time: '5分钟前', detail: 'iPhone 15 Pro' },
          { id: 10, action: '收藏商品', time: '1小时前', detail: 'MacBook Air' },
          { id: 11, action: '浏览页面', time: '2小时前', detail: '优惠活动' },
          { id: 12, action: '查看订单', time: '1天前', detail: '订单号#123456' },
        ],
      };
    };
  
  // 渲染首页内容
  render() {
    const { userInfo, quickActions, services, recentActivity } = this.state.profileData;
    return (
      <ScrollView style={styles.contentContainer}>
        {/* 用户信息 */}
        <View style={styles.section}>
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: userInfo.avatar }} style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userLevel}>{userInfo.level}</Text>
              <View style={styles.userStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{userInfo.points}</Text>
                  <Text style={styles.statLabel}>积分</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>¥{userInfo.balance}</Text>
                  <Text style={styles.statLabel}>余额</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 快捷操作 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>快捷操作</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(action => (
              <TouchableOpacity key={action.id} style={styles.quickActionItem}>
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                {action.count > 0 && (
                  <Text style={styles.quickActionCount}>{action.count}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 服务功能 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>服务功能</Text>
          <View style={styles.servicesGrid}>
            {services.map(service => (
              <TouchableOpacity key={service.id} style={styles.serviceItem}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 最近活动 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>最近活动</Text>
          {recentActivity.map(activity => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityDetail}>{activity.detail}</Text>
              </View>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
export const PersonalPage = Personal;
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeTabItem: {
    backgroundColor: '#f0f8ff',
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
