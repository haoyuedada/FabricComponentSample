/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type { RNTesterModuleExample } from '../../types/RNTesterTypes';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import ScrollViewPressableStickyHeaderExample from './ScrollViewPressableStickyHeaderExample';
import nullthrows from 'nullthrows';
import * as React from 'react';
import { useCallback, useState, useRef } from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';

function getScrollViewContent({
  style,
  amountOfChildren = 20,
  onTouchEnd,
  pointerEvents,
}: ScrollViewContentProps) {
  return new Array(amountOfChildren).fill(0).map((_, idx) => {
    return (
      <View
        key={idx}
        style={[
          {
            width: '100%',
            height: 50,
            backgroundColor: idx % 2 ? 'pink' : 'beige',
            justifyContent: 'center',
          },
          style,
        ]}
        pointerEvents={pointerEvents}
        onTouchEnd={onTouchEnd}>
        <Text style={{ textAlign: 'center', height: 15 }}> {idx + 1}</Text>
      </View>
    );
  });
}

const StickyHeaderComponentExample = () => {
  return (
    <View >
      <Text>属性值：{'StickyHeaderComponent={() => <Text>custom sticky header</Text>}'}</Text>
      <Text style={{ marginVertical: 5 }}>预期效果:第一个和第四个元素成为粘性头部，通过将 StickyHeaderComponent 属性设置为一个函数,自定义粘性头部的内容为custom sticky header。</Text>
      <Text>实际效果:</Text>
      <ScrollView
        style={{ height: 200 }}
        stickyHeaderIndices={[0, 3]}
        nestedScrollEnabled
        StickyHeaderComponent={() => <Text>custom sticky header</Text>}>
        {getScrollViewContent({})}
      </ScrollView>
    </View>
  )
};

class Item extends React.PureComponent<{|
  msg?: string,
  style?: ViewStyleProp,
  |}> {
  render(): $FlowFixMe {
    return (
      <View style={[styles.item, this.props.style]}>
        <Text>{this.props.msg}</Text>
      </View>
    );
  }
}

let ITEMS = [...Array(12)].map((_, i) => `Item ${i}`);

const createItemRow = (msg: string, index: number) => (
  <Item key={index} msg={msg} />
);

const Button = (props: {
  active?: boolean,
  label: string,
  onPress: () => void,
  testID?: string,
}) => (
  <TouchableOpacity
    style={StyleSheet.compose(
      styles.button,
      props.active === true ? styles.activeButton : null,
    )}
    onPress={props.onPress}
    testID={props.testID}>
    <Text>{props.label}</Text>
  </TouchableOpacity>
);

const BouncesExample = () => {
  const [bounces, setBounces] = useState(false);
  return (
    <View>
      <Text>属性值:bounces={bounces.toString()}</Text>
      <Text style={{ marginVertical: 5 }}>预期效果:点击按钮后属性值为true,内容比滚动视图大时,到达尾部可以弹性拉伸一截</Text>
      <Text>实际效果:</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        bounces={bounces}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        onPress={() => setBounces(!bounces)}
        label={'Bounces: ' + bounces.toString()}
      />
    </View>
  );
};

function CenterContentList(): React.Node {
  const [centerContent, setCenterContent] = useState(true)
  return (
    <View>
      <Text>属性值:{centerContent.toString()}</Text>
      <Text>预期效果:</Text>
      <Text>如果ScrollView的内容高度小于ScrollView的高度（即内容不足以填满ScrollView，属性值为true时）,内容将在ScrollView中垂直居中显示。</Text>
      <Text>如果ScrollView的内容高度大于ScrollView的高度（即内容超出ScrollView的可视区域，属性值为false时）,内容将按照默认的滚动方式进行显示。</Text>
      <Text>实际效果:</Text>
      <ScrollView
        nestedScrollEnabled
        style={{ backgroundColor: '#eeeeee', height: 200, }}
        centerContent={centerContent}>
        <Text>This should be in center.</Text>
      </ScrollView>
      <Button
        onPress={() => setCenterContent(!centerContent)}
        label={'centerContent: ' + centerContent.toString()}
      />
    </View>
  );
}

const ContentContainerStyleExample = () => {
  const [contentContainerStyle, setContentContainerStyle] = useState < null | {
    backgroundColor: string,
  } > (null);
  return (
    <View>
      <Text>属性值：contentContainerStyle</Text>
      <Text style={{ marginVertical: 5 }}>预期效果:点击setContentContainerStyle按钮切换ScrollView的内容容器样式：变为浅绿色</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        contentOffset={{ x: 100, y: 0 }}
        contentContainerStyle={contentContainerStyle}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Button
          onPress={() =>
            contentContainerStyle === null
              ? setContentContainerStyle(styles.containerStyle)
              : setContentContainerStyle(null)
          }
          label={
            contentContainerStyle === null
              ? 'setContentContainerStyle'
              : 'resetContentContainerStyle'
          }
        />
      </View>
    </View>
  );
};

function ContentOffsetList(): React.Node {
  return (
    <View>
      <Text>属性值：{'contentOffset={{ x: 100, y: 0 }}'}</Text>
      <Text style={{ marginVertical: 5 }}>预期结果：设置初始内容偏移量为100，偏移位置大致为Item1</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 100 }]}
        horizontal={true}
        contentOffset={{ x: 100, y: 0 }}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
    </View>
  );
}

class Item2 extends React.PureComponent<{|
  msg?: string,
  style?: ViewStyleProp,
|}> {
  render(): $FlowFixMe {
    return (
      <View style={[styles.item, this.props.style]}>
        <Text>{this.props.msg}</Text>
      </View>
    );
  }
}

let ITEMS2 = [...Array(100)].map((_, i) => `Item ${i}`);

const createItemRow2 = (msg: string, index: number) => (
  <Item key={index} msg={msg} />
);

const DecelerationRateExample = () => {
  const [decelRate, setDecelRate] = useState('normal');
  return (
    <View>
      <Text>属性值：decelerationRate={decelRate}</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        decelerationRate={decelRate}
        nestedScrollEnabled>
        {ITEMS2.map(createItemRow2)}
      </ScrollView>
      <View style={styles.row}>
        <Button
          onPress={() =>
            setDecelRate(0)
          }
          label={'0'}
        />
        <Button
          onPress={() =>
            setDecelRate('fast')
          }
          label={'fast'}
        />
        <Button
          onPress={() =>
            setDecelRate('normal')
          }
          label={'normal'}
        />
        <Button
          onPress={() =>
            setDecelRate(1)
          }
          label={'1'}
        />
      </View>
    </View>
  );
};

const DisableIntervalMomentumExample = () => {
  const [disableIntervalMomentum, setDisableIntervalMomentum] = useState(false);
  return (
    <View>
      <Text>属性值：disableIntervalMomentum:{disableIntervalMomentum.toString()}</Text>
      <Text>snapToInterval:{8}</Text>
      <Text>预期效果：当值为true时,ScrollView在滚动到snapToInterval的位置时不会继续惯性滚动。</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
        snapToInterval={8}
        disableIntervalMomentum={disableIntervalMomentum}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Button
          onPress={() => setDisableIntervalMomentum(!disableIntervalMomentum)}
          label={
            'setDisableIntervalMomentum: ' + disableIntervalMomentum.toString()
          }
        />
      </View>
    </View>
  );
};

const EndFillColorExample = () => {
  const [endFillColor, setEndFillColor] = useState('');
  return (
    <View>
      <Text>属性值:red</Text>
      <Text style={{ marginVertical: 5 }}>预期效果:点击setEndFillColor后,以红色来填充滚动视图时的多余的空间</Text>
      <Text>实际效果:</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        endFillColor={endFillColor}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={endFillColor === '' ? 'setEndFillColor' : 'resetEndFillColor'}
        onPress={() =>
          endFillColor === '' ? setEndFillColor('red') : setEndFillColor('')
        }
      />
    </View>
  );
};

const HorizontalScrollView = (props: { direction: 'ltr' | 'rtl' }) => {
  const { direction } = props;
  const scrollRef = React.useRef <? React.ElementRef < typeof ScrollView >> ();
  const title = direction === 'ltr' ? 'LTR Layout' : 'RTL Layout';
  return (
    <View style={{ direction }}>
      <Text style={styles.text}>{title}</Text>
      <ScrollView
        ref={scrollRef}
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        style={[styles.scrollView, styles.horizontalScrollView]}
        testID={'scroll_horizontal'}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label="Scroll to start"
        onPress={() => {
          nullthrows < $FlowFixMe > (scrollRef.current).scrollTo({ x: 0 });
        }}
        testID={'scroll_to_start_button'}
      />
      <Button
        label="Scroll to end"
        onPress={() => {
          nullthrows < $FlowFixMe > (scrollRef.current).scrollToEnd({
            animated: true,
          });
        }}
        testID={'scroll_to_end_button'}
      />
    </View>
  );
};

const IndicatorStyle = () => {
  const [indicatorStyle, setIndicatorStyle] = useState('default');
  const [persistentScrollBar, setPersistentScrollBar] = useState(false);
  return (
    <View>
      <Text>属性值：indicatorStyle={indicatorStyle}</Text>
      <Text>预期结果：</Text>
      <Text>1.值为default，显示黑色滚动条</Text>
      <Text>2.值为white，显示白色滚动条</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        indicatorStyle={indicatorStyle}
        persistentScrollbar={persistentScrollBar}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Button
          onPress={() =>
            indicatorStyle === 'default'
              ? setIndicatorStyle('white')
              : setIndicatorStyle('default')
          }
          label={'IndicatorStyle: ' + indicatorStyle}
        />
         <Button
        label={'persistentScrollBar: ' + persistentScrollBar.toString()}
        onPress={() => setPersistentScrollBar(!persistentScrollBar)}
      />
      </View>
    </View>
  );
};

const InvertStickyHeaders = () => {
  const [invertStickyHeaders, setInvertStickyHeaders] = useState(false);
  const _scrollView = React.useRef <? React.ElementRef < typeof ScrollView >> (null);
  return (
    <View>
      <Text>属性值：invertStickyHeaders:{invertStickyHeaders.toString()}</Text>
      <Text>预期效果：</Text>
      <Text>1.当值为true时,粘性头部STICKY HEADER会固定在底部。</Text>
      <Text>2.值为false时，粘性头部STICKY HEADER位于ScrollView的顶部</Text>
      <Text>实际效果：</Text>
      <ScrollView
        ref={_scrollView}
        style={[styles.scrollView, { height: 200 }]}
        stickyHeaderIndices={[0]}
        invertStickyHeaders={invertStickyHeaders}
        nestedScrollEnabled
        testID="scroll_sticky_header">
        {<Text>STICKY HEADER</Text>}
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Button
          onPress={() => setInvertStickyHeaders(!invertStickyHeaders)}
          label={'invertStickyHeaders: ' + invertStickyHeaders.toString()}
        />
        <Button
          label="Scroll to top"
          onPress={() => {
            nullthrows < $FlowFixMe > (_scrollView.current).scrollTo({ y: 0 });
          }}
          testID="scroll_to_top_button"
        />
        <Button
          label="Scroll to bottom"
          onPress={() => {
            nullthrows < $FlowFixMe > (_scrollView.current).scrollToEnd({
              animated: true,
            });
          }}
          testID="scroll_to_bottom_button"
        />
      </View>
    </View>
  );
};

