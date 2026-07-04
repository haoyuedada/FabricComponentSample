/**
 * Reanimated ShareableWorklet 递归崩溃复现 Demo (增强版)
 *
 * 目标崩溃：
 *   SIGSEGV(SEGV_MAPERR)@0x0  in libhermes.so
 *   触发路径：librnoh_reanimated.so 中 ShareableWorklet::toJSValue ↔
 *   ShareableObject::toJSValue 深度递归，中间夹杂 ShareableHandle::toJSValue
 *
 * 崩溃栈关键特征（pingan-zong.txt）：
 *   #45 rnoh::EventLoopTaskRunner::executeTask()        ← UI 线程任务
 *   #44 reanimated 内部 (runGuarded)
 *   #43 reanimated 内部 (runOnRuntimeGuarded)
 *   #42 ShareableWorklet::toJSValue+188                 ← 最外层 worklet
 *   #41 ShareableObject::toJSValue+184
 *   #40 ShareableObject::toJSValue+184
 *   #39 ShareableWorklet::toJSValue+188                 ← 第二层 worklet
 *   ...  (Worklet / Object 交替递归 ~10 层) ...
 *   #15 ShareableHandle::toJSValue+76                   ← ShareableHandle (__init 对象)
 *   #14 ShareableObject::toJSValue+184
 *   #13 ShareableWorklet::toJSValue+256                 ← 最内层，已执行到 getValueUnpacker().call()
 *   #00-#12 libhermes.so                                ← __valueUnpacker JS 函数执行时崩溃
 *
 * 根因分析：
 *   1. Worklet 闭包捕获了深层嵌套的 Shareable 对象图（包含其他 worklet + ShareableHandle）
 *   2. 当 worklet 通过 runOnUI 调度到 UI 线程执行时，toJSValue() 递归展开整个对象图
 *   3. 递归深度过大（或存在循环引用），导致 Hermes 栈溢出或内部状态损坏
 *   4. ShareableHandle::toJSValue 会调用 getValueUnpacker(rt).call(rt, initObj)，
 *      如果 runtime 状态异常（如正在销毁），Hermes 内部访问 NULL 指针
 *
 * 复现策略（三管齐下）：
 *   策略 A：深层 worklet 引用链 — worklet 闭包捕获其他 worklet，形成 3+ 层嵌套
 *   策略 B：ShareableHandle 注入 — 通过 useAnimatedScrollHandler / 手动构造 __init 对象
 *   策略 C：竞态窗口 — 高频 runOnUI + 快速挂载/卸载，在 runtime teardown 时触发崩溃
 */

import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedRef,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  runOnUI,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

// ============================================================
// 工具函数：构造深层嵌套的纯对象（增加 ShareableObject::toJSValue 遍历深度）
// ============================================================
function createDeepObject(depth: number): any {
  if (depth <= 0) {
    return {
      v: Math.random(),
      s: 'leaf_' + depth,
      t: Date.now(),
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
      meta: {a: 1, b: 2, c: 3, d: {e: 4, f: 5}},
    };
  }
  return {
    left: createDeepObject(depth - 1),
    right: createDeepObject(depth - 1),
    center: createDeepObject(depth - 1),
    info: {
      id: depth,
      name: 'node_' + depth,
      values: Array.from({length: 8}, (_, i) => i * depth),
      nested: {x: depth, y: depth * 2, z: depth * 3},
    },
  };
}

