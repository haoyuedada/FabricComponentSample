class ColorSegmentedControlExample extends React.Component<{}> {
  render() {
    return (
      <View>
        <View style={{marginBottom: 10}}>
          <SegmentedControlIOS
            // tintColor="#ff0000"
            tintColor="orange"
            values={['One', 'Two', 'Three', 'Four']}
            selectedIndex={0}
          />
        </View>
        <View>
          <SegmentedControlIOS
            tintColor="#00ff00"
            values={['One', 'Two', 'Three']}
            selectedIndex={1}
          />
        </View>
      </View>
    );
  }
}