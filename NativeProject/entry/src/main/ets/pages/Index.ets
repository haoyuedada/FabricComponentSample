/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import router from '@ohos.router';
import { mediaquery } from '@kit.ArkUI';
import { display } from '@kit.ArkUI'

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
  @State message: string = '打开RN应用';

  aboutToAppear(): void {
    listener.on('change', onPortrait) // 注册回调
  }

  aboutToDisappear(): void {
    listener.off('change', onPortrait) // 取消注册回调
  }

  onBackPress(): boolean | void {
  }

  build() {
    Row() {
      Column() {
        Button(this.message)
          .fontSize(20)
          .onClick(() => {
            router.pushUrl({ url: 'pages/RNPage' }, router.RouterMode.Standard, (err) => {
              if (err) {
                console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
                return;
              }
              console.info('Invoke pushUrl succeeded.');
            })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}