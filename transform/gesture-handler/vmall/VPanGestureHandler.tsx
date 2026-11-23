import React, { ReactNode } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerProps } from 'react-native-gesture-handler';

declare module 'react-native-gesture-handler' {
  interface PanGestureHandlerProps {
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
  }
}

export default function VPanGestureHandler({ children, style, ...restProps }: PanGestureHandlerProps) {
  return (
    <PanGestureHandler {...restProps}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
}
