/**
 * @export public
 * @doc_name 插件导航模块
 * @doc_index 8
 * @doc_directory sdk
 * @module miot/Package
 * @description 扩展程序包参数, 主要来自于{@link packageInfo.json} 的配置与系统本身的特性
 * @example
 *  import {Package} from 'miot'
 *  import Package from 'miot/Package'
 *
 *      Package.entrance
 *      Package.entryInfo
 *      Package.exitInfo={...}
 *
 *     Package.pluginID
 *     Package.packageID
 *     Package.packageName
 *     Package.version
 *     Package.minApiLevel
 *     Package.buildType
 *     Package.isDebug
 *     Package.models
 *
 *     Package.entry(App, ()=>{...});
 *     Package.exit({...});
 */

import React from 'react';
import { AppRegistry, DeviceEventEmitter, View, I18nManager, Platform } from "react-native";

import { SDKContextProvider } from 'miot/sdkContext';
import Service, { CurrentAccount } from './Service';
import Device, { DeviceEvent, PollPropMap } from "./device/BasicDevice";
import { strings } from './resources';
import { initI18nsStings } from './resources/Strings';
import { ConfigProvider } from 'mhui-rn';
import { DarkMode } from 'miot/Device';
import { MessageDialog } from 'miot/ui/Dialog';
import Host from './Host';
import { PackageEvent } from './event/PackageEvent';
import { Entrance } from './Entrance';
// @native begin
// 去掉 STDGuideDialog 会打包失败
import STDGuideDialog from 'miot/ui/Dialog/STDGuideDialog';
import native, { buildEvents, getSystemLanguage, isAndroid, isHarmony, isIOS, PackageExitAction, Properties } from './native';
import resolveAssetResource from "./native/common/node/resolve";
import ProtocolManager from './utils/protocol-helper';
import rnPackageJSON from 'react-native/package.json';
import { RootSiblingParent } from 'react-native-root-siblings'
import PropTypes from 'prop-types';
// @native end

// @native begin
/**
  * 导航栏相关
  */
import { createStackNavigator, navigationContainerManager } from 'react-navigation';
import AutoOTAABTestHelper from 'miot/utils/autoota_abtest_helper';
import FirmwareUpgradeAuto from './ui/CommonSetting/FirmwareUpgradeAuto';
import FirmwareUpgradeRecord from './ui/CommonSetting/FirmwareUpgradeRecord';
import MiotDeviceInfoPage, { initDeviceInfoPageInnerOptions } from './ui/Settings/DeviceInfoPage';
import PackageDynamicPage from './ui/Settings/PackageDynamicPage';
import MultiSwitchSetting from './ui/CommonSetting/MultiSwitchSetting';
import SwitchIconSelect from './ui/CommonSetting/SwitchIconSelect';
import CloudStorage from './ui/CommonSetting/CloudStorage';
import { initCommonSettingsInnerOptions } from "./ui/Settings/CommonSettings";
import {
  SwitchButtonSelectPage,
  SwitchButtonSettingPage,
  SwitchTypeSelectPage,
  SwitchManualSceneSelectPage,
  SwitchLightSelectPage,
  SwitchMembersSelectPage,
  SwitchSceneDeletePage,
  SwitchVoiceControlSettingPage,
  SwitchSensorModeSettingPage
} from './ui/SwitchIfttt';

const packagePages = {
  FirmwareUpgradeAuto,
  FirmwareUpgradeRecord,
  MiotDeviceInfoPage,
  PackageDynamicPage,
  CloudStorage,
  SwitchButtonSelectPage,
  SwitchButtonSettingPage,
  SwitchTypeSelectPage,
  SwitchManualSceneSelectPage,
  SwitchLightSelectPage,
  SwitchMembersSelectPage,
  SwitchSceneDeletePage,
  SwitchVoiceControlSettingPage,
  SwitchSensorModeSettingPage
};

let packageNavigation = null;
let pluginNavigation = null;
let isPagesInjectedToPluginNavigation = false;
let AppContainterRef = null;

/**
  * RN活跃时间统计
  */
let _packageActiveDate = null;
function reset_rn_plugin_active() {
  _packageActiveDate = new Date();
}
function report_rn_plugin_active() {
  if (_packageActiveDate) {
    let params = {
      duration: new Date() - _packageActiveDate
    };
    if (__DEV__) {
      console.log('插件活跃时长', JSON.stringify(params, null, '\t'));
    } else {
      Service.smarthome.reportEvent('rn_plugin_active_time', params);
    }
    _packageActiveDate = null;
  }
}
// @native end

/**
  * @description JS端通知Native端的事件类型
  * @enum {number}
  */
const EVENT_TYPE = {
  /**
    * 插件路由发生变化
    */
  NAVIGATION_STATE_CHANGE: 1
};
Object.freeze(EVENT_TYPE);

export const DEBUG = "debug";
export const RELEASE = "release";
const kMaxFetchNavTimes = 3;
/**
  * 扩展程序调用的入口类型
  * @namespace Entrance
  */
export { Entrance };

