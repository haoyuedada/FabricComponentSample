/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const { createHarmonyMetroConfig } = require('@ohmi/react-native-harmony/metro.config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

function createModuleIdFactory() {
  // 记录项目根目录绝对路径
  const projectRoot = __dirname;
  return (modulePath) => {
    // 1. 去掉根目录前缀，得到相对路径
    let relativePath = path.relative(projectRoot, modulePath);

    // 2. 统一分隔符（Windows 下替换反斜杠）
    // relativePath = relativePath.replace(/\\+/g, '/');

    // 3. 作为 ID 返回
    //    如果需要数字 ID，可以再做哈希或映射成数字
    return relativePath;
  };
}
/**
 * @type {import("metro-config").ConfigT}
 */
const config = {
  transformer: {
    // babelTransformerPath: require.resolve("./transformer"),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // serializer: {
  //   createModuleIdFactory
  // },
  cacheStores: []
};

module.exports = config;

module.exports = mergeConfig(getDefaultConfig(__dirname), createHarmonyMetroConfig({
  reactNativeHarmonyPackageName: '@ohmi/react-native-harmony',
}), config);
