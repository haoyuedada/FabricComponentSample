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
    Button,
    TouchableHighlight,
    Alert
} from 'react-native';
import React, { useState } from 'react';
import RNTesterBlock from '../../components/RNTesterBlock'

function TouchableHighlightAccessibleExample() {
    const accessibilityRoleList = [
        { type: 'none', expect: '', value: '' },
        { type: 'keyboardkey', expect: '', value: '' },
        { type: 'text', expect: '', value: '' },
        { type: 'list', expect: '', value: '' },
        { type: 'adjustable', expect: '提示当前内容是一个进度条', value: '元素具有可调整的特性' },
        { type: 'alert', expect: '提示当前内容是一个alert', value: '警告' },
        { type: 'button', expect: '提示当前内容是一个按钮', value: 'button' },
        { type: 'checkbox', expect: '提示当前内容是一个复选框', value: 'checkbox' },
        { type: 'combobox', expect: '提示当前内容是一个combobox', value: 'combobox' },
        { type: 'header', expect: '提示当前内容是一个标题', value: '内容区域的头部' },
        { type: 'image', expect: '提示当前内容是一个image', value: '图片' },
        { type: 'imagebutton', expect: '提示当前内容是一个button、image', value: '元素应被视为按钮并且也是图像时使用' },
        { type: 'link', expect: '提示当前内容是一个link', value: '链接' },
        { type: 'menu', expect: '提示当前内容是一个menu', value: '菜单' },
        { type: 'menubar', expect: '提示当前内容是一个menubar', value: '菜单栏' },
        { type: 'menuitem', expect: '提示当前内容是一个menuitem', value: '菜单项' },
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
        { type: 'timer', expect: '提示当前内容是一个timer', value: '定时器' },
        { type: 'togglebutton', expect: '提示当前内容是一个关闭开关', value: '切换按钮' },
        { type: 'toolbar', expect: '提示当前内容是一个toolbar', value: '工具栏' },
    ]
    const [accessibilityElementsHidden, setAccessibilityElementsHidden] = useState(false);
    const [accessibilityIgnoresInvertColors, setAccessibilityIgnoresInvertColors] = useState(false);
    const aria_lives = ['off', 'polite', 'assertive'];
    const [aria_live, setAria_live] = useState();
    const accessibilityLiveRegions = ['none', 'polite', 'assertive'];
    const [accessibilityLiveRegion, setAccessibilityLiveRegion] = useState();
    const [aria_hidden, setAria_hidden] = useState(false);
    return (
        <ScrollView>
            <RNTesterBlock title="1.accessible">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:accessible</Text>
                    <Text style={{ padding: 3 }}>预期效果:能选中下方黑色区域,不能选中下方天蓝色区域</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={false}
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="2.aria-label">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-label</Text>
                    <Text style={{ padding: 3 }}>预期效果:能选中下方黑色区域,屏幕朗读“黑色区域”</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="3.aria-busy">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-busy</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“busy”;选中下方天蓝色区域,屏幕朗读“天蓝色区域” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        aria-busy={true}
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="天蓝色区域"
                        aria-busy={false}
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="4.aria-checked">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-checked</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“未选中黑色区域,单机双击即可选中”;
                        选中下方天蓝色区域,屏幕朗读“已选中天蓝色区域,单机双击即可取消选中”;
                        选中下方绿色区域,屏幕朗读“mixed”</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-checked={true}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-checked={false}
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-checked='mixed'
                        accessible={true}
                        aria-label="绿色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'green' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="5.aria-disabled">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-disabled</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,无屏幕朗读“黑色区域,不可点击”；选中下方天蓝色区域,屏幕朗读“天蓝色区域” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-disabled={true}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-disabled={false}
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="6.aria-expanded">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-expanded</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“expanded”;选中下方天蓝色区域,屏幕朗读“alive” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-expanded={true}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-expanded={false}
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="7.aria-selected">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-selected</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“已选中黑色区域”;选中下方天蓝色区域,屏幕朗读“天蓝色区域” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-selected={true}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        aria-selected={false}
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="8.accessibilityHint">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityHint</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“黑色区域,提示:没有文本” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        accessibilityHint="提示:没有文本"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="9.accessibilityLanguage">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLanguage</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“black” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色"
                        accessibilityLanguage="en"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="10.accessibilityLabel">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLabel</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“黑色区域” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        accessibilityLabel="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="11.accessibilityRole">
                {accessibilityRoleList.map((item, index) => (
                    <View key={index} style={{ marginVertical: 5 }}>
                        <Text>accessibilityRole属性值:{item.type}</Text>
                        <Text>预期结果:点击天蓝色区域,{item.expect}</Text>
                        <Text>实际结果:</Text>
                        <TouchableHighlight
                            underlayColor='red'
                            activeOpacity={0.2}
                            accessibilityRole={item.type}
                            accessible={true}
                            onPress={() => { }}
                        >
                            <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                        </TouchableHighlight>
                    </View>
                ))}
            </RNTesterBlock>

            <RNTesterBlock title="12.accessibilityState-disabled">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-disabled</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,无屏幕朗读“黑色区域,按钮,不可用”；选中下方天蓝色区域,屏幕朗读“天蓝色区域,按钮” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'disabled': true }}
                        accessibilityRole='button'
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'disabled': false }}
                        accessibilityRole='button'
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="13.accessibilityState-selected">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-selected</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“已选中黑色区域”;选中下方天蓝色区域,屏幕朗读“天蓝色区域” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'selected': true }}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'selected': false }}
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="14.accessibilityState-checked">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-checked</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“已选中黑色区域,复选框,单指双击即执行”;
                        选中下方天蓝色区域,屏幕朗读“未选中天蓝色区域,复选框,单指双击即执行”
                        选中下方绿色区域,屏幕朗读“绿色区域,mixed”</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'checked': true }}
                        accessibilityRole='checkbox'
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'checked': false }}
                        accessibilityRole='checkbox'
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'checked': 'mixed' }}
                        accessibilityRole='checkbox'
                        accessible={true}
                        aria-label="绿色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'green' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="15.accessibilityState-busy">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-busy</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“busy”;选中下方天蓝色区域,屏幕朗读“天蓝色区域” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'busy': true }}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'busy': false }}
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="16.accessibilityState-expanded">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-expanded</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“expanded”;选中下方天蓝色区域,屏幕朗读“alive” </Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'expanded': true }}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                    <TouchableHighlight

                        underlayColor='red'
                        activeOpacity={0.2}
                        accessibilityState={{ 'expanded': false }}
                        accessible={true}
                        aria-label="天蓝色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="17-1.accessibilityActions-activate">
                <View>
                    <Text>属性值:accessibilityActions-activate</Text>
                    <Text>预期结果:选中下方黑色区域执行双击操作,弹出内容为“activate action success”的弹框</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        accessibilityActions={[{ name: 'activate' }]}
                        onAccessibilityAction={() => {
                            Alert.alert('Alert', 'activate action success');
                        }}
                    >
                        <View style={{ flex: 1, height: 200, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="17-2.accessibilityActions-copy">
                <View>
                    <Text>属性值:accessibilityActions-copy</Text>
                    <Text>预期结果:选中下方黑色区域执行三指双击操作,弹出内容为“copy action success”的弹框</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        accessibilityActions={[{ name: 'copy' }]}
                        onAccessibilityAction={() => {
                            Alert.alert('Alert', 'copy action success');
                        }}
                    >
                        <View style={{ flex: 1, height: 200, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="17-3.accessibilityActions-longpress">
                <View>
                    <Text>属性值:accessibilityActions-longpress</Text>
                    <Text>预期结果:选中下方黑色区域执行,弹出内容为“longpress action success”的弹框</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        accessibilityActions={[{ name: 'longpress' }]}
                        onAccessibilityAction={() => {
                            Alert.alert('Alert', 'longpress action success');
                        }}
                    >
                        <View style={{ flex: 1, height: 200, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="18.accessibilityElementsHidden">
                <View >
                    <Text style={{ padding: 3 }}>属性值:accessibilityElementsHidden</Text>
                    <Text style={{ padding: 3 }}>预期结果:当accessibilityElementsHidden为false时,表示元素可见,可点击黑色区域。
                        当accessibilityElementsHidden为true时,表示元素隐藏(不可见),不可点击到黑色区域</Text>
                    <Text>实际结果:</Text>
                    <Button
                        title={'accessibilityElementsHidden: ' + accessibilityElementsHidden.toString()}
                        onPress={() => setAccessibilityElementsHidden(!accessibilityElementsHidden)}
                        label={'accessibilityElementsHidden: ' + accessibilityElementsHidden.toString()}
                    />
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                        accessibilityElementsHidden={accessibilityElementsHidden}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="19.accessibilityIgnoresInvertColors">
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
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                        accessibilityIgnoresInvertColors={accessibilityIgnoresInvertColors}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="20.aria-live">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-live</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中“POLITE”和“ASSERTIVE”按钮双击后,屏幕朗读“黑色区域”,选中“OFF”按钮双击后,屏幕无朗读</Text>
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
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                        aria-live={aria_live}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="21.accessibilityLiveRegion">
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
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                        accessibilityLiveRegion={accessibilityLiveRegion}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="22.accessibilityValue">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityValue</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“黑色区域,当前进度为100%”</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-label="黑色区域"
                        onPress={() => { }}
                        accessibilityValue={{ text: '当前进度为100%' }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="23.aria-valuemax、aria-valuemin、aria-valuenow">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-valuemax、aria-valuemin、aria-valuenow</Text>
                    <Text style={{ padding: 3 }}>预期效果:</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
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
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="26.aria-valuetext">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-valuetext</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色区域,屏幕朗读“黑色区域”</Text>
                    <TouchableHighlight
                        underlayColor='red'
                        activeOpacity={0.2}
                        accessible={true}
                        aria-valuetext="黑色区域"
                        onPress={() => { }}
                    >
                        <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                    </TouchableHighlight>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="27.importantForAccessibility">
                <View>
                    <Text style={{ padding: 3 }}>属性值:importantForAccessibility</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方天蓝色区域,屏幕朗读“First layout”,忽略天蓝色区域内容</Text>
                    <View accessible={true}>
                        <TouchableHighlight
                            underlayColor='red'
                            activeOpacity={0.2}
                            onPress={() => { }}
                            importantForAccessibility="yes"
                        >
                            <Text style={{ flex: 1, height: 40, backgroundColor: 'pink' }}>First layout</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor='red'
                            activeOpacity={0.2}
                            onPress={() => { }}
                            importantForAccessibility="no-hide-descendants"
                        >
                            <Text style={{ flex: 1, height: 40, backgroundColor: 'skyblue' }}>secend layout</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="27.aria-hidden">
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
                <TouchableHighlight
                    underlayColor='red'
                    activeOpacity={0.2}
                    accessible={true}
                    onPress={() => { }}
                    aria-hidden={aria_hidden}
                >
                    <View style={{ flex: 1, height: 40, backgroundColor: 'black' }} />
                </TouchableHighlight>
            </RNTesterBlock>
        </ScrollView>
    );
}


export default ({
    title: 'TouchableHighlight',
    name: 'TouchableHighlightAccessible',
    description:
        'Accessiblity about TouchableHighlight',
    render: () => <TouchableHighlightAccessibleExample />,
}: RNTesterModuleExample);
