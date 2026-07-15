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

class Discovery extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    props.navigation?.addListener('focus', () => {
      console.log('xchhh Discovery focus', new Date().getTime());
    });
    this.state = {
      activeTab: 0,
      // 模拟复杂的数据结构
      discoverData: this.generateDiscoverData(),
    };
  }
  
    // 生成发现页面复杂数据
    generateDiscoverData = () => {
      return {
        searchHistory: ['iPhone 15', 'MacBook Pro', 'AirPods', 'iPad', '小米手机'],
        popularKeywords: ['手机', '电脑', '耳机', '平板', '手表', '相机', '游戏机', '智能手表'],
        featuredCategories: [
          { id: 1, name: '手机数码', count: 1234, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 2, name: '家用电器', count: 987, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 3, name: '服饰鞋包', count: 567, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 4, name: '美妆个护', count: 345, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 5, name: '手机数码', count: 1234, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 6, name: '家用电器', count: 987, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 7, name: '服饰鞋包', count: 567, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 8, name: '美妆个护', count: 345, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 9, name: '手机数码', count: 1234, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 10, name: '家用电器', count: 987, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 11, name: '服饰鞋包', count: 567, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 12, name: '美妆个护', count: 345, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 13, name: '手机数码', count: 1234, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 14, name: '家用电器', count: 987, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 15, name: '服饰鞋包', count: 567, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 16, name: '美妆个护', count: 345, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 17, name: '服饰鞋包', count: 567, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 18, name: '美妆个护', count: 345, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 19, name: '手机数码', count: 1234, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 20, name: '家用电器', count: 987, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 21, name: '服饰鞋包', count: 567, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 22, name: '美妆个护', count: 345, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 23, name: '手机数码', count: 1234, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 24, name: '家用电器', count: 987, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 25, name: '服饰鞋包', count: 567, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
          { id: 26, name: '美妆个护', count: 345, image: 'https://res.vmallres.com/uomcdn/CN/cms/202607/99de70eaedee409a95296eb9bdfd4fef.jpg' },
        ],
        trendingProducts: [
          { id: 1, name: 'iPhone 15', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 2, name: 'MacBook Pro', price: '¥18999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 3, name: 'AirPods', price: '¥1899', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 4, name: 'iPad', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 5, name: '智能手表', price: '¥1299', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 6, name: '游戏机', price: '¥2999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 7, name: 'iPhone 15', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 8, name: 'MacBook Pro', price: '¥18999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 9, name: 'AirPods', price: '¥1899', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 10, name: 'iPad', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 11, name: '智能手表', price: '¥1299', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 12, name: '游戏机', price: '¥2999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 13, name: 'iPhone 15', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 14, name: 'MacBook Pro', price: '¥18999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 16, name: 'iPad', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 17, name: '智能手表', price: '¥1299', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 18, name: '游戏机', price: '¥2999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 19, name: 'iPad', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 20, name: '智能手表', price: '¥1299', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 21, name: '游戏机', price: '¥2999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 22, name: 'iPad', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 23, name: '智能手表', price: '¥1299', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 24, name: '游戏机', price: '¥2999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 25, name: 'iPhone 15', price: '¥9999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 26, name: 'MacBook Pro', price: '¥18999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 27, name: 'iPad', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 28, name: '智能手表', price: '¥1299', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 29, name: '游戏机', price: '¥2999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 30, name: 'iPad', price: '¥7999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 31, name: '智能手表', price: '¥1299', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
          { id: 32, name: '游戏机', price: '¥2999', image: 'https://rescdn-sit.vmall.hwcloudtest.cn/pimages/FssCdnProxy/vmall_product_uom/pmsSalesFile/428_428_F246A289936B677CB67566D5F26D9D8D.png' },
        ],
        specialOffers: [
          { id: 1, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 2, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 3, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 4, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 5, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 6, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 7, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 8, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 9, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 10, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 11, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 12, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 13, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 14, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 15, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 16, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 17, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 18, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 19, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 20, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 21, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 22, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 23, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 24, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 25, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 26, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 27, title: '品牌特卖', description: '全场品牌商品低至5折', discount: '5折' },
          { id: 28, title: '限时秒杀', description: '每日限量秒杀', discount: '秒杀' },
          { id: 29, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
          { id: 30, title: '会员专享', description: 'VIP会员专属优惠', discount: '专享' },
        ],
      };
    };
  // 渲染首页内容
  render() {
    const { searchHistory, popularKeywords, featuredCategories, trendingProducts, specialOffers } = this.state.discoverData;
    return (
      <ScrollView style={styles.contentContainer}>
        {/* 搜索历史 */}
        <View style={styles.section}>
          <Text style={styles.section}>Title搜索历史</Text>
          <View style={styles.searchHistory}>
            {searchHistory.map((item, index) => (
              <TouchableOpacity key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 热门关键词 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门搜索</Text>
          <View style={styles.keywordsGrid}>
            {popularKeywords.map((keyword, index) => (
              <TouchableOpacity key={index} style={styles.keywordItem}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 特色分类 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>特色分类</Text>
          <FlatList
            data={featuredCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.featuredCategoryItem}>
                <Image source={{ uri: item.image }} style={styles.featuredCategoryImage} />
                <Text style={styles.featuredCategoryName}>{item.name}</Text>
                <Text style={styles.featuredCategoryCount}>{item.count}件商品</Text>
              </View>
            )}
          />
        </View>

        {/* 热门商品 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>热门商品</Text>
          <FlatList
            data={trendingProducts}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.trendingProductItem}>
                <Image source={{ uri: item.image }} style={styles.trendingProductImage} />
                <Text style={styles.trendingProductName}>{item.name}</Text>
                <Text style={styles.trendingProductPrice}>{item.price}</Text>
              </View>
            )}
          />
        </View>

        {/* 特殊优惠 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>特殊优惠</Text>
          {specialOffers.map(item => (
            <View key={item.id} style={styles.specialOfferItem}>
              <Text style={styles.specialOfferTitle}>{item.title}</Text>
              <Text style={styles.specialOfferDescription}>{item.description}</Text>
              <Text style={styles.specialOfferDiscount}>{item.discount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}
export const DiscoveryPage = Discovery;
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
