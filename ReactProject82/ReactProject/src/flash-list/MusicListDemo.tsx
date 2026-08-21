/**
 * FlashList 音乐列表 Demo
 * 数据量约 200 条，模仿音乐列表：
 *   左侧：歌曲名 + 专辑名
 *   右侧：删除图标 + 拖拽图标
 *
 * 使用方式：在 index.js 中引入
 *   import App from './src/flash-list/MusicListDemo.tsx';
 *   AppRegistry.registerComponent(appName, () => App);
 */

import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan, faGripVertical } from '@fortawesome/free-solid-svg-icons';

// ============================================================
// 类型定义
// ============================================================
interface Song {
  id: number;
  title: string;
  album: string;
  artist: string;
  duration: string;
}

// ============================================================
// 数据生成
// ============================================================
const SONG_NAMES = [
  '夜曲', '稻香', '青花瓷', '晴天', '七里香',
  '简单爱', '双截棍', '告白气球', '等你下课', '说好不哭',
  '搁浅', '轨迹', '暗号', '半岛铁盒', '回到过去',
  '东风破', '发如雪', '千里之外', '菊花台', '霍元甲',
  '夜的第七章', '听妈妈的话', '退后', '心雨', '迷迭香',
];

const ALBUM_NAMES = [
  '十一月的萧邦', '魔杰座', '我很忙', '叶惠美', '七里香',
  '范特西', '八度空间', 'Jay', '跨时代', '惊叹号',
  '哎呦不错哦', '最伟大的作品', '不能说的秘密', '寻找周杰伦',
];

const ARTISTS = ['周杰伦', '陈奕迅', '林俊杰', '五月天', '孙燕姿', '梁静茹'];

const generateSongs = (count: number): Song[] => {
  return Array.from({ length: count }, (_, i) => {
    const songIdx = i % SONG_NAMES.length;
    const albumIdx = i % ALBUM_NAMES.length;
    const artistIdx = i % ARTISTS.length;
    const totalSeconds = 180 + (i * 37) % 240; // 3:00 ~ 6:59
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return {
      id: i,
      title: `${SONG_NAMES[songIdx]}`,
      album: ALBUM_NAMES[albumIdx],
      artist: ARTISTS[artistIdx],
      duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
    };
  });
};

// ============================================================
// 单条歌曲行组件
// ============================================================
type SongItemProps = {
  item: Song;
  index: number;
  onDelete: (id: number) => void;
  onDrag: (item: Song) => void;
};

const SongItem = memo(({ item, index, onDelete, onDrag }: SongItemProps) => {
  const handleDelete = useCallback(() => {
    Alert.alert(
      '删除歌曲',
      `确定要删除「${item.title}」吗？`,
      [
        { text: '取消', style: 'cancel' },
        { text: '删除', style: 'destructive', onPress: () => onDelete(item.id) },
      ],
    );
  }, [item.id, item.title, onDelete]);

  const handleDrag = useCallback(() => {
    onDrag(item);
  }, [item, onDrag]);

  return (
    <View style={styles.itemContainer}>
      {/* 序号 */}
      <Text style={styles.indexText}>{index + 1}</Text>

      {/* 左侧：歌曲名 + 专辑名 */}
      <View style={styles.infoContainer}>
        <Text style={styles.titleText} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.subInfoRow}>
          <Text style={styles.albumText} numberOfLines={1}>
            {item.album}
          </Text>
          <Text style={styles.dotText}>·</Text>
          <Text style={styles.artistText} numberOfLines={1}>
            {item.artist}
          </Text>
          <Text style={styles.dotText}>·</Text>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>

      {/* 右侧：删除图标 + 拖拽图标 */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleDelete}
          activeOpacity={0.6}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <FontAwesomeIcon icon={faTrashCan} size={18} color="#FF3B30" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleDrag}
          activeOpacity={0.6}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <FontAwesomeIcon icon={faGripVertical} size={18} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

// ============================================================
// 列表头组件
// ============================================================
const ListHeader = ({ count }: { count: number }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>🎵 我的音乐</Text>
    <Text style={styles.headerSubtitle}>共 {count} 首歌曲</Text>
  </View>
);

// ============================================================
// 主组件
// ============================================================
const MusicListDemo = () => {
  const [songs, setSongs] = useState<Song[]>(() => generateSongs(200));

  const handleDelete = useCallback((id: number) => {
    setSongs(prev => prev.filter(s => s.id !== id));
  }, []);

  const handleDrag = useCallback((item: Song) => {
    Alert.alert('拖拽', `拖拽「${item.title}」（此处可接入拖拽排序逻辑）`);
  }, []);

  const keyExtractor = useCallback((item: Song) => `song-${item.id}`, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Song; index: number }) => (
      <SongItem
        item={item}
        index={index}
        onDelete={handleDelete}
        onDrag={handleDrag}
      />
    ),
    [handleDelete, handleDrag],
  );

  const ListEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📭 列表已空</Text>
        <Text style={styles.emptySubText}>所有歌曲已被删除</Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={songs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={68}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<ListHeader count={songs.length} />}
        ListEmptyComponent={ListEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        overScrollMode="never"
      />
    </SafeAreaView>
  );
};

// ============================================================
// 样式
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // Header
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  // Item
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    minHeight: 64,
  },
  indexText: {
    width: 32,
    fontSize: 16,
    fontWeight: '600',
    color: '#C7C7CC',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 12,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 3,
  },
  subInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumText: {
    fontSize: 13,
    color: '#3A3A3C',
    maxWidth: 120,
  },
  dotText: {
    fontSize: 13,
    color: '#C7C7CC',
    marginHorizontal: 5,
  },
  artistText: {
    fontSize: 13,
    color: '#8E8E93',
    maxWidth: 80,
  },
  durationText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  // Actions
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  // Separator
  separator: {
    height: 8,
  },
  // Empty
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 20,
    color: '#8E8E93',
  },
  emptySubText: {
    fontSize: 14,
    color: '#C7C7CC',
    marginTop: 8,
  },
});

export default MusicListDemo;