/**
  * Package事件名集合
  * @namespace PackageEvent
  * @example
  *    import {PackageEvent} from 'miot'
  *    const subscription = PackageEvent.packageWillPause.addListener(()=>{
  *          ...
  *     })
  *    ...
  *    subscription.remove()
  *    ...
  */
export { PackageEvent };

// @native begin
let pluginConfigUpdate;
DeviceEventEmitter.addListener('onPluginConfigUpdate', (data) => {
  Object.assign(native.MIOTDevice, data.device);
  Object.assign(native.MIOTPackage, data.package);
  if (data.service) {
    Object.assign(native.MIOTService, data.service);
  }
  if (data.host) {
    Object.assign(native.MIOTHost, data.host);
    // 提供给插件的app语言接口
    native.language = getSystemLanguage();
    // 内部用的app语言，需要重新对strings的内容赋值
    initI18nsStings();
    // 标插设置页
    initCommonSettingsInnerOptions();
    // 标插设备信息页
    initDeviceInfoPageInnerOptions();

    if (native.MIOTService.addLog) {
      // 因为插件有预加载逻辑 需要提前调用下本地化API
      native.MIOTService.addLog("miot.sdk.filelog", `app_plugin_language js init =${ strings.setting }`);
    }
  }
  if (data.file) {
    Object.assign(native.MIOTFile, data.file);
  }
  if (data.audio) {
    Object.assign(native.MIOTAudio, data.audio);
  }
  resolveAssetResource(native.MIOTPackage.basePath, native.MIOTPackage.localFilePath, native.MIOTPackage.plugPath);
  Properties.init(Device, { ...native.MIOTDevice.currentDevice, _msgMap: new Map(), _pollMsgSet: new PollPropMap() });
  console.log("PluginStartTime", 'initPluginConfig', native.MIOTPackage.packageName, Device.deviceID);
  Properties.init(CurrentAccount, { id: native.MIOTService.currentAccountID });
  native.MIOTService.addLog("AccountManager", `Service Account ID : ${ Service.account.ID } ,native MIOTService ID : ${ native.MIOTService.currentAccountID }`);

  pluginConfigUpdate && pluginConfigUpdate(Device.deviceID);
});
/**
  * entryInfo={entrance:scene|main,info:{json}}
  * @type {{entry: (json|{})}}
  */
const extra = {};
function callPackageLifecycle(type, data) {
  if (!native.MIOTPackage.onPackageLifecycle) {
    return;
  }
  native.MIOTPackage.onPackageLifecycle(type, data || "");
}

/**
  * @description 在插件端发生某些事件，通知native端
  * @param {number} type 事件类型
  * @param {object} data 传入native的数据
  */
function onPluginEvent(type, data = {}) {
  if (!native.MIOTPackage.onDeventJs) return;
  if (isIOS) {
    native.MIOTPackage.onDeventJs(type, data, () => { });
  } else {
    native.MIOTPackage.onDeventJs(type, data);
  }
  DeviceEventEmitter.emit('MIOT_SDK_PLUGIN_NAVIGATION_STATE_EVENT', { type, data });
}

class AppContainter extends React.PureComponent {

  static propTypes = {
    did: PropTypes.any
  };

  static defaultProps = {
    did: ''
  };

  constructor() {
    super();
    try {
      navigationContainerManager.containers = [];
    } catch { }
  }

  componentDidMount() {
    if (isIOS) {
      native.MIOTPackage.setParentControllerGestureEnabled(true);
    }
    this._mainPageCheck();
  }

  _mainPageCheck() {
    console.log('\n 开始轮询插件导航');
    let checkTimes = 0;
    let that = this;
    const check = () => {
      // 部分插件不是立即创建导航的
      pluginNavigation = that._getPluginNavigation();
      // 注册 SDK 的页面给插件导航用于打开
      isPagesInjectedToPluginNavigation = that._injectPages(pluginNavigation);

      // 为 iOS 注册插件首页手势用于处理返回
      let mainPageNavigation;
      if (isIOS) {
        try {
          mainPageNavigation = Object.values(pluginNavigation._childrenNavigation || {})[0];
          if (pluginNavigation?.state?.routes?.length === 1) {
            that._registerNavigationGestures(mainPageNavigation);
          }
          that.mainPageCheckTimeout && clearTimeout(that.mainPageCheckTimeout);
        } catch (e) {
          console.log('find mainPageNavigation error!', e);
        }
      }
      // 超过次数就关闭
      checkTimes = checkTimes + 1;
      if (checkTimes >= 10 || mainPageNavigation || isAndroid && pluginNavigation) {
        that.mainPageCheckTimeout && clearTimeout(that.mainPageCheckTimeout);
        console.log('已找到导航或查找导航次数已超过次数限制，自动关闭查找');
      } else {
        that.mainPageCheckTimeout = setTimeout(check, 1000);
      }
    };
    check();
  }

