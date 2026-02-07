/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
const { Text, Pressable, Switch, Alert, TouchableWithoutFeedback, TextInput, Button, StyleSheet, View, ScrollView } = require('react-native');
import { React, useState } from 'react';
import { TestSuite, TestCase, Tester } from '@rnoh/testerino';

const roleList = [
    { type: 'alert', expect: '提示alert', value: '警告' },
    { type: 'button', expect: '提示当前内容是一个按钮', value: '按钮' },
    { type: 'checkbox', expect: '提示当前内容是一个复选框', value: '复选框' },
    { type: 'heading', expect: '提示当前内容是一个标题', value: '标题' },
    { type: 'menu', expect: '提示当前内容是一个menu', value: '菜单' },
    { type: 'menubar', expect: '提示当前内容是一个menubar', value: '菜单栏' },
    { type: 'menuitem', expect: '提示当前内容是一个menuitem', value: '菜单项' },
    { type: 'progressbar', expect: '提示当前内容是一个progressbar', value: '进度条' },
    { type: 'radio', expect: '提示当前内容是一个单选按钮', value: '单选' },
    { type: 'radiogroup', expect: '提示当前内容是一个radiogroup', value: '单选按钮组' },
    { type: 'slider', expect: '提示当前内容是一个进度条', value: '	滑动条' },
    { type: 'spinbutton', expect: '提示当前内容是一个spinbutton', value: '微调' },
    { type: 'tab', expect: '提示当前内容是一个tab', value: 'tab标签' },
    { type: 'tablist', expect: '提示当前内容是一个tablist', value: '提示文本' },
    { type: 'timer', expect: '提示当前内容是一个timer', value: '计数' },
    { type: 'toolbar', expect: '提示当前内容是一个toolbar', value: '工具栏' },
]

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
            .set('search', { android: 'edit box', harmony: 'edit box' })
            .set('searchbox', { android: 'searchbox', harmony: 'edit box' })
            .set('img', { android: 'img', harmony: 'edit box' })
            .set('image', { android: 'image', harmony: 'image' })
            .set('adjustable', {
                android: 'slider',
                harmony: 'null %, ...',
            })
            .set('imagebutton', { android: 'button, image', harmony: 'button' })
            .set('checkbox', { android: 'checkbox', harmony: 'not ticked, checkbox' })
            .set('progressbar', { android: 'progressbar', harmony: 'null %, progressbar' })
            .set('radio', { android: 'radio button', harmony: 'option button' })
            .set('scrollbar', { android: 'scrollbar', harmony: 'scrollbar' })
            .set('switch', { android: 'switch', harmony: 'not ticked, that is (?) button' })
            .set('list', { android: 'list', harmony: 'list' })
            .set('slider', { android: 'slider', harmony: undefined });


const ANNOUNCEMENT_BY_PLATFORM_BY_ROLE = new Map <
    Role,
    Record< 'harmony' | 'android', string | undefined >
          > ()
            .set('button', { android: 'button', harmony: 'button' })
            .set('img', { android: 'button', harmony: 'button' })
            .set('checkbox', { android: 'button', harmony: 'button' })
            .set('progressbar', { android: 'button', harmony: 'button' })
            .set('radio', { android: 'button', harmony: 'button' })
            .set('scrollbar', { android: 'button', harmony: 'button' })
            .set('switch', { android: 'button', harmony: 'button' })
            .set('list', { android: 'button', harmony: 'button' })
            .set('searchbox', { android: 'edit box', harmony: 'edit box' })
            .set('slider', {
                android: 'slider',
                harmony:
                    'null %, double tap and hold with one finger and swipe left or right to adjust the value',
            })
          

