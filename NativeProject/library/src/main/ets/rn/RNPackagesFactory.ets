/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { GeneratedPackage } from './GeneratedPackage'
import { FastImagePackage } from '@react-native-oh-tpl/react-native-fast-image/ts';
import { GestureHandlerPackage } from '@react-native-oh-tpl/react-native-gesture-handler/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
    new FastImagePackage(ctx),
    new GestureHandlerPackage(ctx),
  ];
}
