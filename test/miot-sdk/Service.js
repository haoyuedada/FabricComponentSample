/**
 * @export public
 * @doc_name 系统服务模块
 * @doc_index 1
 * @doc_directory service
 * @module miot/Service
 * @description Service 模块提供的能力主要包括米家服务端及米家云平台提供的服务能力
 * 能力主要包括：
 * 账号管理(Account.js)
 * 房间管理(room.js)
 * 智能场景(scene.js)
 * 云服务(smarthome.js)
 * Spec协议(spec.js)
 * 云存储(storage.js)
 * @example
 *
 * import {Service} from 'miot'
 *
 * Service.getServerName().then(res=>{...})
 * Service.getUTCTimeFromServer().then(...)
 *
 * Service.smarthome.reportGPSInfo(...).then(...)
 *
 * Service.account.ID
 * Serivce.account.nickName
 * Service.account.avatar
 * Service.account.load().then(account=>{})
 *
 * Service.scene.loadTimerScenes(...).then(scenes=>{})
 * Service.security.loadSecureKeys(...).then(keys=>{
 * ...
 * })
 *
 * Service.storage.getUserConfigs(key).then()
 *
 *
 */

// @native
// import Ximalaya from './service/ximalaya';
import Account from './service/Account';
import native, { isAndroid, isHarmony, Properties } from './native';
import apiRepo from './service/apiRepo';
import omitApi from './service/omitApi';
import cameraSubDomains from './service/cameraSubDomain';
import IrController from './service/ircontroller';
import MHRoom from './service/room';
import Scene from './service/scene';
import Security from './service/security';
import Smarthome from './service/smarthome';
import Spec from './service/spec';
import Storage from './service/storage';
import TJInfra from './service/tjinfra';
import MiotCamera from './service/miotcamera';
import Kookong from './service/kookong';
import XiaoAi from './service/xiaoai';
import { NativeModules } from 'react-native';
import JSONbig from 'json-bigint';
import Permission from './service/permission';
// @native begin
// import AlarmPhone from './service/alarmPhone';
import SceneV2 from './service/sceneV2';
import { CurrentAccount } from './service/Account';
// @native end

// @native = const CurrentAccount = null;
export { CurrentAccount };

