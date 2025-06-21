import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class ModalDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        console.log("modal modalVisible1", modalVisible);
        console.log("modal modalVisible2", this.state.modalVisible);

        return (
            <View style={styles.container}>
                {/* 打开 Modal 的按钮 */}
                <Button
                    title="打开 Modal"
                    onPress={() => {
                        setTimeout(() => {
                            this.setModalVisible(true)
                        }, 2000)
                    }}
                />

                {/* Modal 组件 */}
                <Modal
                    animationType="slide"       // 动画类型：none | slide | fade
                    transparent={true}          // 背景是否透明
                    visible={modalVisible}      // 是否可见
                    onRequestClose={() => {     // Android 上必须处理返回键
                        this.setModalVisible(false);
                    }}
                >
                    {/* 半透明背景层 */}
                    <View style={styles.overlay}>
                        {/* Modal 内容区 */}
                        <View style={styles.modalView}>
                            <Text>Hello, I am a Modal!</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => this.setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>关闭</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',  // 半透明黑色背景
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: 300,
        height: 100,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 5,                       // Android 阴影
        shadowColor: '#000',                // iOS 阴影
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
