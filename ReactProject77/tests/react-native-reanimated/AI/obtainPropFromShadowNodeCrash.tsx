import React from 'react';
import {View, StyleSheet, findNodeHandle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  getViewProp,
} from 'react-native-reanimated';

export default function App() {
  const offset = useSharedValue(0);
  const viewRef = React.useRef(null);

  React.useEffect(() => {
    offset.value = withTiming(100, {duration: 1000});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{translateX: offset.value}],
    };
  });

  React.useEffect(() => {
    if (viewRef.current) {
      const viewTag = findNodeHandle(viewRef.current);
      if (viewTag) {
        getViewProp(viewTag, 'width', viewRef.current)
          .then(width => {
            console.log('width:', width);
          })
          .catch(err => {
            console.error('getViewProp error:', err);
          });
        getViewProp(viewTag, 'height', viewRef.current)
          .then(height => {
            console.log('height:', height);
          })
          .catch(err => {
            console.error('getViewProp error:', err);
          });
        getViewProp(viewTag, 'opacity', viewRef.current)
          .then(opacity => {
            console.log('opacity:', opacity);
          })
          .catch(err => {
            console.error('getViewProp error:', err);
          });
        getViewProp(viewTag, 'backgroundColor', viewRef.current)
          .then(bgColor => {
            console.log('backgroundColor:', bgColor);
          })
          .catch(err => {
            console.error('getViewProp error:', err);
          });
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        ref={viewRef}
        style={[styles.box, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});