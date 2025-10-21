/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNInfo, UPReactView, UPRNSDK } from 'library';
import { display } from '@kit.ArkUI';

@Entry
@Component
export struct RNPage {
  rnInfo: RNInfo = { businessId: 'app_name', bundlePath: 'bundle.harmony.js', isFromMetro: false };
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;
  @StorageProp('shouldResolve') storageProp: number = 0;
  @State isPad:boolean = false;

  onBackPress(): boolean | void {
    if ( this.storageProp >= 2 ) {
      this.rnSdk?.onBackPress();
      return true;
    }
  }

  aboutToAppear(): void {
    console.log("chy RNPage aboutToAppear")
    const displayClass = display.getDefaultDisplaySync();
    const screenWidth = displayClass.width;
    const screenHeight = displayClass.height;
    console.log("chy RNPage screenWidth:", screenWidth)
    console.log("chy RNPage screenHeight:", screenHeight)
    const shorterSideLengthPx = Math.min(screenWidth, screenHeight);
    const shorterSideLengthVp = px2vp(shorterSideLengthPx);
    const isPad: boolean =  shorterSideLengthVp >= 530;
    console.log("chy RNPage shorterSideLengthVp:", shorterSideLengthVp, "isPad:", isPad)
  }

  aboutToDisappear(): void {
    console.log("chy RNPage aboutToDisappear")
  }

  build() {
    Stack() {
      UPReactView({
        rnInfo: this.rnInfo
      })
    }.width('100%').height('100%')
  }
}