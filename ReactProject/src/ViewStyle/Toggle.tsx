import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

const App = () => {
  const [isActive, setIsActive] = useState(false);

  console.log('🚀🚀🚀dz-log 传入的参数',JSON.stringify([
          styles.box,
          isActive ? styles.active : styles.inactive,
          { marginTop: 20 },
        ]));
  
  return (
    <View style={{ padding: 20 }} marginTop={232}>
      <View
        style={[
          styles.box,
          isActive ? styles.active : styles.inactive,
          { marginTop: 20 },
        ]}
      />
      <Button
        title="Toggle Active"
        onPress={() => setIsActive(!isActive)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  box: {
    width: 100,
    height: 100,
  },
  active: {
    backgroundColor: 'red',
  },
  inactive: {
    backgroundColor: 'gray',
  },
});

export default App;