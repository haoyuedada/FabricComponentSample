import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { QRscanner } from 'react-native-qr-decode-image-camera';


export const QrExample = () => {

    const [flashMode, setflashMode] = useState(false);
    const onRead = res => {
        console.log(res);
    };
    return (
        <View style={styles.container}>
            <QRscanner
                onRead={onRead}
                renderBottomView={() => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: '#0000004D',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    if (flashMode) {
                                        setflashMode(false);
                                    } else {
                                        setflashMode(true);
                                    }
                                }}>
                                <Text style={{ color: '#fff' }}>flashMode</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                flashMode={flashMode}
                finderY={50}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