  _getPluginNavigation() {
    let message = "\n 开始获取导航";
    let navigation;
    try {
      if (!navigation) {
        // package 有一个 container 最先创建，已清除, 插件可能有多个
        let containers = navigationContainerManager.containers;
        message = `${ message }\n 方法0: 导航容器个数 ${ containers.length }`;
        containers.forEach((value) => {
          if (value._isMounted) {
            navigation = value._navigation;
          }
        });
        if (!navigation) {
          navigation = containers[0]._navigation;
        }
        message = `${ message }\n 方法0成功`;
      }
    } catch (err) {
      message = `${ message }\n 方法0失败${ err }`;
    }
    try {
      if (!navigation) {
        let key = this.currentPage.state.nav.routes[0].key;
        navigation = this.currentPage._navigation._childrenNavigation[key];
        message = `${ message }\n 方法1成功`;
      }
    } catch (err) {
      message = `${ message }\n 方法1失败${ err }`;
    }
    try {
      if (!navigation) {
        let child = this.currentPage._reactInternalFiber.child;
        let i = 0;
        while (i < kMaxFetchNavTimes) {
          message = `${ message }\n 方法2:${ i }${ child }`;
          if (child.stateNode && child.stateNode._navigation) {
            navigation = Object.values(child.stateNode._navigation._childrenNavigation)[0];
            message = `${ message }\n 方法2成功`;
            break;
          } else {
            child = child.child;
            i++;
          }
          message = `${ message }\n 方法2超出遍历次数`;
        }
      }
    } catch (err) {
      message = `${ message }\n 方法2失败${ err }`;
    }
    console.log(message);
    return navigation;
  }

  _injectPages(navigation) {
    let routeConfigs = navigation?.router?.routeConfigs;
    let childRouters = navigation?.router?.childRouters;
    if (!routeConfigs || !childRouters) {
      return false;
    }
    for (const key in packagePages) {
      routeConfigs[key] = packagePages[key];
      childRouters[key] = null;
    }
    return true;
  }

  _registerNavigationGestures(navigation) {
    this.mainPageOnListener && this.mainPageOnListener.remove && this.mainPageOnListener.remove();
    this.mainPageOffListener && this.mainPageOffListener.remove && this.mainPageOffListener.remove();
    if (!navigation) { return; }
    this.mainPageOnListener = navigation.addListener("willFocus", (payload) => {
      console.log('will focus', payload);
      native.MIOTPackage.setParentControllerGestureEnabled(true);
    });
    this.mainPageOffListener = navigation.addListener("willBlur", (payload) => {
      console.log('will blur', payload);
      native.MIOTPackage.setParentControllerGestureEnabled(false);
    });
  }

  componentWillUnmount() {
    this.mainPageCheckTimeout && clearTimeout(this.mainPageCheckTimeout);
    this.mainPageOnListener && this.mainPageOnListener.remove();
    this.mainPageOffListener && this.mainPageOffListener.remove();
    this._devicePinStatusListener && this._devicePinStatusListener.remove();
  }

  render() {
    const { App } = extra;
    return (
      <App ref={(res) => {
        this.currentPage = res;
      }} key={this.props.did} >
      </App>
    );
  }
}

class PackageRoot extends React.Component {

   darkModeListener = (value) => {
     console.log(`colorScheme from listener: ${ value.colorScheme }`);
     this.setState({ currentMode: value.colorScheme });
   }

   constructor() {
     super();
     this.state = {
       did: '',
       currentMode: native.MIOTService.currentDarkMode ? native.MIOTService.currentDarkMode : "light"
     };// 插件的唯一标识，当改变的时候要重新刷新插件
     pluginConfigUpdate = (did) => {
       this.setState({
         did,
         showFirmwareUpdateAlert: false, // 是否展示固件升级弹窗
         firmwareUpdateTitle: '',
         firmwareUpdateSure: '',
         firmwareUpdateCancel: '',
         packageExitOnFirmwareUpdateCancel: false, // 升级弹窗点取消后是否直接退出插件
         isShowingPrivacyLicenseDialog: false, // 是否正在展示隐私协议弹窗
         firmwareUpdateDialogCanDismiss: true // 升级弹窗是否可以通过点击背景区域关闭
       });
     };
     PackageEvent.packageDidResume.addListener(reset_rn_plugin_active);
     PackageEvent.packageWillPause.addListener(report_rn_plugin_active);
     this._devicePinStatusListener = DeviceEvent.pinCodeSwitchChanged.addListener((device, switchStatus) => {
       console.log(`设备pincode状态改变: ${ switchStatus.isSetPinCode }`);
     });
   }

