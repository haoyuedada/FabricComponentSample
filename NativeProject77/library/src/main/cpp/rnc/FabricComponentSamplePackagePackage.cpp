/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

#include "FabricComponentSamplePackagePackage.h"
#include "RNOH/RNInstanceCAPI.h"
#include "RNOH/generated/BaseFabricComponentSamplePackagePackage.h"
#include "RNOHCorePackage/ComponentBinders/ViewComponentJSIBinder.h"
#include "RNOHCorePackage/ComponentBinders/ViewComponentNapiBinder.h"
#include "QDGestureFloatComponentInstance.h"
#include "QDScrollViewComponentInstance.h"

using namespace facebook;

namespace rnoh {
ComponentInstance::Shared FabricComponentSamplePackagePackage::createComponentInstance(
      const ComponentInstance::Context& ctx) {
  if (ctx.componentName == "QDGestureFloat") {
    return std::make_shared<QDGestureFloatComponentInstance>(std::move(ctx));
  } else if ( ctx.componentName == "QDScrollView" ) {
    return std::make_shared<QDScrollViewComponentInstance>(std::move(ctx));
  }
  return nullptr;
};
} // namespace rnoh
