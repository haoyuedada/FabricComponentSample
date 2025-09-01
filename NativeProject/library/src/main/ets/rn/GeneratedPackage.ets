/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import {
  RNOHPackage
} from '@rnoh/react-native-openharmony';
import {
  RNPackage,
  TurboModule,
  TurboModuleContext,
  TurboModulesFactory,
  UITurboModuleContext,
} from '@rnoh/react-native-openharmony/ts';
import type {
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType
} from '@rnoh/react-native-openharmony/ts';
import { RNC, TM } from "@rnoh/react-native-openharmony/generated/ts"
import { SampleTurboModule } from "../TurboModules/SampleTurboModule"
import { AnyThreadTurboModule,
  AnyThreadTurboModuleContext,
  AnyThreadTurboModuleFactory, WorkerTurboModuleContext } from '../../../../Index';

  // class GeneratedTurboModulesFactory extends AnyThreadTurboModuleFactory {
  //   private turboModules: string[] = [
  //     TM.SampleTurboModule.NAME
  //   ]
  //
  //   createTurboModule(name: string): AnyThreadTurboModule | null {
  //     if (name == TM.SampleTurboModule.NAME) {
  //       return new SampleTurboModule(this.ctx)
  //     }
  //     return null;
  //   }
  //
  //   hasTurboModule(name: string): boolean {
  //     return this.turboModules.includes(name)
  //   }
  // }
// let selectBox:string = RNC.SelectBox.NAME;
// let RCTMessageDialog:string = RNC.RCTMessageDialog.NAME;

export class GeneratedPackage extends RNOHPackage {
  override getAnyThreadTurboModuleFactoryByNameMap(): Map<string, (ctx: AnyThreadTurboModuleContext) => AnyThreadTurboModule | null> {
    return new Map<string, ((ctx: AnyThreadTurboModuleContext) => AnyThreadTurboModule)>()
      .set(TM.SampleTurboModule.NAME, (ctx) => new SampleTurboModule(ctx))
  }

  override async createEagerAnyThreadTurboModuleByNameMap(ctx: AnyThreadTurboModuleContext): Promise<Map<string, AnyThreadTurboModule>> {
    return new Map()
      .set(TM.SampleTurboModule.NAME, new SampleTurboModule(ctx))
  }
  createDescriptorWrapperFactoryByDescriptorType(ctx: DescriptorWrapperFactoryByDescriptorTypeCtx): DescriptorWrapperFactoryByDescriptorType {
    return {
      selectBox: (ctx) => new RNC.SelectBox.DescriptorWrapper(ctx.descriptor),
      RCTMessageDialog: (ctx) => new RNC.RCTMessageDialog.DescriptorWrapper(ctx.descriptor),
    }
  }
}
