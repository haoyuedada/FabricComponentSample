/**
 * FlashList v2 全属性用例演示
 * 参考: https://shopify.github.io/flash-list/docs/usage
 *
 * 使用方式：在 App.tsx 中引入本文件即可
 *   import FlashListPropsDemo from './src/flash-list/FlashListPropsDemo'
 *   <FlashListPropsDemo />
 */

import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  memo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  ViewStyle,
} from 'react-native';
import {
  FlashList,
  FlashListRef,
  RenderTargetOptions,
  useLayoutState,
  useRecyclingState,
  useMappingHelper,
  useFlashListContext,
  CellContainer,
} from '@shopify/flash-list';

// ============================================================
// 类型定义
// ============================================================
interface DataItem {
  id: number;
  title: string;
  color: string;
  height?: number;
  type?: 'normal' | 'header' | 'ad';
}

// ============================================================
// 数据生成
// ============================================================
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8B739', '#52BE80',
];

const generateData = (count: number, startIndex = 0): DataItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    return {
      id: index,
      title: `Item ${index}`,
      color: COLORS[index % COLORS.length],
      height: 60 + (index % 5) * 20, // 变高度: 60~140
      type: index % 10 === 0 ? 'header' : index % 7 === 0 ? 'ad' : 'normal',
    };
  });
};

// ============================================================
// 场景选择器
// ============================================================
type SceneKey =
  | 'basic'
  | 'horizontal'
  | 'numColumns'
  | 'masonry'
  | 'inverted'
  | 'estimatedItemSize'
  | 'keyExtractor'
  | 'separators'
  | 'emptyHeaderFooter'
  | 'contentContainerStyle'
  | 'drawDistance'
  | 'extraData'
  | 'initialScrollIndex'
  | 'maintainVisibleContentPosition'
  | 'onLoad'
  | 'onEndReached'
  | 'onStartReached'
  | 'onRefresh'
  | 'onViewableItemsChanged'
  | 'viewabilityConfig'
  | 'viewabilityConfigCallbackPairs'
  | 'getItemType'
  | 'overrideItemLayout'
  | 'CellRendererComponent'
  | 'renderScrollComponent'
  | 'stickyHeaderIndices'
  | 'maxItemsInRecyclePool'
  | 'optimizeItemArrangement'
  | 'onCommitLayoutEffect'
  | 'refMethods'
  | 'hooks'
  | 'renderTarget'
  | 'overrideProps';

