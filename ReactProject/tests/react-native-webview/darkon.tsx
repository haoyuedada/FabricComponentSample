import React from "react";
import { WebView } from "react-native-webview";

export default function App() {
    return (
        <WebView
            forceDarkOn={true}
            source={{ uri: "https://reactnative.dev/" }}
            style={{ flex: 1 }}
        />
    )
}