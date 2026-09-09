/**
 * crash2 reproduction harness.
 *
 * Target chain:
 * ReanimatedModuleProxy::~ → UI Hermes runtime teardown → HadesGC::finalizeAll
 * → ShadowNodeWrapper::~ → ShadowNodeFamily::~ → InstanceHandle release.
 *
 * _Didi0909ForceGarbageCollection is installed by a local native probe. It is
 * for verification only and must not be shipped in a production library.
 */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, DevSettings, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

declare const global: {
  _Didi0909ForceGarbageCollection?: () => void;
};

const UI_HOLD_MS = 450;

function PressureCard({generation}: {generation: number}) {
  const ref = useAnimatedRef<View>();
  const progress = useSharedValue(0);
  const pulse = useDerivedValue(() => 0.65 + progress.value * 0.35);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: 220, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );
  }, [progress]);

  // measure() makes the UI runtime consume the Fabric shadow-node wrapper.
  // Sampling leaves NativeState finalization to Hermes rather than JS state.
  useFrameCallback(frameInfo => {
    if ((frameInfo.timestamp | 0) % 3 === 0) {
      measure(ref);
    }
  });

  const style = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [
      {translateX: progress.value * 36},
      {scale: 0.85 + progress.value * 0.15},
    ],
  }));

  return (
    <Animated.View ref={ref} style={[styles.card, style]}>
      <Text style={styles.cardText}>Fabric wrapper generation {generation}</Text>
    </Animated.View>
  );
}

export default function Didi0909GcTeardownRepro() {
  const [generation, setGeneration] = useState(1);
  const [armed, setArmed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPressure = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startPressure = useCallback(() => {
    stopPressure();
    intervalRef.current = setInterval(() => {
      // Rapid remounts create successive Fabric wrappers. Queued worklets keep
      // the scheduleOnUI → EventLoopTaskRunner path active during reload.
      setGeneration(value => value + 1);
      runOnUI(() => {
        'worklet';
        const scratch = new Array(96).fill(Date.now());
        scratch.reverse();
      })();
    }, 24);
  }, [stopPressure]);

  useEffect(() => {
    startPressure();
    return stopPressure;
  }, [startPressure, stopPressure]);

  const calibrateUiGc = useCallback(() => {
    runOnUI(() => {
      'worklet';
      global._Didi0909ForceGarbageCollection?.();
    })();
  }, []);

  const armAndReload = useCallback(() => {
    setArmed(true);
    runOnUI(() => {
      'worklet';
      // Reload races with a still-running UI worklet. This mirrors frames
      // #14/#15 in crash2 but does not claim that a UI-thread release alone
      // is sufficient to crash.
      const deadline = Date.now() + UI_HOLD_MS;
      while (Date.now() < deadline) {
        const transient = {value: Math.random()};
        transient.value += 1;
      }
    })();

    setTimeout(() => DevSettings.reload(), 40);
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Didi 0909: UI GC teardown reproducer</Text>
      <Text style={styles.description}>
        当前用例针对 ShadowNodeWrapper 被 UI Hermes finalization 释放的路径。
        它不把“页面跳转不崩”当作修复结论。
      </Text>

      <PressureCard key={generation} generation={generation} />

      <View style={styles.panel}>
        <Text style={styles.status}>generation: {generation} · armed: {String(armed)}</Text>
        <Button title="1. 校准：强制 UI Runtime GC" onPress={calibrateUiGc} />
        <View style={styles.space} />
        <Button title="2. Arm + Reload（触发析构竞态）" color="#c62828" onPress={armAndReload} />
      </View>

      <Text style={styles.logs}>
        期望日志：UI GC begin/end；reload 后 Proxy destructor entered → Proxy resetting UI worklet runtime。
        若命中线上路径，崩溃栈必须含 HadesGC::finalizeAll、ShadowNodeWrapper::~、
        ShadowNodeFamily::~、InstanceHandle::__on_zero_shared。
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, padding: 20, backgroundColor: '#0b1220'},
  title: {color: '#f8fafc', fontSize: 20, fontWeight: '700', marginBottom: 12},
  description: {color: '#cbd5e1', lineHeight: 20, marginBottom: 24},
  card: {
    width: 220,
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#2563eb',
    marginVertical: 24,
  },
  cardText: {color: '#eff6ff', fontWeight: '600'},
  panel: {padding: 16, borderRadius: 12, backgroundColor: '#172033'},
  status: {color: '#94a3b8', marginBottom: 14},
  space: {height: 12},
  logs: {color: '#94a3b8', fontSize: 12, lineHeight: 18, marginTop: 24},
});
