/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { TurboModule, TurboModuleRegistry } from "react-native";

// 使用自定义的TurboModules
export interface Spec extends TurboModule {
  pushStringToHarmony(arg: string, testCallBack: (value: string) => void): void;
  pushStringToHarmonyCallBack(arg: string, testCallBack: (value: string) => void): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SampleTurboModule');