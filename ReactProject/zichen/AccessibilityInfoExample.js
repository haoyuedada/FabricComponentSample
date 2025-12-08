/**ollapsable
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

const React = require('react');

const {
  AccessibilityInfo,
  Button,
  Text,
  View,
  ScrollView,
  findNodeHandle,
} = require('react-native');
import { useState, } from 'react';

function AccessibilityInfoExample() {
  const [accessibilityServiceChanged, setAccessibilityServiceChanged] = useState('ready');
  const [screenReaderChanged, setScreenReaderChanged] = useState('ready');
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState('ready');
  const [isBoldTextEnabled, setIsBoldTextEnabled] = useState('ready');
  const myRef = React.useRef <? React.ElementRef < typeof Text >> (null);
  const myRef1 = React.useRef <? React.ElementRef < typeof Text >> (null);
  const [isAccessibilityServiceEnabled, setIsAccessibilityServiceEnabled] = useState('ready');

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>1.addEventListener</Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityServiceChanged</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.在正常模式下点击按钮，当开启无障模式中的屏幕朗读功能后，日志内容由ready变为accessibilityServiceChanged!!</Text>
          <Text style={{ marginBottom: 5 }}>2.开启无障模式中的屏幕朗读功能后，点击按钮，关闭屏幕阅读功能后，日志内容由ready变为accessibilityServiceChanged!!</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="addEventListener"
            onPress={() => {
              AccessibilityInfo.addEventListener(
                'accessibilityServiceChanged',
                () => {
                  setAccessibilityServiceChanged('accessibilityServiceChanged!!')
                })
            }}></Button>
          <View style={{ borderWidth: 2, borderColor: 'pink', padding: 10, marginTop: 5 }}>
            <Text>log文本：{accessibilityServiceChanged}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>1.addEventListener</Text>
          <Text style={{ marginBottom: 5 }}>属性值：screenReaderChanged</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.在正常模式下点击按钮，当开启无障模式中的屏幕朗读功能后，日志内容由ready变为screenReaderChanged!!</Text>
          <Text style={{ marginBottom: 5 }}>2.在开启无障模式中的屏幕朗读功能后，点击按钮，再关闭屏幕朗读功能，日志内容由ready变为screenReaderChanged!!</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="addEventListener"
            onPress={() => {
              AccessibilityInfo.addEventListener(
                'screenReaderChanged',
                () => {
                  setScreenReaderChanged('screenReaderChanged!!')
                })
            }}></Button>
          <View style={{ borderWidth: 2, borderColor: 'pink', padding: 10, marginTop: 5 }}>
            <Text>log文本：{screenReaderChanged}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>2.announceForAccessibility</Text>
          <Text style={{ marginBottom: 5 }}>属性值：announceForAccessibility('测试文本')</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击按钮后，读出announceForAccessibility的值，“测试文本”</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="announceForAccessibility"
            onPress={() => {
              AccessibilityInfo.announceForAccessibility('测试文本')
            }}></Button>
        </View>

        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>3.isBoldTextEnabled</Text>
          <Text style={{ marginBottom: 5 }}>属性值：isBoldTextEnabled</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：（测试路径：设置--显示和亮度--字体大小和界面缩放--调整字体粗细）</Text>
          <Text style={{ marginBottom: 5 }}>1.调整字体粗细后，点击按钮，日志内容由ready变为字体加粗显示</Text>
          <Text style={{ marginBottom: 5 }}>2.标准模式下点击按钮，日志内容由ready变为字体加粗显示</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="isBoldTextEnabled" onPress={() => {
            AccessibilityInfo.isBoldTextEnabled().then(isEnabled => {
              if (isEnabled) {
                setIsBoldTextEnabled("字体加粗显示")
              } else {
                setIsBoldTextEnabled("字体未加粗显示")
              }
            });
          }}>
          </Button>
          <View style={{ borderWidth: 2, borderColor: 'pink', padding: 10, marginTop: 5 }}>
            <Text>log文本：{isBoldTextEnabled}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>4.isScreenReaderEnabled</Text>
          <Text style={{ marginBottom: 5 }}>属性值：isScreenReaderEnabled</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.正常模式下点击按钮，日志内容由ready变为正常模式</Text>
          <Text style={{ marginBottom: 5 }}>2.无障碍模式下点击按钮，日志内容由ready变为无障碍模式</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="isScreenReaderEnabled" onPress={() => {
            AccessibilityInfo.isScreenReaderEnabled().then(isEnabled => {
              if (isEnabled) {
                setIsScreenReaderEnabled("无障碍模式")
              } else {
                setIsScreenReaderEnabled("正常模式")
              }
            });
          }}>
          </Button>
          <View style={{ borderWidth: 2, borderColor: 'pink', padding: 10, marginTop: 5 }}>
            <Text>log文本：{isScreenReaderEnabled}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>5.setAccessibilityFocus</Text>
          <Text style={{ marginBottom: 5 }}>属性值：setAccessibilityFocus</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击按钮后，焦点跳转至下方文本内容，且读出文本：设置可访问性焦点</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="setFocus" onPress={() => {
            if (myRef1 && myRef1.current) {
              AccessibilityInfo.setAccessibilityFocus(findNodeHandle(myRef1.current), 'focus');
            }
          }}>
          </Button>
          <Text ref={myRef1} style={{ borderWidth: 2, borderColor: 'pink', padding: 10, marginTop: 5 }}>设置可访问性焦点</Text>
        </View>

        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>6.isAccessibilityServiceEnabled</Text>
          <Text style={{ marginBottom: 5 }}>属性值：isAccessibilityServiceEnabled</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.正常模式下点击按钮，日志内容由ready变为正常模式</Text>
          <Text style={{ marginBottom: 5 }}>2.无障碍模式下点击按钮，日志内容由ready变为无障碍模式</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="isAccessibilityServiceEnabled" onPress={() => {
            AccessibilityInfo.isAccessibilityServiceEnabled().then(isEnabled => {
              if (isEnabled) {
                setIsAccessibilityServiceEnabled("无障碍模式")
              } else {
                setIsAccessibilityServiceEnabled("正常模式")
              }
            });
          }}>
          </Button>
          <View style={{ borderWidth: 2, borderColor: 'pink', padding: 10, marginTop: 5 }}>
            <Text>log文本：{isAccessibilityServiceEnabled}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>7.sendAccessibilityEvent</Text>
          <Text style={{ marginBottom: 5 }}>属性值：sendAccessibilityEvent</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击按钮后，焦点跳转至下方文本内容，且读出文本：发送可访问性事件</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button title="sendEvent" onPress={() => {
            if (myRef && myRef.current) {
              AccessibilityInfo.sendAccessibilityEvent(myRef.current, 'focus');
            }
          }}>
          </Button>
          <Text ref={myRef} style={{ borderWidth: 2, borderColor: 'pink', padding: 10, marginTop: 5 }}>发送可访问性事件</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default ({
  title: 'AccessibilityInfo',
  name: 'AccessibilityInfoAccessible',
  description:
    'Accessiblity about AccessibilityInfo',
  render: () => <AccessibilityInfoExample />
}: RNTesterModuleExample);
