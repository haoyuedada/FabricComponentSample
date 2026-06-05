/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import DynamicText from "../../../common/components/DynamicText";

interface ReferenceLineProps {
    textAngle?: number;
    title?: string;
    subTitle?: string;
}

const gridOverlay: React.FC<ReferenceLineProps> = ({ textAngle = 0, title, subTitle }) => {
    const promptDivider = (isVertical: boolean): React.ReactNode => {
        const gradientColors = [
            { color: 'rgba(255, 255, 255, 0)', position: 0 },
            { color: 'rgba(255, 255, 255, 1)', position: 0.3 },
            { color: 'rgba(255, 255, 255, 1)', position: 0.7 },
            { color: 'rgba(255, 255, 255, 0)', position: 1 },
        ];

        return (
            <LinearGradient
                colors={gradientColors.map((item) => item.color)}
                start={{ x: isVertical ? 0 : 0, y: isVertical ? 0 : 0 }}
                end={{ x: isVertical ? 1 : 1, y: isVertical ? 1 : 0 }}
                style={[
                    styles.divider,
                    {
                        width: isVertical ? 1 : '100%',
                        height: isVertical ? '100%' : 1,
                    },
                ]}
            />
        );
    };

    return (
        <View testID={'gridOverlay'} style={styles.container}>
            <View style={styles.row}>
                {promptDivider(true)}
                {promptDivider(true)}
            </View>
            <View style={styles.column}>
                {promptDivider(false)}
                {promptDivider(false)}
            </View>
            <View style={[styles.textContainer, { transform: [{ rotate: `${textAngle}deg` }] }]}>
                {title && <DynamicText style={styles.title}>{title}</DynamicText>}
                {subTitle && <DynamicText style={styles.subTitle}>{subTitle}</DynamicText>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    divider: {
        borderRadius: 2,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 5,
    },
    title: {
        fontSize: 14,
        lineHeight: 16,
        color: 'white'
    },
    subTitle: {
        fontSize: 14,
        lineHeight: 16,
        color: 'white',
        maxWidth: '33%',
        textAlign: 'center',
    },
    subjectTips: {
        paddingLeft: 2,
        paddingRight: 2,
    },
    subjectTipsText: {
        fontSize: 14,
        lineHeight: 16,
        color: 'white',
        maxHeight: 80,
    },
});

export default gridOverlay;