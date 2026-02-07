/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
const { Text, TouchableNativeFeedback, Alert, TouchableWithoutFeedback, TextInput, Button, StyleSheet, View, ScrollView,Pressable } = require('react-native');
import { React, useState } from 'react';


const ANNOUNCEMENT_BY_PLATFORM_BY_ACCESSIBILITY_ROLE = new Map <
    AccessibilityRole,
    Record< 'harmony' | 'android', string | undefined >
> ()
            .set('none', { android: undefined, harmony: undefined })
            .set('button', { android: 'button', harmony: 'button' })
            .set('togglebutton', {
                android: 'switch',
                harmony: 'not ticked, that is(?) button',
            })
            .set('link', { android: 'link', harmony: undefined })
            .set('search', { android: 'edit box', harmony: 'edit box' })
            .set('image', { android: 'image', harmony: 'image' })
            .set('keyboardkey', { android: 'keyboardkey', harmony: undefined })
            .set('text', { android: 'text', harmony: undefined })
            .set('adjustable', {
                android: 'slider',
                harmony: 'null %, ...',
            })
            .set('imagebutton', { android: 'button, image', harmony: 'button' })
            .set('header', { android: 'header, heading', harmony: undefined })
            .set('summary', { android: 'summary', harmony: undefined })
            .set('alert', { android: 'alert', harmony: undefined })
            .set('checkbox', { android: 'checkbox', harmony: 'not ticked, checkbox' })
            .set('combobox', { android: 'combobox', harmony: undefined })
            .set('menu', { android: 'menu', harmony: undefined })
            .set('menubar', { android: 'menubar', harmony: undefined })
            .set('menuitem', { android: 'menuitem', harmony: undefined })
            .set('progressbar', { android: 'progressbar', harmony: 'null %, progressbar' })
            .set('radio', { android: 'radio button', harmony: 'option button' })
            .set('radiogroup', { android: 'radio group', harmony: undefined })
            .set('scrollbar', { android: 'scrollbar', harmony: 'scrollbar' })
            .set('spinbutton', { android: 'spin button', harmony: undefined })
            .set('switch', { android: 'switch', harmony: 'not ticked, that is (?) button' })
            .set('tab', { android: 'tab', harmony: undefined })
            .set('tablist', { android: 'tablist', harmony: undefined })
            .set('timer', { android: 'timer', harmony: undefined })
            .set('list', { android: 'list', harmony: 'list' })
            .set('toolbar', { android: 'toolbar', harmony: undefined });


