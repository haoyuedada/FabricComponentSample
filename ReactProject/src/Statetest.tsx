import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class CounterApp extends React.Component {
  // 初始化状态
  state = {
    count: 0,
    message: '计数器未启动'
  };

  // 增加计数器的方法
  handleIncrement = () => {
    console.log("chy setState pre:", this.state.count);
    this.setState(
      (prevState) => ({
        count: prevState.count + 1,
        message: '正在增加...'
      }),
      // 状态更新后的回调函数
      () => {
        console.log("chy setState callback:", this.state.count);
        // 当状态更新完成后执行
        if (this.state.count > 5) {
          this.setState({ message: '计数器已超过5!' });
        }
      }
    );
    console.log("chy setState nex:", this.state.count);
  };

  // 重置计数器的方法
  handleReset = () => {
    this.setState({
      count: 0,
      message: '计数器已重置'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>计数器示例</Text>
        
        <Text style={styles.countText}>当前计数: {this.state.count}</Text>
        <Text style={styles.messageText}>{this.state.message}</Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="增加计数" 
            onPress={this.handleIncrement} 
            color="#4CAF50"
          />
          
          <View style={styles.buttonSpacer} />
          
          <Button 
            title="重置" 
            onPress={this.handleReset} 
            color="#F44336"
          />
        </View>
      </View>
    );
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  countText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#2196F3'
  },
  messageText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#FF9800'
  },
  buttonContainer: {
    width: '60%'
  },
  buttonSpacer: {
    height: 10
  }
});

export default CounterApp;