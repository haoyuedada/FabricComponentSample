import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, DevSettings} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  useDerivedValue,
  runOnUI,
} from 'react-native-reanimated';

export default function AnimatedComponent({onGoBack}: {onGoBack: () => void}) {
  // 创建多个动画值（模拟真实应用中的复杂动画场景）
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);

  // 创建派生值（模拟 useDerivedValue 的使用）
  const opacity = useDerivedValue(() => {
    return 0.5 + progress.value * 0.5;
  });

  // 创建动画样式 —— 每帧都会触发 PropsRegistry::update()
  // 这确保 PropsRegistry.map_ 中持有 ShadowNode::Shared 引用
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {scale: scale.value},
        {rotate: `${rotation.value}deg`},
      ],
      opacity: opacity.value,
    };
  });

  // 启动并发动画（组件挂载时）
  useEffect(() => {
    // Spring 动画：持续弹跳
    translateX.value = withRepeat(
      withSequence(
        withSpring(100, {damping: 10, stiffness: 100}),
        withSpring(-100, {damping: 10, stiffness: 100}),
      ),
      -1,
      true,
    );

    scale.value = withRepeat(
      withSequence(
        withSpring(1.5, {damping: 8}),
        withSpring(0.8, {damping: 8}),
      ),
      -1,
      true,
    );

    // Timing 动画：无限旋转
    rotation.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1,
      false,
    );

    // DerivedValue 动画：进度变化
    progress.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 3000, easing: Easing.ease}),
        withTiming(0, {duration: 3000, easing: Easing.ease}),
      ),
      -1,
      true,
    );

    // 🔥 关键触发点：高频 runOnUI 调度
    // 每次 runOnUI 都会调用 ReanimatedModuleProxy::scheduleOnUI()
    // 该方法通过 workletsModuleProxy_->getUIScheduler()->scheduleOnUI() 将 lambda 入队
    // lambda 用 [=, weakThis = weak_from_this()] 捕获
    //
    // 崩溃时序：
    // 1. reload 触发 → ReactInstance 销毁 → ReanimatedModuleProxy 引用计数减少
    // 2. UI 线程队列中仍有待执行的 lambda
    // 3. lambda 执行时 weakThis.lock() 获得 strongThis（可能是最后一个引用）
    // 4. lambda 执行完毕 → strongThis 释放 → ReanimatedModuleProxy 析构
    // 5. 析构中 propsRegistry_ 释放 → PropsRegistry::~PropsRegistry()
    // 6. PropsRegistry.map_ 中的 ShadowNode::Shared 释放
    // 7. ShadowNode → ShadowNodeFamily → InstanceHandle 析构
    // 8. InstanceHandle 在 UI 线程析构（应在 JS 线程）→ crash!
    const scheduleHighFrequency = () => {
      runOnUI(() => {
        'worklet';
        // 在 UI 线程执行，触发 shared value 更新
        // 这会间接导致 PropsRegistry 中注册更多 ShadowNode
      })();
    };

    // 高频调度：增加 reload 时队列中有未执行 lambda 的概率
    const timer = setInterval(scheduleHighFrequency, 16); // ~60fps

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>并发动画运行中...</Text>

      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.boxText}>触发崩溃</Text>
      </Animated.View>

      <Text style={styles.warning}>
        ⚠️ 动画正在运行，请选择触发方式：
      </Text>

      {/* 方式1：返回导航（不会触发析构） */}
      <Button 
        title="返回主页（不触发析构）" 
        onPress={onGoBack} 
        color="#4a5568"
      />
      
      <Text style={styles.hint}>
        只是导航返回，ReanimatedModuleProxy 不会析构
      </Text>

      {/* 方式2：Reload（真正触发析构） */}
      <Button 
        title="Reload（真正触发析构） ⚠️" 
        onPress={() => {
          // 强制重新加载整个 RN 环境
          // 会销毁旧的 ReactInstance → 触发 ReanimatedModuleProxy 析构
          DevSettings.reload();
        }}
        color="#e53e3e"
      />
      
      <Text style={styles.hint}>
        🔧 在动画运行时 reload 会触发 PropsRegistry 析构崩溃
      </Text>
      
      <Text style={styles.note}>
        原理详解：
      </Text>
      
      <Text style={styles.noteDetail}>
        1. runOnUI() 调用 ReanimatedModuleProxy::scheduleOnUI()
      </Text>
      
      <Text style={styles.noteDetail}>
        2. scheduleOnUI 将 worklet 任务调度到 UI 线程队列
      </Text>
      
      <Text style={styles.noteDetail}>
        3. reload 时，UI 线程任务可能仍在执行
      </Text>
      
      <Text style={styles.noteDetail}>
        4. 析构顺序：uiWorkletRuntime 先销毁 → PropsRegistry 后析构
      </Text>
      
      <Text style={styles.noteDetail}>
        5. PropsRegistry 中的 ShadowNode 引用已释放的 runtime → 崩溃！
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 20,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  warning: {
    fontSize: 14,
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  hint: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginTop: 15,
  },
  note: {
    fontSize: 11,
    color: '#a0aec0',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
    lineHeight: 16,
    fontWeight: '600',
  },
  noteDetail: {
    fontSize: 10,
    color: '#cbd5e0',
    textAlign: 'left',
    marginTop: 3,
    marginLeft: 20,
    lineHeight: 14,
  },
});
