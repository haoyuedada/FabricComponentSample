/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

#include "RNOH/PackageProvider.h"
#include "generated/RNOHGeneratedPackage.h"
#include "FabricComponentSamplePackagePackage.h"
#include "FastImagePackage.h"
#include "GestureHandlerPackage.h"
#include "SafeAreaViewPackage.h"
#include "ViewShotPackage.h"
#include "SVGPackage.h"
#include "LottieAnimationViewPackage.h"
#include "ViewPagerPackage.h"
#include "RNCVideoPackage.h"
#include "WebViewPackage.h"
#include "ReanimatedPackage.h"
#include "SkiaPackage.h"
#include "RNCNetInfoPackage.h"

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
  return {
    std::make_shared<RNOHGeneratedPackage>(ctx),
    std::make_shared<FabricComponentSamplePackagePackage>(ctx),
    std::make_shared<FastImagePackage>(ctx),
    std::make_shared<GestureHandlerPackage>(ctx),
    std::make_shared<SafeAreaViewPackage>(ctx),
    std::make_shared<ViewShotPackage>(ctx),
    std::make_shared<SVGPackage>(ctx),
    std::make_shared<LottieAnimationViewPackage>(ctx),
    std::make_shared<ViewPagerPackage>(ctx),
    std::make_shared<RNCVideoPackage>(ctx),
    std::make_shared<WebViewPackage>(ctx),
    std::make_shared<ReanimatedPackage>(ctx),
    std::make_shared<SkiaPackage>(ctx),
    std::make_shared<RNCNetInfoPackage>(ctx),
  };
}