import React, { useCallback, useEffect, useState } from 'react';
import {
    I18nManager,
    type LayoutChangeEvent,
    Platform,
    type StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    type ViewStyle,
} from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
// import { BaseIcon, BaseText } from '@components';
// import { IconName } from '@enums/IconName';

interface BaseSliderProps {
    initialValue?: number; // 初始值
    onValueChange?: (value: number) => void; // 值变化回调
    onValueChangeEnd?: (value: number) => void; // 松开拖动时回调
    containerStyle?: StyleProp<ViewStyle>; // 容器样式
    minValue?: number; // 最小值
    maxValue?: number; // 最大值
    step?: number; // 步长
    showIcons?: boolean; // 是否显示两端的图标
    showMaxMinValue?: boolean; // 是否显示两端的值
    showValue?: boolean; // 是否显示当前值
    // leftIcon?: IconName; // 左侧图标
    // rightIcon?: IconName; // 右侧图标
    trackColor?: string; // 轨道颜色
    trackStyle?: StyleProp<ViewStyle>;
    fillColor?: string; // 填充部分颜色
    // thumbIcon?: IconName; // 滑块图标
    valueUnit?: string; // 值的单位（如：%、℃等）
    valueFormatter?: (value: number) => string; // 自定义值的格式化函数
    simpleMode?: boolean;
}

const THUMB_SIZE = 24; // 滑块宽高尺寸
const THUMB_HALF = THUMB_SIZE / 2; // 滑块半径

