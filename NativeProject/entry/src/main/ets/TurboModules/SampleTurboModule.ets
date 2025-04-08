/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"

export interface TurboModuleEventData {
  param: string
}

interface GeneratedObjectLiteralInterface_1 {
  "key": number;
}

interface doAsyncJobDataType {
  "id": number;
  "message": string
}

interface DataType {
  id: number,
  message: string
}

export class SampleTurboModule extends TurboModule {
  getConstants(): Promise<TM.SampleTurboModule.Constants>{
    let Data: DataType = {
      id: 123,
      message: "from getConstants"
    }
    let obj: TM.SampleTurboModule.Constants = {
      id: 123,
      Data: Data
    }
    return new Promise((resolve, reject) => {
      resolve(obj);
    });
	}

  testParamsEmpty() {
    console.log("chy execute testParamsEmpty")
  }

  pushStringToHarmony(arg: string, testCallBack: (value:string) => void): string {
    testCallBack('hh')
    return arg;
  }

  pushStringToHarmonyCallBack(arg: string, testCallBack: (value:string) => void): string {

    testCallBack('hh')
    return arg;
  }

  doAsyncJob(shouldResolve: boolean): Promise<doAsyncJobDataType> {
    let doAsyncJobData: doAsyncJobDataType =  { id: 123, message: 'hahaha'};
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(doAsyncJobData);
        } else {
          reject('rejected on native side');
        }
      }, 100);
    });
  }
}