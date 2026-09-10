# crash2：Reanimated 析构崩溃修复与后续分析基线

> 文档用途：记录 `crash2.txt` 的独立分析结论、本次源码修复、风险边界和线上诊断标记。下次拿到带行号的新 CppCrash/HiLog 时，应先把新日志作为独立证据源重新分析，再使用本文对比修复是否命中；本文不是新崩溃的预设结论。

## 1. 基线材料

- 原始崩溃日志：`tests/didi0909/crashlog/crash2.txt`
- 原始符号目录：`tests/didi0909/so`
- 原始 `librnoh_reanimated.so` Build ID：`e12c927b357b30355b977db5d6a4363c3caf048a`
- 原始 `librnoh_reanimated.so` SHA-256：`eb4b0d26a3f3ce568f1eade3ae5edc613ad08de2ee3b535295acad921978d6fa`
- 修复后本地 native 产物：`harmony/library/build/default/intermediates/cmake/default/obj/arm64-v8a/librnoh_reanimated.so`
- 修复后本地 SO Build ID：`f8c3a96a3b7322fc70524ed0191bd7f991e762d9`
- 修复后本地 SO SHA-256：`2c4621d6c1b41e3f47ae9b213ae4cfab00241201c65e4b55e78c98aab46ca1e6`
- 当前修复只修改依赖展开目录中的 native 源码并生成 SO，没有重新封装或覆盖 HAR。

后续符号化必须先核对新 crash 中的 Build ID。Build ID 不一致时，不得使用本文记录的旧地址或不匹配的 SO 推导源码行号。

## 2. 原始 crash2 事实

### 2.1 故障基本信息

| 字段 | 值 | 原始日志行 |
|---|---|---:|
| 时间 | `2026-09-08 15:00:27.450` | 27 |
| 进程 | `com.sdu.didi.hmos.psnger`，PID 4638 | 28–31 |
| 版本 | `8.0.12`，VersionCode `1408001201` | 9–10 |
| 信号 | `SIGSEGV(SEGV_MAPERR)` | 33 |
| fault address | `0x0` | 33 |
| 故障线程 | MAIN，Tid 4638 | 34–35 |
| 崩溃帧 | `InstanceHandle::__on_zero_shared()` | 36 |
| Reanimated 关键帧 | `ReanimatedHermesRuntime::~ReanimatedHermesRuntime()` | 46 |
| Proxy 析构帧 | `ReanimatedModuleProxy::~ReanimatedModuleProxy()` | 49 |
| 延迟任务帧 | `ReanimatedModuleProxy::scheduleOnUI(...)::$_9::operator()()` | 50 |
| MAIN 任务执行帧 | `EventLoopTaskRunner::executeTask()` | 52 |

### 2.2 寄存器与指令证据

- `x8 = 0x0`，见原始日志第 77 行。
- `pc = 0x0000005c9314be80`，见原始日志第 83 行。
- PC 相对 `libreactnative.so` 的偏移为 `0x28be80`。
- 对匹配 Build ID 的 `libreactnative.so` 反汇编后，故障指令为 `ldr x1, [x8]`。
- 因为该指令从 `x8` 指向的地址读取，而 `x8 == 0`，所以直接故障机制是空地址读取；这与日志的 `SEGV_MAPERR@0` 一致。

### 2.3 调用链语义

关键链路为：

```text
MAIN event loop
  -> ReanimatedUIScheduler 延迟任务
  -> ReanimatedModuleProxy::scheduleOnUI 回调
  -> ReanimatedModuleProxy 析构
  -> Worklet/UI Hermes Runtime 析构和 GC finalizeAll
  -> ShadowNodeWrapper / ShadowNode / ShadowNodeFamily 析构
  -> InstanceHandle 引用归零
  -> libreactnative.so 对空 JSI/对象状态执行读取
  -> SIGSEGV
```

### 2.4 根因判断

- 诊断结果：Reanimated 的排队 MAIN 任务延长了 `ReanimatedModuleProxy` 及 UI Worklet Runtime 的生命周期，使它们可能晚于所属 RN Runtime/JSI 对象进入销毁；Hermes GC 在最终析构 ShadowNode 链时访问到已经无效或被清空的 `InstanceHandle` 关联状态。
- 故障类别：生命周期时序错误/延迟回调引发的失效对象访问，最终表现为空指针读取。
- 责任领域：应用依赖侧的 Reanimated Harmony native 适配层。
- 可信度：`MEDIUM`。指令、寄存器和完整析构调用链相互吻合，但单份现场没有检测器报告直接证明对象何时首次失效，所以不能声称 100% 确诊或 100% 修复。

## 3. 本次修复

### 3.1 提前执行显式失效

