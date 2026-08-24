import React, { memo, useCallback, useEffect, useMemo } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { FlashList, useRecyclingState } from "@shopify/flash-list";

export type Song = {
  id: string;
  title: string;
  artist: string;
  cover: string;
};

type Props = {
  songs: Song[];
  onPressSong?: (song: Song) => void;
};

const ROW_HEIGHT = 72;
const PREFETCH_COUNT = 40;

// 纯静态原生 View：它只在页面初始化 / 旋转屏幕时由 JS 创建，
// fling 期间不 setState、不跑 renderItem、不做 shimmer。
const SkeletonRow = memo(() => (
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonCover} />
    <View style={styles.skeletonTextGroup}>
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonSubtitle} />
    </View>
  </View>
));

const ViewportSkeletonBackdrop = memo(() => {
  const { height } = useWindowDimensions();
  const rowCount = Math.ceil(height / ROW_HEIGHT) + 2;
  const rows = useMemo(
    () => Array.from({ length: rowCount }, (_, index) => index),
    [rowCount],
  );

  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.backdrop}
    >
      {rows.map(index => (
        // 这里只在视口底板初始化时 map；不是 FlashList 的回收子树。
        <SkeletonRow key={index} />
      ))}
    </View>
  );
});

const SongCell = memo(
  ({ item, onPress }: { item: Song; onPress?: (song: Song) => void }) => {
    // cell 被回收给另一首歌时，同一次 render 内重置为 false。
    const [imageReady, setImageReady] = useRecyclingState(false, [item.id]);

    return (
      <Pressable
        onPress={() => onPress?.(item)}
        style={styles.cell}
        accessibilityRole="button"
        // accessibilityLabel={${item.title}, ${item.artist}}
      >
        // 图片必须始终挂载；若 imageReady=false 时直接 return 骨架，
        // Image 不会开始加载，onLoad 也永远不会触发。
        <Image
          source={{ uri: item.cover }}
          style={styles.cover}
          resizeMode="cover"
          onLoad={() => setImageReady(true)}
          onError={() => setImageReady(true)}
        />

        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {item.artist}
          </Text>
        </View>

        {!imageReady && (
          <View pointerEvents="none" style={styles.cellSkeleton}>
            <SkeletonRow />
          </View>
        )}
      </Pressable>
    );
  },
);

export default function SongFlashList({ songs, onPressSong }: Props) {
  const { height: viewportHeight } = useWindowDimensions();

  // 建议从 1.5 个视口起步，并限制上限；最终必须在低端机 release 包实测。
  const drawDistance = Math.min(
    960,
    Math.max(480, Math.round(viewportHeight * 1.5)),
  );

  // 数据刚到达、用户尚未 fling 时做少量原生图片预取。
  useEffect(() => {
    songs.slice(0, PREFETCH_COUNT).forEach(song => {
      void Image.prefetch(song.cover);
    });
  }, [songs]);

  const renderItem = useCallback(
    ({ item }: { item: Song }) => (
      <SongCell item={item} onPress={onPressSong} />
    ),
    [onPressSong],
  );

  const keyExtractor = useCallback((item: Song) => item.id, []);
  const getItemType = useCallback(() => "song-row", []);

  return (
    <View style={styles.container}>
      {songs.length > 0 && <ViewportSkeletonBackdrop />}

      <FlashList
        data={songs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        // drawDistance={drawDistance}
        drawDistance={50}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.artist}>暂无歌曲</Text>
          </View>
        }
        // v2 不要再传 estimatedItemSize / windowSize / maxToRenderPerBatch。
        // 不要在 SongCell 上添加 key={item.id}，否则会破坏回收。
        // 没有 JS onScroll；滚动期间不给 JS 队列增加逐帧业务。
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f4",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  list: {
    flex: 1,
    backgroundColor: "transparent",
  },
  listContent: {
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  cell: {
    height: ROW_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#ffffff", // 真实 cell 必须不透明，盖住底板
    overflow: "hidden",
  },
  cover: {
    width: 52,
    height: 52,
    borderRadius: 7,
    backgroundColor: "#e4e4e0",
  },
  copy: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "600",
  },
  artist: {
    color: "#77736d",
    fontSize: 13,
    marginTop: 6,
  },
  skeletonRow: {
    height: ROW_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#f6f6f4",
  },
  skeletonCover: {
    width: 52,
    height: 52,
    borderRadius: 7,
    backgroundColor: "#deded9",
  },
  skeletonTextGroup: {
    flex: 1,
    marginLeft: 12,
  },
  skeletonTitle: {
    width: "68%",
    height: 13,
    borderRadius: 5,
    backgroundColor: "#deded9",
  },
  skeletonSubtitle: {
    width: "42%",
    height: 10,
    marginTop: 9,
    borderRadius: 5,
    backgroundColor: "#e6e6e1",
  },
  cellSkeleton: {
    ...StyleSheet.absoluteFillObject,
  },
  empty: {
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f4",
  },
});