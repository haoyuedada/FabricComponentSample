console.log("chy start transformer================");
const metro_transformer = require('metro-react-native-babel-transformer');
const { transform, getCacheKey } = metro_transformer;
const path = require('path');
const fs = require('fs');

// 创建自定义模块包装插件
const wrapModuleWithDefaultPlugin = () => {
    return {
        name: 'wrap-module-with-default',
        visitor: {
            Program: {
                exit(path) {
                    // 确保只在根级别导出上操作
                    if (!path.scope.hasGlobal('exports')) {
                        return;
                    }
                    console.log("chy path.scope:", path.scope)
                    // 检查是否已经存在默认导出
                    const hasDefaultExport = path.node.body.some(
                        node => node.type === 'ExportDefaultDeclaration'
                    );

                    // 如果没有默认导出，则创建
                    if (!hasDefaultExport) {
                        // 创建默认导出对象
                        const defaultExport = {
                            type: 'ExportDefaultDeclaration',
                            declaration: {
                                type: 'ObjectExpression',
                                properties: []
                            }
                        };

                        // 收集所有命名导出
                        const namedExports = path.node.body.filter(
                            node => node.type === 'ExportNamedDeclaration'
                        );

                        // 将命名导出添加到默认导出对象中
                        namedExports.forEach(exportNode => {
                            exportNode.specifiers.forEach(specifier => {
                                if (specifier.type === 'ExportSpecifier') {
                                    defaultExport.declaration.properties.push({
                                        type: 'ObjectProperty',
                                        key: specifier.exported,
                                        value: {
                                            type: 'Identifier',
                                            name: specifier.local.name
                                        },
                                        computed: false,
                                        shorthand: false
                                    });
                                }
                            });
                        });

                        // 添加默认导出
                        path.node.body.push(defaultExport);

                        // 保留原始命名导出（可选）
                        // path.node.body = path.node.body.filter(
                        //   node => node.type !== 'ExportNamedDeclaration'
                        // );
                    }
                }
            }
        }
    };
};

const exportObject = {
    getCacheKey
};

exportObject.transform = function (conf) {
    // // 记录转换的文件
    // const logFile = path.join(__dirname, 'babel-transform-log.txt');
    // fs.appendFileSync(logFile, `Transforming: ${conf.filename}\n`);

    // // 检查是否是目标文件
    // const isTargetFile = conf.filename.includes('LangsTest.js') ||
    //     conf.filename.includes('dle4jz');
    // if (conf.filename == "tests/defaultTest.js") {
    //     conf.options.dev = true
    //     console.log("chy conf:", conf)

    // }

    // // 添加自定义插件到配置中
    // const newConfig = {
    //     ...conf,
    //     options: {
    //         ...conf.options,
    //         plugins: [
    //             ...(conf.options.plugins || []),
    //             // 只在目标文件上应用自定义包装
    //             ...(isTargetFile ? [wrapModuleWithDefaultPlugin] : [])
    //         ]
    //     }
    // };

    //   console.log(`Processing file: ${conf.filename} ${isTargetFile ? '(applied default wrapper)' : ''}`);

    return transform(conf);
};

module.exports = exportObject;