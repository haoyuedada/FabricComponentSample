/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
const { Switch, Text, Alert, Pressable, TouchableWithoutFeedback, TextInput, Button, StyleSheet, View, ScrollView } = require('react-native');
import { React, useState } from 'react';

function ViewAccessibleExample() {
    const [changeValue, setChangeValue] = useState(true);
    const [firstChecked, setFirstChecked] = useState < boolean > (false);
    const [secondChecked, setSecondChecked] = useState < boolean > (false);
    const [message, setMessage] = useState('');
    const [escape, setEscape] = useState(false);
    const [isMagicTap, setMagicTap] = useState(false);
    const aria_lives = ['off', 'polite', 'assertive', 'rude'];
    const [accessibilityIgnoresInvertColors, setAccessibilityIgnoresInvertColors] = useState(false);
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
            <View style={styles.box}>
            <View>
                <Text>activate action tester</Text>
                <Switch
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
                   
                </Switch>

                <Text>longpress action tester</Text>
                <Switch
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
                  
                </Switch>
                <Text>copy action tester</Text>
                <Switch
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
            </View>
            <View style={styles.box}>
                <Text style={styles.title
                }>2.accessibilityHint</Text>
                <Text style={{ padding: 3 }}>属性值：提示：没有文本</Text>
                <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器显示“这个视图有一个红色背景”和“提示:没有文本”</Text>
                <Switch
                    accessible={true}
                    accessibilityLabel="这个容器有个红色的背景"
                    accessibilityHint="提示：没有文本"
                    style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}
                />
            </View>
            <View style={styles.box}>
                <Text style={styles.title
                }>3.accessibilityLanguage</Text>
                <Text style={{ padding: 3 }}>属性值：提示：没有文本</Text>
                <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器显示“这个视图有一个红色背景”和“提示:没有文本”</Text>
                <Switch
                    accessible={true}
                    accessibilityLabel="Pizza"
                    accessibilityLanguage="en">
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>4.accessibilityLabel</Text>
                <Text style={{ padding: 3 }}>属性值：这个容器有个红色的背景</Text>
                <Text style={{ padding: 3 }}>预期效果：让屏幕阅读器说，“这个视图有一个红色的背景”</Text>
                <Switch
                    accessible={true}
                    accessibilityLabel="这个容器有个红色的背景"
                    style={[styles.accessibilityLayout, { backgroundColor: 'red' }]}
                />
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
                <Switch
                    style={{ borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    accessibilityLiveRegion={accessibilityLiveRegion}
                >
                </Switch>
                <Text>{messages}</Text>
                <Button title="点击" onPress={() => { setMessages('新消息已发送'); }} />
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>7.accessibilityRole</Text>
                <Text style={{ padding: 3 }}>属性值：alert</Text>
                <Text style={{ padding: 3 }}>预期效果：选中下方开关后屏幕朗读alert</Text>
                {Array.from(
                    ANNOUNCEMENT_BY_PLATFORM_BY_ACCESSIBILITY_ROLE.entries(),
                ).map(([role, { android, harmony }]) => {
                    return (
                        <View>
                            <Text style={{ width: '33%' }} importantForAccessibility="no">
                                {role}
                            </Text>
                            <Text style={{ width: '33%' }} importantForAccessibility="no">
                                {android}
                            </Text>
                            <Text style={{ width: '33%' }} importantForAccessibility="no">
                                {harmony}
                            </Text>
                            <Switch
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

                            </Switch>
                        </View>
                    );
                })}
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>8.accessibilityState</Text>
                <Text style={{ padding: 3 }}></Text>
                <Text style={{ padding: 3 }}>预期效果：向辅助技术的用户描述组件的当前状态。</Text>
                <View>
                    <Text>属性值：accessibilityState={"{{ 'disabled': true }}"}</Text>
                    <Text>预期效果:点击后，提示不可点击”</Text>
                    <Text>实际效果:</Text>
                    <Switch
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        
                        accessible={true}
                        accessibilityState={{ 'disabled': true }}
                    >
                    </Switch>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'selected': true }}"}</Text>
                    <Text>预期效果:点击后，提示“已选中 ”</Text>
                    <Text>实际效果:</Text>
                    <Switch
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        aria-label="text one"
                        accessible={true}
                        accessibilityState={{ 'selected': true }}
                    >
                    </Switch>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'checked': true }}"}</Text>
                    <Text>预期效果:点击后，提示“已选中”</Text>
                    <Text>实际效果:</Text>
                    <Switch
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessibilityRole={Platform.select({harmony: 'checkbox'})}
                        accessible={true}
                        accessibilityState={{ 'checked': true }}
                    >
                    </Switch>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'busy': true }}"}</Text>
                    <Text>预期效果:点击后提示，busy</Text>
                    <Text>实际效果:</Text>
                    <Switch
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessible={true}
                        accessibilityState={{ 'busy': true }}
                    >
                    </Switch>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>属性值：accessibilityState={"{{ 'expanded': true }}"}</Text>
                    <Text>预期效果:点击后提示，“已展开 ”</Text>
                    <Text>实际效果:</Text>
                    <Switch
                        style={{
                            flex: 1,
                            borderWidth: 5,
                            borderColor: '#527FE4'
                        }}
                        accessible={true}
                        accessibilityState={{ 'expanded': true }}
                    >
                    </Switch>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>9.accessibilityValue</Text>
                <Text>预期结果:提示当前进度为50%</Text>
                <Text>实际结果：</Text>
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    accessibilityValue={{ text: '当前进度为50%' }}>

                </Switch>
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
                <Text style={{ padding: 3 }}>预期效果：视图会被隐藏</Text>
                <View accessible={true} style={styles.accessibilityContainer}>
                    <Switch
                        style={[styles.accessibilityLayout, { backgroundColor: 'yellow' }]}
                        accessibilityElementsHidden={true}>
                    </Switch>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>12.accessibilityIgnoresInvertColors</Text>
                <Text style={{ padding: 3 }}>属性值： false</Text>
                <Text style={{ padding: 3 }}>预期效果：设置为false反转屏幕颜色不会变色</Text>
                <Button
                    title={'反转屏幕颜色: ' + accessibilityIgnoresInvertColors.toString()}
                    onPress={() => setAccessibilityIgnoresInvertColors(!accessibilityIgnoresInvertColors)}
                    label={'accessibilityIgnoresInvertColors: ' + setAccessibilityIgnoresInvertColors.toString()}
                />
                <Switch
                    style={{ backgroundColor: 'blue' }}
                    accessible={true}
                    accessibilityIgnoresInvertColors={false}>
                </Switch>
            </View>
            <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>13.accessible</Text>
                <Text style={{ marginBottom: 5 }}>属性值：{'accessible={changeValue}'}</Text>
                <Text style={{ marginBottom: 5 }}>预期结果：设置为true时表示当前视图是一个“无障碍元素”（accessibility element）。无障碍元素会将其所有子组件视为一整个可以选中的组件,即无法单独选中'text one'和'text two'，而只能选中整个父视图</Text>
                <Text style={{ marginBottom: 5 }}>1.当changeValue值为true，无法单独选中'text one'和'text two'</Text>
                <Text style={{ marginBottom: 5 }}>2.当changeValue值为false，可以单独选中'text one'和'text two'</Text>
                <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                <View accessible={true} style={{ flexDirection: 'row' }}>
                    <View>
                        <Switch
                            accessible={false}
                            aria-label="开关1">
                        </Switch>
                    </View>
                    <View>
                        <Switch
                            accessible={false}
                            aria-label="开关2">
                        </Switch>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>14.importantForAccessibility</Text>
                <Text style={{ padding: 3 }}>属性值： true</Text>
                <Text style={{ padding: 3 }}>预期效果：当可访问性为true时，渲染“开关1”视图并忽略“开关2”</Text>
                <View accessible={true} style={styles.accessibilityContainer}>
                    <Switch
                        style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}
                        aria-label="开关1"
                        importantForAccessibility="yes">
                    </Switch>
                    <Switch
                        style={[styles.accessibilityLayout, { backgroundColor: 'yellow' }]}
                        aria-label="开关2"
                        importantForAccessibility="no-hide-descendants">
                    </Switch>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>15.aria-busy</Text>
                <Text style={{ padding: 3 }}>属性值：{'aria-busy={true} '}</Text>
                <Text style={{ padding: 3 }}>预期结果：当aria-busy值为true时，提示busy</Text>
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-label='开关1'
                    aria-busy={true}
                >
                </Switch>
                <Text>属性值：{'aria-busy={false} '}</Text>
                <Text>预期结果：当aria-busy值为false时，读出文本内容'开关2' </Text>
                <Text>实际结果：</Text>
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-label='开关2'
                    aria-busy={false}
                >
                </Switch>
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
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-label='开关1'
                    aria-checked={aria_checked}
                >
                </Switch>
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
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-disabled={aria_disabled}
                    aria-label='开关1'
                >
                </Switch>
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
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-expanded={aria_expanded}
                >
                </Switch>
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
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-label='开关1'
                    aria-hidden={aria_hidden}
                >
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>20.aria-label</Text>
                <Text style={{ padding: 3 }}>属性值：{"aria-label='这是在一个“安全”的可视区域内渲染内容的组件'"}</Text>
                <Text style={{ padding: 3 }}>预期结果：点击文本内容提示：这是在一个“安全”的可视区域内渲染内容的组件</Text>
                <Text>实际结果：</Text>
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-label='这是在一个“安全”的可视区域内渲染内容的组件'
                >
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>21.aria-labelledby</Text>
                <Text style={{ padding: 3 }}>预期结果：当焦点位于 TextInput 上时，屏幕阅读器会提示为编辑框，选择输入的电话号</Text>
                <Text>实际结果：</Text>
                <Text nativeID="phone">选择输入的电话号</Text>
                <Switch
                    aria-labelledby={'phone'}
                    style={{ borderWidth: 1 }}
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
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                    accessible={true}
                    aria-live={aria_live}
                >
                </Switch>
                <Text>{message}</Text>
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
                <Text style={{ padding: 3 }}>预期结果：预期结果：点击开关1,读出“已选中开关1”，点击开关2读出“开关2”</Text>
                <Text>实际结果：</Text>
                <View accessible={true} style={{ flexDirection: 'row' }}>
                    <View>
                        <Switch
                            accessible={true}
                            aria-label="开关1"
                            aria-selected={true}>
                        </Switch>
                    </View>
                    <View>
                        <Switch
                            accessible={true}
                            aria-label="开关2"
                            aria-selected={false}
                            style={styles.image1}>
                        </Switch>
                    </View>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>25.aria-valuemax</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <Switch
                    accessible={true}
                    aria-valuemax={1000}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>26.aria-valuemin</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <Switch
                    accessible={true}
                    aria-valuetext={'Test Text'}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>27.aria-valuenow</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <Switch
                    accessible={true}
                    aria-valuenow={55}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>28.aria-valuetext</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                <Switch
                    accessible={true}
                    aria-valuetext={'Test Text'}
                    style={[styles.accessibilityLayout, { backgroundColor: 'green' }]}>
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>29.role</Text>
                <Text style={{ padding: 3 }}>预期结果：</Text>
                <Text>实际结果：</Text>
                {Array.from(ANNOUNCEMENT_BY_PLATFORM_BY_ROLE.entries()).map(
            ([role, {android, harmony}]) => {
              return (
                <View>
                <Text style={{width: '33%'}} importantForAccessibility="no">
                    {role}
                  </Text>
                  <Text style={{width: '33%'}} importantForAccessibility="no">
                    {android}
                  </Text>
                  <Text style={{width: '33%'}} importantForAccessibility="no">
                    {harmony}
                  </Text>
                <Switch
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
                  
                </Switch>
                </View>
              );
            },
          )}
            </View>
            <View style={styles.box}>
                <Text style={ styles.title}>30.onMagicTap</Text>
                <Text style={{ padding: 3 }}>预期结果：下方等待双指点击变成有双指点击过</Text>
                <Text>实际结果：</Text>
                <Switch
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

                </Switch>
                <Text>实际结果：{isMagicTap ? '有双指点击过' : '等待双指点击'}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>31.onAccessibilityEscape</Text>
                <Text style={{ padding: 3 }}>预期结果：下方方法未执行变成方法执行了</Text>
                <Text>实际结果：</Text>
                <Text>{escape ? '方法执行了' : '方法未执行'}</Text>
                <Switch
                    accessible={true}
                    style={{ width: '100%', height: 100, backgroundColor: 'gray' }}
                    accessibilityLabel='press me'
                    onAccessibilityEscape={() => {
                        console.log('onAccessibilityEscape called!');
                        setEscape(true)
                    }}>
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title
                }>32.onAccessibilityAction</Text>
                <Text style={{ padding: 3 }}>预期效果：点击开关后出现'View is clicked'的弹窗 </Text>
                <Switch
                    accessible={true}
                    accessibilityActions={[{ name: 'activate' }]}
                    accessibilityLabel='press me'
                    onAccessibilityAction={event => {
                        switch (event.nativeEvent.actionName) {
                            case 'activate':
                                Alert.alert('Alert', 'View is clicked');
                                break;
                        }
                    }}>
                </Switch>
            </View>
            <View style={styles.box}>
                <Text style={styles.title}>33.onAccessibilityTap</Text>
                <Text style={{ padding: 3 }}>预期结果：当双击下方开关，log文本内容由ready变为run done</Text>
                <Text>实际结果：</Text>
                <Text>{escape ? '方法执行了' : '方法未执行'}</Text>
                <Switch
                    style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5 }}
                    accessible={true}
                    accessibilityLabel='press me'
                    onAccessibilityTap={() => {
                        setOnAccessibilityTap('run done');
                    }}
                >
                </Switch>
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

