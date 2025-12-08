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
    Alert
} from 'react-native';
import React, { useState } from 'react';
import RNTesterBlock from '../../components/RNTesterBlock'
const accessibilityRoleList = [
    { type: 'button', expect: '提示当前内容是一个按钮', value: 'button' },
    { type: 'togglebutton', expect: '提示当前内容是一个状态按钮', value: 'togglebutton' },
    { type: 'search', expect: '提示当前内容是一个编辑框', value: 'search' },
    { type: 'searchbox', expect: '提示当前内容是一个编辑框', value: 'searchbox' },
    { type: 'img', expect: '提示当前内容是一个图片', value: 'img' },
    { type: 'image', expect: '提示当前内容是一个图片', value: 'image' },
    { type: 'adjustable', expect: '提示当前内容是一个进度条', value: 'adjustable' },
    { type: 'imagebutton', expect: '提示当前内容是一个按钮', value: 'imagebutton' },
    { type: 'checkbox', expect: '提示当前内容是一个复选框', value: 'checkbox' },
    { type: 'progressbar', expect: '提示当前内容是一个进度条', value: 'progressbar' },
    { type: 'radio', expect: '提示当前内容是一个单选框', value: 'radio' },
    { type: 'scrollbar', expect: '提示当前内容是一个垂直滚动条', value: 'scrollbar' },
    { type: 'switch', expect: '提示当前内容是一个状态按钮', value: 'switch' },
    { type: 'list', expect: '提示当前内容是一个列表', value: 'list' },
    { type: 'slider', expect: '提示当前内容是一个滑动条', value: 'slider' },
]
const roleList = [
    { type: 'button', expect: '提示当前内容是一个按钮', value: 'button' },
    { type: 'searchbox', expect: '提示当前内容是一个编辑框', value: 'searchbox' },
    { type: 'img', expect: '提示当前内容是一个图片', value: 'img' },
    { type: 'checkbox', expect: '提示当前内容是一个复选框', value: 'checkbox' },
    { type: 'progressbar', expect: '提示当前内容是一个进度条', value: 'progressbar' },
    { type: 'radio', expect: '提示当前内容是一个单选框', value: 'radio' },
    { type: 'scrollbar', expect: '提示当前内容是一个垂直滚动条', value: 'scrollbar' },
    { type: 'switch', expect: '提示当前内容是一个状态按钮', value: 'switch' },
    { type: 'list', expect: '提示当前内容是一个列表', value: 'list' },
    { type: 'slider', expect: '提示当前内容是一个滑动条', value: 'slider' },
]
function TextAccessibleExample() {
    return (
        <ScrollView>
            <RNTesterBlock title="1.accessible">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessible</Text>
                    <Text style={{ padding: 3 }}>预期效果:能选中下方黑色背景文本,屏幕朗读“文本1”,不能选中下方天蓝色背景文本 </Text>
                    <Text accessible={true} style={styles.text}>文本1</Text>
                    <Text accessible={false} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="2.aria-label">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-label</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“测试文本” </Text>
                    <Text accessible={true} aria-label="测试文本" style={styles.text}>文本1</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="3.aria-busy">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-busy</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“busy”;选中下方天蓝色背景文本,屏幕朗读“文本2” </Text>
                    <Text accessible={true} aria-busy={true} style={styles.text}>文本1</Text>
                    <Text accessible={true} aria-busy={false} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="4.aria-checked">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-checked</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“未选中文本1,单机双击即可选中”;
                        选中下方天蓝色背景文本,屏幕朗读“已选中文本2,单机双击即可取消选中”;
                        选中下方绿背景文本,屏幕朗读“mixed”</Text>
                    <Text accessible={true} aria-checked={false} style={styles.text} role='checkbox'>文本1</Text>
                    <Text accessible={true} aria-checked={true} style={styles.text1} role='checkbox'>文本2</Text>
                    <Text accessible={true} aria-checked='mixed' style={styles.text2} role='checkbox'>文本3</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="5.aria-disabled">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-disabled</Text>
                    <Text accessible={true} style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,无屏幕朗读“文本1,不可点击”；选中下方天蓝色背景文本,屏幕朗读“文本2” </Text>
                    <Text accessible={true} aria-disabled={true} style={styles.text}>文本1</Text>
                    <Text accessible={true} aria-disabled={false} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="6.aria-expanded">
                <View>
                    <Text style={{ padding: 3 }}>属性值:aria-expanded</Text>
                    <Text accessible={true} style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“expanded”;选中下方天蓝色背景文本,屏幕朗读“alive” </Text>
                    <Text accessible={true} aria-expanded={true} style={styles.text}>文本1</Text>
                    <Text accessible={true} aria-expanded={false} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="7.role">
                {roleList.map((item, index) => (
                    <View key={index} style={{ paddingBottom: 10 }}>
                        <Text>属性值：{item.type}</Text>
                        <Text>预期结果：{item.expect}</Text>
                        <Text>实际结果：</Text>
                        <Text
                            style={styles.text1}
                            accessible={true}
                            role={item.type}>
                            {item.value}
                        </Text>
                    </View>
                ))}
            </RNTesterBlock>

            <RNTesterBlock title="8.accessibilityHint">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityHint</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“这是个Text组件,提示:没有文本” </Text>
                    <Text
                        accessible={true}
                        aria-label="这是个Text组件"
                        accessibilityHint="提示:没有文本"
                        style={styles.text}></Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="9.accessibilityLanguage">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLanguage</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“文本1” </Text>
                    <Text accessible={true} accessibilityLanguage="it-IT" style={styles.text}>文本1</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="10.accessibilityLabel">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityLabel</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“这是个Text组件” </Text>
                    <Text accessible={true} accessibilityLabel='这是个Text组件' style={styles.text}>文本1</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="11.accessibilityRole">
                {accessibilityRoleList.map((item, index) => (
                    <View key={index} style={{ paddingBottom: 10 }}>
                        <Text>属性值：{item.type}</Text>
                        <Text>预期结果：{item.expect}</Text>
                        <Text>实际结果：</Text>
                        <Text
                            style={styles.text1}
                            accessible={true}
                            accessibilityRole={item.type}>
                            {item.value}
                        </Text>
                    </View>
                ))}
            </RNTesterBlock>

            <RNTesterBlock title="12.accessibilityState-disabled">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-disabled</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“文本1,不可点击”;选中下方天蓝色背景文本,屏幕朗读“文本2” </Text>
                    <Text accessible={true} accessibilityState={{ 'disabled': true }} style={styles.text}>文本1</Text>
                    <Text accessible={true} accessibilityState={{ 'disabled': false }} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="13.accessibilityState-selected">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-selected</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“已选中文本1”;选中下方天蓝色背景文本,屏幕朗读“文本2” </Text>
                    <Text accessible={true} accessibilityState={{ 'selected': true }} style={styles.text}>文本1</Text>
                    <Text accessible={true} accessibilityState={{ 'selected': false }} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="14.accessibilityState-checked">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-checked</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“已选中文本1,单指双击即可取消选中”;
                        选中下方天蓝色背景文本,屏幕朗读“未选中文本2,单指双击即可选中” </Text>
                    <Text accessible={true} accessibilityState={{ 'checked': true }} style={styles.text}>文本1</Text>
                    <Text accessible={true} accessibilityState={{ 'checked': false }} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="15.accessibilityState-busy">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-busy</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“busy”;选中下方天蓝色背景文本,屏幕朗读“文本2” </Text>
                    <Text accessible={true} accessibilityState={{ 'busy': true }} style={styles.text}>文本1</Text>
                    <Text accessible={true} accessibilityState={{ 'busy': false }} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="16.accessibilityState-expanded">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityState-expanded</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本,屏幕朗读“expanded”;选中下方天蓝色背景文本,屏幕朗读“alive” </Text>
                    <Text accessible={true} accessibilityState={{ 'expanded': true }} style={styles.text}>文本1</Text>
                    <Text accessible={true} accessibilityState={{ 'expanded': false }} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="17.accessibilityActions&onAccessibilityAction">
                <View>
                    <Text style={{ padding: 3 }}>属性值:accessibilityActions&onAccessibilityAction</Text>
                    <Text>预期结果:选中下方黑色背景文本执行以下操作，触发对应弹框</Text>
                    <Text style={{ marginVertical: 5 }}>1.双击文本,弹出内容为“activate action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>2.双击文本并在屏幕上按住一根手指,弹出内容为“longpress action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>3.在iOS上,当组件具有角色并且用户将焦点放在该组件上并向上滑动时或
                        在Android上,当用户将辅助功能焦点放在组件上并按下调高音量按钮时,弹出内容为“increment action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>4.在iOS上,当组件具有角色并且用户将焦点放在该组件上并向下滑动时或
                        在Android上,当用户将辅助功能焦点放在组件上并按下调低音量按钮时,弹出内容为“decrement action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>5.双指双击文本,弹出内容为“magicTap action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>6.双指在文本上执行划动手势（左、右、左）,弹出内容为“escape action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>7.执行剪切,弹出内容为“cut action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>8.执行三指双击,弹出内容为“copy action success”的弹框</Text>
                    <Text style={{ marginVertical: 5 }}>9.执行粘贴,弹出内容为“paste action success”的弹框</Text>
                    <Text
                        accessible={true}
                        style={[styles.text, { height: 200 }]}
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
                        }}>文本1</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="18.allowFontScaling">
                <View accessible={true}>
                    <Text style={{ padding: 3 }}>属性值:allowFontScaling</Text>
                    <Text style={{ padding: 3 }}>预期效果:下方黑色背景文本会根据设备的字体设置进行缩放;天蓝色背景文本不会根据设备的字体设置进行缩放 </Text>
                    <Text allowFontScaling={true} style={styles.text}>文本1</Text>
                    <Text allowFontScaling={false} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>

            <RNTesterBlock title="19.aria-selected">
                <View style={styles.box}>
                    <Text style={{ padding: 3 }}>属性值:aria-selected</Text>
                    <Text style={{ padding: 3 }}>预期效果:选中下方黑色背景文本屏幕朗读“已选中文本1”,选中蓝色背景文本屏幕朗读“文本2” </Text>
                    <Text accessible={true} aria-selected={true} style={styles.text}>文本1</Text>
                    <Text accessible={true} aria-selected={false} style={styles.text1}>文本2</Text>
                </View>
            </RNTesterBlock>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 24,
        lineHeight: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'black',
    },
    text1: {
        color: 'white',
        fontSize: 24,
        lineHeight: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'skyblue',
    },
    text2: {
        color: 'white',
        fontSize: 24,
        lineHeight: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'green',
    },
});

export default ({
    title: 'Text',
    name: 'TextAccessible',
    description:
        'Accessiblity about Text',
    render: () => <TextAccessibleExample />,
}: RNTesterModuleExample);
