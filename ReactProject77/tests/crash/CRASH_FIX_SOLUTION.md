# PropsRegistry 析构崩溃修复方案

## 问题确认

通过日志分析，确认了崩溃的根本原因：

### 崩溃时序（滴滴场景）

```
1. 页面切换 → JS runtime 释放 __reanimatedModuleProxy (HostObject)
2. ReanimatedModuleProxy 引用计数降为 1（只剩 UI 线程 lambda 中的 strongThis）
3. UI 线程执行 scheduleOnUI lambda，weakThis.lock() 获得 strongThis (use_count=1)
4. lambda 执行完毕，strongThis 离开作用域
5. 触发 ReanimatedModuleProxy::~ReanimatedModuleProxy() 在 UI 线程
6. uiWorkletRuntime_.reset() 先执行
7. propsRegistry_ 析构 → ShadowNode 析构 → InstanceHandle 析构
8. InstanceHandle 尝试在 UI 线程释放 JSI 对象 → CRASH
```

### 正常时序（你的 demo）

```
1. 页面切换 → JS runtime 释放 __reanimatedModuleProxy
2. 但此时 UI 线程 lambda 已执行完（或 use_count > 1）
3. 最后一个引用在 JS 线程释放
4. 析构在 JS 线程执行 → 正常
```

**核心问题：** `ReanimatedModuleProxy` 的析构可能在 UI 线程执行，导致 `PropsRegistry` 中的 `ShadowNode` 在错误线程释放。

---

## 修复方案

### 方案 1：确保 PropsRegistry 在析构前清空（推荐）

**原理：** 在 `uiWorkletRuntime_` 销毁前，先清空 `propsRegistry_` 中的 ShadowNode 引用，避免它们在 runtime 销毁后才析构。

**实现：**

```cpp
// ReanimatedModuleProxy.cpp 析构函数
ReanimatedModuleProxy::~ReanimatedModuleProxy() {
  char threadName[16];
  pthread_getname_np(pthread_self(), threadName, sizeof(threadName));
  LOG(INFO) << "[Reanimated] ~ReanimatedModuleProxy START on thread: " << threadName
            << " (tid: " << gettid() << ")";

  eventHandlerRegistry_.reset();
  frameCallbacks_.clear();

#ifdef RCT_NEW_ARCH_ENABLED
  operationsInBatch_.clear();
  
  // 🔧 关键修复：在 uiWorkletRuntime_ 销毁前清空 PropsRegistry
  if (propsRegistry_) {
    auto lock = propsRegistry_->createLock();
    propsRegistry_->clear();  // 需要添加 clear() 方法
    LOG(INFO) << "[Reanimated] ~ReanimatedModuleProxy cleared propsRegistry";
  }
#endif

  uiWorkletRuntime_.reset();
  LOG(INFO) << "[Reanimated] ~ReanimatedModuleProxy DONE";
}
```

**PropsRegistry 添加 clear() 方法：**

```cpp
// PropsRegistry.h
class PropsRegistry {
 public:
  // ... 现有方法 ...
  
  void clear() {
    map_.clear();
    removableShadowNodes_.clear();
  }
  
  // ...
};
```

**优点：**
- 简单直接，修改最小
- 确保 ShadowNode 在 runtime 有效时释放
- 不改变析构发生的线程

**缺点：**
- 如果 ShadowNode 的析构本身依赖 runtime，仍可能有问题（但从日志看没有）

---

### 方案 2：使用自定义 deleter 确保析构在 JS 线程

**原理：** 让 `ReanimatedModuleProxy` 的 `shared_ptr` 使用自定义 deleter，将实际析构调度到 JS 线程执行。

**实现：**

```cpp
// RNRuntimeDecorator.cpp
void RNRuntimeDecorator::decorate(
    jsi::Runtime &rnRuntime,
    const std::shared_ptr<ReanimatedModuleProxy> &reanimatedModuleProxy) {
  
  // 获取 JS scheduler
  auto jsScheduler = reanimatedModuleProxy->getWorkletsModuleProxy()->getJSScheduler();
  
  // 创建带自定义 deleter 的 shared_ptr
  auto safeProxy = std::shared_ptr<ReanimatedModuleProxy>(
      reanimatedModuleProxy.get(),
      [jsScheduler, originalPtr = reanimatedModuleProxy](ReanimatedModuleProxy* ptr) {
        // 当引用计数归零时，将析构调度到 JS 线程
        if (originalPtr.use_count() == 1) {
          LOG(INFO) << "[Reanimated] Scheduling ~ReanimatedModuleProxy on JS thread";
          jsScheduler->scheduleOnJS([originalPtr = std::move(originalPtr)](jsi::Runtime&) {
            // originalPtr 在这里析构，确保在 JS 线程
            LOG(INFO) << "[Reanimated] ~ReanimatedModuleProxy executing on JS thread";
          });
        }
      });
  
  rnRuntime.global().setProperty(
      rnRuntime,
      "__reanimatedModuleProxy",
      jsi::Object::createFromHostObject(rnRuntime, safeProxy));
}
```

**优点：**
- 从根本上解决线程问题
- 不需要修改析构函数

