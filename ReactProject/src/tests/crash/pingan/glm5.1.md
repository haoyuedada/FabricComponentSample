## Crash 原因分析
### 崩溃栈解读
关键帧 #13~#22 反复出现 ShareableWorklet::toJSValue 和 ShareableObject::toJSValue 交替递归调用：
#13 ShareableWorklet::toJSValue+256
#14 ShareableObject::toJSValue+184
#15 ShareableObject::toJSValue+184
#16 ShareableWorklet::toJSValue+188
#17 ShareableObject::toJSValue+184
#18 ShareableObject::toJSValue+184
#19 ShareableWorklet::toJSValue+188
#20 ShareableObject::toJSValue+184
#21 ShareableObject::toJSValue+184
#22 ShareableWorklet::toJSValue+188
最终在 libhermes.so 中栈溢出崩溃。
### 根因
Shareable 对象图中存在循环引用，而 toJSValue() 没有环检测机制。
### 调用链路：
1. ShareableWorklet::toJSValue() (Shareables.cpp:254) → 调用 ShareableObject::toJSValue(rt) 将 worklet 的所有属性转为 JS 对象
2. ShareableObject::toJSValue() (Shareables.cpp:234) → 遍历 data_，对每个属性调用 getJSValue(rt)
3. 如果某个属性值也是 ShareableWorklet，则递归回到步骤 1
4. 如果 worklet A 的属性引用了 worklet B，而 B 又引用了 A（或形成了更长的环），则无限递归导致栈溢出
原始 Android/iOS 实现也没有环检测，同样存在此问题。但崩溃是否触发取决于 worklet 的实际数据结构是否存在环。平安场景中业务代码的 worklet 闭包捕获了形成环引用的对象（如 worklet 属性中嵌套引用了包含自身引用的 shareable 对象），从而触发了此问题。
### 解决方案
在 Shareable::getJSValue / toJSValue 转换过程中添加环检测。具体做法是给 Shareable 基类增加一个运行时标记，在转换期间标记"正在转换"，遇到已标记的对象则短路返回：
// Shareables.h - Shareable 基类增加:
class Shareable {
protected:
    std::atomic<bool> isConverting_{false}; // 环检测标记
    
    virtual jsi::Value toJSValue(jsi::Runtime &rt) = 0;
    
public:
    virtual jsi::Value getJSValue(jsi::Runtime &rt) {
        if (isConverting_.exchange(true)) {
            // 检测到环引用，返回 undefined 避免无限递归
            return jsi::Value();
        }
        auto value = toJSValue(rt);
        isConverting_ = false;
        return value;
    }
};
### 备选方案：若不想修改基类，可以在 ShareableObject::toJSValue 和 ShareableWorklet::toJSValue 中用线程局部存储（thread_local）维护一个 std::unordered_set<Shareable*> 来检测环：
jsi::Value ShareableObject::toJSValue(jsi::Runtime &rt) {
    thread_local std::unordered_set<Shareable*> visited;
    if (!visited.insert(this).second) {
        return jsi::Value(); // 环引用，返回 undefined
    }
    auto obj = jsi::Object(rt);
    for (size_t i = 0, size = data_.size(); i < size; i++) {
        obj.setProperty(rt, data_[i].first.c_str(), data_[i].second->getJSValue(rt));
    }
    visited.erase(this);
    return obj;
}
### 推荐使用 thread_local 方案，原因是：
1. 不修改基类，侵入性更小
2. 在递归返回后正确清理 visited 集合，允许同一对象在不同分支独立转换
3. thread_local 保证线程安全，无需加锁
### 需要修改的文件：Shareables.cpp 中的 ShareableObject::toJSValue 和 ShareableWorklet::toJSValue（Worklet 继承自 ShareableObject，如果 ShareableObject 已有环检测则 Worklet 自动受益）。