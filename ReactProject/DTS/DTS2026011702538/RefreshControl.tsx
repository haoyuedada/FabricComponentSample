import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';

const itamArray = new Array();
itamArray.push({ id: 0, text: "默认主题rn->RefreshControl", dec: "设置刷新头默认背景颜色" });
itamArray.push({ id: 1, text: "设置红色主题", dec: "设置刷新头默认背景红色主题" });
itamArray.push({ id: 2, text: "设置绿色主题", dec: "设置刷新头默认背景绿色主题" });
itamArray.push({ id: 3, text: "设置蓝色主题", dec: "设置刷新头默认背景蓝色主题" });
itamArray.push({ id: 4, text: "设置自动刷新", dec: "该属性需要初次渲染加载" });
itamArray.push({ id: 5, text: "设置自动过5秒刷新", dec: "该属性需要初次渲染加载" });
itamArray.push({ id: 6, text: "设置阻尼效果", dec: "设置下拉阻尼效果" });
itamArray.push({ id: 7, text: "设置最大下拉高度", dec: "设置最大下拉高度" });
itamArray.push({ id: 8, text: "设置禁止刷新", dec: "开启或关闭刷新" });
itamArray.push({ id: 9, text: "设置AnyHeader黄色主题", dec: "设置AnyHeader黄色主题" });

interface Item {
  id: number;
  text: string;
  dec: string;
}

const App = () => {
  const [data, setData] = useState<Item[]>(itamArray);
  const [refreshing, setRefreshing] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(69);
  const [imgHeight, setImgHeight] = useState(0.0);

  const [color, setColor] = useState('#ffffff');
  const [autuR, setAutoR] = useState({ refresh: false, time: -1 });
  const [dragR, setDragRate] = useState(0.5);
  const [maxDragR, setMaxDragRate] = useState(2.0);
  const [enableR, setEnableR] = useState(true);
  const [openAnyBg, setOpenAnyBg] = useState(false);
  const flatListRef: React.RefObject<FlatList<Item>> = useRef(null);

  // 处理自动刷新
  useEffect(() => {
    if (autuR.refresh) {
      setRefreshing(true);
      const timeout = autuR.time === -1 ? 5000 : autuR.time;
      setTimeout(() => {
        setRefreshing(false);
        setAutoR({ refresh: false, time: -1 });
      }, timeout);
    }
  }, [autuR]);

  const ItemView = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => {
        switch (item.id) {
          case 0:
            setColor("#ffffff")
            break;
          case 1:
            setColor('#ff0000')
            break;
          case 2:
            setColor("#00FF00")
            break;
          case 3:
            setColor("#0000FF")
            break;
          case 4:
            setAutoR({ refresh: true, time: -1 })
            break;
          case 5:
            setAutoR({ refresh: true, time: 5000 })
            break;
          case 6:
            setDragRate(3.0)
            break;
          case 7:
            setMaxDragRate(5.0)
            break;
          case 8:
            setEnableR(!enableR);
            break;
          case 9:
            setOpenAnyBg(!openAnyBg);
            break;
        }
      }}>
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
      <Text style={styles.itemTextdec}>{item.dec}</Text>
    </View>
  );

  const onRefresh = () => {
    console.log("RN RefreshControl onRefresh");
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  };

  const onScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.y * -1;
    if (offset > headerHeight - 20) {
      return;
    }
    setImgHeight(offset);
  };

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: '#ffffff' }}>
      <FlatList
        ref={flatListRef}
        style={{ flex: 1, height: '100%', width: '100%', backgroundColor: '#ffffff' }}
        data={data}
        renderItem={({ item }) => <ItemView item={item} />}
        keyExtractor={item => item.id.toString()}
        onScroll={onScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={enableR}
            tintColor={color === '#ffffff' ? '#999' : color}
            colors={[color === '#ffffff' ? '#000' : color]}
          />
        }
        ListHeaderComponent={
          <View style={{ height: headerHeight, justifyContent: "center", alignItems: 'center', backgroundColor: openAnyBg ? "#ffff00" : "#ffffff" }}>
            <Image style={{ width: imgHeight, height: imgHeight }} source={require('./img/load.gif')} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "column"
  },
  itemText: {
    fontSize: 14,
  },
  itemTextdec: {
    marginTop: 3,
    fontSize: 10
  },
});

export default App;