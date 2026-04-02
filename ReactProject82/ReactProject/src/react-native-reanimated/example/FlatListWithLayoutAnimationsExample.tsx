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
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, {
  LayoutAnimationConfig,
  LinearTransition,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';

interface Item {
  id: number;
  color: string;
  title: string;
}

const data = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  color: `hsl(${(i * 10) % 360}, 100%, 90%)`,
  title: `Item ${i + 1}`,
}));

const entering = SlideInLeft.duration(300);
const layout = LinearTransition.duration(300);
const exiting = SlideOutRight.duration(300);

function renderItem({ item }: { item: Item }) {
  return (
    <Animated.Text
      style={{ backgroundColor: item.color }}
      entering={entering}
      layout={layout}
      exiting={exiting}>
      {item.title}
    </Animated.Text>
  );
}

function keyExtractor(item: Item) {
  return String(item.id);
}

export default function FlatListWithLayoutAnimations() {
  const [state, setState] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <LayoutAnimationConfig skipEntering skipExiting>
        <FlatList
          data={state ? data.slice(1) : data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={50}
        />
      </LayoutAnimationConfig>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
