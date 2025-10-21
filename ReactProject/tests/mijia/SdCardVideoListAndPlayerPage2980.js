import React from 'react';
import { View, Text, ImageBackground, Button } from "react-native";

export default class SdCardVideoListAndPlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.showPlayToolBar = true;

  }
  render() {
    return (
      <View style={{ width: '100%', height: '100%'}} >
        {this.renderVideoLayout()}
      </View>
    );
  }

  isDisabled() {
    return (!this.isPlaying)
  }

  renderVideoLayout() {
    return (
      <View style={{ width: '100%', height: "100%" }} >
        <View style={{width: 100, height: 100, backgroundColor: 'red'}}>
          <Button title="模拟切换播放状态" onPress={() => {
            console.log("chy video click==================================this.isPlaying:", this.isPlaying)
              this.isPlaying = !this.isPlaying;
          }}></Button>
          <Button title="切换状态栏显示" onPress={() => {
            this.onVideoViewClick();
            console.log("chy video click==================================this.showPlayToolBar:", this.showPlayToolBar)
          }}></Button>
        </View>
        {this.renderPlayerTool()}
      </View>
    );
  }

  onVideoViewClick = (e) => {
    this.showPlayToolBar = !this.showPlayToolBar;
    this.setState({});
  }

  renderPlayerTool() {
    console.log("chy video renderPlayerTool==================================this.showPlayToolBar:", this.showPlayToolBar)
    if (!this.showPlayToolBar) return;

      speedLayout = 
        <Text style={{color: this.isDisabled() ? "red" : 'blue'}}>hahahahah</Text>
    return (
      <ImageBackground style={{ position: 'absolute', bottom: 0, width: '100%', height: 50, flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: this.isFullScreen ? 20 : 0, pointerEvents: "box-only" }} >
        { speedLayout }
      </ImageBackground>
    );
  }

}