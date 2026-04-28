# Reanimated PropsRegistry 崩溃复现 Demo

## 目的

测试 react-native-reanimated 3.18.2 在 OpenHarmony 上的 PropsRegistry 析构崩溃问题。

## 崩溃背景

### 根本原因

ReanimatedModuleProxy 析构时,成员变量析构顺序违背依赖关系:

- `uiWorkletRuntime_` 先被销毁(在 invalidate() 中)
- 但 `propsRegistry_` 中仍持有 `ShadowNode::Shared` 引用
- `ShadowNode` 析构触发 `InstanceHandle` 引用计数归零
- InstanceHandle 无法安全释放 → 崩溃!

### 崩溃堆栈(参考)

```
#00 **shared_ptr_emplace<InstanceHandle>::**on_zero_shared()
#01 ShadowNodeFamily::~ShadowNodeFamily()
#02 ShadowNode::~ShadowNode()
#03 PropsRegistry析构
#04 ReanimatedModuleProxy::~ReanimatedModuleProxy()
#05 scheduleOnUI lambda 执行
```

## 运行步骤

### 1. 启动应用

```bash
cd ReactProject77
npm start
```

### 2. 端口转发

```bash
hdc rport tcp:8081 tcp:8081
```

### 3. 在 OpenHarmony 设备上运行

在 DevEco Studio 中运行应用。

### 4. 触发崩溃

**重要：理解触发方式**

ReanimatedModuleProxy 是 TurboModule（全局单例），生命周期绑定到 ReactInstance：
- ❌ **React Navigation 返回不会触发析构** - 只是页面导航，ReactInstance 仍存活
- ✅ **Reload 会触发析构** - 销毁整个 ReactInstance，触发 TurboModule 析构

**正确的测试步骤：**

1. 点击"进入崩溃测试"
2. 观察动画页面中的多个并发动画:
   - 方块左右弹跳(Spring)
   - 方块大小变化(Spring)
   - 方块旋转(Timing)
   - 透明度变化(DerivedValue)
3. **点击"Reload（真正触发析构）"按钮** ⚠️
   - 这会调用 DevSettings.reload()
   - 强制重新加载整个 RN 环境
   - 销毁旧的 ReactInstance → 触发 ReanimatedModuleProxy 析构
4. **观察崩溃行为:**
   - 未修复版本: 应用在 reload 时崩溃
   - 修复版本: 正常 reload，应用重新启动

**对比测试:**
- 点击"返回主页（不触发析构）" → 只是导航返回，不会崩溃
- 点击"Reload（真正触发析构）" → 才会触发析构崩溃

## 检查崩溃日志

```bash
# 查看崩溃日志目录
ls tests/crash/

# 查看最新崩溃日志
cat tests/crash/*.txt | grep -A 20 "ShadowNode"

# 预期看到:
# - ShadowNodeFamily::~ShadowNodeFamily
# - InstanceHandle::__on_zero_shared
# - PropsRegistry
```

## 修复验证

### 方案 1(推荐)

修改 `ReanimatedModuleProxy.cpp` 的 `invalidate()` 方法:

```cpp
void ReanimatedModuleProxy::invalidate() {
  eventHandlerRegistry_.reset();
  frameCallbacks_.clear();
#ifdef RCT_NEW_ARCH_ENABLED
  operationsInBatch_.clear();

  // 🔧 FIX: 清空 PropsRegistry 以释放 ShadowNode 引用
  if (propsRegistry_) {
    propsRegistry_->clear();
  }
#endif
  uiWorkletRuntime_.reset();
}
```

### 测试修复效果

1. 应用修复方案
2. 重新编译运行
3. 多次进出动画页面(至少 10 次)
4. 验证无崩溃
5. 检查内存是否正常释放

## 技术细节

### Demo 设计

- **React Navigation:** 模拟真实应用导航场景
- **并发动画:** Spring + Timing + DerivedValue,模拟复杂动画场景
- **崩溃触发时机:** 在动画运行中触发组件卸载

### 关键代码路径

- 崩溃日志:`tests/crash/didi0428.txt`
- 源码位置:`harmony/oh_modules/@react-native-ohos/react-native-reanimated/.../ReanimatedModuleProxy.cpp`
- 修复位置:`ReanimatedModuleProxy::invalidate()` 方法(line 234-243)

## 预期行为

| 版本       | 行为         | 崩溃日志   |
| ---------- | ------------ | ---------- |
| 未修复版本 | 应用崩溃退出 | 有崩溃日志 |
| 修复版本   | 正常返回主页 | 无崩溃日志 |

## 相关文件

- 设计文档:`docs/superpowers/specs/2026-04-28-reanimated-crash-demo-design.md`
- 实施计划:`docs/superpowers/plans/2026-04-28-reanimated-crash-demo-implementation.md`

## 版本信息

- React Native: 0.77.1
- react-native-reanimated: 3.18.0
- React Navigation: 7.1.14
- OpenHarmony: HarmonyOS NEXT
