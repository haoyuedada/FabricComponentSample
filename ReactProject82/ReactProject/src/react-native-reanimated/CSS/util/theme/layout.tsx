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

import { StyleSheet } from 'react-native';


import { spacing } from './spacing';

const IS_WEB = typeof window !== 'undefined' && window.document;
export const flex = {
  absolute: { position: 'absolute' },
  center: { alignItems: 'center', justifyContent: 'center' },
  fill: { bottom: 0, flex: 1, left: 0, right: 0, top: 0 },
  grow: { flexGrow: 1 },
  row: { flexDirection: 'row' },
  shrink: { flexShrink: 1 },
  wrap: { flexWrap: 'wrap' },
} as const;

const webContainer = {
  marginHorizontal: 'auto',
  maxWidth: '100%',
  width: 600,
} as const;

export const style = StyleSheet.create({
  scrollViewContent: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...(IS_WEB && webContainer),
  },
  webContainer,
});
