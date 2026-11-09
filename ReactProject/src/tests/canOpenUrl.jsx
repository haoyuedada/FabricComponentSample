import { Linking, Alert, Button, View } from 'react-native';


function App({ navigation }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title='canOpenURL' onPress={() => {
                const emailUrl = `mailto:support@example.com?subject=${encodeURIComponent('问题反馈')}&body=${encodeURIComponent('你好，我发现了一个...')}`;
                const emitlUrlmi = 'mailto://service@roborock.com'
                Linking.canOpenURL(emitlUrlmi).then(supported => {
                    if (supported) {
                        return Linking.openURL(emitlUrlmi);
                    } else {
                        Alert.alert('提示', '您的设备上没有找到可用的邮件应用。');
                    }
                });
            }} />
        </View>

    )
}

export default App;