import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import WebView from 'react-native-webview';

class DisplayAnImage extends Component {
    constructor(props) {
        super(props);
        // this.progress = new Animated.Value(1); // 创建动画值
    }

    render() {
        return (
            <WebView
                source={{ uri: 'file:///path/to/harmony-webview-postmessage-duplicate-bug.html' }}
                onMessage={(event) => {
                    console.log('[RN] onMessage received:', event.nativeEvent.data);
                    // ❌ 实际表现：一次 postMessage 会触发两次 onMessage
                }}
            />
        );
    }
}

export default DisplayAnImage;