import { NativeModules, View } from 'react-native';
import React from 'react';
const { UIManager } = NativeModules;

console.log("UIManager:", UIManager);

export default class RefTest extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                
            </View>
        );
    }
}