const SCENES: { key: SceneKey; label: string; desc: string }[] = [
  { key: 'basic', label: 'renderItem + data', desc: '基础渲染' },
  { key: 'horizontal', label: 'horizontal', desc: '水平列表' },
  { key: 'numColumns', label: 'numColumns', desc: '多列网格' },
  { key: 'masonry', label: 'masonry', desc: '瀑布流布局' },
  { key: 'inverted', label: 'inverted', desc: '翻转列表(从ScrollViewProps继承)' },
  { key: 'estimatedItemSize', label: 'estimatedItemSize', desc: '估计item大小(从ScrollViewProps继承)' },
  { key: 'keyExtractor', label: 'keyExtractor', desc: '唯一key提取' },
  { key: 'separators', label: 'ItemSeparatorComponent', desc: '分割线' },
  { key: 'emptyHeaderFooter', label: 'Empty/Header/Footer', desc: '空列表/头/尾组件' },
  { key: 'contentContainerStyle', label: 'contentContainerStyle', desc: '内容容器样式(ScrollViewProps)' },
  { key: 'drawDistance', label: 'drawDistance', desc: '预渲染距离' },
  { key: 'extraData', label: 'extraData', desc: '外部数据触发重渲染' },
  { key: 'initialScrollIndex', label: 'initialScrollIndex', desc: '初始滚动位置' },
  { key: 'maintainVisibleContentPosition', label: 'maintainVisibleContentPosition', desc: '维持滚动位置(聊天场景)' },
  { key: 'onLoad', label: 'onLoad', desc: '首次渲染完成回调' },
  { key: 'onEndReached', label: 'onEndReached', desc: '滚动到底部加载更多' },
  { key: 'onStartReached', label: 'onStartReached', desc: '滚动到顶部加载' },
  { key: 'onRefresh', label: 'onRefresh + refreshing', desc: '下拉刷新' },
  { key: 'onViewableItemsChanged', label: 'onViewableItemsChanged', desc: '可见项变化' },
  { key: 'viewabilityConfig', label: 'viewabilityConfig', desc: '可见性配置' },
  { key: 'viewabilityConfigCallbackPairs', label: 'viewabilityConfigCallbackPairs', desc: '多组可见性回调' },
  { key: 'getItemType', label: 'getItemType', desc: 'item类型(优化回收)' },
  { key: 'overrideItemLayout', label: 'overrideItemLayout', desc: '覆盖item布局/span' },
  { key: 'CellRendererComponent', label: 'CellRendererComponent', desc: '自定义Cell容器' },
  { key: 'renderScrollComponent', label: 'renderScrollComponent', desc: '自定义滚动容器' },
  { key: 'stickyHeaderIndices', label: 'stickyHeaderIndices', desc: '吸顶header(ScrollViewProps)' },
  { key: 'maxItemsInRecyclePool', label: 'maxItemsInRecyclePool', desc: '回收池大小限制' },
  { key: 'optimizeItemArrangement', label: 'optimizeItemArrangement', desc: '瀑布流优化排列' },
  { key: 'onCommitLayoutEffect', label: 'onCommitLayoutEffect', desc: '布局提交回调' },
  { key: 'refMethods', label: 'ref: scrollToIndex等', desc: '命令式滚动方法' },
  { key: 'hooks', label: 'Hooks: useLayoutState等', desc: 'FlashList Hooks' },
  { key: 'renderTarget', label: 'renderItem.target', desc: '渲染目标(Cell/Measurement/StickyHeader)' },
  { key: 'overrideProps', label: 'overrideProps', desc: '调试用覆盖内部props' },
];

// ============================================================
// 主组件
// ============================================================
const FlashListPropsDemo = () => {
  const [currentScene, setCurrentScene] = useState<SceneKey>('basic');

  const renderScene = () => {
    switch (currentScene) {
      case 'basic': return <BasicScene />;
      case 'horizontal': return <HorizontalScene />;
      case 'numColumns': return <NumColumnsScene />;
      case 'masonry': return <MasonryScene />;
      case 'inverted': return <InvertedScene />;
      case 'estimatedItemSize': return <EstimatedItemSizeScene />;
      case 'keyExtractor': return <KeyExtractorScene />;
      case 'separators': return <SeparatorsScene />;
      case 'emptyHeaderFooter': return <EmptyHeaderFooterScene />;
      case 'contentContainerStyle': return <ContentContainerStyleScene />;
      case 'drawDistance': return <DrawDistanceScene />;
      case 'extraData': return <ExtraDataScene />;
      case 'initialScrollIndex': return <InitialScrollIndexScene />;
      case 'maintainVisibleContentPosition': return <MaintainVisibleContentPositionScene />;
      case 'onLoad': return <OnLoadScene />;
      case 'onEndReached': return <OnEndReachedScene />;
      case 'onStartReached': return <OnStartReachedScene />;
      case 'onRefresh': return <OnRefreshScene />;
      case 'onViewableItemsChanged': return <OnViewableItemsChangedScene />;
      case 'viewabilityConfig': return <ViewabilityConfigScene />;
      case 'viewabilityConfigCallbackPairs': return <ViewabilityConfigCallbackPairsScene />;
      case 'getItemType': return <GetItemTypeScene />;
      case 'overrideItemLayout': return <OverrideItemLayoutScene />;
      case 'CellRendererComponent': return <CellRendererComponentScene />;
      case 'renderScrollComponent': return <RenderScrollComponentScene />;
      case 'stickyHeaderIndices': return <StickyHeaderIndicesScene />;
      case 'maxItemsInRecyclePool': return <MaxItemsInRecyclePoolScene />;
      case 'optimizeItemArrangement': return <OptimizeItemArrangementScene />;
      case 'onCommitLayoutEffect': return <OnCommitLayoutEffectScene />;
      case 'refMethods': return <RefMethodsScene />;
      case 'hooks': return <HooksScene />;
      case 'renderTarget': return <RenderTargetScene />;
      case 'overrideProps': return <OverridePropsScene />;
      default: return <BasicScene />;
    }
  };

  return (
    <View style={styles.container}>
      {/* 场景选择器 */}
      <ScrollView horizontal style={styles.sceneBar} showsHorizontalScrollIndicator={false}>
        {SCENES.map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[
              styles.sceneBtn,
              currentScene === s.key && styles.sceneBtnActive,
            ]}
            onPress={() => setCurrentScene(s.key)}
          >
            <Text
              style={[
                styles.sceneBtnText,
                currentScene === s.key && styles.sceneBtnTextActive,
              ]}
            >
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 当前场景描述 */}
      <View style={styles.descBar}>
        <Text style={styles.descText}>
          {SCENES.find((s) => s.key === currentScene)?.desc ?? ''}
        </Text>
      </View>

      {/* 场景内容 */}
      <View style={styles.sceneContainer}>
        {renderScene()}
      </View>
    </View>
  );
};

