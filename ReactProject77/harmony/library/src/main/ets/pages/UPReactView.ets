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
  RNSurface,
  RNOHCoreContext,
  RNComponentContext,
  LogBoxDialog,
  LogBoxTurboModule,
  JSBundleProvider
} from "@rnoh/react-native-openharmony";
import { SurfaceConfig2 } from '@rnoh/react-native-openharmony/src/main/ets/RNSurface'
import { RNDevLoadingView } from "@rnoh/react-native-openharmony/src/main/ets/RNOH"
import fs from '@ohos.file.fs';
import { window } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import RNInstanceManage from './RNInstaceManage'; // 根据实际路径调整
import { buildCustomComponent, arkTsComponentNames } from './buildCustomComponent'
import { FileUtil, LogUtil, ResUtil } from '@pura/harmony-utils';

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
  public jsBundleProvider1: JSBundleProvider | undefined = undefined
  public jsBundleProvider2: JSBundleProvider | undefined = undefined
  private context = this.getUIContext().getHostContext() as common.UIAbilityContext;
  @State pageName: string = "UPReactView.ets";
  public isMetroAvailable: boolean = false;
  public RNInstanceManage!: RNInstanceManage;
  private Tag: string = "UPReactView";

  onBackPress(): boolean | void {
  }

  async aboutToAppear(): Promise<void>  {
    // 初始化RNInstance管理实例
    this.RNInstanceManage = new RNInstanceManage();
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
    LogUtil.debug("-init start");

    if (this.rnSdk) {
      // metro
      this.isMetroAvailable = await this.RNInstanceManage.loadMetroBundle();
      LogUtil.debug(this.Tag, "-init loadMetroBundle status:" + this.isMetroAvailable);
      // 本地 bundle
      if (!this.isMetroAvailable) {
        LogUtil.debug(this.Tag, "-init loadBasicBundle");
        await this.RNInstanceManage.loadBasicBundle();
        LogUtil.debug(this.Tag, "-init loadBussinessBundle");
        await this.RNInstanceManage.loadBussinessBundle();
      }
      this.logBoxDialogController = new CustomDialogController({
        cornerRadius: 0,
        customStyle: true,
        alignment: DialogAlignment.TopStart,
        backgroundColor: Color.Transparent,
        builder: LogBoxDialog({
          ctx: this.RNInstanceManage.metroCtx,
          rnInstance: this.RNInstanceManage.metroInstance,
          initialProps: this.initialProps,
          buildCustomComponent: buildCustomComponent,
        })
      })
      this.cleanUpCallbacks.push(this.RNInstanceManage.metroInstance.getTurboModule<LogBoxTurboModule>(LogBoxTurboModule.NAME).eventEmitter.subscribe("SHOW",
        () => {
          this.logBoxDialogController.open()
        }))
      this.cleanUpCallbacks.push(this.RNInstanceManage.metroInstance.getTurboModule<LogBoxTurboModule>(LogBoxTurboModule.NAME).eventEmitter.subscribe("HIDE",
        () => {
          this.logBoxDialogController.close()
        }))
      this.cleanUpCallbacks.push(this.RNInstanceManage.metroCtx.devToolsController.eventEmitter.subscribe("RELOAD", async () => {
        LogUtil.debug(this.Tag, "-init subscribe('reload')");
        await this.cleanUp()
        this.init()
      }))
      this.isBundleReady = true;
    }
  }

  aboutToDisappear(): void {
    this.cleanUp()
  }

  onPageHide(){
  }

  private async cleanUp() {
    this.isBundleReady = false
    await this.rnohCoreContext!.destroyAndUnregisterRNInstance(this.RNInstanceManage.metroInstance)
    this.cleanUpCallbacks.forEach(cleanUp => cleanUp())
  }

  build() {
    Row() {
      Column() {
        if (this.isBundleReady) {
          RNSurface({
            ctx: this.isMetroAvailable ? this.RNInstanceManage.metroCtx : this.RNInstanceManage.bundleCtx,
            surfaceConfig: {
              appKey: this.rnInfo.businessId,
              initialProps: this.initialProps ?? {},
            } as SurfaceConfig2,
            updateViewRootTag(rnInstance:RNInstance, rootViewTag: number){
              console.log(`chy updateViewRootTag with params:`);
            }
          })
          .height("100%")
          // Button("注册字体").onClick(() => {
          //   this.RNInstanceManage.registerFont()
          // })
        }
        if (this.rnohCoreContext!.isDebugModeEnabled) {
          RNDevLoadingView({ useSafeAreaInsets: true, ctx: this.rnohCoreContext }).position({ x: 0, y: 0 })
        }
      }
      .width('100%')
    }
    .height('100%')
    // .borderWidth(2)
    // .borderColor("red")
  }
}