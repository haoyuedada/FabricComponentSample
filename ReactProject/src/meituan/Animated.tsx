/**
 * Copyright (c) 2024 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 100,
        backgroundColor: '#f5f5f5',
        zIndex: 10
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 100,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    tabButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 8,
        overflow: 'hidden'
    },
    tabButtonInner: {
        position: 'relative',
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 44,
        backgroundColor: 'red'
    },
    tabBackgroundLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    redBackground: {
        backgroundColor: 'red'
    },
    greenBackground: {
        backgroundColor: 'green'
    },
    tabText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        zIndex: 1
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    }
});

// const backgroundImageConfigs = [
//     {
//         uri: 'https://p0.meituan.net/ingee/7be4259cc82cd857c840b518105bb9d613353.png'
//     },
//     {
//         uri: 'https://p0.meituan.net/ingee/61fad4b500c6f9b7fcd04adc39f6f63b144193.png'
//     },
//     {
//         uri: 'https://p0.meituan.net/ingee/e0551c356869903c6cc0c9b9ebfbb01d48852.png'
//     },
//     {
//         uri: 'https://p0.meituan.net/ingee/e0551c356869903c6cc0c9b9ebfbb01d48852.png'
//     }
// ];

const defaultConfig = {
    url: 'https://p0.meituan.net/ingee/30a302813b23bf735961fc7404fe7cf920021.png',
    width: 40,
    height: 40,
    position: [
        {
            right: 20,
            bottom: -1
        },
        {
            right: 90,
            bottom: 26
        },
        {
            right: 20,
            bottom: -1
        },
        {
            right: 90,
            bottom: 26
        }
    ]
};

export default class AnimatedDemo extends React.PureComponent<{}, { activeTab: number }> {
    private animationConfig: any = null;
    private preTab = -1;
    private animationController: any = null;

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        };
    }

    onPress = (tab: number) => () => {
        if (tab !== this.state.activeTab) {
            this.preTab = this.state.activeTab;
            const offsetX = defaultConfig.position[tab].right - defaultConfig.position[this.state.activeTab].right;
            const offsetY = defaultConfig.position[tab].bottom - defaultConfig.position[this.state.activeTab].bottom;
            const transformX = new Animated.Value(offsetX);
            const transformY = new Animated.Value(offsetY);
            // const opacity1 = new Animated.Value(1);
            // const opacity2 = new Animated.Value(0);
            this.animationConfig = {
                transStyle: {
                    transform: [
                        {
                            translateX: transformX
                        },
                        {
                            translateY: transformY
                        }
                    ]
                },
                // opacityStyle: [
                //     {
                //         opacity: opacity1
                //     },
                //     {
                //         opacity: opacity2
                //     }
                // ],
                animations: [
                    // Animated.timing(opacity1, {
                    //     toValue: 0,
                    //     duration: 500,
                    //     useNativeDriver: true
                    // }),
                    // Animated.timing(opacity2, {
                    //     toValue: 1,
                    //     duration: 500,
                    //     useNativeDriver: true
                    // }),
                    Animated.timing(transformX, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true
                    }),
                    Animated.timing(transformY, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true
                    })
                ]
            };
            this.setState({
                activeTab: tab
            });
        }
    };

    componentDidUpdate(_prevProps, prevState): void {
        if (prevState.activeTab !== this.state.activeTab) {
            this.animationController = Animated.parallel(this.animationConfig.animations);
            this.animationController.start();
        }
    }

    render() {
        console.log('mb--preTab', this.preTab, this.state.activeTab);
        return (
            <View style={styles.container}>
                {/* Tab 按钮区域 */}
                <View style={styles.tabContainer}>
                    {/* {this.preTab >= 0 && (
                        <Animated.Image
                            style={[
                                {
                                    position: 'absolute',
                                    width: '100%',
                                    height: 50
                                },
                                this.animationConfig?.opacityStyle?.[0]
                            ]}
                            key={backgroundImageConfigs[this.preTab].uri}
                            resizeMode={'stretch'}
                            source={{ uri: backgroundImageConfigs[this.preTab].uri }}
                        />
                    )}
                    <Animated.Image
                        style={[
                            {
                                position: 'absolute',
                                width: '100%',
                                height: 50
                            },
                            this.animationConfig?.opacityStyle?.[1]
                        ]}
                        key={backgroundImageConfigs[this.state.activeTab].uri}
                        resizeMode={'stretch'}
                        source={{ uri: backgroundImageConfigs[this.state.activeTab].uri }}
                    /> */}
                    <Animated.Image
                        style={[
                            {
                                position: 'absolute',
                                width: defaultConfig.width,
                                height: defaultConfig.height,
                                right: defaultConfig.position[this.state.activeTab].right,
                                bottom: defaultConfig.position[this.state.activeTab].bottom
                            },
                            this.animationConfig?.transStyle
                        ]}
                        // key={defaultConfig.url}
                        resizeMode={'stretch'}
                        source={{ uri: defaultConfig.url }}
                    />
                    <TouchableOpacity style={styles.tabButton} onPress={this.onPress(0)}>
                        <View style={styles.tabButtonInner}>
                            <Text style={styles.tabText}>Tab 1</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabButton} onPress={this.onPress(1)}>
                        <View style={styles.tabButtonInner}>
                            <Text style={styles.tabText}>Tab 2</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.tabButton} onPress={this.onPress(2)}>
                        <View style={styles.tabButtonInner}>
                            <Text style={styles.tabText}>Tab 3</Text>
                        </View>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity style={styles.tabButton} onPress={this.onPress(3)}>
                        <View style={styles.tabButtonInner}>
                            <Text style={styles.tabText}>Tab 4</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}
