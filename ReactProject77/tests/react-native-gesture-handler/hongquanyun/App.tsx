import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const BOX_WIDTH = 200;
const BOX_HEIGHT = 200;

export default function GestureTapTest() {
    const tapGesture = Gesture.Pan()
        .onBegin((event) => {
            console.log('Pan gesture started', event);
        })
        .onUpdate((event) => {
            // 'worklet';

            console.log('Pan gesture updated', event);
        })
        .onEnd((event) => {
            console.log('Pan gesture ended', event);
        });

    return (
        // <GestureHandlerRootView style={styles.root}>
        <GestureDetector gesture={tapGesture}>
            <View style={styles.box} />
        </GestureDetector>
        // </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    box: {
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        marginTop: 200,
        backgroundColor: '#4A90D9',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    count: {
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 8,
    },
});
