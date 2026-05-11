# Crash 分析                                                                                                                                                                                                         
                                                                                                                                                                                                                     
 ## 根本原因：递归栈溢出 (Stack Overflow)                                                                                                                                                                              
                                                                                                                                                                                                                     
  从堆栈可以清晰看到 ShareableWorklet::toJSValue 和 ShareableObject::toJSValue 之间形成了无限递归调用：                                                                                                              
                                                                                                                                                                                                                     
  #13 ShareableWorklet::toJSValue  ← 调用 ShareableObject::toJSValue                                                                                                                                                 
  #14 ShareableObject::toJSValue   ← 遍历属性，某个属性又是 ShareableWorklet                                                                                                                                         
  #15 ShareableObject::toJSValue   ← 嵌套对象                                                                                                                                                                        
  #16 ShareableWorklet::toJSValue  ← 又一个 worklet 属性                                                                                                                                                             
  #17 ShareableObject::toJSValue                                                                                                                                                                                     
  #18 ShareableObject::toJSValue                                                                                                                                                                                     
  #19 ShareableWorklet::toJSValue                                                                                                                                                                                    
  ... (不断重复)                                                                                                                                                                                                     
                                                                                                                                                                                                                     
##  调用链分析                                                                                                                                                                                                         
                                                                                                                                                                                                                     
  看源码 (Shareables.cpp:245-255)：                                                                                                                                                                                  
                  
  jsi::Value ShareableWorklet::toJSValue(jsi::Runtime &rt) {                                                                                                                                                         
    jsi::Value obj = ShareableObject::toJSValue(rt);  // 先调父类                                                                                                                                                    
    return getValueUnpacker(rt).call(rt, obj, ...);                                                                                                                                                                  
  }                                                                                                                                                                                                                  
                                                                                                                                                                                                                     
  而 ShareableObject::toJSValue (Shareables.cpp:222-234)：                                                                                                                                                           
                  
  jsi::Value ShareableObject::toJSValue(jsi::Runtime &rt) {                                                                                                                                                          
    auto obj = jsi::Object(rt);                                                                                                                                                                                      
    for (size_t i = 0, size = data_.size(); i < size; i++) {                                                                                                                                                         
      obj.setProperty(rt, ..., data_[i].second->toJSValue(rt));  // 递归展开每个属性                                                                                                                                 
    }                                                                                                                                                                                                                
    return obj;                                                                                                                                                                                                      
  }                                                                                                                                                                                                                  
                  
  当一个 Worklet 对象的属性中引用了另一个 Worklet（或包含 Worklet 的对象），就会形成深度递归。如果 JS 侧的 worklet 闭包捕获了大量嵌套的 worklet/对象（例如深层嵌套的动画组合、或 worklet                             
  之间互相引用），递归深度会超过线程栈大小限制，导致 native crash。
                                                                                                                                                                                                                     
##  触发场景                                                                                                                                                                                                           
  
  这通常发生在：                                                                                                                                                                                                     
  1. 深度嵌套的动画组合 — 多个 useAnimatedStyle / useDerivedValue 嵌套引用
  2. Worklet 闭包捕获了大型对象图 — worklet 函数内引用了包含其他 worklet 的复杂对象                                                                                                                                  
  3. 循环引用 — 虽然 makeShareableClone 不会直接产生循环，但深层嵌套足以耗尽栈空间 
                                                                                                                                                                                                                     
##  解决方案                                                                                                                                                                                                           
                                                                                                                                                                                                                     
###  方案 1：减少 JS 侧 worklet 嵌套深度（推荐，应用层修复）                                                                                                                                                            
                                                                                                                                                                                                                     
  - 避免在 worklet 闭包中捕获包含其他 worklet 的大型对象                                                                                                                                                             
  - 将深度嵌套的动画拆分为独立的 shared value，减少单个 worklet 的闭包大小
  - 使用 useSharedValue 传递简单数据而非复杂对象树                                                                                                                                                                   
                                                                                                                                                                                                                     
###  方案 2：在 native 层增加递归深度保护（库层修复）                                                                                                                                                                   
                                                                                                                                                                                                                     
  在 ShareableObject::toJSValue 中添加递归深度检测：                                                                                                                                                                 
                  
  // 在 Shareables.h 中添加线程局部递归计数器                                                                                                                                                                        
  thread_local int shareableRecursionDepth = 0;                                                                                                                                                                      
  constexpr int kMaxShareableRecursionDepth = 64;                                                                                                                                                                    
                                                                                                                                                                                                                     
  jsi::Value ShareableObject::toJSValue(jsi::Runtime &rt) {                                                                                                                                                          
    if (++shareableRecursionDepth > kMaxShareableRecursionDepth) {                                                                                                                                                   
      --shareableRecursionDepth;                                                                                                                                                                                     
      throw std::runtime_error(
          "[Reanimated] Maximum shareable recursion depth exceeded. "                                                                                                                                                
          "This likely indicates deeply nested worklets or circular references.");                                                                                                                                   
    }                                                                                                                                                                                                                
    auto obj = jsi::Object(rt);                                                                                                                                                                                      
    for (size_t i = 0, size = data_.size(); i < size; i++) {                                                                                                                                                         
      obj.setProperty(                                                                                                                                                                                               
          rt, jsi::String::createFromUtf8(rt, data_[i].first),                                                                                                                                                       
          data_[i].second->toJSValue(rt));                                                                                                                                                                           
    }                                                                                                                                                                                                                
    if (nativeState_ != nullptr) {                                                                                                                                                                                   
      obj.setNativeState(rt, nativeState_);                                                                                                                                                                          
    }                                                                                                                                                                                                                
    --shareableRecursionDepth;                                                                                                                                                                                       
    return obj;                                                                                                                                                                                                      
  }                                                                                                                                                                                                                  
                                                                                                                                                                                                                     
  这样不会 crash，而是抛出一个可捕获的 JS 异常，方便定位问题 worklet。                                                                                                                                               
                                                                                                                                                                                                                     
###  方案 3：增大线程栈大小（临时缓解）                                                                                                                                                                                 
                  
  如果 OpenHarmony 侧可以配置 JS 线程栈大小，适当增大可以缓解但不能根治。                                                                                                                                            
                  
  建议                                                                                                                                                                                                               
                  
  优先排查应用层哪个 worklet 产生了过深的嵌套。可以在 debug 模式下对 makeShareableClone 打日志，记录被 clone 的对象的属性深度，找到超深的那个 worklet 进行重构。