const BaseSlider: React.FC<BaseSliderProps> = ({
    initialValue = 50,
    onValueChange,
    onValueChangeEnd,
    containerStyle,
    minValue = 0,
    maxValue = 100,
    step = 1,
    showIcons = true,
    showMaxMinValue = false,
    showValue = true,
    // leftIcon = IconName.VOLUME_MIN,
    // rightIcon = IconName.VOLUME_MAX,
    trackColor = '#A4AAB4',
    trackStyle,
    fillColor = '#4D94FF',
    // thumbIcon = IconName.SLIDER_COMPONENT_CONTROL,
    valueUnit = '',
    valueFormatter,
    simpleMode = false,
}) => {
    const [value, setValue] = useState(initialValue);
    const [sliderWidth, setSliderWidth] = useState(0);

    const position = useSharedValue(0);

    // 测量sliderContainer的实际宽度
    const onSliderLayout = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width;
        setSliderWidth(width);

        // 当测量到宽度后，更新初始滑块位置
        if (width > 0) {
            // 计算初始位置，考虑可滑动的有效区域 (width - THUMB_SIZE)
            const effectiveWidth = width - THUMB_SIZE;
            const normalPosition =
                ((initialValue - minValue) / (maxValue - minValue)) * effectiveWidth;
            // RTL 下需要反转位置：左边=最大值，右边=最小值
            const finalPosition = I18nManager.isRTL
                ? effectiveWidth - normalPosition
                : normalPosition;
            position.value = withTiming(finalPosition, { duration: 100 });
        }
    };

    useEffect(() => {
        // 当外部更新initialValue或sliderWidth变化时更新滑块位置
        if (sliderWidth > 0) {
            const effectiveWidth = sliderWidth - THUMB_SIZE;
            const normalPosition =
                ((initialValue - minValue) / (maxValue - minValue)) * effectiveWidth;
            // RTL 下需要反转位置：左边=最大值，右边=最小值
            const finalPosition = I18nManager.isRTL
                ? effectiveWidth - normalPosition
                : normalPosition;
            position.value = withTiming(finalPosition, { duration: 100 });
            setValue(initialValue);
        }
    }, [initialValue, maxValue, minValue, position, sliderWidth]);

    const updateValueFromPosition = useCallback(
        (pos: number) => {
            const effectiveWidth = sliderWidth - THUMB_SIZE;
            if (effectiveWidth <= 0) {
                return;
            }

            // 确保位置在有效范围内
            const clampedPosition = Math.max(0, Math.min(effectiveWidth, pos));

            // RTL 下位置已经是反转的，直接计算即可
            const effectivePosition = I18nManager.isRTL
                ? effectiveWidth - clampedPosition
                : clampedPosition;

            // 按步长计算值
            const rawValue =
                (effectivePosition / effectiveWidth) * (maxValue - minValue) + minValue;
            const newValue = Math.round(rawValue / step) * step;

            // 应用最大最小限制
            const constrainedValue = Math.max(minValue, Math.min(maxValue, newValue));

            setValue(constrainedValue);
            constrainedValue !== initialValue &&
                onValueChange &&
                onValueChange(constrainedValue);
        },
        [sliderWidth, maxValue, minValue, step, initialValue, onValueChange],
    );

    // 存储手势开始时的起始位置
    const startPosition = useSharedValue(0);

    // 创建拖动手势
    const panGesture = Gesture.Pan()
        .onBegin(() => {
            // 开始拖动时记录当前位置作为起始位置
            startPosition.value = position.value;
        })
        .onUpdate(e => {
            // RTL 下不反转手势偏移，保持手势方向与视觉一致
            // 使用起始位置加上偏移量计算新位置
            const newPosition = startPosition.value + e.translationX;
            const effectiveWidth = sliderWidth - THUMB_SIZE;

            // 限制在有效范围内
            position.value = Math.max(0, Math.min(effectiveWidth, newPosition));

            // 在JS线程上更新值
            runOnJS(updateValueFromPosition)(position.value);
        })
        .onEnd(() => {
            // 结束拖动时的逻辑
            // 结束时回调给外部
            onValueChangeEnd && runOnJS(onValueChangeEnd)(value);
        });

    const setValueByIcon = (newValue: number) => {
        setValue(newValue);
        if (sliderWidth > 0) {
            // 点击图标时，使用动画过渡，考虑滑块尺寸
            const effectiveWidth = sliderWidth - THUMB_SIZE;
            const normalPosition =
                ((newValue - minValue) / (maxValue - minValue)) * effectiveWidth;
            // RTL 下需要反转位置：左边=最大值，右边=最小值
            const finalPosition = I18nManager.isRTL
                ? effectiveWidth - normalPosition
                : normalPosition;

            // 使用withTiming实现平滑动画
            position.value = withTiming(finalPosition, { duration: 200 });

            onValueChange && onValueChange(newValue);
        }
    };

    // 使用useAnimatedStyle创建动态样式
    const thumbStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: position.value }],
        };
    }, [position]);

    // 计算填充条宽度
    const fillWidth = useDerivedValue(() => {
        if (I18nManager.isRTL) {
            // RTL 下，填充条从右侧开始
            return sliderWidth - position.value - THUMB_HALF;
        }
        return position.value + THUMB_HALF;
    });

    const fillStyle = useAnimatedStyle(() => {
        const style: any = {
            width: fillWidth.value,
            backgroundColor: fillColor,
        };
        // RTL 下从右侧开始
        if (I18nManager.isRTL) {
            style.right = 0;
            style.left = undefined;
        }
        return style;
    });

    // 格式化显示的值
    const formattedValue = valueFormatter
        ? valueFormatter(value)
        : `${value}${valueUnit}`;

    const leftValue = I18nManager.isRTL ? maxValue : minValue;
    const rightValue = I18nManager.isRTL ? minValue : maxValue;

    return (
        <GestureHandlerRootView style={[styles.container, containerStyle]}>
            {showIcons ? (
                <View style={styles.endpointContainer}>
                    <TouchableOpacity
                        hitSlop={10}
                        style={styles.iconContainer}
                        onPress={() => setValueByIcon(leftValue)}>
                        {/* <BaseIcon name={IconName.SLIDER_COMPONENT_END} /> */}
                    </TouchableOpacity>
                    {/* <BaseIcon name={leftIcon} style={styles.labelIcon} /> */}
                </View>
            ) : null}
            {!showIcons && showMaxMinValue ? (
                <View style={styles.endpointContainer}>
                    {/* <BaseText>{leftValue + valueUnit}</BaseText> */}
                </View>
            ) : null}

            {simpleMode ? (
                <View style={styles.endpointContainer}>
                    {/* <BaseIcon name={leftIcon} style={styles.endpointContainer} /> */}
                </View>
            ) : null}

            <View
                style={[styles.sliderContainer, !showIcons && { marginHorizontal: 10 }]}
                onLayout={onSliderLayout}>
                {/* 滑动轨道背景 */}
                <View
                    style={[
                        styles.sliderTrack,
                        trackStyle,
                        { backgroundColor: trackColor },
                    ]}
                />

                {/* 已填充部分 需求不需要但预留着 */}
                <Animated.View style={[styles.sliderFill, trackStyle, fillStyle]} />

                {/* 可拖动的滑块 */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.sliderThumb, thumbStyle]}>
                        {/* <BaseIcon name={thumbIcon} /> */}
                        <View style={styles.defaultThumbIcon} />

                        {/* 滑块上方悬浮的值显示 */}
                        {showValue ? (
                            <View style={styles.valueTextContainer}>
                                {/* <BaseText style={styles.valueText} numberOfLines={1}> */}
                                {formattedValue}
                                {/* </BaseText> */}
                            </View>
                        ) : null}
                    </Animated.View>
                </GestureDetector>
            </View>

            {showIcons ? (
                <View style={styles.endpointContainer}>
                    <TouchableOpacity
                        hitSlop={10}
                        style={styles.iconContainer}
                        onPress={() => setValueByIcon(rightValue)}>
                        {/* <BaseIcon name={IconName.SLIDER_COMPONENT_END} /> */}
                    </TouchableOpacity>
                    {/* <BaseIcon name={rightIcon} style={styles.labelIcon} /> */}
                </View>
            ) : null}
            {(!showIcons && showMaxMinValue) || simpleMode ? (
                <View style={styles.endpointContainer}>
                    {/* <BaseText> */}
                    {simpleMode ? formattedValue : rightValue + valueUnit}
                    {/* </BaseText> */}
                </View>
            ) : null}
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 80,
        direction: 'ltr',
    },

    endpointContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconContainer: {
        width: 16,
        height: 16,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelIcon: {
        position: 'absolute',
        bottom: -14,
    },
    sliderContainer: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        position: 'relative',
    },
    sliderTrack: {
        width: '100%',
        height: 2,
        borderRadius: 1,
    },
    sliderFill: {
        height: 2,
        borderRadius: 1,
        position: 'absolute',
        left: 0,
    },
    sliderThumb: {
        position: 'absolute',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        top: (40 - THUMB_SIZE) / 2, // 垂直居中
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: THUMB_SIZE / 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    defaultThumbIcon: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4D94FF',
    },
    valueTextContainer: {
        position: 'absolute',
        top: -20,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 30, // 确保有最小宽度
        paddingHorizontal: 2, // 增加水平内边距
    },
    valueText: {
        color: '#2a363e',
        fontSize: 10,
        fontWeight: Platform.select({
            ios: '500',
            android: '600',
        }),
        textAlign: 'center', // 确保文本居中
    },
});

export default BaseSlider;