/**
 * FlashList 歌曲评论列表 Demo
 *
 * 场景：模拟歌曲评论列表，每条评论下方有可展开的回复区域。
 * - 约 50 条评论，每条评论有 10~15 条回复
 * - 点击「查看 N 条回复」展开/收起回复列表
 * - 评论和回复均有点赞、头像、时间等信息
 * - 使用 FlashList 的 getItemType 区分评论项和回复项，优化回收池
 *
 * 使用方式：在 index.js 中引入
 *   import App from './src/flash-list/CommentListDemo';
 *   AppRegistry.registerComponent(appName, () => App);
 */

import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';

// ============================================================
// Android LayoutAnimation 开关
// ============================================================
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ============================================================
// 类型定义
// ============================================================

/** 单条回复 */
interface Reply {
  id: number;
  userName: string;
  avatarColor: string;
  content: string;
  likeCount: number;
  time: string;
  replyTo?: string; // 回复的目标用户名（楼中楼）
}

/** 单条评论 */
interface Comment {
  id: number;
  userName: string;
  avatarColor: string;
  content: string;
  likeCount: number;
  time: string;
  location: string;
  replies: Reply[];
}

/**
 * 扁平化后的列表项类型。
 * FlashList 需要一维数组，所以把评论和回复拍平，
 * 用 type 字段区分。
 */
interface FlatItem {
  type: 'comment' | 'reply';
  commentId: number; // 所属评论 ID
  replyId?: number; // 仅 reply 有
  data: Comment | Reply;
  replyCount: number; // 该评论的回复总数（仅 comment 项使用）
  isExpanded: boolean; // 该评论的回复是否展开（仅 comment 项使用）
}

// ============================================================
// 模拟数据生成
// ============================================================

const USER_NAMES = [
  '周杰伦', '方文山', '陈奕迅', '林俊杰', '五月天阿信',
  '孙燕姿', '梁静茹', '王力宏', '蔡依林', '陶喆',
  '张惠妹', '萧敬腾', '邓紫棋', '李荣浩', '华晨宇',
  '毛不易', '薛之谦', '张艺兴', '华晨宇', '周深',
  '刘若英', '田馥甄', '杨宗纬', '徐佳莹', '林宥嘉',
  '吴青峰', '彭佳慧', '黄丽玲', '袁娅维', '单依纯',
];

const COMMENT_TEXTS = [
  '这首歌真的太好听了，循环了一整天！',
  '杰伦的歌永远的神，青春的回忆啊',
  '十一月的萧邦这张专辑每首都是经典',
  '听到前奏就泪目了，想起了高中时光',
  '方文山的词配杰伦的曲，绝配！',
  '这首歌的编曲太牛了，层次感很丰富',
  '有没有人和我一样，下雨天就爱听这首歌',
  '当年用 MP3 听这首歌的时候还在上学',
  '演唱会现场版更震撼，推荐大家去看',
  '这首歌的 MV 拍得也很有意境',
  '钢琴前奏太治愈了，每天睡前必听',
  '歌词写得太美了，画面感很强',
  '这首歌教会了我什么是真正的华语音乐',
  '从小学听到现在工作，依然爱不释手',
  '每次心情不好就听这首歌，瞬间治愈',
  '杰伦的音乐品味真的超前，十几年了不过时',
  '这首歌的和弦进行太绝了，学音乐的人都懂',
  '推荐配着歌词看，会有不一样的感受',
  '这首歌适合深夜一个人静静地听',
  '有没有吉他谱？想学这首歌好久了',
  '这首歌在 KTV 必点，虽然唱不好哈哈',
  '听了这首歌去学了钢琴，现在已经八级了',
  '这首歌的副歌部分太洗脑了，根本停不下来',
  '每次听都有新的发现，细节太多了',
  '这首歌陪我度过了最难的那段日子',
  '纯粹的好听，不需要太多理由',
  '这首歌的混音水平在当时是顶级的',
  '希望杰伦能再出这样的作品',
  '这首歌的间奏部分太神了',
  '经典就是经典，经得起时间考验',
  '评论区都是懂音乐的人，太好了',
  '这首歌让我爱上了华语流行音乐',
  '每次听这首歌都想起了初恋',
  '这首歌的结构很特别，不像常规流行歌',
  '方文山的中国风歌词真的独一档',
  '这首歌的画面感很强，像在看电影',
  '节奏感太好了，不知不觉就跟着打拍子',
  '这首歌的情感表达太细腻了',
  '从这首开始入坑杰伦，一发不可收拾',
  '这首歌适合开车的时候听',
  '歌词里的小故事太打动人了',
  '这首歌的旋律写得太流畅了',
  '有没有人分析过这首歌的歌词含义',
  '这首歌的和声部分很惊艳',
  '每次演唱会都期待这首歌',
  '这首歌的后奏也很棒，不要急着切歌',
  '这首歌的 BASS LINE 很有意思',
  '听这首歌的时候总想起那些年的事',
  '永远不会腻的一首歌',
];