// ============================================================
// 公共 Item 组件
// ============================================================
const DefaultItem = memo(({ item }: { item: DataItem }) => (
  <View style={[styles.item, { backgroundColor: item.color, height: item.height ?? 80 }]}>
    <Text style={styles.itemTitle}>{item.title}</Text>
    <Text style={styles.itemSub}>id: {item.id}</Text>
  </View>
));

// ============================================================
// 1. renderItem + data (基础)
// ============================================================
const BasicScene = () => {
  const data = useMemo(() => generateData(50), []);
  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <DefaultItem item={item} />}
      estimatedItemSize={100}
    />
  );
};

// ============================================================
// 2. horizontal - 水平列表
// ============================================================
const HorizontalScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <FlashList
      data={data}
      horizontal
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, width: 200, height: 250 }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      )}
      estimatedItemSize={200}
      showsHorizontalScrollIndicator
    />
  );
};

// ============================================================
// 3. numColumns - 多列网格
// ============================================================
const NumColumnsScene = () => {
  const data = useMemo(() => generateData(60), []);
  return (
    <FlashList
      data={data}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: 100 }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      )}
      estimatedItemSize={100}
    />
  );
};

// ============================================================
// 4. masonry - 瀑布流布局 (New arch only)
// ============================================================
const MasonryScene = () => {
  const data = useMemo(() => generateData(40), []);
  return (
    <FlashList
      data={data}
      masonry
      numColumns={2}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: item.height }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSub}>高度: {item.height}</Text>
        </View>
      )}
      estimatedItemSize={100}
    />
  );
};

// ============================================================
// 5. inverted - 翻转列表 (继承自 ScrollViewProps)
// ============================================================
const InvertedScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <FlashList
      data={data}
      inverted
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: 60 }]}>
          <Text style={styles.itemTitle}>{item.title} (翻转)</Text>
        </View>
      )}
      estimatedItemSize={60}
    />
  );
};

// ============================================================
// 6. estimatedItemSize - 估计 item 大小
//    FlashList v2 推荐始终设置，用于初始布局计算
// ============================================================
const EstimatedItemSizeScene = () => {
  const data = useMemo(() => generateData(50), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        estimatedItemSize=120, 实际item高度60~140不等。FlashList用此值做初始布局估算。
      </Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: item.height }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSub}>实际高度: {item.height}</Text>
          </View>
        )}
        estimatedItemSize={120}
      />
    </View>
  );
};

// ============================================================
// 7. keyExtractor - 唯一 key 提取
// ============================================================
const KeyExtractorScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => `custom-key-${item.id}`}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSub}>key: custom-key-{item.id}</Text>
        </View>
      )}
      estimatedItemSize={70}
    />
  );
};

// ============================================================
// 8. ItemSeparatorComponent - 分割线
// ============================================================
const Separator = memo(({ leadingItem }: { leadingItem?: DataItem }) => (
  <View style={styles.separator}>
    <Text style={styles.separatorText}>
      分割线 {leadingItem ? `← ${leadingItem.title}` : ''}
    </Text>
  </View>
));

