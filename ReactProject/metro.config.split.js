const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const {
  createHarmonyMetroConfig,
} = require('@react-native-oh/react-native-harmony/metro.config');
const defaultConfig = getDefaultConfig(__dirname);
const path = require('path');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const modules = require('./config/modules.json') || {};

const argv = yargs(hideBin(process.argv)).parse();
argv.sdk = argv._.includes('sdk');
argv.start = argv._.includes('start');

const ext =
  /((\.native)|(\.harmony\.js)|(\.native\.js)|(?<!\.android)\.js$|(\.harmony\.jsx)|(\.native\.jsx)|(\.jsx)|(\.harmony\.json)|(\.native\.json)|(\.json)|(\.harmony\.ts)|(\.native\.ts)|(\.ts)|(\.harmony\.tsx)|(\.native\.tsx)|(\.tsx))$/;
const regexp = /(miot-sdk[\\/].*)|(node_modules[\\/].*)|(\.sdk\.)/;
const __prelude__ = /(__prelude__)|(polyfills[\\/].*)/;

const pathMap = new Map();
for (let key in modules) {
  pathMap.set(key, modules[key]);
}
const ReadSDKFiles = (pathname, result = '') => {
  const directory = fs.readdirSync(pathname);
  directory.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  )
  for (let item of directory) {
    let name = path.join(pathname, item);
    const stat = fs.statSync(name);
    if (stat.isFile() && ext.test(name) && !/\.ios/.test(name)) {
      name = name.replace(/\\/g, '/');
      result += `import './${name}'; \n`;
    } else if (stat.isDirectory()) {
      result += ReadSDKFiles(name);
    }
  }
  return result;
};

if (argv.sdk) {
  let result = "";
  result += `import 'react'; \n`;
  result += `import 'react-native'; \n`;
  fs.writeFileSync('./index.sdk.js', result);
}
modules.maximum = modules.maximum || 0;

const ToRelative = relative =>
  path.relative(__dirname, relative).replace(/\\/g, '/');

/**
 * @type {import("metro-config").ConfigT}
 */
const config = {
  transformer: {
    // babelTransformerPath: require.resolve("./config/transformer"),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    minifierConfig: {
      // 压缩配置
      compress: {
        drop_console: true,    // 移除 console 语句
        unused: true,           // 移除未使用变量
        reduce_vars: true,      // 优化变量使用
        sequences: true,        // 合并连续语句
        conditionals: true,     // 优化条件语句
        comparisons: true,      // 优化比较运算
        evaluate: true,         // 计算常量表达式
        booleans: true,         // 优化布尔表达式
        loops: true,            // 优化循环
        toplevel: true,         // 顶层优化
        if_return: true,        // 优化 return 语句
        join_vars: true,        // 合并变量声明
        collapse_vars: true,    // 折叠变量
        // reduce_funs: true,      // 内联单次使用函数
        keep_fnames: true,      // 保留函数名
        keep_classnames: true   // 保留类名
      },
      output: {
        comments: false,        // 移除注释
        beautify: false,        // 不格式化输出
        semicolons: true,       // 保留分号
        braces: true,           // 保留大括号
        indent_level: 0         // 无缩进
      },
      mangle: false,            // 全局禁用混淆
      keep_classnames: true,    // 确保类名保留
      keep_fnames: true         // 确保函数名保留
    },
  },

  serializer: {
    processModuleFilter: module => {
      if (argv.start) {
        return true;
      } else if (__prelude__.test(module.path)) {
        return argv.sdk;
      }
      const relative = ToRelative(module.path);
      const bool = regexp.test(relative);
      return argv.sdk ? bool : !modules[relative];
    },
    createModuleIdFactory: () => {
      let index = argv.sdk ? modules.maximum : 0;
      const createModuleIdFactory = relative => {
        relative = ToRelative(relative);
        if (pathMap.has(relative)) {
          return pathMap.get(relative);
        }
        /**
         * 优化sdk打包逻辑: 如果将react-native的实现修改为在react-native-harmoney中实现，
           则导致文件的打包路径有变化进而导致moduleId变化(增量),进而导致跟此文件有关联的文件
           所依赖的moduleid有变化，所以优化为moduleId不变，只改变打包路径。
           实现效果为：
           "node_modules/react-native/Libraries/Animated/Easing.js": 269,
            ||
           "node_modules/react-native-harmony/Libraries/Animated/Easing.js": 269,
         */
        if (argv.sdk && relative.startsWith("node_modules/@react-native-oh/react-native-harmony")) {
          let oldPath = relative.replace("@react-native-oh/react-native-harmony", "react-native")
          let oldIndex = pathMap.get(oldPath)
          if (oldIndex !== undefined) { 
            pathMap.delete(oldPath)
            delete modules[oldPath]
            pathMap.set(relative, oldIndex);
            return oldIndex
          } else {
            index += argv.sdk ? 1 : -1;
            pathMap.set(relative, index);
            return index;
          }
        } else {
          index += argv.sdk ? 1 : -1;
          pathMap.set(relative, index);
          return index;
        }
      };
      return createModuleIdFactory;
    },
  },

  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      "jx", "txt", "bin", "htm", "ogg", "db", "svg", "ico",
      "zip", "gz", "pdf", "xls", "tmp", "doc", "mid", "dat", "dta", "data",
      "mp3", "wma", "avi", "rm", "rmvb", "flv", "mpg", "mpeg", "mov", "mkv", "qt"
    ]
  },

  cacheStores: [] // 禁用缓存存储
};

