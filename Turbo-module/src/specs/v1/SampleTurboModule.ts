/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { TurboModule, TurboModuleRegistry } from "react-native";

interface Constants {
  id: number,
  Data: {
    id: number,
    message: string
  }
}
// 使用自定义的TurboModules
export interface Spec extends TurboModule {
  getConstants(): Promise<Constants>;
  testParamsEmpty(): void;
  pushStringToHarmony(arg: string, testCallBack: (value: string) => void): void;
  pushStringToHarmonyCallBack(arg: string, testCallBack: (value: string) => void): void;
  doAsyncJob(shouldResolve: boolean): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SampleTurboModule');