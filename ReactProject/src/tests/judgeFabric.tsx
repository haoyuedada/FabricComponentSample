import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  UIManager,
  Platform,
} from "react-native";

// react-native-tab-view 是纯 JS 库，它依赖 react-native-pager-view 提供的原生组件 RNCViewPager。
// 因此判断 tab-view 是否可用，等价于判断原生 ViewManager "RNCViewPager" 是否已注册。
const TAB_VIEW_NATIVE_COMPONENT_NAME = "RNCViewPager";

// 兼容不同 RN 版本：0.74+ 提供 hasViewManagerConfig，旧版本使用 getViewManagerConfig。
function isNativeComponentRegistered(componentName: string): boolean {
  try {
    const uiManager: any = UIManager;
    if (typeof uiManager.hasViewManagerConfig === "function") {
        console.log("Using UIManager.hasViewManagerConfig to check for", componentName);
      return uiManager.hasViewManagerConfig(componentName);
    }
    console.log("Using UIManager.getViewManagerConfig to check for", componentName);
    return uiManager.getViewManagerConfig(componentName) != null;
  } catch (e) {
    console.warn("isNativeComponentRegistered error:", e);
    return false;
  }
}

// 判断 JS 侧 react-native-tab-view 模块是否可加载
function isTabViewJsModuleAvailable(): boolean {
  try {
    // @ts-ignore - 动态判断依赖是否存在
    const mod = require("@react-native-oh-tpl/react-native-tab-view");
    return mod != null && typeof mod.TabView === "function";
  } catch (e) {
    console.warn("react-native-tab-view JS module not available:", e);
    return false;
  }
}

// 判断 JS 侧 react-native-pager-view 模块是否可加载
function isPagerViewJsModuleAvailable(): boolean {
  try {
    // @ts-ignore - 动态判断依赖是否存在
    const mod = require("react-native-pager-view");
    return mod != null;
  } catch (e) {
    console.warn("react-native-pager-view JS module not available:", e);
    return false;
  }
}

type CheckResult = {
  name: string;
  passed: boolean;
  detail: string;
};

const App = () => {
  const [results, setResults] = useState<CheckResult[]>([]);

  useEffect(() => {
    const checks: CheckResult[] = [];

    // 1. 检查 tab-view 的 JS 模块
    const tabViewJsOk = isTabViewJsModuleAvailable();
    checks.push({
      name: "react-native-tab-view JS 模块",
      passed: tabViewJsOk,
      detail: tabViewJsOk
        ? "已加载"
        : "未找到 @react-native-oh-tpl/react-native-tab-view，请检查 package.json 依赖",
    });

    // 2. 检查 pager-view 的 JS 模块（tab-view 的原生依赖）
    const pagerJsOk = isPagerViewJsModuleAvailable();
    checks.push({
      name: "react-native-pager-view JS 模块",
      passed: pagerJsOk,
      detail: pagerJsOk
        ? "已加载"
        : "未找到 react-native-pager-view，tab-view 无法正常工作",
    });

    // 3. 检查原生组件 RNCViewPager 是否注册（核心判断）
    const nativeOk = isNativeComponentRegistered(
      TAB_VIEW_NATIVE_COMPONENT_NAME,
    );
    checks.push({
      name: `原生组件 ${TAB_VIEW_NATIVE_COMPONENT_NAME}`,
      passed: nativeOk,
      detail: nativeOk
        ? "已注册"
        : "未注册。请确认 harmony 侧已集成 @react-native-ohos/react-native-pager-view 并在 Package 中注册",
    });

    // 4. 综合结论：tab-view 可用 = JS 模块齐全 + 原生组件已注册
    const tabViewRegistered = tabViewJsOk && pagerJsOk && nativeOk;
    checks.push({
      name: "react-native-tab-view 综合可用性",
      passed: tabViewRegistered,
      detail: tabViewRegistered
        ? "✅ react-native-tab-view 已正确注册，可正常使用"
        : "❌ react-native-tab-view 未完整注册，请按上方各项排查",
    });

    setResults(checks);

    // 同时输出到控制台，便于在 hdc log 中查看
    console.log("=== judgeFabric: react-native-tab-view 注册检查 ===");
    console.log("Platform:", Platform.OS);
    console.log(
      "UIManager.getViewManagerConfig('RNCViewPager'):",
      (UIManager as any).getViewManagerConfig?.(TAB_VIEW_NATIVE_COMPONENT_NAME),
    );
    console.log(
      "NativeModules keys:",
      Object.keys(NativeModules).filter((k) =>
        k.toLowerCase().includes("pager"),
      ),
    );
    checks.forEach((c) =>
      console.log(`[${c.passed ? "PASS" : "FAIL"}] ${c.name} => ${c.detail}`),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Judge Fabric - TabView 注册检查</Text>
      <Text style={styles.subtitle}>
        原生组件名: {TAB_VIEW_NATIVE_COMPONENT_NAME}
      </Text>
      {results.map((r, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={[styles.badge, r.passed ? styles.ok : styles.fail]}>
            {r.passed ? "PASS" : "FAIL"}
          </Text>
          <View style={styles.content}>
            <Text style={styles.name}>{r.name}</Text>
            <Text style={styles.detail}>{r.detail}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  badge: {
    width: 56,
    marginRight: 12,
    paddingVertical: 4,
    borderRadius: 4,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    overflow: "hidden",
  },
  ok: {
    backgroundColor: "#4caf50",
  },
  fail: {
    backgroundColor: "#f44336",
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  detail: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default App;