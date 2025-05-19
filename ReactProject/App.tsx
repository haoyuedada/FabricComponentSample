import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SampleTurboModule from 'turbo-module/src/specs/v1/SampleTurboModule';
import SVGTest from './tests/SVGTest';


const HomeStack = createStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home screen</Text>
            <Button
                title='settimeout'
                onPress={() => {
                    setTimeout(() => {
                        SampleTurboModule.doAsyncJob(1)
                    }, 2000)
                }}></Button>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
            <Button
                title="Go to SVGTest"
                onPress={() => navigation.navigate('SVGTest')}
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
        console.log('setTimeout start')

        const currentLevel = state.routes.length;
        // setTimeout(() => {
            console.log('setTimeout1:', currentLevel)
            SampleTurboModule.doAsyncJob(currentLevel)
            // SampleTurboModule.pushStringToHarmony('22', (aa) => {
            //     console.log('setTimeout1:', aa)
            // })

        // }, 1000)
    };
    // setTimeout(() => {
    //     SampleTurboModule.doAsyncJob(1)
    // }, 1000)
    // setTimeout(() => {
    //     SampleTurboModule.doAsyncJob(1)
    // }, 1000)
    // setTimeout(() => {
    //     SampleTurboModule.doAsyncJob(1)
    //     SampleTurboModule.doAsyncJob(1)
    // }, 2000)
    return (
        <NavigationContainer onStateChange={handleStateChange}>
            <HomeStack.Navigator>
                <HomeStack.Screen name="Home" component={HomeScreen} />
                <HomeStack.Screen name="Details" component={DetailsScreen} />
                <HomeStack.Screen name="PageThree" component={PageThree} />
                <HomeStack.Screen name="SVGTest" component={SVGTest} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}