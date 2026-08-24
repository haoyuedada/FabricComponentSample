/**
 * SongFlashList Demo
 * 演示如何使用 Component-huan.tsx 中的 SongFlashList 组件。
 *
 * 使用方式：在 index.js 中引入
 *   import App from './src/flash-list/SongFlashListDemo.tsx';
 *   AppRegistry.registerComponent(appName, () => App);
 */

import React, { useCallback, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SongFlashList, { Song } from "./Component-huan";

// ============================================================
// Mock 数据生成
// ============================================================
const SONG_TITLES = [
  "夜曲",
  "稻香",
  "青花瓷",
  "晴天",
  "七里香",
  "简单爱",
  "告白气球",
  "等你下课",
  "说好不哭",
  "搁浅",
  "轨迹",
  "暗号",
  "东风破",
  "发如雪",
  "千里之外",
  "菊花台",
  "霍元甲",
  "夜的第七章",
  "退后",
  "迷迭香",
];

const ARTISTS = [
  "周杰伦",
  "陈奕迅",
  "林俊杰",
  "五月天",
  "孙燕姿",
  "梁静茹",
  "田馥甄",
  "李荣浩",
];

// 用 picsum.photos 生成随机封面图，按 id 固定种子保证每次一致
const makeCover = (id: number) =>
  `https://picsum.photos/seed/song${id}/120/120`;

const generateSongs = (count: number): Song[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `song-${i}`,
    title: SONG_TITLES[i % SONG_TITLES.length],
    artist: ARTISTS[i % ARTISTS.length],
    cover: makeCover(i),
  }));
};

const MOCK_SONGS = generateSongs(200);

// ============================================================
// Demo 页面
// ============================================================
export default function SongFlashListDemo() {
  const [songs] = useState<Song[]>(MOCK_SONGS);
  const [lastPressed, setLastPressed] = useState<Song | null>(null);

  const handlePressSong = useCallback((song: Song) => {
    setLastPressed(song);
    Alert.alert("点击了歌曲", `${song.title} - ${song.artist}`);
  }, []);

  const handleReload = useCallback(() => {
    // 重新生成一批数据，验证回收机制
    setLastPressed(null);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f6f4" />

      {/* 顶部标题栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>歌曲列表</Text>
        <Text style={styles.headerSubtitle}>
          共 {songs.length} 首 · FlashList v2 回收列表
        </Text>
      </View>

      {/* 最近点击提示条 */}
      {lastPressed ? (
        <View style={styles.tipBar}>
          <Text style={styles.tipText} numberOfLines={1}>
            最近点击：{lastPressed.title} - {lastPressed.artist}
          </Text>
          <TouchableOpacity onPress={handleReload} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>清除</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* FlashList 列表 */}
      <View style={styles.listContainer}>
        <SongFlashList songs={songs} onPressSong={handlePressSong} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f6f6f4",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0dc",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#77736d",
    marginTop: 4,
  },
  tipBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff8e1",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ffe082",
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: "#8d6e00",
  },
  clearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#ffe082",
    borderRadius: 4,
  },
  clearBtnText: {
    fontSize: 12,
    color: "#5d4037",
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
  },
});
