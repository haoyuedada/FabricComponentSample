# Reanimated UI 线程析构崩溃 - 问题分析

- **日期**:2026-04-28
- **分支**:`release/0.7748.400`
- **状态**:已下补丁(待真机验证)
- **崩溃点**:`facebook::react::InstanceHandle::__on_zero_shared`
- **触发组件**:`@didi-wyc/react-native-reanimated@3.18.2-rc.2.1`

---

## 一句话结论

`ReanimatedModuleProxy` 的最后一个 `shared_ptr` 在 **MAIN/UI 线程** 释放,
导致 `~PropsRegistry → ~ShadowNode → ~ShadowNodeFamily → ~InstanceHandle` 在错误
线程级联析构,`~InstanceHandle` 期望 JS/Fabric 线程,断言/野指针崩溃。

---

## 崩溃栈(关键帧)

```
#00 std::__shared_ptr_emplace<facebook::react::InstanceHandle>::__on_zero_shared
#01 facebook::react::ShadowNodeFamily::~ShadowNodeFamily
#02 facebook::react::ShadowNode::~ShadowNode
#03 std::__shared_ptr_emplace<vector<shared_ptr<ShadowNode const>>>::__on_zero_shared
#04 facebook::react::ShadowNode::~ShadowNode
#05 std::__shared_ptr_emplace<reanimated::PropsRegistry>::__on_zero_shared
#06 reanimated::ReanimatedModuleProxy::~ReanimatedModuleProxy        ← 析构入口
#07 reanimated::ReanimatedModuleProxy::scheduleOnUI(...)::$_9::operator()
#08 rnoh::ReanimatedUIScheduler::scheduleOnUI(...)::$_0
#09 rnoh::EventLoopTaskRunner::executeTask
#10 rnoh::NapiTaskRunner::executeTask                                  ← MAIN 线程
```

---

## 根因

### 1. 强引用拓扑

| 持有方 | 引用类型 | 文件:行 |
|---|---|---|
| JS Runtime host object(`RNRuntimeDecorator::decorate`) | **strong** | `ReanimatedModule.cpp:200` |
| `ReanimatedModule::weakNativeReanimatedModule_` | weak | `ReanimatedModule.h:19` |
| `nodesManager->registerPerformOperations` lambda | weak | `ReanimatedModule.cpp:190-195` |
| `EventListener` lambda | weak | `ReanimatedModule.cpp:204-208` |
| UI 调度 lambda(`ReanimatedModuleProxy::scheduleOnUI`) | weak,内部 lock 出本地 strong | `ReanimatedModuleProxy.cpp:247` |

**关键:** 整个进程只有 **JS Runtime host object 一处** 持有 strong。

### 2. PropsRegistry 持有什么

`Common/cpp/reanimated/Fabric/PropsRegistry.h:57-58`

```cpp
std::unordered_map<Tag, std::pair<ShadowNode::Shared, folly::dynamic>> map_;
std::unordered_map<Tag, ShadowNode::Shared> removableShadowNodes_;
```

`ShadowNode::Shared` → `ShadowNodeFamily` → `InstanceHandle`。
`InstanceHandle` 析构必须在 JS/Fabric 线程。

### 3. 为什么会在 MAIN 析构

`patches/NativeModules/ReanimatedModuleProxy.cpp:241-263`(原始版本):

```cpp
workletsModuleProxy_->getUIScheduler()->scheduleOnUI(
    [=, weakThis = weak_from_this()] {
      const auto strongThis = weakThis.lock();   // ← 临时强引用
      if (!strongThis) return;
      strongThis->uiWorkletRuntime_->runGuarded(shareableWorklet);
    });                                          // ← strongThis 在 MAIN 释放
```

`weakThis.lock()` 模式只保护"使用期间存在",**不保护"析构在哪个线程"**。

---

## 复现路径

### 时序

```
T0  动画运行中,JS 反复调用 scheduleOnUI(worklet) → MAIN 队列堆积 lambda
    refcount(Proxy) = 1  (JS host object)

T1  用户返回/replace → DRNContainer.aboutToDisappear (BaseRNContainer.ets:73)
    → destroyAndUnregisterRNInstance → 开始拆 RN 实例

T2  MAIN 线程 deque lambda 开始跑
    weakThis.lock() 成功 → strongThis 持有,refcount = 2
    runGuarded(shareableWorklet) 执行中…

T3  (并发)JS 线程拆 JS Runtime → host object 释放
    refcount = 1  (仅 strongThis)

T4  T2 的 lambda 体退出 → strongThis 析构 → refcount = 0
    ~ReanimatedModuleProxy 在 MAIN 同步触发
    → ~PropsRegistry → ShadowNode → ShadowNodeFamily → InstanceHandle 崩溃
```

### 最小复现 Demo

