/**
 * WhiteScreenDemo.tsx
 *
 * react-native-webview 页面跳转白屏复现 demo。
 *
 * 外部问题：页面跳转有很长时间白屏，猜测 H5 用到了 setTimeout 触发导航拦截，
 * 当前导航拦截不支持异步。
 *
 * 已知实现（@react-native-ohos/react-native-webview 13.16.4，RN 0.82）：
 *  - 原生侧 onLoadIntercept 对【每一次】导航都会在 UI 线程自旋等待 JS 侧的
 *    同步决策（shouldStartLoadWithLockIdentifier），超时 250ms（RNCWebView.ets
 *    SHOULD_OVERRIDE_URL_LOADING_TIMEOUT）。
 *  - JS 侧 WebViewShared 的包装器只取回调的【同步返回值】，异步决策
 *    （setTimeout / Promise / await）无法送达原生侧。
 *
 * 实测补充：把 async 函数（返回 Promise）或无返回值（undefined）直接作为
 * onShouldStartLoadWithRequest 的返回值，两端都会抛
 * "Exception in HostFunction: Cannot set sendable property with mismatched type"
 * （RNOH：@Sendable ShouldStartParams.shouldStart 布尔字段收到非布尔值；
 *  Android：codegen 的 boolean 参数校验同样拒绝 Promise/undefined）。
 * —— 这是"导航拦截不支持异步"的直接证据。因此本 demo 的异步模式不破坏
 * boolean 契约：模式3 同步返回兜底值、异步决策旁路演示"迟到不被采纳"；
 * 模式4 同步忙等模拟"决策超时"（原生只等 250ms → 白屏，外部问题最小复现）。
 *
 * 本 demo 提供 4 种模式对比（页面 A 会用 setTimeout 自动跳转到页面 B）：
 *  1. 无拦截        —— 不传 onShouldStartLoadWithRequest（基线）
 *  2. 同步拦截      —— 回调同步 return true（当前支持的用法）
 *  3. 异步·Promise  —— 异步校验的决策必然迟到（不被采纳）；同步兜底 return true
 *  4. 忙等·400ms    —— 回调内同步忙等 400ms 模拟 JS 线程被异步校验占用
 *                      → 决策超出原生 250ms 等待窗口 → 白屏
 *
 * 页面 B 首帧可见时通过 postMessage 上报【跳转 → 可见】的白屏时长，
 * 结合日志面板的时间戳可定位耗时发生在导航拦截还是页面加载。
 */

