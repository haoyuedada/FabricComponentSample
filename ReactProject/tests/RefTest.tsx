import { View, Text, Button, findNodeHandle } from 'react-native';
import React from 'react';

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
            </View>
        );
    }
}