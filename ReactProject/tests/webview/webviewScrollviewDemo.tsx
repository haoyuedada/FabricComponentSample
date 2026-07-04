import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

// 模拟大量内容的 HTML，用于测试滚动
const LONG_HTML_CONTENT = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .content-block {
            margin-bottom: 25px;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 6px;
            border-left: 4px solid #2196f3;
        }
        h2 {
            color: #1976d2;
            margin-top: 0;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        .scroll-indicator {
            text-align: center;
            color: #888;
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>长内容测试页面</h1>
        
        <div class="content-block">
            <h2>第一段内容</h2>
            <p>这是一个用于测试滚动功能的长内容页面。当 WebView 嵌套在 ScrollView 中时，需要正确处理滚动事件。</p>
            <p>nestedScrollEnabled 属性控制 WebView 是否能够与父级滚动容器正确协作。</p>
        </div>

        <div class="content-block">
            <h2>第二段内容</h2>
            <p>React Native 中的 WebView 组件在处理嵌套滚动时可能会遇到冲突问题。</p>
            <p>当 nestedScrollEnabled 为 true 时，WebView 会正确地将滚动事件传递给父级容器。</p>
        </div>

        <div class="content-block">
            <h2>第三段内容</h2>
            <p>这是一些更多的文本内容，用于增加页面的高度，使页面可以滚动。</p>
            <p>继续添加内容以确保页面足够长...</p>
        </div>

        <div class="content-block">
            <h2>第四段内容</h2>
            <p>滚动测试：尝试上下滚动页面，观察滚动行为。</p>
            <p>如果 nestedScrollEnabled 设置正确，WebView 内部的滚动和外部 ScrollView 的滚动应该能够协同工作。</p>
        </div>

        <div class="content-block">
            <h2>第五段内容</h2>
            <p>继续添加更多内容...</p>
            <p>这是测试页面的最后一段内容。</p>
        </div>

        <div class="scroll-indicator">
            页面底部 - 测试完成
        </div>
    </div>
</body>
</html>
`;

const WebViewNestedScrollDemo: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WebView nestedScrollEnabled 演示</Text>
        <Text style={styles.description}>
          本示例展示了 WebView 在嵌套滚动场景中的行为差异
        </Text>
      </View>

      {/* 第一个 WebView：nestedScrollEnabled={false} (默认行为) */}
      <View style={styles.webviewContainer}>
        <View style={styles.webviewHeader}>
          <Text style={styles.webviewTitle}>scrollEnabled = true</Text>
          <Text style={styles.webviewSubtitle}>
            可能存在滚动冲突问题
          </Text>
        </View>
        <WebView
          style={styles.webview}
          source={{ html: LONG_HTML_CONTENT }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
        />
      </View>

      {/* 第二个 WebView：nestedScrollEnabled={true} (启用嵌套滚动) */}
      <View style={styles.webviewContainer}>
        <View style={styles.webviewHeader}>
          <Text style={styles.webviewTitle}>scrollEnabled = false</Text>
          <Text style={styles.webviewSubtitle}>
            支持与父级滚动容器协作
          </Text>
        </View>
        <WebView
          style={styles.webview}
          source={{ html: LONG_HTML_CONTENT }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={true}
        />
      </View>

      {/* 说明 */}
      {/* <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>测试说明</Text>
        <Text style={styles.instructionsText}>
          • 尝试在两个 WebView 内部滚动
          {'\n'}• 尝试在整个页面上下滚动
          {'\n'}• 观察两者在滚动行为上的差异
          {'\n'}• 通常在 Android 上差异更为明显
        </Text>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  webviewContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
  },
  webviewHeader: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  webviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  webviewSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  webview: {
    width: width - 40,
    height: 400,
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  instructions: {
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default WebViewNestedScrollDemo;


// import { ScrollView, View, Text } from "react-native";
// import { WebView } from "react-native-webview";

// const TextOc = () => {
//   return (
//     <View>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//       <Text>WebView Demo</Text>
//     </View>
//   )
// }

// export default function WebViewDemo() {
//     // 模拟大量内容的 HTML，用于测试滚动
// const LONG_HTML_CONTENT = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             padding: 20px;
//             margin: 0;
//             background-color: #f5f5f5;
//         }
//         .container {
//             background: white;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
//         h1 {
//             color: #333;
//             text-align: center;
//             margin-bottom: 30px;
//         }
//         .content-block {
//             margin-bottom: 25px;
//             padding: 15px;
//             background-color: #e3f2fd;
//             border-radius: 6px;
//             border-left: 4px solid #2196f3;
//         }
//         h2 {
//             color: #1976d2;
//             margin-top: 0;
//         }
//         p {
//             color: #555;
//             line-height: 1.6;
//         }
//         .scroll-indicator {
//             text-align: center;
//             color: #888;
//             font-size: 14px;
//             margin-top: 20px;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>长内容测试页面</h1>
        
//         <div class="content-block">
//             <h2>第一段内容</h2>
//             <p>这是一个用于测试滚动功能的长内容页面。当 WebView 嵌套在 ScrollView 中时，需要正确处理滚动事件。</p>
//             <p>nestedScrollEnabled 属性控制 WebView 是否能够与父级滚动容器正确协作。</p>
//         </div>

//         <div class="content-block">
//             <h2>第二段内容</h2>
//             <p>React Native 中的 WebView 组件在处理嵌套滚动时可能会遇到冲突问题。</p>
//             <p>当 nestedScrollEnabled 为 true 时，WebView 会正确地将滚动事件传递给父级容器。</p>
//         </div>

//         <div class="content-block">
//             <h2>第三段内容</h2>
//             <p>这是一些更多的文本内容，用于增加页面的高度，使页面可以滚动。</p>
//             <p>继续添加内容以确保页面足够长...</p>
//         </div>

//         <div class="content-block">
//             <h2>第四段内容</h2>
//             <p>滚动测试：尝试上下滚动页面，观察滚动行为。</p>
//             <p>如果 nestedScrollEnabled 设置正确，WebView 内部的滚动和外部 ScrollView 的滚动应该能够协同工作。</p>
//         </div>

//         <div class="content-block">
//             <h2>第五段内容</h2>
//             <p>继续添加更多内容...</p>
//             <p>这是测试页面的最后一段内容。</p>
//         </div>

//         <div class="scroll-indicator">
//             页面底部 - 测试完成
//         </div>
//     </div>
// </body>
// </html>
// `;

//   return (
//     <ScrollView>
//       <TextOc></TextOc>
//       <WebView style={{ height: 300 }} 
//         nestedScrollEnabled={true}
//         scrollEnabled={true} 
//         source={{ uri: "https://www.baidu.com" }} 
//         // source={{ html: LONG_HTML_CONTENT }}
//         />
//       <TextOc></TextOc>
//     </ScrollView>
//   );
// }