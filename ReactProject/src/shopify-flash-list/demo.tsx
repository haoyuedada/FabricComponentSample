import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FlashList } from "@react-native-ohos/flash-list";

const PAGE_SIZE = 50;

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  isPlaying: boolean;
  isHot: boolean;
  isNew: boolean;
}

const ARTISTS = [
  "周杰伦",
  "林俊杰",
  "陈奕迅",
  "邓紫棋",
  "薛之谦",
  "李荣浩",
  "毛不易",
  "华晨宇",
  "张学友",
  "王菲",
  "五月天",
  "Taylor Swift",
];

const SONG_TITLES = [
  "夜曲",
  "江南",
  "十年",
  "光年之外",
  "演员",
  "李白",
  "消愁",
  "烟火里的尘埃",
  "吻别",
  "红豆",
  "突然好想你",
  "Love Story",
  "晴天",
  "修炼爱情",
  "浮夸",
  "泡沫",
  "丑八怪",
  "模特",
  "像我这样的人",
  "寒鸦少年",
];

const ALBUMS = [
  "十一月的萧邦",
  "第二天堂",
  "黑白灰",
  "新的心跳",
  "初学者",
  "模特",
  "平凡的一天",
  "异类",
  "吻别",
  "将爱",
  "后青春期的诗",
  "1989",
];

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const generateSong = (index: number): Song => {
  const title = SONG_TITLES[Math.floor(Math.random() * SONG_TITLES.length)];
  const artist = ARTISTS[Math.floor(Math.random() * ARTISTS.length)];
  const album = ALBUMS[Math.floor(Math.random() * ALBUMS.length)];

  return {
    id: index,
    title,
    artist,
    album,
    duration: Math.floor(Math.random() * 240) + 120,
    cover: `https://picsum.photos/seed/song${index}/200/200`,
    isPlaying: false,
    isHot: Math.random() > 0.7,
    isNew: Math.random() > 0.8,
  };
};

