/*
 * @Description: 食谱详情
 */
import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

export default class CMRecipeDetail extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isCollected: false
      };
    }

    render() {
      return (
        <View style={{ flex: 1, backgroundColor: 'xm#000000' }}>
          <TouchableHighlight
            onPress={() => this._postCurrentDeviceCollectData()}
            style={{marginTop: 200}}
          >
            <Text>
              onClickAction
            </Text>
          </TouchableHighlight>
        </View>
      );
    }

    // 创建一个Promise
    fetchData = new Promise((resolve, reject) => {
      // 模拟异步操作
      setTimeout(() => {
        const success = true; // 模拟操作成功或失败
        if (success) {
          resolve('操作成功，数据已获取');
        } else {
          reject('操作失败，未能获取数据');
        }
      }, 2000);
    });

    _postCurrentDeviceCollectData() {
      this.fetchData.then((value) => {
        console.log("chy setState before")
        this.setState({ isCollected: !this.state.isCollected }, () => {
          console.log("chy setState mid")
        });
        console.log("chy setState after")
        this.toast.show(this.state.isCollected ? '已添加至设备收藏' : '已从设备收藏中移除');
      });
    }
}
