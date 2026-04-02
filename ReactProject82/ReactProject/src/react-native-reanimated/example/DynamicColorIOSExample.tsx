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

import React, { useEffect } from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  DynamicColorIOS,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// import { IS_IOS } from '@/utils';
const IS_IOS = true;
const LIGHT_COLORS = ['#38acdd', '#57b495'];
const DARK_COLORS = ['#b58df1', '#ff6259'];

const getDynamicColors = () => {
  return {
    // background: DynamicColorIOS({ light: '#E3E6EA', dark: '#2a2a2a' }),
    background:"#2a2a2a"
  };
};

const Swatches = ({
  colors,
  label,
}: {
  colors: ColorValue[];
  label: string;
}) => {
  const dynamicColors = getDynamicColors();
  return (
    <>
      <Text style={[styles.paragraph, { color: dynamicColors.background }]}>
        {label}
      </Text>
      <View style={styles.swatchesContainer}>
        <View style={[styles.swatch, { backgroundColor: colors[0] }]} />
        <View style={[styles.swatch, { backgroundColor: colors[1] }]} />
      </View>
    </>
  );
};

const Description = ({
  colors,
}: {
  colors: ReturnType<typeof getDynamicColors>;
}) => (
  <>
    <Text style={[styles.header, { color: colors.background }]}>
      What is DynamicColorIOS?
    </Text>
    <Text style={[styles.paragraph, { color: colors.background }]}>
      DynamicColorIOS is a way to define colors that automatically adapt to
      light and dark mode on iOS.
    </Text>
    <Text style={[styles.header, { color: colors.background }]}>
      What this example does?
    </Text>
    <Text style={[styles.paragraph, { color: colors.background }]}>
      This example should interpolate between two colors. After toggling
      appearance of the phone the two interpolated colors should change to
      adequate dark version. The interpolate should not affect other animations.
    </Text>
  </>
);

function Example() {
  const progress = useSharedValue(0);
  const width = useSharedValue(100);
  const dynamicColors = getDynamicColors();

  useEffect(() => {
    const interval = setInterval(() => {
      progress.value = withTiming(progress.value === 0 ? 1 : 0);
      width.value = withTiming(width.value === 100 ? 200 : 100);
    }, 2000);
    return () => clearInterval(interval);
  }, [progress, width]);

  const animatedStyle = useAnimatedStyle(() => {
    const lightColor = interpolateColor(progress.value, [0, 1], LIGHT_COLORS);
    const darkColor = interpolateColor(progress.value, [0, 1], DARK_COLORS);

    return {
      width: width.value,
      backgroundColor: DynamicColorIOS({
        light: lightColor,
        dark: darkColor,
        highContrastLight: lightColor,
        highContrastDark: darkColor,
      }),
      // backgroundColor:lightColor
    };
  });

  return (
    <View
      style={[styles.container, { backgroundColor: dynamicColors.background  }]}>
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: dynamicColors.background },
        ]}>
        {/* <Description colors={dynamicColors} />
        <Swatches colors={LIGHT_COLORS} label="Light mode colors" />
        <Swatches colors={DARK_COLORS} label="Dark mode colors" /> */}
      </View>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
}

export default function DynamicColorIOSExample() {
  if (!IS_IOS) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          DynamicColorIOS is only supported on iOS.
        </Text>
      </View>
    );
  }
  return <Example />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  paragraph: {
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  swatchesContainer: {
    flexDirection: 'row',
    gap: '10',
    width: '100%',
  },
  swatch: {
    height: 30,
    width: 30,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 10,
  },
  box: {
    height: 100,
    width: 100,
  },
});
