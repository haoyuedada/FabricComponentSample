/**
 * VisionCamera Demo - 从 EducationCamera 业务代码中抽取
 *
 * ★★★ 还原了横屏分屏下相机比例异常的真实 Bug ★★★
 *
 * 问题场景:
 *   横屏分屏模式下，左边是另一个 app，本 app 在右侧。
 *   此时相机比例应该是 3:4，但 handleLandscape43Split 算出的是 4:3。
 *
 * 根本原因:
 *   handleLandscape43Split 函数注释写着 "4:3"，逻辑也确实产出 4:3 比例。
 *   但在横屏分屏场景下，用户期望的是 3:4 (竖向窄窗口内相机预览)。
 *   而 handle34BarPhone 算出的才是 3:4。
 *
 * Demo 提供两种模式对比:
 *   - "模拟分屏": 在全屏环境下模拟分屏窗口尺寸，无需真分屏
 *   - "原始逻辑": 使用业务代码的 handleLandscape43Split (有 Bug, 4:3)
 *   - "修复逻辑": 使用 handle34BarPhone (正确, 3:4)
 *
 * 依赖:
 *   - react-native-vision-camera
 *   - react-native-orientation-locker
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Text,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

// ============================================================
// 常量 & 类型定义
// ============================================================

const TAG = '[VisionCameraDemo]';

/** 相机取景框固定比例: 3/4 (竖屏) */
const CAMERA_RATIO_3_4: number = 3 / 4;

/** 最大图片数量 */
const AI_COACH_MAX_PIC_LEN = 6;

/** 黑色遮罩超时时间 (ms) */
const BLACK_COVER_TIMEOUT_MS = 120000; // 120s

/** 拍照超时时间 (ms) */
const TAKE_PHOTO_TIMEOUT_MS = 2500;

/** 设备类型 */
enum DeviceType {
  PHONE = 'PHONE',
  TABLET = 'TABLET',
}

/** 窗口模式 */
enum WindowMode {
  WINDOW_MODE_FULLSCREEN = 0,
  WINDOW_MODE_SPLIT_SCREEN = 1,
  WINDOW_MODE_FLOAT_WINDOW = 2,
}

/** 折叠状态 */
enum FoldStatusValue {
  FOLD_STATUS_UNKNOWN = 0,
  FOLD_STATUS_EXPANDED = 1,
  FOLD_STATUS_FOLDED = 2,
  FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED = 3, // 三折叠全展开
}

/** 布局处理器类型 */
enum LayoutHandlerFunc {
  HANDLE_34_BAR_PHONE = 'handle34BarPhone',
  HANDLE_LANDSCAPE_43_SPLIT = 'handleLandscape43Split',
}

/** 布局计算结果 */
interface CameraLayoutResult {
  isPortraitMode: boolean;
  isFloatingWindowStatus: boolean;
  isSplitWindowStatus: boolean;
  isCameraSleepByWindowStatus: boolean;
  isGRLExpandPortrait: boolean;
  isGRLExpandLandscape: boolean;
  layoutHandler: LayoutHandlerFunc;
}

// ============================================================
// 简易 Logger (替代业务代码中的 EduLogger)
// ============================================================

const log = {
  info: (...args: any[]) => console.log(TAG, ...args),
  warn: (...args: any[]) => console.warn(TAG, ...args),
  error: (...args: any[]) => console.error(TAG, ...args),
};

// ============================================================
// 简易 Toast (替代业务代码中的 showToast)
// ============================================================

const showToast = (msg: string) => Alert.alert('提示', msg);

// ============================================================
// 相机布局计算器 (从 CameraLayoutController 简化抽取)
// ============================================================

