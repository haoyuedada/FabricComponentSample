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
import {SafeAreaViewPackage} from '@react-native-oh-tpl/react-native-safe-area-context/ts';
// import {RNDatePickerPackage} from '@react-native-oh-tpl/react-native-date-picker/ts';
import { ViewShotPackage } from '@react-native-oh-tpl/react-native-view-shot/ts';
import { SvgPackage } from '@react-native-oh-tpl/react-native-svg/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
    new FastImagePackage(ctx),
    new GestureHandlerPackage(ctx),
    new SafeAreaViewPackage(ctx),
    // new RNDatePickerPackage(ctx),
    new ViewShotPackage(ctx),
    new SvgPackage(ctx)
  ];
}
