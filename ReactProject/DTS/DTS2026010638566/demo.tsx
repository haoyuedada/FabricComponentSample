class StyleExample_borderBottomWidth extends React.Component<{}, State> {
  state: State = {
    value: 'key1',
  };

  render(): React.Node {
    return (
      <View>
        <Text>属性值：borderBottomWidth: 10</Text>
        <Text style={{ marginVertical: 10 }}>预期结果：</Text>
        <Image source={require('../../../assets/Picker_Style_borderBottomWidth.png')} style={{ width: 290, height: 59 }} />
        <Text style={{ marginVertical: 10 }}>实际结果：</Text>
        <Picker
          style={{ borderRadius: 0, borderBottomWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="style" value="key0" />
          <Item label="borderBottomWidth" value="key1" />
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
      <View>
        <Text>属性值：borderTopWidth: 10</Text>
        <Text style={{ marginVertical: 10 }}>预期结果：</Text>
        <Image source={require('../../../assets/Picker_Style_borderTopWidth.png')} style={{ width: 290, height: 52 }} />
        <Text style={{ marginBottom: 10 }}>实际结果：</Text>
        <Picker
          style={{ borderRadius: 0, borderTopWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="style" value="key0" />
          <Item label="borderTopWidth" value="key1" />
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
      <View>
        <Text>属性值：borderLeftWidth: 10</Text>
        <Text style={{ marginVertical: 10 }}>预期结果：</Text>
        <Image source={require('../../../assets/Picker_Style_borderLeftWidth.png')} style={{ width: 290, height: 51 }} />
        <Text style={{ marginBottom: 10 }}>实际结果：</Text>
        <Picker
          style={{ borderRadius: 0, borderLeftWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="style" value="key0" />
          <Item label="borderLeftWidth" value="key1" />
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
      <View>
        <Text>属性值：borderRightWidth: 10</Text>
        <Text style={{ marginVertical: 10 }}>预期结果：</Text>
        <Image source={require('../../../assets/Picker_Style_borderRightWidth.png')} style={{ width: 290, height: 51 }} />
        <Text style={{ marginBottom: 10 }}>实际结果：</Text>
        <Picker
          style={{ borderRadius: 0, borderRightWidth: 10 }}
          selectedValue={this.state.value}
          onValueChange={(v) => this.setState({ value: v })}>
          <Item label="style" value="key0" />
          <Item label="borderRightWidth" value="key1" />
        </Picker>
      </View>
    );
  }
}
