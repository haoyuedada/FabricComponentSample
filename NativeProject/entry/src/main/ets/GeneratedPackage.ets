/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import {
  RNPackage,
  TurboModule,
  TurboModuleContext,
  TurboModulesFactory,
  UITurboModuleContext
} from '@rnoh/react-native-openharmony/ts';
import type {
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType
} from '@rnoh/react-native-openharmony/ts';
import { RNC, TM } from "@rnoh/react-native-openharmony/generated/ts"
import { SampleTurboModule } from "./TurboModules/SampleTurboModule"
import { SampleTurboModulevv } from "./TurboModules/SampleTurboModulevv"

class GeneratedTurboModulesFactory extends TurboModulesFactory {
  private turboModules: string[] = [
    // TM.SampleTurboModule.NAME,
    TM.SampleTurboModulevv.NAME,
    // TM.MIOTHostTurboModule.NAME,
    TM.MIOTHost.NAME,
  ]

  createTurboModule(name: string): TurboModule | null {
    // if (name == TM.SampleTurboModule.NAME) {
    //   return new SampleTurboModule(this.ctx)
    // }
    if (name == TM.SampleTurboModulevv.NAME) {
      return new SampleTurboModulevv(this.ctx)
    }
    // if (name == TM.MIOTHostTurboModule.NAME) {
    //   return new SampleTurboModulevv(this.ctx)
    // }
    if (name == TM.MIOTHost.NAME) {
      return new SampleTurboModulevv(this.ctx)
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return this.turboModules.includes(name)
  }
}
let selectBox:string = RNC.SelectBox.NAME;
export class GeneratedPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new GeneratedTurboModulesFactory(ctx);
  }
  createDescriptorWrapperFactoryByDescriptorType(ctx: DescriptorWrapperFactoryByDescriptorTypeCtx): DescriptorWrapperFactoryByDescriptorType {
    return {
      selectBox: (ctx) => new RNC.SelectBox.DescriptorWrapper(ctx.descriptor),
    }
  }
}
