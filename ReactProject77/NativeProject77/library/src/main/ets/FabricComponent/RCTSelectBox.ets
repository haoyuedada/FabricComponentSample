/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { RNOHContext, RNViewBase } from '@rnoh/react-native-openharmony';
import { RNC } from "@rnoh/react-native-openharmony/generated"

let nextKey = 0

@Observed
class SelectItems {
  key: number;
  id: number;
  text: string;
  selected: boolean;

  constructor(id: number, text: string, selected: boolean) {
    this.key = nextKey++;
    this.id = id;
    this.text = text;
    this.selected = selected;
  }
}

interface charTypr {
  id: number;
  text: string;
}
interface dataType {id: number, text: string}
@Component
export struct RCTSelectBox {
  public static readonly NAME: string = RNC.SelectBox.NAME
  public ctx!: RNOHContext
  public tag: number = 0
  @State descriptorWrapper: RNC.RCTSelectBox.DescriptorWrapper = {} as RNC.RCTSelectBox.DescriptorWrapper
  @State data: SelectItems[] = [];
  @State mutil: boolean = false
  private eventEmitter: RNC.RCTSelectBox.EventEmitter | undefined = undefined
  private cleanUpCallbacks: (() => void)[] = []

  aboutToAppear() {
    console.log("chy RCTSelectBox aboutToAppear start")
    this.eventEmitter = new RNC.RCTSelectBox.EventEmitter(this.ctx.rnInstance, this.tag)
    console.log("this.tag:", this.tag)
    this.onDescriptorWrapperChange(this.ctx.descriptorRegistry.findDescriptorWrapperByTag<RNC.RCTSelectBox.DescriptorWrapper>(this.tag)!)
    this.cleanUpCallbacks.push(this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (descriptor) => {
        this.onDescriptorWrapperChange(new RNC.RCTSelectBox.DescriptorWrapper(descriptor))
      }
    ))
    // RN => NATIVE
    this.cleanUpCallbacks.push(new RNC.RCTSelectBox.CommandReceiver(this.ctx.componentCommandReceiver,
      this.tag).subscribe("emitNativeEvent", (argv: [boolean]) => {
      console.log(`收到 RN 传来的消息 ================ ${JSON.stringify(argv)}`);
      // this.mutil = argv || false
    }))
  }

  private onDescriptorWrapperChange(descriptorWrapper: RNC.RCTSelectBox.DescriptorWrapper) {
    this.descriptorWrapper = descriptorWrapper
    this.data = []
    const data: dataType[] = this.descriptorWrapper.props.data;
    // const value = this.descriptorWrapper.props.value;
    // const source = this.descriptorWrapper.props.source;
    console.log("chy RCTSelectBox data:", JSON.stringify(data))
    // console.log("chy SelectBox value:", value)
    // console.log("chy SelectBox source:", JSON.stringify(source))
  }

  aboutToDisappear() {
    this.cleanUpCallbacks.forEach(cb => cb())
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      Column() {
        ForEach(this.data, (item: SelectItems) => {
          SelectItem({
            item: item,
            onSelect: (idx: number) => {
              for (const tmp of this.data) {
                if (tmp.id === idx) {
                  tmp.selected = !tmp.selected
                } else if (!this.mutil) {
                  tmp.selected = false
                }
              }
            }
          })
        }, (item: SelectItems) => item.key.toString())
        Button("确定changeInSelectBox")
          .onClick(() => {
            console.log("chy 点击确定changeInSelectBox")
            const value = this.data
              .filter((item: SelectItems) => item.selected)
              .map((item: SelectItems) => item.id)
            // NATIVE => RN
            // 发送事件方式[1]
            // let value = { test: 2}
            this.ctx.rnInstance.emitComponentEvent(this.tag, "changeInSelectBox", { temutilst: true})
            // 发送事件方式[2]
            // this.eventEmitter!.emit("changeInSelectBox", { value: [1, 2] })
          })
        Button("确定Dismiss")
          .onClick(() => {
            console.log("chy 点击确定Dissmiss")
            const value = this.data
              .filter((item: SelectItems) => item.selected)
              .map((item: SelectItems) => item.id)
            // NATIVE => RN
            // 发送事件方式[1]
            // let value = { test: 2}
            this.ctx.rnInstance.emitComponentEvent(this.tag, "dismiss", { temutilst: true})
            // 发送事件方式[2]
            // this.eventEmitter!.emit("changeInSelectBox", { value: [1, 2] })
          })
      }
      .height("100%")
    }
  }
}

@Component
struct SelectItem {
  @ObjectLink item: SelectItems
  onSelect?: (id: number) => void

  build() {
    Row() {
      Text(this.item.text)
        .fontColor('#0F294D')
        .fontSize(18)
        .layoutWeight(1)

      Text('选中')
        .fontColor('#FF287DFA')
        .fontSize(20)
        .visibility(this.item.selected ? Visibility.Visible : Visibility.Hidden)
    }
    .padding({
      top: 24,
      left: 24,
      right: 24
    })
    .width("100%")
    .onClick(() => {
      this.onSelect?.(this.item.id)
    })
  }
}
