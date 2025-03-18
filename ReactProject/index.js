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
import RCTMessage from './tests/RCTMessage';

AppRegistry.registerComponent(appName, () => RCTMessage);
