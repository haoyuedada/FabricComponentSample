/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { HashMap } from '@kit.ArkTS';

export interface TurboModuleEventData {
  param: string
}

interface GeneratedObjectLiteralInterface_1 {
  "key": number;
}

export class SampleTurboModule extends TurboModule {
  getConstants() {
    // let myMap: HashMap<string, number> = new HashMap<string, number>();
    // myMap.set("key1", 1)
    let obj: GeneratedObjectLiteralInterface_1 = {"key": 2}
    return obj;
  }

  pushStringToHarmony(arg: string, testCallBack: (value:string) => void): string {
    testCallBack('hh')
    return arg;
  }

  pushStringToHarmonyCallBack(arg: string, testCallBack: (value:string) => void): string {
    testCallBack('hh')
    return arg;
  }

  loadInfoCallBack(key: string, callback: (value: string) => void): void {
    callback('loadInfoCallBack')
  }
}