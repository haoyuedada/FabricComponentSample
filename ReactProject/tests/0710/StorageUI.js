import React from 'react';
import { Text, Dimensions, View, SafeAreaView, Button } from 'react-native';
import EventGrid from "./EventGrid";
import CalendarPanel from './CalendarPanel';
import CoverLayer from './CoverLayer';

const CloudStorageH = 165;
export default class StorageUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CoverLayerState: (state) => {
        this.setState({
          locked: state
        })
      }
    }
    this.mLoader = props.loader;
    this.refreshHeader();
  }

  getSummary(){
    return new Promise(( res, rej) => {
      setTimeout(() => {
        res()
      }, 2000)
    })
  }
  refreshHeader() {
    this.getSummary()
      .then(() => {
        this.setState({ showGlobalLoading: false, lstHeader: this.mCloudHeader, headerHeight: CloudStorageH }, () => {
        });
        setTimeout(() => {
          this.setState({ mDate: new Date() });
        });

      })
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "#ffffff", paddingTop: 0 }}>
        <EventGrid
          ref={(aEvLst) => { this.mEvLst = aEvLst; }}
          loader={this.mLoader}
          loaderArgs={{ startDate: this.state.mDate }}
          eventHeaderView={this.props.isEditing ? null : this.state.lstHeader}
          eventHeaderHeight={this.state.headerHeight}
        />
        <CoverLayer CoverLayerState={this.state.CoverLayerState} ref={(ref) => this.coverLayer = ref} />
      </SafeAreaView>
    )

  }

  mSwitchSltDayMore = () => {
    console.log("landing6 3");
    this.mSltDayMore = true;
    this.mEvLst.mSwitchSltDayMore(this.mSltDayMore);
  }

  mSelectAllCB = (allSelected) => {
    this.props.selectCB && this.props.selectCB((this.mSelEv.length === MaxSel) || allSelected, this.mSelEv.length);
  }

  mCalEdt = () => {
    return (
      <Button title="press" onPress={() => {
        this.mShowPopupView();
      }}></Button>
    )
  }

  mLocalHeader = () => {
    return (
      <Button title="press" onPress={() => {
        this.mShowPopupView();
      }}></Button>
    )  }


  mCloudHeader = () => {
    let mMarginBottom = this.mSltDay && !this.state.emtypDataDay ? 20 : 0;
    return (
      <View style={{ paddingHorizontal: 20, justifyContent: "flex-start", alignItems: "flex-start", marginTop: this.state.marginTop, marginBottom: mMarginBottom }}>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontWeight: 'bold', color: "#000000" }}>1234567890</Text>
          {this.mCalEdt()}
        </View>
      </View>
    );
  }

  mShowPopupView = () => {
    this.coverLayer.showWithContent(
      () => {
        // let nowDate = new Date();
        console.log('calendar input: ', this.state.mDate);
        let mWidth = Math.min(Dimensions.get("window").height, Dimensions.get("window").width);
        return (
          <View style={{ height: 500, width: mWidth }}>
            <CalendarPanel onDateSelect={() => { }} />
            <Button title='确定' onPress={() => {
              this.mSwitchOneDay()
            }}></Button>
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
    let sltDate = new Date(Date.parse('2022-02-12'));
    this.setState({ mDate: sltDate, showLoading: true });
    this.coverLayer.hide();
  }
}
