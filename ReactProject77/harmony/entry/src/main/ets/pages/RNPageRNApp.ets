/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNInfo, UPReactViewRNApp, UPRNSDK } from 'library';
import router from '@ohos.router';

@Entry
@Component
export struct RNPageRNApp {
  rnInfo: RNInfo = { businessId: 'app_name', bundlePath: 'bundle.harmony.js', isFromMetro: false };
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;
  @StorageProp('shouldResolve') storageProp: number = 0;
  // 控制 RN 页面是否渲染，跳转前置为 false 触发 RNApp.aboutToDisappear -> cleanUp 销毁 RN 实例
  @State shouldShowRNApp: boolean = true;
  // 循环跳转开关，与 library 中的按钮共享
  @StorageLink('autoLoopRunning') @Watch('onAutoLoopChange') autoLoopRunning: boolean = false
  @State isPageActive: boolean = false
  private autoLoopTimer: number = -1
  private readonly LOOP_INTERVAL: number = 1000

  onBackPress(): boolean | void {
    if ( this.storageProp >= 2 ) {
      this.rnSdk?.onBackPress();
      return true;
    }
  }

  aboutToAppear(): void {
    console.log("chy RNPageRNApp aboutToAppear")
    this.shouldShowRNApp = true
  }

  aboutToDisappear(): void {
    console.log("chy RNPageRNApp aboutToDisappear")
    this.stopAutoLoop()
  }

  onPageShow(): void {
    this.isPageActive = true
    // 从下一个页面返回时，重新挂载 RN 页面
    this.shouldShowRNApp = true
    if (this.autoLoopRunning) {
      this.startAutoLoop()
    }
  }

  onPageHide(): void {
    this.isPageActive = false
    this.stopAutoLoop()
  }

  onAutoLoopChange(): void {
    if (this.autoLoopRunning && this.isPageActive) {
      this.startAutoLoop()
    } else if (!this.autoLoopRunning) {
      this.stopAutoLoop()
    }
  }

  startAutoLoop(): void {
    if (this.autoLoopTimer !== -1) {
      return
    }
    this.autoLoopTimer = setTimeout(() => {
      this.autoLoopTimer = -1
      if (!this.autoLoopRunning) {
        return
      }
      // 卸载 RN 组件，触发 RNApp.aboutToDisappear -> cleanUp 销毁 RN 实例
      this.shouldShowRNApp = false
      if (this.autoLoopRunning) {
        router.pushUrl({ url: 'pages/RNPageRNAppTwo' }, router.RouterMode.Standard, (err) => {
          if (err) {
            console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`)
            return
          }
          console.info('Invoke pushUrl succeeded.')
        })
      } else {
        this.shouldShowRNApp = true
      }
    }, this.LOOP_INTERVAL)
  }

  stopAutoLoop(): void {
    if (this.autoLoopTimer !== -1) {
      clearTimeout(this.autoLoopTimer)
      this.autoLoopTimer = -1
    }
  }

  build() {
    Stack() {
      if (this.shouldShowRNApp) {
        UPReactViewRNApp({
          onUnMountBeforeNavigate: () => {
            this.shouldShowRNApp = false
          }
        })
      }
    }.width('100%').height('100%')
  }
}