const REPLY_TEXTS = [
  '同感！',
  '说得对，我也是这么觉得的',
  '握手，一样的心情',
  '哈哈哈哈太真实了',
  ' +1 ',
  '你说到我心坎里了',
  '我也超爱这首歌',
  '确实，这首歌很有感觉',
  '回忆杀啊',
  '泪目了……',
  '楼主说得真好',
  '赞同，经典就是经典',
  '我也是从这首歌开始喜欢杰伦的',
  '是的，方文山的词太绝了',
  '有品位！',
  '握手，同道中人',
  '这首歌真的越听越有味道',
  '我也是，循环了好久',
  '楼主好人，一生平安',
  '哈哈哈你太逗了',
  '对对对，就是这个感觉',
  '说出了我的心声',
  '有道理',
  '深有同感',
  '你这评论也太走心了',
  '是啊，时光飞逝',
  '我也想去演唱会了',
  '说得我鼻子一酸',
  '杰伦永远滴神',
  '青春啊青春',
];

const LOCATIONS = [
  '广东', '北京', '上海', '浙江', '江苏',
  '四川', '湖北', '湖南', '福建', '山东',
  '河南', '河北', '辽宁', '陕西', '重庆',
  '海外', '天津', '安徽', '江西', '云南',
];

const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8B739', '#52BE80',
  '#EC7063', '#5DADE2', '#48C9B0', '#F4D03F', '#AF7AC5',
];

const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** 生成单条回复 */
const generateReply = (id: number, parentCommentId: number): Reply => {
  const hasReplyTo = Math.random() > 0.6;
  return {
    id,
    userName: randomFrom(USER_NAMES),
    avatarColor: randomFrom(AVATAR_COLORS),
    content: randomFrom(REPLY_TEXTS),
    likeCount: Math.floor(Math.random() * 50),
    time: `${Math.floor(Math.random() * 23) + 1}小时前`,
    replyTo: hasReplyTo ? randomFrom(USER_NAMES) : undefined,
  };
};

/** 生成单条评论（含 10~15 条回复） */
const generateComment = (id: number): Comment => {
  const replyCount = 10 + Math.floor(Math.random() * 6); // 10~15
  const replies: Reply[] = Array.from({ length: replyCount }, (_, i) =>
    generateReply(id * 1000 + i, id),
  );
  return {
    id,
    userName: randomFrom(USER_NAMES),
    avatarColor: randomFrom(AVATAR_COLORS),
    content: COMMENT_TEXTS[id % COMMENT_TEXTS.length],
    likeCount: Math.floor(Math.random() * 500),
    time: `${Math.floor(Math.random() * 30) + 1}天前`,
    location: randomFrom(LOCATIONS),
    replies,
  };
};

/** 生成全部评论数据 */
const generateComments = (count: number): Comment[] =>
  Array.from({ length: count }, (_, i) => generateComment(i));

