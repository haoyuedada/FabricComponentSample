import React, { useCallback, useRef, useMemo } from 'react';
import { SafeAreaView, View, Animated, StyleSheet, Platform, Text } from 'react-native';

const HomePage: React.FC = () => {

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