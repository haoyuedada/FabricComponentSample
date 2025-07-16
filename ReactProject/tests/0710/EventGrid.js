import React from 'react';
import { SectionList, View, Text, Dimensions } from "react-native";
import EventList from "./EventList";

const ColCnt = 3;
const HeaderH = 45;
export const FooterH = 23;
import dayjs from 'dayjs';
const horizontalPadding = 16;
const interSpace = 10;
const columnNum = 3;
const SCREEN_WIDTH = Math.min(Dimensions.get('window').height, Dimensions.get('window').width);
const CardWidth = Math.floor((SCREEN_WIDTH - horizontalPadding * 2 - interSpace * (columnNum)) / columnNum);
const CardHeight = Math.floor(CardWidth * 64 / 99) + 38;//110, Math.floor(CardWidth * 64 / 99) + 34;
export default class EventGrid extends EventList {
  constructor(aProps) {
    super(aProps);
    this.mCardH = CardHeight;
    this.mSecHeaderBg = this.props.secHeaderBg ? this.props.secHeaderBg : "#ffffff";
  }

  scrollTo(aLoc) {
    if (this.mLst && this.state.events?.length > 0) {
      this.mLst.scrollToLocation(aLoc);
    }
  }
  
  appendEvents(aOldGrps, aItms) {
      let dic = {};
      let dicSel = {};
      if (aOldGrps.length > 0) {
        // use last for fill
        let grp = aOldGrps.pop();
        dic[grp.title] = grp.data;
        dicSel[grp.title] = grp.selected;
      }
      
      for (let i = 0; i < aItms.length; i++) {
        let item = aItms[i];
        this.buildSection(dic, item);
      }
      for (let key in dic) {
        let groupItem = {
          title: key,
          data: dic[key],
          selected: dicSel[key] ? dicSel[key] : false,
          date: this.getDateInfo(dic[key])
        };
        // if (this.props.abType != ABTest.Types.A) {
          delete groupItem.title;
        // }
        aOldGrps.push(groupItem);
      }
      return aOldGrps;

  }

  getDateInfo(grp) {
    let tuple = grp[grp.length-1];
    return tuple[0] ? tuple[0].createTime : tuple.createTime;
  }

  buildSection(aSecDict, aItm) {
    
    let dStr = "";
    console.log("chy dstr:", dStr)
    let grp = aSecDict[dStr];
    aItm['sectKey'] = dStr;
    if (!grp) {
      aSecDict[dStr] = [[aItm]];
    } else {
      let tuple = grp[grp.length - 1];
      if (ColCnt == tuple.length) {
        grp.push([aItm]); // make new tuple
      } else {
        tuple.push(aItm); // append to existing
      }
    }
  }

  fetchData(){
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 1000);
    })
  }
  filterItems(data){
    let arr=data;
    // let data2 = [{
    //   "data": [
    //     [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ], [
    //       {
    //         "createTime": 1752069531836,
    //       },
    //       {
    //         "createTime": 1752069441676,
    //       },
    //       {
    //         "createTime": 1752068930229,
    //       }
    //     ]
    //   ],
    //   "date": 1752064097655,
    //   "selected": false,
    //   "title": "2025年7月9日 | 今天"
    // }]
    return arr;
   }

  render() {
    let hvf = this.props.eventHeaderView;
    return (
      this.props.isFullscreen ? null :
        (<View style={{ flex: 1 }}>
          {hvf ? hvf() : null}

          <SectionList
            ref={(ref) => { this.mLst = ref; }}
            style={this.props.style}
            sections={this.filterItems(this.state.events)}
            renderItem={this.mRItem}
            renderSectionHeader={this.mRSecH}
            getItemLayout={this.mLayoutGetter}
            stickySectionHeadersEnabled={true}
          />
        </View>)

    );
  }

  mRItem = ({ section, index }) => {
    return (
      <View style={{ height: CardHeight, flexDirection: "row", paddingHorizontal: 20 }}>
        {
          section.data[index]
            .map((itm, idx) => {
              return (
                <View style={{width: 100, height: 50, backgroundColor: 'red'}}></View>
              )
            })
        }
      </View>
    );
  }

  mRSecH = () => {
    return (
      <Text>20200201</Text>
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
    return ret;
  }



}
