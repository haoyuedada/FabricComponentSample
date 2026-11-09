import { NativeModules, View, UIManager } from 'react-native';
import React from 'react';

console.log("UIManager:", UIManager);

export default class RefTest extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                
            </View>
        );
    }
}