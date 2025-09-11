import { View, Text, Button, findNodeHandle, TouchableOpacity } from 'react-native';
import React from 'react';

console.assert("assert");
console.log("log");
export default class RefTest extends React.Component {
    
    render() {
        return (
            <View ref={(ref) => { this.video = ref }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>RefTest Component</Text>
                <Button title="press" onPress={() => {
                    console.log("chy this.video:", this.video);
                    console.log("chy findNodeHandle1:", JSON.stringify(findNodeHandle(this.video)));
                    console.log("chy findNodeHandle2:", findNodeHandle(this.video));
                }}></Button>
                <TouchableOpacity ref={(ref) => { this.TouchableOpacity = ref }}>
                    <Text>RefTest Component</Text>
                </TouchableOpacity>
                <Button title="press" onPress={() => {
                    try {
                        console.log("chy this.TouchableOpacity:", this.TouchableOpacity);
                        console.log("chy this.TouchableOpacity.measure:", this.TouchableOpacity.measure);
                    } catch (e) {
                        console.log("chy e:", e);
                    }
                }}></Button>
            </View>
        );
    }
}