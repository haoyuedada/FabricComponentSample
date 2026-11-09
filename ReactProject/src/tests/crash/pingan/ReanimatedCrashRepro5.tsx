/**
 * Reanimated ShareableWorklet 深度递归崩溃复现 Demo (v5 — 多策略综合)
 *
 * === 两份崩溃日志的关键发现 ===
 *
 * 日志1 (pingan-zong.txt): 进程生命周期仅9秒，约10层 worklet 嵌套
 *   #42→#39→...→#18: Worklet→Object→Object→Worklet 重复 ~8 次
 *   #15: ShareableHandle::toJSValue (来自 useSharedValue)
 *   #14: ShareableObject::toJSValue (ShareableHandle 的 initializer_)
 *   #13: ShareableWorklet::toJSValue+256 ← 崩溃点 (getValueUnpacker(rt).call())
 *
 * 日志2 (pingan-e1c5af0b): 仅约4层 worklet 嵌套，无 ShareableHandle
 *   #22→#19→#16: Worklet→Object→Object→Worklet 重复 3 次
 *   #13: ShareableWorklet::toJSValue+256 ← 崩溃点 (getValueUnpacker(rt).call())
 *
 * 关键：
 * 1. 崩溃地址 @0x0 — NULL 指针解引用
 * 2. 崩溃都在 ShareableWorklet::toJSValue+256 = getValueUnpacker(rt).call(rt, obj)
 * 3. 都通过 EventLoopTaskRunner::executeTask → runGuarded → toJSValue
 * 4. 日志2 只有4层就崩溃，说明不是栈溢出，而是运行时状态问题
 * 5. runGuarded 中 `jsi::Runtime &rt = *runtime_` 无 null 检查
 * 6. getValueUnpacker(rt) 调用 rt.global().getProperty("__valueUnpacker")
 *    如果 runtime 已被 invalidate/reset，访问已释放内存 → NULL
 *
 * === 本 demo 的多策略 ===
 *
 * 策略A：深层 worklet __closure 引用链（结构匹配）
 * 策略B：快速 mount/unmount 触发 invalidate 与 scheduleOnUI 竞态
 * 策略C：高频 runOnUI 调度大量 worklet
 * 策略D：useAnimatedReaction 链 + 共享值快速更新
 * 策略E：在组件卸载瞬间调度 worklet
 */

import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
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
  cancelAnimation,
} from 'react-native-reanimated';

// ============================================================
// 策略A：worklet __closure 引用链
// ============================================================

/**
 * 递归创建 worklet 链，每层捕获下一层 worklet 作为闭包变量
 * 产生：ShareableWorklet → ShareableObject(__closure) → ShareableWorklet → ...
 */
function createWorkletChain(sv: Animated.SharedValue<number>, depth: number): () => number {
  if (depth <= 0) {
    const inner = (): number => {
      'worklet';
      return sv.value; // 捕获 sv (ShareableHandle)
    };
    return inner;
  }
  const child = createWorkletChain(sv, depth - 1);
  const current = (): number => {
    'worklet';
    const _child = child; // 捕获 child → 进入 __closure
    return _child() + 1;
  };
  return current;
}

/**
 * 变体：闭包中包含对象，对象中包含 worklet
 * 产生：Worklet → Object(__closure) → Object(wrapper) → Worklet
 */
function createWrappedChain(sv: Animated.SharedValue<number>, depth: number): () => number {
  if (depth <= 0) {
    const inner = (): number => {
      'worklet';
      return sv.value;
    };
    return inner;
  }
  const child = createWrappedChain(sv, depth - 1);
  const wrapper = {
    handler: child,
    config: {duration: depth * 100},
    data: [child, {nested: child}],
  };
  const current = (): number => {
    'worklet';
    const _w = wrapper; // 捕获 wrapper → __closure 中有 Object → Object → Worklet
    return _w.handler() + depth;
  };
  return current;
}

