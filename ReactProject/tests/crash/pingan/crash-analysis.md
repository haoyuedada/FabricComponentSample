# Crash 分析：librnoh_reanimated.so ShareableWorklet::toJSValue 崩溃

> 分析基准：`ReactProject` 工程（RN 0.72 / RNOH，`@react-native-ohos/react-native-reanimated` **3.6.6**）
> 崩溃文件：`ReactProject/tests/crash/pingan/pingan-e1c5af0b7b524a8c8db710739f9175f0.txt`
> 说明：线上 so 的 build-id（`c4208ee8...`）与本地所有 so 均不匹配，无法直接符号化。本文采用**源码级对齐**方式：崩溃栈中的符号（`reanimated::ShareableWorklet` 命名空间）与 3.6.6 完全吻合（4.x 已重构为 `worklets::SerializableWorklet`），配合函数内偏移量（+184/+188/+256）与源码行号的对应关系还原调用链。

---

## 一、崩溃概述

| 项目 | 值 |
|---|---|
| 应用 | com.pingan.palifeapp（平安APP）v10.11.00 |
| 设备 | HUAWEI Pura 80 Pro（OpenHarmony，API 12+，release 构建） |
| 信号 | SIGSEGV（SEGV_MAPERR）@ 0x0 —— **NULL 指针解引用** |
| 线程 | 主线程（Thread name: `ingan.palifeapp`，即 `com.pingan.palifeapp` 截断） |
| 进程状态 | **前台冷启动后仅 9 秒**（10:02:05.813 进前台 → 10:02:11.186 崩溃） |
| 关键 so | `librnoh_reanimated.so`（build-id `c4208ee8...`）、`librnoh.so`（`2da8b29d...`） |
| 崩溃库 | 崩溃点在 `libhermes.so`（#00–#12 共 13 帧），由 reanimated C++ 帧 #13 触发 |

## 二、崩溃栈逐层解读

```
#00–#12  libhermes.so（13 帧匿名）              ← Hermes 执行 JS 代码（__valueUnpacker）时 SEGV
#13  ShareableWorklet::toJSValue + 256          ← 崩溃触发点：getValueUnpacker(rt).call(rt, obj)
#14  ShareableObject::toJSValue  + 184          ← 遍历 data_ 属性，递归展开
#15  ShareableObject::toJSValue  + 184
#16  ShareableWorklet::toJSValue + 188          ← ShareableObject::toJSValue(rt) 递归调用处
#17  ShareableObject::toJSValue  + 184
#18  ShareableObject::toJSValue  + 184
#19  ShareableWorklet::toJSValue + 188
#20  ShareableObject::toJSValue  + 184
#21  ShareableObject::toJSValue  + 184
#22  ShareableWorklet::toJSValue + 188          ← 最外层 worklet
#23  librnoh_reanimated.so（匿名，pc 0x86620）  ← runGuarded（WorkletRuntime.h:40，inline 展开）
#24  librnoh_reanimated.so（匿名，pc 0x72d9c）  ← scheduleOnUI / _scheduleOnJS 的调度 lambda
#25  rnoh::EventLoopTaskRunner::executeTask +76 ← TaskExecutor 在主线程执行任务
#26  rnoh::NapiTaskRunner::executeTask +112
#27–#29  libuv（uv__async_io → uv__io_poll → uv_run）
#30–#35  OHOS LoopHandler → EventRunner → MainThread::Start
#36–#47  appspawn 进程启动链
```

**结构特征**：
1. `Worklet → Object → Object → Worklet` 模式重复 **4 层**（#22/#19/#16/#13）——这是 worklet 闭包（`__closure`）中嵌套捕获其他 worklet/包装对象的**正常形态**，总 Shareable 帧仅 10 帧，加上完整进程栈共 48 帧，**远未达到栈溢出深度**。
2. 两类偏移的含义（与 3.6.6 源码对齐）：
   - `ShareableWorklet::toJSValue+188` = `ShareableObject::toJSValue(rt)`（递归入口）
   - `ShareableWorklet::toJSValue+256` = `getValueUnpacker(rt).call(rt, obj)`（**进入 Hermes 执行 JS 的调用**，即崩溃点）
   - `ShareableObject::toJSValue+184` = `data_[i].second->getJSValue(rt)`（属性递归展开）
