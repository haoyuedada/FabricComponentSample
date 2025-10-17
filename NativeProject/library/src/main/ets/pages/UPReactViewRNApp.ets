/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import {
  AnyJSBundleProvider,
  ComponentBuilderContext,
  FileJSBundleProvider,
  MetroJSBundleProvider,
  ResourceJSBundleProvider,
  RNApp,
  RNOHErrorDialog,
  RNOHLogger,
  TraceJSBundleProviderDecorator,
  RNOHCoreContext,
} from '@rnoh/react-native-openharmony';
import { inspector } from '@kit.ArkUI'
import { buildCustomComponent, arkTsComponentNames } from './buildCustomComponent'
import { createRNPackages } from '../rn/RNPackagesFactory';

const wrappedCustomRNComponentBuilder = wrapBuilder(buildCustomComponent)

@Entry
@Component
export struct UPReactViewRNApp {
  @StorageLink('RNOHCoreContext') private rnohCoreContext: RNOHCoreContext | undefined = undefined
  @State shouldShow: boolean = false
  private logger!: RNOHLogger


  aboutToAppear() {
    this.logger = this.rnohCoreContext!.logger.clone("Index")
    const stopTracing = this.logger.clone("aboutToAppear").startTracing()
    this.shouldShow = true
    stopTracing()
  }

  onBackPress(): boolean | undefined {
    // NOTE: this is required since `Ability`'s `onBackPressed` function always
    // terminates or puts the app in the background, but we want Ark to ignore it completely
    // when handled by RN
    this.rnohCoreContext!.dispatchBackPress()
    return true
  }

  build() {
    Column() {
      if (this.rnohCoreContext && this.shouldShow) {
        if (this.rnohCoreContext?.isDebugModeEnabled) {
          RNOHErrorDialog({ ctx: this.rnohCoreContext })
        }
        RNApp({
          rnInstanceConfig: {
            name: "app_name",
            createRNPackages: createRNPackages,
            enableNDKTextMeasuring: true,
            enableBackgroundExecutor: false,
            enableCAPIArchitecture: true,
            arkTsComponentNames: arkTsComponentNames,
            fontResourceByFontFamily: {
              // NOTE: you can provide fonts in `RNInstanceConfig` ahead of time, when creating the RN application
              // "StintUltraCondensed-Regular": $rawfile('fonts/StintUltraCondensed-Regular.ttf'),
            }
          },
          initialProps: { "foo": "bar" } as Record<string, string>,
          appKey: "app_name",
          wrappedCustomRNComponentBuilder: wrappedCustomRNComponentBuilder,
          onSetUp: (rnInstance) => {
            rnInstance.enableFeatureFlag("ENABLE_RN_INSTANCE_CLEAN_UP")
            // NOTE: you can provide fonts dynamically at runtime by calling `RNInstance.registerFont`
            // rnInstance.registerFont('Pacifico-Regular', $rawfile("fonts/Pacifico-Regular.ttf"))
            // rnInstance.registerFont('Pacifico-Regular', "/data/storage/el2/base/files/Pacifico-Regular.ttf");
            // NOTE: this component directly contains performance test components, it's drawn event marks the end of a
            // performance test case
            inspector.createComponentObserver("rnohBenchmarkComponentId").on('draw', () => {
              rnInstance.emitDeviceEvent("benchmarkComponentDrawn", {})
            })
          },
          jsBundleProvider: new TraceJSBundleProviderDecorator(
            new AnyJSBundleProvider([
              new MetroJSBundleProvider(),
              /**
               * NOTE: to load the bundle from file, place it in
               * `/data/app/el2/100/base/com.rnoh.tester/files/bundle.harmony.js`
               * on your device. The path mismatch is due to app sandboxing on OpenHarmony
               */
              // new FileJSBundleProvider('/data/storage/el2/base/files/bundle.harmony.js'),
              /**
               * NOTE: The HBC format is recommended in a production environment. HBC is optimized pre-compiled bytecode.
               */
              // new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
              new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'all/bundle.harmonyall.js')
            ]),
            this.rnohCoreContext.logger),
        })
      }
    }
    .height('100%')
    .width('100%')
  }
}
