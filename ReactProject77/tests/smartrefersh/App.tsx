
import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
    RefreshControl
} from 'react-native';

import { RefreshAnimateView, SmartRefreshHeader, RefreshNormalView } from "react-native-smart-refresh";

const getRandomInt0To100 = () => {
    return Math.floor(Math.random() * 101);
};
const RNSmartRefreshDemo = () => {

    const [isRefresh, setRefresh] = useState({
        rnRefresh1: false,
        rnRefresh2: false
    })

    const [randomNum, setRandomNum] = useState({

        floatNum: 0
    });
    const [randomNum2, setRandomNum2] = useState({
        floatNum: 0
    });

    const [newData, setNewData] = useState(
        { id: 1, title: "数据更新，来自鸿蒙的信息" },
    )

    const [newData2, setNewData2] = useState(
        { id: 1, title: "数据更新，来自鸿蒙的信息,动态数据" },
    )


    // let RNRefreshViewRef: React.RefObject<RNRefreshNormalView>;
    // let RNRefreshViewRef2: React.RefObject<RNRefreshAnimateView>;
    // let timerRef1 = useRef(null);
    // let timerRef2 = useRef(null);

    // const handleRefresh = () => {
    //     if (timerRef1.current) {
    //         clearTimeout(timerRef1.current);
    //     }
    //     setRefresh(prevState => ({ ...prevState, ['rnRefresh1']: true }));
    //     timerRef1.current = setTimeout(() => {
    //         setRefresh(prevState => ({ ...prevState, ['rnRefresh1']: false }));
    //         setNewData(prevState => ({ ...prevState, ['title']: 'rn接收到鸿蒙的刷新事件了，普通刷新视图' }))
    //         setRandomNum({ floatNum: getRandomInt0To100() });
    //         clearTimeout(timerRef1.current);
    //     }, 3000);
    // };

    // const handleRefresh2 = () => {
    //     if (timerRef2.current) {
    //         clearTimeout(timerRef2.current);
    //     }
    //     setRefresh(prevState => ({ ...prevState, ['rnRefresh2']: true }));
    //     timerRef2.current = setTimeout(() => {
    //         setRefresh(prevState => ({ ...prevState, ['rnRefresh2']: false }));
    //         setNewData2(prevState => ({ ...prevState, ['title']: 'rn接收到鸿蒙的刷新事件了，动态刷新视图' }))
    //         setRandomNum2({ floatNum: getRandomInt0To100() });
    //         clearTimeout(timerRef2.current);
    //     }, 3000);
    // };

    // useEffect(() => {
    //     return () => {
    //         if (timerRef1.current) {
    //             clearTimeout(timerRef1.current);
    //         }
    //         if (timerRef2.current) {
    //             clearTimeout(timerRef2.current);
    //         }
    //     };
    // }, []);

    const onRefresh = () => {
        console.log("chy js onRefresh")
    }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={{ backgroundColor: 'blue', height: 600}}
        // onRefresh={onRefresh}
        // offsetTop={245}
        refreshControl={
          <RefreshNormalView
                // refreshing={isRefreshing}
                onRefresh={onRefresh}
                containerStyle={{ marginBottom: 20, alignItems: 'flex-end' }}
                titleStyle={{ fontSize: 14 }}
                timeStyle={{ fontSize: 14 }}
                leftContainerStyle={{ marginBottom: 8 }}
                // activityIndicatorProps={{ color: Colors.SunColor }}
            />
            // <RefreshControl refreshing={isRefresh.rnRefresh2} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.text} onPress={() => {
          console.log("chy Text press")
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )

    // return (
    //     <SafeAreaView style={styles.safeArea}>
    //         <View style={styles.container}>
    //             <Text style={styles.TitleStyle}>下拉刷新</Text>
    //             <View style={styles.ViewStyles}>
    //                 <Text style={styles.sectionLabel}>Normal 头部</Text>
    //                 <RNRefreshNormalView
    //                     style={styles.RefreshStyle}
    //                     ref={(ref) => (RNRefreshViewRef = ref)}
    //                     refreshing={isRefresh.rnRefresh1}
    //                     onRefresh={handleRefresh}>
    //                     <View style={styles.RefreshViewItem}>
    //                         <Text style={styles.TextStyle}>{newData.title}+{randomNum.floatNum}</Text>
    //                         <ScrollView style={styles.ScrollViewStyle}>
    //                             <Text style={styles.TextStyle} onPress={() => {
    //                                 console.log('aaaaaas' + "rn刷新数据 scrollView");
    //                             }}>{newData.title}</Text>
    //                         </ScrollView>
    //                     </View>
    //                 </RNRefreshNormalView>
    //             </View>
    //             <View style={styles.ViewStyles}>
    //                 <Text style={styles.sectionLabel}>Animate头部</Text>
    //                 <RNRefreshAnimateView
    //                     style={styles.RefreshStyle}
    //                     ref={(ref) => (RNRefreshViewRef2 = ref)}
    //                     refreshing={isRefresh.rnRefresh2}
    //                     onRefresh={handleRefresh2}>
    //                     <View style={styles.RefreshViewItem}>
    //                         <Text style={styles.TextStyle}>{newData2.title}+{randomNum2.floatNum}</Text>
    //                         <ScrollView style={styles.ScrollViewStyle}>
    //                             <Text style={styles.TextStyle}>{newData2.title}</Text>
    //                         </ScrollView>
    //                     </View>
    //                 </RNRefreshAnimateView>
    //             </View>
    //         </View>
    //     </SafeAreaView>
    // )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f7fa'
    },
    container: {
        padding: 12,
    },
    ViewStyles: {
        marginVertical: 10,
        marginHorizontal: 4,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        // Android shadow
        elevation: 2,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        padding: 8,
    },
    TitleStyle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#0a84ff',
        fontWeight: '600',
        paddingVertical: 8,
    },
    sectionLabel: {
        height: 24,
        color: '#6b7280',
        fontSize: 13,
        marginBottom: 6,
    },
    TextStyle: {
        minHeight: 40,
        fontSize: 15,
        color: '#111827',
        marginBottom: 8,
    },
    ScrollViewStyle: {
        height: 180,
        padding: 8,
    },
    RefreshStyle: {
        minHeight: 260,
    },
    RefreshViewItem: {
        minHeight: 160,
        backgroundColor: '#f0f2f5',
        borderRadius: 6,
        padding: 12,
    }
});

export default RNSmartRefreshDemo;

export const displayName = "react-native-smart-refresh";
export const framework = "React";
export const category = "UI";
export const title = "react-native-smart-refresh";
export const description = "react-native-smart-refresh";

export const examples = [
    {
        title: "react-native-smart-refresh",
        render: function (): any {
            return <RNSmartRefreshDemo />;
        },
    },
];