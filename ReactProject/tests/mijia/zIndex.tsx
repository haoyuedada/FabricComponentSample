import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default class WLHomePage extends React.PureComponent {
  render() {
    return (
      <View style={[styles.container]}>

        <View
          style={[{ flex: 1 }, { width: '100%', height: '100%' }]}
        >
          <Text>title1</Text>
          <View style={[styles.mapParentView]}>
            <View style={[styles.robotContainer]}>
              <Text>content1</Text>
            </View>
          </View>
        </View>

        <View style={{
          width: "100%",
          height: "100%",
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#dfd',
          paddingTop: 300,
        }}>
          <Text style={{ backgroundColor: '#c55', padding: 20 }}>content2</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems: 'center'
  },
  guide: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#dfd',
    paddingTop: 300,
  },
  mapParentView: {
    flex: 1,
    backgroundColor: '#d67',
    width: "100%",
    height: "100%",
  },
  robotContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 430,
    // position: 'relative',
    width: 200,
    height: 150,
    backgroundColor: 'rgba(202, 53, 202, 1)',
  }
});