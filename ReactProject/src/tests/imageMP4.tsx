import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import RNCVideo from "react-native-video"; 

export default class VideoPlayerExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ScrollView>
        <TouchableOpacity style={{borderWidth: 2, borderColor: 'red'}} id='2323' onPress={() => {
          console.log("Image clicked");
        }}>
          <View style={{borderWidth: 2, borderColor: 'blue'}}>
            <Text>23423432</Text>
          </View>
        </TouchableOpacity>
        <RNCVideo
          // style={styles.vid
          source={{ uri: require("./assets/mp4/245_1752306538.mp4"), isNetwork: true }}
          poster={
            "https://res.vmallres.com/pimages/uomcdn/CN/pms/202304/sbom/4002010007801/group/800_800_9B1356F1330EADDCB20D35D2AE1F46E0.jpg"
          }
          onLoad={(e) => {
          }}
          onLoadStart={(e) => {

          }}
          onProgress={(e) => {

          }}
          onError={(e) => {
          }}
          onEnd={() => {
          }}
          onBuffer={(e) => {
          }}
          onPlaybackStalled={() => {
          }}
          onPlaybackResume={() => {
          }}
          onReadyForDisplay={() => {
            console.log(`onReadyForDisplay :setShowPoster(false)`);
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
