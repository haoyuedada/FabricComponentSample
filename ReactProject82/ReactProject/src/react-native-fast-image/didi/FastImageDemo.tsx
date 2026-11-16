import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import FastImage from "react-native-fast-image"

const source = {
    // uri: "https://img-ys011.didistatic.com/static/ad_oss/1788420657_t9v7y.png",
    uri:"https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487259298/428_428_D7BFF22D4678EB68440F914B352214C4mp_tds.png",
}

export default function SimpleMpxOutputRNDemo() {
    const [fastStart, setFastStart] = useState(0)
    const [fastEnd, setFastEnd] = useState(0)
    const [fastStatus, setFastStatus] = useState("加载中")

    return (
        <View style={[styles.appContainer]}>
            <View>
                <Text style={{ marginBottom: 50 }}>
                    问题描述：父View完全包裹FastImage + 父View开启accessible，那么无障碍模式fastimage无法聚焦和点击。iOS/安卓正常。
                    FastImage需要安装三方依赖@d11/react-native-fast-image@8.13.0。
                </Text>
            </View>

            <View accessible={true}>
                <FastImage
                    source={source}
                    style={{ width: 100, height: 100 }}
                    resizeMode="stretch"
                    onTouchStart={() => setFastStart((count) => count + 1)}
                    onTouchEnd={() => setFastEnd((count) => count + 1)}
                    onLoad={() => setFastStatus("加载成功")}
                    onError={() => setFastStatus("加载失败")}
                    accessible={true}
                    accessibilityLabel="图片fastimage"
                />
            </View>

            <Text style={{ marginTop: 20 }}>{fastStatus}</Text>
            <Text>onTouchStart：{fastStart}</Text>
            <Text>onTouchEnd：{fastEnd}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
    },
})