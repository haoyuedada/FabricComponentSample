================================================================================
                        CppCrash 问题综合分析报告
================================================================================

分析对象：`tests/didi0909/crashlog/crash2.txt`

> 本报告按 `cppcrash-analysis` 的常规 Native Crash 流程生成。仅使用与本
> 日志 BuildID 一致的 `tests/didi0909/so` 中二进制进行符号与反汇编核验；
> 不引用 `crash1` 的结论，也不把当前工作区中可能已修改的源码当作线上
> 崩溃版本的行号证据。

【故障基本信息】

故障时间     : 2026-09-08 15:00:27.450

故障进程     : PID 4638 / `com.sdu.didi.hmos.psnger` / UID 20020218

故障线程     : TID 4638，主事件循环线程 `idi.hmos.psnger`

故障类型     : CPP_CRASH (NativeCrash)

信号类型     : `SIGSEGV(SEGV_MAPERR)`

崩溃地址     : `0x0000000000000000`

崩溃函数     : `std::__n1::__shared_ptr_emplace<facebook::react::InstanceHandle, ...>::__on_zero_shared()`

崩溃模块     : `libreactnative.so`（#00 为内联/链接期符号，日志未给出其相对 PC）

故障原因描述 : `Signal:SIGSEGV(SEGV_MAPERR)@000000000000000000 probably caused by NULL pointer dereference`

运行环境     : HUAWEI Mate 80 / HarmonyOS 6.1.0.135 / 应用 8.0.12 (1408001201) / arm64-v8a / release


【根因分析】

诊断结果 : 在 Reanimated UI worklet runtime 的析构过程中，Hermes 收尾 GC 释放了
`ShadowNodeWrapper`；其持有的 `ShadowNodeFamily` 释放最后一个
`InstanceHandle` 后，进入一个空目标的虚调用路径并触发 SIGSEGV。寄存器和精确
PC 表明空目标位于该对象析构所访问的底层指针，而不是 `ShadowNodeWrapper` /
`ShadowNodeFamily` 的正常析构本身。

故障类别 : 空指针解引用；与跨 runtime 的对象生命周期/析构顺序高度相关。

可信度   : MEDIUM

可信度说明：崩溃信号、完整析构链、三份匹配 BuildID 的库和两处关键指令反汇编
能够证明“何时、沿何链路触发”；当前材料无法证明被清空的具体对象字段为何失效，
也没有 GWP-ASan、HWASan 或同版本可定位行号，因此不能将根因定为单一模块缺陷。


【三级根因定位】（依据 CPP_CRASH 故障模式库）

| 层级 | 根因 | 匹配依据 |
|---|---|---|
| 一级根因 | CPP_CRASH | HiviewDFX NativeCrash 原始日志 |
| 二级根因 | SIGSEGV (1.1.1.6.0) | `Signal:SIGSEGV(...)` |
| 三级根因 | SEGV_MAPERR (1.1.1.6.1) | `SEGV_MAPERR)@000000000000000000` |


【符号与 BuildID 核验】

| 模块 | 日志 BuildID | 提供二进制 BuildID | 结果 |
|---|---|---|---|
| `libreactnative.so` | `b9db7533794f4a8d65168c375f736f6340b065aa` | `b9db7533794f4a8d65168c375f736f6340b065aa` | 一致 |
| `librnoh_reanimated.so` | `e12c927b357b30355b977db5d6a4363c3caf048a` | `e12c927b357b30355b977db5d6a4363c3caf048a` | 一致 |
| `librnoh_core.so` | `573f8e0ca45fa177163cb56044bb0d133d6b24cf` | `573f8e0ca45fa177163cb56044bb0d133d6b24cf` | 一致 |

`llvm-addr2line` 可恢复函数名，但返回 `??:0` 或 `ld-temp.o:0`，说明当前
二进制没有足以映射到 C++ 源码行的可用行号信息。因此本文不声称某一行源码就是
线上直接缺陷点。


【证据链】

1. 信号与子码语义分析

   原始日志：

   ```text
   Reason:Signal:SIGSEGV(SEGV_MAPERR)@000000000000000000
   probably caused by NULL pointer dereference
   ```

   解读：`SEGV_MAPERR` 表示访问未映射地址；故障地址恰为 0，属于空对象、空虚表
   指针或空函数指针的直接证据。它本身不能区分“初始为空”与“此前生命周期错误
   导致被清空/失效”。

