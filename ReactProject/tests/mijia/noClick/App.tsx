import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Page1 from './Page1'
import Page11 from './Page1-1'
import Page2 from './Page2'


const HomeStack = createStackNavigator();

export default function App() {
    console.log("chy App.tsx")
    return (
        <NavigationContainer>
            <HomeStack.Navigator>
                {/* <HomeStack.Screen name="Page1" component={Page1} /> */}
                <HomeStack.Screen name="Page11" component={Page11} />
                <HomeStack.Screen name="Page2" component={Page2} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}