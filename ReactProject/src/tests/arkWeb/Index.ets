/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

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
  RNPackageContext,
  ComponentBuilderContext
} from '@rnoh/react-native-openharmony';
import font from '@ohos.font';
import { createRNPackages } from '../RNPackagesFactory';
import { WEB_VIEW, WebView } from '@react-native-ohos/react-native-webview';
import { webview } from '@kit.ArkWeb';
// import {
//   A_MAP_CIRCLE_VIEW_TYPE,
//   A_MAP_MARKER_TYPE,
//   A_MAP_POLYGON_TYPE,
//   A_MAP_POLYLINE_TYPE,
//   AMapCircle,
//   AMapMarker,
//   AMapPolygon,
//   AMapPolyline,
//   AMapView,
//   GOADE_MAP_VIEW_TYPE
//   } from '@react-native-ohos/react-native-amap3d';

const arkTsComponentNames: Array<string> = [
  WEB_VIEW,
    // A_MAP_CIRCLE_VIEW_TYPE,
    // A_MAP_MARKER_TYPE,
    // A_MAP_POLYGON_TYPE,
    // A_MAP_POLYLINE_TYPE,
    // GOADE_MAP_VIEW_TYPE
];

@Builder
export function buildCustomRNComponent(ctx: ComponentBuilderContext) {
  // There seems to be a problem with the placement of ArkTS components in mixed mode. Nested Stack temporarily avoided.
  Stack() {
    if (ctx.componentName === WEB_VIEW) {
      WebView({
        ctx: ctx.rnComponentContext,
        tag: ctx.tag
      })
    }
    // if (ctx.componentName === GOADE_MAP_VIEW_TYPE) {
    //         AMapView({
    //             ctx: ctx.rnComponentContext,
    //             tag: ctx.tag,
    //           })
    //         }
    // if (ctx.componentName === A_MAP_CIRCLE_VIEW_TYPE) {
    //     AMapCircle({
    //         ctx: ctx.rnComponentContext,
    //         tag: ctx.tag,
    //       })
    //     }
    // if (ctx.componentName === A_MAP_MARKER_TYPE) {
    //     AMapMarker({
    //         ctx: ctx.rnComponentContext,
    //         tag: ctx.tag,
    //       })
    //     }
    // if (ctx.componentName === A_MAP_POLYGON_TYPE) {
    //     AMapPolygon({
    //         ctx: ctx.rnComponentContext,
    //         tag: ctx.tag,
    //       })
    //     }
    // if (ctx.componentName === A_MAP_POLYLINE_TYPE) {
    //         AMapPolyline({
    //             ctx: ctx.rnComponentContext,
    //             tag: ctx.tag,
    //           })
    //         }
  }
  .position({ x: 0, y: 0 })

}

const wrappedCustomRNComponentBuilder = wrapBuilder(buildCustomRNComponent)

/**
 * If you want to use custom fonts, you need to register them here.
 * We should support react-native-asset to handle registering fonts automatically.
 */
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
struct Index {
  @StorageLink('RNOHCoreContext') private rnohCoreContext: RNOHCoreContext | undefined = undefined
  @State shouldShow: boolean = false
  private logger!: RNOHLogger
  bundlePath: string = 'bunlde.harmony.js'
  @State hasBundle: boolean = false
  controller: webview.WebviewController = new webview.WebviewController();

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
    // NOTE: this is required since `Ability`'s `onBackPressed` function always
    // terminates or puts the app in the background, but we want Ark to ignore it completely
    // when handled by RN
    this.rnohCoreContext!.dispatchBackPress()
    return true
  }

  build() {
    Column() {
      // if (this.rnohCoreContext && this.shouldShow ) {
      //   if (this.rnohCoreContext?.isDebugModeEnabled) {
      //     RNOHErrorDialog({ ctx: this.rnohCoreContext })
      //   }
      //   RNApp({
      //     rnInstanceConfig: {
      //       createRNPackages,
      //       enableNDKTextMeasuring: true,
      //       enableBackgroundExecutor: false,
      //       enableCAPIArchitecture: true,
      //       arkTsComponentNames: arkTsComponentNames,
      //     },
      //     initialProps: { "foo": "bar" } as Record<string, string>,
      //     appKey: "app_name",
      //     wrappedCustomRNComponentBuilder: wrappedCustomRNComponentBuilder,
      //     onSetUp: (rnInstance) => {
      //       rnInstance.enableFeatureFlag("ENABLE_RN_INSTANCE_CLEAN_UP")
      //     },
      //     jsBundleProvider: new TraceJSBundleProviderDecorator(
      //       new AnyJSBundleProvider([
      //         new MetroJSBundleProvider(),
      //         // NOTE: to load the bundle from file, place it in
      //         // `/data/app/el2/100/base/com.rnoh.tester/files/bundle.harmony.js`
      //         // on your device. The path mismatch is due to app sandboxing on HarmonyOS
      //         new FileJSBundleProvider('/data/storage/el2/base/files/bundle.harmony.js'),
      //         // new FileJSBundleProvider(context.filesDir + '/' + this.bundlePath),
      //         new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
      //         new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'bundle.harmony.js')
      //       ]),
      //       this.rnohCoreContext.logger),
      //   })
      // }else{
        Web({ src: 'https://reactnative.dev/', controller: this.controller, renderMode:RenderMode.ASYNC_RENDER })
      // }
      // Text("1233333333122 1212323")
    }
    .height('100%')
    .width('100%')
  }
}
// @Component
// export struct pageOneTmp {
//   @Consume('pageInfos') pageInfos: NavPathStack;
//   controller: webview.WebviewController = new webview.WebviewController();
//
//   build() {
//     NavDestination() {
//       Column() {
//         Button('Go WEB2', { stateEffect: true, type: ButtonType.Capsule })
//           .width('80%')
//           .height(40)
//           .margin(20)
//           .onClick(() => {
//             this.pageInfos.pushPath({ name: "NavDestinationTitle2" });
//           })
//         Web({ src: $rawfile("index.html"), controller: this.controller })
//       }.width('100%').height('100%')
//     }.title("NavDestinationTitle1")
//     .onBackPressed(() => {
//       const popDestinationInfo = this.pageInfos.pop(); // 弹出路由栈栈顶元素
//       console.log('pop' + '返回值' + JSON.stringify(popDestinationInfo));
//       return true;
//     })
//   }
// }
