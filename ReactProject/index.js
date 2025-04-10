/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 *
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
// import Test from './testTurboModule/test';
// import RCTMessage from './tests/RCTMessage';
// import FastImage from './tests/FastImage';
import App from './App'
// import Modal from './tests/Modal'
// import ScrollView from './tests/ScrollView'
// import QDScrollView from './tests/QDScrollView'
// import RCT from './tests/RCT'
// import FontSlice from './tests/FontSlice'
// import Image from './tests/Image'
// import Animatedtwo from './tests/Animatedtwo'

AppRegistry.registerComponent(appName, () => App);
