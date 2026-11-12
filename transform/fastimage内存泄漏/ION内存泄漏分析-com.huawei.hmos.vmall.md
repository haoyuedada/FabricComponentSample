# ION / DMA-BUF 内存泄漏分析

**应用**：com.huawei.hmos.vmall v1.26.11.666（pid 8746）
**日志时间**：2026/11/10 23:49:00
**数据来源**：HiviewDFX memleak bundle（hisysevent + kernel MM_DMABUF_INFO + native sample + smaps）
**结论**：泄漏发生在 **RNOH `FastImageView`（librnoh_fast_image.so）解码出的 PixelMap 上**，其 DMA-BUF / ION 内存未释放，2 分钟内堆积约 1 GB。

---

## 1. 告警定性

`hisysevent.json`：

```json
{
  "domain_": "RELIABILITY",
  "name_": "MEMORY_LEAK",
  "MODULE": "com.huawei.hmos.vmall",
  "VERSION": "1.26.11.666",
  "FIRST_FRAME": "PSS_MEMORY",
  "SECOND_FRAME": "OVER_LIMIT",
  "THIRD_FRAME": "EXT_PSS",
  "FOREGROUND": "YES",
  "level_": "CRITICAL",
  "SUMMARY": "com.huawei.hmos.vmall(foreground) leaked: ION_LEAK, threshold: 1572864KB, top Memory: 3250969KB, PSS: 1475445KB, GPU: 47752KB, ION: 1672312KB"
}
```

系统按 **EXT_PSS（扩展内存）** 路径判定：PSS 未达硬阈值，但 ION 单独越限（1,672,312 KB > 1,536 MB 软阈值），泄漏项明确为 ION。

---

## 2. 增长形态：只有 ION 在涨

`memleak-native-com.huawei.hmos.vmall-8746-sample.txt` 采样序列：

| 时间 | RSS (KB) | PSS (KB) | ION (KB) | TotalMem (KB) | Level |
|---|---:|---:|---:|---:|:--:|
| 23:29 | 1,294,496 | 1,294,496 | 439,196 | 1,761,836 | N |
| 23:37 | 1,484,596 | 1,484,596 | 511,324 | 2,010,601 | N |
| 23:41 | 1,767,692 | 1,767,692 | 647,524 | 2,419,340 | N |
| 23:43 | 1,786,912 | 1,786,912 | 590,904 | 2,382,780 | N |
| 23:45 | 1,745,084 | 1,745,084 | 530,880 | 2,288,056 | N |
| **23:47** | 1,785,652 | 1,785,652 | **1,605,072** | 3,394,872 | W |
| 23:49 | 1,780,968 | 1,780,968 | **1,672,312** | 3,538,407 | W |
| 23:49* | 1,781,008 | 1,493,530 | 1,672,312 | 3,250,969 | C |

**关键判读**：23:45 之后 PSS 基本持平（1,745 MB → 1,781 MB），同期 ION 增长 **1,141 MB**。泄漏量与 ION 增量高度吻合，可排除 ArkTS 堆 / native heap 增长为主因。

---

## 3. 归属收敛：91% 挂在 FastImageView

`memleak-kernel-com.huawei.hmos.vmall-0-20261110234900.txt`（MM_DMABUF_INFO）共 **494 个 buffer / 1,633 MB**，与 ION 的 1,672 MB 基本吻合。

按 buffer 名归类：

| buffer 类型 | 数量 | 占用 (MB) | 占比 |
|---|---:|---:|---:|
| **`id:FastImageView(...)`** | **267** | **1,489.7** | **91.2%** |
| `8746`（Surface last_buffer） | 6 | 61.8 | 3.8% |
| `srcImageSize-288x288...webp` | 143 | 45.9 | 2.8% |
| URL 图（`1440x1440-https://...`） | 15 | 22.5 | 1.4% |
| `id:Image(...)`（ArkUI 原生 Image） | 45 | 12.3 | 0.8% |
| `NULL` / 其他 | 18 | 0.9 | 0.1% |

按分配线程（`exp_pid`）：

| exp_pid | buffer 数 | 占用 (MB) |
|---|---:|---:|
| 18289 | 84 | 831.6 |
| 19768 | 16 | 232.3 |
| 19225 | 54 | 153.8 |
| 19722 | 18 | 131.3 |
| 1533 | 34 | 112.5 |
| 19770 | 38 | 44.6 |

`exp_task_comm` 均为 `allocator_host`，即全部由图片解码线程分配。

**smaps 交叉验证**：

```
1609096 KB   Rss=0   Pss=0   Counts=489   AnonPage other   anon_inode:dmabuf
```

**Rss = Pss = 0** 说明这些 buffer 根本没有映射进进程地址空间，只是被 fd 持有 —— PSS 统计不到，只有 ION 口径能看到。这是典型的 "PixelMap 未 Release" 形态。进程 fd 已用到 1678，与 494 个 dmabuf fd 同时打开一致。

---

## 4. 机制特征一：未按控件尺寸降采样

按 RGBA 4 字节/像素反推解码尺寸（屏幕宽度仅 1440 px）：

