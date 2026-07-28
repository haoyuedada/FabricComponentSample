/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

const path = require('path');
const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const { createHarmonyMetroConfig } = require('@react-native-oh/react-native-harmony/metro.config');

/**
 * Reanimated 在运行时会通过 `require('react-native-worklets/package.json')`
 * 读取 worklets 版本并与自身兼容性做校验。
 *
 * 但 `@react-native-ohos/react-native-worklets` 通过 `harmony.alias` 把
 * `react-native-worklets` 重定向到了自己，而该 ohos 适配包的 `version`
 * 字段是 `1.0.0`（并非上游 `react-native-worklets` 的 `0.7.x`），导致
 * Reanimated 4.2.x 报 "Worklet(1.0.0) is not compatible" 错误。
 *
 * 这里仅在 *版本校验脚本* 读取 `package.json` 时，绕过别名重定向，
 * 让它解析到顶层真实的 `react-native-worklets`（0.7.1）。
 * 不影响其他模块对 worklets 运行时实现的正常重定向。
 */
const WORKLETS_VERSION_CHECK_HINT = 'validate-worklets-version';
const realWorkletsPkgJson = require.resolve('react-native-worklets/package.json', {
  paths: [path.resolve(__dirname, 'node_modules')],
});

// 先构建 harmony 配置，取出其 resolveRequest 以便委托调用，
// 避免自定义 resolver 覆盖掉 harmony 的别名重定向逻辑。
const harmonyConfig = createHarmonyMetroConfig({
  reactNativeHarmonyPackageName: '@react-native-oh/react-native-harmony',
});
const harmonyResolveRequest = harmonyConfig.resolver?.resolveRequest;

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
  },
  resolver: {
    resolveRequest: (ctx, moduleName, platform) => {
      if (
        moduleName === 'react-native-worklets/package.json' &&
        ctx.originModulePath &&
        ctx.originModulePath.includes(WORKLETS_VERSION_CHECK_HINT)
      ) {
        return {
          type: 'sourceFile',
          filePath: realWorkletsPkgJson,
        };
      }
      if (harmonyResolveRequest) {
        return harmonyResolveRequest(ctx, moduleName, platform);
      }
      return ctx.resolveRequest(ctx, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), harmonyConfig, config);