class CameraLayoutController {
  /**
   * 计算相机布局参数
   * - 简化版: 去掉了与原生桥接的设备信息获取，改为通过参数传入
   */
  calculateLayout(
    windowWidth: number,
    windowHeight: number,
    screenWidth: number,
    screenHeight: number,
    deviceType: string,
    foldStatus: number,
  ): CameraLayoutResult {
    const isPortraitMode = this.checkIsPortraitMode(screenWidth, screenHeight);
    const isFloatingWindowStatus = this.checkIsFloatingWindowStatus(
      windowWidth, windowHeight, screenWidth, screenHeight,
    );
    const isLandscapeSplit = this.checkIsLandscapeSplitScreenWindowStatus(
      windowWidth, windowHeight, screenWidth, screenHeight,
    );
    const isPortraitSplit = this.checkIsPortraitSplitScreenWindowStatus(
      windowWidth, windowHeight, screenWidth, screenHeight,
    );

    const result: CameraLayoutResult = {
      isPortraitMode,
      isFloatingWindowStatus,
      isSplitWindowStatus: isLandscapeSplit || isPortraitSplit,
      isCameraSleepByWindowStatus: false,
      isGRLExpandPortrait: false,
      isGRLExpandLandscape: false,
      layoutHandler: LayoutHandlerFunc.HANDLE_34_BAR_PHONE,
    };

    // 悬浮窗
    if (isFloatingWindowStatus) {
      result.layoutHandler = isPortraitMode
        ? LayoutHandlerFunc.HANDLE_34_BAR_PHONE
        : LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // 平板分屏
    else if (isPortraitSplit && deviceType === DeviceType.TABLET) {
      result.layoutHandler = LayoutHandlerFunc.HANDLE_34_BAR_PHONE;
    } else if (isLandscapeSplit && deviceType === DeviceType.TABLET) {
      result.layoutHandler = LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // 平板
    else if (deviceType === DeviceType.TABLET) {
      result.layoutHandler = screenWidth < screenHeight
        ? LayoutHandlerFunc.HANDLE_34_BAR_PHONE
        : LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // 折叠屏展开态
    else if (
      deviceType === DeviceType.PHONE &&
      foldStatus === FoldStatusValue.FOLD_STATUS_EXPANDED
    ) {
      result.layoutHandler = screenWidth < screenHeight
        ? LayoutHandlerFunc.HANDLE_34_BAR_PHONE
        : LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT;
    }
    // 默认直板机
    else {
      result.layoutHandler = LayoutHandlerFunc.HANDLE_34_BAR_PHONE;
    }

    return result;
  }

  private checkIsLandscapeSplitScreenWindowStatus(
    winWidth: number, winHeight: number, screenWidth: number, screenHeight: number,
  ): boolean {
    return Math.floor(winWidth) !== Math.floor(screenWidth) &&
           Math.floor(winHeight) === Math.floor(screenHeight);
  }

  private checkIsPortraitSplitScreenWindowStatus(
    winWidth: number, winHeight: number, screenWidth: number, screenHeight: number,
  ): boolean {
    return Math.floor(winWidth) === Math.floor(screenWidth) &&
           Math.floor(winHeight) !== Math.floor(screenHeight);
  }

  private checkIsFloatingWindowStatus(
    winWidth: number, winHeight: number, screenWidth: number, screenHeight: number,
  ): boolean {
    return Math.floor(winWidth) !== Math.floor(screenWidth) &&
           Math.floor(winHeight) !== Math.floor(screenHeight);
  }

  private checkIsPortraitMode(screenWidth: number, screenHeight: number): boolean {
    return screenWidth < screenHeight;
  }
}

// ============================================================
// 九宫格参考线覆盖层
// ============================================================

const GridOverlay: React.FC<{
  title: string;
  subTitle: string;
}> = ({title, subTitle}) => (
  <View style={gridStyles.container}>
    {/* 横线 */}
    {[1, 2].map(i => (
      <View key={`h${i}`} style={[gridStyles.line, gridStyles.horizontalLine, {top: `${i * 33.33}%`}]} />
    ))}
    {/* 竖线 */}
    {[1, 2].map(i => (
      <View key={`v${i}`} style={[gridStyles.line, gridStyles.verticalLine, {left: `${i * 33.33}%`}]} />
    ))}
    {/* 提示文字 */}
    <View style={gridStyles.textContainer}>
      {title ? <Text style={gridStyles.title}>{title}</Text> : null}
      {subTitle ? <Text style={gridStyles.subTitle}>{subTitle}</Text> : null}
    </View>
  </View>
);

const gridStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  horizontalLine: {
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
  verticalLine: {
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
});

// ============================================================
// 拍照按钮
// ============================================================

const CaptureButton: React.FC<{enabled: boolean}> = ({enabled}) => (
  <View style={[captureStyles.outer, {opacity: enabled ? 1 : 0.4}]}>
    <View style={captureStyles.inner} />
  </View>
);

const captureStyles = StyleSheet.create({
  outer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFF',
  },
});

// ============================================================
// 主组件: VisionCameraDemo
// ============================================================

const VisionCameraDemo: React.FC = () => {
  // ---- Camera 相关 ----
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const {hasPermission, requestPermission} = useCameraPermission();

  // ---- 窗口 & 方向 ----
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [deviceOrientation, setDeviceOrientation] = useState<OrientationType>(
    OrientationType.PORTRAIT,
  );

  // ---- 相机尺寸 ----
  const [cameraWidth, setCameraWidth] = useState(0);
  const [cameraHeight, setCameraHeight] = useState(0);

  // ---- 状态标记 ----
  const [isActive, setIsActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const isUploadingRef = useRef(false);

  // ---- 图片相关 ----
  const [selectedPics, setSelectedPics] = useState<string[]>([]);
  const [isPicFromGallery, setIsPicFromGallery] = useState(false);

  // ---- 遮罩相关 ----
  const [isShowBlackCover, setIsShowBlackCover] = useState(false);
  const timerRef = useRef<number | null>(null);

  // ---- 布局标记 ----
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  const [isFloatingWindowStatus, setIsFloatingWindowStatus] = useState(false);
  const [isSplitWindowStatus, setIsSplitWindowStatus] = useState(false);

  const layoutController = useRef(new CameraLayoutController()).current;

  // ============================================================
  // 权限请求
  // ============================================================

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(granted => {
        if (!granted) {
          log.error('camera permission denied');
        }
      });
    }
  }, [hasPermission]);

