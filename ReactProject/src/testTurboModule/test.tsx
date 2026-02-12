import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import SampleTurboModule from 'turbo-module/src/specs/v1/SampleTurboModule';

interface TestCase {
  name: string;
  description: string;
  testFn: () => Promise<string>;
}

const TestTurboModule: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [isTesting, setIsTesting] = useState(false);

  // 测试用例配置
  const testCases: TestCase[] = [
    {
      name: 'getConstants',
      description: '获取常量值',
      testFn: async () => {
        try {
          const result = await SampleTurboModule.getConstants();
          return `ID: ${result.id}, Message: ${result.Data.message}`;
        } catch (error) {
          return `失败: ${error}`;
        }
      },
    },
    {
      name: 'testParamsEmpty',
      description: '测试无参数方法',
      testFn: async () => {
        try {
          SampleTurboModule.testParamsEmpty();
          return '成功';
        } catch (error) {
          return `失败: ${error}`;
        }
      },
    },
    {
      name: 'pushStringToHarmony',
      description: '测试字符串传递（异步）',
      testFn: async () => {
        return new Promise((resolve) => {
          try {
            SampleTurboModule.pushStringToHarmony('测试字符串', (value) => {
              resolve(`返回值: ${value}`);
            });
          } catch (error) {
            resolve(`失败: ${error}`);
          }
        });
      },
    },
    {
      name: 'pushStringToHarmonyCallBack',
      description: '测试字符串传递（同步）',
      testFn: async () => {
        return new Promise((resolve) => {
          try {
            SampleTurboModule.pushStringToHarmonyCallBack('测试字符串', (value) => {
              resolve(`返回值: ${value}`);
            });
          } catch (error) {
            resolve(`失败: ${error}`);
          }
        });
      },
    },
    {
      name: 'doAsyncJobSuccess',
      description: '测试异步任务成功',
      testFn: async () => {
        try {
          const result = await SampleTurboModule.doAsyncJob(true);
          return `Result: ${JSON.stringify(result)}`;
        } catch (error) {
          return `失败: ${error}`;
        }
      },
    },
    {
      name: 'doAsyncJobFailure',
      description: '测试异步任务失败',
      testFn: async () => {
        try {
          await SampleTurboModule.doAsyncJob(false);
          return '失败：应该返回错误';
        } catch (error) {
          return `成功: ${error}`;
        }
      },
    },
  ];

  // 执行单个测试
  const runTest = async (testCase: TestCase) => {
    setIsTesting(true);
    setTestResults((prev) => ({ ...prev, [testCase.name]: '测试中...' }));

    try {
      const result = await testCase.testFn();
      setTestResults((prev) => ({
        ...prev,
        [testCase.name]: `✅ ${result}`,
      }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [testCase.name]: `❌ ${error}`,
      }));
    }

    setIsTesting(false);
  };

  // 执行所有测试
  const runAllTests = async () => {
    for (const testCase of testCases) {
      await runTest(testCase);
    }
  };

  // 清理测试结果
  const clearResults = () => {
    setTestResults({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SampleTurboModule 测试工具</Text>
        <Text style={styles.subtitle}>React Native for OpenHarmony</Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={runAllTests}
          disabled={isTesting}
        >
          <Text style={styles.buttonText}>
            {isTesting ? '测试进行中...' : '运行所有测试'}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.secondaryButton]}
          onPress={clearResults}
          disabled={isTesting}
        >
          <Text style={styles.buttonText}>清理结果</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.testCases} showsVerticalScrollIndicator={true}>
        <Text style={styles.sectionTitle}>测试用例</Text>
        {testCases.map((testCase) => (
          <View key={testCase.name} style={styles.testCaseCard}>
            <View style={styles.testCaseHeader}>
              <Text style={styles.testCaseName}>{testCase.name}</Text>
              <Pressable
                style={styles.runButton}
                onPress={() => runTest(testCase)}
                disabled={isTesting}
              >
                <Text style={styles.runButtonText}>运行</Text>
              </Pressable>
            </View>
            <Text style={styles.testCaseDescription}>
              {testCase.description}
            </Text>
            {testResults[testCase.name] && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                  {testResults[testCase.name]}
                </Text>
              </View>
            )}
          </View>
        ))}
        <View style={styles.scrollPadding} />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          版本: 1.0.0 | 最后更新: 2026-02-12
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  testCases: {
    flex: 1,
  },
  scrollPadding: {
    height: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  testCaseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  testCaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  testCaseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  runButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  runButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  testCaseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  resultContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
    padding: 12,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default TestTurboModule;
