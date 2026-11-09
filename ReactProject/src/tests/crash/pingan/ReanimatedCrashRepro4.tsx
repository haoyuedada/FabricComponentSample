/**
 * Reanimated ShareableWorklet 深度递归崩溃复现 Demo (v4 — 闭包结构精确匹配)
 *
 * === 之前 demo 没崩溃的根本原因 ===
 *
 * reanimated 的 babel 插件会把 worklet 函数转换为：
 *   function fn(...) { ... }
 *   fn.__closure = { 外部变量1: 值1, 外部变量2: 值2, ... }
 *   fn.__workletHash = hash
 *   fn.__initData = { code, ... }
 *
 * 当 worklet 被 makeShareableCloneRecursive 序列化为 ShareableWorklet 时：
 *   ShareableWorklet.data_ = [
 *     ["__closure", ShareableObject],    ← __closure 是普通对象
 *     ["__workletHash", ShareableScalar],
 *     ["__initData", ShareableObject],
 *   ]
 *
 * toJSValue 递归展开：
 *   ShareableWorklet::toJSValue
 *     → ShareableObject::toJSValue (遍历 data_)
 *       → 遇到 __closure 属性 → ShareableObject::toJSValue (展开 __closure)
 *         → 遇到捕获的变量值
 *
 * 崩溃栈 #42→#41→#40→#39 模式 = Worklet→Object(data_)→Object(__closure)→Worklet
 * 这意味着：__closure 中有一个变量的值本身也是一个 worklet（带 __workletHash）
 *
 * 要产生这个模式，必须让 worklet A 的闭包变量直接引用 worklet B。
 * worklet B 的闭包变量又引用 worklet C... 形成链。
 *
 * 之前 demo 的问题：
 *   1. 在 worklet 内部定义的 worklet（如 const fn = () => {'worklet'; ...}）
 *      不会被放入外部 worklet 的 __closure —— 它们是内部变量，不是捕获变量
 *   2. 必须在 worklet 外部定义 worklet，然后在外部 worklet 中引用它
 *   3. ShareableHandle 来自 useSharedValue，但必须被 worklet 闭包捕获
 *
 * === 本 demo 的精确复现策略 ===
 *
 * 在组件渲染期间（JS 线程）定义一组 worklet，形成引用链：
 *   innerWorklet = () => {'worklet'; return sv.value}  ← 捕获 shared value (ShareableHandle)
 *   midWorklet = () => {'worklet'; return innerWorklet()}  ← 闭包捕获 innerWorklet
 *   outerWorklet = () => {'worklet'; return midWorklet()}  ← 闭包捕获 midWorklet
 *
 * 序列化链：
 *   outerWorklet.__closure = { innerWorklet: midWorklet }
 *     → ShareableWorklet(outer)
 *       → ShareableObject(__closure)
 *         → ShareableWorklet(mid)
 *           → ShareableObject(__closure)
 *             → ShareableWorklet(inner)
 *               → ShareableObject(__closure)
 *                 → ShareableHandle(sv)  ← useSharedValue 创建的
 *
 * 这精确匹配崩溃栈：
 *   Worklet → Object → Worklet → Object → Worklet → Object → Handle
 *
 * 配合高频 runOnUI + 快速卸载触发竞态崩溃。
 */

import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  useDerivedValue,
  withTiming,
  withRepeat,
  withSequence,
  runOnUI,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

// ============================================================
// 核心：在模块级/渲染级定义 worklet 引用链
//
// 关键：这些 worklet 必须引用外部作用域的变量（被 babel 捕获到 __closure）
// 而不是在 worklet 内部定义新的 worklet
// ============================================================

/**
 * 创建一个 worklet 链：outer → mid → inner → sharedValue
 *
 * 每个 worklet 引用下一个 worklet（外部作用域变量），
 * babel 会将下一个 worklet 放入当前 worklet 的 __closure。
 */
function createWorkletChain(sv: Animated.SharedValue<number>, depth: number): () => number {
  if (depth <= 0) {
    // 最内层 worklet — 捕获 shared value（ShareableHandle）
    const inner = (): number => {
      'worklet';
      return sv.value;
    };
    return inner;
  }

  // 递归创建下一层 worklet
  const child = createWorkletChain(sv, depth - 1);

  // 当前层 worklet — 闭包捕获 child（另一个 worklet）
  // babel 会将 child 放入此 worklet 的 __closure
  const current = (): number => {
    'worklet';
    const _child = child; // 引用外部变量 child → 进入 __closure
    return _child() + 1;
  };
  return current;
}

