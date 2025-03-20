# 说明
这是创建自定义Fabric组件（包括CAPI组件和ArkTS组件）的demo工程。


# 目录结构

```md
FabricComponentSample
├── ReactProject 前端工程
├── NativeProject 鸿蒙工程
├── Turbo-module RN三方件（自定义TurboModule）
├── fabric-component-sample-package RN三方件（自定义Fabric组件）
└── README.md
```


# 环境搭建
1. 在 `fabric-component-sample-package` 中运行 **npm pack** 生成tgz文件；
1. 在 `Turbo-module` 中运行 **npm pack** 生成tgz文件；
2. 在 `ReactProject` 目录下执行 **npm i** 安装依赖;
6. 用 DevEco Studio 打开 `NativeProject`，点击 tabs 栏中的 file，执行 **Sync and Refresh Project**；
4. 回到 `ReactProject` 目录执行 **npm run dev** 生成 bundle，运行 **npm start** 启动metro服务；
5. 检查 `NativeProject`、`entry` 目录下是否生成 `oh-modules` 文件夹；
7. 点击右上角的 **run** 启动项目；
8. 如果启动的是metro服务，还需要运行 `hdc rport tcp:8081 tcp:8081` 来转发8081端口，然后再在手机上重新打开应用。

# turboModule 开发流程
将 TurboModule 声明为一个模块，并作为一个依赖的方式添加到您的项目中。
1. 声明 JavaScript 接口，放在 v1 中
2. 执行 npm pack 生成 tgz 包，在前端工程中执行 npm run codegen 生成桥接代码
3. 在原生测实现 turboModule
4. 在继承TurboModulesFactory的 class 中中添加相关配置(createTurboModule及turboModules)，保证初始化 RNInstane 时创建相关的 turboModule。