// ============================================================
// 扁平化逻辑：将 Comment[] 转为 FlatItem[]
// 展开的评论会把回复拍平到评论后面；收起的评论只有评论本身。
// ============================================================
const flattenComments = (
  comments: Comment[],
  expandedSet: Set<number>,
): FlatItem[] => {
  const result: FlatItem[] = [];
  for (const comment of comments) {
    const isExpanded = expandedSet.has(comment.id);
    result.push({
      type: 'comment',
      commentId: comment.id,
      data: comment,
      replyCount: comment.replies.length,
      isExpanded,
    });
    if (isExpanded) {
      for (const reply of comment.replies) {
        result.push({
          type: 'reply',
          commentId: comment.id,
          replyId: reply.id,
          data: reply,
          replyCount: comment.replies.length,
          isExpanded: true,
        });
      }
    }
  }
  return result;
};

// ============================================================
// 头像组件
// ============================================================
const Avatar = memo(({ color, name }: { color: string; name: string }) => (
  <View style={[styles.avatar, { backgroundColor: color }]}>
    <Text style={styles.avatarText}>{name.charAt(0)}</Text>
  </View>
));

// ============================================================
// 点赞按钮组件
// ============================================================
type LikeButtonProps = {
  count: number;
  onToggle: () => void;
};

const LikeButton = memo(({ count, onToggle }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);

  const handlePress = useCallback(() => {
    setLiked(prev => {
      setCurrentCount(c => (prev ? c - 1 : c + 1));
      return !prev;
    });
    onToggle();
  }, [onToggle]);

  return (
    <TouchableOpacity
      style={styles.likeButton}
      onPress={handlePress}
      activeOpacity={0.6}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={[styles.likeIcon, liked && styles.likeIconActive]}>
        {liked ? '❤️' : '🤍'}
      </Text>
      <Text style={[styles.likeCount, liked && styles.likeCountActive]}>
        {currentCount}
      </Text>
    </TouchableOpacity>
  );
});

// ============================================================
// 评论项组件
// ============================================================
type CommentItemProps = {
  item: FlatItem;
  isExpanded: boolean;
  onToggleExpand: (commentId: number) => void;
};

