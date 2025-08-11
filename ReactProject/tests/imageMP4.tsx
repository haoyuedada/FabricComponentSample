import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  ActivityIndicator,
  findNodeHandle,
  Image,
  TouchableOpacity
} from 'react-native';
import Video from '@react-native-oh-tpl/react-native-video';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class VideoPlayerExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        {/* {loading && (
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            size="large"
            color="#000"
          />
        )} */}
        {/* <Video
          ref={this.videoRef}
          source={{ uri: "file://data/storage/el2/base/haps/entry/files/tests/assets/mp4/245_1752306538.mp4"}} // Replace with your video source
          style={styles.video}
          resizeMode="contain"
          paused={paused}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
        /> */}
        {/* file:///data/storage/el2/base/haps/entry/files/tests/assets/expo.png */}
        <TouchableOpacity style={{borderWidth: 2, borderColor: 'red'}} id='2323' onPress={() => {
          console.log("Image clicked");
        }}>
          <View style={{borderWidth: 2, borderColor: 'blue'}}>
            <Image style={{height: 200, width: 200}} source={{uri: "file:///data/storage/el2/base/haps/entry/files/tests/assets/mp4/245_1752306538.mp4"}}></Image>
          </View>
        </TouchableOpacity>
        {/* <Image style={{height: 200, width: 200}} source={require("./assets/expo.png")}></Image>
        <Image style={{height: 200, width: 200}} source={require("./assets/fig-without-poppy.jpeg")}></Image>
        <Image style={{height: 200, width: 200}} source={{uri: "file:///data/storage/el2/base/haps/entry/files/tests/assets/mp4/303_1754468294.mp4"}}></Image>
        <Image style={{height: 200, width: 200}} source={require("./assets/expo.png")}></Image>
        <Image style={{height: 200, width: 200}} source={require("./assets/expo.png")}></Image> */}

        {/* <View style={styles.controls}>
          <Button
            title={paused ? '播放' : '暂停'}
            onPress={this.togglePlayPause}
          />
          <Button
            title="快进到10s"
            onPress={this.seekTo10}
          />
          <Button
            title="获取 tag"
            onPress={this.getTag}
          />
        </View>

        <View style={styles.progress}>
          <View style={styles.progressBarBackground} />
          <View
            style={[
              styles.progressBarFilled,
              { width: (currentTime / duration) * SCREEN_WIDTH },
            ]}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 9) / 16,
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-around',
    width: SCREEN_WIDTH * 0.8,
  },
  progress: {
    marginTop: 8,
    width: SCREEN_WIDTH,
    height: 4,
    flexDirection: 'row',
  },
  progressBarBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#eee',
  },
  progressBarFilled: {
    height: 4,
    backgroundColor: '#3b82f6',
  },
});
