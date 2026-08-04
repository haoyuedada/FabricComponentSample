/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNInfo, UPReactViewRNAppTwo, UPRNSDK } from 'library';

@Entry
@Component
export struct RNPageRNAppTwo {
  rnInfo: RNInfo = { businessId: 'app_name', bundlePath: 'bundle.harmony.js', isFromMetro: false };
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;
  @StorageProp('shouldResolve') storageProp: number = 0;
  // 控制 RN 页面是否渲染，返回前置为 false 触发 RNApp.aboutToDisappear -> cleanUp 销毁 RN 实例
  @State shouldShowRNApp: boolean = true;

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
  }

  onPageShow(): void {
    // 从上一个页面再次跳转过来时，重新挂载 RN 页面
    this.shouldShowRNApp = true
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
