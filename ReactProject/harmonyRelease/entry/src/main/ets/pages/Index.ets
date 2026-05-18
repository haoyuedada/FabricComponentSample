/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import router from '@ohos.router';
import { mediaquery } from '@kit.ArkUI';
import { display } from '@kit.ArkUI'
import { fileIo } from '@kit.CoreFileKit';
import { common } from '@kit.AbilityKit';
import { AlertDialog } from '@kit.ArkUI';
import { zlib } from '@kit.BasicServicesKit';

function onPortrait(mediaQueryResult: mediaquery.MediaQueryResult) {
  if (mediaQueryResult.matches) {
    console.log("chy matches1 height:", px2vp(display.getDefaultDisplaySync().height))
    console.log("chy matches1 width:", px2vp(display.getDefaultDisplaySync().width))
  } else {
    console.log("chy matches2 height:", px2vp(display.getDefaultDisplaySync().height))
    console.log("chy matches2 width:", px2vp(display.getDefaultDisplaySync().width))    // do something here
  }
}
let listener = mediaquery.matchMediaSync('(orientation: landscape)'); // 监听横屏事件

@CustomDialog
struct ParamDialog {
  controller: CustomDialogController
  private title: string = ""  // 接收的标题参数
  private content: string = ""  // 接收的内容参数

  // 构造函数接收参数
  constructor(title: string, content: string) {
    super();
    this.title = title
    this.content = content
  }

  build() {
    Column() {
      Text(this.title).fontSize(20).fontColor(Color.Black)
      Text(this.content).margin({ top: 10 })
      Button('关闭')
        .onClick(() => this.controller.close())
    }
    .padding(20)
    .backgroundColor(Color.White)
    .borderRadius(8)
  }
}

@Entry
@Component
struct Index {
  @State message: string = '自定义RNInstance打开RN应用';
  @State message1: string = '通过RNApp打开RN应用';
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
  private path:string = this.context.filesDir;
  @State Content: string = '内容';
  // 创建控制器时传递参数
  private dialogController: CustomDialogController = new CustomDialogController({
    builder: ParamDialog({
      title: '提示信息',
      content: '这是动态传入的内容'
    }),
    alignment: DialogAlignment.Center,
    autoCancel: true
  })

  aboutToAppear(): void {
    listener.on('change', onPortrait) // 注册回调
  }

  aboutToDisappear(): void {
    listener.off('change', onPortrait) // 取消注册回调
  }

  onBackPress(): boolean | void {
  }



  dialogControllerConfirm: CustomDialogController = new CustomDialogController({
    builder: AlertDialog({
      // primaryTitle: this.primaryTitle,
      // secondaryTitle: '弹框二级标题',
      content: this.Content,
      // primaryButton: {
      //   value: '取消',
      //   action: () => {
      //   },
      // },
      secondaryButton: {
        value: '确认',
        role: ButtonRole.ERROR,
        action: () => {
          console.info('Callback when the second button is clicked')
        }
      },
    }),
  })

