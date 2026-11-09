import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';

const App = () => {
    console.log("chy new Date('2020-05-20'):", new Date('2020-05-20')); //ok 2020-05-20T00:00:00.000Z
    console.log("chy new Date('2020/05/20'):", new Date('2020/05/20')); //ok 2020-05-19T16:00:00.000Z
    console.log("chy Date.parse('2020-05-20'):", Date.parse('2020-05-20')); //ok 1589932800000
    console.log("chy Date.parse('2020/05/20'):", Date.parse('2020/05/20')); //ok 1589904000000
    console.log("chy new Date().toLocaleDateString():", new Date().toLocaleDateString()); //no 08/19/25
    console.log("chy new Date(Date.parse('2020/05/20')):", new Date(Date.parse('2020/05/20'))); //no 08/19/25

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
