import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardProvider,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

function App() {
  const [bottom, setBottom] = useState(0);
  const width = useSharedValue(0);
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', e => {
      console.log('zzc11' + JSON.stringify(e));
      console.log(e.endCoordinates);
    });
    Keyboard.addListener('keyboardDidShow', e => {
      console.log('zzc22' + JSON.stringify(e));
      let h = e.endCoordinates.height + 42;
      // setBottom(h);
      width.value = withTiming(h, {duration: 20});
      console.log('zzch' + h);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      console.log('zzc willhide');
    });
    Keyboard.addListener('keyboardDidHide', () => {
      console.log('zzc hide');
      width.value = withTiming(0, {duration: 20});
      // setBottom(0);
    });
  }, []);
  return (
    <KeyboardProvider>
      <KeyboardAvoidingView
        enabled={true}
        keyboardVerticalOffset={500}
        style={{
          position: 'relative',
          padding: 22,
          // flex: 1,
          height: '100%',
          // justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            marginTop: 100,
            fontWeight: '500',
          }}>
          react-native-keyboard-controller
        </Text>
        <View>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#7C7C7C"
            style={{
              height: 45,
              borderColor: '#000000',
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 36,
              paddingLeft: 10,
            }}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#7C7C7C"
            style={{
              height: 45,
              borderColor: '#000000',
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 36,
              paddingLeft: 10,
            }}
          />
          <TouchableOpacity
            style={{
              marginTop: 40,
              height: 45,
              borderRadius: 10,
              backgroundColor: 'rgb(40, 64, 147)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              width.value = withTiming(366);
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: 'white',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: width,
          // width: width,
          left: 0,
          width: '100%',
        }}>
        <KeyboardToolbar
          onPrevCallback={() => {
            console.log('zzc onPrevCallback');
          }}
          onNextCallback={() => {
            console.log('zzc onNextCallback');
          }}
          onDoneCallback={() => {
            console.log('zzc done');
          }}
          doneText={'zzc'}
        />
      </Animated.View>
    </KeyboardProvider>
  );
}

export default App;
