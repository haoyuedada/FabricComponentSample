// import { Button, View } from "react-native";
// import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

// export default function App() {
//   const width = useSharedValue(100);

//   const handlePress = () => {
//     width.value = withSpring(width.value + 50);
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center" }}>
//       <Animated.View
//         style={{
//           width,
//           height: 100,
//           backgroundColor: "violet",
//         }}
//       />
//       <Button onPress={handlePress} title="Click me" />
//     </View>
//   );
// }


// import React from "react";
// import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
// import { WebView } from 'react-native-webview';


// const TempScreen = () => {
//   const richText = React.useRef();
//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
//           <Text>Description:</Text>
//           <WebView
//             useWebKit={true}
//             scrollEnabled={false}
//             hideKeyboardAccessoryView={true}
//             keyboardDisplayRequiresUserAction={false}
//             originWhitelist={['*']}
//             dataDetectorTypes={'none'}
//             domStorageEnabled={false}
//             bounces={false}
//             javaScriptEnabled={true}
//             source={{
//               html: `
// <html>
// <body>
// <h1>Hello from WebView</h1>
// </body>
// </html>
// `,
//             }}
//             onShouldStartLoadWithRequest={(event) => {
//               if (event.url !== 'about:blank') {
//                 console.log('1111111', event.url)
//                 return false;
//               }
//               console.log('11111112222222', event.url)
//               return true;
//             }}
//           />
//         </KeyboardAvoidingView>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TempScreen;


// import React from 'react';
// import { ScrollView, Text, View,StyleSheet, Alert } from 'react-native';
// import {MapView, Circle, Polygon, Polyline, Marker, LatLng,CameraPosition,voidEvent} from 'react-native-amap3d';

// import type * as ReactNative from "react-native";

// const points = [
//   {
//     latitude: 39.806901,
//     longitude: 116.397972,
//   },
//   {
//     latitude: 39.806901,
//     longitude: 116.297972,
//   },
//   {
//     latitude: 39.906901,
//     longitude: 116.397972,
//   },
// ];

// const points2 = [
//   {
//     latitude: 39.836901,
//     longitude: 116.497972,
//   },
//   {
//     latitude: 39.836901,
//     longitude: 116.397972,
//   },
//   {
//     latitude: 39.936901,
//     longitude: 116.497972,
//   },
// ];

// const line1 = [
//   { latitude: 40.006901, longitude: 116.097972 },
//   { latitude: 40.006901, longitude: 116.597972 },
// ];
// const line3 = [
//   { latitude: 39.806901, longitude: 116.097972 },
//   { latitude: 39.806901, longitude: 116.257972 },
//   { latitude: 39.806901, longitude: 116.457972 },
//   { latitude: 39.806901, longitude: 116.597972 },
// ];

// function AMapDemo() {
//   return (
//     <View style={styles.container}>
// 		<MapView 
//     mapType={1}
//     myLocationEnabled = {true}
//     onPress={(event: ReactNative.NativeSyntheticEvent<LatLng>)=>{
//       console.info("AMapViewEventType map3d demo " + event.nativeEvent.latitude + "===" + event.nativeEvent.longitude)
//     }}
//     onLongPress={(event: ReactNative.NativeSyntheticEvent<LatLng>)=>{
//       console.info("AMapViewEventType map3d demo longevent===" + event.nativeEvent.latitude + "===" + event.nativeEvent.longitude)
//     }}
//     onLoad={(event: ReactNative.NativeSyntheticEvent<voidEvent>) => {
//       Alert.alert("onLoad successful")
//     }}
//     > 
//     <Circle
//       strokeWidth={5}
//       strokeColor="rgba(0, 0, 255, 0.5)"
//       fillColor="rgba(255, 0, 0, 0.5)"
//       radius={500}
//       center={{ latitude: 39.906901, longitude: 116.397972 }}
//     />
//     <Polygon
//       strokeWidth={5}
//       strokeColor="rgba(0, 0, 255, 0.5)"
//       fillColor="rgba(255, 0, 0, 0.5)"
//       points={points}
//     />
//     <Polyline width={100}  color="rgba(0, 255, 0, 0.5)" points={line1} onPress={() => { console.info("AMapViewEventType map3d polyline onPress width 200")}} />
//     <Marker
//       draggable={true}
//       position={{ latitude: 39.806901, longitude: 116.397972 }}
//       onPress={() => Alert.alert("onPress")}
//       onDragEnd={({ nativeEvent }) =>
//         Alert.alert(`onDragEnd: ${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
//     />
//     <Marker
//         draggable={true}
//         flat={false}
//         position={{ latitude: 45.806901, longitude: 117.397972 }}
//     >
//         <Text
//             style={{
//                 color: "#fff",
//                 backgroundColor: "#ff6977",
//                 margin:5,
//                 width:"14%",
//             }}
//         >
//             {"testMarker"}
//         </Text>
//     </Marker>
//     </MapView>
// 	</View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     flex: 1,
//     paddingTop: 24,
//   }
// });
// export default AMapDemo;




// import React from 'react';
// import { Button } from 'react-native';
// import RNShare,{ShareSheet} from 'react-native-share';

// function App() {
// let   ImageUri='file://com.example.myapplication/data/storage/el2/base/haps/entry/temp/ScreenSnapshot-202501001155556960.jpg'

// return (

//       <ShareSheet style={{ padding: 20 ,margin:30 }} visible onCancel={() => { }}>
//           <Button title='分享' onPress={() => {
//               RNShare.open({
//                   title: '分享标题',
//                   subject: '分享摘要',
//                   url: ImageUri
//               })
//           }}></Button>
//       </ShareSheet>
  
// );
// }

// export default App;


import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetView,BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
  
      >
        <BottomSheetScrollView>
        {[...Array(50)].map((_, index) => (
<Text style={{ textAlign: 'center', padding: 50 }} key={index}>第 {index + 1} 个文本</Text>
))}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
});

export default App;