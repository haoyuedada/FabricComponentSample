import React from 'react';
import { Animated, StyleSheet, View, ScrollView, DeviceEventEmitter } from 'react-native';
import { CommonUtils, DarkStore, t } from '@hw-vmall/vrn-basic-comp';
import { LinearGradient } from '@hw-vmall/vrn-bussiness-comp';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { GestureDetector, GestureHandlerRootView, ScrollView as PanScrollView } from 'react-native-gesture-handler';
import { Gesture } from 'react-native-gesture-handler';
import CarBottom from '../../../../bundles/carDetailMp/component/carBottom';
import Car3DBtn from '../../../../bundles/carDetailMp/component/carFunctionBtn/Car3DBtn';
import { CarStoreComponent } from '../../../../bundles/carDetailMp/store/carStore';
import {
  handleAttrTabChangeValue,
  judgeTitleBtn,
  onAttrValueChange,
  shouldSwitchTab,
} from '../../../../bundles/carDetailMp/util/carStoreTool';
import {
  BOTTOM_HEIGHT,
  FULL_MULTI_LIST,
  TAB_DIFF,
  TAB_HEIGHT,
  TAB_TYPE,
} from '../../../../bundles/carDetailMp/util/constant';
import type { TabType, TouchEvent } from '../../../../bundles/carDetailMp/util/interface';
import { isCarRowLayout, PageJudgeContext } from '../../../../bundles/carDetailMp/util/tool';
import { InjectProps, ThemeStylesParams, injectLayout } from '../../../../components/platformProvider';
import { ANIM_EASING, createMultiTransition } from '../../../../shared/utils/animate';
import { ReportComponents } from '../../../../shared/utils/eventCenter';
import VPanGestureHandler from '../../../VPanGestureHandler/index';
import DisclaimerText from '../../../disclaimerText';
import JudgeUseWrapper from '../../../judgeUseWrapper';
import Tab from '../../../tab';
import TabView from '../../../tabView';
import { getImageDisplayType, MaterialImage } from '../../util/carStoreTool';
import { getHeadImageSize, limitHeadImageSize } from '../../util/tool';
import { SCALE_POS } from '../carTabImage/CarScaleImage';
import CarSwitcher from '../carTabImage/CarSwitcher';
import CarTopImgBack from '../carTabImage/CarTopImgBack';
import CarOptionListTransfer from './CarOptionListTransfer';

type CarNewSelectProps = InjectProps<ReturnType<typeof styles>>;

// 为了使app中可以同时滚动并捕获手势，使用特殊ScrollView
const gestureContentStyle = { flex: 1 };
const GestureScrollView = ({ children, onChange, scrollRef, ...restProps }: any) => {
  const panGestureRef = React.useRef(Gesture.Pan());

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      onChange?.({ nativeEvent: e });
    })
    .withRef(panGestureRef);

  return (
    <PanScrollView ref={scrollRef} simultaneousHandlers={[panGestureRef]} {...restProps}>
      <GestureDetector gesture={panGesture}>
        <View style={gestureContentStyle}>{children}</View>
      </GestureDetector>
    </PanScrollView>
  );
};

@observer
export class CarNewSelect extends CarStoreComponent<CarNewSelectProps> {
  static displayName = ReportComponents.CAR_NEW_SELECT;
  static contextType = PageJudgeContext;
  context!: React.ContextType<typeof PageJudgeContext>;

  /** app入场动画 */
  // 300ms 标准曲线
  startAppAnim1 = new Animated.Value(0);
  // 150ms 锐利曲线
  startAppAnim2 = new Animated.Value(0);
  // 300ms 锐利曲线
  startAppAnim3 = new Animated.Value(0);
  /** app整体动画 */
  overallAnim = new Animated.Value(0, { useNativeDriver: this.props.platform.isApp });

  /** 头图滑动动画样式 */
  tabImageAnimSlideStyle = {} as any;
  /** 头图透明度动画样式 */
  tabImageAnimOpacityStyle = {} as any;
  /** tab条动画样式 */
  tabBarAnimStyle = {} as any;
  /** tab页动画样式 */
  tabViewAnimStyle = {} as any;
  /** 底部栏动画样式 */
  bottomAnimStyle = {} as any;

  /** 头图大小 */
  layoutSize: ReturnType<typeof getHeadImageSize>;
  /** 是否展示横屏样式，pc和pad横屏使用 */
  isRow = false;

  /** 当前是否是拉起动画状态 */
  isPullUp = false;
  /** 当前是否是拉起动画是否由手动触发 */
  isPullUpManually = false;
  /** 是否是入场动画 */
  isStartAnim = true;
  /** 当前展示的图片列表，保证图片切换过度流畅 */
  curImgList = [] as MaterialImage[];
  /** 头图是否使用动画，属性切换不使用，tab切换使用 */
  shouldHeadImageAnim = false;
  /** 属性点击监听，点击后头图不使用动画 */
  judgeAnimListener = DeviceEventEmitter.addListener(
    `judgeHeadImageAnim-${this.carStore.urlParams.uniqueId}`,
    (value: boolean) => {
      this.shouldHeadImageAnim = Boolean(value);
    },
  );

