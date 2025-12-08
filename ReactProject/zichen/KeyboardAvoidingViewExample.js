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
  Button,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} = require('react-native');
import { useState } from 'react';

const accessibilityRoleList = [
  { type: 'none', expect: '', value: '' },
  { type: 'button', expect: '提示当前内容是一个按钮', value: '' },
  { type: 'togglebutton', expect: '提示当前内容是一个状态按钮', value: '' },
  { type: 'link', expect: '', value: '' },
  { type: 'search', expect: '提示当前内容是一个编辑框', value: '' },
  { type: 'image', expect: '提示当前内容是一个图片', value: '' },
  { type: 'keyboardkey', expect: '', value: '' },
  { type: 'text', expect: '', value: '' },
  { type: 'adjustable', expect: '提示当前内容是一个滑动条', value: '' },
  { type: 'imagebutton', expect: '提示当前内容是一个按钮', value: '' },
  { type: 'header', expect: '', value: '' },
  { type: 'summary', expect: '', value: '' },
  { type: 'alert', expect: '', value: '' },
  { type: 'checkbox', expect: '提示当前内容是一个复选框', value: '' },
  { type: 'combobox', expect: '', value: '' },
  { type: 'menu', expect: '', value: '' },
  { type: 'menubar', expect: '', value: '' },
  { type: 'menuitem', expect: '', value: '' },
  { type: 'progressbar', expect: '提示当前内容是一个进度条', value: '' },
  { type: 'radio', expect: '提示当前内容是一个单选框', value: '' },
  { type: 'radiogroup', expect: '', value: '' },
  { type: 'scrollbar', expect: '提示当前内容是一个垂直滚动条', value: '' },
  { type: 'spinbutton', expect: '', value: '' },
  { type: 'switch', expect: '提示当前内容是一个状态按钮', value: '' },
  { type: 'tab', expect: '', value: '' },
  { type: 'tablist', expect: '', value: '' },
  { type: 'timer', expect: '', value: '' },
  { type: 'list', expect: '提示当前内容是一个列表', value: '' },
  { type: 'toolbar', expect: '', value: '' },
]

const roleList = [
  { type: 'alert', expect: '', value: '' },
  { type: 'alertdialog', expect: '', value: '' },
  { type: 'application', expect: '', value: '' },
  { type: 'article', expect: '', value: '' },
  { type: 'banner', expect: '', value: '' },
  { type: 'button', expect: '提示当前内容是一个按钮', value: '' },
  { type: 'cell', expect: '', value: '' },
  { type: 'checkbox', expect: '提示当前内容是一个复选框', value: '' },
  { type: 'columnheader', expect: '', value: '' },
  { type: 'combobox', expect: '', value: '' },
  { type: 'complementary', expect: '', value: '' },
  { type: 'contentinfo', expect: '', value: '' },
  { type: 'definition', expect: '', value: '' },
  { type: 'dialog', expect: '', value: '' },
  { type: 'directory', expect: '', value: '' },
  { type: 'document', expect: '', value: '' },
  { type: 'feed', expect: '', value: '' },
  { type: 'figure', expect: '', value: '' },
  { type: 'form', expect: '', value: '' },
  { type: 'grid', expect: '', value: '' },
  { type: 'group', expect: '', value: '' },
  { type: 'heading', expect: '', value: '' },
  { type: 'img', expect: '提示当前内容是一个图片', value: '' },
  { type: 'link', expect: '', value: '' },
  { type: 'list', expect: '提示当前内容是一个列表', value: '' },
  { type: 'listitem', expect: '', value: '' },
  { type: 'log', expect: '', value: '' },
  { type: 'main', expect: '', value: '' },
  { type: 'marquee', expect: '', value: '' },
  { type: 'math', expect: '', value: '' },
  { type: 'menu', expect: '', value: '' },
  { type: 'menubar', expect: '', value: '' },
  { type: 'menuitem', expect: '', value: '' },
  { type: 'meter', expect: '', value: '' },
  { type: 'navigation', expect: '', value: '' },
  { type: 'none', expect: '', value: '' },
  { type: 'note', expect: '', value: '' },
  { type: 'option', expect: '', value: '' },
  { type: 'presentation', expect: '', value: '' },
  { type: 'progressbar', expect: '提示当前内容是一个进度条', value: '' },
  { type: 'radio', expect: '提示当前内容是一个单选框', value: '' },
  { type: 'radiogroup', expect: '', value: '' },
  { type: 'region', expect: '', value: '' },
  { type: 'row', expect: '', value: '' },
  { type: 'rowgroup', expect: '', value: '' },
  { type: 'rowheader', expect: '', value: '' },
  { type: 'scrollbar', expect: '提示当前内容是一个垂直滚动条', value: '' },
  { type: 'searchbox', expect: '提示当前内容是一个编辑框', value: '' },
  { type: 'separator', expect: '', value: '' },
  { type: 'slider', expect: '提示当前内容是一个滑动条', value: '' },
  { type: 'spinbutton', expect: '', value: '' },
  { type: 'status', expect: '', value: '' },
  { type: 'summary', expect: '', value: '' },
  { type: 'switch', expect: '提示当前内容是一个状态按钮', value: '' },
  { type: 'tab', expect: '', value: '' },
  { type: 'table', expect: '', value: '' },
  { type: 'tablist', expect: '', value: '' },
  { type: 'tabpanel', expect: '', value: '' },
  { type: 'term', expect: '', value: '' },
  { type: 'timer', expect: '', value: '' },
  { type: 'toolbar', expect: '', value: '' },
  { type: 'tooltip', expect: '', value: '' },
  { type: 'tree', expect: '', value: '' },
  { type: 'treegrid', expect: '', value: '' },
  { type: 'treeitem', expect: '', value: '' },
]

