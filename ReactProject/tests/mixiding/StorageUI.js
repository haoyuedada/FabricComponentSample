import React from 'react';
import { Dimensions, Button, View, SafeAreaView } from 'react-native';
import EventGrid from "./EventGrid";
import CoverLayer from './CoverLayer';

const CloudStorageH = 165;

export default class StorageUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lstHeader: null,
      mDate: new Date(),
      CoverLayerState: (state) => {
        this.setState({
          locked: state
        })
      }
    };
    this.mLoader = props.loader;
    this.refreshHeader();
  }
  simulateAsyncOperation() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`操作成功！耗时 2000ms`);
      }, 2000);
    });
  };

  refreshHeader() {
    this.simulateAsyncOperation()
      .then(() => {
        this.setState({ lstHeader: this.mCloudHeader, headerHeight: CloudStorageH })
        this.setState({ mDate: new Date() });
      })
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "#ffffff", paddingTop: 0,
        marginTop: 100
      }}>
        <EventGrid
          ref={(aEvLst) => { this.mEvLst = aEvLst; }}
          loader={this.mLoader}
          loaderArgs={{ startDate: this.state.mDate }}
          eventHeaderView={this.state.lstHeader}
          eventHeaderHeight={this.state.headerHeight}
        />
        <CoverLayer CoverLayerState={this.state.CoverLayerState} ref={(ref) => this.coverLayer = ref} />
      </SafeAreaView>
    );
  }

  mCloudHeader = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button title="click me show popview" onPress={() => {
          this.mShowPopupView();
        }}></Button>
      </View>
    );
  }

  mShowPopupView = () => {
    this.coverLayer.showWithContent(
      () => {
        let mWidth = Math.min(Dimensions.get("window").height, Dimensions.get("window").width);
        return (
          <View style={{ height: 500, width: mWidth }}>
            <View style={{ width: '100%', height: 400, backgroundColor: 'red' }}>
              <Button title='Click Me' onPress={() => {
                this.mSwitchOneDay()
              }}></Button>
            </View>
          </View>
        );
      },
      () => this.coverLayer.hide(),
      CoverLayer.popupMode.bottom
    );
  }
  mSwitchOneDay = (items) => {
    this.mEvLst.scrollTo({
      animated: true,
      itemIndex: 0,
      viewOffset: 0,
      sectionIndex: 0
    });
    let sltDate = new Date(Date.parse('2020-02-12'));
    this.setState({ mDate: sltDate });
    // this.coverLayer.hide();

  }
}
