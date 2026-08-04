import {
  AnyJSBundleProvider,
  RNOHContext,
  FileJSBundleProvider,
  MetroJSBundleProvider,
  ResourceJSBundleProvider,
  RNApp,
  RNOHErrorDialog,
  RNOHLogger,
  TraceJSBundleProviderDecorator,
  RNOHCoreContext,
  RNPackageContext
} from '@rnoh/react-native-openharmony';
import font from '@ohos.font';
import { createRNPackages } from '../rn/RNPackagesFactory';

const arkTsComponentNames: Array<string> = [
];

@Builder
export function buildCustomRNComponent(ctx: RNPackageContext) {
  Stack() {
  }
  .position({ x: 0, y: 0 })
}

const wrappedCustomRNComponentBuilder = wrapBuilder(buildCustomRNComponent)

const fonts: font.FontOptions[] = [
  {
    familyName: 'Pacifico-Regular',
    familySrc: '/assets/fonts/Pacifico-Regular.ttf'
  },
  {
    familyName: 'StintUltraCondensed-Regular',
    familySrc: '/assets/fonts/StintUltraCondensed-Regular.ttf'
  }
]

@Entry
@Component
export struct UPReactViewRNApp {
  @StorageLink('RNOHCoreContext') private rnohCoreContext: RNOHCoreContext | undefined = undefined
  @State shouldShow: boolean = false
  private logger!: RNOHLogger
  bundlePath: string = 'bunlde.harmony.js'
  @State hasBundle: boolean = false
  @Provide('navPathStack') navPathStack: NavPathStack = new NavPathStack()
  @State autoRunning: boolean = false
  @State cycleCount: number = 0
  @State statusText: string = '就绪'
  private autoTimer: number = -1
  private readonly STAY_MS: number = 2000
  private readonly GONE_MS: number = 500

  aboutToAppear() {
    this.logger = this.rnohCoreContext!.logger.clone("Index")
    const stopTracing = this.logger.clone("aboutToAppear").startTracing()
    for (const customFont of fonts) {
      font.registerFont(customFont)
    }
    this.shouldShow = true
    stopTracing()
  }

  onBackPress(): boolean | undefined {
    if (this.navPathStack.size() > 0) {
      this.navPathStack.pop()
      return true
    }
    this.rnohCoreContext!.dispatchBackPress()
    return true
  }

  private startAutoCycle() {
    if (this.autoRunning) {
      return
    }
    this.autoRunning = true
    this.cycleCount = 0
    this.statusText = '运行中'
    this.scheduleNext()
  }

  private stopAutoCycle() {
    this.autoRunning = false
    this.statusText = `已停止 (共 ${this.cycleCount} 轮)`
    if (this.autoTimer !== -1) {
      clearTimeout(this.autoTimer)
      this.autoTimer = -1
    }
  }

  private scheduleNext() {
    if (!this.autoRunning) {
      return
    }
    if (this.navPathStack.size() > 0) {
      this.autoTimer = setTimeout(() => {
        if (!this.autoRunning) return
        this.navPathStack.pop()
        this.scheduleNext()
      }, this.STAY_MS)
    } else {
      this.autoTimer = setTimeout(() => {
        if (!this.autoRunning) return
        this.cycleCount++
        this.statusText = `运行中 (第 ${this.cycleCount} 轮)`
        this.navPathStack.pushPath({ name: 'RNPage' })
        this.scheduleNext()
      }, this.GONE_MS)
    }
  }

  build() {
    Navigation(this.navPathStack) {
      Column() {
        Text('Reanimated 崩溃压测')
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 8 })

        Text(this.statusText)
          .fontSize(16)
          .margin({ bottom: 4 })

        Text(`已循环: ${this.cycleCount} 轮`)
          .fontSize(14)
          .fontColor('#666')
          .margin({ bottom: 16 })

        Text(`策略: 停留 ${this.STAY_MS}ms → 退出 → 等待 ${this.GONE_MS}ms → 重新进入`)
          .fontSize(12)
          .fontColor('#999')
          .margin({ bottom: 24 })

        Button('手动进入 RN 页面')
          .width('80%')
          .height(48)
          .fontSize(18)
          .margin({ bottom: 12 })
          .onClick(() => {
            this.navPathStack.pushPath({ name: 'RNPage' })
          })

        Button('开始自动循环')
          .width('80%')
          .height(48)
          .fontSize(18)
          .backgroundColor('#e74c3c')
          .margin({ bottom: 12 })
          .enabled(!this.autoRunning)
          .opacity(this.autoRunning ? 0.4 : 1.0)
          .onClick(() => {
            this.startAutoCycle()
          })

        Button('停止自动循环')
          .width('80%')
          .height(48)
          .fontSize(18)
          .backgroundColor('#3498db')
          .enabled(this.autoRunning)
          .opacity(this.autoRunning ? 1.0 : 0.4)
          .onClick(() => {
            this.stopAutoCycle()
          })

        Button('快速连击 5 次')
          .width('80%')
          .height(48)
          .fontSize(18)
          .backgroundColor('#e67e22')
          .margin({ top: 12 })
          .onClick(() => {
            this.rapidFire(5)
          })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
    }
    .navDestination(this.buildRNPageDestination)
    .mode(NavigationMode.Stack)
    .titleMode(NavigationTitleMode.Mini)
    .title('首页')
  }

  private rapidFire(count: number) {
    let i = 0
    const step = () => {
      if (i >= count) return
      if (this.navPathStack.size() > 0) {
        this.navPathStack.pop()
      } else {
        this.navPathStack.pushPath({ name: 'RNPage' })
      }
      i++
      setTimeout(step, 100)
    }
    step()
  }

  @Builder
  buildRNPageDestination() {
    NavDestination() {
      if (this.rnohCoreContext && this.shouldShow) {
        if (this.rnohCoreContext?.isDebugModeEnabled) {
          RNOHErrorDialog({ ctx: this.rnohCoreContext })
        }
        RNApp({
          rnInstanceConfig: {
            createRNPackages,
            enableNDKTextMeasuring: true,
            enableBackgroundExecutor: false,
            enableCAPIArchitecture: true,
            arkTsComponentNames: arkTsComponentNames,
          },
          initialProps: { "foo": "bar" } as Record<string, string>,
          appKey: "app_name",
          wrappedCustomRNComponentBuilder: wrappedCustomRNComponentBuilder,
          onSetUp: (rnInstance) => {
            rnInstance.enableFeatureFlag("ENABLE_RN_INSTANCE_CLEAN_UP")
          },
          jsBundleProvider: new TraceJSBundleProviderDecorator(
            new AnyJSBundleProvider([
              new MetroJSBundleProvider(),
              // new FileJSBundleProvider('/data/storage/el2/base/files/bundle.harmony.js'),
              // new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
              new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'all/bundle.harmonyall.js')
            ]),
            this.rnohCoreContext.logger),
        })
      }
    }
    .title('RN 页面')
    .hideBackButton(false)
  }
}
