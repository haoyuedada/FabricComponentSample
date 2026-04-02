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
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  scrollTo,
} from '@react-native-ohos/react-native-reanimated';

const ITEM_COUNT = 10;
const ITEM_SIZE = 100;
const ITEM_MARGIN = 10;

const ScrollToExp = () => {
  const aref = useAnimatedRef();
  const scroll = useSharedValue(1);

  useDerivedValue(() => {
    scrollTo(aref, 0, scroll.value * (ITEM_SIZE + 2 * ITEM_MARGIN), true);
  });

  const items = Array.from(Array(ITEM_COUNT).keys());

  const Incrementor = ({ increment }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          scroll.value =
            scroll.value + increment > 0
              ? scroll.value + increment
              : ITEM_COUNT - 1 + increment;

          if (scroll.value >= ITEM_COUNT - 2) scroll.value = 0;
        }}>
        <Text>{`Scroll ${Math.abs(increment)} ${increment > 0 ? 'down' : 'up'
          }`}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Incrementor increment={1} />
      <View
        style={{ width: '100%', height: (ITEM_SIZE + 2 * ITEM_MARGIN) * 2 }}>
        <ScrollView ref={aref} style={{ backgroundColor: 'orange' }}>
          {items.map((_, i) => (
            <View
              key={i}
              style={{
                backgroundColor: 'white',
                aspectRatio: 1,
                width: ITEM_SIZE,
                margin: ITEM_MARGIN,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text style={{ textAlign: 'center' }}>{i}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <Incrementor increment={-1} />
    </View>
  );
};

export default ScrollToExp