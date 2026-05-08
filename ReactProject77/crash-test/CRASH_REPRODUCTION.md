# PropsRegistry 析构崩溃复现指南

## 崩溃原理

### 调用链

```
scheduleOnUI lambda (UI 线程执行)
  → strongThis 离开作用域 (最后一个 shared_ptr 引用)
    → ReanimatedModuleProxy::~ReanimatedModuleProxy()
      → propsRegistry_.reset()
        → PropsRegistry::~PropsRegistry()
          → map_.clear() (释放 ShadowNode::Shared)
            → ShadowNode::~ShadowNode()
              → ShadowNodeFamily::~ShadowNodeFamily()
                → InstanceHandle 引用计数归零
                  → InstanceHandle::__on_zero_shared() ❌ CRASH
```

### 根本原因

1. **线程错误**：`InstanceHandle` 的析构必须在 **JS 线程**执行，但实际发生在 **UI 线程**
2. **时序问题**：`ReanimatedModuleProxy` 析构时，`uiWorkletRuntime_` 先于 `propsRegistry_` 销毁
3. **引用持有**：`scheduleOnUI` 的 lambda 通过 `[=, weakThis = weak_from_this()]` 捕获，可能持有最后一个引用

## 复现步骤

### 方法 1：使用 AnimatedComponent.tsx（推荐）

```bash
# 1. 在 App.tsx 中导入
import AnimatedComponent from './crash-test/AnimatedComponent';

# 2. 运行应用
npm run start

# 3. 进入动画页面，等待动画开始运行（约 1-2 秒）

# 4. 点击 "Reload（真正触发析构）⚠️" 按钮

# 5. 观察崩溃日志
```

**关键触发条件：**
- ✅ 多个并发动画正在运行（确保 PropsRegistry 中有 ShadowNode）
- ✅ 高频 `runOnUI()` 调度（确保 reload 时队列中有待执行 lambda）
- ✅ 使用 `DevSettings.reload()` 而非导航返回（确保 ReanimatedModuleProxy 真正析构）

### 方法 2：使用 PropsRegistryCrashDemo.tsx（精准控制）

```tsx
import PropsRegistryCrashDemo from './crash-test/PropsRegistryCrashDemo';

// 在导航中使用
<Stack.Screen name="CrashTest" component={PropsRegistryCrashDemo} />
```

**三种触发模式：**
1. **scheduleOnUI 递归**：高频调度 UI 任务，增加队列中有未执行 lambda 的概率
2. **持续动画**：确保 PropsRegistry 中持续有 ShadowNode 更新
3. **组合攻击**：同时使用上述两种方式（最易崩溃）

## 预期崩溃堆栈

```
Tid:39049, Name:idi.hmos.psnger
#00 std::__n1::__shared_ptr_emplace<facebook::react::InstanceHandle, ...>::__on_zero_shared()
#01 facebook::react::ShadowNodeFamily::~ShadowNodeFamily()
#02 facebook::react::ShadowNode::~ShadowNode()
#03 std::__n1::__shared_ptr_emplace<reanimated::PropsRegistry, ...>::__on_zero_shared()
#04 reanimated::ReanimatedModuleProxy::~ReanimatedModuleProxy()
#05 std::__n1::__function::__func<...scheduleOnUI...::$_9, ...>::operator()()
#06 void folly::detail::function::call_<rnoh::ReanimatedUIScheduler::scheduleOnUI...>()
#07 rnoh::EventLoopTaskRunner::executeTask()
#08 rnoh::NapiTaskRunner::executeTask()
#09 pc 000000000001a628 /system/lib64/platformsdk/libuv.so(uv__async_io+428)
```

## 为什么导航返回不会崩溃？

导航返回（`navigation.goBack()`）只是**卸载 React 组件**，不会销毁 `ReanimatedModuleProxy`：
- React 组件卸载 → 动画停止
- 但 `ReanimatedModuleProxy` 仍然存活（由 ReactInstance 持有）
- 只有 `DevSettings.reload()` 才会销毁整个 ReactInstance → 触发 `ReanimatedModuleProxy` 析构

## 验证崩溃是否修复

修复后，以下操作应该**不再崩溃**：
1. 进入动画页面
2. 等待动画运行 3-5 秒
3. 点击 Reload 按钮
4. 应用应该正常重启，不会 crash

## 调试技巧

### 1. 查看 PropsRegistry 析构日志

在 `PropsRegistry.cpp:9` 中已添加日志：
```cpp
DLOG(INFO) << "PropsRegistry::~PropsRegistry destroyed on thread: " << threadName 
           << " (tid: " << pthread_self() << ", map size: " << map_.size() 
           << ", removable nodes: " << removableShadowNodes_.size() << ")";
```

**预期输出（崩溃前）：**
```
PropsRegistry::~PropsRegistry destroyed on thread: idi.hmos.psnger (tid: 39049, map size: 5, removable nodes: 0)
```

如果看到 `map size > 0`，说明 PropsRegistry 析构时仍持有 ShadowNode 引用。

### 2. 增加 scheduleOnUI 日志

在 `ReanimatedModuleProxy.cpp:261-264` 中已添加：
```cpp
char threadName[16];
pthread_getname_np(pthread_self(), threadName, sizeof(threadName));
DLOG(INFO) << "ReanimatedModuleProxy::scheduleOnUI created on thread: " << threadName;
```

### 3. 使用 hdc 查看崩溃日志

```bash
# 实时查看日志
hdc shell hilog | grep -E "PropsRegistry|ReanimatedModuleProxy|CRASH"

# 查看崩溃堆栈
hdc shell hilog -x | grep -A 30 "CRASH"
```

## 相关文件

- `AnimatedComponent.tsx` - 基础崩溃复现（带详细注释）
- `PropsRegistryCrashDemo.tsx` - 精准控制的崩溃复现
- `CrashDemo.tsx` - 导航容器（可选）
- `didi0428.txt` - 真实崩溃堆栈示例

## 修复方案参考

见 `opus4.7.md` 中的详细分析和三种修复方案。
