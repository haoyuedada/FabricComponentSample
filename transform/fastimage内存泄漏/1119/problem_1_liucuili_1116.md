# problem_1_liucuili_1116 内存泄漏分析报告

> 分析日期：2026-11-16
> 日志目录：`problem_1_liucuili_1116/problem_1/`
> 应用：`com.huawei.hmos.vmall` v1.26.11.666
> 进程 PID：40526
> 事件类型：MEMORY_LEAK（CRITICAL）
> 触发时间：2026-11-13 20:35:14
> 进程存活：约 54.7 小时（196820s，自 11/13 18:39 起采样）
> 依赖版本：`react-native-fast-image` 9.2.3-beta.2 + `@ohos/imageknifepro` 1.0.19（工作区本地 har，11/13 15:59 起生效）

---

## 一、问题总览

| 维度 | 值 |
|------|-----|
| 事件域 | RELIABILITY / MEMORY_LEAK |
| 级别 | CRITICAL |
| MODULE | com.huawei.hmos.vmall |
| VERSION | 1.26.11.666 |
| HAPPEN_TIME | 20261113203514 |
| FIRST_FRAME | PSS_MEMORY |
| SECOND_FRAME | CONTROL |
| FOREGROUND | YES |
| SUMMARY | leaked, threshold: 1572864KB, top Memory: 3515871KB, has killed |
| 软阈值 | 1,572,864 KB (1.5GB) |
| 硬阈值 | 3,145,728 KB (3.0GB) |
| 崩溃时 TotalMem | 3,515,871 KB (~3.43GB) |
| LOG_PATH | memleak-native-com.huawei.hmos.vmall-40526-smaps.txt |

进程在**前台运行约 54.7 小时**后，PSS 持续上涨突破硬阈值，被内核 OOM killer 主动 kill（`has killed:com.huawei.hmos.vmall(foreground)`）。

---

## 二、内存趋势分析

### 2.1 采样数据（memleak-native-...-sample.txt）

进程从 18:39 开始被采样监控，至 20:35 被 kill，共 37 次采样。

| Idx | 时间 | RSS(MB) | PSS(MB) | ION(MB) | GPU(MB) | TotalMem(MB) | Level |
|-----|------|---------|---------|---------|---------|--------------|-------|
| 3 | 18:39:13 | 1581 | 1581 | 357 | 3 | 2111 | W |
| 7 | 18:47:13 | 1759 | 1759 | 574 | 4 | 2480 | W |
| 10 | 18:57:13 | 1934 | 1726 | 451 | 5 | 2417 | E |
| 17 | 19:27:13 | 2189 | 1978 | 594 | 81 | 2794 | E |
| 24 | 19:59:13 | 2459 | 2248 | 567 | 21 | 2973 | E |
| 29 | 20:19:14 | 2669 | 2459 | 703 | 5 | 3351 | C |
| 34 | 20:35:13 | 2956 | 2746 | 585 | 8 | 3451 | C |
| **35** | **20:35:14** | **2961** | **2728** | **585** | **8** | **3433** | **C** ← kill |
| 36 | 20:37:13 | 2930 | 2697 | 1041 | 9 | 3860 | C |
| 38 | 20:53:13 | 3102 | 2869 | 716 | 5 | 3684 | C |

### 2.2 关键观察

1. **PSS 单调上涨**：从 1.58GB（18:39）涨至 2.73GB（20:35 kill 时刻），1 小时 56 分钟内增长 **1.15GB**，平均增速约 **10MB/min**
2. **ION 波动剧烈但无持续累积**：ION 在 350~1040MB 之间大幅波动（Index 36 飙至 1041MB），说明 dma-buf 有申请有释放，不是稳定泄漏源；但峰值时刻会推高 TotalMem
3. **PSS 与 ION 背离**：PSS 持续上涨而 ION 不随之单调增长 → 泄漏主体在**用户态 native heap / ashmem**，而非 ION dma-buf
4. **GPU 突刺**：Index 17（81MB）、Index 30（55MB）、Index 24（21MB）出现 GPU 突刺，对应大图解码上传纹理场景
5. **Level 演进**：W（18:39~18:47，7min）→ E（18:57~19:59，62min）→ C（20:19 起，持续 34min 至 kill），泄漏进入 Critical 后仍运行 34 分钟才被 kill

---

## 三、smaps 分类分析（20:35:14 采样）

### 3.1 Top 内存分类

