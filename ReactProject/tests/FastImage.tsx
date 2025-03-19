import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import FastImage, {
  ResizeMode,
  OnLoadEvent,
  OnProgressEvent,
} from "react-native-fast-image";

export default FastImageDemo = () => {
  return (
    <ScrollView>
      <View>
        <FastImage
          style={styles.image}
          source={{
            uri: "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487259298/428_428_D7BFF22D4678EB68440F914B352214C4mp_tds.png",
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoadStart={() => {
            console.log("onLoadStart: success");
          }}
          onProgress={(e: OnProgressEvent) => {
            console.log(
              "onProgress: success loaded=" +
                e.nativeEvent.loaded +
                " total=" +
                e.nativeEvent.total
            );
          }}
          onLoad={(e: OnLoadEvent) => {
            console.log(
              "onLoad: success width=" +
                e.nativeEvent.width +
                " height=" +
                e.nativeEvent.height
            );
          }}
          onError={() => {
            console.log("onError: success");
          }}
          onLoadEnd={() => {
            console.log("onLoadEnd: success");
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    margin: 20,
  },
});