/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import type { RNOHLogger } from '@rnoh/react-native-openharmony/src/main/ets/RNOH/RNOHLogger';
import { StandardRNOHLogger } from '@rnoh/react-native-openharmony/src/main/ets/RNOH/RNOHLogger';
import Want from '@ohos.app.ability.Want';
import { RNInstancesCoordinator } from "@rnoh/react-native-openharmony/src/main/ets/RNOH/RNInstancesCoordinator";
import { HttpClient, DefaultHttpClient } from "@rnoh/react-native-openharmony/src/main/ets/HttpClient";
import common from '@ohos.app.ability.common';
import window from '@ohos.window';
import {
  RNOHCoreContext,
} from "@rnoh/react-native-openharmony";

export class UPRNSDKImpl {
  private context: common.UIAbilityContext | null = null;
  protected isDebugModeEnabled_: boolean = true;
  private rnInstancesCoordinator!: RNInstancesCoordinator;
  private logger!: RNOHLogger;
  private unregisterWindowListenerCallback = () => {
  }
  private rnohCoreContext: RNOHCoreContext | undefined;

    constructor(context: common.UIAbilityContext, want: Want) {
    this.context = context;
    this.logger = this.createLogger().clone("RNAbility")
    this.rnInstancesCoordinator = RNInstancesCoordinator.create({
      fontSizeScale: this.context.config.fontSizeScale,
      logger: this.createLogger(),
      uiAbilityContext: this.context,
      defaultBackPressHandler: () => {
        this.defaultBackPressHandler()
      },
      rnohWorkerScriptUrl: this.getRNOHWorkerScriptUrl(),
    }, {
      disableCleaningRNInstances: this.onShouldDisableCleaningRNInstances(),
      launchURI: want.uri,
      onGetPackagerClientConfig: (buildMode) => buildMode === "DEBUG" ? {
        host: "localhost",
        port: 8081
      } : undefined,
      defaultHttpClient: this.onCreateDefaultHttpClient()
    })
    AppStorage.setOrCreate('RNOHCoreContext', this.rnInstancesCoordinator.getRNOHCoreContext())
    this.rnohCoreContext = this.rnInstancesCoordinator.getRNOHCoreContext();
  }

  protected getRNOHWorkerScriptUrl(): string | undefined {
    return undefined
  }

  /**
   * Return `true`, if your app bundle provides multiple RNAbilities, for each RNAbility.
   */
  onShouldDisableCleaningRNInstances(): boolean {
    return false;
  }

  public async onDestroy() {
    const stopTracing = this.logger.clone("onDestroy").startTracing()
    // this.unregisterWorkerMessageListener()
    // for (const surfaceHandle of this.surfaceHandles) {
    //   if (surfaceHandle.isRunning()) {
    //     this.logger.warn(
    //       'Destroying instance with running surface with tag: ' +
    //       surfaceHandle.getTag(),
    //     );
    //     await surfaceHandle.stop();
    //   }
    //   surfaceHandle.destroy()
    // }
    // if (this.isFeatureFlagEnabled("ENABLE_RN_INSTANCE_CLEAN_UP")) {
    //   this.napiBridge.onDestroyRNInstance(this.id)
    // }
    // this.turboModuleProvider.onDestroy()
    stopTracing()
  }

  public async onAppSetup(windowStage: window.WindowStage) {
    const logger = this.logger.clone("onWindowSetup");
    const stopTracing = logger.startTracing()
    try {
      // await this.onPrepareRNInstance(AppStorage.get<RNOHCoreContext>('RNOHCoreContext')!)
      const mainWindow = await windowStage.getMainWindow();
      // this.rnInstancesCoordinator?.setMainWindow(mainWindow);
      const onWindowSizeChange = (windowSize: window.Size) => {
        this.rnInstancesCoordinator?.onWindowSizeChange(windowSize)
      }
      const onWindowReactChange = (data: window.RectChangeOptions) => {
        // this.rnInstancesCoordinator?.onWindowRectChange(data)
      }
      const onWindowStageChange = (windowStageEvent: window.WindowStageEventType) => {
        this.rnInstancesCoordinator?.onWindowStageChange(windowStageEvent)
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

  protected async onWindowSetup(window: window.Window) {
    // NOTE: disabling full screen breaks the SafeAreaView component
    await window.setWindowLayoutFullScreen(true)
  }

  protected createLogger(): RNOHLogger {
    return new StandardRNOHLogger();
  }

  onBackPress() {
    const stopTracing = this.logger.clone("onBackPress").startTracing();
    console.log("chy onBackPress")
    this.rnohCoreContext!.dispatchBackPress()
    stopTracing();
    return true;
  }

  /**
   * Invoked when the React application doesn't handle the device back press.
   */
  protected defaultBackPressHandler() {
    this.context?.terminateSelf();
  }

  /**
   * @returns HttpClient shared by RNInstances
   */
  protected onCreateDefaultHttpClient(): undefined | HttpClient {
    return new DefaultHttpClient({ logger: this.logger });
  }
}
