import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import {
  executeOnUIRuntimeSync,
  runOnUI,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  cancelAnimation,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  default as Animated,
} from 'react-native-reanimated';

/**
 * 最简 Demo：走进 ShareableWorklet::toJSValue
 *
 * executeOnUIRuntimeSync 在 UI Runtime 执行 worklet，
 * 执行完毕后通过 shareableResult->toJSValue(rt) 将结果序列化回 JS Runtime。
 * worklet 返回另一个 worklet → 进入 ShareableWorklet::toJSValue 分支。
 */
const getWorkletFromUI = executeOnUIRuntimeSync((): ((v: number) => number) => {
  'worklet';
  return (v: number) => {
    'worklet';
    console.log('worklet called with:', v);
    return v * 2;
  };
});

/**
 * Demo：走进 ShareableHandle::toJSValue
 *
 * executeOnUIRuntimeSync 的 worklet 返回一个带 __init 属性的对象。
 * 在 UI Runtime 上，makeShareableCloneOnUIRecursive 会遍历该对象属性并调用
 * _makeShareableClone(toAdapt, value)；C++ 侧 makeShareableClone 检测到对象
 * 没有 __workletHash 但有 __init 属性 → 创建 ShareableHandle（Shareables.cpp
 * `else if (!object.getProperty(rt, "__init").isUndefined())`）。
 *
 * 结果序列化回 JS Runtime 时，WorkletRuntime::executeSync 调用
 * shareableResult->toJSValue(rt) → ShareableHandle::toJSValue：
 *   1. initializer_->toJSValue(rt)  —— ShareableObject::toJSValue，遍历属性
 *      其中 __init 是 ShareableWorklet → 进入 ShareableWorklet::toJSValue
 *   2. getValueUnpacker(rt).call(rt, initObj, "Handle")
 *      JS 侧 valueUnpacker 检测到 __init → 调用 objectToUnpack.__init() 返回值
 *
 * 这条路径对应崩溃日志 frame #15 ShareableHandle::toJSValue。
 */
const getHandleFromUI = executeOnUIRuntimeSync((): {__init: () => string} => {
  'worklet';
  return {
    __init: () => {
      'worklet';
      // __init worklet 在 JS Runtime 上被 valueUnpacker 调用重建并执行，
      // 返回值即为该 Handle 在 JS 侧的代表值。
      return 'handle-initialized-from-ui';
    },
  };
});

// ============================================================
// 完整堆栈模拟：pingan-zong.txt 的崩溃栈结构
// ============================================================
//
// 崩溃栈（从崩溃点 #13 往上读到根 #15）：
//   #13 ShareableWorklet::toJSValue+256   ← 最内层 worklet，crash 点
//   #14 ShareableObject::toJSValue+184    ← 遍历 worklet 的 data_ 属性
//   #15 ShareableHandle::toJSValue+76     ← initializer_->toJSValue(rt)
//   #16 ShareableObject::toJSValue+184    ← 遍历某对象属性，找到 Handle
//   #17 ShareableObject::toJSValue+184    ← 遍历嵌套对象属性
//   #18 ShareableWorklet::toJSValue+188   ← ShareableObject::toJSValue(rt)
//   #19 ShareableObject::toJSValue+184    ← 遍历 worklet 的 data_ 属性
//   #20 ShareableObject::toJSValue+184    ← 遍历 __closure 嵌套对象
//   #21 ShareableWorklet::toJSValue+188
//   ... (Worklet → Object → Object → Worklet 重复 ~8 次)
//   #45 EventLoopTaskRunner::executeTask   ← UI 线程调度
//
// 结构解读：
//   顶层 = executeOnUIRuntimeSync 的 worklet，其 __closure 捕获了一个
//          深层 worklet 链，链的末端是一个 useSharedValue (ShareableHandle)
//
//   Worklet(+188)→Object→Object→Worklet(+188) 循环 = worklet __closure 中
//   的包装对象(wrapper)包含另一个 worklet，形成多层链
//
//   链末端 Object→Object→Handle→Object→Worklet(+256) = __closure 嵌套对象
//   中引用了 useSharedValue 创建的 ShareableHandle，其 initializer_ 包含
//   一个 ShareableWorklet (__init)，展开时进入 +256 分支 crash
//
// 要模拟此堆栈，需要：
//   1. 用 useSharedValue 创建 ShareableHandle（makeMutableNative → {__init}）
//   2. 创建 worklet __closure 引用链（每层捕获下一层 worklet）
//   3. 链末端 worklet 捕获 shared value (ShareableHandle)
//   4. executeOnUIRuntimeSync 执行顶层 worklet，结果序列化时递归展开整条链
//
// 配合快速 mount/unmount + 高频调度制造 runtime 竞态（日志显示进程仅存活 9s）

