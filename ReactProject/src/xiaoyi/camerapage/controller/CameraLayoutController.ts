/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import {Dimensions} from 'react-native';
import EduLogger from '../../utils/EduLogger';
import {DeviceType, FoldStatusValue} from '../types';
import {InvokeMethods} from '../../../common/native/InvokeMethods';
import {DeviceInfo} from '../../../common/native/bean/DeviceInfo';
import {getIsFoldableFun} from '../../common/native/InvokeMethods';
import Orientation from 'react-native-orientation-locker';

const TAG: string = 'CameraLayoutController';

/**
 * 布局处理器类型枚举
 */
export enum LayoutHandlerFunc {
  HANDLE_34_BAR_PHONE = 'handle34BarPhone',
  HANDLE_LANDSCAPE_43_SPLIT = 'handleLandscape43Split',
}

/**
 * 相机窗口尺寸计算 Controller
 *
 * 负责所有复杂的尺寸计算和状态判断逻辑
 */
export class CameraLayoutController {
  // 设备相关参数，初始化后固定
  private deviceType: string = '';
  private displayVersion: string = '';
  private isFoldable: boolean = false;
  // 初始化标记
  private isInitialized: boolean = false;

  /**
   * 异步初始化方法
   */
  private async init(): Promise<void> {
    this.displayVersion = (await InvokeMethods.getDeviceInfo(DeviceInfo.DISPLAY_VERSION))?.toString().toUpperCase();
    this.deviceType = (await InvokeMethods.getDeviceInfo(DeviceInfo.DEVICE_TYPE))?.toString().toUpperCase();
    this.isFoldable = await getIsFoldableFun();
    this.isInitialized = true;
    EduLogger.info(`initialized, deviceType: ${this.deviceType}, displayVersion: ${this.displayVersion}, isFoldable: ${this.isFoldable}`, TAG);
  };

