const React = require('react');
const { TouchableWithoutFeedback, StyleSheet, View, ScrollView, Text, TouchableOpacity,Button } = require('react-native');
import Block from './Block'

const TouchableOpacityAccessibleExample = () => {
    const [none,setNone] = React.useState('click')
    const [polite,setPolite] = React.useState('click')
    const [assertive,setAssertive] = React.useState('click')
    const accessibilityRoleList = [
        { Role: 'adjustable' }, { Role: 'alert' }, { Role: 'button' }, { Role: 'checkbox' },
        { Role: 'combobox' }, { Role: 'header' }, { Role: 'image' },
        { Role: 'imagebutton' }, { Role: 'keyboardkey' }, { Role: 'link' }, { Role: 'menu' },
        { Role: 'menubar' },
        { Role: 'menuitem' }, { Role: 'none' }, { Role: 'progressbar' }, { Role: 'radio' },
        { Role: 'radiogroup' },
        { Role: 'scrollbar' }, { Role: 'search' }, { Role: 'spinbutton' }, { Role: 'summary' },
        { Role: 'switch' }, { Role: 'tab' }, { Role: 'tablist' }, { Role: 'text' },
        { Role: 'timer' }, { Role: 'togglebutton' }, { Role: 'toolbar' }, { Role: 'grid' },
    ]
    const [disabled, setDisabled] = React.useState(false)
    const [selected, setSelected] = React.useState(false)
    const [checked, setChecked] = React.useState(false)
    const [busy, setBusy] = React.useState(false)
    const [expanded, setExpanded] = React.useState(false)
    const [msg, setMsg] = React.useState('no activate')
    const [ariabusy, setAriabusy] = React.useState(false)
    const [ariachecked, setAriachecked] = React.useState(false)
    return (
        <ScrollView>
            <Block
                title="2.accessibilityElementsHidden"
                expect="预期结果："
                actual="实际结果："
            >
                <TouchableOpacity style={styles.button} >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityElementsHidden={true}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="3.accessible"
                expect="预期结果：属性值为true的时候，视图可以作为屏幕朗读的对象，即视图可以点击并进行朗读；属性值为false的时候，视图不可以作为屏幕朗读的对象即视图不能点击"
                actual="实际结果："
            >
                <Text>accessible=true</Text>
                <TouchableOpacity
                    style={[styles.button,{marginBottom:5}]}
                    accessible={true}
                >
                    <Text>Click Here</Text>
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Text>accessible=false</Text>
                <TouchableOpacity
                    style={styles.button}
                    accessible={false}
                >
                    <Text>Click Here</Text>
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="4.accessibilityLabel"
                expect="预期结果：点击下面视图，屏幕朗读“this is a touchableOpacity”"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLabel='this is a touchableOpacity'
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="5.1、accessibilityLiveRegion--none"
                expect="预期结果：双击粉色视图，灰色视图的文字由‘click’变成‘clicked’，但是不会朗读出来"
                actual="实际结果："
            >
                <TouchableWithoutFeedback onPress={()=>{setNone('clicked')}}>
                    <View style={{ width: 150, height: 80, backgroundColor: 'pink' }}>
                        <Text>Click me11</Text>
                    </View>
                </TouchableWithoutFeedback>                
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLiveRegion='none'
                >
                    <Text>{none}</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="5.2、accessibilityLiveRegion--polite"
                expect="预期结果：双击粉色视图，灰色视图的文字由‘click’变成‘clicked’，并且会朗读出来"
                actual="实际结果："
            >
                <TouchableWithoutFeedback onPress={()=>{setPolite('clicked')}}>
                    <View style={{ width: 150, height: 80, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLiveRegion='polite'
                >
                    <Text>{polite}</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="5.3、accessibilityLiveRegion--assertive"
                expect="预期结果："
                actual="实际结果："
            >
                <TouchableWithoutFeedback onPress={()=>{setAssertive('clicked')}}>
                    <View style={{ width: 150, height: 80, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLiveRegion='assertive '
                >
                    <Text>{assertive}</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="6.accessibilityLanguage"
                expect="预期结果：点击下面视图，会朗读出‘Pizza’"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLabel='Pizza'
                    accessibilityLanguage='it-IT'
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="7.accessibilityHint"
                expect="预期结果：点击下面视图，会朗读出‘this is a food’"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLabel='Pizza'
                    accessibilityHint='this is a food'
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="8.accessibilityRole"
                expect="预期结果：点击灰色视图，会朗读标题所示的属性值"
                actual="实际结果："
            >
                {accessibilityRoleList.map((item, index) => {
                    return (
                        <View>
                            <Text>8.{index}:{item.Role}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                accessible={true}
                                accessibilityRole={item.Role}
                            >
                                <Text>Press Here</Text>
                            </TouchableOpacity>
                        </View>

                    )
                })}
            </Block>
            <Block
                title="9.1、accessibilityState-disabled"
                expect="预期结果：点击按钮可以切换disabled为true或false，值为true时，会朗读不可点击"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityState={{ disabled: disabled }}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Button
                    title={'disabled:' + disabled.toString()}
                    onPress={() => {
                        setDisabled(!disabled)
                    }}
                />
            </Block>
            <Block
                title="9.2、accessibilityState-selected"
                expect="预期结果：点击按钮可以切换selected为true或false，值为true时，会朗读已选中"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityState={{ selected: selected }}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Button
                    title={'selected:' + selected.toString()}
                    onPress={() => {
                        setSelected(!selected)
                    }}
                />
            </Block>
            <Block
                title="9.3、accessibilityState-checked"
                expect="预期结果：点击按钮可以切换checked为true或false，值为true时，会朗读已选中；值为false时，会朗读未选中"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityState={{ checked: checked }}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Button
                    title={'checked:' + checked.toString()}
                    onPress={() => {
                        setChecked(!checked)
                    }}
                />
            </Block>
            <Block
                title="9.4、accessibilityState-busy"
                expect="预期结果：点击按钮可以切换busy为true或false，值为true时，朗读busy;值为false时朗读Press Here"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityState={{ busy: busy }}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Button
                    title={'busy:' + busy.toString()}
                    onPress={() => {
                        setBusy(!busy)
                    }}
                />
            </Block>
            <Block
                title="9.5、accessibilityState-expanded"
                expect="预期结果：点击按钮可以切换busy为true或false，值为true时，朗读已展开;值为false时朗读已收起"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityState={{ expanded: expanded }}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Button
                    title={'expanded:' + expanded.toString()}
                    onPress={() => {
                        setExpanded(!expanded)
                    }}
                />
            </Block>
            <Block
                title="10.accessibilityActions"
                expect="预期结果：双击灰色试图，文字由‘no activate’变成‘’activated"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityActions={[{ name: 'activate', label: 'activate' }]}
                    onAccessibilityAction={(event) => {
                        if (event.nativeEvent.actionName === 'activate') {
                            setMsg('activated');
                        }
                    }}
                >
                    <Text>{msg}</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="11.accessibilityViewIsModal"
                expect="预期结果："
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityViewIsModal={true}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityViewIsModal={true}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </Block>
            <Block
                title="12.aria-busy"
                expect="预期结果：点击按钮可以切换aria-busy为true或false，值为true时，朗读busy;值为false时朗读Press Here"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    aria-busy={ariabusy}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Button
                    title={'aria-busy:' + ariabusy.toString()}
                    onPress={() => {
                        setAriabusy(!ariabusy)
                    }}
                />
            </Block>
            <Block
                title="13.aria-checked"
                expect="预期结果：点击按钮可以切换aria-checked为true或false，值为true时朗读已选中;值为false时朗读未选中"
                actual="实际结果："
            >
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    aria-checked={ariachecked}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>
                <Button
                    title={'aria-checked:' + ariachecked.toString()}
                    onPress={() => {
                        setAriachecked(!ariachecked)
                    }}
                />
            </Block>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
})


export default ({
    title: 'TouchableOpacity',
    name: 'TouchableOpacityAccessible',
    description:
        'Accessiblity about TouchableOpacity',
    render: () => <TouchableOpacityAccessibleExample />,
}: RNTesterModuleExample);