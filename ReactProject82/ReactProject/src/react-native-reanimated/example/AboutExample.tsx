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

import React, { useCallback, useReducer } from 'react';
import { Platform, StyleSheet, Text, View ,Button} from 'react-native';
import { getStaticFeatureFlag as getStaticFeatureFlagReanimated, 
  setDynamicFeatureFlag, getDynamicFeatureFlag,reanimatedVersion } from 'react-native-reanimated';
import { getStaticFeatureFlag as getStaticFeatureFlagWorklets } from 'react-native-worklets';

function isWeb() {
  return Platform.OS === 'web';
}

function getPlatform() {
  if (isWeb()) {
    return 'web';
  }
  // @ts-ignore it works
  return Platform.constants.systemName || Platform.constants.Brand;
}

function getPlatformVersion() {
  return Platform.Version;
}

function getBundle() {
  return __DEV__ ? 'dev' : 'production';
}

function getRuntime() {
  if ('HermesInternal' in global) {
    const version =
      // @ts-ignore this is fine
      global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'];
    return `Hermes (${version})`;
  }
  return 'JSC';
}

function getArchitecture() {
  return 'nativeFabricUIManager' in global ? 'Fabric' : 'Paper';
}

function getReactNativeVersion() {
  const { major, minor, patch } = Platform.constants.reactNativeVersion;
  return `${major}.${minor}.${patch}`;
}

export default function AboutExample() {

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleToggleExampleDynamicFlag = useCallback(() => {
    setDynamicFeatureFlag(
      'EXAMPLE_DYNAMIC_FLAG',
      !getDynamicFeatureFlag('EXAMPLE_DYNAMIC_FLAG')
    );
    forceUpdate();
  }, [forceUpdate]);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.bold}>Platform:</Text> {getPlatform()}{' '}
        {getPlatformVersion()}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Bundle:</Text> {getBundle()}
      </Text>
      {!isWeb() && (
        <>
          <Text style={styles.text}>
            <Text style={styles.bold}>Architecture:</Text> {getArchitecture()}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>JS runtime:</Text> {getRuntime()}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>RN version:</Text>{' '}
            {getReactNativeVersion()}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>Reanimaetd version:</Text>{' '}
            {reanimatedVersion}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>DISABLE_COMMIT_PAUSING_MECHANISM:</Text>{' '}
            {getStaticFeatureFlagReanimated('DISABLE_COMMIT_PAUSING_MECHANISM')
              ? 'Enabled'
              : 'Disabled'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>
              ANDROID_SYNCHRONOUSLY_UPDATE_UI_PROPS:
            </Text>{' '}
            {getStaticFeatureFlagReanimated(
              'ANDROID_SYNCHRONOUSLY_UPDATE_UI_PROPS'
            )
              ? 'Enabled'
              : 'Disabled'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>
              EXPERIMENTAL_CSS_ANIMATIONS_FOR_SVG_COMPONENTS:
            </Text>{' '}
            {getStaticFeatureFlagReanimated(
              'EXPERIMENTAL_CSS_ANIMATIONS_FOR_SVG_COMPONENTS'
            )
              ? 'Enabled'
              : 'Disabled'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>USE_SYNCHRONIZABLE_FOR_MUTABLES:</Text>{' '}
            {getStaticFeatureFlagReanimated('USE_SYNCHRONIZABLE_FOR_MUTABLES')
              ? 'Enabled'
              : 'Disabled'}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>IOS_DYNAMIC_FRAMERATE_ENABLED:</Text>{' '}
            {getStaticFeatureFlagWorklets('IOS_DYNAMIC_FRAMERATE_ENABLED')
              ? 'Enabled'
              : 'Disabled'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.bold}>EXAMPLE_DYNAMIC_FLAG:</Text>{' '}
            {getDynamicFeatureFlag('EXAMPLE_DYNAMIC_FLAG')
              ? 'Enabled'
              : 'Disabled'}
          </Text>
          <Button
            title={`Toggle EXAMPLE_DYNAMIC_FLAG`}
            onPress={handleToggleExampleDynamicFlag}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"white"
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
});
