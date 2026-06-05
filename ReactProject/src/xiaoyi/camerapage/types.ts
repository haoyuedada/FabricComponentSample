/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import {SharedValue} from 'react-native-reanimated';

export type SelectionBoxType = {
  id: string;
  x: SharedValue<number>;
  y: SharedValue<number>;
  width: SharedValue<number>;
  height: SharedValue<number>;
  context: SharedValue<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    initialLeftBound?: boolean;
    initialRightBound?: boolean;
    initialTopBound?: boolean;
    initialBottomBound?: boolean;
  }>;
};

export type ImageDimensions = {
  width: number;
  height: number;
  rotatedWidth: number;
  rotatedHeight: number;
  displayWidth: number;
  displayHeight: number;
  scale: number;
  displayRect: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
};

export type Edge = 'top' | 'bottom' | 'left' | 'right';
export type Corner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export const CORNER_SIZE = 20;
export const MIN_BOX_SIZE = 30;
export const EDGE_THICKNESS = 20;


/**
 * 处理后的本地题目选框数据结构
 */
export class LocaleProblemRectInfo {
  /**
   *题目序号
   */
  eduIndex: number;
  /**
   * 题目子序号
   */
  eduSubIndex: number;
  /**
   * 小题数据结构
   */
  subProblems: LocaleProblemRectInfo[] = [];
  /**
   * 展示标题（题号 1、1-1
   */
  title: string;
  /**
   * 对应流式文本存储的key值
   * 0 0-1 0-2
   */
  key: string;

  /**
   * 原始图框选区域
   */
  originArea: Point[];

  /**
   * 后处理后的框选区域
   */
  postProcArea: Point[];

  /**
   * 该题是否正确(批改场景使用)
   */
  isCorrect: number;

  /**
   * 子题目总数量
   */
  totalQuestionNum: number = 0;

  constructor(
    eduIndex: number,
    eduSubIndex: number,
    title: string,
    key: string,
    originArea: Point[],
    postProcArea: Point[],
    isCorrect: number,
  ) {
    this.eduIndex = eduIndex;
    this.eduSubIndex = eduSubIndex;
    this.title = title;
    this.key = key;
    this.originArea = originArea;
    this.postProcArea = postProcArea;
    this.isCorrect = isCorrect;
    this.subProblems = [];
  }
}

export interface Point {
  x: number,
  y: number
}

/**
 * 云侧下发题目框选结构
 */
export interface CvAnalyseMessageBody {
  educationResult: EducationResult;
}

export interface EducationResult {
  // 科目
  subjectClassification: string,
  pages: CvAnalyseResult[]
}

export interface CvAnalyseResult {
  code: number,
  width: number,
  height: number,
  postProcImgUrl: string, // 矫正图的文件名
  postProcImgLink: string,  // 矫正图的链接url
  postProcImgUrlDehand: string, // 去笔迹图的文件名
  postProcImgLinkDehand: string,  // 去笔迹图的文件名
  questions: CloudProblemRectInfo[],
  orientation: number,

  // 每个图片的id，端侧单独从 questions 中拿出来传给云侧
  imageId?: string,
}

export interface CloudProblemRectInfo {
  originArea: Point[]; // 以图片左上角为原点，值是左上, 右上, 右下, 左下四个点的坐标。下同
  postProcArea: Point[];
  extInfo: EduExtInfo;
}

export interface EduExtInfo {
  eduIndex: number,
  imageId: string,
}

export enum FunctionMode {
  Single = 'SINGLE',
  Page = 'PAGE',
  Correct = 'CORRECT',
  MULTI_PAGE = 'MULTI_PAGE',
}

export enum CloudModeParam {
  CvAnalyze = 'AUTO', // 请求版面分析
  Mark = 'MARK',
  Solve = 'SOLVE',
}

export enum SceneType {
  Single = 'SINGLE_QUESTION',
  Page = 'WHOLE_PAGE',
}

export interface RectArea {
  id?: string,
  x: number,
  y: number,
  width: number,
  height: number,
  subProblemsArea?: (RectArea | undefined)[],
}