function KeyboardAvoidingViewExample() {
  const [changeValue, setChangeValue] = useState(true);
  const [accessibilityLabel, setAccessibilityLabel] = useState("Tab me");
  const [bg, setBg] = useState('#FFFFFF');
  const [onAccessibilityAction, setOnAccessibilityAction] = useState('ready');
  const [message, setMessage] = useState('');
  const accessibilityLiveRegions = ['none', 'polite', 'assertive'];
  const [accessibilityLiveRegion, setAccessibilityLiveRegion] = useState('none');
  const [aria_checked, setAria_checked] = useState(false);
  const [aria_disabled, setAria_disabled] = useState(false);
  const [aria_expanded, setAria_expanded] = useState(false);
  const [aria_hidden, setAria_hidden] = useState(false);
  const [messagelives, setMessagelives] = useState('');
  const aria_lives = ['off', 'polite', 'assertive', 'rude'];
  const [aria_live, setAria_live] = useState('none');
  const [onMagicTap, setOnMagicTap] = useState('ready');
  const [onAccessibilityTap, setOnAccessibilityTap] = useState('ready');
  const [accessibilityIgnoresInvertColors, setAccessibilityIgnoresInvertColors] = useState(false);
  const [onAccessibilityEscape, setOnAccessibilityEscape] = useState('ready');
  const [aria_modal, setAria_modal] = useState(false);
  const [display, setDisplay] = useState("none");
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(false);
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const importantForAccessibilities = ['auto', 'yes', 'no', 'no-hide-descendants'];
  const [importantForAccessibility, setImportantForAccessibility] = useState('auto');
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* 1.accessibilityActions */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320, }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>1.accessibilityActions_activate </Text>
          <Text style={{ marginBottom: 5 }}>属性值：{"accessibilityActions={[{name: 'activate',label: 'activate'}]} "} </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：双击文本内容后，背景变为粉红色</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, backgroundColor: bg }}
            accessible={true}
            accessibilityActions={[{ name: 'activate', label: 'activate' }]}
            onAccessibilityAction={event => {
              if (event.nativeEvent.actionName === 'activate') {
                setBg('pink');
              }
            }}
          >
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 1.accessibilityActions */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320, }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>1.accessibilityActions_copy</Text>
          <Text style={{ marginBottom: 5 }}>属性值：{"accessibilityActions={[{name: 'copy',label: 'copy'}]} "} </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：三指双击文本内容后，背景变为红色</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, backgroundColor: bg, height: 200 }}
            accessible={true}
            accessibilityActions={[{ name: 'copy', label: 'copy' }]}
            onAccessibilityAction={event => {
              setBg('red');
            }}
          >
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </KeyboardAvoidingView>
        </View>


        {/* 2.accessibilityHint */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>2.accessibilityHint </Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityHint=“返回到上一个页面” </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击文本“返回”后，提示“返回到上一个页面”</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            accessibilityHint="返回到上一个页面"
          >
            <Text style={{ padding: 10 }}>返回</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 3. accessibilityLanguage*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>3.accessibilityLanguage </Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityLanguage='en'</Text>
          <Text style={{ marginBottom: 5 }}>预期效果:使用英文的辅助功能打开时，点击这个视图，可以听到 "love" 的声音提示</Text>
          <Text style={{ marginBottom: 5 }}>实际效果:</Text>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            accessibilityLabel="爱"
            accessibilityLanguage="en">
            <Image
              style={{ height: 40, width: 50 }}
              source={require('../../../assets/SafeAreaView_heart.png')} />
          </KeyboardAvoidingView>
        </View>

        {/* 4.accessibilityLabel*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>4.accessibilityLabel </Text>
          <Text style={{ marginBottom: 5 }}>属性值：{"accessibilityLabel='Tap me'"}</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：设置accessibilityLabel标签后，点击会读出选中元素的无障碍标签Tap me,不会读文本内容：text one，text two</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Pressable
              onPress={() => { setAccessibilityLabel("这是一个无障碍标签") }}
              style={{ height: 30, width: 80, backgroundColor: 'skyblue', marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text>中文</Text>
            </Pressable>
            <Pressable
              onPress={() => { setAccessibilityLabel("accessibility标签") }}
              style={{ height: 30, width: 80, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' }}>
              <Text>中英文混合</Text>
            </Pressable>
          </View>
          <Text style={{ color: 'red', fontSize: 18, marginTop: 10 }}>accessibilityLabel={accessibilityLabel}</Text>

          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, marginTop: 10 }}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
          >
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 5. accessibilityLabelledBy*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>5.accessibilityLabelledBy </Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityLabelledBy="formLabel"</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击文本“text one”，读出“accessibilityLabelledBy”</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <View>
            <Text nativeID="formLabel">accessibilityLabelledBy</Text>
            <KeyboardAvoidingView
              style={{ borderColor: '#527FE4', borderWidth: 5, marginTop: 10 }}
              accessible={true}
              accessibilityLabelledBy="formLabel"
            >
              <Text>text one </Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 6. accessibilityLiveRegion*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>6.accessibilityLiveRegion </Text>
          <Text style={{ marginBottom: 5 }}>属性值： accessibilityLiveRegion:none,polite,assertive</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.当属性值accessibilityLiveRegion为none，点击发送后不会读出文本内容，</Text>
          <Text style={{ marginBottom: 5 }}>2.当属性值accessibilityLiveRegion为polite，点击发送后会读出文本内容，</Text>
          <Text style={{ marginBottom: 5 }}>2.当属性值accessibilityLiveRegion为assertive，点击发送后如果在语音回话会立即打断当前的语音会话，提醒用户当前视图的变化读出文本内容</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <View>
            {accessibilityLiveRegions.map(value => (
              <Button
                title={value}
                active={value === accessibilityLiveRegion}
                label={value}
                key={value}
                onPress={() => {
                  setAccessibilityLiveRegion(value);
                  setMessage('')
                }}
                style={{ height: 30, width: 10 }}
              />
            ))}
          </View>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            accessibilityLiveRegion={accessibilityLiveRegion}
          >
            <Text>{message}</Text>
          </KeyboardAvoidingView>
          <Button title="点击" onPress={() => { setMessage('新消息已发送'); }} />
        </View>

        {/* 7.accessibilityRole */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>7.accessibilityRole </Text>
          <View>
            {accessibilityRoleList.map((item, index) => (
              <View key={index} style={{ paddingBottom: 10 }}>
                <Text>属性值：{item.type}</Text>
                <Text>预期结果：{item.expect}</Text>
                <Text>实际结果：</Text>
                <KeyboardAvoidingView
                  style={{ borderColor: '#527FE4', borderWidth: 5, }}
                  accessible={true}
                  accessibilityRole={item.type}>
                  <Text style={{ padding: 10 }} >{item.value}</Text>
                </KeyboardAvoidingView>
              </View>
            ))}
          </View>
        </View>

        {/* 8. accessibilityState*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>8.accessibilityState_disabled</Text>
          <View>
            <Text>属性值：accessibilityState={"{{ 'disabled': disabled }}"}</Text>
            <Text>预期效果:</Text>
            <Text>1.当disable值为false时，提示“text one”</Text>
            <Text>2.当disable值为true时，提示“text one不可用”</Text>
            <Text>实际效果:</Text>
            <Button
              title={'disabled:' + disabled.toString()}
              onPress={() => {
                setDisabled(!disabled)
              }}
            />
            <KeyboardAvoidingView
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4',
                padding: 10
              }}
              accessible={true}
              accessibilityState={{ disabled: disabled }}
            >
              <Text>text one</Text>
            </KeyboardAvoidingView>
          </View>
        </View>


        {/* 8. accessibilityState*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>8.accessibilityState_selected</Text>
          <View style={{ marginTop: 10 }}>
            <Text>属性值：accessibilityState={"{{ 'selected': selected }}"}</Text>
            <Text>预期效果:</Text>
            <Text>1.当selected值为false，提示“text one”</Text>
            <Text>2.当selected值为true，提示“已选中 text one”</Text>
            <Text>实际效果:</Text>
            <Button
              title={'selected:' + selected.toString()}
              onPress={() => {
                setSelected(!selected)
              }}
            />
            <KeyboardAvoidingView
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4',
                padding: 10
              }}
              accessible={true}
              accessibilityState={{ 'selected': selected }}
            >
              <Text>text one</Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 8. accessibilityState*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>8.accessibilityState_checked</Text>
          <View style={{ marginTop: 10 }}>
            <Text>属性值：accessibilityState={"{{ 'checked': checked }}"}</Text>
            <Text>预期效果:</Text>
            <Text>1.当checked值为false，提示“未选中复选框”</Text>
            <Text>1.当checked值为true，提示“已选中复选框”</Text>
            <Text>实际效果:</Text>
            <Button
              title={'checked:' + checked.toString()}
              onPress={() => {
                setChecked(!checked)
              }}
            />
            <KeyboardAvoidingView
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4',
                padding: 10
              }}
              accessible={true}
              accessibilityState={{ 'checked': checked }}
              accessibilityRole={Platform.select({ harmony: 'checkbox' })}
            >
              <Text>text one</Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 8. accessibilityState*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>8.accessibilityState_busy</Text>
          <View style={{ marginTop: 10 }}>
            <Text>属性值：accessibilityState={"{{ 'busy': busy }}"}</Text>
            <Text>预期效果:</Text>
            <Text>1.当busy值为false，提示“text one”</Text>
            <Text>2.当busy值为true，提示“busy”</Text>
            <Text>实际效果:</Text>
            <Button
              title={'busy:' + busy.toString()}
              onPress={() => {
                setBusy(!busy)
              }}
            />
            <KeyboardAvoidingView
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4',
                padding: 10
              }}
              accessible={true}
              accessibilityState={{ 'busy': busy }}
            >
              <Text>text one</Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 8. accessibilityState*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>8.accessibilityState_expanded</Text>
          <View style={{ marginTop: 10 }}>
            <Text>属性值：accessibilityState={"{{ 'expanded': expanded }}"}</Text>
            <Text>预期效果:</Text>
            <Text>1.当expanded值为false，提示“text one”</Text>
            <Text>2.当expanded值为true，提示“已展开 text one”</Text>
            <Text>实际效果:</Text>
            <Button
              title={'expanded:' + expanded.toString()}
              onPress={() => {
                setExpanded(!expanded)
              }}
            />
            <KeyboardAvoidingView
              style={{
                flex: 1,
                borderWidth: 5,
                borderColor: '#527FE4',
                padding: 10
              }}
              accessible={true}
              accessibilityState={{ 'expanded': expanded }}
            >
              <Text>text one</Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 9. accessibilityValue*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>9.accessibilityValue</Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityValue：text: '当前进度为50%</Text>
          <Text style={{ marginBottom: 5 }}>预期结果:提示当前进度为50%</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            accessibilityValue={{ text: '当前进度为50%' }}>
            <View style={{ height: 30, width: 135, backgroundColor: 'green' }}></View>
          </KeyboardAvoidingView>
        </View>

        {/* 10.accessibilityViewIsModal */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>10.accessibilityViewIsModal</Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityViewIsModal</Text>
          <View>
            <Text style={{ marginBottom: 5 }}>预期效果:点击文本“text one”不能与其交互，点击文本“text two”，后读出文本“text two”</Text>
            <Text style={{ marginBottom: 5 }}>实际效果:</Text>
            <KeyboardAvoidingView
              style={{
                height: 100,
                backgroundColor: 'green'
              }}
              accessible={true}>
              <Text>text one</Text>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView
              style={{
                height: 100,
                backgroundColor: 'yellow'
              }}
              accessible={true}
              accessibilityViewIsModal={true}>
              <Text>text two</Text>
            </KeyboardAvoidingView>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginBottom: 5 }}>属性值：accessibilityViewIsModal</Text>
            <Text style={{ marginBottom: 5 }}>预期效果:点击文本“A”，读出“A”，点击文本“B”、读出“B” ，点击文本C，读出“C”</Text>
            <Text style={{ marginBottom: 5 }}>实际效果:</Text>
            <KeyboardAvoidingView
              style={{
                height: 100,
                backgroundColor: 'green'
              }}
              accessible={true}>
              <Text>A </Text>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView
              style={{
                height: 200,
                backgroundColor: 'yellow'
              }}
              accessible={true}
            >
              <Text>B </Text>
              <KeyboardAvoidingView
                style={{
                  height: 100,
                  width: 200,
                  margin: 40,
                  backgroundColor: 'skyblue'
                }}
                accessible={true}
                accessibilityViewIsModal={true}>
                <Text>C</Text>
              </KeyboardAvoidingView>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 11. accessibilityElementsHidden*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>11.accessibilityElementsHidden</Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityElementsHidden:true,false</Text>
          <Text style={{ marginBottom: 5 }}>预期效果:点击文本内容，读出“text one”</Text>
          <Text style={{ marginBottom: 5 }}>实际效果:</Text>
          <View style={{ height: 120 }}>
            <KeyboardAvoidingView
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
                right: 10,
                height: 100,
                backgroundColor: 'green'
              }}
              accessible={true}
              accessibilityElementsHidden={false}>
              <Text>text one</Text>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView
              style={{
                position: 'absolute',
                left: 10,
                top: 10,
                right: 10,
                height: 100,
                backgroundColor: 'yellow'
              }}
              accessible={true}
              accessibilityElementsHidden={true}>
              <Text>text two </Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 12.accessibilityIgnoresInvertColors */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>12.accessibilityIgnoresInvertColors</Text>
          <Text style={{ marginBottom: 5 }}>属性值：accessibilityIgnoresInvertColors:true,false</Text>
          <Text style={{ marginBottom: 5 }}>预期效果:</Text>
          <Text style={{ marginBottom: 5 }}>1.当accessibilityIgnoresInvertColors值为false，开启反色功能后，颜色将不会受到反色功能的影响，保持原来的颜色</Text>
          <Text style={{ marginBottom: 5 }}>1.当accessibilityIgnoresInvertColors值为true，开启反色功能后，颜色都会受到反色功能的影响，发生颜色反转</Text>
          <Text style={{ marginBottom: 5 }}>实际效果:</Text>
          <Button
            title={'反转屏幕颜色: ' + accessibilityIgnoresInvertColors.toString()}
            onPress={() => setAccessibilityIgnoresInvertColors(!accessibilityIgnoresInvertColors)}
            label={'accessibilityIgnoresInvertColors: ' + setAccessibilityIgnoresInvertColors.toString()}
          />
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, backgroundColor: 'red', height: 50, justifyContent: 'center' }}
            accessible={true}
            accessibilityIgnoresInvertColors={false}>
            <Text style={{ fontSize: 18 }}>text</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 13.accessible */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>13.accessible</Text>
          <Text style={{ marginBottom: 5 }}>属性值：{'accessible={changeValue}'}</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：设置为true时表示当前视图是一个“无障碍元素”（accessibility element）。无障碍元素会将其所有子组件视为一整个可以选中的组件,即无法单独选中'text one'和'text two'，而只能选中整个父视图</Text>
          <Text style={{ marginBottom: 5 }}>1.当changeValue值为true，无法单独选中'text one'和'text two'</Text>
          <Text style={{ marginBottom: 5 }}>2.当changeValue值为false，可以单独选中'text one'和'text two'</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Pressable
            style={{ backgroundColor: '#AFEEEE', borderRadius: 5, }}
            onPress={() => {
              setChangeValue(!changeValue)
            }}>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>按压切换changeValue：{JSON.stringify(changeValue)}</Text>
          </Pressable>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5 }}
            accessible={changeValue}
          >
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 14.importantForAccessibility */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <View>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>14.importantForAccessibility</Text>
            <Text style={{ marginBottom: 5 }}>属性值：importantForAccessibility:auto,yes,no,no-hide-descendant</Text>
            <Text style={{ marginBottom: 5 }}>预期效果:</Text>
            <Text style={{ marginBottom: 5 }}>1.值为auto，读出First layout，Ignored Layout</Text>
            <Text style={{ marginBottom: 5 }}>2.值为yes，读出First layout，Ignored Layout</Text>
            <Text style={{ marginBottom: 5 }}>3.值为no，读出First layout，Ignored Layout</Text>
            <Text style={{ marginBottom: 5 }}>4.值为no-hide-descendant，读出First layout</Text>
            <Text style={{ marginBottom: 5 }}>实际效果:</Text>
            <View>
              {importantForAccessibilities.map(value => (
                <Button
                  title={value}
                  active={value === aria_live}
                  label={value}
                  key={value}
                  onPress={() => {
                    setImportantForAccessibility(value);
                  }}
                  style={{ height: 30, width: 10 }}
                />
              ))}
            </View>
            <Text style={{ marginVertical: 10, color: 'red' }}>importantForAccessibility:{importantForAccessibility}</Text>
            <View accessible={true} >
              <KeyboardAvoidingView
                style={{
                  backgroundColor: 'green',
                  width: '100%',
                  height: 100,

                }}
              >
                <Text>First layout</Text>
              </KeyboardAvoidingView>
              <KeyboardAvoidingView
                style={{
                  backgroundColor: 'yellow',
                  width: '100%',
                  height: 100,

                }}
                importantForAccessibility={importantForAccessibility}>
                <Text>Ignored Layout</Text>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>

        {/* 15. aria-busy*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>15.aria-busy</Text>
          <View>
            <Text style={{ marginBottom: 5 }}>属性值：{'aria-busy={true} '} </Text>
            <Text style={{ marginBottom: 5 }}>预期结果：当aria-busy值为true时，提示busy</Text>
            <Text style={{ marginBottom: 5 }}>实际结果：</Text>
            <KeyboardAvoidingView
              style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
              accessible={true}
              aria-busy={true}
            >
              <Text style={{ padding: 10 }}>text one</Text>
              <Text style={{ padding: 10 }}>text two</Text>
            </KeyboardAvoidingView>
            <Text style={{ marginBottom: 5, marginTop: 5 }}>属性值：{'aria-busy={false} '}</Text>
            <Text style={{ marginBottom: 5 }}>预期结果：当aria-busy值为false时，读出文本内容text one, text two </Text>
            <Text style={{ marginBottom: 5 }}>实际结果：</Text>
            <KeyboardAvoidingView
              style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
              accessible={true}
              aria-busy={false}
            >
              <Text style={{ padding: 10 }}>text one</Text>
              <Text style={{ padding: 10 }}>text two</Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 16.aria-checked */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>16.aria-checked </Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-checked:true,false</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.当aria-checked为false时，提示元素未被选择</Text>
          <Text style={{ marginBottom: 5 }}>2.当aria-checked为true时，提示元素被选择</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button
            title={'aria_checked: ' + aria_checked.toString()}
            onPress={() => setAria_checked(!aria_checked)}
            label={'aria_checked: ' + aria_checked.toString()}
          />
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-checked={aria_checked}
            role='checkbox'
          >
            <Text style={{ padding: 10 }}>text one</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 17. aria-disabled*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>17.aria-disabled</Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-disabled:true，false </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.当aria-disabled为false时，表示清除非激活状态</Text>
          <Text style={{ marginBottom: 5 }}>2.当aria-disabled为true时，表示当前是非激活状态，提示元素不可点击</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button
            title={'aria_disabled: ' + aria_disabled.toString()}
            onPress={() => setAria_disabled(!aria_disabled)}
            label={'aria_disabled: ' + aria_disabled.toString()}
          />
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-disabled={aria_disabled}
          >
            <Text style={{ padding: 10 }}>text one</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 18.aria-expanded  */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>18.aria-expanded</Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-expanded：true，false</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.当aria-expanded为false时，表示元素不是展开</Text>
          <Text style={{ marginBottom: 5 }}>2.当aria-expanded为true时，表示元素是展开的</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button
            title={'aria_expanded: ' + aria_expanded.toString()}
            onPress={() => setAria_expanded(!aria_expanded)}
            label={'aria_expanded: ' + aria_expanded.toString()}
          />
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-expanded={aria_expanded}
          >
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 19.aria-hidden */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>19.aria-hidden</Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-hidden：true，false </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.当aria-hidden为false时，表示元素可见，可点击文本内容</Text>
          <Text style={{ marginBottom: 5 }}>2.当aria-hidden为true时，表示元素隐藏(不可见)，不可点击到文本</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <Button
            title={'aria_hidden: ' + aria_hidden.toString()}
            onPress={() => setAria_hidden(!aria_hidden)}
            label={'aria_hidden: ' + aria_hidden.toString()}
          />
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-hidden={aria_hidden}
          >
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text one</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 20. aria-label */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>20.aria-label</Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-label='这是在一个“安全”的可视区域内渲染内容的组件' </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击文本内容提示：这是在一个“安全”的可视区域内渲染内容的组件</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-label='这是在一个“安全”的可视区域内渲染内容的组件'
          >
            <Text style={{ padding: 10 }}>text one</Text>
            <Text style={{ padding: 10 }}>text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 21. aria-labelledby */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>21.aria-labelledby</Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-labelledby</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击文本“text one”，读出“aria-labelledby”</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <View>
            <Text nativeID="formLabel1">aria-labelledby</Text>
            <KeyboardAvoidingView
              style={{ borderColor: '#527FE4', borderWidth: 5, marginTop: 10 }}
              accessible={true}
              aria-labelledby="formLabel1"
            >
              <Text>text one </Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 22. aria-live */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>22.aria-live</Text>
          <Text style={{ marginBottom: 5 }}>属性值： aria-live</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.当属性值aria-live为off，点击按钮后不会读出文本内容，</Text>
          <Text style={{ marginBottom: 5 }}>2.当属性值aria-live为polite，点击按钮后在用户闲时宣布，读出文本内容，</Text>
          <Text style={{ marginBottom: 5 }}>3.当属性值aria-live为assertive，点击发送后尽快对用户宣布，提醒用户当前视图的变化读出文本内容</Text>
          <Text style={{ marginBottom: 5 }}>4.当属性值aria-live为rude，点击按钮后即时提醒用户，必要的时候甚至中断用户，提醒用户当前视图的变化读出文本内容</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <View>
            {aria_lives.map(value => (
              <Button
                title={value}
                active={value === aria_live}
                label={value}
                key={value}
                onPress={() => {
                  setAria_live(value);
                  setMessagelives('')
                }}
                style={{ height: 30, width: 10 }}
              />
            ))}
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-live={aria_live}
          >
            <Text>{messagelives}</Text>
          </KeyboardAvoidingView>
          <Button title="按钮" onPress={() => { setMessagelives('内容更新啦！'); }} />
        </View>

        {/* 23. aria-modal */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>23.aria-modal</Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-modal</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：</Text>
          <Text style={{ marginBottom: 5 }}>1.当aria-modal为false时，点击“打开”按钮后，仍然可以访问text one</Text>
          <Text style={{ marginBottom: 5 }}>2.当aria-modal为true时，点击“打开”按钮后，只能访问text two，text three，不能访问其他元素，直到点击“关闭”按钮 </Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
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
            <KeyboardAvoidingView
              style={{ borderColor: '#527FE4', borderWidth: 5, }}
              accessible={true}
              aria-modal={aria_modal}
              display={display}
            >
              <View aria-hidden={true}>
                <Text style={{ fontSize: 16, padding: 5 }}>text two</Text>
                <Text style={{ fontSize: 16, padding: 5 }}>text three</Text>
              </View>
              <Button title='关闭' onPress={() => { setDisplay("none") }}>关闭</Button>
            </KeyboardAvoidingView>
          </View>
          <Pressable style={{ borderWidth: 1, height: 30, width: 120, borderRadius: 5, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              setDisplay("black")
            }}>
            <Text>打开</Text>
          </Pressable>
        </View>

        {/* 24. aria-selected */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>24.aria-selected</Text>
          <Text style={{ marginBottom: 5 }}>属性值：aria-selected</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：点击text one,读出“已选中text one”，点击text two读出“text two”</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <View style={{ flexDirection: 'row' }}>
            <KeyboardAvoidingView
              style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, marginRight: 10 }}
              accessible={true}
              aria-selected={true}
            >
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red', marginRight: 10 }}></View>
              <Text>text one</Text>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView
              style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, }}
              accessible={true}
              aria-selected={false}
            >
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'grey', marginRight: 10 }}></View>
              <Text>text two</Text>
            </KeyboardAvoidingView>
          </View>
        </View>

        {/* 25. aria-valuemax */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>25.aria-valuemax</Text>
          <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuemax='100'"} </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuemin的值，100 </Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-valuemax={0}
          >
            <Text style={{ padding: 10 }} >text one</Text>
            <Text style={{ padding: 10 }} >text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 26. aria-valuemin */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>26.aria-valuemin</Text>
          <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuemin='0'"} </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuemin的值，0 </Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-valuemin={0}
          >
            <Text style={{ padding: 10 }} >text one</Text>
            <Text style={{ padding: 10 }} >text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 27. aria-valuenow */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>27.aria-valuenow</Text>
          <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuenow='40'"} </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuenow的值，40 </Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-valuenow='40'
          >
            <Text style={{ padding: 10 }} >text one</Text>
            <Text style={{ padding: 10 }} >text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 28. aria-valuetext */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>28.aria-valuetext</Text>
          <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuetext='20'"} </Text>
          <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuetext的值，20 </Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            aria-valuetext='20'
          >
            <Text style={{ padding: 10 }} >text one</Text>
            <Text style={{ padding: 10 }} >text two</Text>
          </KeyboardAvoidingView>
        </View>

        {/* 29. role */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>29.role</Text>
          <View>
            {roleList.map((item, index) => (
              <View key={index} style={{ paddingBottom: 10 }}>
                <Text>属性值：{item.type}</Text>
                <Text>预期结果：{item.expect}</Text>
                <Text>实际结果：</Text>
                <KeyboardAvoidingView
                  style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                  accessible={true}
                  role={item.type}>
                  <Text style={{ padding: 10 }} >{item.value}</Text>
                </KeyboardAvoidingView>
              </View>
            ))}
          </View>
        </View>

        {/* 30.onMagicTap */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>30.onMagicTap</Text>
          <Text style={{ marginBottom: 5 }}>属性值：onMagicTap</Text>
          <Text style={{ marginBottom: 5 }}>预期效果:当双指双击下方文字，log文本内容由ready变为run done</Text>
          <Text style={{ marginBottom: 5 }}>实际效果:</Text>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            onMagicTap={() => {
              setOnMagicTap('run done!')
            }}
          >
            <Text style={{ fontSize: 16 }}>press me</Text>
          </KeyboardAvoidingView>
          <View style={{ marginTop: 10, borderColor: '#f0f0f0', backgroundColor: '#f9f9f9', }}>
            <Text>log文本：</Text>
            <Text style={{ padding: 10 }}>{onMagicTap}</Text>
          </View>
        </View>

        {/* 31.onAccessibilityEscape */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>31.onAccessibilityEscape</Text>
          <Text style={{ marginBottom: 5 }}>属性值：onAccessibilityEscape</Text>
          <Text style={{ marginBottom: 5 }}>预期效果:log文本内容由ready变为run done</Text>
          <Text style={{ marginBottom: 5 }}>实际效果:</Text>
          <KeyboardAvoidingView
            accessible={true}
            style={{ width: '100%', height: 100, backgroundColor: 'gray' }}
            onAccessibilityEscape={() => {
              console.log('onAccessibilityEscape called!');
              setOnAccessibilityEscape('run done')
            }}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'red',
              }}
            />
          </KeyboardAvoidingView>
          <View style={{ marginTop: 10, borderColor: '#f0f0f0', backgroundColor: '#f9f9f9', }}>
            <Text>log文本：</Text>
            <Text style={{ padding: 10 }}>{onAccessibilityEscape}</Text>
          </View>
        </View>

        {/* 32.onAccessibilityAction*/}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320, }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>32.onAccessibilityAction</Text>
          <Text style={{ marginBottom: 5 }}>属性值：onAccessibilityAction</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：双击文本内容后，log文本内容由ready变为run done</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            accessibilityActions={[{ name: 'activate', label: 'activate' }]}
            onAccessibilityAction={event => {
              if (event.nativeEvent.actionName === 'activate') {
                setOnAccessibilityAction('run done');
              }
            }}
          >
            <Text style={{ padding: 10 }}>Double-click</Text>
          </KeyboardAvoidingView>
          <View style={{ marginTop: 10, borderColor: '#f0f0f0', backgroundColor: '#f9f9f9', }}>
            <Text>log文本：</Text>
            <Text style={{ padding: 10 }}>{onAccessibilityAction}</Text>
          </View>
        </View>

        {/* 33.onAccessibilityTap */}
        <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>33.onAccessibilityTap</Text>
          <Text style={{ marginBottom: 5 }}>属性值：onAccessibilityTap</Text>
          <Text style={{ marginBottom: 5 }}>预期结果：当双击下方文字，log文本内容由ready变为run done</Text>
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <KeyboardAvoidingView
            style={{ borderColor: '#527FE4', borderWidth: 5, }}
            accessible={true}
            accessibilityLabel="press me"
            onAccessibilityTap={() => {
              setOnAccessibilityTap('run done')
            }}
          >
            <Text style={{ fontSize: 16 }}>press me</Text>
          </KeyboardAvoidingView>
          <View style={{ marginTop: 10, borderColor: '#f0f0f0', backgroundColor: '#f9f9f9', }}>
            <Text>log文本：</Text>
            <Text style={{ padding: 10 }}>{onAccessibilityTap}</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default ({
  title: 'KeyboardAvoidingView',
  name: 'KeyboardAvoidingViewAccessible',
  description:
    'Accessiblity about KeyboardAvoidingView',
  render: () => <KeyboardAvoidingViewExample />
}: RNTesterModuleExample);