3. 崩溃发生在**主线程**上由 RNOH TaskExecutor 驱动的任务中（#25 EventLoopTaskRunner），处于冷启动阶段。

## 三、调用链还原（基于 3.6.6 源码）

### 3.1 C++ 侧关键源码

**`Shareables.cpp:250-260` — 崩溃点所在函数：**

```cpp
jsi::Value ShareableWorklet::toJSValue(jsi::Runtime &rt) {
    if (!std::any_of(data_.cbegin(), data_.cend(), [](const auto &item) {
            return item.first == "__workletHash"; })) {
        throw std::runtime_error("ShareableWorklet doesn't have `__workletHash` property");
    }
    jsi::Value obj = ShareableObject::toJSValue(rt);   // ← +188：递归展开 worklet 全部属性
    return getValueUnpacker(rt).call(rt, obj);          // ← +256：崩溃点，进入 Hermes 执行 JS
}
```

**`Shareables.cpp:224-231` — 属性递归展开：**

```cpp
jsi::Value ShareableObject::toJSValue(jsi::Runtime &rt) {
    auto obj = jsi::Object(rt);
    for (size_t i = 0, size = data_.size(); i < size; i++) {
        obj.setProperty(rt, data_[i].first.c_str(),
                        data_[i].second->getJSValue(rt));   // ← +184：属性值递归 toJSValue
    }
    return obj;
}
```

**`Shareables.cpp:7-17` — 崩溃调用的目标：**

```cpp
jsi::Function getValueUnpacker(jsi::Runtime &rt) {
    auto valueUnpacker = rt.global().getProperty(rt, "__valueUnpacker");
    ...
    return valueUnpacker.asObject(rt).asFunction(rt);
}
```

### 3.2 两条可达该栈形的调度路径

RNOH 线程模型特殊：**JS 线程运行在主线程的 uv loop 上**，且 RNOH 版 `ReanimatedUIScheduler` 把 "UI 任务" 也调度到主线程：

```cpp
// ReanimatedUIScheduler.cpp（RNOH 版）
void ReanimatedUIScheduler::scheduleOnUI(std::function<void()> job) {
    if (m_taskExecutor->isOnTaskThread(TaskThread::MAIN)) { job(); return; }
    m_taskExecutor->runTask(TaskThread::MAIN, [weakSelf = weak_from_this(), job = std::move(job)]() {
        if (auto self = weakSelf.lock()) { job(); }
    });
}
```

因此主线程上 `EventLoopTaskRunner::executeTask`（#25）→ 匿名帧（#23/#24）→ `runGuarded` → `toJSValue` 递归，对应以下任一路径（栈形一致，无法从无符号帧区分）：

**路径 A：`runOnUI`（scheduleOnUI → UI runtime）**

```cpp
// NativeReanimatedModule.cpp:121-140
uiScheduler_->scheduleOnUI([weakUiWorkletRuntime, shareableWorklet] {
    auto uiWorkletRuntime = weakUiWorkletRuntime.lock();
    if (uiWorkletRuntime == nullptr) { return; }
    const auto scope = jsi::Scope(uiWorkletRuntime->getJSIRuntime());
    uiWorkletRuntime->runGuarded(shareableWorklet);        // → getJSValue 递归展开（UI runtime）
});

// WorkletRuntime.h:37-43
inline void runGuarded(const std::shared_ptr<ShareableWorklet> &shareableWorklet, ...) const {
    runOnRuntimeGuarded(rt, shareableWorklet->getJSValue(rt), ...);  // ← #23 匿名帧
}
```

