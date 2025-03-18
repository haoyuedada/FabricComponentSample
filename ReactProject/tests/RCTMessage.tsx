/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */


import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, UIManager, findNodeHandle, Dimensions } from 'react-native';
import RCTMessageDialog from "fabric-component-sample-package/src/specs/v1/RCTMessageDialog";


// 测试用例
const Test = () => {
    console.log("chy 111")
    return (
        <View style={styles.container}>
            <Text>123456</Text>
            <RCTMessageDialog style={{
                width: 250,
                height: 50
            }}></RCTMessageDialog>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 200
    },
    title: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: 20,
        padding: 8,
        textAlign: 'center'
    }
});

export default Test;
