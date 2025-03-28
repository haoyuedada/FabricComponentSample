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

export interface SelectItems {
    id: Int32;
    text: string;
}

export interface Res {
    value: Int32[];
}

export type setTitleData = Readonly<{
    title: string,
}>
export type setVisibleData = Readonly<{
    visible: boolean,
}>
export type setMessageDate = Readonly<{
    message: string,
}>
export type setCancelableData = Readonly<{
    cancel: boolean,
}>
export type setCancelData = Readonly<{
    cancel: string,
}>
export type setConfirmData = Readonly<{
    confirm: string,
}>

export interface NativeProps extends ViewProps {
    title: string,
    setTitle: DirectEventHandler<setTitleData>,
    setVisible: DirectEventHandler<setVisibleData>,
    setMessage: DirectEventHandler<setMessageDate>,
    setCancelable: DirectEventHandler<setCancelableData>,
    setCancel: DirectEventHandler<setCancelData>,
    setConfirm: DirectEventHandler<setConfirmData>,
    // 添加其它 props
}

export default codegenNativeComponent<NativeProps>(
    "RCTMessageDialog"
) as HostComponent<NativeProps>;
