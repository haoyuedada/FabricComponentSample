import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View } from 'react-native'

import PageOne from './PageOne.tsx'
import PageTwo from './PageTwo.tsx'

function createRootStack(initPage) {
    return createStackNavigator(
        {
            PageOne,
            PageTwo
        },
        {
            initialRouteName: "PageOne"
        }
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // return <View style={{ width: 100, height: 100, backgroundColor: 'red    ' }}></View>
        let RootStack = createRootStack();
        return <RootStack />
    }
}