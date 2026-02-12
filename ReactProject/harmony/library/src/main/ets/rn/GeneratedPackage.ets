/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import {
  RNOHPackage,
  AnyThreadTurboModule,
  AnyThreadTurboModuleContext,
  UITurboModule,
  UITurboModuleContext,
  AnyThreadTurboModuleFactory
} from '@rnoh/react-native-openharmony';
import type {
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType
} from '@rnoh/react-native-openharmony/ts';
import { RNC, TM } from "@rnoh/react-native-openharmony/generated/ts"
import { SampleTurboModule } from "../TurboModules/SampleTurboModule"
import { RunJsBundleTurboModule } from "../TurboModules/RunJsBundleTurboModule"

class GeneratedTurboModulesFactory extends AnyThreadTurboModuleFactory {
  private turboModules: string[] = [
    TM.SampleTurboModule.NAME,
    TM.RunJsBundleTurboModule.NAME
  ]

  createTurboModule(name: string): AnyThreadTurboModule | null {
    if (name == TM.SampleTurboModule.NAME) {
      return new SampleTurboModule(this.ctx)
    } else if (name === TM.RunJsBundleTurboModule.NAME) {
      return new RunJsBundleTurboModule(this.ctx)
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return this.turboModules.includes(name)
  }
}
let selectBox:string = RNC.SelectBox.NAME;
let RCTMessageDialog:string = RNC.RCTMessageDialog.NAME;

export class GeneratedPackage extends RNOHPackage {
  override getAnyThreadTurboModuleFactoryByNameMap(): Map<string, (ctx: AnyThreadTurboModuleContext) => AnyThreadTurboModule | null> {
    return new Map<string, ((ctx: AnyThreadTurboModuleContext) => AnyThreadTurboModule)>()
      .set(TM.SampleTurboModule.NAME, (ctx) => new SampleTurboModule(ctx))
      .set(TM.RunJsBundleTurboModule.NAME, (ctx) => new RunJsBundleTurboModule(ctx))
  }

  override async createEagerAnyThreadTurboModuleByNameMap(ctx: AnyThreadTurboModuleContext): Promise<Map<string, AnyThreadTurboModule>> {
    const sampleTurboModule = new SampleTurboModule(ctx);
    const runJsBundleTurboModule = new RunJsBundleTurboModule(ctx);
    return new Map()
      .set(TM.SampleTurboModule.NAME, sampleTurboModule)
      .set(TM.RunJsBundleTurboModule.NAME, runJsBundleTurboModule)
  }

  createDescriptorWrapperFactoryByDescriptorType(ctx: DescriptorWrapperFactoryByDescriptorTypeCtx): DescriptorWrapperFactoryByDescriptorType {
    return {
      selectBox: (ctx) => new RNC.SelectBox.DescriptorWrapper(ctx.descriptor),
      RCTSelectBox: (ctx) => new RNC.RCTSelectBox.DescriptorWrapper(ctx.descriptor),
      RCTMessageDialog: (ctx) => new RNC.RCTMessageDialog.DescriptorWrapper(ctx.descriptor),
    }
  }
}
