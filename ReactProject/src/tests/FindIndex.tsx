import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';

const App = () => {
    console.log("chy foo:", foo)
    console.log("chy findIndex:", [1,2,3,4,5].findIndex((item) => {
        console.log("chy item:", item);
        return item === 3
    })); //2

    return (
        <View style={styles.container}>
            <Text>测试new Date()</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5FCFF',
    }
});

export default App;