const SeparatorsScene = () => {
  const data = useMemo(() => generateData(20), []);
  return (
    <FlashList
      data={data}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      )}
      estimatedItemSize={70}
    />
  );
};

// ============================================================
// 9. ListEmptyComponent / ListHeaderComponent / ListFooterComponent
//    + ListHeaderComponentStyle / ListFooterComponentStyle
// ============================================================
const EmptyHeaderFooterScene = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const data = useMemo(() => (isEmpty ? [] : generateData(10)), [isEmpty]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.toggleBtn}
        onPress={() => setIsEmpty((v) => !v)}
      >
        <Text style={styles.toggleBtnText}>
          {isEmpty ? '显示数据 (当前空列表)' : '清空数据 (查看 ListEmptyComponent)'}
        </Text>
      </TouchableOpacity>

      <FlashList
        data={data}
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
            <Text style={styles.emptyText}>列表为空 📭</Text>
            <Text style={styles.emptySubText}>ListEmptyComponent 渲染</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            <Text style={styles.headerText}>📋 ListHeaderComponent</Text>
          </View>
        }
        ListHeaderComponentStyle={{ backgroundColor: '#E8F5E9' }}
        ListFooterComponent={
          <View style={styles.footerComponent}>
            <Text style={styles.footerText}>📋 ListFooterComponent</Text>
          </View>
        }
        ListFooterComponentStyle={{ backgroundColor: '#FFF3E0' }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 60 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={60}
      />
    </View>
  );
};

// ============================================================
// 10. contentContainerStyle - 内容容器样式 (继承自 ScrollViewProps)
// ============================================================
const ContentContainerStyleScene = () => {
  const data = useMemo(() => generateData(15), []);
  return (
    <FlashList
      data={data}
      contentContainerStyle={{
        padding: 16,
        backgroundColor: '#F5F5F5',
      }}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      )}
      estimatedItemSize={70}
    />
  );
};

// ============================================================
// 11. drawDistance - 预渲染距离 (像素)
//     控制屏幕外多远开始渲染 item
// ============================================================
const DrawDistanceScene = () => {
  const data = useMemo(() => generateData(100), []);
  const [drawDistance, setDrawDistance] = useState(250);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>drawDistance: {drawDistance}px</Text>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setDrawDistance((v) => Math.max(0, v - 100))}
        >
          <Text>-100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setDrawDistance((v) => v + 100)}
        >
          <Text>+100</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={data}
        drawDistance={drawDistance}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 12. extraData - 外部数据触发重渲染
