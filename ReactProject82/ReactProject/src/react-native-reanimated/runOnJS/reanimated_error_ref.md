# reanimated runOnJS 错误写法基准（来源：popo 文档，2026-08-28 重新提取）

文档：https://docs.popo.netease.com/lingxi/7061af5ab205462fac101189249835fb
标题：reanimated（创建人 陈皓月）

核心规则：传给 `runOnJS(...)` 的回调必须是 **JS 线程的普通函数**，且**声明在 worklet/UI 作用域之外**；该回调**不能带 `'worklet'` 标记**。

## 正确写法（1 种）
```js
const rnCallback = (message: string) => {
  setStatus(`正确用法成功：rnCallback 已在 JS 线程执行（${message}）`);
};
scheduleOnUI(() => {
  // 'worklet' 是否写都可以
  'worklet';
  runOnJS(rnCallback)('来自 UI runtime');
});
```
关键点：`rnCallback` 是外层普通函数，非 worklet，声明在 `scheduleOnUI` 之外。

## 错误写法（3 种）

### 错误 1：回调在 `scheduleOnUI` 的 worklet 体内定义后再 runOnJS
```js
scheduleOnUI(() => {
  'worklet';
  // cb 不能带 worklet 标记 —— 在 worklet 作用域里定义的函数会被当作 worklet
  const cb = (message: string) => {
    // 永远执行不到
  };
  runOnJS(cb)('boom');
});
```

### 错误 2：传给 runOnJS 的回调函数自身带 `'worklet'` 标记
```js
function capturedWorklet(message: string): void {
  'worklet'; // 回调中不能带 worklet 标记
}
const triggerCapturedWorklet = () => {
  scheduleOnUI(() => {
    'worklet';
    runOnJS(capturedWorklet)('boom');
  });
};
```

### 错误 3：在 Gesture/UI 回调体内定义内联回调再 runOnJS（cb 应放外边）
```js
const pan = Gesture.Pan().onChange((event) => {
  translateX.value = event.translationX;
  console.log('PanGestureRepro onChange', event.translationX);
  const cb = () => { // 放在外边
    console.log('PanGestureRepro cb--ing');
  };
  runOnJS(cb)();
});
```

## 静态检测指纹
| 指纹 | 判定 | 对应错误 |
|---|---|---|
| A. `runOnJS(<标识符>)` 且该标识符声明于同一 worklet/gesture 作用域内（`const X = (..)=>` 在 worklet 体内） | 回调被 worklet 捕获 | 1 |
| B. `runOnJS(<标识符>)` 且该标识符指向的函数体含 `'worklet'`/`"worklet"` 标记 | 回调被标记为 worklet | 2 |
| C. `runOnJS(<内联箭头函数>)`（参数直接是 `(..)=>` / `async (..)=>` / `function(..){..}`） | 内联回调未外部化 | 3 |
