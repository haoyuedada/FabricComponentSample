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
  JSBundleProvider
} from "@rnoh/react-native-openharmony";
import { SurfaceConfig2 } from '@rnoh/react-native-openharmony/src/main/ets/RNSurface'
import { RNDevLoadingView } from "@rnoh/react-native-openharmony/src/main/ets/RNOH"
import { SelectBox } from "../FabricComponent/SelectBox"
import { RCTMessageDialog } from "../FabricComponent/RCTMessageDialog"
import { LottieAnimationView, LOTTIE_TYPE } from "@react-native-oh-tpl/lottie-react-native"
import fs from '@ohos.file.fs';
import { RNCVideo, RNC_VIDEO_TYPE } from "@react-native-oh-tpl/react-native-video"
import Fetch from '@system.fetch';

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
  } else if (ctx.componentName === RNC_VIDEO_TYPE) {
    RNCVideo({
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
  public bundlePath:string = "bundle.harmony.js";
  @State hasBundle: Boolean = false;
  public jsBundleProvider: JSBundleProvider | undefined = undefined

  onBackPress(): boolean | void {
  }

  aboutToAppear() {
    console.log("chy aboutToAppear:", JSON.stringify(this.rnohCoreContext!.uiAbilityContext))
    this.jsBundleProvider = new TraceJSBundleProviderDecorator(
      new AnyJSBundleProvider([
        new MetroJSBundleProvider(),
        // new FileJSBundleProvider('/data/storage/el2/base/haps/entry/files/bundle.harmony.js'),
        // new ResourceJSBundleProvider(this.rnohCoreContext!.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
        new ResourceJSBundleProvider(this.rnohCoreContext!.uiAbilityContext.resourceManager, 'bundle.harmony.js')
      ]),
      this.rnohCoreContext!.logger
    );
    this.init()
    // this.checkBundleUpdated();
    // console.log("chy getUIContext:", JSON.stringify(this.rnInstance.getUIContext()))
  }

  checkBundleUpdated(): void {
    if (this.rnSdk) {
      const sandboxDir: string = this.rnSdk.context.filesDir;
      const bundlePath = sandboxDir + '/' + this.bundlePath;
      console.log("chy checkBundleUpdated sandboxDir:", sandboxDir)
      console.log("chy checkBundleUpdated bundlePath:", bundlePath)

      try {
        // console.log("chy checkBundleUpdated bundlePath:", bundlePath)
        const stat = fs.statSync(bundlePath);
        let context = getContext(this);
        let fileName: string = 'bundle.harmony.js';
        // 获取文件内容
        context.resourceManager.getRawFileContent(fileName, (_err, value) => {
          // 这里读取到文件内容可以进行下一步操作
          // let myBuffer: ArrayBufferLike = value.length;
          console.log("chy checkBundleUpdated 检查rawfiel有bundle value.length:", value.length)
          console.log("chy checkBundleUpdated 检查沙箱中有bundle stat.size:", stat.size)
          let rawfileSize = value.length;
          let boxSize = stat.size;
          if (boxSize == rawfileSize) {
            console.log("chy checkBundleUpdated 推送新的 bundle 到沙箱")
            this.downloadBundle();
          } else {
            this.hasBundle = true;
          }
        });
      } catch (e) {
        this.downloadBundle();
      }
    }
  }

  async downloadBundle() {
    if (this.rnSdk) {
      // 将资源推送到沙箱
      let getContext1 = getContext(this).resourceDir
      let srcPath = getContext(this).resourceDir + '/apps/' // /apps/
      let destPath = getContext(this).filesDir + '/tests/' // /data/storage/el2/base/haps/entry/files/apps/
      console.log("chy assets getContext1:", getContext1)
      console.log("chy assets srcPath:", srcPath)
      console.log("chy assets destPath:", destPath)
      // 判断文件夹是否存在
      if (!fs.accessSync(destPath)) {
        fs.mkdirSync(destPath)
      }
      console.log("chy assets1")
      // fs.copyDirSync(srcPath, destPath, 0);
      // 将bundlejs下载并保存到沙箱。
      let uint8Array = await this.rnSdk.context.resourceManager.getRawFileContent('rawfile/bundle.harmony.js');
      let rawBuffer = uint8Array.buffer;
      let num = rawBuffer.byteLength;
      console.log("chy assets2")
      // 获取沙箱路径
      const sandboxDir = this.rnSdk.context.filesDir;
      const bundlePath = sandboxDir + '/' + this.bundlePath;
      let stream = fs.createStreamSync(bundlePath, 'w');
      stream.write(rawBuffer);
      console.log("chy assets 写入成功")
      stream.close();
      this.hasBundle = true;
    }
  }

  async init() {
    if (this.rnSdk) {
      this.rnInstance = await this.rnohCoreContext!.createAndRegisterRNInstance({
        createRNPackages: createRNPackages,
        enableNDKTextMeasuring: true,
        enableBackgroundExecutor: false,
        enableCAPIArchitecture: true,
        arkTsComponentNames: arkTsComponentNames,
        disableConcurrentRoot: true
      });
      await this.rnInstance.runJSBundle(this.jsBundleProvider)
      console.log("chy updateViewRootTag runJSBundle finish")
      const jsBundleExecutionStatus = this.rnInstance.getBundleExecutionStatus(this.jsBundleProvider?.getURL())
      console.log("chy runjsbundle after jsBundleExecutionStatus:", jsBundleExecutionStatus)
      if (jsBundleExecutionStatus == "DONE") {
        this.isBundleReady = true;
      } else {
        return;
      }
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
      console.log("chy uicontext getUIContext:", JSON.stringify(this.getUIContext()))
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
            updateViewRootTag(rnInstance:RNInstance, rootViewTag: number){

            }
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