2. 寄存器与故障地址分析

   原始日志：

   ```text
   x0: 0000005cb6e31278     x8: 0000000000000000
   x9: 0000000000000000     pc: 0000005c9314be80
   ```

   fault PC 为 `libreactnative + 0x28be80`，匹配指令为 `ldr x1, [x8]`；
   `x8=0`，因此该次访存直接访问地址 0。其前一条 `0x28be7c: ldr x8, [x0]`
   说明空值来自待析构对象的首字段；`x0=0x5cb6e31278` 且其邻域全为零。结合当前
   `InstanceHandle` 的首成员为继承自 `jsi::Pointer` 的 `WeakObject`，这是其底层
   JSI 指针已经被清空/失效的强候选证据。由于没有同 BuildID 源码行和检测器报告，
   不能再向前断言“谁清空了它”。

3. 调用栈关键帧

   原始析构链（由栈底向栈顶执行）：

   ```text
   #13 ReanimatedModuleProxy::~ReanimatedModuleProxy()+840
   #12 WorkletRuntime::~WorkletRuntime()
   #10 ReanimatedHermesRuntime::~ReanimatedHermesRuntime()+56
   #08 HermesRuntimeImpl::~HermesRuntimeImpl()
   #06 hermes::vm::Runtime::~Runtime()
   #05 hermes::vm::HadesGC::finalizeAll()
   #04 facebook::hermes::deleteShared(... NativeState*)
   #03 facebook::react::ShadowNodeWrapper::~ShadowNodeWrapper()+92
   #02 facebook::react::ShadowNode::~ShadowNode()
   #01 facebook::react::ShadowNodeFamily::~ShadowNodeFamily()+144
   #00 std::__n1::__shared_ptr_emplace<InstanceHandle,...>::__on_zero_shared()
   ```

   该链路说明这不是普通业务调用期间的空指针：异常发生在 UI worklet runtime
   的销毁/GC finalization 阶段。#16、#17 为 RNOH 主事件循环任务执行器，#18 以后
   为系统 libuv/Ability 事件循环；它们是调度上下文，不是直接崩溃点。

4. 匹配二进制的反汇编证据

   `libreactnative.so + 0x23f798`（`ShadowNodeFamily::~ShadowNodeFamily()+144`）
   的实际指令为：

   ```asm
   0x23f78c  ldr x8, [x20]
   0x23f790  mov x0, x20
   0x23f794  ldr x8, [x8, #16]
   0x23f798  blr x8
   ```

   这是 `ShadowNodeFamily` 成员中一个 `shared_ptr` 控制块强引用归零后对
   `__on_zero_shared()` 的虚调用。匹配库中的目标函数为
   `std::__n1::__shared_ptr_emplace<facebook::react::InstanceHandle,...>::__on_zero_shared()`。

   该函数在 `libreactnative.so + 0x28be74` 中先取得 `InstanceHandle` 对象，再取
   其首字段并沿虚表分支；故障精确发生于 `+0x28be80` 的 `ldr x1, [x8]`。
   栈中的 #00 即处于该 final-release 析构路径。

5. 源码语义辅助证据（非线上行号定位）

   本地 RNOH 对应依赖的
   [`InstanceHandle.h`](../../harmony/library/oh_modules/@rnoh/react-native-openharmony/src/main/cpp/third-party/rn/ReactCommon/react/renderer/core/InstanceHandle.h)
   定义了 `jsi::WeakObject weakInstanceHandle_`，并明确注释该字段受
   `jsi::Runtime` 保护。

   [`jsi.h`](../../harmony/library/oh_modules/@rnoh/react-native-openharmony/src/main/cpp/third-party/rn/ReactCommon/jsi/jsi/jsi.h)
   中 `jsi::Pointer` 的析构会调用 `ptr_->invalidate()`。这与“最后释放
   `InstanceHandle` 后在 JSI 指针失效路径触发空访问”的栈和反汇编相符；但因
   无线上行号，仍只作为语义佐证，而非精确行级归责。

6. Memory Near / 其他线程

   无 GWP-ASan、HWASan、allocator 报错或明显的随机/ASCII 覆盖地址。其他线程中
   RNOH JS 线程处于事件循环等待，Hermes Hades worker 也在等待；日志未提供
   足以证明跨线程非法访问的第一现场。因此不将本次定为“踩内存第 2 现场”。


【根本原因】

直接原因 : `ShadowNodeFamily` 析构时，保存的 `InstanceHandle::Shared` 成为最后
一个强引用；`InstanceHandle` 销毁所涉及的 JSI 弱对象底层指针出现空目标访问。

