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

import React, { useState, useRef, Dispatch } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  LinearTransition,
  SequencedTransition,
  FadingTransition,
  FadeOut,
  JumpingTransition,
  CurvedTransition,
  EntryExitTransition,
  FlipOutYLeft,
  FlipInEasyY,
  Easing,
} from 'react-native-reanimated';

const INITIAL_LIST = [
  { id: 1, emoji: '1', color: '#b58df1' },
  { id: 2, emoji: '2', color: '#ffe780' },
  { id: 3, emoji: '3', color: '#fa7f7c' },
  { id: 4, emoji: '4', color: '#82cab2' },
  { id: 5, emoji: '5', color: '#fa7f7c' },
  { id: 6, emoji: '6', color: '#b58df1' },
  { id: 7, emoji: '7', color: '#ffe780' },
  { id: 8, emoji: '8', color: '#b58df1' },
  { id: 9, emoji: '9', color: '#82cab2' },
];

interface TRANSITION {
  label: string;
  value: any;
}

const LAYOUT_TRANSITIONS = [
  { label: 'Linear Transition', value: LinearTransition },
  { label: 'Sequenced Transition', value: SequencedTransition },
  { label: 'Fading Transition', value: FadingTransition },
  { label: 'Jumping Transition', value: JumpingTransition },
  {
    label: 'Curved Transition',
    value: CurvedTransition.easingX(Easing.sin).easingY(Easing.exp),
  },
  {
    label: 'Entry/Exit Transition',
    value: EntryExitTransition.entering(FlipInEasyY).exiting(FlipOutYLeft),
  },
];

interface SelectProps {
  value: string;
  onChange: any;
  options: TRANSITION[];
  disabled?: boolean;
  disabledOptions?: string[];
}

const SelectStyling = {
  fontSize: 14,
  color: 'text.secondary',
  backgroundColor: 'background.default',
  borderRadius: 0,
  '& fieldset': {
    borderColor: 'text.secondary',
  },
};

export function SelectOption({
  value,
  onChange,
  options,
  disabled,
  disabledOptions,
}: SelectProps) {
  return (
    <View style={{ width: '30%', backgroundColor: 'background.default' }}>
      <Text>Select an option</Text>
    </View>
  );
}

export default function App() {
  const [items, setItems] = useState(INITIAL_LIST);
  const [selected, setSelected] = useState(LAYOUT_TRANSITIONS[0]);

  const removeItem = (idToRemove) => {
    const updatedItems = items.filter((item) => item.id !== idToRemove);
    setItems(updatedItems);
  };

  const onSelect = (item) => {
    setSelected(item);
    setItems(INITIAL_LIST);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdownContainer}>
        <SelectOption
          value={selected.value}
          onChange={onSelect}
          options={LAYOUT_TRANSITIONS}
        />
      </View>
      <View>
        <Items selected={selected} items={items} onRemove={removeItem} />
      </View>
    </SafeAreaView>
  );
}

function Items({ selected, items, onRemove }) {
  return (
    <View style={styles.gridContainer}>
      {items.map((item) => (
        <Animated.View
          key={item.id}
          layout={selected.value}
          exiting={FadeOut}
          style={[styles.tileContainer, { backgroundColor: item.color }]}>
          <Tile emoji={item.emoji} onRemove={() => onRemove(item.id)} />
        </Animated.View>
      ))}
    </View>
  );
}

function Tile({ emoji, onRemove }) {
  return (
    <TouchableOpacity onPress={onRemove} style={styles.tile}>
      <Animated.Text style={styles.tileLabel}>{emoji}</Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    width: 'auto',
    display: 'flex',
    minHeight: 300,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tileContainer: {
    width: '20%',
    margin: '1%',
    borderRadius: 16,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    flex: 1,
    height: '100%',
    width: ' 100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileLabel: {
    color: '#f8f9ff',
    fontSize: 24,
  },
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
});
