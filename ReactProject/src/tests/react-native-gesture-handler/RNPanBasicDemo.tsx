import React, { useRef, useCallback, useState } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'

/**
 * 复现 "手势回弹动画未结束立即重新拖拽导致闪动" 问题。
 * 
 * 为什么必须用 PanGestureHandler：
 * 这个 bug 出在 C++ EventAnimationDriver::updateWithEvent() 直接调用 valueNode.setValue()
 * 而不停掉正在运行的 spring 动画，导致两个 C++ 驱动同时写同一个 ValueAnimatedNode。
 * 
 * 在 OpenHarmony 上，只有 PanGestureHandler 的事件确定走 C++ EventAnimationDriver 路径：
 *   PanGestureHandler 事件 → NativeAnimatedTurboModule::handleEvent()
 *     → AnimatedNodesManager::handleEvent() → EventAnimationDriver::updateWithEvent()
 *       → valueNode.setValue()  ← 不停动画！与 spring 冲突 → 闪动
 * 
 * 其他方式（Responder + setValue / Animated.ScrollView）都走不到这条路径：
 *   - Responder + Animated.setValue() → JS 桥 → AnimatedNodesManager::setValue()
 *     → 先 stopAnimationsForNode() 再设值 ✅ 不冲突
 *   - Animated.ScrollView onScroll → 未走 EventAnimationDriver（或回退 JS 驱动）✅ 不冲突
 */
const RNPanBasicDemo = () => {
  const panX = useRef(new Animated.Value(0)).current
  const panY = useRef(new Animated.Value(0)).current
  const [logs, setLogs] = useState<string[]>([])

  const addLog = useCallback((msg: string) => {
    console.log(msg)
    setLogs(prev => [...prev.slice(-19), msg])
  }, [])

  // 核心：Animated.event + useNativeDriver:true
  // PanGestureHandler 事件走 C++ EventAnimationDriver，直接写 ValueAnimatedNode
  const onPanEvent = useRef(
    Animated.event(
      [{
        nativeEvent: {
          translationX: panX,
          translationY: panY,
        }
      }],
      {
        useNativeDriver: true, // ← 关键！走 C++ EventAnimationDriver 路径
      }
    )
  ).current

  const onHandlerStateChange = useCallback((e: any) => {
    const state = e.nativeEvent.state
    addLog(`[State] ${stateName(state)}`)

    if (state === State.END) {
      // 松手 → spring 回弹 (C++ SpringAnimationDriver)
      // 如果用户在回弹未结束前再次拖拽，C++ EventAnimationDriver 写值不停 spring → 闪动
      addLog('[State] spring back → 0')
      Animated.spring(panX, { toValue: 0, useNativeDriver: true }).start()
      Animated.spring(panY, { toValue: 0, useNativeDriver: true }).start()
    }
  }, [panX, panY, addLog])

  return (
    <GestureHandlerRootView style={styles.flex1}>
      {/* 标题区 */}
      <View style={styles.header}>
        <Text style={styles.title}>PanGestureHandler 闪动复现</Text>
        <Text style={styles.subtitle}>Animated.event + useNativeDriver:true</Text>
      </View>

      {/* 操作指引 */}
      <View style={styles.guideArea}>
        <Text style={styles.guideText}>
          1. 拖拽方块向右移动{'\n'}
          2. 松手，方块开始 spring 回弹{'\n'}
          3. 回弹未结束前立即再次拖拽{'\n'}
          4. 方块出现闪烁/跳动 = 复现成功
        </Text>
      </View>

      {/* 拖拽区 */}
      <View style={styles.operationArea}>
        <PanGestureHandler
          onGestureEvent={onPanEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[styles.dragBox, {
            transform: [
              { translateX: panX },
              { translateY: panY },
            ],
          }]}>
            <Text style={styles.boxText}>拖拽我</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* 日志区 */}
      <View style={styles.logArea}>
        <Text style={styles.logTitle}>事件日志</Text>
        <ScrollView style={styles.logScroll}>
          {logs.length === 0
            ? <Text style={styles.logEmpty}>请按上方步骤操作</Text>
            : logs.map((log, i) => <Text key={i} style={styles.logItem}>{log}</Text>)
          }
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  )
}

const stateName = (s: number) => {
  const map: Record<number, string> = {
    [State.UNDETERMINED]: 'UNDETERMINED',
    [State.FAILED]: 'FAILED',
    [State.BEGAN]: 'BEGAN',
    [State.CANCELLED]: 'CANCELLED',
    [State.ACTIVE]: 'ACTIVE',
    [State.END]: 'END',
  }
  return map[s] || `UNKNOWN(${s})`
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#e74c3c',
    fontWeight: '600',
  },
  guideArea: {
    margin: 16,
    marginBottom: 0,
    padding: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  guideText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 22,
  },
  operationArea: {
    height: 280,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dragBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logArea: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 8,
  },
  logTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#aaa',
    marginBottom: 4,
  },
  logScroll: { flex: 1 },
  logEmpty: {
    color: '#666',
    fontSize: 12,
  },
  logItem: {
    color: '#0f0',
    fontSize: 11,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
})

export default RNPanBasicDemo