/**
 * 变体：worklet 闭包捕获一个包含另一个 worklet 的对象
 * 产生 Worklet → Object(__closure) → Object(wrapper) → Worklet 模式
 */
function createWorkletChainWithWrapper(
  sv: Animated.SharedValue<number>,
  depth: number,
): () => number {
  if (depth <= 0) {
    const inner = (): number => {
      'worklet';
      return sv.value;
    };
    return inner;
  }

  const child = createWorkletChainWithWrapper(sv, depth - 1);

  // wrapper 是普通对象，包含 child worklet
  // 这会在 __closure 中产生 Object → Object → Worklet 的嵌套
  const wrapper = {
    handler: child,
    config: {duration: 300, easing: 'ease'},
    meta: {id: depth, name: `level_${depth}`},
  };

  const current = (): number => {
    'worklet';
    // 引用外部变量 wrapper → 进入 __closure
    // wrapper.handler 是另一个 worklet
    const _w = wrapper;
    return _w.handler() + depth;
  };
  return current;
}

// ============================================================
// 子组件：worklet 链 + 高频调度 + 快速卸载
// ============================================================
const ChainChild: React.FC<{id: number; cycle: number; depth: number}> = ({
  id,
  cycle,
  depth,
}) => {
  // useSharedValue 创建 ShareableHandle（通过 makeMutable）
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(1);
  const sv3 = useSharedValue(2);
  const animVal = useSharedValue(0);

  useEffect(() => {
    // 启动循环动画
    animVal.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 400}),
        withTiming(-100, {duration: 400}),
      ),
      -1,
      true,
    );

    // 高频调度：每 5ms 创建新的 worklet 链并调度到 UI 线程
    const interval = setInterval(() => {
      sv1.value = Math.random() * 100;
      sv2.value = Math.random() * 50;
      sv3.value = Math.random() * 200;

      // 创建深层 worklet 链（每次创建新的引用）
      const chain1 = createWorkletChain(sv1, depth);
      const chain2 = createWorkletChainWithWrapper(sv2, depth);
      const chain3 = createWorkletChain(sv3, depth + 2);

      // 调度到 UI 线程 — toJSValue 会递归展开整个 worklet 链
      runOnUI(chain1)();
      runOnUI(chain2)();
      runOnUI(chain3)();

      // 额外调度一个内联 worklet，它闭包捕获 chain1（外部 worklet）
      runOnUI(() => {
        'worklet';
        // 引用外部变量 chain1, chain2, chain3 → 进入 __closure
        // 这些都是 worklet，__closure 中包含 3 个 ShareableWorklet
        const _c1 = chain1;
        const _c2 = chain2;
        const _c3 = chain3;
        animVal.value = (_c1() + _c2() + _c3()) * 0.001;
      })();
    }, 5);

    return () => clearInterval(interval);
  }, [depth]);

  const style = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {translateX: animVal.value},
        {translateY: sv1.value * 0.3},
        {scale: 1 + sv2.value * 0.01},
      ],
      opacity: interpolate(sv3.value, [0, 200], [0.3, 1], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View style={[styles.box, style]}>
      <Text style={styles.boxText}>#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 子组件 B：useAnimatedReaction 链（每个 reaction 捕获前一个的 shared value）
// ============================================================
const ReactionChild: React.FC<{id: number; cycle: number}> = ({id, cycle}) => {
  const base = useSharedValue(0);
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(0);
  const sv3 = useSharedValue(0);
  const sv4 = useSharedValue(0);
  const sv5 = useSharedValue(0);
  const out = useSharedValue(0);

  // 每层 reaction 捕获下游 shared value
  useAnimatedReaction(
    () => {'worklet'; return base.value;},
    (v) => {'worklet'; sv1.value = v + 1;},
  );
  useAnimatedReaction(
    () => {'worklet'; return sv1.value;},
    (v) => {'worklet'; sv2.value = v * 2;},
  );
  useAnimatedReaction(
    () => {'worklet'; return sv2.value;},
    (v) => {'worklet'; sv3.value = v - 1;},
  );
  useAnimatedReaction(
    () => {'worklet'; return sv3.value;},
    (v) => {'worklet'; sv4.value = v * 3;},
  );
  useAnimatedReaction(
    () => {'worklet'; return sv4.value;},
    (v) => {'worklet'; sv5.value = v + 1;},
  );
  useAnimatedReaction(
    () => {'worklet'; return sv5.value;},
    (v) => {'worklet'; out.value = v + base.value;},
  );

  useEffect(() => {
    const interval = setInterval(() => {
      base.value = Math.random() * 1000;
    }, 8);

    // 高频调度一个 worklet，它闭包捕获所有 shared values
    const interval2 = setInterval(() => {
      runOnUI(() => {
        'worklet';
        // 所有 sv 都是外部变量 → 进入 __closure
        // 每个 sv 都是 ShareableHandle
        const _b = base;
        const _s1 = sv1;
        const _s2 = sv2;
        const _s3 = sv3;
        const _s4 = sv4;
        const _s5 = sv5;
        const _o = out;
        base.value = (_b.value + _s1.value + _s2.value + _s3.value + _s4.value + _s5.value + _o.value) * 0.001;
      })();
    }, 10);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      {translateX: sv1.value * 0.1},
      {translateY: sv2.value * 0.1},
      {scale: 1 + sv3.value * 0.001},
      {rotate: `${sv4.value * 0.05}deg`},
    ],
    opacity: interpolate(out.value, [0, 2000], [0.3, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[styles.boxR, style]}>
      <Text style={styles.boxText}>R#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 主组件
// ============================================================
const ReanimatedCrashRepro4: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [autoMode, setAutoMode] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [childCount, setChildCount] = useState(8);
  const [chainDepth, setChainDepth] = useState(6);
  const [mixed, setMixed] = useState(true);
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
    log(`自动模式启动 (20ms, depth=${chainDepth})`);
    autoTimerRef.current = setInterval(() => {
      setMounted((prev) => !prev);
      setCycle((prev) => prev + 1);
    }, 20); // 20ms — 非常激进
    return () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [autoMode, chainDepth]);

  const renderChildren = () => {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < childCount; i++) {
      const key = `${cycle}-${i}`;
      if (mixed && i % 2 === 1) {
        children.push(<ReactionChild key={key} id={i} cycle={cycle} />);
      } else {
        children.push(
          <ChainChild key={key} id={i} cycle={cycle} depth={chainDepth} />,
        );
      }
    }
    return children;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated Crash Repro v4</Text>
      <Text style={styles.subtitle}>
        Worklet __closure 引用链 → toJSValue 深度递归
      </Text>

      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Cycle:{cycle} | Mounted:{mounted ? 'Y' : 'N'} | Kids:
          {childCount} | Depth:{chainDepth} | {mixed ? 'mixed' : 'chain'}
        </Text>
      </View>

      <View style={styles.btnRow}>
        <Button title="▶ Start" onPress={() => {log('start'); setAutoMode(true);}} color="#e94560" />
        <Button title="■ Stop" onPress={() => {log('stop'); setAutoMode(false); setMounted(true);}} color="#0f3460" />
        <Button title="Toggle" onPress={() => {setMounted(p=>!p); setCycle(p=>p+1);}} color="#16213e" />
      </View>

      <View style={styles.btnRow}>
        <Button title="+Depth" onPress={() => {setChainDepth(d=>d+2); log(`depth=${chainDepth+2}`);}} color="#0f3460" />
        <Button title="-Depth" onPress={() => {setChainDepth(d=>Math.max(2,d-2)); log(`depth=${Math.max(2,chainDepth-2)}`);}} color="#0f3460" />
        <Button title="+Kids" onPress={() => setChildCount(c=>c+4)} color="#0f3460" />
        <Button title="-Kids" onPress={() => setChildCount(c=>Math.max(2,c-4))} color="#0f3460" />
      </View>

      <View style={styles.btnRow}>
        <Button title={mixed ? 'Mixed ON' : 'Mixed OFF'} onPress={() => setMixed(m=>!m)} color={mixed?'#e94560':'#555'} />
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
        深层 worklet __closure 引用链：outer→mid→inner→SharedValue(ShareableHandle){'\n'}
        每个 worklet 闭包捕获下一个 worklet → toJSValue 递归展开整条链{'\n'}
        高频 runOnUI(5ms) + 快速卸载(20ms) 制造竞态
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
  box: {width:50, height:50, backgroundColor:'#e94560', borderRadius:8, justifyContent:'center', alignItems:'center', margin:4},
  boxR: {width:50, height:50, backgroundColor:'#16a085', borderRadius:8, justifyContent:'center', alignItems:'center', margin:4},
  boxText: {color:'#fff', fontSize:10, fontWeight:'bold'},
  footer: {fontSize:9, color:'#666', textAlign:'center', marginTop:8},
});

export default ReanimatedCrashRepro4;
