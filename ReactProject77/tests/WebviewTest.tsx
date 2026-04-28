import React, { useMemo } from 'react';
import { WebView } from 'react-native-webview';

// 直接导入 HTML 文件内容（需要额外配置）
const htmlContent = require('./html/faq_99.html');

export default function WebViewScreen() {
    return (
        <WebView
            style={{ width: 300, height: 300, backgroundColor: "#00000000" }}
            source={{ html: htmlContent }}
            //   originWhitelist={['*']}
            usewebkit={true}
        />
    );
};