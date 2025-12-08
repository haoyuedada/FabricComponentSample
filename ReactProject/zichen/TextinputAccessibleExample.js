const React = require('react');
const { TouchableWithoutFeedback,Alert, StyleSheet, View, ScrollView, Text, TextInput, Button } = require('react-native');
import Block from './Block'

const TextinputAccessibleExample = () => {
    const [msg, setMsg] = React.useState('no activate')
    const [none, setNone] = React.useState('click')
    const [polite, setPolite] = React.useState('click')
    const [assertive, setAssertive] = React.useState('click')
    const [ariachecked, setAriachecked] = React.useState(false)
    const [liveOff, setLiveOff] = React.useState('click')
    const [livePolite, setLivePolite] = React.useState('click')
    const [liveAssertive, setLiveAssertive] = React.useState('click')
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
    const [checked, setChecked] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [selected, setSelected] = React.useState(false)
    const [busy, setBusy] = React.useState(false)
    const [expanded, setExpanded] = React.useState(false)
    const [importantForAccessibility, setImportantForAccessibility] = React.useState('yes')
    const importantForAccessibilityList = ['auto', 'no', 'no-hide-descendants']
    const [ariabusy, setAriabusy] = React.useState(false)
    const [ariadisabled, setAriadisabled] = React.useState(false)
    const [ariaexpanded, setAriaexpanded] = React.useState(false)
    const [ariahidden, setAriahidden] = React.useState(false)
    const [ariaselected, setAriaselected] = React.useState(false)
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
        <ScrollView>
            <View>
                <TextInput
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
                   
                </TextInput>


                <TextInput
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
                    
                </TextInput>

                <TextInput
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
            <Block
                title="1.accessibilityActions"
                expect="预期结果：屏幕朗读后，双击输入框，输入框内的文字由“no activate”变成“activated”"
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                    value={msg}
                    accessible={true}
                    accessibilityActions={[{ name: 'activate', label: 'activate' }]}
                    onAccessibilityAction={(event) => {
                        if (event.nativeEvent.actionName === 'activate') {
                            setMsg('activated');
                        }
                    }}
                >
                </TextInput>
            </Block>
            <Block
                title="2.accessibilityHint"
                expect="预期结果：点击输入框，屏幕朗读“这是一个输入框”"
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                    accessible={true}
                    accessibilityLabel="input"
                    accessibilityHint='这是一个输入框'
                >
                </TextInput>
            </Block>
            <Block
                title="3.accessibilityLanguage"
                expect="预期结果：点击输入框，屏幕朗读“Pizza”"
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                    accessible={true}
                    accessibilityLabel="Pizza"
                    accessibilityLanguage="it-IT"
                >
                </TextInput>
            </Block>
            <Block
                title="4.accessibilityLabel"
                expect="预期结果：点击输入框，屏幕朗读“input-输入框”"
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                    accessible={true}
                    accessibilityLabel="input-输入框"
                >
                </TextInput>
            </Block>
            <Block
                title="5.accessibilityLabelledBy"
                expect="预期结果：点击输入框，会朗读输入框下面第一行的文字"
                actual="实际结果："
            >
                <Text style={{ padding: 3 }, styles.title}>5.accessibilityLabelledBy</Text>
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
            </Block>
            <Block
                title="6.1、accessibilityLiveRegion--none"
                expect="预期结果：点击粉色视图，输入框内的文字由‘click’变成‘clicked’，但是不会朗读出来"
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                    accessible={true}
                    accessibilityLiveRegion="none"
                    value={none}
                >
                </TextInput>
                <TouchableWithoutFeedback onPress={() => { setNone('clicked') }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="6.2、accessibilityLiveRegion--polite"
                expect="预期结果：点击粉色视图，输入框内的文字由‘click’变成‘clicked’，并且会朗读出来"
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                    accessible={true}
                    accessibilityLiveRegion="polite"
                    value={polite}
                >
                </TextInput>
                <TouchableWithoutFeedback onPress={() => { setPolite('clicked') }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="6.3、accessibilityLiveRegion--assertive"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                    accessible={true}
                    accessibilityLiveRegion="assertive"
                    value={assertive}
                >
                </TextInput>
                <TouchableWithoutFeedback onPress={() => { setAssertive('clicked') }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="7.accessibilityRole"
                expect="预期结果：点击输入框，会朗读标题所示的属性值"
                actual="实际结果："
            >
                {accessibilityRoleList.map((item, index) => {
                    return (
                        <View>
                            <Text>7.{index}:{item.Role}</Text>
                            <TextInput
                                style={[styles.base, { marginBottom: 8 }]}
                                placeholder={item.Role}
                                accessible={true}
                                accessibilityRole={item.Role}
                            />
                        </View>

                    )
                })}
            </Block>
            <Block
                title="8.1、accessibilityState-checked"
                expect="预期结果：点击按钮可以切换checked为true或false，值为true时朗读已选中；值为false时朗读未选中"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityState={{ checked: checked }}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'checked:' + checked.toString()}
                    onPress={() => {
                        setChecked(!checked)
                    }}
                />
            </Block>
            <Block
                title="8.2、accessibilityState-disabled"
                expect="预期结果：点击按钮可以切换disabled为true或false，值为true时朗读不可点击"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityState={{ disabled: disabled }}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'disabled:' + disabled.toString()}
                    onPress={() => {
                        setDisabled(!disabled)
                    }}
                />
            </Block>
            <Block
                title="8.3、accessibilityState-selected"
                expect="预期结果：点击按钮可以切换selected为true或false，值为true时，朗读已选中"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityState={{ selected: selected }}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'selected:' + selected.toString()}
                    onPress={() => {
                        setSelected(!selected)
                    }}
                />
            </Block>
            <Block
                title="8.4、accessibilityState-busy"
                expect="预期结果：点击按钮可以切换busy为true或false，值为true时朗读busy"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityState={{ busy: busy }}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'busy:' + busy.toString()}
                    onPress={() => {
                        setBusy(!busy)
                    }}
                />
            </Block>
            <Block
                title="8.5、accessibilityState-expanded"
                expect="预期结果：点击按钮可以切换expanded为true或false，值为true时朗读已展开；值为false朗读已收起"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityState={{ expanded: expanded }}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
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
                <TextInput
                    accessible={true}
                    accessibilityValue={{ min: 5 }}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="9.2、accessibilityValue-max"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityValue={{ max: 5 }}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="9.3、accessibilityValue-text"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityValue={{ text: 'this is a textinput' }}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="9.4、accessibilityValue-now"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    accessibilityValue={{ now: 5 }}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="10.accessibilityViewIsModal"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                >
                </TextInput>
                <TextInput
                    accessible={true}
                    accessibilityViewIsModal={true}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="11.accessibilityElementsHidden"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    style={styles.base}
                >
                </TextInput>
                <TextInput
                    accessible={true}
                    accessibilityViewIsModal={true}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="13.accessible"
                expect="预期结果：accessible=true的输入框可以选择；accessible=false的输入框不可选中"
                actual="实际结果："
            >
                <Text>accessible=true</Text>
                <TextInput
                    accessible={true}
                    style={styles.base}
                    placeholder='accessible=true'
                >
                </TextInput>
                <Text>accessible=false</Text>
                <TextInput
                    accessible={false}
                    style={styles.base}
                    placeholder='accessible=false'
                >
                </TextInput>
            </Block>
            <Block
                title="14.1、importantForAccessibility"
                expect="预期结果：第一个视图的属性值为yes，点击按钮切换第二个视图importantForAccessibility的属性值，屏幕朗读均为‘First layout’"
                actual="实际结果："
            >
                <Text style={{ color: 'gray' }}>描述：父视图下的两个子视图完全覆盖时，该属性的属性值决定哪个子视图将会无障碍功能被捕捉到</Text>
                <View style={{ width: 'auto', height: 80, borderWidth: 1 }}>
                    <TextInput
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            right: 10,
                            height: 40,
                            backgroundColor: 'green'
                        }}
                        importantForAccessibility="yes">
                        <Text> First layout </Text>
                    </TextInput>
                    <TextInput
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            right: 10,
                            height: 40,
                            backgroundColor: 'yellow'
                        }}
                        importantForAccessibility={importantForAccessibility}>
                        <Text> Second layout </Text>
                    </TextInput>
                </View>
                <Text>importantForAccessibility :{importantForAccessibility}</Text>
                {importantForAccessibilityList.map(important => {
                    return (
                        <Button
                            title={important}
                            onPress={() => {
                                setImportantForAccessibility(important)
                            }}
                        />
                    )
                })}
            </Block>
            <Block
                title="14.2、importantForAccessibility"
                expect="预期结果：accessible=true的输入框可以选择；accessible=false的输入框不可选中"
                actual="实际结果："
            >
                <Text style={{ color: 'gray' }}>描述：父视图下的两个子视图完全覆盖时，该属性的属性值决定哪个子视图将会无障碍功能被捕捉到</Text>
                <View style={{ width: 'auto', height: 80,borderWidth: 1 }}>
                    <TextInput
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            right: 10,
                            height: 50,
                            backgroundColor: 'green'
                        }}
                        value='first layout'
                        importantForAccessibility="yes">
                    </TextInput>
                    <TextInput
                        value='Second layout'
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            right: 10,
                            height: 50,
                            backgroundColor: 'yellow'
                        }}
                        importantForAccessibility='no'>
                    </TextInput>
                </View>
                <Text>importantForAccessibility :{importantForAccessibility}</Text>
                {importantForAccessibilityList.map(important => {
                    return (
                        <Button
                            title={important}
                            onPress={() => {
                                setImportantForAccessibility(important)
                            }}
                        />
                    )
                })}
            </Block>
            <Block
                title="15.aria-busy"
                expect="预期结果：点击按钮可以切换aria-busy为true或false，值为true时朗读busy"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-busy={ariabusy}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'aria-busy:' + ariabusy.toString()}
                    onPress={() => {
                        setAriabusy(!ariabusy)
                    }}
                />
            </Block>
            <Block
                title="16.aria-checked"
                expect="预期结果：点击按钮可以切换aria-checked为true或false，值为true时朗读已选中；值为false时朗读未选中"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-checked={ariachecked}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'aria-checked:' + ariachecked.toString()}
                    onPress={() => {
                        setAriachecked(!ariachecked)
                    }}
                />
            </Block>
            <Block
                title="17.aria-disabled"
                expect="预期结果：点击按钮可以切换aria-disabled为true或false，值为true时朗读不可点击"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-disabled={ariadisabled}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'aria-disabled:' + ariadisabled.toString()}
                    onPress={() => {
                        setAriadisabled(!ariadisabled)
                    }}
                />
            </Block>
            <Block
                title="18.aria-expanded"
                expect="预期结果：点击按钮可以切换aria-expanded为true或false，值为true时朗读已展开；值为false朗读已收起"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-expanded={ariaexpanded}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'aria-expanded:' + ariaexpanded.toString()}
                    onPress={() => {
                        setAriaexpanded(!ariaexpanded)
                    }}
                />
            </Block>

            <Block
                title="19.aria-hidden"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-hidden={ariahidden}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'aria-hidden:' + ariahidden.toString()}
                    onPress={() => {
                        setAriachecked(!ariahidden)
                    }}
                />
            </Block>
            <Block
                title="20.aria-label"
                expect="预期结果：点击输入框，朗读‘This is a input’"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-label="This is a input"
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="21.aria-labelledby"
                expect="预期结果：点击输入框，会朗读输入框下方第一行文字"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-labelledby="First"
                    style={styles.base}
                >
                </TextInput>
                <Text nativeID="First">First Label for Input Field</Text>
                <Text nativeID="Second">Second Label for Input Field</Text>
            </Block>
            <Block
                title="22.1、aria-live--polite"
                expect="预期结果：点击粉色视图，输入框内的文字由‘click’变成‘clicked’，并且会朗读出来"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-live="polite"
                    style={styles.base}
                    placeholder='polite'
                    value={livePolite}
                >
                </TextInput>
                <TouchableWithoutFeedback
                    onPress={() => {
                        setLivePolite('clicked')
                    }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="22.2、aria-live--off"
                expect="预期结果：点击粉色视图，输入框内的文字由‘click’变成‘clicked’，但是不会朗读出来"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-live="off"
                    style={styles.base}
                    placeholder='off'
                    value={liveOff}
                >
                </TextInput>
                <TouchableWithoutFeedback
                    onPress={() => {
                        setLiveOff('clicked')
                    }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="22.3、aria-live--assertive"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-live="assertive"
                    style={styles.base}
                    placeholder='assertive'
                    value={liveAssertive}
                >
                </TextInput>
                <TouchableWithoutFeedback
                    onPress={() => {
                        setLiveAssertive('clicked')
                    }}>
                    <View style={{ width: 150, height: 50, backgroundColor: 'pink' }}>
                        <Text>Click me</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Block>
            <Block
                title="23、aria-modal"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-modal={true}
                    style={styles.base}
                >
                </TextInput>
                <TextInput
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="24、aria-selected"
                expect="预期结果：点击按钮可以切换aria-selected为true或false，值为true时，朗读已选中"
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-selected={ariaselected}
                    style={[styles.base, { marginBottom: 5 }]}
                >
                </TextInput>
                <Button
                    title={'aria-selected:' + ariaselected.toString()}
                    onPress={() => {
                        setAriaselected(!ariaselected)
                    }}
                />
            </Block>
            <Block
                title="25、aria-valuemax"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-valuemax={100}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="26、aria-valuemin"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-valuemin={100}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="27、aria-valuenow"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-valuenow={100}
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="28、aria-valuetext"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    aria-valuetext='表示组件的文本描述。'
                    style={styles.base}
                >
                </TextInput>
            </Block>
            <Block
                title="29.role"
                expect="预期结果：点击输入框，会朗读标题所示的属性值"
                actual="实际结果："
            >
                {roleList.map((item, index) => (
                    <View>
                        <Text>29.{index}:{item.role}</Text>
                        <TextInput
                            accessible={true}
                            role={item.role}
                            style={[styles.base, { marginBottom: 8 }]}
                            placeholder={item.role}
                        />
                    </View>
                )
                )}
            </Block>
            <Block
                title="30.onMagicTap"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    onMagicTap={() => {
                        setMagicTap(true);
                    }}
                    style={styles.base}
                >
                </TextInput>
                <Text>{isMagicTap ? '有双指点击过' : '等待双指点击'}</Text>
            </Block>
            <Block
                title="31.onAccessibilityEscape"
                expect="预期结果："
                actual="实际结果："
            >
                <TextInput
                    accessible={true}
                    onAccessibilityEscape={() => {
                        console.log('onAccessibilityEscape called!');
                        setEscape(true)
                    }}
                    style={styles.base}
                >
                </TextInput>
                <Text>{escape ? '方法执行了' : '方法未执行'}</Text>
            </Block>
            <Block
                title="33.onAccessibilityTap"
                expect="预期结果："
                actual="实际结果："
            >
                <View
                    accessible={true}
                    onAccessibilityTap={() => {
                        setOnAccessibilityTap(true)
                    }}
                    style={styles.base}
                >
                </View>
                <Text>{onAccessibilityTap ? '已双击' : '未双击'}</Text>
            </Block>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: 'gray'
    }
})


export default ({
    title: 'Textinput',
    name: 'TextinputAccessible',
    description:
        'Accessiblity about Textinput',
    render: () => <TextinputAccessibleExample />,
}: RNTesterModuleExample);