const ANNOUNCEMENT_BY_PLATFORM_BY_ACCESSIBILITY_ROLE = new Map<
  AccessibilityRole,
  Record<'harmony' | 'android', string | undefined>
>()
  .set('none', {android: undefined, harmony: undefined})
  .set('button', {android: 'button', harmony: 'button'})
  .set('togglebutton', {
    android: 'switch',
    harmony: 'not ticked, that is(?) button',
  })
  .set('link', {android: 'link', harmony: undefined})
  .set('search', {android: 'edit box', harmony: 'edit box'})
  .set('image', {android: 'image', harmony: 'image'})
  .set('keyboardkey', {android: 'keyboardkey', harmony: undefined})
  .set('text', {android: 'text', harmony: undefined})
  .set('adjustable', {
    android: 'slider',
    harmony: 'null %, double tap and hold with one finger...',
  })
  .set('imagebutton', {android: 'button, image', harmony: 'button'})
  .set('header', {android: 'header, heading', harmony: undefined})
  .set('summary', {android: 'summary', harmony: undefined})
  .set('alert', {android: 'alert', harmony: undefined})
  .set('checkbox', {android: 'checkbox', harmony: 'not ticked, checkbox'})
  .set('combobox', {android: 'combobox', harmony: undefined})
  .set('menu', {android: 'menu', harmony: undefined})
  .set('menubar', {android: 'menubar', harmony: undefined})
  .set('menuitem', {android: 'menuitem', harmony: undefined})
  .set('progressbar', {android: 'progressbar', harmony: 'null %, progressbar'})
  .set('radio', {android: 'radio button', harmony: 'option button'})
  .set('radiogroup', {android: 'radio group', harmony: undefined})
  .set('scrollbar', {android: 'scrollbar', harmony: 'scrollbar'})
  .set('spinbutton', {android: 'spin button', harmony: undefined})
  .set('switch', {android: 'switch', harmony: 'not ticked, that is (?) button'})
  .set('tab', {android: 'tab', harmony: undefined})
  .set('tablist', {android: 'tablist', harmony: undefined})
  .set('timer', {android: 'timer', harmony: undefined})
  .set('list', {android: 'list', harmony: 'list'})
  .set('toolbar', {android: 'toolbar', harmony: undefined});