export interface MarkResultPayload {
  imageId: string;
  eduIndex: number;
  eduSubQuestionIndex: number;
  originArea: Point[],
  postProcArea: Point[],
  width: number,
  height: number,
  /**
   * 批改结果,0:错误  1:正确
   */
  isCorrect: number,
  knowledgePointRates: KnowledgePoints[],
  /**
   * 新增一个小题总数
   */
  totalQuestionNum: number;
  /**
   * 题目信息(用于添加错题本)
   */
  problemsInfo: MarkProblemInfo;

  subject?: string;
}

export interface KnowledgePoints {
  knowledgePoint: string,
  knowledgePointId: string,
  stage: string,
  knowledgeTextDetail: string,
  knowledgeVideo: string,
  chapterName: string,
  sectionName: string,
}

export interface MarkProblemInfo {
  // 题目文本内容(题目识别的markdown)
  questionInfo: string,
  // 题目答案
  answerInfo: string,
  // 批改评语
  markComments: string,
  // 去笔迹图片(url)
  problemsImage: string,
  // 问题模态
  //   - multiMode 多模题
  questionMode: QuestionMode,
}

export enum QuestionMode {
  MultiModal = 'multiMode', // 是否为多模题; multiMode可能是定接口时误拼写
}

export type Size = {
  width: number;
  height: number;
};

export class ProblemSelectStatus {
  private _problemIdx: number;
  private _subProblemIdx?: number;
  private _key: string;

  constructor(problemIdx: number, subProblemIdx?: number) {
    this._problemIdx = problemIdx;
    this._subProblemIdx = subProblemIdx;
    this._key = problemIdx.toString() + (subProblemIdx !== undefined ? `-${subProblemIdx}` : '');
  }

  get key(): string {
    return this._key;
  }

  get problemIdx(): number {
    return this._problemIdx;
  }

  get subProblemIdx(): number | undefined {
    return this._subProblemIdx;
  }

  set problemIdx(value: number) {
    this._problemIdx = value;
    this._key = value.toString() + (this.subProblemIdx !== undefined ? `-${this.subProblemIdx}` : '');
  }

  set subProblemIdx(value: number | undefined) {
    this._subProblemIdx = value;
    this._key = this.problemIdx.toString() + (value !== undefined ? `-${value}` : '');
  }
}

export const DEFAULT_SELECT_PROBLEM: ProblemSelectStatus = new ProblemSelectStatus(0);
export const DEFAULT_SELECT_SUBPROBLEM: ProblemSelectStatus = new ProblemSelectStatus(0, 0);
export const SINGLE_DEFAULT_SELECT_PROBLEM: ProblemSelectStatus = new ProblemSelectStatus(-1);


export enum SceneName {
  SOLVE = 'solve',
  CORRECT = 'correct',
  AI_COACH = 'aiCoach',
  RECORD_WRONG_PROBLEM = 'RecordWrongProblem',
}

type SceneNameMap = {
  [key in SceneName]: FunctionMode
}

// scene 与 mode 的映射关系
export const scene2ModeMap: SceneNameMap = {
  // 解题使用整页提示图框
  [SceneName.SOLVE]: FunctionMode.Page,
  // 批改使用九宫格提示图框
  [SceneName.CORRECT]: FunctionMode.Correct,
  // AI学习教练使用跨页题提示图框
  [SceneName.AI_COACH]: FunctionMode.MULTI_PAGE,
  [SceneName.RECORD_WRONG_PROBLEM]: FunctionMode.MULTI_PAGE,
};

// 功能类别
export const modeNameMap = {
  [SceneName.SOLVE]: '拍题快答',
  [SceneName.CORRECT]: '作业批改',
  [SceneName.AI_COACH]: 'AI学习教练',
};

// 功能子类对应枚举值Id
export const enum SubmodeId {
  SOLVE_SINGLE = 'solveSingle',
  SOLVE_PAGE = 'solvePage',
  CORRECT_PAGE = 'correctPage',
}

export type ModeType = keyof typeof modeNameMap;

type SubModeMap = {
  [key in ModeType]: Array<{
    id: SubmodeId;
    label: string;
  }>;
};

