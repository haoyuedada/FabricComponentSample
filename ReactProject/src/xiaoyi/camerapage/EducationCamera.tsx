/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2026-2026. All rights reserved.
 */

import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {
    BackHandler,
    Dimensions,
    LayoutChangeEvent,
    Pressable,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
    useWindowDimensions
} from 'react-native';
import {Camera, useCameraDevice, useCameraPermission,} from 'react-native-vision-camera';
import {navigationService} from '../navigation';
import {launchImageLibrary} from 'react-native-image-picker';
import EduLogger from '../utils/EduLogger';
import CaptureButton from './components/CaptureButton';
import ResponsiveSvg from '../components/ResponsiveSvg';
import {getEXIF, getWindowMode, showToast} from '../common/native/InvokeMethods';
import {colors} from '../common/theme/Type';
import {useRouteParams} from '../navigation/hooks/useRouteParams';
import {
  defaultSubModeDict, DeviceType,
  ExifResult,
  FunctionMode,
  modeNameMap,
  ModeType,
  scene2ModeMap,
  SceneName,
  SubmodeId,
  subModeMap,
  WindowMode,
} from './types';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import HorizontalCenteredList from '../components/HorizontalSelectList';
import BasicHeader from '../components/BasicHeader';
import gridOverlay from './components/GridOverlay';
import {useBundleParams} from '../contexts/InitialPropsContext';
import {useIsFocused} from '@react-navigation/native';
import {HOMEPAGE_REPORT_NAME, ModuleType, parseWithStr, reportButtonClick} from '../EduHomePageUtils';
import useAppState from '../hooks/useAppState';
import HintPage from './components/HintPage';
import {CommonEndpoint} from '../../common/event/CommonEndpoint';
import {EDU_RN_ENDPOINT_NAME} from '../Constants';
import {RNToNativeTransmitter} from '../../common/event/transmitter/RNToNativeTransmitter';
import DynamicText from '../../common/components/DynamicText';
import {AI_COACH_MAX_PIC_LEN, PictureSource,} from '../components/aiCoach/baseController/constants';
import HorizontalImageList from './subComponent/HorizonImageList';
import SingleImagePreview from './subComponent/SingleImagePreview';
import {AICoachController} from '../components/aiCoach/baseController/AICoachController';
import {UploadImageParam} from '../components/aiCoach/baseController/Model';
import {UploadResult} from '../common/native/type';
import ToEvaluateButton from './subComponent/toEvaluateButton';
import {
    STRING_OF_PLEASE_TO_RE_UPLOAD_PICTURE,
    STRING_OF_PLEASE_TO_UPLOAD_PICTURE_FIRST,
    STRING_OF_PLEASE_TO_WAIT_PICTURE_UPLOAD_COMPLETE,
} from '../components/aiCoach/resources/string';
import {Logger} from "../../docpage/common/Logger";
import GridOverlay from "./components/GridOverlay";
import {InvokeMethods} from '../../common/native/InvokeMethods';
import {getFoldStatusFun} from '../common/native/InvokeMethods';
import {DeviceInfo} from '../../common/native/bean/DeviceInfo';
import StudyRecordButton from "../components/buttons/StudyRecordButton";
import {StudyRecordTabsId} from "../components/studyRecordPage/model/StudyRecordModel";
import ColumnBasicHeader from '../components/ColumnBasicHeader';
import {
  STRING_OF_CLICK_TO_BACK_TO_CAMERA,
  STRING_OF_EXPAND_DEVICE_TO_SCAN,
  STRING_OF_PLEASE_VIEW_CAMERA_AT_FULL_SCREEN,
} from './constant';
import {CameraLayoutController, LayoutHandlerFunc} from './controller/CameraLayoutController';

const TAG: string = '[EduCamera]';
// 相机取景框固定比例： 3 / 4
const CAMERA_RATIO_3_4: number = 3 / 4;

