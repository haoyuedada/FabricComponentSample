import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

function onFetchPressDone() {
    // promisDemo().done(() => {
    //     console.log('done触发了')
    // })
    promisDemo().finally(() => {
        console.log('finally触发了')
    })
}
async function promisDemo() {
    return new Promise((resolve, reject) => {
        // 模拟一个异步操作，比如网络请求或定时器
        setTimeout(() => {
            const isSuccess = true; // 模拟操作成功
            if (isSuccess) {
                resolve('操作成功');
            } else {
                reject('操作失败');
            }
        }, 2000);
    });
}

onFetchPressDone();
const App = () => {

    return (
        <View style={styles.centeredView}>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default App;