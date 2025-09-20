import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageOne from './PageOne.tsx'
import PageTwo from './PageTwo.tsx'


const HomeStack = createStackNavigator();

export default function App() {
    console.log("chy App.tsx")
    return (
        <NavigationContainer>
            <HomeStack.Navigator>
                <HomeStack.Screen name="PageOne" component={PageOne} />
                <HomeStack.Screen name="PageTwo" component={PageTwo} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}