**路径 B：`runOnJS`（_scheduleOnJS → JS runtime）**

```cpp
// WorkletRuntimeDecorator.cpp:82-110
jsi_utils::installJsiFunction(rt, "_scheduleOnJS", [jsScheduler](...) {
    ...
    jsScheduler->scheduleOnJS([=](jsi::Runtime &rt) {
        auto remoteFun = shareableRemoteFun->getJSValue(rt);   // worklet 递归展开
        auto argsArray = shareableArgs->getJSValue(rt)...;     // 参数递归展开（可含 worklet 链）
        remoteFun.asObject(rt).asFunction(rt).call(rt, args, argsSize);
    });
});
```

JS 侧入口（`threads.ts:181-223`）：`runOnJS(worklet)` 会把 **worklet 本身作为第一个参数**经 `makeShareableCloneOnUIRecursive` 克隆后传给 `_scheduleOnJS` —— worklet 闭包中的嵌套 worklet 链因此在 JS 线程被递归展开，与栈中 4 层 Worklet 嵌套吻合。

### 3.3 Hermes 内部（#00–#12）

`getValueUnpacker(rt).call(rt, obj)` 调用的是 JS 函数 `__valueUnpacker`（`valueUnpacker.ts`）：

```ts
function valueUnpacker(objectToUnpack: any, category?: string): any {
  'worklet';
  let workletsCache = global.__workletsCache;          // Map：workletHash → 反序列化的函数
  ...
  const workletHash = objectToUnpack.__workletHash;
  if (workletHash !== undefined) {
    let workletFun = workletsCache.get(workletHash);
    if (workletFun === undefined) {
      const initData = objectToUnpack.__initData;
      workletFun = eval('(' + initData.code + '\n)');   // release 路径：eval worklet 源码
      workletsCache.set(workletHash, workletFun);
    }
    const functionInstance = workletFun.bind(objectToUnpack);
    objectToUnpack._recur = functionInstance;
    return functionInstance;
  } else if (objectToUnpack.__init) { ... }            // ShareableHandle 展开路径
}
```

13 帧 Hermes 内部帧与该函数的执行（属性访问 `__workletHash`/`__initData`、`eval` 编译执行、`Map.get/set`、`bind`）及其下游 worklet 初始化一致 —— 崩溃发生在 Hermes 执行这段 JS 时的引擎内部。

## 四、根因分析

### 4.1 直接原因（确凿）

崩溃点为 `ShareableWorklet::toJSValue` 中 `getValueUnpacker(rt).call(rt, obj)`（+256），即 **C++ 调用跨入 Hermes 执行 `__valueUnpacker` JS 代码后，Hermes 引擎内部发生 NULL 解引用**（#00–#12）。崩溃不在 reanimated 的 C++ 帧上（C++ 只到 #13），说明 reanimated 自身代码没有直接解引用空指针，而是其依赖的 **runtime/JSI 对象状态已失效**，Hermes 访问了坏对象。

### 4.2 排除"循环引用栈溢出"假说

`glm5.1.md` 的结论是"循环引用 → toJSValue 无限递归 → 栈溢出"。本 crash **证据不支持**：

1. **深度不足**：本栈仅 4 层 worklet 嵌套、10 帧 Shareable 递归，全程 48 帧（其中 #27–#47 是进程启动栈）。栈溢出通常表现为数百上千帧递归。
2. **崩溃点位置不符**：若为栈溢出，崩溃应发生在递归已达上限的**最后一层**函数序言（栈针触碰 guard page），帧地址应是随机的深度；但本 crash 精确崩在 `+256`（valueUnpacker 调用）。
3. **交叉验证**：另一份平安 crash（`pingan-zong.txt`，不同 build-id `72ab5eed...`）Shareable 递归深达 40+ 层、含 `ShareableHandle::toJSValue+76` 帧，但**崩溃点同样是 `ShareableWorklet::toJSValue+256`** —— 深度差 10 倍，崩溃点分毫不差，证明崩溃与递归深度无关。
4. **本地插桩实证**（`ReactProject77/crash-test/LOG.txt`，14363 行日志、3031 次 `ShareableWorklet::toJSValue start`）：`Worklet → 3×Object → Worklet → ...` 的递归模式是 worklet 闭包捕获的正常形态，**全程正常运行未崩溃**（UI 线程 tid 36143 与主线程 tid 34665 均出现）。`ToJSValueDemo.tsx` 中已注明该结论："demo 成功触发了完整的递归 toJSValue 链，但没有崩溃 —— 因为 runtime 始终有效，递归正常完成"。

