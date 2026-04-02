/**
 * MIT License
 *
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {WorkletRuntime,createWorkletRuntime, runOnJS, runOnUI, runOnRuntime} from 'react-native-worklets'
export default function WorkletRuntimeExample() {
    return (
        <View style={styles.container}>
            <RunOnUIRunOnJSDemo />
            <CreateWorkletRuntimeDemo />
            <InitializerDemo />
            <RunOnRuntimeFromJSDemo />
            <RunOnRuntimeArgsDemo />
            <RunOnRuntimeLongRunningTasksDemo />
        </View>
    );
}


function RunOnUIRunOnJSDemo() {
    const handlePress = () => {
        const func = () => console.log('Hello from JS thread!');
        runOnUI(() => {
            'worklet';
            console.log('Hello from UI thread!');
            runOnJS(func)();
        })();
    };

    return <Button title="runOnUI / runOnJS" onPress={handlePress} />;
}

function CreateWorkletRuntimeDemo() {
    const handlePress = () => {
        const runtime = createWorkletRuntime('foo');
        console.log('Hello ' + runtime);
        console.log('Hello ' + runtime.name);
        console.log('Hello ' + `${runtime}`);
        console.log('Hello ' + String(runtime));
    };

    return <Button title="createWorkletRuntime" onPress={handlePress} />;
}

function InitializerDemo() {
    const handlePress = () => {
        createWorkletRuntime('foo', () => {
            'worklet';
            console.log('Hello from initializer!');
        });
    };

    return <Button title="Initializer" onPress={handlePress} />;
}

function RunOnRuntimeFromJSDemo() {
    const handlePress = () => {
        const runtime = createWorkletRuntime('foo');
        runOnRuntime(runtime, () => {
            'worklet';
            console.log('Hello from background!', Math.random());
        })();
    };

    return <Button title="runOnRuntime from JS" onPress={handlePress} />;
}

function RunOnRuntimeArgsDemo() {
    const handlePress = () => {
        const runtime = createWorkletRuntime('foo');
        runOnRuntime(runtime, (x: number) => {
            'worklet';
            console.log('Hello from background!', x);
        })(42);
    };

    return <Button title="runOnRuntime with args" onPress={handlePress} />;
}

let runtime: WorkletRuntime | undefined;

function RunOnRuntimeLongRunningTasksDemo() {
    const handlePress = () => {
        if (runtime === undefined) {
            runtime = createWorkletRuntime('foo');
        }
        for (let i = 0; i < 3; i++) {
            runOnRuntime(runtime, () => {
                'worklet';
                const until = performance.now() + 500;
                while (performance.now() < until) { }
                console.log('Hello from background!', performance.now());
            })();
        }
    };

    return <Button title="Long-running tasks" onPress={handlePress} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 40,
    },
});