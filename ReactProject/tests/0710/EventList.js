import React from 'react';
export const DefFilter = "Default";


export default class EventList extends React.Component {
  constructor(aProps) {
    super(aProps);
    let ev = [];;
    this.state = {
      events: ev,
    };
    this.mLoader = this.props.loader;
  }

  appendEvents(aNewEv) {
      return aNewEv;
  }

  async getEventList(date, event, isMore = false) {
    events = [];
    let data3 = [
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
      { "createTime": 1752115524546, "desc": "画面变动", "duration": 251.29000000000002, "eventTime": "10:45", "fileId": "126642353732126080", "imgStoreId": "", "isAlarm": undefined, "isRead": undefined, "offset": 0, "playCfg": { "loader": [], "player": [] }, "type": undefined },
    ]
    events = this.appendEvents(events, data3);
    this.setState({ events });
    return true;
  }

  componentDidUpdate(aPrevProps) {
    if (this.props?.loaderArgs?.startDate?.getTime() !== aPrevProps?.loaderArgs?.startDate?.getTime()
      || this.props.loaderArgs.filter !== aPrevProps.loaderArgs.filter) {
      if (aPrevProps?.loaderArgs?.startDate == null) {
        this.setState({ startDate: this.props?.loaderArgs?.startDate });
      }
      this.setState({ events: [] }, () => {
        this.mRefresh(true);
      });
    }
  }

  mRefresh = () => {
    this.getEventList(this.state.startDate, "Default", false);
  }

}
