/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNInfo, UPReactViewRNApp, UPRNSDK } from 'library';

@Entry
@Component
export struct RNPageRNApp {
  rnInfo: RNInfo = { businessId: 'app_name', bundlePath: 'bundle.harmony.js', isFromMetro: false };
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;
  @StorageProp('shouldResolve') storageProp: number = 0;
  // 控制 RN 页面是否渲染，跳转前置为 false 触发 RNApp.aboutToDisappear -> cleanUp 销毁 RN 实例
  @State shouldShowRNApp: boolean = true;

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
  }

  onPageShow(): void {
    // 从下一个页面返回时，重新挂载 RN 页面
    this.shouldShowRNApp = true
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