/**
 * Reanimated 最小 Demo 页
 *
 * 验证目的：
 *   1. worklet 路径：Animated.FlatList onScroll → useAnimatedScrollHandler → sharedValue
 *   2. useAnimatedStyle 消费 sharedValue → 绝对定位块实时位移
 *
 * 如果此页面动画流畅，说明 reanimated 本身无问题，卡顿源在主轴其他逻辑。
 * 如果此页面也卡，说明 harmony 环境下 reanimated/worklet 链路本身有问题。
 */
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, type NativeScrollEvent, View, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    runOnJS,
    setNativeProps,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

// 色块数量，足够长以便观察滚动
const ITEM_COUNT = 40;
const ITEM_HEIGHT = 80;

const COLORS = [
    '#4A90D9', '#E67E22', '#2ECC71', '#9B59B6', '#E74C3C',
    '#1ABC9C', '#F39C12', '#3498DB', '#D35400', '#27AE60',
];

const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
    key: String(i),
    color: COLORS[i % COLORS.length],
    label: `Item ${i + 1}`,
}));

// 浮动块的上下移动范围（px）
const FLOAT_TRAVEL = 200;
const DEBUG_LOG_STEP = 80;
const AUTONOMOUS_TRAVEL = 180;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    item: {
        height: ITEM_HEIGHT,
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    floatBlock: {
        position: 'absolute',
        right: 24,
        top: 120,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E74C3C',
        // 阴影
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topProbeBlock: {
        position: 'absolute',
        left: 24,
        top: 120,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#27AE60',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imperativeProbeBlock: {
        position: 'absolute',
        right: 104,
        top: 120,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#3498DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    autonomousProbeBlock: {
        position: 'absolute',
        left: 24,
        bottom: 48,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F1C40F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    header: {
        paddingTop: 48,
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
    },
    headerSub: {
        fontSize: 13,
        color: '#888',
        marginTop: 4,
    },
});

const ReanimatedDemoPage = () => {
    const scrollY = useSharedValue(0);
    const lastScrollLogY = useSharedValue(-DEBUG_LOG_STEP);
    const lastStyleLogY = useSharedValue(-DEBUG_LOG_STEP);
    const autonomousProgress = useSharedValue(0);
    const imperativeProbeRef = useAnimatedRef<any>();

    const logProbe = useCallback((label: string, payload: Record<string, number>) => {
        console.log(`[RNDiag] ${label}`, payload);
    }, []);

    useEffect(() => {
        const g = global as any;
        console.log('[RNDiag] ===== worklet runtime + parallelization check =====');
        console.log('[RNDiag] __reanimatedModuleProxy type:', typeof g.__reanimatedModuleProxy);
        console.log('[RNDiag] _REANIMATED_VERSION_JS:', g._REANIMATED_VERSION_JS);
        console.log('[RNDiag] _WORKLET (global):', g._WORKLET);
        console.log('[RNDiag] __BATCH_TO_NATIVE__:', g.__BATCH_TO_NATIVE__);
        console.log('[RNDiag] RN$Bridgeless:', g.RN$Bridgeless);
        console.log('[RNDiag] _IS_FABRIC:', g._IS_FABRIC);
        console.log('[RNDiag] ==================================================');
    }, []);

    useEffect(() => {
        autonomousProgress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
    }, [autonomousProgress]);

    // worklet 线程处理 scroll（和主轴鸿蒙路径一致）
    const scrollHandler = useAnimatedScrollHandler({
        onScroll(e: NativeScrollEvent) {
            'worklet';
            const y = e.contentOffset.y;

            if (lastScrollLogY.value === -DEBUG_LOG_STEP) {
                runOnJS(logProbe)('workletThreadCheck', {
                    _WORKLET: (global as any)._WORKLET ? 1 : 0,
                    hasProxy: typeof (global as any).__reanimatedModuleProxy !== 'undefined' ? 1 : 0,
                });
            }

            const translateY = interpolate(
                y,
                [0, 600],
                [0, FLOAT_TRAVEL],
                Extrapolation.CLAMP,
            );

            scrollY.value = y;

            setNativeProps(imperativeProbeRef, {
                transform: [{ translateY }],
            });

            if (Math.abs(y - lastScrollLogY.value) >= DEBUG_LOG_STEP) {
                lastScrollLogY.value = y;
                runOnJS(logProbe)('onScroll + setNativeProps', {
                    y,
                    translateY,
                });
            }
        },
    });

    const floatStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, 600],
            [0, FLOAT_TRAVEL],
            Extrapolation.CLAMP,
        );
        const scale = interpolate(
            scrollY.value,
            [0, 300],
            [1, 1.4],
            Extrapolation.CLAMP,
        );

        if (Math.abs(scrollY.value - lastStyleLogY.value) >= DEBUG_LOG_STEP) {
            lastStyleLogY.value = scrollY.value;
            runOnJS(logProbe)('useAnimatedStyle(transform)', {
                y: scrollY.value,
                translateY,
                scale,
                _WORKLET: (global as any)._WORKLET ? 1 : 0,
            });
        }

        return { transform: [{ translateY }, { scale }] };
    });

    const topProbeStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, 600],
            [0, FLOAT_TRAVEL],
            Extrapolation.CLAMP,
        );

        return { top: 120 + translateY };
    });

    const autonomousProbeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: autonomousProgress.value * AUTONOMOUS_TRAVEL }],
    }));

    const renderItem = useCallback(({ item }: { item: typeof items[0] }) => (
        <View style={{ ...styles.item, backgroundColor: item.color }}>
            <Text style={styles.itemText}>{item.label}</Text>
        </View>
    ), []);

    const keyExtractor = useCallback((item: typeof items[0]) => item.key, []);

    const ListHeader = (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Reanimated Demo</Text>
            <Text style={styles.headerSub}>滚动列表 → 右侧红圈跟随移动 + 放大</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* 用 Animated.FlatList，和主轴鸿蒙路径完全一致 */}
            <Animated.FlatList
                data={items}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListHeaderComponent={ListHeader}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            />

            {/* 浮动块：纯 useAnimatedStyle 驱动，无 JS 线程参与 */}
            <Animated.View style={[styles.topProbeBlock, topProbeStyle]}>
                <Text style={styles.floatText}>TOP</Text>
            </Animated.View>
            <Animated.View ref={imperativeProbeRef} style={styles.imperativeProbeBlock}>
                <Text style={styles.floatText}>SET</Text>
            </Animated.View>
            <Animated.View style={[styles.floatBlock, floatStyle]}>
                <Text style={styles.floatText}>STYLE</Text>
            </Animated.View>
            <Animated.View style={[styles.autonomousProbeBlock, autonomousProbeStyle]}>
                <Text style={styles.floatText}>TIME</Text>
            </Animated.View>
        </View>
    );
};

export default ReanimatedDemoPage;
