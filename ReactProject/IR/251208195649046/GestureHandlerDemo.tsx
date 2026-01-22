import { useState, useRef } from "react";
import { Text, useWindowDimensions, View, ScrollView, 
    Animated
 } from "react-native";
import 
    // Animated, 
    { runOnJS, runOnUI, scrollTo, useAnimatedProps, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from "react-native-reanimated";

enum E_ListScrollState {
    Padding = 'padding',
    Active = 'active',
    Fail = 'fail'
}

enum E_PanPosition {
    None = 'none',
    Left = 'left',
    Right = 'right'
}

const LOADING_HEIGHT = 48;
const LeftListWidth = 80;

export default function NestedScrollView() {
    const { height: windowHeight } = useWindowDimensions();

    const [activeIndex, setActiveIndex] = useState(0)

    const stickyTop = useRef(0);
    const freshElAnimatedY = useRef(new Animated.Value(0)).current;
    // const freshElAnimatedY = useSharedValue(0);

     const animatedStyles = {
        transform: [{
            translateY: freshElAnimatedY
        }]
    };

    return (
        <View>
            <Animated.View style={[{ height: windowHeight, paddingTop: 88 }]}>
                <Animated.View style={{ flex: 1 }}>
                    <ScrollView
                        style={{
                            backgroundColor: '#3ffff0'
                        }}
                        scrollEventThrottle={1}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ borderWidth: 1 }}>
                            {
                                Array(20)
                                    .fill(1)
                                    .map((_, index) => (
                                        <Text key={index}>{index}</Text>
                                    ))
                            }
                        </View>
                        <View
                            style={{
                                height: windowHeight - 88,
                                flexDirection: 'row'
                            }}
                            onLayout={(e) => {
                                stickyTop.current = e.nativeEvent.layout.y;
                                console.log('stickyTop initialized:', e.nativeEvent.layout.y);
                            }}>

                            <ScrollView
                                style={{
                                    backgroundColor: '#3ffff0',
                                    width: LeftListWidth,
                                    height: '100%',
                                    flexGrow: 0,
                                }}
                                bounces={false}
                                nestedScrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                            >
                                {
                                    Array(100)
                                        .fill(1)
                                        .map((_, index) => (
                                            <View key={index}
                                                style={{ height: 30, backgroundColor: '#FFF', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                <Text style={[activeIndex === index && { color: 'red' }]}>{index}</Text>
                                            </View>
                                        ))
                                }
                            </ScrollView>
                            <View style={{ height: '100%', width: 1, backgroundColor: 'black' }}></View>
                            <View style={{ flex: 1, overflow: 'hidden' }}>
                                <Animated.View
                                    style={[
                                        {
                                            height: LOADING_HEIGHT,
                                            position: 'absolute',
                                            top: -LOADING_HEIGHT,
                                            width: '100%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            zIndex: 2,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        animatedStyles
                                    ]}
                                >
                                    <Text style={{ color: '#8C8C8C', fontSize: 11 }}>下滑逛逛上一个</Text>
                                </Animated.View>
                                <ScrollView
                                    style={{
                                        backgroundColor: '#3ffff0',
                                        flex: 1,
                                        height: '100%'
                                    }}
                                    bounces={false}
                                    nestedScrollEnabled={false}
                                    scrollEventThrottle={1}
                                    showsVerticalScrollIndicator={false}
                                >
                                    {
                                        Array(100)
                                            .fill(1)
                                            .map((_, index) => (
                                                <Text key={index}>{index}</Text>
                                            ))
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </View >
    )
}