//     FlashList 使用 PureComponent, 改变 extraData 可触发重新渲染
// ============================================================
const ExtraDataScene = () => {
  const data = useMemo(() => generateData(15), []);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        点击 item 选中, extraData 变化触发重渲染。选中: {selectedId ?? '无'}
      </Text>
      <FlashList
        data={data}
        extraData={selectedId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedId(item.id)}
            style={[
              styles.item,
              {
                backgroundColor: item.id === selectedId ? '#FFD700' : item.color,
                height: 70,
              },
            ]}
          >
            <Text style={styles.itemTitle}>
              {item.title} {item.id === selectedId ? '✓ 选中' : ''}
            </Text>
          </TouchableOpacity>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 13. initialScrollIndex + initialScrollIndexParams
//     初始滚动到指定 index
// ============================================================
const InitialScrollIndexScene = () => {
  const data = useMemo(() => generateData(100), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        初始滚动到 index=20, viewOffset=50
      </Text>
      <FlashList
        data={data}
        initialScrollIndex={20}
        initialScrollIndexParams={{ viewOffset: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            {item.id === 20 && <Text style={styles.itemSub}>← 初始位置</Text>}
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 14. maintainVisibleContentPosition - 维持滚动位置
//     适用于聊天界面, 新消息插入时保持当前视图位置
// ============================================================
const MaintainVisibleContentPositionScene = () => {
  const [messages, setMessages] = useState<DataItem[]>(() => generateData(20));

  const addMessageAtBottom = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        title: `新消息 ${prev[prev.length - 1].id + 1}`,
        color: COLORS[prev.length % COLORS.length],
        height: 60,
      },
    ]);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>聊天模式: 添加消息保持位置</Text>
        <TouchableOpacity style={styles.controlBtn} onPress={addMessageAtBottom}>
          <Text>+消息</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={messages}
        inverted
        maintainVisibleContentPosition={{
          disabled: false,
          autoscrollToTopThreshold: 50,
          autoscrollToBottomThreshold: 50,
          animateAutoScrollToBottom: true,
          startRenderingFromBottom: true,
        }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 50 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={50}
      />
    </View>
  );
};

// ============================================================
// 15. onLoad - 首次渲染完成回调
// ============================================================
const OnLoadScene = () => {
  const data = useMemo(() => generateData(30), []);
  const [loadInfo, setLoadInfo] = useState<string>('未加载');

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>onLoad 回调: {loadInfo}</Text>
      <FlashList
        data={data}
        onLoad={(info) => {
          setLoadInfo(`耗时 ${info.elapsedTimeInMs}ms`);
          Alert.alert('onLoad', `首次渲染完成, 耗时 ${info.elapsedTimeInMs}ms`);
        }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 16. onEndReached + onEndReachedThreshold
// ============================================================
const OnEndReachedScene = () => {
  const [data, setData] = useState<DataItem[]>(() => generateData(20));
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setData((prev) => [...prev, ...generateData(10, prev[prev.length - 1].id + 1)]);
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <FlashList
      data={data}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <View style={styles.loadingFooter}>
            <ActivityIndicator size="small" />
            <Text style={styles.loadingText}>加载更多...</Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      )}
      estimatedItemSize={70}
    />
  );
};

// ============================================================
// 17. onStartReached + onStartReachedThreshold (New arch only)
// ============================================================
const OnStartReachedScene = () => {
  const [data, setData] = useState<DataItem[]>(() => generateData(20, 10));
  const [loading, setLoading] = useState(false);

  const loadStart = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setData((prev) => {
        const firstId = prev[0].id;
        const newItems = generateData(10, firstId - 10);
        return [...newItems, ...prev];
      });
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        向上滚动到顶部触发 onStartReached (threshold=0.2)
      </Text>
      <FlashList
        data={data}
        onStartReached={loadStart}
        onStartReachedThreshold={0.2}
        ListHeaderComponent={
          loading ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator size="small" />
              <Text style={styles.loadingText}>向上加载...</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 18. onRefresh + refreshing - 下拉刷新
// ============================================================
const OnRefreshScene = () => {
  const [data, setData] = useState<DataItem[]>(() => generateData(20));
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData(generateData(20));
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <FlashList
      data={data}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      )}
      estimatedItemSize={70}
    />
  );
};

// ============================================================
// 19. onViewableItemsChanged - 可见项变化回调
// ============================================================
const OnViewableItemsChangedScene = () => {
  const data = useMemo(() => generateData(50), []);
  const [visibleIds, setVisibleIds] = useState<number[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        当前可见 item IDs: {visibleIds.join(', ')}
      </Text>
      <FlashList
        data={data}
        onViewableItemsChanged={({ viewableItems, changed }) => {
          setVisibleIds(viewableItems.map((v) => v.item.id));
          console.log('[onViewableItemsChanged] changed:', changed.map((c) => c.item.id));
        }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 80 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={80}
      />
    </View>
  );
};

// ============================================================
// 20. viewabilityConfig - 可见性配置
// ============================================================
const ViewabilityConfigScene = () => {
  const data = useMemo(() => generateData(50), []);
  const [visibleIds, setVisibleIds] = useState<number[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        viewabilityConfig: itemVisiblePercentThreshold=80%{'\n'}
        可见: {visibleIds.join(', ')}
      </Text>
      <FlashList
        data={data}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80,
          minimumViewTime: 500,
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          setVisibleIds(viewableItems.map((v) => v.item.id));
        }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 100 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={100}
      />
    </View>
  );
};

