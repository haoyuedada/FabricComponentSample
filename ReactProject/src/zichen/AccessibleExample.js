/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AccessibilityInfoExample from './AccessibilityInfoExample';
import ViewAccessibleExample from './ViewAccessibleExample';
import ButtonAccessibleExample from './ButtonAccessibleExample';
import SafeAreaViewExample from './SafeAreaViewExample';
import SwitchAccessibleExample from './SwitchAccessibleExample';
import TouchableNativeFeedbackAccessibleExample from './TouchableNativeFeedbackAccessibleExample';
import KeyboardAvoidingViewExample from './KeyboardAvoidingViewExample';
import TouchableOpacityExample from './TouchableOpacityExample';
import ScrollViewAccessibleExample from './ScrollViewExample';
import TouchableWithoutFeedbackAccessibleExample from './TouchableWithoutFeedbackAccessibleExample'
import ImageAccessibleExample from './ImageAccessibleExample'
import TextinputAccessibleExample from './TextinputAccessibleExample'
import TouchableOpacityAccessibleExample from './TouchableOpacityAccessible'
import ImageBackgroundAccessibleExample from './ImageBackgroundAccessibleExample'
import TextAccessibleExample from './TextAccessibleExample'
import TouchableHighlightAccessibleExample from './TouchableHighlightAccessibleExample'

export default ({
  framework: 'React',
  title: 'Accessible',
  category: 'UI',
  description:
    'Accessibility actions allow an assistive technology to programmatically invoke the actions of a component.',
  showIndividualExamples: true,
  examples: [
    AccessibilityInfoExample,
    ViewAccessibleExample,
    ButtonAccessibleExample,
    ImageAccessibleExample,
    KeyboardAvoidingViewExample,
    SafeAreaViewExample,
    SwitchAccessibleExample,
    TouchableNativeFeedbackAccessibleExample,
    TouchableOpacityExample,
    ScrollViewAccessibleExample,
    TouchableWithoutFeedbackAccessibleExample,
    TextinputAccessibleExample,
    TouchableOpacityAccessibleExample,
    ImageBackgroundAccessibleExample,
    TextAccessibleExample,
    TouchableHighlightAccessibleExample,
  ],
}: RNTesterModule);