**缺点：**
- 实现复杂，容易引入新 bug
- 需要确保 jsScheduler 在析构时仍有效
- 可能导致析构延迟

---

### 方案 3：PropsRegistry 使用 weak_ptr 持有 ShadowNode

**原理：** `PropsRegistry` 不持有 ShadowNode 的强引用，只在需要时通过 `weak_ptr` 访问。

**实现：**

```cpp
// PropsRegistry.h
class PropsRegistry {
 private:
  // 改为 weak_ptr
  std::unordered_map<Tag, std::pair<ShadowNode::Weak, folly::dynamic>> map_;
  std::unordered_map<Tag, ShadowNode::Weak> removableShadowNodes_;
  // ...
};

// PropsRegistry.cpp
void PropsRegistry::update(
    const ShadowNode::Shared &shadowNode,
    folly::dynamic &&props) {
  const auto tag = shadowNode->getTag();
  const auto it = map_.find(tag);
  if (it == map_.cend()) {
    map_[tag] = std::make_pair(shadowNode, props);  // 隐式转换为 weak_ptr
  } else {
    it->second.second.update(props);
  }
}

void PropsRegistry::for_each(std::function<void(
                                const ShadowNodeFamily &family,
                                const folly::dynamic &props)> callback) const {
  for (const auto &[_, value] : map_) {
    if (auto shadowNode = value.first.lock()) {  // 尝试获取强引用
      callback(shadowNode->getFamily(), value.second);
    }
  }
}
```

**优点：**
- 彻底避免 PropsRegistry 持有 ShadowNode 导致的析构问题
- 符合"注册表不应持有对象所有权"的设计原则

**缺点：**
- 需要大量修改 PropsRegistry 的使用代码
- 可能影响性能（每次访问都需要 lock）
- 需要处理 ShadowNode 已失效的情况

---

## 推荐方案：方案 1 + 防御性检查

结合方案 1 的简单性和额外的防御措施：

```cpp
ReanimatedModuleProxy::~ReanimatedModuleProxy() {
  char threadName[16];
  pthread_getname_np(pthread_self(), threadName, sizeof(threadName));
  
  // 检查是否在 UI 线程析构（不应该发生，但加防御）
  bool isUIThread = (strcmp(threadName, "xample.fabric77") == 0 || 
                     strstr(threadName, "MainThread") != nullptr);
  
  if (isUIThread) {
    LOG(ERROR) << "[Reanimated] ~ReanimatedModuleProxy on UI thread " << threadName
               << " — this is a bug! Destructor should run on JS thread.";
  }

  eventHandlerRegistry_.reset();
  frameCallbacks_.clear();

#ifdef RCT_NEW_ARCH_ENABLED
  operationsInBatch_.clear();
  
  // 清空 PropsRegistry，避免 ShadowNode 在 runtime 销毁后析构
  if (propsRegistry_) {
    auto lock = propsRegistry_->createLock();
    size_t mapSize = propsRegistry_->getMapSize();
    if (mapSize > 0) {
      LOG(WARNING) << "[Reanimated] ~ReanimatedModuleProxy clearing " << mapSize 
                   << " ShadowNodes from PropsRegistry";
      propsRegistry_->clear();
    }
  }
#endif

  LOG(INFO) << "[Reanimated] ~ReanimatedModuleProxy about to reset uiWorkletRuntime_";
  uiWorkletRuntime_.reset();
  
  LOG(INFO) << "[Reanimated] ~ReanimatedModuleProxy DONE on thread: " << threadName;
}
```

**PropsRegistry 添加方法：**

```cpp
// PropsRegistry.h
class PropsRegistry {
 public:
  void clear() {
    map_.clear();
    removableShadowNodes_.clear();
  }
  
  size_t getMapSize() const {
    return map_.size();
  }
  
  // ...
};
```

---

## 实施步骤

1. **添加 PropsRegistry::clear() 方法**
2. **修改 ReanimatedModuleProxy 析构函数**，在 `uiWorkletRuntime_.reset()` 前调用 `propsRegistry_->clear()`
3. **保留现有日志**，监控生产环境是否还有 UI 线程析构的情况
4. **测试验证**：
   - 正常页面切换不 crash
   - reload 不 crash
   - 应用退出不 crash
5. **长期监控**：通过日志确认析构始终在 JS 线程，如果仍有 UI 线程析构，考虑方案 2

---

## 为什么方案 1 有效

从日志分析：
- `PropsRegistry` 析构时 `map size: 1, removable nodes: 1`
- `ShadowNode use_count=2`（在 map 和 removableShadowNodes 中各一份）

当 `propsRegistry_->clear()` 被调用时：
1. `map_.clear()` 释放 map 中的 ShadowNode 引用（use_count: 2→1）
2. `removableShadowNodes_.clear()` 释放最后一个引用（use_count: 1→0）
3. **ShadowNode 在此时析构**，此时 `uiWorkletRuntime_` 仍然有效
4. 后续 `uiWorkletRuntime_.reset()` 时，PropsRegistry 已经是空的
5. `propsRegistry_` 自身的析构只是释放空容器，不会触发 ShadowNode 析构

这样就避免了 ShadowNode 在 runtime 销毁后才析构的问题。