// ============================================================
// 策略 A：深层 worklet 引用链
//
// 构造 workletD → workletC → workletB → workletA 的捕获链
// 每层 worklet 都捕获下一层 worklet + 复杂对象
// 这模拟了崩溃栈中 4 层 ShareableWorklet::toJSValue 的递归
// ============================================================
function createDeepWorkletChain() {
  const data1 = createDeepObject(3);
  const data2 = createDeepObject(3);
  const data3 = createDeepObject(3);

  // 最内层 worklet — 捕获复杂对象
  const workletD = (d: any) => {
    'worklet';
    const _d = d;
    return _d?.v ?? Math.random();
  };

  // 第三层 worklet — 捕获 workletD + 复杂对象
  const workletC = (d: any, inner: any) => {
    'worklet';
    const _d = d;
    const _inner = inner;
    const r = _inner(_d?.left ?? {v: 0});
    return r + (_d?.info?.id ?? 0);
  };

  // 第二层 worklet — 捕获 workletC + 复杂对象
  const workletB = (d: any, inner: any) => {
    'worklet';
    const _d = d;
    const _inner = inner;
    const r = _inner(_d, workletD);
    return r;
  };

  // 最外层 worklet — 捕获 workletB + 两个复杂对象
  // 这个 worklet 会被 runOnUI 调度到 UI 线程
  // 它的 toJSValue 会递归展开 workletB → workletC → workletD 的整个捕获链
  const workletA = () => {
    'worklet';
    const _d1 = data1;
    const _d2 = data2;
    const _d3 = data3;
    const r1 = workletB(_d1, workletC);
    const r2 = workletC(_d2, workletD);
    const r3 = workletD(_d3?.left ?? {v: 0});
    return r1 + r2 + r3;
  };

  return workletA;
}

// ============================================================
// 策略 B：手动构造 ShareableHandle（带 __init 属性的对象）
//
// 在 reanimated 的 makeShareableClone 中，带 __init 属性的对象
// 会被创建为 ShareableHandle。ShareableHandle::toJSValue 会调用
// getValueUnpacker(rt).call(rt, initObj)，对应崩溃栈帧 #15。
// ============================================================
function createShareableHandleLike(data: any) {
  // 构造一个带 __init 的对象，模拟 ShareableHandle 的创建
  // reanimated 内部会将其识别为 ShareableHandle
  return {
    __init: true,
    data: data,
    timestamp: Date.now(),
  };
}

