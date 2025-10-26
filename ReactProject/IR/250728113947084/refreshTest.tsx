'use strict';

const React = require('react');
const {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
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
    msg: 'Click',
    tintColor: '#FFA500',
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

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(1))
        .map((val, i) => ({
          text: 'refresh done ' + (+this.state.loaded + i),
          clicks: 0,
        }))
        .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 3000);
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
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor={this.state.tintColor} // tintColor: color of the refresh indicator.
            title="Loading..."
            titleColor="red"
            colors={this.state.colors} // colors: color of the refresh indicator
            progressBackgroundColor={this.state.progressBackgroundColor}
            progressViewOffset={this.state.progressViewOffset}
            enabled={this.state.enabled}
            size={this.state.size}
          />
        }>
        {rows}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ colors: ['#008000'] });
              console.log('colors');
            }}
            style={styles.touchableContainer}>
            <Text>colors</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({ enabled: !this.state.enabled });
              console.log('enabled');
            }}
            style={styles.touchableContainer}>
            <Text>enabled</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({ size: 'large' });
              console.log('size');
            }}
            style={styles.touchableContainer}>
            <Text>size</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({ tintColor: '#FF1493' });
              console.log('tintColor');
            }}
            style={styles.touchableContainer}>
            <Text>tintColor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({ progressBackgroundColor: 'pink' });
              console.log('progressBackgroundColor');
            }}
            style={[styles.touchableContainer, { width: 180 }]}>
            <Text>progressBackgroundColor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({ progressViewOffset: 20 });
              this.setState({ msg: 'Click completed' });
              console.log('progressViewOffset');
            }}
            style={[styles.touchableContainer, { width: 150 }]}>
            <Text>progressViewOffset</Text>
          </TouchableOpacity>
          <Text style={styles.titleMsg}>{this.state.msg}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default RefreshControlExample;
