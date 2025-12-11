/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';
import type {RNTesterModuleExample} from '../../types/RNTesterTypes';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    VirtualizedList,
    View,
    useWindowDimensions,
    ScrollView,
    Button,
    
  } from 'react-native';


export function VirtualizedList_setNativeProps(): React.Node {
    const ref = React.useRef<any>(null);
    const window = useWindowDimensions();

    const getItemCount = (_data) => 12;
    const getItem = (_data, index) => ({
      id: Math.random().toString(12).substring(0),
      title: `Item ${index + 1}`,
    });
    const Item = ({title}) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const handleButtonPress = () => {
      // 使用 ref 来访问视图的属性和方法
      ref.current.setNativeProps({
          style: { backgroundColor: 'green' },
      });
  };
 
    return (
        <View>
        <View style={styles.textStyle}>
            <Text style={{lineHeight:20}}>属性值:style: backgroundColor:'green'定义背景色为绿色</Text>
        </View>
        <View>
            <View style={styles.noteStyle}>
                <Text style={{lineHeight:30}}>预期效果：</Text>
                <Text style={{lineHeight:20}}>当点击Toggle的button时,视图背景色会变为绿色</Text>
            </View>
            {/* <Image style={{marginTop:8,marginLeft:10}} source={require('../../../assets/VirtualizedList_scrollToEnd.PNG')}></Image> */}
        </View>
      <View style={styles.viewStyle}>
        <View testID="test_container" style={styles.testContainer}>
            <Text style={{paddingTop:10,paddingLeft:10}}>实际效果:</Text>
            <Button
            title='Toggle'
            onPress={handleButtonPress}
            ></Button>
        </View>
        <VirtualizedList
            ref={ref}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
            />
      </View>
      
    </View>
    )
}

const styles = StyleSheet.create({
    viewStyle:{
      width:300,
      height:240,
      marginBottom:30,
      borderWidth:1,
      borderColor:'black',
      borderStyle:'solid',
      marginLeft:40,
    },
    item: {
      backgroundColor: '#f9c2ff',
      height: 40,
      justifyContent: 'center',
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    textStyle:{
      padding:20,
      textAlign:'left',
      lineHeight:30
    },
    noteStyle:{
      paddingTop:10,
      paddingLeft:10,
    },
    testContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f7ff',
        height: 40,
      },
  })

  export default ({
    title: '33.SetNativeProps',
    name: 'SetNativeProps',
    description:
      'modify properties of native-backed components.',
    render: function (): React.Element<typeof VirtualizedList_setNativeProps> {
      return <VirtualizedList_setNativeProps />;
    },
  }: RNTesterModuleExample);