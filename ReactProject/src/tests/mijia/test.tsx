import { View, Text, StyleSheet, Button } from "react-native"
import { InputDialog } from 'miot/ui';
import { useState } from "react";

const App = () => {
  const [text, setText] = useState('默认')
  const [leftSwitchInput, setleftSwitchInput] = useState(false)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>这是一个脱离米家工程的页面</Text>
      <Button title="按钮" onPress={() => { setleftSwitchInput(!leftSwitchInput) }}></Button>
      <Text>{text}</Text>
      <InputDialog
        title={"标题"}
        message={' '}
        cancel={'取消'}
        confirm={"确定"}
        placeholder={'输入'}
        onConfirm={(e) => {
          console.log('lyh1', e.text);
          if (e.text) {
            // alert(e.text);
            console.log('lyh1', e.text);
            setText(e.text)
          }
        }}
        onDismiss={() => {
          setleftSwitchInput(false)
        }}
        visible={leftSwitchInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: 300,
    height: 200
  }

})
export default App;



