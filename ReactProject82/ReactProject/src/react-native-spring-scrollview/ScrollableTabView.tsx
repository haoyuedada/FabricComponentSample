/**
 * ScrollableTabView Demo
 * SpringScrollView + Tab 页面切换联动完整示例
 *
 * 功能：
 * 1. 管理 SpringScrollView 的滚动行为
 * 2. 管理 Tab 栏与滚动位置的联动（Tab点击→滚动到对应位置，滚动→高亮对应Tab）
 * 3. 记录各模块的布局偏移量(sectionOffset)
 * 4. 内建 SimpleTabBar 和 SectionModule，可直接运行
 */

import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import { SpringScrollView as MRNSpringScrollView } from 'react-native-spring-scrollview'

// ==================== SimpleTabBar 组件 ====================

interface TabBarProps {
    titleList: string[]
    selectedIndex: number
    pageSource: string
}

class SimpleTabBar extends PureComponent<TabBarProps> {
    render() {
        const { titleList, callback, selectedIndex } = this.props
        return (
            <View style={tabBarStyles.container}>
                {titleList.map((title, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            tabBarStyles.tab,
                            selectedIndex === index && tabBarStyles.activeTab
                        ]}
                        onPress={() => callback(index)}
                    >
                        <Text
                            style={[
                                tabBarStyles.tabText,
                                selectedIndex === index && tabBarStyles.activeTabText
                            ]}
                        >
                            {title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}

const tabBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#2196F3'
    },
    tabText: {
        fontSize: 14,
        color: '#666'
    },
    activeTabText: {
        color: '#2196F3',
        fontWeight: 'bold'
    }
})

// ==================== SectionModule 组件 ====================

interface SectionProps {
    title: string
    onLayout: (event: any) => void
    color: string
    itemCount?: number
}

class SectionModule extends PureComponent<SectionProps> {
    render() {
        const { title, onLayout, color, itemCount = 6 } = this.props
        return (
            <View onLayout={onLayout} style={[sectionStyles.container, { borderLeftColor: color }]}>
                <Text style={sectionStyles.title}>{title}</Text>
                {Array.from({ length: itemCount }, (_, i) => (
                    <View key={i} style={[sectionStyles.item, { backgroundColor: color + '20' }]}>
                        <Text style={sectionStyles.itemText}>
                            {title} - 内容项 {i + 1}
                        </Text>
                    </View>
                ))}
            </View>
        )
    }
}

const sectionStyles = StyleSheet.create({
    container: {
        padding: 16,
        borderLeftWidth: 4
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333'
    },
    item: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 8
    },
    itemText: {
        fontSize: 14,
        color: '#555'
    }
})

// ==================== 常量配置 ====================

const TAB_BAR_LIST = ['概况', '房型', '餐饮', '设施', '评价']
const FIRST_MODULE_IN_TAB_BAR = ['概况模块', '房型模块', '餐饮模块', '设施模块', '评价模块']
const SECTION_COLORS = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#F44336']

const ALL_MODULES = [
    { title: '概况模块', color: SECTION_COLORS[0], items: 8 },
    { title: '房型模块', color: SECTION_COLORS[1], items: 16 },
    { title: '餐饮模块', color: SECTION_COLORS[2], items: 12 },
    { title: '设施模块', color: SECTION_COLORS[3], items: 10 },
    { title: '评价模块', color: SECTION_COLORS[4], items: 20 },
]

// ==================== ScrollableTabView 主组件 ====================

interface States {
    naviTabBarIndex: number
}

export default class ScrollableTabView extends PureComponent<{}, States> {
    /** 各模块的布局偏移记录 */
    private sectionOffset: Record<string, number> = {}
    /** ScrollView 引用 */
    private scrollView: any = null

    constructor(props: {}) {
        super(props)
        this.state = {
            naviTabBarIndex: 0
        }
    }

    /**
     * 记录模块布局偏移量，供 Tab 联动使用
     */
    recordSectionOffset = ({ y }: { y: number }, title: string) => {
        // this.sectionOffset[title] = y
    }

    private setRef = (ref: any) => {
        this.scrollView = ref
    }

    // ==================== 渲染 ====================

    renderTabBar = () => {
        return (
            <SimpleTabBar
                titleList={TAB_BAR_LIST}
                // callback={this.naviTabBarCallback}
                selectedIndex={this.state.naviTabBarIndex}
                pageSource="demo"
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>ScrollableTabView Demo</Text>
                    <Text style={styles.headerSubtitle}>
                        滚动自动切换Tab · 点击Tab跳转模块
                    </Text>
                </View>

                <MRNSpringScrollView
                    ref={this.setRef}
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator ={true}
                >
                    <SectionModule
                        title="概况模块"
                        color={SECTION_COLORS[0]}
                        itemCount={8}
                        onLayout={(event) => {
                            // this.recordSectionOffset(
                            //     { y: event.nativeEvent.layout.y },
                            //     '概况模块'
                            // )
                        }}
                    />

                    {this.renderTabBar()}

                    {ALL_MODULES.slice(1).map((module) => (
                        <SectionModule
                            key={module.title}
                            title={module.title}
                            color={module.color}
                            itemCount={module.items}
                            onLayout={(event) => {
                                // this.recordSectionOffset(
                                //     { y: event.nativeEvent.layout.y },
                                //     module.title
                                // )
                            }}
                        />
                    ))}
                </MRNSpringScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        padding: 12,
        backgroundColor: '#f5f5f5',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#888',
        marginTop: 4
    }
})
