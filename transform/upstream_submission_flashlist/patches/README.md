# upstream_patches — 供 flash-list 维护者评估的 3 个 patch

> 背景与完整论证见 `../UPSTREAM_ISSUE_flash-list.md`。
> 这 3 个 patch 是我们**已在生产验证**的实现，期望上游评估合入（我们愿意转成 PR）。

## 文件

| Patch | 目标文件 | 解决 | 实测效果 |
|---|---|---|---|
| `P-DIR-FLIP.patch` | `dist/recyclerview/helpers/EngagedIndicesTracker.js` | 方向投票即时翻转（不等 5 样本多数收敛） | 回滑 2s 空窗 → 首窗 46 cells |
| `P-INC-SYNC+P-KEEP-POOL.patch` | `dist/recyclerview/RenderStackManager.js` | ① 已绑定的 index 直接跳过 ② 不每次清空回收池 | 白闪率 20.7% → 16.5% |
| `P-THROTTLE-COMMIT.patch` | `dist/recyclerview/RecyclerView.js` | 提交限 10Hz + 动量末强制提交 | 巨批 5210ms → 1694ms；白闪率 → 8.3% |

## 基准版本

`@react-native-ohos/flash-list@2.1.1-rc.1`（npm 原版）

## 应用方式

在项目根目录：

```bash
npm i @react-native-ohos/flash-list@2.1.1-rc.1
git apply upstream_patches/P-DIR-FLIP.patch
git apply upstream_patches/P-INC-SYNC+P-KEEP-POOL.patch
git apply upstream_patches/P-THROTTLE-COMMIT.patch
```

若用 patch-package：把这 3 个 patch 放到 `patches/` 下，命名为
`<scope>+<pkg>+<version>.patch` 格式后执行 `npx patch-package @react-native-ohos/flash-list`。

## 已做的验证（我们侧）

1. **可 apply**：从 npm 原版 `2.1.1-rc.1` 解包后，`git apply --check` 三个 patch 全部通过
2. **产物一致**：apply 后三个目标文件与我们在生产验证的版本 **字节级一致**（`cmp` 校验）
3. **行为验证**（鸿蒙真机 LAP-AL10，RN 0.82）：

   | 指标 | 基线 | +patch1+2 | +patch3 |
   |---|---|---|---|
   | 白闪率（帧占比，同协议同深度） | 20.7% | 16.5% | **8.3%** |
   | 最大提交巨批 | 5210ms | — | **1694ms** |
   | 回滑首窗装配行数 | 0（2s 空窗） | **46 cells** | — |

## 补丁里的关键注释位置（便于 review）

| Patch | 位置 | 看什么 |
|---|---|---|
| P-DIR-FLIP | `EngagedIndicesTracker.js` ~L105 | 方向反转时立即重置速度史的判定条件 |
| P-INC-SYNC | `RenderStackManager.js` ~L60 | 「已正确绑定的 index 直接跳过」的跳过条件 |
| P-KEEP-POOL | `RenderStackManager.js` ~L33 | 回收池清理改为「只在真正整体失效时」 |
| P-THROTTLE-COMMIT | `RecyclerView.js` ~L44/L160/L172 | 节流窗口、动量末强制提交、限流判定 |

## 已知约束（重要）

提交节流与后向缓冲**互斥**：

```
后向缓冲需 ≥ v × 节流间隔 = 2600 × 0.2 = 520px  ⇒  drawDistance ≳ 870
但 drawDistance 越大 → 待渲批量越大 → 提交越晚
```

实测 **drawDistance 调大反而更糟**（dd=1000 灰闪 55~62% vs dd=250 的 28~36%）。
→ dd 是「待渲批量」不是「覆盖量」。若上游提供"平滑快滑"选项，需给出**缓冲与节流的联合约束**。
