/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { TurboModule, AnyThreadTurboModule } from '@rnoh/react-native-openharmony/ts';

export interface TurboModuleEventData {
  param: string
}

export class SampleTurboModulevv extends TurboModule {
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