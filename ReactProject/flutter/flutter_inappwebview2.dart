import 'package:flutter/material.dart';
import 'dart:async';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
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
              physics: SlowPageScrollPhysics(),
              children: [
                // 每个页签对应一个 InAppWebView
                _WebViewTab('assets/privacy.html'),
                _WebViewTab('assets/user_agreement.html'),
              ],
            ),
          )),
    );
  }
}

class SlowPageScrollPhysics extends ScrollPhysics {
  const SlowPageScrollPhysics({ScrollPhysics? parent}) : super(parent: parent);

  @override
  SlowPageScrollPhysics applyTo(ScrollPhysics? ancestor) {
    return SlowPageScrollPhysics(parent: buildParent(ancestor));
  }

  // 手指拖动时，让位移缩小
  @override
  double applyPhysicsToUserOffset(ScrollMetrics position, double offset) {
    // 比如将用户手势位移缩小一半
    return super.applyPhysicsToUserOffset(position, offset * 0.5);
  }

  // 惯性滑动时，让速度变小
  @override
  Simulation? createBallisticSimulation(
      ScrollMetrics position, double velocity) {
    // 若速度接近 0 就不做惯性动画
    if (velocity.abs() < 50.0) {
      return null;
    }
    // 将惯性速度调小
    final double newVelocity = velocity * 0.5;
    return super.createBallisticSimulation(position, newVelocity);
  }
}

class _WebViewTab extends StatefulWidget {
  final String htmlPath;
  const _WebViewTab(this.htmlPath);

  @override
  State<_WebViewTab> createState() => _WebViewTabState();
}

class _WebViewTabState extends State<_WebViewTab> {
  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      // 关键：直接加载 assets 里的文件
      initialFile: widget.htmlPath, // 不需要写 file:/// 前缀
      onScrollChanged: (controller, int x, int y) {},
    );
  }
}
