import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { FlashList } from "@react-native-ohos/flash-list";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = (SCREEN_WIDTH - 32) / 2;
const PAGE_SIZE = 40;

// 模拟商品数据
interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew: boolean;
  isOnSale: boolean;
}

const generateProduct = (index: number): Product => {
  const categories = ["手机", "电脑", "数码配件", "智能家居", "穿戴设备", "摄影摄像"];
  const adjectives = ["全新", "原装", "正品", "特惠", "限量", "精选"];
  const products = [
    "iPhone 15 Pro Max",
    "MacBook Air M2",
    "AirPods Pro 2",
    "iPad Air",
    "Apple Watch Series 9",
    "华为 Mate 60 Pro",
    "小米 14 Ultra",
    "vivo X100 Pro",
    "OPPO Find X7",
    "荣耀 Magic6",
  ];

  const category = categories[Math.floor(Math.random() * categories.length)];
  const product = products[Math.floor(Math.random() * products.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  return {
    id: index,
    title: `${adjective} ${product} ${category}`,
    price: Math.floor(Math.random() * 9999) + 100,
    originalPrice: Math.floor(Math.random() * 19999) + 500,
    rating: Math.floor(Math.random() * 5) + 4,
    reviewCount: Math.floor(Math.random() * 10000) + 100,
    image: `https://picsum.photos/seed/${index}/300/300`,
    category,
    isNew: Math.random() > 0.7,
    isOnSale: Math.random() > 0.6,
  };
};

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* 图片容器 */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {/* 标签 */}
        {product.isNew && <View style={styles.tagNew}><Text style={styles.tagText}>新品</Text></View>}
        {product.isOnSale && <View style={styles.tagSale}><Text style={styles.tagText}>{discount}折</Text></View>}
      </View>

      {/* 商品信息 */}
      <View style={styles.infoContainer}>
        {/* 分类 */}
        <Text style={styles.category} numberOfLines={1}>{product.category}</Text>

        {/* 标题 */}
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>

        {/* 评分 */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        {/* 价格 */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>¥{product.price.toLocaleString()}</Text>
          <Text style={styles.originalPrice}>¥{product.originalPrice.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Demo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // 加载数据
  const loadProducts = useCallback(async (isRefresh = false) => {
    if (isLoading) return;

    setIsLoading(true);
    if (isRefresh) setIsRefreshing(true);

    // 模拟网络请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const newPage = isRefresh ? 0 : page + 1;
      const startIndex = newPage * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      const newProducts: Product[] = [];
      for (let i = startIndex; i < endIndex; i++) {
        newProducts.push(generateProduct(i));
      }

      if (isRefresh) {
        setProducts(newProducts);
        setPage(0);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(newPage);
      }

      // 模拟加载完所有数据
      if (newPage >= 4) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("加载商品失败:", error);
    } finally {
      setIsLoading(false);
      if (isRefresh) setIsRefreshing(false);
    }
  }, [isLoading, page]);

  // 初始化加载
  React.useEffect(() => {
    loadProducts();
  }, []);

  // 下拉刷新
  const handleRefresh = useCallback(() => {
    setHasMore(true);
    loadProducts(true);
  }, [loadProducts]);

  // 上拉加载更多
  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoading) {
      loadProducts();
    }
  }, [hasMore, isLoading, loadProducts]);

  // 渲染商品项
  const renderItem = useCallback(({ item }: { item: Product }) => {
    return (
      <ProductCard
        product={item}
        onPress={() => console.log("点击商品:", item.title)}
      />
    );
  }, []);

  // 渲染底部加载指示器
  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#000" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }, [isLoading]);

  // 空状态
  const renderEmpty = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>暂无商品</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadProducts(true)}>
          <Text style={styles.retryButtonText}>重试</Text>
        </TouchableOpacity>
      </View>
    );
  }, [loadProducts]);

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>精选商品</Text>
        <Text style={styles.headerSubtitle}>共 {products.length} 件商品</Text>
      </View>

      {/* 商品列表 */}
      <FlashList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />

      {/* 加载完成提示 */}
      {!hasMore && products.length > 0 && (
        <View style={styles.endContainer}>
          <Text style={styles.endText}>已经到底了</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tagNew: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagSale: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ffa726",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  infoContainer: {
    padding: 8,
  },
  category: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: "#ffa726",
    fontWeight: "bold",
  },
  reviewCount: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6b6b",
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  endContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  endText: {
    fontSize: 14,
    color: "#999",
  },
});

export default Demo;
