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

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from '@react-native-ohos/react-native-reanimated';

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const cardSize = 200;
const cardMargin = 10;
const cardInterval = cardSize + cardMargin * 2;

export default function InvertedFlatListExample() {
  return (
    <>
      <List />
      <List horizontal />
    </>
  );
}

function List({ horizontal }: { horizontal?: boolean }) {
  const [scrollViewSize, setScrollViewSize] = React.useState(200);
  const scrollPosition = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        scrollPosition.value = horizontal
          ? event.contentOffset.x
          : event.contentOffset.y;
      },
      onBeginDrag: () => {
        isScrolling.value = true;
      },
      onEndDrag: () => {
        isScrolling.value = false;
      },
    },
    [horizontal]
  );

  const inset = (scrollViewSize - cardInterval) / 2;
  const containerPadding = horizontal
    ? { paddingHorizontal: inset }
    : { paddingVertical: inset };

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, containerPadding]}
      inverted
      snapToInterval={cardInterval}
      decelerationRate="fast"
      horizontal={horizontal}
      data={digits}
      renderItem={({ item, index }) => (
        <Item index={index} item={item} scrollPosition={scrollPosition} />
      )}
      onScroll={scrollHandler}
      scrollEventThrottle={1}
      onLayout={(event) =>
        setScrollViewSize(
          horizontal
            ? event.nativeEvent.layout.width
            : event.nativeEvent.layout.height
        )
      }
    />
  );
}

function Item({
  item,
  index,
  scrollPosition,
}: {
  item: number;
  index: number;
  scrollPosition: Animated.SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollPosition.value,
            [
              (index - 1) * cardInterval,
              index * cardInterval,
              (index + 1) * cardInterval,
            ],
            [0, 1, 0],
            'clamp'
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.card, style]}>
      <Text style={styles.text}>{item}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: "white",
    margin: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  card: {
    width: cardSize,
    height: cardSize,
    backgroundColor: 'red',
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 1,
    margin: cardMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: "green"
  },
});