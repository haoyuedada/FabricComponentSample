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

import type { JSX, ReactNode } from 'react';
import { useMemo } from 'react';
import type {
  CSSTransitionProperties,
  StyleProps,
} from 'react-native-reanimated';
import { ScrollView, StyleSheet, View} from 'react-native';
import type { LabelType } from '../layout/Label';
import {
  Section
} from '../layout/Section';
import Stagger from '../../layout/Stagger';
import { TransitionConfiguration } from '../components';

import type { ExampleItemProps } from './ExamplesListCard';
import ExamplesListCard from './ExamplesListCard';

type ExampleCardsSection = {
  title: string;
  items: Array<ExampleItemProps>;
  description?: ReactNode;
  labelTypes?: Array<LabelType>;
};

type ExampleScreenContentProps = {
  transitionProperties: Partial<CSSTransitionProperties>;
  cards: Array<ExampleCardsSection>;
  transitionStyles: Array<StyleProps>;
  displayStyleChanges?: boolean;
  renderExample: (
    transition: CSSTransitionProperties,
    style: StyleProps
  ) => JSX.Element;
};

function ExampleScreenContent({
  cards,
  displayStyleChanges = false,
  renderExample,
  transitionProperties,
  transitionStyles,
}: ExampleScreenContentProps) {
  const configOverrides = useMemo(
    () => cards.flatMap((card) => card.items),
    [cards]
  );

  return (
    <ScrollView withBottomBarSpacing>
      <Stagger>
        {cards.map((card, index) => (
          <Section
            description={card.description}
            key={index}
            labelTypes={card.labelTypes}
            title={card.title}>
            <ExamplesListCard
              displayStyleChanges={displayStyleChanges}
              items={card.items}
              renderExample={renderExample}
              transitionProperties={transitionProperties}
              transitionStyles={transitionStyles}
            />
          </Section>
        ))}

        <Section
          description="Transition configuration consists of the style changes that will be animated and the transition settings."
          title="Transition configuration">
          <TransitionConfiguration
            overrides={configOverrides}
            transitionProperties={transitionProperties}
            transitionStyles={transitionStyles}
          />
        </Section>
      </Stagger>
    </ScrollView>
  );
}

type ExampleScreenProps =
  | {
      tabs: Array<
        {
          name: string;
        } & ExampleScreenContentProps
      >;
    }
  | ExampleScreenContentProps;

export default function ExampleScreen(props: ExampleScreenProps) {

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <ExampleScreenContent {...props} />
    </View>
  );
}