### 4.3 根因：runtime / JSI 对象生命周期竞态（主因）

崩溃发生在 Hermes 内部 + NULL 解引用 + 冷启动 9 秒偶发，指向 **runtime 或其 GC 对象在被使用期间失效**。3.6.6 存在以下已证实的防护缺失（均在 3.18.x 中修复，见 4.4）：

**缺陷 ①：runtime 无 aliveness 注册机制，`runGuarded` 只防护到 lock 一刻**

```cpp
// NativeReanimatedModule.cpp:118（析构在任意线程触发）
NativeReanimatedModule::~NativeReanimatedModule() {
    eventHandlerRegistry_.reset();
    frameCallbacks_.clear();
    uiWorkletRuntime_.reset();     // ← UI runtime 在此销毁，可能在非主线程
}
```

`scheduleOnUI` lambda 中 `weakUiWorkletRuntime.lock()` 成功后，`runGuarded → toJSValue` 长递归执行期间（本栈即证明该过程很长），若 `~NativeReanimatedModule` 在另一线程执行 `uiWorkletRuntime_.reset()`，`rt` 立即变成悬垂引用，随后 `getValueUnpacker(rt).call(...)` 进入 Hermes 访问已释放的 runtime 内部结构 → SEGV。

冷启动 9 秒恰是高危窗口：RNInstance 创建/页面快速切换/组件快速挂卸载（甚至 SDK 内部 reload）都会触发模块析构与重建。

**缺陷 ②：`ShareableHandle::toJSValue` 无锁，跨 runtime 初始化竞态**

```cpp
// 3.6.6 Shareables.cpp（无锁版本）
jsi::Value ShareableHandle::toJSValue(jsi::Runtime &rt) {
    if (initializer_ != nullptr) {
        auto initObj = initializer_->getJSValue(rt);
        remoteValue_ = std::make_unique<jsi::Value>(getValueUnpacker(rt).call(rt, initObj));
        remoteRuntime_ = &rt;
        initializer_ = nullptr;   // ← 两个 runtime 线程可同时进入，double-write/double-free
    }
    return jsi::Value(rt, *remoteValue_);   // ← remoteValue_ 损坏后为悬垂 jsi::Value
}
```

`useSharedValue` 创建的每个 shared value 都是 ShareableHandle（`{__init: ...}`）。若同一 shared value 首次被 JS runtime 与 UI runtime 两侧同时展开（RNOH 中两 runtime 虽同在主线程串行，但 `pingan-zong.txt` 栈中确有 `ShareableHandle::toJSValue` 帧，且 Sensor/其他 native 线程回调仍可能并发），`remoteValue_` 的 unique_ptr 会被覆盖释放，产生悬垂 `jsi::Value`，**后续任意一次** valueUnpacker/Hermes 访问到它都会 SEGV —— 完美解释"崩溃点固定在 +256 而 Hermes 内部 NULL 解引用"的延迟爆炸特征。

**缺陷 ③：JSI 值跨 runtime 存活无清理**

3.6.6 中 Shareable 持有的 `jsi::Value`（如 `remoteValue_`）在 runtime 销毁后析构或被访问都会崩溃；3.18.2 专门增加了 `cleanupIfRuntimeExists`（runtime 已死则主动泄漏而非触碰）。