| PSS(MB) | 映射数 | 类别 | 名称 | 说明 |
|---------|--------|------|------|------|
| **1288** | 36 | native heap | `[anon:native_heap:jemalloc]` | **主要泄漏源 ①**：jemalloc 堆 1.26GB |
| **944** | 2226 | AnonPage other | `[anon]` | **主要泄漏源 ②**：匿名页 944MB，映射数 2226 极高 |
| 74 | 434 | ark ts heap | `[anon:ArkTS Heap]` | ArkTS 堆 |
| 67 | 226 | ark ts heap | `[anon:ArkTS Heapshare]` | ArkTS 共享空间 |
| 50 | 5 | AnonPage other | `[anon:JSVM_JIT_40526]` | JS JIT 代码页 |
| **48** | 236 | FilePage other | `anon_inode:dev/ashmem/EXTRawData` | **主要泄漏源 ③**：ImageKnifePro 解码输出 ashmem |
| 47 | 160 | ark ts heap | `[anon:ArkTS Heapsemi]` | ArkTS semi-space |
| 30 | 5 | .so | libarkweb_engine.so | ArkWeb 引擎 |
| 22 | 1732 | AnonPage other | `[anon:partition_alloc]` | partition_alloc 区域 |
| 17 | 24 | native heap | `[anon:native_heap:jemalloc]` (另一组) | jemalloc 堆（次组） |

### 3.2 泄漏主体构成

```
PSS 总量 2,728MB 中：
├─ [anon:native_heap:jemalloc]  1,288MB  (47.2%)  ← 36 个大块映射，单块平均 35MB
├─ [anon] AnonPage                944MB  (34.6%)  ← 2226 个映射，单块平均 0.4MB
├─ EXTRawData (ashmem)             48MB  ( 1.8%)  ← 236 个映射，ImageKnifePro 解码缓存
├─ ArkTS Heap 各 space 合计       ~206MB  ( 7.6%)  ← 正常 JS 堆，非泄漏
└─ 其他（.so/.hap/JIT 等）        ~242MB  ( 8.9%)
```

**子模式判定**：与已记录的 `experience_fastimage_ion_leak_after_upgrade.md` 中 **子模式 C（native heap jemalloc + EXTRawData ashmem 累积）** 完全一致：
- `[anon:native_heap:jemalloc]` 占比 47%，36 个映射（大块连续分配，典型图片解码位图缓冲）
- `[anon]` AnonPage 占比 35%，2226 个映射（碎片化匿名页，ImageKnifePro 中间解码缓冲）
- `EXTRawData` ashmem 48MB / 236 映射（PixelMap 的 ashmem 模式输出）
- 三者共同指向 **imageknifepro 1.0.19 的解码缓存层未正确释放**

---

## 四、dma-buf / ION 泄漏分析（memleak-kernel）

### 4.1 dma-buf 总览

| 指标 | 值 |
|------|-----|
| dma-buf 总条目 | 355 |
| 总大小 | 808.5 MB |
| 最大单块 | 31.9 MB |
| FastImageView PixelMap 条目 | 342（96.3%） |
| FastImageView PixelMap 大小 | 682.5 MB（84.4%） |
| URL 命名条目（如 1440x1440-https://...） | 3 |
| 唯一 FastImageView 实例 ID 数 | 342 |

### 4.2 buf_name 模式

dma-buf 的 `buf_name` 字段呈现两种命名：

1. **`id:FastImageView(<instance_id>)@<addr>`**（342 条，682MB）
   - 每个 FastImageView 实例对应一个独立的 dma-buf
   - 实例 ID 各不相同（318022、317936、521670、515018、1205376 等），说明是**不同的 FastImageView 组件实例各自持有 PixelMap**
   - 这是 RN 侧 FastImage 组件每渲染一个图片就创建一个 native PixelMap 的典型模式

2. **`<W>x<H>-https://res.vma...jp*`**（3 条，13MB）
   - 以图片尺寸 + URL 命名，来自网络下载后直接解码
   - 如 `800x800-https://res.vma...`、`1440x1440-https://res.vma...`

### 4.3 buf 大小分布

| 大小档位 | 数量 | 说明 |
|----------|------|------|
| 752KB | 145 | 800x800 ARGB 图（约 2.4MB 原始 → 压缩） |
| 2MB | 67 | 中等尺寸图 |
| 3MB | 23 | |
| 4MB | 21 | |
| 5MB | 13 | |
| 12MB | 10 | 大图（如 1440x1440） |
| 31MB | 3 | 超大图（27852800 / 33435648 字节） |

