/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { UPRNSDK } from '../UPRNSDK';
import { createRNPackages } from '../rn/RNPackagesFactory';
import { RNInfo } from '../model/RNInfo';
import {
  RNInstance,
  ResourceJSBundleProvider,
  RNSurface,
  ComponentBuilderContext,
  RNAbility,
  RNOHCoreContext,
  RNComponentContext,
  RNOHContext,
  buildRNComponentForTag,
  TraceJSBundleProviderDecorator,
  AnyJSBundleProvider,
  MetroJSBundleProvider,
  FileJSBundleProvider
} from "@rnoh/react-native-openharmony";
import { SelectBox } from "../FabricComponent/SelectBox"
import { RCTMessageDialog } from "../FabricComponent/RCTMessageDialog"

const arkTsComponentNames: Array<string> = [SelectBox.NAME, RCTMessageDialog.NAME];

@Builder
export function buildCustomComponent(ctx: ComponentBuilderContext) {
  if (ctx.componentName === SelectBox.NAME) {
    SelectBox({
      ctx: ctx.rnComponentContext,
      tag: ctx.tag
    })
  } else if (ctx.componentName === RCTMessageDialog.NAME) {
    RCTMessageDialog({
      ctx: ctx.rnComponentContext,
      tag: ctx.tag
    })
  }
}

@Entry
@Component
export struct UPReactView {
  rnInfo!: RNInfo;
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;
  private rnInstance!: RNInstance;
  @State isBundleReady: boolean = false;
  @StorageLink('RNAbility') private rnAbility: RNAbility = {} as RNAbility;
  private rnohCoreContext: RNOHCoreContext | undefined = AppStorage.get('RNOHCoreContext');

  async aboutToAppear() {
    if (this.rnSdk) {
      this.rnInstance = await this.rnohCoreContext!.createAndRegisterRNInstance({
        createRNPackages: createRNPackages,
        enableNDKTextMeasuring: true,
        enableBackgroundExecutor: false,
        enableCAPIArchitecture: true,
        arkTsComponentNames: arkTsComponentNames
      });
      await this.rnInstance.runJSBundle(
        new TraceJSBundleProviderDecorator(
          new AnyJSBundleProvider([
            new MetroJSBundleProvider(),
            new FileJSBundleProvider('/data/storage/el2/base/files/bundle.harmony.js'),
            new ResourceJSBundleProvider(this.rnohCoreContext!.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
            new ResourceJSBundleProvider(this.rnohCoreContext!.uiAbilityContext.resourceManager, 'bundle.harmony.js')
          ]),
          this.rnohCoreContext!.logger)
      ).then(() => {
        this.isBundleReady = true;
      })
    }
  }

  build() {
    Row() {
      Column() {
        if (this.isBundleReady) {
          RNSurface({
            ctx: new RNComponentContext(
              RNOHContext.fromCoreContext(this.rnohCoreContext!, this.rnInstance),
              wrapBuilder(buildCustomComponent),
              wrapBuilder(buildRNComponentForTag),
              new Map()
            ),
            surfaceConfig: {
              appKey: this.rnInfo.businessId,
            },
          })
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}