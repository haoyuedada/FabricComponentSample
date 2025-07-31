import React, { useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

class ViewStyleTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 100,
            parallaxHeight: 100,
        };
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%' }} src="123">
                {/* <View style={{ width: 100, height: 100, backgroundColor: 'blue', marginTop: 100 }}></View> */}
                <View
                    style={[{
                        width: this.state.width,
                        height: this.state.parallaxHeight,
                        // width: 100,
                        // height: 100,
                        backgroundColor: 'blue',
                    }]}
                ></View>
            </View>
        );
    }
}

export default ViewStyleTest;