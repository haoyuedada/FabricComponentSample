/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
const { Text, StyleSheet, View, Alert, ScrollView, Button, } = require('react-native');
const React = require('react');

import { useState } from 'react';

function ButtonAccessibleExample() {
  const [pressColor, setPressColor] = useState('rgb(33, 150, 243)')
  const [onAccessibilityAction, setOnAccessibilityAction] = useState('ready');
  const press = (e) => {
    pressColor == 'rgb(33, 150, 243)' ? setPressColor('#f194ff') : setPressColor('rgb(33, 150, 243)');
  };
  const [bg, setBg] = useState('#FFFFFF');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box} >
        <Text style={styles.title}>1.accessibilityLabel</Text>
        <Text>属性值：{"accessibilityLabel='Tap me!'"}</Text>
        <Text>预期结果：设置accessibilityLabel标签后，点击会读出选中元素的无障碍标签Tap me</Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          accessibilityLabel='Tap me!'
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>2.accessibilityState</Text>
        <Text style={{ padding: 3 }}>预期效果：向辅助技术的用户描述组件的当前状态。</Text>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'disabled': true }}"}</Text>
          <Text>预期效果:点击按钮后，提示“不可用”</Text>
          <Text>实际效果:</Text>
          <Button
            title="点击"
            onPress={press}
            accessible={true}
            accessibilityRole={Platform.select({ harmony: 'button' })}
            accessibilityState={{ 'disabled': true }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'selected': true }}"}</Text>
          <Text>预期效果:点击按钮后，提示“已选中 ”</Text>
          <Text>实际效果:</Text>
          <Button
            title="点击"
            onPress={press}
            accessible={true}
            accessibilityState={{ 'selected': true }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'checked': true }}"}</Text>
          <Text>预期效果:点击按钮后，提示“已选中 ”</Text>
          <Text>实际效果:</Text>
          <Button
            title="点击"
            onPress={press}
            accessibilityRole={Platform.select({ harmony: 'checkbox' })}
            accessible={true}
            accessibilityState={{ 'checked': true }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'busy': true }}"}</Text>
          <Text>预期效果:点击按钮后，提示busy</Text>
          <Text>实际效果:</Text>
          <Button
            title="点击"
            onPress={press}
            accessible={true}
            accessibilityState={{ 'busy': true }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'expanded': true }}"}</Text>
          <Text>预期效果:点击按钮后，提示“已展开”</Text>
          <Text>实际效果:</Text>
          <Button
            title="点击"
            onPress={press}
            accessible={true}
            accessibilityState={{ 'expanded': true }}
          />
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>3.aria-busy</Text>
        <Text>属性值：{'aria-busy=true'} </Text>
        <Text>预期结果：1,当aria-busy值为true时，点击按钮后，提示busy</Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          aria-busy={true}
        />
        <Text>属性值：{'aria-busy=false'}</Text>
        <Text>预期结果：2,当aria-busy值为false时，点击按钮后。读出按钮2 </Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          aria-label='按钮2'
          aria-busy={false}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>4.aria-checked</Text>
        <Text>属性值：{'aria-checked=false'}</Text>
        <Text>预期结果：</Text>
        <Text>1.当aria-checked为false时，点击按钮后，提示元素未被选择</Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          role="checkbox"
          onPress={press}
          accessible={true}
          aria-checked={false}
        />
        <Text>属性值：{'aria-checked=true'}</Text>
        <Text>预期结果：</Text>
        <Text>2.当aria-checked为true时，点击按钮后，提示元素被选择</Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          role="checkbox"
          onPress={press}
          accessible={true}
          aria-checked={true}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>5.aria-disabled</Text>
        <Text>属性值：{'aria-disabled=false'}</Text>
        <Text>预期结果：</Text>
        <Text>1.当aria-disabled为false时，点击按钮后，表示清除非激活状态</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          aria-disabled={false}
        />
        <Text>属性值：{'aria-disabled=true'}</Text>
        <Text>预期结果：</Text>
        <Text>2.当aria-disabled为true时，点击按钮后，表示当前是非激活状态，元素不可用</Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          disabled={true}
          aria-disabled={true}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>6.aria-expanded</Text>
        <Text>属性值：{'aria-expanded=false'}</Text>
        <Text>预期结果：</Text>
        <Text>1.当aria-expanded为false时，点击按钮后，表示元素不是展开</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          aria-expanded={false}
        />
        <Text>属性值：{'aria-expanded=true'}</Text>
        <Text>预期结果：</Text>
        <Text>2.当aria-expanded为true时，点击按钮后，表示元素是展开的</Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          aria-expanded={true}
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>7.aria-label</Text>
        <Text>属性值：{"aria-label='这是在一个“安全”的可视区域内渲染内容的组件'"} </Text>
        <Text>预期结果：点击按钮，内容提示：这是在一个“安全”的可视区域内渲染内容的组件</Text>
        <Text>实际结果：</Text>
        <Button
          title="点击"
          onPress={press}
          accessible={true}
          aria-label='这是在一个“安全”的可视区域内渲染内容的组件'
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>8.aria-selected</Text>
        <Text>属性值：aria-selected</Text>
        <Text>预期结果：点击左边按钮,读出“已选中按钮1”，点击右边按钮，读出“按钮2”</Text>
        <Text>实际结果：</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button
            title='点击'
            onPress={press}
            aria-selected={true}
            accessible={true}
            aria-label='按钮1'
          />
          <Button
            title='点击'
            onPress={press}
            accessible={true}
            aria-selected={false}
            aria-label='按钮2'
          />
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>9.importantForAccessibility</Text>
        <Text>属性值：importantForAccessibility:yes,no-hide-descendant</Text>
        <Text>预期效果:当可访问性为true时，渲染“按钮1”并忽略“按钮2”；点击整个视图，读出“按钮1”</Text>
        <Text>实际效果:</Text>
        <View accessible={true}
          style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
          <Button
            title='点击'
            onPress={press}
            accessible={true}
            importantForAccessibility="yes"
            aria-label='按钮1'
          />
          <Button
            title='点击'
            onPress={press}
            accessible={true}
            importantForAccessibility="no-hide-descendant"
            aria-label='按钮2'
          />
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>10.accessible</Text>
        <Text>属性值：{'accessible={true}'}</Text>
        <Text>预期结果：设置为true后不能单独选择按钮 只能选择整个视图</Text>
        <Text>实际结果：</Text>
        <View accessible={true}
          style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
          <Button
            title='点击'
            aria-label="按钮1"
          />
          <Button
            title='点击'
            aria-label="按钮2"
          />
        </View>
        <Text>预期结果：设置为false后能单独选择按钮</Text>
        <Text>实际结果：</Text>
        <View accessible={false}
          style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
          <Button
            title='点击'
            aria-label="按钮1"
          />
          <Button
            title='点击'
            aria-label="按钮2"
          />
        </View>
      </View>

      <View style={styles.box}>
        <Text style={{ padding: 3, ...styles.title }}>11.accessibilityActions</Text>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：{"accessibilityActions={[{name: 'activate',label: 'activate'}]} "} </Text>
          <Text>属性值：onAccessibilityAction</Text>
          <Text>预期结果：双击按钮后，弹出弹窗，显示“点击成功”</Text>
          <Text>实际结果：</Text>
          <Button
            title='点击'
            accessible={true}
            onPress={press}
            accessibilityActions={[{ name: 'activate' }]}
            onAccessibilityAction={event => {
              switch (event.nativeEvent.actionName) {
                case 'activate':
                  Alert.alert('Alert', '点击成功');
                  break;
              }
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 5 }}>属性值：{"accessibilityActions={[{name: 'copy',label: 'copy'}]} "} </Text>
          <Text>属性值：onAccessibilityAction</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：三指双击按钮后，背景变为红色</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button
            title='点击'
            accessible={true}
            onPress={press}
            accessibilityActions={[{ name: 'copy', label: 'copy' }]}
            onAccessibilityAction={event => {
              setBg('red');
            }}
          />
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>12.accessibilityHint</Text>
        <Text style={{ padding: 3 }}>属性值：提示：没有文本</Text>
        <Text style={{ padding: 3 }}>预期效果：点击按钮，让屏幕阅读器显示“这个视图有一个红色背景”和“提示:没有文本”</Text>
        <View style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}>
          <Button
            title='点击'
            accessible={true}
            aria-label="这个容器有个红色的背景"
            accessibilityHint="提示:没有文本"
          />
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>13.accessibilityLanguage</Text>
        <Text>属性值：accessibilityLanguage</Text>
        <Text>预期效果:使用中文的辅助功能打开时，点击这个按钮，可以听到 "爱" 的声音提示</Text>
        <Text>实际效果:</Text>
        <Button
          title='点击'
          accessible={true}
          aria-label="love"
          accessibilityLanguage="zh"
        />
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>14-1.onAccessibilityAction</Text>
        <Text style={{ padding: 3 }}>预期效果：点击按钮后出现'View is clicked'的弹窗 </Text>
        <Text>实际结果：</Text>
        <Button
          title='点击'
          accessible={true}
          accessibilityActions={[{ name: 'activate', label: 'activate' }]}
          onAccessibilityAction={event => {
            switch (event.nativeEvent.actionName) {
              case 'activate':
                Alert.alert('Alert', 'View is clicked');
                break;
            }
          }}
        />
      </View>
      <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320, }}>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>14-2.onAccessibilityAction</Text>
        <Text style={{ marginBottom: 5 }}>属性值：onAccessibilityAction</Text>
        <Text style={{ marginBottom: 5 }}>预期结果：双击按钮后，log文本内容由ready变为run done</Text>
        <Text style={{ marginBottom: 5 }}>实际结果：</Text>
        <Button
          title='点击'
          accessible={true}
          accessibilityActions={[{ name: 'activate', label: 'activate' }]}
          onAccessibilityAction={event => {
            if (event.nativeEvent.actionName === 'activate') {
              setOnAccessibilityAction('run done');
            }
          }}
        />
        <View style={{ marginTop: 10, borderColor: '#f0f0f0', backgroundColor: '#f9f9f9', }}>
          <Text>log文本：</Text>
          <Text style={{ padding: 10 }}>{onAccessibilityAction}</Text>
        </View>
      </View>


    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 30,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 18
  },
  box: {
    height: 'auto',
    marginBottom: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: '#c1c1c1',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  squaresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    margin: 4,
  },
  squareContent: {
    textAlignVertical: 'center',
    textAlign: 'center',
    height: '100%',
  },
  accessibilityContainer: {
    width: '100%',
    backgroundColor: 'gray',
  },
  accessibilityLayout: {
    width: '100%',
    height: 100,
    backgroundColor: 'lightblue',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  gridContainerSquare: {
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
    margin: 4,
  },
});


export default ({
  title: 'Button',
  name: 'ButtonAccessible',
  description:
    'Accessiblity about Button',
  render: () => <ButtonAccessibleExample />,
}: RNTesterModuleExample);