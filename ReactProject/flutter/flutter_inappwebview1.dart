import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: const Text('本地 HTML Tab 示例'),
            bottom: const TabBar(tabs: [
              Tab(text: 'Page1'),
              Tab(text: 'Page2'),
            ]),
          ),
          body: TabBarView(
            children: [
              // 每个页签对应一个 InAppWebView
              _WebViewTab('assets/privacy.html'),
              _WebViewTab('assets/user_agreement.html'),
            ],
          ),
        ),
      ),
    );
  }
}

/// 封装一下，省代码
class _WebViewTab extends StatelessWidget {
  final String htmlPath;
  const _WebViewTab(this.htmlPath);

  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      // 关键：直接加载 assets 里的文件
      initialFile: htmlPath, // 不需要写 file:/// 前缀
      initialOptions: InAppWebViewGroupOptions(
        crossPlatform: InAppWebViewOptions(
          javaScriptEnabled: true, // 如果 HTML 里有 JS
        ),
      ),
    );
  }
}
