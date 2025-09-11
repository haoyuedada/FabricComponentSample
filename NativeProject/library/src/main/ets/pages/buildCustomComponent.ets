import {
  ComponentBuilderContext
} from "@rnoh/react-native-openharmony";
// FabricComponent
import { SelectBox } from "../FabricComponent/SelectBox"
import { RCTMessageDialog } from "../FabricComponent/RCTMessageDialog"
import { LottieAnimationView, LOTTIE_TYPE } from "@react-native-oh-tpl/lottie-react-native"
import { WebView, WEB_VIEW } from "@ohmi/react-native-webview"
import { RNCVideo, RNC_VIDEO_TYPE } from "@react-native-oh-tpl/react-native-video"

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

export const arkTsComponentNames: Array<string> = [SelectBox.NAME, RCTMessageDialog.NAME, LOTTIE_TYPE, WEB_VIEW];
