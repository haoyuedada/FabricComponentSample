import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        let { width, height } = Dimensions.get("window");
        this.state = {
            width,
            height,
            imageSource: null
        };
    };

    change() {
        this.state = { imageSource: null }
    };

    componentDidMount() {
        this.change()
    };


    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>{this.state.width}</Text>
            </View>
        );
    }
}

export default App;