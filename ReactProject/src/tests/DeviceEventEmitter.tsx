import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Button,
    DeviceEventEmitter
} from "react-native";

export default function aa(){
    console.log("chy Dimensions:", Dimensions.get("window"));
    DeviceEventEmitter.addListener(
        'testEvent',
        (payload) => {
            console.log('收到事件，数据：', payload);
            // 在这里处理 payload
        }
    );
    return (
        <View style={{marginTop: 100}}>
            <Button title="触发DeviceEventEmitter" onPress={() => {
                DeviceEventEmitter.emit("testEvent", { message: "Hello from DeviceEventEmitter!" });
            }}></Button>
        </View>
    );
};