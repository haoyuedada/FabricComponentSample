/**
 * MainThreadFreezeDemo.tsx
 *
 * 验证平台差异：WebView 页面跳转（H5 setTimeout 触发）+ 导航拦截场景下，
 * 主线程是否被阻塞。
 *
 * 外部反馈：harmony 上 setTimeout 跳转导致"主线程的任务都不动了"，
 * android 上不会阻塞主线程。
 *
 * 机理（@react-native-ohos/react-native-webview 13.16.4，RN 0.82）：
 *  - Harmony：原生 onLoadIntercept 在【主线程】自旋等待 JS 侧同步决策
 *    （shouldStartLoadWithLockIdentifier），超时 250ms —— 等待期间主线程
 *    的所有任务（渲染/触摸/事件派发）都停不下来地停住。
 *  - Android：shouldOverrideUrlLoading 立即返回（不等 JS），导航先取消，
 *    JS 决策后重新 loadUrl —— 主线程不被 JS 往返阻塞。
 *
 * 验证方法：
 *  - 主 WebView：freeze_page_a/b 循环链，每 800ms 经 setTimeout 跳转一次；
 *  - 探针 WebView：每 50ms postMessage 一拍（携带 H5 侧时间戳 h5ts）。
 *    RNOH 的 postMessage 走 registerJavaScriptProxy（ArkWeb 主线程派发），
 *    主线程被自旋卡住 → 探针消息【发送→接收】延迟出现尖峰；
 *    Android 的消息通路不经过被阻塞的线程 → 延迟平稳。
 *  - 对比【导航窗口内】与【基线】的探针延迟即可判断主线程是否被卡。
 *
 * 三种拦截模式（决策速度是自旋时长的关键变量）：
 *  - 无拦截 / 同步拦截：JS 空闲时决策快，自旋 ≈ 桥接往返（几~几十 ms）
 *  - 忙等·400ms：模拟异步校验占用 JS 线程 → 决策迟到 → 自旋打满 250ms
 */

