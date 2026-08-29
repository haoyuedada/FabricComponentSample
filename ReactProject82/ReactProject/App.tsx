/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */


import React from 'react';
import { StyleSheet } from 'react-native';
import FlashListCrashRepro from './src/flash-list/CrashReproDemo'

// 测试用例
const App = () => {
  return (
    <FlashListCrashRepro />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 20,
    padding: 8,
    textAlign: 'center'
  }
});

export default App;
