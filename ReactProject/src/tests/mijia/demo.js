import React, { Component } from 'react';
import {
  ScrollView,
  Animated,
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Button
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// 常量定义
const EXPANDED_HEIGHT = 500;
const COLLAPSED_HEIGHT = 100;
const BOTTOM_OFFSET = 0;

class DraggablePanel extends Component {
  constructor(props) {
    super(props);

    // 状态管理（替代 useState）
    this.state = {
      isExpanded: false
    };

    // 动画值和引用（替代 useRef）
    this.translateY = new Animated.Value(0);
    this.startY = 0;

    // 初始化手势响应器
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: this.handlePanGrant.bind(this),
      onPanResponderMove: this.handlePanMove.bind(this),
      onPanResponderRelease: this.handlePanRelease.bind(this)
    });
  }

  // 组件挂载时初始化（替代 useEffect）
  componentDidMount() {
    const initialPosition = EXPANDED_HEIGHT - COLLAPSED_HEIGHT;
    this.translateY.setValue(initialPosition);
    this.setState({ isExpanded: false });
  }

  // 开始拖动
  handlePanGrant() {
    this.startY = this.translateY._value;
  }

  // 拖动过程
  handlePanMove(e, gesture) {
    const newY = this.startY + gesture.dy;
    // 限制拖动范围
    if (newY >= 0 && newY <= (EXPANDED_HEIGHT - COLLAPSED_HEIGHT)) {
      this.translateY.setValue(newY);
    }
  }

  // 结束拖动
  handlePanRelease(e, gesture) {
    const finalY = this.startY + gesture.dy;
    const midPoint = (EXPANDED_HEIGHT - COLLAPSED_HEIGHT) / 2;

    if (finalY < midPoint) {
      // 展开动画
      Animated.timing(this.translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
        this.setState({ isExpanded: true });
      });
    } else {
      // 收起动画
      Animated.timing(this.translateY, {
        toValue: EXPANDED_HEIGHT - COLLAPSED_HEIGHT,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
        this.setState({ isExpanded: false });
      });
    }
  }

  render() {
    // 计算面板位置插值
    const panelTranslate = this.translateY.interpolate({
      inputRange: [0, EXPANDED_HEIGHT - COLLAPSED_HEIGHT],
      outputRange: [0, EXPANDED_HEIGHT - COLLAPSED_HEIGHT]
    });

    const { isExpanded } = this.state;

    return (
      <View style={styles.container}>
        {/* 不可滚动的ScrollView */}
        <ScrollView
          style={styles.scrollView}
          // scrollEnabled={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 背景内容 */}
          <View style={styles.backgroundContent}>
            <Text style={styles.backgroundText}>scroll页面背景内容</Text>
            <Text style={styles.backgroundText}>向上拖动底部面板展开</Text>
          </View>

          {/* 可拖动面板 */}
          <Animated.View
            {...this.panResponder.panHandlers}
            pointerEvents="box-none"
            style={[
              styles.draggablePanel,
              {
                transform: [{ translateY: panelTranslate }],
                height: EXPANDED_HEIGHT,
                bottom: BOTTOM_OFFSET
              }
            ]}
          >
            {/* 拖动把手 */}
            <View style={styles.dragHandle} onPress={() => {
              console.log('拖动把手触发了子元素点击事件');
            }} />

            {/* 面板内容 */}
            <View style={styles.panelContent}>
              <Text style={styles.panelTitle} onPress={() => {
                console.log('面板内容触发了子元素点击事件');
              }}>
                {isExpanded ? '已展开 - 向下拖动收起' : '已收起 - 向上拖动展开'}
              </Text>
              <Text style={styles.panelInfo}>
                面板高度: {isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT}px
              </Text>
              <Button title="点击"></Button>
              {/* 示例列表 */}
              {Array.from({ length: 15 }).map((_, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemText}>列表项 {index + 1}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  backgroundContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundText: {
    fontSize: 18,
    color: '#666',
    marginVertical: 10,
  },
  scrollView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: "#ddf"
  },
  draggablePanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  panelContent: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  panelInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DraggablePanel;