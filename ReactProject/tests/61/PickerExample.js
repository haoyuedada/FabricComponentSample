/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

'use strict';

const React = require('react');

const { Picker, StyleSheet, Text, View } = require('react-native');

const Item = Picker.Item;

type State = {
  value: string | number,
};

class BasicPickerExample extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <Picker
        testID="basic-picker"
        style={styles.picker}
        selectedValue={this.state.value}
        onValueChange={(v) => {
          this.setState({ value: v })
          console.log("value changed")
        }}
      >
        <Item label="hello" value="key0" />
        <Item label="world" value="key1" />
      </Picker>
    );
  }
}

class DisabledPickerExample extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <Picker
        style={styles.picker}
        enabled={false}
        selectedValue={this.state.value}
        onValueChange={(v, p) => {
          this.setState({ value: JSON.stringify(v) })
          console.log("value changed", v, p)
        }}
      >

        <Item label="hello" value="key0" />
        <Item label="world" value="key1" />
      </Picker>
    );
  }
}

class DropdownPickerExample extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <Picker
        style={styles.picker}
        selectedValue={this.state.value}
        onValueChange={(v) => this.setState({ value: v })}
        mode="dropdown">
        <Item label="hello" value="key0" />
        <Item label="world" value="key1" />
      </Picker>
    );
  }
}

class PromptPickerExample extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <Picker
        style={styles.picker}
        selectedValue={this.state.value}
        onValueChange={(v) => this.setState({ value: v })}
        prompt="Pick one, just one">
        <Item label="hello" value="key0" />
        <Item label="world" value="key1" />
      </Picker>
    );
  }
}

type ColorState = {
  color: string | number,
};

class ColorPickerExample extends React.Component<{}, ColorState> {
  state: ColorState = {
    color: 'red',
    test: '123'
  };

  render(): React.Node {
    return (
      <>
        <Picker
          style={[styles.picker, { color: 'white', backgroundColor: '#333' }]}
          selectedValue={this.state.color}
          onValueChange={(v) => this.setState({ color: v })}
          mode="dropdown">
          <Item label="red" color="red" value="red" />
          <Item label="green" color="green" value="green" />
          <Item label="blue" color="blue" value="blue" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={this.state.test}
          onValueChange={(v) => this.setState({ test: v })}
          mode="dialog">
          <Item label="1" color="red" value="red" />
          <Item label="2" color="green" value="green" />
          <Item label="3" color="blue" value="blue" />
        </Picker>
      </>
    );
  }
}

class RNOHColorfulPickerExample extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{ backgroundColor: 'cyan' }}>
        <Picker
          testID="colorful-picker"
          style={{ backgroundColor: "pink", height: 40 }}
          selectedValue={this.state.value}
          itemStyle={{ color: 'green' }}
          selectedItemStyle={{ color: 'white', backgroundColor: 'blue' }}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}


class ItemStyleExample_color extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          selectedValue={this.state.value}
          itemStyle={{ color: 'green' }}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}


class StyleExample_Width extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ width: 100 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_height extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ height: 200 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderWidth extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 1 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
        <Text></Text>
        <Picker
          style={{ borderWidth: 5 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
        <Text></Text>
        <Picker
          style={{ borderWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>

      </View>
    );
  }
}

class StyleExample_borderBottomWidth extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderBottomWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderTopWidth extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderTopWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderLeftWidth extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderLeftWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderRightWidth extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderRightWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 10, borderColor: 'red' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderBottomColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 10, borderBottomColor: 'red' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderTopColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 10, borderTopColor: 'red' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}


class StyleExample_borderLeftColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 10, borderLeftColor: 'red' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderRightColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 10, borderRightColor: 'red' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderStartColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 10, borderStartColor: 'red' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderEndColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 10, borderEndColor: 'red' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderBottomLeftRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderBottomLeftRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderBottomRightRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderBottomRightRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderTopLeftRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderTopLeftRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderTopRightRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderTopRightRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderBottomEndRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderBottomEndRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderBottomStartRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderBottomStartRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderTopEndRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderTopEndRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderTopStartRadius extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderRadius: 0, borderTopStartRadius: 30 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_opacity extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ opacity: 0.3 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_backgroundColor extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ backgroundColor: 'green' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderStyleSolid extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderStyle: 'solid' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderStyleDotted extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderStyle: 'dotted' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}

class StyleExample_borderStyleDashed extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View style={{}}>
        <Picker
          style={{ borderWidth: 5, borderStyle: 'dashed' }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="item with red text" value="key0" />
          <Item label="item with white text & red background" value="key1" />
        </Picker>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  picker: {
    width: 200,
    height: 100,
    borderWidth: 10,
    backgroundColor: 'red',
    borderStyle: 'dashed',
  },
});

exports.title = 'Picker';
exports.description =
  'Provides multiple options to choose from, using either a dropdown menu or a dialog.';