// 功能子类
export const subModeMap: SubModeMap = {
  [SceneName.SOLVE]: [
    {id: SubmodeId.SOLVE_SINGLE, label: '拍单题'},
    {id: SubmodeId.SOLVE_PAGE, label: '拍整页'},
  ],
  [SceneName.CORRECT]: [
    {id: SubmodeId.CORRECT_PAGE, label: '拍整页'},
  ],
  [SceneName.AI_COACH]: [],
};

type DefaultSubModeDict = {
  [key in ModeType]: string;
};

export const defaultSubModeDict: DefaultSubModeDict = {
  [SceneName.SOLVE]: 'solvePage',
  [SceneName.CORRECT]: 'correctPage',
  [SceneName.AI_COACH]: 'aiCoachHomePage',
};

export interface ExifResult {
  orientation: string;
}

export enum WindowMode {
  WINDOW_MODE_FULL_SCREEN = 0,
  WINDOW_MODE_SPLIT_SCREEN = 1,
  WINDOW_MODE_MAGIC_WINDOW = 2,
  WINDOW_MODE_FLOAT_WINDOW = 3,
}

export enum QUESTION_IMG_TYPE {
  ORIGIN_IMG,
  POST_PROC_IMG
}

export interface IPostProcParam {
  postProcImgLink: string;
}

export interface IImagSize {
  width: number;
  height: number;
}

export interface ImageLayoutResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  scale: number;
  imageAspect: number;
  containerAspect: number;
  displayWidth: number;
  displayHeight: number;
  rotatedHeight: number;
  rotatedWidth: number;
}

export enum FoldPhoneTypeValue {
  /**
   * 无效值
   */
  INVALID_VALUE = -1,
  /**
   * 直板机
   */
  STRAIGHT = 0,
  /**
   * 大折（内折） X5
   */
  LARGE_FOLD = 1,
  /**
   * 小折叠（只有内折） pocket
   */
  SMALL_FOLD = 2,
  /**
   * 外折 XS2
   */
  EXTERNAL_FOLD = 3,
  /**
   * 扩展新形态
   */
  EXPANDING_NEX_FORMS = 4,

  /**
   * hope扩展新形态
   */
  EXPANDING_FOLD_HOPE = 7
}

/**
 * 鸿蒙设备的折叠状态枚举
 */
export enum DeviceType {
  // 手机
  PHONE = 'PHONE',

  // 平板
  TABLET = 'TABLET',
}

/**
 * 鸿蒙设备的折叠状态枚举
 */
export enum FoldStatusValue {
  /**
   * 未知状态
   */
  FOLD_STATUS_UNKNOWN = 0,

  /**
   * 设备完全展开
   */
  FOLD_STATUS_EXPANDED = 1,

  /**
   * 设备完全折叠
   */
  FOLD_STATUS_FOLDED = 2,

  /**
   * 设备处于半折叠状态
   */
  FOLD_STATUS_HALF_FOLDED = 3,

  /**
   * 表示双折轴设备折轴一和折轴二的折叠状态均为完全展开。
   */
  FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED = 11,

  /**
   * 表示双折轴设备折轴一折叠状态为完全展开，折轴二折叠状态为半折叠。
   */
  FOLD_STATUS_EXPANDED_WITH_SECOND_HALF_FOLDED = 21,

  /**
   * 表示双折轴设备折轴一折叠状态为折叠，折轴二折叠状态为完全展开。
   */
  FOLD_STATUS_FOLDED_WITH_SECOND_EXPANDED = 12,

  /**
   * 表示双折轴设备折轴一折叠状态为折叠，折轴二折叠状态为半折叠。
   */
  FOLD_STATUS_FOLDED_WITH_SECOND_HALF_FOLDED = 22,

  /**
   * 表示双折轴设备折轴一折叠状态为半折叠，折轴二折叠状态为完全展开
   */
  FOLD_STATUS_HALF_FOLDED_WITH_SECOND_EXPANDED = 13,

  /**
   * 表示双折轴设备折轴一和折轴二的折叠状态均为半折叠
   */
  FOLD_STATUS_HALF_FOLDED_WITH_SECOND_HALF_FOLDED = 23
}

