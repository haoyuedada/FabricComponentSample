/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React from "react"
import ResponsiveSvg from "../../components/ResponsiveSvg"
import { View } from "react-native"
import { Size } from "../types"

export interface MarkResultProps {
    markResult: number | undefined,
    xmarkSize: number,
    wrongCircleSize: Size,
}

export enum MarkResultNumber {
    INVALID = -1,
    CORRECT = 1,
    INCORRECT = 0,
}

const markResultIcon: React.FC<MarkResultProps> = ({ markResult, xmarkSize: correctSize, wrongCircleSize }) => {
    if (markResult === MarkResultNumber.CORRECT) {
        return (<View style={{ bottom: 2, right: 2, position: 'absolute' }}>
            <ResponsiveSvg
                source={require('../../../../assets/com.huawei.va.edupage/edu_correct.svg')}
                width={correctSize}
                height={correctSize}
            />
        </View>)
    } else if (markResult === MarkResultNumber.INCORRECT) {
        return (<View style={{ position: 'absolute' }}>
            <ResponsiveSvg
                source={require('../../../../assets/com.huawei.va.edupage/edu_wrong.svg')}
                width={wrongCircleSize.width}
                height={wrongCircleSize.height}
            />
        </View>)
    } else {
        return <></>
    }
}

export default markResultIcon