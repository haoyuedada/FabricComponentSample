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
  Button,
  StyleSheet,
  Text,
  TurboModuleRegistry,
  View,
} from 'react-native';
import { createSerializable } from 'react-native-worklets';

export default function SerializableFreezingExample() {
  const [result, setResult] = React.useState<string>('');
  return (
    <View style={styles.container}>
      <Text>结果：{result}</Text>
      <View style={styles.textAndButton}>
        <Text style={styles.text}>⚠️</Text>
        <Button
          title="Modify converted array"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyConvertedArray()));
          }}
        />
      </View>
      <View style={styles.textAndButton}>
        <Text style={styles.text}>⚠️</Text>
        <Button
          title="Modify converted remote function"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyConvertedRemoteFunction()));
          }}
        />
      </View>
  
      <View style={styles.textAndButton}>
        <Text style={styles.text}>⚠️</Text>
        <Button
          title="Modify converted plain object"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyConvertedPlainObject()));
          }}
        />
      </View>
      <View style={styles.textAndButton}>
        <Text style={styles.text}>🤫</Text>
        <Button
          title="Modify converted RegExp literal"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyConvertedRegExpLiteral()));
          }}
        />
      </View>
      <View style={styles.textAndButton}>
        <Text style={styles.text}>🤫</Text>
        <Button
          title="Modify converted RegExp instance"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyConvertedRegExpInstance()));
          }}
        />
      </View>
      <View style={styles.textAndButton}>
        <Text style={styles.text}>🤫</Text>
        <Button
          title="Modify converted ArrayBuffer"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyConvertedArrayBuffer()));
          }}
        />
      </View>
      <View style={styles.textAndButton}>
        <Text style={styles.text}>🤫</Text>
        <Button
          title="Modify converted Int32Array"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyConvertedInt32Array()));
          }}
        />
      </View>
      <View style={styles.textAndButton}>
        <Text style={styles.text}>🤫</Text>
        <Button
          title="Modify unconfigurable object"
          onPress={()=>{
            setResult(JSON.stringify(tryModifyUnconfigurableObject()));
          }}
        />
      </View>
    </View>
  );
}

function tryModifyConvertedArray() {
  const obj = [1, 2, 3];
  createSerializable(obj);
  obj[0] = 2; // should warn because it's frozen
  return obj;
}

function tryModifyConvertedRemoteFunction() {
  const obj = () => {};
  obj.prop = 1;
  createSerializable(obj);
  obj.prop = 2; // should warn because it's frozen
  return obj;
}



function tryModifyConvertedPlainObject() {
  const obj = {
    prop: 1,
  };
  createSerializable(obj);
  obj.prop = 2; // should warn because it's frozen
  return obj;
}

function tryModifyConvertedRegExpLiteral() {
  const obj = /a/;
  createSerializable(obj);
  // @ts-expect-error It's ok
  obj.prop = 2; // shouldn't warn because it's not frozen
  return obj;
}

function tryModifyConvertedRegExpInstance() {
  // eslint-disable-next-line prefer-regex-literals
  const obj = new RegExp('a');
  createSerializable(obj);
  // @ts-expect-error It's ok
  obj.prop = 2; // shouldn't warn because it's not frozen
  return obj;
}

function tryModifyConvertedArrayBuffer() {
  const obj = new ArrayBuffer(8);
  createSerializable(obj);
  // @ts-expect-error It's ok
  obj.prop = 2; // shouldn't warn because it's not frozen
  return obj;
}

function tryModifyConvertedInt32Array() {
  const obj = new Int32Array(2);
  createSerializable(obj);
  obj[1] = 2; // shouldn't warn because it's not frozen
  return obj;
}

function tryModifyUnconfigurableObject() {
  const obj = {};
  Object.defineProperty(obj, 'prop', {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false,
  });
  createSerializable(obj);
  return obj;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white"
  },
  textAndButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    marginRight: 10,
  },
});
