import React, { Component } from 'react';
import { View, Text, ImageBackground, Button } from 'react-native';

class App extends Component {
    constructor(props) {
        super(props);
        console.log("PointEvent1 constructor");
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%'}}>
                <ImageBackground
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: 600,
                        height: 600,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        pointerEvents: "box-only"
                    }}
                    source={require('../assets/expo.png')} >
                    <View
                        style={{ flex: 1, height: '50%', justifyContent: 'center', backgroundColor: "red" }}
                    >
                        <Button title="click me" onPress={() => { console.log("click button") }} />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default App;