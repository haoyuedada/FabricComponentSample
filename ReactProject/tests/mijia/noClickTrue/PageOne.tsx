import { Button, View, Modal, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react'

function App({ navigation }) {
  const [visible, setVisible] = useState(false)
  const message = "hahaha"

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='跳转到PageTwo' onPress={() => {
        navigation.navigate('PageTwo')
        setVisible(true)
      }} />
      <Modal
        transparent={true}
        visible={visible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: 'red'
          }}>
            <Button title='modal中的button' onPress={() => {
              console.log("chy modal->button onPress")
            }}></Button>
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default App;