import React, { useRef, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import type {
  EntryAnimationsValues,
  EntryExitAnimationFunction,
  ExitAnimationsValues,
} from 'react-native-reanimated';
import Animated, {
  Layout,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

function AnimatedExampleView() {
    const AnimatedViewRef = useRef(null);
    const enteringAnimation: EntryExitAnimationFunction = (
    targetValues: EntryAnimationsValues
  ) => {
    'worklet';
    const animations = {
      originX: withTiming(targetValues.targetOriginX, { duration: 2500 }),
      opacity: withTiming(1, { duration: 1500 }),
      borderRadius: withDelay(3000, withTiming(30, { duration: 2500 })),
      transform: [
        { rotate: withTiming('0deg', { duration: 3000 }) },
        { scale: withTiming(1, { duration: 2500 }) },
      ],
    };
    const initialValues = {
      originX: -width,
      opacity: 0,
      borderRadius: 20,
      transform: [{ rotate: '90deg' }, { scale: 0.5 }],
    };
    return {
      initialValues,
      animations,
    };
  };

  const exitingAnimation: EntryExitAnimationFunction = (
    startingValues: ExitAnimationsValues
  ) => {
    'worklet';
    const animations = {
      originX: withTiming(width, { duration: 2000 }),
      opacity: withTiming(0.5, { duration: 1000 }),
    };
    const initialValues = {
      originX: startingValues.currentOriginX,
      opacity: 1,
    };

    return {
      animations,
      initialValues,
    };
  };

  return (
    <Animated.View
      ref={AnimatedViewRef}
      style={styles.animatedView}
      {...{ entering:enteringAnimation, exiting:exitingAnimation, layout: Layout }}>
      <Text> kk </Text>
    </Animated.View>
  );
}

export default function ModalNewExample() {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.reverse}>
      <Button
        title="toggle"
        onPress={() => {
          setShow((last) => !last);
        }}
      />
      <View style={styles.animatedViewContainer}>
        {show && <AnimatedExampleView />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reverse: {
    flexDirection: 'column-reverse',
  },
  animatedViewContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  animatedView: {
    height: 300,
    width: 200,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