// ============================================================
// 21. viewabilityConfigCallbackPairs - 多组可见性回调
// ============================================================
const ViewabilityConfigCallbackPairsScene = () => {
  const data = useMemo(() => generateData(50), []);
  const [log, setLog] = useState<string>('');

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        两组配置: 50%可见 / 100%可见{'\n'}
        {log}
      </Text>
      <FlashList
        data={data}
        viewabilityConfigCallbackPairs={[
          {
            viewabilityConfig: { itemVisiblePercentThreshold: 50 },
            onViewableItemsChanged: ({ viewableItems }) => {
              console.log('[50% threshold]', viewableItems.map((v) => v.item.id));
            },
          },
          {
            viewabilityConfig: { itemVisiblePercentThreshold: 100 },
            onViewableItemsChanged: ({ viewableItems }) => {
              setLog(`100%可见: ${viewableItems.map((v) => v.item.id).join(', ')}`);
            },
          },
        ]}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 100 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={100}
      />
    </View>
  );
};

// ============================================================
// 22. getItemType - item 类型 (优化回收效率)
// ============================================================
const GetItemTypeScene = () => {
  const data = useMemo(() => generateData(50), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        getItemType 返回 'header' / 'ad' / 'normal', FlashList 按类型回收复用
      </Text>
      <FlashList
        data={data}
        getItemType={(item) => item.type}
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return (
              <View style={[styles.item, { backgroundColor: '#2C3E50', height: 50 }]}>
                <Text style={styles.itemTitle}>📅 Header: {item.title}</Text>
              </View>
            );
          }
          if (item.type === 'ad') {
            return (
              <View style={[styles.item, { backgroundColor: '#E74C3C', height: 100 }]}>
                <Text style={styles.itemTitle}>📢 Ad: {item.title}</Text>
              </View>
            );
          }
          return (
            <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          );
        }}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 23. overrideItemLayout - 覆盖 item 布局/span
//     可修改 span (在 numColumns > 1 时让某些 item 跨列)
// ============================================================
const OverrideItemLayoutScene = () => {
  const data = useMemo(() => generateData(40), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        numColumns=3, 每 7 个 item 跨 2 列 (span=2)
      </Text>
      <FlashList
        data={data}
        numColumns={3}
        overrideItemLayout={(layout, item) => {
          // 每 7 个 item 跨 2 列
          if (item.id % 7 === 0) {
            layout.span = 2;
          }
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: item.color,
                height: item.id % 7 === 0 ? 120 : 80,
              },
            ]}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSub}>
              {item.id % 7 === 0 ? 'span=2 (跨列)' : 'span=1'}
            </Text>
          </View>
        )}
        estimatedItemSize={80}
      />
    </View>
  );
};

// ============================================================
// 24. CellRendererComponent - 自定义 Cell 容器
// ============================================================
const CustomCell = memo((props: any) => {
  return (
    <CellContainer
      {...props}
      style={[
        props.style,
        {
          // 加自定义边框
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.3)',
        },
      ]}
    >
      {props.children}
    </CellContainer>
  );
});

const CellRendererComponentScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        CellRendererComponent: 给每个 cell 加白色边框
      </Text>
      <FlashList
        data={data}
        CellRendererComponent={CustomCell}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 80 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={80}
      />
    </View>
  );
};

// ============================================================
// 25. renderScrollComponent - 自定义滚动容器
// ============================================================
const CustomScrollView = React.forwardRef<ScrollView, any>((props, ref) => {
  return (
    <ScrollView
      {...props}
      ref={ref}
      style={[props.style, { backgroundColor: '#FAFAFA' }]}
    />
  );
});

const RenderScrollComponentScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        renderScrollComponent: 使用自定义 ScrollView (背景色 #FAFAFA)
      </Text>
      <FlashList
        data={data}
        renderScrollComponent={CustomScrollView}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 26. stickyHeaderIndices - 吸顶 header (继承自 ScrollViewProps)
// ============================================================
const StickyHeaderIndicesScene = () => {
  const data = useMemo(() => {
    return generateData(30).map((item, i) => ({
      ...item,
      // 每 5 个设为 header 类型
      type: i % 5 === 0 ? 'header' as const : 'normal' as const,
    }));
  }, []);

  // 计算 sticky indices
  const stickyIndices = useMemo(
    () => data.map((_, i) => i).filter((i) => i % 5 === 0),
    [data]
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        stickyHeaderIndices: 每 5 个 item 吸顶 [{stickyIndices.join(', ')}]
      </Text>
      <FlashList
        data={data}
        stickyHeaderIndices={stickyIndices}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: item.type === 'header' ? '#2C3E50' : item.color,
                height: item.type === 'header' ? 50 : 70,
              },
            ]}
          >
            <Text style={styles.itemTitle}>
              {item.title} {item.type === 'header' ? '📌 Header' : ''}
            </Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 27. maxItemsInRecyclePool - 回收池大小限制 (New arch only)