const educationCamera = (): React.ReactElement => {
    const param = useRouteParams();
    EduLogger.debug(`param: ${JSON.stringify(param)}`, TAG);
    const bundleParam = useBundleParams();
    const agentInfo = param?.agentInfo ?? bundleParam.agentInfo;
    const scene: SceneName = param?.param?.scene ?? SceneName.SOLVE;
    EduLogger.debug(`agentInfo: ${JSON.stringify(agentInfo)}`, TAG);
    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);
    const {hasPermission, requestPermission} = useCameraPermission();
    const [mode, setMode] = useState<FunctionMode>(scene2ModeMap?.[scene] ?? FunctionMode.Page);
    const currentModeRef = useRef(
        scene === 'solve' ? FunctionMode.Page : FunctionMode.Correct,
    );
    const [deviceOrientation, setDeviceOrientation] = useState<OrientationType>(
        OrientationType.PORTRAIT,
    );
    const [isDeviceOrientationChange, setIsDeviceOrientationChange] = useState<boolean>(false);
    const [cameraContainerAspect, setCameraContainerAspect] = useState<number>(1);
    const categories = subModeMap[scene as ModeType];
    const isFocused = useIsFocused();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isCapturing, setIsCapturing] = useState<boolean>(false); // 仅表示正在拍照处理中
    // 不再需要 captureButtonEnabled 状态，或者只保留它作为最终计算结果
    const [captureButtonEnabled, setCaptureButtonEnabled] = useState<boolean>(true);
    const appState = useAppState();
    const [unsupportWindowMode, setUnsupportWindowMode] =
        useState<boolean>(false);
    const enterTime = useRef(Date.now());
    // 使用 Hook 获取当前窗口的宽高
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    // 当前从图库选择/或拍摄的图片数量
    const [currSelectPicList, setCurrSelectPicList] = useState<string[]>([]);
    // 是否展示横排方向的图片预览区域
    const [isShowHorizonImageList, setIsShowHorizonImageList] =
        useState<boolean>(true);
    // 图片是否从图库选择而来,主要是用来控制拍摄按钮是否可用,因为拍摄与图片只能二选一
    const [isPicSelectFromGallery, setIsPicSelectFromGallery] =
        useState<boolean>(false);
    const aiCoachController = new AICoachController();
    // 超过 120s，展示关闭相机的黑色遮罩
    const [isShowBlackCover, setIsShowBlackCover] = useState<boolean>(false);
    // 使用 useRef 存储 timer ID
    const timeroutIdRef = useRef<number | null>(null);

    // 图片上传结果  new Map<number, UploadResult | undefined>()
    const [uploadImageResultList, setUploadImageResultList] = useState<(UploadResult | undefined)[]>([]);
    // 在父组件中，因为依赖UI状态刷新存在滞后性
    const isUploadingRef = useRef(false); // 同步锁，不受渲染周期影响
    // 设备类型
    const [deviceType, setDeviceType] = useState<string>();
    // 设备型号名称
    const [displayVersion, setDisplayVersion] = useState<string>('');
    // 在某些分屏状态下，隐藏相机页
    const [isCameraSleepByWindowStatus, setIsCameraSleepByWindowStatus] = useState<boolean>(false);
    // 是否是verde外屏
    const [isVerdeOutScreen, setIsVerdeOutScreen] = useState<boolean>(false);
    const [rightButtonAreaWidth, setRightButtonAreaWidth] = useState<number>(0);
    const cameraLayoutController = useRef(new CameraLayoutController()).current;

    useEffect(() => {
        EduLogger.info(`currSelectPicList length: ${currSelectPicList?.length}`, TAG);
        if (currSelectPicList.length === 0) {
            setIsPicSelectFromGallery(false);
            setIsCapturing(false);

            return;
        }
        if (currSelectPicList.length >= AI_COACH_MAX_PIC_LEN || isPicSelectFromGallery) {
            setIsCapturing(true);
        } else {
            setIsCapturing(isUploadingRef.current);
        }
    }, [currSelectPicList]);

    useEffect(() => {
        EduLogger.info(`useEffect, isCapturing: ${isCapturing}`, TAG,);
    }, [isCapturing]);

    const handleDimensionChange: () => void = () => {
        EduLogger.info(`handleDimensionChange`, TAG);
        getWindowMode()
            .then(windowMode => {
                EduLogger.info(`windowMode: ${windowMode}`, TAG);
                setUnsupportWindowMode(
                    windowMode === WindowMode.WINDOW_MODE_FLOAT_WINDOW ||
                    windowMode === WindowMode.WINDOW_MODE_SPLIT_SCREEN,
                );
            })
            .catch(e => {
                EduLogger.error(`getWindowModeError: ${JSON.stringify(e)}`, TAG);
            });
    };

    useEffect(() => {
        EduLogger.info(`isFocused: ${isFocused}; appState: ${appState}`, TAG);
        if (appState !== 'active' || !isFocused) {
            setIsActive(false);
            EduLogger.info(`setIsActive: ${false}`, TAG);
        } else {
            if (isFocused) {
                if (isPicSelectFromGallery) {
                    EduLogger.info(`isPicSelectFromGallery: ${isPicSelectFromGallery}, return...`, TAG);
                    setIsActive(true);
                    return;
                }
                // 导航获焦，等待动画推出后再执行动作
                setTimeout(() => {
                    const isActive: boolean = isFocused && appState === 'active';
                    setIsActive(isActive);
                    EduLogger.info(`setIsActive: ${isActive}`, TAG);
                    setTimeout(() => {
                        setIsCapturing(!isFocused || appState !== 'active');
                    }); // camera初始化后再允许点击拍摄按钮
                }, 350);
            } else {
                const isActive: boolean = isFocused && appState === 'active';
                setIsActive(isActive);
                EduLogger.info(`setIsActive: ${isActive}`, TAG);
            }
        }
    }, [isFocused, appState]);

    const handleSelect = (index: number, item: any): void => {
        EduLogger.info(`Selected mode at index: ${index}`, TAG);
        let modeTag = categories[index]?.id;
        switch (modeTag) {
            case SubmodeId.SOLVE_SINGLE:
                setMode(FunctionMode.Single);
                currentModeRef.current = FunctionMode.Single;
                break;
            case SubmodeId.SOLVE_PAGE:
                setMode(FunctionMode.Page);
                currentModeRef.current = FunctionMode.Page;
                break;
            case SubmodeId.CORRECT_PAGE:
                setMode(FunctionMode.Correct);
                currentModeRef.current = FunctionMode.Correct;
                break;
            default:
                setMode(FunctionMode.Page);
                currentModeRef.current = FunctionMode.Page;
                break;
        }
        return;
    };

    useEffect(() => {
        InvokeMethods?.setHideNavBar(true)
        // 锁定竖屏，并根据设备方向旋转拍摄提示语
        Orientation.getDeviceOrientation(handleOrientationChange);
        Orientation.addDeviceOrientationListener(handleOrientationChange);
        // Orientation.lockToPortrait();
        StatusBar.setBarStyle('light-content');
        EduLogger.debug(`bundleParam: ${JSON.stringify(bundleParam)}`, TAG);
        handleDimensionChange();
        const endpoint: CommonEndpoint<string> = new CommonEndpoint(
            EDU_RN_ENDPOINT_NAME.CONFIGURATION_CHANGE,
            [new RNToNativeTransmitter()],
            event => {
                EduLogger.info(
                    `CONFIGURATION_CHANGE. endpoint receive data from: ${event.from}`,
                    TAG,
                );
                handleDimensionChange();
                EduLogger.info(`screenWidth, width: ${Dimensions.get('window').width}`, TAG);
            },
        );

        return () => {
            endpoint.dispose();
            setIsActive(false);
            cancelTimeoutCover();
            EduLogger.info(`setActive false`, TAG);
            Orientation.removeOrientationListener(handleOrientationChange);
            Orientation.unlockAllOrientations();
            StatusBar.setBarStyle('dark-content'); // todo: 深色模式适配
            // 离开打点
        };
    }, []);

    /**
     * 增加一个屏幕超时的定时器，超时后屏幕关闭，打开遮罩，120s定时器
     */
    const createTimeoutCover = (): void => {
        // 清除可能存在的旧定时器，防止重复点击导致多个定时器运行
        if (timeroutIdRef.current !== null) {
            clearTimeout(timeroutIdRef.current);
        }
        // 取消遮罩
        cancelBlackCover();

        EduLogger.info(`timeroutIdRef start, isActive: ${isActive}`, TAG);

        // 创建定时器并捕获 ID
        timeroutIdRef.current = window.setTimeout(() => {
            setIsShowBlackCover(true);
            setIsActive(false);
            EduLogger.info(`timeroutIdRef has executed!~~~, isActive: ${isActive}`, TAG);
            // 执行完后可以将 ref 置为 null
            timeroutIdRef.current = null;
        }, 120000);

        EduLogger.info(`timeroutIdRef end, Timer ID: ${timeroutIdRef.current}, isActive: ${isActive}`, TAG);
    }

    const cancelTimeoutCover = (): void => {
        setIsShowBlackCover(false);
        if (timeroutIdRef.current !== null) {
            clearTimeout(timeroutIdRef.current);
            EduLogger.info(`cancelTimeoutCover, ID: ${timeroutIdRef.current}`, TAG);
            timeroutIdRef.current = null;
        }
    };

    useEffect(() => {
        if (!hasPermission) {
            requestPermission()
                .then((granted: boolean) => {
                    EduLogger.info(`requested camera permission`, TAG);
                    if (!granted) {
                        EduLogger.error(`camera permission is denied`, TAG);
                    }
                })
                .catch(e => {
                    EduLogger.error(
                        `reqeust camera permission error: ${JSON.stringify(e)}`,
                    );
                });
        }
        EduLogger.info(
            TAG,
            `permission: ${hasPermission}; device:${JSON.stringify(!!device)}`,
        );
    }, [hasPermission]);

    const exif2CvOrientation = (exifOrientation: number): number => {
        switch (exifOrientation) {
            case 2:
            case 3:
                // 顺时针旋转180°回到原图
                return 2;
            case 5:
            case 8:
                // 顺时针旋转270°回到原图
                return 1;
            case 6:
            case 7:
                // 顺时针旋转90°回到原图
                return 3;
            case 0:
            case 1:
            default:
                return 0;
        }
    };

    // 添加图片，并上传
    const addMultiImageUris = (uris: string[]): void => {
        setCurrSelectPicList(currSelectPicList => [...currSelectPicList, ...uris]);
        EduLogger.info(`addMultiImageUris, currSelectPicList length: ${currSelectPicList.length}`, TAG,);

        const picSource = isPicSelectFromGallery ? PictureSource.GALLERY : PictureSource.CAMERA;

        // 2. 创建占位符，确保 uploadImageResultList 长度立刻跟上，防止逻辑漏洞
        // 这一步很重要：让 horizontalImageList 知道有这么多任务在跑，即使还没结果
        const placeholders = new Array(uris.length).fill(undefined);
        setUploadImageResultList(prev => [...prev, ...placeholders]);

        const uploadImageParam: UploadImageParam = {
            uris: uris,
            pictureSource: picSource,
            agentId: agentInfo?.id,
        };
        aiCoachController.uploadImages(uploadImageParam).then(uploadResult => {
            EduLogger.info(`uploadImages success`, TAG);
            // 4. 更新真实结果
            // 确保 results 的顺序与 uris 一致
            setUploadImageResultList(prev => {
                const newList = [...prev];
                // 替换掉最后的占位符
                // 这里需要计算起始索引，假设是追加操作
                const startIndex = newList.length - uris.length;
                uploadResult.forEach((res, idx) => {
                    newList[startIndex + idx] = res;
                });
                return newList;
            });
        })
            .catch(e => {
                EduLogger.error(`uploadImages error: ${JSON.stringify(e)}`, TAG);
                // 5. 出错也要填充错误对象，消除 Loading
                setUploadImageResultList(prev => {
                    const newList = [...prev];
                    const startIndex = newList.length - uris.length;
                    // 填充错误标记
                    for (let i = 0; i < uris.length; i++) {
                        newList[startIndex + i] = {error: true, message: 'Upload failed'} as any;
                    }
                    return newList;
                });
            })
            .finally(() => {
                EduLogger.info(`uploadImages success, currSelectPicList length: ${currSelectPicList.length}, uploadImageResultList length: ${uploadImageResultList?.length}`, TAG);
                // 释放父组件的锁
                isUploadingRef.current = false;
                // 图片上传完成后，再放开拍摄按钮
                setIsCapturing(false);
            })
    };

    /**
     * 拍照获取图片的超时器
     */
    const takePhotoTimeoutPromise = (): Promise<void> => {
        // ★★★ 修改：给 takePhoto 加一个超时逻辑 ★★★
        const timeoutMs = 2500; // 2.5秒超时
        return new Promise((_, reject) =>
          setTimeout(() => reject(new Error('takePhoto timeout')), timeoutMs)
        );
    }

    const takePhoto = async (): Promise<void> => {
        // 【关键修改 1】检查锁，如果正在上传，直接拒绝本次点击
        if (isUploadingRef.current) {
            EduLogger.warn('Upload in progress, ignore click', TAG);
            return;
        }

        try {
            isUploadingRef.current = true; // 立即上锁
            EduLogger.info(`takePhoto Button on press 1`, TAG);

            const timeoutPromise = takePhotoTimeoutPromise();
            const takePhotoPromise = cameraRef.current?.takePhoto({});
            const file = await Promise.race([
              takePhotoPromise,
              timeoutPromise,
            ]);

            EduLogger.info(`takePhoto Button on press 2`, TAG);
            EduLogger.debug(`takePhoto fileObj: ${JSON.stringify(file)}`, TAG);
            if (file?.path) {
                const uri = `file://${file.path}`;
                EduLogger.info(`width: ${(await file).width}, heigth: ${(await file).height}`, TAG,);
                addMultiImageUris([uri]);
                if (scene === SceneName.AI_COACH) {
                    return;
                }

                let exifResult: ExifResult | undefined = parseWithStr(
                    await getEXIF(file.path),
                );
                let orientationNum = Number.parseInt(exifResult?.orientation ?? 'NaN');
                if (isNaN(orientationNum)) {
                    orientationNum = 0;
                }
                EduLogger.info(`orientationNum: ${orientationNum}`, TAG);
                // navigateNext(uri, agentInfo, {width: file.width, height: file.height}, exif2CvOrientation(orientationNum));
            }
        } catch (error: any) {
            EduLogger.error(`take picture failed. error: ${JSON.stringify(error.message)}`, TAG,);
            // 失败也要解锁
            isUploadingRef.current = false;
            setTimeout(() => {
                setIsCapturing(false);
            }, 100); // 发生错误500ms后允许重试
        } finally {
            EduLogger.info(`finally, take photo process end`, TAG);
        }
    };

    const selectFromGallery = async (): Promise<void> => {
        EduLogger.info(`selectFromGallery`, TAG);

        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 6,
            quality: 1,
        }).catch(e => {
            EduLogger.error(`launch image picker error: ${JSON.stringify(e?.message)}`, TAG);
        });
        EduLogger.debug(`launched ImageLibrary; result: ${JSON.stringify(result)}`, TAG,);
        // 图库选择到了图片
        if (result?.assets?.length) {
            EduLogger.info(`launched ImageLibrary; select pic length: ${result?.assets?.length}`, TAG,);
            let galleryPicUri: string[] = [];
            setCurrSelectPicList([]);
            result?.assets?.forEach(asset => {
                asset?.uri && galleryPicUri.push(asset.uri);
            });
            addMultiImageUris([...galleryPicUri]);
            setIsPicSelectFromGallery(true);
            return;
        }

        EduLogger.error(`launched ImageLibrary; select pic length is null, result: ${JSON.stringify(result)}.`, TAG,);
    };

    const handleCameraInitialized: () => void = () => {
        EduLogger.info(`camera initialized`, TAG);
    };

    const handleOrientationChange: (orientation: OrientationType) => void = (
        orientation: OrientationType,
    ) => {
        EduLogger.info(`deviceOrientation: ${orientation}`, TAG);
        if (
            orientation.startsWith('PORTRAIT') ||
            orientation.startsWith('LANDSCAPE')
        ) {
            setDeviceOrientation(orientation);
            setIsDeviceOrientationChange(prevState => !prevState);
        }
    };

    const getCameraBoxSize: () => ViewStyle = () => {
        if (deviceOrientation.startsWith('PORTRAIT')) {
            return {
                height: '33.3%',
                width: Dimensions.get('window').width > 500 ? '70%' : '90%',
            };
        } else {
            return {
                height: `${33.3 * cameraContainerAspect}%`,
                width: `${90 / cameraContainerAspect}%`,
            };
        }
    };

    const getRotateStyle: () => ViewStyle = () => {
        let degree = 0;
        switch (deviceOrientation) {
            case OrientationType['LANDSCAPE-LEFT']:
                degree = 90;
                break;
            case OrientationType['LANDSCAPE-RIGHT']:
                degree = 270;
                break;
            case OrientationType['PORTRAIT-UPSIDEDOWN']:
                degree = 180;
                break;
            case OrientationType.PORTRAIT:
            default:
                degree = 0;
                break;
        }
        return {
            transform: [{rotate: `${degree}deg`}],
        };
    };

    const handleCameraContainerLayout: (event: LayoutChangeEvent) => void = (
        event: LayoutChangeEvent,
    ) => {
        let width = event.nativeEvent.layout.width;
        let height = event.nativeEvent.layout.height;
        if (width === 0 || height === 0) {
            return;
        }
        setCameraContainerAspect(width / height);
    };

    const singleModeOverlay = (): React.ReactElement => {
        return (
            <View style={[styles.cameraBox, getCameraBoxSize(), getRotateStyle()]}>
                <DynamicText style={styles.cameraBoxText}>平行纸面拍照</DynamicText>
                <DynamicText style={styles.cameraBoxText}>
                    题目放入框内识别更准确
                </DynamicText>
            </View>
        );
    };

    /**
     * 多图的提示框: 方形
     */
    const rectMultiPageOverlay = (): React.ReactElement => {
        return (
            <View style={[styles.cameraBox, getCameraBoxSize(), getRotateStyle()]}>
                <DynamicText style={styles.cameraBoxText}>
                    {currSelectPicList.length >= AI_COACH_MAX_PIC_LEN
                        ? `最多可拍 ${AI_COACH_MAX_PIC_LEN} 张, 已达上限`
                        : `拍摄题目第 ${currSelectPicList.length + 1} 部分`}
                </DynamicText>
            </View>
        );
    };

    /**
     * 多图的提示框: 九宫格
     */
    const nineBoxGridMultiPageOverlay = (): React.ReactElement => {
        return (
            <GridOverlay textAngle={0} title={''} subTitle={getAiCoachTips()}/>
        );
    };

    /**
     * 获取提示语
     */
    const getAiCoachTips = (): string => {
        if (isPicSelectFromGallery) {
            return '图片选择完成';
        }
        if (!currSelectPicList.length) {
            return '按序拍摄，一次一页，文字与参考线平行';
        }
        if (currSelectPicList.length >= AI_COACH_MAX_PIC_LEN) {
            return `最多可拍 ${AI_COACH_MAX_PIC_LEN} 张, 已达上限`;
        }
        return `拍摄题目第 ${currSelectPicList.length + 1} 部分`;
    }

    if (unsupportWindowMode) {
        return HintPage();
    }

    if (!device) {
        return (
            <View style={styles.abnormal}>
                <DynamicText style={styles.abnormalText}>
                    没有可用的摄像头设备
                </DynamicText>
            </View>
        );
    }

    if (!hasPermission) {
        return (
            <View style={styles.abnormal}>
                <DynamicText style={styles.abnormalText}>需要摄像头权限</DynamicText>
            </View>
        );
    }

    const displayOverlayByScene = (mode: FunctionMode): React.ReactElement => {
        switch (mode) {
            case FunctionMode.MULTI_PAGE:
                return nineBoxGridMultiPageOverlay();
            case FunctionMode.Single:
                return singleModeOverlay();
            case FunctionMode.Correct:
            case FunctionMode.Page:
            default:
                return gridOverlay({
                    textAngle: 0,
                    title: '一次拍摄一整页',
                    subTitle: '文字与参考线平行',
                }) as React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                >;
        }
    };

    const handleImageDelete = (index: number): void => {
        EduLogger.info(
            `image delete, index: ${index}, currSelectPicList length: ${currSelectPicList.length}`,
            TAG,
        );
        // 更新图片列表
        let newList = [...currSelectPicList];
        newList.splice(index, 1);
        setCurrSelectPicList(newList);
        // 更新图片上传的结果
        let uploadResultList = [...uploadImageResultList];
        uploadResultList.splice(index, 1);
        setUploadImageResultList(uploadResultList);

      // 如果图片在上传时删除了，则马上把状态置回来；
      if (isUploadingRef.current) {
        EduLogger.warn(`handleImageDelete, image is uploading, delete and reset status...`, TAG);
        isUploadingRef.current = false;
        setIsCapturing(false);
      }
    };

    const onImagePreviewPress = (): void => {
        EduLogger.info(`image preview press, isShowHorizonImageList: ${isShowHorizonImageList}`, TAG,);
        setIsShowHorizonImageList(!isShowHorizonImageList);
    };

    // 图库按钮 或 最后一个图片的预览按钮
    const galleryOrImagePreviewButton = (): React.ReactElement => {
        return currSelectPicList?.length ? (
            <SingleImagePreview
                imageUriList={currSelectPicList}
                onPress={onImagePreviewPress}></SingleImagePreview>
        ) : (
            <TouchableOpacity
                testID={'gallerySelectButton'}
                onPress={selectFromGallery}
                style={windowWidth > 500 ? styles.captureGalleryCloumn : styles.captureGallery}>
                <ResponsiveSvg
                    source={require('../../../assets/com.huawei.va.edupage/ic_public_gallery.svg')}
                    width={24}
                    height={24}
                    color={colors.white90}
                />
            </TouchableOpacity>
        );
    };

    /**
     * 点击 去评估 按钮
     */
    const jumpToEvaluate = (): void => {
        if (!currSelectPicList.length) {
            showToast(STRING_OF_PLEASE_TO_UPLOAD_PICTURE_FIRST);
            return;
        }
        EduLogger.info(`jump to evaluate`, TAG);
        // 上传图片存在失败结果，提示“上传失败”
        const isSomeUploadFailed = uploadImageResultList.some(item => {
            if (item?.error) {
                EduLogger.error(`upload item error: ${item.error}`, TAG);
            }
            return item?.error !== undefined && item?.error !== ''
        });
        if (isSomeUploadFailed) {
            showToast(STRING_OF_PLEASE_TO_RE_UPLOAD_PICTURE);
            return;
        }
        // 未上传完成，需要提示等待一下
        if (uploadImageResultList.length < currSelectPicList.length ||
            uploadImageResultList.some(item => item === undefined)) {
            showToast(STRING_OF_PLEASE_TO_WAIT_PICTURE_UPLOAD_COMPLETE);
            return;
        }
        let uploadResults: UploadResult[] = [];
        uploadImageResultList.forEach(item => {
            item && uploadResults.push(item);
        })
        aiCoachController.sendFileInfo(uploadResults, agentInfo);
        cancelTimeoutCover();

        // 跳转到图片预览页面
        navigationService.navigate('aiCoachImagePreviewPage',
            {
                agentInfo: agentInfo,
                uploadResults: uploadResults,
            });
    }

    /**
     * 取消黑色遮罩层
     */
    const cancelBlackCover = (): void => {
        EduLogger.info(`blackCoverBuilder onPress`, TAG);
        setIsShowBlackCover(false);
        setIsActive(true);
    }

    /**
     * 拦截手势返回
     */
    useEffect(() => {
        EduLogger.info(TAG, `backAction register, isShowBlackCover: ${isShowBlackCover}`);
        const backAction = (): boolean => {
            Logger.info(TAG, `backAction, isShowBlackCover: ${isShowBlackCover}`);
            if (isShowBlackCover) {
                // 不返回上一个页面
                createTimeoutCover();
                return true;
            }

            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => {
            backHandler.remove();
        }
    }, [])


    const [cameraHeight, setCameraHeight] = useState(0);
    const [cameraWidth, setCameraWidth] = useState(0);
    const [isGRLExpandLandscape, setisGRLExpandLandscape] = useState(false);
    const [isGRLExpandPortrait, setisGRLExpandPortrait] = useState(false);
    const [isGRLHalfExpand, setisGRLHalfExpand] = useState(false);

    // 是否竖屏模式下
    const [isPortraitMode, setIsPortraitMode] = useState(false);
    // 是否是悬浮窗模式
    const [isFloatingWindowStatus, setIsFloatingWindowStatus] = useState(false);
    // 是否是 分屏模式
    const [isSplitWindowStatus, setIsSplitWindowStatus] = useState(false);

    // 初始化设备信息
    useEffect(() => {
      const initDisplayVersion = async (): Promise<void> => {
        let displayVersion = (await InvokeMethods.getDeviceInfo(DeviceInfo.DISPLAY_VERSION))?.toString().toUpperCase();
        setDisplayVersion(displayVersion);

        let deviceType = (await InvokeMethods.getDeviceInfo(DeviceInfo.DEVICE_TYPE))?.toString().toUpperCase();
        setDeviceType(deviceType);

        EduLogger.info(`isLockedOrientation, displayVersion: ${displayVersion}, deviceType: ${deviceType}`, TAG);
      }

      initDisplayVersion();
     }, [])

    const isHope = (displayVersion: string): boolean => {
      return displayVersion.startsWith('DTH') || displayVersion.startsWith('HOP');
    }

    const isVerde = (displayVersion: string): boolean => {
      return displayVersion.startsWith('VDE');
    }

    const freshCameraPageLayout = async (): Promise<void> => {
      // 始终保持相机页全屏，需要隐藏agent列表和任务栏；
      InvokeMethods?.setHideNavBar(true);

      const foldStatus: number = await getFoldStatusFun();
      // 刷新相机页布局
      const layoutResult = await cameraLayoutController.calculateLayout(windowWidth, windowHeight, foldStatus);

      // 2. 应用结果到状态变量
      setIsPortraitMode(layoutResult.isPortraitMode);
      setIsFloatingWindowStatus(layoutResult.isFloatingWindowStatus);
      setIsSplitWindowStatus(layoutResult.isSplitWindowStatus);

      setIsCameraSleepByWindowStatus(layoutResult.isCameraSleepByWindowStatus);
      setIsVerdeOutScreen(layoutResult.isVerdeOutScreen);

      setisGRLExpandPortrait(layoutResult.isGRLExpandPortrait);
      setisGRLExpandLandscape(layoutResult.isGRLExpandLandscape);
      setisGRLHalfExpand(layoutResult.isGRLHalfExpand);

      // 3. 根据枚举值执行具体的布局函数
      if (!layoutResult.isCameraSleepByWindowStatus && !layoutResult.isVerdeOutScreen) {
        if (layoutResult.layoutHandler === LayoutHandlerFunc.HANDLE_34_BAR_PHONE) {
          handle34BarPhone(windowWidth, windowHeight);
        } else if (layoutResult.layoutHandler === LayoutHandlerFunc.HANDLE_LANDSCAPE_43_SPLIT) {
          handleLandscape43Split(windowWidth, windowHeight);
        }
      }
    }

    useEffect(() => {
      // 窗口宽高变化，触发刷新
      freshCameraPageLayout();
    }, [windowWidth, windowHeight]);

    useEffect(() => {
      // 悬浮窗下，设备方向变化，触发刷新
      EduLogger.info(`isDeviceOrientationChange - isFloatingWindowStatus: ${isFloatingWindowStatus}, will fresh page layout.`, TAG);
      if (isFloatingWindowStatus) {
        freshCameraPageLayout();
      }
    }, [isDeviceOrientationChange]);

    /**
     * 处理横屏分屏下的相机窗口大小, 4:3
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
      EduLogger.info(`handleLandscape43Split - cameraWidth: ${calculatedWidth}, cameraHeight: ${calculatedHeight}`, TAG);
    };

    /**
     * 处理直板机样式
     * @param width
     * @param height
     */
    const handle34BarPhone = (width: number, height: number): void => {
        let calculatedWidth, calculatedHeight;
        if (width / height < CAMERA_RATIO_3_4) {
            calculatedWidth = width;
            calculatedHeight = width / CAMERA_RATIO_3_4;
        } else {
            calculatedHeight = height;
            calculatedWidth = height * CAMERA_RATIO_3_4;
        }
        setCameraWidth(calculatedWidth);
        setCameraHeight(calculatedHeight);
        EduLogger.info(`handleBarPhone - cameraWidth: ${calculatedWidth}, cameraHeight: ${calculatedHeight}`, TAG);
    };

    const blackCoverBuilder = (tips: string): ReactElement => {
        return (
            <Pressable style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                top: 0,
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 101
            }}>
                <View style={{position: 'absolute', left: 0, top: 0}}>
                    <BasicHeader color={colors.white90} bgColor={'#ffffff19'}
                                 rightButtonBuilder={rowHeaderRightButtonBuilder()}/>
                </View>

                <DynamicText style={{color: 'white', fontSize: 16}}>{tips}</DynamicText>
            </Pressable>
        )
    }

    const grlExpandPortraitBuilder = (): ReactElement => {
        return (
            <View testID={'grlExpandPortraitBuilder'}
                  style={[styles.container, {paddingBottom: (bundleParam.bottomMargin ?? 0)}]}>

                <BasicHeader color={colors.white90} bgColor={'#ffffff19'} rightButtonBuilder={rowHeaderRightButtonBuilder()}/>

                <View
                    style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        flexDirection: 'column',
                        width: cameraWidth,
                        height: cameraHeight,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }]}
                    onLayout={handleCameraContainerLayout}>
                    <></>
                </View>

                {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
                {currSelectPicList?.length && isShowHorizonImageList && (
                    <View
                        testID={'horizonImageList'}
                        style={{
                            position: 'absolute',
                            bottom: (windowHeight - cameraHeight) / 2 + 28,
                            left: 0,
                            right: 100,
                            zIndex: 10,
                        }}>
                        <HorizontalImageList
                            imageUriList={currSelectPicList}
                            uploadImageResultList={uploadImageResultList}
                            onImageDelete={handleImageDelete}
                        />
                    </View>
                )}

                {/*拍摄提示框*/}
                <View style={{width: '100%', height: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    position: 'absolute',
                }}>
                    <View style={{
                        width: cameraWidth - 100,
                        height: cameraHeight,
                        position: 'relative',
                    }}>
                        {displayOverlayByScene(mode)}
                    </View>
                </View>

                {/*右边的拍照按钮区域*/}
                <View style={{
                        marginTop: 10,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}>
                    <View style={[{
                        height: '90%',
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    }]}>

                      {/*图库按钮*/}
                      <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'transparent',
                        position: 'relative'
                      }}>
                        {galleryOrImagePreviewButton()}
                      </View>

                        {/*拍照按钮*/}
                        <TouchableOpacity
                            testID={'captureButton'}
                            style={{overflow: 'hidden', flex: 1, justifyContent: 'center',}}
                            onPress={(): void => {
                                EduLogger.info(
                                    `camera onPress, captureButtonEnabled: ${captureButtonEnabled}, isActive: ${isActive}`,
                                    TAG,
                                );
                                setIsCapturing(true);
                                takePhoto();
                            }}
                            disabled={canCaptureDisabled()}>

                            <CaptureButton
                                canCaptureEnabled={!canCaptureDisabled() && isActive}
                            />
                        </TouchableOpacity>

                      {/*去诊断 按钮*/}
                      <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'transparent',
                        position: 'relative',
                      }}>
                        {currSelectPicList?.length &&
                          <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList}/>}
                      </View>

                    </View>

                    {/*子模式*/}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            backgroundColor: 'transparent',
                            bottom: 24,
                        }}>
                        <DynamicText
                            style={{
                                color: '#FFF',
                                textAlign: 'center',
                                fontSize: 14,
                                lineHeight: 19,
                                fontWeight: 'bold',
                            }}>
                            {modeNameMap[scene as ModeType]}
                        </DynamicText>
                        <View
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                marginLeft: 5,
                                backgroundColor: '#0A59F7',
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
    const grlExpandLandscapeBuilder = (): ReactElement => {
        return (
            <View testID={'grlExpandLandscapeBuilder'}
                  style={[styles.container, {paddingBottom: bundleParam.bottomMargin}]}>

              <BasicHeader color={colors.white90} bgColor={'#ffffff19'} rightButtonBuilder={rowHeaderRightButtonBuilder()}/>

              <View style={{width: '100%', height: '100%', alignItems: 'center', top: 0, position: 'absolute'}}>
                <View
                  style={[{
                      position: 'relative',
                      flexDirection: 'column',
                      width: cameraWidth,
                      height: cameraHeight,
                      justifyContent: 'center'
                  }]}
                  onLayout={handleCameraContainerLayout}>
                  <></>

                        {/*拍摄提示框*/}
                        {cameraHeight > cameraWidth ? (
                            displayOverlayByScene(mode)
                        ) : (
                            <View style={{
                                marginTop: 100,
                                marginBottom: bundleParam.bottomMargin,
                                height: cameraHeight - (bundleParam?.bottomMargin ?? 0) - 100,
                                width: cameraWidth
                            }}>
                                {displayOverlayByScene(mode)}
                            </View>
                        )}

                        {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
                        {currSelectPicList?.length && isShowHorizonImageList && (
                            <View
                                testID={'horizonImageList'}
                                style={{
                                    position: 'absolute',
                                    bottom: 28,
                                    left: 0,
                                    right: 0,
                                    zIndex: 10,
                                }}>
                                <HorizontalImageList
                                    imageUriList={currSelectPicList}
                                    uploadImageResultList={uploadImageResultList}
                                    onImageDelete={handleImageDelete}
                                />
                            </View>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 10,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        position: 'absolute',
                        right: 24,
                        top: 0
                    }}>

                    <View style={styles.buttonContainerColumn}>

                      {/*图库按钮*/}
                      <View style={{width: '100%', justifyContent: 'flex-end', alignItems: 'center',flex:1,}}>
                        {galleryOrImagePreviewButton()}
                      </View>

                        {/*拍照按钮*/}
                        <TouchableOpacity
                          testID={'captureButton'}
                        style={{flex:1,justifyContent: 'center',
                        alignItems:'center',}}
                            onPress={(): void => {
                                EduLogger.info(
                                    `camera onPress, captureButtonEnabled: ${captureButtonEnabled}, isActive: ${isActive}`,
                                    TAG,
                                );
                                setIsCapturing(true);
                                takePhoto();
                            }}
                            disabled={canCaptureDisabled()}>

                            <CaptureButton
                                canCaptureEnabled={!canCaptureDisabled() && isActive}
                            />
                        </TouchableOpacity>

                      {/*去评估 按钮*/}
                      <View style={{ maxWidth: 80, overflow: 'hidden',flex:1 ,justifyContent: 'flex-start',
                        alignItems:'center'}}>
                        {currSelectPicList?.length && (
                          <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList} />)}
                      </View>

                    </View>
                    {/*子模式*/}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}>
                        <DynamicText
                            style={{
                                color: '#FFF',
                                textAlign: 'center',
                                fontSize: 14,
                                lineHeight: 19,
                                fontWeight: 'bold',
                            }}>
                            {modeNameMap[scene as ModeType]}
                        </DynamicText>
                        <View
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                marginLeft: 5,
                                backgroundColor: '#0A59F7',
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    /**
     * 折叠屏展开态
     */
    const foldedPhoneExpandBuilder = (): ReactElement => {
        // 表示 宽度占满；
        const isHeightLarger = cameraHeight > cameraWidth;
        // 高度撑满时，右侧黑色部分的宽度
        const tempWidth = windowWidth - cameraWidth;
        EduLogger.info(`tabletContentColumnBuilder, isHeightLarger: ${isHeightLarger}`)

        return (
            <View testID={'foldedPhoneExpandBuilder'} style={[styles.container,]}>

                {/*返回按钮*/}
                <View style={{
                    top: isHeightLarger ? 0 : bundleParam.topMargin,
                    width: '100%',
                    zIndex: 6,
                    position: 'absolute',
                    backgroundColor: 'transparent',
                }}>
                    <BasicHeader color={colors.white90} bgColor={'#ffffff19'} rightButtonBuilder={rowHeaderRightButtonBuilder()}/>
                </View>

                <View
                    style={[{
                        position: 'absolute',
                        // todo: 折叠屏竖屏时，高度撑满, 与pad的区别点 1
                        top: !isHeightLarger ? (bundleParam?.topMargin ?? 0) : 0,
                        left: 0,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: cameraWidth,
                        height: cameraHeight,
                        zIndex: 2,
                    }]}
                    onLayout={handleCameraContainerLayout}>

                    <></>

                    {/*拍摄提示框*/}
                    <View style={{
                        height: cameraHeight,
                        // todo: 在横屏时，右边需要让出100， 与pad的区别点 2
                        width: isHeightLarger ? cameraWidth : cameraWidth - rightButtonAreaWidth,
                        position: 'absolute',
                        backgroundColor: 'transparent',
                    }}>
                        {displayOverlayByScene(mode)}
                    </View>

                    {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
                    {(currSelectPicList?.length && isShowHorizonImageList &&
                        <View
                            testID={'horizonImageList'}
                            style={{
                                position: 'absolute',
                                bottom: bundleParam?.bottomMargin ?? 28,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: 60,
                                backgroundColor: 'transparent',
                            }}>
                            <HorizontalImageList
                                imageUriList={currSelectPicList}
                                uploadImageResultList={uploadImageResultList}
                                onImageDelete={handleImageDelete}
                            />
                        </View>
                    )}
                </View>

                <View
                    style={[{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        position: 'absolute',
                        // todo: 在横屏时，右边需要让出100， 与pad的区别点 3
                        width: isHeightLarger ? tempWidth : undefined,
                        right: isHeightLarger ? 0 : 24,
                        top: 0,
                        zIndex: 3,
                    }]}
                    onLayout={(event): void => {
                        const { width } = event.nativeEvent.layout;
                        setRightButtonAreaWidth((width ?? 0) + 2 * (isHeightLarger ? 24 : 0));
                    }}
                >

                    <View style={[{
                        height: '90%',
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    }]}>

                      {/*图库按钮*/}
                      <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'transparent',
                        position: 'relative'
                      }}>
                        {galleryOrImagePreviewButton()}
                      </View>

                        {/*拍照按钮*/}
                        <TouchableOpacity
                          testID={'captureButton'}
                            onPress={(): void => {
                                EduLogger.info(
                                    `camera onPress, captureButtonEnabled: ${captureButtonEnabled}, isActive: ${isActive}`,
                                    TAG,
                                );
                                setIsCapturing(true);
                                takePhoto();
                            }}
                            style={{overflow: 'hidden', flex: 1, justifyContent: 'center', alignItems: 'center',}}
                            disabled={canCaptureDisabled()}>

                            <CaptureButton
                                canCaptureEnabled={!canCaptureDisabled() && isActive}
                            />
                        </TouchableOpacity>

                      {/*去诊断 按钮*/}
                      <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'transparent',
                        position: 'relative',
                      }}>
                        {currSelectPicList?.length &&
                          <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList}/>}
                      </View>

                    </View>

                    {/*子模式*/}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            bottom: 24,
                            backgroundColor: 'transparent',
                        }}>
                        <DynamicText
                            style={{
                                color: '#FFF',
                                textAlign: 'center',
                                fontSize: 14,
                                lineHeight: 19,
                                fontWeight: 'bold',
                            }}>
                            {modeNameMap[scene as ModeType]}
                        </DynamicText>
                        <View
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                marginLeft: 5,
                                backgroundColor: '#0A59F7',
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    /**
     * 平板上，相机页的布局样式
     */
    const tabletContentColumnBuilder = (): ReactElement => {
        // 表示 宽度占满；
        const isHeightLarger = cameraHeight > cameraWidth;
        // 高度撑满时，右侧黑色部分的宽度
        const tempWidth = windowWidth - cameraWidth;
        EduLogger.info(`tabletContentColumnBuilder, isHeightLarger: ${isHeightLarger}`)

        return (
            <View testID={'tabletContentColumnBuilder'} style={[styles.container,
                {paddingTop: bundleParam.topMargin ?? 32},
            ]}>

                {/*返回按钮*/}
                <View style={{
                    width: '100%',
                    zIndex: 6,
                    position: 'absolute',
                    backgroundColor: 'transparent',
                }}>
                    <BasicHeader color={colors.white90} bgColor={'#ffffff19'} rightButtonBuilder={rowHeaderRightButtonBuilder()}/>
                </View>

                <View
                    style={[{
                        top: isHeightLarger ? (bundleParam?.topMargin ?? 0) + 64 : 0,
                        left: 0,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: cameraWidth,
                        height: cameraHeight,
                        zIndex: 2,
                    }]}
                    onLayout={handleCameraContainerLayout}>

                    <></>

                    {/*拍摄提示框*/}
                    <View style={{
                        height: cameraHeight,
                        width: isHeightLarger ? cameraWidth - rightButtonAreaWidth : cameraWidth,
                        position: 'absolute',
                        backgroundColor: 'transparent',
                    }}>
                        {displayOverlayByScene(mode)}
                    </View>

                    {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
                    {(currSelectPicList?.length && isShowHorizonImageList &&
                        <View
                            testID={'horizonImageList'}
                            style={{
                                position: 'absolute',
                                bottom: bundleParam?.bottomMargin ?? 28,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: 60,
                                backgroundColor: 'transparent',
                            }}>
                            <HorizontalImageList
                                imageUriList={currSelectPicList}
                                uploadImageResultList={uploadImageResultList}
                                onImageDelete={handleImageDelete}
                            />
                        </View>
                    )}
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        height: '100%',
                        width: isHeightLarger ? undefined : tempWidth,
                        right: isHeightLarger ? 24 : 0,
                        position: 'absolute',
                        top: 0,
                        zIndex: 3,
                    }}
                    onLayout={(event): void => {
                        const { width } = event.nativeEvent.layout;
                        setRightButtonAreaWidth((width ?? 0) + 2 * (isHeightLarger ? 24 : 0));
                    }}
                >

                    <View style={[{
                        height: '90%',
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    }]}>

                      {/*图库按钮*/}
                      <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'transparent',
                        position: 'relative'
                      }}>
                        {galleryOrImagePreviewButton()}
                      </View>

                        {/*拍照按钮*/}
                        <TouchableOpacity
                          testID={'captureButton'}
                            onPress={(): void => {
                                EduLogger.info(
                                    `camera onPress, captureButtonEnabled: ${captureButtonEnabled}, isActive: ${isActive}`,
                                    TAG,
                                );
                                setIsCapturing(true);
                                takePhoto();
                            }}
                            style={{overflow: 'hidden', flex: 1, justifyContent: 'center',}}
                            disabled={canCaptureDisabled()}>

                            <CaptureButton
                                canCaptureEnabled={!canCaptureDisabled() && isActive}
                            />
                        </TouchableOpacity>

                      {/*去诊断 按钮*/}
                      <View style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'transparent',
                        position: 'relative',
                      }}>
                        {currSelectPicList?.length &&
                          <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList}/>}
                      </View>

                    </View>

                    {/*子模式*/}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            backgroundColor: 'transparent',
                            bottom: 24,
                        }}>
                        <DynamicText
                            style={{
                                color: '#FFF',
                                textAlign: 'center',
                                fontSize: 14,
                                lineHeight: 19,
                                fontWeight: 'bold',
                            }}>
                            {modeNameMap[scene as ModeType]}
                        </DynamicText>
                        <View
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                marginLeft: 5,
                                backgroundColor: '#0A59F7',
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    /**
     * 分屏时，窗口宽度大于500时的样式
     */
    const splitSmWidthColumnBuilder = (): ReactElement => {
      // 表示 宽度占满；
      const isHeightLarger = cameraHeight > cameraWidth;
      // 高度撑满时，右侧黑色部分的宽度
      const tempWidth = windowWidth - cameraWidth;
      EduLogger.info(`splitSmWidthColumnBuilder, isHeightLarger: ${isHeightLarger}, tempWidth: ${tempWidth}`)

      return (
        <View testID={'splitSmWidthColumnBuilder'} style={[styles.container,
          {paddingTop: bundleParam.topMargin ?? 32},
        ]}>

          {/*返回按钮*/}
          <View style={{
            width: '100%',
            zIndex: 6,
            position: 'absolute',
            backgroundColor: 'transparent',
          }}>
            <BasicHeader color={colors.white90} bgColor={'#ffffff19'} rightButtonBuilder={rowHeaderRightButtonBuilder()}/>
          </View>

          {/*拍摄提示框*/}
          <View style={{
            top: (windowHeight - cameraHeight) / 2,
            left: windowWidth - cameraWidth > 220 ? (windowWidth - cameraWidth) / 2 : 0,
            height: cameraHeight,
            width: windowWidth === cameraWidth ? windowWidth - 120 : cameraWidth,
            position: 'absolute',
            backgroundColor: 'transparent',
          }}>
            {displayOverlayByScene(mode)}

            {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
            {(currSelectPicList?.length && isShowHorizonImageList &&
              <View
                testID={'horizonImageList'}
                style={{
                  position: 'absolute',
                  bottom: bundleParam?.bottomMargin ?? 28,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 60,
                  backgroundColor: 'transparent',
                }}>
                <HorizontalImageList
                  imageUriList={currSelectPicList}
                  uploadImageResultList={uploadImageResultList}
                  onImageDelete={handleImageDelete}
                />
              </View>
            )}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '100%',
              width: windowWidth === cameraWidth ? 120 : (tempWidth > 220 ? tempWidth / 2 : tempWidth),
              right: 0,
              position: 'absolute',
              top: 0,
              borderWidth: 4,
              borderColor: 'transparent',
            }}
            onLayout={(event): void => {
              const { width } = event.nativeEvent.layout;
              setRightButtonAreaWidth((width ?? 0) + 2 * (isHeightLarger ? 24 : 0));
            }}>

            <View style={[{
              height: '90%',
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            }]}>

              {/*图库按钮*/}
              <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'transparent',
                position: 'relative'
              }}>
                {galleryOrImagePreviewButton()}
              </View>

              {/*拍照按钮*/}
              <TouchableOpacity
                testID={'captureButton'}
                onPress={(): void => {
                  EduLogger.info(
                    `camera onPress, captureButtonEnabled: ${captureButtonEnabled}, isActive: ${isActive}`,
                    TAG,
                  );
                  setIsCapturing(true);
                  takePhoto();
                }}
                style={{overflow: 'hidden', flex: 1, justifyContent: 'center',}}
                disabled={canCaptureDisabled()}>

                <CaptureButton
                  canCaptureEnabled={!canCaptureDisabled() && isActive}
                />
              </TouchableOpacity>

              {/*去诊断 按钮*/}
              <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'transparent',
                position: 'relative',
              }}>
                {currSelectPicList?.length &&
                  <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList}/>}
              </View>

            </View>

            {/*子模式*/}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: 'transparent',
                bottom: (windowHeight - cameraHeight) / 2 > 24 ?
                  24 : ((windowHeight - cameraHeight) / 2 < 12 ?
                    24 : (windowHeight - cameraHeight) / 2),
                borderWidth: 4,
                borderColor: 'transparent',
              }}>
              <DynamicText
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontSize: 14,
                  lineHeight: 19,
                  fontWeight: 'bold',
                }}>
                {modeNameMap[scene as ModeType]}
              </DynamicText>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  marginLeft: 5,
                  backgroundColor: '#0A59F7',
                }}
              />
            </View>
          </View>
        </View>
      )
    }

    /**
     * 分屏时，窗口高度小于500的样式，主要是上下分屏
     */
    const splitHeightXsRowBuilder = (): ReactElement => {
      // 表示 宽度占满；
      const isHeightLarger = cameraHeight > cameraWidth;
      // 高度撑满时，右侧黑色部分的宽度
      const tempWidth = windowWidth - cameraWidth;
      EduLogger.info(`splitSmWidthColumnBuilder, isHeightLarger: ${isHeightLarger}, tempWidth: ${tempWidth}`)

      return (
        <View testID={'splitSmWidthColumnBuilder'} style={[styles.container,]}>

          {/*返回按钮*/}
          <View style={{
            flex: 1,
            height: '100%',
            position: 'absolute',
            backgroundColor: 'transparent',
            bottom: 0,
          }}>
            <ColumnBasicHeader color={colors.white90} bgColor={'#ffffff19'}
                               rightButtonBuilder={columnHeaderBottomButtonBuilder()}/>
          </View>

          {/*拍摄提示框*/}
          <View style={{
            top: (windowHeight - cameraHeight) / 2,
            left: (windowWidth - cameraWidth) / 2,
            height: cameraHeight,
            width: windowWidth === cameraWidth ? windowWidth - 120 : cameraWidth,
            position: 'absolute',
            backgroundColor: 'transparent',
          }}>
            {displayOverlayByScene(mode)}

            {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
            {(currSelectPicList?.length && isShowHorizonImageList &&
              <View
                testID={'horizonImageList'}
                style={{
                  position: 'absolute',
                  bottom: bundleParam?.bottomMargin ?? 28,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 60,
                  backgroundColor: 'transparent',
                }}>
                <HorizontalImageList
                  imageUriList={currSelectPicList}
                  uploadImageResultList={uploadImageResultList}
                  onImageDelete={handleImageDelete}
                />
              </View>
            )}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: '100%',
              width: windowWidth === cameraWidth ? 120 : (tempWidth / 2 > 120 ? 120 : tempWidth / 2),
              right: 0,
              position: 'absolute',
              top: 0,
              gap: 12,
            }}>

            <View style={[{
              height: '100%',
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            }]}>

              {/*图库按钮*/}
              <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'transparent',
                position: 'relative'
              }}>
                {galleryOrImagePreviewButton()}
              </View>

              {/*拍照按钮*/}
              <TouchableOpacity
                testID={'captureButton'}
                onPress={(): void => {
                  EduLogger.info(
                    `camera onPress, captureButtonEnabled: ${captureButtonEnabled}, isActive: ${isActive}`,
                    TAG,
                  );
                  setIsCapturing(true);
                  takePhoto();
                }}
                style={{overflow: 'hidden', flex: 1, justifyContent: 'center',}}
                disabled={canCaptureDisabled()}>

                <CaptureButton
                  canCaptureEnabled={!canCaptureDisabled() && isActive}
                />
              </TouchableOpacity>

              {/*去诊断 按钮*/}
              <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'transparent',
                position: 'relative',
              }}>
                {currSelectPicList?.length &&
                  <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList}/>}
              </View>

            </View>

            {/*子模式*/}
            <View
              style={{
                width: 8,
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                bottom: 8,
              }}>
              <DynamicText
                style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontSize: 14,
                  lineHeight: 19,
                  fontWeight: 'bold',
                }}>
                {modeNameMap[scene as ModeType]}
              </DynamicText>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  marginLeft: 5,
                  backgroundColor: '#0A59F7',
                }}
              />
            </View>
          </View>
        </View>
      )
    }

    /**
     * 拍摄按钮不可用
     * 如：正在拍摄过程中，或拍摄超过最大数量限度
     */
    const canCaptureDisabled = (): boolean => {
        return isCapturing || isPicSelectFromGallery || currSelectPicList.length >= AI_COACH_MAX_PIC_LEN;
    }

    const onStudyRecordPress: () => void = () => {
        EduLogger.info(`onStudyRecordPress`, TAG);
        navigationService.navigate('studyRecordPage', {
            inputAgentInfo: agentInfo.current,
            inputTabName: StudyRecordTabsId.AI_COACH,
        })

        reportButtonClick('历史入口', ModuleType.functionButton, agentInfo?.current, HOMEPAGE_REPORT_NAME)
    }

    /**
     * 页头，右半边的按钮部分
     */
    const rowHeaderRightButtonBuilder = (): ReactElement => {
        return (
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <StudyRecordButton color={colors.white90} bgColor={'#ffffff19'}
                                   onPress={onStudyRecordPress}></StudyRecordButton>
            </View>
        )
    }

    /**
     * 竖向页头，下半边的按钮部分
     */
    const columnHeaderBottomButtonBuilder = (): ReactElement => {
      return (
        <View style={{position: 'relative', flexDirection: 'column', gap: 8,
          alignItems: 'center',}}>
          <StudyRecordButton color={colors.white90} bgColor={'#ffffff19'}
                             onPress={onStudyRecordPress}></StudyRecordButton>
        </View>
      )
    }

    const floatingWindow34PhoneBuilder = (): ReactElement => {
      return (
        <View testID={'floatingWindow34PhoneBuilder'}
              style={[styles.container, {paddingBottom: bundleParam.bottomMargin,
        }]}>

          <BasicHeader color={colors.white90} bgColor={'#ffffff19'}
                       rightButtonBuilder={rowHeaderRightButtonBuilder()}/>

            <View style={[{
              position: 'absolute', // 关键属性：绝对定位
              width: '100%',
              top: (windowHeight - cameraHeight) / 2,
              bottom: 0,
              flex: 1,
            }]}>

              {/*拍摄提示框*/}
              <View style={[{
                flex: 1,
              }]}>

                {displayOverlayByScene(mode)}

                {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
                {currSelectPicList?.length && isShowHorizonImageList && (
                  <View
                    testID={'horizonImageList'}
                    style={{
                      position: 'absolute',
                      bottom: 28,
                      width: '100%',
                      left: 0,
                      zIndex: 10,
                    }}>
                    <HorizontalImageList
                      imageUriList={currSelectPicList}
                      uploadImageResultList={uploadImageResultList}
                      onImageDelete={handleImageDelete}
                    />
                  </View>
                )}
              </View>

              <View
                style={{
                  height: 150,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  bottom: (windowHeight - cameraHeight) / 2 > 20 ? (windowHeight - cameraHeight) / 2 - 50 : 28,
                }}>
                {/*子模式*/}
                <HorizontalCenteredList
                  data={categories}
                  onSelectChange={handleSelect}
                  initialIndex={categories.findIndex(
                    item => item.id === defaultSubModeDict[scene as ModeType],
                  )}
                  screenWidth={windowWidth}
                />

                <View style={[styles.buttonContainer]}>
                  {/*图库按钮 或 图片预览区域*/}
                  <View style={{flex: 1, alignItems: 'center'}}>
                    {galleryOrImagePreviewButton()}
                  </View>

                  {/*拍照按钮*/}
                  <TouchableOpacity
                    testID={'captureButton'}
                    style={{flex: 1, alignItems: 'center'}}
                    onPress={(): void => {
                      EduLogger.info(`camera onPress, isCapturing: ${isCapturing}, isActive: ${isActive}`, TAG,);
                      setIsCapturing(true);
                      takePhoto();
                    }}
                    disabled={canCaptureDisabled()}>

                    <CaptureButton
                      canCaptureEnabled={!canCaptureDisabled() && isActive}
                    />
                  </TouchableOpacity>

                  {/*去评估 按钮*/}
                  {currSelectPicList?.length ? (
                    <View style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'transparent'}}>
                      <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList} />
                    </View>
                  ) : (<View style={{flex: 1, alignItems: 'center'}}></View>)}
                </View>

                {/*子模式*/}
                {subModeBuilder()}
              </View>
            </View>

        </View>
      )
    }

    const floatingWindow43PhoneBuilder = (): ReactElement => {
      return (
        <View testID={'floatingWindow43PhoneBuilder'}
              style={[styles.container, {paddingBottom: bundleParam.bottomMargin,
        }]}>

          <BasicHeader color={colors.white90} bgColor={'#ffffff19'}
                       rightButtonBuilder={rowHeaderRightButtonBuilder()}/>

          {/*拍摄提示框*/}
          <View style={[{
            position: 'absolute',
            top: (windowHeight - cameraHeight) / 2,
            height: cameraHeight,
            width: cameraWidth,
          }]}>
            {displayOverlayByScene(mode)}
          </View>

          {/*底部按钮区域*/}
          <View
            style={{
              position: 'absolute',
              height: 150,
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
              bottom: 28,
            }}>
            {/*子模式*/}
            <HorizontalCenteredList
              data={categories}
              onSelectChange={handleSelect}
              initialIndex={categories.findIndex(
                item => item.id === defaultSubModeDict[scene as ModeType],
              )}
              screenWidth={windowWidth}
            />

            <View style={[styles.buttonContainer]}>
              {/*图库按钮 或 图片预览区域*/}
              <View style={{flex: 1, alignItems: 'center'}}>
                {galleryOrImagePreviewButton()}
              </View>

              {/*拍照按钮*/}
              <TouchableOpacity
                testID={'captureButton'}
                style={{flex: 1, alignItems: 'center'}}
                onPress={(): void => {
                  EduLogger.info(`camera onPress, isCapturing: ${isCapturing}, isActive: ${isActive}`, TAG,);
                  setIsCapturing(true);
                  takePhoto();
                }}
                disabled={canCaptureDisabled()}>

                <CaptureButton
                  canCaptureEnabled={!canCaptureDisabled() && isActive}
                />
              </TouchableOpacity>

              {/*去评估 按钮*/}
              {currSelectPicList?.length ? (
                <View style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'transparent'}}>
                  <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList} />
                </View>
              ) : (<View style={{flex: 1, alignItems: 'center'}}></View>)}
            </View>

            {/*子模式*/}
            {subModeBuilder()}
          </View>

          {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
          {currSelectPicList?.length && isShowHorizonImageList && (
            <View
              testID={'horizonImageList'}
              style={{
                position: 'absolute',
                left: 0,
                bottom: (windowHeight - cameraHeight) / 2,
                zIndex: 10,
                width: '100%',
              }}>
              <HorizontalImageList
                imageUriList={currSelectPicList}
                uploadImageResultList={uploadImageResultList}
                onImageDelete={handleImageDelete}
              />
            </View>
          )}
        </View>
      )
    }

    const fatterPhoneBuilder = (): ReactElement => {
        return (
            <View testID={'fatterPhoneBuilder'}
                  style={[styles.container, {paddingBottom: bundleParam.bottomMargin,
            }]}>

                {/*相机*/}
                <View
                    style={[{
                        position: 'absolute',
                        left: 0,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: cameraWidth,
                        height: cameraHeight,
                        zIndex: 2,
                        top: (windowHeight - cameraHeight) / 2,
                    }]}
                    onLayout={handleCameraContainerLayout}>

                  <></>

                    <View style={[{
                        position: 'absolute', // 关键属性：绝对定位
                        top: -20,
                        width: '100%',
                        height: '100%',
                    }]}>
                        {/*页头*/}
                        <View style={{
                            top: 0,
                        }}>
                            <BasicHeader color={colors.white90} bgColor={'#ffffff19'}
                                         rightButtonBuilder={rowHeaderRightButtonBuilder()}/>
                        </View>

                        {/*拍摄提示框*/}
                        <View style={[{
                            flex: 1,
                        }]}>
                            {displayOverlayByScene(mode)}
                        </View>

                        <View
                            style={{
                                height: 150,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}>
                            {/*子模式*/}
                            <HorizontalCenteredList
                                data={categories}
                                onSelectChange={handleSelect}
                                initialIndex={categories.findIndex(
                                    item => item.id === defaultSubModeDict[scene as ModeType],
                                )}
                                screenWidth={windowWidth}
                            />

                            <View style={[styles.buttonContainer]}>
                                {/*图库按钮 或 图片预览区域*/}
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    {galleryOrImagePreviewButton()}
                                </View>

                                {/*拍照按钮*/}
                                <TouchableOpacity
                                  testID={'captureButton'}
                                    style={{flex: 1, alignItems: 'center'}}
                                    onPress={(): void => {
                                        EduLogger.info(`camera onPress, isCapturing: ${isCapturing}, isActive: ${isActive}`, TAG,);
                                        setIsCapturing(true);
                                        takePhoto();
                                    }}
                                    disabled={canCaptureDisabled()}>

                                    <CaptureButton
                                        canCaptureEnabled={!canCaptureDisabled() && isActive}
                                    />
                                </TouchableOpacity>

                                {/*去评估 按钮*/}
                                {currSelectPicList?.length ? (
                                    <View style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'transparent'}}>
                                        <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList} />
                                    </View>
                                ) : (<View style={{flex: 1, alignItems: 'center'}}></View>)}
                            </View>

                            {/*子模式*/}
                            {subModeBuilder()}
                        </View>
                    </View>

                    {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
                    {currSelectPicList?.length && isShowHorizonImageList && (
                        <View
                            testID={'horizonImageList'}
                            style={{
                                position: 'absolute',
                                bottom: 150,
                                left: 0,
                                right: 0,
                                zIndex: 10,
                            }}>
                            <HorizontalImageList
                                imageUriList={currSelectPicList}
                                uploadImageResultList={uploadImageResultList}
                                onImageDelete={handleImageDelete}
                            />
                        </View>
                    )}
                </View>
            </View>
        )
    }

    /**
     * 分屏场景下，窗口类似于直板机样式的布局
     */
    const splitBarPhoneBuilder = (): ReactElement => {
      return (
        <View testID={'splitBarPhoneBuilder'} style={[styles.container, {paddingBottom: bundleParam.bottomMargin}]}>
          <BasicHeader color={colors.white90} bgColor={'#ffffff19'}
                       rightButtonBuilder={rowHeaderRightButtonBuilder()}/>

          <View
            style={{
              marginTop: deviceType === DeviceType.PHONE ?
                (bundleParam?.topMargin ?? 0) + 84 : (windowHeight - cameraHeight) / 2,
              height: cameraHeight,
              width: cameraWidth,
              position: 'absolute',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            onLayout={handleCameraContainerLayout}>

            <></>

            {/*拍摄提示框*/}
            {displayOverlayByScene(mode)}

            {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
            {currSelectPicList?.length && isShowHorizonImageList && (
              <View
                testID={'horizonImageList'}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 10,
                }}>
                <HorizontalImageList
                  imageUriList={currSelectPicList}
                  uploadImageResultList={uploadImageResultList}
                  onImageDelete={handleImageDelete}
                />
              </View>
            )}
          </View>

          <View
            style={{
              position: 'absolute',
              marginTop: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 160,
              width: '100%',
              bottom: bundleParam?.bottomMargin ?? 0,
            }}>
            {/*子模式*/}
            <HorizontalCenteredList
              data={categories}
              onSelectChange={handleSelect}
              initialIndex={categories.findIndex(
                item => item.id === defaultSubModeDict[scene as ModeType],
              )}
              screenWidth={windowWidth}
            />

            <View style={[styles.buttonContainer, {
            }]}>
              {/*图库按钮 或 图片预览区域*/}
              <View style={{flex: 1, alignItems: 'center'}}>
                {galleryOrImagePreviewButton()}
              </View>

              {/*拍照按钮*/}
              <TouchableOpacity
                testID={'captureButton'}
                style={{flex: 1, alignItems: 'center'}}
                onPress={(): void => {
                  EduLogger.info(`camera onPress, isCapturing: ${isCapturing}, isActive: ${isActive}`, TAG,);
                  setIsCapturing(true);
                  takePhoto();
                }}
                disabled={canCaptureDisabled()}>

                <CaptureButton
                  canCaptureEnabled={!canCaptureDisabled() && isActive}
                />
              </TouchableOpacity>

              {/*去评估 按钮*/}
              {currSelectPicList?.length ? (
                <View style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'transparent'}}>
                  <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList} />
                </View>
              ) : (<View style={{flex: 1, alignItems: 'center'}}></View>)}
            </View>

            {/*子模式*/}
            {subModeBuilder()}
          </View>
        </View>
      )
    }

    /**
     * 直板机
     */
    const barPhoneBuilder = (): ReactElement => {
        return (
            <View testID={'barPhoneBuilder'} style={[styles.container, {paddingBottom: bundleParam.bottomMargin}]}>
                <BasicHeader color={colors.white90} bgColor={'#ffffff19'}
                             rightButtonBuilder={rowHeaderRightButtonBuilder()}/>

                <View
                    style={{
                        marginTop: (bundleParam?.topMargin ?? 0) + 84,
                        height: cameraHeight,
                        width: cameraWidth,
                        position: 'absolute',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    onLayout={handleCameraContainerLayout}>

                    <></>

                    {/*拍摄提示框*/}
                    {displayOverlayByScene(mode)}

                    {/*多图时的预览列表: 列表有图片且点击显示隐藏时，展示图片预览列表*/}
                    {currSelectPicList?.length && isShowHorizonImageList && (
                        <View
                            testID={'horizonImageList'}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 10,
                            }}>
                            <HorizontalImageList
                                imageUriList={currSelectPicList}
                                uploadImageResultList={uploadImageResultList}
                                onImageDelete={handleImageDelete}
                            />
                        </View>
                    )}
                </View>

                <View
                    style={{
                      position: 'absolute',
                      marginTop: 10,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: 160,
                      width: '100%',
                      bottom: bundleParam?.bottomMargin ?? 0,
                    }}>
                    {/*子模式*/}
                    <HorizontalCenteredList
                        data={categories}
                        onSelectChange={handleSelect}
                        initialIndex={categories.findIndex(
                            item => item.id === defaultSubModeDict[scene as ModeType],
                        )}
                        screenWidth={windowWidth}
                    />

                    <View style={[styles.buttonContainer, {
                    }]}>
                        {/*图库按钮 或 图片预览区域*/}
                        <View style={{flex: 1, alignItems: 'center'}}>
                            {galleryOrImagePreviewButton()}
                        </View>

                        {/*拍照按钮*/}
                        <TouchableOpacity
                            testID={'captureButton'}
                            style={{flex: 1, alignItems: 'center'}}
                            onPress={(): void => {
                                EduLogger.info(`camera onPress, isCapturing: ${isCapturing}, isActive: ${isActive}`, TAG,);
                                setIsCapturing(true);
                                takePhoto();
                            }}
                            disabled={canCaptureDisabled()}>

                            <CaptureButton
                                canCaptureEnabled={!canCaptureDisabled() && isActive}
                            />
                        </TouchableOpacity>

                        {/*去评估 按钮*/}
                        {currSelectPicList?.length ? (
                            <View style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'transparent'}}>
                                <ToEvaluateButton onPress={jumpToEvaluate} imageUriList={currSelectPicList} />
                            </View>
                        ) : (<View style={{flex: 1, alignItems: 'center'}}></View>)}
                    </View>

                    {/*子模式*/}
                    {subModeBuilder()}
                </View>
            </View>
        )
    }

    const subModeBuilder = (): ReactElement => {
        return (
            <View
                style={{alignItems: 'center', justifyContent: 'center', width: '100%',}}>
                <DynamicText
                    style={{color: '#FFF', textAlign: 'center', fontSize: 14, lineHeight: 19, fontWeight: 'bold',}}>
                    {modeNameMap[scene as ModeType]}
                </DynamicText>

                <View style={{width: 6, height: 6, borderRadius: 3, marginTop: 5, backgroundColor: '#0A59F7',}}/>
            </View>
        )
    }

    const isTabletWindowBeyond500 = (): boolean => {
        return deviceType === DeviceType.TABLET && windowWidth > 500;
    }

    const isWindowBeyond500 = (): boolean => {
        return windowWidth > 500;
    }

    const isFatterPhoneWindow = (): boolean => {
        return deviceType === DeviceType.PHONE && (isHope(displayVersion) || isVerde(displayVersion)) && windowWidth / windowHeight > 0.56;
    }

    const layoutContentBuilder = (): ReactElement => {
        EduLogger.debug(`layoutContentBuilder, isSplitWindowStatus: ${isSplitWindowStatus}, cameraWidth: ${cameraWidth}, cameraHeight: ${cameraHeight}`, TAG);
        switch (true) {
            case isSplitWindowStatus:
              EduLogger.debug(`layoutContentBuilder, 1`, TAG);
              if (isHope(displayVersion)) {
                if (isPortraitMode) {
                  // 竖屏模式下
                  return fatterPhoneBuilder();
                } else if (windowHeight < 500) {
                  return splitHeightXsRowBuilder();
                } else {
                  return splitSmWidthColumnBuilder();
                }
              } else if (windowWidth < 500) {
                return splitBarPhoneBuilder();
              } else if (windowHeight < 500) {
                return splitHeightXsRowBuilder();
              } else {
                return splitSmWidthColumnBuilder();
              }
            case isFloatingWindowStatus:
              EduLogger.debug(`layoutContentBuilder, 2`, TAG);
              if (cameraWidth < cameraHeight) {
                // 悬浮窗窗口，类似于 直板机，胖窗口, 宽高比 = 3:4
                return floatingWindow34PhoneBuilder();
              } else {
                // 悬浮窗窗口，类似于 直板机，胖窗口, 宽高比 = 4:3
                return floatingWindow43PhoneBuilder();
              }
            case isGRLExpandPortrait:
              EduLogger.debug(`layoutContentBuilder, 3`, TAG);
                return grlExpandPortraitBuilder()
            case isGRLExpandLandscape:
              EduLogger.debug(`layoutContentBuilder, 4`, TAG);
                return grlExpandLandscapeBuilder();
            case isTabletWindowBeyond500():
              EduLogger.debug(`layoutContentBuilder, 5`, TAG);
                return tabletContentColumnBuilder();
            case isFatterPhoneWindow():
              EduLogger.debug(`layoutContentBuilder, 6`, TAG);
                // 直板机，胖窗口
                return fatterPhoneBuilder();
            case isWindowBeyond500():
              EduLogger.debug(`layoutContentBuilder, 7`, TAG);
                return foldedPhoneExpandBuilder();
            default:
              EduLogger.debug(`layoutContentBuilder, 8`, TAG);
                return barPhoneBuilder();
        }
    };

    const cameraComponentBuilder = (): ReactElement => {
        return (
            isActive ?
                <Camera
                    testID={'cameraComponentBuilder'}
                    ref={cameraRef}
                    resizeMode={'cover'}
                    style={{flex: 1,}}
                    device={device}
                    isActive={isActive}
                    photo={true}
                    onInitialized={handleCameraInitialized}
                    onError={(error): void => {
                        EduLogger.error(
                            `camera onError. error: ${JSON.stringify(error)}`,
                            TAG,
                        );
                    }}
                    onStopped={(): void => {
                        EduLogger.info(`camera onStopped`, TAG);
                    }}/> : <></>
        )
    }

    const getCameraItemBuilderStyle = (): ViewStyle => {
        EduLogger.debug(`getCameraItemBuilderStyle, deviceType: ${deviceType}, isSplitWindowStatus: ${isSplitWindowStatus}, windowWidth: ${windowWidth}`, TAG);
        switch (true) {
            case isSplitWindowStatus:
              // 分屏
              EduLogger.debug(`getCameraItemBuilderStyle, 1`, TAG);
              return {
                top: (deviceType === DeviceType.PHONE && windowWidth < 500 && !isHope(displayVersion)) ?
                  // 手机上的窄窗口，按照直板机的样式布局
                  (bundleParam?.topMargin ?? 0) + 84 : (windowHeight - cameraHeight) / 2,
                left: windowWidth - cameraWidth > 220 ? (windowWidth - cameraWidth) / 2 : 0,
              };
            case isFloatingWindowStatus:
              // 悬浮窗
              EduLogger.debug(`getCameraItemBuilderStyle, 2`, TAG);
              return {
                top: (windowHeight - cameraHeight) / 2,
              };
            case isGRLExpandPortrait:
              EduLogger.debug(`getCameraItemBuilderStyle, 3`, TAG);
                return {
                  top: (windowHeight - cameraHeight) / 2,
                };
            case isGRLExpandLandscape:
              EduLogger.debug(`getCameraItemBuilderStyle, 4`, TAG);
                return {
                  left: (windowWidth - cameraWidth) / 2,
                };
            case isTabletWindowBeyond500():
              EduLogger.debug(`getCameraItemBuilderStyle, 5`, TAG);
                return {
                  top: cameraHeight > cameraWidth ? (bundleParam?.topMargin ?? 0) + 64 : 0,
                  left: 0,
                };
            case isFatterPhoneWindow():
                // 直板机，胖窗口
              EduLogger.debug(`getCameraItemBuilderStyle, 6`, TAG);
                return {
                  top: (windowHeight - cameraHeight) / 2,
                };
            case isWindowBeyond500():
              EduLogger.debug(`getCameraItemBuilderStyle, 7`, TAG);
                return {
                  // todo: 折叠屏竖屏时，高度撑满, 与pad的区别点 1
                  top: cameraHeight > cameraWidth ? 0 : (bundleParam?.topMargin ?? 0),
                  left: 0,
                };
            default:
              EduLogger.debug(`getCameraItemBuilderStyle, 8`, TAG);
                return {
                    marginTop: (bundleParam?.topMargin ?? 0) + 84,
                };
        }
    }

    /**
     * 各机型或设备下的相机页，共用一个 <Camera> 组件，只改变样式；
     * 否则，会有一些问题：如折叠展开，或屏幕旋转时，用不同的 Camera 组件，会导致底层的相机延迟释放后，导致打开相机失败黑屏；
     */
    const cameraItemBuilder = (): ReactElement => {
        return (
            <View testID={'cameraItemBuilder'}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    position: 'absolute',
                    paddingBottom: bundleParam?.bottomMargin,
            }}>
                <View
                    style={[{
                      width: cameraWidth,
                      height: cameraHeight,
                    },
                      getCameraItemBuilderStyle(),
                    ]}>

                    {/*verde外屏，或其他场景的分屏模式下，隐藏相机*/}
                    {(isVerdeOutScreen || isCameraSleepByWindowStatus) ? <></> : cameraComponentBuilder()}

                </View>

            </View>
        )
    }

    return (
        <View testID={'FullScreenPressable'} style={{backgroundColor: 'transparent'}}
              onTouchStart={createTimeoutCover}
        >
            <View>
                {/*底部相机部分*/}
                {cameraItemBuilder()}

                {/*上面的按钮部分*/}
                {layoutContentBuilder()}

                {/*超长时间的相机遮罩*/}
                {isShowBlackCover && blackCoverBuilder(STRING_OF_CLICK_TO_BACK_TO_CAMERA)}

                {/*某些分屏场景下，屏蔽相机页*/}
                {isCameraSleepByWindowStatus && blackCoverBuilder(STRING_OF_PLEASE_VIEW_CAMERA_AT_FULL_SCREEN)}

                {/*verde外屏不支持，屏蔽相机页，提示如下*/}
                {isVerdeOutScreen && blackCoverBuilder(STRING_OF_EXPAND_DEVICE_TO_SCAN)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        width: '100%',
    },
    cameraContainer: {
        marginTop: 44,
        height: '60%',
        width: '100%',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cameraBox: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        borderRadius: 20,
        position: 'absolute',
        left: 24,
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    abnormal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    cameraBoxText: {
        fontSize: 14,
        lineHeight: 16,
        color: 'rgba(255,255,255,1)',
    },
    abnormalText: {
        color: 'white',
        fontSize: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    buttonContainerColumn: {
        flexDirection: 'column',
        height:'70%',
        justifyContent: 'center',
        alignItems:'center',
        flex: 1
    },
    captureGalleryCloumn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 48,
        height: 48,
        backgroundColor: '#ffffff19',
    },
    captureGallery: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 48,
        height: 48,
        backgroundColor: '#ffffff19',
    },
    modeButton: {
        position: 'absolute',
        top: 0,
        right: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pageMode: {
        backgroundColor: 'blue',
        borderColor: 'blue',
    },

    singleMode: {
        backgroundColor: 'gray',
        borderColor: 'gray',
    },

    modeButtonText: {
        color: 'white',
        fontSize: 12,
        padding: 5,
    },
    modeText: {
        color: 'white',
    },
});

export default educationCamera;
