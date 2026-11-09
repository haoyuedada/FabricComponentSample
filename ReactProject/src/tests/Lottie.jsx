import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <LottieView 
        style={{ width: 300, height: 300 }} 
        source={require("../assets/gradientBall.json")}   
        autoPlay 
        loop />
    </View>
  );
};

export default App;