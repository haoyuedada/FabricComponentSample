import React, { Component } from 'react';
import { View, Text } from 'react-native';
import UUIDUtil from './UUIDUtil';
class App extends Component {
    constructor(props) {
        super(props);
        console.log(UUIDUtil.wrappedUUID('1234-5678-9012-3456'));
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <View style={{
                    borderColor: 'red',
                    borderWidth: 1,
                    width: '100%',
                    height: 50,
                    alignItems: 'flex-start',
                    marginTop: 100
                }}>
                    <Text>测试 export 和 export default</Text>
                </View>
            </View>
        );
    }
}

export default App;