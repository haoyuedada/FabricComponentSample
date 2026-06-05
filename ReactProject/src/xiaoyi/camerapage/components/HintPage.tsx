/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasicHeader from '../../components/BasicHeader';
import { colors } from '../../../common/theme/Type';
import DynamicText from "../../../common/components/DynamicText";

const hintPage = (): React.ReactElement => {
    return (
        <View style={styles.container} >
            <View style={{ position: 'absolute', left: 0, top: 0 }}>
                <BasicHeader color={colors.white90} bgColor={'#ffffff19'} />
            </View>
            <DynamicText style={styles.hint}>{'请在全屏状态下进行拍题'}</DynamicText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    hint: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default hintPage;