  // ============================================================
  // 初始化 & 方向监听
  // ============================================================

  useEffect(() => {
    Orientation.lockToPortrait();
    StatusBar.setBarStyle('light-content');

    const handleOrientationChange = (orientation: OrientationType) => {
      log.info(`orientation: ${orientation}`);
      if (orientation.startsWith('PORTRAIT') || orientation.startsWith('LANDSCAPE')) {
        setDeviceOrientation(orientation);
      }
    };

    Orientation.getDeviceOrientation(handleOrientationChange);
    Orientation.addDeviceOrientationListener(handleOrientationChange);

    return () => {
      Orientation.removeOrientationListener(handleOrientationChange);
      Orientation.unlockAllOrientations();
      StatusBar.setBarStyle('dark-content');
      setIsActive(false);
      cancelTimeoutCover();
    };
  }, []);

  // ============================================================
  // 相机 active 状态管理
  // ============================================================

  useEffect(() => {
    // 等相机初始化完成后才允许操作
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // ============================================================
  // 布局计算: 核心比例逻辑
  // ============================================================

  const refreshCameraLayout = useCallback(() => {
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    // 简化版: 默认直板机、折叠态
    const layoutResult = layoutController.calculateLayout(
      windowWidth, windowHeight, screenWidth, screenHeight,
      DeviceType.PHONE, FoldStatusValue.FOLD_STATUS_FOLDED,
    );

    setIsPortraitMode(layoutResult.isPortraitMode);
    setIsFloatingWindowStatus(layoutResult.isFloatingWindowStatus);
    setIsSplitWindowStatus(layoutResult.isSplitWindowStatus);

    // 根据布局处理器计算相机窗口尺寸
    if (layoutResult.layoutHandler === LayoutHandlerFunc.HANDLE_34_BAR_PHONE) {
      handle34BarPhone(windowWidth, windowHeight);
    } else if (layoutResult.layoutHandler === LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT) {
      handleLandscape43Split(windowWidth, windowHeight);
    }

    log.info(`layout result: portrait=${layoutResult.isPortraitMode}, ` +
      `floating=${layoutResult.isFloatingWindowStatus}, split=${layoutResult.isSplitWindowStatus}`);
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    refreshCameraLayout();
  }, [refreshCameraLayout]);

  // ============================================================
  // 相机窗口尺寸计算: 3:4 比例
  // ============================================================

  /**
   * 直板机/竖屏模式: 相机取景框比例 3:4
   * 即 width:height = 3:4
   */
  const handle34BarPhone = (width: number, height: number): void => {
    let calculatedWidth: number, calculatedHeight: number;
    if (width / height > CAMERA_RATIO_3_4) {
                console.log(`chy 4:3 split - width is the limit factor`);
      // 窗口太窄，宽度撑满，高度按比例
      calculatedWidth = width;
      calculatedHeight = width / CAMERA_RATIO_3_4;
    } else {
                        console.log(`chy 3:4 split - width is the limit factor`);
      // 窗口够宽，高度撑满，宽度按比例
      calculatedHeight = height;
      calculatedWidth = height * CAMERA_RATIO_3_4;
    }
    setCameraWidth(calculatedWidth);
    setCameraHeight(calculatedHeight);
    log.info(`handle34BarPhone - cameraSize: ${calculatedWidth} x ${calculatedHeight}`);
  };

  /**
   * 横屏分屏模式: 相机取景框比例 4:3
   * 即 width:height = 4:3
   */
  const handleLandscape43Split = (winWidth: number, winHeight: number): void => {
    let calculatedWidth, calculatedHeight;
      if (winWidth / winHeight < 1 / CAMERA_RATIO_3_4) {
        console.log(`chy 4:3 split - width is the limit factor`);
        calculatedWidth = winWidth;
        calculatedHeight = calculatedWidth * CAMERA_RATIO_3_4;
      } else {
        console.log(`chy 3:4 split - width is the limit factor`);
        calculatedHeight = winHeight;
        calculatedWidth = winHeight / CAMERA_RATIO_3_4;
      }
    setCameraWidth(calculatedWidth);
    setCameraHeight(calculatedHeight);
    log.info(`handleLandscape43Split - cameraSize: ${calculatedWidth} x ${calculatedHeight}`);
  };

  // ============================================================
  // 拍照逻辑 (含超时保护)
  // ============================================================

  const takePhoto = async (): Promise<void> => {
    if (isUploadingRef.current) {
      log.warn('Upload in progress, ignore click');
      return;
    }

    try {
      isUploadingRef.current = true;
      setIsCapturing(true);
      log.info('takePhoto start');

      // ★ 超时保护: 与业务代码一致
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('takePhoto timeout')), TAKE_PHOTO_TIMEOUT_MS),
      );

      const file = await Promise.race([
        cameraRef.current?.takePhoto({}),
        timeoutPromise,
      ]);

      log.info(`takePhoto success, file: ${JSON.stringify(file)}`);

      if (file?.path) {
        const uri = `file://${file.path}`;
        log.info(`photo uri: ${uri}, width: ${file.width}, height: ${file.height}`);
        addImageUri(uri);
      }
    } catch (error: any) {
      log.error(`takePhoto failed: ${error?.message}`);
      isUploadingRef.current = false;
      setTimeout(() => setIsCapturing(false), 100);
    } finally {
      log.info('takePhoto process end');
    }
  };

  // ============================================================
  // 图库选择
  // ============================================================

  const selectFromGallery = async (): Promise<void> => {
    log.info('selectFromGallery');
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: AI_COACH_MAX_PIC_LEN,
      quality: 1,
    }).catch(e => log.error(`launchImageLibrary error: ${e?.message}`));

    if (result?.assets?.length) {
      const uris: string[] = [];
      result.assets.forEach(asset => {
        asset?.uri && uris.push(asset.uri);
      });
      if (uris.length > 0) {
        setSelectedPics(uris);
        setIsPicFromGallery(true);
        // 模拟: 图库选择后禁用拍照
        setIsCapturing(true);
      }
    }
  };

  const addImageUri = (uri: string): void => {
    setSelectedPics(prev => [...prev, uri]);
    // 模拟上传完成
    setTimeout(() => {
      isUploadingRef.current = false;
      if (selectedPics.length + 1 < AI_COACH_MAX_PIC_LEN) {
        setIsCapturing(false);
      }
    }, 500);
  };

  // ============================================================
  // 删除图片
  // ============================================================

  const handleImageDelete = (index: number): void => {
    log.info(`delete image at index: ${index}`);
    const newList = [...selectedPics];
    newList.splice(index, 1);
    setSelectedPics(newList);

    if (newList.length === 0) {
      setIsPicFromGallery(false);
      setIsCapturing(false);
      isUploadingRef.current = false;
    }
  };

  // ============================================================
  // 黑色遮罩超时逻辑
  // ============================================================

  const createTimeoutCover = (): void => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    cancelBlackCover();

    timerRef.current = window.setTimeout(() => {
      setIsShowBlackCover(true);
      setIsActive(false);
      timerRef.current = null;
    }, BLACK_COVER_TIMEOUT_MS);
  };

  const cancelTimeoutCover = (): void => {
    setIsShowBlackCover(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const cancelBlackCover = (): void => {
    setIsShowBlackCover(false);
    setIsActive(true);
  };

  // 拦截手势返回
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isShowBlackCover) {
        createTimeoutCover();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [isShowBlackCover]);

  // ============================================================
  // 拍摄按钮禁用判断
  // ============================================================

  const canCaptureDisabled = (): boolean => {
    return isCapturing || isPicFromGallery || selectedPics.length >= AI_COACH_MAX_PIC_LEN;
  };

  // ============================================================
  // 设备方向对应的旋转角度
  // ============================================================

  const getRotateDegree = (): number => {
    switch (deviceOrientation) {
      case OrientationType['LANDSCAPE-LEFT']:
        return 90;
      case OrientationType['LANDSCAPE-RIGHT']:
        return 270;
      case OrientationType['PORTRAIT-UPSIDEDOWN']:
        return 180;
      default:
        return 0;
    }
  };

  // ============================================================
  // 早期返回: 无设备 / 无权限
  // ============================================================

  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.whiteText}>没有可用的摄像头设备</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.whiteText}>需要摄像头权限</Text>
      </View>
    );
  }

  // ============================================================
  // 渲染
  // ============================================================

  const isCameraReady = cameraWidth > 0 && cameraHeight > 0;

  return (
    <View style={styles.fullScreen} onTouchStart={createTimeoutCover}>
      {/* ======== 底层: 相机画面 ======== */}
      <View style={styles.cameraLayer}>
        {isCameraReady && (
          <View style={{
            width: cameraWidth,
            height: cameraHeight,
            overflow: 'hidden',
          }}>
            {isActive ? (
              <Camera
                ref={cameraRef}
                resizeMode="cover"
                style={{flex: 1}}
                device={device}
                isActive={isActive}
                photo={true}
                onInitialized={() => log.info('camera initialized')}
                onError={(error) => log.error(`camera error: ${JSON.stringify(error)}`)}
              />
            ) : (
              <View style={[styles.cameraPlaceholder, {width: cameraWidth, height: cameraHeight}]}>
                <Text style={styles.whiteText}>相机未激活</Text>
              </View>
            )}

            {/* 取景框覆盖层: 九宫格参考线 */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <GridOverlay
                title={selectedPics.length >= AI_COACH_MAX_PIC_LEN
                  ? `最多可拍 ${AI_COACH_MAX_PIC_LEN} 张, 已达上限`
                  : selectedPics.length > 0
                    ? `拍摄题目第 ${selectedPics.length + 1} 部分`
                    : '一次拍摄一整页'
                }
                subTitle="文字与参考线平行"
              />
            </View>
          </View>
        )}
      </View>

      {/* ======== 中层: UI 覆盖 ======== */}
      <View style={styles.uiLayer} pointerEvents="box-none">

        {/* 顶部栏 */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              log.info('back pressed');
              cancelTimeoutCover();
            }}>
            <Text style={styles.whiteText}>← 返回</Text>
          </TouchableOpacity>

          <View style={styles.infoTag}>
            <Text style={styles.infoText}>
              {isPortraitMode ? '竖屏' : '横屏'} |
              {isSplitWindowStatus ? '分屏' : isFloatingWindowStatus ? '悬浮窗' : '全屏'} |
              {`${Math.round(cameraWidth)}×${Math.round(cameraHeight)}`}
            </Text>
          </View>
        </View>

        {/* 图片预览缩略图 */}
        {selectedPics.length > 0 && (
          <View style={styles.thumbnailContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedPics.map((uri, index) => (
                <View key={index} style={styles.thumbnailWrapper}>
                  <Image source={{uri}} style={styles.thumbnail} resizeMode="cover" />
                  <TouchableOpacity
                    style={styles.thumbnailDelete}
                    onPress={() => handleImageDelete(index)}>
                    <Text style={styles.thumbnailDeleteText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 底部操作栏 */}
        <View style={styles.bottomBar}>
          {/* 图库按钮 */}
          <TouchableOpacity
            style={styles.galleryButton}
            // onPress={selectFromGallery}
            >
            <Text style={styles.whiteText}>📷</Text>
            <Text style={styles.smallText}>图库</Text>
          </TouchableOpacity>

          {/* 拍照按钮 */}
          <TouchableOpacity
            testID="captureButton"
            onPress={() => {
              log.info(`capture press, disabled: ${canCaptureDisabled()}, active: ${isActive}`);
              if (!canCaptureDisabled()) {
                setIsCapturing(true);
                takePhoto();
              }
            }}
            disabled={canCaptureDisabled()}
            style={styles.captureButtonContainer}>
            <CaptureButton enabled={!canCaptureDisabled() && isActive} />
          </TouchableOpacity>

          {/* 确认/去评估按钮 */}
          <View style={styles.evaluateArea}>
            {selectedPics.length > 0 ? (
              <TouchableOpacity
                style={styles.evaluateButton}
                onPress={() => {
                  showToast(`已选择 ${selectedPics.length} 张图片，可继续处理`);
                }}>
                <Text style={styles.evaluateButtonText}>
                  去评估 ({selectedPics.length})
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.evaluatePlaceholder}>
                <Text style={styles.smallText}>拍照或选图</Text>
              </View>
            )}
          </View>
        </View>

        {/* 子模式标签 */}
        <View style={styles.modeTag}>
          <Text style={styles.modeText}>拍照解题</Text>
          <View style={styles.modeDot} />
        </View>
      </View>

      {/* ======== 遮罩层 ======== */}
      {isShowBlackCover && (
        <Pressable style={styles.blackCover} onPress={cancelBlackCover}>
          <Text style={styles.blackCoverText}>点击返回相机</Text>
        </Pressable>
      )}
    </View>
  );
};

// ============================================================
// 样式
// ============================================================

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
  },

  // 相机层
  cameraLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraPlaceholder: {
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // UI 覆盖层
  uiLayer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // 顶部栏
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  infoTag: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  infoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
  },

  // 缩略图
  thumbnailContainer: {
    position: 'absolute',
    bottom: 180,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  thumbnailWrapper: {
    marginLeft: 8,
    position: 'relative',
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  thumbnailDelete: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailDeleteText: {
    color: '#FFF',
    fontSize: 10,
  },

  // 底部操作栏
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  captureButtonContainer: {
    overflow: 'hidden',
  },
  evaluateArea: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  evaluateButton: {
    backgroundColor: '#0A59F7',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  evaluateButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  evaluatePlaceholder: {
    alignItems: 'center',
  },

  // 模式标签
  modeTag: {
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  modeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0A59F7',
  },

  // 黑色遮罩
  blackCover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101,
  },
  blackCoverText: {
    color: '#FFF',
    fontSize: 16,
  },

  // 通用
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  whiteText: {
    color: '#FFF',
    fontSize: 16,
  },
  smallText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
});

export default VisionCameraDemo;
