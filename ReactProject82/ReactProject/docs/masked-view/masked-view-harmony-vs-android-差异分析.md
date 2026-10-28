# MaskedView Harmony 与 Android 实现差异分析(含修复实录)

> 分析日期:2026-10-26(同日实机修复验证,设备 025EYG238F174576)
>
> 问题 demo:`src/react-native-masked-view/App.tsx`(`ImageBlurInMaskedViewRepro`,`Image` 带 `blurRadius={50}` 嵌套在 `MaskedView` 内,蒙版为全幅不透明黑 `View`)
>
> 对比对象:
> - **Android**:`@react-native-masked-view/masked-view@0.3.2`(上游),Java 实现,`node_modules/@react-native-masked-view/masked-view/android/src/main/java/org/reactnative/maskedview/`
> - **Harmony**:`@react-native-ohos/masked-view@0.4.4-beta.1`(0.82 线最新),CAPI C++ 实现,`node_modules/@react-native-ohos/masked-view/harmony/masked_view/src/main/cpp/`
>
> JS 侧两包 render 结构完全一致(蒙版用 `absoluteFill` 包成 child 0、内容排其后),差异全部在原生实现层。

---

## 一、问题现象

| 场景 | Android | Harmony(修复前) |
|---|---|---|
| 不包 `MaskedView`,直接渲染图片 | 显示 | 显示 |
| 包 `MaskedView`(全幅不透明蒙版) | 显示 | **完全不显示,空白** |

---

## 二、根因(实机验证)

### ArkUI `OFFSCREEN` 混合 × `NODE_BLUR` 引擎缺陷

**原版库实现全白**(实验 mv5)。继续隔离:

- 去掉 `blurRadius` 后,原语义(离屏边界 + DST_IN)完全正确(实验 mv16:半高蒙版 → 上半内容、下半正确透出页面底色);
- RNOH Image 在 `IMAGE_CACHE_ENABLED` **关闭**(本构建即如此,`librnoh_core_package.so` 无 ImageCache 符号)时,`blurRadius` 用 `NODE_BLUR` 节点渲染期效果实现(`ImageComponentInstance.cpp:203-209、300-303`);
- ArkUI SDK 文档明示 `BLEND_APPLY_TYPE_OFFSCREEN` 与 `blur` 等效果属性存在已知兼容问题(DevEco SDK `/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/ets/component/common.d.ts:21126-21134`);
- Android 的 `blurRadius` 走 Fresco `BlurPostprocessor` 软件模糊,烘进位图后才进 View 层,与蒙版的 `DST_IN` 后处理零耦合。

---

## 三、实现机制差异

**Android(`RNCMaskedView.java`)**——"先拍照、再打蒙版"的后处理模型:

1. `setLayerType(HARDWARE/SOFTWARE)` 让整个容器画在一块**离屏画布**上,而不是直接画到屏幕;
2. 所有子节点(内容)先把绘制指令执行完——执行完后内容就只是一堆**现成像素**(相当于"照片已拍好"),blur 等效果早在这一步就烘进像素了;
3. 把蒙版子节点单独转成一张位图,用 `PorterDuffXfermode(DST_IN)` 盖到这张"照片"上:蒙版不透明处保留像素,透明处清掉。

第 3 步只是对现成像素做一次 alpha 乘法,完全不关心内容子树里有什么——蒙版语义与内容效果(blur 等)零耦合。

**Harmony(`MaskedViewStackNode.cpp`,原版)**——没有"拍照"这一步的实时合成模型:ArkUI CAPI 无 `dispatchDraw` 可拦截,改用属性标记——Stack 自身设 `blendMode(SRC_OVER, OFFSCREEN)` 作离屏边界,内容子节点设 `blendMode(SRC_IN, OFFSCREEN)` 与下方蒙版兄弟实时合成。蒙版和内容始终是节点树里两个"活的"节点,合成发生在引擎的渲染合成阶段,内容子树的渲染效果(`NODE_BLUR`)会被卷进合成管线——恰好落入上述引擎缺陷。

---

## 四、实验矩阵(全部实机验证)