process.once('beforeExit', () => {
  if (argv.sdk) {
    const idMap = new Map();
    for (let [key, value] of pathMap.entries()) {
      modules[key] = value;
      idMap.set(value, key);
    }

    // 根据value值从小到大排序
    const sortedObj = Object.fromEntries(
      Object.entries(modules).sort(([, v1], [, v2]) => v1 - v2)
    );

    delete sortedObj.maximum;
    modulesResult = { maximum: Object.keys(sortedObj).length, ...sortedObj }
    fs.writeFileSync('./config/modules.json', JSON.stringify(modulesResult), {
      flag: 'w+',
    });
    // const start =
    //   '__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {';
    // const end = '},';
    // let buffer = fs.readFileSync(
    //   './harmony/entry/src/main/resources/rawfile/sdk.harmony.js',
    //   'utf-8',
    // );
    // const react_helper = fs.readFileSync(
    //   './bin/config/react-helper.js',
    //   'utf-8',
    // );
    // const babel_helper = fs.readFileSync(
    //   './bin/config/babel-helper.js',
    //   'utf-8',
    // );
    // buffer
    //   .split(start)
    //   .map((value, index) => {
    //     const id = value
    //       .substring(value.lastIndexOf(end) + end.length)
    //       .split(',')[0];
    //     value = start + value;
    //     if (index > 0 && id) {
    //       let path = idMap.get(id);
    //       value = `${value.substring(0, value.trim().length - 2)}, "${path}");`;
    //     } else if (index === 0) {
    //       value += babel_helper + react_helper;
    //     }
    //     return value;
    //   })
    //   .join(' ');
    // buffer += `\n/**MIOT_SDK_LOADER**/__r(${pathMap.get(ToRelative('node_modules/react-native/Libraries/Core/InitializeCore.js'))});__r(${pathMap.get(ToRelative('miot-sdk/native/plugin/index.js'))});`;
    // fs.writeFileSync(
    //   './harmony/entry/src/main/resources/rawfile/sdk.harmony.js',
    //   buffer,
    // );
  }
});

module.exports = mergeConfig(
  defaultConfig,
  createHarmonyMetroConfig({
    reactNativeHarmonyPackageName: '@react-native-oh/react-native-harmony',
  }),
  config,
);
