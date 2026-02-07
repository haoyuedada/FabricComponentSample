import React, {useRef} from 'react';
import {Animated, FlatListProps} from 'react-native';
import {useCustomFlatListHook} from './hooks/useRestaurantListHook';

type StickyHeaderFlatListProps<T> = Omit<
  FlatListProps<T>,
  'ListHeaderComponent'
> & {
  /**
   * 列表头组件，滚动时会隐藏
   */
  HeaderComponent?: React.JSX.Element;
  /**
   * An element that is above the list but lower than {@link Props.HeaderComponent HeaderComponent} and has the property sticky
   *
   * 吸顶组件，滚动是会吸顶到顶部
   */
  StickyElementComponent?: React.JSX.Element;
  /**
   * An element that is higher than the list but lower than {@link Props.HeaderComponent HeaderComponent} and {@link Props.StickyElementComponent StickyElementComponent}
   *
   * 列表顶部横向滚动区域，滚动时会隐藏
   */
  TopListElementComponent?: React.JSX.Element;
};

function StickyHeaderFlatList<T>({
  ...props
}: StickyHeaderFlatListProps<T>): React.ReactNode {
  const listRef = useRef<Animated.FlatList<T> | null>(null);

  const [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutTopStickyElement,
  ] = useCustomFlatListHook();

  return (
    <>
      {props.StickyElementComponent && (
        <Animated.View // <-- Sticky Component
          style={styles.stickyElement}
          onLayout={onLayoutTopStickyElement}>
          {props.StickyElementComponent}
        </Animated.View>
      )}

      {props.TopListElementComponent && (
        <Animated.View // <-- Top of List Component
          style={styles.topElement}
          onLayout={onLayoutTopListElement}>
          {props.TopListElementComponent}
        </Animated.View>
      )}

      <Animated.FlatList<any>
        ref={listRef}
        {...props}
        ListHeaderComponent={
          // <-- Header Component
          props.HeaderComponent && (
            <Animated.View onLayout={onLayoutHeaderElement}>
              {props.HeaderComponent}
            </Animated.View>
          )
        }
        ListHeaderComponentStyle={
          props.HeaderComponent && [
            props.ListHeaderComponentStyle,
            styles.header,
          ]
        }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
      />
    </>
  );
}

export default StickyHeaderFlatList;
