import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { Svg,Path } from 'react-native-svg';

export default function App({ navigation }) {
  return (
        <>
            <Svg 
                style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: 'yello'
                }}>
                <Text>Hello World</Text>
            </Svg>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'grey',
  },
});