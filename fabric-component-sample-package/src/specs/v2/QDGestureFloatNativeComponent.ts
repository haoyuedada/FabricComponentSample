/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import { ViewProps, HostComponent, ProcessedColorValue } from 'react-native';
import type { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type {
  Float,
  DirectEventHandler,
  Double
} from 'react-native/Libraries/Types/CodegenTypes';
import type { UnsafeMixed } from './codegenUtils';

export interface ScrollEvent {
  offsetY: Float;
}

export interface testObj2Data {
  id?: string
}

export interface NativeProps extends ViewProps {
  stopPercent?: Float,
  stopPercentMax?: Float,
  onScroll?: DirectEventHandler<ScrollEvent>;
  testObj1: UnsafeMixed<Readonly<{}>>,
  testObj2: UnsafeMixed<Readonly<testObj2Data>>,
  // transform?: ReadonlyArray<Transform> | null,
  menuItems?: UnsafeMixed<ReadonlyArray<UnsafeMixed<Readonly<{label: string, key: string}>>>>;
  contentInset?: UnsafeMixed<Readonly<{
    top?: Double;
    left?: Double;
    bottom?: Double;
    right?: Double;
  }>>;
}

type NativeType = HostComponent<NativeProps>;

interface NativeCommands {
  scrollTo: (
    viewRef: React.ElementRef<NativeType>,
    offsetY: Float,
    animated: boolean,
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['scrollTo'],
});

export default codegenNativeComponent<NativeProps>(
  'QDGestureFloat',
) as HostComponent<NativeProps>;
