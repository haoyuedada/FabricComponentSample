/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */


import React, { useRef, useState } from 'react';
import {
    Text,
    StyleSheet,
    TextInput
} from 'react-native';


const App = () => {
    console.log("chy App render");

    return (
        <TextInput
            onTextInput={({ nativeEvent: { text } }) => {
                console.log('onTextInput 收到:', text);
            }}
            style={{ marginTop: 100, borderWidth: 1, height: 50, width: 100 }}
        />

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 250,
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: 20,
        padding: 8,
        textAlign: 'center'
    }
});

export default App;
