/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const React = require('react');
const {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View, TouchableOpacity
} = require('react-native');

const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
  },
  touchableContainer: {
    backgroundColor: '#4169E1',
    width: 100,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10
  },
  titleMsg: {
    backgroundColor: '#808080',
  }
});

class Row extends React.Component {
  _onClick = () => {
    this.props.onClick(this.props.data);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClick}>
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class RefreshControlExample extends React.Component {
  state = {
    isRefreshing: false,
    loaded: 0,
    colors: ['red'],
    enabled: true,
    progressBackgroundColor: 'orange',
    progressViewOffset: 50,
    size: 'default',
    msg:'点击',
    tintColor:'#FFA500',
    rowData: Array.from(new Array(1)).map((val, i) => ({
      text: 'Initial row ' + i,
      clicks: 0,
    })),
  };

  _onClick = row => {
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  };

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick} />;
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            //  refreshing={true}
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor={this.state.tintColor}   // tintColor:刷新指示器的颜色。 
            title="Loading..."
            titleColor="red"
            colors={this.state.colors}    // colors:刷新指示器的颜色
            progressBackgroundColor={this.state.progressBackgroundColor}
            progressViewOffset={this.state.progressViewOffset}
            enabled={this.state.enabled}
            size={this.state.size}
          />
        }>
        {rows}
        <Text style={styles.titleMsg}>1.refreshing:</Text>
        <Text>预期效果：下拉刷新，显示指示器，刷新完成时，指示器消失</Text>
        <Text style={styles.titleMsg}>2.onRefresh:</Text>
        <Text>预期效果：下拉刷新，文字‘Initial row’会变成‘refresh done’</Text>
        <Text style={styles.titleMsg}>3.colors：</Text>
        <Text>预期效果：指示器的颜色是红色的，点击colors按钮之后，变成绿色</Text>
        <Text style={styles.titleMsg}>4.enabled：</Text>
        <Text>预期效果：默认值为true，可以实现下拉刷新，点击enabled按钮之后，不能实现下拉刷新；再次点击可以实现下拉刷新</Text>
        <Text style={styles.titleMsg}>5.progressBackgroundColor:</Text>
        <Text>预期效果：点击progressBackgroundColor按钮之后，背景颜色由橙色变为粉色</Text>
        <Text style={styles.titleMsg}>6.progressViewOffset:</Text>
        <Text>预期效果：设置刷新指示器的垂直起始位置，起始值是50，点击progressViewOffset按钮之后，变为20</Text>
        <Text style={styles.titleMsg}>7.size:</Text>
        <Text>预期效果：指定刷新指示器的大小,默认值是default，点击size按钮之后，属性值变为large，指示器变大</Text>
        <Text style={styles.titleMsg}>8.tintColor：</Text>
        <Text>预期效果：刷新指示器的颜色为橙色，点击tintColor按钮之后，变为深粉色</Text>
        <Text style={styles.titleMsg}>9.title：</Text>
        <Text>预期效果：下拉刷新，会显示文字'Loading...'</Text>
        <Text style={styles.titleMsg}>10.titleColor:</Text>
        <Text>预期效果：下拉刷新，指示器下的文字显示红色</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ colors: ['#008000'] })
              console.log(12);
            }}
            style={styles.touchableContainer}>
            <Text>colors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ enabled: !this.state.enabled })
              console.log('enabled');
            }}
            style={styles.touchableContainer}>
            <Text>enabled</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ size: 'large' })
              console.log('size');
            }}
            style={styles.touchableContainer}>
            <Text>size</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ tintColor: '#FF1493' })
              console.log('size');
            }}
            style={styles.touchableContainer}>
            <Text>tintColor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ progressBackgroundColor: 'pink' })
              console.log('progressBackgroundColor');
            }}
            style={[styles.touchableContainer, { width: 180 }]}>
            <Text>progressBackgroundColor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ progressViewOffset: 20 })
              this.setState({ msg: '点击完成' })
              console.log('progressViewOffset');
            }}
            style={[styles.touchableContainer, { width: 150 }]}>
            <Text>progressViewOffset</Text>
            <Text>{this.state.msg}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(1))
        .map((val, i) => ({
          text: 'refreshed---Loaded row- ==' + (+this.state.loaded + i),
          clicks: 0,
        }))
        .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 2000);
  };
  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(1))
        .map((val, i) => ({
          text: 'refresh done' + (+this.state.loaded + i),
          clicks: 0,
        }))

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    },3000);
  };
}
exports.title = 'RefreshControl';
exports.category = 'Basic';
exports.documentationURL = 'https://reactnative.dev/docs/refreshcontrol';
exports.description = 'Adds pull-to-refresh support to a scrollview.';
exports.examples = [
  {
    title: 'Simple refresh',
    render: function (): React.Element<typeof RefreshControlExample> {
      return <RefreshControlExample />;
    },
  },
];
