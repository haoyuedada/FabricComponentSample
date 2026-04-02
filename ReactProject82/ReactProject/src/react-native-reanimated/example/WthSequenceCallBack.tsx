/**
 * MIT License
 *
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useCallback, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  ReduceMotion,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';

export default function WthSequenceCallBack() {
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [step, setStep] = useState(1);

  const fadeAnimation = useSharedValue(1);

  const fadeToStep = useCallback(
    (nextStep: any) => {
      console.log('WthSequenceCallBack nextStep', nextStep);
      fadeAnimation.value = withSequence(
        withTiming(
          0.1,
          {
            duration: 500,
            reduceMotion: disableAnimations
              ? ReduceMotion.Always
              : ReduceMotion.Never,
          },
          () => {
            runOnJS(setStep)(nextStep);
            console.log('WthSequenceCallBack first withTiming');
          }
        ),
        withTiming(
          2,
          {
            duration: 500,
          },
          () => {
            console.log('-------');
            console.log('WthSequenceCallBack third withTiming');
          }
        ),
        withTiming(
          4,
          {
            duration: 500,
            reduceMotion: disableAnimations
              ? ReduceMotion.Always
              : ReduceMotion.Never,
          },
          () => {
            console.log('-------');
            console.log('WthSequenceCallBack fourth withTiming');
          }
        )
      );
    },
    [fadeAnimation, disableAnimations]
  );
  const fadeToNextStep = () => {
    fadeToStep(step + 1);
  };
  const fadeAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
    };
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={fadeToNextStep}>
          <Text>Go to next step of onboarding</Text>
        </TouchableOpacity>

        <Animated.Text style={[styles.step, fadeAnimatedStyles]}>
          Step #{step}
        </Animated.Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setDisableAnimations(!disableAnimations)}>
          <Text>Toggle Animations</Text>
        </TouchableOpacity>
        {disableAnimations && (
          <Text>
            {' '}
            Animations are disabled, callback should still trigger but it
            doesn't{' '}
          </Text>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  step: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',

    marginHorizontal: 40,
    marginVertical: 5,
    backgroundColor: '#aeb',
    height: 20,
  },
});