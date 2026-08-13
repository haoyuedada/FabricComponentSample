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

class Home extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    props.navigation?.addListener('focus', () => {
      console.log('xchhh renderHomeContent focus', new Date().getTime());
    });
    this.state = {
      activeTab: 0,
      // 模拟复杂的数据结构
      homeData: this.generateHomeData(),
    };
  }
  // 生成首页复杂数据
  generateHomeData = () => {
    return {
      banner: [
        { id: 1, title: '新品上市', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 2, title: '限时优惠', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 3, title: '品牌特卖', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 4, title: '新品上市', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 5, title: '限时优惠', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 6, title: '品牌特卖', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 7, title: '新品上市', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 8, title: '限时优惠', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 9, title: '品牌特卖', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 10, title: '新品上市', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 11, title: '限时优惠', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 12, title: '品牌特卖', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
      ],
      recommendations: [
        { id: 1, name: 'iPhone 15 Pro', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 2, name: 'MacBook Air', price: '¥12999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 3, name: 'iPad Pro', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 4, name: 'AirPods Pro', price: '¥1899', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 5, name: 'iPhone 15 Pro', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 6, name: 'MacBook Air', price: '¥12999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 7, name: 'iPad Pro', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 8, name: 'AirPods Pro', price: '¥1899', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 9, name: 'iPhone 15 Pro', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 10, name: 'MacBook Air', price: '¥12999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 11, name: 'iPad Pro', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 12, name: 'AirPods Pro', price: '¥1899', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 13, name: 'iPhone 15 Pro', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 14, name: 'MacBook Air', price: '¥12999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 15, name: 'iPad Pro', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
        { id: 16, name: 'AirPods Pro', price: '¥1899', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202412/315038f1303845b9aa0eb6df3c98cb0e.jpg' },
      ],
      categories: [
        { id: 1, name: '手机数码', icon: '📱' },
        { id: 2, name: '家用电器', icon: '📺' },
        { id: 3, name: '服饰鞋包', icon: '👕' },
        { id: 4, name: '美妆个护', icon: '💄' },
        { id: 5, name: '家居生活', icon: '🏠' },
        { id: 6, name: '运动户外', icon: '⚽' },
        { id: 7, name: '手机数码', icon: '📱' },
        { id: 8, name: '家用电器', icon: '📺' },
        { id: 9, name: '服饰鞋包', icon: '👕' },
        { id: 10, name: '美妆个护', icon: '💄' },
        { id: 11, name: '家居生活', icon: '🏠' },
        { id: 12, name: '运动户外', icon: '⚽' },
        { id: 13, name: '手机数码', icon: '📱' },
        { id: 14, name: '家用电器', icon: '📺' },
        { id: 15, name: '服饰鞋包', icon: '👕' },
        { id: 16, name: '美妆个护', icon: '💄' },
        { id: 17, name: '家居生活', icon: '🏠' },
        { id: 18, name: '运动户外', icon: '⚽' },
      ],
      news: [
        { id: 1, title: '新品发布', content: '最新产品现已上线，欢迎体验', time: '2小时前' },
        { id: 2, title: '限时优惠', content: '全场满减活动进行中', time: '5小时前' },
        { id: 3, title: '会员专享', content: 'VIP会员享受更多优惠', time: '1天前' },
        { id: 4, title: '新品发布', content: '最新产品现已上线，欢迎体验', time: '2小时前' },
        { id: 5, title: '限时优惠', content: '全场满减活动进行中', time: '5小时前' },
        { id: 6, title: '会员专享', content: 'VIP会员享受更多优惠', time: '1天前' },
        { id: 7, title: '新品发布', content: '最新产品现已上线，欢迎体验', time: '2小时前' },
        { id: 8, title: '限时优惠', content: '全场满减活动进行中', time: '5小时前' },
        { id: 9, title: '会员专享', content: 'VIP会员享受更多优惠', time: '1天前' },
        { id: 10, title: '新品发布', content: '最新产品现已上线，欢迎体验', time: '2小时前' },
        { id: 11, title: '限时优惠', content: '全场满减活动进行中', time: '5小时前' },
        { id: 12, title: '会员专享', content: 'VIP会员享受更多优惠', time: '1天前' },
        { id: 13, title: '新品发布', content: '最新产品现已上线，欢迎体验', time: '2小时前' },
        { id: 14, title: '限时优惠', content: '全场满减活动进行中', time: '5小时前' },
        { id: 15, title: '会员专享', content: 'VIP会员享受更多优惠', time: '1天前' },
        { id: 16, title: '新品发布', content: '最新产品现已上线，欢迎体验', time: '2小时前' },
        { id: 17, title: '限时优惠', content: '全场满减活动进行中', time: '5小时前' },
        { id: 18, title: '会员专享', content: 'VIP会员享受更多优惠', time: '1天前' },
        { id: 19, title: '新品发布', content: '最新产品现已上线，欢迎体验', time: '2小时前' },
        { id: 20, title: '限时优惠', content: '全场满减活动进行中', time: '5小时前' },
        { id: 21, title: '会员专享', content: 'VIP会员享受更多优惠', time: '1天前' },
      ],
      promotions: [
        { id: 1, title: '满减活动', description: '满500减50', discount: '50' },
        { id: 2, title: '买一送一', description: '精选商品买一送一', discount: '100%' },
        { id: 3, title: '积分兑换', description: '积分兑换好礼', discount: '1000积分' },
        { id: 4, title: '满减活动', description: '满500减50', discount: '50' },
        { id: 5, title: '买一送一', description: '精选商品买一送一', discount: '100%' },
        { id: 6, title: '积分兑换', description: '积分兑换好礼', discount: '1000积分' },
        { id: 7, title: '满减活动', description: '满500减50', discount: '50' },
        { id: 8, title: '买一送一', description: '精选商品买一送一', discount: '100%' },
        { id: 9, title: '积分兑换', description: '积分兑换好礼', discount: '1000积分' },
        { id: 10, title: '满减活动', description: '满500减50', discount: '50' },
        { id: 11, title: '买一送一', description: '精选商品买一送一', discount: '100%' },
        { id: 12, title: '积分兑换', description: '积分兑换好礼', discount: '1000积分' },
      ],
    };
  };
  // 渲染首页内容
  render() {
    const { banner, recommendations, categories, news, promotions } = this.state.homeData;
    // return (
    //   <View style={{ flex: 1 }}>
    //     {Array.from({ length: 9000 }).map((_, index) => (
    //       <View key={index} style={{ height: 30, backgroundColor: 'blue', marginBottom: 3 }}></View>
    //     ))}
    //   </View>
    // )
    return (
      <ScrollView style={styles.contentContainer}>
        {/* 轮播图 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>轮播图</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
            {banner.map((item) => (
              <View key={item.id} style={styles.bannerItem}>
                <Image source={{ uri: item.image }} style={styles.bannerImage} />
                <Text style={styles.bannerTitle}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 推荐商品 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>推荐商品</Text>
          <FlatList
            data={recommendations}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            )}
          />
        </View>

        {/* 分类导航 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>商品分类</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 新闻动态 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>最新动态</Text>
          {news.map((item) => (
            <View key={item.id} style={styles.newsItem}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsContent}>{item.content}</Text>
              <Text style={styles.newsTime}>{item.time}</Text>
            </View>
          ))}
        </View>

        {/* 促销活动 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>促销活动</Text>
          {promotions.map((item) => (
            <View key={item.id} style={styles.promotionItem}>
              <View style={styles.promotionInfo}>
                <Text style={styles.promotionTitle}>{item.title}</Text>
                <Text style={styles.promotionDescription}>{item.description}</Text>
              </View>
              <Text style={styles.promotionDiscount}>{item.discount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
export const HomePage = Home;
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
