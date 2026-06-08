import React, { Component } from 'react'
import {
    Animated,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'

const GestureState_ = State || {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
}

class PanGestureHandlerBasicDemo extends Component<any, any> {
    panBasicX: Animated.Value
    panBasicY: Animated.Value
    onPanBasicEvent: any

    constructor(props: any) {
        super(props)

        this.state = {
            logs: [],
        }

        // Initialize Animated Values
        this.panBasicX = new Animated.Value(0)
        this.panBasicY = new Animated.Value(0)

        // Setup animated event handler
        this.onPanBasicEvent = Animated.event(
            [{
                nativeEvent: {
                    translationX: this.panBasicX,
                    // translationY: this.panBasicY
                }
            }],
            {
                useNativeDriver: true,
                listener: (e: any) => {
                    const { translationX, translationY, state } = e.nativeEvent
                    if (state === GestureState_.ACTIVE) {
                        this.addLog(`[Pan] active tx:${translationX.toFixed(1)} ty:${translationY.toFixed(1)}`)
                    }
                }
            },
        )
    }

    addLog = (msg: string) => {
        console.log(msg)
        this.setState((prev: any) => ({
            logs: [...prev.logs.slice(-19), msg],
        }))
    }

    springReset = (v: Animated.Value, toValue: number = 0) => {
        console.log(`[Pan] springReset to ${toValue}`)
        Animated.spring(v, { toValue, useNativeDriver: true }).start()
        // Animated.spring(v, {
        //       toValue: { x: 0, y: 0 },
        //       useNativeDriver: true
        //     }).start()
    }

    render() {
        const { logs } = this.state

        return (
            <GestureHandlerRootView style={styles.flex1}>
                {/* <ScrollView style={styles.flex1} contentContainerStyle={styles.container}> */}
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { }}>
                        <Text style={styles.backBtnText}>← 返回</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>PanGestureHandler 测试 - 基本拖拽</Text>
                        <Text style={styles.subtitle}>EC用例: 2276475</Text>
                    </View>
                </View>

                {/* Guide Text */}
                <View style={styles.guideArea}>
                    <Text style={styles.guideText}>拖拽下方方块，松手后弹回</Text>
                </View>

                {/* Operation Area - Drag Box */}
                <View style={styles.operationArea}>
                    <PanGestureHandler
                        onGestureEvent={this.onPanBasicEvent}
                        onHandlerStateChange={(e: any) => {
                            console.log('[Pan] state change', e.nativeEvent.state)
                            if (e.nativeEvent.state === GestureState_.END) {
                                console.log('[Pan] state change END')
                                this.addLog('[Pan] gesture ended, springing back')
                                this.springReset(this.panBasicX)
                                this.springReset(this.panBasicY)
                            } 
                            // else if ( e.nativeEvent.state === GestureState_.ACTIVE || e.nativeEvent.state === GestureState_.BEGAN ) {
                            //     this.panBasicX.stopAnimation();
                            //     this.panBasicY.stopAnimation();
                            // }
                        }}
                    >
                        <Animated.View style={[styles.dragBox, {
                            transform: [{ translateX: this.panBasicX }, { translateY: this.panBasicY }],
                        }]}>
                            <Text style={styles.boxText}>拖拽我</Text>
                        </Animated.View>
                    </PanGestureHandler>
                </View>

                {/* Log Area */}
                <View style={styles.logArea}>
                    <Text style={styles.logTitle}>事件日志</Text>
                    <ScrollView style={styles.logScroll} contentContainerStyle={styles.logContent}>
                        {logs.length === 0
                            ? <Text style={styles.logEmpty}>暂无日志</Text>
                            : logs.map((log, i) => <Text key={i} style={styles.logItem}>{log}</Text>)
                        }
                    </ScrollView>
                </View>
                {/* </ScrollView> */}
            </GestureHandlerRootView>
        )
    }
}

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backBtn: {
        paddingRight: 12,
    },
    backBtnText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#999',
    },
    guideArea: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
    },
    guideText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    operationArea: {
        height: 320,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logArea: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        height: 200,
    },
    logScroll: {
        flex: 1,
    },
    logContent: {
        paddingBottom: 8,
    },
    logTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    logEmpty: {
        fontSize: 12,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 20,
    },
    logItem: {
        fontSize: 11,
        color: '#555',
        marginBottom: 4,
        fontFamily: 'Courier New',
    },
})

export default PanGestureHandlerBasicDemo
