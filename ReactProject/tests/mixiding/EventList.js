import React from 'react';

export default class EventList extends React.Component {
  constructor(aProps) {
    super(aProps);
    let ev = [];
    this.state = {
      events: ev
    };
  }

  async getEventList() {
    events = this.addNoFreeSVLTipsItem();
    this.setState({
      events,
    });
  }

  addNoFreeSVLTipsItem(evts) {
    let test = [{
      "data": [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ]
    }]
    return test
  }

  componentDidUpdate(aPrevProps) {
    if (this.props?.loaderArgs?.startDate?.getTime() !== aPrevProps?.loaderArgs?.startDate?.getTime()) {
      this.setState({ events: [] }, () => {
        this.getEventList();
      });
    }
  }
}