在 `ReanimatedModule` 析构阶段、RN Runtime/JSI 仍有效的窗口中，显式调用 `ReanimatedModuleProxy::invalidate()`：

- 如果已经在 MAIN 线程，直接执行。
- 如果不在 MAIN 线程，通过 `TaskExecutor::runSyncTask(MAIN, ...)` 同步执行。
- 同步任务用于尽快建立“已经失效”的状态，并不保证先排队的所有异步任务都被执行或排空。
- 调度异常被捕获并记录，避免析构函数抛出异常导致 `std::terminate`。
- 在此之前注销 module event listener，并停止 keyboard updater。

源码位置：

- `harmony/library/oh_modules/@react-native-ohos/react-native-reanimated/src/main/cpp/ReanimatedModule.cpp:54`
- proxy 安装及弱引用保存：同文件 `:232`

### 3.2 幂等清理与安全顺序

`invalidate()` 使用原子状态保证幂等。首次进入后按以下顺序清理：

1. 停止 sensor 外部回调。
2. 清除 event handler registry 和 frame callbacks。
3. 注销 Fabric mount/commit hooks，阻止新的 Fabric 回调进入半析构状态。
4. 清除 batched operations、PropsRegistry，以及 LayoutAnimationsProxy 内部持有的 ShadowNode/ShadowView 相关容器。
5. 最后销毁 `uiWorkletRuntime_`。

将 UI Runtime 放在最后销毁，是为了让持有的 JSI/ShadowNode 资源先在仍有效的 runtime 环境中释放。

源码位置：

- `harmony/library/oh_modules/@react-native-ohos/react-native-reanimated/src/main/cpp/patches/NativeModules/ReanimatedModuleProxy.cpp:231`
- 原子状态定义：`harmony/library/oh_modules/@react-native-ohos/react-native-reanimated/src/main/cpp/Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.h:206`

### 3.3 延迟回调保护

- `scheduleOnUI` 入队前检查 `invalidated_`。
- 已排队回调执行时，再次检查 proxy 是否仍存在以及是否已经失效。
- 对其他关键入口也增加失效检查，避免 teardown 后继续访问已清理状态。
- 丢弃日志只记录一次，避免异常场景刷屏。

源码位置：

- `harmony/library/oh_modules/@react-native-ohos/react-native-reanimated/src/main/cpp/patches/NativeModules/ReanimatedModuleProxy.cpp:295`

## 4. 线上诊断日志

统一检索标记：

```text
RNOH_REA_TEARDOWN_V1
```

日志由 glog 进入 Harmony HiLog，RNOH sink 的 tag 为 `#RNOH_CPP`。当前标准 `cppcrash` 文本通常不会自动包含完整 HiLog，因此线上采集系统必须同时保存崩溃前后的 HiLog 窗口；只有 crash 文件而没有 HiLog 时，不能把“未看到标记”解释为代码没有执行。

| stage | 含义 | 后续判断 |
|---|---|---|
| `proxy_installed` | 新 proxy 安装完成 | 可用于确认埋点版本确实运行过 |
| `module_dtor_begin on_main=...` | module 开始析构 | 判断 teardown 是否进入及线程归属 |
| `dispatch_main_sync` | 非 MAIN 析构，准备同步切至 MAIN | 后续应出现 `invalidate_enter_main` 或失败日志 |
| `invalidate_enter_main` | 已进入执行失效逻辑的位置 | 后续应出现 `invalidate_begin` |
| `invalidate_begin` | 首次开始清理 | 同时记录 callbacks/operations/registry 状态 |
| `fabric_hooks_removed` | Fabric hooks 已注销 | 后续 Fabric 回调不应再进入旧 proxy |
| `ui_runtime_reset_begin` | 即将销毁 UI Runtime | 若这是最后一条，重点检查 runtime 析构链 |
| `invalidate_complete` | 显式清理完成 | 表示主修复路径完整执行 |
| `late_callback_dropped source=scheduleOnUI` | 已排队的 UI 回调在失效后到达并被拦截 | 直接证明延迟任务竞态实际存在且 guard 生效 |
| `late_callback_dropped source=scheduleOnUI_entry` | teardown 后仍尝试新建 UI 任务并被拦截 | 检查上游为何在 module teardown 后继续调用 |
| `dispatch_main_failed error=...` | MAIN 同步调度失败 | 高优先级线索；本轮保护可能没有执行完整 |
| `proxy_already_gone` | module 析构时 proxy 已释放 | 对比此前是否已有 `proxy_dtor/invalidate_complete` |
| `proxy_dtor` | proxy 析构开始 | 正常情况下随后会看到幂等返回或完整 invalidate |
| `invalidate_already_complete` | 重复失效被安全忽略 | 预期的幂等路径，不代表故障 |
| `module_dtor_complete` | module 析构侧流程完成 | 用于闭合 teardown 时序 |

