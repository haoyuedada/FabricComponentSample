/**
 * crash2 (Didi 0909) reproducer — back-navigation variant (production-like).
 *
 * Target fault-thread chain (crash2.txt):
 *   rnoh::EventLoopTaskRunner::executeTask (MAIN)
 *   → rnoh::ReanimatedUIScheduler::scheduleOnUI lambda
 *   → reanimated::ReanimatedModuleProxy::scheduleOnUI(...)::$_9::operator()
 *   → ~ReanimatedModuleProxy (queued task holds the last strong ref)
 *   → ~WorkletRuntime → ~ReanimatedHermesRuntime → ~HermesRuntimeImpl
 *   → HadesGC::finalizeAll → facebook::hermes::deleteShared
 *   → ~ShadowNodeWrapper (last ShadowNode ref in the worklet heap)
 *   → ~ShadowNode → ~ShadowNodeFamily
 *   → __shared_ptr_emplace<InstanceHandle>::__on_zero_shared
 *   → ~jsi::WeakObject → invalidate() on a PointerValue freed with the old
 *     RN JS Hermes runtime → SIGSEGV
 *
 * Mechanism:
 *   1. Many animated views: each view's shadow node family carries its own
 *      InstanceHandle (created per createNode on the JS runtime). With
 *      hundreds of families, several InstanceHandles are guaranteed to sit
 *      at element[0] of a weakHermesValues_ ManagedChunkedList chunk — the
 *      slot whose storage is overwritten by malloc free-list metadata when
 *      the old JS Hermes runtime is destroyed.
 *   2. Each view's worklet stashes its ShadowNodeWrapper (via measure()/
 *      animatedRef reads) into a worklet-global array, keeping the wrapper
 *      NativeStates ALIVE in the worklet heap: garbage wrappers would be
 *      collected early while the tree still holds the families.
 *   3. Closing the RN page (system back) runs aboutToDisappear → cleanUp →
 *      destroyAndUnregisterRNInstance. The unmount cleanup queues a
 *      fine-grained task stream; the old instance is destroyed (JS Hermes
 *      runtime + PointerValues freed, __reanimatedModuleProxy released)
 *      while the continuous task chain holds the proxy alive.
 *   4. When the task that is alive at the heap release ends,
 *      ~ReanimatedModuleProxy runs inside it on MAIN → HadesGC::finalizeAll
 *      → the stashed wrappers are the last ShadowNode refs → the families
 *      die → ~InstanceHandle → invalidate() on the freed PointerValue. For
 *      the chunk-head slots the "vtable" is free-list metadata → SIGSEGV.
 */
import React, {useEffect, useRef, useState} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  executeOnUIRuntimeSync,
  Easing,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const TAG = '[Didi0909Repro]';

const CARD_COUNT = 120;
const PRESSURE_INTERVAL_MS = 60;
const MAX_STASHED_WRAPPERS = 800;
const FLOW_SETTLE_MS = 100;
const STREAM_TASKS = 30;
const STREAM_TASK_MS = 60;
// Long allocating tail tasks: zero-filled ~512B allocations reuse (and
// zero) the freed ManagedChunkedList chunks of the destroyed JS runtime,
// so a surviving InstanceHandle's PointerValue slot reads 0 and its
// virtual invalidate() call faults at address 0 — exactly crash2.
const LONG_TASKS = 0;
const LONG_TASK_MS = 250;

function busyWorklet(ms: number) {
  'worklet';
  const deadline = Date.now() + ms;
  let junk: any[] = [];
  while (Date.now() < deadline) {
    // Zero-filled ~396-byte allocations: the backing stores are malloc'd
    // and zeroed, so they reuse (and zero) the ManagedChunkedList chunks
    // that the destroyed JS Hermes runtime just freed. A surviving
    // InstanceHandle whose PointerValue slot gets reused then reads 0 as
    // its "vtable" → the virtual invalidate() call faults at address 0 —
    // exactly crash2.
    // Sweep sizes around sizeof(ManagedChunkedList::Chunk)=392 to cover
    // allocator size-class rounding.
    junk.push(new ArrayBuffer(392));
    junk.push(new ArrayBuffer(400));
    junk.push(new ArrayBuffer(384));
    if (junk.length > 96) {
      junk = [];
    }
  }
}

function allocWorklet(ms: number) {
  'worklet';
  const deadline = Date.now() + ms;
  let junk: any[] = [];
  while (Date.now() < deadline) {
    // sizeof(ManagedChunkedList chunk) for the PointerValue pools is
    // 8 + 16*24 = 392 bytes; malloc(392) lands in the same tcache bin.
    // ArrayBuffer backing stores are malloc'd and zero-filled, so they
    // reuse and zero the freed chunks → a surviving InstanceHandle's
    // PointerValue slot reads 0 → the virtual invalidate() faults at 0.
    // Sweep sizes around sizeof(ManagedChunkedList::Chunk)=392 to cover
    // allocator size-class rounding.
    junk.push(new ArrayBuffer(392));
    junk.push(new ArrayBuffer(400));
    junk.push(new ArrayBuffer(384));
    if (junk.length > 96) {
      junk = [];
    }
  }
}

