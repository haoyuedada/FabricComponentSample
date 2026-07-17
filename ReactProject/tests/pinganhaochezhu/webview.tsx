import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import WebView from 'react-native-webview';

const LONG_HTML_CONTENT = `
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>postMessage Duplicate Bug Test</title>
    </head>
    
    <body>
        
<h3>HarmonyOS RN WebView postMessage 重复触发测试</h3>

        <p id="counter">点击次数: 0</p>
        <button onclick="send()">触发 postMessage</button>
        <br/>
        <br/>
        <button onclick="sendMultiple()">连续触发 3 次</button>
        <script>
            let count = 0;

            function send() {
                count++;
                document.getElementById('counter').textContent = '点击次数: ' + count;
                const msg = JSON.stringify({
                    type: 'test',
                    seq: count,
                    timestamp: Date.now()
                });
                console.log('[WEB] postMessage called, seq=' + count, msg);
                window.ReactNativeWebView.postMessage(msg);
            }

            function sendMultiple() {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => send(), i * 300);
                }
            }
        </script>
    </body>

</html>
`

class DisplayAnImage extends Component {
    constructor(props) {
        super(props);
        // this.progress = new Animated.Value(1); // 创建动画值
    }

    handleMessage = (event) => {
        console.log('[RN] handleMessage received:', event.nativeEvent.data);
        // ❌ 实际表现：一次 postMessage 会触发两次 onMessage
    }   
    render() {
        console.log("chy render")
        return (
            <WebView
                originWhiteList={['*']}
                useWebKit
                javaScriptEnabled
                domStorageEnabled
                mixedContentMode
                // source={{ html: LONG_HTML_CONTENT }}
                source={{ uri: 'https://autoservice-sit.pingan.com.cn/web/capp/static/test.html' }}
                // onMessage={(event) => {
                //     console.log('[RN] onMessage received:', event.nativeEvent.data);
                //     // ❌ 实际表现：一次 postMessage 会触发两次 onMessage
                // }}
                onMessage={this.handleMessage}
                onScroll={(event) => {
                    console.log('[RN] onScroll event:', event.nativeEvent.contentOffset.y.toFixed(1));
                }}
                onLoadStart={() => {
                    console.log('[RN] onLoadStart called');
                }}
                onLoadingStart={(event) => {
                    console.log('[RN] onLoadingStart called:', event.nativeEvent.url);
                }}
            />
        );
    }
}

export default DisplayAnImage;