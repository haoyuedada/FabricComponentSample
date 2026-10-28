import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { Dimensions, Image, View } from 'react-native';

const imageSize = Dimensions.get('window').height;
const imageUrl =
    'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/14536770806/e438/ebdc/8c71/0bfec6b8ef744e14a2dd052352abdcfe.png';

export default function ImageBlurInMaskedViewRepro() {
    return (
        <MaskedView
            style={{ height: 300 }}
            maskElement={<View style={{ flex: 1, backgroundColor: '#000' }} />}>
            <View collapsable={false}>
                <View
                    style={{
                        height: 300,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        backgroundColor: '#93979F',
                    }}>
                    <Image
                        blurRadius={50}
                        resizeMode="cover"
                        source={{
                            uri: imageUrl,
                            width: imageSize,
                            height: imageSize,
                        }}
                        style={{
                            width: imageSize,
                            height: imageSize,
                            alignSelf: 'center',
                        }}
                    />
                </View>
            </View>
        </MaskedView>
    );
}