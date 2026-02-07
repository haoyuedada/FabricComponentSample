import {useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  ViewStyle,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';

type ICustomFlatListStyles = {
  header: StyleProp<ViewStyle>;
  stickyElement: StyleProp<ViewStyle>;
  topElement?: StyleProp<ViewStyle>;
};

type TUseCustomFlatListHook = [
  Animated.Value,
  ICustomFlatListStyles,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
];

const window = Dimensions.get('window');

export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
  const scrollY = useRef(new Animated.Value(0)).current;
  // 使用3个变量，防止多次set时合并为最后一次的问题，导致设置值不正确
  const [headerHeight, setHeaderHeight] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [topListHeight, setTopListHeight] = useState(0);

  const styles: ICustomFlatListStyles = {
    header: {
      marginBottom: stickyHeight + topListHeight, // <-- In order for the list to be under other elements
    },
    stickyElement: {
      left: 0,
      right: 0,
      marginTop: headerHeight, // <-- In order for the list to be under Header
      position: 'absolute',
      transform: [
        {
          translateY: scrollY.interpolate({
            // <-- To move an element according to the scroll position
            extrapolate: 'clamp',
            inputRange: [-window.height, headerHeight],
            outputRange: [window.height, -headerHeight],
          }),
        },
      ],
      zIndex: 1,
    },
    topElement: {
      marginTop: headerHeight + stickyHeight, // <-- In order for the list to be under other elements
      position: 'absolute',
      transform: [
        {
          translateY: scrollY.interpolate({
            // <-- To move an element according to the scroll position
            extrapolate: 'clamp',
            inputRange: [
              -window.height,
              headerHeight + stickyHeight + topListHeight,
            ],
            outputRange: [
              window.height,
              -(headerHeight + stickyHeight + topListHeight),
            ],
          }),
        },
      ],
      zIndex: 1,
    },
  };

  const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  const onLayoutTopListElement = (event: LayoutChangeEvent): void => {
    setTopListHeight(event.nativeEvent.layout.height);
  };

  const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
    setStickyHeight(event.nativeEvent.layout.height);
  };

  return [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutTopStickyElement,
  ];
};
