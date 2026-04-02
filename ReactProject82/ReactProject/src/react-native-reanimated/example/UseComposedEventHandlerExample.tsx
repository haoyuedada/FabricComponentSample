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

import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useComposedEventHandler,
  runOnJS
} from 'react-native-reanimated';

function ComposedEventHandlerExample() {
  const [offset,setOffset] = React.useState("0");
  const [offset2,setOffset_] = React.useState("0");
  const onScrollHandler1 = useAnimatedScrollHandler({
    onScroll(e) {
      console.log('Handler 1 - Scroll Y:', e.contentOffset.y);
      runOnJS(setOffset)("Handler 1 - Scroll Y"+e.contentOffset.y);
    },
  });

  const onScrollHandler2 = useAnimatedScrollHandler({
    onScroll(e) {
      console.log('Handler 2 - Scroll event detected');
      runOnJS(setOffset_)("Handler 2 - Scroll Y"+e.contentOffset.y);
    },
  });

  const composedHandler = useComposedEventHandler([
    onScrollHandler1,
    onScrollHandler2,
  ]);

  const Content = () => (
    <>
      {Array.from({ length: 30 }).map((_, i) => (
        <View key={i} style={styles.item}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{i + 1}</Text>
          </View>
          <Text style={styles.itemText}>Item {i + 1}</Text>
        </View>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={{width:'100%',height:30}}>onScrollHandler1输出：{offset}</Text>
      <Text style={{width:'100%',height:30}}>onScrollHandler2输出：{offset2}</Text>
      <Animated.ScrollView
        style={styles.scroll}
        onScroll={composedHandler}
        scrollEventThrottle={16}
      >
        <Content />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff'
  },
  scroll: { 
    flex: 1 
  },
  item: { 
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexDirection: 'row',
    alignItems: 'center'
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  numberText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  itemText: {
    color: '#000',
    fontSize: 16
  }
});

export default ComposedEventHandlerExample;