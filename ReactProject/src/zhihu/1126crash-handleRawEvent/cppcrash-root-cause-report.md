# CppCrash 根因分析报告 — com.zhihu.hmos（知乎）

> 分析对象：`cppcrash-com.zhihu.hmos-20020226-20261121112552970.log`
> 分析方式：faultlog 事实提取 + libhermes.so（同 BuildID）反汇编 + hermes v0.12.0 源码比对 + reanimated 3.6.3 补丁源码比对 + 93 线程全量清点

## 一、基本信息

| 项 | 值 |
|---|---|
| 进程/应用 | com.zhihu.hmos，知乎 11.16.0 (41610) |
| 设备 | 华为 nova 12 Pro (ADA-AL00)，HarmonyOS 6.1.0.135(SP8C00E120R3P6) |
| 崩溃时间 | 2026-11-21 11:25:52.970；进程存活 34s，进入前台 4.8s 后崩溃 |
| 信号 | **SIGSEGV (SEGV_MAPERR) @ 0xc0** |
| 崩溃线程 | 主线程 Tid=Pid=45839（MAIN） |
| RSS | 610 MB |
| LastFatalMessage | 无 |
| HiLog | 无（日志不含 HiLog 段） |
| RN 环境 | RN 0.72.142 / RNOH，react-native-harmony-reanimated 3.6.3（应用打补丁版） |

## 二、崩溃帧甄别

- **崩溃帧 #00**：`libhermes.so+0xa24b4`（BuildID 3829df74beda822e）— hermes VM 内部
- **首个非 runtime 帧**：#02 `jsi::valueFromDynamic+268`（libjsi）
- **首个应用侧帧**：#03 `NativeReanimatedModule::handleRawEvent+408`（librnoh_reanimated，BuildID 6302aa…f2a）
- **应用自研帧**：`RNImageView.ts:233`（@zhihu/react_entry，图片加载完成回调）

关键栈（节选，自底向上）：

```
ImagePattern::OnCompleteInDataReady            (libace_compatible)
RNImageView.ts:233 completionBlock             (@zhihu/react_entry)
RNInstance.ts:476 / NapiBridge.js:86           → emitComponentEvent
rnoh::RNInstanceCAPI::emitComponentEvent        (librnoh)
BaseReactEntryPackageEventEmitRequestHandler::handleEvent
EventEmitter / EventDispatcher::dispatchEvent
EventListenerContainer::willDispatchEvent
#04 librnoh_reanimated+0x65b2c                  (ReanimatedModule.cpp 事件监听 lambda，MAIN gate)
#03 NativeReanimatedModule::handleRawEvent+408  (librnoh_reanimated)
#02 jsi::valueFromDynamic+268                   (libjsi)
#01 libhermes.so+0x7c528                        (HermesRuntimeImpl 字符串创建包装，入栈 GCScope)
#00 libhermes.so+0xa24b4                        ← SEGV
```

## 三、证据链（机制还原）

### 3.1 #00 反汇编完全解码

本地 prebuilt `libhermes.so` BuildID 与 faultlog 匹配（3829df74beda822e）；`getBytecodeVersion()=94`，介于 v0.12.0(89) 与 v0.13.0(96) 之间，为 RN 0.72 时期 main 分支 hermes（2026-05-30 构建）。

#00 为 `IdentifierTable::getSymbolID(Runtime*, Handle<StringPrimitive>)` 的内联序列：

```asm
a23d8: ldr  x0, [x19, #8]        ; 读 runtime->topGCScope_  ← 此刻有效
a23e4: ldp  x21, x8, [x0, #192]  ; GCScope::{next_, curChunkEnd_} bump 对
a23f8: str  x1, [x21]            ; makeHandle #1（存入 x2|0xFFFD000000000000 指针标记值）
a2414/a242c: castToUTF16Ref → hashString(Jenkins) → getOrCreateIdentifier（字符串 intern）
a24a4: ldr  x9, [x19, #8]        ; 重读 topGCScope_ = NULL ← 函数中途被置空
a24b4: ldp  x0, x10, [x9, #192]  ; 对 NULL+0xc0 解引用 → SEGV（PC=0x5d207224b4）
```

寄存器全部自洽：

- `x19=0x5f8ec00000`（vm::Runtime*；`[x19+0]`=libhermes+0x1f1148 vtable，.data.rel.ro 连续 15 个 R_AARCH64_RELATIVE）
- `x20=x19+0x2400`（Runtime 内嵌 IdentifierTable）
- `x22=0xfffd005f8f02bfc8`（worklet 堆上字符串 primitive，指针标记 HermesValue）
- `x1=0xfffb800000000145`、`x8=0x100000145`（构造值/结果标志，均与分支判定一致）
- fault addr **0xc0 恰等于 `GCScope::next_` 的 +192 字段偏移**

### 3.2 hermes 源码锁定语义

v0.12.0 `HandleRootOwner.h/.cpp`（结构与 .so 一致）：

- `HandleRootOwner` 为多态基类：vtable@+0，首个私有成员 `GCScope *topGCScope_`@+8 — 与 `[x19+8]` 吻合
- GCScope：`next_`@+192 / `curChunkEnd_`@+200 — 与崩溃指令、fault addr 0xc0 吻合
- **`GCScope::~GCScope()` 是全库唯一写 `topGCScope_` 的路径**（写回 `prevScope_`）；`markGCScopes`/`_newChunkAndPHV` 只读
- 外层 GCScope 位于存活栈帧 #01 中 — **单线程语义下 topGCScope_ 不可能在函数中途变为 NULL**

