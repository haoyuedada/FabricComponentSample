/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNInfo, UPReactViewRNAppTwo, UPRNSDK } from 'library';
import router from '@ohos.router';

@Entry
@Component
export struct RNPageRNAppTwo {
  rnInfo: RNInfo = { businessId: 'app_name', bundlePath: 'bundle.harmony.js', isFromMetro: false };
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;
  @StorageProp('shouldResolve') storageProp: number = 0;
  // 控制 RN 页面是否渲染，返回前置为 false 触发 RNApp.aboutToDisappear -> cleanUp 销毁 RN 实例
  @State shouldShowRNApp: boolean = true;
  // 循环跳转开关，与 library 中的按钮共享
  @StorageLink('autoLoopRunning') @Watch('onAutoLoopChange') autoLoopRunning: boolean = false
  @State isPageActive: boolean = false
  private autoLoopTimer: number = -1
  private readonly LOOP_INTERVAL: number = 300

  onBackPress(): boolean | void {
    if ( this.storageProp >= 2 ) {
      this.rnSdk?.onBackPress();
      return true;
    }
  }

  aboutToAppear(): void {
    console.log("chy RNPageRNAppTwo aboutToAppear")
    this.shouldShowRNApp = true
  }

  aboutToDisappear(): void {
    console.log("chy RNPageRNAppTwo aboutToDisappear")
    this.stopAutoLoop()
  }

  onPageShow(): void {
    this.isPageActive = true
    // 从上一个页面再次跳转过来时，重新挂载 RN 页面
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
      setTimeout(() => {
        if (this.autoLoopRunning) {
          router.back()
        } else {
          this.shouldShowRNApp = true
        }
      }, 100)
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
        UPReactViewRNAppTwo({
          onUnMountBeforeNavigate: () => {
            this.shouldShowRNApp = false
          }
        })
      }
    }.width('100%').height('100%')
  }
}
