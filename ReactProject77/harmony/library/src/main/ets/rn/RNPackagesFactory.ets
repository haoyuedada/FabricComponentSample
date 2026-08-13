/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { GeneratedPackage } from './GeneratedPackage'
import GestureHandlerPackage from '@react-native-ohos/react-native-gesture-handler';
import { ReanimatedPackage} from '@react-native-ohos/react-native-reanimated/ts';
import { SafeAreaViewPackage } from '@react-native-ohos/react-native-safe-area-context/ts';
import RNOHScreensPackage from "@react-native-ohos/react-native-screens"
import { ViewPagerPackage } from '@react-native-ohos/react-native-pager-view/ts';
import { SmartRefreshPackage } from '@react-native-ohos/react-native-smartrefreshlayout/ts';
import {ToolbarAndroidPackage} from '@react-native-ohos/toolbar-android/src/main/ets/ToolbarAndroidPackage';
import {AsyncStoragePackage} from '@react-native-ohos/async-storage/ts';
import { SvgPackage } from '@react-native-ohos/react-native-svg/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
    new GestureHandlerPackage(ctx),
    new ReanimatedPackage(ctx),
    new SafeAreaViewPackage(ctx),
    new RNOHScreensPackage(ctx),
    new ViewPagerPackage(ctx),
    new SmartRefreshPackage(ctx),
    new ToolbarAndroidPackage(ctx),
    new AsyncStoragePackage(ctx),
    new SvgPackage(ctx),
  ];
}