// ============================================================
// 策略 C 子组件：集成 scroll handler + 动画 + 深层 worklet
//
// useAnimatedScrollHandler 内部会创建 ShareableHandle
// useAnimatedReaction 创建 worklet 反应链
// 这些组合在一起，在 toJSValue 时形成深度递归
// ============================================================
const CrashChildA: React.FC<{id: number; cycle: number}> = ({
  id,
  cycle,
}) => {
  const scrollRef = useAnimatedRef<ScrollView>();
  const scrollY = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const offset = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  // useAnimatedScrollHandler 创建 ShareableHandle（对应栈帧 #15）
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      'worklet';
      scrollY.value = event.contentOffset.y;
      scrollX.value = event.contentOffset.x;
      // 在 scroll handler 中调用深层 worklet 链
      offset.value = event.contentOffset.y * 0.5;
    },
    onBeginDrag: (event) => {
      'worklet';
      offset.value = event.contentOffset.y;
    },
    onEndDrag: (event) => {
      'worklet';
      offset.value = withTiming(event.contentOffset.y, {duration: 300});
    },
    onMomentumBegin: (event) => {
      'worklet';
      scale.value = withTiming(0.9, {duration: 200});
    },
    onMomentumEnd: (event) => {
      'worklet';
      scale.value = withTiming(1, {duration: 200});
    },
  });

  // useAnimatedReaction 创建 worklet 反应链
  // reaction 的 worklet 捕获了 scrollY，而 scrollY 的更新来自 scrollHandler
  // 这形成了 worklet → shareable → worklet 的引用链
  useAnimatedReaction(
    () => {
      'worklet';
      return scrollY.value + scrollX.value;
    },
    (value) => {
      'worklet';
      rotation.value = interpolate(
        value,
        [0, 100, 200, 300],
        [0, 45, 90, 180],
        Extrapolation.CLAMP,
      );
      opacity.value = interpolate(
        value,
        [0, 50, 100],
        [1, 0.5, 0.3],
        Extrapolation.CLAMP,
      );
    },
  );

  // useDerivedValue 链 — 派生值捕获其他 shared values
  const derived1 = useDerivedValue(() => {
    'worklet';
    return offset.value * 2 + scrollY.value;
  });
  const derived2 = useDerivedValue(() => {
    'worklet';
    return derived1.value * 0.5 + scale.value;
  });
  const derived3 = useDerivedValue(() => {
    'worklet';
    return derived2.value + rotation.value;
  });

  // 启动循环动画
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, {duration: 300}),
        withTiming(0.5, {duration: 300}),
      ),
      -1,
      true,
    );
    rotation.value = withRepeat(withTiming(360, {duration: 2000}), -1, false);
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {duration: 150}),
        withTiming(1, {duration: 150}),
      ),
      -1,
      true,
    );
  }, []);

  // 高频 runOnUI 调度深层 worklet 链
  useEffect(() => {
    const interval = setInterval(() => {
      // 每次创建新的深层 worklet 链
      const chainWorklet = createDeepWorkletChain();

      // 构造带 ShareableHandle 的复杂对象
      const handleData = createShareableHandleLike(createDeepObject(2));

      runOnUI(() => {
        'worklet';
        // 执行深层 worklet 链 — 触发 ShareableWorklet::toJSValue 递归
        const result = chainWorklet();

        // 访问 handle 对象 — 触发 ShareableHandle::toJSValue
        const _h = handleData;

        // 用结果更新 shared value
        offset.value = (result % 100) * 0.01;
      })();
    }, 8); // 每 8ms 调度一次

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {translateY: offset.value},
        {scale: scale.value * derived2.value},
        {rotate: `${rotation.value}deg`},
      ],
      opacity: opacity.value * derived3.value * 0.5 + 0.5,
    };
  });

  return (
    <View style={styles.childWrapper}>
      <Animated.View style={[styles.childBox, animatedStyle]}>
        <Text style={styles.childText}>A#{id}</Text>
      </Animated.View>
    </View>
  );
};