  /**
   * 计算相机相关的所有参数
   *
   * @returns 包含所有页面状态的对象
   * @param windowWidth
   * @param windowHeight
   * @param foldStatus
   */
  public async calculateLayout(
    windowWidth: number,
    windowHeight: number,
    foldStatus: number,
  ): Promise<CameraLayoutResult> {
    if (!this.isInitialized) {
      await this.init();
    }

    // 屏幕竖屏锁定；
    this.isLockedOrientation(foldStatus);

    // 1. 获取屏幕信息
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    EduLogger.info(`calculateLayout, screen: ${screenWidth} x ${screenHeight}`, TAG);
    EduLogger.info(`calculateLayout, window: ${windowWidth} x ${windowHeight}`, TAG);

    // 2. 执行基础判断 (直接调用内部方法)
    const isPortraitMode = this.checkIsPortraitMode(screenWidth, screenHeight, foldStatus);
    const isFloatingWindowStatus = this.checkIsFloatingWindowStatus(windowWidth, windowHeight, screenWidth, screenHeight);
    const isLandscapeSplitScreenWindowStatus = this.checkIsLandscapeSplitScreenWindowStatus(windowWidth, windowHeight, screenWidth, screenHeight);
    const isPortraitSplitScreenWindowStatus = this.checkIsPortraitSplitScreenWindowStatus(windowWidth, windowHeight, screenWidth, screenHeight);

    // 3. 初始化结果对象
    const result: CameraLayoutResult = {
      // 基础布局状态
      isPortraitMode,
      isFloatingWindowStatus,
      isSplitWindowStatus: isLandscapeSplitScreenWindowStatus || isPortraitSplitScreenWindowStatus,

      // 特殊状态标记
      isCameraSleepByWindowStatus: false,
      isVerdeOutScreen: false,

      // GRL 展开状态
      isGRLExpandPortrait: false,
      isGRLExpandLandscape: false,
      isGRLHalfExpand: false,

      // 最终选定的布局处理器
      layoutHandler: LayoutHandlerFunc.HANDLE_34_BAR_PHONE,
    };

    // 4. 边界条件拦截

    // 4.1 分屏状态下，小屏设备不支持相机
    if (result.isSplitWindowStatus && this.isPhoneOrFolded(foldStatus)) {
      result.isCameraSleepByWindowStatus = true;
      return result;
    }

    // 4.2 Verde 外屏处理
    if (this.isVerde()) {
      if (foldStatus === FoldStatusValue.FOLD_STATUS_FOLDED) {
        result.isVerdeOutScreen = true;
        return result;
      }
    }

    // 5. 核心布局逻辑分支

    // --- 悬浮窗 ---
    if (isFloatingWindowStatus) {
      result.layoutHandler = isPortraitMode
        ? LayoutHandlerFunc.HANDLE_34_BAR_PHONE : LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // --- 平板分屏 ---
    else if (
      isPortraitSplitScreenWindowStatus && this.deviceType === DeviceType.TABLET
    ) {
      result.layoutHandler = LayoutHandlerFunc.HANDLE_34_BAR_PHONE;
    } else if (
      isLandscapeSplitScreenWindowStatus &&
      this.deviceType === DeviceType.TABLET
    ) {
      result.layoutHandler = LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // --- GRL (三折叠) ---
    else if (this.isGRL() && foldStatus !== FoldStatusValue.FOLD_STATUS_FOLDED) {
      if (foldStatus === FoldStatusValue.FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED) {
        // 全展开
        if (screenWidth > screenHeight) {
          result.isGRLExpandLandscape = true;
          result.layoutHandler = LayoutHandlerFunc.HANDLE_34_BAR_PHONE;
        } else {
          result.isGRLExpandPortrait = true;
          result.layoutHandler = LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
        }
      } else {
        // 半展开
        result.isGRLHalfExpand = true;
        result.layoutHandler = screenWidth < screenHeight
            ? LayoutHandlerFunc.HANDLE_34_BAR_PHONE : LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
      }
    }
    // --- Hope (待定设备) ---
    else if (this.isHope()) {
      if (foldStatus === FoldStatusValue.FOLD_STATUS_FOLDED) {
        // 折叠态
        result.layoutHandler = LayoutHandlerFunc.HANDLE_34_BAR_PHONE;
      } else {
        // 全展开
        if (screenWidth > screenHeight) {
          result.isGRLExpandLandscape = true;
          result.layoutHandler = LayoutHandlerFunc.HANDLE_34_BAR_PHONE;
        } else {
          result.isGRLExpandPortrait = true;
          result.layoutHandler = LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
        }
      }
    }
    // --- 平板 ---
    else if (this.deviceType === DeviceType.TABLET) {
      result.layoutHandler = screenWidth < screenHeight
        ? LayoutHandlerFunc.HANDLE_34_BAR_PHONE : LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // --- 手机折叠屏展开态，包含手机折叠屏分屏状态 ---
    else if (this.deviceType === DeviceType.PHONE &&
      foldStatus === FoldStatusValue.FOLD_STATUS_EXPANDED && !this.isVerde()) {
      result.layoutHandler = screenWidth < screenHeight
          ? LayoutHandlerFunc.HANDLE_34_BAR_PHONE : LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // --- 普通直板机 (默认) ---
    else {
      result.layoutHandler = LayoutHandlerFunc.HANDLE_34_BAR_PHONE;
    }

    return result;
  };

  /**
   * 是否固定窗口为竖直方向
   *
   * @param foldStatus
   */
  private isLockedOrientation(foldStatus: number): void {
    // 直板机或折叠机折叠态
    const isPhoneOrFolded = this.deviceType === DeviceType.PHONE && (!this.isFoldable || foldStatus === FoldStatusValue.FOLD_STATUS_FOLDED);
    const isVerdeTemp = this.isVerde();

    const isLockedOrientationTemp = isPhoneOrFolded || isVerdeTemp;
    EduLogger.info(`isLockedOrientation, isLockedOrientationTemp: ${isLockedOrientationTemp}, isPhoneOrFolded: ${isPhoneOrFolded}, isVerdeTemp: ${isVerdeTemp}, foldStatus: ${foldStatus}`, TAG);
    if (isLockedOrientationTemp) {
      Orientation.lockToPortrait();
    } else {
      Orientation.unlockAllOrientations();
    }
  }

  /**
   * 在某些分屏或悬浮窗的场景下,需要隐藏相机: 因为窗口很小,不支撑相机页的布局
   *
   * 比如：普通直板机状态，折叠屏折叠状态，verde展开的内屏状态；
   */
  private isPhoneOrFolded(foldStatus: number): boolean {
    // 直板机
    const isBarPhone = this.deviceType === DeviceType.PHONE && !this.isFoldable;
    // 折叠机折叠态
    const isPhoneFolded =
      this.deviceType === DeviceType.PHONE && this.isFoldable && foldStatus === FoldStatusValue.FOLD_STATUS_FOLDED;
    // verde折叠机内屏
    const isVerdeExpand = this.isVerde() && foldStatus !== FoldStatusValue.FOLD_STATUS_FOLDED;
    return isBarPhone || isPhoneFolded || isVerdeExpand;
  };

  /**
   * 是否是 分屏模式，且是横向/水平方向分屏：即窗口高度与屏幕高度一样，宽度不一样；
   * 左右分屏
   *
   * 判定规则：窗口高度与屏幕高度一样，但宽度不一样；
   */
  private checkIsLandscapeSplitScreenWindowStatus(
    winWidth: number,
    winHeight: number,
    screenWidth: number,
    screenHeight: number,
  ): boolean {
    const isWidthDifferent = Math.floor(winWidth) !== Math.floor(screenWidth);
    const isHeightEqual = Math.floor(winHeight) === Math.floor(screenHeight);
    EduLogger.info(
      `checkIsLandscapeSplitScreenWindowStatus, isWidthDifferent: ${isWidthDifferent}, isHeightEqual: ${isHeightEqual}`,
      TAG,
    );
    return isWidthDifferent && isHeightEqual;
  };

  /**
   * 是否是 分屏模式，且是竖向/垂直方向分屏：即窗口宽度与宽幕高度一样，但高度不一样；
   * 上下分屏
   *
   * 判定规则：窗口宽度与屏幕宽度一样，但高度不一样；
   */
  private checkIsPortraitSplitScreenWindowStatus(
    winWidth: number,
    winHeight: number,
    screenWidth: number,
    screenHeight: number,
  ): boolean {
    const isWidthEqual = Math.floor(winWidth) === Math.floor(screenWidth);
    const isHeightDifferent =
      Math.floor(winHeight) !== Math.floor(screenHeight);
    EduLogger.info(`checkIsPortraitSplitScreenWindowStatus, isWidthEqual: ${isWidthEqual}, isHeightDifferent: ${isHeightDifferent}`, TAG);
    return isWidthEqual && isHeightDifferent;
  };

  /**
   * 是否是 悬浮窗模式
   *
   * 判定规则：窗口宽高对应起来，均不等于屏幕宽高；
   */
  private checkIsFloatingWindowStatus(
    winWidth: number,
    winHeight: number,
    screenWidth: number,
    screenHeight: number,
  ): boolean {
    const isWidthDifferent = Math.floor(winWidth) !== Math.floor(screenWidth);
    const isHeightDifferent =
      Math.floor(winHeight) !== Math.floor(screenHeight);
    const isFloatingWindowStatus = isWidthDifferent && isHeightDifferent;
    EduLogger.info(`isFloatingWindowStatus: ${isFloatingWindowStatus}, isWidthDifferent: ${isWidthDifferent}, isHeightDifferent: ${isHeightDifferent}`, TAG);
    return isFloatingWindowStatus;
  };

  /**
   * 当前设备是否是竖屏模式，
   *    场景：
   *      1. 常规模式下，屏幕宽 < 高；
   *      2. 特殊模式下：三折叠全展开态横屏，Hope展开态横屏；
   *
   * 竖屏模式下，相机窗口比例为： 3:4；相反，为 4:3
   */
  private checkIsPortraitMode(
    screenWidth: number,
    screenHeight: number,
    foldStatus: number,
  ): boolean {
    // 三折叠全展开态, 横屏
    const isLandscapeGRLAllExpanded =
      this.isGRL() && foldStatus === FoldStatusValue.FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED && screenWidth > screenHeight;
    // Hope展开态横屏
    const isHopeExpanded = this.isHope() && foldStatus !== FoldStatusValue.FOLD_STATUS_FOLDED && screenWidth > screenHeight;
    // 普通竖屏模式下，即：宽 < 高；
    const isNormalPortrait = screenWidth < screenHeight;
    let isPortraitMode: boolean;
    if (
      this.isGRL() &&
      foldStatus === FoldStatusValue.FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED
    ) {
      // 三折叠全展开态, 横屏
      const isGRLLandscapeAllExpanded = screenWidth > screenHeight;
      isPortraitMode = isGRLLandscapeAllExpanded;
    } else if (
      this.isHope() &&
      foldStatus !== FoldStatusValue.FOLD_STATUS_FOLDED
    ) {
      // Hope展开态横屏
      const isHopeLandscapeExpanded = screenWidth > screenHeight;
      isPortraitMode = isHopeLandscapeExpanded;
    } else {
      // 与上面的if为互斥关系
      isPortraitMode = isNormalPortrait;
    }
    EduLogger.info(`isPortraitMode: ${isPortraitMode}, isLandscapeGRLAllExpanded: ${isLandscapeGRLAllExpanded}, isHopeExpanded: ${isHopeExpanded}, isNormalPortrait: ${isNormalPortrait}`, TAG);
    return isPortraitMode;
  };

  /**
   * 是否三折叠设备
   */
  private isGRL(): boolean {
    return this.displayVersion.startsWith('GRL');
  };

  /**
   * 是否Hope设备
   */
  private isHope(): boolean {
    return (
      this.displayVersion.startsWith('DTH') ||
      this.displayVersion.startsWith('HOP')
    );
  };

  /**
   * 是否verde设备
   */
  private isVerde(): boolean {
    return this.displayVersion.startsWith('VDE');
  };
}

/**
 * 定义返回结果的类型
 */
export interface CameraLayoutResult {
  isPortraitMode: boolean;
  isFloatingWindowStatus: boolean;
  isSplitWindowStatus: boolean;
  isCameraSleepByWindowStatus: boolean;
  isVerdeOutScreen: boolean;
  isGRLExpandPortrait: boolean;
  isGRLExpandLandscape: boolean;
  isGRLHalfExpand: boolean;
  layoutHandler: LayoutHandlerFunc;
}