function Card({index}: {index: number}) {
  const ref = useAnimatedRef<View>();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: 200 + (index % 7) * 40, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );
    // Stash this view's wrapper into the worklet heap and keep it alive.
    runOnUI(() => {
      'worklet';
      const g = global as any;
      if (!g.__didiWrappers) {
        g.__didiWrappers = [];
      }
      if (g.__didiWrappers.length < MAX_STASHED_WRAPPERS) {
        g.__didiWrappers.push(ref());
      }
      measure(ref);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: 0.6 + progress.value * 0.4,
    transform: [{scale: 0.9 + progress.value * 0.1}],
  }));

  return (
    <Animated.View ref={ref} style={[styles.card, style]} collapsable={false}>
      <Text style={styles.cardText}>#{index}</Text>
    </Animated.View>
  );
}

export default function Didi0909GcTeardownRepro() {
  const [phase, setPhase] = useState('mount');

  useEffect(() => {
    // Calibration.
    setTimeout(() => {
      const g = global as any;
      console.log(
        `${TAG} env _IS_FABRIC=${g._IS_FABRIC} workletRuntime=${!!g._WORKLET_RUNTIME}`,
      );
    }, 900);

    // Continuous pressure: keeps a fine-grained chain of scheduleOnUI tasks
    // on MAIN (the chain holder for the proxy reference during teardown).
    setTimeout(() => {
      setPhase('pressure');
      console.log(`${TAG} pressure start (continuous, ${CARD_COUNT} cards)`);
      setInterval(() => {
        runOnUI(() => {
          'worklet';
          busyWorklet(5);
        })();
      }, PRESSURE_INTERVAL_MS);
    }, 1200);

    // Teardown hook: closing the RN page (system back) runs
    // aboutToDisappear → cleanUp → destroyAndUnregisterRNInstance; the
    // stopSurface-driven React unmount runs this cleanup on the JS thread
    // while the flow is mid-chain. Keep the JS busy briefly so the flow can
    // post the drop task, then queue the task stream and return.
    return () => {
      console.log(`${TAG} teardown: unmount cleanup, settling ${FLOW_SETTLE_MS}ms`);
      const settle = Date.now() + FLOW_SETTLE_MS;
      while (Date.now() < settle) {}
      console.log(
        `${TAG} teardown: queue ${STREAM_TASKS}x${STREAM_TASK_MS}ms + ${LONG_TASKS}x${LONG_TASK_MS}ms alloc stream`,
      );
      for (let i = 0; i < STREAM_TASKS; i++) {
        runOnUI(() => {
          'worklet';
          busyWorklet(STREAM_TASK_MS);
        })();
      }
      for (let i = 0; i < LONG_TASKS; i++) {
        runOnUI(() => {
          'worklet';
          allocWorklet(LONG_TASK_MS);
        })();
      }
      // Return: the drop task then runs — destroying the old RNInstance —
      // while the task chain on MAIN holds the proxy alive. The task alive
      // at the heap release ends up holding the last strong reference →
      // the crash2 cascade runs inside it on MAIN.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const raceTestVerify1 = () => {
    console.log(`${TAG} race #1 begin`);
    (global as any).__didiRaceTest = true;
    try {
      executeOnUIRuntimeSync(() => {
        'worklet';
        const deadline = Date.now() + 2000;
        while (Date.now() < deadline) {
          const junk = [Math.random(), Math.random(), Math.random()];
          junk[0] += junk[1] + junk[2];
        }
      });
      console.log(`${TAG} race #1: executeOnUIRuntimeSync returned`);
    } catch (e) {
      console.log(`${TAG} race #1 threw: ${e}`);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Didi 0909 crash2 reproducer (back-nav)</Text>
      <Text style={styles.status}>phase: {phase}</Text>
      <ScrollView>
        <View style={styles.grid}>
          {Array.from({length: CARD_COUNT}, (_, i) => (
            <Card key={i} index={i} />
          ))}
        </View>
      </ScrollView>
      <Button title="Verify #1: runtime race" color="#e65100" onPress={raceTestVerify1} />
      <View style={styles.space} />
      <Text style={styles.logs}>
        Press system Back to close this page: teardown + instance destruction
        race the crash2 chain. Target: InstanceHandle::__on_zero_shared via
        HadesGC::finalizeAll → SIGSEGV.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, padding: 16, backgroundColor: '#0b1220'},
  title: {color: '#f8fafc', fontSize: 18, fontWeight: '700', marginBottom: 6},
  status: {color: '#94a3b8', marginBottom: 10},
  grid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'},
  card: {
    width: 84,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563eb',
    margin: 4,
  },
  cardText: {color: '#eff6ff', fontWeight: '600', fontSize: 12},
  space: {height: 12},
  logs: {color: '#94a3b8', fontSize: 11, lineHeight: 16, marginTop: 10},
});
