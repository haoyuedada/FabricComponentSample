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

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { memo, useCallback } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, StyleSheet, View,Text } from 'react-native';
import type {
  CSSTransitionProperties,
  StyleProps,
} from 'react-native-reanimated';
import Animated, { LinearTransition } from 'react-native-reanimated';

import {
  CodeBlock
} from '../../layout/CodeBlock';
import ConfigWithOverridesBlock from '../../layout/ConfigWithOverridesBlock';
import type { ExampleItemProps } from '../../Animations/ReanimatedExampleProps';
import { stringifyConfig } from '../../util/utils';
import { colors, flex, radius, sizes, spacing } from '../../util/theme';
import { iconSizes } from '../../util/theme/icons';

type TransitionConfigurationProps = {
  transitionProperties: Partial<CSSTransitionProperties>;
  transitionStyles: Array<StyleProps>;
  stylesTitle?: string;
  settingsTitle?: string;
  overrides?: Array<ExampleItemProps>;
};


function TransitionConfiguration({
  overrides,
  settingsTitle = 'Transition settings',
  stylesTitle = 'Transition styles',
  transitionProperties,
  transitionStyles,
}: TransitionConfigurationProps) {
  const renderItem = useCallback<ListRenderItem<StyleProps>>(
    ({ item }) => (
      <View style={styles.codeBlock}>
        <CodeBlock code={stringifyConfig(item)} />
      </View>
    ),
    []
  );

  const renderSeparator = useCallback(
    () => (
      <View style={styles.listSeparator}>
        <FontAwesomeIcon
          color={colors.primary}
          icon={faArrowRight}
          size={iconSizes.md}
        />
      </View>
    ),
    []
  );

  return (
    <Animated.View layout={LinearTransition} style={styles.container}>
      <View style={styles.section}>
        <Text >{stylesTitle}</Text>
        <FlatList
          contentContainerStyle={styles.codeStylesList}
          data={transitionStyles}
          ItemSeparatorComponent={renderSeparator}
          // TODO - remove once react-native-screens are updated to the
          // version where this issue is fixed
          // https://github.com/software-mansion/react-native-screens/issues/2339
          removeClippedSubviews={false}
          renderItem={renderItem}
          horizontal
        />
      </View>

      <Animated.View layout={LinearTransition} style={styles.section}>
        <Text >{settingsTitle}</Text>
        <ConfigWithOverridesBlock
          overrides={overrides}
          sharedConfig={transitionProperties}
        />
      </Animated.View>
    </Animated.View>
  );
}

export default memo(TransitionConfiguration);

const styles = StyleSheet.create({
  codeBlock: {
    backgroundColor: colors.background2,
    borderRadius: radius.sm,
    padding: spacing.xs,
  },
  codeStylesList: {
    ...flex.center,
    paddingBottom: spacing.sm,
  },
  container: {
    gap: spacing.xxs,
  },
  listSeparator: {
    ...flex.center,
    padding: spacing.xs,
  },
  section: {
    gap: spacing.xs,
    overflow: 'hidden',
  },
});
