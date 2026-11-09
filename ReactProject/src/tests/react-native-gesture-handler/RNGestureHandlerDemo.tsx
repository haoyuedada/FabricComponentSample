/**
 * RNGestureHandlerDemo.tsx
 * GestureHandler 组件综合测试页面
 *
 * EC 用例映射关系（31条，caseId 2276467~2276497）：
 * ─────────────────────────────────────────────────────────
 * Case2276467_NoProps              | GestureHandler组件测试 - 无属性
 * Case2276468_InvalidProps         | GestureHandler组件测试 - 无效属性
 * Case2276469_SingleChild          | GestureHandler组件测试 - 单一子组件
 * Case2276470_MultiChild           | GestureHandler组件测试 - 多个子组件
 * Case2276471_NoChild              | GestureHandler组件测试 - 无子组件
 * Case2276472_TapBasic             | TapGestureHandler测试 - 基本点击
 * Case2276473_TapDouble            | TapGestureHandler测试 - 双击
 * Case2276474_TapLongPressDistinguish | TapGestureHandler与LongPressGestureHandler区分测试
 * Case2276475_PanBasic             | PanGestureHandler测试 - 基本拖拽
 * Case2276476_PanDirectionLock     | PanGestureHandler测试 - 方向锁定
 * Case2276477_PanMinDist           | PanGestureHandler测试 - 最小距离
 * Case2276478_PinchBasic           | PinchGestureHandler测试 - 基本捏合
 * Case2276479_PinchWithRotation    | PinchGestureHandler测试 - 带旋转
 * Case2276480_RotationBasic        | RotationGestureHandler测试 - 基本旋转
 * Case2276481_LongPressBasic       | LongPressGestureHandler测试 - 基本长按
 * Case2276482_LongPressCustomDuration | LongPressGestureHandler测试 - 自定义时长
 * Case2276483_FlingBasic           | FlingGestureHandler测试 - 基本快扫
 * Case2276484_FlingDirectional     | FlingGestureHandler测试 - 方向性快扫
 * Case2276485_NativeButton         | NativeButtonGestureHandler测试 - 基本按钮
 * Case2276486_PinchRotationCombo   | 手势组合测试 - 捏合与旋转
 * Case2276487_PanPinchCombo        | 手势组合测试 - 拖拽与捏合
 * Case2276488_TapWaitDoubleTap     | 等待手势测试 - 单击等待双击
 * Case2276489_TapWaitLongPress     | 等待手势测试 - 点击等待长按
 * Case2276490_HorizontalVerticalMutex | 互斥手势测试 - 水平与垂直拖拽
 * Case2276491_PanTapMutex          | 互斥手势测试 - 拖拽与点击
 * Case2276492_NestedTap            | 嵌套手势处理器测试 - 嵌套点击处理器
 * Case2276493_NestedPan            | 嵌套手势处理器测试 - 嵌套拖拽处理器
 * Case2276494_NestedScrollView     | 嵌套可滚动组件测试 - 嵌套ScrollView
 * Case2276495_ScrollViewDrag       | 嵌套可滚动组件测试 - ScrollView中的拖拽元素
 * Case2276496_TouchableCombo       | 与原生组件结合测试 - Touchable组件
 * Case2276497_TextInputCombo       | 与原生组件结合测试 - TextInput组件
 * ─────────────────────────────────────────────────────────
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  NativeViewGestureHandler,
  LongPressGestureHandler,
  Directions,
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

const getStateName = (state: number): string => {
  switch (state) {
    case GestureState.UNDETERMINED: return 'UNDETERMINED'
    case GestureState.FAILED: return 'FAILED'
    case GestureState.BEGAN: return 'BEGAN'
    case GestureState.CANCELLED: return 'CANCELLED'
    case GestureState.ACTIVE: return 'ACTIVE'
    case GestureState.END: return 'END'
    default: return 'UNKNOWN'
  }
}

// ── testCase 列表 ──
const TEST_CASES = [
  { key: 'Case2276467_NoProps', id: '2276467', title: 'GestureHandler组件测试 - 无属性' },
  { key: 'Case2276468_InvalidProps', id: '2276468', title: 'GestureHandler组件测试 - 无效属性' },
  { key: 'Case2276469_SingleChild', id: '2276469', title: 'GestureHandler组件测试 - 单一子组件' },
  { key: 'Case2276470_MultiChild', id: '2276470', title: 'GestureHandler组件测试 - 多个子组件' },
  { key: 'Case2276471_NoChild', id: '2276471', title: 'GestureHandler组件测试 - 无子组件' },
  { key: 'Case2276472_TapBasic', id: '2276472', title: 'TapGestureHandler测试 - 基本点击' },
  { key: 'Case2276473_TapDouble', id: '2276473', title: 'TapGestureHandler测试 - 双击' },
  { key: 'Case2276474_TapLongPressDistinguish', id: '2276474', title: 'TapGestureHandler与LongPressGestureHandler区分测试' },
  { key: 'Case2276475_PanBasic', id: '2276475', title: 'PanGestureHandler测试 - 基本拖拽' },
  { key: 'Case2276476_PanDirectionLock', id: '2276476', title: 'PanGestureHandler测试 - 方向锁定' },
  { key: 'Case2276477_PanMinDist', id: '2276477', title: 'PanGestureHandler测试 - 最小距离' },
  { key: 'Case2276478_PinchBasic', id: '2276478', title: 'PinchGestureHandler测试 - 基本捏合' },
  { key: 'Case2276479_PinchWithRotation', id: '2276479', title: 'PinchGestureHandler测试 - 带旋转' },
  { key: 'Case2276480_RotationBasic', id: '2276480', title: 'RotationGestureHandler测试 - 基本旋转' },
  { key: 'Case2276481_LongPressBasic', id: '2276481', title: 'LongPressGestureHandler测试 - 基本长按' },
  { key: 'Case2276482_LongPressCustomDuration', id: '2276482', title: 'LongPressGestureHandler测试 - 自定义时长' },
  { key: 'Case2276483_FlingBasic', id: '2276483', title: 'FlingGestureHandler测试 - 基本快扫' },
  { key: 'Case2276484_FlingDirectional', id: '2276484', title: 'FlingGestureHandler测试 - 方向性快扫' },
  { key: 'Case2276485_NativeButton', id: '2276485', title: 'NativeButtonGestureHandler测试 - 基本按钮' },
  { key: 'Case2276486_PinchRotationCombo', id: '2276486', title: '手势组合测试 - 捏合与旋转' },
  { key: 'Case2276487_PanPinchCombo', id: '2276487', title: '手势组合测试 - 拖拽与捏合' },
  { key: 'Case2276488_TapWaitDoubleTap', id: '2276488', title: '等待手势测试 - 单击等待双击' },
  { key: 'Case2276489_TapWaitLongPress', id: '2276489', title: '等待手势测试 - 点击等待长按' },
  { key: 'Case2276490_HorizontalVerticalMutex', id: '2276490', title: '互斥手势测试 - 水平与垂直拖拽' },
  { key: 'Case2276491_PanTapMutex', id: '2276491', title: '互斥手势测试 - 拖拽与点击' },
  { key: 'Case2276492_NestedTap', id: '2276492', title: '嵌套手势处理器测试 - 嵌套点击处理器' },
  { key: 'Case2276493_NestedPan', id: '2276493', title: '嵌套手势处理器测试 - 嵌套拖拽处理器' },
  { key: 'Case2276494_NestedScrollView', id: '2276494', title: '嵌套可滚动组件测试 - 嵌套ScrollView' },
  { key: 'Case2276495_ScrollViewDrag', id: '2276495', title: '嵌套可滚动组件测试 - ScrollView中的拖拽元素' },
  { key: 'Case2276496_TouchableCombo', id: '2276496', title: '与原生组件结合测试 - Touchable组件' },
  { key: 'Case2276497_TextInputCombo', id: '2276497', title: '与原生组件结合测试 - TextInput组件' },
]

interface DemoState {
  currentTestCase: string
  logs: string[]
  tapCount: number
  doubleTapCount: number
  distinguishTapCount: number
  distinguishLongPressCount: number
  minDist: number
  minDistActive: boolean
  pinchScale: number
  comboScale479: number
  comboRotation479: number
  rotationAngle: number
  longPressCount: number
  customLongPressCount: number
  customMinDuration: number
  flingCount: number
  leftFlingCount: number
  nativeButtonCount: number
  combo486Scale: number
  combo486Rotation: number
  combo487Scale: number
  singleTap488Count: number
  doubleTap488Count: number
  tap489Count: number
  longPress489Count: number
  horizontalInfo: string
  verticalInfo: string
  pan491Info: string
  tap491Count: number
  outerTapCount: number
  innerTapCount: number
  outerPanInfo: string
  innerPanInfo: string
  touchableCount: number
  textInputValue: string
  textInputTapCount: number
}

class RNGestureHandlerDemo extends Component<any, DemoState> {
  // ── Animated Values (initialized in constructor) ──
  panBasicX: Animated.Value
  panBasicY: Animated.Value
  panHorizontalX: Animated.Value
  panVerticalY: Animated.Value
  panMinDistX: Animated.Value
  pinchScaleAnim: Animated.Value
  rotateAngleAnim: Animated.Value
  combo479ScaleAnim: Animated.Value
  combo479RotateAnim: Animated.Value
  combo486ScaleAnim: Animated.Value
  combo486RotateAnim: Animated.Value
  combo487PanX: Animated.Value
  combo487PanY: Animated.Value
  combo487ScaleAnim: Animated.Value
  mutex490HX: Animated.Value
  mutex490VY: Animated.Value
  mutex491PanX: Animated.Value
  mutex491PanY: Animated.Value
  nestedOuterPanX: Animated.Value
  nestedOuterPanY: Animated.Value
  nestedInnerPanX: Animated.Value
  nestedInnerPanY: Animated.Value
  scrollDragX: Animated.Value
  scrollDragY: Animated.Value

  // ── Animated Event Handlers ──
  onPanBasicEvent: any
  onPanHorizontalEvent: any
  onPanVerticalEvent: any
  onPanMinDistEvent: any
  onPinchBasicEvent: any
  onRotateBasicEvent: any
  onCombo479PinchEvent: any
  onCombo479RotateEvent: any
  onCombo486PinchEvent: any
  onCombo486RotateEvent: any
  onCombo487PanEvent: any
  onCombo487PinchEvent: any
  onMutex490HEvent: any
  onMutex490VEvent: any
  onMutex491PanEvent: any
  onNestedOuterPanEvent: any
  onNestedInnerPanEvent: any
  onScrollDragEvent: any

  // ── Refs ──
  longPressRef474 = React.createRef<any>()
  tapRef474 = React.createRef<any>()
  pinchRef479 = React.createRef<any>()
  rotateRef479 = React.createRef<any>()
  pinchRef486 = React.createRef<any>()
  rotateRef486 = React.createRef<any>()
  panRef487 = React.createRef<any>()
  pinchRef487 = React.createRef<any>()
  tapRef488Single = React.createRef<any>()
  tapRef488Double = React.createRef<any>()
  tapRef489 = React.createRef<any>()
  longPressRef489 = React.createRef<any>()

  constructor(props: any) {
    super(props)

    this.state = {
      currentTestCase: '',
      logs: [],
      tapCount: 0,
      doubleTapCount: 0,
      distinguishTapCount: 0,
      distinguishLongPressCount: 0,
      minDist: 100,
      minDistActive: false,
      pinchScale: 1,
      comboScale479: 1,
      comboRotation479: 0,
      rotationAngle: 0,
      longPressCount: 0,
      customLongPressCount: 0,
      customMinDuration: 1500,
      flingCount: 0,
      leftFlingCount: 0,
      nativeButtonCount: 0,
      combo486Scale: 1,
      combo486Rotation: 0,
      combo487Scale: 1,
      singleTap488Count: 0,
      doubleTap488Count: 0,
      tap489Count: 0,
      longPress489Count: 0,
      horizontalInfo: 'idle',
      verticalInfo: 'idle',
      pan491Info: 'idle',
      tap491Count: 0,
      outerTapCount: 0,
      innerTapCount: 0,
      outerPanInfo: 'idle',
      innerPanInfo: 'idle',
      touchableCount: 0,
      textInputValue: '',
      textInputTapCount: 0,
    }

    // ── Initialize Animated Values ──
    this.panBasicX = new Animated.Value(0)
    this.panBasicY = new Animated.Value(0)
    this.panHorizontalX = new Animated.Value(0)
    this.panVerticalY = new Animated.Value(0)
    this.panMinDistX = new Animated.Value(0)
    this.pinchScaleAnim = new Animated.Value(1)
    this.rotateAngleAnim = new Animated.Value(0)
    this.combo479ScaleAnim = new Animated.Value(1)
    this.combo479RotateAnim = new Animated.Value(0)
    this.combo486ScaleAnim = new Animated.Value(1)
    this.combo486RotateAnim = new Animated.Value(0)
    this.combo487PanX = new Animated.Value(0)
    this.combo487PanY = new Animated.Value(0)
    this.combo487ScaleAnim = new Animated.Value(1)
    this.mutex490HX = new Animated.Value(0)
    this.mutex490VY = new Animated.Value(0)
    this.mutex491PanX = new Animated.Value(0)
    this.mutex491PanY = new Animated.Value(0)
    this.nestedOuterPanX = new Animated.Value(0)
    this.nestedOuterPanY = new Animated.Value(0)
    this.nestedInnerPanX = new Animated.Value(0)
    this.nestedInnerPanY = new Animated.Value(0)
    this.scrollDragX = new Animated.Value(0)
    this.scrollDragY = new Animated.Value(0)

    // ── Animated Event Handlers ──

    this.onPanBasicEvent = Animated.event(
      [{ nativeEvent: { translationX: this.panBasicX, translationY: this.panBasicY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Pan] active tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
        }
      }},
    )

    this.onPanHorizontalEvent = Animated.event(
      [{ nativeEvent: { translationX: this.panHorizontalX } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[HorizontalPan] tx:${translationX.toFixed(1)}`)
        }
      }},
    )

    this.onPanVerticalEvent = Animated.event(
      [{ nativeEvent: { translationY: this.panVerticalY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[VerticalPan] ty:${translationY.toFixed(1)}`)
        }
      }},
    )

    this.onPanMinDistEvent = Animated.event(
      [{ nativeEvent: { translationX: this.panMinDistX } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, translationY, state } = e.nativeEvent
        const active = state === GestureState.ACTIVE
        if (active && !this.state.minDistActive) {
          this.addLog(`[PanMinDist] ACTIVE tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
        }
        this.setState({ minDistActive: active })
      }},
    )

    this.onPinchBasicEvent = Animated.event(
      [{ nativeEvent: { scale: this.pinchScaleAnim } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { scale, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Pinch] scale:${scale.toFixed(2)}`)
          this.setState({ pinchScale: scale })
        }
      }},
    )

    this.onRotateBasicEvent = Animated.event(
      [{ nativeEvent: { rotation: this.rotateAngleAnim } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { rotation, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          const deg = (rotation * 180 / Math.PI).toFixed(1)
          this.addLog(`[Rotation] angle:${deg}deg`)
          this.setState({ rotationAngle: rotation })
        }
      }},
    )

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

    this.onCombo486PinchEvent = Animated.event(
      [{ nativeEvent: { scale: this.combo486ScaleAnim } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { scale, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Combo486Pinch] scale:${scale.toFixed(2)}`)
          this.setState({ combo486Scale: scale })
        }
      }},
    )

    this.onCombo486RotateEvent = Animated.event(
      [{ nativeEvent: { rotation: this.combo486RotateAnim } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { rotation, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          const deg = (rotation * 180 / Math.PI).toFixed(1)
          this.addLog(`[Combo486Rotate] angle:${deg}deg`)
          this.setState({ combo486Rotation: rotation })
        }
      }},
    )

    this.onCombo487PanEvent = Animated.event(
      [{ nativeEvent: { translationX: this.combo487PanX, translationY: this.combo487PanY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Combo487Pan] tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
        }
      }},
    )

    this.onCombo487PinchEvent = Animated.event(
      [{ nativeEvent: { scale: this.combo487ScaleAnim } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { scale, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Combo487Pinch] scale:${scale.toFixed(2)}`)
          this.setState({ combo487Scale: scale })
        }
      }},
    )

    this.onMutex490HEvent = Animated.event(
      [{ nativeEvent: { translationX: this.mutex490HX } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Mutex490H] tx:${translationX.toFixed(1)}`)
          this.setState({ horizontalInfo: `tx:${translationX.toFixed(1)}` })
        }
      }},
    )

    this.onMutex490VEvent = Animated.event(
      [{ nativeEvent: { translationY: this.mutex490VY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Mutex490V] ty:${translationY.toFixed(1)}`)
          this.setState({ verticalInfo: `ty:${translationY.toFixed(1)}` })
        }
      }},
    )

    this.onMutex491PanEvent = Animated.event(
      [{ nativeEvent: { translationX: this.mutex491PanX, translationY: this.mutex491PanY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[Mutex491Pan] tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
          this.setState({ pan491Info: `tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}` })
        }
      }},
    )

    this.onNestedOuterPanEvent = Animated.event(
      [{ nativeEvent: { translationX: this.nestedOuterPanX, translationY: this.nestedOuterPanY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[OuterPan] tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
          this.setState({ outerPanInfo: `tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}` })
        }
      }},
    )

    this.onNestedInnerPanEvent = Animated.event(
      [{ nativeEvent: { translationX: this.nestedInnerPanX, translationY: this.nestedInnerPanY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[InnerPan] tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
          this.setState({ innerPanInfo: `tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}` })
        }
      }},
    )

    this.onScrollDragEvent = Animated.event(
      [{ nativeEvent: { translationX: this.scrollDragX, translationY: this.scrollDragY } }],
      { useNativeDriver: true, listener: (e: any) => {
        const { translationX, translationY, state } = e.nativeEvent
        if (state === GestureState.ACTIVE) {
          this.addLog(`[ScrollDrag] tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
        }
      }},
    )
  }

  // ═══════════════════════════════════════════════════════
  // UTILITY METHODS
  // ═══════════════════════════════════════════════════════

  runTestCase = (testCase: string) => {
    // Reset all animated values
    const animValues = [
      this.panBasicX, this.panBasicY, this.panHorizontalX, this.panVerticalY,
      this.panMinDistX, this.mutex490HX, this.mutex490VY,
      this.mutex491PanX, this.mutex491PanY, this.combo487PanX, this.combo487PanY,
      this.nestedOuterPanX, this.nestedOuterPanY, this.nestedInnerPanX, this.nestedInnerPanY,
      this.scrollDragX, this.scrollDragY, this.rotateAngleAnim,
      this.combo479RotateAnim, this.combo486RotateAnim,
    ]
    animValues.forEach(v => v.setValue(0))

    const scaleValues = [
      this.pinchScaleAnim, this.combo479ScaleAnim,
      this.combo486ScaleAnim, this.combo487ScaleAnim,
    ]
    scaleValues.forEach(v => v.setValue(1))

    this.setState({
      currentTestCase: testCase,
      logs: [],
      tapCount: 0,
      doubleTapCount: 0,
      distinguishTapCount: 0,
      distinguishLongPressCount: 0,
      minDist: 100,
      minDistActive: false,
      pinchScale: 1,
      comboScale479: 1,
      comboRotation479: 0,
      rotationAngle: 0,
      longPressCount: 0,
      customLongPressCount: 0,
      customMinDuration: 1500,
      flingCount: 0,
      leftFlingCount: 0,
      nativeButtonCount: 0,
      combo486Scale: 1,
      combo486Rotation: 0,
      combo487Scale: 1,
      singleTap488Count: 0,
      doubleTap488Count: 0,
      tap489Count: 0,
      longPress489Count: 0,
      horizontalInfo: 'idle',
      verticalInfo: 'idle',
      pan491Info: 'idle',
      tap491Count: 0,
      outerTapCount: 0,
      innerTapCount: 0,
      outerPanInfo: 'idle',
      innerPanInfo: 'idle',
      touchableCount: 0,
      textInputValue: '',
      textInputTapCount: 0,
    })
  }

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

  renderBackButton = () => (
    <TouchableOpacity style={styles.backBtn} onPress={() => this.runTestCase('')}>
      <Text style={styles.backBtnText}>← 返回主页</Text>
    </TouchableOpacity>
  )

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
      <ScrollView style={styles.flex1} contentContainerStyle={styles.caseContainer}>
        {this.renderBackButton()}
        <Text style={styles.caseTitle}>{title}</Text>
        <Text style={styles.caseId}>EC用例: {caseId}</Text>
        {/* 上方：操作区域 — 手势处理器在 operationArea 内部自行包裹 GestureHandlerRootView */}
        <View style={styles.operationArea}>{operationArea}</View>
        {/* 中间：控制面板 */}
        {controlPanel && <View style={styles.controlPanel}>{controlPanel}</View>}
        {/* 底部：日志区 */}
        {this.renderLogArea()}
      </ScrollView>
    </View>
  )

  // ═══════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════

  render() {
    const { currentTestCase } = this.state
    switch (currentTestCase) {
      case 'Case2276467_NoProps': return this.renderCase2276467()
      case 'Case2276468_InvalidProps': return this.renderCase2276468()
      case 'Case2276469_SingleChild': return this.renderCase2276469()
      case 'Case2276470_MultiChild': return this.renderCase2276470()
      case 'Case2276471_NoChild': return this.renderCase2276471()
      case 'Case2276472_TapBasic': return this.renderCase2276472()
      case 'Case2276473_TapDouble': return this.renderCase2276473()
      case 'Case2276474_TapLongPressDistinguish': return this.renderCase2276474()
      case 'Case2276475_PanBasic': return this.renderCase2276475()
      case 'Case2276476_PanDirectionLock': return this.renderCase2276476()
      case 'Case2276477_PanMinDist': return this.renderCase2276477()
      case 'Case2276478_PinchBasic': return this.renderCase2276478()
      case 'Case2276479_PinchWithRotation': return this.renderCase2276479()
      case 'Case2276480_RotationBasic': return this.renderCase2276480()
      case 'Case2276481_LongPressBasic': return this.renderCase2276481()
      case 'Case2276482_LongPressCustomDuration': return this.renderCase2276482()
      case 'Case2276483_FlingBasic': return this.renderCase2276483()
      case 'Case2276484_FlingDirectional': return this.renderCase2276484()
      case 'Case2276485_NativeButton': return this.renderCase2276485()
      case 'Case2276486_PinchRotationCombo': return this.renderCase2276486()
      case 'Case2276487_PanPinchCombo': return this.renderCase2276487()
      case 'Case2276488_TapWaitDoubleTap': return this.renderCase2276488()
      case 'Case2276489_TapWaitLongPress': return this.renderCase2276489()
      case 'Case2276490_HorizontalVerticalMutex': return this.renderCase2276490()
      case 'Case2276491_PanTapMutex': return this.renderCase2276491()
      case 'Case2276492_NestedTap': return this.renderCase2276492()
      case 'Case2276493_NestedPan': return this.renderCase2276493()
      case 'Case2276494_NestedScrollView': return this.renderCase2276494()
      case 'Case2276495_ScrollViewDrag': return this.renderCase2276495()
      case 'Case2276496_TouchableCombo': return this.renderCase2276496()
      case 'Case2276497_TextInputCombo': return this.renderCase2276497()
      default: return this.renderHomePage()
    }
  }

  // ═══════════════════════════════════════════════════════
  // HOME PAGE
  // ═══════════════════════════════════════════════════════

  renderHomePage = () => (
    <GestureHandlerRootView style={styles.flex1}>
      <ScrollView style={styles.flex1} contentContainerStyle={styles.homeContainer}>
        <Text style={styles.homeTitle}>GestureHandler 测试用例</Text>
        <Text style={styles.homeSubtitle}>共 {TEST_CASES.length} 条 EC 用例</Text>
        {TEST_CASES.map((tc) => (
          <TouchableOpacity
            key={tc.key}
            style={styles.homeBtn}
            onPress={() => this.runTestCase(tc.key)}
          >
            <Text style={styles.homeBtnId}>{tc.id}</Text>
            <Text style={styles.homeBtnTitle}>{tc.title}</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </GestureHandlerRootView>
  )

  // ═══════════════════════════════════════════════════════
  // CASE 2276467 — 无属性
  // ═══════════════════════════════════════════════════════

  renderCase2276467 = () => {
    // componentDidMount 等效：在渲染时记录日志
    setTimeout(() => {
      if (this.state.logs.length === 0 && this.state.currentTestCase === 'Case2276467_NoProps') {
        this.addLog('[NoProps] 页面正常渲染')
      }
    }, 100)
    return this.renderCaseLayout(
      'GestureHandler组件测试 - 无属性', '2276467',
      <View>
        <GestureHandlerRootView>
          <Text style={styles.guideText}>GestureHandlerRootView 无任何额外属性</Text>
          <Text style={styles.guideText}>正常渲染不崩溃即通过</Text>
        </GestureHandlerRootView>
      </View>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276468 — 无效属性
  // ═══════════════════════════════════════════════════════

  renderCase2276468 = () => {
    setTimeout(() => {
      if (this.state.logs.length === 0 && this.state.currentTestCase === 'Case2276468_InvalidProps') {
        this.addLog('[InvalidProps] 页面正常渲染')
      }
    }, 100)
    return this.renderCaseLayout(
      'GestureHandler组件测试 - 无效属性', '2276468',
      <View>
        {/* @ts-ignore */}
        <GestureHandlerRootView invalidProp="test" fakeAttr={123}>
          <Text style={styles.guideText}>传入了 invalidProp 和 fakeAttr</Text>
          <Text style={styles.guideText}>不崩溃即通过</Text>
        </GestureHandlerRootView>
      </View>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276469 — 单一子组件
  // ═══════════════════════════════════════════════════════

  renderCase2276469 = () => {
    return this.renderCaseLayout(
      'GestureHandler组件测试 - 单一子组件', '2276469',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>点击下方区域触发 Tap</Text>
        <TapGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              this.addLog('[SingleChild] Tap triggered')
            }
          }}
        >
          <View style={styles.tapBox}>
            <Text style={styles.boxText}>点击此处</Text>
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276470 — 多个子组件
  // ═══════════════════════════════════════════════════════

  renderCase2276470 = () => {
    return this.renderCaseLayout(
      'GestureHandler组件测试 - 多个子组件', '2276470',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>TapGestureHandler + LongPressGestureHandler 各自独立响应</Text>
        <TapGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              this.addLog('[MultiChild] Tap triggered')
            }
          }}
        >
          <View style={styles.tapBox}>
            <Text style={styles.boxText}>点击此处 (Tap)</Text>
          </View>
        </TapGestureHandler>
        <LongPressGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              this.addLog('[MultiChild] LongPress triggered')
            }
          }}
        >
          <View style={styles.longPressBox}>
            <Text style={styles.boxText}>长按此处 (LongPress)</Text>
          </View>
        </LongPressGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276471 — 无子组件
  // ═══════════════════════════════════════════════════════

  renderCase2276471 = () => {
    setTimeout(() => {
      if (this.state.logs.length === 0 && this.state.currentTestCase === 'Case2276471_NoChild') {
        this.addLog('[NoChild] 页面正常渲染')
      }
    }, 100)
    return this.renderCaseLayout(
      'GestureHandler组件测试 - 无子组件', '2276471',
      <View>
        <GestureHandlerRootView style={{ height: 100, backgroundColor: '#eee', borderRadius: 8 }} />
        <Text style={styles.guideText}>GestureHandlerRootView 内无子组件</Text>
        <Text style={styles.guideText}>不崩溃即通过</Text>
      </View>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276472 — TapBasic
  // ═══════════════════════════════════════════════════════

  renderCase2276472 = () => {
    return this.renderCaseLayout(
      'TapGestureHandler测试 - 基本点击', '2276472',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>点击下方区域</Text>
        <TapGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.tapCount + 1
              this.setState({ tapCount: count })
              this.addLog(`[Tap] Tap triggered count:${count}`)
            }
          }}
        >
          <View style={styles.tapBox}>
            <Text style={styles.boxText}>点击此处</Text>
            <Text style={styles.boxSubText}>次数: {this.state.tapCount}</Text>
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276473 — TapDouble
  // ═══════════════════════════════════════════════════════

  renderCase2276473 = () => {
    return this.renderCaseLayout(
      'TapGestureHandler测试 - 双击', '2276473',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>双击下方区域</Text>
        <TapGestureHandler
          numberOfTaps={2}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.doubleTapCount + 1
              this.setState({ doubleTapCount: count })
              this.addLog(`[DoubleTap] DoubleTap triggered count:${count}`)
            }
          }}
        >
          <View style={styles.tapBox}>
            <Text style={styles.boxText}>双击此处</Text>
            <Text style={styles.boxSubText}>次数: {this.state.doubleTapCount}</Text>
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276474 — TapLongPressDistinguish
  // ═══════════════════════════════════════════════════════

  renderCase2276474 = () => {
    return this.renderCaseLayout(
      'TapGestureHandler与LongPressGestureHandler区分测试', '2276474',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>短按触发 Tap，长按触发 LongPress</Text>
        <LongPressGestureHandler
          ref={this.longPressRef474}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.distinguishLongPressCount + 1
              this.setState({ distinguishLongPressCount: count })
              this.addLog(`[Distinguish] LongPress triggered count:${count}`)
            }
          }}
          minDurationMs={800}
        >
          <TapGestureHandler
            ref={this.tapRef474}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.ACTIVE) {
                const count = this.state.distinguishTapCount + 1
                this.setState({ distinguishTapCount: count })
                this.addLog(`[Distinguish] Tap triggered count:${count}`)
              }
            }}
            waitFor={this.longPressRef474}
          >
            <View style={styles.combinedBox}>
              <Text style={styles.boxText}>点击或长按此处</Text>
              <Text style={styles.boxSubText}>Tap: {this.state.distinguishTapCount} | LongPress: {this.state.distinguishLongPressCount}</Text>
            </View>
          </TapGestureHandler>
        </LongPressGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276475 — PanBasic
  // ═══════════════════════════════════════════════════════

  renderCase2276475 = () => {
    return this.renderCaseLayout(
      'PanGestureHandler测试 - 基本拖拽', '2276475',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>拖拽下方方块，松手后弹回</Text>
        <PanGestureHandler
          onGestureEvent={this.onPanBasicEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Pan] gesture ended, springing back')
              this.springReset(this.panBasicX)
              this.springReset(this.panBasicY)
            }
          }}
        >
          <Animated.View style={[styles.dragBox, {
            transform: [{ translateX: this.panBasicX }, { translateY: this.panBasicY }],
          }]}>
            <Text style={styles.boxText}>拖拽我</Text>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276476 — PanDirectionLock
  // ═══════════════════════════════════════════════════════

  renderCase2276476 = () => {
    return this.renderCaseLayout(
      'PanGestureHandler测试 - 方向锁定', '2276476',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>红色块仅水平拖动，绿色块仅垂直拖动</Text>
        <View style={styles.dirRow}>
          <PanGestureHandler
            onGestureEvent={this.onPanHorizontalEvent}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.END) {
                this.addLog('[HorizontalPan] ended')
                this.springReset(this.panHorizontalX)
              }
            }}
            activeOffsetX={[-10, 10]}
            failOffsetY={[-10, 10]}
          >
            <Animated.View style={[styles.dirBox, { backgroundColor: '#e74c3c', transform: [{ translateX: this.panHorizontalX }] }]}>
              <Text style={styles.boxText}>仅水平</Text>
            </Animated.View>
          </PanGestureHandler>
          <PanGestureHandler
            onGestureEvent={this.onPanVerticalEvent}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.END) {
                this.addLog('[VerticalPan] ended')
                this.springReset(this.panVerticalY)
              }
            }}
            activeOffsetY={[-10, 10]}
            failOffsetX={[-10, 10]}
          >
            <Animated.View style={[styles.dirBox, { backgroundColor: '#27ae60', transform: [{ translateY: this.panVerticalY }] }]}>
              <Text style={styles.boxText}>仅垂直</Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276477 — PanMinDist
  // ═══════════════════════════════════════════════════════

  renderCase2276477 = () => {
    return this.renderCaseLayout(
      'PanGestureHandler测试 - 最小距离', '2276477',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>拖动超过 {this.state.minDist}px 才激活</Text>
        <PanGestureHandler
          onGestureEvent={this.onPanMinDistEvent}
          onHandlerStateChange={(e: any) => {
            const { state } = e.nativeEvent
            this.addLog(`[PanMinDist] stateChange: ${getStateName(state)}`)
            if (state === GestureState.END) {
              this.springReset(this.panMinDistX)
              this.setState({ minDistActive: false })
            }
          }}
          minDist={this.state.minDist}
        >
          <Animated.View style={[styles.minDistBox, {
            backgroundColor: this.state.minDistActive ? '#ff9500' : '#666',
            transform: [{ translateX: this.panMinDistX }],
          }]}>
            <Text style={styles.boxText}>最小距离: {this.state.minDist}px</Text>
            <Text style={styles.boxSubText}>{this.state.minDistActive ? 'ACTIVE' : 'INACTIVE'}</Text>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>,
      <View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>minDist: {this.state.minDist}</Text>
          {[0, 50, 100, 200].map(v => (
            <TouchableOpacity key={v} style={styles.controlBtn} onPress={() => this.setState({ minDist: v })}>
              <Text style={styles.controlBtnText}>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276478 — PinchBasic
  // ═══════════════════════════════════════════════════════

  renderCase2276478 = () => {
    return this.renderCaseLayout(
      'PinchGestureHandler测试 - 基本捏合', '2276478',
      <GestureHandlerRootView style={styles.gestureArea}>
        <Text style={styles.guideText}>双指缩放下方方块</Text>
        <PinchGestureHandler
          onGestureEvent={this.onPinchBasicEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Pinch] ended')
              this.springReset(this.pinchScaleAnim, 1)
            }
          }}
        >
          <Animated.View style={[styles.pinchBox, {
            transform: [{ scale: this.pinchScaleAnim }],
          }]}>
            <Text style={styles.boxText}>捏合缩放</Text>
            <Text style={styles.boxSubText}>scale: {this.state.pinchScale.toFixed(2)}</Text>
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276479 — PinchWithRotation
  // ═══════════════════════════════════════════════════════

  renderCase2276479 = () => {
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
                // this.springReset(this.combo479RotateAnim)
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

  // ═══════════════════════════════════════════════════════
  // CASE 2276480 — RotationBasic
  // ═══════════════════════════════════════════════════════

  renderCase2276480 = () => {
    return this.renderCaseLayout(
      'RotationGestureHandler测试 - 基本旋转', '2276480',
      <GestureHandlerRootView style={styles.gestureArea}>
        <Text style={styles.guideText}>双指旋转下方方块</Text>
        <RotationGestureHandler
          onGestureEvent={this.onRotateBasicEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Rotation] ended')
              this.springReset(this.rotateAngleAnim)
            }
          }}
        >
          <Animated.View style={[styles.rotateBox, {
            transform: [{
              rotate: this.rotateAngleAnim.interpolate({
                inputRange: [-Math.PI, Math.PI],
                outputRange: ['-180deg', '180deg'],
              }),
            }],
          }]}>
            <Text style={styles.boxText}>旋转我</Text>
            <Text style={styles.boxSubText}>{(this.state.rotationAngle * 180 / Math.PI).toFixed(1)}°</Text>
          </Animated.View>
        </RotationGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276481 — LongPressBasic
  // ═══════════════════════════════════════════════════════

  renderCase2276481 = () => {
    return this.renderCaseLayout(
      'LongPressGestureHandler测试 - 基本长按', '2276481',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>长按下方区域（默认时长约500ms）</Text>
        <LongPressGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.longPressCount + 1
              this.setState({ longPressCount: count })
              this.addLog(`[LongPress] LongPress triggered count:${count}`)
            }
          }}
        >
          <View style={styles.longPressBox}>
            <Text style={styles.boxText}>长按此处</Text>
            <Text style={styles.boxSubText}>次数: {this.state.longPressCount}</Text>
          </View>
        </LongPressGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276482 — LongPressCustomDuration
  // ═══════════════════════════════════════════════════════

  renderCase2276482 = () => {
    return this.renderCaseLayout(
      'LongPressGestureHandler测试 - 自定义时长', '2276482',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>长按 {this.state.customMinDuration}ms 后触发</Text>
        <LongPressGestureHandler
          minDurationMs={this.state.customMinDuration}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.customLongPressCount + 1
              this.setState({ customLongPressCount: count })
              this.addLog(`[LongPressCustom] triggered after ${this.state.customMinDuration}ms count:${count}`)
            }
          }}
        >
          <View style={styles.longPressBox}>
            <Text style={styles.boxText}>长按此处</Text>
            <Text style={styles.boxSubText}>次数: {this.state.customLongPressCount}</Text>
          </View>
        </LongPressGestureHandler>
      </GestureHandlerRootView>,
      <View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>minDurationMs: {this.state.customMinDuration}</Text>
          {[500, 1000, 1500, 2000].map(v => (
            <TouchableOpacity key={v} style={styles.controlBtn} onPress={() => this.setState({ customMinDuration: v })}>
              <Text style={styles.controlBtnText}>{v}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276483 — FlingBasic
  // ═══════════════════════════════════════════════════════

  renderCase2276483 = () => {
    return this.renderCaseLayout(
      'FlingGestureHandler测试 - 基本快扫', '2276483',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>在下方区域任意方向快扫</Text>
        <FlingGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.flingCount + 1
              this.setState({ flingCount: count })
              this.addLog(`[Fling] Fling triggered count:${count}`)
            }
          }}
        >
          <View style={styles.flingBox}>
            <Text style={styles.boxText}>任意方向快扫</Text>
            <Text style={styles.boxSubText}>次数: {this.state.flingCount}</Text>
          </View>
        </FlingGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276484 — FlingDirectional
  // ═══════════════════════════════════════════════════════

  renderCase2276484 = () => {
    return this.renderCaseLayout(
      'FlingGestureHandler测试 - 方向性快扫', '2276484',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>仅响应向左快扫</Text>
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.leftFlingCount + 1
              this.setState({ leftFlingCount: count })
              this.addLog(`[FlingLeft] Left fling triggered count:${count}`)
            }
          }}
        >
          <View style={styles.flingBox}>
            <Text style={styles.boxText}>← 向左快扫</Text>
            <Text style={styles.boxSubText}>次数: {this.state.leftFlingCount}</Text>
          </View>
        </FlingGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276485 — NativeButton
  // ═══════════════════════════════════════════════════════

  renderCase2276485 = () => {
    return this.renderCaseLayout(
      'NativeButtonGestureHandler测试 - 基本按钮', '2276485',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>点击下方原生按钮</Text>
        <NativeViewGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.nativeButtonCount + 1
              this.setState({ nativeButtonCount: count })
              this.addLog(`[NativeButton] pressed count:${count}`)
            }
          }}
          shouldActivateOnStart={true}
          disallowInterruption={true}
        >
          <View style={styles.nativeBtn}>
            <Text style={styles.boxText}>原生按钮</Text>
            <Text style={styles.boxSubText}>次数: {this.state.nativeButtonCount}</Text>
          </View>
        </NativeViewGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276486 — PinchRotationCombo
  // ═══════════════════════════════════════════════════════

  renderCase2276486 = () => {
    return this.renderCaseLayout(
      '手势组合测试 - 捏合与旋转', '2276486',
      <GestureHandlerRootView style={styles.gestureArea}>
        <Text style={styles.guideText}>双指同时捏合 + 旋转 (simultaneousHandlers)</Text>
        <PinchGestureHandler
          ref={this.pinchRef486}
          simultaneousHandlers={this.rotateRef486}
          onGestureEvent={this.onCombo486PinchEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Combo486] pinch ended')
              this.springReset(this.combo486ScaleAnim, 1)
            }
          }}
        >
          <RotationGestureHandler
            ref={this.rotateRef486}
            simultaneousHandlers={this.pinchRef486}
            onGestureEvent={this.onCombo486RotateEvent}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.END) {
                this.addLog('[Combo486] rotation ended')
                this.springReset(this.combo486RotateAnim)
              }
            }}
          >
            <Animated.View style={[styles.comboBox, {
              transform: [
                { scale: this.combo486ScaleAnim },
                { rotate: this.combo486RotateAnim.interpolate({ inputRange: [-Math.PI, Math.PI], outputRange: ['-180deg', '180deg'] }) },
              ],
            }]}>
              <Text style={styles.boxText}>捏合+旋转</Text>
              <Text style={styles.boxSubText}>scale: {this.state.combo486Scale.toFixed(2)}</Text>
              <Text style={styles.boxSubText}>angle: {(this.state.combo486Rotation * 180 / Math.PI).toFixed(1)}°</Text>
            </Animated.View>
          </RotationGestureHandler>
        </PinchGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276487 — PanPinchCombo
  // ═══════════════════════════════════════════════════════

  renderCase2276487 = () => {
    return this.renderCaseLayout(
      '手势组合测试 - 拖拽与捏合', '2276487',
      <GestureHandlerRootView style={styles.gestureArea}>
        <Text style={styles.guideText}>同时拖拽 + 双指捏合 (simultaneousHandlers)</Text>
        <PanGestureHandler
          ref={this.panRef487}
          simultaneousHandlers={this.pinchRef487}
          onGestureEvent={this.onCombo487PanEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Combo487] pan ended')
              this.springReset(this.combo487PanX)
              this.springReset(this.combo487PanY)
            }
          }}
        >
          <PinchGestureHandler
            ref={this.pinchRef487}
            simultaneousHandlers={this.panRef487}
            onGestureEvent={this.onCombo487PinchEvent}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.END) {
                this.addLog('[Combo487] pinch ended')
                this.springReset(this.combo487ScaleAnim, 1)
              }
            }}
          >
            <Animated.View style={[styles.comboBox, {
              transform: [
                { translateX: this.combo487PanX },
                { translateY: this.combo487PanY },
                { scale: this.combo487ScaleAnim },
              ],
            }]}>
              <Text style={styles.boxText}>拖拽+捏合</Text>
              <Text style={styles.boxSubText}>scale: {this.state.combo487Scale.toFixed(2)}</Text>
            </Animated.View>
          </PinchGestureHandler>
        </PanGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276488 — TapWaitDoubleTap
  // ═══════════════════════════════════════════════════════

  renderCase2276488 = () => {
    return this.renderCaseLayout(
      '等待手势测试 - 单击等待双击', '2276488',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>单击 waitFor 双击：双击时只触发双击，单击时延迟触发单击</Text>
        <TapGestureHandler
          ref={this.tapRef488Double}
          numberOfTaps={2}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.doubleTap488Count + 1
              this.setState({ doubleTap488Count: count })
              this.addLog(`[WaitDoubleTap] DoubleTap triggered count:${count}`)
            }
          }}
        >
          <TapGestureHandler
            ref={this.tapRef488Single}
            waitFor={this.tapRef488Double}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.ACTIVE) {
                const count = this.state.singleTap488Count + 1
                this.setState({ singleTap488Count: count })
                this.addLog(`[WaitDoubleTap] SingleTap triggered count:${count}`)
              }
            }}
          >
            <View style={styles.combinedBox}>
              <Text style={styles.boxText}>单击或双击此处</Text>
              <Text style={styles.boxSubText}>Single: {this.state.singleTap488Count} | Double: {this.state.doubleTap488Count}</Text>
            </View>
          </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276489 — TapWaitLongPress
  // ═══════════════════════════════════════════════════════

  renderCase2276489 = () => {
    return this.renderCaseLayout(
      '等待手势测试 - 点击等待长按', '2276489',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>Tap waitFor LongPress：长按触发 LongPress，短按触发 Tap</Text>
        <LongPressGestureHandler
          ref={this.longPressRef489}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.longPress489Count + 1
              this.setState({ longPress489Count: count })
              this.addLog(`[WaitLongPress] LongPress triggered count:${count}`)
            }
          }}
          minDurationMs={800}
        >
          <TapGestureHandler
            ref={this.tapRef489}
            waitFor={this.longPressRef489}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.ACTIVE) {
                const count = this.state.tap489Count + 1
                this.setState({ tap489Count: count })
                this.addLog(`[WaitLongPress] Tap triggered count:${count}`)
              }
            }}
          >
            <View style={styles.combinedBox}>
              <Text style={styles.boxText}>点击或长按此处</Text>
              <Text style={styles.boxSubText}>Tap: {this.state.tap489Count} | LongPress: {this.state.longPress489Count}</Text>
            </View>
          </TapGestureHandler>
        </LongPressGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276490 — HorizontalVerticalMutex
  // ═══════════════════════════════════════════════════════

  renderCase2276490 = () => {
    return this.renderCaseLayout(
      '互斥手势测试 - 水平与垂直拖拽', '2276490',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>同一区域内水平Pan和垂直Pan互斥：初始方向决定哪个激活</Text>
        <Text style={styles.guideText}>水平滑动 → 仅水平移动；垂直滑动 → 仅垂直移动</Text>
        <PanGestureHandler
          onGestureEvent={this.onMutex490HEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Mutex490H] ended')
              this.springReset(this.mutex490HX)
            }
          }}
          activeOffsetX={[-10, 10]}
          failOffsetY={[-10, 10]}
        >
          <PanGestureHandler
            onGestureEvent={this.onMutex490VEvent}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.END) {
                this.addLog('[Mutex490V] ended')
                this.springReset(this.mutex490VY)
              }
            }}
            activeOffsetY={[-10, 10]}
            failOffsetX={[-10, 10]}
          >
            <Animated.View style={[styles.mutexBox, {
              transform: [{ translateX: this.mutex490HX }, { translateY: this.mutex490VY }],
            }]}>
              <Text style={styles.boxText}>拖拽此区域</Text>
              <Text style={styles.boxSubText}>水平: {this.state.horizontalInfo}</Text>
              <Text style={styles.boxSubText}>垂直: {this.state.verticalInfo}</Text>
            </Animated.View>
          </PanGestureHandler>
        </PanGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276491 — PanTapMutex
  // ═══════════════════════════════════════════════════════

  renderCase2276491 = () => {
    return this.renderCaseLayout(
      '互斥手势测试 - 拖拽与点击', '2276491',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>Pan和Tap不加simultaneousHandlers，自然互斥</Text>
        <PanGestureHandler
          onGestureEvent={this.onMutex491PanEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[Mutex491Pan] ended')
              this.springReset(this.mutex491PanX)
              this.springReset(this.mutex491PanY)
            }
          }}
        >
          <Animated.View style={[styles.dragBox, {
            transform: [{ translateX: this.mutex491PanX }, { translateY: this.mutex491PanY }],
          }]}>
            <TapGestureHandler
              onHandlerStateChange={(e: any) => {
                if (e.nativeEvent.state === GestureState.ACTIVE) {
                  const count = this.state.tap491Count + 1
                  this.setState({ tap491Count: count })
                  this.addLog(`[Mutex491Tap] Tap triggered count:${count}`)
                }
              }}
            >
              <View style={styles.innerTapArea}>
                <Text style={styles.boxText}>拖拽或点击</Text>
                <Text style={styles.boxSubText}>Pan: {this.state.pan491Info}</Text>
                <Text style={styles.boxSubText}>Tap: {this.state.tap491Count}</Text>
              </View>
            </TapGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276492 — NestedTap
  // ═══════════════════════════════════════════════════════

  renderCase2276492 = () => {
    return this.renderCaseLayout(
      '嵌套手势处理器测试 - 嵌套点击处理器', '2276492',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>外层Tap + 内层Tap，各自独立响应</Text>
        <TapGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.outerTapCount + 1
              this.setState({ outerTapCount: count })
              this.addLog(`[NestedTap] OuterTap triggered count:${count}`)
            }
          }}
        >
          <View style={styles.outerBox}>
            <Text style={styles.boxText}>外层 Tap 区域</Text>
            <Text style={styles.boxSubText}>外层: {this.state.outerTapCount}</Text>
            <TapGestureHandler
              onHandlerStateChange={(e: any) => {
                if (e.nativeEvent.state === GestureState.ACTIVE) {
                  const count = this.state.innerTapCount + 1
                  this.setState({ innerTapCount: count })
                  this.addLog(`[NestedTap] InnerTap triggered count:${count}`)
                }
              }}
            >
              <View style={styles.innerBox}>
                <Text style={styles.boxTextDark}>内层 Tap 区域</Text>
                <Text style={styles.boxSubTextDark}>内层: {this.state.innerTapCount}</Text>
              </View>
            </TapGestureHandler>
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276493 — NestedPan
  // ═══════════════════════════════════════════════════════

  renderCase2276493 = () => {
    return this.renderCaseLayout(
      '嵌套手势处理器测试 - 嵌套拖拽处理器', '2276493',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>外层Pan + 内层Pan，拖拽内层时内层响应</Text>
        <PanGestureHandler
          onGestureEvent={this.onNestedOuterPanEvent}
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.END) {
              this.addLog('[NestedPan] outer ended')
              this.springReset(this.nestedOuterPanX)
              this.springReset(this.nestedOuterPanY)
            }
          }}
        >
          <Animated.View style={[styles.outerDragBox, {
            transform: [{ translateX: this.nestedOuterPanX }, { translateY: this.nestedOuterPanY }],
          }]}>
            <Text style={styles.boxText}>外层 Pan</Text>
            <Text style={styles.boxSubText}>{this.state.outerPanInfo}</Text>
            <PanGestureHandler
              onGestureEvent={this.onNestedInnerPanEvent}
              onHandlerStateChange={(e: any) => {
                if (e.nativeEvent.state === GestureState.END) {
                  this.addLog('[NestedPan] inner ended')
                  this.springReset(this.nestedInnerPanX)
                  this.springReset(this.nestedInnerPanY)
                }
              }}
            >
              <Animated.View style={[styles.innerDragBox, {
                transform: [{ translateX: this.nestedInnerPanX }, { translateY: this.nestedInnerPanY }],
              }]}>
                <Text style={styles.boxTextDark}>内层 Pan</Text>
                <Text style={styles.boxSubTextDark}>{this.state.innerPanInfo}</Text>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276494 — NestedScrollView
  // ═══════════════════════════════════════════════════════

  renderCase2276494 = () => {
    return this.renderCaseLayout(
      '嵌套可滚动组件测试 - 嵌套ScrollView', '2276494',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>GestureHandler 内嵌套多层 ScrollView，验证内外层滚动不冲突</Text>
        <Text style={styles.guideText}>外层垂直滚动 | 内层水平滚动 | 点击可触发 Tap</Text>
        <TapGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              this.addLog('[NestedScrollView] Tap on scrollable area')
            }
          }}
        >
          <View style={styles.nestedScrollOuter}>
            <ScrollView style={styles.innerScroll} nestedScrollEnabled={true}>
              {Array.from({ length: 5 }, (_, i) => (
                <View key={`section-${i}`}>
                  <Text style={styles.scrollSectionTitle}>区域 {i + 1}</Text>
                  <ScrollView
                    horizontal={true}
                    style={styles.horizontalScroll}
                    nestedScrollEnabled={true}
                    showsHorizontalScrollIndicator={true}
                  >
                    {Array.from({ length: 10 }, (_, j) => (
                      <View key={`item-${i}-${j}`} style={styles.horizontalScrollItem}>
                        <Text style={styles.horizontalScrollText}>项 {j + 1}</Text>
                      </View>
                    ))}
                  </ScrollView>
                  {Array.from({ length: 3 }, (_, k) => (
                    <Text key={`text-${i}-${k}`} style={styles.scrollItem}>
                      垂直内容 {i * 3 + k + 1}
                    </Text>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276495 — ScrollViewDrag
  // ═══════════════════════════════════════════════════════

  renderCase2276495 = () => {
    return this.renderCaseLayout(
      '嵌套可滚动组件测试 - ScrollView中的拖拽元素', '2276495',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>ScrollView 内包含可拖拽元素</Text>
        <ScrollView style={styles.scrollContainer} nestedScrollEnabled={true}>
          {Array.from({ length: 5 }, (_, i) => (
            <Text key={`pre-${i}`} style={styles.scrollItem}>ScrollView 内容 {i + 1}</Text>
          ))}
          <PanGestureHandler
            onGestureEvent={this.onScrollDragEvent}
            onHandlerStateChange={(e: any) => {
              if (e.nativeEvent.state === GestureState.END) {
                this.addLog('[ScrollDrag] drag ended')
                this.springReset(this.scrollDragX)
                this.springReset(this.scrollDragY)
              }
            }}
          >
            <Animated.View style={[styles.scrollDragBox, {
              transform: [{ translateX: this.scrollDragX }, { translateY: this.scrollDragY }],
            }]}>
              <Text style={styles.boxText}>拖拽我 (在ScrollView内)</Text>
            </Animated.View>
          </PanGestureHandler>
          {Array.from({ length: 10 }, (_, i) => (
            <Text key={`post-${i}`} style={styles.scrollItem}>ScrollView 内容 {i + 6}</Text>
          ))}
        </ScrollView>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276496 — TouchableCombo
  // ═══════════════════════════════════════════════════════

  renderCase2276496 = () => {
    return this.renderCaseLayout(
      '与原生组件结合测试 - Touchable组件', '2276496',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>GestureHandler 内包含 TouchableOpacity</Text>
        <TapGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              this.addLog('[TouchableCombo] GestureHandler Tap triggered')
            }
          }}
        >
          <View style={styles.touchableContainer}>
            <Text style={styles.guideText}>GestureHandler 区域</Text>
            <TouchableOpacity
              style={styles.touchableBtn}
              onPress={() => {
                const count = this.state.touchableCount + 1
                this.setState({ touchableCount: count })
                this.addLog(`[TouchableCombo] TouchableOpacity pressed count:${count}`)
              }}
            >
              <Text style={styles.boxText}>TouchableOpacity 按钮</Text>
              <Text style={styles.boxSubText}>次数: {this.state.touchableCount}</Text>
            </TouchableOpacity>
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }

  // ═══════════════════════════════════════════════════════
  // CASE 2276497 — TextInputCombo
  // ═══════════════════════════════════════════════════════

  renderCase2276497 = () => {
    return this.renderCaseLayout(
      '与原生组件结合测试 - TextInput组件', '2276497',
      <GestureHandlerRootView>
        <Text style={styles.guideText}>GestureHandler 内包含 TextInput</Text>
        <TapGestureHandler
          onHandlerStateChange={(e: any) => {
            if (e.nativeEvent.state === GestureState.ACTIVE) {
              const count = this.state.textInputTapCount + 1
              this.setState({ textInputTapCount: count })
              this.addLog(`[TextInputCombo] GestureHandler Tap count:${count}`)
            }
          }}
        >
          <View style={styles.textInputContainer}>
            <Text style={styles.guideText}>GestureHandler 区域 (Tap: {this.state.textInputTapCount})</Text>
            <TextInput
              style={styles.textInput}
              placeholder="在此输入文字..."
              value={this.state.textInputValue}
              onChangeText={(text: string) => {
                this.setState({ textInputValue: text })
                this.addLog(`[TextInputCombo] text changed: ${text}`)
              }}
              onFocus={() => this.addLog('[TextInputCombo] TextInput focused')}
              onBlur={() => this.addLog('[TextInputCombo] TextInput blurred')}
            />
            <Text style={styles.textInputDisplay}>当前值: {this.state.textInputValue || '(空)'}</Text>
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>,
    )
  }
}

// ═══════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  // ── Home Page ──
  homeContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  homeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  homeSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  homeBtnId: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: 'bold',
    width: 70,
  },
  homeBtnTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  // ── Case Layout ──
  caseContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  backBtn: {
    paddingVertical: 8,
    marginBottom: 8,
    marginTop:50
  },
  backBtnText: {
    fontSize: 16,
    color: '#3498db',
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
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  controlLabel: {
    fontSize: 13,
    color: '#555',
    marginRight: 8,
  },
  controlBtn: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  controlBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  tapBox: {
    backgroundColor: '#27ae60',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  longPressBox: {
    backgroundColor: '#8e44ad',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  combinedBox: {
    backgroundColor: '#e67e22',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  dragBox: {
    width: 120,
    height: 120,
    backgroundColor: '#3498db',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dirRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dirBox: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  minDistBox: {
    width: 160,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  gestureArea: {
    alignItems: 'center',
    minHeight: 200,
  },
  pinchBox: {
    width: 120,
    height: 120,
    backgroundColor: '#2980b9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rotateBox: {
    width: 120,
    height: 120,
    backgroundColor: '#16a085',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
  flingBox: {
    backgroundColor: '#9b59b6',
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  nativeBtn: {
    backgroundColor: '#2ecc71',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  mutexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  mutexBox: {
    width: 200,
    height: 200,
    backgroundColor: '#9b59b6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  innerTapArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerBox: {
    backgroundColor: '#2c3e50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  innerBox: {
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  outerDragBox: {
    width: 200,
    height: 200,
    backgroundColor: '#2c3e50',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  innerDragBox: {
    width: 80,
    height: 80,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  scrollContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  nestedScrollOuter: {
    height: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  horizontalScroll: {
    height: 60,
    marginVertical: 4,
  },
  horizontalScrollItem: {
    width: 80,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  horizontalScrollText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  scrollSectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  innerScroll: {
    flex: 1,
  },
  scrollItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 14,
    color: '#333',
  },
  scrollDragBox: {
    width: 160,
    height: 60,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  touchableContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  touchableBtn: {
    backgroundColor: '#e67e22',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textInputContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginVertical: 8,
  },
  textInputDisplay: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
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
  boxTextDark: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  boxSubTextDark: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
})

export default RNGestureHandlerDemo