export default {

    /**
     * @member smarthome
     * @description 设备相关 API
     * @see {@link module:miot/service/smarthome}
     */
    get smarthome() {
        return Smarthome;
    },

    /**
     * @member miotcamera
     * @description 摄像机相关 API
     * @see {@link module:miot/service/miotcamera}
     */
    get miotcamera() {
        return MiotCamera;
    },

    /**
     * @member ircontroller
     * @description 红外 相关 API
     * @see {@link module:miot/service/ircontroller}
     */
    get ircontroller() {
        return IrController;
    },

    /**
     * @member account
     * @type {IAccount}
     * @description 当前的用户信息
     * @see {@link module:miot/Account}
     */
    get account() {
        return CurrentAccount;
    },
    // @native begin
    get tjinfra() {
        return TJInfra;
    },
    // @native end
    /**
     * @member scene
     * @deprecated 1.0下所有定时相关的接口已不再维护，请使用sceneV2。部分工具类依旧可用
     * @description 场景1.0 API 的调用
     * @see {@link module:miot/service/scene}
     */
    get scene() {
        if (__DEV__ && console.warn) {
            console.warn("scene deprecated 1.0下所有定时相关的接口已不再维护，请使用sceneV2。部分工具类依旧可用");
        }
        return Scene;
    },

    // @native begin
    /**
     * @member sceneV2
     * @description 场景2.0 API 的调用
     * @see {@link module:miot/service/sceneV2}
     */
    get sceneV2() {
        return SceneV2;
    },
    // @native end

    /**
     * @member security
     * @description 安全相关设置操作
     * @see {@link module:miot/service/security}
     */
    get security() {
        return Security;
    },

    /**
     * @member storage
     * @description 用户存储操作, userProfile
     * @see {@link module:miot/service/storage}
     */
    get storage() {
        return Storage;
    },
    /**
     * @member spec
     * @description spec 的请求
     * @see {@link module:miot/service/spec}
     */
    get spec() {
        return Spec;
    },

    get room() {
        return MHRoom;
    },

    get kookong() {
        return Kookong;
    },

    get permission() {
        return Permission;
    },

    get xiaoai() {
        return XiaoAi;
    },

    /**
     * @method callSmartHomeAPI
     * @since 10024
     * @description 通用的请求米家后台接口的方法，与米家服务器交互。
     * 不同设备开放的接口请参照与米家后台对接时提供的文档或说明，以后台给出的信息为准。
     * 米家客户端只封装透传网络请求，无法对接口调用结果解释，有问题请直接联系项目对接后台人员或 PM。
     *
     * 想使用某个接口之前，先检查 SDK 是否已经收录，可在 `miot-sdk/service/apiRepo.js`和`miot-sdk/service/omitApi.js` 文件中查阅。
     * 注:这里的接口路径前缀为https://api.io.mi.com/app，所以请传入的接口中不要带入/app的前缀
     * 如果 SDK 暂时没有收录，可通过 issue 提出申请，提供接口的相关信息。
     * @param {string} api - 接口地址，比如'/location/set'
     * @param {object} params 传入参数，根据和米家后台商议的数据格式来传入，比如{ did: 'xxxx', pid: 'xxxx' }
     */
    callSmartHomeAPI(api, params) {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            const includeApi = omitApi.some((item) => {
                return api.startsWith(item);
            });
            if (includeApi) {
                native.MIOTRPC.standardCall(api, params, (ok, res) => {
                    if (ok) {
                        return resolve(res);
                    }
                    reject(res);
                });
            } else if (apiRepo[api]) {
                native.MIOTRPC.standardCall(api, params, (ok, res) => {
                    if (ok) {
                        return resolve(res);
                    }
                    reject(res);
                });
            } else {
                reject(`失败，原因如下:\n1. api路径填写错误，请检查\n2. sdk 暂未收录该接口，请联系米家插件框架的开发人员`);
            }
        });
        // @native end
    },

    /**
     * @method callSmartHomeCameraAPI
     * @since 10035
     * @description 专用摄像头相关接口请求
     * api in `miot-sdk/service/apiRepo.js`
     * subDomain in `miot-sdk/service/cameraSubDomain.js`
     *
     * @param {string} api 接口地址
     * @param {string} subDomain subDomain
     * @param {bool}   post 是否POST方法
     * @param {object} params 传入参数
     */
    callSmartHomeCameraAPI(api, subDomain, post, params) {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            if (apiRepo[api] && cameraSubDomains[subDomain]) {
                native.MIOTService.callSmartHomeCameraAPI(api, subDomain, post, params, (ok, res) => {
                    if (ok) {
                        if (typeof (res) === "string") {
                            res = JSON.parse(res);
                        }
                        return resolve(res);
                    }
                    reject(res);
                });
            } else {
                reject('失败，原因如下:\n1. api路径填写错误，请检查\n2. sdk 暂未收录该接口，请联系米家插件框架的开发人员');
            }
        });
        // @native end
    },


    /**
     * @method callSmartHomeCameraAPI
     * @since 10044
     * @description 专用摄像头相关接口请求
     * api in `miot-sdk/service/apiRepo.js`
     * subDomain in `miot-sdk/service/cameraSubDomain.js`
     *
     * @param {string} api 接口地址
     * @param {string} subDomain subDomain
     * @param {bool}   post 是否POST方法
     * @param {string} params BigJSON.strinify(object);
     */
    callSmartHomeCameraAPIWithStringParam(api, subDomain, post, params) {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            if (apiRepo[api] && cameraSubDomains[subDomain]) {
                native.MIOTService.callSmartHomeCameraAPIWithStringParam(api, subDomain, post, params, (ok, res) => {
                    if (ok) {
                        if (typeof (res) === "string") {
                            res = JSONbig.parse(res);
                        }
                        return resolve(res);
                    }
                    reject(res);
                });
            } else {
                reject('失败，原因如下:\n1. api路径填写错误，请检查\n2. sdk 暂未收录该接口，请联系米家插件框架的开发人员');
            }
        });
        // @native end
    },

    /**
     * @method callSmartHomeCameraAPI
     * @since 10041
     * @description 小爱音箱相关接口请求,注意此请求传的是一个对象，里面部分对象有默认值，可不传
     * @param {string} host 请求的host，取值normal，hd,profile,lbs,skillstore,aifile,ai,aitrain,grayupgrade,homealbum。表示的host分别如下...
     * {
     *    "normal": "https://api2.mina.mi.com",
     *    "hd": "https://hd.mina.mi.com",
     *    "profile": "https://userprofile.mina.mi.com",
     *    "lbs": "https://lbs.mina.mi.com",
     *    "skillstore": "https://skillstore.mina.mi.com",
     *    "aifile": "https://file.ai.xiaomi.com",
     *    "ai": "https://api.ai.xiaomi.com",
     *    "aitrain": "https://i.ai.mi.com/mico",
     *    "grayupgrade": "https://api.miwifi.com/rs/grayupgrade/v2/micoiOS",
     *    "homealbum": "https://display.api.mina.mi.com",
     *    "pusher": "https://pusherapi-iotdcm.ai.xiaomi.com"
     * }
     * @param {string} path 请求的路径，比如"/device_profile/conversation"
     * @param {number} method 默认为0（表示get方法），1表示post方法，2表示put方法
     * @param {object} params 请求的参数，比如{limit:20}
     * @param {bool}   needDevice cookie中是否需要带上deviceId，默认为true
     * @param {object} cookie 支持带上自定义的cookie
     * @param {string} contentType put和post方法默认是以表单方式提交参数，即Content-Type为application/x-www-form-urlencoded，如果想以application/json的方式，请传入'json'
     * @return {Promise<object>} 透传接口，直接返回服务端返回的值
     */
    callXiaoaiNetworkAPI({ host = 'normal', path, method = 0, params = {}, needDevice = 1, cookie = {}, contentType = undefined } = {
        host: 'normal', method: 0, needDevice: 1, params: {}, cookie: {}, contentType: undefined
    }) {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            params.cookie = cookie;
            if (contentType) {
                params.contentType = contentType;
            }
            NativeModules.MIOTWifiSpeaker.callXiaoaiNetworkAPI(host, path, method, params, needDevice, (ok, res) => {
                if (ok) {
                    if (typeof (res) === "string") {
                        res = JSON.parse(res);
                    }
                    return resolve(res);
                }
                reject(res);
            });
        });
        // @native end
    },
    /**
     * @method getServerName
     * @description 获取 米家 App 设置的地区和服务器信息
     * Android上返回的countryCode为大写，iOS上为小写，建议使用时在拿到countryCode后调用一下toLowerCase方法，都统一成小写
     * @return {Promise<{countryName:"",countryCode:"",serverCode:""}>}
     */
    getServerName() {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            if (isAndroid || isHarmony) {
                native.MIOTService.getServerName((res) => {
                    // Android：美国地区，美国服务器
                    if (res.countryCode === "us_true") {
                        res.countryCode = 'us';
                    } else if (res.countryCode === 'st') { // Android: staging环境替换为中国大陆
                        res.countryCode = 'CN';
                        res.serverCode = 'cn';
                    }
                    resolve(res);
                });
            } else {
                native.MIOTHost.getCurrentCountryInfoCallback((isSuccess, res) => {
                    if (isSuccess) {
                        // iOS：美国地区，亚洲服务器
                        if (res.countryCode === "us_sg") {
                            res.countryCode = 'us';
                        }
                        resolve(res);
                    } else {
                        reject("地区和服务器信息未正确获取");
                    }
                });
            }
        });
        // @native end
    },

    /**
     * @method getTimeZoneOfServer
     * @description 获取服务器所在时区
     */
    getTimeZoneOfServer() {
        // @native :=> promise
        return new Promise();
        // @native end
    },

    /**
     * @method getUTCFromServer
     * @description 从米家服务器获取当前UTC时间戳（会发送网络请求）
     * @returns {Promise<long>}
     */
    getUTCFromServer() {
        // @native :=> promise 0
        return new Promise((resolve, reject) => {
            native.MIOTRPC.standardCall("/device/get_utc_time", {}, (ok, res) => {
                if (ok && res) {
                    return resolve(res);
                }
                reject(res);
            });
        });
        // @native end
    },

    /**
     * 传入域名返回 serverToken 等信息，目前只支持小爱音箱的域名
     * Android从SDK-10039开始支持该接口
     * @param {string} sid 域名，类似"xxx.xiaomi.com"
     * @returns {Promise}
     */
    getServiceTokenWithSid(sid) {
        // @native :=> promise
        if (isAndroid) {
            return new Promise((resolve, reject) => {
                native.MIOTService.getServiceTokenWithSid(sid, (success, res) => {
                    if (success) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                });
            });
        }
        return new Promise((resolve, reject) => {
            native.MIOTHost.getServiceTokenWithSid(sid, (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
        // @native end
    },

    /**
     * since 10042
     * 撤销隐私授权,插件调用该接口后需要主动调用退出插件
     * @returns {Promise<Object>} 成功时返回：{code:0,data:true};
     *                            失败时返回：{code:-1,message:'invalid device'} ,或 {code:-2,message:'xxxxx'}
     * @example
     * Service.revokePrivacyLicense()
     *        .then(res=>{
     *          console.log(JSON.stringify(res));
     *          if( res.code ===0){
     *            console.log('success');
     *          }
     *        }).catch(err=>{
     *           console.log(JSON.stringify(err));
     *        });
     *
     */
    revokePrivacyLicense() {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTService.revokePrivacyLicense((ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        // @native end
    },

    /**
     * since 10042
     * 删除设备,插件调用该接口后需要主动调用退出插件
     * @returns {Promise<Object>} 成功时返回：{code:0,data:true};
     *                            失败时返回：{code:-1,message:'invalid device'} ,或 {code:-2,message:'xxxxx'}
     * @example
     * Service.deleteDevice()
     *        .then(res=>{
     *          console.log(JSON.stringify(res));
     *          if( res.code ===0){
     *            console.log('success');
     *          }
     *        }).catch(err=>{
     *           console.log(JSON.stringify(err));
     *        });
     */
    deleteDevice() {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTService.deleteDevice((ok, res) => {
                if (ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        // @native end
    },
    /**
     * 某设备向服务器申请did和token
     * Android暂不支持此方法
     * @param {*} model 设备的model
     * @param {*} mac 设备的mac地址
     * @returns {Promise} resolve({res,did,token})
     */
    applyForDeviceIDAndToken(model, mac) {
        // @native :=> promise
        if (isAndroid) {
            return Promise.reject('Android not support yet');
        }
        return new Promise((resolve, reject) => {
            native.MIOTHost.applyForDeviceIDAndToken(model, mac, (err, res, did, token) => {
                if (err) {
                    return reject(err);
                }
                resolve({ res, did, token });
            });
        });
        // @native end
    },

    /**
     * @method callSpecificAPI
     * @since 10031
     * @description 调用当前手机设备的网关http服务
     * 只封装透传网络请求，无法对接口调用结果解释，有问题请直接联系项目对接后台人员或 PM。
     *
     * @param {string} url - url
     * @param {string} method - 如 'get', 'post'等 不区分大小写 暂时只支持 get 和 post
     * @param {object} params 传入参数，比如{ did: 'xxxx', pid: 'xxxx','allow_private_certificates':true/false };allow_private_certificates是10056新增加的参数(10055及以前的版本该参数不生效)，传true表明该请求使用小米路由器私有证书，默认为false;
     * @returns {Promise}
     * 成功时：返回网络请求的结果对应字符串， 相当于：response.body().string()
     * 失败时：{"code":xxx, "message":"xxx" }
     */
    callSpecificAPI(url, method, params) {
        // @native :=> promise
        return new Promise((resolve, reject) => {
            native.MIOTService.callSpecificAPI(url, method, params, (ok, res) => {
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
