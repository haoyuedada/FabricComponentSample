# crash2 本地复现说明

入口已临时切换为 `crash-test/Didi0909GcTeardownRepro.tsx`。该用例不依赖 release
行号或未裁剪符号；验收以线上 `crash2` 已确认的函数链和本地日志时序为准。

## 构建后操作

1. 进入页面后先等待约 2 秒，让 `Animated.View`、`useAnimatedRef`、`measure` 和
   UI worklet 队列产生/消费 Fabric `ShadowNodeWrapper`。
2. 点击“校准：强制 UI Runtime GC”。日志必须出现：

   ```text
   [Didi0909Repro] UI GC begin
   [Didi0909Repro] UI GC end
   ```

   若没有，说明当前包未编入本地 probe，或没有运行到 Reanimated UI runtime；不要
   继续拿该包判断复现结果。
3. 重启应用后再次进入该页，点击“Arm + Reload”。它会让一个 UI worklet 持续约
   450ms，同时在 40ms 后请求 reload，以增加 `scheduleOnUI` 闭包和 RNInstance
   teardown 重叠的窗口。此构建已打开 `kDidi0909ReproBaseline`：会跳过本地候选
   修复中的 Props/Layout 预清理，日志会明确打印 `baseline: skip pre-reset registry
   cleanup`。这是复现基线，不是可提交的生产配置。

## 命中标准

仅出现 `Proxy destructor entered` 不是命中。第二轮构建还会输出两个直接对应
线上 #03/#01 的 probe；先据此判定卡在哪一段：

```text
[Didi0909Repro] ShadowNodeWrapper destructor ...
[Didi0909Repro] ShadowNodeFamily destructor ...
```

- 前者缺失：UI Hermes GC/teardown 没有回收本页 wrapper，当前 JS 压力并未制造
  线上所需的 NativeState finalization。
- 前者存在、后者缺失：该 ShadowNode 仍有其他强引用；还没成为最后一个引用。
- 两者都存在但不崩：析构链已命中，但 RN runtime 仍有效；需要再控制旧 RNInstance
  与 wrapper 最后释放的先后关系。

完整命中需具备：

```text
[Didi0909Repro] Proxy resetting UI worklet runtime
HadesGC::finalizeAll
ShadowNodeWrapper::~ShadowNodeWrapper
ShadowNodeFamily::~ShadowNodeFamily
InstanceHandle::__on_zero_shared
```

对应线上 `crash2` 的 #05、#03、#01、#00。若本地不崩但能稳定看到 proxy reset，
说明已复现调度和 teardown，尚未复现“UI GC 回收最后一个 ShadowNode 引用”的
前置条件；这是有效的阴性结果，不能据此宣称修复。

## 日志过滤

```bash
hdc shell hilog | grep -E 'Didi0909Repro|HadesGC|ShadowNodeWrapper|ShadowNodeFamily|InstanceHandle'
```

`ShadowNodeWrapper` 和 `ShadowNodeFamily` 的逐对象日志各只保留前 32 条，随后会输出
一次 `logs suppressed`。这是刻意的降噪：发生 NativeCrash 时应以 faultlog 调用栈为准，
而不是依赖数千条析构日志。

## 本地探针清理

完成实验后，删除下列 test-only probe，再提交生产源码：

- `UIRuntimeDecorator.cpp` 的 `_Didi0909ForceGarbageCollection`
- `ReanimatedModuleProxy.cpp` 的 `[Didi0909Repro]` 日志
- `ReanimatedModuleProxy.cpp` 的 `kDidi0909ReproBaseline` 开关（恢复候选修复路径）
- `ShadowNode.cpp` 和 `ShadowNodeFamily.cpp` 的 `[Didi0909Repro]` 日志
- `index.js` 中 `Didi0909GcTeardownRepro` 的入口切换