const KeyboardDismissModeExample = () => {
  const [keyboardDismissMode, setKeyboardDismissMode] = useState('none');
  const [textInputValue, setTextInputValue] = useState('Tap to open Keyboard');
  const dismissOptions =
    Platform.OS === 'ios'
      ? ['none', 'on-drag', 'interactive']
      : ['none', 'on-drag'];
  return (
    <View>
      <Text>属性值：keyboardDismissMode:{keyboardDismissMode}</Text>
      <Text>预期效果:</Text>
      <Text>"none"：拖动不会关闭键盘。</Text>
      <Text>"on-drag":拖动开始时，键盘将被解除。</Text>
      <Text>"interactive"（仅适用于iOS）:键盘与拖动交互解除，与触摸同步移动，向上拖动取消解除。</Text>
      <Text>实际效果:</Text>
      <TextInput
        style={styles.textInput}
        value={textInputValue}
        onChangeText={val => setTextInputValue(val)}
      />
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        keyboardDismissMode={keyboardDismissMode}
        nestedScrollEnabled>
        <Button
          onPress={() => console.log('button pressed!')}
          label={'Button'}
        />
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={styles.rowTitle}>Keyboard Dismiss Mode</Text>
      <View style={styles.row}>
        {dismissOptions.map(value => (
          <Button
            active={value === keyboardDismissMode}
            label={value}
            key={value}
            onPress={() => setKeyboardDismissMode(value)}
          />
        ))}
      </View>
    </View>
  );
};

const KeyboardShouldPersistTapsExample = () => {
  const [keyboardShouldPersistTaps, setKeyboardShouldPersistTaps] =
    useState('never');
  const [textInputValue, setTextInputValue] = useState('Tap to open Keyboard');
  const persistOptions = ['never', 'always', 'handled'];
  return (
    <View>
      <Text>属性值：keyboardShouldPersistTaps:{keyboardShouldPersistTaps}</Text>
      <Text>预期效果:</Text>
      <Text>"never":滚动视图将不会拦截触摸事件，点击按钮时键盘会自动关闭。</Text>
      <Text>"always":滚动视图将会拦截触摸事件，但不会影响键盘的状态，点击按钮时键盘不会关闭。</Text>
      <Text>"handled":滚动视图将会拦截触摸事件，并且只有在触摸事件被按钮处理后键盘才会关闭，否则键盘会保持打开状态。</Text>
      <Text>实际效果:</Text>
      <TextInput
        style={styles.textInput}
        value={textInputValue}
        onChangeText={val => setTextInputValue(val)}
      />
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        nestedScrollEnabled>
        <Button
          onPress={() => console.log('button pressed!')}
          label={'Button'}
        />
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={styles.rowTitle}>Keyboard Should Persist taps</Text>
      <View style={styles.row}>
        {persistOptions.map(value => (
          <Button
            active={value === keyboardShouldPersistTaps}
            label={value}
            key={value}
            onPress={() => setKeyboardShouldPersistTaps(value)}
          />
        ))}
      </View>
    </View>
  );
};

let AppendingListItemCount = 6;
class ScrollViewMaintainVisibleContentPosition extends React.Component<
  {},
  { items: Array<React$Element<Class<Item>>> },
> {
  state: { items: Array<React.Element<Class<Item>>> } = {
    items: [...Array(AppendingListItemCount)].map((_, ii) => (
      <Item msg={`Item ${ii}`} />
    )),
  };
  render(): React.Node {
    return (
      <View>
        <Text>属性值:maintainVisibleContentPosition</Text>
        <Text>预期结果：</Text>
        <Text>1.点击 "Add to top" 按钮时,如果添加的内容导致之前的内容下移,ScrollView 会尝试自动滚动到你之前浏览的位置</Text>
        <Text>2.点击 "Remove top" 按钮时,会删除ScrollView顶部的内容,并且 ScrollView 会尝试保持用户之前浏览的位置不变</Text>
        <Text>3.点击 "Change height top" 按钮时,会修改ScrollView顶部内容的高度,并且 ScrollView 会尝试保持用户之前浏览的位置不变</Text>
        <Text>4.点击 "Add to end" 按钮时,会在ScrollView的底部添加新的内容,并且 ScrollView 会尝试保持用户之前浏览的位置不变</Text>
        <Text>5.点击 "Remove end" 按钮时,会删除ScrollView底部的内容,并且 ScrollView 会尝试保持用户之前浏览的位置不变</Text>
        <Text>5.点击 "Change height end" 按钮时,会修改ScrollView底部内容的高度,并且 ScrollView 会尝试保持用户之前浏览的位置不变</Text>
        <Text>实际结果：</Text>
        <ScrollView
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          nestedScrollEnabled
          style={styles.scrollView}>
          {this.state.items.map(item =>
            React.cloneElement(item, { key: item.props.msg }),
          )}
        </ScrollView>
        <ScrollView
          horizontal={true}
          maintainVisibleContentPosition={{
            minIndexForVisible: 1,
            autoscrollToTopThreshold: 10,
          }}
          style={[styles.scrollView, styles.horizontalScrollView]}>
          {this.state.items.map(item =>
            React.cloneElement(item, { key: item.props.msg, style: null }),
          )}
        </ScrollView>
        <View style={styles.row}>
          <Button
            label="Add to top"
            onPress={() => {
              this.setState(state => {
                const idx = AppendingListItemCount++;
                return {
                  items: [
                    <Item style={{ paddingTop: idx * 5 }} msg={`Item ${idx}`} />,
                  ].concat(state.items),
                };
              });
            }}
          />
          <Button
            label="Remove top"
            onPress={() => {
              this.setState(state => ({
                items: state.items.slice(1),
              }));
            }}
          />
          <Button
            label="Change height top"
            onPress={() => {
              this.setState(state => ({
                items: [
                  React.cloneElement(state.items[0], {
                    style: { paddingBottom: Math.random() * 40 },
                  }),
                ].concat(state.items.slice(1)),
              }));
            }}
          />
        </View>
        <View style={styles.row}>
          <Button
            label="Add to end"
            onPress={() => {
              this.setState(state => ({
                items: state.items.concat(
                  <Item msg={`Item ${AppendingListItemCount++}`} />,
                ),
              }));
            }}
          />
          <Button
            label="Remove end"
            onPress={() => {
              this.setState(state => ({
                items: state.items.slice(0, -1),
              }));
            }}
          />
          <Button
            label="Change height end"
            onPress={() => {
              this.setState(state => ({
                items: state.items.slice(0, -1).concat(
                  React.cloneElement(state.items[state.items.length - 1], {
                    style: { paddingBottom: Math.random() * 40 },
                  }),
                ),
              }));
            }}
          />
        </View>
      </View>
    );
  }
}

function ScrollViewNestedScrollEnabled(): React.Node {
  const [nestedScrollEnabled, setNestedScrollEnabled] = useState(false);
  return (
    <View>
      <Text>属性值:nestedScrollEnabled</Text>
      <Text>预期结果：</Text>
      <Text>1.当nestedScrollEnabled值为true时,可以向上或向下滑动至顶部或底部</Text>
      <Text>2.当nestedScrollEnabled值为false时,无法滑动</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        nestedScrollEnabled={nestedScrollEnabled}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={'nestedScrollEnabled: ' + nestedScrollEnabled.toString()}
        onPress={() => setNestedScrollEnabled(!nestedScrollEnabled)}
      />
    </View>
  );
}

function PagingEnabledExample(): React.Node {
  const [pagingEnabled, setPagingEnabled] = useState(true)
  return (
    <View>
      <Text>页面只能以视图大小的整数倍翻转。Android不支持垂直分页。</Text>
      <Text>属性值：pagingEnabled:{pagingEnabled.toString()}</Text>
      <Text>预期效果：滑动的时候只能滑一个滑块的距离</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 100 }]}
        pagingEnabled={pagingEnabled}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <ScrollView
        style={[styles.scrollView, { height: 100 }]}
        horizontal={true}
        pagingEnabled={pagingEnabled}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={'pagingEnabled: ' + pagingEnabled.toString()}
        onPress={() => setPagingEnabled(!pagingEnabled)}
      />
    </View>
  );
}

function ScrollViewPersistentScrollbar(): React.Node {
  const [persistentScrollBar, setPersistentScrollBar] = useState(false);
  return (
    <View>
      <Text>属性值:persistentScrollBar:</Text>
      <Text>预期结果：</Text>
      <Text>1.当persistentScrollBar值为false时,右侧滚动条在不使用时变为透明</Text>
      <Text>2.当persistentScrollBar值为true时,右侧滚动条在不使用时不变为透明,即一直在右侧显示</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        nestedScrollEnabled
        persistentScrollbar={persistentScrollBar}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={'persistentScrollBar: ' + persistentScrollBar.toString()}
        onPress={() => setPersistentScrollBar(!persistentScrollBar)}
      />
    </View>
  );
}

const RemoveClippedSubviews = () => {
  const [removeClippedSubviews, setRemoveClippedSubviews] = useState(false);
  return (
    <View>
      <Text>属性值：removeClippedSubviews：{removeClippedSubviews.toString()}</Text>
      <Text>说明：该属性用于控制是否将超出屏幕范围的子视图从其原生的父视图中移除。</Text>
      <Text>预期效果：</Text>
      <Text>1.当值为false时，所有子视图都会被保留在ScrollView中，即使它们超出了屏幕范围。</Text>
      <Text>2.当值为true时，超出屏幕范围的子视图会被从ScrollView的原生父视图中移除，以提高性能和内存使用效率。只有在子视图重新进入屏幕范围时，它们才会重新添加到ScrollView中。</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        removeClippedSubviews={removeClippedSubviews}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={'removeClippedSubviews: ' + removeClippedSubviews.toString()}
        onPress={() => setRemoveClippedSubviews(!removeClippedSubviews)}
      />
    </View>
  );
};


class EnableDisableList extends React.Component<{}, { scrollEnabled: boolean }> {
  state: { scrollEnabled: boolean } = {
    scrollEnabled: true,
  };
  render(): React.Node {
    return (
      <View>
        <Text>属性值：scrollEnabled:{this.state.scrollEnabled.toString()}</Text>
        <Text>预期结果：</Text>
        <Text>1.点击Disable Scrolling按钮，滚动视图将不允许滚动</Text>
        <Text>2.点击Enable Scrolling按钮，滚动视图将重新允许滚动</Text>
        <Text>实际效果：</Text>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          nestedScrollEnabled
          style={{ height: 200, backgroundColor: '#eeeeee', }}
          scrollEnabled={this.state.scrollEnabled}>
          {ITEMS.map(createItemRow)}
        </ScrollView>
        <Button
          label="Disable Scrolling"
          onPress={() => {
            this.setState({ scrollEnabled: false });
          }}
        />
        <Button
          label="Enable Scrolling"
          onPress={() => {
            this.setState({ scrollEnabled: true });
          }}
        />
      </View>
    );
  }
}

class Item1 extends React.PureComponent<{|
  msg?: string,
  style?: ViewStyleProp,
|}> {
  render(): $FlowFixMe {
    return (
      <View style={[styles.item, this.props.style]}>
        <Text>{this.props.msg}</Text>
      </View>
    );
  }
}

let ITEMS1 = [...Array(200)].map((_, i) => `Item ${i}`);

const createItemRow1 = (msg: string, index: number) => (
  <Item key={index} msg={msg} />
);

