import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SampleTurboModule from 'turbo-module/src/specs/v1/SampleTurboModule';



const HomeStack = createStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
            <Button
                title="Go to PageThree"
                onPress={() => navigation.navigate('PageThree')}
            />
        </View>
    );
}

function PageThree({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}


export default function App() {
  const handleStateChange = (state) => {
    // 获取当前路由栈中的路由数量，即页面层级
    const currentLevel = state.routes.length;
    console.log('当前页面层级:', currentLevel);
    console.log('路由已变化:', state);
    SampleTurboModule.doAsyncJob(currentLevel)
  };

    return (
        <NavigationContainer onStateChange={handleStateChange}>
            <HomeStack.Navigator>
                <HomeStack.Screen name="Home" component={HomeScreen} />
                <HomeStack.Screen name="Details" component={DetailsScreen} />
                <HomeStack.Screen name="PageThree" component={PageThree} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}