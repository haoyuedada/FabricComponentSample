/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const { createHarmonyMetroConfig } = require('@ohmi/react-native-harmony/metro.config');

console.log("chy metro.config.js")
/**
 * @type {import("metro-config").ConfigT}
 */
const config = {
  transformer: {
    getTransformOptions: async () => {
      // 添加调试输出
      console.log('[Metro] 正在获取转换选项...');
      console.warn('[Metro] 启用内联引入 (inlineRequires)');
      
      return {
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      };
    },
  },
};

module.exports = config;

module.exports = mergeConfig(getDefaultConfig(__dirname), createHarmonyMetroConfig({
  reactNativeHarmonyPackageName: '@ohmi/react-native-harmony',
}), config);
