/**
 * PinchWithRotationDemo.tsx
 * PinchGestureHandler测试 - 带旋转 (EC用例: 2276479)
 *
 * 从 RNGestureHandlerDemo 中抽取的单独 Demo，
 * 演示 PinchGestureHandler + RotationGestureHandler 同时响应（simultaneousHandlers）
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native'
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler'

// ── State 常量定义 ──
const FallbackState = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
}
const GestureState = State || FallbackState

// ── State 类型 ──
interface DemoState {
  logs: string[]
  comboScale479: number
  comboRotation479: number
}

class PinchWithRotationDemo extends Component<any, DemoState> {
  // ── Animated Values ──
  combo479ScaleAnim: Animated.Value
  combo479RotateAnim: Animated.Value

  // ── Animated Event Handlers ──
  onCombo479PinchEvent: any
  onCombo479RotateEvent: any

  // ── Refs ──
  pinchRef479 = React.createRef<any>()
  rotateRef479 = React.createRef<any>()

  constructor(props: any) {
    super(props)

    this.state = {
      logs: [],
      comboScale479: 1,
      comboRotation479: 0,
    }

    // ── Initialize Animated Values ──
    this.combo479ScaleAnim = new Animated.Value(1)
    this.combo479RotateAnim = new Animated.Value(0)

    // ── Animated Event Handlers ──
    this.onCombo479PinchEvent = Animated.event(
      [{ nativeEvent: { scale: this.combo479ScaleAnim } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { scale, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Combo479Pinch] scale:${scale.toFixed(2)}`)
          this.setState({ comboScale479: scale })
        }
      }},
    )

    this.onCombo479RotateEvent = Animated.event(
      [{ nativeEvent: { rotation: this.combo479RotateAnim } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { rotation, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          const deg = (rotation * 180 / Math.PI).toFixed(1)
          this.addLog(`[Combo479Rotate] angle:${deg}deg`)
          this.setState({ comboRotation479: rotation })
        }
      }},
    )
  }

  // ═══════════════════════════════════════════════════════
  // UTILITY METHODS
  // ═══════════════════════════════════════════════════════

  addLog = (msg: string) => {
    console.log(msg)
    this.setState((prev) => ({
      logs: [...prev.logs.slice(-19), msg],
    }))
  }

  springReset = (v: Animated.Value, toValue: number = 0) => {
    Animated.spring(v, { toValue, useNativeDriver: true }).start()
  }

  // ═══════════════════════════════════════════════════════
  // SHARED UI COMPONENTS
  // ═══════════════════════════════════════════════════════

  renderLogArea = () => (
    <View style={styles.logArea}>
      <Text style={styles.logTitle}>事件日志</Text>
      {this.state.logs.length === 0
        ? <Text style={styles.logEmpty}>暂无日志</Text>
        : this.state.logs.map((log, i) => <Text key={i} style={styles.logItem}>{log}</Text>)
      }
    </View>
  )

  renderCaseLayout = (title: string, caseId: string, operationArea: React.ReactNode, controlPanel?: React.ReactNode) => (
    <View style={styles.flex1}>
      {/* <ScrollView style={styles.flex1} contentContainerStyle={styles.caseContainer}> */}
        <Text style={styles.caseTitle}>{title}</Text>
        <Text style={styles.caseId}>EC用例: {caseId}</Text>
        {/* 上方：操作区域 */}
        <View style={styles.operationArea}>{operationArea}</View>
        {/* 中间：控制面板 */}
        {controlPanel && <View style={styles.controlPanel}>{controlPanel}</View>}
        {/* 底部：日志区 */}
        {this.renderLogArea()}
      {/* </ScrollView> */}
    </View>
  )

  // ═══════════════════════════════════════════════════════
  // MAIN RENDER — Case 2276479 PinchWithRotation
  // ═══════════════════════════════════════════════════════

  render() {
    return this.renderCaseLayout(
      'PinchGestureHandler测试 - 带旋转', '2276479',
      <GestureHandlerRootView style={styles.gestureArea}>
        <Text style={styles.guideText}>双指同时捏合和旋转 (simultaneousHandlers)</Text>
        <PinchGestureHandler
          ref={this.pinchRef479}
          simultaneousHandlers={this.rotateRef479}
          onGestureEvent={this.onCombo479PinchEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Combo479Pinch] ended')
              this.springReset(this.combo479ScaleAnim, 1)
            }
          }}
        >
          <Animated.View>
            <RotationGestureHandler
              ref={this.rotateRef479}
              simultaneousHandlers={this.pinchRef479}
              onGestureEvent={this.onCombo479RotateEvent}
              onHandlerStateChange={(e: any) => {
                if (e.nativeEvent.state === GestureState.END) {
                  this.addLog('[Combo479Rotate] ended')
                }
              }}
            >
              <Animated.View style={[styles.comboBox, {
                transform: [
                  { scale: this.combo479ScaleAnim },
                  { rotate: this.combo479RotateAnim.interpolate({ inputRange: [-Math.PI, Math.PI], outputRange: ['-180deg', '180deg'] }) },
                ],
              }]}>
                <Text style={styles.boxText}>捏合+旋转</Text>
                <Text style={styles.boxSubText}>scale: {this.state.comboScale479.toFixed(2)}</Text>
                <Text style={styles.boxSubText}>angle: {(this.state.comboRotation479 * 180 / Math.PI).toFixed(1)}°</Text>
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>,
    )
  }
}

// ═════════════════════════════════════════════════════════
// STYLES
// ═════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  // ── Case Layout ──
  caseContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  caseId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16,
  },
  operationArea: {
    marginBottom: 16,
  },
  controlPanel: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  // ── Log Area ──
  logArea: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ec9b0',
    marginBottom: 8,
  },
  logItem: {
    fontSize: 11,
    color: '#d4d4d4',
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  logEmpty: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  // ── Guide Text ──
  guideText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  // ── Boxes ──
  gestureArea: {
    alignItems: 'center',
    minHeight: 200,
  },
  comboBox: {
    width: 140,
    height: 140,
    backgroundColor: '#8e44ad',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  // ── Text Colors ──
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  boxSubText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
})

export default PinchWithRotationDemo
