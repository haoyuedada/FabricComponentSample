import { useState } from 'react';
import React, { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const VPanGestureHandler = ({ children, style, ...restProps }) => {
  console.log('🚀 ~ VPanGestureHandler ~ style:', style);
  return (
    <PanGestureHandler {...restProps}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

const screenWidth = Dimensions.get('screen').width;

export const TestApp = () => {
  const [index, setIndex] = useState(0);
  console.log('🚀 ~ AppCarDetail ~ index10:', index, screenWidth);
  const images = [
    {
      id: '1',
      uri: 'https://res.vmallres.com//FssCdnProxy/ms_car_uom/car/productManagement/3CDD9BF740F71CBAE1393ABAE8410D88.jpg',
    },
    {
      id: '2',
      uri: 'https://res.vmallres.com//FssCdnProxy/ms_car_uom/car/productManagement/3CDD9BF740F71CBAE1393ABAE8410D88.jpg',
    },
    {
      id: '3',
      uri: 'https://res.vmallres.com//FssCdnProxy/ms_car_uom/car/productManagement/3CDD9BF740F71CBAE1393ABAE8410D88.jpg',
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.image]}>
          <VPanGestureHandler
            activeOffsetY={[-20, 20]}
            style={[styles.image, { touchAction: 'pan-x !important', opacity: 1 }]}
          >
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              // style={{ flexDirection: 'row', width: 2000, height: 300 }}
              showsHorizontalScrollIndicator={false}
              // 4. 监听滑动结束，更新索引
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                setIndex(index);
              }}
            >
              {images.map((img) => (
                <View key={img.id} style={styles.page}>
                  <Image source={{ uri: img.uri }} style={styles.image} resizeMode="cover" />
                </View>
              ))}
            </ScrollView>
          </VPanGestureHandler>

          <VPanGestureHandler style={styles.image}>
            <></>
          </VPanGestureHandler>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  page: {
    width: screenWidth, // 每个页面宽度等于屏幕宽度
    height: 400, // 固定高度
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
