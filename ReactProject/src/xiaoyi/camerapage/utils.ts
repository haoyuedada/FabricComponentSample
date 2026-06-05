/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import { makeMutable } from 'react-native-reanimated';
import {
    CloudModeParam,
    CloudProblemRectInfo,
    CvAnalyseMessageBody,
    FunctionMode,
    ImageDimensions,
    ImageLayoutResult,
    LocaleProblemRectInfo,
    MarkResultPayload,
    Point,
    QUESTION_IMG_TYPE,
    SceneType,
    SelectionBoxType,
    Size
} from './types';
import EduLogger from '../utils/EduLogger';
import { AgentModel } from '../Type';
import { BaseUtils } from '../../common/utils/BaseUtils';
import { asyncStorage } from "../common/utils/AsyncStorageWrapper";
import { EDU_SELECT_GRADE, IGradeInfo } from "../gradePage/Type";

export const createBox = (
    x: number,
    y: number,
    width: number,
    height: number
): SelectionBoxType => {
    const id = `box-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    return {
        id,
        x: makeMutable(x),
        y: makeMutable(y),
        width: makeMutable(width),
        height: makeMutable(height),
        context: makeMutable({
            startX: x,
            startY: y,
            startWidth: width,
            startHeight: height,
        }),
    };
};

export function initDefaultBox(
    imgWidth: number,
    imgHeight: number,
    scale: number,
    displayRect: ImageDimensions['displayRect'],
): SelectionBoxType {
    const DEFAULT_BOX_WIDTH = imgWidth * 0.3 * scale;
    const DEFAULT_BOX_HEIGHT = DEFAULT_BOX_WIDTH * 0.75;

    let box = createBox(
        displayRect.left + 40,
        displayRect.top + 40,
        DEFAULT_BOX_WIDTH,
        DEFAULT_BOX_HEIGHT
    )
    return box;
};

/**
 * 根据输入的方向和图片大小对下发的题目选框进行旋转校正
 *
 * @param problemRect
 * @param orientation 0是原始方向，1是顺时针90度， 2是顺时针180度，3是顺时针270度
 * @param imageHeight
 * @param imageWidth
 */
export function rotateRect(problemRect: LocaleProblemRectInfo, orientation: number, imageHeight: number,
    imageWidth: number, useOriginImage: boolean): void {
    EduLogger.info(`rotateRect: ${orientation} ${typeof orientation}`, '[utils]');
    if (problemRect?.originArea?.length !== 4 || problemRect?.postProcArea?.length !== 4) {
        return;
    }
    let func: (point: Point) => Point;
    let shift: number = 0;
    switch (orientation) {
        case 1: // 图片顺时针旋转90°，需要再顺时针旋转270°进行校正
            func = (point: Point): Point => ({ x: point.y, y: imageWidth - point.x } as Point);
            shift = 1; // 点排列顺序变为：1 2 3 0
            break;
        case 2: // 图片顺时针旋转180°，需要再顺时针旋转180°进行校正
            func = (point: Point): Point => ({ x: imageWidth - point.x, y: imageHeight - point.y } as Point);
            shift = 2; // 点排列顺序变为：2 3 0 1
            break;
        case 3: // 图片顺时针旋转270°，需要再顺时针旋转90°进行校正
            func = (point: Point): Point => ({ x: imageHeight - point.y, y: point.x } as Point);
            shift = 3; // 点排列顺序变为：3 0 1 2
            break;
        case 0:
        default:
            func = (point: Point): Point => (point as Point);
            break;
    }
    const transposedPoints: Point[] = useOriginImage ?
        problemRect.originArea.map(point => func(point)) :
        problemRect.postProcArea.map(point => func(point))
    const result: Point[] = [];
    EduLogger.debug(`transposedPoints: ${JSON.stringify(transposedPoints)}`, `rotateRect`);
    const newIndex = (index: number): number => (index + shift) % 4;
    for (let i = 0; i < 4; i++) {
        result[i] = transposedPoints[newIndex(i)];
    }
    if (useOriginImage) {
        problemRect.originArea = result;
    } else {
        problemRect.postProcArea = result;
    }
}

export function getRotatedSize(width: number, height: number, orientation?: number, cvOrientation?: number): [number, number] {
    const totalRotate: number = ((orientation ?? 0) + (cvOrientation ?? 0)) % 4
    return [1, 3].includes(totalRotate) ? [height, width] : [width, height]
}

export function calcImageDisplayParams(containerLayout: Size, photoSize: Size, displayOrientation: number | undefined,
                                       cloudOrientation: number | undefined, tag: string): ImageLayoutResult {
    const [virtualContainerWidth, virtualContainerHeight] = getRotatedSize(containerLayout.width, containerLayout.height, 0, cloudOrientation) // 获得由云侧旋转带来的容器尺寸变化。例如云侧下发旋转90°, 则图片[宽,高]限制对应的是容器[高,宽]; EXIF信息在展示时自然旋转, 无需额外变更容器尺寸进行约束计算

    const originalWidth = photoSize.width
    const originalHeight = photoSize.height

    // 计算云侧矫正前对应的图片宽高像素, 需要考虑EXIF信息; 不需要再基于云侧信息旋转，因为virtualContainer在计算时已经考虑了云侧纠正，这里当成正向图片处理即可
    const [rotatedWidth, rotatedHeight] = getRotatedSize(originalWidth, originalHeight, displayOrientation, 0)

    const imageAspect = rotatedWidth / rotatedHeight;
    const containerAspect = virtualContainerWidth / virtualContainerHeight;

    let displayWidth, displayHeight;
    if (imageAspect > containerAspect) {
        displayWidth = virtualContainerWidth;
        displayHeight = virtualContainerWidth / imageAspect;
    } else {
        displayHeight = virtualContainerHeight;
        displayWidth = virtualContainerHeight * imageAspect;
    }

    const scale = displayWidth / rotatedWidth;
    const [left, top] = getRotatedSize((virtualContainerWidth - displayWidth) / 2, (virtualContainerHeight - displayHeight) / 2, 0, cloudOrientation)
    const [right, bottom] = getRotatedSize((virtualContainerWidth + displayWidth) / 2, (virtualContainerHeight + displayHeight) / 2, 0, cloudOrientation)

    EduLogger.info(`originalSize: ${originalWidth} ${originalHeight}; containerSize: ${containerLayout.width} ${containerLayout.height}; ` +
        `rotatedSize: ${rotatedWidth} ${rotatedHeight}; virtualContainerSize: ${virtualContainerWidth} ${virtualContainerHeight}; ` +
        `displaySize: ${displayWidth} ${displayHeight}; left: ${left}; top: ${top}; scale: ${scale}`, tag)

    return {left, top, right, bottom, scale, imageAspect, containerAspect, displayWidth, displayHeight, rotatedHeight, rotatedWidth}
}

/**
 * 将 [左上点横坐标, 左上点纵坐标，右下点横坐标，右下点纵坐标] 转换为 [左上点坐标, 右上点坐标, 右下点坐标, 左下点坐标]
 */
export function transformRectToPoints(rect: number[]): Point[] {
    if (rect.length !== 4) {
        EduLogger.error(`input area length is not 4`, `transformRectToPoints`);
    }

    const [x1, y1, x2, y2] = rect;
    return [
        { x: x1, y: y1 },    // 左上点
        { x: x2, y: y1 },    // 右上点
        { x: x2, y: y2 },    // 右下点
        { x: x1, y: y2 },    // 左下点
    ];
}

export function processMdTxt(mdTxt: string): string {
    let text = mdTxt;
    // 1. 移除代码块 ``` ```
    text = text.replace(/```[\s\S]*?```/g, '');

    // 2. 移除行内代码 `
    text = text.replace(/`[^`]*`/g, '');

    // 3. 图片 ![alt](url) -> alt
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');

    // 4. 链接 [text](url) -> text
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // 5. 标题 # ## ###
    text = text.replace(/^\s{0,3}#{1,6}\s+/gm, '');

    // 6. 引用 >
    text = text.replace(/^\s{0,3}>\s?/gm, '');

    // 7. 无序列表 -, *, +
    text = text.replace(/^\s*[-*+]\s+/gm, '');

    // 8. 有序列表 1. 2.
    text = text.replace(/^\s*\d+\.\s+/gm, '');

    // 9. 加粗、斜体 **text** *text* __text__ _text_
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');

    // 10. 删除分割线 ---
    text = text.replace(/^\s*-{3,}\s*$/gm, '');

    // 11. 删除多余空行
    text = text.replace(/\n{2,}/g, '\n');

    // 12. 删除imgFit标签
    text = text.replace(/\{imgFit:\s*[^}]+\}/g, '')


    // 13. 移除公式符号，只保留公式内容 $$ ... $$ 、 \[ ... \] 、 $ ... $ 、 \( ... \)
    text = text.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
    text = text.replace(/\\\[([\s\S]*?)\\\]/g, '$1');
    text = text.replace(/\$([^$\n]+)\$/g, '$1');
    text = text.replace(/\\\(([\s\S]*?)\\\)/g, '$1');

    return text.slice(0, 50);
}

export async function buildSolveArgs(fileId: string, fileSize: number, problemsArea: number[], agentInfo: AgentModel, modeParam: CloudModeParam, sceneType: SceneType, notDialogScene: string | undefined, deepThinkMode: boolean = false, eduIndex: number = - 1): Promise<string> {
    EduLogger.debug(`area: ${JSON.stringify(problemsArea)}`, `buildSolveArgs`);
    if (BaseUtils.isEmptyStr(fileId) || fileSize <= 0) {
        EduLogger.error(`illegal fileId or fileSize`, 'buildSolveArgs');
    }
    let gradeInfo = await asyncStorage.getItem<IGradeInfo[]>(EDU_SELECT_GRADE);

    return JSON.stringify({
        "nspFileId": fileId,
        "fileSize": fileSize,
        "notDialogScene": notDialogScene,
        "eventObject": {
            "problems": [{
                "imageId": fileId,
                "problemsArea": problemsArea.length > 0 ? JSON.stringify(problemsArea) : "",
                "mode": modeParam,
                "sceneType": sceneType,
            }]
        },
        "contextObject": {
            "problems": [{
                "imageId": fileId,
                "problemsArea": problemsArea.length > 0 ? JSON.stringify(problemsArea) : "",
                "mode": modeParam,
                "sceneType": sceneType,
            }]
        },
        "agentInfo": agentInfo,
        "clientObject": {
            "eduInfo": {
                "deepThinkMode": deepThinkMode,
                "eduIndex": eduIndex,
                "imageId": fileId,
                "scene": sceneType,
                "educationStages": gradeInfo?.[0] ?? {}
            }
        }
    })
}

export function getSceneType(mode: FunctionMode): SceneType {
    switch (mode) {
        case FunctionMode.Page:
        case FunctionMode.Correct:
            return SceneType.Page;
        case FunctionMode.Single:
        default:
            return SceneType.Single;
    }
}

export function isLegalCvResult(cvAnalyseMessageBody?: CvAnalyseMessageBody): boolean | undefined {
    let questions: CloudProblemRectInfo[] | undefined = cvAnalyseMessageBody?.educationResult?.pages?.[0]?.questions
    if (BaseUtils.isEmptyObj(questions) || questions!.length <= 0) {
        EduLogger.error(`cvAnalyseResult is empty`, `isLegalCvResult`)
        return false
    } else {
        EduLogger.debug(`cvAnalyseResult: ${JSON.stringify(questions)}`, `isLegalCvResult`)
        return questions!.every(
            question => question?.originArea?.length === 4 && question?.postProcArea?.length === 4)
    }
}

export function convertCloudRectInfoToLocale(problemRects: CloudProblemRectInfo[]): LocaleProblemRectInfo[] {
    return problemRects.map((rect, index) => {
        return new LocaleProblemRectInfo(index, -1,
            index + 1 + '',
            index + '',
            rect.originArea,
            rect.postProcArea,
            -1)
    })
}

export function convertMarkResultToRectInfo(markResult: MarkResultPayload): LocaleProblemRectInfo {
    const key = markResult.eduIndex.toString() + (markResult.eduSubQuestionIndex > -1 ? '-' + markResult.eduSubQuestionIndex.toString() : '');
    return new LocaleProblemRectInfo(markResult.eduIndex, markResult.eduSubQuestionIndex,
        markResult.eduIndex + 1 + '', // 小题的title值需要在外层跟随题目下发动态更新
        key,
        markResult.originArea,
        markResult.postProcArea,
        markResult.isCorrect,)
}

/**
 * 对批改返回结果进行预处理，原地修改属性值;
 * 过滤行末多余的回车换行符
 *
 * @param markResult
 */
export function preprocessMarkResult(markResult: MarkResultPayload): void {
    if (!markResult?.problemsInfo) {
        return;
    }
    let questionInfo = markResult.problemsInfo?.questionInfo;
    markResult.problemsInfo.questionInfo = questionInfo?.replace(new RegExp('[\\r\\n]+$'), '');
    let answerInfo = markResult.problemsInfo?.answerInfo;
    markResult.problemsInfo.answerInfo = answerInfo?.replace(new RegExp('[\\r\\n]+$'), '');
    let markComments = markResult.problemsInfo?.markComments;
    markResult.problemsInfo.markComments = markComments?.replace(new RegExp('[\\r\\n]+$'), '');
}


/**
 * 根据当前使用的图片获取rect area
 */
export function getCurrentRectArea(rect: LocaleProblemRectInfo, currentUseImg: QUESTION_IMG_TYPE):Point[] {
    return currentUseImg === QUESTION_IMG_TYPE.ORIGIN_IMG ? rect.originArea : rect.postProcArea;
}