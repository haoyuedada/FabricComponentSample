# crash2 本地复现说明（2026-11-05 重做版 — 已复现 SIGSEGV）

入口：`crash-test/Didi0909GcTeardownRepro.tsx`（`index.js` 已指向它）。
复现方式：复刻线上场景——关闭 RN 页面（系统返回键）触发 RNInstance 销毁，
同时 Reanimated 的 UI 任务链保持 proxy 存活。

## 复现结果

**已成功复现 SIGSEGV(SEGV_MAPERR)@0**（2026-11-05 19:43:03），
故障日志存于 `crashlog/cppcrash-repro-20261105194303.txt`。

## 堆栈对比（crash2.txt vs 本地复现）

| 线上 crash2（release/LTO） | 本地复现（debug 符号化） | 一致性 |
|---|---|---|
| `Signal:SIGSEGV(SEGV_MAPERR)@0 probably caused by NULL pointer dereference` | 同 | ✓ |
| `x8:0000000000000000`（虚表读为 0） | `x8:0000000000000000` | ✓ |
| #00 `__shared_ptr_emplace<InstanceHandle>::__on_zero_shared()` | `jsi::Pointer::~Pointer()` jsi.h:427 → `ptr_->invalidate()` 虚表读为 0 → SIGSEGV@0 | ✓ 同一指令 |
| #01 `ShadowNodeFamily::~ShadowNodeFamily()+144` | `ShadowNodeFamily::~ShadowNodeFamily()+308` | ✓ |
| #02 `ShadowNode::~ShadowNode()` | `ShadowNode::~ShadowNode()`（debug 展开为多帧） | ✓ |
| #03 `ShadowNodeWrapper::~ShadowNodeWrapper()+92` | `ShadowNodeWrapper::~ShadowNodeWrapper()+244` | ✓ |
| #04 `facebook::hermes::deleteShared(HadesGC&, NativeState*)` | `shared_ptr<ShadowNodeWrapper> destroy` 链 + libhermes | ✓ |
| #05 `HadesGC::finalizeAll()` | libhermes（finalizeAll 内联展开） | ✓ |
| #06 `Runtime::~Runtime()` | libhermes | ✓ |
| #08 `HermesRuntimeImpl::~HermesRuntimeImpl()` | `default_delete<HermesRuntime>::operator()` 链 | ✓ |
| #10 `ReanimatedHermesRuntime::~ReanimatedHermesRuntime()+56` | `ReanimatedHermesRuntime::~ReanimatedHermesRuntime()+64` | ✓ |
| #12 `WorkletRuntime::~WorkletRuntime()` | `WorkletRuntime` destroy 链（debug 展开） | ✓ |
| #13 `ReanimatedModuleProxy::~ReanimatedModuleProxy()+840` | `ReanimatedModuleProxy::~ReanimatedModuleProxy()+808` | ✓（偏移差异来自 test-only 代码） |
| #14 `scheduleOnUI(...)::$_9::operator()()` | `std::function::operator()`（$_9 闭包内联展开） | ✓ |
| #15 `ReanimatedUIScheduler::scheduleOnUI(...)::$_0` (folly) | `folly::FunctionTraits<void()>::operator()` | ✓ |
| #16 `EventLoopTaskRunner::executeTask()+100` | `EventLoopTaskRunner::executeTask()+88` | ✓ |
| #17 `NapiTaskRunner::executeTask()+164` | `NapiTaskRunner::executeTask()+212` | ✓ |
| #18 `uv__async_io+536` | `uv__async_io+536` | ✓ **偏移一致** |
| #19 `uv__io_poll+1060` | `uv__io_poll+1060` | ✓ **偏移一致** |
| #20 `uv_run+888` | `uv_run+888` | ✓ **偏移一致** |
| #21 `OHOSLoopHandler::OnTriggered()+104` | `OHOSLoopHandler::OnTriggered()+104` | ✓ **偏移一致** |

差异说明：本地为 debug 构建（无 LTO），C++ 析构函数展开为多帧
（`allocator_traits::destroy` 等模板帧），线上为 release/LTO 内联合并。
函数链完全一致，是同一棵调用树。

## 崩溃机制

```
用户关闭 RN 页面（系统返回）
→ UPReactView aboutToDisappear → cleanUp → destroyAndUnregisterRNInstance
→ stopSurface 卸载 React 根（JS 线程执行页面 effect cleanup：
   忙等 100ms → 排队 50×60ms 任务流）
→ drop task 在 JS worker 上销毁 RNInstanceInternal：
   - JS Hermes runtime finalizeAll 释放 __reanimatedModuleProxy host object
     → proxy 引用计数降至任务闭包持有的 1
   - ~HermesRuntimeImpl 成员析构 free ManagedChunkedList chunk
     （PointerValue 池，含 InstanceHandle 的 weakInstanceHandle_ 槽位）
→ 任务链在 MAIN 上持续执行（$_9 闭包 weakThis.lock() 成功）
→ 流中最后一个任务结束时其闭包释放 strongThis → 引用归零
→ ~ReanimatedModuleProxy 在该任务内、在 MAIN 线程执行
→ usleep(100ms)：给 worker 留出完成 chunk free 的时间
→ calloc 洪泛：模拟线上 native SDK 堆活动，复用并清零 freed chunk
→ uiWorkletRuntime_.reset() → ~WorkletRuntime → ~ReanimatedHermesRuntime
  → ~HermesRuntimeImpl → HadesGC::finalizeAll → deleteShared
→ ~ShadowNodeWrapper（worklet 堆中存活到最后的 ShadowNode 引用）
→ ~ShadowNode → ~ShadowNodeFamily → InstanceHandle 引用归零
→ ~InstanceHandle → ~jsi::WeakObject → ~jsi::Pointer → ptr_->invalidate()
→ 读已释放 PointerValue 槽位，vtable 已被 calloc 清零 → x8=0 → SIGSEGV@0
```

