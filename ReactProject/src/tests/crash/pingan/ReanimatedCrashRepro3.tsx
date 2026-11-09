/**
 * Reanimated ShareableWorklet 深度递归崩溃复现 Demo (v3 — 精确匹配栈结构)
 *
 * === 崩溃栈精确结构分析 ===
 *
 * pingan-zong.txt 栈帧 #13-#42 的精确模式：
 *
 *   #42 Worklet::toJSValue+188  ← worklet W0
 *   #41 Object::toJSValue+184
 *   #40 Object::toJSValue+184
 *   #39 Worklet::toJSValue+188  ← worklet W1
 *   #38 Object::toJSValue+184
 *   #37 Object::toJSValue+184
 *   #36 Worklet::toJSValue+188  ← worklet W2
 *   ... (重复 5 次) ...
 *   #15 Handle::toJSValue+76    ← ShareableHandle (useSharedValue 的 makeMutable)
 *   #14 Object::toJSValue+184
 *   #13 Worklet::toJSValue+256  ← 最内层，进入 getValueUnpacker().call()
 *
 * 关键模式：每个 Worklet 帧后面跟 **两个** Object 帧，再下一个 Worklet。
 * 这意味着：worklet 的 data_ 中有一个属性是普通 Object，
 * 该 Object 又有一个属性是普通 Object，该 Object 的属性是下一个 worklet。
 *
 *   W0.data_ = { closure: { wrapper: { fn: <W1> } } }
 *                ↓ Object          ↓ Object       ↓ Worklet
 *
 * === 之前 demo 没崩溃的原因 ===
 *
 * 1. worklet 闭包直接捕获另一个 worklet（W0 直接引用 W1），
 *    产生的是 Worklet→Worklet，缺少中间的两个 Object 层
 * 2. {__init: true} 不是真正的 ShareableHandle —— ShareableHandle 需要
 *    __init 是一个 function 且该 function 是 worklet（有 __workletHash）
 * 3. useSharedValue 内部通过 makeMutable 创建真正的 ShareableHandle，
 *    其 __init 是 worklet，会在 UI 线程被 valueUnpacker 调用
 *
 * === 本 demo 的复现策略 ===
 *
 * 策略 1：构造 Worklet→{obj}→{obj}→Worklet 的嵌套结构
 *   每层 worklet 闭包捕获一个 wrapper 对象，wrapper 内含另一个 wrapper，
 *   最内层是下一个 worklet。精确匹配栈中双 Object 帧。
 *
 * 策略 2：useSharedValue 创建真正的 ShareableHandle
 *   useSharedValue → makeMutable → makeShareableCloneRecursive({__init: worklet})
 *   当这个 shared value 被 worklet 捕获并在 UI 线程展开时，
 *   ShareableHandle::toJSValue 被调用，匹配栈帧 #15。
 *
 * 策略 3：高频 runOnUI + 快速卸载制造竞态
 *   组件卸载后，已调度到 UI 线程队列的 worklet 仍会执行 toJSValue，
 *   此时如果 RN runtime 正在销毁，Hermes 访问无效内存。
 */

import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  useAnimatedRef,
  useDerivedValue,
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
// 策略 1：构造 Worklet → {obj} → {obj} → Worklet 嵌套链
//
// 精确匹配崩溃栈中每个 Worklet 帧后跟两个 Object 帧的模式。
// worklet 闭包捕获 wrapper 对象，wrapper 包含 inner wrapper，
// inner wrapper 包含下一个 worklet。
// ============================================================

// 最内层 worklet — 它会捕获 shared values（ShareableHandle）
function makeInnerWorklet(sv: Animated.SharedValue<number>) {
  'worklet';
  // 直接捕获 shared value —— 这会在 toJSValue 时触发 ShareableHandle::toJSValue
  const _sv = sv;
  return _sv.value + 1;
}

// 第二层 worklet — 闭包捕获 wrapper 对象 { inner: { fn: innerWorklet } }
function makeMidWorklet(sv: Animated.SharedValue<number>) {
  'worklet';
  // wrapper 是普通对象 → ShareableObject
  // inner 也是普通对象 → ShareableObject
  // fn 是 worklet → ShareableWorklet
  // 这样 toJSValue 顺序：Worklet(this) → Object(wrapper) → Object(inner) → Worklet(fn)
  const wrapper = {
    inner: {
      fn: (s: Animated.SharedValue<number>) => {
        'worklet';
        return s.value * 2;
      },
      data: {x: 1, y: 2},
    },
    extra: {a: 1, b: 2, c: 3},
  };
  const _sv = sv;
  return wrapper.inner.fn(_sv) + wrapper.extra.a;
}