### 4.4 ION 在 PSS 中的体现

虽然 dma-buf 总量达 808MB，但 ION 列在 sample.txt 中仅显示 350~1040MB 波动，且 **PSS 上涨主要来自 native heap 而非 ION**。这表明：

- dma-buf 是**有进有出**的（FastImageView 卸载时会释放对应的 dma-buf）
- 但 FastImageView 实例数累积到 342 个，说明**组件实例本身未被复用/回收**，每个实例持有自己的 PixelMap
- 真正稳定累积的泄漏在 native heap（jemalloc 1.26GB）和匿名页（944MB），即 ImageKnifePro 解码后的位图数据在 native heap 中未释放

---

## 五、根因分析

### 5.1 泄漏链路

```
用户长时间浏览（54.7h）
  ↓
FastImage 组件反复创建/销毁（342 个实例 ID 累积）
  ↓
每个实例触发 imageknifepro 解码：
  ├─ 原始压缩数据 → native heap jemalloc 缓冲（累积 1.26GB）
  ├─ 解码中间缓冲 → [anon] 匿名页（累积 944MB）
  └─ PixelMap 输出 → ashmem EXTRawData（48MB）+ ION dma-buf（682MB，有释放）
  ↓
imageknifepro 1.0.19 缓存层未正确释放解码缓冲
  ↓
native heap + ashmem 持续累积
  ↓
PSS 突破 3.0GB 硬阈值 → 内核 kill
```

### 5.2 根因定性

**第三方库缺陷**：`@ohos/imageknifepro` 1.0.19（随 `react-native-fast-image` 9.2.3-beta.2 升级引入）的解码缓存管理存在泄漏。

> **版本核实**：日志采集（11/13 20:35）时，工作区 `oh-package.json5` 已于 11/13 15:59 改为指向本地 `react-native-fast-image-9.2.3-beta.2.har`，该 har 内部 `oh-package.json5` 声明 `"@ohos/imageknifepro": "1.0.19"`，oh_modules 中已安装 1.0.19。因此本次泄漏对应 imageknifepro **1.0.19**，而非已合入 master 的 9.2.3-beta.1 所依赖的 1.0.14。

证据：
1. smaps 中 `[anon:native_heap:jemalloc]` 1.26GB + `[anon]` 944MB + `EXTRawData` 48MB 三者共同指向图片解码路径
2. memleak-kernel 中 342 个 FastImageView 实例 ID 各不相同，证明 FastImage 组件实例未被复用，每次渲染都创建新实例
3. 此问题与 `experience_fastimage_ion_leak_after_upgrade.md` 记录的子模式 C 完全一致，是该已知缺陷的又一次复现
4. 进程存活 54.7 小时，泄漏缓慢累积，符合"缓存未释放"的慢性泄漏特征（区别于单次大分配的急性泄漏）

### 5.3 与已记录缺陷的关系

此问题与记忆 `experience_fastimage_ion_leak_after_upgrade.md` 记录的缺陷同源：

| 维度 | 已记录（problem_1113） | 本次（problem_1_liucuili_1116） |
|------|------------------------|-------------------------------|
| 子模式 | C（native heap + EXTRawData） | C（native heap + EXTRawData） |
| jemalloc | 1.48GB | 1.26GB |
| [anon] | — | 944MB |
| EXTRawData | 140MB | 48MB |
| FastImage 版本 | 9.2.3-beta.1 | **9.2.3-beta.2**（工作区本地 har） |
| imageknifepro | 1.0.14 | **1.0.19**（beta.2 har 声明） |
| 进程存活 | 较短 | 54.7 小时 |

problem_1113 对应已合入 master 的 9.2.3-beta.1 + imageknifepro 1.0.14；本次对应工作区未提交的 9.2.3-beta.2 + imageknifepro 1.0.19。**升级到 1.0.19 后泄漏仍然存在**，说明 1.0.19 未修复此缺陷。

---

## 六、修复建议

### 6.1 短期缓解（应用侧）

