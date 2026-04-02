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

import type { ReactNode } from 'react';
import { Children, useMemo, useState } from 'react';
import { StyleSheet, View ,Button} from 'react-native';
import type { CSSAnimationSettings } from 'react-native-reanimated';
import Animated, { css } from 'react-native-reanimated';
import { colors, radius, sizes, spacing } from '../../util/theme';

const exampleAnimationSettings: CSSAnimationSettings = {
    animationDuration: '3s',
    animationIterationCount: 'infinite',
  };
export  function DimensionsExample() {
    const [state,setState] = useState(true)
    const dimensionsAnimation = useMemo(
      () =>
        css.keyframes({
          '0%': {
            height: sizes.xxs,
            width: sizes.xxs,
          },
          '12.5%': {
            height: sizes.xxs,
            width: 2 * sizes.xxs,
          },
          '37.5%': {
            height: 2 * sizes.xxs,
            width: 2 * sizes.xxs,
          },
          '62.5%': {
            height: 2 * sizes.xxs,
            width: sizes.xxs,
          },
          '87.5%': {
            height: sizes.xxs,
            width: sizes.xxs,
          },
        }),
      []
    );
  
    const startAnimation = () => {
        setState(!state)    ;
      };
    return (
        <View style={{flex:1,backgroundColor:'white',paddingTop:20}}>
          <Button  title={state ? 'paused' : 'running'}  onPress={startAnimation} />
            <Animated.View
                style={[
                styles.box,
                exampleAnimationSettings,
                {
                    animationDirection: 'alternate',
                    animationName: dimensionsAnimation,
                    animationPlayState: state ? 'running' : 'paused',
                },
                ]}
            />
     
        </View>
    );
}

export function InsetsExample() {
    const [state,setState] = useState(true)
    const insetsAnimation = useMemo(
        () =>
        css.keyframes({
            '0%, 100%': {
            left: '50%',
            top: 0,
            transform: [{ translateX: '-50%' }],
            },
            '25%': {
            left: '100%',
            top: '50%',
            transform: [{ translateX: '-100%' }, { translateY: '-50%' }],
            },
            '50%': {
            left: '50%',
            top: '100%',
            transform: [{ translateX: '-50%' }, { translateY: '-100%' }],
            },
            '75%': {
            left: 0,
            top: '50%',
            transform: [{ translateY: '-50%' }],
            },
        }),
        []
    );
    const startAnimation = () => {
        setState(!state)    ;
      };
    return (
        <View style={StyleSheet.absoluteFill}>
         <Button  title={state ? 'running' : 'paused'}  onPress={startAnimation} />
        <Animated.View
            style={[
            styles.box,
            exampleAnimationSettings,
            {
                animationName: insetsAnimation,
                animationPlayState: state ? 'running' : 'paused',
                animationTimingFunction: 'linear',
            },
            ]}
        />
        </View>
    );
}

export function TransformsExample() {
    const [state,setState] = useState(true)
    const transformsAnimation = useMemo(
        () =>
        css.keyframes({
            '0%': {
            transform: [{ rotate: '0deg' }, { scaleX: 1 }, { skewX: '0deg' }],
            },
            '25%': {
            transform: [{ rotate: '90deg' }, { scaleX: 1.2 }, { skewX: '10deg' }],
            },
            '50%': {
            transform: [{ rotate: '180deg' }, { scaleX: 2 }, { skewX: '0deg' }],
            },
            '75%': {
            transform: [
                { rotate: '270deg' },
                { scaleX: 1.2 },
                { skewX: '-10deg' },
            ],
            },
            '100%': {
            transform: [{ rotate: '360deg' }, { scaleX: 1 }, { skewX: '0deg' }],
            },
        }),
        []
    );
    const startAnimation = () => {
        setState(!state)    ;
    };
    return (
        <View style={{flex:1}} >
        <Button  title={state ? 'running' : 'paused'}  onPress={startAnimation}  />
        <Animated.View
        style={[
            styles.box,
            exampleAnimationSettings,
            {
            animationName: transformsAnimation,
            animationPlayState: state ? 'running' : 'paused',
            },
        ]}
        />
        </View>
    );
}

export function ColorsExample() {
    const [state,setState] = useState(true)
    const startAnimation = () => {
        setState(!state)    ;
    };
const colorsAnimation = useMemo(
    () =>
    css.keyframes({
        '0%, 100%': {
        backgroundColor: "red",
        },
        '25%': {
        backgroundColor: "yellow",
        },
        '75%': {
        backgroundColor: "blue",
        },
    }),
    []
);

return (
    <View style={{flex:1}}>
        <Button  title={state ? 'running' : 'paused'}  onPress={startAnimation} />
        <Animated.View
        style={[
            styles.box,
            exampleAnimationSettings,
            {
            animationName: colorsAnimation,
            animationPlayState: state ? 'running' : 'paused',
            },
        ]}
        />  
    </View>
);
}

export function BorderRadiusExample() {
    const [state,setState] = useState(true)
    const startAnimation = () => {
        setState(!state)    ;
    };
const borderRadiusAnimation = useMemo(
    () =>
    css.keyframes({
        '0%, 100%': {
        borderBottomLeftRadius: radius.md,
        borderBottomRightRadius: radius.xs,
        borderTopLeftRadius: radius.xs,
        borderTopRightRadius: radius.lg,
        },
        '25%': {
        borderBottomLeftRadius: radius.lg,
        borderBottomRightRadius: radius.md,
        borderTopLeftRadius: radius.md,
        borderTopRightRadius: radius.xs,
        },
        '50%': {
        borderBottomLeftRadius: radius.xs,
        borderBottomRightRadius: radius.lg,
        borderTopLeftRadius: radius.lg,
        borderTopRightRadius: radius.md,
        },
        '75%': {
        borderBottomLeftRadius: radius.md,
        borderBottomRightRadius: radius.xs,
        borderTopLeftRadius: radius.xs,
        borderTopRightRadius: radius.md,
        },
    }),
    []
);

return (
    <View style={{flex:1}}>
        <Button  title={state ? 'running' : 'paused'}  onPress={startAnimation} />
        <Animated.View
        style={[
            styles.box,
            styles.boxLarge,
            exampleAnimationSettings,
            {
            animationName: borderRadiusAnimation,
            animationPlayState: state ? 'running' : 'paused',
            },
        ]}
        />
    </View>
);
}


const scroll = css.keyframes({
to: {
    transform: [{ translateY: '-50%' }],
},
});

const styles = css.create({
box: {
backgroundColor: colors.primary,
borderRadius: radius.xs,
height: sizes.xxs,
width: sizes.xxs,
},
boxLarge: {
height: sizes.xs,
width: sizes.xs,
},
container: {
flex: 1,
overflow: 'hidden',
width: '100%',
},
example: {
alignItems: 'center',
aspectRatio: 1,
backgroundColor: colors.background1,
borderRadius: radius.sm,
justifyContent: 'center',
overflow: 'hidden',
},
exampleContainer: {
height: sizes.xxxl,
left: '50%',
position: 'absolute',
transform: [
{ translateX: '-50%' },
{ rotate: '5deg' },
{ translateY: -spacing.xs },
],
width: '75%',
},
examples: {
animationIterationCount: 'infinite',
animationName: scroll,
animationTimingFunction: 'linear',
backgroundColor: colors.primaryLight,
gap: spacing.sm,
paddingHorizontal: spacing.sm,
paddingVertical: spacing.sm / 2,
},
});
  