   UNSAFE_componentWillMount() {
     reset_rn_plugin_active();
     if (extra.willLoad) {
       return;
     }
     extra.willLoad = true;
     callPackageLifecycle("willMount");
     // 系统初始化
     if (extra.afterPackageEntry) {
       extra.afterPackageEntry();
       extra.afterPackageEntry = null;
     }
     // package will load
     PackageEvent.packageWillLoad.emit();
     this.ShowPrivacyLicenseDialogListener = DeviceEventEmitter.addListener('MH_Event_ShowPrivacyLicenseDialog', (params) => {
       console.log("received MH_Event_ShowPrivacyLicenseDialog...", params);
       let { isShowingPrivacyLicenseDialog } = params;
       if (isShowingPrivacyLicenseDialog) {
         this.setState({
           showFirmwareUpdateAlert: false,
           isShowingPrivacyLicenseDialog: isShowingPrivacyLicenseDialog
         });
       }
     });
     this.onNavigationStateChange = DeviceEventEmitter.addListener('onNavigationStateChange', ({ action, prevNav, nav }) => {
       if (AppContainterRef) {
         AppContainterRef._mainPageCheck();
       }
       // 路由入栈或者出栈
       if (action.type === 'Navigation/NAVIGATE'
         || action.type === 'Navigation/BACK'
         || action.type === 'Navigation/PUSH'
         || action.type === 'Navigation/POP'
         || action.type === 'Navigation/REPLACE') {
         onPluginEvent(EVENT_TYPE.NAVIGATION_STATE_CHANGE, {
           routeIndex: prevNav.index,
           routeName: prevNav.routes[prevNav.index].routeName,
           event: 'hide'
         });
       }
       // 跳转完成
       if (action.type === 'Navigation/COMPLETE_TRANSITION') {
         onPluginEvent(EVENT_TYPE.NAVIGATION_STATE_CHANGE, {
           routeIndex: nav.index,
           routeName: nav.routes[nav.index].routeName,
           event: 'show'
         });
       }
     });
   }

   componentDidMount() {
     if (extra.didLoaded) {
       return;
     }
     extra.didLoaded = true;
     DarkMode.addChangeListener(this.darkModeListener);
     // package did loaded
     callPackageLifecycle("didMount");
     onPluginEvent(EVENT_TYPE.NAVIGATION_STATE_CHANGE, {
       routeIndex: 0,
       routeName: '',
       event: 'show'
     });
     PackageEvent.packageDidLoaded.emit();
     // 检查插件隐私 (检查在线隐私)
     this.pluginPrivacyPlatformCheck();
     let upgradeHandler = (needUpgrade, force, upgrading, latestVersion) => {
       if (this.state.isShowingPrivacyLicenseDialog) {
         // 如果当前插件正在显示隐私协议弹窗，就不进行强制升级检查
         return;
       }
       Host.storage.get(`mh_firmware_last_op_time${ Device.deviceID }`).then((val) => {
         if (val) {
           let now = new Date().getTime();
           let last = val;
           let offset = now - last;
           return Promise.resolve(offset < 600000);
         } else {
           return Promise.resolve(false);
         }
       }).then((alreadyShow) => {
         // 已经显示过，并且不是强制升级
         if (alreadyShow && !force) {
           return;
         }
         if (force) {
           if (upgrading) {
             this.setState({
               firmwareUpdateTitle: strings.firmwareUpgradeForceUpdating,
               firmwareUpdateSure: strings.firmwareUpgradeLook,
               firmwareUpdateCancel: strings.firmwareUpgradeExit,
               packageExitOnFirmwareUpdateCancel: true,
               showFirmwareUpdateAlert: true,
               firmwareUpdateDialogCanDismiss: false
             });
           } else {
             this.setState({
               firmwareUpdateTitle: strings.firmwareUpgradeForceUpdate,
               firmwareUpdateSure: strings.firmwareUpgradeUpdate,
               firmwareUpdateCancel: strings.firmwareUpgradeExit,
               packageExitOnFirmwareUpdateCancel: true,
               showFirmwareUpdateAlert: needUpgrade,
               firmwareUpdateDialogCanDismiss: false
             });
           }
         } else {
           if (upgrading) {
             // do nothing
           } else if (latestVersion) {
             this.setState({
               firmwareUpdateTitle: strings.firmwareUpgradeNew_pre + latestVersion + strings.firmwareUpgradeNew_sub,
               firmwareUpdateSure: strings.firmwareUpgradeUpdate,
               firmwareUpdateCancel: strings.cancel,
               packageExitOnFirmwareUpdateCancel: false,
               showFirmwareUpdateAlert: needUpgrade,
               firmwareUpdateDialogCanDismiss: true
             });
           }
         }
       });
     };
     this.listener = DeviceEventEmitter.addListener('MH_FirmwareNeedUpdateAlert', (params) => {
       if (Device.type === Device.DEVICE_TYPE.BLUETOOTH_SINGLE_MODEL_DEVICE || Device.type === Device.DEVICE_TYPE.BLE_MESH_DEVICE) { // BLE、Mesh设备红点逻辑不在此处理
         return;
       }
       Device.needUpgrade = params.needUpgrade;
       let {
         needUpgrade, force, upgrading, latestVersion
       } = params;
       upgradeHandler(needUpgrade, force, upgrading, latestVersion);
     });
     // BLE、Mesh设备自动出现红点和弹框逻辑
     if (extra.package && extra.package._bleAutoCheckUpgradeOptions && extra.package._bleAutoCheckUpgradeOptions.enable) {
       let bleRedPoint = extra.package._bleAutoCheckUpgradeOptions.redPoint;
       let bleAlertDialog = extra.package._bleAutoCheckUpgradeOptions.alertDialog;
       if (!Device.isShared && (bleRedPoint || bleAlertDialog) && (Device.type == 6 || Device.type == 16)) {
         let forceUpgrade = false;
         Service.smarthome.getLatestVersionV2(Device.deviceID).then((res) => {
           if (res && res.version && (typeof (res.force) === typeof true)) {
             forceUpgrade = res.force;
             // 如果存在 mcu 固件，需要重新拼一下 version 字段，保证和 Device.lastVersion 的结果一致。
             const mcuVersion = res['mcu_version'];
             if (mcuVersion !== undefined && typeof mcuVersion === 'string' && mcuVersion.length > 0) {
               res.version = `${ res.version }.${ mcuVersion }`;
             }
             if (bleRedPoint) {
               Device.needUpgrade = (res.version !== Device.lastVersion);
             }
           }
         });
         this.bleUpgradeObserver = DeviceEvent.bleDeviceFirmwareNeedUpgrade.addListener((device, props) => {
           if (device !== Device) return;
           if (bleRedPoint) {
             Device.needUpgrade = true;
           }
           if (bleAlertDialog) {
             const mcuVersion = device.latest_mcu_version;
             const latestVersion = Device.latestVersion;
             let showVersion = latestVersion;
             if (mcuVersion !== undefined && typeof mcuVersion === 'string' && mcuVersion.length > 0) {
               showVersion = `${ latestVersion }.${ mcuVersion }`;
             }
             // 当前设备固件版本
             const currentVersion = props.version;
             upgradeHandler(currentVersion != latestVersion, forceUpgrade, false, showVersion);
           }
         });
       }
     }
     if (extra.package.extraEntry.entrance == Entrance.Main && extra.package.extraEntry.info) {
       if (extra.package.extraEntry.info.inner_jump === "/device/setting_update") {
         let { navigation, upgradePageKey, upgradePageParams } = extra?.package?._wifiDeviceUpgradeOptions || {};
         if (Device.type === Device.DEVICE_TYPE.WIFI_SINGLE_MODEL_DEVICE && navigation && upgradePageKey) {
           navigation.navigate(upgradePageKey, upgradePageParams || {});
         } else {
           if (AutoOTAABTestHelper.autootaSupported(Device.type, Device.model)) {
             // wifi设备固件升级自动跳转
             this.props.navigation.navigate('FirmwareUpgradeAuto', { needRenderHeader: true });
           } else {
             Host.ui.openDeviceUpgradePage(1);
           }
         }
         return;
       }
     }

     this.checkWifiFirmwareUpdateAndAlert();
   }

