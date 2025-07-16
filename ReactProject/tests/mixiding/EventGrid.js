import React from 'react';
// import EventGridCard, { CardHeight } from './EventGridCard';
import { SectionList, View, Text, TouchableOpacity, Animated, ScrollView, Platform, Dimensions } from "react-native";
import EventList from "./EventList";

const HeaderH = 45;
export const FooterH = 23;
const TAG = "EventGrid";
const horizontalPadding = 16;
const interSpace = 10;
const columnNum = 3;
const SCREEN_WIDTH = Math.min(Dimensions.get('window').height, Dimensions.get('window').width);
const CardWidth = Math.floor((SCREEN_WIDTH - horizontalPadding * 2 - interSpace * (columnNum)) / columnNum);
const CardHeight = Math.floor(CardWidth * 64 / 99) + 38;//110, Math.floor(CardWidth * 64 / 99) + 34;
/*
UI data form
[
section0{
  title: XXX,
  data:[[itm1, itm2, itm3],
      [itm1, itm2, itm3],
      [itm1, itm2, itm3]]
}
.....
sectionX{
  title: XXX,
  data:[[itm1, itm2, itm3],
      [itm1, itm2, itm3],
      [itm1, itm2, itm3]]
}
]
*/
// export default class EventGrid extends React.Component {
export default class EventGrid extends EventList {
  constructor(aProps) {
    super(aProps);
    this.mCardH = CardHeight;
    this.mSecHeaderBg = this.props.secHeaderBg ? this.props.secHeaderBg : "#ffffff";
  }


  scrollTo(aLoc) {
    // if (this.mLst && this.state.events?.length > 0) {
      this.mLst.scrollToLocation(aLoc);
    // }
  }

  filterItems(data){
    let arr=data;
    return arr;
   }

  render() {
    let hvf = this.props.eventHeaderView;
  // const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

    return (
      this.props.isFullscreen ? null :
        (<View style={{ flex: 1 }}>
          {hvf ? hvf() : null}
          <SectionList
            ref={(ref) => { this.mLst = ref; }}
            sections={this.filterItems(this.state.events)}
            renderItem={this.mRItem}
            renderSectionHeader={this.mRSecH}
            getItemLayout={this.mLayoutGetter}
          />
        </View>)
    );
  }

  mRItem = ({ section, index }) => {
    // console.log(this.tag, "mRItem", index);
    let arr1 = new Array(100).fill(2);

    return (
      <View style={{ height: CardHeight, flexDirection: "row", paddingHorizontal: 20 }}>
        {
          
            arr1.map((itm, idx) => {
            return (
                <View style={{width: 20,height: 20, backgroundColor: 'red'}}></View>
              )
            })
        }
      </View>
    );
  }

  mRSecH = (aDat) => {
    return (
      <View>
        <Text>23424234</Text>
      </View>
    )
  }

  mLayoutGetter = (aSections, aIdx) => {
    let pos = -1;
    let hh = this.props.eventHeaderView ? this.props.eventHeaderHeight : 0;
    let length = aIdx < 0 ? hh : HeaderH;
    let offset = aIdx >= 0 ? hh : 0;
    let i = 0;
    for (i = 0; i < aSections.length && pos < aIdx; ++i) {
      let data = aSections[i].data;
      // account for section header and footer
      let nPos = pos + data.length + 2;
      if (nPos < aIdx) {
        pos = nPos;
        offset = offset + data.length * this.mCardH + HeaderH + FooterH;
      } else if (nPos == aIdx) { // hit section footer
        pos = nPos;
        length = FooterH;
        offset = offset + HeaderH + data.length * this.mCardH;
      } else {
        ++pos;// add section header
        if (pos == aIdx) { // hit section header
          length = HeaderH;
        } else {
          offset += HeaderH;
          if (aIdx <= pos + data.length) { // in middle
            offset = offset + (aIdx - pos - 1) * this.mCardH;
            length = this.mCardH;
          } else { // last footer
            offset = offset + (aIdx - pos) * this.mCardH;
            length = FooterH;
          }
          pos = aIdx;
        }
      }
    }
    let ret = { length, offset, index: aIdx };
    // console.log(TAG, "getItemLayout", aIdx, ret, pos, "CardHeight", CardHeight, "HeaderH", HeaderH, "FooterH", FooterH, "mCardH" + this.mCardH);
    console.log("chy eventGrid ret:", ret)
    return ret;
  }
}
