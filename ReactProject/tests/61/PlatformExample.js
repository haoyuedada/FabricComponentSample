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

]