   componentWillUnmount() {
     report_rn_plugin_active();
     extra.willLoad = false;
     extra.didLoaded = false;
     callPackageLifecycle("willUnmount");
     PackageExitAction.execute();
     if (isAndroid) {
       PackageEvent.packageWillExit.emit();
     }
     this.listener && this.listener.remove();
     this.ShowPrivacyLicenseDialogListener && this.ShowPrivacyLicenseDialogListener.remove();
     this.bleUpgradeObserver && this.bleUpgradeObserver.remove();
     ProtocolManager.setLegalInfoAuthHasShowed(false);
     ProtocolManager.setHostUILegalAlertHasShowed(false);
     ProtocolManager.setSendCloudPrivacyEventFinished(false);
     DarkMode.removeChangeListener(this.darkModeListener);
     this.resetClassVariables();
   }

   checkWifiFirmwareUpdateAndAlert() {
     if (extra.package && !extra.package.disableAutoCheckUpgrade && !this.state.isShowingPrivacyLicenseDialog) {
       Device.getDeviceWifi().checkFirmwareUpdateAndAlert().then(() => {
       }).catch(() => {
       });
     }
   }

   resetClassVariables() {
     if (isIOS) {
       return;
     }
     console.log('Package resetClassVariables: ');
     packageNavigation = null;
     pluginNavigation = null;
     isPagesInjectedToPluginNavigation = false;
     _packageActiveDate = null;
     pluginConfigUpdate = undefined;
     AppContainterRef = undefined;
     for (let key in extra) {
       if (key == 'App' || key == 'afterPackageEntry' || key == 'package') {
         continue;
       }
       Reflect.deleteProperty(extra, key);
     }
     this.onClassVariablesReseted();
   }

   // @native begin
   onClassVariablesReseted() {

   }
   // @native end

   pluginPrivacyPlatformCheck() {
     if (Device.isWearableDevice) {
       PackageEvent.packageAuthorizationAgreed.emit();
       return;
     }
     ProtocolManager.pluginLegalInformationCheck().then((res) => {
       console.log('Package check pluginLegalInformationCheck resolve result: ', res);
       ProtocolManager.protocolMangerReportLog('[Privacy Debug] Package: Package check pluginLegalInformationCheck resolve result: ', res);
       if (res?.code == 0) {
         let mes = res?.data?.result;
         if (mes === ProtocolManager.ProtocolManager_PrivacyAgree || mes === ProtocolManager.ProtocolManager_PrivacyAgreeChanges) {
           PackageEvent.packageAuthorizationAgreed.emit();
           return;
         }
       }
     }).catch((err) => {
       console.log('Package check pluginLegalInformationCheck catch error: ', err);
       ProtocolManager.protocolMangerReportLog('[Privacy Debug] Package: Package check pluginLegalInformationCheck catch error: ', err);
       let mess = err?.message;
       if (mess === ProtocolManager.ProtocolManager_PrivacyRejected) {
         native.MIOTHost.closeCurrentPage({ 'animated': true });
       }
     });
   }

