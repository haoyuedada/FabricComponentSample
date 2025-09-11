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

@Entry
@Component
struct Index {
  @State message: string = '自定义RNInstance打开RN应用';
  @State message1: string = '通过RNApp打开RN应用';
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
  private path:string = this.context.filesDir;

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
      // primaryTitle: '弹框一级标题',
      // secondaryTitle: '弹框二级标题',
      content: '在沙箱中创建文件夹成功',
      primaryButton: {
        value: '取消',
        action: () => {
        },
      },
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
            // 源路径
            let fileOriginPath = "assets/tests/assets/mp4/303_1754468294.mp4";
            // 沙箱目标路径
            let fileTargetPath = this.context.filesDir + '/tests/assets/mp4/303_1754468294.mp4'; // 获取沙箱路径
            let fileContent: Uint8Array = this.context.resourceManager.getRawFileContentSync(fileOriginPath);
            let file = fileIo.openSync(fileTargetPath, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
            fileIo.writeSync(file.fd, fileContent.buffer);
            fileIo.closeSync(file);
            console.log("chy targetPath:", fileTargetPath)
          })
      }
      .width('100%')
    }
    .height('100%')
    // .backgroundColor('red')
    // .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }
}