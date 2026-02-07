import React from "react";
import { Text } from "react-native";

const TextInANest = () => {
    return (
        <Text onTextLayout={(e) => { console.log("测试AAAAA： ", e.nativeEvent.lines) }}
        >这是一段用于测试的文字，这是一段用于测试的文字，这是一段用于测试的文字，这是一段用于测试的文字
        </Text>
    );
};

export default TextInANest;