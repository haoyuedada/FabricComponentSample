/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import type { RNOHLogger } from '@rnoh/react-native-openharmony/src/main/ets/RNOH/RNOHLogger';
import { StandardRNOHLogger } from '@rnoh/react-native-openharmony/src/main/ets/RNOH/RNOHLogger';
import Want from '@ohos.app.ability.Want';
import { RNInstancesCoordinator } from "@rnoh/react-native-openharmony/src/main/ets/RNOH/RNInstancesCoordinator"
import { HttpClient, DefaultHttpClient } from "@rnoh/react-native-openharmony/src/main/ets/HttpClient"
import common from '@ohos.app.ability.common';
import window from '@ohos.window';
import { RNOHCoreContext } from "@rnoh/react-native-openharmony/src/main/ets/RNOH/RNOHContext"
import { FileUtil, LogUtil, ResUtil } from '@pura/harmony-utils';

export class UPRNSDKImpl{
  public context:common.UIAbilityContext | null = null;
  protected isDebugModeEnabled_: boolean = true
  private _rnInstancesCoordinator!: RNInstancesCoordinator;
  public get rnInstancesCoordinator(): RNInstancesCoordinator {
    return this._rnInstancesCoordinator;
  }
  private logger!: RNOHLogger

  constructor(context: common.UIAbilityContext, want: Want) {
    this.context = context;
    this.logger = this.createLogger().clone("RNAbility")
    this._rnInstancesCoordinator = RNInstancesCoordinator.create({
      fontSizeScale: this.context.config.fontSizeScale,
      logger: this.createLogger(),
      uiAbilityContext: this.context,
      defaultBackPressHandler: () => {
        this.defaultBackPressHandler()
      },
      // rnohWorkerScriptUrl: this.getRNOHWorkerScriptUrl(),
    }, {
      launchURI: want.uri, onGetPackagerClientConfig: (buildMode) => buildMode === "DEBUG" ? {
        host: "localhost",
        port: 8081
      } : undefined,
      defaultHttpClient: this.onCreateDefaultHttpClient()
    })
    AppStorage.setOrCreate('RNOHCoreContext', this._rnInstancesCoordinator.getRNOHCoreContext())

    AppStorage.setOrCreate('rnInstancesCoordinator', this._rnInstancesCoordinator)
    // MiJiaLog.onlyLogcat(TAG, "new MiRNSDKImpl success");
    // 日志
    LogUtil.init(0x1010, 'Pura', true, true);  //该方法建议在Ability里调用
    LogUtil.setShowLog(true);  //该方法建议在Ability里调用
    LogUtil.setDomain(0x0010);  //该方法建议在Ability里调用
    LogUtil.setTag("大裤衩"); //该方法建议在Ability里调用
    LogUtil.setHilog(true);  //该方法建议在Ability里调用

  }

  // getRNOHWorkerScriptUrl() {
  //   return "@library/ets/workers/RNOHWorker.ets"
  // }
  /**
   * Override this method if you want to create an RNInstance, and load bundle here, rather than in an ArkUI component.
   * RNAbility waits for the completion of this method before loading the content. This approach reduces a flash that
   * can occur after a splash screen is hidden, and a RN application is ready.
   */
  protected async onPrepareRNInstance(rnohCoreContext: RNOHCoreContext) {
  }

  public async onAppSetup(windowStage: window.WindowStage){
    // MiJiaLog.onlyLogcat(TAG, "onAppSetup");
    // const mainWindow = await windowStage.getMainWindow();
    // this.rnInstancesCoordinator?.setMainWindow(mainWindow)
    // const onWindowSizeChange = (windowSize: window.Size) => {
    //   this._rnInstancesCoordinator?.onWindowSizeChange(windowSize)
    // }
    // mainWindow.on('windowSizeChange', onWindowSizeChange)
    // new
    const logger = this.logger.clone("onWindowSetup");
    const stopTracing = logger.startTracing()
    try {
      await this.onPrepareRNInstance(AppStorage.get<RNOHCoreContext>('RNOHCoreContext')!)
      const mainWindow = await windowStage.getMainWindow();
      this.rnInstancesCoordinator?.setMainWindow(mainWindow);
      const onWindowSizeChange = (windowSize: window.Size) => {
        this.rnInstancesCoordinator?.onWindowSizeChange(windowSize)
      }
      const onWindowReactChange = (data: window.RectChangeOptions) => {
        this.rnInstancesCoordinator?.onWindowRectChange(data)
      }
      const onWindowStageChange = (windowStageEvent: window.WindowStageEventType) => {
        let stageEventType: window.WindowStageEventType = windowStageEvent;
        this.rnInstancesCoordinator?.onWindowStageChange(windowStageEvent)
        switch (stageEventType) {
          // 切到前台
          case window.WindowStageEventType.SHOWN:
            console.info(`chy Application has entered foreground`);
            this.rnInstancesCoordinator?.onForeground();
            // ...
            break;
          // 切到后台
          case window.WindowStageEventType.HIDDEN:
            console.info(`chy Application has entered background`);
            this.rnInstancesCoordinator?.onBackground();
            // ...
            break;
          default:
            break;
        }
      }
      mainWindow.on('windowSizeChange', onWindowSizeChange)
      mainWindow.on('windowRectChange', onWindowReactChange)
      windowStage.on('windowStageEvent', onWindowStageChange)
      this.unregisterWindowListenerCallback()
      this.unregisterWindowListenerCallback = () => {
        try {
          mainWindow.off("windowSizeChange", onWindowSizeChange)
        } catch {
          this.logger?.error("Error when trying to unsubscribe from window size changes")
        }
      }
      await this.onWindowSetup(mainWindow)
      // await this.onWindowStageSetup(windowStage)
      this.rnInstancesCoordinator?.onWindowSizeChange(mainWindow.getWindowProperties().windowRect)
    } catch (err) {
      logger.error("Failed to setup window", JSON.stringify(err))
    } finally {
      stopTracing()
    }
  }

  /**
   * Override this method if you want to specify screen orientation, window dimensions etc.
   */
  protected async onWindowSetup(window: window.Window) {
    // NOTE: disabling full screen breaks the SafeAreaView component
    await window.setWindowLayoutFullScreen(true)
  }

  private unregisterWindowListenerCallback = () => {
  }

  protected createLogger(): RNOHLogger {
    return new StandardRNOHLogger();
  }

  onBackPress() {
    const stopTracing = this.logger.clone("onBackPress").startTracing()
    stopTracing()
    return true;
  }
  /**
   * Invoked when the React application doesn't handle the device back press.
   */
  protected defaultBackPressHandler() {
    this.context?.terminateSelf()
  }

  /**
   * @returns HttpClient shared by RNInstances
   */
  protected onCreateDefaultHttpClient(): undefined | HttpClient {
    return new DefaultHttpClient({logger: this.logger});
  }


}
