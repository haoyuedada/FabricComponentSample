/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNOHContext, RNViewBase, Descriptor, ViewBaseProps } from '@rnoh/react-native-openharmony';
import { RNC } from "@rnoh/react-native-openharmony/generated"

interface RCTMessageDialogProps extends ViewBaseProps {
  title: string
}

export type RCTMessageDialogDescriptor = Descriptor<"RCTMessageDialog", RCTMessageDialogProps>

@Component
export struct RCTMessageDialog {
  public static readonly NAME:string = RNC.RCTMessageDialog.NAME
  public ctx!: RNOHContext
  public tag: number = 0
  @State descriptor: RCTMessageDialogDescriptor = {} as RCTMessageDialogDescriptor
  private cleanUpCallbacks: (() => void)[] = []

  aboutToAppear() {
    this.descriptor = this.ctx.descriptorRegistry.getDescriptor<RCTMessageDialogDescriptor>(this.tag)
    this.cleanUpCallbacks.push(this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (newDescriptor) => {
        this.descriptor = (newDescriptor as RCTMessageDialogDescriptor)
        console.log('this.descriptor:', JSON.stringify(this.descriptor.props))
      }
    ))
    this.cleanUpCallbacks.push(this.ctx.componentCommandReceiver.registerCommandCallback(this.tag, (commandName) => {

    }))
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
      // .height(100)
    }
  }
}