const CommentItem = memo(
  ({ item, isExpanded, onToggleExpand }: CommentItemProps) => {
    const comment = item.data as Comment;

    const handleToggle = useCallback(() => {
      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut,
      );
      onToggleExpand(comment.id);
    }, [comment.id, onToggleExpand]);

    return (
      <View style={styles.commentContainer}>
        {/* 头像 */}
        <Avatar color={comment.avatarColor} name={comment.userName} />

        {/* 评论主体 */}
        <View style={styles.commentBody}>
          {/* 用户名 + 位置 */}
          <View style={styles.commentHeader}>
            <Text style={styles.userName}>{comment.userName}</Text>
            <Text style={styles.location}>{comment.location}</Text>
          </View>

          {/* 评论内容 */}
          <Text style={styles.commentContent}>{comment.content}</Text>

          {/* 底部：时间 + 点赞 + 展开回复 */}
          <View style={styles.commentFooter}>
            <Text style={styles.commentTime}>{comment.time}</Text>

            <View style={styles.footerRight}>
              <LikeButton
                count={comment.likeCount}
                onToggle={() => {}}
              />
            </View>
          </View>

          {/* 展开/收起回复按钮 */}
          {item.replyCount > 0 && (
            <TouchableOpacity
              style={styles.toggleRepliesButton}
              onPress={handleToggle}
              activeOpacity={0.6}
            >
              <View style={styles.toggleRepliesLine} />
              <Text style={styles.toggleRepliesText}>
                {isExpanded
                  ? `收起 ${item.replyCount} 条回复`
                  : `展开 ${item.replyCount} 条回复`}
              </Text>
              <Text style={styles.toggleArrow}>
                {isExpanded ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

// ============================================================
// 回复项组件
// ============================================================
type ReplyItemProps = {
  item: FlatItem;
};

const ReplyItem = memo(({ item }: ReplyItemProps) => {
  const reply = item.data as Reply;

  return (
    <View style={styles.replyContainer}>
      {/* 头像（稍小） */}
      <Avatar color={reply.avatarColor} name={reply.userName} />

      <View style={styles.replyBody}>
        <View style={styles.replyHeader}>
          <Text style={styles.replyUserName}>{reply.userName}</Text>
          {reply.replyTo && (
            <>
              <Text style={styles.replyArrow}>回复</Text>
              <Text style={styles.replyToUser}>{reply.replyTo}</Text>
            </>
          )}
        </View>

        <Text style={styles.replyContent}>{reply.content}</Text>

        <View style={styles.replyFooter}>
          <Text style={styles.replyTime}>{reply.time}</Text>
          <LikeButton count={reply.likeCount} onToggle={() => {}} />
        </View>
      </View>
    </View>
  );
});

// ============================================================
// 列表头组件
// ============================================================
const ListHeader = ({ count }: { count: number }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>评论</Text>
    <Text style={styles.headerSubtitle}>共 {count} 条评论</Text>
  </View>
);

// ============================================================
// 主组件
// ============================================================
const CommentListDemo = () => {
  // 生成 50 条评论
  const [comments] = useState<Comment[]>(() => generateComments(50));
  // 展开的评论 ID 集合
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set());

  // 扁平化数据
  const flatData = useMemo(
    () => flattenComments(comments, expandedSet),
    [comments, expandedSet],
  );

  // 展开/收起某条评论的回复
  const handleToggleExpand = useCallback((commentId: number) => {
    setExpandedSet(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  }, []);

  const keyExtractor = useCallback((item: FlatItem) => {
    if (item.type === 'comment') {
      return `comment-${item.commentId}`;
    }
    return `reply-${item.commentId}-${item.replyId}`;
  }, []);

  // getItemType 区分评论和回复，让回收池更高效
  const getItemType = useCallback((item: FlatItem) => {
    return item.type === 'comment' ? 0 : 1;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: FlatItem }) => {
      if (item.type === 'comment') {
        return (
          <CommentItem
            item={item}
            isExpanded={item.isExpanded}
            onToggleExpand={handleToggleExpand}
          />
        );
      }
      return <ReplyItem item={item} />;
    },
    [handleToggleExpand],
  );

  const ListEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📭 暂无评论</Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={flatData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        estimatedItemSize={120}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<ListHeader count={comments.length} />}
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
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // Header
  headerContainer: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
  },
  // Separator
  separator: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginLeft: 48, // 对齐头像右侧
  },
  // ---- 评论项 ----
  commentContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 12,
  },
  commentBody: {
    flex: 1,
    marginLeft: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B5B5B',
  },
  location: {
    fontSize: 12,
    color: '#AEAEB2',
    marginLeft: 8,
  },
  commentContent: {
    fontSize: 16,
    color: '#1C1C1E',
    lineHeight: 22,
    marginBottom: 8,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentTime: {
    fontSize: 12,
    color: '#AEAEB2',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 展开/收起回复
  toggleRepliesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 4,
  },
  toggleRepliesLine: {
    width: 20,
    height: 1,
    backgroundColor: '#D1D1D6',
    marginRight: 8,
  },
  toggleRepliesText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },
  toggleArrow: {
    fontSize: 10,
    color: '#007AFF',
    marginLeft: 4,
  },
  // ---- 回复项 ----
  replyContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 6,
    paddingLeft: 36, // 缩进，表示是回复
    backgroundColor: '#FAFAFA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
  },
  replyBody: {
    flex: 1,
    marginLeft: 10,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  replyUserName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B5B5B',
  },
  replyArrow: {
    fontSize: 12,
    color: '#AEAEB2',
    marginHorizontal: 4,
  },
  replyToUser: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B5B5B',
  },
  replyContent: {
    fontSize: 14,
    color: '#1C1C1E',
    lineHeight: 20,
    marginBottom: 4,
  },
  replyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  replyTime: {
    fontSize: 11,
    color: '#C7C7CC',
  },
  // ---- 头像 ----
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // ---- 点赞 ----
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  likeIcon: {
    fontSize: 14,
  },
  likeIconActive: {},
  likeCount: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  likeCountActive: {
    color: '#FF3B30',
  },
  // ---- 空状态 ----
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#8E8E93',
  },
});

export default CommentListDemo;
