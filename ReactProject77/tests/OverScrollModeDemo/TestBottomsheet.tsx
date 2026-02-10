/**
 * BottomSheet HarmonyOS Repro Demo
 * 依赖:
 * - react
 * - react-native
 * - react-native-gesture-handler
 * - react-native-reanimated
 * - @gorhom/bottom-sheet
 */

import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform,
    StatusBar,
    LayoutChangeEvent,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
    BottomSheetVirtualizedList,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

// 1. Mock 数据 //
const MOCK_TASKS = Array.from({ length: 3 }).map((_, i) => ({
    id: `${i}`,
    title: `测试任务数据 Item - ${i}`,
    amount: (Math.random() * 1000).toFixed(2),
}));

// 2. 模拟 SafeAreaBottom (HarmonyOS 上可能需要特定库，这里给个固定值模拟)
const SAFE_AREA_BOTTOM = 34;

const CalendarSheetDemo = () => {
    // 获取屏幕高度
    const { height: screenHeight } = Dimensions.get('window');

    // 模拟你代码中的 SnapPoints 计算状态
    // 初始值设为屏幕高度的一半，布局测量后再更新
    const [anchorStart, setAnchorStart] = useState(screenHeight * 0.4);
    const [anchorEnd, setAnchorEnd] = useState(screenHeight *0.7);

    const bottomSheetRef = useRef<BottomSheet>(null);

    // 模拟日历区域的高度变化回调
    const onCalendarLayout = (event: LayoutChangeEvent) => {
        const calendarHeight = event.nativeEvent.layout.height;

        // 还原你原本的计算逻辑
        let newAnchorStart = 0;
        if (Platform.OS === 'ios') {
            newAnchorStart = screenHeight - calendarHeight - SAFE_AREA_BOTTOM - 95;
        } else if (Platform.OS === 'harmony' || Platform.OS === 'android') {
            // 假设 Harmony 逻辑类似
            newAnchorStart = screenHeight - calendarHeight - SAFE_AREA_BOTTOM - 115;
        } else {
            newAnchorStart = screenHeight - calendarHeight - 90;
        }

        // 防止计算出负数或过小的值
        setAnchorStart(Math.max(200, newAnchorStart));
        console.log('[Demo] SnapPoints Updated:', {
            calendarHeight,
            newAnchorStart,
            anchorEnd,
        });
    };

    // 渲染列表项
    const renderItem = useCallback(({ item }: { item: any }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>工单号: {item.id}</Text>
                </View>
                <Text style={styles.itemAmount}>¥ {item.amount}</Text>
            </View>
        );
    }, []);

    // 渲染列表头
    const ListHeaderComponent = useCallback(() => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>已选日期记工统计</Text>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>含跨多日</Text>
                </View>
            </View>
        );
    }, []);

    // 关键：SnapPoints 需要 memo 化
    const snapPoints = useMemo(
        () => [anchorStart, anchorEnd],
        [anchorStart, anchorEnd],
    );

    return (
        // 必须包裹 GestureHandlerRootView 否则安卓/鸿蒙无法交互
        <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* 3. 模拟顶部日历区域 */}
            <View style={styles.calendarContainer} onLayout={onCalendarLayout}>
                <Text style={styles.calendarText}>[模拟 AxzCalendar 区域]</Text>
                <Text style={styles.calendarSubText}>
                    高度自适应，决定 BottomSheet 的吸附位置
                </Text>
                <View style={styles.calendarPlaceholderBox} />
            </View>

            {/* 4. BottomSheet 核心复现 */}
            <BottomSheetModalProvider>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0} // 默认展开到第一个 snapPoint
                    snapPoints={snapPoints}
                    detached={true} // 还原你的配置
                    enablePanDownToClose={false}
                    handleIndicatorStyle={styles.handleIndicator}
                    backgroundStyle={styles.sheetBackground}
                    style={styles.sheetStyle}>
                    <BottomSheetVirtualizedList
                        data={MOCK_TASKS}
                        keyExtractor={item => item.id}
                        getItemCount={data => data.length}
                        getItem={(data, index) => data[index]}
                        renderItem={renderItem}
                        ListHeaderComponent={ListHeaderComponent}
                        contentContainerStyle={styles.listContent}
                        style={{borderWidth:1,borderColor:'black'}}
                    />
                </BottomSheet>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7F9',
    },
    // 日历模拟样式
    calendarContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        paddingTop: 60, // 避开刘海
        borderBottomWidth: 1,
        borderBottomColor: '#E5E6EB',
    },
    calendarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#08A86D',
        textAlign: 'center',
        marginBottom: 8,
    },
    calendarSubText: {
        fontSize: 12,
        color: '#86909C',
        textAlign: 'center',
        marginBottom: 16,
    },
    calendarPlaceholderBox: {
        height: 280, // 模拟日历主体高度
        backgroundColor: '#EAFAF2',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#08A86D',
        borderStyle: 'dashed',
    },

    // BottomSheet 样式
    sheetStyle: {
        // shadow 用来区分层级
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    sheetBackground: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
    },
    handleIndicator: {
        backgroundColor: '#C9CDD4',
        width: 40,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 34,
    },

    // 列表头样式
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 8,
        backgroundColor:'pink'
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D2129',
    },
    tag: {
        marginLeft: 8,
        borderWidth: 1,
        borderColor: '#E5E6EB',
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    tagText: {
        fontSize: 10,
        color: '#86909C',
    },

    // 列表项样式
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F2F3F5',
    },
    itemLeft: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1D2129',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 12,
        color: '#86909C',
    },
    itemAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#08A86D',
        marginLeft: 16,
    },
});

export default CalendarSheetDemo;
