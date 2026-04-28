# Reanimated Crash Demo 设计文档

**日期：** 2026-04-28  
**目的：** 创建一个完整的 crash 复现 demo，用于测试 react-native-reanimated PropsRegistry 析构崩溃的修复方案

---

## 1. 崩溃背景

### 1.1 崩溃根因

**崩溃堆栈（didi0428.txt）：**

```
#00 std::__n1::__shared_ptr_emplace<facebook::react::InstanceHandle, ...>::__on_zero_shared()
#01 facebook::react::ShadowNodeFamily::~ShadowNodeFamily()
#02 facebook::react::ShadowNode::~ShadowNode()
#03 std::__n1::__shared_ptr_emplace<reanimated::PropsRegistry, ...>::__on_zero_shared()
#04 reanimated::ReanimatedModuleProxy::~ReanimatedModuleProxy()
#05 scheduleOnUI lambda 执行
...
```

**根本原因：**

- `ReanimatedModuleProxy` 析构时，`uiWorkletRuntime_` 先被销毁（在 `invalidate()` 中）
- 但 `propsRegistry_` 中仍持有 `ShadowNode::Shared` 引用
- 当 `propsRegistry_` 析构时，`ShadowNode` 开始析构
- `ShadowNode` 析构触发 `ShadowNodeFamily` → `InstanceHandle` 引用计数归零
- 但此时 `uiWorkletRuntime_` 已销毁，InstanceHandle 无法安全释放 → 崩溃

### 1.2 成员变量析构顺序问题

**ReanimatedModuleProxy.h 成员声明顺序：**

```cpp
std::shared_ptr<WorkletRuntime> uiWorkletRuntime_;   // line 215
// ...
std::shared_ptr<PropsRegistry> propsRegistry_;       // line 235
```

**C++ 析构规则：**

- 成员变量按声明逆序析构
- 先析构 `propsRegistry_`（line 235），后析构 `uiWorkletRuntime_`（line 215）
- **违背依赖关系：PropsRegistry 需要 uiWorkletRuntime 存活才能安全析构 ShadowNode**

---

## 2. Demo 设计方案

### 2.1 方案选择

**选定方案：方案 1 - React Navigation 导航卸载 Demo**

**理由：**

- ✅ 最接近真实场景（用户在动画进行中退出页面）
- ✅ 项目中已集成 React Navigation，实施成本低
- ✅ 易于重复测试和验证修复方案
- ✅ 可扩展为多种崩溃场景

### 2.2 核心设计思路

**崩溃触发流程：**

```
1. 用户进入动画页面
2. 多个并发动画启动（Spring + Timing + DerivedValue）
3. scheduleOnUI 调度异步任务到 UI 线程
4. 用户点击"返回"按钮
5. navigation.goBack() 触发组件卸载
6. ReanimatedModuleProxy 开始析构
7. invalidate() 销毁 uiWorkletRuntime_
8. PropsRegistry 析构 → ShadowNode 析构
9. InstanceHandle 引用已释放的 runtime → 崩溃！
```

---

## 3. 文件结构

### 3.1 新建文件

```
ReactProject77/crash-test/
├── AnimatedComponent.tsx          # 动画组件（触发崩溃）
│   功能：
│   - 创建多个 useSharedValue 动画值
│   - 启动并发动画（Spring、Timing、DerivedValue）
│   - 使用 useAnimatedStyle 创建样式
│   - 在组件卸载时动画仍在运行（关键触发点）
│
├── CrashDemo.tsx                  # 主控制组件
│   功能：
│   - React Navigation Stack Navigator
│   - 主页：进入崩溃测试按钮 + 说明文字
│   - 动画页面：AnimatedComponent + 返回按钮
│   - 返回按钮触发 navigation.goBack()
│
└── README.md                      # 使用说明
    内容：
    - 如何运行 demo
    - 如何触发崩溃
    - 如何验证修复方案
    - 预期崩溃行为说明
```

### 3.2 修改文件

**App.tsx:**

```typescript
// 修改内容：
- 导入 CrashDemo 组件
- 替换当前简单 Text 为 CrashDemo 导航
- 添加快速访问崩溃测试的入口
```

---

## 4. AnimatedComponent 设计详细