import React, { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// metro 经 @react-native-ohos/react-native-webview 的 harmony.alias 重定向到此包
import { WebView } from 'react-native-webview';
import type {
  ShouldStartLoadRequest,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';

type Mode = 'none' | 'sync' | 'async-promise' | 'busywait';

const MODES: { key: Mode; label: string; desc: string }[] = [
  { key: 'none', label: '无拦截', desc: '不传 onShouldStartLoadWithRequest（基线，跳转应最快）' },
  { key: 'sync', label: '同步拦截', desc: '回调同步 return true（当前支持的用法）' },
  { key: 'async-promise', label: '异步·Promise', desc: '异步校验决策必然迟到、不被采纳；直接返回 Promise 本体会抛 Exception in HostFunction，故同步兜底 return true' },
  { key: 'busywait', label: '忙等·400ms', desc: '回调内同步忙等 400ms（模拟异步校验占用 JS 线程）→ 超出原生 250ms 等待窗口 → 白屏' },
];

const PAGE_A_URI = 'asset://webview_white_screen/page_a.html';
const MAX_LOGS = 200;

function shortUrl(url: string): string {
  return url.replace(/^resource:\/\/rawfile\/assets\//, '').split('?')[0];
}

export default function WhiteScreenDemo() {
  const [mode, setMode] = useState<Mode>('sync');
  const [logs, setLogs] = useState<{ t: number; text: string }[]>([]);
  const [lastWhiteScreen, setLastWhiteScreen] = useState<number | null>(null);
  const [lastViaSetTimeout, setLastViaSetTimeout] = useState<boolean | null>(null);
  const t0 = useRef(Date.now());
  const navigateAtRef = useRef<number | null>(null);

  const log = useCallback((text: string) => {
    const line = { t: Date.now() - t0.current, text };
    console.log(`[WebViewDemo] +${line.t}ms ${text}`);
    setLogs((prev) => [...prev.slice(-(MAX_LOGS - 1)), line]);
  }, []);

  const onMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data || '{}');
        switch (msg.event) {
          case 'a_loaded':
            log(`页面A 加载完成`);
            break;
          case 'a_navigate':
            navigateAtRef.current = Date.now();
            log(`页面A 发起跳转（${msg.viaSetTimeout ? 'setTimeout' : '直接'}）→ B`);
            break;
          case 'b_navigate':
            navigateAtRef.current = Date.now();
            log(`页面B 发起返回跳转（setTimeout）→ A`);
            break;
          case 'b_painted': {
            const ws = typeof msg.whiteScreenMs === 'number' ? msg.whiteScreenMs : null;
            setLastWhiteScreen(ws);
            setLastViaSetTimeout(!!msg.viaSetTimeout);
            const extra =
              navigateAtRef.current != null
                ? `（RN 侧桥接观测：+${Date.now() - navigateAtRef.current}ms）`
                : '';
            log(`★ 页面B 首帧可见，白屏时长 ${ws ?? '?'}ms ${extra}`);
            break;
          }
          default:
            log(`H5 消息: ${event.nativeEvent.data}`);
        }
      } catch {
        log(`H5 消息(原始): ${event.nativeEvent.data}`);
      }
    },
    [log]
  );

  const onLoadStart = useCallback(
    (e: { nativeEvent: { url: string } }) => {
      log(`onLoadStart: ${shortUrl(e.nativeEvent.url)}`);
    },
    [log]
  );

  const onLoadEnd = useCallback(
    (e: { nativeEvent: { url: string } }) => {
      log(`onLoadEnd: ${shortUrl(e.nativeEvent.url)}`);
    },
    [log]
  );

  // ── 各模式的导航拦截回调 ──────────────────────────────────────
  const shouldStartSync = useCallback(
    (req: ShouldStartLoadRequest): boolean => {
      log(`[拦截·同步] ${shortUrl(req.url)} → return true`);
      return true;
    },
    [log]
  );

  // 模式3：真实项目常见写法 —— 决策依赖异步校验（async/await）。
  // 不能把 async 函数直接作为返回值（Promise 传入原生 boolean 参数会抛
  // Exception in HostFunction），只能同步兜底，异步决策旁路演示"迟到不被采纳"。
  const shouldStartAsyncPromise = useCallback(
    (req: ShouldStartLoadRequest): boolean => {
      log(`[拦截·异步Promise] ${shortUrl(req.url)} 开始异步校验（300ms）`);
      const startedAt = Date.now();
      Promise.resolve()
        .then(() => new Promise((r) => setTimeout(r, 300)))
        .then(() => {
          log(
            `[拦截·异步Promise] 决策=放行 (+${Date.now() - startedAt}ms) —— 迟到的决策不会被采纳，导航已按同步返回值处理`
          );
        });
      return true;
    },
    [log]
  );

  // 模式4：模拟"异步校验期间 JS 线程被占用"——回调内同步忙等 400ms。
  // RNOH 原生 onLoadIntercept 只等 250ms，决策超时 → 导航延迟/放行 + UI 冻结
  // → 白屏。这是外部反馈"setTimeout 跳转长时间白屏"的最小复现。
  const shouldStartBusyWait = useCallback(
    (req: ShouldStartLoadRequest): boolean => {
      log(`[拦截·忙等] ${shortUrl(req.url)} JS 线程忙等 400ms（模拟异步校验占用）…`);
      const startedAt = Date.now();
      // 模拟 JS 繁忙：事件循环被占住，无法及时处理导航决策
      while (Date.now() - startedAt < 400) { /* busy wait */ }
      log(`[拦截·忙等] 决策=放行 (+${Date.now() - startedAt}ms) —— 已超出原生 250ms 等待窗口`);
      return true;
    },
    [log]
  );

  const shouldStart =
    mode === 'none'
      ? undefined
      : mode === 'sync'
        ? shouldStartSync
        : mode === 'async-promise'
          ? shouldStartAsyncPromise
          : shouldStartBusyWait;

  const activeMode = MODES.find((m) => m.key === mode)!;

  return (
    <View style={styles.container}>
      {/* 标题 */}
      <View style={styles.header}>
        <Text style={styles.title}>WebView 页面跳转白屏复现</Text>
        <Text style={styles.subtitle}>
          页面A 每次加载后 2s 经 setTimeout 跳转页面B；B→A 同样走 setTimeout。
          切换拦截模式后自动重载，观察白屏时长与日志时间戳。
        </Text>
      </View>

      {/* 模式切换 */}
      <View style={styles.modeRow}>
        {MODES.map((m) => (
          <TouchableOpacity
            key={m.key}
            style={[styles.modeBtn, mode === m.key && styles.modeBtnActive]}
            onPress={() => {
              setMode(m.key);
              setLogs([]);
              setLastWhiteScreen(null);
              setLastViaSetTimeout(null);
              t0.current = Date.now();
              log(`切换模式：${m.label}（WebView 已重载）`);
            }}
          >
            <Text style={[styles.modeBtnText, mode === m.key && styles.modeBtnTextActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.modeDesc}>{activeMode.desc}</Text>

      {/* 指标 */}
      <View style={styles.metrics}>
        <Text style={styles.metricLabel}>上次跳转白屏时长：</Text>
        <Text
          style={[
            styles.metricValue,
            lastWhiteScreen != null && lastWhiteScreen > 1000 && styles.metricBad,
          ]}>
          {lastWhiteScreen != null ? `${lastWhiteScreen} ms` : '等待跳转…'}
        </Text>
        {lastViaSetTimeout != null && (
          <Text style={styles.metricTag}>
            （{lastViaSetTimeout ? 'setTimeout 触发' : '直接跳转'}）
          </Text>
        )}
      </View>

      {/* WebView：key=mode 切换模式时强制重建 */}
      <View style={styles.webviewWrap}>
        <WebView
          key={mode}
          source={{ uri: PAGE_A_URI }}
          style={styles.webview}
          javaScriptEnabled
          onShouldStartLoadWithRequest={shouldStart}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onMessage={onMessage}
          originWhitelist={['*']}
        />
      </View>

      {/* 日志面板：最新在最上 */}
      <View style={styles.logPanel}>
        <ScrollView>
          {logs.length === 0 && (
            <Text style={styles.logLine}>（日志为空，等待事件…）</Text>
          )}
          {[...logs].reverse().map((l, i) => (
            <Text key={logs.length - i} style={styles.logLine} selectable>
              +{String(l.t).padStart(6, ' ')}ms  {l.text}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e' },
  header: { paddingTop: 48, paddingBottom: 10, paddingHorizontal: 16 },
  title: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  subtitle: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 4, lineHeight: 15 },
  modeRow: { flexDirection: 'row', paddingHorizontal: 12, gap: 6 },
  modeBtn: {
    flex: 1, paddingVertical: 7, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center',
  },
  modeBtnActive: { backgroundColor: '#4f8cff' },
  modeBtnText: { color: 'rgba(255,255,255,0.75)', fontSize: 11 },
  modeBtnTextActive: { color: '#fff', fontWeight: '600' },
  modeDesc: { color: 'rgba(255,255,255,0.5)', fontSize: 10, paddingHorizontal: 16, marginTop: 6, lineHeight: 13 },
  metrics: {
    flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap',
    paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'rgba(255,255,255,0.06)',
    marginTop: 6,
  },
  metricLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  metricValue: { color: '#ffd54f', fontSize: 16, fontWeight: 'bold' },
  metricBad: { color: '#ff5252' },
  metricTag: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  webviewWrap: { flex: 1, marginHorizontal: 12, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  webview: { flex: 1, backgroundColor: '#ffffff' },
  logPanel: {
    height: 170, marginTop: 8, marginBottom: 12, marginHorizontal: 12,
    borderRadius: 10, backgroundColor: '#111',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingVertical: 6, paddingHorizontal: 8,
  },
  logLine: { color: '#9ee493', fontFamily: 'monospace', fontSize: 10, lineHeight: 15 },
});