const ScrollViewScrollEventThrottle = () => {
  const [timesOnScroll, setTimesOnScroll] = useState(0);
  let textLog = 'ready';
  if (timesOnScroll > 1) {
    textLog = timesOnScroll + 'x onScroll';
  } else if (timesOnScroll > 0) {
    textLog = 'onScroll';
  }
  return (
    <View>
      <Text>属性值：{'scrollEventThrottle={5000}'}</Text>
      <Text>预期结果：持续滚动,间隔五秒后log文本前面的数值加1，例如：1 onScroll变为2x onScroll</Text>
      <Text>实际结果：</Text>
      <ScrollView
        nestedScrollEnabled
        scrollEventThrottle={5000}
        onScroll={() => {
          setTimesOnScroll(current => current + 1);
        }}
        style={styles.scrollView}
        testID="scroll_vertical">
        {ITEMS1.map(createItemRow1)}
      </ScrollView>
      <View style={{ padding: 10, backgroundColor: '#F5F5F5' }}>
        <Text>log文本:{textLog}</Text>
      </View>
    </View>
  )
}

const ShowsHorizontalScrollIndicator = () => {
  const [showsHorizontalScrollIndic, setShowsHorizontalScrollIndic] = useState(false);
  const [persistentScrollBar, setPersistentScrollBar] = useState(false);
  return (
    <View>
      <Text>属性值：showsHorizontalScrollIndicator:{showsHorizontalScrollIndic.toString()}</Text>
      <Text>预期效果：</Text>
      <Text>1.值为true，显示水平滚动指示器</Text>
      <Text>2.值为false，隐藏水平滚动指示器</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 100 }]}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndic}
        horizontal={true}
        persistentScrollbar={persistentScrollBar}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={
          'showsHorizontalScrollIndicator: ' +
          showsHorizontalScrollIndic.toString()
        }
        onPress={() =>
          setShowsHorizontalScrollIndic(!showsHorizontalScrollIndic)
        }
      />
       <Button
        label={'persistentScrollBar: ' + persistentScrollBar.toString()}
        onPress={() => setPersistentScrollBar(!persistentScrollBar)}
      />
    </View>
  );
};

const ShowsVerticalScrollIndicator = () => {
  const [showsVerticalScrollIndic, setShowsVerticalScrollIndic] = useState(false);
  const [persistentScrollBar, setPersistentScrollBar] = useState(false);
  return (
    <View>
      <Text>属性值：showsVerticalScrollIndicator:{showsVerticalScrollIndic.toString()}</Text>
      <Text>预期效果：</Text>
      <Text>1.值为true，显示垂直滚动指示器</Text>
      <Text>2.值为false，隐藏垂直滚动指示器</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        showsVerticalScrollIndicator={showsVerticalScrollIndic}
        persistentScrollbar={persistentScrollBar}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={
          'showsVerticalScrollIndicator: ' + showsVerticalScrollIndic.toString()
        }
        onPress={() => setShowsVerticalScrollIndic(!showsVerticalScrollIndic)}
      />
       <Button
        label={'persistentScrollBar: ' + persistentScrollBar.toString()}
        onPress={() => setPersistentScrollBar(!persistentScrollBar)}
      />
    </View>
  );
};

const SnapToAlignment = () => {
  const [snapToAlignment, setSnapToAlignment] = useState('start');
  const snapToAlignmentModes = ['start', 'center', 'end'];
  const [snapToInterval, setSnapToInterval] = useState(0);

  return (
    <View>
      <Text>属性值：snapToAlignment:{snapToAlignment.toString()}</Text>
      <Text>snapToInterval:初始值为0,点击按钮使其值在0与100切换。</Text>
      <Text>预期效果：</Text>
      <Text>设置snapToInterval后,snapToAlignment将定义捕捉与滚动视图的关系。</Text>
      <Text>'start':将对齐左侧（水平）或顶部（垂直）的捕捉。</Text>
      <Text>'center':将使捕捉在中心对齐。</Text>
      <Text>'end':将对齐右侧（水平）或底部（垂直）的捕捉。</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        snapToInterval={snapToInterval}
        snapToAlignment={snapToAlignment}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={styles.rowTitle}>Select Snap to Alignment Mode</Text>
      <View style={styles.row}>
        {snapToAlignmentModes.map(label => (
          <Button
            active={snapToAlignment === label}
            key={label}
            label={label}
            onPress={() => setSnapToAlignment(label)}
          />
        ))}
      </View>
      <Button
        label={
          snapToInterval === 0 ? 'setSnapToInterval' : 'reset snapToInterval'
        }
        onPress={() =>
          snapToInterval === 0 ? setSnapToInterval(100) : setSnapToInterval(0)
        }
      />
    </View>
  );
};

const SnapToEnd = () => {
  const [snapToEnd, setSnapToEnd] = useState(true);
  return (
    <View>
      <Text>属性值：snapToEnd:{snapToEnd.toString()}</Text>
      <Text>snapToOffsets:100</Text>
      <Text>预期效果：</Text>
      <Text>1.值为true,列表的末尾算作捕捉偏移,不允许列表在结束位置和最后一个snapToOffsets偏移之间自由滚动</Text>
      <Text>2.值为false时,允许列表在其结束位置和最后一个snapToOffsets偏移之间自由滚动</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        snapToEnd={snapToEnd}
        snapToOffsets={[100]}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={'snapToEnd: ' + snapToEnd.toString()}
        onPress={() => setSnapToEnd(!snapToEnd)}
      />
    </View>
  );
};

const SnapToInterval = () => {
  const [snapToInterval, setSnapToInterval] = useState(0);
  return (
    <View>
      <Text>属性值：snapToInterval:{snapToInterval}</Text>
      <Text>预期效果:点击setSnapToInterval设置自动对齐的间隔,视图滚动停止在snapToInterval值的倍数位置。</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        snapToInterval={snapToInterval}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={
          snapToInterval === 0 ? 'setSnapToInterval' : 'reset snapToInterval'
        }
        onPress={() =>
          snapToInterval === 0 ? setSnapToInterval(100) : setSnapToInterval(0)
        }
      />
    </View>
  );
};

const SnapToOffsets = () => {
  const [snapToOffsets, setSnapToOffsets] = useState([100]);
  return (
    <View>
      <Text>属性值：snapToOffsets:100</Text>
      <Text>预期效果：滚动视图停止在定义的偏移处。</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        snapToOffsets={snapToOffsets}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
    </View>
  );
};

const SnapToStart = () => {
  const [snapToStart, setSnapToStart] = useState(true);
  return (
    <View>
      <Text>属性值：snapToStart:{snapToStart.toString()}</Text>
      <Text>snapToOffsets:100</Text>
      <Text>预期效果：</Text>
      <Text>1.值为true,列表的开头算作捕捉偏移,不允许列表在开始位置和第一个snapToOffsets偏移之间自由滚动</Text>
      <Text>2.值为false时,允许列表在其开始位置和第一个snapToOffsets偏移之间自由滚动</Text>
      <Text>实际效果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        snapToOffsets={[100]}
        snapToStart={snapToStart}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={'snapToStart: ' + snapToStart.toString()}
        onPress={() => setSnapToStart(!snapToStart)}
      />
    </View>
  );
};

const StickyHeaderHiddenOnScrollExample = () => {
  const scrollRef = React.createRef();
  const [stickyHeaderHiddenOnScroll, setStickyHeaderHiddenOnScroll] = useState(true);
  return (
    <View>
      <Text>属性值：stickyHeaderHiddenOnScroll：{stickyHeaderHiddenOnScroll.toString()}</Text>
      <Text>预期效果：</Text>
      <Text>1.值为true时，粘性头部下滑隐藏，上划吸附</Text>
      <Text>2.值为false时，粘性头部下滑吸附，上划吸附</Text>
      <Text>实际结果：</Text>
      <ScrollView
        ref={scrollRef}
        style={{ backgroundColor: '#eeeeee', height: 230, }}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={stickyHeaderHiddenOnScroll}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        onPress={() => setStickyHeaderHiddenOnScroll(!stickyHeaderHiddenOnScroll)}
        label={'stickyHeaderHiddenOnScroll: ' + stickyHeaderHiddenOnScroll.toString()}
      />
    </View>
  )
}

const StickyHeaderIndicesExample = () => {
  const _scrollView = React.useRef <? React.ElementRef < typeof ScrollView >> (null);
  const stickyHeaderStyle = { backgroundColor: 'yellow' };
  return (
    <View>
      <Text>属性值：{'stickyHeaderIndices={[0, 13, 26]}'}</Text>
      <Text style={{ marginVertical: 5 }}>预期结果：向下滚动，当它们到达顶部时，可以看到3个粘性标题粘在一起。</Text>
      <Text>实际结果：</Text>
      <ScrollView
        ref={_scrollView}
        style={[styles.scrollView, { height: 200 }]}
        stickyHeaderIndices={[0, 13, 26]}
        nestedScrollEnabled
        testID="scroll_multiple_sticky_headers">
        {<Item msg={'Sticky Header 1'} style={stickyHeaderStyle} />}
        {ITEMS.map(createItemRow)}
        {<Item msg={'Sticky Header 2'} style={stickyHeaderStyle} />}
        {ITEMS.map(createItemRow)}
        {<Item msg={'Sticky Header 3'} style={stickyHeaderStyle} />}
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Button
          label="Scroll to top"
          onPress={() => {
            nullthrows < $FlowFixMe > (_scrollView.current).scrollTo({ y: 0 });
          }}
          testID="scroll_to_top_button"
        />
        <Button
          label="Scroll to bottom"
          onPress={() => {
            nullthrows < $FlowFixMe > (_scrollView.current).scrollToEnd({
              animated: true,
            });
          }}
          testID="scroll_to_bottom_button"
        />
      </View>
    </View>
  );
};

function ScrollViewHitSlop() {
  const [timesPressed, setTimesPressed] = useState(0);
  let log = '';
  if (timesPressed > 1) {
    log = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    log = 'onPress';
  }
  return (
    <View testID="pressable_hit_slop">
      <Text>属性值:hitSlop=top: 30, bottom: 30, left: 50, right: 50</Text>
      <Text>预期效果:绿色区域点击,“nx onPress”中n的数值大小会增加。</Text>
      <Text>实际结果：</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', position: 'relative', height: 200, opacity: 0.9 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 200, backgroundColor: 'green', position: 'absolute', zIndex: 2 }}>
          <ScrollView
            style={{ height: 50, width: 100, backgroundColor: 'grey', }}
            onTouchStart={() => setTimesPressed(num => num + 1)}
            hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          >
            {ITEMS.map(createItemRow)}
          </ScrollView>
        </View>
        <View style={{ zIndex: 1, left: 50, position: 'absolute', }}>
          <Text>Out</Text>
        </View>
      </View>
      <View style={styles.logBox}>
        <Text>{log}</Text>
      </View>
    </View>
  );
};

class ExampleBox extends React.Component<ExampleBoxProps, ExampleBoxState> {
  state: ExampleBoxState = {
    log: [],
  };
  handleLog = (msg: string) => {
    // $FlowFixMe
    this.state.log = this.state.log.concat([msg]);
  };

  flushReactChanges = () => {
    this.forceUpdate();
  };
  /**
   * Capture phase of bubbling to append separator before any of the bubbling
   * happens.
   */
  handleTouchCapture = () => {
    // $FlowFixMe
    this.state.log = this.state.log.concat(['---']);
  };

