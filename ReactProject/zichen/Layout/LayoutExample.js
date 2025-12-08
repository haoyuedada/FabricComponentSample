/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

'use strict';

const React = require('react');
const { StyleSheet, Image, Text, View } = require('react-native');

class Circle extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    const size = this.props.size || 20;
    const backgroundColor = this.props.bgColor || '#527fe4';
    const alignSelf = this.props.alignSelf || 'auto';
    const margin = this.props.margin || 1;
    return (
      <View
        style={{
          borderRadius: size / 2,
          backgroundColor: backgroundColor,
          alignSelf: alignSelf,
          width: size,
          height: size,
          margin: margin,
        }}
      />
    );
  }
}

class CircleBlock extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    const circleStyle = {
      flexDirection: 'row',
      backgroundColor: '#f6f7f8',
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      marginBottom: 2,
      height: 30,
      width: 300,
    };
    return (
      <View style={[circleStyle, this.props.style]}>{this.props.children}</View>
    );
  }
}

const fiveColoredCircles = [
  <Circle bgColor='#527fe4' key='blue' />,
  <Circle bgColor='#D443E3' key='violet' />,
  <Circle bgColor='#FF9049' key='orange' />,
  <Circle bgColor='#FFE649' key='yellow' />,
  <Circle bgColor='#7FE040' key='green' />,
];

const circleOfAllSizes = [
  <Circle size={15} />,
  <Circle size={10} />,
  <Circle size={20} />,
  <Circle size={17} />,
  <Circle size={12} />,
  <Circle size={15} />,
  <Circle size={10} />,
  <Circle size={20} />,
  <Circle size={17} />,
  <Circle size={12} />,
  <Circle size={15} />,
  <Circle size={10} />,
  <Circle size={20} />,
  <Circle size={17} />,
  <Circle size={12} />,
  <Circle size={15} />,
  <Circle size={8} />,
];

