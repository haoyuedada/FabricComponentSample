/**
 * FsTest — 复杂 Reanimated 压力测试页面
 *
 * 综合测试目标：
 *   1. 大量 SharedValue + 多种动画修饰器（withTiming / withSpring / withSequence /
 *      withDelay / withRepeat / withDecay）同时运行
 *   2. useAnimatedStyle / useAnimatedProps / useDerivedValue / useAnimatedReaction
 *   3. useAnimatedScrollHandler（滚动驱动动画）
 *   4. useFrameCallback（逐帧回调）
 *   5. interpolate / interpolateColor / Extrapolation
 *   6. Gesture（Pan / Tap）驱动动画
 *   7. runOnUI / runOnJS 跨线程通信
 *   8. 嵌套 worklet 捕获链（ShareableWorklet::toJSValue 递归深度）
 *   9. Layout / entering / exiting 动画
 *  10. 动态增删动画节点（卸载时触发 runtime teardown 竞态）
 *
 * 退出页面时所有动画 & worklet 同时销毁，用于复现 reanimated 崩溃。
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useDerivedValue,
  useFrameCallback,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withDecay,
  withRepeat,
  runOnUI,
  runOnJS,
  interpolate,
  interpolateColor,
  Extrapolation,
  Easing,
  measure,
  Layout,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const { width: SCREEN_W } = Dimensions.get('window');

// ─────────────────────────────────────────────────────────────
// 常量
// ─────────────────────────────────────────────────────────────
const GRID_COUNT = 48; // 网格动画节点数
const SPRING_CONFIG = { damping: 12, stiffness: 120, mass: 0.8 };

// ─────────────────────────────────────────────────────────────
// 1. 单个网格动画方块（独立组件，避免 hooks 规则违反）
//    每个方块随机使用不同动画类型
// ─────────────────────────────────────────────────────────────
type AnimKind = 'timing' | 'spring' | 'sequence' | 'repeat' | 'decay';
const ANIM_KINDS: AnimKind[] = ['timing', 'spring', 'sequence', 'repeat', 'decay'];

function GridBox({ index, active }: { index: number; active: boolean }) {
  const base = useSharedValue(0);
  const rotation = useSharedValue(0);
  const hue = useDerivedValue(() => (index * 7 + base.value * 120) % 360);

  const kind = useMemo(() => ANIM_KINDS[index % ANIM_KINDS.length], [index]);

  useEffect(() => {
    if (!active) {
      base.value = 0;
      rotation.value = 0;
      return;
    }
    const target = index % 2 === 0 ? 1 : 0;
    const dur = 400 + (index % 7) * 120;

    switch (kind) {
      case 'timing':
        base.value = withRepeat(
          withTiming(target, { duration: dur, easing: Easing.inOut(Easing.quad) }),
          -1,
          true,
        );
        break;
      case 'spring':
        base.value = withRepeat(withSpring(target, SPRING_CONFIG), -1, true);
        break;
      case 'sequence':
        base.value = withRepeat(
          withSequence(
            withTiming(1, { duration: dur / 2 }),
            withTiming(0.3, { duration: dur / 3 }),
            withTiming(0.8, { duration: dur / 2 }),
            withTiming(0, { duration: dur / 4 }),
          ),
          -1,
          false,
        );
        break;
      case 'repeat':
        base.value = withDelay(
          (index % 5) * 80,
          withRepeat(withTiming(target, { duration: dur }), -1, true),
        );
        break;
      case 'decay':
        base.value = withRepeat(
          withSequence(
            withTiming(1, { duration: dur / 2 }),
            withDecay({ velocity: index % 2 === 0 ? 2 : -2, deceleration: 0.998 }),
          ),
          -1,
          true,
        );
        break;
    }

    rotation.value = withRepeat(
      withTiming(index % 2 === 0 ? 360 : -360, {
        duration: 2000 + (index % 4) * 500,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [active, kind, index]);

  const animStyle = useAnimatedStyle(() => {
    const scale = 0.4 + base.value * 0.8;
    const opacity = 0.3 + base.value * 0.7;
    return {
      transform: [
        { scale },
        { rotate: `${rotation.value}deg` },
        { translateY: interpolate(base.value, [0, 1], [0, -8], Extrapolation.CLAMP) },
      ],
      opacity,
      backgroundColor: `hsl(${hue.value}, 80%, ${40 + base.value * 25}%)`,
      borderRadius: interpolate(base.value, [0, 1], [4, 16], Extrapolation.CLAMP),
    };
  });

  return <Animated.View style={[gridStyles.box, animStyle]} />;
}

const gridStyles = StyleSheet.create({
  box: { width: 28, height: 28, backgroundColor: 'violet', margin: 3 },
});

// ─────────────────────────────────────────────────────────────
// 2. 可拖拽 & 回弹的卡片
// ─────────────────────────────────────────────────────────────
function DraggableCard() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const autoX = useSharedValue(0);
  const autoY = useSharedValue(0);
  const ctxX = useSharedValue(0);
  const ctxY = useSharedValue(0);
  const pressed = useSharedValue(false);
  const scale = useDerivedValue(() =>
    withSpring(pressed.value ? 1.15 : 1, SPRING_CONFIG),
  );

  // 自动浮动动画（无需拖拽也会动）
  useEffect(() => {
    autoX.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(-20, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
    autoY.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 1400, easing: Easing.inOut(Easing.cubic) }),
        withTiming(12, { duration: 1400, easing: Easing.inOut(Easing.cubic) }),
      ),
      -1,
      true,
    );
  }, []);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
      ctxX.value = translateX.value;
      ctxY.value = translateY.value;
    })
    .onChange((e) => {
      translateX.value = ctxX.value + e.translationX;
      translateY.value = ctxY.value + e.translationY;
    })
    .onEnd(() => {
      pressed.value = false;
      translateX.value = withDecay({
        deceleration: 0.98,
        rubberBandEffect: true,
        clamp: [-SCREEN_W / 2 + 60, SCREEN_W / 2 - 60],
      });
      translateY.value = withSpring(0, SPRING_CONFIG);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value + autoX.value },
      { translateY: translateY.value + autoY.value },
      { scale: scale.value },
    ],
    backgroundColor: interpolateColor(
      pressed.value ? 1 : 0,
      [0, 1],
      ['#6C63FF', '#FF6584'],
    ),
    shadowOpacity: pressed.value ? 0.4 : 0.15,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[dragStyles.card, style]}>
        <Text style={dragStyles.cardText}>Auto-floating · Drag me</Text>
        <Text style={dragStyles.cardHint}>Release to spring back</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const dragStyles = StyleSheet.create({
  card: {
    width: 140, height: 90, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  cardHint: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 4 },
});

// ─────────────────────────────────────────────────────────────
// 3. 滚动驱动头部（sticky header 收缩 + 颜色渐变）
// ─────────────────────────────────────────────────────────────
function ScrollDrivenHeader() {
  const scrollY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  // 自动驱动 scrollY（无需手动滚动头部也会收缩/展开）
  useEffect(() => {
    scrollY.value = withRepeat(
      withSequence(
        withTiming(150, { duration: 2500, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.cubic) }),
      ),
      -1,
      false,
    );
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => { scrollY.value = e.contentOffset.y; },
    onBeginDrag: () => { isDragging.value = true; },
    onEndDrag: () => { isDragging.value = false; },
    onMomentumEnd: () => { isDragging.value = false; },
  });

  const headerStyle = useAnimatedStyle(() => {
    const h = interpolate(scrollY.value, [0, 120], [120, 50], Extrapolation.CLAMP);
    return {
      height: h,
      backgroundColor: interpolateColor(
        interpolate(scrollY.value, [0, 100], [0, 1], Extrapolation.CLAMP),
        [0, 1],
        ['#1a1a2e', '#16213e'],
      ),
      paddingTop: interpolate(scrollY.value, [0, 120], [20, 8], Extrapolation.CLAMP),
    };
  });

  const titleStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(scrollY.value, [0, 120], [24, 16], Extrapolation.CLAMP),
    opacity: interpolate(scrollY.value, [0, 80, 120], [1, 0.6, 0.4], Extrapolation.CLAMP),
  }));

  return (
    <View style={scrollStyles.section}>
      <Animated.View style={[scrollStyles.header, headerStyle]}>
        <Animated.Text style={[scrollStyles.headerTitle, titleStyle]}>
          Scroll-Driven Header
        </Animated.Text>
        <Animated.Text style={scrollStyles.headerSub}>
          drag = {isDragging.value ? 'yes' : 'no'}
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        style={scrollStyles.scrollBody}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {Array.from({ length: 30 }, (_, i) => (
          <View key={i} style={scrollStyles.row}>
            <Text style={scrollStyles.rowText}>Row #{i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const scrollStyles = StyleSheet.create({
  section: { height: 320, borderRadius: 12, overflow: 'hidden' },
  header: {
    alignItems: 'center', justifyContent: 'center',
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: { color: '#fff', fontWeight: '700' },
  headerSub: { color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 },
  scrollBody: { flex: 1, backgroundColor: '#0f3460' },
  row: {
    height: 44, paddingHorizontal: 16, justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  rowText: { color: '#e0e0e0', fontSize: 13 },
});

// ─────────────────────────────────────────────────────────────
// 4. 逐帧回调移动的方块（useFrameCallback）
// ─────────────────────────────────────────────────────────────
function FrameCallbackBalls() {
  const x1 = useSharedValue(0);
  const y1 = useSharedValue(0);
  const x2 = useSharedValue(0);
  const y2 = useSharedValue(100);
  const frameCount = useSharedValue(0);
  const [displayCount, setDisplayCount] = useState(0);

  useFrameCallback((info) => {
    frameCount.value++;
    const t = info.timeSinceFirstFrame ?? 0;
    // 方块 1：圆周运动
    x1.value = 80 + Math.cos(t / 500) * 60;
    y1.value = 80 + Math.sin(t / 500) * 60;
    // 方块 2：8 字形
    x2.value = 80 + Math.sin(t / 400) * 70;
    y2.value = 80 + Math.sin((t / 400) * 2) * 40;
  }, true);

  // 每 30 帧同步一次计数到 JS 线程
  useAnimatedReaction(
    () => frameCount.value,
    (n) => {
      if (n % 30 === 0) runOnJS(setDisplayCount)(n);
    },
  );

  const s1 = useAnimatedStyle(() => ({
    transform: [{ translateX: x1.value }, { translateY: y1.value }],
  }));
  const s2 = useAnimatedStyle(() => ({
    transform: [{ translateX: x2.value }, { translateY: y2.value }],
    backgroundColor: interpolateColor(
      (frameCount.value % 100) / 100,
      [0, 0.5, 1],
      ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    ),
  }));

  return (
    <View style={frameStyles.area}>
      <Animated.View style={[frameStyles.ball1, s1]} />
      <Animated.View style={[frameStyles.ball2, s2]} />
      <Text style={frameStyles.counter}>Frames: {displayCount}</Text>
    </View>
  );
}

const frameStyles = StyleSheet.create({
  area: { height: 180, backgroundColor: '#1a1a2e', borderRadius: 12, overflow: 'hidden' },
  ball1: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFD93D' },
  ball2: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: '#FF6B6B' },
  counter: { position: 'absolute', bottom: 8, right: 12, color: 'rgba(255,255,255,0.5)', fontSize: 11 },
});

// ─────────────────────────────────────────────────────────────
// 5. 嵌套 worklet 捕获链（复现 ShareableWorklet::toJSValue 深度递归）
// ─────────────────────────────────────────────────────────────
function createDeepObject(depth: number): any {
  if (depth <= 0) {
    return { v: Math.random(), arr: [1, 2, 3, 4, 5], meta: { a: 1, b: { c: 2, d: { e: 3 } } } };
  }
  return {
    left: createDeepObject(depth - 1),
    right: createDeepObject(depth - 1),
    info: { id: depth, name: 'node_' + depth, nested: { x: depth, y: depth * 2 } },
  };
}

function NestedWorkletChain() {
  const result = useSharedValue(0);
  const [jsResult, setJsResult] = useState(0);

  const runChain = useCallback(() => {
    const d1 = createDeepObject(3);
    const d2 = createDeepObject(3);

    const workletD = (d: any) => {
      'worklet';
      return d?.v ?? 0;
    };
    const workletC = (d: any) => {
      'worklet';
      return workletD(d?.left) + (d?.info?.id ?? 0);
    };
    const workletB = (d: any) => {
      'worklet';
      return workletC(d) + workletC(d?.right);
    };
    const workletA = () => {
      'worklet';
      return workletB(d1) + workletB(d2);
    };

    runOnUI(() => {
      'worklet';
      const v = workletA();
      result.value = v;
      runOnJS(setJsResult)(v);
    })();
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    width: interpolate(Math.abs(result.value) % 100, [0, 100], [0, 200], Extrapolation.CLAMP),
  }));

  // 自动运行（每隔 3 秒重新执行一次 worklet 链）
  useEffect(() => {
    runChain();
    const timer = setInterval(runChain, 3000);
    return () => clearInterval(timer);
  }, [runChain]);

  return (
    <View style={nestedStyles.section}>
      <Text style={nestedStyles.title}>Nested Worklet Chain</Text>
      <Text style={nestedStyles.result}>Result: {jsResult.toFixed(4)}</Text>
      <View style={nestedStyles.barBg}>
        <Animated.View style={[nestedStyles.bar, barStyle]} />
      </View>
      <Pressable style={nestedStyles.btn} onPress={runChain}>
        <Text style={nestedStyles.btnText}>Run on UI thread</Text>
      </Pressable>
    </View>
  );
}

const nestedStyles = StyleSheet.create({
  section: { padding: 16, backgroundColor: '#16213e', borderRadius: 12, gap: 8 },
  title: { color: '#fff', fontWeight: '700', fontSize: 14 },
  result: { color: '#4ECDC4', fontSize: 12 },
  barBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  bar: { height: 8, backgroundColor: '#4ECDC4', borderRadius: 4 },
  btn: { backgroundColor: '#6C63FF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignSelf: 'flex-start' },
  btnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

// ─────────────────────────────────────────────────────────────
// 6. useAnimatedProps — 动态 TextInput 的 maxLength
// ─────────────────────────────────────────────────────────────
function AnimatedPropsDemo() {
  const toggle = useSharedValue(0);
  const [text, setText] = useState('');

  const animProps = useAnimatedProps(() => ({
    maxLength: toggle.value === 0 ? 10 : 50,
  }));

  // 自动切换 maxLength（无需点击）
  useEffect(() => {
    toggle.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.cubic) }),
      ),
      -1,
      false,
    );
  }, []);

  return (
    <View style={propsStyles.section}>
      <Text style={propsStyles.title}>Animated Props (maxLength)</Text>
      <AnimatedTextInput
        style={propsStyles.input}
        value={text}
        onChangeText={setText}
        animatedProps={animProps}
        placeholder="Type here..."
        placeholderTextColor="rgba(255,255,255,0.3)"
      />
      <Text style={propsStyles.hint}>
        Auto-toggling maxLength 10 ↔ 50 · typed {text.length}
      </Text>
    </View>
  );
}

const propsStyles = StyleSheet.create({
  section: { padding: 16, backgroundColor: '#0f3460', borderRadius: 12, gap: 8 },
  title: { color: '#fff', fontWeight: '700', fontSize: 14 },
  input: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 8, color: '#fff', paddingHorizontal: 12, paddingVertical: 8 },
  hint: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
});

// ─────────────────────────────────────────────────────────────
// 7. 动态增删的 Layout 动画列表
// ─────────────────────────────────────────────────────────────
function LayoutAnimList() {
  const [items, setItems] = useState<{ id: number; color: string }[]>(
    Array.from({ length: 5 }, (_, i) => ({ id: i, color: `hsl(${i * 60}, 70%, 50%)` })),
  );
  const nextId = useRef(5);

  const addItem = () => {
    const id = nextId.current++;
    setItems((prev) => [...prev, { id, color: `hsl(${(id * 47) % 360}, 70%, 50%)` }]);
  };
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // 自动增删条目（触发 Layout / entering / exiting 动画）
  useEffect(() => {
    const addTimer = setInterval(() => {
      const id = nextId.current++;
      setItems((prev) => {
        const next = [...prev, { id, color: `hsl(${(id * 47) % 360}, 70%, 50%)` }];
        if (next.length > 12) return next.slice(next.length - 12);
        return next;
      });
    }, 1500);

    const removeTimer = setInterval(() => {
      setItems((prev) => {
        if (prev.length <= 3) return prev;
        return prev.slice(1);
      });
    }, 2000);

    return () => {
      clearInterval(addTimer);
      clearInterval(removeTimer);
    };
  }, []);

  return (
    <View style={layoutStyles.section}>
      <View style={layoutStyles.header}>
        <Text style={layoutStyles.title}>Layout Animation List</Text>
        <Pressable style={layoutStyles.addBtn} onPress={addItem}>
          <Text style={layoutStyles.btnText}>+ Add</Text>
        </Pressable>
      </View>
      <View style={layoutStyles.list}>
        {items.map((it) => (
          <Animated.View
            key={it.id}
            entering={SlideInLeft.springify().damping(15)}
            exiting={SlideOutRight.duration(300)}
            layout={Layout.springify().damping(20)}
            style={[layoutStyles.item, { backgroundColor: it.color }]}
          >
            <Text style={layoutStyles.itemText}>#{it.id}</Text>
            <Pressable hitSlop={8} onPress={() => removeItem(it.id)}>
              <Text style={layoutStyles.del}>✕</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  section: { padding: 16, backgroundColor: '#1a1a2e', borderRadius: 12, gap: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontWeight: '700', fontSize: 14 },
  addBtn: { backgroundColor: '#6C63FF', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  list: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  itemText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  del: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
});

// ─────────────────────────────────────────────────────────────
// 8. measure + useAnimatedReaction
// ─────────────────────────────────────────────────────────────
function MeasureReactionDemo() {
  const aref = useAnimatedRef();
  const w = useSharedValue(80);
  const [label, setLabel] = useState('—');

  useAnimatedReaction(
    () => w.value,
    () => {
      const m = measure(aref);
      if (m !== null) {
        runOnJS(setLabel)(`measured: ${Math.round(m.width)}px`);
      }
    },
  );

  // 自动伸缩（无需点击按钮）
  useEffect(() => {
    w.value = withRepeat(
      withSequence(
        withSpring(200, SPRING_CONFIG),
        withSpring(60, SPRING_CONFIG),
      ),
      -1,
      false,
    );
  }, []);

  const style = useAnimatedStyle(() => ({ width: w.value }));

  return (
    <View style={measureStyles.section}>
      <Text style={measureStyles.title}>measure + useAnimatedReaction</Text>
      <Animated.View ref={aref} style={[measureStyles.box, style]} />
      <Text style={measureStyles.label}>{label}</Text>
    </View>
  );
}

const measureStyles = StyleSheet.create({
  section: { padding: 16, backgroundColor: '#16213e', borderRadius: 12, gap: 10 },
  title: { color: '#fff', fontWeight: '700', fontSize: 14 },
  box: { height: 60, backgroundColor: '#FF6584', borderRadius: 10 },
  label: { color: '#4ECDC4', fontSize: 12 },
});

// ─────────────────────────────────────────────────────────────
// 9. 粒子爆炸效果（Tap 触发）
// ─────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 12;

function ParticleBurst() {
  const burst = useSharedValue(0);
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);

  // 自动循环爆炸（也保留 Tap 手动触发）
  useEffect(() => {
    const trigger = () => {
      centerX.value = 40 + Math.random() * 200;
      centerY.value = 30 + Math.random() * 100;
      burst.value = 0;
      burst.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
    };
    trigger();
    const timer = setInterval(trigger, 1200);
    return () => clearInterval(timer);
  }, []);

  const tap = Gesture.Tap().onEnd((e) => {
    centerX.value = e.x;
    centerY.value = e.y;
    burst.value = 0;
    burst.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={particleStyles.area}>
        <Text style={particleStyles.hint}>Auto-bursting · or tap anywhere</Text>
        {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
          const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
          return (
            <Particle
              key={i}
              index={i}
              burst={burst}
              centerX={centerX}
              centerY={centerY}
              angle={angle}
            />
          );
        })}
      </Animated.View>
    </GestureDetector>
  );
}

function Particle({
  index,
  burst,
  centerX,
  centerY,
  angle,
}: {
  index: number;
  burst: Animated.SharedValue<number>;
  centerX: Animated.SharedValue<number>;
  centerY: Animated.SharedValue<number>;
  angle: number;
}) {
  const style = useAnimatedStyle(() => {
    const dist = burst.value * (60 + (index % 3) * 20);
    return {
      transform: [
        { translateX: centerX.value + Math.cos(angle) * dist },
        { translateY: centerY.value + Math.sin(angle) * dist },
        { scale: 1 - burst.value },
      ],
      opacity: 1 - burst.value,
    };
  });
  return <Animated.View style={[particleStyles.particle, style]} />;
}

const particleStyles = StyleSheet.create({
  area: {
    height: 160, backgroundColor: '#0f3460', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  hint: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
  particle: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFD93D' },
});

// ─────────────────────────────────────────────────────────────
// 10. 波形进度条（withRepeat + interpolateColor）
// ─────────────────────────────────────────────────────────────
function WaveProgressBar() {
  const progress = useSharedValue(0);

  // 自动循环（无需点击）
  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.cubic) }),
      ),
      -1,
      false,
    );
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: interpolateColor(progress.value, [0, 0.5, 1], ['#FF6B6B', '#FFD93D', '#4ECDC4']),
  }));

  const pctStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]),
  }));

  return (
    <View style={waveStyles.section}>
      <Text style={waveStyles.title}>Wave Progress Bar</Text>
      <View style={waveStyles.track}>
        <Animated.View style={[waveStyles.fill, barStyle]} />
      </View>
      <Animated.Text style={[waveStyles.pct, pctStyle]}>
        {Math.round(progress.value * 100)}%
      </Animated.Text>
    </View>
  );
}

const waveStyles = StyleSheet.create({
  section: { padding: 16, backgroundColor: '#1a1a2e', borderRadius: 12, gap: 10 },
  title: { color: '#fff', fontWeight: '700', fontSize: 14 },
  track: { height: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden' },
  fill: { height: 16, borderRadius: 8 },
  pct: { color: '#4ECDC4', fontSize: 13, fontWeight: '600', textAlign: 'center' },
});

// ─────────────────────────────────────────────────────────────
// 主页面
// ─────────────────────────────────────────────────────────────
export default function App() {
  const gridData = useMemo(() => Array.from({ length: GRID_COUNT }, (_, i) => i), []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* 标题区 */}
        <View style={styles.header}>
          <Text style={styles.title}>FsTest · Complex Reanimated Stress</Text>
          <Text style={styles.subtitle}>
            {GRID_COUNT} grid nodes · 10 sections · all auto-running · exit to trigger crash
          </Text>
        </View>

        {/* 1. 网格动画 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1 · Animation Grid ({GRID_COUNT})</Text>
          <View style={styles.grid}>
            {gridData.map((i) => (
              <GridBox key={i} index={i} active={true} />
            ))}
          </View>
        </View>

        {/* 2. 可拖拽卡片 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2 · Drag & Snap</Text>
          <View style={styles.dragArea}>
            <DraggableCard />
          </View>
        </View>

        {/* 3. 滚动驱动头部 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3 · Scroll-Driven Header</Text>
          <ScrollDrivenHeader />
        </View>

        {/* 4. 帧回调 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4 · Frame Callback</Text>
          <FrameCallbackBalls />
        </View>

        {/* 5. 嵌套 worklet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5 · Nested Worklet Chain</Text>
          <NestedWorkletChain />
        </View>

        {/* 6. Animated Props */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6 · Animated Props</Text>
          <AnimatedPropsDemo />
        </View>

        {/* 7. Layout 动画列表 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7 · Layout Animation List</Text>
          <LayoutAnimList />
        </View>

        {/* 8. measure + reaction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8 · measure + AnimatedReaction</Text>
          <MeasureReactionDemo />
        </View>

        {/* 9. 粒子爆炸 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9 · Particle Burst (Tap)</Text>
          <ParticleBurst />
        </View>

        {/* 10. 波形进度条 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10 · Wave Progress</Text>
          <WaveProgressBar />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d1a' },
  content: { padding: 16, gap: 16 },
  header: { alignItems: 'center', paddingVertical: 12 },
  title: { color: '#fff', fontSize: 18, fontWeight: '800' },
  subtitle: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 4 },
  section: { gap: 8 },
  sectionTitle: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  dragArea: {
    height: 200, backgroundColor: '#16213e', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
});
