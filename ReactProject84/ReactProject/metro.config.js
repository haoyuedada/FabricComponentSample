/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

const path = require('path');
const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const { createHarmonyMetroConfig } = require('@react-native-oh/react-native-harmony/metro.config');

// 先构建 harmony 配置，取出其 resolveRequest 以便委托调用，
// 避免自定义 resolver 覆盖掉 harmony 的别名重定向逻辑。
const harmonyConfig = createHarmonyMetroConfig({
  reactNativeHarmonyPackageName: '@react-native-oh/react-native-harmony',
});

/**
 * @type {import("metro-config").ConfigT}
 */
const config = {
  // 清理metro缓存
  // resetCache: true,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), harmonyConfig, config);
