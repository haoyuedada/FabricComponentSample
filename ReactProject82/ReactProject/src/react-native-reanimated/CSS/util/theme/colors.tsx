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

const baseColors = {
  black: '#000000',
  white: '#FCFCFF',
};

const accentColors = {
  danger: '#D32F2F',
  primary: '#5F9CC0',
  primaryDark: '#113E60',
  primaryLight: '#C1E0F1',
};

export const labelColors = {
  Android: '#1B7A41',
  iOS: '#003F8A',
  needsFix: '#D32F2F',
  new: '#008080',
  unimplemented: '#4A4E6A',
  unsupported: '#E65100',
  web: '#673AB7',
} as const;

export const colors = {
  background1: baseColors.white,
  background2: '#F4F5F7',
  background3: '#E3E6EA',

  foreground1: '#06196D',
  foreground2: '#35427C',
  foreground3: '#626D8A',

  ...baseColors,
  ...accentColors,
  label: labelColors,
} as const;