   render() {
     // 弹窗曝光埋点 https://xiaomi.f.mioffice.cn/sheets/shtk4FNMH1u04OfiNkIarRF9W7D
     if (this.state.showFirmwareUpdateAlert) {
       Service.smarthome.updatePluginPageRef({ 'ref': 'plugin_homepage', 'sub_ref': 'plugin_homepage' });
       const params = { 'ota_origin': 2, 'ota_type': 2, 'did': Device.deviceID,
         'device_model': Device.model, 'mac': Device.mac, 'item_type': 'dialog', 'dialog_name': 'updates_plugin_dialog' };
       Service.smarthome.reportEventRefChannel("expose", params);
     }

     const currentColorScheme = native.MIOTService.currentDarkMode ? native.MIOTService.currentDarkMode : "light";
     const media = { screenType: 'phone' };
     if (Host.isPad) { media.screenType = 'tablet'; }

     return (
       <View style={{ flex: 1 }}>
         <SDKContextProvider value={{ colorScheme: currentColorScheme }}>
           <ConfigProvider media={media} language={Host.locale.language} colorScheme={currentColorScheme}>

                     {
                         isHarmony ? (
                                <RootSiblingParent>
                                    <AppContainter did={this.state.did} ref={(ref) => { AppContainterRef = ref; }} />
                                </RootSiblingParent>
                             
                         ) : (
                             <AppContainter did={this.state.did} ref={(ref) => { AppContainterRef = ref; }} />
                         )
                     }


           </ConfigProvider>
         </SDKContextProvider>
         <MessageDialog
           type={MessageDialog.TYPE.SIMPLE}
           title=""
           // todo: 暂时注销升级弹出
           // visible={this.state.showFirmwareUpdateAlert}
           visible={false}
           message={this.state.firmwareUpdateTitle}
           canDismiss={this.state.firmwareUpdateDialogCanDismiss}
           buttons={[
             {
               text: this.state.firmwareUpdateCancel,
               callback: () => {
                 DeviceEventEmitter.emit('MH_Event_FirmwareUpdateDialog', { isSure: false });
                 if (this.state.packageExitOnFirmwareUpdateCancel) {
                   native.MIOTHost.closeCurrentPage({ 'animated': true });
                 }
                 this.onDismiss();
                 // 点击取消埋点
                 Service.smarthome.updatePluginPageRef({ 'ref': 'plugin_homepage', 'sub_ref': 'plugin_homepage' });
                 const params = { 'ota_origin': 2, 'ota_type': 2, 'did': Device.deviceID,
                   'device_model': Device.model, 'mac': Device.mac, 'dialog_name': 'updates_plugin_dialog', 'item_type': 'button', 'item_name': 'ignore_link_button' };
                 Service.smarthome.reportEventRefChannel("click", params);
               }
             },
             {
               text: this.state.firmwareUpdateSure,
               callback: () => {
                 // 点击立即更新埋点
                 Service.smarthome.updatePluginPageRef({ 'ref': 'plugin_homepage', 'sub_ref': 'plugin_homepage' });
                 const params = { 'ota_origin': 2, 'ota_type': 2, 'did': Device.deviceID,
                   'device_model': Device.model, 'mac': Device.mac, 'dialog_name': 'updates_plugin_dialog', 'item_type': 'button', 'item_name': 'updates_start_link_button' };
                 Service.smarthome.reportEventRefChannel("click", params);

                 DeviceEventEmitter.emit('MH_Event_FirmwareUpdateDialog', { isSure: true });
                 this.onDismiss();
                 let { navigation, upgradePageKey, upgradePageParams } = extra?.package?._wifiDeviceUpgradeOptions || {};
                 if (Device.type === Device.DEVICE_TYPE.WIFI_SINGLE_MODEL_DEVICE && navigation && upgradePageKey) {
                   navigation.navigate(upgradePageKey, upgradePageParams || {});
                   return;
                 }
                 if (AutoOTAABTestHelper.autootaSupported(Device.type, Device.model)) {
                   // wifi设备固件升级 Q3实验性功能 固件自动升级
                   this.props.navigation.navigate('FirmwareUpgradeAuto', { needRenderHeader: true });
                   return;
                 }
                 Device.needUpgrade = false;
                 if ((Device.type == 6 || Device.type == 16) && extra.package && extra.package._bleAutoCheckUpgradeOptions && extra.package._bleAutoCheckUpgradeOptions.enable) {
                   let authType = extra.package._bleAutoCheckUpgradeOptions.authType;
                   Host.ui.openBleCommonDeviceUpgradePage({ auth_type: authType });
                 } else {
                   Host.ui.openDeviceUpgradePage(1);
                 }
               }
             }
           ]}
           onDismiss={() => { this.onDismiss(); }
           }
         />
       </View>
     );
   }

   onDismiss() {
     this.setState({ showFirmwareUpdateAlert: false });
     let now = new Date().getTime();
     Host.storage.set(`mh_firmware_last_op_time${ Device.deviceID }`, now);
   }
}

export { PackageRoot };
// @native end

/**
  * @export
  */