### 3.3 排除 GC

HadesGC.cpp 中 `GCScope` 零引用（后台清扫/标记/迁移线程从不触碰句柄作用域链）；崩溃瞬间 4 个 `hades` 后台线程（46559/46618/46629/46633）与 `hermes-sampling`（46560）全部在 `pthread_cond_timedwait` — 无 GC 进行。

### 3.4 线程全量清点（93 线程）

崩溃瞬间仅 MAIN 在 hermes 内：

- **RNOH_JS(46558)** 同时被 reanimated 触发的 TurboModule 懒加载阻塞：
  `TurboModuleBinding::getModule → TurboModuleProvider::getTurboModule → hasArkTSTurboModule → TaskExecutor::runSyncTask(MAIN) → EventLoopTaskRunner::waitForSyncTask`（在等正在崩溃的 MAIN）
- reanimated **AsyncQueue 线程不存在**（`runAsyncGuarded` 从未执行，`queue_` 懒创建）
- 其余线程均在系统/业务库等待态（RDB、speechrecognizer、zhlog、preferences、inspector SerialExecutor 等）

### 3.5 定性

唯一自洽机制：崩溃窗口内（第一次 `makeHandle` 与最后一次之间，字符串 intern 查表毫秒级窗口）**另一线程在同一个 vm::Runtime 上 push/pop 了 GCScope** — 其 scope 在 MAIN 进入该 runtime 之前捕获 `prevScope_=NULL`，析构时把 `topGCScope_` 置 NULL。该线程随后离开 hermes 代码，静态快照无法直接点名；但 reanimated 中所有非 MAIN 的 worklet runtime 入口都在 JS 线程路径上（`WorkletRuntime` 构造 / `UIRuntimeDecorator::decorate(uiRuntime,…)` / `installValueUnpacker`，均在 RNOH_JS 懒初始化期间执行），与崩溃瞬间 JS 线程正处于 reanimated 懒初始化（TurboModule get）的事实吻合。

### 3.6 被编译掉的防线

reanimated 自带 `ReanimatedReentrancyCheck`（`ReanimatedRuntime/ReanimatedHermesRuntime.h`，源自 RN 的 HermesExecutorFactory）— 专为此场景设计：两线程同时进入同一 HermesRuntime 时 `__builtin_trap()`。但整个结构被 `#ifndef NDEBUG` 包裹 — **知乎 release 包中不存在**，并发违规静默逃逸为内存竞态。

对应源码（patch 目录 `NativeReanimatedModule.cpp:447` 起，MAIN 事件路径直接驱动 worklet runtime）：

```cpp
jsi::Runtime &rt = uiWorkletRuntime_->getJSIRuntime();
const auto &payloadFactory = rawEvent.payloadFactory;
jsi::Value payload = payloadFactory(rt);   // ← 崩溃点：在 worklet runtime 上做字符串 intern
```

## 四、根因

**reanimated 3.6.3 的 UI/worklet HermesRuntime 是单线程设计，却被两个线程无互斥并发驱动**（MAIN 事件分发 `handleRawEvent → payloadFactory` 与 JS 线程侧的 worklet runtime 操作重叠），GCScope 作用域链 push/pop 竞态，`topGCScope_` 被置 NULL，主线程下一次 `makeHandle` 空指针解引用崩溃（fault addr 0xc0 = NULL+`GCScope::next_` 偏移）。hermes 自身行为正确；RNOH 框架仅是事件分发通道。

## 五、根因编码与模板

- **1.1.1.11.1**（进程内 native 代码空指针访问，SIGSEGV/SEGV_MAPERR）
- **Template A**：fault addr 0xc0 = NULL+固定结构偏移（`GCScope::next_`@+192），寄存器值流全程可解释（x22 指针标记字符串、x1 构造值、x8 结果标志），非 0x6b6b6b 类内存污染第二现场

## 六、责任域

**三方库/应用集成侧**（react-native-harmony-reanimated 3.6.3 应用补丁版）。

符号解析门槛说明：应用 `librnoh_reanimated.so` BuildID 6302aa7985d430b54aca076bfb9c4eb4a6858f2a 在本地 30 个构建中无匹配，#03/#04 及 JS 线程 0x853c0 无法行级定位 → 不给行级 diff，修复建议为设计层。

## 七、修复建议

1. **（首选，应用补丁内 ~30 行）** 把 `ReanimatedHermesRuntime.h` 中 `ReanimatedReentrancyCheck` 的 `#ifndef NDEBUG` 去掉、release 生效：静默竞态变确定性 trap，下次复现直接抓到违规线程栈，一击定位第二个入口。
2. 复现路径：带该检查的构建 + 信息流图片加载（`RNImageView` onLoad）与 reanimated 懒初始化重叠（进程启动 ~30s 内）。
3. 向 react-native-harmony-reanimated 上游反馈：RNOH 移植允许 JS 线程与 MAIN 在无互斥下同时驱动 `uiWorkletRuntime`。

## 八、未覆盖与风险

- 应用 `librnoh_reanimated.so` 无匹配符号 → 第二线程的确切 reanimated 入口只能靠启用重入检查后复现确认。
- faultlog Maps 段截断未深挖（反汇编已给出机制，不再需要）。
- **风险**：若复现显示第二入口在 RNOH 框架自身（而非 reanimated 补丁），责任域需从"三方库"改为"框架"，结论以 trap 复现栈为准。
