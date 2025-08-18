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
import { WebView, WEB_VIEW } from "@react-native-oh-tpl/react-native-webview"
import { window } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

const arkTsComponentNames: Array<string> = [SelectBox.NAME, RCTMessageDialog.NAME, LOTTIE_TYPE, WEB_VIEW];

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
  } else if (ctx.componentName === WEB_VIEW) {
     WebView({
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
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
  @State pageName: string = "UPReactView.ets";

  onBackPress(): boolean | void {
  }

  async aboutToAppear(): Promise<void>  {
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
    // 获取内容规避区域
    let type1 = window.AvoidAreaType.TYPE_SYSTEM;
    let type2 = window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR;
    window.getLastWindow(this.getUIContext().getHostContext()).then((data) => {
      // Get the system default area, usually including the status bar and navigation bar
      let avoidArea1 = data.getWindowAvoidArea(type1);
      // Top status bar height
      let statusBarHeight = avoidArea1.topRect.height;
      // Bottom navigation bar height
      let bottomNavHeight = avoidArea1.bottomRect.height;
      // Get the navigation bar area
      let avoidArea2 = data.getWindowAvoidArea(type2);
      // Get the height of the navigation bar area
      let indicatorHeight = avoidArea2.bottomRect.height;
      console.info(`chy statusBarHeight is ${statusBarHeight}`);
      console.info(`chy bottomNavHeight is ${bottomNavHeight}`);
      console.info(`chy indicatorHeight is ${indicatorHeight}`);
    }).catch((err: BusinessError) => {
      console.error(`Failed to obtain the window. Cause: ${JSON.stringify(err)}`);
    });
  }

  checkBundleUpdated(): void {
    if (this.rnSdk) {
      const sandboxDir: string = this.rnSdk.context.filesDir;
      const bundlePath = sandboxDir + '/' + this.bundlePath;
      try {
        const stat = fs.statSync(bundlePath);
        let context = getContext(this);
        let fileName: string = 'bundle.harmony.js';
        // 获取文件内容
        context.resourceManager.getRawFileContent(fileName, (_err, value) => {
          // 这里读取到文件内容可以进行下一步操作
          // let myBuffer: ArrayBufferLike = value.length;
          let rawfileSize = value.length;
          let boxSize = stat.size;
          if (boxSize == rawfileSize) {
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
      // 判断文件夹是否存在
      if (!fs.accessSync(destPath)) {
        fs.mkdirSync(destPath)
      }
      // fs.copyDirSync(srcPath, destPath, 0);
      // 将bundlejs下载并保存到沙箱。
      let uint8Array = await this.rnSdk.context.resourceManager.getRawFileContent('rawfile/bundle.harmony.js');
      let rawBuffer = uint8Array.buffer;
      let num = rawBuffer.byteLength;
      // 获取沙箱路径
      const sandboxDir = this.rnSdk.context.filesDir;
      const bundlePath = sandboxDir + '/' + this.bundlePath;
      let stream = fs.createStreamSync(bundlePath, 'w');
      stream.write(rawBuffer);
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
      const jsBundleExecutionStatus = this.rnInstance.getBundleExecutionStatus(this.jsBundleProvider?.getURL())
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
    }
  }

  aboutToDisappear(): void {
    this.cleanUp()
  }

  onPageHide(){
  }

  private async cleanUp() {
    this.isBundleReady = false
    await this.rnohCoreContext!.destroyAndUnregisterRNInstance(this.rnInstance)
    this.cleanUpCallbacks.forEach(cleanUp => cleanUp())
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
              console.log(`chy updateViewRootTag with params:`);
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
    .borderWidth(2)
    .borderColor("red")
  }
}