```tsx
import Animated, { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

function PageA() {
  const x = useSharedValue(0)
  useEffect(() => {
    x.value = withRepeat(withTiming(100, { duration: 16 }), -1, true)
  }, [])
  return <Animated.View style={{ transform: [{ translateX: x }] }} />
}

// 1. 进入 PageA,等动画跑 ≥ 1 秒(确保 UI 队列堆积 lambda)
// 2. 立即 navigate.replace('PageB') 或 back —— 不要 setTimeout
// 3. 反复进出,在低端机 / 弱网 / Hermes 配合下更易复现
```

---

## 修复

文件:
`oh_modules/.ohpm/@didi-wyc+react-native-reanimated@3.18.2-rc.2.1/oh_modules/@didi-wyc/react-native-reanimated/src/main/cpp/patches/NativeModules/ReanimatedModuleProxy.cpp`

### diff

```diff
 workletsModuleProxy_->getUIScheduler()->scheduleOnUI(
     [=, weakThis = weak_from_this()] {
-      const auto strongThis = weakThis.lock();
+      auto strongThis = weakThis.lock();
       if (!strongThis) {
         return;
       }
 #if JS_RUNTIME_HERMES
       const auto scope =
           jsi::Scope(strongThis->uiWorkletRuntime_->getJSIRuntime());
 #endif
       strongThis->uiWorkletRuntime_->runGuarded(shareableWorklet);
+      // Move the last strong ref of ReanimatedModuleProxy off the UI thread.
+      // PropsRegistry holds ShadowNode::Shared -> ShadowNodeFamily ->
+      // InstanceHandle, whose destruction must run on the JS/Fabric thread;
+      // releasing here would crash inside ~InstanceHandle during teardown.
+      auto jsScheduler = strongThis->workletsModuleProxy_->getJSScheduler();
+      jsScheduler->scheduleOnJS(
+          [keepAlive = std::move(strongThis)](jsi::Runtime &) mutable {
+            keepAlive.reset();
+          });
     });
```

### 修复后时序

T4 处:`strongThis` 已被 `std::move` 进 JS 线程的 lambda,本地变成空。
lambda 体退出 → 不发生析构。
JS 线程取出投递任务 → `keepAlive.reset()` → `~ReanimatedModuleProxy` 在 JS 线程跑 → 安全。

---

## 同模式风险点(本次未改)

同文件还有相同模式 lambda,理论上同样会触发,但概率更低:

| 函数 | 行 | 风险 |
|---|---|---|
| `registerEventHandler` | L309-322 | 仅注册时叠加销毁才中招 |
| `unregisterEventHandler` | L331-339 | 仅卸载事件时叠加销毁才中招 |

**已隐式安全的对照组:**

| 函数 | 行 | 安全原因 |
|---|---|---|
| `getViewProp` (NEW arch) | L407-424 | lambda 内 `scheduleOnJS([=]...)` 隐式带走 strongThis 副本到 JS 线程 |
| `getViewProp` (OLD arch) | L441-462 | 同上 |

如需统一收紧,把 register/unregister 两处套同样的 `keepAlive` 模式即可。

---

## 验证

### 日志验证(便宜)

在以下两处加 `gettid()`:

```cpp
// ReanimatedModuleProxy.cpp ~ReanimatedModuleProxy 入口
LOG(ERROR) << "[Reanim] ~Proxy tid=" << gettid();

// ReanimatedUIScheduler.cpp:18 lambda 入口
LOG(ERROR) << "[Reanim] UI lambda tid=" << gettid();
```

- **修复前**:崩溃前会看到 `~Proxy tid=` 与 UI lambda 同 tid。
- **修复后**:`~Proxy tid=` 与 JS 线程 tid 一致(或至少不同于 MAIN)。

### 真机回归(必跑)

按"最小复现 Demo"反复进出 100 次,无崩溃 → 通过。

---

## 备注

1. **会被覆盖**:本修复在 `oh_modules` 内,`ohpm install` 或升级
   `@didi-wyc/react-native-reanimated` 会覆盖。升级后必须 diff 检查。
2. **同类历史**:类似"异步任务残留 + 销毁"踩过的坑见
   `~/.claude/projects/-Users-didi-project-work-didi-harmony-drn-harmony/memory/crash_unregisterFromInspector.md`
   (`ReactInstance::unregisterFromInspector` assert 崩溃)。
3. **更彻底但更贵的方案**(暂未做):
   - 让 `PropsRegistry` 持有 ShadowNode 的 weak 引用,而非 strong。
   - 在 `~ReanimatedModuleProxy` 之前,由 owner 在 JS 线程显式清空
     `propsRegistry_`,然后才允许析构。
4. **上游对照**:本仓库的 `patches/.../ReanimatedModuleProxy.cpp` 是上游
   `Common/cpp/reanimated/NativeModules/ReanimatedModuleProxy.cpp` 的覆盖版本,
   `CMakeLists.txt:37` 只编 patches。上游对应版本同样有这个隐患。
