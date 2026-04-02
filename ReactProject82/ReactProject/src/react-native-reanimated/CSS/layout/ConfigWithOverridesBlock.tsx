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

import { StyleSheet, View } from 'react-native';

import { getCodeWithOverrides } from '../util/utils';
import { colors, radius, spacing } from '../util/theme';
import type { AnyRecord } from '../util/types';
import { typedMemo } from '../util/utils';

import { CodeBlock } from './CodeBlock';

type ConfigWithOverridesBlockProps<C, O> = {
  sharedConfig: C;
  overrides?: Array<O>;
};

function ConfigWithOverridesBlock<C extends AnyRecord, O extends AnyRecord>({
  overrides,
  sharedConfig,
}: ConfigWithOverridesBlockProps<C, O>) {
  const code = getCodeWithOverrides(sharedConfig, overrides, ['label']);

  return (
    <View style={styles.codeBlock}>
      <CodeBlock code={code} />
    </View>
  );
}

const styles = StyleSheet.create({
  codeBlock: {
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    padding: spacing.xs,
  },
});

export default typedMemo(ConfigWithOverridesBlock);
