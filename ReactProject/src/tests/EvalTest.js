import React from "react";
import { StyleSheet, View, Button } from "react-native";

export default FastImageDemo = () => {

    return (
        <View style={{ marginTop: 200 }}>
            <Button title="click" onPress={() => {
                let aItm = {
                    "id": 123
                }
                let click = {
                    cond: "this.id === 123",
                }
                let condf = function () {
                    return eval(click.cond);
                    // return new Function("return " + click.cond).call(this);
                };
                condRet = condf.call(aItm);
                console.log("chy rListItem confRet:", condRet)
            }}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        margin: 20,
    },
});