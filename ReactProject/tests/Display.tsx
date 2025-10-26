import React, { useEffect } from 'react';
import { SafeAreaView, TextInput, View, Text, Button, Alert } from 'react-native';


export default function App() {
    const [load, setLoad] = React.useState('null');


    return (
        <SafeAreaView>
            <Text>組件被加載了沒啊：{load}</Text>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'pink',
                    display: 'none',
                    opacity: 0
                }}
            >
                <TextInput
                    style={{ width: 200, height: 40 }}
                    autoFocus={true}
                    onFocus={() => { setLoad('被加載了！！！') }}></TextInput>
            </View>
        </SafeAreaView>
    );
}
