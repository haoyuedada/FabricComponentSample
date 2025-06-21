import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

export default function BottomModalInput() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.openButtonText}>打开底部 Modal</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        {/* 半透明背景，点击也可关闭 */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        />

        {/* 键盘自适应 & 底部对齐 */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 25 })}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>请输入内容：</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={text}
              onChangeText={setText}
              autoFocus
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                console.log('提交的内容：', text);
                setVisible(false);
              }}
            >
              <Text style={styles.submitButtonText}>提交</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 5,            // Android 阴影
    shadowColor: '#000',     // iOS 阴影
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
