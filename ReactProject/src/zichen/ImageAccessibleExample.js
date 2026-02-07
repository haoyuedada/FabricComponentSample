/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
const React = require('react');
const { Image, StyleSheet, View, ScrollView, Text, Button, TouchableWithoutFeedback } = require('react-native');
// import { Button } from '../../components/Button';
import Block from './Block'

const ImageAccessibleExample = () => {
    const [borderColor, setBorderColor] = React.useState('#FFFFFF');
    const [altnone, setAltnone] = React.useState('Click to change the value of alt')
    const [altpolite, setAltPolite] = React.useState('Click to change the value of alt')
    const [altassertive, setAltAssertive] = React.useState('Click to change the value of alt')
    const [checked, setChecked] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [selected, setSelected] = React.useState(false)
    const [busy, setBusy] = React.useState(false)
    const [expanded, setExpanded] = React.useState(false)
    const [accessibilityViewIsModal, setAccessibilityViewIsModal] = React.useState(false)
    const [accessibilityElementsHidden, setAccessibilityElementsHidden] = React.useState(false)
    const [ariabusy, setAriabusy] = React.useState(false)
    const [ariachecked, setAriachecked] = React.useState(false)
    const [ariadisabled, setAriadisabled] = React.useState(false)
    const [ariaexpanded, setAriaexpanded] = React.useState(false)
    const [ariahidden, setAriahidden] = React.useState(false)
    const [ariaselected, setAriaselected] = React.useState(false)
    const accessibilityRoleList = [
        { Role: 'adjustable' }, { Role: 'alert' }, { Role: 'button' }, { Role: 'checkbox' },
        { Role: 'combobox ' }, { Role: 'header' }, { Role: 'image' },
        { Role: 'imagebutton ' }, { Role: 'keyboardkey ' }, { Role: 'link' }, { Role: 'menu' },
        { Role: 'menubar' },
        { Role: 'menuitem' }, { Role: 'none' }, { Role: 'progressbar ' }, { Role: 'radio' },
        { Role: 'radiogroup' },
        { Role: 'scrollbar ' }, { Role: 'search' }, { Role: 'spinbutton ' }, { Role: 'summary ' },
        { Role: 'switch' }, { Role: 'tab' }, { Role: 'tablist' }, { Role: 'text' },
        { Role: 'timer' }, { Role: 'togglebutton ' }, { Role: 'toolbar ' }, { Role: 'grid' },
    ]
    const roleList = [
        { role: 'alert' },
        { role: 'button' },
        { role: 'checkbox' }, { role: 'menubar' }, { role: 'combobox' }, { role: 'grid' }, { role: 'heading' }, { role: 'img' }, { role: 'link' }, { role: 'list' },
        { role: 'menu' }, { role: 'menuitem' }, { role: 'none' }, { role: 'presentation' }, { role: 'progressbar' }, { role: 'radio' }, { role: 'radiogroup' }, { role: 'scrollbar' },
        { role: 'serachbox' }, { role: 'slider' }, { role: 'spinbutton' }, { role: 'summary' }, { role: 'switch' }, { role: 'tab' }, { role: 'tablist' }, { role: 'timer' },
        { role: 'toolbar' },
    ]
    const [isMagicTap, setMagicTap] = React.useState(false);
    const [escape, setEscape] = React.useState(false);
    const [onAccessibilityTap, setOnAccessibilityTap] = React.useState(false);
    return (
        <ScrollView style={{ margin: '10' }}>
            <Block
                title="1.accessibilityActions"
                expect="预期结果：点击图片,图片边框的颜色会由白色变成粉色”"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityActions={[{ name: 'activate', label: 'activate' }]}
                    onAccessibilityAction={(event) => {
                        if (event.nativeEvent.actionName === 'activate') {
                            setBorderColor('pink');
                        }
                    }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, borderWidth: 3 }}
                >
                </Image>
            </Block>

            <Block
                title="2.accessibilityHint"
                expect="预期结果：点击图片会有语音提示“This photo is of a flower”"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityLabel="image"
                    accessibilityHint="This photo is of a flower"
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200 }}
                >
                </Image>
            </Block>


            <Block
                title="3.accessibilityLanguage"
                expect="预期结果：点击图片,屏幕朗读“Flower”"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityLabel="Flower"
                    accessibilityLanguage="it-IT"
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                >
                </Image>
            </Block>
            <Block
                title="4.accessibilityLabel"
                expect="预期结果：点击图片会有语音提示“Tap me”"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityLabel="Tap me!"
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200 }}
                >
                </Image>
            </Block>
            <Block
                title="5.accessibilityLabelledBy"
                expect="预期结果：点击图片，朗读图片下面第一行文字"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityLabelledBy="First"
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200 }}
                >
                </Image>
                <Text nativeID="First">First Label for Input Field</Text>
                <Text nativeID="Second">Second Label for Input Field</Text>
            </Block>
            <Block
                title="6.1、accessibilityLiveRegion-none"
                expect="预期结果：点击图片朗读Click to change the value of alt，双击粉色区域，不会有朗读"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityLiveRegion='none'
                    source={require('../../../../tester/assets/hawk.png')}
                    alt={altnone}
                    style={{ width: 200, height: 200}}
                >
                </Image>
                <TouchableWithoutFeedback onPress={() => { setAltnone('2 The value of alt has changed') }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="6.2、accessibilityLiveRegion-polite"
                expect="预期结果：点击图片朗读Click to change the value of alt，双击粉色区域，朗读2 The value of alt has changed"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityLiveRegion='polite'
                    source={require('../../../../tester/assets/hawk.png')}
                    alt={altpolite}
                    style={{ width: 200, height: 200 }}
                >
                </Image>
                <TouchableWithoutFeedback onPress={() => { setAltPolite('2 The value of alt has changed') }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="6.3、accessibilityLiveRegion-assertive"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityLiveRegion='assertive'
                    source={require('../../../../tester/assets/hawk.png')}
                    alt={altassertive}
                    style={{ width: 200, height: 200 }}
                >
                </Image>
                <TouchableWithoutFeedback onPress={() => { setAltAssertive('2 The value of alt has changed') }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="7.accessibilityRole"
                expect="预期结果：点击图片，朗读标题所示的属性值"
                actual="实际结果："
            >
                {accessibilityRoleList.map((item, index) => {
                    return (
                        <View>
                            <Text style={{ fontSize: 16 }}>7.{index}:{item.Role}</Text>
                            <Image
                                accessible={true}
                                accessibilityRole={item.Role}
                                source={require('../../../../tester/assets/hawk.png')}
                                style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 10 }}
                            />
                        </View>
                    )

                })}
            </Block>
            <Block
                title="8.1、accessibilityState-checked"
                expect="预期结果：点击按钮可以切换checked为true或false；值为false时，屏幕朗读未选中"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityState={{ checked: checked }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                >
                </Image>
                <Button
                    title={'checked:' + checked.toString()}
                    onPress={() => {
                        setChecked(!checked)
                    }}
                />
            </Block>
            <Block
                title="8.2、accessibilityState-disabled"
                expect="预期结果：disabled的值为true时。朗读不可点击"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityState={{ disabled: disabled }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                >
                </Image>
                <Button
                    title={'disabled:' + disabled.toString()}
                    onPress={() => {
                        setDisabled(!disabled)
                    }}
                />
            </Block>
            <Block
                title="8.3、accessibilityState-selected"
                expect="预期结果：selected的值为true时，朗读已选中"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityState={{ selected: selected }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                >
                </Image>
                <Button
                    title={'selected:' + selected.toString()}
                    onPress={() => {
                        setSelected(!selected)
                    }}
                />
            </Block>
            <Block
                title="8.4、accessibilityState-busy"
                expect="预期结果：busy的值为true时，朗读busy"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityState={{ busy: busy }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                >
                </Image>
                <Button
                    title={'busy:' + busy.toString()}
                    onPress={() => {
                        setBusy(!busy)
                    }}
                />
            </Block>
            <Block
                title="8.5、accessibilityState-expanded"
                expect="预期结果：expanded的值为false时，朗读已收起；expanded值为true时，朗读已展开"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityState={{ expanded: expanded }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                >
                </Image>
                <Button
                    title={'expanded:' + expanded.toString()}
                    onPress={() => {
                        setExpanded(!expanded)
                    }}
                />
            </Block>
            <Block
                title="9.1、accessibilityValue-min"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityValue={{ min: 5 }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                >
                </Image>
            </Block>
            <Block
                title="9.2、accessibilityValue-max"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityValue={{ max: 50 }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                >
                </Image>
            </Block>
            <Block
                title="9.3、accessibilityValue-now"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityValue={{ now: 15 }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                >
                </Image>
            </Block>
            <Block
                title="9.4、accessibilityValue-text"
                expect="预期结果：点击图片朗读'Text description of the component value'"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityValue={{ text: 'Text description of the component value' }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                >
                </Image>
            </Block>
            <Block
                title="10.accessibilityViewIsModal"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    accessibilityViewIsModal={true}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                >
                </Image>
                <Image
                    accessible={true}
                    accessibilityElementsHidden={accessibilityElementsHidden}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                >
                </Image>
                <Button
                    title={'accessibilityElementsHidden:' + accessibilityElementsHidden.toString()}
                    onPress={() => {
                        setAccessibilityElementsHidden(true)
                    }}
                />
            </Block>
            <Block
                title="13.accessible"
                expect="预期结果：accessible=true时，图片可以选中并有屏幕朗读；accessible=false时图片不可以选中"
                actual="实际结果："
            >
                <Text>accessible=true</Text>
                <Image
                    accessible={true}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
                <Text>accessible=false</Text>
                <Image
                    accessible={false}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
            </Block>
            <Block
                title="14.importantForAccessibility"
                expect="预期结果：点击图片，朗读second image"
                actual="实际结果："
            >
                <Text style={{ color: 'gray' }}>描述：父视图下的两个子视图完全重叠时，该属性的属性值决定哪个子视图将会被无障碍功能捕捉到</Text>
                <View style={[styles.container, { width: 230, height: 150 }]}>
                    <Image
                        accessible={true}
                        importantForAccessibility="no"
                        alt='first image'
                        source={require('../../../../tester/assets/hawk.png')}
                        style={{
                            width: 200, height: 100,
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            right: 10,
                        }}
                    />
                    <Image
                        accessible={true}
                        alt='second image'
                        importantForAccessibility='yes'
                        source={require('../../../../tester/assets/hawk.png')}
                        style={{
                            width: 200, height: 100,
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            right: 10,
                        }}
                    />
                </View>
            </Block>
            <Block
                title="15.aria-busy"
                expect="预期结果：ariabusy的值为true时，朗读busy"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-busy={ariabusy}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                />
                <Button
                    title={'ariabusy:' + ariabusy.toString()}
                    onPress={() => {
                        setAriabusy(!ariabusy)
                    }}
                />
            </Block>
            <Block
                title="16.aria-checked"
                expect="预期结果：ariachecked的值为false时，朗读未选中；ariachecked的值为true时，朗读已选中"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-checked={ariachecked}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                />
                <Button
                    title={'ariachecked:' + ariachecked.toString()}
                    onPress={() => {
                        setAriachecked(!ariachecked)
                    }}
                />
            </Block>
            <Block
                title="17.aria-disabled"
                expect="预期结果：ariadisabled的值为true时，朗读不可点击"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-disabled={ariadisabled}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                />
                <Button
                    title={'ariadisabled:' + ariadisabled.toString()}
                    onPress={() => {
                        setAriadisabled(!ariadisabled)
                    }}
                />
            </Block>
            <Block
                title="18.aria-expanded"
                expect="预期结果：ariaexpanded的值为false时，朗读已收起；ariaexpanded的值为true时，朗读已展开"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-expanded={ariaexpanded}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                />
                <Button
                    title={'ariaexpanded:' + ariaexpanded.toString()}
                    onPress={() => {
                        setAriaexpanded(!ariaexpanded)
                    }}
                />
            </Block>
            <Block
                title="19.aria-hiddden"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-hidden={ariahidden}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                />
                <Button
                    title={'ariahidden:' + ariahidden.toString()}
                    onPress={() => {
                        setAriahidden(!ariahidden)
                    }}
                />
            </Block>
            <Block
                title="20.aria-label"
                expect="预期结果：点击图片，会有语音提示“This is an image component”"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-label="This is an image component"
                    source={require('../../../../tester/assets/liking.png')}
                    style={{ width: 200, height: 150 }}
                >
                </Image>
            </Block>
            <Block
                title="21.aria-labelledby"
                expect="预期结果：点击图片，朗读图片下面的第一行文字"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-labelledby='First'
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
                <Text nativeID="First">First Label for Input Field</Text>
                <Text nativeID="Second">Second Label for Input Field</Text>
            </Block>
            <Block
                title="23.aria-selected"
                expect="预期结果：ariaselected的值为true时，朗读已选中"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-selected={ariaselected}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor, marginBottom: 5 }}
                />
                <Button
                    title={'ariaselected:' + ariaselected.toString()}
                    onPress={() => {
                        setAriaselected(!ariaselected)
                    }}
                />
            </Block>
            <Block
                title="24.aria-valuemax"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-valuemax={100}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
            </Block>
            <Block
                title="25.aria-valuemin"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-valuemin={100}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
            </Block>
            <Block
                title="26.aria-valuenow"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-valuenow={100}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
            </Block>
            <Block
                title="27.aria-valuetext(换成view组件，可以读出valuetext的值，image组件不可以)"
                expect="预期结果：点击图片，朗读'Text description of the component value'"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    aria-valuetext='Text description of the component value'
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
            </Block>
            <Block
                title="28.role"
                expect="预期结果：点击图片，朗读标题所示的属性值"
                actual="实际结果："
            >
                {roleList.map((item, index) => (
                    <View>
                        <Text>28.{index}:{item.role}</Text>
                        <Image
                            accessible={true}
                            role={item.role}
                            source={require('../../../../tester/assets/hawk.png')}
                            style={{ width: 200, height: 200, borderColor: borderColor }}
                        />
                    </View>
                )
                )}
            </Block>
            <Block
                title="29.onMagicTap"
                expect="预期结果："
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    onMagicTap={() => {
                        setMagicTap(true);
                    }}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                />
                <Text>实际结果：{isMagicTap ? '有双指点击过' : '等待双指点击'}</Text>
            </Block>
            <Block
                title="30.onAccessibilityEscape"
                expect="预期结果："
                actual="实际结果："
            >
                <Text>msg :{escape ? '方法执行了' : '方法未执行'}</Text>
                <Image
                    accessible={true}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                    onAccessibilityEscape={() => {
                        setEscape(true)
                    }}>
                </Image>
            </Block>
            <Block
                title="32.onAccessibilityTap"
                expect="预期结果："
                actual="实际结果："
            >
                <Text>text :{onAccessibilityTap ? '已双击' : '未双击'}</Text>
                <Image
                    accessible={true}
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200, borderColor: borderColor }}
                    onAccessibilityTap={() => {
                        setOnAccessibilityTap(true)
                    }}
                />
            </Block>
            <Block
                title="33.alt"
                expect="预期结果：点击图片，朗读'A string that defines an alternative text description of the image'"
                actual="实际结果："
            >
                <Image
                    accessible={true}
                    alt='A string that defines an alternative text description of the image'
                    source={require('../../../../tester/assets/hawk.png')}
                    style={{ width: 200, height: 200 }}
                />
            </Block>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 30,
        borderColor: 'red',
        borderWidth: 2,
    },
    accessibilityLayout: {
        width: '200',
        height: 200,
        // backgroundColor: 'lightblue',
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    texts: {
        marginBottom: 5
    }
});

export default ({
    title: 'Image',
    name: 'ImageAccessible',
    description:
        'Accessiblity about Image',
    render: () => <ImageAccessibleExample />,
}: RNTesterModuleExample);


