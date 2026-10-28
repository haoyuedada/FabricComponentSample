
import { Tester, TestSuite, TestCase } from '@rnoh/testerino';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { PanGestureHandler, TapGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

// 辅助组件：左侧操作
const LeftAction = (prog: any, drag: any) => {
    return (
        <View style={styles.leftAction}>
            <Text style={styles.actionText}>左侧</Text>
        </View>
    );
};

const App2 = () => {
    const [status, setStatus] = useState('');
    const panRef = useRef(null);

    return (
        <View style={styles.testContainer}>
            <GestureHandlerRootView>
                <PanGestureHandler
                    ref={panRef}
                    activeOffsetX={[-10, 10]}
                    onHandlerStateChange={({ nativeEvent }) => {
                        if (nativeEvent.state === State.ACTIVE) setStatus('Active');
                        else if (nativeEvent.state === State.CANCELLED) setStatus('Cancelled');
                        else if (nativeEvent.state === State.END) setStatus('End');
                        else if (nativeEvent.state === State.BEGAN) setStatus('Began');
                    }}
                >
                    <View>
                        <ReanimatedSwipeable
                            renderLeftActions={LeftAction}
                            blocksExternalGesture={panRef}
                        >
                            <View style={styles.row}>
                                <Text>Blocks Outer Pan</Text>
                            </View>
                        </ReanimatedSwipeable>
                    </View>
                </PanGestureHandler>
            </GestureHandlerRootView>

            <Text style={{ position: 'absolute', top: 5, right: 5, fontSize: 10, zIndex: 1 }}>Ext: {status}</Text>
        </View>
    );
};

export default App2;

const styles = StyleSheet.create({
    testContainer: {
        marginTop: 250,
        height: 80,
        backgroundColor: '#eee',
        justifyContent: 'center',
        marginBottom: 10,
        overflow: 'hidden',
    },
    row: {
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    leftAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 1000,
        flex: 1,
    },
    rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 1000,
        flex: 1,
    },
    actionText: {
        color: 'white',
        padding: 20,
        fontWeight: 'bold',
    },
});