// ============================================================
// 策略B+C：快速 mount/unmount + 高频 runOnUI
// ============================================================
const StressChild: React.FC<{id: number; depth: number}> = ({id, depth}) => {
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(1);
  const sv3 = useSharedValue(2);
  const animVal = useSharedValue(0);
  const trigger = useSharedValue(0);

  // 动画
  useEffect(() => {
    animVal.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 300}),
        withTiming(-100, {duration: 300}),
      ),
      -1,
      true,
    );
    return () => {
      cancelAnimation(animVal);
    };
  }, []);

  // 高频调度 worklet 链到 UI 线程
  useEffect(() => {
    const interval = setInterval(() => {
      sv1.value = Math.random() * 1000;
      sv2.value = Math.random() * 500;
      sv3.value = Math.random() * 2000;

      // 创建多层 worklet 链并调度
      const chain1 = createWorkletChain(sv1, depth);
      const chain2 = createWrappedChain(sv2, depth);
      const chain3 = createWorkletChain(sv3, depth + 3);

      runOnUI(chain1)();
      runOnUI(chain2)();
      runOnUI(chain3)();

      // 内联 worklet 捕获多个外部 worklet（增加 __closure 深度）
      runOnUI(() => {
        'worklet';
        const _c1 = chain1;
        const _c2 = chain2;
        const _c3 = chain3;
        trigger.value = (_c1() + _c2() + _c3()) * 0.001;
      })();

      // 再调度一个捕获 shared values 的 worklet
      runOnUI(() => {
        'worklet';
        const _s1 = sv1;
        const _s2 = sv2;
        const _s3 = sv3;
        animVal.value = (_s1.value + _s2.value + _s3.value) * 0.01;
      })();
    }, 3); // 3ms 极高频

    return () => clearInterval(interval);
  }, [depth]);

  // useAnimatedReaction 链
  useAnimatedReaction(
    () => {'worklet'; return trigger.value;},
    (v) => {'worklet'; sv1.value = v * 100;},
  );

  const style = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {translateX: animVal.value},
        {translateY: sv1.value * 0.2},
        {scale: 1 + sv2.value * 0.005},
        {rotate: `${sv3.value * 0.02}deg`},
      ],
      opacity: interpolate(sv3.value, [0, 2000], [0.3, 1], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View style={[styles.box, style]}>
      <Text style={styles.boxText}>#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 策略D：reaction 链 + 高频更新
// ============================================================
const ReactionChainChild: React.FC<{id: number}> = ({id}) => {
  const base = useSharedValue(0);
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(0);
  const sv3 = useSharedValue(0);
  const sv4 = useSharedValue(0);
  const sv5 = useSharedValue(0);
  const out = useSharedValue(0);

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
      base.value = Math.random() * 10000;
    }, 5);

    // 调度捕获所有 shared values 的 worklet
    const interval2 = setInterval(() => {
      runOnUI(() => {
        'worklet';
        const _b = base;
        const _s1 = sv1;
        const _s2 = sv2;
        const _s3 = sv3;
        const _s4 = sv4;
        const _s5 = sv5;
        const _o = out;
        base.value = (_b.value + _s1.value + _s2.value + _s3.value + _s4.value + _s5.value + _o.value) * 0.0001;
      })();
    }, 8);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      {translateX: sv1.value * 0.05},
      {translateY: sv2.value * 0.05},
      {scale: 1 + sv3.value * 0.0005},
      {rotate: `${sv4.value * 0.01}deg`},
    ],
    opacity: interpolate(out.value, [0, 50000], [0.3, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[styles.boxR, style]}>
      <Text style={styles.boxText}>R#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 策略E：卸载瞬间调度 worklet（制造竞态）
// ============================================================
const UnmountRacer: React.FC<{id: number; depth: number}> = ({id, depth}) => {
  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withRepeat(withTiming(100, {duration: 200}), -1, true);

    const interval = setInterval(() => {
      // 在每次调度前创建新的 worklet 链
      const chain = createWorkletChain(sv, depth);
      const wrapped = createWrappedChain(sv, depth);

      // 高频调度
      runOnUI(chain)();
      runOnUI(wrapped)();
      runOnUI(() => {
        'worklet';
        const _c = chain;
        const _w = wrapped;
        const _s = sv;
        sv.value = (_c() + _w() + _s.value) * 0.001;
      })();
    }, 2);

    // 卸载清理：在 cleanup 中也调度 worklet（可能在 runtime invalidate 后执行）
    return () => {
      clearInterval(interval);
      cancelAnimation(sv);

      // 关键：在 cleanup 中调度 worklet — 这可能在 invalidate 后执行
      const lastChain = createWorkletChain(sv, depth + 5);
      runOnUI(lastChain)();
      runOnUI(() => {
        'worklet';
        const _c = lastChain;
        return _c();
      })();
    };
  }, [depth]);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: sv.value}, {scale: 1 + sv.value * 0.01}],
  }));

  return (
    <Animated.View style={[styles.boxE, style]}>
      <Text style={styles.boxText}>E#{id}</Text>
    </Animated.View>
  );
};

