/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { GeneratedPackage } from './GeneratedPackage';
import GestureHandlerPackage from '@react-native-ohos/react-native-gesture-handler';
import { ReanimatedWorkletPackage } from '@react-native-ohos/react-native-worklets'
import { ReanimatedPackage} from '@react-native-ohos/react-native-reanimated/ts';
import {SpringScrollViewPackage} from '@react-native-ohos/react-native-spring-scrollview/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
    new GestureHandlerPackage(ctx),
    new ReanimatedWorkletPackage(ctx),
    new ReanimatedPackage(ctx),
    new SpringScrollViewPackage(ctx),
  ];
}
