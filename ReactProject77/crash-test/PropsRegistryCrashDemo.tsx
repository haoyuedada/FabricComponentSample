/**
 * PropsRegistry 析构崩溃复现 Demo
 *
 * 崩溃原理：
 * 1. scheduleOnUI 将 worklet 调度到 UI 线程队列
 * 2. worklet 中通过 useAnimatedStyle 更新组件属性，触发 PropsRegistry::update()
 * 3. PropsRegistry 持有 ShadowNode::Shared 引用
 * 4. reload 时，ReanimatedModuleProxy 析构顺序：
 *    - uiWorkletRuntime_.reset() 先执行
 *    - propsRegistry_ 后析构
 * 5. PropsRegistry 析构时，ShadowNode 的 InstanceHandle 已失效 → crash
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, DevSettings} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnUI,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

export default function PropsRegistryCrashDemo({onGoBack}: {onGoBack: () => void}) {
  const [crashType, setCrashType] = useState<'scheduleOnUI' | 'animatedStyle' | 'both'>('both');

  // 共享值：用于触发 PropsRegistry 更新
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  // 动画样式：每次更新都会调用 PropsRegistry::update()
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {translateX: translateX.value},
        {scale: scale.value},
      ],
    };
  });

  useEffect(() => {
    if (crashType === 'scheduleOnUI' || crashType === 'both') {
      // 🔥 崩溃触发点 1：持续调度 UI 任务
      // 这些任务会在 reload 时仍在队列中，导致 lambda 持有 ReanimatedModuleProxy 的最后引用
      const scheduleRecursive = () => {
        runOnUI(() => {
          'worklet';
          // 模拟持续更新 shared value（触发 PropsRegistry 更新）
          opacity.value = Math.random();
          translateX.value = Math.random() * 100 - 50;
          scale.value = 0.8 + Math.random() * 0.4;
        })();

        // 递归调度（模拟持续的 UI 更新）
        setTimeout(scheduleRecursive, 50);
      };

      scheduleRecursive();
    }

    if (crashType === 'animatedStyle' || crashType === 'both') {
      // 🔥 崩溃触发点 2：持续运行的动画
      // 动画会不断更新 PropsRegistry 中的 ShadowNode 属性
      opacity.value = withRepeat(
        withTiming(0.3, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
        -1,
        true,
      );

      translateX.value = withRepeat(
        withTiming(100, {duration: 1500, easing: Easing.inOut(Easing.ease)}),
        -1,
        true,
      );

      scale.value = withRepeat(
        withTiming(1.5, {duration: 800, easing: Easing.inOut(Easing.ease)}),
        -1,
        true,
      );
    }
  }, [crashType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PropsRegistry 析构崩溃测试</Text>

      {/* 动画视图：触发 PropsRegistry 更新 */}
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.boxText}>动画运行中</Text>
      </Animated.View>

      <View style={styles.controlPanel}>
        <Text style={styles.sectionTitle}>选择崩溃触发方式：</Text>

        <Button
          title={crashType === 'scheduleOnUI' ? '✓ scheduleOnUI 递归' : 'scheduleOnUI 递归'}
          onPress={() => setCrashType('scheduleOnUI')}
          color={crashType === 'scheduleOnUI' ? '#6366f1' : '#94a3b8'}
        />

        <Button
          title={crashType === 'animatedStyle' ? '✓ 持续动画' : '持续动画'}
          onPress={() => setCrashType('animatedStyle')}
          color={crashType === 'animatedStyle' ? '#6366f1' : '#94a3b8'}
        />

        <Button
          title={crashType === 'both' ? '✓ 组合攻击（最易崩溃）' : '组合攻击'}
          onPress={() => setCrashType('both')}
          color={crashType === 'both' ? '#e53e3e' : '#94a3b8'}
        />
      </View>

      <View style={styles.actionPanel}>
        <Text style={styles.warning}>⚠️ 崩溃触发操作：</Text>

        <Button
          title="🔥 Reload（触发崩溃）"
          onPress={() => {
            // 在动画和 scheduleOnUI 任务运行时 reload
            // 会导致 ReanimatedModuleProxy 在 UI 线程析构
            DevSettings.reload();
          }}
          color="#dc2626"
        />

        <Text style={styles.hint}>
          点击 Reload 后，UI 线程队列中的 lambda 仍在执行，
          {'\n'}当 lambda 结束时释放 strongThis → 触发析构链 → crash
        </Text>
      </View>

      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>崩溃调用栈预期：</Text>
        <Text style={styles.infoText}>
          #00 InstanceHandle::__on_zero_shared(){'\n'}
          #01 ShadowNodeFamily::~ShadowNodeFamily(){'\n'}
          #02 ShadowNode::~ShadowNode(){'\n'}
          #03 PropsRegistry::__on_zero_shared(){'\n'}
          #04 ReanimatedModuleProxy::~ReanimatedModuleProxy(){'\n'}
          #05 scheduleOnUI lambda $_9::operator()(){'\n'}
          #06 ReanimatedUIScheduler::scheduleOnUI(){'\n'}
          #07 EventLoopTaskRunner::executeTask()
        </Text>
      </View>

      <Button
        title="← 返回（不触发崩溃）"
        onPress={onGoBack}
        color="#64748b"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 20,
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#6366f1',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    shadowColor: '#6366f1',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  boxText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  controlPanel: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e0',
    marginBottom: 8,
  },
  actionPanel: {
    backgroundColor: '#7f1d1d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  warning: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fca5a5',
    textAlign: 'center',
    marginBottom: 12,
  },
  hint: {
    fontSize: 11,
    color: '#fca5a5',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
  },
  infoPanel: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 10,
    color: '#64748b',
    fontFamily: 'monospace',
    lineHeight: 14,
  },
});
