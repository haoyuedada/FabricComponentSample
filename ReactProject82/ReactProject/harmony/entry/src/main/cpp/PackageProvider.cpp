/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

#include "RNOH/PackageProvider.h"
#include "generated/RNOHGeneratedPackage.h"
#include "FabricComponentSamplePackagePackage.h"
#include "GestureHandlerPackage.h"
#include "ReanimatedWorkletPackage.h"
#include "ReanimatedPackage.h"
#include "SpringScrollViewPackage.h"
#include "SVGPackage.h"
#include "SafeAreaViewPackage.h"
#include "ViewPagerPackage.h"

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
  return {
    std::make_shared<RNOHGeneratedPackage>(ctx),
    std::make_shared<FabricComponentSamplePackagePackage>(ctx),
    std::make_shared<GestureHandlerPackage>(ctx),
    std::make_shared<ReanimatedWorkletPackage>(ctx),
    std::make_shared<ReanimatedPackage>(ctx),
    std::make_shared<SpringScrollViewPackage>(ctx),
    std::make_shared<SVGPackage>(ctx),
    std::make_shared<SafeAreaViewPackage>(ctx),
    std::make_shared<ViewPagerPackage>(ctx)
  };
}