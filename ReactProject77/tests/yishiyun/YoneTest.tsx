import React, { useState } from 'react';
import {
    Button,
    Modal,
    StyleSheet,
    View
} from 'react-native';
import BaseSlider from './BaseSlider';

export default function YoneTest() {
    const [visible, setVisible] = useState(false);
    const [selectVolume, setSelectVolume] = useState(50);

    return (
        <View style={styles.container}>
            <Button
                title="打开音量设置"
                onPress={() => setVisible(true)}
            />

            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setVisible(false)}>
                <View style={styles.overlay}>
                    <BaseSlider
                        initialValue={selectVolume}
                        minValue={10}
                        maxValue={100}
                        // simpleMode={true}
                        showIcons={false}
                        showValue={false}
                        onValueChangeEnd={volume => {
                            console.log('音量变化结束:', volume);
                            setSelectVolume(volume);
                        }}
                        onValueChange={volume => {
                            console.log('音量变化中:', volume);
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});