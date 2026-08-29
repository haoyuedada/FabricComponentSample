/**
 * 复现 @react-native-ohos/flash-list@1.8.3 (RNOH 0.82) native crash 的最小 demo
 *
 * 崩溃机制:
 *   AutoLayoutViewComponentInstance::fixLayout() 对 AutoLayoutView 的所有子节点执行
 *   dynamic_pointer_cast<CellContainerComponentInstance>,cast 失败(子节点不是
 *   CellContainer)时返回 nullptr,但代码不判空直接 push_back,随后 std::sort 的
 *   比较器 a->getIndex() 解引用空指针 → SIGSEGV(SEGV_MAPERR)@0x5e8
 *
 * 触发条件:
 *   1. AutoLayoutView 下有 >1 个子节点(children.size() > 1);
 *   2. 其中至少一个子节点不是 CellContainer。
 *
 * 本 demo 通过自定义 CellRendererComponent 且根节点用普通 View(而不是
 * CellContainer)来满足条件 2 —— 这正是业务侧最常见的错误用法。
 *
 * 注意:两个包名在本项目中等价(harmony alias):
 *   @shopify/flash-list  →  @react-native-ohos/flash-list (dist/FlashList.js)
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

// 造 20 条数据,保证列表会渲染出多个 cell(children.size() > 1)
const DATA = Array.from({ length: 20 }, (_, i) => ({ id: `item-${i}`, title: `第 ${i + 1} 行` }));

/**
 * 错误示范:自定义 CellRendererComponent 的根节点是普通 View。
 *
 * FlashList.js 内部:
 *   const CellRendererComponent = this.props.CellRendererComponent ?? CellContainer;
 *   <CellRendererComponent {...props} index={parentProps.index}>...</CellRendererComponent>
 *
 * 传入本组件后,AutoLayoutView 的直接子节点变成 RN View(→ ViewComponentInstance),
 * 而不是 CellContainer(→ CellContainerComponentInstance),
 * dynamic_pointer_cast 全部返回 nullptr → fixLayout 排序时崩溃。
 *
 * ✅ 正确写法见文件底部 SafeCellRenderer。
 */
const BrokenCellRenderer = (props: any) => {
  // 故意不用 CellContainer 作为根节点
  return (
    <View style={styles.cell}>
      <Text>{`[View root] ${props?.index ?? "?"}`}</Text>
      {props?.children}
    </View>
  );
};

/** 正确示范:根节点必须是 CellContainer 并透传 props(index 等原生 props 依赖它) */
const SafeCellRenderer = (props: any) => {
  return (
    <CellContainer {...props}>
      <View style={styles.cell}>
        <Text>{`[CellContainer root] ${props?.index ?? "?"}`}</Text>
        {props?.children}
      </View>
    </CellContainer>
  );
};

import { CellContainer } from "@shopify/flash-list";

export default function FlashListCrashRepro() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        自定义 CellRendererComponent 根节点为 View → 复现 fixLayout 空指针崩溃
      </Text>
      <FlashList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        estimatedItemSize={60}
        // ↓ 就是这一行触发 crash:cell 根节点不是 CellContainer
        CellRendererComponent={BrokenCellRenderer}
        // 改成下面这行即可避免崩溃(或删除上一行用默认 CellContainer):
        // CellRendererComponent={SafeCellRenderer}
        // 也可以保留自定义组件,同时关闭自动布局修正:
        // disableAutoLayout={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#fff" },
  header: { fontSize: 14, color: "#c0392b", padding: 12, textAlign: "center" },
  cell: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  item: { fontSize: 16 },
});
