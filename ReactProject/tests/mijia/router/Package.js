import React from 'react';
import { AppRegistry} from "react-native";
import { createStackNavigator } from 'react-navigation';

const extra = {};
class PackageRoot extends React.Component {
   constructor() {
     super();
   }
   render() {
     const { App } = extra;
     return (
       <App ref={(res) => {
         this.currentPage = res;
       }} key={this.props.did} >
       </App>
     );
   }
}
/**
  * @export
  */
export default {
  entry(RootComponent, afterPackageEntry = null) {
    extra.App = RootComponent;
    AppRegistry.registerComponent("app_name", this._packageRootNavigationStack);
  },

  _packageRootNavigationStack() {
    return createStackNavigator(Object.assign({}, { PackageRoot }), {
      initialRouteName: 'PackageRoot',
      headerMode: 'none',
      navigationOptions: ({ navigation }) => {
        packageNavigation = navigation;
        return {
          header: null
        };
      }
    });
  },
};
