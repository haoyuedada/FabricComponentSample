/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNOHContext, RNViewBase } from '@rnoh/react-native-openharmony';
import { RNC } from "@rnoh/react-native-openharmony/generated"

@Component
export struct RCTMessageDialog {
  public static readonly NAME:string = RNC.RCTMessageDialog.NAME
  public ctx!: RNOHContext
  public tag: number = 0
  @State descriptorWrapper: RNC.RCTMessageDialog.DescriptorWrapper = {} as RNC.RCTMessageDialog.DescriptorWrapper
  @State mutil: boolean = false
  private eventEmitter: RNC.RCTMessageDialog.EventEmitter | undefined = undefined
  private cleanUpCallbacks: (() => void)[] = []

  aboutToAppear() {
    this.eventEmitter = new RNC.RCTMessageDialog.EventEmitter(this.ctx.rnInstance, this.tag)
    this.onDescriptorWrapperChange(this.ctx.descriptorRegistry.findDescriptorWrapperByTag<RNC.RCTMessageDialog.DescriptorWrapper>(this.tag)!)
    this.cleanUpCallbacks.push(this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (descriptor) => {
        this.onDescriptorWrapperChange(new RNC.RCTMessageDialog.DescriptorWrapper(descriptor))
      }
    ))
    // this.cleanUpCallbacks.push(new RNC.SelectBox.CommandReceiver(this.ctx.componentCommandReceiver,
    //   this.tag).subscribe("emitNativeEvent", (argv) => {
    //   console.log(`收到 RN 传来的消息 ================ ${JSON.stringify(argv)}`);
    //   this.mutil = argv[0] || false
    // }))
  }

  private onDescriptorWrapperChange(descriptorWrapper: RNC.RCTMessageDialog.DescriptorWrapper) {
    this.descriptorWrapper = descriptorWrapper
  }

  aboutToDisappear() {
    this.cleanUpCallbacks.forEach(cb => cb())
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      Column() {
        Button("RCTMessageDialog")
          .onClick(() => {})
      }
      .height("100%")
    }
  }
}
