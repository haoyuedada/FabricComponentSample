import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

class ViewStyleTest extends React.Component {

    render() {
        return (
            <View style={{ width: '100%', height: '100%' }} src="123">
                {/* <View style={{ width: 100, height: 100, backgroundColor: 'blue', marginTop: 100 }}></View> */}
                <View
                    src="232"
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'red',
                        marginTop: 100
                    }}
                    marginTop={400}
                ></View>
            </View>
        );
    }
}

export default ViewStyleTest;