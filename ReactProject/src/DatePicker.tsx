import React, { useState } from 'react'
import { Button, View } from 'react-native'
import DatePicker from '@react-native-oh-tpl/react-native-date-picker'

export default () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        mode='date'
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  )
}

