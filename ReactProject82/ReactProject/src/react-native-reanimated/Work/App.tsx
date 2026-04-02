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
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';

export const Work_Pages= [
    "CustomSerializable_Test",
    "Serializable_Test",
    "SerializableSyn_Test",
    "CreateWorkletRuntimeExpample",
    "RuntimeKindExample",
    "IsWorkFunctionExample",
    "RunOnUIAsync",
    "RunOnUISync",
    "ScheduleExample",
    "SerializableFreezingExample",
    "SynchronizableExample",
    "ExecuteOnUIRuntimeSync",
    "RunTimeExample"
]

import { useNavigation } from '../AnimatedNavigation';

export default function App() {
  const { navigateTo } = useNavigation();
  return (
    <View style={{ backgroundColor: 'black', flexDirection: "column" }}>

    <FlatList
            data={Work_Pages}
            renderItem={({ item }) => {
                return (
                    <View style={{ backgroundColor: 'hsl(193, 95%, 30%)' }}>
                        <TouchableOpacity
                            onPress={() => navigateTo(item)}>
                            <Text style={styles.buttonText}>{item}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }}
            ItemSeparatorComponent={() => (
                <View
                    style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#666' }}
                />
            )}
        />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#888',
  },
  buttonText: {
      width: '100%',
      fontWeight: 'bold',
      paddingHorizontal: 16,
      paddingVertical: 24,
      color: 'white',
      backgroundColor: 'black',
  },
});