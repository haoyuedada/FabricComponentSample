import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default class StateUpdateDemo extends Component {
  state = {
    count: 0,
    isOn: false,
  }

  // 方法1：使用解构的状态（有问题的写法）

  // 方法2：直接使用this.state（正确的写法）
  updateDirectly = () => {
    this.addLog(`直接使用前: count=${this.state.count}, isOn=${this.state.isOn}`);

    this.setState({
      count: this.state.count + 1,
      isOn: !this.state.isOn
    }, () => {
      this.addLog(`直接更新后: count=${this.state.count}, isOn=${this.state.isOn}`);
    });
  }
  // 添加日志
  addLog = (message) => {
    this.setState(prevState => ({
      logs: [`[${new Date().toLocaleTimeString()}] ${message}`, ...prevState.logs.slice(0, 20)]
    }));
  }

  // 清空日志
  clearLogs = () => {
    this.setState({ logs: [] });
  }

  // 重置状态
  resetState = () => {
    this.setState({
      count: 0,
      isOn: false
    });
  }

  render() {
    const { count, isOn } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>状态更新对比 Demo</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>当前count: {count}</Text>
          <Text style={styles.statusText}>
            当前isOn: {isOn ? '✅ ON' : '❌ OFF'}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={() => {
              console.log("chy 使用解构更新 count:", count, " isOn:", isOn);
              const newCount = count + 1;
              const newIsOn = !isOn;
              this.setState({
                count: newCount,
                isOn: newIsOn
              });
            }}
          >
            <Text style={styles.buttonText}>使用解构更新</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={() => {
              const newCount = this.state.count + 1;
              const newIsOn = !this.state.isOn;
              this.setState({
                count: newCount,
                isOn: newIsOn
              });
            }}
          >
            <Text style={styles.buttonText}>直接使用this.state</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={this.resetState}
          >
            <Text style={styles.buttonText}>重置状态</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={this.clearLogs}
          >
            <Text style={styles.buttonText}>清空日志</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  buttonsContainer: {
    marginBottom: 15,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  warningButton: {
    backgroundColor: '#ffc107',
  },
  asyncButton: {
    backgroundColor: '#6f42c1',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    flex: 0.48,
  },
  logsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  logsScrollView: {
    flex: 1,
  },
})