  build() {
    Row() {
      Column() {
        Button(this.message)
          .fontSize(20)
          .margin({top: 10})
          .onClick(() => {
            router.pushUrl({ url: 'pages/RNPage' }, router.RouterMode.Standard, (err) => {
              if (err) {
                console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
                return;
              }
              console.info('Invoke pushUrl succeeded.');
            })
          })

        Button(this.message1)
          .fontSize(20)
          .margin({top: 10})
          .onClick(() => {
            router.pushUrl({ url: 'pages/RNPageRNApp' }, router.RouterMode.Standard, (err) => {
              if (err) {
                console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
                return;
              }
              console.info('Invoke pushUrl succeeded.');
            })
          })

        Button("1. 在沙箱中创建文件夹")
          .fontSize(20)
          .margin({top: 10})
          .onClick(() => {
            try {
              // 创建文件夹路径
              this.path += "/tests/assets/mp4";
              fileIo.mkdir(this.path);
              this.dialogControllerConfirm.open()
            } catch (e) {
              console.log("chy mk err:", JSON.stringify(e))
            }

          })

        Text(this.path).fontSize(9).fontColor("#000000")

        Button("2. 将rawfile中的单个文件写入到沙箱")
          .fontSize(20)
          .margin({top: 10})
          .onClick(() => {
            try {
              // 源路径
              let fileOriginPath = "bundle.harmonyall.js";
              // 沙箱目标路径
              let fileTargetPath = this.context.filesDir + '/bundle.harmonyall.js'; // 获取沙箱路径
              let fileContent: Uint8Array = this.context.resourceManager.getRawFileContentSync(fileOriginPath);
              let file = fileIo.openSync(fileTargetPath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
              fileIo.writeSync(file.fd, fileContent.buffer);
              fileIo.closeSync(file);
              console.log("chy targetPath:", fileTargetPath)
              // /data/storage/el2/base/haps/entry/files/bundle.harmonyall.js
            } catch (e) {
              console.log("chy 2.error:", JSON.stringify(e))
            }
          })

        Button("3. 将全量打包产物写入到沙箱并解压")
          .fontSize(20)
          .margin({top: 10})
          .onClick(async() => {
            try {
              // 源路径
              let fileOriginPath = "all.zip";
              // 沙箱目标路径
              let fileTargetPath = this.context.filesDir + '/all.zip';
              let fileContent: Uint8Array = this.context.resourceManager.getRawFileContentSync(fileOriginPath);
              let file = fileIo.openSync(fileTargetPath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
              fileIo.writeSync(file.fd, fileContent.buffer);
              fileIo.closeSync(file);
              // 解压步骤
              // 先判断有咩有对应的文件夹
              const destDir = this.context.filesDir + '/all';
              const decompress = () => {
                zlib.decompressFile(fileTargetPath, destDir, (err) => {
                  if (err) {
                    console.error("chy 解压失败：" + JSON.stringify(err));
                  } else {
                    console.info("chy 解压完成，路径：" + destDir);
                  }
                });
              }
              if (!fileIo.accessSync(destDir)) {
                fileIo.mkdirSync(destDir); // 同步创建
                console.log('chy 文件夹创建成功');
                decompress();
              } else {
                decompress();
              }
              this.Content = "3. 将全量打包产物写入到沙箱并解压 => 成功";
              this.dialogControllerConfirm.open()
            } catch (e) {
              this.Content = "3. 将全量打包产物写入到沙箱并解压 => 失败" + JSON.stringify(e);
              this.dialogControllerConfirm.open()
              console.log("chy 3.error:", JSON.stringify(e))
            }
          })

        Button("4. 将拆包产物写入到沙箱并解压")
          .fontSize(20)
          .margin({top: 10})
          .onClick(async() => {
            try {
              // 源路径
              let fileOriginPath = "split.zip";
              // 沙箱目标路径
              let fileTargetPath = this.context.filesDir + '/split.zip';
              let fileContent: Uint8Array = this.context.resourceManager.getRawFileContentSync(fileOriginPath);
              let file = fileIo.openSync(fileTargetPath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
              fileIo.writeSync(file.fd, fileContent.buffer);
              fileIo.closeSync(file);
              // 解压步骤
              // 先判断有咩有对应的文件夹
              const destDir = this.context.filesDir + '/split';
              const decompress = () => {
                zlib.decompressFile(fileTargetPath, destDir, (err) => {
                  if (err) {
                    console.error("chy 解压失败：" + JSON.stringify(err));
                  } else {
                    console.info("chy 解压完成，路径：" + destDir);
                  }
                });
              }
              if (!fileIo.accessSync(destDir)) {
                fileIo.mkdirSync(destDir); // 同步创建
                console.log('chy 文件夹创建成功');
                decompress();
              } else {
                decompress();
              }
              this.Content = "4. 将拆包产物写入到沙箱并解压 => 成功";
              this.dialogControllerConfirm.open()
            } catch (e) {
              this.Content = "4. 将拆包产物写入到沙箱并解压 => 失败" + JSON.stringify(e);
              this.dialogControllerConfirm.open()
              console.log("chy 4.error:", JSON.stringify(e))
            }
          })
      }
      .width('100%')
    }
    .height('100%')
    // .backgroundColor('red')
    // .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }
}