  /** 当前内容滚动位置 */
  scrollTop = 0;
  /** 手势开始时，内容滚动位置 */
  eventStartScrollTop = 0;
  /** 页面内容滚动ref */
  scrollRefList = [] as ScrollView[];

  onNextListener = DeviceEventEmitter.addListener(`onTabChange-${this.carStore.urlParams.uniqueId}`, (index) =>
    this.onTabChange(index),
  );

  /** carStore.tabIndex变化时，需保证当前样式符合tab，主要为等待回退使用 */
  tabIndexDisposer = reaction(
    () => this.carStore.tabIndex,
    (curIndex) => {
      this.animToTab(this.shouldPullUp(curIndex), curIndex);
    },
  );

  state = {
    /** web、mp端使用此状态进行初始动画 */
    startWebAnim: false,
  };

  constructor(props: any) {
    super(props);

    // 初始化展示，非首tab不使用入场动画
    if (this.carStore.tabIndex !== 0) {
      this.isStartAnim = false;
    }

    // 初始化展示，拉起tab不使用动画
    if (this.shouldPullUp(this.carStore.tabIndex)) {
      this.overallAnim.setValue(1);
      this.isPullUp = true;
    }
  }

  componentDidMount(): void {
    // 初始启动入场动画
    if (this.isStartAnim) {
      if (this.props.platform.isApp) {
        // 使用requestAnimationFrame确保首屏渲染完成后再启动动画
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 序列化执行动画 先执行透明度动画，再执行位移动画，减少并行计算压力
            Animated.parallel([
              Animated.timing(this.startAppAnim1, {
                toValue: 300,
                duration: 300,
                easing: ANIM_EASING.STANDARD,
                useNativeDriver: true,
              }),
              Animated.timing(this.startAppAnim2, {
                toValue: 150,
                duration: 150,
                easing: ANIM_EASING.SHARP,
                useNativeDriver: true,
              }),
              Animated.timing(this.startAppAnim3, {
                toValue: 300,
                duration: 300,
                easing: ANIM_EASING.SHARP,
                useNativeDriver: true,
              }),
            ]).start();
          });
        });
      } else {
        this.setState({ startWebAnim: true });
      }
    }
  }

  componentDidUpdate(prevProps: CarNewSelectProps): void {
    if (prevProps.platform.isPhone !== this.props.platform.isPhone) {
      this.animToTab(this.shouldPullUp(this.carStore.tabIndex));
    }
  }

  componentWillUnmount(): void {
    this.judgeAnimListener.remove();
    this.onNextListener.remove();
    this.tabIndexDisposer();
  }

  // 拉起动画条件判断
  shouldPullUp(index: number) {
    const { platform } = this.props;

    if (!platform.isPhone) {
      return false;
    }

    return FULL_MULTI_LIST.includes(this.carStore.tabs[index]?.type);
  }

  animToTab = (shouldUp: boolean, curIndex = this.carStore.tabIndex) => {
    // 若拉起状态相同，切index相同，则不需要动画切换
    if (shouldUp === this.isPullUp && curIndex === this.carStore.tabIndex) {
      return;
    }

    // 切换tab更新滚动顶部值
    if (curIndex !== this.carStore.tabIndex) {
      this.scrollTop = 0;
    }

    if (shouldUp) {
      this.carStore.setStore({ tabIndex: curIndex });
      this.triggerPullAnim(1);
    } else {
      this.carStore.setStore({ tabIndex: curIndex });
      this.triggerPullAnim(0);
    }
  };

  onAttrTabChangeQuery = (curTab: TabType, lastIndex: number) => {
    const queryValue = handleAttrTabChangeValue(curTab);

    if (queryValue) {
      // 仅新模型切换tab需查询时，保留当前tabIndex方便后续回退，setViewData中会使用并清理该值
      if (this.carStore.lastTabIndex === null) {
        this.carStore.lastTabIndex = lastIndex;
      }

      onAttrValueChange(this.carStore, this.context)(queryValue, this.props.platform.isPc, false).catch(() => {});
    } else {
      // 请求中回到不需查询的tab，如车型聚合tab，需清理lastTabIndex
      this.carStore.lastTabIndex = null;
    }
  };

  onTabChange = (curIndex: number) => {
    const { tabs, tabIndex: lastIndex } = this.carStore;

    // 若版本切换不成功，不允许切换tab
    if (curIndex !== lastIndex && !shouldSwitchTab(this.carStore)) {
      return false;
    }

    this.isPullUpManually = false;
    this.isStartAnim = false;

    this.animToTab(this.shouldPullUp(curIndex), curIndex);

    // 切换tab时，内容需滚动到顶
    setTimeout(() => {
      this.scrollRefList[curIndex]?.scrollTo({ y: 0, animated: true });
    }, 100);

    const curTab = tabs[curIndex];

    this.onAttrTabChangeQuery(curTab, lastIndex);

    // 切换tab上报
    this.carStore.report({
      actionCode: '900027102',
      actionName: `${t('car_main_page')}-${curTab.title}`,
      resSiteCode: 'r_carDetail_top',
      resSiteName: t('top_nav'),
      content: {
        comId: 'carDetail_top',
        index_name: curTab.title,
        index: (curIndex + 1).toString(),
      },
    });

    return true;
  };

  // 主页面上滑手势
  onGestureEvent = (e: TouchEvent) => {
    console.log("chy onGestureEvent start=====")
    this.isPullUpManually = true;

    // 手势开始状态，onGestureEvent中仅mp端会为2
    if (e.nativeEvent.state === 2) {
      this.eventStartScrollTop = this.scrollTop;
    }

    if (e.nativeEvent.translationY <= -40) {
      this.animToTab(true);
    } else if (
      e.nativeEvent.translationY >= 40 &&
      // 若手势拖动，但滚动区域未触发位置更新，则可触发下滑动画
      (this.scrollTop < 10 || this.eventStartScrollTop === this.scrollTop)
    ) {
      this.animToTab(false);
    }
  };

  // 内容滚动，记录滚动位置，滚动到顶展开多选tab顶部图片
  onScroll = (e: any) => {
    this.scrollTop = e?.nativeEvent?.contentOffset?.y || 0;
  };

  renderTabContent = (tab: TabType, index: number, isCurrentView: boolean) => {
    if (!tab) {
      return null;
    }

    const isSeriesTab = tab.type === TAB_TYPE.SERIES;

    const { themeStyles, platform } = this.props;

    const isMultiTab = FULL_MULTI_LIST.includes(tab.type);

    const shouldUseGesture = platform.isPhone && (isMultiTab || platform.height < 480);

    const shouldPullUp = this.shouldPullUp(index);

    let paddingBottom = 12;
    // 竖屏时，若未拉起或不是当前展示tab，则额外设置paddingBottom
    if (!this.isRow && (!this.isPullUp || !isCurrentView)) {
      // paddingBottom值为拉起后展示高度减去常规状态高度的差值
      paddingBottom +=
        this.layoutSize.imgBox.height -
        platform.statusBarHeight -
        (platform.isMp ? 0 : this.carStore.titleHeight) -
        (platform.isPhone ? TAB_DIFF : 0);
    }

    const contentContainerStyle = [themeStyles.scrollContent, { paddingBottom }];

    // 限制应该拉起的tab，如果未拉起则不允许滚动，只接收手势
    const scrollEnabled = !shouldPullUp || this.isPullUp;

    const ref = (_r: any) => (this.scrollRefList[index] = _r);

    // apk、ios使用PanGestureHandler较难触发滚动，改用新手势方法，单框架用着有问题，还是用老的
    if (platform.isAndroid || platform.isIOS) {
      return (
        <GestureScrollView
          scrollRef={ref}
          // ios弹动可能导致scrollEnabled设为false时滚动位置问题
          bounces={!platform.isIOS}
          scrollEnabled={scrollEnabled}
          style={themeStyles.flex1}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
          onChange={shouldUseGesture ? this.onGestureEvent : undefined}
          contentContainerStyle={[contentContainerStyle, isSeriesTab && themeStyles.seriesTab]}
        >
          <View style={[themeStyles.flex1, themeStyles.fillContent]}>
            <CarOptionListTransfer tab={tab} />
          </View>
          {/* 外部容器没有滚动的时候，免责文案贴底；外部容器滚动的时候，滚动的底部可以看到免责文案 */}
          <DisclaimerText textStyle={themeStyles.disclaimerTextStyle} />
        </GestureScrollView>
      );
    }

    return (
      <VPanGestureHandler
        style={themeStyles.gestureContainer}
        activeOffsetY={shouldUseGesture ? [-20, 20] : [-1000, 1000]}
        onGestureEvent={shouldUseGesture ? this.onGestureEvent : undefined}
      >
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'red'
          }}
          ></View>
        <ScrollView
          ref={ref}
          // hm和ios一个问题
          bounces={!platform.isHarmony}
          scrollEnabled={scrollEnabled}
          style={themeStyles.scrollContainer}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll}
        >
          <JudgeUseWrapper judge={platform.isMp} wrapper={View} style={contentContainerStyle}>
            <>
              <View style={[themeStyles.flex1, themeStyles.fillContent]}>
                <CarOptionListTransfer tab={tab} />
              </View>
              {/* 外部容器没有滚动的时候，免责文案贴底；外部容器滚动的时候，滚动的底部可以看到免责文案 */}
              <DisclaimerText textStyle={themeStyles.disclaimerTextStyle} />
            </>
          </JudgeUseWrapper>
        </ScrollView>
      </VPanGestureHandler>
    );
  };

  renderTabView() {
    const { platform, themeStyles } = this.props;
    const {
      tabIndex,
      tabs,
      topHeight,
      bottomHeight,
      titleHeight,
      lastTabIndex,
      loadingSbom,
      showControllableLoading,
    } = this.carStore;

    let width = this.isRow ? platform.width - this.layoutSize.imgBox.width - (platform.isPc ? 64 : 0) : platform.width;
    let height: number;

    if (!this.isRow) {
      height =
        platform.height -
        topHeight -
        platform.statusBarHeight -
        (platform.isMp ? 0 : titleHeight) -
        TAB_HEIGHT -
        (bottomHeight || BOTTOM_HEIGHT + platform.safeAreaBottomHeight);
    }

    return (
      <Animated.View
        style={
          this.isRow
            ? [themeStyles.flex1, this.tabViewAnimStyle]
            : [themeStyles.tabViewContainer, this.tabViewAnimStyle, height && { height }]
        }
      >
        <TabView
          rerenderMark={[platform, this.isPullUp]}
          index={tabIndex}
          style={themeStyles.flex1}
          width={width}
          tabDataList={tabs}
          slideDuration={250}
          opacityDuration={250}
          translateX={width * 0.18}
          delay={100}
          renderTabView={this.renderTabContent}
          isLoading={lastTabIndex === null ? showControllableLoading : loadingSbom}
        />
      </Animated.View>
    );
  }

  /** 拉起定制类tab动画，0为关闭，1为拉起 */
  triggerPullAnim = (value: 0 | 1) => {
    const isPullingUp = Boolean(value);

    if (this.isPullUp === isPullingUp) {
      return;
    }

    this.isPullUp = isPullingUp;
    this.shouldHeadImageAnim = true;

    // 拉起时，状态栏使用当前深浅模式颜色
    if (isPullingUp) {
      DeviceEventEmitter.emit(
        `setStatusBarStyle-${this.carStore.urlParams.uniqueId}`,
        DarkStore.darkBool ? 'light-content' : 'dark-content',
      );
    }

    // 触发isPullUp变化
    this.forceUpdate();

    if (this.props.platform.isApp) {
      Animated.timing(this.overallAnim, {
        toValue: value,
        duration: 350,
        easing: this.isPullUpManually ? ANIM_EASING.DECELERATION : ANIM_EASING.STANDARD,
        useNativeDriver: true,
        isInteraction: true,
      }).start();
    }
  };

  getAnimStyle() {
    if (this.props.platform.isApp) {
      this.getAppAnimStyle();
    } else {
      this.getWebAnimStyle();
    }
  }

  getTranslateY(pullUp = this.isPullUp) {
    if (this.isRow) {
      return { tabDiff: 0, tabImageY: 0, tabBarY: 0, tabViewY: 0 };
    }

    const { platform } = this.props;
    const tabDiff = platform.isPhone ? TAB_DIFF : 0;
    const translateY = pullUp
      ? -this.layoutSize.imgBox.height +
        (platform.isMp ? 0 : this.carStore.titleHeight) +
        platform.statusBarHeight +
        tabDiff
      : 0;

    return {
      tabDiff,
      tabImageY: translateY,
      tabBarY: translateY - tabDiff,
      tabViewY: translateY - tabDiff + TAB_HEIGHT,
    };
  }

  getAppInitAnimStyle() {
    const { tabImageY, tabBarY, tabViewY } = this.getTranslateY();

    this.tabImageAnimOpacityStyle = {
      opacity: this.startAppAnim3.interpolate({
        inputRange: [0, 300],
        outputRange: [0, 1],
      }),
    };

    this.tabImageAnimSlideStyle = {
      transform: [{ translateY: tabImageY }],
    };

    this.tabBarAnimStyle = {
      opacity: this.startAppAnim2.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateY: this.startAppAnim1.interpolate({
            inputRange: [0, 300],
            outputRange: [tabBarY + 60, tabBarY],
          }),
        },
      ],
    };

    this.tabViewAnimStyle = {
      opacity: this.startAppAnim2.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateY: this.startAppAnim1.interpolate({
            inputRange: [0, 300],
            outputRange: [tabViewY + 60, tabViewY],
          }),
        },
      ],
    };

    this.bottomAnimStyle = {
      opacity: this.startAppAnim3.interpolate({
        inputRange: [0, 300],
        outputRange: [0, 1],
      }),
    };
  }

  getAppAnimStyle = () => {
    if (this.isStartAnim) {
      this.getAppInitAnimStyle();
      return;
    }

    const { tabDiff, tabImageY, tabBarY, tabViewY } = this.getTranslateY(true);

    this.tabImageAnimOpacityStyle = {
      opacity: this.overallAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
    };

    this.tabImageAnimSlideStyle = {
      transform: [
        {
          translateY: this.overallAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, tabImageY],
          }),
        },
      ],
    };

    this.tabBarAnimStyle = {
      // 将opacity映射为1，保证hm展示正确
      opacity: this.overallAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateY: this.overallAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-tabDiff, tabBarY],
          }),
        },
      ],
    };

    this.tabViewAnimStyle = {
      // 将opacity映射为1，保证hm展示正确
      opacity: this.overallAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateY: this.overallAnim.interpolate({
            inputRange: [0, 1],
            // hm横竖屏切换不能用布尔剔除动画样式，遂改为将动画映射值改为0，保证横屏样式展示正确
            outputRange: this.isRow ? [0, 0] : [TAB_HEIGHT - tabDiff, tabViewY],
          }),
        },
      ],
    };

    this.bottomAnimStyle = {
      // 将opacity映射为1，保证hm展示正确
      opacity: this.overallAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
    };
  };

  getWebInitAnimStyle = () => {
    const { tabImageY, tabBarY, tabViewY } = this.getTranslateY();

    if (this.state.startWebAnim) {
      this.tabImageAnimOpacityStyle = this.isPullUp
        ? { opacity: 0 }
        : {
            opacity: 1,
            transition: createMultiTransition(['opacity'], 300, 'SHARP'),
          };

      this.tabImageAnimSlideStyle = { transform: [{ translateY: tabImageY }] };

      this.tabBarAnimStyle = {
        opacity: 1,
        transform: [{ translateY: tabBarY }],
        transition: createMultiTransition([
          { cssName: 'opacity', bezierName: 'SHARP', duration: 150 },
          { cssName: 'transform', bezierName: 'STANDARD', duration: 300 },
        ]),
      };

      this.tabViewAnimStyle = {
        opacity: 1,
        transform: [{ translateY: tabViewY }],
        transition: createMultiTransition([
          { cssName: 'opacity', bezierName: 'SHARP', duration: 150 },
          { cssName: 'transform', bezierName: 'STANDARD', duration: 300 },
        ]),
      };

      this.bottomAnimStyle = {
        opacity: 1,
        transition: createMultiTransition(['opacity'], 300, 'SHARP'),
      };
    } else {
      this.tabImageAnimOpacityStyle = { opacity: 0 };

      this.tabImageAnimSlideStyle = { transform: [{ translateY: tabImageY }] };

      this.tabBarAnimStyle = { opacity: 0, transform: [{ translateY: tabBarY + 60 }] };

      this.tabViewAnimStyle = { opacity: 0, transform: [{ translateY: tabViewY + 60 }] };

      this.bottomAnimStyle = { opacity: 0 };
    }
  };

  getWebAnimStyle = () => {
    if (this.isStartAnim) {
      this.getWebInitAnimStyle();
      return;
    }

    const { tabImageY, tabBarY, tabViewY } = this.getTranslateY();

    const transition = createMultiTransition(
      ['opacity', 'transform'],
      350,
      this.isPullUpManually ? 'DECELERATION' : 'STANDARD',
    );

    this.tabImageAnimOpacityStyle = { opacity: this.isPullUp ? 0 : 1, transition };

    this.tabImageAnimSlideStyle = { transform: [{ translateY: tabImageY }], transition };

    this.tabBarAnimStyle = { transform: [{ translateY: tabBarY }], transition };

    this.tabViewAnimStyle = { transform: [{ translateY: tabViewY }], transition };
  };

  getSelectImageSize() {
    const { platform } = this.props;
    const { topHeight, bottomHeight } = this.carStore;

    // 兼容矮屏场景
    if (platform.isPhone && platform.height <= 480) {
      const imgBoxWidth = platform.width;
      const imgBoxHeight =
        platform.height -
        topHeight -
        TAB_HEIGHT +
        TAB_DIFF -
        (bottomHeight || BOTTOM_HEIGHT + platform.safeAreaBottomHeight);
      const imgHeight = Math.max(imgBoxHeight, 360);
      const imgWidth = (imgHeight / 9) * 16;

      return limitHeadImageSize(
        {
          img: { width: imgWidth, height: imgHeight },
          imgBox: { width: imgBoxWidth, height: imgBoxHeight },
        },
        3 / 5,
      );
    }

    return getHeadImageSize(platform, topHeight);
  }

  getPreviewModalImageSize() {
    const { platform } = this.props;

    let imgBoxWidth = 0;
    if (platform.isPhone) {
      imgBoxWidth = platform.width - 32;
    } else {
      imgBoxWidth = 448; // 弹框480 - 边距32
    }

    const imgBoxHeight = (imgBoxWidth / 16) * 9;
    let imgHeight = Math.max(imgBoxHeight, 360);
    let imgWidth = (imgHeight / 9) * 16;

    return limitHeadImageSize(
      {
        img: { width: imgWidth, height: imgHeight },
        imgBox: { width: imgBoxWidth, height: imgBoxHeight },
      },
      9 / 16,
    );
  }

  getHeadImageSize() {
    if (this.context.isCarSelect) {
      return this.getSelectImageSize();
    }

    return this.getPreviewModalImageSize();
  }

  // 浅色渐变遮罩，浅色模式仅置于背景图上方
  renderLinearBottomLight() {
    if (DarkStore.darkBool || this.isRow) {
      return null;
    }

    const { platform, themeStyles, theme } = this.props;

    return (
      <LinearGradient
        pointerEvents="none"
        style={[
          themeStyles.imgCover,
          {
            // 渐变位置偏移1，为了彻底遮住底边
            height: 56 + 1,
            top: this.layoutSize.imgBox.height - 56 - (platform.isPhone ? TAB_DIFF : 0),
          },
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={[0, 0.5, 1]}
        colors={[
          theme.C33.color,
          CommonUtils.colorRgba(theme.C33.color, 0.8),
          CommonUtils.colorRgba(theme.C33.color, 0),
        ]}
      />
    );
  }

  // 深色渐变遮罩，深色模式置于展示图上方
  renderLinearBottomDark() {
    if (!DarkStore.darkBool || this.isRow) {
      return null;
    }

    const { platform, themeStyles, theme } = this.props;

    return (
      <LinearGradient
        // locations变化时，colors却未更新，导致渐变不对，使用key强制刷新
        key={String(platform.isPhone)}
        pointerEvents="none"
        style={[
          themeStyles.imgCover,
          {
            // 渐变位置偏移1，为了彻底遮住底边
            height: 96 + 1,
            top: this.layoutSize.imgBox.height - 96,
          },
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={platform.isPhone ? [0, 0.66, 1] : [0, 1]}
        colors={
          platform.isPhone
            ? [theme.C32.color, CommonUtils.colorRgba(theme.C32.color, 0.23), CommonUtils.colorRgba(theme.C32.color, 0)]
            : [theme.C32.color, CommonUtils.colorRgba(theme.C32.color, 0)]
        }
      />
    );
  }

  getCurImageList(shouldUseDefaultImage: boolean) {
    // 如果新展示的有图才切换，无图就等待有图再切换，肯定能取到图的
    const newImgList = getImageDisplayType(this.carStore, shouldUseDefaultImage, this.context.isCarPreview);
    if (newImgList.length) {
      this.curImgList = newImgList;
    }
  }

  renderTabImage() {
    const { loadingSbom, showControllableLoading } = this.carStore;

    if (this.isPullUp) {
      // 如果拉起隐藏头图，就将展示图片置空
      this.curImgList = [];
    } else {
      // 加载结束没有素材图，且是非拉起隐藏状态，且切换组件的当前展示页的话才能取用默认图
      this.getCurImageList(!loadingSbom);
    }

    return (
      <>
        <CarTopImgBack imgSize={this.layoutSize.img} imgBoxSize={this.layoutSize.imgBox} />
        {this.renderLinearBottomLight()}
        <CarSwitcher
          useSwitchAnim={this.shouldHeadImageAnim}
          imgList={showControllableLoading ? [] : this.curImgList}
          imgSize={this.layoutSize.img}
          imgBoxSize={this.layoutSize.imgBox}
          isActive={!this.isPullUp}
          extraComponent={this.renderLinearBottomDark()}
          shouldChangeTheme
          shouldSwiperDotsChangeTheme={this.isRow ? true : !DarkStore.darkBool}
        />
      </>
    );
  }

  renderTabImageView() {
    const { platform, themeStyles } = this.props;
    const { tabIndex, tabs } = this.carStore;

    // 是否是多选Tab场景
    const isMultiTab = FULL_MULTI_LIST.includes(tabs[tabIndex]?.type);

    // 手机端多选tab或purax需要使用手势动作
    const shouldUseGesture = platform.isPhone && (isMultiTab || platform.height < 480);

    return (
      <Animated.View style={[this.layoutSize.imgBox, this.tabImageAnimSlideStyle]}>
        <VPanGestureHandler
          activeOffsetY={[-20, 20]}
          style={[themeStyles.gestureContainer, themeStyles.gestureSwiperContainer, this.tabImageAnimOpacityStyle]}
          onGestureEvent={shouldUseGesture ? this.onGestureEvent : undefined}
        >
          {this.render3DBtn()}
          {this.renderTabImage()}
        </VPanGestureHandler>
        {/* 图片遮挡条不应参与透明度动画 */}
        {platform.isPhone && !DarkStore.darkBool && <View style={themeStyles.phoneTabBack} />}
      </Animated.View>
    );
  }

  renderCarPreviewImage() {
    const { platform, themeStyles } = this.props;
    const { previewData } = this.carStore;

    if (platform.isPc || FULL_MULTI_LIST.includes(previewData.tab?.type)) {
      return null;
    }

    this.getCurImageList(!previewData.loading);

    return (
      <View style={themeStyles.swicherModalContainer}>
        <CarTopImgBack imgSize={this.layoutSize.img} imgBoxSize={this.layoutSize.imgBox} />
        <CarSwitcher
          scalePos={SCALE_POS.PHONE}
          useScaleGesture={false}
          useSwitchAnim={false}
          imgList={this.curImgList}
          imgSize={this.layoutSize.img}
          imgBoxSize={this.layoutSize.imgBox}
          isCard={true}
          dotsLayout={{
            dotsWidth: this.layoutSize.imgBox.width - platform.pageMargin * 2,
            dotsBottom: 0,
          }}
        />
      </View>
    );
  }

  renderCarPreviewModal() {
    const { themeStyles, platform } = this.props;
    const { previewData } = this.carStore;

    if (!previewData) {
      return null;
    }

    return (
      <ScrollView
        style={themeStyles.scrollContainer}
        contentContainerStyle={themeStyles.scrollModalContent}
        showsVerticalScrollIndicator={false}
      >
        <JudgeUseWrapper judge={platform.isMp} wrapper={View} style={themeStyles.scrollModalContent}>
          {this.renderCarPreviewImage()}
          <View style={[themeStyles.flex1, themeStyles.fillContent]}>
            <CarOptionListTransfer tab={previewData.tab} />
          </View>
          <DisclaimerText textStyle={themeStyles.disclaimerTip} />
        </JudgeUseWrapper>
      </ScrollView>
    );
  }

  renderTab(isMpServiceBackShow: boolean) {
    const { platform, themeStyles, theme } = this.props;
    const { tabIndex, tabs } = this.carStore;

    const normalFontStyle = platform.isPc
      ? { fontSize: 24, fontWeight: '400', ...theme.C15 }
      : { ...theme.T9, ...theme.C13 };

    const activeFontStyle = platform.isPc
      ? { fontSize: 24, fontWeight: '500', ...theme.C12 }
      : { ...theme.T10, ...theme.C12 };

    return (
      <Tab
        // 小程序拉起时触发tab滚动
        rerenderMark={[platform.width, isMpServiceBackShow]}
        index={tabIndex}
        tabs={tabs.map((tab) => tab.title)}
        tabGap={24}
        tabPaddingLeft={this.isRow ? 0 : platform.pageMargin}
        tabPaddingRight={
          this.isRow
            ? 0
            : (isMpServiceBackShow && platform.pageMargin + 56) || // mp客服按钮宽度为40 + 16，tab需给出客服按钮的空间
              platform.pageMargin
        }
        // 当是mp是常态变为拉起，需要在padding-right动画结束后再滚动
        scrollDelay={isMpServiceBackShow && this.isPullUp ? 500 : 0}
        normalFontStyle={normalFontStyle}
        activeFontStyle={activeFontStyle}
        onPressTab={this.onTabChange}
        useBottomBar
        bottomBarAnimDuration={350}
        activeAnimDuration={200}
        tabBarStyle={themeStyles.tabBar}
        tabHeight={platform.isPc ? 64 : 56}
        bottomBarStyle={themeStyles.bottomBarStyle}
        style={themeStyles.tabStyle}
      />
    );
  }

  renderTabBar() {
    const { platform, themeStyles } = this.props;

    // mp是否展示客服按钮占位白色背景
    const isMpServiceBackShow =
      platform.isMp && (this.isPullUp || this.isRow) && judgeTitleBtn(this.carStore, this.context).hasServiceIcon;

    return (
      <Animated.View
        style={
          this.isRow
            ? [themeStyles.rowTab, isMpServiceBackShow && themeStyles.rowTabMpServiceShow, this.tabBarAnimStyle]
            : [themeStyles.tabBarContainer, this.tabBarAnimStyle]
        }
      >
        {this.renderTab(isMpServiceBackShow)}
        {platform.isMp && (
          <View style={[themeStyles.mpServiceBack, isMpServiceBackShow && themeStyles.mpServiceShow]} />
        )}
      </Animated.View>
    );
  }

  render3DBtn() {
    const { platform } = this.props;

    return (
      <Car3DBtn
        top={platform.isPc ? 48 : 12 + (platform.isMp ? 0 : this.carStore.titleHeight) + platform.statusBarHeight}
        left={platform.isPc ? this.layoutSize.imgBox.width - 88 : platform.pageMargin}
      />
    );
  }

  renderBottom() {
    const { theme } = this.props;

    return (
      <Animated.View style={this.bottomAnimStyle}>
        <CarBottom
          themeProps={{
            isNewModel: this.carStore.isNewModel,
            backgroundColor: DarkStore.darkBool ? theme.C32.color : theme.C33.color,
          }}
        />
      </Animated.View>
    );
  }

  renderCarSelect() {
    const { platform, themeStyles } = this.props;

    return (
      <View style={this.isRow ? themeStyles.rowContainer : themeStyles.flex1}>
        {this.renderTabImageView()}
        {!this.isRow &&
          DarkStore.darkBool && ( // 缩放时深色模式渐变区域缝隙，用黑色条遮挡
            <View>
              <View style={themeStyles.coverDarkGapLine} />
            </View>
          )}
        <View
          style={
            this.isRow
              ? [
                  themeStyles.rowRight,
                  !platform.isPc && {
                    paddingTop: platform.statusBarHeight + (platform.isMp ? 0 : this.carStore.titleHeight),
                  },
                ]
              : themeStyles.flex1
          }
        >
          {!this.isRow && <View style={themeStyles.flex1} />}
          {this.renderTabBar()}
          {this.renderTabView()}
          {this.renderBottom()}
        </View>
      </View>
    );
  }

  render() {
    const { platform, themeStyles } = this.props;

    this.layoutSize = this.getHeadImageSize();
    this.isRow = isCarRowLayout(platform);

    if (this.context.isCarPreview) {
      return this.renderCarPreviewModal();
    }

    this.getAnimStyle();

    return (
      <JudgeUseWrapper judge={platform.isHarmony} wrapper={GestureHandlerRootView} style={themeStyles.flex1}>
        {this.renderCarSelect()}
      </JudgeUseWrapper>
    );
  }
}

export const styles = (...[theme, platform, { topHeight }]: ThemeStylesParams) => {
  return StyleSheet.create({
    flex1: {
      flex: 1,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      height: platform.height - topHeight,
    },
    phoneTabBack: {
      position: 'absolute',
      left: 0,
      bottom: -1,
      width: '100%',
      height: TAB_DIFF + 1,
      backgroundColor: DarkStore.darkBool ? theme.C32.color : theme.C17.color,
    },
    coverDarkGapLine: {
      width: '100%',
      height: 2,
      position: 'absolute',
      top: -1,
      backgroundColor: theme.C32.color,
    },
    rowRight: {
      flex: 1,
      paddingTop: 0,
      paddingHorizontal: platform.isPc ? 32 : 0,
    },
    rowTab: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    rowTabMpServiceShow: {
      paddingRight: 80, // 间隔8 + 按钮宽度40 + 边距32
    },
    scrollContainer: {
      // @ts-expect-error web使用
      overscrollBehavior: 'contain',
      touchAction: 'pan-y !important',
    },
    disclaimerTextStyle: {
      // 处理文案内容显示问题。内容少的时候需要占满整个宽度内容保证左对齐，内容多的时候需要换行显示
      maxWidth: '100%',
      minWidth: '100%',
      paddingBottom: 12,
      paddingTop: 24,
      ...(platform.isPc ? theme.T3 : theme.T0),
    },
    fillContent: {
      width: '100%',
      maxWidth: '100%',
    },
    scrollContent: {
      paddingTop: platform.isPc ? 16 : 8,
      paddingHorizontal: platform.pageMargin,
      alignItems: 'center',
      minHeight: '100%',
    },
    seriesTab: {
      alignItems: 'stretch',
    },
    scrollModalContent: {
      paddingTop: 8,
      paddingHorizontal: platform.isPc ? 32 : 16,
      paddingBottom: 12,
      alignItems: 'center',
      minHeight: '100%',
    },
    swicherModalContainer: {
      marginBottom: 16,
      borderRadius: 16,
      overflow: 'hidden',
    },
    tabBarContainer: {
      position: 'absolute',
      width: '100%',
      top: 0,
    },
    tabBar: platform.isMp
      ? {
          justifyContent: 'center',
          // @ts-expect-error mp使用
          transition: createMultiTransition(['padding-right'], 500),
        }
      : { justifyContent: 'center' },
    bottomBarStyle: {
      backgroundColor: theme.C11.color + theme.opacityMap['0.9'],
      bottom: 8,
    },
    tabStyle: {
      marginTop: platform.isPc ? 24 : 0,
    },
    mpServiceBack: platform.isMp
      ? {
          position: 'absolute',
          width: 0,
          height: '100%',
          top: 0,
          right: 0,
          opacity: 0,
          backgroundColor: DarkStore.darkBool ? theme.C32.color : theme.C33.color,
          // @ts-expect-error mp使用
          transition: createMultiTransition([
            { cssName: 'width', duration: 350 },
            { cssName: 'opacity', duration: 150 },
          ]),
        }
      : {},
    mpServiceShow: {
      width: 64, // 8 + 40 + 16
      opacity: 1,
      // @ts-expect-error mp使用
      transition: createMultiTransition([
        { cssName: 'width', duration: 350 },
        { cssName: 'opacity', delay: 200, duration: 100 },
      ]),
    },
    tabViewContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    gestureContainer: {
      width: '100%',
      height: '100%',
    },
    gestureSwiperContainer: {
      // @ts-expect-error 加此属性，保证wap横向可滚动
      touchAction: 'pan-x !important',
    },
    imgCover: {
      position: 'absolute',
      left: 0,
      width: '100%',
    },
    disclaimerTip: {
      width: '100%',
      alignSelf: 'flex-start',
      fontSize: platform.isPc ? 12 : 9,
      lineHeight: platform.isPc ? 16 : 12,
      marginTop: platform.isPc ? 21 : 16,
      marginBottom: 4,
    },
  });
};

Object.defineProperty(CarNewSelect, 'name', { value: ReportComponents.CAR_NEW_SELECT });

export default inject('carStore')(injectLayout(styles)(CarNewSelect));