import React, { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type {
  ShouldStartLoadRequest,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';

type Mode = 'none' | 'sync' | 'busywait';

const MODES: { key: Mode; label: string; desc: string }[] = [
  { key: 'none', label: '无拦截', desc: '不传 onShouldStartLoadWithRequest（13.16.4 上 onLoadIntercept 仍无条件自旋等桥接往返）' },
  { key: 'sync', label: '同步拦截', desc: '回调同步 return true —— JS 空闲，自旋 ≈ 一次桥接往返' },
  { key: 'busywait', label: '忙等·400ms', desc: '回调内忙等 400ms 模拟异步校验占用 JS → 决策迟到 → 自旋打满 250ms' },
];

const PROBE_INTERVAL_MS = 50;

// 探针页：每 50ms postMessage 一拍，携带 H5 侧时间戳
const PROBE_HTML = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{background:#111;color:#9ee493;font-family:monospace;height:100vh;display:flex;align-items:center;justify-content:center;font-size:11px}
</style></head><body><div id="s">probe</div>
<script>
var c=0;
function post(m){try{ReactNativeWebView.postMessage(JSON.stringify(m))}catch(e){}}
setInterval(function(){
  c++;
  document.getElementById('s').textContent='probe tick #'+c;
  post({event:'tick', h5ts:Date.now(), c:c});
}, ${PROBE_INTERVAL_MS});
</script></body></html>`;

// 主 WebView 测试页：freeze_page_a/b 循环 setTimeout 跳转链（RNOH rawfile 资源）
const PAGE_A_URI = 'asset://webview_white_screen/freeze_page_a.html';

const MAX_LOGS = 150;

function shortUrl(url: string): string {
  return url
    .replace(/^resource:\/\/rawfile\/assets\//, '')
    .replace(/^.*\/assets\//, '')
    .replace(/^.*\/raw\//, '')
    .split('?')[0];
}

export default function MainThreadFreezeDemo() {
  const [mode, setMode] = useState<Mode>('sync');
  const [logs, setLogs] = useState<{ t: number; text: string }[]>([]);
  const [stats, setStats] = useState({
    baseMax: 0, baseAvg: 0, navMax: 0, jumps: 0, lastWs: null as number | null, cur: 0,
  });

  const t0 = useRef(Date.now());
  // 探针统计（ref，避免 20 次/秒的重渲染）
  const probeRef = useRef({
    ticks: [] as { h5ts: number; lat: number }[],
    baseCount: 0, baseSum: 0, baseMax: 0,
    navMax: 0, jumps: 0, lastWs: null as number | null,
    uiTick: 0,
  });
  const navTsRef = useRef<number | null>(null); // 当前导航发起时刻（H5 时钟）

  const log = useCallback((text: string) => {
    const line = { t: Date.now() - t0.current, text };
    console.log(`[FreezeDemo] +${line.t}ms ${text}`);
    setLogs((prev) => [...prev.slice(-(MAX_LOGS - 1)), line]);
  }, []);

  const refreshStats = useCallback((cur: number) => {
    const p = probeRef.current;
    setStats({
      baseMax: p.baseMax,
      baseAvg: p.baseCount > 0 ? Math.round(p.baseSum / p.baseCount) : 0,
      navMax: p.navMax,
      jumps: p.jumps,
      lastWs: p.lastWs,
      cur,
    });
  }, []);

  // ── 探针消息：延迟 = Date.now() - h5ts（发送→接收，同源 Unix 时钟）──
  const onProbeMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data || '{}');
        if (msg.event !== 'tick') return;
        const lat = Date.now() - msg.h5ts;
        const p = probeRef.current;
        if (p.jumps === 0) {
          // 首次跳转前为基线（主线程空闲）
          p.baseCount++;
          p.baseSum += lat;
          p.baseMax = Math.max(p.baseMax, lat);
        }
        p.ticks.push({ h5ts: msg.h5ts, lat });
        if (p.ticks.length > 600) p.ticks.splice(0, 300);
        // 降频刷新界面上的"当前延迟"
        if (++p.uiTick % 10 === 0) refreshStats(lat);
      } catch { }
    },
    [refreshStats]
  );

  // ── 主 WebView 消息：painted = 一跳结束（窗口结算点）──
  const onMainMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data || '{}');
        if (msg.event === 'navigate') {
          navTsRef.current = msg.ts; // H5 时钟，与探针 h5ts 同源
          const p = probeRef.current;
          p.jumps++;
          log(`#${p.jumps} ${msg.from === 'a' ? 'A→B' : 'B→A'} 跳转发起（setTimeout）`);
        } else if (msg.event === 'painted') {
          const p = probeRef.current;
          p.lastWs = typeof msg.ws === 'number' ? msg.ws : null;
          const navTs = navTsRef.current;
          if (navTs != null && p.jumps > 0) {
            // 结算本次导航窗口内的探针延迟（h5ts ∈ [跳转时刻, 可见时刻]）
            let wmax = 0;
            for (const tk of p.ticks) {
              if (tk.h5ts >= navTs && tk.h5ts <= msg.ts) wmax = Math.max(wmax, tk.lat);
            }
            p.navMax = Math.max(p.navMax, wmax);
            log(
              `#${p.jumps} 页面可见 白屏${p.lastWs ?? '?'}ms | 探针延迟 窗口max ${wmax}ms` +
              `（基线 max ${p.baseMax}ms / avg ${p.baseCount > 0 ? Math.round(p.baseSum / p.baseCount) : 0}ms）`
            );
          }
          refreshStats(0);
        }
      } catch { }
    },
    [log, refreshStats]
  );

  // ── 各模式的导航拦截回调 ──────────────────────────────────────
  const shouldStartSync = useCallback(
    (req: ShouldStartLoadRequest): boolean => {
      log(`[拦截·同步] ${shortUrl(req.url)}`);
      return true;
    },
    [log]
  );

  const shouldStartBusyWait = useCallback(
    (req: ShouldStartLoadRequest): boolean => {
      log(`[拦截·忙等] ${shortUrl(req.url)} JS 忙等 400ms…`);
      const startedAt = Date.now();
      // 模拟异步校验期间 JS 线程被占用 → 决策迟到 → 原生自旋打满 250ms
      while (Date.now() - startedAt < 400) { /* busy wait */ }
      log(`[拦截·忙等] 决策=放行 (+${Date.now() - startedAt}ms)`);
      return true;
    },
    [log]
  );

  const shouldStart = mode === 'none' ? undefined : mode === 'sync' ? shouldStartSync : shouldStartBusyWait;

  const activeMode = MODES.find((m) => m.key === mode)!;

  const switchMode = (key: Mode) => {
    setMode(key);
    setLogs([]);
    t0.current = Date.now();
    probeRef.current = {
      ticks: [], baseCount: 0, baseSum: 0, baseMax: 0,
      navMax: 0, jumps: 0, lastWs: null, uiTick: 0,
    };
    navTsRef.current = null;
    refreshStats(0);
    log(`切换模式：${MODES.find((m) => m.key === key)!.label}（重置统计，WebView 重载）`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WebView 跳转主线程阻塞 验证（Harmony vs Android）</Text>
        <Text style={styles.subtitle}>
          主 WebView 每 800ms 经 setTimeout 跳转（A↔B 循环）；下方探针 WebView 每 {PROBE_INTERVAL_MS}ms 发一拍。
          若跳转期间探针延迟尖峰 → 主线程被导航拦截自旋卡住；平稳 → 主线程不受影响。
        </Text>
      </View>

      <View style={styles.modeRow}>
        {MODES.map((m) => (
          <TouchableOpacity
            key={m.key}
            style={[styles.modeBtn, mode === m.key && styles.modeBtnActive]}
            onPress={() => switchMode(m.key)}
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
        <Text style={styles.metric}>基线 max <Text style={styles.v}>{stats.baseMax}ms</Text></Text>
        <Text style={styles.metric}>基线 avg <Text style={styles.v}>{stats.baseAvg}ms</Text></Text>
        <Text style={[styles.metric, styles.metricKey]}>导航窗口 max <Text style={[styles.v, stats.navMax > Math.max(3 * (stats.baseMax || 1), 100) && styles.bad]}>{stats.navMax}ms</Text></Text>
        <Text style={styles.metric}>跳转 <Text style={styles.v}>{stats.jumps}</Text></Text>
        <Text style={styles.metric}>最近白屏 <Text style={styles.v}>{stats.lastWs ?? '-'}ms</Text></Text>
        <Text style={styles.metric}>探针当前 <Text style={styles.v}>{stats.cur}ms</Text></Text>
      </View>

      {/* 主 WebView（被测对象） */}
      <View style={styles.webviewWrap}>
        <WebView
          key={mode}
          source={{ uri: PAGE_A_URI }}
          style={styles.webview}
          javaScriptEnabled
          onShouldStartLoadWithRequest={shouldStart}
          onMessage={onMainMessage}
          originWhitelist={['*']}
        />
      </View>

      {/* 探针 WebView（主线程心跳） */}
      <View style={styles.probeWrap}>
        <WebView
          key={`probe-${mode}`}
          source={{ html: PROBE_HTML }}
          style={styles.probeWebview}
          javaScriptEnabled
          onMessage={onProbeMessage}
          originWhitelist={['*']}
        />
      </View>

      {/* 日志面板：最新在最上 */}
      <View style={styles.logPanel}>
        <ScrollView>
          {logs.length === 0 && <Text style={styles.logLine}>（日志为空，等待事件…）</Text>}
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
  header: { paddingTop: 48, paddingBottom: 8, paddingHorizontal: 16 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
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
    flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline',
    paddingHorizontal: 12, paddingVertical: 7, backgroundColor: 'rgba(255,255,255,0.06)',
    marginTop: 6, gap: 10,
  },
  metric: { color: 'rgba(255,255,255,0.65)', fontSize: 11 },
  metricKey: { fontWeight: 'bold' },
  v: { color: '#ffd54f', fontSize: 13, fontWeight: 'bold' },
  bad: { color: '#ff5252' },
  webviewWrap: { flex: 1, marginHorizontal: 12, marginTop: 6, borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  webview: { flex: 1, backgroundColor: '#ffffff' },
  probeWrap: { height: 30, marginHorizontal: 12, marginTop: 6, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(158,228,147,0.4)' },
  probeWebview: { flex: 1, backgroundColor: '#111' },
  logPanel: {
    height: 150, marginTop: 8, marginBottom: 12, marginHorizontal: 12,
    borderRadius: 10, backgroundColor: '#111',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingVertical: 6, paddingHorizontal: 8,
  },
  logLine: { color: '#9ee493', fontFamily: 'monospace', fontSize: 10, lineHeight: 15 },
});
