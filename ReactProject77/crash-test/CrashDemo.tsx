import React from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AnimatedComponent from './AnimatedComponent';
import ToJSValueDemo from './ToJSValueDemo';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reanimated PropsRegistry 崩溃测试</Text>
        <Text style={styles.description}>
          此 Demo 演示 React Native Reanimated 在组件卸载时的崩溃问题
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>崩溃原因</Text>
          <Text style={styles.cardText}>
            当使用 useDerivedValue 等 API 时，组件卸载期间 PropsRegistry
            的析构函数可能访问无效内存，导致应用崩溃
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>触发步骤</Text>
          <Text style={styles.cardText}>
            1. 点击下方按钮进入动画页面{'\n'}
            2. 等待动画开始运行{'\n'}
            3. 在动画运行时点击返回按钮{'\n'}
            4. 观察应用崩溃
          </Text>
        </View>

        <Button
          title="进入崩溃测试"
          onPress={() => navigation.navigate('Animation')}
          color="#6366f1"
        />

        <View style={{height: 12}} />

        <Button
          title="toJSValue Demo"
          onPress={() => navigation.navigate('ToJSValue')}
          color="#8b5cf6"
        />

        <Text style={styles.warning}>
          ⚠️ 未修复版本会导致应用崩溃，请确保在安全环境测试
        </Text>
      </View>
    </SafeAreaView>
  );
}

function AnimationScreen({navigation}: any) {
  return (
    <SafeAreaView style={styles.animationContainer}>
      <AnimatedComponent onGoBack={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

function ToJSValueScreen({navigation}: any) {
  return (
    <SafeAreaView style={styles.animationContainer}>
      <ToJSValueDemo onGoBack={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

export default function CrashDemo() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '崩溃测试主页',
            headerStyle: {backgroundColor: '#6366f1'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Animation"
          component={AnimationScreen}
          options={{
            title: '动画页面',
            headerStyle: {backgroundColor: '#e53e3e'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ToJSValue"
          component={ToJSValueScreen}
          options={{
            title: 'toJSValue Demo',
            headerStyle: {backgroundColor: '#8b5cf6'},
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#4a5568',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
  },
  warning: {
    fontSize: 12,
    color: '#e53e3e',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
  animationContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
