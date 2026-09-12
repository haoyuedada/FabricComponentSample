/**
 * Deterministic reproducer for the production teardown crash:
 *
 * HadesGC::finalizeAll -> ShadowNodeWrapper::~ShadowNodeWrapper
 * -> ShadowNodeFamily::~ShadowNodeFamily -> InstanceHandle release
 *
 * The important difference from the older stress demos is that this page
 * deliberately leaves a real Fabric ShadowNodeWrapper in the UI Hermes heap.
 * It then keeps scheduleOnUI's strongThis alive while the RN runtime reloads,
 * making the last ReanimatedModuleProxy reference likely to be released by
 * the UI task.
 */

import React, {useEffect, useState} from 'react';
import {Button, DevSettings, StyleSheet, Text, View} from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// Long enough for JS teardown to win the race, but below the ArkUI watchdog
// threshold so the emulator remains responsive.
const UI_HOLD_MS = 300;
const RELOAD_DELAY_MS = 30;

export default function ShadowNodeWrapperTeardownRepro() {
  const animatedRef = useAnimatedRef<Animated.View>();
  const progress = useSharedValue(0);
  const [armed, setArmed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.4 + progress.value * 0.6,
    transform: [{translateX: progress.value * 120}],
  }));

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 120}), -1, true);
  }, [progress]);

  const trigger = () => {
    if (armed) {
      return;
    }
    setArmed(true);

    runOnUI((ref, holdMs: number) => {
      'worklet';

      // Keep the actual HostObject alive until the UI Hermes runtime is
      // destroyed. This is the object seen in the production crash stack.
      const shadowNodeWrapper = ref();
      globalThis.__didiShadowNodeWrapperTeardownRepro = shadowNodeWrapper;

      // Keep scheduleOnUI's local strongThis alive. The JS thread remains
      // free to tear down its runtime through DevSettings.reload().
      const deadline = Date.now() + holdMs;
      while (Date.now() < deadline) {
        // Intentionally empty: this is a deterministic race amplifier.
      }
    })(animatedRef, UI_HOLD_MS);

    setTimeout(() => {
      DevSettings.reload();
    }, RELOAD_DELAY_MS);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShadowNodeWrapper 析构复现</Text>
      <Text style={styles.description}>
        UI runtime 保留真实 Fabric ShadowNodeWrapper；30ms 后 JS runtime
        reload，UI worklet 继续持有 Proxy 300ms。
      </Text>

      <Animated.View ref={animatedRef} style={[styles.box, animatedStyle]} />

      <Button
        title={armed ? '复现已触发，等待结果…' : '触发线上同型析构竞态'}
        disabled={armed}
        onPress={trigger}
        color="#c62828"
      />

      <Text style={styles.expected}>
        未修版本预期栈：scheduleOnUI → ~ReanimatedModuleProxy → Hermes
        finalizeAll → ~ShadowNodeWrapper → ~ShadowNodeFamily
      </Text>
    </View>
  );
}

declare global {
  var __didiShadowNodeWrapperTeardownRepro: unknown;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#101318',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: '#c7ccd4',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 36,
  },
  box: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: '#ff7043',
    alignSelf: 'center',
    marginBottom: 40,
  },
  expected: {
    color: '#9aa3af',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 24,
    textAlign: 'center',
  },
});