  render(): React.Node {
    const { Component } = this.props;
    return (
      <View>
        <View
          onTouchEndCapture={this.handleTouchCapture}
          onTouchStart={this.flushReactChanges}>
          <Component onLog={this.handleLog} />
        </View>
        <View style={{ padding: 20, margin: 10, borderWidth: 0.5, borderColor: '#f0f0f0', backgroundColor: '#f9f9f9', }}>
          <DemoText style={{ fontSize: 9, }}>
            {this.state.log.join('\n')}
          </DemoText>
        </View>
      </View>
    );
  }
}

class DemoText extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    return (
      <View pointerEvents="none">
        <Text style={this.props.style}>{this.props.children}</Text>
      </View>
    );
  }
}

class ScrollViewNoneExample extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    return (
      <View>
        <Text>值为none时,不能成为点击事件的目标</Text>
        <Text style={{ color: 'red' }}>预期效果为: 点击A打印A touched,点击B打印A touched,点击C打印C touched 、A touched</Text>
        <Text>实际效果: </Text>
        <ScrollView
          onTouchStart={() => this.props.onLog('A touched')}
          style={styles.box}>
          <DemoText style={styles.text}>A:未设置属性值</DemoText>
          <ScrollView
            pointerEvents="none"
            onTouchStart={() => this.props.onLog('B touched')}
            style={[styles.box, styles.boxPassedThrough]}>
            <DemoText style={[styles.text, styles.textPassedThrough]}>
              B:属性值:pointerEvents=none
            </DemoText>
            <ScrollView
              onTouchStart={() => this.props.onLog('C touched')}
              style={[styles.box, styles.boxPassedThrough]}>
              <DemoText style={[styles.text, styles.textPassedThrough]}>
                C:未设置属性值
              </DemoText>
            </ScrollView>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

class ScrollViewBoxNoneExample extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    return (
      <View>
        <Text>值为box-none时,不能成为点击事件的目标但他的子视图可以</Text>
        <Text style={{ color: 'red' }}>预期效果为: 点击A打印A touched,点击B打印A touched,点击C打印C touched 和A touched</Text>
        <Text>实际效果: </Text>
        <ScrollView
          onTouchStart={() => this.props.onLog('A touched')}
          style={styles.box}>
          <DemoText style={styles.text}>A未设置属性值</DemoText>
          <ScrollView
            pointerEvents="box-none"
            onTouchStart={() => this.props.onLog('B touched')}
            style={[styles.box, styles.boxPassedThrough]}>
            <DemoText style={[styles.text, styles.textPassedThrough]}>
              B属性值:pointerEvents="box-none"
            </DemoText>
            <ScrollView
              onTouchStart={() => this.props.onLog('C touched')}
              style={styles.box}>
              <DemoText style={styles.text}>C属性值: 未设置</DemoText>
            </ScrollView>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

class ScrollViewBoxOnlyExample extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    return (
      <View>
        <Text>值为box-only时,可以成为点击事件的目标但他的子视图不可以</Text>
        <Text style={{ color: 'red' }}>预期效果为: 点击A打印A touched,点击B打印B touched和A touched,点击C打印B touched和A touched</Text>
        <Text>实际效果: </Text>
        <ScrollView
          onTouchStart={() => this.props.onLog('A touched')}
          style={styles.box}>
          <DemoText style={styles.text}>A未设置属性值</DemoText>
          <ScrollView
            pointerEvents="box-only"
            onTouchStart={() => this.props.onLog('B touched')}
            style={styles.box}>
            <DemoText style={styles.text}>B属性值: pointerEvent:box-only</DemoText>
            <ScrollView
              pointerEvents="auto"
              onTouchStart={() =>
                this.props.onLog('C touched auto')
              }
              style={[styles.box, styles.boxPassedThrough]}>
              <DemoText style={[styles.text, styles.textPassedThrough]}>
                C属性值: 为auto
              </DemoText>
            </ScrollView>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const ScrollViewCollapsable = () => {
  const [collapsable, setCollapsable] = useState(false)
  return (
    <View style={{ flex: 1, height: 300 }}>
      <Text>属性值:{collapsable.toString()}</Text>
      <Text>预期结果:当collapsable属性为false时,视图不隐藏</Text>
      <Text>实际结果:</Text>
      <ScrollView style={[styles.scrollView, { height: 200 }]}
        collapsable={false}>
        {ITEMS.map(createItemRow)}
      </ScrollView >
      <View>
        <Button
          onPress={() => setCollapsable(!collapsable)}
          label={'collapsable:' + collapsable.toString()}
        />
      </View>
    </View>
  );
};

const NeedsOffscreenAlphaCompositingTrue = () => {
  return (
    <View>
      <Text>属性值：needsOffscreenAlphaCompositing='true'</Text>
      <Text>预期结果：</Text>
      <Image
        source={require('../../../assets/KeyboardAvoidingView_needsOffscreenAlphaCompositing_true.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text>实际结果：</Text>
      <ScrollView style={{ marginTop: 10, width: 200, height: 200, backgroundColor: 'black', opacity: 1 }}>
        <ScrollView style={{ width: 150, height: 150, backgroundColor: 'white', opacity: 0.3 }} needsOffscreenAlphaCompositing={true}>
          <ScrollView style={{ width: 100, height: 100, backgroundColor: 'black', opacity: 1 }} >
            <Text style={{ color: 'white', fontSize: 24 }}>true</Text>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const NeedsOffscreenAlphaCompositingFalse = () => {
  return (
    <View>
      <Text>属性值：needsOffscreenAlphaCompositing='false'</Text>
      <Text>预期结果：</Text>
      <Image
        source={require('../../../assets/KeyboardAvoidingView_needsOffscreenAlphaCompositing_false.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text>实际结果：</Text>
      <ScrollView style={{ marginTop: 10, width: 200, height: 200, backgroundColor: 'black', opacity: 1 }}  >
        <ScrollView style={{ width: 150, height: 150, backgroundColor: 'white', opacity: 0.3 }} >
          <ScrollView style={{ width: 100, height: 100, backgroundColor: 'black', opacity: 1 }} needsOffscreenAlphaCompositing={false}>
            <Text style={{ color: 'white', fontSize: 24 }}>false</Text>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

class FlashScrollIndicators extends React.Component<{...}, $FlowFixMeState > {
  render(): React.Node {
    const scrollRef = React.createRef();
    return (
      <View>
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
        >
          {ITEMS.map(createItemRow)}
        </ScrollView>
        <Button
          label="FlashScrollIndicators"
          onPress={() => {
            nullthrows < $FlowFixMe > (scrollRef.current).flashScrollIndicators();
          }}
        />
      </View>
    )
  }
}

class VerticalScrollView extends React.Component<{...}, $FlowFixMeState > {
  state: { animationSwitch: boolean } = {
    animationSwitch: true,
    locate: 0
  };

  toggleSwitch = () => {
    this.setState({
      animationSwitch: !this.state.animationSwitch,
    });
  };

  render(): React.Node {
    const scrollRef = React.createRef();
    const animationSwitch = this.state.animationSwitch
    return (
      <View>
        <ScrollView
          ref={scrollRef}
          automaticallyAdjustContentInsets={false}
          nestedScrollEnabled
          onScroll={() => {
            console.log('onScroll!');
          }}
          scrollEventThrottle={200}
          style={{ backgroundColor: '#eeeeee', height: 240, }}
          testID="scroll_vertical">
          {ITEMS.map(createItemRow)}
        </ScrollView>
        <Button
          label="scrollTo"
          onPress={() => {
            nullthrows < $FlowFixMe > (scrollRef.current).scrollTo({ y: 0, animated: animationSwitch });
          }}
        />
        <Button
          label="scrollToEnd"
          onPress={() => {
            nullthrows < $FlowFixMe > (scrollRef.current).scrollToEnd({ animated: animationSwitch });
          }}
        />
        <Button
          label={"Animation : " + animationSwitch}
          onPress={this.toggleSwitch}
        />
      </View>
    )
  }
}


const OnTouchStartExample = () => {
  const [onTouchStart, setOnTouchStart] = useState('ready')
  return (
    <View>
      <Text>回调函数:onTouchStart()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onTouchStart={() => { setOnTouchStart('run done!') }}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}> 预期效果: </Text>
      <Text>触摸开始后显示:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchStart:run done!</Text>
      </View>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchStart:{onTouchStart}</Text>
      </View>
    </View>
  )
}

const OnTouchMoveExample = () => {
  const [onTouchMove, setOnTouchMove] = useState('ready')
  return (
    <View>
      <Text>回调函数:onTouchMove()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onTouchMove={() => { setOnTouchMove('run done!') }}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}>预期效果:</Text>
      <Text>触摸移动后显示:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchMove:run done!</Text>
      </View>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchMove:{onTouchMove}</Text>
      </View>
    </View>
  )
}

const OnTouchEndExample = () => {
  const [onTouchEnd, setOnTouchEnd] = useState('ready')
  return (
    <View>
      <Text>回调函数:onTouchEnd()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onTouchEnd={() => { setOnTouchEnd('run done!') }}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}> 预期效果:</Text>
      <Text>触摸结束后显示:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchEnd:run done!</Text>
      </View>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchEnd:{onTouchEnd}</Text>
      </View>
    </View>
  )
}

const OnTouchCancelExample = () => {
  const [onTouchCancel, setOnTouchCancel] = useState('ready')
  return (
    <View>
      <Text>回调函数:onTouchCancel()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onTouchCancel={() => { setOnTouchCancel('run done!') }}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}> 预期效果:</Text>
      <Text>触摸取消后显示:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchCancel:run done!</Text>
      </View>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchCancel:{onTouchCancel}</Text>
      </View>
    </View>
  )
}

const OnTouchEndCaptureExample = () => {
  const [onTouchEndCapture, setOnTouchEndCapture] = useState('ready')
  return (
    <View>
      <Text>回调函数:onTouchEndCapture()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onTouchEndCapture={() => { setOnTouchEndCapture('run done!') }}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}> 预期效果:</Text>
      <Text>触摸结束后显示:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchEndCapture:run done!</Text>
      </View>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onTouchEndCapture:{onTouchEndCapture}</Text>
      </View>
    </View>
  )
}

const OnContentSizeChange = () => {
  const [items, setItems] = useState(ITEMS);
  const [contentSizeChanged, setContentSizeChanged] = useState('original');
  return (
    <View>
      <Text>属性值：onContentSizeChange: {contentSizeChanged}</Text>
      <Text style={{ marginVertical: 5 }}>预期结果：当ScrollView的可滚动内容视图发生变化时，下面的文本将发生变化。</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        onContentSizeChange={() =>
          contentSizeChanged === 'original'
            ? setContentSizeChanged('changed')
            : setContentSizeChanged('original')
        }
        nestedScrollEnabled>
        {items.map(createItemRow)}
      </ScrollView>
      <Button
        label={'ContentSizeChanged: ' + contentSizeChanged.toString()}
        onPress={() =>
          items === ITEMS
            ? setItems(['1', '2', '3', '4', '5'])
            : setItems(ITEMS)
        }
      />
    </View>
  );
};

const OnMomentumScrollBeginExample = () => {
  const [timesPressed, setTimesPressed] = useState(0);
  const [velocityNative, setVelocityNative] = useState('');
  const [velocityApprox, setVelocityApprox] = useState('');
  const lastContentOffset = useRef({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onMomentumScrollBegin';
  } else if (timesPressed > 0) {
    textLog = 'onMomentumScrollBegin';
  }
  return (
    <View>
      <Text>属性值：onMomentumScrollBegin</Text>
      <Text style={{ marginVertical: 5 }}>预期结果：滚动动画开始时调用</Text>
      <Text>实际结果:</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        onMomentumScrollBegin={(event) => {
          const { contentOffset, velocity } = event.nativeEvent;
          const now = Date.now();
          const dt = now - lastScrollTime.current;

          if (dt > 0) {
            const dy = contentOffset.y - lastContentOffset.current.y;
            // 估算速度（像素/毫秒）
            const approxVelY = dy / dt;
            // 与 native velocity 对比
            setVelocityNative(`y=${velocity.y}`);
            setVelocityApprox(`y=${approxVelY}`);
          }
          lastContentOffset.current = contentOffset;
          lastScrollTime.current = now;
          setTimesPressed(current => current + 1)
        }}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View style={{ marginTop: 10 }}>
        <Text>{textLog}</Text>
        <Text style={{ marginTop: 10 }}>预期velocity：{velocityApprox}</Text>
        <Text style={{ marginTop: 10 }}>实际velocity：{velocityNative}</Text>
      </View>
    </View>
  );
};

const OnMomentumScrollEndExample = () => {
  const [timesPressed, setTimesPressed] = useState(0);
  const [velocityNative, setVelocityNative] = useState('');
  const [velocityApprox, setVelocityApprox] = useState('');
  const lastContentOffset = useRef({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onMomentumScrollEnd';
  } else if (timesPressed > 0) {
    textLog = 'onMomentumScrollEnd';
  }
  return (
    <View>
      <Text>属性值：onMomentumScrollEnd</Text>
      <Text style={{ marginVertical: 5 }}>预期结果：滚动动画结束时调用</Text>
      <Text>实际结果:</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        onMomentumScrollEnd={(event) => {
          const { contentOffset, velocity } = event.nativeEvent;
          const now = Date.now();
          const dt = now - lastScrollTime.current;

          if (dt > 0) {
            const dy = contentOffset.y - lastContentOffset.current.y;
            // 估算速度（像素/毫秒）
            const approxVelY = dy / dt;
            // 与 native velocity 对比
            setVelocityNative(`y=${velocity.y}`);
            setVelocityApprox(`y=${approxVelY}`);
          }
          lastContentOffset.current = contentOffset;
          lastScrollTime.current = now;
          setTimesPressed(current => current + 1)
        }}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View style={{ marginTop: 10 }}>
        <Text>{textLog}</Text>
        <Text style={{ marginTop: 10 }}>预期结果：{velocityApprox}</Text>
        <Text style={{ marginTop: 10 }}>实际结果：{velocityNative}</Text>
      </View>
    </View>
  );
};

const OnScrollExample = () => {
  const [timesPressed, setTimesPressed] = useState(0);
  const [velocityNative, setVelocityNative] = useState('');
  const [velocityApprox, setVelocityApprox] = useState('');
  const lastContentOffset = useRef({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onScroll';
  } else if (timesPressed > 0) {
    textLog = 'onScroll';
  }
  return (
    <View>
      <Text>属性值：onScroll</Text>
      <Text>预期结果：滚动后log文本中回调名称前面的次数增加，例如：1x onScroll变为2x onScroll</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        onScroll={(event) => {
          const { contentOffset, velocity } = event.nativeEvent;
          const now = Date.now();
          const dt = now - lastScrollTime.current;

          if (dt > 0) {
            const dy = contentOffset.y - lastContentOffset.current.y;
            // 估算速度（像素/毫秒）
            const approxVelY = dy / dt;
            // 与 native velocity 对比
            setVelocityNative(`y=${velocity.y}`);
            setVelocityApprox(`y=${approxVelY}`);
          }
          lastContentOffset.current = contentOffset;
          lastScrollTime.current = now;
          setTimesPressed(current => current + 1);
        }}
        nestedScrollEnabled
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ marginTop: 10 }}>log: {textLog}</Text>
      <Text style={{ marginTop: 10 }}>预期velocity：{velocityApprox}</Text>
      <Text style={{ marginTop: 10 }}>实际velocity：{velocityNative}</Text>
    </View>
  );
};

const OnScrollBeginDragExample = () => {
  const [onScrollDrag, setOnScrollDrag] = useState('none');
  const [count, setCount] = useState(1)
  const [velocityNative, setVelocityNative] = useState('');
  const [velocityApprox, setVelocityApprox] = useState('');
  const lastContentOffset = useRef({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  return (
    <View>
      <Text>属性值：onScrollBeginDrag</Text>
      <Text>预期结果：滚动后回调名称后面的次数增加，例如：onScrollBeginDrag1变为onScrollBeginDrag2</Text>
      <Text>实际结果：</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        onScrollBeginDrag={(event) => {
          const { contentOffset, velocity } = event.nativeEvent;
          const now = Date.now();
          const dt = now - lastScrollTime.current;

          if (dt > 0) {
            const dy = contentOffset.y - lastContentOffset.current.y;
            // 估算速度（像素/毫秒）
            const approxVelY = dy / dt;
            // 与 native velocity 对比
            setVelocityNative(`y=${velocity.y}`);
            setVelocityApprox(`y=${approxVelY}`);
          }
          lastContentOffset.current = contentOffset;
          lastScrollTime.current = now;
          setOnScrollDrag('onScrollBeginDrag' + count);
          setCount(count + 1);
        }}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text>onScrollBeginDrag: {onScrollDrag}</Text>
      <Text style={{ marginTop: 10 }}>预期velocity：{velocityApprox}</Text>
      <Text style={{ marginTop: 10 }}>实际velocity：{velocityNative}</Text>
    </View>
  );
};

const OnScrollEndDragExample = () => {
  const [onScrollDrag, setOnScrollDrag] = useState('none');
  const [count, setCount] = useState(1);
  const [velocityNative, setVelocityNative] = useState('');
  const [velocityApprox, setVelocityApprox] = useState('');
  const lastContentOffset = useRef({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  return (
    <View>
      <Text>属性值：onScrollEndDrag</Text>
      <Text>预期结果：滚动后回调名称后面的次数增加，例如：onScrollEndDrag1变为onScrollEndDrag2</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        onScrollEndDrag={(event) => {
          const { contentOffset, velocity } = event.nativeEvent;
          const now = Date.now();
          const dt = now - lastScrollTime.current;

          if (dt > 0) {
            const dy = contentOffset.y - lastContentOffset.current.y;
            // 估算速度（像素/毫秒）
            const approxVelY = dy / dt;
            // 与 native velocity 对比
            setVelocityNative(`y=${velocity.y}`);
            setVelocityApprox(`y=${approxVelY}`);
          }
          lastContentOffset.current = contentOffset;
          lastScrollTime.current = now;
          setOnScrollDrag('onScrollBeginDrag' + count);
          setCount(count + 1)
        }}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text>onScrollEndDrag: {onScrollDrag}</Text>
      <Text style={{ marginTop: 10 }}>预期velocity：{velocityApprox}</Text>
      <Text style={{ marginTop: 10 }}>实际velocity：{velocityNative}</Text>
    </View>
  );
};

const ScrollViewOnlayout = () => {
  const [onLayout, setOnLayout] = useState('ready')
  return (
    <View>
      <Text>回调函数:Onlayout()</Text>
      <ScrollView
        onLayout={() => { setOnLayout('run done!') }}
      >
      </ScrollView>
      <Text style={{ color: 'red' }}> 预期效果:</Text>
      <Image resizeMode='contain' style={{ width: '100%' }} source={require('../../../assets/view-callback-third.png')}></Image>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onLayout:{onLayout}</Text>
      </View>
    </View>
  )
}

const TouchFirstRespond = () => {
  const [onStartShouldSetResponder, setOnStartShouldSetResponder] = useState('ready')
  const [onStartShouldSetResponderCapture, setOnStartShouldSetResponderCapture] = useState('ready')
  const [onMoveShouldSetResponder, setOnMoveShouldSetResponder] = useState('ready')
  const [onMoveShouldSetResponderCapture, setOnMoveShouldSetResponderCapture] = useState('ready')
  return (
    <View>
      <Text>回调函数:onStartShouldSetResponder()、onStartShouldSetResponderCapture()、onMoveShouldSetResponder()、onMoveShouldSetResponderCapture()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onPress={() => { }}
        onStartShouldSetResponder={() => { setOnStartShouldSetResponder('run done!') }}
        onStartShouldSetResponderCapture={() => { setOnStartShouldSetResponderCapture('run done!') }}
        onMoveShouldSetResponder={() => { setOnMoveShouldSetResponder('run done!') }}
        onMoveShouldSetResponderCapture={() => { setOnMoveShouldSetResponderCapture('run done!') }}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}>预期效果:</Text>
      <Image resizeMode='contain' style={{ width: '100%' }} source={require('../../../assets/view-callback.png')}></Image>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onStartShouldSetResponder:{onStartShouldSetResponder}</Text>
        <Text>onStartShouldSetResponderCapture:{onStartShouldSetResponderCapture}</Text>
        <Text>onMoveShouldSetResponder:{onMoveShouldSetResponder}</Text>
        <Text>onMoveShouldSetResponderCapture:{onMoveShouldSetResponderCapture}</Text>
      </View>
    </View>
  )
}

const TouchSecondOnRespond = () => {
  const [onResponderGrant, setOnResponderGrant] = useState('ready')
  const [onResponderMove, setOnResponderMove] = useState('ready')
  return (
    <View>
      <Text>回调函数:onResponderGrant()、onResponderMove()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onPress={() => { }}
        onStartShouldSetResponderCapture={() => true}
        onMoveShouldSetResponderCapture={() => true}
        onResponderGrant={() => { setOnResponderGrant('run done!') }}
        onResponderMove={() => { setOnResponderMove('run done!') }}
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}>
        预期效果:
      </Text>
      <Image resizeMode='contain' style={{ width: '100%' }} source={require('../../../assets/view-callback-second.jpg')}></Image>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onResponderGrant:{onResponderGrant}</Text>
        <Text>onResponderMove:{onResponderMove}</Text>
      </View>
    </View>
  )
}

const TouchOnResponderReject = () => {
  const [onResponderReject, setonResponderReject] = useState('ready')
  return (
    <View>
      <Text>回调函数onResponderReject()</Text>
      <ScrollView
        style={{ height: 100, borderColor: 'pink', borderWidth: 5, }}
        onStartShouldSetResponderCapture={() => false}
        onMoveShouldSetResponderCapture={() => false}
        onResponderReject={() => { setonResponderReject('run done!') }}
      >
        <Button
          style={{ height: 200, width: 200 }}
          title='Button'
          onPress={() => { }}
        >
        </Button>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}> 预期效果:</Text>
      <Text>点击Button后ScrollView不响应,并返回:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onResponderReject:run done!</Text>
      </View>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5, }}>
        <Text>onResponderReject:{onResponderReject}</Text>
      </View>
    </View>
  )
}

const TouchThirdOnRespond = () => {
  const [onResponderRelease, setOnResponderRelease] = useState('ready')
  const [onResponderTerminate, setOnResponderTerminate] = useState('ready')
  const [onResponderReject, setOnResponderReject] = useState('ready')
  return (
    <View>
      <Text>回调函数onResponderTerminate(),onResponderTerminateRequest()</Text>
      <ScrollView
        onPress={() => { }}
        onStartShouldSetResponder={() => { true }}
        onMoveShouldSetResponderCapture={() => true}
        style={{ height: 100, backgroundColor: 'pink', width: '100%' }}
        onResponderReject={() => { setOnResponderReject('run done') }}
        onResponderRelease={() => { setOnResponderRelease('run done') }}
      >{ITEMS.map(createItemRow)}
      </ScrollView>
      <ScrollView
        onPress={() => { }}
        onStartShouldSetResponder={() => { true }}
        onMoveShouldSetResponderCapture={() => true}
        style={{ height: 100, backgroundColor: 'red', marginTop: 30, width: '100%' }}
        onResponderTerminationRequest={() => true}
        onResponderReject={() => { setOnResponderReject('run done') }}
        onResponderTerminate={() => { setOnResponderTerminate('run done(放权)') }}
      >{ITEMS.map(createItemRow)}
      </ScrollView>
      <Text style={{ color: 'red' }}>
        预期效果:
      </Text>
      <Image resizeMode='contain' style={{ width: '100%' }} source={require('../../../assets/view-callback-four.png')}></Image>
      <Text>实际效果:</Text>
      <View style={{ width: '100%', height: 'auto', borderColor: '#527FE4', borderWidth: 5 }}>
        <Text>onResponderRelease:{onResponderRelease}</Text>
        <Text>onResponderTerminate:{onResponderTerminate}</Text>
      </View>
    </View>
  )
}

const FadingEdgeLenExample_vertical = () => {
  const [fadingEdgeLen, setFadingEdgeLen] = useState(0);
  return (
    <View>
      <Text>属性值:fadingEdgeLength={fadingEdgeLen}</Text>
      <Text>预期效果:点击setFadingEdgeLen后,滚动框中心以外的数据将会淡出</Text>
      <Text>实际效果:</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        fadingEdgeLength={fadingEdgeLen}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={fadingEdgeLen === 0 ? 'setFadingEdgeLen' : 'resetFadingEdgeLen'}
        onPress={() =>
          fadingEdgeLen === 0 ? setFadingEdgeLen(600) : setFadingEdgeLen(0)
        }
      />
    </View>
  );
};

const FadingEdgeLenExample_horizontal = () => {
  const [fadingEdgeLen, setFadingEdgeLen] = useState(0);
  return (
    <View>
      <Text>属性值:fadingEdgeLength={fadingEdgeLen}</Text>
      <Text>预期效果:点击setFadingEdgeLen后,滚动时左右边缘应出现渐变遮罩</Text>
      <Text>实际效果:</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        fadingEdgeLength={fadingEdgeLen}
        horizontal={true}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={fadingEdgeLen === 0 ? 'setFadingEdgeLen' : 'resetFadingEdgeLen'}
        onPress={() =>
          fadingEdgeLen === 0 ? setFadingEdgeLen(600) : setFadingEdgeLen(0)
        }
      />
    </View>
  );
};

const FadingEdgeLenExample = () => {
  const [fadingEdgeLen, setFadingEdgeLen] = useState(0);
  return (
    <View>
      <Text>属性值:fadingEdgeLength={fadingEdgeLen}</Text>
      <Text>预期效果:点击setFadingEdgeLen后,滚动框中心以外的数据无渐变遮罩</Text>
      <Text>实际效果:</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        fadingEdgeLength={fadingEdgeLen}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label={fadingEdgeLen === 0 ? 'setFadingEdgeLen' : 'resetFadingEdgeLen'}
        onPress={() =>
          fadingEdgeLen === 0 ? setFadingEdgeLen(-100) : setFadingEdgeLen(0)
        }
      />
    </View>
  );
};

const StickyHeaderIndices_absolute = () => {
  return (
    <View>
      <Text>属性值：父组件stickyHeaderIndices={[0]}子组件：position: 'absolute'</Text>
      <Text>预期效果：</Text>
      <Image style={{ width: 227, height: 150, }} source={require('../../../assets/StickyHeaderIndices_absolute.gif')}></Image>
      <Text>实际效果：</Text>
      <View style={{ height: 200 }}>
        <ScrollView
          stickyHeaderIndices={[0]}
          style={{ flex: 1 }}
        >
          <ScrollView style={{ position: 'absolute' }}>
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', }}>
              <Text>Sticky Header</Text>
            </View>
          </ScrollView>
          {ITEMS.map(createItemRow)}
        </ScrollView>
      </View>
    </View>
  );
};

const StickyHeaderIndices_relative = () => {
  return (
    <View>
      <Text>属性值：父组件stickyHeaderIndices={[0]}子组件：position: 'relative'</Text>
      <Text>预期效果：</Text>
      <Image style={{ width: 227, height: 150, }} source={require('../../../assets/StickyHeaderIndices_relative.gif')}></Image>
      <Text>实际效果：</Text>
      <View style={{ height: 200 }}>
        <ScrollView
          stickyHeaderIndices={[0]}
          style={{ flex: 1 }}
        >
          <ScrollView style={{ position: 'relative' }}>
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', }}>
              <Text>Sticky Header</Text>
            </View>
          </ScrollView>
          {ITEMS.map(createItemRow)}
        </ScrollView>
      </View>
    </View>
  );
};

const StickyHeaderIndices_static = () => {
  return (
    <View>
      <Text>属性值：父组件stickyHeaderIndices={[0]}子组件：position: 'static'</Text>
      <Text>预期效果：</Text>
      <Image style={{ width: 227, height: 150, }} source={require('../../../assets/StickyHeaderIndices_static.gif')}></Image>
      <Text>实际效果：</Text>
      <View style={{ height: 200 }}>
        <ScrollView
          stickyHeaderIndices={[0]}
          style={{ flex: 1 }}
        >
          <ScrollView style={{ position: 'static' }}>
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', }}>
              <Text>Sticky Header</Text>
            </View>
          </ScrollView>
          {ITEMS.map(createItemRow)}
        </ScrollView>
      </View>
    </View>
  );
};

const VelocityExample = () => {
  const [velocityNative, setVelocityNative] = useState('');
  const [velocityApprox, setVelocityApprox] = useState('');
  const lastContentOffset = useRef({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  return (
    <View>
      <Text>属性值：velocity</Text>
      <Text style={{ marginTop: 10, color: 'red' }}>数字的有效位一样</Text>
      <Text style={{ marginTop: 10 }}>预期结果：{velocityApprox}</Text>
      <Text style={{ marginTop: 10 }}>实际结果：{velocityNative}</Text>
      <ScrollView
        horizontal={true}
        style={[styles.scrollView, { height: 200 }]}
        onScroll={(event) => {
          const { contentOffset, velocity } = event.nativeEvent;
          const now = Date.now();
          const dt = now - lastScrollTime.current;
          if (dt > 0) {
            const dx = contentOffset.x - lastContentOffset.current.x;
            // 估算速度（像素/毫秒）
            const approxVelX = dx / dt;
            // 与 native velocity 对比
            setVelocityNative(`x=${velocity.x}`);
            setVelocityApprox(`x=${approxVelX}`);
          }
          lastContentOffset.current = contentOffset;
          lastScrollTime.current = now;
        }}
        nestedScrollEnabled
      >
        {ITEMS.map(createItemRow)}
      </ScrollView>
    </View>
  );
};



//未生效

const BouncesZoomExample = () => {
  const [bouncesZoom, setBouncesZoom] = useState(false);
  return (
    <View>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        bouncesZoom={bouncesZoom}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Text>属性值:true</Text>
        <Text>预期效果:</Text>
        <Text>点击按钮后属性值为true,使用手势可以让内容超过限制</Text>
        <Text>实际效果:</Text>
        <Button
          onPress={() => setBouncesZoom(!bouncesZoom)}
          label={'Bounces Zoom: ' + bouncesZoom.toString()}
        />
      </View>
    </View>
  );
};

const DisableScrollViewPanResponderExample = () => {
  const [disableScrollViewPanResponder, setDisableScrollViewPanResponder] =
    useState(false);
  return (
    <View>
      <Text>属性值：</Text>
      <Text>snapToInterval:{4}</Text>
      <Text>disableScrollViewPanResponder:{disableScrollViewPanResponder.toString()}</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
        snapToInterval={4}
        disableScrollViewPanResponder={disableScrollViewPanResponder}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Button
          onPress={() =>
            setDisableScrollViewPanResponder(!disableScrollViewPanResponder)
          }
          label={
            'setDisableScrollViewPanResponder: ' +
            disableScrollViewPanResponder.toString()
          }
        />
      </View>
    </View>
  );
};

const DirectionalLockEnabledExample = () => {
  const [directionalLockEnabled, setDirectionalLockEnabled] = useState(false);
  return (
    <View>
      <Text>属性值：</Text>
      <Text>directionalLockEnabled:{directionalLockEnabled.toString()}</Text>
      <ScrollView
        style={[styles.scrollView, { height: 200 }]}
        contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
        directionalLockEnabled={directionalLockEnabled}
        nestedScrollEnabled>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <View>
        <Button
          onPress={() => setDirectionalLockEnabled(!directionalLockEnabled)}
          label={
            'directionalLockEnabled: ' + directionalLockEnabled.toString()
          }
        />
      </View>
    </View>
  );
};

const ScrollViewScrollPerfTag = () => {
  const [scrollPerfTag, setScrollPerfTag] = useState("exampleScroll");
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const addItem = () => {
    const newItem = items.length + 1;
    setItems([...items, newItem]);
    setScrollPerfTag(`scrollPerfTag${items.length + 1}`)
  };
  return (
    <View style={{ flex: 1, height: 300 }}>
      <Text>预期结果:当点击'Add Item'按钮时，scrollPerfTag的值会变化</Text>
      <Text>实际结果:</Text>
      <Text>属性值:{'scrollPerfTag:' + scrollPerfTag.toString()}</Text>
      <ScrollView style={[styles.scrollView, { height: 200 }]}
        scrollPerfTag={scrollPerfTag}>
        {items.map(createItemRow)}
      </ScrollView >
      <View>
        <Button
          onPress={addItem}
          label={'Add Item'}
        />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 300,
  },
  horizontalScrollView: {
    height: 106,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  activeButton: {
    backgroundColor: 'rgba(100,215,255,.3)',
  },
  button: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96,
  },
  containerStyle: {
    backgroundColor: '#aae3b6',
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  box: {
    backgroundColor: '#aaccff',
    borderWidth: 1,
    borderColor: '#7799cc',
    padding: 10,
    margin: 5,
  },
  boxPassedThrough: {
    borderColor: '#99bbee',
  },
  pointerEventBoxNone: {
    pointerEvents: 'box-none',
  },
  pointerEventBoxOnly: {
    pointerEvents: 'box-only',
  },
  pointerEventNone: {
    pointerEvents: 'none',
  },
  pointerEventAuto: {
    pointerEvents: 'auto',
  },
  logText: {
    fontSize: 9,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 10,
    color: '#5577cc',
  },
  textPassedThrough: {
    color: '#88aadd',
  },
  wrapperView: {
    height: 300,
    width: '60%',
  },
});

exports.displayName = 'ScrollViewExample';
exports.title = 'ScrollView';
exports.documentationURL = 'https://reactnative.dev/docs/scrollview';
exports.category = 'Basic';
exports.description =
  'Component that enables scrolling through child components';
exports.examples = [
  {
    title: '1.StickyHeaderComponent',
    render(): React.Node {
      return <StickyHeaderComponentExample />
    }
  },
  {
    title: '2.bounces',
    render(): React.Node {
      return <BouncesExample />
    }
  },
  {
    title: '3.centerContent',
    render: function (): React.Node {
      return <CenterContentList />
    },
  },
  {
    title: '4.contentContainerStyle',
    render: function (): React.Node {
      return <ContentContainerStyleExample />;
    },
  },
  {
    title: '5.contentOffset',
    render: function (): React.Node {
      return <ContentOffsetList />;
    },
  },
  {
    title: '6.decelerationRate',
    render: function (): React.Node {
      return (
        <View>
          <Text>预期效果:根据所选的decelRate属性值来确定ScrollView在用户松开手指后的减速速率,具体效果如下:</Text>
          <Text>根据不同的decelRate属性值,ScrollView在用户松开手指后的减速速率会有所不同:</Text>
          <Text>decelRate为0时,ScrollView会立即停止滚动。</Text>
          <Text>decelRate为'fast'时,ScrollView会快速停止滚动。</Text>
          <Text>decelRate为'normal'时,ScrollView会以正常速率停止滚动。</Text>
          <Text>decelRate为1时,ScrollView一秒后停止滚动。</Text>
          <Text>实际效果:</Text>
          <DecelerationRateExample />
        </View>
      )
    },
  },
  {
    title: '7.disableIntervalMomentum',
    render: function (): React.Node {
      return <DisableIntervalMomentumExample />
    },
  },
  {
    title: '8.endFillColor',
    render: function (): React.Node {
      return <EndFillColorExample />;
    },
  },
  {
    title: '9.horizontal_LTR',
    render: function (): React.Node {
      return (
        <View>
          <Text>属性值：{'horizontal={true}'}</Text>
          <Text style={{ marginVertical: 5 }}>预期效果：可以水平显示ScrollView的子组件</Text>
          <Text>实际结果：</Text>
          <HorizontalScrollView direction="ltr" />
        </View>
      );
    },
  },
  {
    title: '9.horizontal_RTL',
    render: function (): React.Node {
      return (
        <View>
          <Text>属性值：{'horizontal={true}'}</Text>
          <Text style={{ marginVertical: 5 }}>预期效果：可以水平显示ScrollView的子组件</Text>
          <Text>实际结果：</Text>
          <HorizontalScrollView direction="rtl" />
        </View>
      );
    },
  },
  {
    title: '10.indicatorStyle',
    render: function (): React.Node {
      return <IndicatorStyle />;
    },
  },
  {
    title: '11.invertStickyHeaders',
    render: function (): React.Node {
      return <InvertStickyHeaders />;
    },
  },
  {
    title: '12.keyboardDismissMode',
    render: function (): React.Node {
      return <KeyboardDismissModeExample />;
    },
  },
  {
    title: '13.keyboardShouldPersistTaps',
    render: function (): React.Node {
      return <KeyboardShouldPersistTapsExample />;
    },
  },
  {
    title: '14.maintainVisibleContentPosition',
    render: function (): React.Node {
      return <ScrollViewMaintainVisibleContentPosition />;
    },
  },
  {
    title: '15.nestedScrollEnabled',
    render: function (): React.Node {
      return <ScrollViewNestedScrollEnabled />;
    },
  },
  {
    title: '16.pagingEnabled',
    render: function () {
      return <PagingEnabledExample />;
    },
  },
  {
    title: '17.persistentScrollbar',
    render: function (): React.Node {
      return <ScrollViewPersistentScrollbar />;
    },
  },
  {
    title: '18.removeClippedSubviews',
    render: function (): React.Node {
      return <RemoveClippedSubviews />;
    },
  },
  {
    title: '19.scrollEnabled',
    render: function (): React.Node {
      return <EnableDisableList />;
    },
  },
  {
    title: '20.scrollEventThrottle',
    render(): React.Node {
      return <ScrollViewScrollEventThrottle />;
    },
  },
  {
    title: '21.showsHorizontalScrollIndicator',
    render: function (): React.Node {
      return <ShowsHorizontalScrollIndicator />;
    },
  },
  {
    title: '22.showsVerticalScrollIndicator',
    render: function (): React.Node {
      return <ShowsVerticalScrollIndicator />;
    },
  },
  {
    title: '23.snapToAlignment',
    render: function (): React.Node {
      return <SnapToAlignment />;
    },
  },
  {
    title: '24.snapToEnd',
    render: function (): React.Node {
      return <SnapToEnd />;
    },
  },
  {
    title: '25.snapToInterval',
    render: function (): React.Node {
      return <SnapToInterval />;
    },
  },
  {
    title: '26.snapToOffsets',
    render: function (): React.Node {
      return <SnapToOffsets />;
    },
  },
  {
    title: '27.snapToStart',
    render: function (): React.Node {
      return <SnapToStart />;
    },
  },
  {
    title: '28.stickyHeaderHiddenOnScroll',
    render(): React.Node {
      return <StickyHeaderHiddenOnScrollExample />
    }
  },
  {
    title: '29.stickyHeaderIndices',
    render: function (): React.Node {
      return <StickyHeaderIndicesExample />;
    },
  },
  {
    title: '30.borderWidth',
    render() {
      return (
        <View>
          <Text>属性值:borderWidth: 15</Text>
          <Text>预期效果:</Text>
          <Image style={{ width: 90, height: 90, }} source={require('../../../assets/ScrollViewborderWidth.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 90,
              height: 90,
              backgroundColor: 'lightgrey',
              borderWidth: 15,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '31.borderLeftWidth',
    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text>属性值:borderLeftWidth: 15</Text>
          <Text>预期效果:</Text>
          <Image source={require('../../../assets/borderLeftWidth.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 90,
              height: 90,
              borderColor: 'red',
              backgroundColor: 'lightgrey',
              borderLeftWidth: 15,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '32.borderRightWidth',
    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text>属性值:borderRightWidth: 15</Text>
          <Text>预期效果:</Text>
          <Image source={require('../../../assets/borderRightWidth.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 90,
              height: 90,
              borderColor: 'pink',
              backgroundColor: 'lightgrey',
              borderRightWidth: 15,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '33.borderTopWidth',
    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text>属性值:borderTopWidth: 15</Text>
          <Text>预期效果:</Text>
          <Image source={require('../../../assets/borderTopWidth.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 90,
              height: 90,
              borderColor: 'cyan',
              backgroundColor: 'lightgrey',
              borderTopWidth: 15,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '34.borderBottomWidth',
    render() {
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text>属性值:borderBottomWidth: 15</Text>
          <Text>预期效果:</Text>
          <Image source={require('../../../assets/borderBottomWidth.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 90,
              height: 90,
              borderColor: 'blue',
              backgroundColor: 'lightgrey',
              borderBottomWidth: 15,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '35.borderColor',
    render() {
      return (
        <View>
          <Text>属性值:borderColor: 'red',</Text>
          <Text>预期效果:</Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../../../assets/ScrollViewborderColor.png')} />
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderWidth: 10,
              borderColor: 'red',
            }}
          />
        </View>
      );
    },
  },
  {
    title: '36.border__Color',
    render() {
      return (
        <View>
          <Text>属性值:</Text>
          <Text>borderTopColor: 'pink',</Text>
          <Text>borderRightColor: 'blue',</Text>
          <Text>borderBottomColor: 'green',</Text>
          <Text>borderLeftColor: 'red',</Text>
          <Text>预期效果:</Text>
          <Image
            style={{
              width: 100,
              height: 100
            }}
            source={require('../../../assets/borderColorForEach.png')} />
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderWidth: 10,
              borderTopColor: 'pink',
              borderRightColor: 'blue',
              borderBottomColor: 'green',
              borderLeftColor: 'red',
            }}
          />
        </View>
      );
    },
  },
  {
    title: '37.borderStartColor',
    render() {
      return (
        <View>
          <Text>属性值:borderStartcolor:cyan</Text>
          <Text>预期效果:</Text>
          <Image
            source={require('../../../assets/startborder.png')}></Image>
          <Text>实际效果:</Text>
          <View
            style={{
              width: 100,
              height: 100
            }}>
            <ScrollView
              style={{
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 10,
                borderStartColor: 'cyan',
              }}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: '38.borderEndColor',
    render() {
      return (
        <View>
          <Text>属性值:borderEndcolor:cyan</Text>
          <Text>预期效果:</Text>
          <Image source={require('../../../assets/endborder.png')}></Image>
          <Text>实际效果:</Text>
          <View
            style={{
              width: 100,
              height: 100
            }}>
            <ScrollView
              style={{
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 10,
                borderEndColor: 'cyan',
              }}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: '39.borderRadius',
    render() {
      return (
        <View>
          <Text>属性值：borderRadius: 10</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 100, width: 100 }} source={require('../../../assets/ScrollViewborderRadius.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderWidth: 10,
              borderRadius: 10,
              backgroundColor: 'lightgrey',
            }}
          />
        </View>
      );
    },
  },
  {
    title: '40.border____Radius',
    render() {
      return (
        <View>
          <Text>属性值：</Text>
          <Text>borderTopLeftRadius、borderTopRightRadius、borderBottomRightRadius、borderBottomLeftRadius</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 100, width: 100 }} source={require('../../../assets/colorfulBorder.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderTopWidth: 10,
              borderRightWidth: 20,
              borderBottomWidth: 30,
              borderLeftWidth: 40,
              borderTopColor: 'red',
              borderRightColor: 'green',
              borderBottomColor: 'blue',
              borderLeftColor: 'magenta',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 40,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 40,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '41.border____Radius',
    render() {
      return (
        <View>
          <Text>属性值：borderTopStartRadius、borderTopEndRadius、borderBottomStartRadius、borderBottomEndRadius</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 100, width: 105 }} source={require('../../../assets/arcBorder.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderTopWidth: 10,
              borderRightWidth: 20,
              borderBottomWidth: 30,
              borderLeftWidth: 40,
              borderTopStartRadius: 40,
              borderTopEndRadius: 10,
              borderBottomStartRadius: 40,
              borderBottomEndRadius: 10,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '42.backfaceVisibility-visible',
    render() {
      return (
        <View>
          <Text>属性值:backfaceVisibility: 'visible'</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 100, width: 100 }} source={require('../../../assets/ScrollViewBackfaceVisibility.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderTopWidth: 20,
              borderRightWidth: 20,
              borderBottomWidth: 20,
              borderLeftWidth: 20,
              borderTopColor: 'red',
              borderRightColor: 'green',
              borderBottomColor: 'blue',
              borderLeftColor: 'magenta',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'visible'
            }}
          />
        </View>
      );
    },
  },
  {
    title: '42.backfaceVisibility-hidden',
    render() {
      return (
        <View>
          <Text>属性值:backfaceVisibility: 'hidden'</Text>
          <Text>预期效果:</Text>
          <ScrollView
            style={{ width: 100, height: 100, }}
          />
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderTopWidth: 20,
              borderRightWidth: 20,
              borderBottomWidth: 20,
              borderLeftWidth: 20,
              borderTopColor: 'red',
              borderRightColor: 'green',
              borderBottomColor: 'blue',
              borderLeftColor: 'magenta',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
          />
        </View>
      );
    },
  },
  {
    title: '43.backgroundColor',
    render() {
      return (
        <View>
          <Text>属性值:backgroundColor: 'red'</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 100, width: 100 }} source={require('../../../assets/ScrollViewBackgroundColor.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              backgroundColor: 'green'
            }}
          />
        </View>
      );
    },
  },
  {
    title: '44.borderStyle-dashed',
    render() {
      return (
        <View>
          <Text>属性值:borderStyle: 'dashed'</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 200, width: 200 }} source={require('../../../assets/borderStyle-dashed.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 200,
              height: 200,
              borderStyle: 'dashed',
              borderWidth: 20,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '44.borderStyle-dotted',
    render() {
      return (
        <View>
          <Text>属性值:borderStyle: 'dotted'</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 200, width: 200 }} source={require('../../../assets/borderStyle-dotted.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 200,
              height: 200,
              borderStyle: 'dotted',
              borderWidth: 20,
            }}
          />
        </View>
      );
    },
  },
  {
    title: '45.opacity',
    render() {
      return (
        <View>
          <Text>属性值:0,0.33,0.67,1</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 100, width: 300 }} source={require('../../../assets/opacity.png')}></Image>
          <Text>实际效果:</Text>
          <View style={[styles.row, { height: 100, backgroundColor: '#fff' }]}>
            <ScrollView
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'blue',
                opacity: 0
              }}
            />
            <ScrollView
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'blue',
                opacity: 0.33
              }}
            />
            <ScrollView
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'blue',
                opacity: 0.67
              }}
            />
            <ScrollView
              style={{
                width: 100,
                height: 100,
                backgroundColor: 'blue',
                opacity: 1
              }}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: '46.hitSlop',
    render(): React.Node {
      return <ScrollViewHitSlop />
    }
  },
  {
    title: '47.pointerEvents_none',
    render(): React.Node {
      return <ExampleBox Component={ScrollViewNoneExample} />
    }
  },
  {
    title: '47.pointerEvents_box-none',
    render(): React.Node {
      return <ExampleBox Component={ScrollViewBoxNoneExample} />
    }
  },
  {
    title: '47.pointerEvents_box-only',
    render(): React.Node {
      return <ExampleBox Component={ScrollViewBoxOnlyExample} />
    }
  },
  {
    title: '48.style',
    render() {
      return (
        <View>
          <Text>属性值:style</Text>
          <Text>预期效果:</Text>
          <Image style={{ height: 200, width: 200 }} source={require('../../../assets/ScrollViewStyle.png')}></Image>
          <Text>实际效果:</Text>
          <ScrollView
            style={{
              width: 200,
              height: 200,
              borderStyle: 'dotted',
              borderWidth: 5,
              borderRadius: 20,
              backgroundColor: 'skyblue'
            }}
          />
        </View>
      );
    },
  },
  {
    title: '49.collapsable',
    render(): React.Node {
      return <ScrollViewCollapsable />
    }
  },
  {
    title: '50.needsOffscreenAlphaCompositing_true',
    render(): React.Node {
      return <NeedsOffscreenAlphaCompositingTrue />;
    },
  },
  {
    title: '50.needsOffscreenAlphaCompositing_false',
    render(): React.Node {
      return <NeedsOffscreenAlphaCompositingFalse />;
    },
  },
  {
    title: '51.flashScrollIndicators',
    render: function (): React.Node {
      return (
        <View>
          <Text>属性值：flashScrollIndicators()</Text>
          <Text>预期效果：点击按钮后短暂地显示滚动指示器</Text>
          <Text>实际效果：</Text>
          <FlashScrollIndicators />
        </View>
      );
    },
  },
  {
    title: '52.scrollToAndscrollToEnd',
    render(): React.Node {
      return (
        <View>
          <Text>属性值：</Text>
          <Text>1.scrollTo()： y: 0,animated: animationSwitch</Text>
          <Text>2.scrollToEnd()： animated: animationSwitch</Text>
          <Text>预期效果：</Text>
          <Text>点击scrollToEnd按钮，ScrollView会滚动到底部；点击scrollTo按钮，ScrollView会滚动到顶部。</Text>
          <Text>实际效果：</Text>
          <VerticalScrollView />
        </View>
      );
    },
  },
  {
    title: '53.onTouchStart',
    render(): React.Node {
      return <OnTouchStartExample />
    },
  },
  {
    title: '54.onTouchMove',
    render(): React.Node {
      return <OnTouchMoveExample />
    },
  },
  {
    title: '55.onTouchEnd',
    render(): React.Node {
      return <OnTouchEndExample />
    },
  },
  {
    title: '56.onTouchCancel',
    render(): React.Node {
      return <OnTouchCancelExample />
    },
  },
  {
    title: '57.onTouchEndCapture',
    render(): React.Node {
      return <OnTouchEndCaptureExample />
    }
  },
  {
    title: '58.onContentSizeChange',
    render: function (): React.Node {
      return <OnContentSizeChange />;
    },
  },
  {
    title: '59.onMomentumScrollBegin',
    render: function (): React.Node {
      return <OnMomentumScrollBeginExample />;
    },
  },
  {
    title: '60.onMomentumScrollEnd',
    render: function (): React.Node {
      return <OnMomentumScrollEndExample />;
    },
  },
  {
    title: '61.onScroll',
    render: function (): React.Node {
      return <OnScrollExample />;
    },
  },
  {
    title: '62.onScrollBeginDrag',
    render: function (): React.Node {
      return <OnScrollBeginDragExample />;
    },
  },
  {
    title: '63.onScrollEndDrag',
    render: function (): React.Node {
      return <OnScrollEndDragExample />;
    },
  },
  {
    title: '64.onLayout',
    render(): React.Node {
      return <ScrollViewOnlayout />
    },
  },
  {
    title: '65.responderfunction',
    render(): React.Node {
      return <TouchFirstRespond />
    },
  },
  {
    title: '66.onResponderGrantAndMove',
    render(): React.Node {
      return <TouchSecondOnRespond />
    },
  },
  {
    title: '67.onResponderReject',
    render(): React.Node {
      return <TouchOnResponderReject />
    },
  },
  {
    title: '68.onResponderReleaseAndTerminate',
    render(): React.Node {
      return <TouchThirdOnRespond />
    },
  },
  {
    title: '69.fadingEdgeLength_vertical',
    render: function (): React.Node {
      return <FadingEdgeLenExample_vertical />;
    },
  },
  {
    title: '69.fadingEdgeLength_horizontal',
    render: function (): React.Node {
      return <FadingEdgeLenExample_horizontal />;
    },
  },
  {
    title: '69.fadingEdgeLength_非法值',
    render: function (): React.Node {
      return <FadingEdgeLenExample />;
    },
  },
  {
    title: '70.stickyHeaderIndices_absolute',
    render: function (): React.Node {
      return <StickyHeaderIndices_absolute />;
    },
  },
  {
    title: '70.stickyHeaderIndices_relative',
    render: function (): React.Node {
      return <StickyHeaderIndices_relative />;
    },
  },
  {
    title: '70.stickyHeaderIndices_static',
    render: function (): React.Node {
      return <StickyHeaderIndices_static />;
    },
  },
  {
    title: '71.velocity',
    render: function (): React.Node {
      return <VelocityExample />;
    },
  },

  //未生效
  {
    title: 'BorderCurve(ios)',
    render(): React.Node {
      return (
        <>
          <ScrollView
            style={{
              borderRadius: 20,
              padding: 8,
              marginTop: 12,
              backgroundColor: '#527FE4',
              borderCurve: 'continuous',
            }}>
            <Text style={{ fontSize: 16, color: 'white' }}>
              View with continuous border curve
            </Text>
          </ScrollView>
        </>
      );
    },
  },
  {
    title: 'bouncesZoom',
    render(): React.Node {
      return <BouncesZoomExample />
    }
  },
  {
    title: 'DisableScrollViewPanResponderExample\n',
    description:
      'DirectionalLockEnabled (iOS), disableIntervalMomentum, disableScrollViewPanResponder can be enabled or disabled.',
    render: function (): React.Node {
      return (
        <View>
          <Text></Text>
          <Text>disableScrollViewPanResponder:当启用时,ScrollView将不响应滚动手势。如果启用了snapToInterval,它会不遵循典型的触摸模式。</Text>
          <Text>实际效果:</Text>
          <DisableScrollViewPanResponderExample />
        </View>
      )
    },
  },
  {
    title: 'DirectionalLockEnabledExample\n',
    description:
      'DirectionalLockEnabled (iOS), disableIntervalMomentum, disableScrollViewPanResponder can be enabled or disabled.',
    render: function (): React.Node {
      return (
        <View>
          <Text>directionalLockEnabled:当启用时,ScrollView在垂直滚动时将锁定水平方向的滚动,反之亦然。</Text>
          <Text>实际效果:</Text>
          <DirectionalLockEnabledExample />
        </View>
      )
    },
  },
  {
    title: 'ScrollViewScrollPerfTagExample',
    description: '使用 `scrollPerfTag` 属性时，它可以用于在 React Native 应用中执行性能分析，以便更好地了解和调试 `ScrollView` 的滚动性能',
    render(): React.Node {
      return <ScrollViewScrollPerfTag />
    }
  },
  {
    title: 'elevation"',
    render(): React.Node {
      return (
        <View>
          <Text>属性值:1</Text>
          <Text>预期效果:</Text>
          <Text>会创建一个宽度为100、高度为100的ScrollView,背景颜色为粉色,并且设置了一个elevation值为1,elevation属性用于控制组件的阴影效果。</Text>
          <Text>在这个示例中,elevation属性将为ScrollView添加一个浮动效果,并在视觉上将其提升。elevation属性只在Android平台上生效。</Text>
          <Text>在Android平台上最终的效果是,你会看到一个粉色的ScrollView,它在视觉上稍微浮动起来,给人一种立体感。在ScrollView中,你还会看到一个字体大小为11的文本 "elevation"。</Text>
          <Text>实际效果：</Text>
          <ScrollView
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'pink',
              elevation: 1
            }}
          >
            <Text style={{ fontSize: 11 }}>elevation</Text>
          </ScrollView>
        </View>
      );
    },
  },
  {
    name: 'pressableStickyHeaders',
    title: 'pressableStickyHeaders',
    description:
      'Press the blue box to toggle it between blue and yellow. The box should remain Pressable after scrolling.',
    render: function (): React.Node {
      return (
        <View style={{ height: 400 }}>
          <ScrollViewPressableStickyHeaderExample />
        </View>
      );
    },
  },
  {
    title: 'getScrollViewContent',
    render(): React.Node {
      return (
        <View>
          <View style={styles.wrapperView}>
            <ScrollView
              stickyHeaderIndices={[7, 8, 12, 19]}
              invertStickyHeaders={true}
            >
              {getScrollViewContent({})}
            </ScrollView>
          </View>
          <View style={styles.wrapperView}>
            <ScrollView
              stickyHeaderIndices={[7, 8, 12, 19]}
              invertStickyHeaders={false}
            >
              {getScrollViewContent({})}
            </ScrollView>
          </View>
          <View style={styles.wrapperView}>
            <ScrollView
              stickyHeaderIndices={[7, 8, 12, 19]}
              invertStickyHeaders
            >
              {getScrollViewContent({})}
            </ScrollView>
          </View>
        </View>
      );
    }
  },
];