### 4.4 版本演进佐证（3.18.2 已修复的正是上述缺陷）

对照 `ReactProject77` 工程使用的 reanimated 3.18.2 源码：

| 缺陷 | 3.6.6 | 3.18.2 修复 |
|---|---|---|
| runtime aliveness | 无任何机制 | `WorkletRuntimeRegistry`（`registerRuntime/unregisterRuntime/isRuntimeAlive`）+ `WorkletRuntimeCollector`（RAII 注册）；`Shareables.h:42` `cleanupIfRuntimeExists` 在 runtime 死亡后主动 `value.release()` 泄漏代替崩溃 |
| ShareableHandle 竞态 | 无锁 | `ShareableHandle::toJSValue` 增加 `initializationMutex_`，源码注释明确写明修复场景："*UI thread can be pre-empted on initialization of a shared value and then JS thread can try to access the shared value*…" |
| 命名空间 | `reanimated::ShareableWorklet`（与崩溃栈一致） | 重构为 `worklets::SerializableWorklet`（可反向证明崩溃栈属 3.x 旧架构） |

### 4.5 结论

- **直接原因**：`getValueUnpacker(rt).call(rt, obj)` 进入 Hermes 执行 `__valueUnpacker` 时，底层 runtime/JSI 对象已失效（use-after-free），Hermes 内部 NULL 解引用。
- **根本原因**：reanimated 3.6.6 缺少 runtime 生命周期防护（无 aliveness 检查、ShareableHandle 无初始化锁、JSI 值无跨 runtime 清理），在**冷启动高频动画初始化 + runOnJS/runOnUI 大量调度 + 组件快速挂卸载/实例重建**的竞态窗口内，runtime 销毁或 shared value 双侧并发初始化产生悬垂对象。
- **递归嵌套（4 层 worklet）不是根因**，只是决定了崩溃栈的形状，并放大了竞态窗口（递归展开耗时越长，与 teardown 相撞的概率越高）。

## 五、解决方案

### 5.1 业务侧（平安 APP 可立即实施）

1. **升级 reanimated（首选）**：将 `@react-native-ohos/react-native-reanimated` 从 3.6.6 升级到 3.18.x（`ReactProject77` 工程已验证该版本源码包含全部三项防护）。这是收益最大、改动最小的方案。
2. **收敛冷启动动画密度**：崩溃集中在进前台后 9 秒内。排查首屏/Tab 首页的动画组件，推迟非首屏动画初始化（懒加载页面后再创建 animated 组件），降低竞态窗口内的调度量。
3. **规避高危用法**（若短期无法升级）：
   - 避免在组件卸载 cleanup 中继续 `runOnUI/runOnJS` 调度（unmount 后任务仍会被执行）；
   - 避免快速挂卸载的组件（如轮播 indicator、闪烁动画）持有多个 shared value 并在挂载瞬间全部展开；
   - 减少闭包深链：不要在 worklet 闭包中捕获"引用其他 worklet 的包装对象"，改为传基本类型参数；
   - 避免在 worklet 闭包对象图中制造循环引用（虽非本次根因，但会放大对象图与耗时）。

### 5.2 库侧（RNOH reanimated 维护方）

**修复 ①（对齐 3.18.2）：backport runtime aliveness 检查**

```cpp
// WorkletRuntimeRegistry.h（新增，参照 3.18.2）
class WorkletRuntimeRegistry {
    static std::set<jsi::Runtime *> registry_;
    static std::mutex mutex_;
public:
    static void registerRuntime(jsi::Runtime &rt);
    static void unregisterRuntime(jsi::Runtime &rt);
    static bool isRuntimeAlive(jsi::Runtime *rt);
};

// NativeReanimatedModule.cpp scheduleOnUI lambda 内：
uiWorkletRuntime->runGuarded(shareableWorklet);
// 改为先校验：
if (!WorkletRuntimeRegistry::isRuntimeAlive(&uiWorkletRuntime->getJSIRuntime())) return;
```