/**
 * 递归创建 worklet __closure 引用链
 * 每层 worklet 的 __closure 捕获下一层 worklet（外部作用域变量）
 * 产生：ShareableWorklet → ShareableObject(__closure) → ShareableWorklet → ...
 */
function createWorkletChain(
  sv: {value: number},
  depth: number,
): () => number {
  if (depth <= 0) {
    // 最内层 worklet — 捕获 shared value（ShareableHandle）
    const inner = (): number => {
      'worklet';
      return sv.value; // 引用外部 sv → 进入 __closure
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
 * 变体：闭包中包含对象，对象中包含 worklet
 * 产生：Worklet → Object(__closure) → Object(wrapper) → Worklet
 * 精确匹配崩溃栈 Worklet→Object→Object→Worklet 的 +188/+184 模式
 */
function createWrappedChain(
  sv: {value: number},
  depth: number,
): () => number {
  if (depth <= 0) {
    const inner = (): number => {
      'worklet';
      return sv.value;
    };
    return inner;
  }
  const child = createWrappedChain(sv, depth - 1);
  // wrapper 是普通对象，包含 child worklet + 嵌套对象
  // 这会在 __closure 中产生 Object → Object → Worklet 的嵌套
  const wrapper = {
    handler: child,
    config: {duration: depth * 100, nested: {level: depth}},
    data: [child, {nested: child}],
  };
  const current = (): number => {
    'worklet';
    const _w = wrapper; // 引用外部变量 wrapper → __closure 中有 Object → Object → Worklet
    return _w.handler() + depth;
  };
  return current;
}

/**
 * executeOnUIRuntimeSync 版：worklet 闭包捕获 worklet 链 + shared value
 *
 * executeSync → runGuarded(shareableWorklet)
 *   → shareableWorklet->toJSValue(uiRuntime)  ← 递归在此触发
 *     → ShareableWorklet::toJSValue (顶层 worklet，展开 __closure)
 *       → ShareableObject::toJSValue (__closure)
 *         → ShareableObject::toJSValue (wrapper)
 *           → ShareableWorklet::toJSValue (child worklet)
 *             → ... 递归 ...
 *               → ShareableHandle::toJSValue (useSharedValue)
 *                 → ShareableWorklet::toJSValue+256 (crash)
 *
 * 注意：崩溃栈 frame #45 显示 EventLoopTaskRunner::executeTask → runGuarded
 * → toJSValue，说明实际崩溃发生在 runOnUI 异步调度路径（非 executeSync）。
 * 但 executeOnUIRuntimeSync 也经过 runGuarded → toJSValue，可触发相同递归。
 */
const getChainResultFromUI = executeOnUIRuntimeSync(
  (sv: {value: number}, depth: number): number => {
    'worklet';
    // 在 UI 上构建 worklet 链并执行
    // createWorkletChain 返回的 worklet 闭包捕获了 sv (ShareableHandle)
    const chain = createWorkletChain(sv, depth);
    return chain();
  },
);

// ============================================================
// 竞态子组件：快速 mount/unmount + 高频 runOnUI + 卸载后调度
// ============================================================
//
// 崩溃根因分析（对比 LOG.txt 与 pingan-zong.txt）：
//
// LOG.txt 显示 demo 成功触发了完整的递归 toJSValue 链
// （Worklet→Object→Object→Worklet→...→Handle→Worklet），
// 但没有崩溃 — 因为 runtime 始终有效，递归正常完成。
//
// pingan-zong.txt 崩溃点：
//   #13 ShareableWorklet::toJSValue+256 = getValueUnpacker(rt).call(rt, obj)
//   崩溃地址 @0x0 = NULL 指针解引用
//   崩溃在主线程（Tid=42454=主线程），通过 EventLoopTaskRunner::executeTask
//   进程仅存活 9 秒 — 启动阶段快速 mount/unmount
//
// 根因：不是递归深度导致栈溢出（日志2只有4层也崩了），
// 而是 **runtime invalidate 竞态**：
//   1. 组件 mount 时 scheduleOnUI(worklet) 将任务放入 event loop
//   2. 组件快速 unmount → UI runtime 被 invalidate/释放
//   3. event loop 中的待执行任务仍被 EventLoopTaskRunner::executeTask 调度
//   4. runGuarded → shareableWorklet->toJSValue(rt)
//   5. getValueUnpacker(rt) → rt.global().getProperty("__valueUnpacker")
//      → rt 已被释放 → 访问无效内存 → NULL → SEGV
//
// 要复现此崩溃，需要：
//   A. 快速 mount/unmount 子组件（15ms cycle）→ 制造 runtime invalidate
//   B. 子组件存活期间高频 runOnUI 深层 worklet 链 → 任务堆积在 event loop
//   C. 子组件卸载 cleanup 中也调度 worklet → 制造 invalidate 后调度竞态
//   D. 多个子组件同时存活 → 增加 event loop 任务密度
const UnmountRacer: React.FC<{id: number; depth: number}> = ({id, depth}) => {
  const sv1 = useSharedValue(0);
  const sv2 = useSharedValue(1);
  const animVal = useSharedValue(0);
  const trigger = useSharedValue(0);

  // 循环动画
  useEffect(() => {
    animVal.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 300}),
        withTiming(-100, {duration: 300}),
      ),
      -1,
      true,
    );
    return () => cancelAnimation(animVal);
  }, []);

  // 高频调度 worklet 链到 UI 线程
  useEffect(() => {
    const interval = setInterval(() => {
      sv1.value = Math.random() * 1000;
      sv2.value = Math.random() * 500;
      const chain1 = createWorkletChain(sv1, depth);
      const chain2 = createWrappedChain(sv2, depth);
      runOnUI(chain1)();
      runOnUI(chain2)();
      // 内联 worklet 捕获多个外部 worklet + shared values
      runOnUI(() => {
        'worklet';
        const _c1 = chain1;
        const _c2 = chain2;
        const _s1 = sv1;
        const _s2 = sv2;
        trigger.value = (_c1() + _c2() + _s1.value + _s2.value) * 0.001;
      })();
    }, 3);
    return () => {
      clearInterval(interval);
    };
  }, [depth]);

  // 关键：卸载 cleanup 中调度 worklet — 制造 invalidate 后调度竞态
  // 这些 worklet 可能在 runtime invalidate 后被 EventLoopTaskRunner 执行
  useEffect(() => {
    return () => {
      const lastChain = createWorkletChain(sv1, depth + 5);
      const lastWrapped = createWrappedChain(sv2, depth + 5);
      runOnUI(lastChain)();
      runOnUI(lastWrapped)();
      runOnUI(() => {
        'worklet';
        const _c = lastChain;
        const _w = lastWrapped;
        const _s1 = sv1;
        const _s2 = sv2;
        return _c() + _w() + _s1.value + _s2.value;
      })();
    };
  }, [depth]);

  const style = useAnimatedStyle(() => ({
    transform: [
      {translateX: animVal.value},
      {scale: 1 + trigger.value * 0.01},
    ],
    opacity: interpolate(trigger.value, [0, 100], [0.5, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[styles.racerBox, style]}>
      <Text style={styles.racerText}>#{id}</Text>
    </Animated.View>
  );
};

export default function ToJSValueDemo({onGoBack}: {onGoBack: () => void}) {
  // useSharedValue 创建 ShareableHandle（makeMutableNative → {__init: () => makeMutableUI(initial)}）
  // 这正是崩溃栈 frame #15 ShareableHandle::toJSValue 的来源
  const sv1 = useSharedValue(42);
  const sv2 = useSharedValue(100);
  const animVal = useSharedValue(0);
  const trigger = useSharedValue(0);

  const [stressMode, setStressMode] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const stressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // mount/unmount 竞态模式
  const [crashMode, setCrashMode] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [cycle, setCycle] = useState(0);
  const crashTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const CHILD_COUNT = 8;
  const CHAIN_DEPTH = 8;

  const addLog = (msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLog((prev) => [`[${ts}] ${msg}`, ...prev].slice(0, 5));
  };

  // 压力模式：高频 runOnUI + 快速更新 shared value
  useEffect(() => {
    console.log('stressMode changed:', stressMode);
    if (!stressMode) {
      if (stressTimer.current) {
        clearInterval(stressTimer.current);
        stressTimer.current = null;
      }
      return;
    }
    addLog('stress mode on (3ms interval)');
    animVal.value = withRepeat(
      withSequence(
        withTiming(100, {duration: 300}),
        withTiming(-100, {duration: 300}),
      ),
      -1,
      true,
    );
    stressTimer.current = setInterval(() => {
      sv1.value = Math.random() * 1000;
      sv2.value = Math.random() * 500;
      const chain1 = createWorkletChain(sv1, 8);
      const chain2 = createWrappedChain(sv2, 8);
      runOnUI(chain1)();
      runOnUI(chain2)();
      runOnUI(() => {
        'worklet';
        const _c1 = chain1;
        const _c2 = chain2;
        const _s1 = sv1;
        const _s2 = sv2;
        trigger.value = (_c1() + _c2() + _s1.value + _s2.value) * 0.001;
      })();
    }, 3);
    return () => {
      if (stressTimer.current) {
        clearInterval(stressTimer.current);
        stressTimer.current = null;
      }
      cancelAnimation(animVal);
    };
  }, [stressMode]);

  // 崩溃模式：快速 mount/unmount 子组件制造 runtime invalidate 竞态
  useEffect(() => {
    if (!crashMode) {
      if (crashTimer.current) {
        clearInterval(crashTimer.current);
        crashTimer.current = null;
      }
      return;
    }
    addLog(`crash mode on (15ms cycle, ${CHILD_COUNT} children, depth=${CHAIN_DEPTH})`);
    crashTimer.current = setInterval(() => {
      setMounted((prev) => !prev);
      setCycle((prev) => prev + 1);
    }, 15);
    return () => {
      if (crashTimer.current) {
        clearInterval(crashTimer.current);
        crashTimer.current = null;
      }
    };
  }, [crashMode]);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: animVal.value}, {scale: 1 + trigger.value * 0.01}],
    opacity: interpolate(trigger.value, [0, 100], [0.5, 1], Extrapolation.CLAMP),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Button title="← 返回" onPress={onGoBack} color="#6366f1" />
      <View style={styles.content}>
        <Text style={styles.title}>ShareableWorklet::toJSValue</Text>
        <Text style={styles.desc}>
          点击按钮，executeOnUIRuntimeSync 执行 worklet 后，结果通过
          toJSValue 序列化回 JS 线程。
        </Text>
        <Button
          title="触发 toJSValue"
          onPress={() => {
            const fn = getWorkletFromUI();
            console.log('returned worklet:', typeof fn);
          }}
          color="#8b5cf6"
        />

        <Text style={[styles.title, {marginTop: 32}]}>
          ShareableHandle::toJSValue
        </Text>
        <Text style={styles.desc}>
          点击按钮，worklet 返回带 __init 属性的对象，结果序列化时进入
          ShareableHandle::toJSValue 分支（对应崩溃日志 frame #15）。
        </Text>
        <Button
          title="触发 ShareableHandle::toJSValue"
          onPress={() => {
            const handle = getHandleFromUI();
            console.log('returned handle:', handle);
          }}
          color="#10b981"
        />

        <Text style={[styles.title, {marginTop: 32}]}>
          完整堆栈模拟 (pingan-zong.txt)
        </Text>
        <Text style={styles.desc}>
          executeOnUIRuntimeSync 执行 worklet 链，__closure 嵌套引用
          useSharedValue(ShareableHandle)。递归序列化匹配崩溃栈
          Worklet→Object→Object→Worklet→...→Handle→Worklet+256。
        </Text>
        <Button
          title="触发 worklet 链序列化"
          onPress={() => {
            try {
              const result = getChainResultFromUI(sv1, 8);
              addLog(`chain result: ${result}`);
              console.log('chain result:', result);
            } catch (e) {
              addLog(`error: ${e}`);
            }
          }}
          color="#ef4444"
        />

        <Text style={[styles.title, {marginTop: 32}]}>
          压力模式（高频 + 竞态）
        </Text>
        <Text style={styles.desc}>
          每 3ms 调度深层 worklet 链到 UI 线程，配合循环动画和快速
          shared value 更新，制造 runtime invalidate 与 toJSValue 竞态。
        </Text>
        <Button
          title={stressMode ? '■ 停止压力' : '▶ 启动压力'}
          onPress={() => setStressMode((v) => !v)}
          color={stressMode ? '#ef4444' : '#f59e0b'}
        />

        <Text style={[styles.title, {marginTop: 32}]}>
          崩溃复现（快速 mount/unmount 竞态）
        </Text>
        <Text style={styles.desc}>
          每 15ms mount/unmount {CHILD_COUNT} 个子组件，每个子组件高频
          runOnUI 深层 worklet 链 + 卸载后仍调度 worklet。
          模拟平安 app 启动 9 秒崩溃场景：runtime invalidate 后
          EventLoopTaskRunner 仍执行 toJSValue → NULL 解引用。
        </Text>
        <Button
          title={crashMode ? '■ 停止崩溃模式' : '▶ 启动崩溃模式'}
          onPress={() => setCrashMode((v) => !v)}
          color={crashMode ? '#ef4444' : '#dc2626'}
        />
        <Text style={styles.desc}>
          cycle: {cycle} | mounted: {mounted ? 'Y' : 'N'}
        </Text>

        {crashMode && mounted && (
          <View style={styles.racerContainer}>
            {Array.from({length: CHILD_COUNT}, (_, i) => (
              <UnmountRacer
                key={`${cycle}-${i}`}
                id={i}
                depth={CHAIN_DEPTH}
              />
            ))}
          </View>
        )}

        <Animated.View style={[styles.indicator, style]} />

        {log.length > 0 && (
          <View style={styles.logArea}>
            {log.map((line, i) => (
              <Text key={i} style={styles.logText}>
                {line}
              </Text>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0f172a'},
  content: {flex: 1, padding: 16, justifyContent: 'center'},
  title: {color: '#e2e8f0', fontSize: 18, fontWeight: '700', marginBottom: 8},
  desc: {color: '#94a3b8', fontSize: 13, lineHeight: 20, marginBottom: 24},
  indicator: {
    width: 40,
    height: 40,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 16,
  },
  racerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  racerBox: {
    width: 36,
    height: 36,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  racerText: {color: '#fff', fontSize: 10, fontWeight: '700'},
  logArea: {
    backgroundColor: '#1e293b',
    borderRadius: 6,
    padding: 8,
    marginTop: 16,
  },
  logText: {color: '#4ade80', fontSize: 11, fontFamily: 'monospace'},
});