| buffer（节点 id） | fd | 大小 (MB) | 反推解码尺寸 |
|---|---:|---:|---|
| FastImageView(92338) | 1265 | **160.2** | ≈ 6480 × 6480 |
| FastImageView(92464) | 760 | 138.9 | ≈ 6035 × 6035 |
| FastImageView(92422) | 926 | 80.2 | ≈ 4587 × 4587 |
| FastImageView(92506) | 941 | 77.5 | ≈ 4507 × 4507 |
| FastImageView(92548) | 950 | 72.8 | ≈ 4368 × 4368 |
| FastImageView(92694) | 1220 | 61.5 | ≈ 4016 × 4016 |
| FastImageView(92212) | 925 | 54.6 | ≈ 3784 × 3784 |
| FastImageView(92380) | 777 | 54.2 | ≈ 3771 × 3771 |
| FastImageView(92296) | 946 | 52.9 | ≈ 3725 × 3725 |
| **合计** | — | **753.8** | 占 ION 的 45% |

仅这 9 个就占 754 MB，相当于软阈值的一半。按 inode 区间看，这波暴涨全部落在 `170500–170800`（38 个 buffer / 949.5 MB），正是 23:47 那次跳变。

尺寸分布也印证完全由源图决定：113 个 770,048 B（438×438）、33 个 8,294,400 B（1440×1440）与超大图混杂。

---

## 5. 机制特征二：重复解码、缓存失效

**① 同一组件实例持有 23 个 PixelMap**

```
id:FastImageView(530)@0x5e382d3218  →  23 个 buffer，每个 147,456 B（192×192），共 3.2 MB
id:FastImageView(103996)@0x5e85b6d618 → 3 个 buffer
```

地址完全相同 = 同一个组件对象；每次重渲染 / 状态刷新都重新 decode，但上一次的 PixelMap 未释放。

**② 同一张 webp 被独立解码 141 次**

```
srcImageSize-288x288-pixelMapSize-288x288-streamsize-153206-mimetype-webp
→ 141 个 buffer × 331,776 B = 45.9 MB
```

`streamsize 153206` 完全一致 = 同一份资源，分属 exp_pid 29081 / 29082 / 29083 等多个解码线程，说明图片缓存未生效，每个 FastImageView 各自 decode 一份。

---

## 6. 根因

| | 根因 | 证据 |
|---|---|---|
| **A** | **PixelMap 生命周期未管理**：组件卸载（`aboutToDisappear` / `prepareForRecycle`）或 `source` 变更时未调用 `PixelMap::Release()` | 同一节点 23 个 buffer 共存；494 个 dmabuf fd 同时打开，fd 号已到 1678 |
| **B** | **全尺寸解码 + 无缓存复用**：`CreatePixelMap` 未传 `DecodeOptions.desiredSize`，按源图 6480×6480 解码；且无 URL + desiredSize 维度的 PixelMap 缓存 | 单 buffer 160 MB；同一 webp 解码 141 次 |

**放大链**：全尺寸解码（单张 160 MB）→ 无缓存（同图 141 份）→ 不释放（常驻不回收）→ 越限（ION 1,672 MB）。

单点看任一处都不致命，叠加后 2 分钟内即可把 ION 从 531 MB 推到 1,605 MB。

---

## 7. 修复建议

### P0 止血：补齐 PixelMap 释放路径

- 在 `librnoh_fast_image` 的 `aboutToDisappear`、`onRecycle`、`source` setter、`onLoadEnd` 四条路径上确认 `PixelMap::Release()` 被调用。
- 重点核查 RN 长列表（RecyclerListView / FlashList）回收单元格时 FastImage 是否走释放分支。
- 验证方式：复现滑动后观察 dmabuf fd 数是否回落（当前基线 494 个 / 1678 fd）。

### P0 止血：按控件尺寸降采样

- 为 `ImageSource::CreatePixelMap` 传入 `DecodeOptions.desiredSize`，按控件实际尺寸（屏幕宽 1440）解码。
- 预期收益：Top 9 buffer 由 754 MB 降至约 40 MB 量级。

### P1 治本：建立解码缓存与容量上限

- 按 URL（或资源 id）+ desiredSize 做 PixelMap 缓存，消除同资源 141 次重复解码。
- 为图片解码内存设上限与 LRU 淘汰，避免单页面无界增长。
- 顺带核查：ArkUI 原生 `id:Image(...)` 45 个 / 12.3 MB、Surface `last_buffer` 61.8 MB，以及 smaps 中 `[anon:native_heap:jemalloc]` 虚拟 1.48 GB / PSS 790 MB。

---

## 8. 数据边界

**已确认**

- 泄漏类型为 ION / DMA-BUF
- 泄漏组件为 RNOH FastImageView
- 泄漏对象为解码后的 PixelMap
- 机制为未 Release + 全尺寸解码 + 无缓存
- 量级 1.49 GB / 267 buffer

**尚缺**

- dmabuf 记录无调用栈，无法定位到具体函数
- 无该工程 FastImage 相关源码
- 无 native heap 快照，无法交叉验证 PixelMap 计数

**下一步取证**

| 手段 | 目标 | 预期产出 |
|---|---|---|
| DevEco Profiler 抓 native heap | 确认 PixelMap 实例数与分配栈 | 定位到 decode 调用点 |
| 对 librnoh_fast_image 埋点 | 记录 PixelMap 分配 / 释放配对 | 找出缺失的 Release 分支 |
| 复现脚本 + fd 监控 | 滑动前后 dmabuf fd 计数 | 验证修复有效性 |

---

## 9. 一句话结论

**RNOH FastImageView 解码出的 PixelMap 未释放，且按原图全尺寸解码、无缓存复用，导致 2 分钟内 ION 堆积 1.1 GB。**