// ============================================================
// 策略 C 子组件变体：纯 runOnUI 高频调度 + 深层 worklet
// 不使用 scroll handler，专注于 worklet 嵌套递归
// ============================================================
const CrashChildB: React.FC<{id: number; cycle: number}> = ({id, cycle}) => {
  const val = useSharedValue(0);
  const val2 = useSharedValue(0);

  useEffect(() => {
    val.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 200}),
        withTiming(-100, {duration: 200}),
      ),
      -1,
      true,
    );
    val2.value = withRepeat(withTiming(1, {duration: 500}), -1, true);

    // 高频调度：每 5ms 一次
    const interval = setInterval(() => {
      const deepData = createDeepObject(4);
      const handleObj = createShareableHandleLike(createDeepObject(2));

      // 构造 3 层嵌套的 inline worklet
      runOnUI(() => {
        'worklet';
        // 内联 worklet 捕获外部复杂对象 + handle
        const _data = deepData;
        const _handle = handleObj;

        const innerWorklet = (d: any) => {
          'worklet';
          return d?.v ?? Math.random();
        };

        const midWorklet = (d: any, fn: any) => {
          'worklet';
          const _fn = fn;
          return _fn(d?.left) + (d?.info?.id ?? 0);
        };

        const outerWorklet = (d: any, fn: any) => {
          'worklet';
          const _fn = fn;
          return _fn(d, innerWorklet);
        };

        const result = outerWorklet(_data, midWorklet);
        val.value = (result % 50) * 0.02;
      })();
    }, 5);

    // 第二个高频调度器
    const interval2 = setInterval(() => {
      const data = createDeepObject(3);
      runOnUI(() => {
        'worklet';
        const _d = data;
        // 构造嵌套对象，包含 worklet 属性
        const nested = {
          level1: {
            level2: {
              level3: {
                worklet: (x: number) => {
                  'worklet';
                  return x * 2;
                },
                data: _d,
              },
              data: _d?.left,
            },
            data: _d?.right,
          },
          handle: createShareableHandleLike(_d),
        };
        // 访问嵌套属性触发 toJSValue
        const _touch = nested.level1.level2.level3.worklet(1);
        val2.value = _touch * 0.01;
      })();
    }, 3);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: val.value}, {scale: val2.value}],
  }));

  return (
    <Animated.View style={[styles.childBoxB, style]}>
      <Text style={styles.childText}>B#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 策略 C 子组件变体：useAnimatedReaction 链 + withDelay
// 构造 worklet 反应链，形成多层 worklet 依赖
// ============================================================
const CrashChildC: React.FC<{id: number; cycle: number}> = ({id, cycle}) => {
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(0);
  const sv3 = useSharedValue(0);
  const sv4 = useSharedValue(0);
  const sv5 = useSharedValue(0);

  // 链式 reaction：sv1 → sv2 → sv3 → sv4 → sv5
  // 每个 reaction 的 worklet 捕获前一个 shared value
  useAnimatedReaction(
    () => sv1.value,
    (v) => {
      'worklet';
      sv2.value = v * 2;
    },
  );
  useAnimatedReaction(
    () => sv2.value,
    (v) => {
      'worklet';
      sv3.value = v * 0.5;
    },
  );
  useAnimatedReaction(
    () => sv3.value,
    (v) => {
      'worklet';
      sv4.value = v + 1;
    },
  );
  useAnimatedReaction(
    () => sv4.value,
    (v) => {
      'worklet';
      sv5.value = v * 3;
    },
  );

  useEffect(() => {
    // 高频更新 sv1，触发整条 reaction 链
    const interval = setInterval(() => {
      sv1.value = Math.random() * 100;
    }, 10);

    // 同时高频调度深层 worklet
    const interval2 = setInterval(() => {
      const data = createDeepObject(3);
      runOnUI(() => {
        'worklet';
        const _d = data;
        // 访问 sv5（链尾），触发整条 reaction 链的 worklet 序列化
        const _v = sv5.value;
        sv1.value = (_v + (_d?.v ?? 0)) * 0.01;
      })();
    }, 7);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      {translateX: sv1.value},
      {translateY: sv2.value},
      {scale: 1 + sv3.value * 0.01},
      {rotate: `${sv4.value}deg`},
    ],
    opacity: 0.5 + sv5.value * 0.005,
  }));

  return (
    <Animated.View style={[styles.childBoxC, style]}>
      <Text style={styles.childText}>C#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 主组件：控制面板 + 快速挂载/卸载区域
// ============================================================
const ReanimatedCrashRepro2: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [autoMode, setAutoMode] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [childCount, setChildCount] = useState(4);
  const [strategy, setStrategy] = useState<'A' | 'B' | 'C' | 'mixed'>('mixed');
  const [logLines, setLogLines] = useState<string[]>([]);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const log = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLogLines((prev) => [`[${ts}] ${msg}`, ...prev].slice(0, 8));
  }, []);

  // 自动模式：快速反复挂载/卸载
  useEffect(() => {
    if (!autoMode) {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      return;
    }

    log('启动自动挂载/卸载模式 (30ms 间隔)');
    autoTimerRef.current = setInterval(() => {
      setMounted((prev) => !prev);
      setCycle((prev) => prev + 1);
    }, 30); // 30ms 切换一次 — 比原 demo 更激进

    return () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [autoMode]);

  const handleStart = useCallback(() => {
    log('开始压力测试');
    setAutoMode(true);
  }, [log]);

  const handleStop = useCallback(() => {
    log('停止压力测试');
    setAutoMode(false);
    setMounted(true);
  }, [log]);

  const handleToggle = useCallback(() => {
    setMounted((prev) => !prev);
    setCycle((prev) => prev + 1);
  }, []);

  const handleStrategyChange = useCallback(
    (s: 'A' | 'B' | 'C' | 'mixed') => {
      log(`切换策略: ${s}`);
      setStrategy(s);
      setMounted(true);
      setCycle((prev) => prev + 1);
    },
    [log],
  );

  // 渲染子组件
  const renderChildren = () => {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < childCount; i++) {
      const key = `c-${cycle}-${i}`;
      let type: 'A' | 'B' | 'C';
      if (strategy === 'mixed') {
        type = (['A', 'B', 'C'] as const)[i % 3];
      } else {
        type = strategy as 'A' | 'B' | 'C';
      }
      if (type === 'A') {
        children.push(<CrashChildA key={key} id={i} cycle={cycle} />);
      } else if (type === 'B') {
        children.push(<CrashChildB key={key} id={i} cycle={cycle} />);
      } else {
        children.push(<CrashChildC key={key} id={i} cycle={cycle} />);
      }
    }
    return children;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated Crash Repro v2</Text>
      <Text style={styles.subtitle}>
        ShareableWorklet::toJSValue 深度递归崩溃
      </Text>

      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Cycle: {cycle} | Mounted: {mounted ? 'YES' : 'NO'} | Children:{' '}
          {childCount} | Strategy: {strategy}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button title="▶ Start" onPress={handleStart} color="#e94560" />
        <Button title="■ Stop" onPress={handleStop} color="#0f3460" />
        <Button title="Toggle" onPress={handleToggle} color="#16213e" />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Strategy A"
          onPress={() => handleStrategyChange('A')}
          color={strategy === 'A' ? '#e94560' : '#555'}
        />
        <Button
          title="Strategy B"
          onPress={() => handleStrategyChange('B')}
          color={strategy === 'B' ? '#e94560' : '#555'}
        />
        <Button
          title="Strategy C"
          onPress={() => handleStrategyChange('C')}
          color={strategy === 'C' ? '#e94560' : '#555'}
        />
        <Button
          title="Mixed"
          onPress={() => handleStrategyChange('mixed')}
          color={strategy === 'mixed' ? '#e94560' : '#555'}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="+ Children"
          onPress={() => setChildCount((c) => c + 2)}
          color="#0f3460"
        />
        <Button
          title="- Children"
          onPress={() => setChildCount((c) => Math.max(1, c - 2))}
          color="#0f3460"
        />
      </View>

      {/* 日志区域 */}
      <View style={styles.logArea}>
        {logLines.map((line, i) => (
          <Text key={i} style={styles.logText}>
            {line}
          </Text>
        ))}
      </View>

      {/* 动画区域 */}
      <View style={styles.animationArea}>
        {mounted && renderChildren()}
      </View>

      {/* 底部说明 */}
      <Text style={styles.footer}>
        策略 A: scroll handler + reaction 链 + 深层 worklet{'\n'}
        策略 B: 纯 runOnUI 高频调度 + 内联嵌套 worklet{'\n'}
        策略 C: useAnimatedReaction 链式反应{'\n'}
        Mixed: 三种策略混合
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e94560',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusBar: {
    backgroundColor: '#16213e',
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  statusText: {
    color: '#e8e8e8',
    fontSize: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },
  logArea: {
    backgroundColor: '#0f3460',
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 50,
    maxHeight: 100,
  },
  logText: {
    color: '#0f0',
    fontSize: 10,
    fontFamily: 'monospace',
  },
  animationArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a1a',
    borderRadius: 8,
    padding: 8,
  },
  childWrapper: {
    margin: 4,
  },
  childBox: {
    width: 50,
    height: 50,
    backgroundColor: '#e94560',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childBoxB: {
    width: 50,
    height: 50,
    backgroundColor: '#0f3460',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  childBoxC: {
    width: 50,
    height: 50,
    backgroundColor: '#16a085',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  childText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ReanimatedCrashRepro2;