exports.examples = [
  {
    title: '1.selectedValue',
    render: function (): React.Element<typeof BasicPickerExample> {
      return <BasicPickerExample />;
    },
  },
  {
    title: '2.Enabled选择器',
    render: function (): React.Element<typeof DisabledPickerExample> {
      return <DisabledPickerExample />;
    },
  },
  {
    title: '3.mode下拉选择器',
    render: function (): React.Element<typeof DropdownPickerExample> {
      return <DropdownPickerExample />;
    },
  },
  {
    title: '4.Style_width',
    render: function (): React.Node {
      return <StyleExample_Width />;
    },
  },
  {
    title: '4.Style_height',
    render: function (): React.Node {
      return <StyleExample_height />;
    },
  },
  {
    title: '4.Style_borderWidth',
    render: function (): React.Node {
      return <StyleExample_borderWidth />;
    },
  },
  {
    title: '4.Style_borderBottomWidth',
    render: function (): React.Node {
      return <StyleExample_borderBottomWidth />;
    },
  },
  {
    title: '4.Style_borderTopWidth',
    render: function (): React.Node {
      return <StyleExample_borderTopWidth />;
    },
  },
  {
    title: '4.Style_borderLeftWidth',
    render: function ():React.Node {
      return <StyleExample_borderLeftWidth />;
    },
  },
  {
    title: '4.Style_borderRightWidth',
    render: function (): React.Node {
      return <StyleExample_borderRightWidth />;
    },
  },
  {
    title: '4.Style_borderColor',
    render: function (): React.Node {
      return <StyleExample_borderColor />;
    },
  },
  {
    title: '4.Style_borderBottomColor',
    render: function ():React.Node {
      return <StyleExample_borderBottomColor />;
    },
  },
  {
    title: '4.Style_borderTopColor',
    render: function (): React.Node {
      return <StyleExample_borderTopColor />;
    },
  },
  {
    title: '4.Style_borderLeftColor',
    render: function (): React.Node {
      return <StyleExample_borderLeftColor />;
    },
  },
  {
    title: '4.Style_borderRightColor',
    render: function (): React.Node {
      return <StyleExample_borderRightColor />;
    },
  },
  {
    title: '4.Style_borderStartColor',
    render: function (): React.Node {
      return <StyleExample_borderStartColor />;
    },
  },
  {
    title: '4.Style_borderEndColor',
    render: function (): React.Node {
      return <StyleExample_borderEndColor />;
    },
  },
  {
    title: '4.Style_borderRadius',
    render: function (): React.Node {
      return <StyleExample_borderRadius />;
    },
  },
  {
    title: '4.Style_borderBottomLeftRadius',
    render: function (): React.Node {
      return <StyleExample_borderBottomLeftRadius />;
    },
  },
  {
    title: '4.Style_borderBottomRightRadius',
    render: function (): React.Node {
      return <StyleExample_borderBottomRightRadius />;
    },
  },
  {
    title: '4.Style_borderTopLeftRadius',
    render: function (): React.Node {
      return <StyleExample_borderTopLeftRadius />;
    },
  },
  {
    title: '4.Style_borderTopRightRadius',
    render: function (): React.Node {
      return <StyleExample_borderTopRightRadius />;
    },
  },
  {
    title: '4.Style_borderBottomEndRadius',
    render: function (): React.Node {
      return <StyleExample_borderBottomEndRadius />;
    },
  },
  {
    title: '4.Style_borderBottomStartRadius',
    render: function (): React.Node {
      return <StyleExample_borderBottomStartRadius />;
    },
  },
  {
    title: '4.Style_borderTopEndRadius',
    render: function (): React.Node {
      return <StyleExample_borderTopEndRadius />;
    },
  },
  {
    title: '4.Style_borderTopStartRadius',
    render: function (): React.Node {
      return <StyleExample_borderTopStartRadius />;
    },
  },
  {
    title: '4.Style_opacity',
    render: function (): React.Node {
      return <StyleExample_opacity />;
    },
  },
  {
    title: '4.Style_backgroundColor',
    render: function (): React.Node {
      return <StyleExample_backgroundColor />;
    },
  },
  {
    title: '4.Style_borderStyleSolid',
    render: function (): React.Node {
      return <StyleExample_borderStyleSolid />;
    },
  },
  {
    title: '4.Style_borderStyleDotted',
    render: function (): React.Node {
      return <StyleExample_borderStyleDotted />;
    },
  },
  {
    title: '4.Style_borderStyleDashed',
    render: function (): React.Node {
      return <StyleExample_borderStyleDashed />;
    },
  },
  {
    title: '5.itemStyle_color',
    render: function (): React.Node {
      return <ItemStyleExample_color />;
    },
  },
  {
    title: '带颜色的选择器',
    render: function (): React.Element<typeof ColorPickerExample> {
      return <ColorPickerExample />;
    },
  },
  {
    title: '[RNOH]带颜色的选择器',
    render: function (): React.Element<typeof ColorPickerExample> {
      return <RNOHColorfulPickerExample />;
    },
  },
  {
    title: '带提示信息的选择器',
    render: function (): React.Element<typeof PromptPickerExample> {
      return <PromptPickerExample />;
    },
  },
  {
    title: '不带监听的选择器',
    render: function (): React.Element<typeof PromptPickerExample> {
      return (
        /* $FlowFixMe(>=0.99.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.99 was deployed. To see the error, delete
         * this comment and run Flow. */
        <>
          <Picker style={styles.picker}>
            <Item label="hello" value="key0" />
            <Item label="world" value="key1" />
          </Picker>
          <Text>
            Cannot change the value of this picker because it doesn't update
            selectedValue.
          </Text>
        </>
      );
    },
  },
];
