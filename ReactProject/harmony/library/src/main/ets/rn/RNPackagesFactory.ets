/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { GeneratedPackage } from './GeneratedPackage'
import { FastImagePackage } from '@react-native-oh-tpl/react-native-fast-image/ts';
import { GestureHandlerPackage } from '@react-native-ohos/react-native-gesture-handler/ts';
import { SafeAreaViewPackage } from '@react-native-oh-tpl/react-native-safe-area-context/ts';
import { ViewShotPackage } from '@react-native-oh-tpl/react-native-view-shot/ts';
import { SvgPackage } from '@react-native-oh-tpl/react-native-svg/ts';
import { LottieAnimationViewPackage } from '@react-native-oh-tpl/lottie-react-native/ts';
import { ViewPagerPackage } from '@react-native-oh-tpl/react-native-pager-view/ts';
import { RNCVideoPackage } from '@react-native-oh-tpl/react-native-video/ts';
import { WebViewPackage } from '@react-native-ohos/react-native-webview/ts';
// import { RNOrientationPackage } from '@ohmi/react-native-orientation/ts';
import { ReanimatedPackage } from '@react-native-ohos/react-native-reanimated/ts';
import { RNSkiaPackage } from '@react-native-ohos/react-native-skia/ts';
import { NetInfoPackage } from '@react-native-oh-tpl/netinfo/ts';
import { RNKeyboardControllerPackage, RNStatusBarManagerCompatPackage } from  "@react-native-ohos/react-native-keyboard-controller/ts";
import RnohReactNativeHarmonyScreensPackage from '@react-native-ohos/react-native-screens';
import { SmartRefreshPackage } from '@react-native-ohos/react-native-smartrefreshlayout/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
    new FastImagePackage(ctx),
    new GestureHandlerPackage(ctx),
    new SafeAreaViewPackage(ctx),
    new ViewShotPackage(ctx),
    new SvgPackage(ctx),
    new LottieAnimationViewPackage(ctx),
    new ViewPagerPackage(ctx),
    new RNCVideoPackage(ctx),
    new WebViewPackage(ctx),
    // new RNOrientationPackage(ctx)
    new ReanimatedPackage(ctx),
    new RNSkiaPackage(ctx),
    new NetInfoPackage(ctx),
    new RNKeyboardControllerPackage(ctx),
    new RNStatusBarManagerCompatPackage(ctx),
    new RnohReactNativeHarmonyScreensPackage(ctx),
    new SmartRefreshPackage(ctx)
  ];
}