function TouchableNativeFeedbackAccessibleExample() {
  const [firstChecked, setFirstChecked] = useState < boolean > (false);
  const [secondChecked, setSecondChecked] = useState < boolean > (false);
  const [message, setMessage] = useState('');
  const [escape, setEscape] = useState(false);
  const [isMagicTap, setMagicTap] = useState(false);
  const aria_lives = ['off', 'polite', 'assertive', 'rude'];
  const [aria_live, setAria_live] = useState('none');
  const [aria_checked, setAria_checked] = useState(false);
  const [aria_expanded, setAria_expanded] = useState(false);
  const [aria_hidden, setAria_hidden] = useState(false);
  const [aria_disabled, setAria_disabled] = useState(false);
  const [count, setCount] = useState(0);
  const checked = firstChecked && secondChecked;
  const mixed = firstChecked !== secondChecked;
  const [onAccessibilityTap, setOnAccessibilityTap] = useState('ready');
  const [messages, setMessages] = useState('');
  const accessibilityLiveRegions = ['none', 'polite', 'assertive'];
  const [accessibilityLiveRegion, setAccessibilityLiveRegion] = useState('none');
  const [aria_modal, setAria_modal] = useState(false);
  const [display, setDisplay] = useState("none");

  return (
    <ScrollView style={styles.container}>
      <Text>activate action tester</Text>
                <TouchableNativeFeedback
                    accessible={true}
                    accessibilityLabel="activate action tester"
                    role="button"
                    style={{ width: '100%', padding: 16 }}
                    accessibilityActions={[{ name: 'activate' }]}
                    onAccessibilityAction={event => {
                        switch (event.nativeEvent.actionName) {
                            case 'activate':
                                Alert.alert('Alert', 'View is clicked');
                                break;
                        }
                    }}>
                   <View>
                   <Text importantForAccessibility="no">
                        1. Enable ScreenReader
                    </Text>
                    <Text importantForAccessibility="no">
                        2. Focus on this View
                    </Text>
                    <Text importantForAccessibility="no">
                        3. Activate it by double tapping
                    </Text>
                   </View>
                </TouchableNativeFeedback>

                <Text>longpress action tester</Text>
                <TouchableNativeFeedback
                    accessible={true}
                    role="button"
                    style={{ width: '100%', padding: 16 }}
                    accessibilityActions={[{ name: 'longpress' }]}
                    onAccessibilityAction={event => {
                        switch (event.nativeEvent.actionName) {
                            case 'activate':
                                Alert.alert('Alert', 'View is clicked');
                                break;
                        }
                    }}>
                    <View>
                    <Text importantForAccessibility="no">
                        1. Enable ScreenReader
                    </Text>
                    <Text importantForAccessibility="no">
                        2. Focus on this View
                    </Text>
                    <Text importantForAccessibility="no">
                        3. Activate it by double tapping
                    </Text>
                    </View>
                </TouchableNativeFeedback>
                <Text>copy action tester</Text>
                <TouchableNativeFeedback
                    value="content to copy"
                    accessible={true}
                    style={{
                        width: '100%',
                        padding: 16,
                        borderColor: 'gray',
                        borderWidth: 2,
                        fontSize: 12,
                    }}
                    accessibilityActions={[{ name: 'copy' }]}
                    onAccessibilityAction={e => {
                        // if (e.nativeEvent.actionName === 'copy') {
                        //     setState(true);
                        // }
                        console.log(123)
                    }}
                >
                  <View>
                    <Text>测试文本</Text>
                  </View>
                </TouchableNativeFeedback>
        <TouchableNativeFeedback
          accessible={true}
          accessibilityLabel="activate action tester"
          role="button"
          style={{ width: '100%', padding: 16 }}
          accessibilityActions={[{ name: 'copy' }]}
          onAccessibilityAction={event => { console.log(123)
          }}>
            <View style={{height:100,backgroundColor:'red'}}><Text>123</Text></View>
          
        </TouchableNativeFeedback>
      <View style={styles.box}>
        <Text style={ styles.title
        }>1.accessibilityActions</Text>
        <Text style={{ padding: 3 }}>属性值：alert:'View is clicked</Text>
        <Text style={{ padding: 3 }}>预期效果：点击click后出现'View is clicked'的弹窗 </Text>
        <TouchableNativeFeedback
          accessible={true}
          accessibilityActions={[{ name: 'activate' }]}
          onAccessibilityAction={event => {
            switch (event.nativeEvent.actionName) {
              case 'activate':
                Alert.alert('Alert', 'View is clicked');
                break;
            }
          }}>
          <View>
            <Text>Click</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.box}>
        <Text style={styles.title
        }>2.accessibilityHint</Text>
        <Text style={{ padding: 3 }}>属性值：提示：没有文本</Text>
        <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器显示“这个视图有一个红色背景”和“提示:没有文本”</Text>
        <TouchableNativeFeedback
          accessible={true}
          aria-label="这个容器有个红色的背景"
          accessibilityHint="提示：没有文本">
          <View
            style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}
          />
        </TouchableNativeFeedback>
      </View>
      <View style={styles.box}>
        <Text style={styles.title
        }>3.accessibilityLanguage</Text>
        <Text style={{ padding: 3 }}>属性值：提示：没有文本</Text>
        <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器显示“这个视图有一个红色背景”和“提示:没有文本”</Text>
        <TouchableNativeFeedback
          accessible={true}
          accessibilityLabel="Pizza"
          accessibilityLanguage="en">
          <View>
            <Text>🍕</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>4.accessibilityLabel</Text>
        <Text style={{ padding: 3 }}>属性值：这个容器有个红色的背景</Text>
        <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器说，“这个视图有一个红色的背景”</Text>
        <TouchableNativeFeedback
          accessible={true}
          accessibilityLabel="这个容器有个红色的背景">
          <View
            style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}
          />
        </TouchableNativeFeedback>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>5.accessibilityLabel</Text>
        <Text style={{ padding: 3 }}>属性值：用于输入字段标签的编辑框</Text>
        <Text style={{ padding: 3 }}>预期效果：当焦点位于 TextInput 上时，屏幕阅读器会提示输入，用于输入字段标签的编辑框</Text>
        <View>
          <Text nativeID="formLabel">用于输入字段标签的编辑框</Text>
          <TextInput
            style={{ borderWidth: 1 }}
            accessibilityLabel="输入"
            accessibilityLabelledBy="formLabel"
          />
        </View>
      </View>
      <View style={styles.box}>
        <Text>6.accessibilityLiveRegion</Text>
        <Text>预期结果：</Text>
        <Text>1.当属性值accessibilityLiveRegion为none，点击发送后不会读出文本内容，</Text>
        <Text>2.当属性值accessibilityLiveRegion为polite，点击发送后会读出文本内容，</Text>
        <Text>2.当属性值accessibilityLiveRegion为assertive，点击发送后如果在语音回话会立即打断当前的语音会话，提醒用户当前视图的变化读出文本内容</Text>
        <Text>实际结果：</Text>
        <View>
          {accessibilityLiveRegions.map(value => (
            <Button
              title={value}
              active={value === accessibilityLiveRegion}
              label={value}
              key={value}
              onPress={() => {
                setAccessibilityLiveRegion(value);
                setMessages('')
              }}
              style={{ height: 30, width: 10 }}
            />
          ))}
        </View>
        <TouchableNativeFeedback accessible={true}
          accessibilityLiveRegion={accessibilityLiveRegion}>
          <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
          </View>
        </TouchableNativeFeedback>
        <Text>{messages}</Text>
        <Button title="点击" onPress={() => { setMessage('新消息已发送'); }} />
      </View>
      <TouchableNativeFeedback
        accessible={true}
        aria-checked={checked ? true : mixed ? 'mixed' : false}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}>
        <View style={styles.box}>
          <Text style={styles.title}>7.accessibilityRole</Text>
          <Text style={{ padding: 3 }}>属性值：checkbox</Text>
          <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器显示:当两个按钮都被选中时，显示'checked, mixed';当一个按钮被选中时，显示'mixed';当一个按钮都没有被选中时，显示'unchecked'。</Text>
          <Button
            title={`第一个 ${firstChecked ? '选中了' : '没选中'}`}
            onPress={() => setFirstChecked(!firstChecked)}
          />
          <Button
            title={`第二个 ${secondChecked ? '选中了' : '没选中'}`}
            onPress={() => setSecondChecked(!secondChecked)}
          />
        </View>
      </TouchableNativeFeedback>
      {Array.from(
                ANNOUNCEMENT_BY_PLATFORM_BY_ACCESSIBILITY_ROLE.entries(),
            ).map(([role, { android, harmony }]) => {
                return (
                  <TouchableNativeFeedback key={role}
                  accessible
                  accessibilityRole={role}
                  style={{
                      padding: 16,
                      flexDirection: 'row',
                      width: '100%',
                      borderBottomWidth: 1,
                      borderColor: 'silver',
                  }}>
                    <View
                        >
                        <Text style={{ width: '33%' }} importantForAccessibility="no">
                            {role}
                        </Text>
                        <Text style={{ width: '33%' }} importantForAccessibility="no">
                            {android}
                        </Text>
                        <Text style={{ width: '33%' }} importantForAccessibility="no">
                            {harmony}
                        </Text>
                    </View>
                    </TouchableNativeFeedback>
                );
            })}
      <View style={styles.box}>
        <Text style={styles.title}>8.accessibilityState</Text>
        <Text style={{ padding: 3 }}></Text>
        <Text style={{ padding: 3 }}>预期效果：向辅助技术的用户描述组件的当前状态。</Text>
        <View>
          <Text>属性值：accessibilityState={"{{ 'disabled': true }}"}</Text>
          <Text>预期效果:点击文本内容后，提示“text one 不可点击”</Text>
          <Text>实际效果:</Text>
          <TouchableNativeFeedback accessible={true}
            accessibilityState={{ 'disabled': true }}
            accessibilityRole={Platform.select({ harmony: 'button' })}
          >
            <View
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4'
              }}
            >
              <Text>text one</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'selected': true }}"}</Text>
          <Text>预期效果:点击文本内容后，提示“已选中 text one”</Text>
          <Text>实际效果:</Text>
          <TouchableNativeFeedback accessible={true}
            accessibilityState={{ 'selected': true }}
          >
            <View
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4'
              }}
            >
              <Text>text one</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'checked': true }}"}</Text>
          <Text>预期效果:点击文本内容后，提示“已选中 text one”</Text>
          <Text>实际效果:</Text>
          <TouchableNativeFeedback
            accessible={true}
            accessibilityState={{ 'checked': true }}
            accessibilityRole={Platform.select({ harmony: 'checkbox' })}
          >
            <View
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4'
              }}
            >
              <Text>text one</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'busy': true }}"}</Text>
          <Text>预期效果:点击文本内容后提示，busy</Text>
          <Text>实际效果:</Text>
          <TouchableNativeFeedback
            accessible={true}
            accessibilityState={{ 'busy': true }}
          >
            <View
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4'
              }}
            >
              <Text>text one</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>属性值：accessibilityState={"{{ 'expanded': true }}"}</Text>
          <Text>预期效果:点击文本内容过后提示，“已展开 text one”</Text>
          <Text>实际效果:</Text>
          <TouchableNativeFeedback
            accessible={true}
            accessibilityState={{ 'expanded': true }}
          >
            <View
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4'
              }}
            >
              <Text>text one</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

      </View>
      <View style={styles.box}>
        <Text style={styles.title}>11.accessibilityElementsHidden</Text>
        <Text style={{ padding: 3 }}>属性值： true</Text>
        <Text style={{ padding: 3 }}>预期效果：视图2会被隐藏</Text>
        <View accessible={true} style={styles.accessibilityContainer}>
          <TouchableNativeFeedback>
            <View
              style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
              <Text>First layout</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback accessibilityElementsHidden={true}>
            <View
              style={[styles.accessibilityLayout, { backgroundColor: 'yellow' }]}
            >
              <Text>Hidden Layout</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>12.accessibilityIgnoresInvertColors</Text>
        <Text style={{ padding: 3 }}>属性值： false</Text>
        <Text style={{ padding: 3 }}>预期效果：设置为false反转屏幕颜色不会变色</Text>
        <TouchableNativeFeedback accessibilityIgnoresInvertColors={false} accessible={true}>
          <View style={{ height: 100, width: 100, backgroundColor: 'yellow' }}>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>13.accessible</Text>
        <Text style={{ padding: 3 }}>属性值： true</Text>
        <Text style={{ padding: 3 }}>预期效果：设置为true后不能单独选择text one或text two 只能选择整个视图</Text>
        <TouchableNativeFeedback accessible={true}>
          <View>
            <Text>text one</Text>
            <Text>text two</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <View style={styles.box}>
        <Text style={ styles.title}>15.aria-busy</Text>
        <Text style={{ padding: 3 }}>属性值：{'aria-busy={true} '}</Text>
        <Text style={{ padding: 3 }}>预期结果：当aria-busy值为true时，提示busy</Text>
        <TouchableNativeFeedback accessible={true} aria-busy={true}>
          <View
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </View>
        </TouchableNativeFeedback>
        <Text>属性值：{'aria-busy={false} '}</Text>
        <Text>预期结果：当aria-busy值为false时，读出文本内容text one, text two </Text>
        <Text>实际结果：</Text>
        <View
          style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
          accessible={true}
          aria-busy={false}
        >
          <Text style={{ padding: 10 }}>text one</Text>
          <Text style={{ padding: 10 }}>text two</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>16.aria-checked</Text>
        <Text style={{ padding: 3 }}>预期结果：1.当aria-checked为false时，提示元素未被选择，2.当aria-checked为true时，提示元素被选择</Text>
        <Text>实际结果：</Text>
        <Button
          title={'aria_checked: ' + aria_checked.toString()}
          onPress={() => setAria_checked(!aria_checked)}
          label={'aria_checked: ' + aria_checked.toString()}
        />
        <TouchableNativeFeedback
          accessible={true}
          aria-checked={aria_checked}>
          <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
            <Text style={{ padding: 10 }}>text one</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>17.aria-disabled</Text>
        <Text style={{ padding: 3 }}>属性值：aria-disabled</Text>
        <Text style={{ padding: 3 }}>预期结果：1.当aria-disabled为false时，表示清除非激活状态。2.当aria-disabled为true时，表示当前是非激活状态，提示元素不可点击</Text>
        <Text>实际结果：</Text>
        <Button
          title={'aria_disabled: ' + aria_disabled.toString()}
          onPress={() => setAria_disabled(!aria_disabled)}
          label={'aria_disabled: ' + aria_disabled.toString()}
        />
        <TouchableNativeFeedback
          style={{ padding: 8 }}
          accessible={true}
          aria-disabled={true}
          role={Platform.select({
            harmony: 'button',
          })}
          accessibilityLabel="option">
            <View>
              <Text>
                123
              </Text>
            </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>18.aria-expanded</Text>
        <Text style={{ padding: 3 }}>预期结果：1.当aria-expanded为false时，表示元素不是展开。2.当aria-expanded为true时，表示元素是展开的</Text>
        <Text>实际结果：</Text>
        <Button
          title={'aria_expanded: ' + aria_expanded.toString()}
          onPress={() => setAria_expanded(!aria_expanded)}
          label={'aria_expanded: ' + aria_expanded.toString()}
        />
        <TouchableNativeFeedback
          accessible={true}
          aria-expanded={aria_expanded}>
          <View
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </View>
        </TouchableNativeFeedback>
      </View>


      <View style={styles.box}>
        <Text style={ styles.title}>19.属性值：aria_hidden</Text>
        <Text>预期结果：</Text>
        <Text>1.当aria-hidden为false时，表示元素可见，可点击文本内容</Text>
        <Text>2.当aria-hidden为true时，表示元素隐藏(不可见)，不可点击到文本</Text>
        <Text>实际结果：</Text>
        <Button
          title={'aria_hidden: ' + aria_hidden.toString()}
          onPress={() => setAria_hidden(!aria_hidden)}
          label={'aria_hidden: ' + aria_hidden.toString()}
        />
        <TouchableNativeFeedback
          accessible={true}
          aria-hidden={aria_hidden}>
          <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5 }}>
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text one</Text>
          </View>
        </TouchableNativeFeedback>
      </View>


      <View style={styles.box}>
        <Text style={styles.title}>20.属性值：{"aria-label='这是在一个“安全”的可视区域内渲染内容的组件'"} </Text>
        <View>
          <Text>预期结果：点击文本内容提示：这是在一个“安全”的可视区域内渲染内容的组件</Text>
        </View>
        <View>
          <Text>实际结果：</Text>
          <TouchableNativeFeedback
            accessible={true}
            aria-label='这是在一个“安全”的可视区域内渲染内容的组件'>
            <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
              <Text style={{ padding: 10 }}>text one</Text>
              <Text style={{ padding: 10 }}>text two</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

      
      <View style={styles.box}>
        <Text>21.属性值： aria-live</Text>
        <View>
          <Text>预期结果：</Text>
          <Text>当属性值aria-live为off，点击按钮后不会读出文本内容，</Text>
          <Text>当属性值aria-live为polite，点击按钮后在用户闲时宣布，读出文本内容，</Text>
          <Text>当属性值aria-live为assertive，点击发送后尽快对用户宣布，提醒用户当前视图的变化读出文本内容</Text>
          <Text>当属性值aria-live为rude，点击按钮后即时提醒用户，必要的时候甚至中断用户，提醒用户当前视图的变化读出文本内容</Text>
          <View>
            <Text>实际结果：</Text>
          </View>
          <View>
            {aria_lives.map(value => (
              <Button
                title={value}
                active={value === aria_live}
                label={value}
                key={value}
                onPress={() => {
                  setAria_live(value);
                  setMessage('')
                }}
                style={{ height: 30, width: 10 }}
              />
            ))}
          </View>
          <TouchableNativeFeedback
            accessible={true}
            aria-live={aria_live}>
            <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
              <Text>{message}</Text>
            </View>
          </TouchableNativeFeedback>
          <Button title="按钮" onPress={() => { setMessageTwo('内容更新啦！'); }} />
        </View>
      </View>


      <View style={styles.box}>
        <Text>22.属性值：aria-modal</Text>
        <View>
          <Text>预期结果：</Text>
          <Text>1.当aria-modal为false时，点击“打开”按钮后，仍然可以访问text one</Text>
          <Text>2.当aria-modal为true时，点击“打开”按钮后，只能访问text two，text three，不能访问其他元素，直到点击“关闭”按钮 </Text>
        </View>
        <View>
          <Text>实际结果：</Text>
          <Button
            title={'aria_modal: ' + aria_modal.toString()}
            onPress={() => setAria_modal(!aria_modal)}
            label={'aria_modal: ' + aria_modal.toString()}
          />
          <View>
            <View
              accessible={true}
              style={{ height: 50, borderColor: 'pink', borderWidth: 5, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>text one</Text>
            </View>
            <TouchableNativeFeedback
              style={{ borderColor: '#527FE4', borderWidth: 5, }}
              accessible={true}
              aria-modal={aria_modal}
              display={display}
            >
              <View
                style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                aria-hidden={true}>
                <Text style={{ fontSize: 16, padding: 5 }}>text two</Text>
                <Text style={{ fontSize: 16, padding: 5 }}>text three</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <Button title='关闭' onPress={() => { setDisplay("none") }}>关闭</Button>
          <Pressable style={{ borderWidth: 1, height: 30, width: 120, borderRadius: 5, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              setDisplay("black")
            }}>
            <Text>打开</Text>
          </Pressable>
        </View>
      </View>


      <View style={styles.box}>
        <Text>23.属性值：aria-selected</Text>
        <View>
          <Text>预期结果：点击text one,读出“已选中text one”，点击text two读出“text two”</Text>
        </View>
        <View>
          <Text>实际结果：</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableNativeFeedback
              style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, marginRight: 10 }}
              accessible={true}
              aria-selected={true}
            >
              <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
                <Text>text one</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, }}
              accessible={true}
              aria-selected={false}
            >
              <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
                <Text>text two</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>


      <View style={styles.box}>
        <Text style={styles.title
        }>24.onAccessibilityAction</Text>
        <Text style={{ padding: 3 }}>预期效果：点击click后出现'View is clicked'的弹窗 </Text>
        <TouchableNativeFeedback
          accessible={true}
          accessibilityActions={[{ name: 'activate' }]}
          onAccessibilityAction={event => {
            switch (event.nativeEvent.actionName) {
              case 'activate':
                Alert.alert('Alert', 'View is clicked');
                break;
            }
          }}>
          <View>
            <Text>Click</Text>
          </View>
        </TouchableNativeFeedback>
      </View>      


      <View style={styles.box}>
        <Text>25.属性值：accessibilityValue</Text>
        <View>
          <Text>预期结果:提示当前进度为50%</Text>
        </View>
        <View>
          <Text>实际结果：</Text>
          <TouchableNativeFeedback
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            accessibilityValue={{ text: '当前进度为50%' }}>
            <View style={{ height: 30, width: 135, backgroundColor: 'green' }}></View>
          </TouchableNativeFeedback>
        </View>
      </View>


      <View style={styles.box}>
        <Text>26.属性值：{"aria-valuemax='100'"} </Text>
        <View>
          <Text>预期结果：读出aria-valuemin的值，100 </Text>
        </View>
        <View>
          <Text>实际结果：</Text>
          <TouchableNativeFeedback
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-valuemax={0}
          >
            <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
              <Text style={{ padding: 10 }} >text one</Text>
              <Text style={{ padding: 10 }} >text two</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>


      <View style={styles.box}>
        <Text>27.属性值：{"aria-valuemin='0'"} </Text>
        <View>
          <Text>预期结果：读出aria-valuemin的值，0 </Text>
        </View>
        <View>
          <Text>实际结果：</Text>
          <TouchableNativeFeedback
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-valuemin={0}
          >
            <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
              <Text style={{ padding: 10 }} >text one</Text>
              <Text style={{ padding: 10 }} >text two</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>


      <View style={styles.box}>
        <Text>28.属性值：{"aria-valuenow='40'"} </Text>
        <View>
          <Text>预期结果：读出aria-valuenow的值，40 </Text>
        </View>
        <View>
          <Text>实际结果：</Text>
          <TouchableNativeFeedback
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-valuenow='40'
          >
            <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
              <Text style={{ padding: 10 }} >text one</Text>
              <Text style={{ padding: 10 }} >text two</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>


      <View style={styles.box}>
      <Text>29.属性值：{"aria-valuetext='20'"} </Text>
          <View>
            <Text>预期结果：读出aria-valuetext的值，20 </Text>
          </View>
          <View>

            <Text>实际结果：</Text>
            <TouchableNativeFeedback
              style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
              accessible={true}
              aria-valuetext='20'
            >
              <View style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}>
              <Text style={{ padding: 10 }} >text one</Text>
              <Text style={{ padding: 10 }} >text two</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
      </View>


      <View style={styles.box}>
      <Text style={styles.title}>30.属性值：importantForAccessibility</Text>
          <View>
            <Text style={{ padding: 3 }}>预期效果：当可访问性为true时，渲染“First Layout”视图并忽略“Ignored Layout”</Text>
          </View>
          <View>
            <Text>实际效果：</Text>
            <View accessible={true} style={styles.accessibilityContainer}>
              <TouchableNativeFeedback
                style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}
                importantForAccessibility="yes">
                <Text>First layout</Text>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                style={[styles.accessibilityLayout, { backgroundColor: 'yellow' }]}
                importantForAccessibility="no-hide-descendants">
                <Text>Ignored Layout</Text>
              </TouchableNativeFeedback>
            </View>
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
  title: 'TouchableNativeFeedback',
  name: 'TouchableNativeFeedbackAccessible',
  description:
    'Accessiblity about TouchableNativeFeedback',
  render: () => <TouchableNativeFeedbackAccessibleExample />,
}: RNTesterModuleExample);