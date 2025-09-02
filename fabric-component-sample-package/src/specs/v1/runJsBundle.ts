/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import React from 'react';
import type { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
import type { HostComponent } from "react-native";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type { Int32, DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

export type loadJsScriptData = Readonly<{
    title: string,
}>

export interface NativeProps extends ViewProps {
    loadJsScript: DirectEventHandler<loadJsScriptData>
    // 添加其它 props
}

export default codegenNativeComponent<NativeProps>(
    "runJsBundle"
) as HostComponent<NativeProps>;