const ANNOUNCEMENT_BY_PLATFORM_BY_ROLE = new Map<
  Role,
  Record<'harmony' | 'android', string | undefined>
>()
  .set('alert', {android: 'alert', harmony: undefined})
  .set('alertdialog', {android: undefined, harmony: undefined})
  .set('application', {android: undefined, harmony: undefined})
  .set('article', {android: undefined, harmony: undefined})
  .set('banner', {android: undefined, harmony: undefined})
  .set('button', {android: 'button', harmony: 'button'})
  .set('cell', {android: undefined, harmony: undefined})
  .set('checkbox', {android: 'checkbox', harmony: 'not ticked, checkbox'})
  .set('columnheader', {android: undefined, harmony: undefined})
  .set('combobox', {android: 'combobox', harmony: undefined})
  .set('complementary', {android: undefined, harmony: undefined})
  .set('contentinfo', {android: undefined, harmony: undefined})
  .set('definition', {android: undefined, harmony: undefined})
  .set('dialog', {android: undefined, harmony: undefined})
  .set('directory', {android: undefined, harmony: undefined})
  .set('document', {android: undefined, harmony: undefined})
  .set('feed', {android: undefined, harmony: undefined})
  .set('figure', {android: undefined, harmony: undefined})
  .set('form', {android: undefined, harmony: undefined})
  .set('grid', {android: 'grid', harmony: undefined})
  .set('group', {android: undefined, harmony: undefined})
  .set('heading', {android: '<content> heading', harmony: undefined})
  .set('img', {android: 'unlabeled image', harmony: 'image'})
  .set('link', {android: 'link', harmony: undefined})
  .set('list', {android: 'list', harmony: 'list'})
  .set('listitem', {android: undefined, harmony: undefined})
  .set('log', {android: undefined, harmony: undefined})
  .set('main', {android: undefined, harmony: undefined})
  .set('marquee', {android: undefined, harmony: undefined})
  .set('math', {android: undefined, harmony: undefined})
  .set('menu', {android: 'menu', harmony: undefined})
  .set('menubar', {android: 'menubar', harmony: undefined})
  .set('menuitem', {android: 'menuitem', harmony: undefined})
  .set('meter', {android: undefined, harmony: undefined})
  .set('navigation', {android: undefined, harmony: undefined})
  .set('none', {android: undefined, harmony: undefined})
  .set('note', {android: undefined, harmony: undefined})
  .set('option', {android: undefined, harmony: undefined})
  .set('presentation', {android: undefined, harmony: undefined})
  .set('progressbar', {android: 'progressbar', harmony: 'null %, progressbar'})
  .set('radio', {android: 'radiobutton', harmony: 'option button'})
  .set('radiogroup', {android: 'radiogroup', harmony: undefined})
  .set('region', {android: undefined, harmony: undefined})
  .set('row', {android: undefined, harmony: undefined})
  .set('rowgroup', {android: undefined, harmony: undefined})
  .set('rowheader', {android: undefined, harmony: undefined})
  .set('scrollbar', {android: 'scrollbar', harmony: 'scrollbar'})
  .set('searchbox', {android: 'edit box', harmony: 'edit box'})
  .set('separator', {android: undefined, harmony: undefined})
  .set('slider', {
    android: 'slider',
    harmony:
      'null %, double tap and hold with one finger and swipe left or right to adjust the value',
  })
  .set('spinbutton', {android: 'spinbutton', harmony: undefined})
  .set('status', {android: undefined, harmony: undefined})
  .set('summary', {android: 'summary', harmony: undefined})
  .set('switch', {
    android: '<state> switch',
    harmony: 'not ticked, that is button',
  })
  .set('tab', {android: 'tab', harmony: undefined})
  .set('table', {android: undefined, harmony: undefined})
  .set('tablist', {android: 'tablist', harmony: undefined})
  .set('tabpanel', {android: undefined, harmony: undefined})
  .set('term', {android: undefined, harmony: undefined})
  .set('timer', {android: 'timer', harmony: undefined})
  .set('toolbar', {android: 'toolbar', harmony: undefined})
  .set('tooltip', {android: undefined, harmony: undefined})
  .set('tree', {android: undefined, harmony: undefined})
  .set('treegrid', {android: undefined, harmony: undefined})
  .set('treeitem', {android: undefined, harmony: undefined});


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
    title: 'Switch',
    name: 'SwitchAccessible',
    description:
        'Accessiblity about Switch',
    render: () => <ViewAccessibleExample />,
}: RNTesterModuleExample);
