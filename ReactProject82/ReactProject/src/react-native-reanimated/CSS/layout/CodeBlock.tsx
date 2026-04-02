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

// TODO: Maybe replace with react-native-live-markdown with custom parser
// to add text highlighting

import { useEffect, useMemo, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View,Text,ScrollView } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  LayoutAnimationConfig,
} from 'react-native-reanimated';

import { colors, radius, spacing } from '../util/theme';

type CodeBlockProps = {
  code: string;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
};

export function CodeBlock({ code, scrollable = true, style }: CodeBlockProps) {
  const formattedCode = useMemo(() => {
    // Remove empty lines at the beginning and end
    const result = code.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
    // trim whitespace from the left to the first character (in any line)
    const firstChar = result.search(/\S|$/);
    return result.replace(new RegExp(`^ {${firstChar}}`, 'gm'), '');
  }, [code]);

  const content = (
    <Text>
      {formattedCode.split('\n').map((line, index) => (
        <Text key={index}>
          {index > 0 && '\n'}
          {line}
        </Text>
      ))}
    </Text>
  );

  return scrollable ? (
    <ScrollView contentContainerStyle={[styles.codeContainer, style]} horizontal>
      {content}
    </ScrollView>
  ) : (
    <View style={[styles.codeContainer, style]}>{content}</View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    padding: spacing.xs,
  },
  codeContainer: {
    paddingBottom: spacing.sm,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
