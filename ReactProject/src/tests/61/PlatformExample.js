import React from 'react';
import { Platform, StyleSheet, Text, ScrollView, View } from 'react-native';

const PlatformConstants = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：Constants</Text>
      <Text style={{ padding: 5 }}>预期结果：返回平台相关的所有可用的公共常量和特定常量信息</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={styles.value}>
        {JSON.stringify(Platform.constants, null, 2)}
      </Text>
    </ScrollView>
  );
};
const PlatformIsPad = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：isPad</Text>
      <Text style={{ padding: 5 }}>预期结果：返回当前设备是否为iPad，值为true，当前设备是iPad，值为false，当前设备不是iPad</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={styles.value}>{Platform.isPad.toString()}</Text>
    </ScrollView>
  );
};
const PlatformIsTV = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：isTV</Text>
      <Text style={{ padding: 5 }}>预期结果：返回当前设备是否为TV，值为true，当前设备是TV，值为false，当前设备不是TV</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={styles.value}>{Platform.isTV.toString()}</Text>
    </ScrollView>
  );
};
const PlatformIsTesting = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：isTesting</Text>
      <Text style={{ padding: 5 }}>预期结果：返回当前应用程序是否在开发人员模式下运行，并设置了测试标志,值为true，则是，值为false则不是</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={styles.value}>{Platform.isTesting.toString()}</Text>
    </ScrollView>
  );
};
const PlatformOS = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：OS</Text>
      <Text style={{ padding: 5 }}>预期结果：返回对应操作系统平台</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={styles.value}>{Platform.OS}</Text>
    </ScrollView>
  );
};
const PlatformOSVersion = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：Version</Text>
      <Text style={{ padding: 5 }}>预期结果：返回OS对应的版本</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={styles.value}>{Platform.Version}</Text>
    </ScrollView>
  );
};

const PlatformSelect = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：select</Text>
      <Text style={{ padding: 5 }}>预期结果：文本内容显示对应平台的背景颜色</Text>
      <Text style={{ padding: 5 }}>1.Android平台显示红色背景</Text>
      <Text style={{ padding: 5 }}>2.IOS平台显示绿色背景</Text>
      <Text style={{ padding: 5 }}>3.Harmony平台显示黑色背景</Text>
      <Text style={{ padding: 5 }}>4.其他平台显示蓝色背景</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={{
        padding: 5,
        ...Platform.select({
          android: {
            backgroundColor: 'red'
          },
          ios: {
            backgroundColor: 'green'
          },
          harmony: {
            backgroundColor: 'black'
          },
          default: {
            // other platforms, web for example
            backgroundColor: 'blue'
          },
          width: '100%',
        })
      }}>文本内容
      </Text>
    </ScrollView>
  );
};

const PlatformFontScale = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>属性值：getFontScale</Text>
      <Text style={{ padding: 5 }}>预期结果：返回系统的字体大小比例。1.0为默认大小。</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      {/* 这里需要异步获取，实际使用时需用 useState + useEffect */}
      <Text style={styles.value}>获取方法：Platform.constants.fontScale 或 使用 PixelRatio.getFontScale()</Text>
      <Text style={styles.value}>当前字体缩放比例 (来自constants): {Platform.constants?.fontScale || 'N/A'}</Text>
    </ScrollView>
  );
};

const PlatformDeviceInfo = () => {
  const info = {
    '操作系统': Platform.OS,
    '系统版本': Platform.Version,
    '是否iPad': Platform.isPad?.toString() || 'false',
    '是否TV': Platform.isTV?.toString() || 'false',
    '设备型号': Platform.constants?.Model || 'Unknown',
    '接口类型': Platform.constants?.interfaceIdiom || 'N/A', // 如 ‘phone’, ‘pad’
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>测试项：关键设备信息概览</Text>
      <Text style={{ padding: 5 }}>预期结果：集中显示当前设备的核心平台信息。</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      {
        Object.entries(info).map(([key, value]) => (
          <Text key={key} style={styles.value}>{key}: {value}</Text>
        ))
      }
    </ScrollView>
  );
};

const PlatformAPICheck = () => {
  // 这是一个模拟函数，实际检查逻辑会更复杂
  const checkAPI = (apiName) => {
    const rnVersion = Platform.constants?.reactNativeVersion;
    // 示例逻辑：假设某个API在 RN 0.65 及以上才稳定
    if (rnVersion && rnVersion.minor >= 65) {
      return `✅ ${apiName} 在当前版本 (${rnVersion.major}.${rnVersion.minor}) 可用`;
    }
    return `⚠️  ${apiName} 在当前版本可能需要兼容性处理`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ padding: 5 }}>测试项：特定API可用性检查（示例）</Text>
      <Text style={{ padding: 5 }}>预期结果：根据 React Native 版本判断 LayoutAnimation API 的可用性。</Text>
      <Text style={{ padding: 5 }}>实际结果：</Text>
      <Text style={styles.value}>{checkAPI('LayoutAnimation')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8
  },
  container: {
    flex: 1
  }
});

exports.title = 'Platform Example';
exports.description = 'You can get the pixel density and font scaling ratio of the device.';
exports.examples = [
  {
    title: '1.constants',
    render(): React.Node {
      return <PlatformConstants />
    },
  },
  {
    title: '2.isPad',
    render(): React.Node {
      return <PlatformIsPad />
    },
  },
  {
    title: '3.isTV',
    render(): React.Node {
      return <PlatformIsTV />
    },
  },
  {
    title: '4.isTesting',
    render(): React.Node {
      return <PlatformIsTesting />
    },
  },
  {
    title: '5.OS',
    render(): React.Node {
      return <PlatformOS />
    },
  },
  {
    title: '6.Version',
    render(): React.Node {
      return <PlatformOSVersion />
    },
  },
  {
    title: '7.select',
    render(): React.Node {
      return <PlatformSelect />
    },
  },
  {
    title: '8.FontScale',
    render(): React.Node {
      return <PlatformFontScale />
    },
  },
  {
    title: '9.Device Info Overview',
    render(): React.Node {
      return <PlatformDeviceInfo />
    },
  },
  {
    title: '10.API Availability Check',
    render(): React.Node {
      return <PlatformAPICheck />
    },
  },

]