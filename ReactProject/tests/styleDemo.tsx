import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, TextInput } from 'react-native';


class DisplayAnImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textSecurity: true,
            wifiInfo: {},
            ssid: '',
            password: '',
            hideRepeater: false,
            ssidText: '',
            passwordText: '',
            curHideRepeater: false,
            alertVisible: false,
            // loading:false,
        }
    }

    render() {
        return (
            <View style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingBottom: 20,
                paddingLeft: 12,
                paddingRight: 12,
                marginTop: 12,
            }}>
                <Text style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginTop: 16,
                }}>Wi-Fi设置</Text>

                <View style={{
                    marginTop: 20,
                    backgroundColor: '#F5F5F5',
                    borderRadius: 10,
                    width: Dimensions.get('window').width - 48,
                    height: 96,
                }}>
                    <View style={{
                        paddingLeft: 16,
                        paddingRight: 12,
                        paddingBottom: 15,
                        height: 48,
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#000',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            justifyContent: 'center',
                            paddingTop: 15,
                        }}>名称</Text>
                        <TextInput style={{
                            fontSize: 16,
                            height: Platform.OS === 'ios' ? 24 : 30,
                            // height: Platform.OS === 'harmony' ? 24 : 30,
                            marginLeft: 10,
                            paddingTop: Platform.OS === 'ios' ? 0 : -10,
                            // paddingTop: Platform.OS === 'harmony' ? 0 : -10,
                            color: '#666666',
                            marginTop: Platform.OS === 'ios' ? 12 : 17,
                            // marginTop: Platform.OS === 'harmony' ? 12 : 17,
                            width: Dimensions.get('window').width - 48 - 80,
                        }}
                            placeholder="请输入Wi-Fi名称"
                            placeholderTextColor='#ccc'
                            defaultValue="1234567890"
                            selectionColor='#999'
                            underlineColorAndroid={'transparent'}
                            textAlignVertical='center'
                            textAlign='left'
                            // onChangeText={(text) => {
                            //     this.setState({
                            //         ssidText: text
                            //     })
                            // }}
                        >
                        </TextInput>
                    </View>
                    <View style={{
                        paddingLeft: 16,
                        paddingBottom: 15,
                        height: 48,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: Dimensions.get('window').width - 98
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#000',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            justifyContent: 'center',
                            paddingTop: 15,
                        }}>密码</Text>
                        <TextInput style={{
                            fontSize: 16,
                            height: Platform.OS === 'ios' ? 28 : 40,
                            marginStart: 10,
                            // paddingTop:ios?0:-10,
                            paddingRight: 40,
                            color: '#666666',
                            marginTop: Platform.OS === 'ios' ? 14 : 19,
                            width: 269.69230,
                        }}
                            placeholder='请输入Wi-Fi密码'
                            placeholderTextColor='#ccc'
                            // defaultValue={this.state.passwordText}
                            selectionColor='#999'
                            underlineColorAndroid={'transparent'}
                            textAlignVertical='center'
                            onChangeText={(text) => {
                                this.setState({
                                    passwordText: text
                                })
                            }}
                        >
                        </TextInput>
                    </View>
                </View>
            </View>
        )
    }
}

export default DisplayAnImage;