// 外层 worklet — 闭包捕获更深层的 wrapper
function makeOuterWorklet(sv: Animated.SharedValue<number>) {
  'worklet';
  const wrapper = {
    layer1: {
      layer2: {
        layer3: {
          fn: (s: Animated.SharedValue<number>) => {
            'worklet';
            return s.value + 100;
          },
        },
        data: [1, 2, 3, 4, 5],
      },
      meta: {name: 'outer', id: 42},
    },
    svRef: sv, // 捕获 shared value —— ShareableHandle
  };
  return wrapper.layer1.layer2.layer3.fn(wrapper.svRef);
}

// ============================================================
// 子组件 A：深层 worklet 嵌套 + shared value 捕获
// ============================================================
const DeepWorkletChild: React.FC<{id: number; cycle: number}> = ({
  id,
  cycle,
}) => {
  // 每个 useSharedValue 创建一个 ShareableHandle (通过 makeMutable)
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(1);
  const sv3 = useSharedValue(2);
  const animVal = useSharedValue(0);

  // useAnimatedRef 也创建 ShareableHandle
  const aRef = useAnimatedRef<View>();

  useEffect(() => {
    // 启动循环动画
    animVal.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 300}),
        withTiming(-100, {duration: 300}),
      ),
      -1,
      true,
    );

    // 高频 runOnUI：每 6ms 调度一次
    // 每次调度构造新的 worklet 引用，捕获 shared values
    const interval = setInterval(() => {
      sv1.value = Math.random() * 100;
      sv2.value = Math.random() * 50;
      sv3.value = Math.random() * 200;

      // 调度外层 worklet —— 它会递归展开整个 wrapper → layer → fn 结构
      runOnUI(() => {
        'worklet';
        // 构造多层嵌套：Worklet → Object → Object → Worklet → Object → Object → Worklet
        const result1 = makeOuterWorklet(sv1);
        const result2 = makeMidWorklet(sv2);
        const result3 = makeInnerWorklet(sv3);

        // 再构造一层更深嵌套的 inline worklet
        const deepWrapper = {
          a: {
            b: {
              c: {
                worklet: (x: number) => {
                  'worklet';
                  // 捕获外部 shared values —— ShareableHandle
                  return x + sv1.value + sv2.value;
                },
              },
            },
          },
        };
        const r4 = deepWrapper.a.b.c.worklet(result1);

        animVal.value = (result1 + result2 + result3 + r4) * 0.001;
      })();
    }, 6);

    return () => clearInterval(interval);
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: animVal.value}, {translateY: sv1.value * 0.5}],
    opacity: interpolate(sv2.value, [0, 50], [0.3, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View ref={aRef} style={[styles.boxA, style]}>
      <Text style={styles.boxText}>#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 子组件 B：useAnimatedReaction 链 + shared value 捕获
//
// useAnimatedReaction 的 reaction worklet 捕获 shared value，
// 当 shared value 更新时，worklet 的 toJSValue 被调用，
// 其闭包中的 shared value 是 ShareableHandle。
// ============================================================
const ReactionChainChild: React.FC<{id: number; cycle: number}> = ({
  id,
  cycle,
}) => {
  const base = useSharedValue(0);
  const r1 = useSharedValue(0);
  const r2 = useSharedValue(0);
  const r3 = useSharedValue(0);
  const r4 = useSharedValue(0);
  const out = useSharedValue(0);

  // 链式 reaction：base → r1 → r2 → r3 → r4 → out
  // 每个 reaction 的 worklet 捕获前一个 shared value（ShareableHandle）
  useAnimatedReaction(
    () => {
      'worklet';
      return base.value;
    },
    (v) => {
      'worklet';
      // 捕获 r1（ShareableHandle），写入 r1
      r1.value = v + 1;
    },
  );
  useAnimatedReaction(
    () => {
      'worklet';
      return r1.value;
    },
    (v) => {
      'worklet';
      r2.value = v * 2;
    },
  );
  useAnimatedReaction(
    () => {
      'worklet';
      return r2.value;
    },
    (v) => {
      'worklet';
      r3.value = v - 1;
    },
  );
  useAnimatedReaction(
    () => {
      'worklet';
      return r3.value;
    },
    (v) => {
      'worklet';
      r4.value = v * 3;
    },
  );
  useAnimatedReaction(
    () => {
      'worklet';
      return r4.value;
    },
    (v) => {
      'worklet';
      out.value = v + base.value;
    },
  );

  useEffect(() => {
    // 高频更新 base，触发整条 reaction 链
    const interval = setInterval(() => {
      base.value = Math.random() * 1000;
    }, 8);

    // 同时高频 runOnUI 调度，捕获链上所有 shared values
    const interval2 = setInterval(() => {
      runOnUI(() => {
        'worklet';
        // 这个 worklet 捕获了 6 个 shared values
        // 每个 shared value 都是 ShareableHandle
        // toJSValue 时会递归展开所有 ShareableHandle
        const wrapper = {
          sv1: base,
          sv2: r1,
          sv3: r2,
          sv4: r3,
          sv5: r4,
          sv6: out,
          nested: {
            fn: () => {
              'worklet';
              return base.value + out.value;
            },
          },
        };
        base.value = (wrapper.sv6.value + wrapper.nested.fn()) * 0.001;
      })();
    }, 10);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      {translateX: r1.value * 0.1},
      {translateY: r2.value * 0.1},
      {scale: 1 + r3.value * 0.001},
      {rotate: `${r4.value * 0.1}deg`},
    ],
    opacity: interpolate(out.value, [0, 100], [0.3, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[styles.boxB, style]}>
      <Text style={styles.boxText}>R#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 子组件 C：快速创建/销毁大量 shared values + worklets
//
// 这个组件专注于制造大量 ShareableHandle 对象，
// 并在卸载时让 UI 线程仍在处理排队的 worklet。
// ============================================================
const BurstChild: React.FC<{id: number; cycle: number}> = ({id, cycle}) => {
  const animVal = useSharedValue(0);

  useEffect(() => {
    // 在挂载时立即调度大量 worklet
    for (let i = 0; i < 20; i++) {
      const localSv = useSharedValue ? null : null; // placeholder
      runOnUI(() => {
        'worklet';
        // 构造深层嵌套结构
        const w = {
          l1: {
            l2: {
              l3: {
                fn: (x: number) => {
                  'worklet';
                  return x + Math.random();
                },
              },
            },
          },
        };
        animVal.value = w.l1.l2.l3.fn(i);
      })();
    }

    const interval = setInterval(() => {
      // 每次构造新的 worklet 并立即调度
      runOnUI(() => {
        'worklet';
        const nested = {
          a: {b: {c: {d: {e: {fn: (x: number) => {'worklet'; return x * 2;}}}}}},
        };
        animVal.value = nested.a.b.c.d.e.fn(1);
      })();
    }, 4);

    return () => clearInterval(interval);
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: animVal.value}, {scale: 1 + animVal.value * 0.01}],
  }));

  return (
    <Animated.View style={[styles.boxC, style]}>
      <Text style={styles.boxText}>B#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 主组件
// ============================================================
const ReanimatedCrashRepro3: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [autoMode, setAutoMode] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [childCount, setChildCount] = useState(6);
  const [strategy, setStrategy] = useState<'deep' | 'reaction' | 'burst' | 'mixed'>(
    'mixed',
  );
  const [logLines, setLogLines] = useState<string[]>([]);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const log = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLogLines((prev) => [`[${ts}] ${msg}`, ...prev].slice(0, 6));
  }, []);

  useEffect(() => {
    if (!autoMode) {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      return;
    }
    log('启动自动模式 (25ms)');
    autoTimerRef.current = setInterval(() => {
      setMounted((prev) => !prev);
      setCycle((prev) => prev + 1);
    }, 25);
    return () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [autoMode]);

  const renderChildren = () => {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < childCount; i++) {
      const key = `${cycle}-${i}`;
      let type: 'deep' | 'reaction' | 'burst';
      if (strategy === 'mixed') {
        type = (['deep', 'reaction', 'burst'] as const)[i % 3];
      } else {
        type = strategy as 'deep' | 'reaction' | 'burst';
      }
      if (type === 'deep') {
        children.push(<DeepWorkletChild key={key} id={i} cycle={cycle} />);
      } else if (type === 'reaction') {
        children.push(<ReactionChainChild key={key} id={i} cycle={cycle} />);
      } else {
        children.push(<BurstChild key={key} id={i} cycle={cycle} />);
      }
    }
    return children;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated Crash Repro v3</Text>
      <Text style={styles.subtitle}>
        ShareableWorklet::toJSValue 深度递归 + ShareableHandle
      </Text>

      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Cycle:{cycle} | Mounted:{mounted ? 'Y' : 'N'} | Children:
          {childCount} | Strategy:{strategy}
        </Text>
      </View>

      <View style={styles.btnRow}>
        <Button title="▶ Start" onPress={() => {log('start'); setAutoMode(true);}} color="#e94560" />
        <Button title="■ Stop" onPress={() => {log('stop'); setAutoMode(false); setMounted(true);}} color="#0f3460" />
        <Button title="Toggle" onPress={() => {setMounted(p=>!p); setCycle(p=>p+1);}} color="#16213e" />
      </View>

      <View style={styles.btnRow}>
        <Button title="Deep" onPress={() => {log('strategy: deep'); setStrategy('deep'); setMounted(true); setCycle(p=>p+1);}} color={strategy==='deep'?'#e94560':'#555'} />
        <Button title="Reaction" onPress={() => {log('strategy: reaction'); setStrategy('reaction'); setMounted(true); setCycle(p=>p+1);}} color={strategy==='reaction'?'#e94560':'#555'} />
        <Button title="Burst" onPress={() => {log('strategy: burst'); setStrategy('burst'); setMounted(true); setCycle(p=>p+1);}} color={strategy==='burst'?'#e94560':'#555'} />
        <Button title="Mixed" onPress={() => {log('strategy: mixed'); setStrategy('mixed'); setMounted(true); setCycle(p=>p+1);}} color={strategy==='mixed'?'#e94560':'#555'} />
      </View>

      <View style={styles.btnRow}>
        <Button title="+Kids" onPress={() => setChildCount(c=>c+3)} color="#0f3460" />
        <Button title="-Kids" onPress={() => setChildCount(c=>Math.max(1,c-3))} color="#0f3460" />
      </View>

      <View style={styles.logArea}>
        {logLines.map((line, i) => (
          <Text key={i} style={styles.logText}>{line}</Text>
        ))}
      </View>

      <View style={styles.animArea}>
        {mounted && renderChildren()}
      </View>

      <Text style={styles.footer}>
        Deep: Worklet→Obj→Obj→Worklet 嵌套 + SharedValue(ShareableHandle) 捕获{'\n'}
        Reaction: useAnimatedReaction 5 层链 + 6 个 SharedValue 捕获{'\n'}
        Burst: 快速批量调度深层嵌套 worklet
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex:1, padding:12, backgroundColor:'#1a1a2e'},
  title: {fontSize:18, fontWeight:'bold', color:'#e94560', textAlign:'center'},
  subtitle: {fontSize:11, color:'#aaa', textAlign:'center', marginBottom:8},
  statusBar: {backgroundColor:'#16213e', padding:6, borderRadius:4, marginBottom:8},
  statusText: {color:'#e8e8e8', fontSize:11, textAlign:'center'},
  btnRow: {flexDirection:'row', justifyContent:'space-around', marginBottom:6},
  logArea: {backgroundColor:'#0f3460', padding:6, borderRadius:4, marginBottom:8, minHeight:40, maxHeight:80},
  logText: {color:'#0f0', fontSize:10, fontFamily:'monospace'},
  animArea: {flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'center', alignItems:'center', backgroundColor:'#0a0a1a', borderRadius:8, padding:8},
  boxA: {width:50, height:50, backgroundColor:'#e94560', borderRadius:8, justifyContent:'center', alignItems:'center', margin:4},
  boxB: {width:50, height:50, backgroundColor:'#0f3460', borderRadius:8, justifyContent:'center', alignItems:'center', margin:4},
  boxC: {width:50, height:50, backgroundColor:'#16a085', borderRadius:8, justifyContent:'center', alignItems:'center', margin:4},
  boxText: {color:'#fff', fontSize:10, fontWeight:'bold'},
  footer: {fontSize:9, color:'#666', textAlign:'center', marginTop:8},
});

export default ReanimatedCrashRepro3;
