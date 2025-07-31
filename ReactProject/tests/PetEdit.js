import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
  Keyboard,
  Modal, TouchableOpacity
} from 'react-native';

const screenW = Dimensions.get('window').width;

export default class PetEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType={ 'slide' }
        transparent={ true }
        visible={ true }
      >
              <View style={ styles.view_top }>
                <Text style={ styles.text_top }>1111111111</Text>
                <Text style={ styles.text_top_second }>22222222222</Text>
              </View>
              <View style={ styles.view_center }>
                <TouchableOpacity style={ styles.view_center_second }
                  onPress={ () => {
                    // this.setState({ actionSheetVisible: false });
                    // this.props.navigation.push('RecommendPlan', { parentPage: 'More' });
                  } }>
                  <Text style={ styles.text_center }>33333333333</Text>
                </TouchableOpacity>
                {
                  <TouchableOpacity style={ styles.view_center_add_pet }
                    onPress={ () => { } }>
                    <Text style={ styles.text_center }>4444444444</Text>
                  </TouchableOpacity>
                }

              </View>

              <TouchableOpacity style={ styles.view_bottom }
                onPress={ () => { } }>
                <Text style={ styles.text_bottom }>5555555555</Text>
              </TouchableOpacity>
      </Modal>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7'
  },
  dialogContainer: {
    height: 150,
    marginLeft: -1,
    marginRight: -1
  },
  deleteButton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 21,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    width: screenW - 30 * 2,
    marginTop: 40
  },
  deleteTitle: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  },
  view_content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  view_support: {
    width: screenW,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },

  button_card: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  view_top: {
    width: screenW,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },
  text_top: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    lineHeight: 22
  },
  text_top_second: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19
  },
  view_center: {
    marginTop: 24
  },
  view_center_second: {
    width: screenW,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view_center_add_pet: {
    width: screenW,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_center: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    margin: 15
  },
  view_bottom: {
    height: 46,
    width: screenW - 68,
    borderRadius: 23,
    marginTop: 16,
    marginBottom: 27,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_bottom: {
    fontSize: 16,
    color: '#4c4c4c',
    fontWeight: '600'
  },
  deleteDialogViewStyle: {
    marginBottom: 15,
    marginLeft: -1,
    marginRight: -1,
    overflow: 'hidden'
  }

});
