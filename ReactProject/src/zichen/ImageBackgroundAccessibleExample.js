/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    Button,
    TextInput,
    Modal
} from 'react-native';
import React, { useState } from 'react';
import RNTesterBlock from '../../components/RNTesterBlock'
const accessibilityRoleList = [
    { type: 'adjustable', expect: '提示当前内容是一个进度条', value: '元素具有可调整的特性' },
    { type: 'alert', expect: '提示当前内容是一个alert', value: '警告' },
    { type: 'button', expect: '提示当前内容是一个按钮', value: 'button' },
    { type: 'checkbox', expect: '提示当前内容是一个复选框', value: 'checkbox' },
    { type: 'combobox', expect: '提示当前内容是一个combobox', value: 'combobox' },
    { type: 'header', expect: '提示当前内容是一个标题', value: '内容区域的头部' },
    { type: 'image', expect: '提示当前内容是一个image', value: '图片' },
    { type: 'imagebutton', expect: '提示当前内容是一个button、image', value: '元素应被视为按钮并且也是图像时使用' },
    { type: 'link', expect: '提示当前内容是一个link', value: '链接' },
    { type: 'list', expect: '', value: '' },
    { type: 'menu', expect: '提示当前内容是一个menu', value: '菜单' },
    { type: 'menubar', expect: '提示当前内容是一个menubar', value: '菜单栏' },
    { type: 'menuitem', expect: '提示当前内容是一个menuitem', value: '菜单项' },
    { type: 'none', expect: '', value: '' },
    { type: 'keyboardkey', expect: '', value: '' },
    { type: 'progressbar', expect: '提示当前内容是一个progressbar', value: '进度条' },
    { type: 'radio', expect: '提示当前内容是一个单选按钮', value: 'radio' },
    { type: 'radiogroup', expect: '提示当前内容是一个radiogroup', value: '表示一组单选按钮' },
    { type: 'scrollbar', expect: '提示当前内容是一个scrollbar', value: '滚动条' },
    { type: 'search', expect: '提示当前内容是一个编辑框', value: '用作搜索框的文本框' },
    { type: 'spinbutton', expect: '提示当前内容是一个spinbutton', value: '表示打开选项列表的按钮' },
    { type: 'summary', expect: '提示当前内容是一个summary', value: '提供当前的简要总结信息的元素' },
    { type: 'switch', expect: '提示当前内容是一个关闭开关', value: '表示可以打开和关闭的开关' },
    { type: 'tab', expect: '提示当前内容是一个tab', value: 'tab标签' },
    { type: 'tablist', expect: '提示当前内容是一个tablist', value: '选项卡的列表' },
    { type: 'text', expect: '', value: '' },
    { type: 'timer', expect: '提示当前内容是一个timer', value: '定时器' },
    { type: 'togglebutton', expect: '提示当前内容是一个关闭开关', value: '切换按钮' },
    { type: 'toolbar', expect: '提示当前内容是一个toolbar', value: '工具栏' },
]
const roleList = [
    { type: 'alert', expect: '提示alert', value: '警告' },
    { type: 'alertdialog', expect: '', value: '' },
    { type: 'application', expect: '', value: '' },
    { type: 'banner', expect: '', value: '' },
    { type: 'button', expect: '提示当前内容是一个按钮', value: '按钮' },
    { type: 'cell', expect: '', value: '' },
    { type: 'checkbox', expect: '提示当前内容是一个复选框', value: '复选框' },
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
    { type: 'heading', expect: '提示当前内容是一个标题', value: '标题' },
    { type: 'img', expect: '', value: '' },
    { type: 'link', expect: '', value: '' },
    { type: 'list', expect: '', value: '' },
    { type: 'listitem', expect: '', value: '' },
    { type: 'log', expect: '', value: '' },
    { type: 'main', expect: '', value: '' },
    { type: 'marquee', expect: '', value: '' },
    { type: 'math', expect: '', value: '' },
    { type: 'menu', expect: '提示当前内容是一个menu', value: '菜单' },
    { type: 'menubar', expect: '提示当前内容是一个menubar', value: '菜单栏' },
    { type: 'menuitem', expect: '提示当前内容是一个menuitem', value: '菜单项' },
    { type: 'meter', expect: '', value: '' },
    { type: 'navigation', expect: '', value: '' },
    { type: 'none', expect: '', value: '' },
    { type: 'note', expect: '', value: '' },
    { type: 'option', expect: '', value: '' },
    { type: 'presentation', expect: '', value: '' },
    { type: 'progressbar', expect: '提示当前内容是一个progressbar', value: '进度条' },
    { type: 'radio', expect: '提示当前内容是一个单选按钮', value: '单选' },
    { type: 'radiogroup', expect: '提示当前内容是一个radiogroup', value: '单选按钮组' },
    { type: 'region', expect: '', value: '' },
    { type: 'row', expect: '', value: '' },
    { type: 'rowgroup', expect: '', value: '' },
    { type: 'rowheader', expect: '', value: '' },
    { type: 'scrollbar', expect: '提示当前内容是一个scrollbar', value: '滚动条' },
    { type: 'searchbox', expect: '', value: '' },
    { type: 'separator', expect: '', value: '' },
    { type: 'slider', expect: '提示当前内容是一个进度条', value: '	滑动条' },
    { type: 'spinbutton', expect: '提示当前内容是一个spinbutton', value: '微调' },
    { type: 'status', expect: '', value: '' },
    { type: 'tab', expect: '提示当前内容是一个tab', value: 'tab标签' },
    { type: 'table', expect: '', value: '' },
    { type: 'tablist', expect: '提示当前内容是一个tablist', value: '提示文本' },
    { type: 'tabpanel', expect: '', value: '' },
    { type: 'term', expect: '', value: '' },
    { type: 'timer', expect: '提示当前内容是一个timer', value: '计数' },
    { type: 'toolbar', expect: '提示当前内容是一个toolbar', value: '工具栏' },
    { type: 'tooltip', expect: '', value: '' },
    { type: 'tree', expect: '', value: '' },
    { type: 'treegrid', expect: '', value: '' },
    { type: 'treeitem', expect: '', value: '' },
]
function ImageBackgroundAccessibleExample() {
    const aria_lives = ['off', 'polite', 'assertive'];
    const [aria_live, setAria_live] = useState();
    const accessibilityLiveRegions = ['none', 'polite', 'assertive'];
    const [accessibilityLiveRegion, setAccessibilityLiveRegion] = useState();
    const [accessibilityIgnoresInvertColors, setAccessibilityIgnoresInvertColors] = useState(false);
    const [onAccessibilityTap, setOnAccessibilityTap] = useState('ready');
    const [onAccessibilityEscape, setOnAccessibilityEscape] = useState('ready');
    const [onMagicTap, setOnMagicTap] = useState('ready');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible1, setModalVisible1] = React.useState(false);
    const [aria_hidden, setAria_hidden] = useState(false);
    const [accessibilityElementsHidden, setAccessibilityElementsHidden] = useState(false);
    return (
        <ScrollView>
            <RNTesterBlock title="1.accessible">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessible</Text>
                    <Text style={{ padding: 3 }}>预期效果:能选中下方天蓝色背景图片,屏幕朗读“React图片背景”,不能选中下方粉色背景图片</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={false}
                            aria-label="React图片背景"
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="2.aria-label">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:aria-label</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景”</Text>
                    <ImageBackground
                        accessible={true}
                        aria-label="React图片背景"
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="3.aria-labelledby">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:aria-labelledby</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景对应的编辑框”</Text>
                    <ImageBackground
                        accessible={true}
                        aria-label="React图片背景"
                        aria-labelledby='testAria-labelledby'
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                        <TextInput style={{
                            lineHeight: 30,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            backgroundColor: '#000000c0',
                        }} nativeID='testAria-labelledby' />
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="4.importantForAccessibility">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:importantForAccessibility</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方背景图片,屏幕朗读“React图片背景,文本1”,忽略粉色背景图片内容</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            importantForAccessibility="yes"
                            aria-label="React图片背景1"
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                            <Text style={styles.text}>文本1</Text>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景2"
                            importantForAccessibility="no-hide-descendants"
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                            <Text style={styles.text}>文本2</Text>
                        </ImageBackground>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="5.aria-busy">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-busy</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景,busy”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-busy={true}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-busy={false}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="6.aria-checked">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-checked</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“已选中React图片背景,单指双击即可取消选中”;
                        选中下方粉色背景图片,屏幕朗读“未选中React图片背景,单指双击即可选中”;
                        选中下方黄色背景图片,屏幕朗读“React图片背景,mixed”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-checked={true}
                            style={[styles.image, { height: 80, width: 80 }]}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-checked={false}
                            style={[styles.image1, { height: 80, width: 80 }]}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-checked='mixed'
                            style={[styles.image2, { height: 80, width: 80 }]}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>

                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="7.aria-disabled">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-disabled</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景不可点击”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-disabled={true}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-disabled={false}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="8.aria-expanded">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-expanded</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景expanded”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景alive”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-expanded={true}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-expanded={false}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="9.aria-hidden">
                <View >
                    <Text style={{ padding: 3 }}>属性值:aria-hidden</Text>
                    <Text style={{ padding: 3 }}>预期结果:当aria-hidden为false时,表示元素可见,可点击文本内容。当aria-hidden为true时,表示元素隐藏(不可见),不可点击到文本</Text>
                    <Text>实际结果:</Text>
                    <Button
                        title={'aria_hidden: ' + aria_hidden.toString()}
                        onPress={() => setAria_hidden(!aria_hidden)}
                        label={'aria_hidden: ' + aria_hidden.toString()}
                    />
                    <ImageBackground
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        aria-hidden={aria_hidden}
                    >
                        <Text style={styles.text}>文本1</Text>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="10.aria-live">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-live</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中“POLITE”和“ASSERTIVE”按钮双击后,屏幕朗读“React图片背景”,选中“OFF”按钮双击后,屏幕无朗读</Text>
                    <View>
                        {aria_lives.map(value => (
                            <Button
                                title={value}
                                active={value === aria_live}
                                label={value}
                                key={value}
                                onPress={() => {
                                    setAria_live(value);
                                }}
                                style={{ height: 30, width: 10 }}
                            />
                        ))}
                    </View>
                    <Text>aria-live的值:{aria_live}</Text>
                    <ImageBackground
                        aria-label="React图片背景"
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        aria-live={aria_live}
                    >
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="11.aria-valuetext">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:aria-valuetext</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景”</Text>
                    <ImageBackground
                        accessible={true}
                        aria-valuetext="React图片背景"
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="12.role">
                {roleList.map((item, index) => (
                    <View accessible={true} key={index} style={{ marginVertical: 5 }}>
                        <Text>role属性值:{item.type}</Text>
                        <Text>预期结果:点击天蓝色背景图片,{item.expect}</Text>
                        <Text>实际结果:</Text>
                        <ImageBackground
                            accessible={true}
                            role={item.type}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                ))}
            </RNTesterBlock>

            <RNTesterBlock title="13.alt">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:alt</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“背景1”</Text>
                    <ImageBackground
                        accessible={true}
                        alt="背景1"
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="14.accessibilityHint">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:accessibilityHint</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景,提示1”</Text>
                    <ImageBackground
                        accessible={true}
                        aria-label="React图片背景"
                        accessibilityHint='提示1'
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="15.accessibilityLanguage">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLanguage</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景”</Text>
                    <ImageBackground
                        accessible={true}
                        aria-label="React图片背景"
                        accessibilityLanguage="it-IT"
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="16.accessibilityLabel">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLabel</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景”</Text>
                    <ImageBackground
                        aaccessible={true}
                        accessibilityLabel='React图片背景'
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="17.accessibilityLabelledBy">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLabelledBy</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景对应的编辑框”</Text>
                    <ImageBackground
                        accessible={true}
                        accessibilityLabel="React图片背景"
                        accessibilityLabelledBy='testAria-labelledby'
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}>
                        <TextInput style={{
                            lineHeight: 30,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            backgroundColor: '#000000c0',
                        }} nativeID='testAria-labelledby' />
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="18.accessibilityLiveRegion">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLiveRegion</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中“POLITE”和“ASSERTIVE”按钮双击后,屏幕朗读“React图片背景”,选中“NONE”按钮双击后,屏幕无朗读</Text>
                    <View>
                        {accessibilityLiveRegions.map(value => (
                            <Button
                                title={value}
                                active={value === accessibilityLiveRegion}
                                label={value}
                                key={value}
                                onPress={() => {
                                    setAccessibilityLiveRegion(value);
                                }}
                                style={{ height: 30, width: 10 }}
                            />
                        ))}
                    </View>
                    <Text>accessibilityLiveRegion的值:{accessibilityLiveRegion}</Text>
                    <ImageBackground
                        aria-label='React图片背景'
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityLiveRegion={accessibilityLiveRegion}
                    >
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="19.accessibilityRole">
                {accessibilityRoleList.map((item, index) => (
                    <View accessible={true} key={index} style={{ marginVertical: 5 }}>
                        <Text>accessibilityRole属性值:{item.type}</Text>
                        <Text>预期结果:点击天蓝色背景图片,{item.expect}</Text>
                        <Text>实际结果:</Text>
                        <ImageBackground
                            accessible={true}
                            accessibilityRole={item.type}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                ))}
            </RNTesterBlock>

            <RNTesterBlock title="20.accessibilityState-disabled">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-disabled-true</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景不可点击”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'disabled': true }}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'disabled': false }}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>

                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="21.accessibilityState-selected">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-selected</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“已选中React图片背景”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'selected': true }}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'selected': false }}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="22.accessibilityState-checked">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-checked</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“已选中React图片背景,单指双击即可取消选中”;
                        选中下方粉色背景图片,屏幕朗读“未选中React图片背景,单指双击即可选中”;
                        选中下方黄色背景图片,屏幕朗读“React图片背景,mixed”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'checked': true }}
                            style={[styles.image, { height: 80, width: 80 }]}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'checked': false }}
                            style={[styles.image1, { height: 80, width: 80 }]}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'checked': 'mixed' }}
                            style={[styles.image2, { height: 80, width: 80 }]}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>

                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="23.accessibilityState-busy">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-busy</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景,busy”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'busy': true }}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'busy': false }}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>

                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="24.accessibilityState-expanded">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-expanded</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景expanded”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景alive”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'expanded': false }}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            accessibilityState={{ 'expanded': false }}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="25.accessibilityValue">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:accessibilityValue</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“React图片背景,当前进度为100%”</Text>
                    <ImageBackground
                        style={styles.image}
                        aria-label='React图片背景'
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityValue={{ text: '当前进度为100%' }}
                    >
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="26.accessibilityElementsHidden">
                <View >
                    <Text style={{ padding: 3 }}>属性值:accessibilityElementsHidden</Text>
                    <Text style={{ padding: 3 }}>预期结果:当accessibilityElementsHidden为false时,表示元素可见,可点击文本内容。
                        当accessibilityElementsHidden为true时,表示元素隐藏(不可见),不可点击到文本</Text>
                    <Text>实际结果:</Text>
                    <Button
                        title={'accessibilityElementsHidden: ' + accessibilityElementsHidden.toString()}
                        onPress={() => setAccessibilityElementsHidden(!accessibilityElementsHidden)}
                        label={'accessibilityElementsHidden: ' + accessibilityElementsHidden.toString()}
                    />
                    <ImageBackground
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityElementsHidden={accessibilityElementsHidden}
                    >
                        <Text style={styles.text}>文本1</Text>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="27.accessibilityIgnoresInvertColors">
                <View>
                    <Text>属性值:accessibilityIgnoresInvertColors</Text>
                    <Text>预期效果:</Text>
                    <Text>1.当accessibilityIgnoresInvertColors值为false,开启反色功能后,颜色将不会受到反色功能的影响,保持原来的颜色</Text>
                    <Text>1.当accessibilityIgnoresInvertColors值为true,开启反色功能后,颜色都会受到反色功能的影响,发生颜色反转</Text>
                    <Text>实际效果:</Text>
                    <Button
                        title={'反转屏幕颜色: ' + accessibilityIgnoresInvertColors.toString()}
                        onPress={() => setAccessibilityIgnoresInvertColors(!accessibilityIgnoresInvertColors)}
                        label={'accessibilityIgnoresInvertColors: ' + setAccessibilityIgnoresInvertColors.toString()}
                    />
                    <ImageBackground
                        style={[styles.image, { backgroundColor: 'pink' }]}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityIgnoresInvertColors={false}>
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="28.accessibilityActions&onAccessibilityAction">
                <View>
                    <Text>属性值:accessibilityActions、onAccessibilityAction</Text>
                    <Text>预期结果:选中下方天蓝色背景图片执行以下操作，触发对应弹框</Text>
                    <Text style={{ marginVertical: 5 }}>1.双击图片,弹出内容为“activate action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>2.双击图片并在屏幕上按住一根手指,弹出内容为“longpress action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>3.在iOS上,当组件具有角色并且用户将焦点放在该组件上并向上滑动时或
                        在Android上,当用户将辅助功能焦点放在组件上并按下调高音量按钮时,弹出内容为“increment action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>4.在iOS上,当组件具有角色并且用户将焦点放在该组件上并向下滑动时或
                        在Android上,当用户将辅助功能焦点放在组件上并按下调低音量按钮时,弹出内容为“decrement action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>5.双指双击图片,弹出内容为“magicTap action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>6.双指在图片上执行划动手势（左、右、左）,弹出内容为“escape action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>7.执行剪切,弹出内容为“cut action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>8.执行三指双击,弹出内容为“copy action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>9.执行粘贴,弹出内容为“paste action success”的弹框</Text>
                    <Text>实际结果:</Text>
                    <ImageBackground
                        style={[styles.image, { width: 300, height: 300 }]}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityActions={[
                            { name: 'activate', label: 'activate' },
                            { name: 'longpress', label: 'longpress' },
                            { name: 'increment', label: 'increment' },
                            { name: 'decrement', label: 'decrement' },
                            { name: 'magicTap', label: 'magicTap' },
                            { name: 'escape', label: 'escape' },
                            { name: 'cut', label: 'cut' },
                            { name: 'copy', label: 'copy' },
                            { name: 'paste', label: 'paste' },
                        ]}
                        onAccessibilityAction={event => {
                            switch (event.nativeEvent.actionName) {
                                case 'activate':
                                    Alert.alert('Alert', 'activate action success');
                                    break;
                                case 'longpress':
                                    Alert.alert('Alert', 'longpress action success');
                                    break;
                                case 'increment':
                                    Alert.alert('Alert', 'increment action success');
                                    break;
                                case 'decrement':
                                    Alert.alert('Alert', 'decrement action success');
                                    break;
                                case 'magicTap':
                                    Alert.alert('Alert', 'magicTap action success');
                                    break;
                                case 'escape':
                                    Alert.alert('Alert', 'escape action success');
                                    break;
                                case 'cut':
                                    Alert.alert('Alert', 'cut action success');
                                    break;
                                case 'copy':
                                    Alert.alert('Alert', 'copy action success');
                                    break;
                                case 'paste':
                                    Alert.alert('Alert', 'paste action success');
                                    break;
                            }
                        }}
                    >
                    </ImageBackground>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="29.onAccessibilityTap">
                <View>
                    <Text>属性值:onAccessibilityTap</Text>
                    <Text>预期结果:当双击下方图片,log文本内容由ready变为run done</Text>
                    <Text>实际结果:</Text>
                    <ImageBackground
                        style={[styles.image, { backgroundColor: 'pink' }]}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityLabel='press me'
                        onAccessibilityTap={() => {
                            setOnAccessibilityTap('run done');
                        }}
                    >
                    </ImageBackground>
                    <View
                        style={{
                            marginTop: 10,
                            borderColor: '#f0f0f0',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <Text>log文本:</Text>
                        <Text style={{ padding: 10 }}>{onAccessibilityTap}</Text>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="30.onAccessibilityEscape">
                <View>
                    <Text>属性值:onAccessibilityEscape</Text>
                    <Text>预期结果:当执行 “escape” 手势（一个两指 Z 形手势）时,log文本内容由ready变为run done</Text>
                    <Text>实际结果:</Text>
                    <ImageBackground
                        style={[styles.image, { backgroundColor: 'pink' }]}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityLabel='press me'
                        onAccessibilityEscape={() => {
                            setOnAccessibilityEscape('run done');
                        }}
                    >
                    </ImageBackground>
                    <View
                        style={{
                            marginTop: 10,
                            borderColor: '#f0f0f0',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <Text>log文本:</Text>
                        <Text style={{ padding: 10 }}>{onAccessibilityEscape}</Text>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="31.onMagicTap">
                <View>
                    <Text>属性值:onMagicTap</Text>
                    <Text>预期结果:当执行“魔术点击”手势（即用两根手指双击）时,log文本内容由ready变为run done</Text>
                    <Text>实际结果:</Text>
                    <ImageBackground
                        style={[styles.image, { backgroundColor: 'pink' }]}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityLabel='press me'
                        onMagicTap={() => {
                            setOnMagicTap('run done');
                        }}
                    >
                    </ImageBackground>
                    <View
                        style={{
                            marginTop: 10,
                            borderColor: '#f0f0f0',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <Text>log文本:</Text>
                        <Text style={{ padding: 10 }}>{onMagicTap}</Text>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="32.aria-selected">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-selected</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色背景图片,屏幕朗读“已选中React图片背景”;
                        选中下方粉色背景图片,屏幕朗读“React图片背景”</Text>
                    <View accessible={true} style={{ flexDirection: 'row' }}>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-selected={true}
                            style={styles.image}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>
                        <ImageBackground
                            accessible={true}
                            aria-label="React图片背景"
                            aria-selected={false}
                            style={styles.image1}
                            source={require('../../../../tester/assets/bunny.png')}>
                        </ImageBackground>

                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="33.accessibilityViewIsModal=true">
                <View style={styles.container}>
                    <Button title="Show Modal" onPress={() => setModalVisible(true)} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalView} accessibilityViewIsModal={true}>
                            <Text style={styles.modalText}>T1his is a modal!</Text>
                            <Button title="Close Modal" onPress={() => setModalVisible(false)} />
                        </View>
                    </Modal>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="34.accessibilityViewIsModal=false">
                <View style={styles.container}>
                    <Button title="Show Modal" onPress={() => setModalVisible1(true)} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible1}
                        onRequestClose={() => setModalVisible1(false)}
                    >
                        <View style={styles.modalView} accessibilityViewIsModal={false}>
                            <Text style={styles.modalText}>T1his is a modal!</Text>
                            <Button title="Close Modal" onPress={() => setModalVisible1(false)} />
                        </View>
                    </Modal>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="34.aria-valuemax、aria-valuemin、aria-valuenow">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:aria-valuemax、aria-valuemin、aria-valuenow</Text>
                    <Text style={{ padding: 3 }}>预期效果:</Text>
                    <ImageBackground
                        style={styles.image}
                        source={require('../../../../tester/assets/bunny.png')}
                        accessible={true}
                        accessibilityRole="adjustable"
                        aria-valuemax={100}
                        aria-valuemin={0}
                        aria-valuenow={valueNow[valueNow.length - 1]}
                        accessibilityActions={[
                            { name: 'increment' },
                            { name: 'decrement' },
                        ]}
                        onAccessibilityAction={event => {
                            switch (event.nativeEvent.actionName) {
                                case 'increment': {
                                    setValueNow(prev => {
                                        return [...prev, prev[prev.length - 1] + 25];
                                    });
                                    break;
                                }
                                case 'decrement': {
                                    setValueNow(prev => {
                                        return [...prev, prev[prev.length - 1] - 25];
                                    });
                                    break;
                                }
                            }
                        }}
                    >
                    </ImageBackground>
                </View>
            </RNTesterBlock>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
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
    accessibilityLayout: {
        width: '100%',
        height: 100,
        backgroundColor: 'lightblue',
    },
    accessibilityContainer: {
        width: '100%',
        backgroundColor: 'gray',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },


    text: {
        color: 'white',
        fontSize: 30,
        lineHeight: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        height: 120,
        width: 120,
        backgroundColor: 'skyblue',
        marginHorizontal: 5
    },
    image1: {
        flex: 1,
        justifyContent: 'center',
        height: 120,
        width: 120,
        backgroundColor: 'pink',
        marginHorizontal: 5
    },
    image2: {
        flex: 1,
        justifyContent: 'center',
        height: 120,
        width: 120,
        backgroundColor: 'yellow',
        marginHorizontal: 5
    },
});

export default ({
    title: 'ImageBackground',
    name: 'ImageBackgroundAccessible',
    description:
        'Accessiblity about ImageBackground',
    render: () => <ImageBackgroundAccessibleExample />,
}: RNTesterModuleExample);
