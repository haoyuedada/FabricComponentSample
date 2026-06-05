/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React from 'react';
import Svg, {Rect, Defs, Mask, Path} from 'react-native-svg';
import {RectArea, Size} from '../types';
import {StyleSheet} from 'react-native';

export interface SvgMaskProps {
    rectList: RectArea[] | null;
    containerLayout: Size;
    isShowCornerPaths?: boolean;
}

const TAG: string = 'MultiHighLightSvgMask';

/**
 * 多个矩形进行高亮展示
 *
 * @param rect 需高亮区域
 * @param containerLayout 整个容器的尺寸
 * @returns
 */
export const multiHighLightSvgMask: React.FC<SvgMaskProps> = ({
                                                    rectList,
                                                    containerLayout,
                                                    isShowCornerPaths = false,
                                                }) => {
    {
        /* SVG蒙层：覆盖全屏，通过遮罩实现镂空 */
    }
    const lineOffset = 4;
    const radius = 4;
    const halfLineWidth = 0; // 线条居中贴合圆角外侧（微调偏移）
    if (!rectList?.length) {
        rectList = [{x: 0, y: 0, width: 0, height: 0}];
    }
    let topEdge = rectList?.[0].y ?? 0;
    let leftEdge = rectList?.[0].x ?? 0;
    if (isNaN(topEdge) || isNaN(leftEdge)) {
        return <></>;
    }

    const cornerPath = (rectArea: RectArea): ({d: string}[]) => {
        return [
            // 1. 左上角弧形：从左到上的四分之一圆（顺时针）
            {
                d:
                    `M ${rectArea.x - halfLineWidth} ${
                        rectArea.y + radius + lineOffset
                    } ` +
                    `L ${rectArea.x - halfLineWidth} ${rectArea.y + radius} ` +
                    `A ${radius} ${radius} 0 0 1 ${rectArea.x + radius} ${
                        rectArea.y - halfLineWidth
                    } ` +
                    `L ${rectArea.x + radius + lineOffset} ${rectArea.y - halfLineWidth}`,
            },
            // 2. 右上角弧形：从上到右的四分之一圆（顺时针）
            {
                d:
                    `M ${rectArea.x + rectArea.width - radius - lineOffset} ${
                        rectArea.y - halfLineWidth
                    } ` +
                    `L ${rectArea.x + rectArea.width - radius} ${
                        rectArea.y - halfLineWidth
                    } ` +
                    `A ${radius} ${radius} 0 0 1 ${
                        rectArea.x + rectArea.width + halfLineWidth
                    } ${rectArea.y + radius} ` +
                    `L ${rectArea.x + rectArea.width + halfLineWidth} ${
                        rectArea.y + radius + lineOffset
                    }`,
            },
            // 3. 右下角弧形：从右到下的四分之一圆（顺时针）
            {
                d:
                    `M ${rectArea.x + rectArea.width + halfLineWidth} ${
                        rectArea.y + rectArea.height - radius - lineOffset
                    } ` +
                    `L ${rectArea.x + rectArea.width + halfLineWidth} ${
                        rectArea.y + rectArea.height - radius
                    } ` +
                    `A ${radius} ${radius} 0 0 1 ${
                        rectArea.x + rectArea.width - radius
                    } ${rectArea.y + rectArea.height + halfLineWidth}` +
                    `L ${rectArea.x + rectArea.width - radius - lineOffset} ${
                        rectArea.y + rectArea.height + halfLineWidth
                    }`,
            },
            // 4. 左下角弧形：从下到左的四分之一圆（顺时针）
            {
                d:
                    `M ${rectArea.x + radius + lineOffset} ${
                        rectArea.y + rectArea.height + halfLineWidth
                    } ` +
                    `L ${rectArea.x + radius} ${
                        rectArea.y + rectArea.height + halfLineWidth
                    } ` +
                    `A ${radius} ${radius} 0 0 1 ${rectArea.x - halfLineWidth} ${
                        rectArea.y + rectArea.height - radius
                    } ` +
                    `L ${rectArea.x - halfLineWidth} ${
                        rectArea.y + rectArea.height - radius - lineOffset
                    }`,
            },
        ];
    };

    const buildCornerPaths = (rectList: RectArea[]): {d: string}[][] => {
        return rectList.map((rect: RectArea) => {
            return cornerPath(rect);
        });
    };

    // 框选矩形，四个边上的加粗圆角
    const cornerPaths: {d: string}[][] = buildCornerPaths(rectList);

    return (
        <Svg style={styles.svgMask}>
            <Defs>
                {/* 蒙层区域 */}
                <Mask
                    id="highlightMask"
                    maskContentUnits="userSpaceOnUse"
                    maskUnits="userSpaceOnUse">
                    <Rect
                        x={0}
                        y={0}
                        width={containerLayout.width}
                        height={containerLayout.height}
                        fill="white"
                    />

                    {/* 2. 高亮区域黑色矩形：蒙层的镂空区域（黑色=隐藏） */}
                    {rectList.map((item: RectArea, index: number) => (
                        <Rect
                            key={index}
                            x={item.x}
                            y={item.y}
                            width={item.width}
                            height={item.height}
                            rx={radius} // 圆角
                            ry={radius}
                            fill="black"
                            stroke="black"
                            strokeWidth="2"
                            strokeDasharray="1,4" // 虚线模式：10px实线 + 5px空白
                            strokeLinecap="round" // 圆角端点
                        />
                    ))}
                </Mask>
            </Defs>

            {/* 黑色半透明蒙层 */}
            <Rect
                x={0}
                y={0}
                width={containerLayout.width}
                height={containerLayout.height}
                fill={'#000'}
                opacity={0.4}
                mask="url(#highlightMask)" // 关联遮罩
            />

            {/* 四个圆角的弧形线条 */}
            {isShowCornerPaths && cornerPaths.map((paths, outIndex) =>
              paths.map((path, innerIndex) => (
                <Path
                  key={`${outIndex}_${innerIndex}`}
                  d={path.d} // 弧形路径
                  fill="none" // 不填充，仅显示线条
                  stroke={'#FFF'}
                  strokeWidth={2}
                  strokeOpacity={1}
                  strokeLinecap="round" // 弧形端点圆润
                />
              )),
            )}
        </Svg>
    );
};

const styles = StyleSheet.create({
    svgMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
});

export default multiHighLightSvgMask;
