// 电源测试代码

import React, { useRef, Fragment } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Pressable, UIManager, findNodeHandle, Dimensions, SafeAreaView } from 'react-native';



const props = {
    disabled: false,
    invisible: false,
    title: '电源',
    titleNumberOfLines: 20,
    subtitle: '',
    subtitleNumberOfLines: 20,
    rightText: '',
    icon: null,
    iconDisabled: null,
    rightArrow: false,
    rightArrowIcon: null,
    hasBorderRadius: true,
    rightContainerStyle: undefined,
    containerStyle:
    {
        height: 41.53846153846154,
        paddingTop: 18.76923076923077,
        paddingBottom: 5.230769230769231,
        borderRadius: 0
    },
    iconContainerStyle: undefined,
    iconStyle: undefined,
    titleStyle: undefined,
    subtitleStyle: undefined,
    rightTextStyle: undefined,
    redDot: false,
    onPress: null,
    underlayColor: '#FFF',
    children: null,
    hasShadow: false,
    iconRotating: false
}

const Styles = {
    container: {
        height: 83.07692307692308,
        borderRadius: 11.384615384615385,
        paddingHorizontal: 20.923076923076923,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    leftExtraIconContainer: {
        marginRight: 13.538461538461538,
        width: 22.76923076923077,
        height: 22.76923076923077,
        borderRadius: 11.384615384615385,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftExtraIcon: {
        width: 22.76923076923077,
        height: 22.76923076923077,
        resizeMode: 'cover'
    },
    leftExtraIconText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'sans-serif',
        fontWeight: '500'
    },
    iconContainer: {
        marginRight: 13.538461538461538,
        width: 41.53846153846154,
        height: 41.53846153846154,
        borderRadius: 20.923076923076923,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    rightIconContainer: {
        width: 41.53846153846154,
        height: 41.53846153846154,
        borderRadius: 20.923076923076923,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 24.923076923076923,
        height: 24.923076923076923,
        resizeMode: 'cover'
    },
    iconText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'sans-serif',
        fontWeight: '400'
    },
    titleContainer: {
        flex: 1
    },
    title: {
        fontSize: 16,
        color: '#000000',
        fontFamily: 'sans-serif',
        fontWeight: '500'
    },
    titleSubscript: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily: 'sans-serif',
        fontWeight: '400'
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 18,
        color: 'rgba(0, 0, 0, 0.6)',
        marginTop: 4.3076923076923075,
        fontFamily: 'sans-serif',
        fontWeight: '400'
    },
    rightContainer: {
        marginLeft: 10.461538461538462,
        flexDirection: 'row',
        alignItems: 'center'
    },
    separator: {
        width: 1,
        height: 27.076923076923077,
        marginRight: 16.615384615384617,
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
    },
    rightText: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.4)',
        fontFamily: 'sans-serif',
        fontWeight: '400'
    },
    redDot: {
        height: 5,
        width: 5,
        borderRadius: 2.5,
        marginLeft: 14.461538461538462,
        backgroundColor: '#F43F31',
        alignItems: 'center'
    },
    rightArrow: {
        width: 24.923076923076923,
        height: 24.923076923076923
    }
}

const {
    containerStyle,
    themeColor,
    themeBackgroundColor,
    underlayColor,
    tintColor,
    hasShadow,
    hasBorderRadius,
    iconContainerStyle,
    iconStyle,
    icon,
    iconText,
    iconTextStyle,
    title,
    subtitle,
    titleSubscript,
    titleStyle,
    subtitleStyle,
    rightTextStyle,
    rightContainerStyle,
    titleSubscriptStyle,
    titleNumberOfLines,
    subtitleNumberOfLines,
    onSwitch,
    switchOn,
    disabled,
    onPress,
    rightText,
    rightArrow,
    offColor,
    iconDisabled,
    // 右边按钮
    rightIcon,
    // 右边不可用按钮
    rightDisabledIcon,
    rightIconText,
    rightIconContainerStyle,
    rightIconStyle,
    rightIconTextStyle,
    onRightPress,
    iconRotating,
    invisible,
    redDot,
    rightDisabled,
    onSingleSelect,
    checked,
    onMultipleSelect,
    radioSmallCircleColor,
    rightArrowIcon,
    // 左侧额外icon（除显示icon外左侧还需要显示icon可配置此项，在icon左侧
    leftExtraIcon,
    leftExtraDisabledIcon,
    leftExtraIconText,
    leftExtraIconContainerStyle,
    leftExtraIconStyle,
    leftExtraIconTextStyle
} = props;
const formatThemeBackgroundColor = themeBackgroundColor;
const formatThemeColor = themeColor;
const formatUnderlayColor = underlayColor;
const containerStyleMixed = [
    Styles.container, 
    containerStyle, formatThemeBackgroundColor ? 
    {
        backgroundColor: formatThemeBackgroundColor
    } 
    : null, 
    hasBorderRadius ? 
    null 
    : {
        borderRadius: 0
    },
    // add by yao
    {
        backgroundColor: "#fff"
    }
];
// console.log(`containerStyleMixed`, containerStyleMixed)
// containerStyleMixed = { height: 83.07692307692308,
//     borderRadius: 11.384615384615385,
//     paddingHorizontal: 20.923076923076923,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff' },
//   { height: 41.53846153846154,
//     paddingTop: 18.76923076923077,
//     paddingBottom: 5.230769230769231,
//     borderRadius: 0 },
//   null,
//   null,
//   { backgroundColor: '#fff' }

// Styles.title
// title: {
//     fontSize: 16,
//     color: '#000000',
//     fontFamily: 'sans-serif',
//     fontWeight: '500'
// }

const opacity = disabled ? 0.3 : 1;
const MaxNumberOfLines = 2;
const App = () => {
    return (
        <SafeAreaView>
            <TouchableOpacity style={containerStyleMixed} disabled={disabled} onPress={onPress || onSwitch || onSingleSelect || onMultipleSelect} activeOpacity={0.8}>
                <Fragment>
                    <View style={Styles.titleContainer}>
                        {title ? <Text style={[Styles.title, {
                            opacity
                        }, titleStyle]} numberOfLines={titleNumberOfLines || MaxNumberOfLines}>{title}
                            {titleSubscript ? <Text style={[Styles.titleSubscript, titleSubscriptStyle]}>
                                {titleSubscript}
                            </Text> : null}
                        </Text> : null}
                        {subtitle ? <Text style={[Styles.subtitle, {
                            opacity
                        }, subtitleStyle]} numberOfLines={subtitleNumberOfLines || MaxNumberOfLines}>{subtitle}</Text> : null}
                    </View>
                </Fragment>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default App