### 4.1 动画类型

**并发动画场景：**

1. **Spring 动画：**

   ```typescript
   const translateX = useSharedValue(0);
   const scale = useSharedValue(1);

   // 持续弹跳动画（无限循环）
   translateX.value = withRepeat(
     withSequence(
       withSpring(100, { damping: 10 }),
       withSpring(-100, { damping: 10 }),
     ),
     -1, // infinite
     true, // reverse
   );
   ```

2. **Timing 动画：**

   ```typescript
   const rotation = useSharedValue(0);

   // 无限旋转
   rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1, false);
   ```

3. **DerivedValue 动画：**

   ```typescript
   const progress = useSharedValue(0);

   const opacity = useDerivedValue(() => {
     return 0.5 + progress.value * 0.5;
   });

   // progress 无限循环
   progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
   ```

4. **scheduleOnUI 异步任务（可选）：**
   ```typescript
   // 手动调度 UI 线程任务
   runOnUI(() => {
     "worklet";
     // 在 UI 线程执行的代码
     // 析构时这个任务可能还在队列中
   })();
   ```

### 4.2 组件结构

```typescript
export default function AnimatedComponent() {
  // 1. 创建动画值
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);

  // 2. 创建派生值
  const opacity = useDerivedValue(() => {
    return 0.5 + progress.value * 0.5;
  });

  // 3. 创建动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  // 4. 启动动画（组件挂载时）
  useEffect(() => {
    // 启动所有并发动画
    translateX.value = withRepeat(...);
    rotation.value = withRepeat(...);
    progress.value = withRepeat(...);

    // 可选：调度 UI 线程任务
    runOnUI(() => { 'worklet'; })();
  }, []);

  // 5. 渲染动画元素
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text>动画运行中...</Text>
      </Animated.View>

      <Button title="返回（触发崩溃）" onPress={...} />
    </View>
  );
}
```

---

## 5. CrashDemo 导航设计

### 5.1 导航结构

```typescript
const Stack = createNativeStackNavigator();

export default function CrashDemo() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Reanimated 崩溃测试' }}
        />
        <Stack.Screen
          name="Animation"
          component={AnimationScreen}
          options={{ title: '动画页面' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 5.2 页面设计

**HomeScreen:**

```typescript
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reanimated PropsRegistry 崩溃测试</Text>

      <Text style={styles.description}>
        点击下方按钮进入动画页面，在动画运行中点击返回触发崩溃
      </Text>

      <Button
        title="进入崩溃测试"
        onPress={() => navigation.navigate('Animation')}
      />

      <Text style={styles.warning}>
        ⚠️ 未修复版本会在返回时崩溃
      </Text>
    </View>
  );
}
```

**AnimationScreen:**

```typescript
function AnimationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AnimatedComponent />

      <Button
        title="返回（触发崩溃）"
        onPress={() => navigation.goBack()}
        color="red"
      />

      <Text style={styles.hint}>
        在动画运行时点击返回，观察是否崩溃
      </Text>
    </View>
  );
}
```

---

## 6. 修复验证逻辑

### 6.1 测试步骤

**未修复版本测试：**

```
1. 运行 demo
2. 进入动画页面
3. 等待动画启动（观察方块移动/旋转/缩放）
4. 点击"返回（触发崩溃）"
5. 观察：应用应该崩溃退出
6. 检查崩溃日志：tests/crash/ 目录应生成新日志文件
```

**修复版本测试：**

```
1. 应用修复方案：
   - 方案1：在 invalidate() 中添加 propsRegistry_->clear()
   - 方案2：调整成员变量声明顺序
2. 重新编译运行
3. 进入动画页面
4. 点击"返回"
5. 观察：应正常返回主页，无崩溃
6. 多次测试：快速进出 10+ 次，验证稳定性
```

### 6.2 测试矩阵

| 测试场景        | 未修复版本 | 方案1修复 | 方案2修复 |
| --------------- | ---------- | --------- | --------- |
| 单次返回        | 崩溃       | ✅ 正常   | ✅ 正常   |
| 快速进出 5 次   | 崩溃       | ✅ 正常   | ✅ 正常   |
| 快速进出 10+ 次 | 崩溃       | ✅ 正常   | ✅ 正常   |
| 动画运行中返回  | 崩溃       | ✅ 正常   | ✅ 正常   |
| 多动画并发返回  | 崩溃       | ✅ 正常   | ✅ 正常   |

### 6.3 崩溃检测方法

**OpenHarmony 设备：**

```bash
# 检查崩溃日志目录
ls tests/crash/

