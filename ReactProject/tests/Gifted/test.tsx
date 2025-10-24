import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Alert,
    FlatList
} from 'react-native';

import Lightbox from 'react-native-lightbox-v2';


const BASE_PADDING = 10;
export function MessageImage() {
    let data = [
        {
          _id: 1,
          text: 'Hello World',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'renderUsernameOnMessage 显示的用户名',
          },
          image: 'https://pic.rmb.bdstatic.com/bjh/events/d882fc1d6d1ff5e4cb4cdfce2f1ac62c1450.jpeg@h_1280',  // 图片的 URL,
        }
      ]

    return (<View style={{"flex":1,  }}>
                <FlatList  data={data}  renderItem={renderRow}  inverted={true} />
            </View>);
}

const renderRow = ({  }) => {
    // let data = {"isKeyboardInternallyHandled":false,"invertibleScrollViewProps":{"inverted":true,"keyboardShouldPersistTaps":"never"},"forwardRef":{"current":null},"isTyping":false,"renderChatEmpty":null,"renderFooter":null,"renderMessage":null,"loadEarlier":false,"listViewProps":{},"extraData":null,"scrollToBottom":false,"scrollToBottomOffset":200,"alignTop":false,"scrollToBottomStyle":{},"infiniteScroll":false,"isLoadingEarlier":false,"user":{},"currentMessage":{"_id":1,"text":"Hello World","createdAt":"2025-10-22T01:43:28.740Z","user":{"_id":2,"name":"renderUsernameOnMessage 显示的用户名"},"image":"https://pic.rmb.bdstatic.com/bjh/events/d882fc1d6d1ff5e4cb4cdfce2f1ac62c1450.jpeg@h_1280"},"previousMessage":{},"inverted":true,"nextMessage":{},"position":"left","renderBubble":null,"renderDay":null,"renderSystemMessage":null,"showUserAvatar":false}
    // let messageImageProps = {"isKeyboardInternallyHandled":false,"invertibleScrollViewProps":{"inverted":true,"keyboardShouldPersistTaps":"never"},"forwardRef":{"current":null},"isTyping":false,"renderChatEmpty":null,"renderFooter":null,"renderMessage":null,"loadEarlier":false,"listViewProps":{},"extraData":null,"scrollToBottom":false,"scrollToBottomOffset":200,"alignTop":false,"scrollToBottomStyle":{},"infiniteScroll":false,"isLoadingEarlier":false,"user":{},"currentMessage":{"_id":1,"text":"Hello World","createdAt":"2025-10-22T01:43:28.740Z","user":{"_id":2,"name":"renderUsernameOnMessage 显示的用户名"},"image":"https://pic.rmb.bdstatic.com/bjh/events/d882fc1d6d1ff5e4cb4cdfce2f1ac62c1450.jpeg@h_1280"},"previousMessage":{},"inverted":true,"nextMessage":{},"position":"left","renderBubble":null,"renderDay":null,"renderSystemMessage":null,"showUserAvatar":false,"touchableProps":{},"onPress":null,"onLongPress":null,"renderMessageImage":null,"renderMessageVideo":null,"renderMessageAudio":null,"renderMessageText":null,"renderCustomView":null,"renderUsername":null,"renderTicks":null,"renderTime":null,"renderQuickReplies":null,"onQuickReply":null,"optionTitles":["Copy Text","Cancel"],"bottomContainerStyle":{},"tickStyle":{},"usernameStyle":{},"containerToNextStyle":{},"containerToPreviousStyle":{}}
    // let messageTextProps = {"isKeyboardInternallyHandled":false,"invertibleScrollViewProps":{"inverted":true,"keyboardShouldPersistTaps":"never"},"forwardRef":{"current":null},"isTyping":false,"renderChatEmpty":null,"renderFooter":null,"renderMessage":null,"loadEarlier":false,"listViewProps":{},"extraData":null,"scrollToBottom":false,"scrollToBottomOffset":200,"alignTop":false,"scrollToBottomStyle":{},"infiniteScroll":false,"isLoadingEarlier":false,"user":{},"currentMessage":{"_id":1,"text":"Hello World","createdAt":"2025-10-22T01:43:28.740Z","user":{"_id":2,"name":"renderUsernameOnMessage 显示的用户名"},"image":"https://pic.rmb.bdstatic.com/bjh/events/d882fc1d6d1ff5e4cb4cdfce2f1ac62c1450.jpeg@h_1280"},"previousMessage":{},"inverted":true,"nextMessage":{},"position":"left","renderBubble":null,"renderDay":null,"renderSystemMessage":null,"showUserAvatar":false,"touchableProps":{},"onPress":null,"onLongPress":null,"renderMessageImage":null,"renderMessageVideo":null,"renderMessageAudio":null,"renderMessageText":null,"renderCustomView":null,"renderUsername":null,"renderTicks":null,"renderTime":null,"renderQuickReplies":null,"onQuickReply":null,"bottomContainerStyle":{},"tickStyle":{},"usernameStyle":{},"containerToNextStyle":{},"containerToPreviousStyle":{}}

    return (<View >
        <View >
            <View style={[ {"flex":1,"alignItems":"flex-start",height: 200} ]}>
                <View style={[ {"borderRadius":15,"backgroundColor":"#f0f0f0","marginRight":60,"minHeight":20,"justifyContent":"flex-end"} ]}>
                    <View>
                        <View>
                            <View >
                                <Lightbox activeProps={{
                                        style:  {flex: 1, resizeMode: 'contain' },
                                    }} >
                                    <Image  style={[{width: 150, height: 100, borderRadius: 13, margin: 3, resizeMode: 'cover'}]} source={{ uri: 'https://pic.rmb.bdstatic.com/bjh/events/d882fc1d6d1ff5e4cb4cdfce2f1ac62c1450.jpeg@h_1280' }}/>
                                </Lightbox>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>);
};

export const ReactNativeLightBoxExample = () => {
    let [info, setInfo] = useState('')

    const callBack = (type: any) => {
        setInfo(type)
        Alert.alert(type)
    }

    let eventObject = {
        willClose: () => callBack('willClose'),
        onClose: () => callBack('onClose'),
        onOpen: () => callBack('onOpen'),
        didOpen: () => callBack('didOpen'),
        onLongPress: () => callBack('onLongPress'),
        onLayout: () => callBack('onLayout'),
        doubleTapCallback: () => callBack('doubleTapCallback'),
        longPressCallback: () => callBack('longPressCallback'),
    }

    return (
        <View style={{ height: 500,width: 300, backgroundColor:"#ffc107"}}>
            <View style={styles.container}>
                <View style={styles.text}>
                    <Text>eventCallBack </Text>
                </View>
                <Lightbox {...eventObject} >
                    <View style={styles.customHeaderBox}>
                        <Text>I have eventCallBack</Text>
                    </View>
                </Lightbox>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: BASE_PADDING,
        backgroundColor: '#68b631',
        height: 500,
        flex: 1
    },
    closeButton: {
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        padding: 8,
        borderRadius: 3,
        textAlign: 'center',
        margin: 10,
        alignSelf: 'flex-end',
    },
    customHeaderBox: {
        height: 150,
        backgroundColor: '#6C7A89',
        justifyContent: 'center',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
        marginLeft: -BASE_PADDING,
        marginRight: -BASE_PADDING,
    },
    col: {
        flex: 1,
    },

    contain: {
        flex: 1,
        height: 150,
    },
    text: {
        marginVertical: BASE_PADDING * 2,
    },
    
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
        backgroundColor: "#1371C3"
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
    },
});