| 实验 | Stack blend | 子节点 blend | blur | 蒙版 | 结果 |
|---|---|---|---|---|---|
| mv5 | SRC_OVER+OFF(原版) | content SRC_IN+OFF | 有 | 全幅 | 全白 |
| 透传 | 无 | 无 | 有 | 全幅 | 内容显示(证明树本身能渲染) |
| 置顶透传 | 无 | 无 | 有 | 全幅 | 黑色蒙版盖顶(证明蒙版子树渲染、置顶排序正确) |
| mv8 | 无 | mask DST_IN+FAST | 有 | 全幅 | 内容显示;后续半高实验证明 FAST 逐 paint 合成无"擦除"语义,且擦除/保留连乘不可组合 |
| mv12/mv19 | 无 | mask DST_IN+OFF | 无/有 | 半高 | 蒙版不透明区正确;**蒙版透明区擦穿页面底色(泄漏,露出黑窗底)** |
| mv16 | SRC_OVER+OFF | mask DST_IN+OFF | **无** | 半高 | **完全正确**(边界隔离 + 无效果子树) |
| **最终** | 无 | mask DST_IN+OFF(蒙版置顶) | **有** | 全幅 | **正确(用户场景)** |

结论:当前引擎上不存在普适无损配置——带 OFFSCREEN 边界遇 `NODE_BLUR` 全白;无边界时蒙版透明区泄漏;FAST 无擦除语义。

---

## 五、最终修复

1. **masked-view 库内修复**(蒙版置顶 + `DST_IN/OFFSCREEN`,内容子节点不带 blend,Stack 不设边界):
   - 代码:`node_modules/@react-native-ohos/masked-view/harmony/masked_view/src/main/cpp/MaskedViewStackNode.{h,cpp}`,`.har` 已从修复后源码重打包;
   - 修复:**含 blur 的内容 + 全幅不透明蒙版(用户 demo)正确显示**;
   - 已知取舍(代码中已留 `shortcut` 注释):蒙版含透明区域时会擦穿 MaskedView 后方的页面底色。透明蒙版(Text 蒙版等)场景在当前引擎上无 lib 层无损方案,引擎修复后应切回带边界配置(即矩阵 mv16 行)。
2. **完整根治路径**(超出 lib 层,建议向上游推进):
   - RNOH 框架:开启 `IMAGE_CACHE_ENABLED` 或让 blur 走解码期烘培、弃用 `NODE_BLUR` → 带边界配置对所有场景正确;
   - ArkUI 引擎:修复 OFFSCREEN 捕获含 `NODE_BLUR` 子树时渲染空白的问题;
   - 向 gitcode CPF-RN/rntpc_masked-view 提 issue(可附本文矩阵)。

---

## 六、验证记录

- 最终状态实机截图像素分析:原始 demo(全幅蒙版 + `blurRadius={50}`)300vp 带状区域正常显示灰底 + 模糊图片,带外白底;
- 过程证据:组件挂载日志、半高蒙版对照(橙底页面)、去 blur 对照、透传/置顶/FAST/OFFSCREEN 各配置截图;
- JS bundle 已重生成(`rawfile/bundle.harmony.js`,原为 8/26 旧包、不含本 demo)。

## 附:关键文件索引

| 内容 | 路径 |
|---|---|
| 库修复 | `node_modules/@react-native-ohos/masked-view/harmony/masked_view/src/main/cpp/MaskedViewStackNode.{h,cpp}`(+重打包的 `masked_view.har`) |
| RNOH Image blur 路径 | 框架 `RNOHCorePackage/ComponentInstances/ImageComponentInstance.cpp:203-209、300-303` |
| SDK OFFSCREEN×blur 警告 | DevEco SDK `openharmony/ets/component/common.d.ts:21126-21134` |
| Android 原生实现 | `node_modules/@react-native-masked-view/masked-view/android/.../RNCMaskedView.java` |

## 附注(证据边界)

- Android 侧行为未在本机复测(用户已验证);Android `blurRadius`→Fresco 软件模糊基于上游稳定实现(0.82 node_modules 不分发 ReactAndroid 源码);
- Harmony 侧全部结论均有实机截图/日志证据;`.ohpm` 安装副本中的临时诊断代码已清理,与 `node_modules` 源码一致。