export default {
  // @native begin
  get extraEntry() {
    if (native.MIOTPackage) {
      let temp = native.MIOTPackage.entryInfo || {};
      extra.entry = typeof (temp) == "string" ? JSON.parse(temp) : temp;
    }
    return extra.entry;
  },
  // @native end

  /**
    * 入口类型,Main or Scene or 用户自定义（Host.ui.openPluginPage(did, pageName, pageParams) 中 pageName的值）
    * @const
    * @type {Entrance}
    * @readonly
    */
  get entrance() {
    // @native => Entrance.Main
    return this.extraEntry.entrance || Entrance.Main;
  },

  /**
    * 入口类型参数, Host.ui.openPluginPage(did, pageName, pageParams) 中 pageParams的值
    * @const
    * @type {object}
    * @readonly
    */
  get pageParams() {
    // @native => {}
    // @native begin
    // 保证是json，Android传递过来是字符串格式
    if (this.entryInfo && this.entryInfo.pageParams && typeof this.entryInfo.pageParams === 'string') {
      this.entryInfo.pageParams = JSON.parse(this.entryInfo.pageParams);
    }
    return this.entryInfo.pageParams || {};
    // @native end
  },

  /**
    * 打开rn插件时，从native传递到RN的初始化数据信息
    * @const
    * @type {json}
    * @readonly
    */
  get entryInfo() {
    // @native => {}
    // @native begin
    if (this.extraEntry.info && this.extraEntry.info.payload && this.extraEntry.info.payload.androidData) {
      this.extraEntry.info.payload.androidData = JSON.parse(this.extraEntry.info.payload.androidData);
      this.extraEntry.info.payload.id = this.extraEntry.info.payload.id || this.extraEntry.info.payload.androidData.actionId;
    }
    return this.extraEntry.info || {};
    // @native end
  },

  /**
    * 退出后返回给调用者的信息, 例如自定义场景
    * @member {json}
    *
    * @example
    * //自定义trigger场景保存退出 finishCustomSceneSetupWithTrigger
    * var trigger = Package.entryInfo;
    * trigger.payload = { 'xxx': 'xxx' };//trigger payload 数据
    * Package.exitInfo = trigger;
    *
    * //自定义action场景保存退出 finishCustomSceneSetupWithAction
    * var action = Package.entryInfo;
    * action.payload = { 'xxx': 'xxx' };//action payload 数据
    * Package.exitInfo = action;
    * ...
    * Package.exit();
    */
  get exitInfo() {
    // @native => {}
    return extra.exitInfo;
  },
  set exitInfo(info) {
    // @native begin
    extra.exitInfo = info;
    native.MIOTPackage.setExitInfo(this.entrance, JSON.stringify(info || {}));
    // @native end
  },
  /**
    * 小米开放平台生成的插件包 ID
    * @const
    * @type {int}
    * @readonly
    */
  get packageID() {
    // @native => 0
    return native.MIOTPackage.packageID;
  },

  get pluginID() {
    // @native => 0
    return native.MIOTPackage.pluginID;
  },

  /**
    * 程序包的版本号, 来自于{@link project.json} 的 {@link version}
    * @const
    * @type {string}
    * @readonly
    */
  get version() {
    // @native => ""
    return native.MIOTPackage.version;
  },
  /**
    * 获取React Native版本
    */
  get rnVersion() {
    return rnPackageJSON.version;
  },
  /**
    * 程序包名, 来自于{@link project.json} 的 {@link package_name}
    * @const
    * @type {string}
    * @readonly
    *
    */
  get packageName() {
    // @native => ""
    return native.MIOTPackage.packageName;
  },

  /**
    * 扩展程序适用的最低 API level, 来自于{@link project.json} 的 {@link min_api_level}
    * @const
    * @type {int}
    * @readonly
    */
  get minApiLevel() {
    // @native => 0
    return isAndroid ? native.MIOTHost.systemInfo.hostApiLevel : native.MIOTHost.apiLevel;
  },

  /**
    * 发布类型, debug | release
    * @const
    * @type {string}
    * @readonly
    */
  get buildType() {
    // @native => "release"
    return native.MIOTPackage.buildType;
  },

  /**
    * 判断是否是调试版本
    * @const
    * @type {boolean}
    * @readonly
    */
  get isDebug() {
    // @native => false
    return this.buildType.toLowerCase() === DEBUG;
  },

  /**
    * 适配的固件 model, 来自于@link packageInfo.json 的
    * @const
    * @type {string}
    * @readonly
    */
  get models() {
    // @native => ""
    return native.MIOTPackage.models;
  },

  /**
    * 自动BLE/Mesh设备升级检查，即使设置了alertDialog为true，也仅仅会在直连完成后才弹窗，红点进插件就可以显示
    * @param redPoit 红点
    * @param alertDialog 弹窗
    * @param authType 蓝牙连接类型(0: 普通小米蓝牙协议设备(新接入设备已废弃该类型)，1: 安全芯片小米蓝牙设备（比如锁类产品） 4: Standard Auth 标准蓝牙认证协议(通常2019.10.1之后上线的新蓝牙设备) 5: mesh 设备)
    * @since 10039
    * @example
    * Package.BLEAutoCheckUpgradeOptions = {
    *   enable: true,
    *   redPoint: true,
    *   alertDialog: true,
    *   authType: 5
    * }
    */
  set BLEAutoCheckUpgradeOptions(options) {
    // @native => ""
    this._bleAutoCheckUpgradeOptions = options;
  },

  /**
    * wifi设备升级参数 目前sdk要求所有wifi设备都需要开启固件升级检查，但是开发者可以自行实现检查的页面的逻辑
    * @param navigation 传入包含upgradePageKey的navigation，否则可能会出现无法跳转的情况
    * @param upgradePageKey 要跳转的page key 通常是在index中定义的
    * @param upgradePageParams 要跳转的page params
    * @since 10080
    * @example
    * Package.wifiDeviceUpgradeOptions = {
    *   navigation: xxx,
    *   upgradePageKey: 'xxxUpgradePage',
    *   upgradePageParams: { xxx: xxx },
    * }
    */
  set wifiDeviceUpgradeOptions(options) {
    // @native => ""
    this._wifiDeviceUpgradeOptions = options;
  },

  /**
    * 系统入口
    * @method
    * @param {React.Component} RootComponent 入口的React Component模块
    * @param {function} afterPackageEntry 进入后, RootComponent 加载之前执行, 缺省为空
    * @example
    * import SceneMain from '...';
    * import App from '...';
    *
    * import {Package, Entrance} from 'miot';
    *
    * switch(Package.entrance){
    *   case Entrance.Scene:
    *      Package.entry(SceneMain, ()=>{...});
    *      break;
    *   default:
    *      Package.entry(App, ()=>{...});
    *      break;
    * }
    */
  entry(RootComponent, afterPackageEntry = null) {
    // @native begin
    // const self = Properties.of(this);
    // const { App } = extra;
    // if (App) {
    //     throw "warning, the package is already started.";
    // }
    // if (!RootComponent) {
    //     throw "warning, the first params for entry is required.";
    // }
    extra.App = RootComponent;
    extra.afterPackageEntry = afterPackageEntry;
    extra.package = this;
    let packName = this.packageName;
    // 给小爱智能 tab 使用
    // AppRegistry.registerComponent('com.xiaomi.miottab', () => PackageRoot);
    // AppRegistry.registerComponent(packName, () => PackageRoot);
    AppRegistry.registerComponent(packName, this._packageRootNavigationStack);
    console.log(`PluginStartTime  ${ Date.now() }`, packName);
    // @native end
  },

  // @native begin
  _packageRootNavigationStack() {
    return createStackNavigator(Object.assign({}, { PackageRoot }, packagePages), {
      initialRouteName: 'PackageRoot',
      headerMode: 'none',
      navigationOptions: ({ navigation }) => {
        packageNavigation = navigation;
        return {
          header: null
        };
      }
    });
  },
  // @native end

  /**
    * 强制退出插件
    * @method
    * @param {JSON} info -如果不为空, 则等同于设置 Package.exitInfo
    * SDK_10052  新增 animated字段 eg: Package.exit({'animated': false}) 表示退出时不使用动画 目前只在ios生效，默认为true
    * @example
    *   Package.exit({...});
    * @example
    *  Package.exitInfo = {...}
    *  Package.exit();
    */
  exit(info = null) {
    // @native begin
    if (info) {
      this.exitInfo = info;
    }
    native.MIOTHost.closeCurrentPage(info || {});
    // @native end
  },
  // @native begin
  navigate(name, params = {}, push) {
    const fixedParams = function(needRenderHeader) {
      return Object.assign({}, params, { needRenderHeader: needRenderHeader });
    };
    if (isPagesInjectedToPluginNavigation) {
      pluginNavigation[push ? 'push' : 'navigate'](name, fixedParams(false));
    } else {
      packageNavigation && packageNavigation[push ? 'push' : 'navigate'](name, fixedParams(true));
    }
  },
  // @native end

  /**
    * since 10052
    * android only
    * 部分插件用到的功能不会跟着米家APP一起安装，需要先安装再使用(请求安装的接口是installModule)，
    * 已经安装的模块多次调用installModule不会重复安装。
    * 需要调用前需要安装的功能有：
    *  react-native-opencv 从10052开始引入，对应的moduleId为RnOpencv，Android平台需要先安装再使用，iOS则没这个要求
    * @param {string} moduleId 可选值：RnOpencv(对应为react-native-opencv)
    * @returns {json} 返回值：安装成功或已安装返回{code:0,data:{installed:true}}，安装失败返回{code:0,data:{installed:false}}
    * @example
    * const moduleId = 'RnOpencv';
    * Package.installModule(moduleId).then(res=>{
    *      if(res && res.data && res.data.installed){
    *        console.log(`module:${moduleId} is installed`).
    *      }
    *    }).catch(err=>{
    *       console.log('installeModule error:',JSON.stringify(err));
    *    })
    */
  installModule(moduleId) {
    // @native :=> Promise.resolve(null);
    if (isIOS) {
      return Promise.resolve({ code: 0, data: { installed: true } });
    }
    return new Promise((resolve, reject) => {
      native.MIOTPackage.installModule(moduleId, (ok, res) => {
        if (ok) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
    // @native end
  }
};
