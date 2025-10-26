import React, { useCallback, useRef, useMemo } from 'react';
import { SafeAreaView, View, Animated, StyleSheet, Platform, Text } from 'react-native';

const HomePage: React.FC = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const onScroll = useCallback(
        (e) => {
            let offset = e.nativeEvent.contentOffset.y;
            console.log('chy onScroll  value: ', offset);
            // 如果是 Harmony 平台，就除以 2
            if (Platform.OS === 'harmony') {
                offset = offset / 1;
            }

            scrollY.setValue(offset);
        },
        [scrollY]
    );

    // 计算透明度
    const opacity = useMemo(
        () =>
            scrollY.interpolate({
                inputRange: [0, 5000],
                outputRange: [1, 0],
                extrapolate: 'clamp',
            }),
        [scrollY]
    );

    // 搜索框的动画位移
    const translateY = useMemo(
        () =>
            scrollY.interpolate({
                inputRange: [0, 600],
                outputRange: [0, -60], // 滚动5000时，搜索框上移50
                extrapolate: 'clamp',
            }),
        [scrollY]
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%", height: 300, flex: 1 }}>
                <Text style={{ fontFamily: "Pacifico-Regular" }}>12312sdfsfa暗示法法师的</Text>
            </View>
            <View style={{ width: "100%", height: 300, flex: 1 }}>
                <Text style={{ fontFamily: "StintUltraCondensed-Regular" }}>12312sdfsfa暗示法法师的</Text>
            </View>
            <View style={{ width: "100%", height: 300, flex: 1 }}>
                <Text>12312sdfsfa暗示法法师的</Text>
            </View>
        </SafeAreaView>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // borderColor: 'green',
        // borderWidth: 2,
        position: 'relative',
        height: 400
    },
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 2,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    overlayView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        zIndex: 1,
    },
});