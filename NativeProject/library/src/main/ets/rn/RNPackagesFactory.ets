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
import { SafeAreaViewPackage } from '@react-native-oh-tpl/react-native-safe-area-context/ts';
import { ViewShotPackage } from '@react-native-oh-tpl/react-native-view-shot/ts';
import { SvgPackage } from '@react-native-oh-tpl/react-native-svg/ts';
import { LottieAnimationViewPackage } from '@react-native-oh-tpl/lottie-react-native/ts';
import { ViewPagerPackage } from '@react-native-oh-tpl/react-native-pager-view/ts';
import { RNCVideoPackage } from '@react-native-oh-tpl/react-native-video/ts';
import { WebViewPackage } from '@ohmi/react-native-webview/ts';
// import { RNOrientationPackage } from '@ohmi/react-native-orientation/ts';

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
  ];
}
