import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  useAnimatedReaction,
  runOnUI
} from '@react-native-ohos/react-native-reanimated';

export default function SharedValueDemo() {
  const setValue = useSharedValue(100);
  const [setDisplay, setSetDisplay] = React.useState(setValue.value);

  const modifyValue = useSharedValue(100);
  const [modifyDisplay, setModifyDisplay] = React.useState(modifyValue.value);

  const listenerValue = useSharedValue(100);
  const [listenerDisplay, setListenerDisplay] = React.useState(listenerValue.value);
  const listenerIdRef = useRef(null);

  const animatedValue = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedValue.value,
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 10,
  }));

  useEffect(() => {
    runOnUI(() => {
      'worklet';
      const LISTENER_ID = 1;
      listenerIdRef.current = LISTENER_ID;
      listenerValue.addListener(listenerIdRef.current, (value) => {
        'worklet';
        console.log('Listener 触发:', value);
        runOnJS(setListenerDisplay)(value);
      });

      console.log('Listener 已添加，ID:', listenerIdRef.current);
    })();

    return () => {
      runOnUI(() => {
        'worklet';
        listenerValue.removeListener(1);
        console.log('Listener 已移除，ID: 1');
      })();
    };
  }, []);

  const handleSetPress = () => {
    setValue.set(setValue.value + 50);
    console.log('After get():' + setValue.get())
    setSetDisplay(setValue.value);
    console.log('After set():', setValue.value);
  };

  const handleModifyPress = () => {
    runOnUI(() => {
      'worklet';
      modifyValue.modify((v) => {
        const newValue = v + 30;
        runOnJS(setModifyDisplay)(newValue);
        return newValue;
      });
      console.log('UI Thread Log:', modifyValue.value);
    })();
  };

  const handleListenerPress = () => {
    listenerValue.value = listenerValue.value + 20;
    console.log('Listener value changed:', listenerValue.value);
  };

  const handleAnimatePress = () => {
    animatedValue.value = withTiming(animatedValue.value + 50, { duration: 500 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Animated Value (对比):</Text>
      <Animated.View style={animatedStyle} />
      <Button title="Animate +50" onPress={handleAnimatePress} />

      <Text style={styles.label}>set() 测试: {setDisplay}</Text>
      <Button title="set +50" onPress={handleSetPress} />

      <Text style={styles.label}>modify() 测试: {modifyDisplay}</Text>
      <Button title="modify +30" onPress={handleModifyPress} />

      <Text style={styles.label}>listener 测试: {listenerDisplay}</Text>
      <Button title="listener +20" onPress={handleListenerPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
});
