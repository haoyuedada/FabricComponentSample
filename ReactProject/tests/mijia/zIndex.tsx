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

        {/* 鍦板浘椤� */}
        <View
          style={[{ flex: 1}, { width: '100%', height: '100%' }]}
        >
          <Text>鍦板浘涓荤晫闈�</Text>
          <View style={[styles.mapParentView]}>
            <View style={[styles.robotContainer]}>
              <Text>杩欎釜鏄彃浠朵富椤甸潰鎺т欢锛屽鏈哄櫒浜猴紝 涓婃娓呮壂+涓婃鐢ㄦ椂+鍓╀綑鐢甸噺</Text>
            </View>
          </View>
        </View>

        {/* 娓叉煋寮曞椤� */}
        <View style={styles.guide}>
          <Text style={{ backgroundColor: '#c55', padding: 20 }}>杩欐槸寮曞椤礢wiper</Text>
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