import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'package:flutter/services.dart';

import 'package:flutter_vap_plus/flutter_vap_plus.dart';
import 'package:oktoast/oktoast.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with SingleTickerProviderStateMixin{
  List<String> downloadPathList = [];
  bool isDownload = false;
  VapController? vapController;

  VapController? vapController2;
  VapController? vapController3;
  VapController? vapController4;
  VapScaleFit vapScaleFit = VapScaleFit.FIT_XY;
  int count = 0;
  int count2 = 0;
  int count3 = 0;
  int count4 = 0;
  late AnimationController animationController = AnimationController(duration: Duration(seconds: 1), vsync: this);
  late Animation animation;
  @override
  void initState() {
    super.initState();
    initDownloadPath();
        animation = Tween<double>(
      begin: 0,
      end: 600
    ).animate(animationController);
    animationController.repeat();
  }

  Future<void> initDownloadPath() async {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String rootPath = appDocDir.path;

    var demo1 = await _getImageFileFromAssets('static/demo.mp4');
    var demo2 = await _getImageFileFromAssets('static/video.mp4');

    downloadPathList = [demo1.path, demo2.path];
  }

  @override
  Widget build(BuildContext context) {
    return OKToast(
      child: MaterialApp(
        home: Scaffold(
          body: Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              color: Color.fromARGB(255, 100, 241, 243),
            ),
            child: Stack(
              alignment: Alignment.bottomCenter,
              children: [
                Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CupertinoButton(
                      color: Colors.purple,
                      child: Text(
                          "download video source${isDownload ? "(✅)" : ""}"),
                      onPressed: _download,
                    ),
                    CupertinoButton(
                      color: Colors.purple,
                      child: Text("File1 play"),
                      onPressed: () {
                        Timer.periodic(Duration(milliseconds: 2000), (_) {
                          setState(() {
                            count++;
                          });
                        });
                        Timer.periodic(Duration(milliseconds: 1300), (_) {
                          setState(() {
                            count2++;
                          });
                        });
                        Timer.periodic(Duration(milliseconds: 1500), (_) {
                          setState(() {
                            count3++;
                          });
                        });
                        Timer.periodic(Duration(milliseconds: 1700), (_) {
                          setState(() {
                            count4++;
                          });
                        });
                      },
                    ),
                    CupertinoButton(
                      color: Colors.purple,
                      child: Text("File2 play"),
                      onPressed: () => _playFile(downloadPathList[1]),
                    ),
                    CupertinoButton(
                      color: Colors.purple,
                      child: Text("asset play （ohos Not supported）"),
                      onPressed: () => _playAsset("static/demo.mp4"),
                    ),
                    Builder(builder: (context) {
                      return CupertinoButton(
                        color: Colors.purple,
                        child: Text("fusion animation play"),
                        onPressed: () {
                          showDialog<void>(
                            context: context,
                            barrierDismissible: true,
                            // false = user must tap button, true = tap outside dialog
                            builder: (BuildContext dialogContext) {
                              final size = MediaQuery.sizeOf(dialogContext);
                              return AlertDialog(
                                backgroundColor: Colors.transparent,
                                insetPadding: EdgeInsets.zero,
                                contentPadding: EdgeInsets.zero,
                                content: GestureDetector(
                                  onTap: () {
                                    Navigator.of(context).pop();
                                  },
                                  child: SizedBox(
                                    width: size.width,
                                    height: size.height,
                                    child: IgnorePointer(
                                      child: VapView(
                                          fit: VapScaleFit.FIT_CENTER,
                                          onControllerCreated:
                                              (controller) async {
                                            var avatarFile =
                                                await _getImageFileFromAssets(
                                                    'static/bg.jpeg');
                                            await controller.playPath(
                                                downloadPathList[1],
                                                fetchResources: [
                                                  FetchResourceModel(
                                                      tag: '01',
                                                      resource: '测试文本01'),
                                                  FetchResourceModel(
                                                      tag: '02',
                                                      resource: '测试文本02'),
                                                  FetchResourceModel(
                                                      tag: '03',
                                                      resource:
                                                          avatarFile.path),
                                                ]);
                                            if (dialogContext.mounted) {
                                              Navigator.of(context).pop();
                                            }
                                          }),
                                    ),
                                  ),
                                ),
                              );
                            },
                          );
                        },
                      );
                    }),
                    CupertinoButton(
                      color: Colors.purple,
                      child: Text("stop play"),
                      onPressed: () => vapController?.stop(),
                    ),
                    CupertinoButton(
                      color: Colors.purple,
                      child: Text("queue play"),
                      onPressed: _queuePlay,
                    ),
                  ],
                ),

                Positioned.fill(
                    child: IgnorePointer(
                  // VapView可以通过外层包Container(),设置宽高来限制弹出视频的宽高
                  // VapView can set the width and height through the outer package Container() to limit the width and height of the pop-up video
                  child: Container(
                    key: ValueKey(count),
                    child: VapView(
                      fit: VapScaleFit.FIT_XY,
                      onEvent: (event, args) {
                        debugPrint('VapView event:${event}');
                      },
                      onControllerCreated: (controller) {
                        vapController = controller;
                        _playFile(downloadPathList[1]);
                      },
                    ),
                  ),
                )),
                Positioned.fill(
                    child: IgnorePointer(
                  // VapView可以通过外层包Container(),设置宽高来限制弹出视频的宽高
                  // VapView can set the width and height through the outer package Container() to limit the width and height of the pop-up video
                  child: Container(
                    key: ValueKey(count2),
                    child: VapView(
                      fit: VapScaleFit.FIT_XY,
                      onEvent: (event, args) {
                        debugPrint('VapView event:${event}');
                      },
                      onControllerCreated: (controller) {
                        vapController2 = controller;
                        vapController2?.playPath(downloadPathList[0], fetchResources: []);
                      },
                    ),
                  ),
                )),
                Positioned.fill(
                    child: IgnorePointer(
                  // VapView可以通过外层包Container(),设置宽高来限制弹出视频的宽高
                  // VapView can set the width and height through the outer package Container() to limit the width and height of the pop-up video
                  child: Container(
                    key: ValueKey(count3),
                    child: VapView(
                      fit: VapScaleFit.FIT_XY,
                      onEvent: (event, args) {
                        debugPrint('VapView event:${event}');
                      },
                      onControllerCreated: (controller) {
                        vapController3 = controller;
                        vapController3?.playPath(downloadPathList[1], fetchResources: []);
                      },
                    ),
                  ),
                )),
                Positioned.fill(
                    child: IgnorePointer(
                  // VapView可以通过外层包Container(),设置宽高来限制弹出视频的宽高
                  // VapView can set the width and height through the outer package Container() to limit the width and height of the pop-up video
                  child: Container(
                    key: ValueKey(count4),
                    child: VapView(
                      fit: VapScaleFit.FIT_XY,
                      onEvent: (event, args) {
                        debugPrint('VapView event:${event}');
                      },
                      onControllerCreated: (controller) {
                        vapController4 = controller;
                        vapController4?.playPath(downloadPathList[1], fetchResources: []);
                      },
                    ),
                  ),
                )),
                      Positioned.fill(
                    child: IgnorePointer(
                  // VapView可以通过外层包Container(),设置宽高来限制弹出视频的宽高
                  // VapView can set the width and height through the outer package Container() to limit the width and height of the pop-up video
                  child: Container(
                    child: VapView(
                      fit: VapScaleFit.FIT_XY,
                      repeatCount: -1,
                      onEvent: (event, args) {
                        debugPrint('VapView event:${event}');
                      },
                      onControllerCreated: (controller) {
                        controller.playPath(downloadPathList[0], fetchResources: []);
                      },
                    ),
                  ),
                )),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<File> _getImageFileFromAssets(String path) async {
    Directory tempDir = await getTemporaryDirectory();
    String tempPath = tempDir.path;
    var filePath = "$tempPath/$path";
    var file = File(filePath);
    if (file.existsSync()) {
      return file;
    } else {
      final byteData = await rootBundle.load(path);
      final buffer = byteData.buffer;
      await file.create(recursive: true);
      return file.writeAsBytes(
          buffer.asUint8List(byteData.offsetInBytes, byteData.lengthInBytes));
    }
  }

  _download() async {
    setState(() {
      isDownload = true;
    });
  }

  Future<void> _playFile(String path,
      {List<FetchResourceModel> fetchResources = const []}) async {
    try {
      await vapController?.playPath(path, fetchResources: fetchResources);
    } catch (e, s) {
      print(s);
    }
  }

  Future<void> _playAsset(String asset,
      {List<FetchResourceModel> fetchResources = const []}) async {
    await vapController?.playAsset(asset, fetchResources: fetchResources);
  }

  Future<void> _queuePlay() async {
    // 模拟多个地方同时调用播放,使得按顺序执行播放。
    // Simultaneously call playback in multiple places, making the queue perform playback.
    await vapController?.playPath(downloadPathList[0]);
    await vapController?.playPath(downloadPathList[1]);
    if (Platform.isOhos) {
      await vapController?.playPath(downloadPathList[0]);
    } else {
      await _playAsset("static/demo.mp4");
    }
  }
}