// ============================================================
// 主组件
// ============================================================
const ReanimatedCrashRepro5: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [autoMode, setAutoMode] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [childCount, setChildCount] = useState(12);
  const [chainDepth, setChainDepth] = useState(8);
  const [strategy, setStrategy] = useState<'mixed' | 'stress' | 'reaction' | 'unmount'>('mixed');
  const [logLines, setLogLines] = useState<string[]>([]);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const log = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLogLines((prev) => [`[${ts}] ${msg}`, ...prev].slice(0, 6));
  }, []);

  // 自动模式：快速 mount/unmount
  useEffect(() => {
    if (!autoMode) {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
      return;
    }
    log(`自动模式启动 (15ms cycle, depth=${chainDepth}, ${strategy})`);
    autoTimerRef.current = setInterval(() => {
      setMounted((prev) => !prev);
      setCycle((prev) => prev + 1);
    }, 15); // 15ms 极快
    return () => {
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [autoMode, chainDepth, strategy]);

  const renderChildren = () => {
    const children: React.ReactNode[] = [];
    for (let i = 0; i < childCount; i++) {
      const key = `${cycle}-${i}-${strategy}`;
      if (strategy === 'stress') {
        children.push(<StressChild key={key} id={i} depth={chainDepth} />);
      } else if (strategy === 'reaction') {
        children.push(<ReactionChainChild key={key} id={i} />);
      } else if (strategy === 'unmount') {
        children.push(<UnmountRacer key={key} id={i} depth={chainDepth} />);
      } else {
        // mixed
        if (i % 3 === 0) {
          children.push(<StressChild key={key} id={i} depth={chainDepth} />);
        } else if (i % 3 === 1) {
          children.push(<ReactionChainChild key={key} id={i} />);
        } else {
          children.push(<UnmountRacer key={key} id={i} depth={chainDepth} />);
        }
      }
    }
    return children;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated Crash Repro v5</Text>
      <Text style={styles.subtitle}>多策略：闭包链 + 快速卸载 + 高频调度 + 竞态</Text>

      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          C:{cycle} M:{mounted ? 'Y' : 'N'} N:{childCount} D:{chainDepth} {strategy}
        </Text>
      </View>

      <View style={styles.btnRow}>
        <Button title="▶ Start" onPress={() => {log('start'); setAutoMode(true);}} color="#e94560" />
        <Button title="■ Stop" onPress={() => {log('stop'); setAutoMode(false); setMounted(true);}} color="#0f3460" />
        <Button title="Toggle" onPress={() => {setMounted(p=>!p); setCycle(p=>p+1); log('toggle');}} color="#16213e" />
      </View>

      <View style={styles.btnRow}>
        <Button title="+D" onPress={() => {setChainDepth(d=>d+2); log(`depth→${chainDepth+2}`);}} color="#0f3460" />
        <Button title="-D" onPress={() => {setChainDepth(d=>Math.max(2,d-2)); log(`depth→${Math.max(2,chainDepth-2)}`);}} color="#0f3460" />
        <Button title="+N" onPress={() => setChildCount(c=>c+4)} color="#0f3460" />
        <Button title="-N" onPress={() => setChildCount(c=>Math.max(2,c-4))} color="#0f3460" />
      </View>

      <View style={styles.btnRow}>
        <Button title={strategy==='mixed'?'[Mixed]':'Mixed'} onPress={() => setStrategy('mixed')} color={strategy==='mixed'?'#e94560':'#333'} />
        <Button title={strategy==='stress'?'[Stress]':'Stress'} onPress={() => setStrategy('stress')} color={strategy==='stress'?'#e94560':'#333'} />
        <Button title={strategy==='reaction'?'[React]':'React'} onPress={() => setStrategy('reaction')} color={strategy==='reaction'?'#e94560':'#333'} />
        <Button title={strategy==='unmount'?'[Unmount]':'Unmount'} onPress={() => setStrategy('unmount')} color={strategy==='unmount'?'#e94560':'#333'} />
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
        策略A: worklet __closure 引用链 (depth={chainDepth}){'\n'}
        策略B: 15ms 快速 mount/unmount → invalidate 竞态{'\n'}
        策略C: 2-3ms 高频 runOnUI{'\n'}
        策略D: useAnimatedReaction 6层链{'\n'}
        策略E: cleanup 中调度 worklet{'\n'}
        崩溃点: getValueUnpacker(rt).call(rt, obj) → @0x0 NULL
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
  box: {width:45, height:45, backgroundColor:'#e94560', borderRadius:8, justifyContent:'center', alignItems:'center', margin:3},
  boxR: {width:45, height:45, backgroundColor:'#16a085', borderRadius:8, justifyContent:'center', alignItems:'center', margin:3},
  boxE: {width:45, height:45, backgroundColor:'#f39c12', borderRadius:8, justifyContent:'center', alignItems:'center', margin:3},
  boxText: {color:'#fff', fontSize:9, fontWeight:'bold'},
  footer: {fontSize:9, color:'#666', textAlign:'center', marginTop:8},
});

export default ReanimatedCrashRepro5;
