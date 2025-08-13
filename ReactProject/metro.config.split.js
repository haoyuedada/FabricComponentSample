const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const {
    createHarmonyMetroConfig,
} = require('react-native-harmony/metro.config');
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
console.log("拿到所以，开始打包")
for (let key in modules) {
    pathMap.set(key, modules[key]);
}
const ReadSDKFiles = (pathname, result = '') => {
    const directory = fs.readdirSync(pathname);
    directory.sort((a, b) => 
      a.localeCompare(b, undefined, { sensitivity: 'base'})
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

console.log("开始读取SDK文件", argv.sdk)
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
        // babelTransformerPath: require.resolve("./bin/config/transformer"),
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
        minifierConfig: {
            mangle: false,
            keep_classnames: true,
            keep_fnames: true,
            compress: {
                unused: true,
                dead_code: true,
                comparisons: true
            }
        }
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
            console.log("开始创建模块ID工厂", index);
            const createModuleIdFactory = relative => {
                relative = ToRelative(relative);
                if (pathMap.has(relative)) {
                    return pathMap.get(relative);
                }
                index += argv.sdk ? 1 : -1;
                pathMap.set(relative, index);
                return index;
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
        modules.maximum = pathMap.size - 1
        fs.writeFileSync('./config/modules.json', JSON.stringify(modules), {
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
        reactNativeHarmonyPackageName: 'react-native-harmony',
    }),
    config,
);
