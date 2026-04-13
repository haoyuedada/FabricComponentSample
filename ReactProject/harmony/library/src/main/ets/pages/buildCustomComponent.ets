import {
  ComponentBuilderContext
} from "@rnoh/react-native-openharmony";
// FabricComponent
import { SelectBox } from "../FabricComponent/SelectBox"
import { RCTSelectBox } from "../FabricComponent/RCTSelectBox"
import { RCTMessageDialog } from "../FabricComponent/RCTMessageDialog"
import { WebView, WEB_VIEW } from "@react-native-ohos/react-native-webview"
import { RNCVideo, RNC_VIDEO_TYPE } from "@react-native-oh-tpl/react-native-video"
import { RNCSkiaDomView, SKIA_DOM_VIEW_TYPE } from '@react-native-ohos/react-native-skia';
import { componentBuilder } from "@react-native-ohos/react-native-screens"
import { LottieAnimationView, LOTTIE_TYPE } from "@react-native-ohos/lottie-react-native"

@Builder
export function buildCustomComponent(ctx: ComponentBuilderContext) {
  componentBuilder(ctx)
  if (ctx.componentName === SelectBox.NAME) {
    SelectBox({
      ctx: ctx.rnComponentContext,
      tag: ctx.tag
    })
  } else if (ctx.componentName === RCTSelectBox.NAME) {
    RCTSelectBox({
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
  } else if (ctx.componentName === SKIA_DOM_VIEW_TYPE) {
    RNCSkiaDomView({
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

export const arkTsComponentNames: Array<string> = [
  SelectBox.NAME,
  RCTSelectBox.NAME,
  RCTMessageDialog.NAME,
  LOTTIE_TYPE,
  WEB_VIEW,
  SKIA_DOM_VIEW_TYPE,
  "RNSScreen",
  "RNSFullWindowOverlay",
  "RNSModalScreen",
  "RNSScreenContainer",
  "RNSScreenNavigationContainer",
  "RNSScreenStack",
  "RNSScreenStackHeaderSubview",
  "RNSSearchBar",
  "RNSScreenStackHeaderConfig",
  LOTTIE_TYPE
];
