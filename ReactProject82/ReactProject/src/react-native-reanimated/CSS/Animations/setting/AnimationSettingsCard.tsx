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

import { View } from 'react-native';
import type {
  CSSAnimationDelay,
  CSSAnimationSettings,
} from 'react-native-reanimated';
import Animated, { css } from 'react-native-reanimated';
import { colors, radius, sizes, spacing } from '../../util/theme';

const animationSettings: CSSAnimationSettings = {
    animationDirection: 'alternate',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  };


  function AnimationSettingsCard() {
    const animationPlayState = 'running';
  
    return (
      <View style={styles.container}>
        {Array.from({ length: 6 }).map((_, index) => {
          const animationDelay: CSSAnimationDelay = `${-(6 - index) * 100}ms`;
  
          return (
            <View key={index} style={styles.bar}>
              <View style={styles.barTrack}>
                <Animated.View
                  style={[
                    styles.barTrackInner,
                    { animationDelay, animationPlayState },
                  ]}
                />
              </View>
              <Animated.View
                style={[styles.barThumb, { animationDelay, animationPlayState }]}
              />
            </View>
          );
        })}
      </View>
    );
  }
  
  const barTrackInner = css.keyframes({
    from: {
      height: 0,
    },
    to: {
      height: '100%',
    },
  });
  
  const thumb = css.keyframes({
    from: {
      top: 0,
    },
    to: {
      top: '100%',
    },
  });
  
  const styles = css.create({
    bar: {
      alignItems: 'center',
      height: sizes.lg,
      width: sizes.xxxs,
    },
    barThumb: {
      animationName: thumb,
      backgroundColor: colors.primaryDark,
      borderRadius: radius.full,
      height: sizes.xxxs,
      position: 'absolute',
      transform: [{ translateY: '-50%' }],
      width: sizes.xxxs,
      ...animationSettings,
    },
    barTrack: {
      backgroundColor: colors.primaryLight,
      borderRadius: radius.full,
      height: '100%',
      width: '50%',
    },
    barTrackInner: {
      animationName: barTrackInner,
      backgroundColor: colors.primary,
      borderRadius: radius.full,
      width: '100%',
      ...animationSettings,
    },
    container: {
      flexDirection: 'row',
      gap: spacing.xxs,
      justifyContent: 'center',
      backgroundColor:'white',
      paddingTop:20
    },
  });
  
  export default AnimationSettingsCard;  