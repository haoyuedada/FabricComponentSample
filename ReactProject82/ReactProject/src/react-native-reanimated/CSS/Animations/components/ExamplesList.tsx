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

import type { ComponentType, JSX } from 'react';
import type { CSSAnimationProperties } from 'react-native-reanimated';
import {type ViewStyle, type Text, View} from 'react-native';
import { stringifyConfig } from '../../util/utils';
import type { AnyRecord, PlainStyle } from '../../util/types';


import { Section } from '../../Transitions/layout/Section';
import type { LabelType } from '../../util/misc';
import type { ExampleCardProps } from './ExampleCard';
import ExampleCard from './ExampleCard';
import Scroll from '../../layout/Scroll';
export type ExamplesListProps<P extends AnyRecord, S extends AnyRecord> = Pick<
  ExampleProps<P, S>,
  'buildAnimation' | 'renderExample'
> & {
  CardComponent?: ComponentType<ExampleCardProps>;
  sections: Array<{
    title: string;
    description?: Array<string> | string;
    labelTypes?: Array<LabelType>;
    CardComponent?: ComponentType<ExampleCardProps>;
    examples: Array<
      {
        CardComponent?: ComponentType<ExampleCardProps>;
      } & Omit<ExampleCardProps, 'children' | 'code' | 'collapsedCode'> &
        P
    >;
  }>;
};

export default function ExamplesList<
  P extends AnyRecord,
  S extends AnyRecord = PlainStyle,
>({
  CardComponent = ExampleCard,
  buildAnimation,
  renderExample,
  sections,
}: ExamplesListProps<P, S>) {
  return (
    <Scroll withBottomBarSpacing>
      {sections.map(
        (
          { CardComponent: SectionCardComponent, examples, ...sectionProps },
          index
        ) => (
          <Section {...sectionProps} key={index}>
            {examples.map((exampleProps, exampleIndex) => (
              <Example
                {...exampleProps}
                buildAnimation={buildAnimation}
                key={exampleIndex}
                renderExample={renderExample}
                CardComponent={
                  exampleProps.CardComponent ??
                  SectionCardComponent ??
                  CardComponent
                }
              />
            ))}
          </Section>
        )
      )}
    </Scroll>
  );
}

type ExampleProps<P, S extends AnyRecord> = {
  CardComponent: ComponentType<ExampleCardProps>;
  denseCode?: boolean;
  buildAnimation: (props: P) => CSSAnimationProperties<S>;
  renderExample: (
    props: Omit<P, 'animation'> & { animation: CSSAnimationProperties<S> }
  ) => JSX.Element;
} & Omit<ExampleCardProps, 'code'> &
  P;

function Example<P extends AnyRecord, S extends AnyRecord>({
  CardComponent,
  buildAnimation,
  collapsedExampleHeight,
  denseCode = true,
  description,
  minExampleHeight,
  renderExample,
  showRestartButton,
  title,
  ...rest
}: ExampleProps<P, S>) {
  const userProps = rest as P;
  const animation = buildAnimation(userProps);

  return (
    <CardComponent
      code={stringifyConfig(animation)}
      collapsedCode={stringifyConfig(animation.animationName, denseCode)}
      collapsedExampleHeight={collapsedExampleHeight}
      description={description}
      minExampleHeight={minExampleHeight}
      showRestartButton={showRestartButton}
      title={title}>
      {renderExample({ ...userProps, animation })}
    </CardComponent>
 
  );
}
