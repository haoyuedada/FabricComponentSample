import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, SafeAreaView, Platform, StatusBar, PixelRatio, Dimensions, TouchableWithoutFeedback, I18nManager, Button } from 'react-native';
// import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../util2/Const';
// import BasePage, { BaseStyles } from "../BasePage";


/**
 * 线上只出海设备的逻辑：
freeHomSurStatus: 
true  会弹免费看家3个月的对话框提示，看家引导页显示新文案，会显示顶部的浮窗
false 以上行为都不会触发
freeHomeSurExpireTime:
在免费看家快要到期一个月内的时候，顶部显示浮窗，提示还有多少天 浮窗到期；
目前大陆：
060a02 freeHomSurStatus  false，不会展示免费看家对话框提示，不会引导页新文案，不会显示顶部浮窗；
产品预期：
060a02大陆，一直显示顶部显示浮窗，提示购买云存；看家引导页显示新文案
服务器修改大陆不支持免费看家设置 应该做如下处理：
freeHomSurStatus = true     freeHomeSurExpireTime = -1  app端才能识别得到是这种特殊场景

2023.7.18
服务器fix了freeHomSurStatus的设置问题：
https://xiaomi.f.mioffice.cn/docx/doxk49HzV5Yytb9oAbmjZRIzUTe
freeHomSurStatus和freeHomeSurExpireTime 只对非云存用户有效。
freeHomSurStatus：
  -  false：表示该用户设备没有免费看家视频的试用限制，默认一直会有7天免费看家视频。
  -  true：表示该用户设备有免费看家视频的试用限制，限制策略由freeHomeSurExpireTime参数确定。当freeHomeSurExpireTime 的值是一个：
    - timestamp：在该时间之前，会有免费看家视频，而且会有免费看家视频的试用弹窗提醒。之后只有事件无视频。
    - -2:  表示没有免费看家视频的试用期，只有事件。
 */
export default class AlarmVideoUI extends React.Component {

    constructor(props) {
        super(props);
        // this.initState({
        //     showDownloadHint: false
        // })
        this.state = { showDownloadHint: false }
    }

    doDld(aForShare) {
        this.setState({ showDownloadHint: true });
    }
    render() {
        return (
            <View style={[{ flexDirection: 'column', marginTop: 200}]}>
                {this.renderContent()}
            </View>
        );
    }

    renderContent(mCtnStl, mHeaderHeigth, faceInfo, peopleMotion, Pet, mPlayerToolBarPaddingLeft) {
        return (
            <View>
                <Button title='hahaha' onPress={() => {
                    if (!this.state.showDownloadHint) {
                        this._showConfimTips(true);
                    }
                    // this._showConfimTips(true)
                }}></Button>
                {this._renderDownloadHint()}
            </View>
        );
    }
    _showConfimTips(isDownload) {
        this.doDld(false);
    }


    _renderDownloadHint() {
        console.log("chy crash _renderDownloadHint1")
        // 下载提示
        
        console.log("chy crash _renderDownloadHint return")
        return (
            //   <View>
            <View style={{
                left: 'auto',
                backgroundColor: 'red',
            }}>
                <Text>1234567</Text>
                <View>
                                    <Text>1234567</Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: BaseStyles.mainBg.backgroundColor
    },
    
    fullScreenContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },

    player: {
        width: "100%",
        // height: 9 * SCREEN_WIDTH / 16,
        backgroundColor: 'black'
    },
    fullscreenPlayer: {
        width: "100%",
        height: "100%"
    },

    playerToolbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 5
    },
    desc: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        marginBottom: 10
    }
});
