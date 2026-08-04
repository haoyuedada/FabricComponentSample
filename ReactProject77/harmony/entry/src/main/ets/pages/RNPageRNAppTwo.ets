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

  onBackPress(): boolean | void {
    if ( this.storageProp >= 2 ) {
      this.rnSdk?.onBackPress();
      return true;
    }
  }

  aboutToAppear(): void {
    console.log("chy RNPageRNAppTwo aboutToAppear")
  }

  aboutToDisappear(): void {
    console.log("chy RNPageRNAppTwo aboutToDisappear")
  }

  build() {
    Stack() {
      UPReactViewRNAppTwo()
    }.width('100%').height('100%')
  }
}