## 5. 下次新 crash 的判读矩阵

| 新现场 | 初步含义 | 下一步 |
|---|---|---|
| 同一析构栈，且没有任何本版本标记 | 不能直接判定修复无效；可能是旧 SO 或 HiLog 未采集 | 先核对 SO Build ID、版本号和日志采集能力 |
| 有 `module_dtor_begin`，无 `invalidate_complete` | 可能在显式清理过程中失败或崩溃 | 找出最后一个 stage，并结合新 crash 行号/栈定位具体阶段 |
| `ui_runtime_reset_begin` 后再次出现相同栈 | 风险仍集中在 UI Runtime/GC 析构 | 用新版本匹配 SO 反解所有 `librnoh_reanimated.so` 和 `libreactnative.so` 帧 |
| 有 `invalidate_complete`，随后仍是完全相同栈 | 可能仍有其他所有者/任务在更晚时间持有独立 JSI 或 runtime 对象 | 排查 `scheduleOnUI` 之外的异步 capture 和 runtime 所有权 |
| 有 `late_callback_dropped`，没有再崩溃 | 支持原生命周期竞态假设，且 guard 命中 | 统计命中次数与场景，继续做生命周期压力回归 |
| 有 `dispatch_main_failed` | 失效操作未可靠进入 MAIN | 优先调查 error 内容、TaskExecutor 状态和销毁线程 |
| 崩溃信号、地址或栈已改变 | 可能是独立问题，也可能是清理顺序暴露的新问题 | 按全新 CppCrash 分析，不能套用本次根因 |

## 6. 已识别风险与保证边界

### 已降低的风险

- 原子 `invalidated_` 防止析构与延迟回调重复清理。
- 已排队任务使用弱引用，并在执行时检查失效状态。
- Fabric hooks 在其依赖对象之前注销；UIManager 的 hook 注册机制使用读写锁时，注销可与进行中的 hook 调用建立同步。
- sensor、event、frame 和 keyboard 等外部入口先停止，再释放内部对象。
- UI Runtime 最后销毁，减少 ShadowNode/JSI 对象晚于 runtime 清理的机会。
- 析构中的同步调度异常被捕获，不会从析构函数向外传播。

### 仍无法静态排除的风险

- 非 MAIN 线程析构时会等待 MAIN 同步任务，仍需设备压力测试验证所有外部锁序不存在环形等待。
- `scheduleOnUI` 以外可能还有捕获 RN JSI 值的异步路径；本次崩溃栈没有提供它们是第一现场的证据。
- 只有单份 crash，没有 ASan/GWP-ASan 或 core dump，因此无法完全排除更早发生的内存破坏。
- `oh_modules` 通常是依赖生成/展开目录，重新安装依赖可能覆盖源码修复；发版前必须确认最终产物使用修复后的 SO。
- 当前 SDK target API 为 21，而可将自定义对象直接附加到 crash 上下文的 `OH_HiDebug_SetCrashObj` 在本地 SDK 标记为 API 23，因此本次不能安全依赖该能力；必须由线上系统额外采集 HiLog。

## 7. 已完成验证

- `rnoh_reanimated` arm64-v8a native target 已编译并链接成功。
- 修复后 SO 中可找到 `ReanimatedModuleProxy::invalidate()` 与 `ReanimatedModule::~ReanimatedModule()` 符号。
- 没有重新封装 HAR。
- 该验证证明代码可编译并进入本地 SO，不等价于真机生命周期回归通过。

建议真机覆盖：反复创建/销毁 RN 页面、快速前后台切换、页面切换期间持续运行动画、退出时仍有 UI worklet 排队、低内存触发 GC，以及非 MAIN 线程触发 module teardown 的场景。

## 8. 下次分析必须提供的材料

1. 新的原始 CppCrash 文件，保留原始行号，不要只截取调用栈。
2. 与线上故障版本逐个 Build ID 匹配的未剥离 SO/符号，至少包括：
   - `librnoh_reanimated.so`
   - `libreactnative.so`
   - `libhermes.so`
   - `librnoh_core.so`
3. 崩溃时间点前后至少 30 秒的 HiLog，保留 `RNOH_REA_TEARDOWN_V1` 和 `#RNOH_CPP` 行。
4. 应用版本号、VersionCode、设备系统版本，以及是否确认装载了修复后的 SO。
5. 可复现时记录触发动作：页面销毁、前后台切换、容器切换、热更新/重载、动画或 worklet 是否仍在运行。

收到新材料后的顺序：先独立提取新日志的信号、寄存器、指令、调用栈和 Build ID；再按时间排列 teardown stage；最后才与本文基线比较。不得仅凭函数名相似就认定为同一问题。