// ============================================================
const MaxItemsInRecyclePoolScene = () => {
  const data = useMemo(() => generateData(100), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        maxItemsInRecyclePool=5, 限制回收池最多缓存 5 个 item
      </Text>
      <FlashList
        data={data}
        maxItemsInRecyclePool={5}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 28. optimizeItemArrangement - 瀑布流优化排列 (New arch only)
// ============================================================
const OptimizeItemArrangementScene = () => {
  const data = useMemo(() => generateData(40), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        masonry + optimizeItemArrangement: 自动调整 item 顺序减少列高差
      </Text>
      <FlashList
        data={data}
        masonry
        numColumns={2}
        optimizeItemArrangement
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: item.height }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSub}>高度: {item.height}</Text>
          </View>
        )}
        estimatedItemSize={100}
      />
    </View>
  );
};

// ============================================================
// 29. onCommitLayoutEffect - 布局提交回调 (New arch only)
// ============================================================
const OnCommitLayoutEffectScene = () => {
  const data = useMemo(() => generateData(30), []);
  const [commitCount, setCommitCount] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        onCommitLayoutEffect 触发次数: {commitCount}
      </Text>
      <FlashList
        data={data}
        onCommitLayoutEffect={() => {
          setCommitCount((c) => c + 1);
          console.log('[onCommitLayoutEffect] layout committed');
        }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 30. ref 方法 - scrollToIndex / scrollToItem / scrollToOffset 等
// ============================================================
const RefMethodsScene = () => {
  const data = useMemo(() => generateData(100), []);
  const ref = useRef<FlashListRef<DataItem>>(null);
  const [log, setLog] = useState('');

  const buttons = [
    {
      label: 'scrollToIndex(50)',
      onPress: () => {
        ref.current?.scrollToIndex({ index: 50, animated: true, viewPosition: 0.5 });
        setLog('scrollToIndex: index=50, viewPosition=0.5(居中)');
      },
    },
    {
      label: 'scrollToOffset(500)',
      onPress: () => {
        ref.current?.scrollToOffset({ offset: 500, animated: true });
        setLog('scrollToOffset: offset=500px');
      },
    },
    {
      label: 'scrollToTop',
      onPress: () => {
        ref.current?.scrollToTop({ animated: true });
        setLog('scrollToTop');
      },
    },
    {
      label: 'scrollToEnd',
      onPress: () => {
        ref.current?.scrollToEnd({ animated: true });
        setLog('scrollToEnd');
      },
    },
    {
      label: 'scrollToItem(item=25)',
      onPress: () => {
        ref.current?.scrollToItem({ item: data[25], animated: true });
        setLog('scrollToItem: item at index 25');
      },
    },
    {
      label: 'flashScrollIndicators',
      onPress: () => {
        ref.current?.flashScrollIndicators();
        setLog('flashScrollIndicators');
      },
    },
    {
      label: 'getVisibleIndices',
      onPress: () => {
        // @ts-ignore - getVisibleIndices may exist on ref
        const indices = ref.current?.getVisibleIndices?.();
        setLog(`getVisibleIndices: ${JSON.stringify(indices)}`);
      },
    },
    {
      label: 'getWindowSize',
      onPress: () => {
        const size = ref.current?.getWindowSize?.();
        setLog(`getWindowSize: ${JSON.stringify(size)}`);
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal style={styles.refBtnRow} showsHorizontalScrollIndicator={false}>
        {buttons.map((btn) => (
          <TouchableOpacity key={btn.label} style={styles.refBtn} onPress={btn.onPress}>
            <Text style={styles.refBtnText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.hintText}>{log}</Text>
      <FlashList
        ref={ref}
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 31. Hooks - useLayoutState / useRecyclingState / useMappingHelper
// ============================================================

// Hook: useLayoutState - 获取当前 item 的布局状态
const LayoutStateItem = memo(({ item }: { item: DataItem }) => {
  const layoutState = useLayoutState();
  return (
    <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSub}>
        layoutState: {JSON.stringify(layoutState)}
      </Text>
    </View>
  );
});

// Hook: useRecyclingState - 在 item 回收复用时保持状态
const RecyclingItem = memo(({ item }: { item: DataItem }) => {
  // useRecyclingState: 当 cell 被回收复用时, 可以重新初始化 state
  const [clickCount, setClickCount] = useRecyclingState(() => 0);

  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: item.color, height: 70 }]}
      onPress={() => setClickCount((c: number) => c + 1)}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSub}>
        useRecyclingState 点击数: {clickCount}
      </Text>
    </TouchableOpacity>
  );
});

// Hook: useMappingHelper - 获取映射辅助方法
const MappingItem = memo(({ item }: { item: DataItem }) => {
  const mappingHelper = useMappingHelper();
  return (
    <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSub}>
        useMappingHelper: {Object.keys(mappingHelper).join(', ')}
      </Text>
    </View>
  );
});

// Hook: useFlashListContext - 获取 FlashList 上下文
const ContextItem = memo(({ item }: { item: DataItem }) => {
  const context = useFlashListContext();
  return (
    <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSub}>
        useFlashListContext: {context ? 'available' : 'null'}
      </Text>
    </View>
  );
});

const HooksScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        Hooks 演示: useLayoutState / useRecyclingState / useMappingHelper / useFlashListContext{'\n'}
        (需要在 renderItem 内部使用)
      </Text>
      <FlashList
        data={data}
        renderItem={({ item }) => <LayoutStateItem item={item} />}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 32. renderItem target - 渲染目标 (Cell / Measurement / StickyHeader)
// ============================================================
const RenderTargetScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        renderItem 的 target 参数: 'Cell' | 'StickyHeader' | 'Measurement'{'\n'}
        可根据 target 做不同渲染 (如 StickyHeader 时改变样式)
      </Text>
      <FlashList
        data={data}
        renderItem={({ item, target }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor:
                  target === 'StickyHeader' ? '#2C3E50' :
                  target === 'Measurement' ? '#CCCCCC' :
                  item.color,
                height: 70,
              },
            ]}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSub}>target: {target}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 33. overrideProps - 调试用, 覆盖内部 props
