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
  RNOHCoreContext,
  RNComponentContext,
  RNOHContext,
  buildRNComponentForTag,
  TraceJSBundleProviderDecorator,
  AnyJSBundleProvider,
  MetroJSBundleProvider,
  FileJSBundleProvider,
  LogBoxDialog,
  LogBoxTurboModule,
  RNOHLogger,
} from "@rnoh/react-native-openharmony";
import { SurfaceConfig2 } from '@rnoh/react-native-openharmony/src/main/ets/RNSurface'
import { RNDevLoadingView } from "@rnoh/react-native-openharmony/src/main/ets/RNOH"
import { SelectBox } from "../FabricComponent/SelectBox"
import { RCTMessageDialog } from "../FabricComponent/RCTMessageDialog"
// import { RNDatePicker } from "@react-native-oh-tpl/react-native-date-picker"
import { LottieAnimationView, LOTTIE_TYPE } from "@react-native-oh-tpl/lottie-react-native"

const arkTsComponentNames: Array<string> = [SelectBox.NAME, RCTMessageDialog.NAME, LOTTIE_TYPE];

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
  } else if (ctx.componentName === LOTTIE_TYPE) {
    LottieAnimationView({
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
  private rnohCoreContext: RNOHCoreContext | undefined = AppStorage.get('RNOHCoreContext');
  private logBoxDialogController!: CustomDialogController
  private ctx!: RNComponentContext
  public initialProps: Record<string, string> = {}
  private cleanUpCallbacks: (() => void)[] = []
  private logger!: RNOHLogger

  onBackPress(): boolean | void {
  }

  aboutToAppear() {
    this.init()
  }

  async init() {
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
      this.ctx = new RNComponentContext(
        RNOHContext.fromCoreContext(this.rnohCoreContext!, this.rnInstance),
        wrapBuilder(buildCustomComponent),
        wrapBuilder(buildRNComponentForTag),
        new Map()
      );
      this.logBoxDialogController = new CustomDialogController({
        cornerRadius: 0,
        customStyle: true,
        alignment: DialogAlignment.TopStart,
        backgroundColor: Color.Transparent,
        builder: LogBoxDialog({
          ctx: this.ctx,
          rnInstance: this.rnInstance,
          initialProps: this.initialProps,
          buildCustomComponent: buildCustomComponent,
        })
      })
      this.cleanUpCallbacks.push(this.rnInstance.getTurboModule<LogBoxTurboModule>(LogBoxTurboModule.NAME).eventEmitter.subscribe("SHOW",
        () => {
          this.logBoxDialogController.open()
        }))
      this.cleanUpCallbacks.push(this.rnInstance.getTurboModule<LogBoxTurboModule>(LogBoxTurboModule.NAME).eventEmitter.subscribe("HIDE",
        () => {
          this.logBoxDialogController.close()
        }))
      this.cleanUpCallbacks.push(this.ctx.devToolsController.eventEmitter.subscribe("RELOAD", async () => {
        await this.cleanUp()
        this.init()
      }))
      this.rnInstance.enableFeatureFlag("ENABLE_RN_INSTANCE_CLEAN_UP")
    }
  }

  aboutToDisappear(): void {
    this.cleanUp()
  }

  onPageHide(){
  }

  private async cleanUp() {
    // const stopTracing = this.logger.clone("cleanUp").startTracing()
    this.isBundleReady = false
    await this.rnohCoreContext!.destroyAndUnregisterRNInstance(this.rnInstance)
    this.cleanUpCallbacks.forEach(cleanUp => cleanUp())
    // stopTracing()
  }

  build() {
    Row() {
      Column() {
        if (this.isBundleReady) {
          RNSurface({
            ctx: this.ctx,
            surfaceConfig: {
              appKey: this.rnInfo.businessId,
              initialProps: this.initialProps ?? {},
            } as SurfaceConfig2,
          })
        }
        if (this.rnohCoreContext!.isDebugModeEnabled) {
          RNDevLoadingView({ useSafeAreaInsets: true, ctx: this.rnohCoreContext }).position({ x: 0, y: 0 })
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}