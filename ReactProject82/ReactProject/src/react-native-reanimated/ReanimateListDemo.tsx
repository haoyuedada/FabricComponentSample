/**
 * MIT License
 *
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Platform
} from 'react-native';

import { NavigationContainer, Page } from './AnimatedNavigation';
import { PortalHost, PortalProvider } from '@gorhom/portal';

import { ALL_PAGE, HIde_PAGE } from './PageConstant';

const pages = Object.keys(ALL_PAGE).map(componentName => ({
  name: componentName,
  component: componentName,
}));
function App() {
  return (
    <View style={{ backgroundColor: 'black', flexDirection: "column" ,marginBottom:20}}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <NavigationContainer>
          <PortalProvider>
            <View id="__harmony::ready" />
            {pages.map((page) => {
              const Component = ALL_PAGE[page.component];
              let isRootPage = !HIde_PAGE.includes(page.name);
              return (
                <Page 
                key={page.name} 
                name={page.name} 
                isRootPage={isRootPage}
              >
                <Component />
              </Page>
              );
            })}
            <View
              style={[
                { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, pointerEvents: 'box-none' },
              ]}>
              <PortalHost name="ModalHost" />
            </View>
          </PortalProvider>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

export default {
  displayName: "react-native-reanimated",
  framework: "React",
  category: "Animated",
  title: "react-native-reanimated",
  documentationURL: "https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/react-native-reanimated.md",
  description: "动画库",
  examples: [
    {
      title: "reanimated",
      render: function (): any {
        return <App />;
      },
    },
  ],
};