// ============================================================
const OverridePropsScene = () => {
  const data = useMemo(() => generateData(30), []);
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.hintText}>
        overrideProps: 覆盖内部 props (调试用){'\n'}
        initialDrawBatchSize=5 (初始只渲染5个)
      </Text>
      <FlashList
        data={data}
        overrideProps={{
          initialDrawBatchSize: 5,
        }}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color, height: 70 }]}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
        estimatedItemSize={70}
      />
    </View>
  );
};

// ============================================================
// 样式
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sceneBar: {
    flexDirection: 'row',
    maxHeight: 50,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sceneBtn: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
  },
  sceneBtnActive: {
    backgroundColor: '#007AFF',
  },
  sceneBtnText: {
    fontSize: 12,
    color: '#333',
  },
  sceneBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  descBar: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#FFF8E1',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#FFD54F',
  },
  descText: {
    fontSize: 12,
    color: '#795548',
  },
  sceneContainer: {
    flex: 1,
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    padding: 8,
    backgroundColor: '#E3F2FD',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  separator: {
    height: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  separatorText: {
    fontSize: 10,
    color: '#666',
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 24,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 12,
    color: '#999',
  },
  headerComponent: {
    padding: 12,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  footerComponent: {
    padding: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
  },
  toggleBtn: {
    backgroundColor: '#007AFF',
    padding: 12,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F5F5F5',
  },
  controlLabel: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  controlBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  loadingFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  refBtnRow: {
    flexDirection: 'row',
    maxHeight: 50,
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
  },
  refBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  refBtnText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default FlashListPropsDemo;