深层原因 : **尚未完全定界。** 当前最强候选是 Reanimated UI Hermes runtime 内的
`ShadowNodeWrapper` NativeState 释放时机，与 RN `jsi::Runtime`/`InstanceHandle`
的有效期不一致。可能涉及 Reanimated 对 ShadowNode 的保留与释放顺序、RNOH/RN
对 InstanceHandle 的 runtime 约束，或二者的生命周期契约缺口。

触发路径 : 主事件循环执行遗留的 `scheduleOnUI` 闭包 → 闭包释放最后的
`ReanimatedModuleProxy` 引用 → 析构 `uiWorkletRuntime_` → Hermes `finalizeAll()`
回收 `ShadowNodeWrapper` NativeState → 释放 `ShadowNodeFamily` → 释放最后的
`InstanceHandle` → 空目标访问。


【本地复现证据更新（2026-09-09）】

在本地复现基线中，已先后完成：强制 UI runtime GC、连续 Fabric wrapper 压力、
`ReanimatedModuleProxy` 析构，以及跳过 Props/Layout 候选预清理后的 runtime reset。
日志确认了 `baseline: skip pre-reset registry cleanup` 与完整 reset，但未发生
NativeCrash。

该阴性结果排除了两个过强推论：

1. `ShadowNodeWrapper → ShadowNodeFamily → InstanceHandle` 的正常回收链本身必崩；
2. 当前 Props/Layout 预清理是唯一使线上故障消失的条件。

它没有否定线上故障：线上证据包含“待析构对象的底层 JSI 指针已为零”这一额外条件，
而本地用例尚未捕获或制造该条件。不能用人为置空该指针来宣称完成真实复现；那只能
验证一个人为注入的空指针，不能验证清空动作的来源和候选修复。


【根因模块】

责任领域 : 未定（候选为混合责任）

责任模块 :

- 直接异常位置：`libreactnative.so!InstanceHandle` 的 final-release 析构路径；
- 触发析构位置：`librnoh_reanimated.so!ReanimatedModuleProxy::~ReanimatedModuleProxy()`；
- 调度位置：`librnoh_core.so!EventLoopTaskRunner::executeTask()`。

定界依据 :

1. `libreactnative.so` 是最终触发空访问的位置，但它由 Reanimated runtime 析构
   触发，不能仅凭 #00 将责任归为 RN/RNOH。
2. `librnoh_reanimated.so` 控制 UI Hermes runtime 的销毁，因此是生命周期顺序的
   关键责任候选；但日志未证明它违反了既有 API/对象有效期契约。
3. 目前没有匹配 BuildID 的带行号源码、无检测器报告、无对象创建/失效时间线，
   因而不能判定为单方缺陷。


【修复建议】

1. 先保留本报告的 BuildID 组合，补齐 `e12c927...`、`b9db753...` 对应构建的
   DWARF/未裁剪符号或可复建源码，至少把 `ReanimatedModuleProxy::~`、
   `ShadowNodeWrapper::~`、`InstanceHandle` 的析构路径定位到源码行；在此之前
   不应将任一“调整析构顺序”补丁宣称为根因修复。
2. 在 Reanimated/RNOH 的测试构建中增加仅诊断日志：记录 ShadowNode tag、地址、
   强引用数量、`ShadowNodeWrapper` 创建/析构线程，以及 RNInstance teardown 与
   UI runtime `finalizeAll()` 的先后关系。目标是证明“最后一个 ShadowNode 引用
   在 RN runtime 已失效后才由 UI GC 释放”。
3. 若第 2 项得到证实，修复应由生命周期责任模块实施：在 RN runtime 仍有效、且
   处于其允许线程时，释放/失效 UI runtime 保存的 ShadowNodeWrapper NativeState；
   随后再销毁 UI Hermes runtime。仅清理 `PropsRegistry` 不足以覆盖本次 #03→#05
   的 UI-GC 路径。
4. 对候选修复加入回归用例：动画中的 Fabric `Animated.View` 同时使用
   `useAnimatedRef` 与 `measure`/`updateProps`，制造 UI runtime 中的
   `ShadowNodeWrapper`，再触发 RNInstance 销毁；连续运行至多轮 teardown，验收
   条件是“析构日志顺序正确且无 NativeCrash”，而不是仅一次页面跳转不崩。


【是否需要进一步分析】

- [x] 符号文件 BuildID 核对
- [x] 反汇编分析（`libreactnative + 0x23f798`、`librnoh_reanimated + 0x59700`）
- [ ] 获取匹配 BuildID 的源码行号/DWARF
- [ ] HWASan / ASan 地址越界检测
- [ ] Core Dump / Tombstone 深度解析
- [x] 多次复现对比以排除随机性（需要基于上述对象生命周期埋点执行）

================================================================================