function ViewAccessibleExample() {
    const [firstChecked, setFirstChecked] = useState < boolean > (false);
    const [secondChecked, setSecondChecked] = useState < boolean > (false);
    const [message, setMessage] = useState('');
    const [escape, setEscape] = useState(false);
    const [isMagicTap, setMagicTap] = useState(false);
    const aria_lives = ['off', 'polite', 'assertive', 'rude'];
    const [aria_live, setAria_live] = useState('none');
    const [aria_checked, setAria_checked] = useState(true);
    const [aria_expanded, setAria_expanded] = useState(false);
    const [aria_hidden, setAria_hidden] = useState(true);
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
    const [valueNow, setValueNow] = useState([50]);
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text>activate action tester</Text>
                <View
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

                <Text>longpress action tester</Text>
                <View
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
                <Text>copy action tester</Text>
                <View
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
                />


                <View
                    accessible={true}
                    aria-label="This view has a red background"
                    accessibilityHint="Hint: and no text"
                    style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}
                />
            </View>
            <View style={styles.box}>
                <Text style={ styles.title
                }>1.accessibilityActions</Text>
                <Text style={{ padding: 3 }}>属性值：alert:'View is clicked</Text>
                <Text style={{ padding: 3 }}>预期效果：点击click后出现'View is clicked'的弹窗 </Text>
                <View
                    accessible={true}
                    accessibilityActions={[{ name: 'activate' }]}
                    onAccessibilityAction={event => {
                        switch (event.nativeEvent.actionName) {
                            case 'activate':
                                Alert.alert('Alert', 'View is clicked');
                                break;
                        }
                    }}
                    onAccessibilityTap={()=>{console.log(123)}}
                    >
                    <Text>Click</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title
                }>2.accessibilityHint</Text>
                <Text style={{ padding: 3 }}>属性值：提示：没有文本</Text>
                <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器显示“这个视图有一个红色背景”和“提示:没有文本”</Text>
                <View
                    accessible={true}
                    aria-label="这个容器有个红色的背景"
                    accessibilityHint="提示：没有文本"
                    style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}
                />
            </View>
            <View style={styles.box}>
                <Text style={ styles.title
                }>3.accessibilityLanguage</Text>
                <Text style={{ padding: 3 }}>属性值：提示：没有文本</Text>
                <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器显示“这个视图有一个红色背景”和“提示:没有文本”</Text>
                <View
                    accessible={true}
                    accessibilityLabel="Pizza"
                    accessibilityLanguage="en">
                    <Text>🍕</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>4.accessibilityLabel</Text>
                <Text style={{ padding: 3 }}>属性值：这个容器有个红色的背景</Text>
                <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器说，“这个视图有一个红色的背景”</Text>
                <View
                    accessible={true}
                    accessibilityLabel="这个容器有个红色的背景"
                    style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}
                />
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>5.accessibilityLabelledBy</Text>
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
                <View>
                    <Text
                        accessibilityLabel="phone number in accessibilityLabel"
                        nativeID="testAccessibilityLabelledBy">
                        Phone Number
                    </Text>
                    <TextInput
                        accessibilityLabelledBy={'testAccessibilityLabelledBy'}
                        style={{ backgroundColor: 'lightblue', padding: 8 }}
                        value="focus on me"
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
                <View
                    style={{ borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    accessibilityLiveRegion={accessibilityLiveRegion}
                >
                    <Text>{messages}</Text>
                </View>
                <Button title="点击" onPress={() => { setMessages('新消息已发送'); }} />
            </View>
            <View
                accessible={true}
                aria-checked={checked ? true : mixed ? 'mixed' : false}
                style={styles.box}
                accessibilityRole="checkbox"
                accessibilityState={{ checked }}>
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
            {Array.from(
                ANNOUNCEMENT_BY_PLATFORM_BY_ACCESSIBILITY_ROLE.entries(),
            ).map(([role, { android, harmony }]) => {
                return (
                    <View
                        key={role}
                        accessible
                        accessibilityRole={role}
                        style={{
                            padding: 16,
                            flexDirection: 'row',
                            width: '100%',
                            borderBottomWidth: 1,
                            borderColor: 'silver',
                        }}>
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
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessible={true}
                        accessibilityRole={Platform.select({harmony: 'button'})}
                        accessibilityState={{ 'disabled': true }}
                    >
                        <Text>text one</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'selected': true }}"}</Text>
                    <Text>预期效果:点击文本内容后，提示“已选中 text one”</Text>
                    <Text>实际效果:</Text>
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessible={true}
                        accessibilityState={{ 'selected': true }}
                    >
                        <Text>text one</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'checked': true }}"}</Text>
                    <Text>预期效果:点击文本内容后，提示“已选中 text one”</Text>
                    <Text>实际效果:</Text>
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessibilityRole={Platform.select({harmony: 'checkbox'})}
                        accessible={true}
                        accessibilityState={{ 'checked': true }}
                    >
                        <Text>text one</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'busy': true }}"}</Text>
                    <Text>预期效果:点击文本内容后提示，busy</Text>
                    <Text>实际效果:</Text>
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessible={true}
                        accessibilityState={{ 'busy': true }}
                    >
                        <Text>text one</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'expanded': true }}"}</Text>
                    <Text>预期效果:点击文本内容过后提示，“已展开 text one”</Text>
                    <Text>实际效果:</Text>
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessible={true}
                        accessibilityState={{ 'expanded': true }}
                    >
                        <Text>text one</Text>
                    </View>
                </View>

            </View>
            <View style={styles.box}>
                <Text style={styles.title}>9.accessibilityValue</Text>
                <Text>预期结果:提示当前进度为50%</Text>
                <Text>实际结果：</Text>
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    accessibilityValue={{ text: '当前进度为50%' }}>
                    <View style={{ height: 30, width: 135, backgroundColor: 'green' }}></View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>10.accessibilityViewIsModal</Text>
                <Text style={{ marginBottom: 5 }}>属性值：accessibilityViewIsModal</Text>
                <View>
                    <Text style={{ marginBottom: 5 }}>预期效果:点击文本“text one”不能与其交互，点击文本“text two”，后读出文本“text two”</Text>
                    <Text style={{ marginBottom: 5 }}>实际效果:</Text>
                    <View
                        style={{
                            height: 100,
                            backgroundColor: 'green'
                        }}
                        accessible={true}>
                        <Text>text one</Text>
                    </View>
                    <View
                        style={{
                            height: 100,
                            backgroundColor: 'yellow'
                        }}
                        accessible={true}
                        accessibilityViewIsModal={true}>
                        <Text>text two</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ marginBottom: 5 }}>属性值：accessibilityViewIsModal</Text>
                    <Text style={{ marginBottom: 5 }}>预期效果:点击文本“A”，读出“A”，点击文本“B”、读出“B” ，点击文本C，读出“C”</Text>
                    <Text style={{ marginBottom: 5 }}>实际效果:</Text>
                    <View
                        style={{
                            height: 100,
                            backgroundColor: 'green'
                        }}
                        accessible={true}>
                        <Text>A </Text>
                    </View>
                    <View
                        style={{
                            height: 200,
                            backgroundColor: 'yellow'
                        }}
                        accessible={true}
                    >
                        <Text>B </Text>
                        <View
                            style={{
                                height: 100,
                                width: 200,
                                margin: 40,
                                backgroundColor: 'skyblue'
                            }}
                            accessible={true}
                            accessibilityViewIsModal={true}>
                            <Text>C</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>11.accessibilityElementsHidden</Text>
                <Text style={{ padding: 3 }}>属性值： true</Text>
                <Text style={{ padding: 3 }}>预期效果：视图2会被隐藏</Text>
                <View accessible={true} style={styles.accessibilityContainer}>
                    <View
                        style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                        <Text>First layout</Text>
                    </View>
                    <View
                        style={[styles.accessibilityLayout, { backgroundColor: 'yellow' }]}
                        accessibilityElementsHidden={true}>
                        <Text>Hidden Layout</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>12.accessibilityIgnoresInvertColors</Text>
                <Text style={{ padding: 3 }}>属性值： false</Text>
                <Text style={{ padding: 3 }}>预期效果：设置为false反转屏幕颜色不会变色</Text>
                <View accessibilityIgnoresInvertColors={false} accessible={true} style={ { height: 100, width: 100, backgroundColor: 'yellow' }}>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>13.accessible</Text>
                <Text style={{ padding: 3 }}>属性值： true</Text>
                <Text style={{ padding: 3 }}>预期效果：设置为true后不能单独选择text one或text two 只能选择整个视图</Text>
                <View accessible={true}>
                    <Text>text one</Text>
                    <Text>text two</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={ styles.title}>14.importantForAccessibility</Text>
                <Text style={{ padding: 3 }}>属性值： true</Text>
                <Text style={{ padding: 3 }}>预期效果：当可访问性为true时，渲染“First Layout”视图并忽略“Ignored Layout”</Text>
                <View accessible={true} style={styles.accessibilityContainer}>
                    <View
                        style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}
                        importantForAccessibility="yes">
                        <Text>First layout</Text>
                    </View>
                    <View
                        style={[styles.accessibilityLayout, { backgroundColor: 'yellow' }]}
                        importantForAccessibility="no-hide-descendants">
                        <Text>Ignored Layout</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={ styles.title}>15.aria-busy</Text>
                <Text style={{ padding: 3 }}>属性值：{'aria-busy={true} '}</Text>
                <Text style={{ padding: 3 }}>预期结果：当aria-busy值为true时，提示busy</Text>
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-busy={true}
                >
                    <Text style={{ padding: 10 }}>text one</Text>
                    <Text style={{ padding: 10 }}>text two</Text>
                </View>
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
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    role="checkbox"
                    aria-checked={aria_checked}
                >
                    <Text style={{ padding: 10 }}>text one</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>17.aria-disabled</Text>
                <Text style={{ padding: 3 }}>属性值：aria-disabled</Text>
                <Text style={{ padding: 3 }}>预期结果：1.屏幕朗读出“option 按钮 不可用”</Text>
                <Text>实际结果：</Text>
                <TouchableWithoutFeedback
                    style={{ padding: 8 }}
                    accessible={true}
                    aria-disabled={true}
                    role={Platform.select({
                        harmony: 'button',
                    })}
                    accessibilityLabel="option">
                    <View style={{width:200,height:50,backgroundColor:'red'}}></View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.box}>
                <Text style={ styles.title}>18.aria-expanded</Text>
                <Text style={{ padding: 3 }}>预期结果：1.当aria-expanded为false时，表示元素不是展开。2.当aria-expanded为true时，表示元素是展开的</Text>
                <Text>实际结果：</Text>
                <Button
                    title={'aria_expanded: ' + aria_expanded.toString()}
                    onPress={() => setAria_expanded(!aria_expanded)}
                    label={'aria_expanded: ' + aria_expanded.toString()}
                />
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-expanded={aria_expanded}
                >
                    <Text style={{ padding: 10 }}>text one</Text>
                    <Text style={{ padding: 10 }}>text two</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>19.aria-hidden</Text>
                <Text style={{ padding: 3 }}>属性值：aria-checked</Text>
                <Text style={{ padding: 3 }}>预期结果：1.当aria-hidden为false时，表示元素可见，可点击文本内容。2.当aria-hidden为true时，表示元素隐藏(不可见)，不可点击到文本</Text>
                <Text>实际结果：</Text>
                <Button
                    title={'aria_hidden: ' + aria_hidden.toString()}
                    onPress={() => setAria_hidden(!aria_hidden)}
                    label={'aria_hidden: ' + aria_hidden.toString()}
                />
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-hidden={aria_hidden}
                >
                    <Text style={{ padding: 10 }}>text one</Text>
                    <Text style={{ padding: 10 }}>text one</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>20.aria-label</Text>
                <Text style={{ padding: 3 }}>属性值：{"aria-label='这是在一个“安全”的可视区域内渲染内容的组件'"}</Text>
                <Text style={{ padding: 3 }}>预期结果：点击文本内容提示：这是在一个“安全”的可视区域内渲染内容的组件</Text>
                <Text>实际结果：</Text>
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-label='这是在一个“安全”的可视区域内渲染内容的组件'
                >
                    <Text style={{ padding: 10 }}>text one</Text>
                    <Text style={{ padding: 10 }}>text two</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>21.aria-labelledby</Text>
                <Text style={{ padding: 3 }}>预期结果：当焦点位于 TextInput 上时，屏幕阅读器会提示为编辑框，选择输入的电话号</Text>
                <Text>实际结果：</Text>
                <Text nativeID="phone">选择输入的电话号</Text>
                <TextInput
                    aria-labelledby={'phone'}
                    style={{ borderWidth: 1 }}
                    value='点击我'
                />
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>22.aria-live</Text>
                <Text style={{ padding: 3 }}>预期结果：1.当属性值aria-live为off，点击按钮后不会读出文本内容.</Text>
                <Text>2.当属性值aria-live为polite，点击按钮后在用户闲时宣布，读出文本内容，</Text>
                <Text>3.当属性值aria-live为assertive，点击发送后尽快对用户宣布，提醒用户当前视图的变化读出文本内容</Text>
                <Text>4.当属性值aria-live为rude，点击按钮后即时提醒用户，必要的时候甚至中断用户，提醒用户当前视图的变化读出文本内容</Text>
                <Text>实际结果：</Text>
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
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-live={aria_live}
                >
                    <Text>{message}</Text>
                </View>
                <Button title="按钮" onPress={() => { setMessage('内容更新啦！'); }} />
            </View>
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
                    <View
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
                    </View>
                </View>
                <Pressable style={{ borderWidth: 1, height: 30, width: 120, borderRadius: 5, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        setDisplay("black")
                    }}>
                    <Text>打开</Text>
                </Pressable>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>24.aria-selected</Text>
                <Text style={{ padding: 3 }}>预期结果：预期结果：点击text one,读出“已选中text one”，点击text two读出“text two”</Text>
                <Text>实际结果：</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, marginRight: 10 }}
                        accessible={true}
                        aria-selected={true}
                    >
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red', marginRight: 10 }}></View>
                        <Text>text one</Text>
                    </View>
                    <View
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, }}
                        accessible={true}
                        aria-selected={false}
                    >
                        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'grey', marginRight: 10 }}></View>
                        <Text>text two</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>25.aria-valuemax</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <View
                    accessible={true}
                    aria-valuemax={1000}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                    <Text style={{ padding: 10 }} >text one</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={ styles.title}>25.2.aria-valuemax、valuemin、valuenow</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <View>
            <Text>test: aria-valuemax,aria-valuemin,aria-valuenow</Text>
            <View
                style={{ width: '100%', padding: 16 }}
                accessible={true}
                accessibilityRole="adjustable"
                accessibilityActions={[
                    { name: 'increment' },
                    { name: 'decrement' },
                ]}
                onAccessibilityAction={event => {
                    switch (event.nativeEvent.actionName) {
                        case 'increment': {
                            // setValueNow(prevCount => prevCount + 1)
                            setValueNow(prev => {
                                return [...prev, prev[prev.length - 1] + 25];
                            });
                            break;
                        }
                        case 'decrement': {
                            // setValueNow(prevCount => prevCount - 1)
                            setValueNow(prev => {
                                return [...prev, prev[prev.length - 1] - 25];
                            });
                            break;
                        }
                    }
                }}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={valueNow[valueNow.length - 1]}
            >
                <Text importantForAccessibility="no">
                    1. Enable ScreenReader
                </Text>
                <Text importantForAccessibility="no">
                    2. Focus on this View
                </Text>
                <Text importantForAccessibility="no">
                    3. Swipe up or down to increment or decrement the value
                </Text>
                <Text importantForAccessibility="no">
                    Current Fake Slider value: {valueNow[valueNow.length - 1]}
                </Text>
            </View>
            <Text>test: aria-valuetext</Text>
            <View
                aria-valuetext={'announcing value from aria-valuetext'}
                style={{ width: '100%', padding: 16 }}>
                <Text importantForAccessibility="no">1. Enable ScreenReader</Text>
                <Text importantForAccessibility="no">2. Focus on this View</Text>
            </View>
        </View>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>26.aria-valuemin</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <View
                    accessible={true}
                    aria-valuetext={'Test Text'}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                    <Text>aria-valuemin: Test Text</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>27.aria-valuenow</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <View
                    accessible={true}
                    aria-valuenow={55}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                    <Text>aria-valuemin: 55</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>28.aria-valuetext</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <View
                    accessible={true}
                    aria-valuetext={'Test Text'}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                    <Text>aria-valuemin: Test Text</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={ styles.title}>29.role</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <View>
                    {roleList.map((item, index) => (
                        <View key={index} style={{ paddingBottom: 10 }}>
                            <Text>属性值：{item.type}</Text>
                            <Text>预期结果：{item.expect}</Text>
                            <Text>实际结果：</Text>
                            <View
                                style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                                accessible={true}
                                role={item.type}>
                                <Text style={{ padding: 10 }} >{ }</Text>
                            </View>
                        </View>
                    ))}
                </View>
                {Array.from(ANNOUNCEMENT_BY_PLATFORM_BY_ROLE.entries()).map(
            ([role, {android, harmony}]) => {
              return (
                <View
                  key={role}
                  accessible
                  role={role}
                  style={{
                    padding: 16,
                    flexDirection: 'row',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: 'silver',
                  }}>
                  <Text style={{width: '33%'}} importantForAccessibility="no">
                    {role}
                  </Text>
                  <Text style={{width: '33%'}} importantForAccessibility="no">
                    {android}
                  </Text>
                  <Text style={{width: '33%'}} importantForAccessibility="no">
                    {harmony}
                  </Text>
                </View>
              );
            },
          )}
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>30.onMagicTap</Text>
                <Text style={{ padding: 3 }}>预期结果：下方等待双指点击变成有双指点击过</Text>
                <Text>实际结果：</Text>
                <View
                    style={{
                        width: 300,
                        height: 100,
                        borderWidth: 5,
                        borderCurve: 'circular',
                        backgroundColor: 'green',
                    }}
                    accessible={true}
                    onMagicTap={(event) => {
                        setMagicTap(true);
                    }}
                >
                    <Text>双指点击这里</Text>
                </View>
                <Text>实际结果：{isMagicTap ? '有双指点击过' : '等待双指点击'}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>31.onAccessibilityEscape</Text>
                <Text style={{ padding: 3 }}>预期结果：下方方法未执行变成方法执行了</Text>
                <Text>实际结果：</Text>
                <Text>{escape ? '方法执行了' : '方法未执行'}</Text>
                <View
                    accessible={true}
                    style={{ width: '100%', height: 100, backgroundColor: 'gray' }}
                    onAccessibilityEscape={() => {
                        console.log('onAccessibilityEscape called!');
                        setEscape(true)
                    }}>
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: 'red',
                        }}
                    />
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title
                }>32.onAccessibilityAction</Text>
                <Text style={{ padding: 3 }}>预期效果：点击click后出现'View is clicked'的弹窗 </Text>
                <View
                    accessible={true}
                    accessibilityActions={[{ name: 'activate' }]}
                    onAccessibilityAction={event => {
                        switch (event.nativeEvent.actionName) {
                            case 'activate':
                                Alert.alert('Alert', 'View is clicked');
                                break;
                        }
                    }}>
                    <Text>Click</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>33.onAccessibilityTap</Text>
                <Text style={{ padding: 3 }}>预期结果：当双击下方文字，log文本内容由ready变为run done</Text>
                <Text>实际结果：</Text>
                <Text>{escape ? '方法执行了' : '方法未执行'}</Text>
                <View
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5 }}
                    accessible={true}
                    accessibilityLabel='press me'
                    onAccessibilityTap={() => {
                        setOnAccessibilityTap('run done');
                    }}
                >
                    <Text style={{ fontSize: 16 }}>press me</Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        borderColor: '#f0f0f0',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <Text>log文本：</Text>
                    <Text style={{ padding: 10 }}>{onAccessibilityTap}</Text>
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
    title: 'View',
    name: 'ViewAccessible',
    description:
        'Accessiblity about view',
    render: () => <ViewAccessibleExample />,
}: RNTesterModuleExample);
