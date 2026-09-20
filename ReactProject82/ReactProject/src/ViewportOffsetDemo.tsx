/**
 * 纯 RN 官方组件 demo —— 验证 RNOH 框架 viewportOffset stale bug
 *
 * 背景：RNSurface.onAreaChange 把启动瞬间"0 高度被居中"的 globalPosition（= 半屏高度）
 * 记为 surfaceOffset，而 onMeasureSize 在同帧布局里先于 onAreaChange 执行、用的是上一帧
 * 旧值下发 viewportOffset，之后不再纠正 → viewportOffset 永久 = (0, windowHeight/2)。
 *
 * 纯 RN 里消费 viewportOffset 的官方 API：measureInWindow（DOM.cpp: includeViewportOffset=true，
 * 会叠加 RootShadowNode::getTransform() = Translate(viewportOffset)）。
 * 而 measure 的 pageY / 触摸事件的 pageY 都是 surface 本地坐标，不含该偏移。
 *
 * 预期（正常）：measureInWindow.y ≈ measure.pageY（全屏应用差值 ~0）
 * 实际（bug） ：差值 ≈ 窗口高度的一半
 *
 * 零三方库依赖：仅 react + react-native 官方组件。
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
} from 'react-native';

type Measurable = {
    measure: (
        cb: (x: number, y: number, w: number, h: number, pageX: number, pageY: number) => void,
    ) => void;
    measureInWindow: (cb: (x: number, y: number, w: number, h: number) => void) => void;
};

const WINDOW = Dimensions.get('window');

export default function ViewportOffsetDemo() {
    const boxRef = useRef<View>(null);
    const [log, setLog] = useState<string[]>([]);

    const append = (line: string) => {
        console.log('CHY::ViewportOffsetDemo', line);
        setLog(prev => [...prev, line]);
    };

    const runMeasure = () => {
        const node = boxRef.current as unknown as Measurable | null;
        if (!node) {
            return;
        }
        node.measureInWindow((wx, wy, ww, wh) => {
            node.measure((x, y, w, h, pageX, pageY) => {
                const delta = wy - pageY;
                append(`window.height = ${WINDOW.height.toFixed(1)}，半屏 = ${(WINDOW.height / 2).toFixed(1)}`);
                append(`measure         -> pageY = ${pageY.toFixed(1)}（surface 本地坐标，正确）`);
                append(`measureInWindow -> y    = ${wy.toFixed(1)}（窗口坐标，含 viewportOffset）`);
                append(`差值 measureInWindow.y - measure.pageY = ${delta.toFixed(1)}`);
                if (Math.abs(delta) < 20) {
                    append('>>> 差值 ≈ 0，viewportOffset 正常，未复现');
                } else if (Math.abs(delta - WINDOW.height / 2) < 10) {
                    append('>>> 差值 ≈ 半屏高度，复现 stale viewportOffset bug');
                } else {
                    append(`>>> 差值异常（既非 0 也非半屏），viewportOffset = ${delta.toFixed(1)}`);
                }
                append('');
            });
        });
    };

    useEffect(() => {
        const timer = setTimeout(runMeasure, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>纯 RN 组件 viewportOffset 验证</Text>
            <Text style={styles.subtitle}>
                色块渲染在屏幕顶部。手指按在色块上时触摸事件 pageY 是正确的，
                但 measureInWindow 会把它报在中下部。两者本应基本一致。
            </Text>

            <View
                ref={boxRef}
                style={styles.box}
                onTouchStart={(e) => {
                    append(`[touch] pageY = ${e.nativeEvent.pageY.toFixed(1)}（手指真实位置）`);
                }}
                onTouchEnd={runMeasure}>
                <Text style={styles.boxText}>按住 / 点击我</Text>
                <Text style={styles.boxTextSmall}>松手后自动测量</Text>
            </View>

            <View style={styles.logPanel}>
                {log.map((l, i) => (
                    <Text
                        key={i}
                        style={l.startsWith('>>>') ? styles.logHighlight : styles.logText}>
                        {l}
                    </Text>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 12,
    },
    subtitle: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginHorizontal: 24,
        marginTop: 6,
    },
    box: {
        marginTop: 100,
        alignSelf: 'center',
        width: 260,
        height: 160,
        borderRadius: 12,
        backgroundColor: '#4a90d9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    boxTextSmall: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 6,
    },
    logPanel: {
        flex: 1,
        margin: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    logText: {
        fontSize: 12,
        color: '#333',
        lineHeight: 20,
    },
    logHighlight: {
        fontSize: 12,
        color: '#d9432f',
        fontWeight: 'bold',
        lineHeight: 20,
    },
});
