import React, { forwardRef, memo, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import WebView from 'react-native-webview';
 
const AdaptiveWebView = (props: any, ref: any) => {
  const { style, content, onMessage, onSizeChange, customStyle } = props;
  const windowWidth = useWindowDimensions().width;
  const [size, setSize] = useState({
    height: style?.height ?? 0,
    width: style?.width ?? windowWidth,
  });
 
  const handleMessage = (event: any) => {
    if (event.nativeEvent) {
      const data = JSON.parse(event.nativeEvent.data);
      const { height, width } = data;
      if (height && width) {
        setSize({ height, width });
      }
    }
    onMessage && onMessage(event);
  };
 
  useEffect(() => {
    onSizeChange && onSizeChange(size);
  }, [size, onSizeChange]);
 
  const script = `
    const meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "width=device-width, user-scalable=no");
    document.getElementsByTagName("head")[0].appendChild(meta);
  
    const wrapper = document.getElementById('adaptive-wrapper');
    if (wrapper) {
      let previousHeight = undefined;
      let previousWidth = undefined;
      let checkTimeout = undefined;
      let sameTimes = 0;
      const maxCheckTimes = 5;
      const checkInterval = 1000;
      const checkWebViewSize = () => {
        const result = wrapper.getBoundingClientRect();
        const height = (result.top + result.height) || wrapper.offsetHeight || document.documentElement.offsetHeight;
        const width = result.width || wrapper.offsetWidth || document.documentElement.offsetWidth;
        if (height !== previousHeight || width !== previousWidth) {
          previousHeight = height;
          previousWidth = width;
          sameTimes = 1;
          if (window.ReactNativeWebView?.postMessage) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ width, height }));
          }
        } else {
          sameTimes++;
        }
        if (sameTimes <= maxCheckTimes) {
          checkTimeout && clearTimeout(checkTimeout);
          const delay = sameTimes * checkInterval;
          checkTimeout = setTimeout(checkWebViewSize, delay);
        }
      };
      window.addEventListener('load', checkWebViewSize);
      window.addEventListener('resize', checkWebViewSize);
      checkWebViewSize();
    }
  `;
 
  const html = `
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      ${customStyle ?? ''}
    </style>
    <div id='adaptive-wrapper'>${content}</div>
    <script>
      ${script}
    </script>
  `;
 
  return (
    <WebView
      {...props}
      ref={ref}
      style={[size, style]}
      source={{ html }}
      onMessage={handleMessage}
      javaScriptEnabled={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      originWhitelist={['*']}
      scalesPageToFit={false}
      scrollEnabled={false} />
  );
}
 
export default memo(forwardRef(AdaptiveWebView));