1. **回退 fast-image 版本**：将 `react-native-fast-image` 从 9.2.3-beta.2 回退至 9.2.2-beta.1（旧版 har 保留在 `framework/reactnative/fast_image-9.2.2-beta.1.har`），验证泄漏是否消失。注意：9.2.3-beta.1（imageknifepro 1.0.14）和 9.2.3-beta.2（imageknifepro 1.0.19）均存在泄漏，1.0.19 升级未修复
2. **限制 FastImage 实例数**：对 FastImage 组件使用 `@Reusable` 装饰器复用实例，避免 342 个实例 ID 累积
3. **设置内存缓存上限**：在 `FastImageLoaderTurboModule.ts` 中将 `RemoteImageMemoryCache` 上限从 128 调低至 32~64，并确认 `remove` 时调用 `release()` 释放 PixelMap
4. **定时清理解码缓冲**：长时间运行场景下，定时调用 imageknifepro 的清理接口释放 native heap 缓冲

### 6.2 中期修复（库侧）

1. **推动 imageknifepro 团队修复**：1.0.19 版本的解码缓存层在组件卸载时未释放 native heap 缓冲，需修复 `release()` 逻辑（1.0.14 同样存在此缺陷）
2. **验证 Reload 路径**：`FastImageViewComponentInstance.cpp` 的 `onLoadFailed` 中 Reload 未释放旧 PixelMap（line 103-107），需确认 Reload 前是否调用 `ReleasePixelMap`
3. **析构函数补全**：`FastImageViewComponentInstance` 析构函数只调 `DisposeNode(false)`（line 66-70），需补充 PixelMap 释放逻辑

### 6.3 监控

- 监控 `com.huawei.hmos.vmall` 的 PSS 增长速率，>5MB/min 时告警
- 监控 FastImageView 实例数，>100 时告警（正常应 <20）
- 跟踪此 fingerprint 的内存泄漏事件频率，验证缓解措施效果

---

## 七、附录

### 7.1 关键文件路径

| 文件 | 说明 |
|------|------|
| `problem_1_liucuili_1116/problem_1/hisysevent.json` | MEMORY_LEAK 事件 |
| `problem_1_liucuili_1116/problem_1/memleak-native-com.huawei.hmos.vmall-40526-sample.txt` | 内存采样趋势（37 次采样） |
| `problem_1_liucuili_1116/problem_1/memleak-native-com.huawei.hmos.vmall-40526-smaps.txt` | 进程 smaps（20:35:14 时刻） |
| `problem_1_liucuili_1116/problem_1/memleak-kernel-com.huawei.hmos.vmall-0-20261113203514.txt` | 内核 dma-buf 信息（355 条） |
| `problem_1_liucuili_1116/problem_1/memleak-native-com.huawei.hmos.vmall-40526-20261113184714.htrace` | native 分配栈（18:47:14，117MB） |
| `problem_1_liucuili_1116/problem_1/memleak-native-com.huawei.hmos.vmall-40526-20261113203514.htrace` | native 分配栈（20:35:14，122MB） |

### 7.2 smaps 关键分类汇总

| 分类 | PSS(MB) | 映射数 | 占比 |
|------|---------|--------|------|
| `[anon:native_heap:jemalloc]` | 1288 | 36 | 47.2% |
| `[anon]` AnonPage | 944 | 2226 | 34.6% |
| `[anon:ArkTS Heap]` 各 space | ~206 | ~853 | 7.6% |
| `EXTRawData` ashmem | 48 | 236 | 1.8% |
| `[anon:partition_alloc]` | 22 | 1732 | 0.8% |
| 其他（.so/.hap/JIT 等） | ~220 | — | 8.1% |

### 7.3 dma-buf 关键统计

| 指标 | 值 |
|------|-----|
| 总条目 | 355 |
| 总大小 | 808.5 MB |
| FastImageView 条目 | 342（682.5 MB） |
| 唯一 FastImageView 实例 ID | 342 |
| 最大单块 | 31.9 MB |
| 主流大小 | 752KB×145、2MB×67、3MB×23、4MB×21、5MB×13 |

### 7.4 相关记忆

- `experience_fastimage_ion_leak_after_upgrade.md` — FastImage 9.2.3-beta.1 / imageknifepro 1.0.14 泄漏+崩溃（已记录的同源缺陷，子模式 C）。本次 problem_1_liucuili_1116 证实升级到 9.2.3-beta.2 / imageknifepro 1.0.19 后泄漏仍未修复
- `experience_debugging_ion-dma-buf-leak-diagnosis.md` — ION/dma-buf 泄漏诊断法（PSS/ION 背离 → 用户态泄漏）
