/**ollapsable
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';



const React = require('react');

const {
    Button,
    TouchableOpacity,
    Text,
    View,
    Pressable,
    ScrollView,
} = require('react-native');
import { useState } from 'react';

function TouchableOpacityExample() {
    const [bg, setBg] = useState('#FFFFFF');
    const [aria_disabled, setAria_disabled] = useState(false);
    const [aria_expanded, setAria_expanded] = useState(false);
    const [aria_hidden, setAria_hidden] = useState(false);
    const [messagelives, setMessagelives] = useState('');
    const aria_lives = ['off', 'polite', 'assertive', 'rude'];
    const [aria_live, setAria_live] = useState('none');
    const [aria_modal, setAria_modal] = useState(false);
    const [display, setDisplay] = useState("none");
    const importantForAccessibilities = ['auto', 'yes', 'no', 'no-hide-descendants'];
    const [importantForAccessibility, setImportantForAccessibility] = useState('auto');
    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }}>
                {/* 14. aria-disabled*/}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>14.aria-disabled </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：aria-disabled </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：</Text>
                    <Text style={{ marginBottom: 5 }}>1.当aria-disabled为false时，表示清除非激活状态</Text>
                    <Text style={{ marginBottom: 5 }}>2.当aria-disabled为true时，表示当前是非激活状态，提示元素不可点击</Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <Button
                        title={'aria_disabled: ' + aria_disabled.toString()}
                        onPress={() => setAria_disabled(!aria_disabled)}
                        label={'aria_disabled: ' + aria_disabled.toString()}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-disabled={aria_disabled}
                    >
                        <Text style={{ padding: 10 }}>text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 15.aria-expanded  */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>15.aria-expanded </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：aria-expanded </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：</Text>
                    <Text style={{ marginBottom: 5 }}>1.当aria-expanded为false时，表示元素不是展开</Text>
                    <Text style={{ marginBottom: 5 }}>2.当aria-expanded为true时，表示元素是展开的</Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <Button
                        title={'aria_expanded: ' + aria_expanded.toString()}
                        onPress={() => setAria_expanded(!aria_expanded)}
                        label={'aria_expanded: ' + aria_expanded.toString()}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-expanded={aria_expanded}
                    >
                        <Text style={{ padding: 10 }}>text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 16.aria-hidden */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>16.aria-hidden  </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：aria-hidden </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：</Text>
                    <Text style={{ marginBottom: 5 }}>1.当aria-hidden为false时，表示元素可见，可点击文本内容</Text>
                    <Text style={{ marginBottom: 5 }}>2.当aria-hidden为true时，表示元素隐藏(不可见)，不可点击到文本</Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <Button
                        title={'aria_hidden: ' + aria_hidden.toString()}
                        onPress={() => setAria_hidden(!aria_hidden)}
                        label={'aria_hidden: ' + aria_hidden.toString()}
                    />
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-hidden={aria_hidden}
                    >
                        <Text style={{ padding: 10 }}>text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 17. aria-label */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>17.aria-label </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：{"aria-label='这是在一个“安全”的可视区域内渲染内容的组件'"} </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：点击文本内容提示：这是在一个“安全”的可视区域内渲染内容的组件</Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-label='这是在一个“安全”的可视区域内渲染内容的组件'
                    >
                        <Text style={{ padding: 10 }}>text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 18. aria-live */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>18.aria-live </Text>
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
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-live={aria_live}
                    >
                        <Text>{messagelives}</Text>
                    </TouchableOpacity>
                    <Button title="按钮" onPress={() => { setMessagelives('内容更新啦！'); }} />
                </View>

                {/* 19. aria-modal */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>19.aria-modal </Text>
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
                        <View display={display}>
                            <TouchableOpacity
                                style={{ borderColor: '#527FE4', borderWidth: 5, }}
                                accessible={true}
                                aria-modal={aria_modal}
                            >
                                <View>
                                    <Text style={{ fontSize: 16, padding: 5 }}>text two</Text>
                                    <Text style={{ fontSize: 16, padding: 5 }}>text three</Text>
                                </View>
                                <Button title="关闭" onPress={() => { setDisplay("none") }}>关闭</Button>
                            </TouchableOpacity>
                        </View>
                        <Pressable style={{ borderWidth: 1, height: 30, width: 120, borderRadius: 5, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                setDisplay("black")
                            }}>
                            <Text>打开</Text>
                        </Pressable>

                    </View>
                </View>

                {/* 20. aria-selected */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>20.aria-selected </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：aria-selected</Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：点击text one,读出“已选中text one”，点击text two读出“text two”</Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, marginRight: 10 }}
                            accessible={true}
                            aria-selected={true}
                        >
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red', marginRight: 10 }}></View>
                            <Text>text one</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, flexDirection: 'row', width: 80, }}
                            accessible={true}
                            aria-selected={false}
                        >
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'grey', marginRight: 10 }}></View>
                            <Text>text two</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 21.onAccessibilityAction*/}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>21.onAccessibilityAction </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：onAccessibilityAction</Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：双击文本内容后，背景变为粉红色</Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <TouchableOpacity
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
                    </TouchableOpacity>
                </View>

                {/* 22. accessibilityValue*/}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>22.accessibilityValue </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：accessibilityValue</Text>
                    <Text style={{ marginBottom: 5 }}>预期结果:提示当前进度为50%</Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        accessibilityValue={{ text: '当前进度为50%' }}>
                        <View style={{ height: 30, width: 135, backgroundColor: 'green' }}></View>
                    </TouchableOpacity>
                </View>

                {/* 23. aria-valuemax */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>23.aria-valuemax </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuemax='100'"} </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuemin的值，100 </Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-valuemax={0}
                    >
                        <Text style={{ padding: 10 }} >text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 24. aria-valuemin */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>24.aria-valuemin </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuemin='0'"} </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuemin的值，0 </Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-valuemin={0}
                    >
                        <Text style={{ padding: 10 }} >text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 25. aria-valuenow */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>25.aria-valuenow </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuenow='40'"} </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuenow的值，40 </Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-valuenow='40'
                    >
                        <Text style={{ padding: 10 }} >text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 26. aria-valuetext */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>26.aria-valuetext </Text>
                    <Text style={{ marginBottom: 5 }}>属性值：{"aria-valuetext='20'"} </Text>
                    <Text style={{ marginBottom: 5 }}>预期结果：读出aria-valuetext的值，20 </Text>
                    <Text style={{ marginBottom: 5 }}>实际结果：</Text>
                    <TouchableOpacity
                        style={{ flex: 1, borderColor: '#527FE4', borderWidth: 5, }}
                        accessible={true}
                        aria-valuetext='20'
                    >
                        <Text style={{ padding: 10 }} >text one</Text>
                    </TouchableOpacity>
                </View>

                {/* 27.importantForAccessibility */}
                <View style={{ marginBottom: 30, borderWidth: 1, padding: 10, width: 320 }}>
                    <View>
                        <Text style={{ fontSize: 18, marginBottom: 5 }}>27.importantForAccessibility</Text>
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
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'green',
                                    width: '100%',
                                    height: 100,

                                }}
                            >
                                <Text>First layout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'yellow',
                                    width: '100%',
                                    height: 100,

                                }}
                                importantForAccessibility={importantForAccessibility}>
                                <Text>Ignored Layout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </View>
        </ScrollView>
    )
}

export default ({
    title: 'TouchableOpacity',
    name: 'TouchableOpacityAccessible',
    description:
        'Accessiblity about TouchableOpacity',
    render: () => <TouchableOpacityExample />
}: RNTesterModuleExample);