# 预期看到崩溃日志文件
# 文件名格式：<timestamp>.txt 或 <appid>.log

# 查看崩溃堆栈
cat tests/crash/<logfile>.txt | grep -A 20 "ShadowNode"
```

**控制台输出：**

```
崩溃时可能看到：
- SIGSEGV (Segmentation fault)
- __on_zero_shared
- InstanceHandle
- PropsRegistry
```

**应用行为：**

```
崩溃表现：
- 应用异常退出
- 应用冻结/无响应
- 设备重启应用
```

---

## 7. README.md 内容

### 7.1 快速开始

```markdown
# Reanimated PropsRegistry 崩溃复现 Demo

## 目的

测试 react-native-reanimated 3.18.2 在 OpenHarmony 上的 PropsRegistry 析构崩溃问题

## 运行步骤

1. cd ReactProject77
2. npm start
3. hdc rport tcp:8081 tcp:8081
4. 在 DevEco Studio 运行应用
5. 点击"进入崩溃测试"
6. 观察动画运行
7. 点击"返回（触发崩溃）"

## 预期崩溃行为

- 应用异常退出
- tests/crash/ 目录生成崩溃日志
- 堆栈包含 ShadowNodeFamily、PropsRegistry、InstanceHandle

## 修复验证

1. 应用修复方案（修改 ReanimatedModuleProxy.cpp）
2. 重新编译运行
3. 多次进出测试
4. 验证无崩溃
```

---

## 8. 实施计划概要

### 8.1 实施步骤

1. **创建目录和文件结构**
   - 创建 crash-test/ 目录
   - 创建 AnimatedComponent.tsx
   - 创建 CrashDemo.tsx
   - 创建 README.md

2. **修改 App.tsx**
   - 导入 CrashDemo
   - 配置导航

3. **测试未修复版本**
   - 运行 demo
   - 触发崩溃
   - 收集崩溃日志

4. **应用修复方案**
   - 方案1：修改 invalidate() 方法
   - 方案2：调整成员变量顺序

5. **验证修复效果**
   - 多次测试
   - 确认崩溃消失
   - 检查内存泄漏

---

## 9. 技术约束和风险

### 9.1 约束条件

- **依赖：** React Navigation（项目中已集成）
- **平台：** OpenHarmony OS
- **版本：** react-native-reanimated 3.18.2
- **运行时：** Hermes

### 9.2 风险评估

| 风险             | 影响 | 缓解措施                        |
| ---------------- | ---- | ------------------------------- |
| 无法稳定复现崩溃 | 中   | 增加动画复杂度和并发数          |
| 崩溃时机不确定   | 低   | 添加多次测试和自动化脚本        |
| 导航集成问题     | 低   | 使用项目已有的 React Navigation |
| 修复方案不完善   | 高   | 多种修复方案对比测试            |

---

## 10. 成功标准

### 10.1 功能标准

- ✅ Demo 能稳定触发崩溃（未修复版本）
- ✅ 崩溃堆栈与 didi0428.txt 一致
- ✅ 修复方案能完全消除崩溃
- ✅ 多次测试无内存泄漏

### 10.2 测试标准

- ✅ 至少 10 次进出测试无崩溃（修复后）
- ✅ 崩溃日志清晰可读
- ✅ README 文档完整准确

---

## 11. 附录

### 11.1 相关文件路径

```
崩溃日志：
- tests/crash/didi0428.txt

源码位置：
- harmony/oh_modules/@react-native-ohos/react-native-reanimated/
  src/main/cpp/patches/NativeModules/ReanimatedModuleProxy.cpp (line 234-243)

修复位置：
- ReanimatedModuleProxy::invalidate() 方法
```

### 11.2 修复代码示例

**方案1（推荐）：**

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

---

**文档版本：** v1.0  
**最后更新：** 2026-04-28  
**作者：** OpenCode AI Assistant
