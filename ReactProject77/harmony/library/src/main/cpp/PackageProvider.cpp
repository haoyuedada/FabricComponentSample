/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

#include "RNOH/PackageProvider.h"
#include "generated/RNOHGeneratedPackage.h"
#include "GestureHandlerPackage.h"
#include "ReanimatedPackage.h"
#include "SafeAreaViewPackage.h"
#include "MJRefreshPackage.h"
#include "ScreensPackage.h"
#include "ViewPagerPackage.h"
#include "SmartRefreshLayoutPackage.h"
#include "ToolbarAndroidPackage.h"
using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
  return {
    std::make_shared<RNOHGeneratedPackage>(ctx),
    std::make_shared<GestureHandlerPackage>(ctx),
    std::make_shared<ReanimatedPackage>(ctx),
    std::make_shared<SafeAreaViewPackage>(ctx),
    std::make_shared<MJRefreshPackage>(ctx),
    std::make_shared<ScreensPackage>(ctx),
    std::make_shared<ViewPagerPackage>(ctx),
    std::make_shared<SmartRefreshLayoutPackage>(ctx),
    std::make_shared<ToolbarAndroidPackage>(ctx)
  };
}