并在 `WorkletRuntime` 构造/析构中以 RAII（`WorkletRuntimeCollector`）注册/注销。

**修复 ②：为 `ShareableHandle::toJSValue` 加初始化锁**（对齐 3.18.2 的 `initializationMutex_` 实现，双检 `remoteValue_ == nullptr`）。

**修复 ③：`getValueUnpacker` 调用加诊断防护**

```cpp
jsi::Value ShareableWorklet::toJSValue(jsi::Runtime &rt) {
    ...
    jsi::Value obj = ShareableObject::toJSValue(rt);
    try {
        return getValueUnpacker(rt).call(rt, obj);
    } catch (const jsi::JSError &e) { /* 记录并上抛为 JS 异常 */ }
}
```

（注意：try-catch 只能捕获 JS 异常，防不住 SEGV；核心还是 ①② 的生命周期修复。）

**修复 ④（加固项）：toJSValue 递归环检测/深度上限**（`glm5.1.md` 建议的 `isConverting_` 标记或 thread_local visited 集合）——非本次根因，但可防御业务侧构造出环引用对象图的场景，避免未来的栈溢出类崩溃。

### 5.3 复现与验证

复现基建已就绪（`ReactProject77/crash-test/ToJSValueDemo.tsx`，可在 `ReactProject` 中同构移植）：

1. **正常链路验证**：`executeOnUIRuntimeSync` 返回 worklet 链 + `useSharedValue`（ShareableHandle），确认 4 层 `Worklet→Object→Object→Worklet` 递归正常完成（对应 LOG.txt 实证，不崩溃）。
2. **竞态复现**：`UnmountRacer` 子组件（15ms 级快速 mount/unmount ×8 + 3ms 高频 `runOnUI` 深链 + 卸载 cleanup 中继续调度），叠加 `DevSettings.reload()` 触发 `~NativeReanimatedModule → uiWorkletRuntime_.reset()`，命中"任务在 runtime 销毁后/销毁中执行"窗口。
3. **修复验证**：应用 5.2 修复 ①② 后重复步骤 2，崩溃应消失；用 ASan/HWASan 构建可进一步将 SEGV 转译为明确的 use-after-free 报告以锁定具体对象。

## 六、附录：证据清单

| 证据 | 位置 | 作用 |
|---|---|---|
| 崩溃日志（4 层嵌套） | `ReactProject/tests/crash/pingan/pingan-e1c5af0b7b524a8c8db710739f9175f0.txt` | 分析对象 |
| 崩溃日志（40+ 层嵌套，同崩 +256） | `ReactProject/tests/crash/pingan/pingan-zong.txt` | 证明崩溃点与递归深度无关 |
| reanimated 3.6.6 源码 | `ReactProject` 依赖 `harmony/libs/reanimated.har`（`@react-native-ohos/react-native-reanimated` 3.6.6） | 源码级对齐 |
| reanimated 3.18.2 源码 | `ReactProject77` 依赖 | 修复机制对照 |
| 插桩运行日志 | `ReactProject77/crash-test/LOG.txt`（14363 行，3031 次递归） | 证明 4 层递归为正常行为、深递归不必然崩溃 |
| 符号化同类栈 | `ReactProject77/tests/crash/crash-0507.txt`（#59 runOnRuntimeGuarded / #60 runGuarded / #61 scheduleOnUI lambda / #68 ReanimatedUIScheduler） | 确定 #23/#24 匿名帧身份 |
| 复现 demo | `ReactProject77/crash-test/ToJSValueDemo.tsx`、`ReactProject/tests/crash/pingan/ReanimatedCrashRepro*.tsx` | 复现与修复验证 |
| 前序分析 | `glm5.1.md`（循环引用假说）、`opus4.6.md`（runtime 竞态假说） | 本文对两者做了批判性合并：竞态为主因，环引用假说被实证排除 |