exports.title = 'Layout - Flexbox';
exports.category = 'UI';
exports.description = 'Examples of using the flexbox API to layout views.'
exports.displayName = 'LayoutExample';
exports.examples = [
  {
    title: '1.Flex',
    render(): React.Node {
      return (
        <View>
          <Text>Define how your items are going to fill over the available space along main axis.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>1:1:1</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ width: 300, height: 30 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_1.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ flex: 1, backgroundColor: 'red' }} />
            <View style={{ flex: 1, backgroundColor: 'blue' }} />
            <View style={{ flex: 1, backgroundColor: 'yellow' }} />
          </CircleBlock>
          <Text style={ styles.title }>1:2:3</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ width: 300, height: 30 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_2.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ flex: 1, backgroundColor: 'red' }} />
            <View style={{ flex: 2, backgroundColor: 'blue' }} />
            <View style={{ flex: 3, backgroundColor: 'yellow' }} />
          </CircleBlock>
        </View> 
      );
    },
  },
  {
    title: '2.Flex-basis',
    render(): React.Node {
      return (
        <View>
          <Text>An axis-independent way of providing the default size of an item along the main axis.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>40,40,40</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 30, width: 120 }}
              resizeMode={'cover'}
              source={require('../../../assets/basis_1.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ backgroundColor: 'red', flexBasis: 40 }} />
            <View style={{ backgroundColor: 'blue', flexBasis: 40 }} />
            <View style={{ backgroundColor: 'yellow', flexBasis: 40 }} />
          </CircleBlock>
          <Text style={ styles.title }>80,40,40</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 30, width: 160 }}
              resizeMode={'cover'}
              source={require('../../../assets/basis_2.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ backgroundColor: 'red', flexBasis: 80 }} />
            <View style={{ backgroundColor: 'blue', flexBasis: 40 }} />
            <View style={{ backgroundColor: 'yellow', flexBasis: 40 }} />
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '3.Flex-grow',
    render(): React.Node {
      return (
        <View>
          <Text>Describes how much space within a container should be distributed among its children along the main axis.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>2:1:0</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_grow.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ width: 20, backgroundColor: 'red', flexGrow: 2 }} />
            <View style={{ width: 20, backgroundColor: 'blue', flexGrow: 1 }} />
            <View style={{ width: 20, backgroundColor: 'yellow', flexGrow: 0 }} />
          </CircleBlock>
        </View>
    );
    },
  },
  {
    title: '4.Flex-shrink',
    render(): React.Node {
      return (
        <View>
          <Text>Describes how to shrink children along the main axis in the case in which the total size of the children overflows the size of the container on the main axis.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>2:1:0</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_shrink.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ width: 140, backgroundColor: 'red', flexShrink: 2 }} />
            <View style={{ width: 140, backgroundColor: 'blue', flexShrink: 1 }} />
            <View style={{ width: 140, backgroundColor: 'yellow', flexShrink: 0 }} />
          </CircleBlock>
        </View>
    );
    },
  },
  {
    title: '5.AspectRatio',
    render(): React.Node {
      return (
        <View>
          <Text>Controls the size of the undefined dimension of a node.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>w:h=2:1</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_aspectRatio1.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ height: 15, backgroundColor: 'red', aspectRatio: 2 }} />
          </CircleBlock>
          <Text style={ styles.title }>w:h=1:2</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_aspectRatio2.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={{ width: 15, backgroundColor: 'red', aspectRatio: 0.5 }} />
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '6.BorderWidth',
    render(): React.Node {
      return (
        <View>
          <Text>Sets the border width of the component in all directions.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>borderWidth:5</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/flex_border.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { borderWidth: 5, borderColor: '#527FE4' }]} />
          </CircleBlock>

          <Text style={ styles.title }>borderBottomWidth:5</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/flex_borderBottom.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { borderBottomWidth: 5, borderBottomColor: '#527FE4' }]} />
          </CircleBlock>

          <Text style={ styles.title }>borderEndWidth:5</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/flex_borderEnd.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { borderEndWidth: 5, borderEndColor: '#527FE4' }]} />
          </CircleBlock>

          <Text style={ styles.title }>borderLeftWidth:5</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/flex_borderLeft.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { borderLeftWidth: 5, borderLeftColor: '#527FE4' }]} />
          </CircleBlock>

          <Text style={ styles.title }>borderRightWidth:5</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/flex_borderRight.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { borderRightWidth: 5, borderRightColor: '#527FE4' }]} />
          </CircleBlock>

          <Text style={ styles.title }>borderStartWidth:5</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/flex_borderStart.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { borderStartWidth: 5, borderStartColor: '#527FE4' }]} />
          </CircleBlock>

          <Text style={ styles.title }>borderTopWidth:5</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/flex_borderTop.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { borderTopWidth: 5, borderTopColor: '#527FE4' }]} />
          </CircleBlock>

          <Text style={ styles.title }>borderTopWidth: 20</Text>
          <Text style={ styles.title }>borderBottomWidth: 10</Text>
          <Text style={ styles.title }>borderRightWidth: 5</Text>
          <Text style={ styles.title }>borderLeftWidth: 1</Text>
          <Text>预期结果：</Text>
          <CircleBlock>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode={'cover'}
              source={require('../../../assets/FlexStyle_total_borderWidth.png')}
            />
          </CircleBlock>
          <Text>实际结果：</Text>
          <View style={{
            height: 80 ,
            borderTopWidth: 20, 
            borderBottomWidth: 10, 
            borderRightWidth: 5,
            borderLeftWidth: 1,
            borderLeftColor:'red',
            borderRightColor:'yellow',
            borderTopColor:'pink',
            borderBottomColor:'skyblue'
          }}></View>
        </View>
      );
    },
  },
  {
    title: '7.RectOrSize',
    render(): React.Node {
      return (
        <View>
          <Text>Sets the number of logical pixels to offset the edges of all directions of this component.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>bottom:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 35, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_bottom.png')}
          />
          <Text style={{ marginBottom: 5 }}>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { bottom: 10 }]} />
          </CircleBlock>
          <Text style={ styles.title }>left:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_left.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { left: 10 }]} />
          </CircleBlock>
          <Text style={ styles.title }>right:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 310, marginLeft: -10 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_right.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { right: 10 }]} />
          </CircleBlock>
          <Text style={ styles.title }>top:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 35, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_top.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { top: 10 }]} />
          </CircleBlock>
        </View>
    );
    },
  },
  {
    title: '8.End&Start',
    render(): React.Node {
      return (
        <View>
          <Text>End and start are equivalent to right and left when the direction is ltr, and equivalent to left and right when the direciton is rtl.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>end(ltr)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 310, marginLeft: -10 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_end(ltr).png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ direction: 'ltr' }}>
            <View style={[styles.redBox, { end: 10 }]} />
          </CircleBlock>
          <Text style={ styles.title }>end(rtl)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 310, marginRight: -10  }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_end_rtl.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ direction: 'rtl' }}>
            <View style={[styles.redBox, { end: 10 }]} />
          </CircleBlock>
          <Text style={ styles.title }>start(ltr)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_start(ltr).png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ direction: 'ltr' }}>
            <View style={[styles.redBox, { start: 10 }]} />
          </CircleBlock>
          <Text style={ styles.title }>start(rtl)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300,  }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_start_rtl.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ direction: 'rtl' }}>
            <View style={[styles.redBox, { start: 10 }]} />
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '9.Margin',
    render(): React.Node {
      return (
        <View>
          <Text>Sets the margin width of all directions.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>margin(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 45, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_margin.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { margin: 0 }]} />
            <View style={[styles.blueBox, { margin: 5 }]} />
            <View style={[styles.yellowBox, { margin: 10 }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginBottom(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 35, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginBottom.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginBottom: 0, marginTop: 'auto' }]} />
            <View style={[styles.blueBox, { marginBottom: 5, marginTop: 'auto' }]} />
            <View style={[styles.yellowBox, { marginBottom: 10, marginTop: 'auto' }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginEnd(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 25, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginEnd.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginEnd: 0 }]} />
            <View style={[styles.blueBox, { marginEnd: 5 }]} />
            <View style={[styles.yellowBox, { marginEnd: 10 }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginHorizontal(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 25, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginHorizontal.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginHorizontal: 0 }]} />
            <View style={[styles.blueBox, { marginHorizontal: 5 }]} />
            <View style={[styles.yellowBox, { marginHorizontal: 10 }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginLeft(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 25, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginLeft.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginLeft: 0 }]} />
            <View style={[styles.blueBox, { marginLeft: 5 }]} />
            <View style={[styles.yellowBox, { marginLeft: 10 }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginRight(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 25, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginRight.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginRight: 0 }]} />
            <View style={[styles.blueBox, { marginRight: 5 }]} />
            <View style={[styles.yellowBox, { marginRight: 10 }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginStart(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 25, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginStart.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginStart: 0 }]} />
            <View style={[styles.blueBox, { marginStart: 5 }]} />
            <View style={[styles.yellowBox, { marginStart: 10 }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginTop(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 35, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginTop.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginTop: 0 }]} />
            <View style={[styles.blueBox, { marginTop: 5 }]} />
            <View style={[styles.yellowBox, { marginTop: 10 }]} />
          </CircleBlock>

          <Text style={ styles.title }>marginVertical(0,5,10)</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 45, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_marginVertical.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={styles.marginExample}>
            <View style={[styles.redBox, { marginVertical: 0 }]} />
            <View style={[styles.blueBox, { marginVertical: 5 }]} />
            <View style={[styles.yellowBox, { marginVertical: 10 }]} />
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '10.Max',
    render(): React.Node {
      return (
        <View>
          <Text>Maximum height and width of the component.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>maxHeight:100</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 110 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_maxHeight100.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { maxHeight: 100 }]}>
            {fiveColoredCircles}
          </CircleBlock>
          <View style={{maxHeight:100, backgroundColor:'green'}}><Text style={{height:200}}>41545454</Text></View>
          <Text style={ styles.title }>maxHeight:20</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 112 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_maxHeight20.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { maxHeight: 20 }]}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>maxWidth:800</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 112 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_maxWidth800.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { maxWidth: 800 }]}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>maxWidth:40</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 110 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_maxWidth40.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { maxWidth: 40 }]}>
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '11.Min',
    render(): React.Node {
      return (
        <View>
          <Text>Minimum height and width of the component.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>minHeight:40</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 40, width: 112 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_minHeight40.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { minHeight: 40 }]}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>minHeight:1</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 110 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_minHeight1.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { minHeight: 1 }]}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>minWidth:150</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 150 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_minWidth150.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { minWidth: 150 }]}>
            {fiveColoredCircles}
          </CircleBlock >
          <Text style={ styles.title }>minWidth:1</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 110 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_minWidth1.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={[styles.autoBox, { minWidth: 1 }]}>
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '12.Display',
    render(): React.Node {
      return (
        <View>
          <Text>Sets the display type of this component.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>none</Text>
          <Text>预期结果：元素被隐藏</Text>
          <Text>实际结果：</Text>
          <CircleBlock style={{ display: 'none' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>flex</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/FlexStyle_display.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ display: 'flex' }}>
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '13.Overflow',
    render(): React.Node {
      return (
        <View>
          <Text>Controls how children are measured and displayed when the children overflows the main axis range of its container.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>visible</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 350 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_overflowVisible.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ overflow: 'visible' }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
          <Text style={ styles.title }>hideden</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_overflowHidden.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ overflow: 'hidden' }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
          <Text style={ styles.title }>scroll</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_overflowScroll.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ overflow: 'scroll' }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '14.Padding',
    render(): React.Node {
      return (
        <View>
          <Text>Sets the padding width of children and its container.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>padding:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 68, width: 108 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_padding.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { padding: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingBottom:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 58, width: 88 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingBottom.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingBottom: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingEnd:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 48, width: 98 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingEnd.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingEnd: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingHorizontal:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 48, width: 108 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingHorizontal.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingHorizontal: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingLeft:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 48, width: 98 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingLeft.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingLeft: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingRight:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 48, width: 98 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingRight.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingRight: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingStart:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 48, width: 98 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingStart.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingStart: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingTop:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 58, width: 88 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingTop.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingTop: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
          <Text style={ styles.title }>paddingVertical:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 68, width: 88 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_paddingVertical.png')}
          />
          <Text>实际结果：</Text>
          <View style={[styles.paddingContainer, { paddingVertical: 10 }]}>
            <View style={styles.paddingExample} />
          </View>
        </View>
      );
    },
  },
  {
    title: '15.Gap',
    render(): React.Node {
      return (
        <View>
          <Text>Sets the gap between each children within a container.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>Gap:10</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 54, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_gap10.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ gap: 10, flexWrap: 'wrap', height: 'auto' }}>
            {fiveColoredCircles}
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>rowGap:20</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 64, width: 300}}
            resizeMode={'cover'}
            source={require('../../../assets/flex_rowGap.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ rowGap: 20, flexWrap: 'wrap', height: 'auto' }}>
            {fiveColoredCircles}
            {fiveColoredCircles}
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>columnGap:20</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 44, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_columnGap.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ columnGap: 20, flexWrap: 'wrap', height: 'auto' }}>
            {fiveColoredCircles}
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '16.Flex Direction',
    render(): React.Node {
      return (
        <View>
          <Text>Controls which direction children of a container go.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>row</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_directionRow.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexDirection: 'row', height: 'auto' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>row-reverse</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_directionRowReverse.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexDirection: 'row-reverse', height: 'auto' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>column</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 110, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_directionColumn.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexDirection: 'column', height: 'auto' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>column-reverse</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 110, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_directionColumnReverse.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexDirection: 'column-reverse', height: 'auto' }}>
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '17.Height&Width',
    render(): React.Node {
      return (
        <View>
          <Text>Sets the height and width of the component.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>Height:auto</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 22, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_heightAuto.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ height: 'auto' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>Height:40</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 40, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_height40.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ height: 40 }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>Width:auto</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 110 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_widthAuto.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ width: 'auto', marginRight: 'auto' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>Width:40</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 110 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_width40.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ width: 40, marginRight: 'auto' }}>
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '18.Direction',
    render(): React.Node {
      return (
        <View>
          <Text>Specifies the directional flow of the user interface.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>ltr</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_ltr.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ direction: 'ltr' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>rtl</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300}}
            resizeMode={'contain'}
            source={require('../../../assets/flex_rtl.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ direction: 'rtl' }}>
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '19.Justify Content',
    render(): React.Node {
      return (
        <View>
          <Text>Aligns children in the main direction.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>flex-start</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_justifyStart.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ justifyContent: 'flex-start' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>center</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_justifyCenter.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ justifyContent: 'center' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>flex-end</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_justifyEnd.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ justifyContent: 'flex-end' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>space-between</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_justifyBetween.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ justifyContent: 'space-between' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>space-around</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_justifyAround.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ justifyContent: 'space-around' }}>
            {fiveColoredCircles}
          </CircleBlock>
          <Text style={ styles.title }>space-evenly</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_justifyEvenly.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ justifyContent: 'space-evenly' }}>
            {fiveColoredCircles}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '20.Align self',
    render(): React.Node {
      return (
        <View>
          <Text>Controls how a child aligns in the cross direction, overriding the alignItems of the parent.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>flex-start</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 40, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_selfStart.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ height: 40 }}>
            <Circle alignSelf='flex-start' />
            <Circle />
            <Circle />
          </CircleBlock>
          <Text style={ styles.title }>center</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 40, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_selfCenter.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ height: 40 }}>
            <Circle alignSelf='center' />
            <Circle />
            <Circle />
          </CircleBlock>
          <Text style={ styles.title }>flex-end</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 40, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_selfEnd.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ height: 40 }}>
            <Circle alignSelf='flex-end' />
            <Circle />
            <Circle />
          </CircleBlock>
          <Text style={ styles.title }>stretch</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 40, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_selfStretch.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ height: 40 }}>
            <View style={{ alignSelf: 'stretch', width: 20, height: 'auto', backgroundColor: 'red' }} />
            <View style={{ width: 20, height: 20, backgroundColor: 'blue' }} />
            <View style={{ width: 20, height: 20, backgroundColor: 'yellow' }} />
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '21.Align Items',
    render(): React.Node {
      return (
        <View>
          <Text>Aligns children in the cross direction.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>flex-start</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_itemStart.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ alignItems: 'flex-start' }}>
            {circleOfAllSizes}
          </CircleBlock>
          <Text style={ styles.title }>center</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_itemCenter.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ alignItems: 'center' }}>
            {circleOfAllSizes}
          </CircleBlock>
          <Text style={ styles.title }>flex-end</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_itemEnd.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ alignItems: 'flex-end' }}>
            {circleOfAllSizes}
          </CircleBlock>
          <Text style={ styles.title }>baseline</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_itemBaseline.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ alignItems: 'baseline' }}>
            {circleOfAllSizes}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '22.Align Content',
    render(): React.Node {
      return (
        <View>
          <Text>Controls how rows align in the cross direction.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>flex-start</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 80, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_contentStart.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexWrap: 'wrap', alignContent: 'flex-start', height: 80 }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
          <Text style={ styles.title }>flex-end</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 80, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_contentEnd.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexWrap: 'wrap', alignContent: 'flex-end', height: 80 }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
          <Text style={ styles.title }>center</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 80, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_contentCenter.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexWrap: 'wrap', alignContent: 'center', height: 80 }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
          <Text style={ styles.title }>space-between</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 80, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_contentBetween.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexWrap: 'wrap', alignContent: 'space-between', height: 80 }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
          <Text style={ styles.title }>space-around</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 80, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_contentAround.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexWrap: 'wrap', alignContent: 'space-around', height: 80 }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '23.Flex Wrap',
    render(): React.Node {
      return (
        <View>
          <Text>Controls whether children can wrap around after they hit the end of a flex container.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>wrap</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 44, width: 300 }}
            resizeMode={'cover'}
            source={require('../../../assets/flex_wrap.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexWrap: 'wrap', height: 'auto' }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
          <Text style={ styles.title }>no-wrap</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 30, width: 350 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_noWrap.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock style={{ flexWrap: 'nowrap' }}>
            {'oooooooooooooooo'.split('').map((char, i) => (
              <Circle key={i} />
            ))}
          </CircleBlock>
        </View>
      );
    },
  },
  {
    title: '24.Z-index && Position',
    render(): React.Node {
      return (
        <View>
          <Text>Controls which components display on top of others.</Text>
          <Text>   </Text>
          <Text style={ styles.title }>zIndex:yellow{`>`}blue{`>`}red</Text>
          <Text>说明:position为absolute</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 35, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/flex_zIndex.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { position: 'absolute', top: 0, left: 0, zIndex: 1 }]} />
            <View style={[styles.blueBox, { position: 'absolute', top: 10, left: 10, zIndex: 2 }]} />
            <View style={[styles.yellowBox, { position: 'absolute', top: 5, left: 5, zIndex: 3 }]} />
          </CircleBlock>
          <Text>说明:position为relative</Text>
          <Text>预期结果：</Text>
          <Image
            style={{ height: 35, width: 300 }}
            resizeMode={'contain'}
            source={require('../../../assets/FlexStyle_position.png')}
          />
          <Text>实际结果：</Text>
          <CircleBlock>
            <View style={[styles.redBox, { position: 'relative', top: 0, left: 0, zIndex: 1 }]} />
            <View style={[styles.blueBox, { position: 'relative', top: 10, left: 10, zIndex: 2 }]} />
            <View style={[styles.yellowBox, { position: 'relative', top: 5, left: 5, zIndex: 3 }]} />
          </CircleBlock>
        </View>
      );
    },
  },
];

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#aaccff',
    borderRadius: 10,
    borderWidth: 0.5,
    opacity: 0.5,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  marginExample: {
    height: 'auto',
    marginRight: 'auto',
  },
  redBox: {
    height: 25,
    width: 25,
    backgroundColor: 'red',
  },
  blueBox: {
    height: 25,
    width: 25,
    backgroundColor: 'blue',
  },
  yellowBox: {
    height: 25,
    width: 25,
    backgroundColor: 'yellow',
  },
  paddingExample: {
    width: 80,
    height: 40,
    backgroundColor: 'green',
  },
  paddingContainer: {
    borderWidth: 4,
    borderColor: 'red',
    marginRight: 'auto',
  },
  autoBox: {
    height: 'auto',
    width: 'auto',
    marginRight: 'auto',
  },
});

