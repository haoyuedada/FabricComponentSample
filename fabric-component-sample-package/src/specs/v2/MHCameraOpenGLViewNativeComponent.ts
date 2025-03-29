/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import {
    ViewProps,
    HostComponent,
    requireNativeComponent,  // Fabric
} from 'react-native';
import type {
    DirectEventHandler,
    Double,
    Float,
    Int32,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type { UnsafeMixed } from './codegenUtils';

// export type OnStopEventData = Readonly<{
//     isStop: boolean,
//     type: string,
// }>;

export interface EventInput {
    input: Readonly<{}>,
}

export interface MHCameraOpenGLViewProps extends ViewProps {
    transform?: UnsafeMixed<ReadonlyArray<Readonly<{}>>> | null,
    did?: string,
    videoCodec?: Int32,
    correctRadius?: Float,
    useZoomLens?: boolean,
    blur?: Float,
    chanPositionParams?: UnsafeMixed<Readonly<{}>>,
    osdx?: Float,
    osdy?: Float,
    cornerPosition?: Int32,
    positionx?: Float,
    positiony?: Float,
    scale?: Float,
    fullscreenState?: boolean,
    isFull?: boolean,
    whiteBackground?: boolean,
    audioCodec?: Int32,
    audioRecordSampleRate?: Int32,
    audioRecordChannel?: Int32,
    audioRecordCodec?: Int32,
    forceSoftDecode?: boolean,
    audioRecordDataBits?: Int32,
    useLenCorrent?: boolean,
    recordingVideoParam?: UnsafeMixed<Readonly<{}>>,
    externalParams?: UnsafeMixed<Readonly<{}>>,
    panoParams?: UnsafeMixed<Readonly<{}>>,
    playRate?: Int32,
    maximumZoomScale?: Float,
    enableAIFrame?: boolean,
    surfaceFront?: boolean,
    disablePanGesture?: boolean,
    disablePinchGesture?: boolean,
    isPipParent?: boolean,
    enableHorizonFlip?: boolean,
    enableVerticalFlip?: boolean,
    isAudioCallInCommunication?: UnsafeMixed<Readonly<{}>>,

    // onStop?: DirectEventHandler<OnStopEventData>;
    onVideoClick?: DirectEventHandler<EventInput>,
    onScaleChanged?: DirectEventHandler<EventInput>,
    onPositionChanged?: DirectEventHandler<EventInput>,
    onPTZDirectionCtr?: DirectEventHandler<EventInput>,
}

type NativeType = HostComponent<MHCameraOpenGLViewProps>;

interface NativeCommands {
    startRender: (
        viewRef: React.ElementRef<NativeType>,
        // input: ReadonlyArray<string | Int32 | Double | Float | boolean> | null,
    ) => void;
    stopRender: (
        viewRef: React.ElementRef<NativeType>,
        // input: ReadonlyArray<string | Int32 | Double | Float | boolean> | null,
    ) => void;
    startAudioPlay: (
        viewRef: React.ElementRef<NativeType>,
        // input: ReadonlyArray<string | Int32 | Double | Float | boolean> | null,
    ) => void;
    stopAudioPlay: (
        viewRef: React.ElementRef<NativeType>,
        // input: ReadonlyArray<string | Int32 | Double | Float | boolean> | null,
    ) => void;
    startAudioRecord: (
        viewRef: React.ElementRef<NativeType>,
        // input: ReadonlyArray<string | Int32 | Double | Float | boolean> | null,
    ) => void;
    stopAudioRecord: (
        viewRef: React.ElementRef<NativeType>,
        // input: ReadonlyArray<string | Int32 | Double | Float | boolean> | null,
    ) => void;
    hidesSurfaceView: (
        viewRef: React.ElementRef<NativeType>,
        // input: ReadonlyArray<string | Int32 | Double | Float | boolean> | null,
    ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
    supportedCommands: ['startRender', 'stopRender', 'startAudioPlay', 'stopAudioPlay', 'startAudioRecord', 'stopAudioRecord', 'hidesSurfaceView'],
});

export default codegenNativeComponent<MHCameraOpenGLViewProps>(
    'MHCameraOpenGLView',
) as HostComponent<MHCameraOpenGLViewProps>;
