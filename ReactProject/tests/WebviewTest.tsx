import React, { useMemo } from 'react';
import { WebView } from 'react-native-webview';

// 直接导入 HTML 文件内容（需要额外配置）
const htmlContent = require('./html/faq_99.html');
const url = "https://cdn.mathufo.com/h5/landing/promotions/promotions/index.domestic.html?ex=1662015576&page_type=new_user_discount_b";

export default function WebViewScreen() {
    return (
        <WebView
            style={{ width: 300, height: 300, backgroundColor: "#00000000" }}
            source={{ uri: url }}
            //   originWhitelist={['*']}
            usewebkit={true}
        />
    );
};