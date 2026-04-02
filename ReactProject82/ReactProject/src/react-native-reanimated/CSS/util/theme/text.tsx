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

import type { FontStyle, FontVariant } from '../types';

const BASE_FONT = 'Poppins';
const MONOSPACE_FONT = 'UbuntuMono-Regular';

export const text: Record<FontVariant, FontStyle> = {
  body1: {
    fontFamily: BASE_FONT,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 18,
  },
  body2: {
    fontFamily: BASE_FONT,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 16,
  },
  body3: {
    fontFamily: BASE_FONT,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '100',
    letterSpacing: 0,
    lineHeight: 14,
  },
  code: {
    fontFamily: MONOSPACE_FONT,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 16,
  },
  heading1: {
    fontFamily: BASE_FONT,
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 40,
  },
  heading2: {
    fontFamily: BASE_FONT,
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 30,
  },
  heading3: {
    fontFamily: BASE_FONT,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 26,
  },
  heading4: {
    fontFamily: BASE_FONT,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 24,
  },
  inlineCode: {
    fontFamily: MONOSPACE_FONT,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 18,
  },
  label1: {
    fontFamily: BASE_FONT,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 24,
  },
  label2: {
    fontFamily: BASE_FONT,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 20,
  },
  label3: {
    fontFamily: BASE_FONT,
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 16,
  },
  subHeading1: {
    fontFamily: BASE_FONT,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
  },
  subHeading2: {
    fontFamily: BASE_FONT,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 22,
  },
  subHeading3: {
    fontFamily: BASE_FONT,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 18,
  },
};
