import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Text as SvgText, Defs, ClipPath, Rect } from 'react-native-svg';
/**
 * SvgTextComponent
 * 
 * Props:
 * - text: string - the text to display
 * - fontSize?: number - font size (default: 16)
 * - width?: number | string - SVG width (default: '100%')
 * - height?: number | string - SVG height (default: '100%')
 * - fill?: string - text color (default: 'black')
 * - textAnchor?: 'start' | 'middle' | 'end' - horizontal alignment (default: 'middle')
 */
export default function SvgTextComponent() {

    return (
        <View style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'black' }}>
            <Text>234234</Text>
            <Svg width="100%" height="100%">
                <Defs>
                    <ClipPath id="clip">
                        <SvgText x={100} y="50%" dx="-0.2em" dy="0.3em" textAnchor="middle" fontSize="14">1234567</SvgText>
                        <SvgText x={200} y="50%" dx="0.2em" dy="0.3em" textAnchor="middle" fontSize="14">1234567</SvgText>
                    </ClipPath>
                </Defs>
                <Rect x="0" y="0" width={105} height="100%"
                    fill={'white'} clipPath="url(#clip)"></Rect>
                <Rect x={105} y="0" width={100} height="100%"
                    fill={'#B2B2B2'} clipPath="url(#clip)"></Rect>
            </Svg>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
});
