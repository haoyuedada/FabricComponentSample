import {
  ComponentBuilderContext
} from "@rnoh/react-native-openharmony";
// FabricComponent
import { SelectBox } from "../FabricComponent/SelectBox"
import { RCTSelectBox } from "../FabricComponent/RCTSelectBox"
import { RCTMessageDialog } from "../FabricComponent/RCTMessageDialog"
import { componentBuilder } from "@react-native-ohos/react-native-screens"
import {
  RN_SMART_REFRESH,
  RNSmartRefresh,
  RN_SMART_REFRESH_HEADER,
  RNSmartRefreshHeader,
} from '@react-native-ohos/react-native-smart-refresh'

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
  }
  else if (ctx.componentName === RN_SMART_REFRESH) {
    RNSmartRefresh({
      ctx:ctx.rnComponentContext,
      tag:ctx.tag,
    })
  }
  else if (ctx.componentName === RN_SMART_REFRESH_HEADER) {
    RNSmartRefreshHeader({
      ctx:ctx.rnComponentContext,
      tag:ctx.tag,
    })
  }
}

export const arkTsComponentNames: Array<string> = [
  SelectBox.NAME,
  RCTSelectBox.NAME,
  RCTMessageDialog.NAME,
  "RNSScreen",
  "RNSFullWindowOverlay",
  "RNSModalScreen",
  "RNSScreenContainer",
  "RNSScreenNavigationContainer",
  "RNSScreenStack",
  "RNSScreenStackHeaderSubview",
  "RNSSearchBar",
  "RNSScreenStackHeaderConfig",
];
