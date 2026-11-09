import React, { useRef } from 'react';
import type { RenderItemProps } from 'react-native/Libraries/Lists/VirtualizedList';
const { PlainInput, } = require('../../components/ListExampleShared');
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Button,
    ScrollView,Image, RefreshControl,
} from 'react-native';
const { useState } = require('react');
type ItemProps = { title: string };
const Item = ({ item, separators }: RenderItemProps<string>) => {
    return (
        <View
            onPressIn={() => {
                separators.highlight();
            }}
            onPress={() => {
                separators.updateProps('trailing', { hasBeenHighlighted: true });
                separators.updateProps('leading', { hasBeenHighlighted: true });
            }}
            onPressOut={() => {
                separators.unhighlight();
            }}
            style={({ pressed }) => [
                styles.item,
                {
                    backgroundColor: pressed ? 'red' : 'pink',
                },
            ]}
            testID={item}>
            <Text style={styles.title}>{item}</Text>
        </View>
    );
};
const FlatlistExample = () => {
    const flatListRef = useRef()
    const [horizontal, setHorizontal] = useState(false)
    const [numColumns, setNumColumns] = useState('')
    const [inverted, setInverted] = useState(false)
    const [itemSeparatorComponent, setItemSeparatorComponent] = useState('')
    const [columnWrapperStyle, setColumnWrapperStyle] = useState('')
    const [onEndReachedThreshold, setOnEndReachedThreshold] = useState('0')
    const [onStartReachedThreshold, setonStartReachedThreshold] = useState('0')
    const [onEndReachedText, setonEndReachedText] = useState('还未到底部哦')
    const [onStartReachedText, setOnStartReachedText] = useState('还未到底部哦')
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState([
        '1 Item',
        '2 Item',
        '3 Item',
        '4 Item',
        '5 Item',
        '6 Item',
        '7 Item',
        '8 Item',
        '9 Item',
        '10 Item',
    ])
    const [extraData,setExtraData]=useState(0)
    const updateData=()=>{
        let newAry = [];
            for (let i =0;i<=data.length;  i++) {
                if(i<=data.length-1){
                    newAry.push(data[i]);
                }
                else{
                    newAry.push(i+1+' Item')
                }
            }
        setData(newAry)
        setExtraData(extraData+1)
    }
    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            //把数据反转
            let newArray = [];
            for (let i = data.length - 1; i >= 0; i--) {
                newArray.push(data[i]);
            }
            // 在列表最前面添加一项
            // data.unshift(['0 Item'])
            setRefreshing(false)
            setData(newArray)
        }, 3000);
    }
    const [removeClippedSubviews, setRemoveClippedSubviews] = useState(true);
    const fixedHeight = 'true' 
    return (
        <View style={styles.container}>
            <View style={{height:300}}>
                <ScrollView style={styles.scrollview}>
                    <View style={{ margin: 10 }}>
                        <Text>1.2、renderItem：列表项；1.3、data：列表元数据。必须配合使用</Text>
                        <Text></Text>
                        <Text>属性值：{`renderItem={Item} data ={data}`}}</Text>
                        <Text>预期效果：展示列表</Text>
                        <Text>实际效果：查看列表</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>1.4、ItemSeparatorComponent：在每个项目之间渲染，但不在顶部或底部。</Text>
                        <Text>属性值：color: 'orange', fontSize: 16</Text>
                        <Text>预期效果：点击下面按钮会添加ItemSeparatorComponent的样式，再次点击会恢复原样</Text>
                        <Image
                            style={{width:330,height:230}}
                            source={require('../../../assets/flatListItemSeparatorComponent.png')}
                        />
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Button
                            onPress={() => {
                                setItemSeparatorComponent(itemSeparatorComponent ? '' : <Text style={{ color: 'orange', fontSize: 16 }}>this is ItemSeparatorComponent</Text>)
                            }}
                            title='add ItemSeparatorComponent'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>1.10、columnWrapperStyle：如果设置了多列布局（即numColumns&gt;1），则可以额外指定此样式作用在每行容器上</Text>
                        <Text>属性值：backgroundColor: 'black'</Text>
                        <Text>预期效果：在numColumns输入数值大于1的时候此属性才会生效，点击下面按钮会添加columnWrapperStyle的样式，再次点击会恢复原样</Text>
                        <Image
                            style={{width:300,height:150}}
                            source={require('../../../assets/flatListColumnWrapperStyle.png')}
                        />
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Button
                            onPress={() => {
                                if (numColumns > 1) {
                                    setColumnWrapperStyle(columnWrapperStyle ? '' : { backgroundColor: 'black' })
                                }
                            }}
                            title='add columnWrapperStyle'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>1.11、horizontal：设置为 true 则变为水平布局模式。</Text>
                        <Text>属性值：默认为false，点击按钮变为true</Text>
                        <Text>预期效果：点击下面的按钮，可以切换flatList为垂直布局方式或者水平布局方式</Text>
                        <Image
                            source={require('../../../assets/flatListHorizontal.png')}
                        />
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Button
                            onPress={() => {
                                setHorizontal(!horizontal)
                            }}
                            title='horizontal'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>1.14、inverted：实现列表翻转</Text>
                        <Text>属性值：默认为false，点击按钮变为true</Text>
                        <Text>预期效果：点击下面按钮，列表会实现上下或者左右翻转</Text>
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Button
                            onPress={() => {
                                setInverted(!inverted)
                            }}
                            title='inverted'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>1.15、numColumns：设置布局的列数</Text>
                        <Text>预期效果：在下面的输入框里输入数字，可以改变列表的列数</Text>
                        <Text>实际效果：在下面输入数字，开始验证</Text>
                        {/* <PlainInput
                            placeholder='numColumns'
                            clearButtonMode="never"
                            onChangeText={number => setNumColumns(number)}
                            value={numColumns ? numColumns : ''}
                        /> */}
                        <Button
                            onPress={() => {
                                setNumColumns(1)
                            }}
                            title='numColumns=1'
                        />
                        <Button
                            onPress={() => {
                                setNumColumns(2)
                            }}
                            title='numColumns=2'
                        />
                    </View>   
                    <View style={{ margin: 10 }}>
                        <Text>1.18、removeClippedSubviews</Text>
                        <Text >预期效果：当此属性为 true 时，屏幕之外的子视图会被移除</Text>
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Text>removeClippedSubviews值：{removeClippedSubviews.toString()}</Text>
                        <Button onPress={() => setRemoveClippedSubviews(!removeClippedSubviews)} title='removeClippedSubviews'></Button>
                    </View> 
                    <View style={{ margin: 10 }}>
                        <Text>1.22、extraData</Text>
                        <Text>预期效果：点击按钮，Flatlist数据新增一条，extraData数值加1</Text>
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Button onPress={updateData} title='更新列表'></Button>
                        <Text>extraData:{extraData}</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>1.23、progressViewOffset：刷新指示器的垂直起始位置(top offset)</Text>
                        <Text>预期效果：下拉实现列表刷新时，出现加载符号，调整刷新指示器的垂直起始位置</Text>
                        <Text>实际效果：下拉列表开始验证</Text>
                    </View>            
                    <View style={{ margin: 10 }}>
                        <Text>2.1、flashScrollIndicators</Text>
                        <Text>预期效果：短暂的显示滚动指示器</Text>
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Button onPress={()=>{
                            flatListRef.current.flashScrollIndicators()
                        }} title='flashScrollIndicators'></Button>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>2.6、scrollToEnd：滚动到列表底部。</Text>
                        <Text>预期效果：点击下面按钮，列表会滚动到列表的底部。</Text>
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <Button
                            onPress={() => { flatListRef.current.scrollToEnd()}}
                            title='scrollToEnd'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>2.7、scrollToIndex：</Text>
                        <Text>属性值：如下面按钮所示</Text>
                        <Text>预期效果：点击下面按钮，列表会跳转到索引为2的项目</Text>
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Button
                                onPress={() => { flatListRef.current.scrollToIndex({index: 2, animated: true})}}
                                title='index=2'
                            />
                            <Button
                                onPress={() => { flatListRef.current.scrollToIndex({index: 4, animated: true})}}
                                title='index=4'
                            />
                            <Button
                                onPress={() => { flatListRef.current.scrollToIndex({index: 6, animated: true})}}
                                title='index=6'
                            />
                        </View>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text>2.8、scrollToOffset：滚动列表到指定的偏移。</Text>
                        <Text>属性值：如下面按钮所示</Text>
                        <Text>预期效果：点击下面按钮，列表会滚动到按钮对应的偏移量。</Text>
                        <Text>实际效果：点击下面按钮开始验证</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Button
                                onPress={() => { flatListRef.current.scrollToOffset({offset:0}); }}
                                title='offset=0'
                            />
                            <Button
                                onPress={() => { flatListRef.current.scrollToOffset({offset:100}); }}
                                title='offset=100'
                            />
                            <Button
                                onPress={() => { flatListRef.current.scrollToOffset({offset:300}); }}
                                title='offset=300'
                            />
                        </View>
                    </View>
                                       
                    <View style={{ margin: 10 }}>
                        <Text>3.3、onRefresh：下拉刷新</Text>
                        <Text>预期效果：下拉会实现列表刷新，出现加载符号，三秒后加载符号消失，列表会翻转</Text>
                        <Text>实际效果：下拉列表开始验证</Text>
                    </View>
                </ScrollView>
            </View>
            <Text style={{marginLeft:15}}>{onStartReachedText}</Text>
            <FlatList
                ItemSeparatorComponent={itemSeparatorComponent}
                horizontal={horizontal}
                numColumns={numColumns}
                columnWrapperStyle={columnWrapperStyle}
                onEndReached={() => { setonEndReachedText('已经到底部了哦') }}
                onEndReachedThreshold={onEndReachedThreshold}
                onStartReached={() => { setOnStartReachedText('已经到顶部了哦') }}
                onStartReachedThreshold={onStartReachedThreshold}
                // initialScrollIndex={2}
                // refreshing={refreshing}
                // onRefresh={onRefresh}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  progressViewOffset={10} progressBackgroundColor={'red'}/>
                }
                removeClippedSubviews={removeClippedSubviews}
                extraData={extraData}
                inverted={inverted}
                data={data}
                testID="flat_list"
                keyExtractor={(item, index) => item + index}
                key={numColumns + (fixedHeight ? 'f' : 'v')}
                renderItem={Item}
                ref={flatListRef}
                style={{marginHorizontal: 15,}}
            />          
            <Text style={{marginLeft:15}}>{onEndReachedText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        backgroundColor: '#e6e6e6',
        marginHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#b3b3b3',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
        height: 80,
        backgroundColor: 'pink',
        marginBottom: 20,
        marginRight:10
    },
});

export default ({
    title: 'FlatlisPropstExample',
    name: '属性:1.11 horizontal;1.15 numColumns；1.14 inverted；1.4 ItemSeparatorComponent；1.10 columnWrapperStyle；3.3 onRefresh；2.7 scrollToIndex；2.8 scrollToOffset；2.6 scrollToEnd；1.23 progressViewOffset；1.22 extraData；1.18 removeClippedSubviews；2.1 flashScrollIndicators ',
    description:
        '属性:1.11 horizontal;1.15 numColumns；1.14 inverted；1.4 ItemSeparatorComponent；1.10 columnWrapperStyle；3.3 onRefresh；2.7 scrollToIndex；2.8 scrollToOffset；2.6 scrollToEnd；1.23 progressViewOffset；1.22 extraData；1.18 removeClippedSubviews；2.1 flashScrollIndicators ',
    render: () => <FlatlistExample />,
}: RNTesterModuleExample);