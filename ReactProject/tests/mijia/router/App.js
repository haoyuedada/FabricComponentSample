import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import PageOne from './PageOne'
import PageTwo from './PageTwo'

function createRootStack(initPage, routeParam) {
  return createStackNavigator({
    PageOne: PageOne,
    PageTwo: PageTwo
  },

  {
    initialRouteName: initPage,
    initialRouteParams: routeParam
  });
}

let stack = null;

export function getCurrentStack() {
  return stack;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.initPage = "";
  }

  render() {
    return (<AppContainer />)
  }

}

class AppContainer extends PureComponent {

  constructor(props) {
    super(props);
    
  }

  render() {
    let tgt = 'PageOne'; // 看家列表和播放合并，ab type b and c
    let RootStack = createRootStack(tgt);
    return <RootStack
      ref={(ref) => {
        stack = ref;
      }}/>;
    
  }
}