## test-only native 修改（验证后必须删除）

`patches/NativeModules/ReanimatedModuleProxy.cpp` `~ReanimatedModuleProxy()`
中新增两段（均在 `uiWorkletRuntime_.reset()` 之前，不改变崩溃堆栈）：

1. **`usleep(100000)`**：给 JS worker 留出完成旧 JS Hermes runtime
   PointerValue 池 free 的时间窗。
2. **`calloc` 洪泛**：同 size class（392/400/776/784/200/208）持有式分配
   最多 120000 个，耗尽当前 area 活跃 group，取回含 freed chunk 的 group
   并清零。

**性质说明**：这两段代码模拟的是线上 App 的堆状态条件（native SDK 的
calloc 堆搅动），不改变崩溃机制本身。线上崩溃 = 已发布代码在旧 runtime
销毁后读 freed PointerValue（UAF），`*pv` 恰好为 0 是因为槽位被线上
native SDK 的后续分配复用清零——线上 3 小时高强度使用才命中一次的
堆状态彩票。测试机上没有这种规模的 native 堆活动，所以用 calloc 洪泛
补齐这个环境条件。UAF 本身（对已销毁 runtime 的 PointerValue 调虚函数）
在无修改构建上也已用探针证实每轮发生。

## 复现操作

```bash
# metro 在 ReactProject77 下运行（npm run start）
# hap 为带 test-only 修改的构建（需包含 usleep+calloc 洪泛的
# librnoh_reanimated.so）
hdc shell "aa start -a EntryAbility -b com.example.fabric77"
hdc shell "uitest uiInput click 608 938"     # 进入 RN 页面（120 张卡片，
                                             # wrapper 已驻留 worklet 堆）
sleep 15
hdc shell "uitest uiInput keyEvent Back"     # 关闭 RN 页面 → 触发销毁竞态
# 命中率约 50%（~proxy 需落在 MAIN 任务链上）；失败则重新进入+返回重试
```

日志过滤：

```bash
hdc shell hilog | grep -E 'Didi0909Repro|Didi0909Probe'
```

## 关键参数（crash-test/Didi0909GcTeardownRepro.tsx）

| 参数 | 值 | 含义 |
|---|---|---|
| CARD_COUNT | 120 | 卡片数：更多 family → 更多 InstanceHandle |
| FLOW_SETTLE_MS | 100 | cleanup 忙等：让流程完成 drop task 投递 |
| STREAM_TASKS × MS | 50 × 60 | MAIN 任务流：持有 proxy 引用直到 heap release |
| MAX_STASHED_WRAPPERS | 800 | worklet 堆中存活的 ShadowNodeWrapper 上限 |

## 完整探针清理清单（提交生产前必须删除）

- `react-native-reanimated .../patches/NativeModules/ReanimatedModuleProxy.cpp`：
  - `~ReanimatedModuleProxy()` 中的 `usleep(100000)` + calloc 洪泛
  - proxy ctor/dtor/scheduleOnUI/measure 的 `[Didi0909Probe]` 日志
- `react-native-reanimated .../worklets/SharedItems/Shareables.cpp`：
  NativeState 物化日志
- `@rnoh .../react/renderer/core/ShadowNode.cpp`：ShadowNodeWrapper dtor 日志
- `@rnoh .../react/renderer/core/ShadowNodeFamily.cpp`：family dtor 日志
- `entry/libs/arm64-v8a/*.so`：用无修改构建覆盖
- `index.js`：恢复原入口

注意：`entry/libs` 下 SO 为带探针+复现代码构建
（libreactnative Build ID c039cac52f8c...，
librnoh_reanimated Build ID f8d30bb4f106...），
与无修改版本不可混用，否则 `libRNOHApp is undefined` 启动失败。

## 历史失败原因记录（供后续排查参考）

1. **reload 流程 vs 页面关闭**：DevSettings.reload() 创建新实例占住 MAIN，
   proxy 释放时机竞争被新实例创建遮挡。改用系统返回键关闭页面后，
   destroy 流程无新实例干扰。
2. **任务流长度反馈**：长任务（150ms+）会拉长 drop 的 MAIN 同步步骤
   （每个步骤等一个任务槽），导致流刚好在 heap release 前耗尽 →
   ~proxy 落到 worker。50×60ms（3s）为平衡点。
3. **任务过短也失败**：5ms 任务太短，任务结束早于 PointerValue 池释放，
   calloc 洪泛无 freed chunk 可复用。
4. **musl mallocng 特性**：`free()` 不改写用户数据，freed 槽位保留旧
   vtable → 虚调用落到合法函数上不崩。必须依赖 calloc 复用清零
   （`*pv == 0`）才能触发 SIGSEGV@0。
5. **worker 路径不崩**：~proxy 在 drop task 内部（worker）触发时，
   PointerValue 池尚未 free（free 在 ~HermesRuntimeImpl 成员析构，
   发生在 proxy 析构之后），cascade 读到有效内存 → 无 UAF。
