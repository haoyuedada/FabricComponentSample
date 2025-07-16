/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const { createHarmonyMetroConfig } = require('@ohmi/react-native-harmony/metro.config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

console.log("chy assetExts:", assetExts);
/**
 * @type {import("metro-config").ConfigT}
 */
const config = {
  transformer: {
    getTransformOptions: async () => {
      return {
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      };
    },
    babelTransformerPath: require.resolve("react-native-svg-transformer/react-native"),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],  // 添加 svg 支持
  },
};

module.exports = config;

module.exports = mergeConfig(getDefaultConfig(__dirname), createHarmonyMetroConfig({
  reactNativeHarmonyPackageName: '@ohmi/react-native-harmony',
}), config);
