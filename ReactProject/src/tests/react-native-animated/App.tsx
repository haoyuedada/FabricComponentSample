import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  useSharedValue,
  runOnUI,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

export default function WorkletCrashDemo() {
  const sv = useSharedValue(0);

  useEffect(() => {
    // ===== 方式1：在 UI runtime 内部构造循环引用 =====
    // makeShareableCloneOnUIRecursive 没有循环检测！
    // 这和线上的 crash 路径一致
    runOnUI(() => {
      'worklet';
      const obj: any = { name: 'circular' };
      obj.self = obj;
      // 这里的赋值会触发 makeShareableCloneOnUIRecursive
      // → C++ makeShareableClone → 成功（JS侧无检测）
      // → 后续读取时 toJSValue → 无限递归 → crash
      sv._value = obj;
    })();

    // ===== 方式2：利用 worklet 闭包中多层嵌套 =====
    // 深度 < 30 绕过 JS 检测，但 C++ toJSValue 重建时
    // ShareableWorklet 内部的属性互相包含形成循环
    // runOnUI(() => {
    //   'worklet';
    //   const a: any = {};
    //   const b: any = {};
    //   a.ref = b;
    //   b.ref = a;
    //   // a 和 b 互相引用，深度只有 2，绕过 JS 深度检测
    //   // 但 C++ toJSValue 遍历时：a → b → a → b → ... 无限递归
    //   sv._value = a;
    // })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Worklet Circular Crash Demo</Text>
    </View>
  );
}