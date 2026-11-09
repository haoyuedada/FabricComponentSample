import React, { Component } from 'react';
import { TextInput } from 'react-native';

const UselessTextInput = () => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <TextInput
    placeholder="请输入用户名"
    secureTextEntry={true}  // 密码输入
    maxLength={20}
    onSubmitEditing={() => console.log("提交")}
    />
  );
}

export default UselessTextInput;