const SongItem = ({
  song,
  index,
  isCurrent,
  onPress,
}: {
  song: Song;
  index: number;
  isCurrent: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.item, isCurrent && styles.itemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* 序号 */}
      <View style={styles.indexContainer}>
        {isCurrent ? (
          <View style={styles.playingIndicator}>
            <View style={[styles.playingBar, styles.playingBar1]} />
            <View style={[styles.playingBar, styles.playingBar2]} />
            <View style={[styles.playingBar, styles.playingBar3]} />
          </View>
        ) : (
          <Text style={styles.indexText}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </Text>
        )}
      </View>

      {/* 封面 */}
      <Image source={{ uri: song.cover }} style={styles.cover} />

      {/* 歌曲信息 */}
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          {song.isHot && <View style={styles.tagHot}><Text style={styles.tagText}>HOT</Text></View>}
          {song.isNew && <View style={styles.tagNew}><Text style={styles.tagText}>NEW</Text></View>}
          <Text style={[styles.title, isCurrent && styles.titleActive]} numberOfLines={1}>
            {song.title}
          </Text>
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>
          {song.artist} - {song.album}
        </Text>
      </View>

      {/* 时长 */}
      <Text style={styles.duration}>{formatDuration(song.duration)}</Text>

      {/* 更多按钮 */}
      <TouchableOpacity style={styles.moreButton} onPress={() => console.log("更多:", song.title)}>
        <Text style={styles.moreText}>···</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Demo = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const loadSongs = useCallback(
    async (isRefresh = false) => {
      if (isLoading) return;

      setIsLoading(true);
      if (isRefresh) setIsRefreshing(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const newPage = isRefresh ? 0 : page + 1;
        const startIndex = newPage * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;

        const newSongs: Song[] = [];
        for (let i = startIndex; i < endIndex; i++) {
          newSongs.push(generateSong(i));
        }

        if (isRefresh) {
          setSongs(newSongs);
          setPage(0);
          setCurrentId(null);
        } else {
          setSongs((prev) => [...prev, ...newSongs]);
          setPage(newPage);
        }

        if (newPage >= 4) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("加载歌曲失败:", error);
      } finally {
        setIsLoading(false);
        if (isRefresh) setIsRefreshing(false);
      }
    },
    [isLoading, page]
  );

  React.useEffect(() => {
    loadSongs();
  }, []);

  const handleRefresh = useCallback(() => {
    setHasMore(true);
    loadSongs(true);
  }, [loadSongs]);

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoading) {
      loadSongs();
    }
  }, [hasMore, isLoading, loadSongs]);

  const handlePlay = useCallback(
    (id: number) => {
      setCurrentId(id);
      const song = songs.find((s) => s.id === id);
      if (song) {
        console.log("播放:", song.title, "-", song.artist);
      }
    },
    [songs]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Song; index: number }) => {
      return (
        <SongItem
          song={item}
          index={index}
          isCurrent={item.id === currentId}
          onPress={() => handlePlay(item.id)}
        />
      );
    },
    [currentId, handlePlay]
  );

  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#ff4081" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }, [isLoading]);

  const renderEmpty = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>暂无歌曲</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadSongs(true)}>
          <Text style={styles.retryButtonText}>重试</Text>
        </TouchableOpacity>
      </View>
    );
  }, [loadSongs]);

  const currentSong = songs.find((s) => s.id === currentId);

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>每日推荐</Text>
          <Text style={styles.headerSubtitle}>共 {songs.length} 首</Text>
        </View>
        <TouchableOpacity
          style={styles.playAllButton}
          onPress={() => {
            if (songs.length > 0) {
              handlePlay(songs[0].id);
            }
          }}
        >
          <Text style={styles.playAllIcon}>▶</Text>
          <Text style={styles.playAllText}>播放全部</Text>
        </TouchableOpacity>
      </View>

      {/* 歌曲列表 */}
      <FlashList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={264}
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

      {/* 底部播放栏 */}
      {currentSong && (
        <View style={styles.bottomBar}>
          <Image source={{ uri: currentSong.cover }} style={styles.bottomCover} />
          <View style={styles.bottomInfo}>
            <Text style={styles.bottomTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.bottomArtist} numberOfLines={1}>
              {currentSong.artist}
            </Text>
          </View>
          <TouchableOpacity style={styles.bottomControl}>
            <Text style={styles.bottomControlIcon}>⏸</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomControl}>
            <Text style={styles.bottomControlIcon}>⏭</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
  },
  playAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4081",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  playAllIcon: {
    fontSize: 12,
    color: "#fff",
    marginRight: 4,
  },
  playAllText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  listContainer: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  itemActive: {
    backgroundColor: "#fff5f8",
  },
  indexContainer: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    fontSize: 14,
    color: "#bbb",
    fontWeight: "500",
  },
  playingIndicator: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 16,
    width: 16,
    justifyContent: "center",
  },
  playingBar: {
    width: 3,
    backgroundColor: "#ff4081",
    marginHorizontal: 1,
    borderRadius: 1.5,
  },
  playingBar1: {
    height: 8,
  },
  playingBar2: {
    height: 14,
  },
  playingBar3: {
    height: 10,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginHorizontal: 8,
    backgroundColor: "#f0f0f0",
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    flexShrink: 1,
  },
  titleActive: {
    color: "#ff4081",
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
  tagHot: {
    backgroundColor: "#ff4081",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 6,
  },
  tagNew: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 6,
  },
  tagText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  duration: {
    fontSize: 12,
    color: "#bbb",
    marginHorizontal: 12,
  },
  moreButton: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  moreText: {
    fontSize: 18,
    color: "#ccc",
    fontWeight: "bold",
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
    color: "#999",
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
    backgroundColor: "#ff4081",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ececec",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomCover: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  bottomInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  bottomTitle: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  bottomArtist: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  bottomControl: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bottomControlIcon: {
    fontSize: 22,
    color: "#333",
  },
});

export default Demo;
