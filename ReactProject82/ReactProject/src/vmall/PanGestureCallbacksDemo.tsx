import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

type LogItem = { id: number; text: string };

const stateName = (s: State) => State[s] ?? String(s);

/**
 * PanGestureHandler 回调验证 Demo
 * 验证 onGestureEvent（拖动过程持续触发）和 onHandlerStateChange（状态变化触发）是否生效
 */
export default function PanGestureCallbacksDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const [logs, setLogs] = useState<LogItem[]>([]);
  const logId = useRef(0);

  const addLog = (text: string) => {
    logId.current += 1;
    setLogs((prev) => [{ id: logId.current, text }, ...prev].slice(0, 20));
  };

  const onGestureEvent = (e: any) => {
    // 拖动过程中持续触发
    setPos({
      x: startPos.current.x + e.nativeEvent.translationX,
      y: startPos.current.y + e.nativeEvent.translationY,
    });
    addLog(`onGestureEvent tx=${e.nativeEvent.translationX.toFixed(0)} ty=${e.nativeEvent.translationY.toFixed(0)}`);
  };

  const onHandlerStateChange = (e: any) => {
    const s = e.nativeEvent.state as State;
    addLog(`onHandlerStateChange → ${stateName(s)}`);
    if (s === State.BEGAN) {
      startPos.current = { ...pos };
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.area}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <View style={[styles.box, { transform: [{ translateX: pos.x }, { translateY: pos.y }] }]}>
            <Text style={styles.boxText}>拖我</Text>
          </View>
        </PanGestureHandler>
      </View>

      <View style={styles.logPanel}>
        <Text style={styles.logTitle}>回调日志（最新在上）</Text>
        <ScrollView>
          {logs.map((l) => (
            <Text key={l.id} style={styles.logText}>
              {l.text}
            </Text>
          ))}
          {logs.length === 0 && <Text style={styles.logText}>暂无日志，拖动上方方块</Text>}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  area: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#4a90d9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logPanel: {
    flex: 1,
    margin: 12,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  logText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});
