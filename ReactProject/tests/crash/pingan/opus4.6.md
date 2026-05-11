# Crash 分析                                                                                                                                                                                                         
                                                                                                                                                                                                                     
## 崩溃场景                                                                                                                                                                                                           
                                                                                                                                                                                                                     
  这是一个发生在 UI 线程 上的崩溃，崩溃发生在 react-native-reanimated 的 Shareable 对象序列化/反序列化过程中。                                                                                                       
                                                                                                                                                                                                                     
## 调用栈解读                                                                                                                                                                                                         
                  
  从栈底到栈顶的关键路径：                                                                                                                                                                                           
                  
  1. #25-#27: rnoh::NapiTaskRunner::executeTask() → 通过 libuv 事件循环在主线程执行任务                                                                                                                              
  2. #23-#24: reanimated 内部调度（无符号帧），对应 WorkletRuntime::runGuarded() 调用 shareableWorklet->getJSValue(rt)
  3. #13-#22: ShareableWorklet::toJSValue 和 ShareableObject::toJSValue 的递归调用                                                                                                                                   
  4. #00-#12: 最终在 Hermes 引擎内部崩溃                                                                                                                                                                             
                                                                                                                                                                                                                     
##  根因分析                                                                                                                                                                                                           
                                                                                                                                                                                                                     
  核心问题是 ShareableWorklet::toJSValue 和 ShareableObject::toJSValue 之间形成了深度递归：                                                                                                                          
                  
  ShareableWorklet::toJSValue (#22)                                                                                                                                                                                  
    → ShareableObject::toJSValue (#21, #20)  // 遍历 data_ 中的属性                                                                                                                                                  
      → ShareableWorklet::toJSValue (#19)     // 某个属性又是 worklet                                                                                                                                                
        → ShareableObject::toJSValue (#18, #17)                                                                                                                                                                      
          → ShareableWorklet::toJSValue (#16)                                                                                                                                                                        
            → ShareableObject::toJSValue (#15, #14)                                                                                                                                                                  
              → ShareableWorklet::toJSValue (#13)                                                                                                                                                                    
                → Hermes 执行 valueUnpacker (#00-#12)                                                                                                                                                                
                                                                                                                                                                                                                     
  从栈帧可以看到 3 层 Worklet 嵌套（#13, #16, #19, #22 各有一次 ShareableWorklet::toJSValue），每层 Worklet 内部又有多层 ShareableObject::toJSValue 递归展开属性。                                                   
                                                                                                                                                                                                                     
  崩溃的直接原因：当 Worklet 闭包捕获了复杂的嵌套对象（包含其他 Worklet 引用），toJSValue 递归展开所有属性时，在 Hermes 引擎内部触发了异常。可能的触发条件：                                                         
                  
  1. Runtime 已被销毁：toJSValue 在 UI Runtime 上执行时，如果 JS Runtime 正在被销毁或已经销毁，Hermes 内部操作（如 getProperty、call）会访问无效内存                                                                 
  2. 并发访问：ShareableObject::data_ 是 std::vector，在 JS 线程创建，在 UI 线程读取。虽然 data_ 本身在构造后不变，但其中的 shared_ptr<Shareable> 指向的对象可能被其他线程修改或释放
  3. __valueUnpacker 不可用：ShareableWorklet::toJSValue 第 260 行调用 getValueUnpacker(rt).call(rt, obj)，如果 runtime 的 global 对象状态异常，会导致崩溃                                                           
                                                                                                                                                                                                                     
##  偶现原因                                                                                                                                                                                                           
                                                                                                                                                                                                                     
  这是一个竞态条件（race condition）：                                                                                                                                                                               
  - Worklet 通过 scheduleOnUI 被调度到 UI 线程执行
  - 在 UI 线程执行 toJSValue 递归展开时，如果恰好遇到 runtime 正在被销毁（如页面退出、热重载），就会触发崩溃                                                                                                         
  - WorkletRuntime::runGuarded 中虽然检查了 weakUiWorkletRuntime.lock()，但在 lock 成功后、toJSValue 递归执行过程中，runtime 仍可能变为无效状态
                                                                                                                                                                                                                     
##  修复方案                                                                                                                                                                                                           
                                                                                                                                                                                                                     
  方案 1（推荐）：在 runGuarded 中增加 runtime 有效性保护                                                                                                                                                            
                                                                                                                                                                                                                     
  修改 WorkletRuntime.h 中的 runGuarded：                                                                                                                                                                            
                  
  template <typename... Args>                                                                                                                                                                                        
  inline void runGuarded(const std::shared_ptr<ShareableWorklet> &shareableWorklet, Args &&... args) const                                                                                                           
  {                                                                                                                                                                                                                  
      if (runtime_ == nullptr) {                                                                                                                                                                                     
          return;  // Runtime already destroyed, skip                                                                                                                                                                
      }                                                                                                                                                                                                              
      jsi::Runtime &rt = *runtime_;                                                                                                                                                                                  
      if (!WorkletRuntimeRegistry::isRuntimeAlive(&rt)) {                                                                                                                                                            
          return;  // Runtime no longer alive                                                                                                                                                                        
      }                                                                                                                                                                                                              
      try {                                                                                                                                                                                                          
          runOnRuntimeGuarded(rt, shareableWorklet->getJSValue(rt), std::forward<Args>(args)...);                                                                                                                    
      } catch (const jsi::JSError &) {                                                                                                                                                                               
          // JS error - already handled by callGuard in debug mode                                                                                                                                                   
      } catch (const std::exception &e) {                                                                                                                                                                            
          // Native error during toJSValue - runtime may have been invalidated                                                                                                                                       
          // Log and swallow to prevent crash                                                                                                                                                                        
      }                                                                                                                                                                                                              
  }                                                                                                                                                                                                                  
                                                                                                                                                                                                                     
  方案 2：在 ShareableWorklet::toJSValue 中增加防御性检查                                                                                                                                                            
                  
  修改 Shareables.cpp 第 254-261 行：                                                                                                                                                                                
                  
  jsi::Value ShareableWorklet::toJSValue(jsi::Runtime &rt)                                                                                                                                                           
  {                                                                                                                                                                                                                  
      if (!std::any_of(data_.cbegin(), data_.cend(), [](const auto &item) {
          return item.first == "__workletHash";                                                                                                                                                                      
      })) {                                                                                                                                                                                                          
          throw std::runtime_error("ShareableWorklet doesn't have `__workletHash` property");                                                                                                                        
      }                                                                                                                                                                                                              
                  
      auto valueUnpacker = rt.global().getProperty(rt, "__valueUnpacker");                                                                                                                                           
      if (!valueUnpacker.isObject() || !valueUnpacker.asObject(rt).isFunction(rt)) {
          // Runtime is in an invalid state (being torn down), bail out                                                                                                                                              
          return jsi::Value::undefined();                                                                                                                                                                            
      }                                                                                                                                                                                                              
                                                                                                                                                                                                                     
      jsi::Value obj = ShareableObject::toJSValue(rt);                                                                                                                                                               
      return valueUnpacker.asObject(rt).asFunction(rt).call(rt, obj);
  }                                                                                                                                                                                                                  
                                                                                                                                                                                                                     
  方案 3：在 scheduleOnUI 的 lambda 中增加更严格的生命周期保护                                                                                                                                                       
                                                                                                                                                                                                                     
  修改 NativeReanimatedModule.cpp 第 126-141 行：                                                                                                                                                                    
                  
  uiScheduler_->scheduleOnUI([weakUiWorkletRuntime, shareableWorklet] {                                                                                                                                              
      auto uiWorkletRuntime = weakUiWorkletRuntime.lock();                                                                                                                                                           
      if (uiWorkletRuntime == nullptr) {                                                                                                                                                                             
          return;                                                                                                                                                                                                    
      }                                                                                                                                                                                                              
      jsi::Runtime &rt = uiWorkletRuntime->getJSIRuntime();                                                                                                                                                          
      // Double-check runtime is still registered and valid                                                                                                                                                          
      if (!WorkletRuntimeRegistry::isRuntimeAlive(&rt)) {                                                                                                                                                            
          return;                                                                                                                                                                                                    
      }                                                                                                                                                                                                              
  #if JS_RUNTIME_HERMES                                                                                                                                                                                              
      const auto scope = jsi::Scope(rt);                                                                                                                                                                             
  #endif                                                                                                                                                                                                             
      try {                                                                                                                                                                                                          
          uiWorkletRuntime->runGuarded(shareableWorklet);                                                                                                                                                            
      } catch (const std::exception &) {                                                                                                                                                                             
          // Swallow exceptions from worklet execution during teardown                                                                                                                                               
      }                                                                                                                                                                                                              
  });                                                                                                                                                                                                                
                                                                                                                                                                                                                     
  建议                                                                                                                                                                                                               
   
##  综合来看，建议同时应用方案 1 + 方案 2：                                                                                                                                                                            
  - 方案 1 在入口处做 try-catch 兜底，防止任何 toJSValue 递归过程中的异常导致 crash
  - 方案 2 在 ShareableWorklet::toJSValue 中提前检测 runtime 无效状态，避免进入 Hermes 后才失败                                                                                                                      
                                                                                               
  这两处修改都是防御性的，不会影响正常执行路径的性能，只在 runtime 处于异常状态时生效。 