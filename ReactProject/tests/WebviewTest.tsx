import React, { useMemo, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

// 直接导入 HTML 文件内容（需要额外配置）
const htmlContent = 
`
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>为什么没有视频？</title>
		<style>
			*{
				margin: 0;
			}
			html{ font-size:16px;}
			body{
				background-color: #fff;
			}
			.question-wrap{
				margin: 18px 24px;
			}
			.question-title{
				color: #000;
				font-size: 1.125rem;
			}
			.step-one-title,.step-two-title,.step-three-title{
				margin: 18px 0 9px 0;
				color: #000;
				font-size: 0.8125rem;
			}
			a{
				color: #32BAC0;
				text-decoration: underline;
				display: inline-block;
				font-size: 0.75rem;
				 -webkit-tap-highlight-color: rgba(0,0,0,0);
			}
			p{
				font-size: 0.75rem;
				color: #666;
				line-height: 2;
				width: 100%;
			}
			img{
				margin: 17px 0;
				width: 100%;
				height: 100%;
			}
			.m5{
				margin: 5px 0;
			}
			.toast-box {
			    width: 100%;
			    height: 100%;
			    opacity: 1;
			    position: fixed;
			    top: 0px;
			    left: 0px;
			}
			
			.toastbg {
			    background-color: rgba(0,0,0,.4);
			    position: absolute;
			    width: 100%;
			    height: 100%;
				top: 0;
				left: 0;
			}
			
			.showToast-set{
				position: fixed;
				opacity: 1;
				width: 100%;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				background-color: #FFFFFF;
				border-top-right-radius: 20px;
				border-top-left-radius: 20px;
			}
			
			.toast-title {
			    color: #000;
			    font-size: 16px;
				line-height: 22px;
			    text-align: center;
			    padding-top: 25px;
			    padding-bottom: 23px;
			}
			
			.toast-main-set {
			    padding: 0 40px 28px 40px;
			}
			.toast-describe{
				font-size: 16px;
				line-height: 22px;
				color: #333333;
			}
			.toast-button {
			    display: flex;
				margin: 0 27px;
			}
			
			.button-left,.button-right{
				text-align: center;
			    width: 100%;
			    height: 46px;
			    display: flex;
				justify-content: center;
				padding-bottom: 27px;
			}
			.button-left-bg{
				width: 100%;
				height: 46px;
				line-height: 46px;
				border-radius: 23px;
				font-size: 16px;
				background-color: rgba(0,0,0,.03);
				color: #000000;
				margin-right: 6.5px;
			}
			.button-left-bg.black{
					background-color: #333333;
					color: #e6e6e6;
		    }
			.button-right-bg{
				width: 100%;
				height: 46px;
				line-height: 46px;
				font-size: 16px;
				border-radius: 23px;
				background-color: #32BAC0;
				color: #FFFFFF;
				margin-left: 6.5px;
			}
			.faq-set-image-box{
				background-image: url(https://cdn.cnbj1.fds.api.mi-img.com/miot-images/f5f93828a6840f188f58e80b3a72052d_1702039915770.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=74d2R3lNwKRk0tq0m6+a+e8e+zE=);
				background-repeat: no-repeat;
				background-size: 100% auto;
				margin: 17px 0;
				width: 100%;
			}
			.faq-set-image-box::before{
				content: "";
				display: block;
				padding-top: 92%;
			}
			.faq-notice-image-box{
				background-image: url(https://cdn.cnbj1.fds.api.mi-img.com/miot-images/b0928e29484614b5e19fc8adb11862e4_1702039915757.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=Wgt3peETePtH9O7D01SeCCIpbC4=);
				background-repeat: no-repeat;
				background-size: 100% auto;
				margin: 17px 0;
				width: 100%;
			}
			.faq-set-image-box.black{
					background-image: url(https://cdn.cnbj1.fds.api.mi-img.com/miot-images/875c545c3ffe6bd5bc54fa79eac02ab0_1702039915770.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=myoOTtFqvDayAgrC98bYkbpcBKA=)!important;
				}
			.faq-notice-image-box.black{
				background-image: url(https://cdn.cnbj1.fds.api.mi-img.com/miot-images/be09bb77ab9e67f9f22eccb81f820fdc_1702039915766.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=3JS5LLCV1IrlwMGMOxuj/yYPX3Q=)!important;
			}
			.faq-notice-image-box::before{
				content: "";
				display: block;
				padding-top: 26%;
			}
			@media (prefers-color-scheme: dark){
				body{
					background-color: #000 !important;
				}
				.question-title{
					color: #FFFFFF !important;
				}
				.step-one-title,.step-two-title,.step-three-title{
					color: #FFFFFF !important;
				}
				a{
					color: #23A4A9 !important;
				}
				p{
					color: #999 !important;
				}
				
				.showToast-set{
					background-color: #1a1a1a !important;
				}
				
				.toast-title {
				    color: #FFFFFF !important;
				}
				
				.toast-describe{
					color: #CCCCCC !important;
				}
				.button-left-bg{
					background-color: #333333;
					color: #e6e6e6;
				}
				.button-right-bg{
					background-color: #23A4A9 !important;
				}
				.faq-set-image-box{
					background-image: url(https://cdn.cnbj1.fds.api.mi-img.com/miot-images/875c545c3ffe6bd5bc54fa79eac02ab0_1702039915770.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=myoOTtFqvDayAgrC98bYkbpcBKA=)!important;
				}
				.faq-notice-image-box{
					background-image: url(https://cdn.cnbj1.fds.api.mi-img.com/miot-images/be09bb77ab9e67f9f22eccb81f820fdc_1702039915766.png?GalaxyAccessKeyId=AKVGLQWBOVIRQ3XLEW&Expires=9223372036854775807&Signature=3JS5LLCV1IrlwMGMOxuj/yYPX3Q=)!important;
				}
			}
		</style>
	</head>
	<body>
		<section class="question-wrap">
			<h3 class="question-title">为什么没有视频？</h3>
			<section class="step-one">
				<h4 class="step-one-title">第一步、检查猫眼是否正常工作</h4>
				<p>按门铃后，手机上收到消息推送或能收到视频，则猫眼正常工作。需进行第二步检查。</p>
				<div id="pic1" class="faq-notice-image-box"></div>
				
				<p>猫眼不能正常工作时：</p>
				<p>1、检查猫眼是否有电</p>
				<p>猫眼电量耗尽不能正常工作时，按门铃后完全没有任何反应，此时请充电后再使用。</p>
				<p>2、检查路由器是否正常工作，或是否修改过WiFi名字或密码</p>
				<p>路由不能正常工作时，手机连上WiFi也不能连接网络，此时请联系路由的售后解决。若是修改了WiFi名字或密码，猫眼需要重新连接网络，按照第一次添加设备的步骤再次添加即可。</p>

			</section>
			<section class="step-two">
				<h4 class="step-two-title">第二步、检查移动人形侦测相关设置是否修改</h4>
				<p id="wu66">有人经过和停留的事件会根据所设置的移动人形侦测设置进行拍摄。若关闭移动人形侦测，则不会拍摄视频。</p>
				<div id="pic2" class="faq-set-image-box"></div>
				
				<a class="m5 set-link" id="goMotionDetection" href="javascript:void(0)">设置移动人形侦测</a>
				
			</section>
			<section class="step-three">
				<h4 class="step-three-title">第三步、检查云存视频是否被删除</h4>
				<p>视频被删除后，列表里将不会显示。</p>
				<p>更多问题可联系售后或客服解决。</p>
			</section>
		</section>
		<div id="mask" class="toast-box" style="display: none;">
			<div  id="closeMask" class="toastbg" onclick="setCloseMask()"></div>
			<div class="showToast-set">
				<div class="toast-title">还原移动侦测设置</div>
				<div class="toast-main-set">
					<div class="toast-describe">还原移动侦测设置后, 只会将移动侦测相关的设置恢复成系统默认设置, 不会影响账号绑定等,确定要还原吗？</div>
				</div>
				<div class="toast-button">
					<div class="button-left">
						<div id="left_bg" class="button-left-bg" onclick="setCloseMask()">取消</div>
					</div>
					<div class="button-right">
						<div class="button-right-bg" onclick="sendMessage()">还原</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			var goMotion = document.getElementById("goMotionDetection");
			var closeMask = document.getElementById("closeMask");
			var wu66 = document.getElementById("wu66");
			var s1img = document.getElementById("pic1");
			var s2img = document.getElementById("pic2");
			var left_bg = document.getElementById("left_bg");

			document.addEventListener('message', function(e) {
				if(e.data == "dark"){
					s1img.className = 'faq-notice-image-box black';
					s2img.className = 'faq-set-image-box black';
					left_bg.className = 'button-left-bg black';
				}
			});

			goMotion.onclick = function(e) {
				window.postMessage(
						JSON.stringify({
							method: 'navigation.navigate',
							args: ['SubSetting']
						})
				);
			}

			closeMask.onclick = function(e){
				mask.style.display = "none";
			};

			function setCloseMask(){
				mask.style.display = "none";
			}
			function sendMessage(){
				let mes = {
					"method": "setSpec",
					"args": [
					  {
						"key": { siid: 5, piid: 42 },
						"value": "true"
					  },
					  {
						"key": { siid: 4, piid: 3 },
						"value": "1"
					  },
					  {
						"key": { siid: 4, piid: 4 },
						"value": "00:00"
					  },
					  {
						"key": { siid: 4, piid: 5 },
						"value": "00:00"
					  },
					  {
						"key": { siid: 5, piid: 8 },
						"value": "0"
            },
            {
						"key": { siid: 5, piid: 7 },
						"value": "0"
					  },
					  {
						"key": { siid: 4, piid: 6 },
						"value": "0"
					  },
					  {
						"key": { siid: 5, piid: 30 },
						"value": "60"
					  }
					  
					]
				  };
				  window.postMessage(JSON.stringify(mes));
				  mask.style.display = "none";
			}
		</script>
	</body>
</html>
`
const htmlContentt = require("./html/faq_99.html");
const htmlContentwx = require("./html/wordcloud.html");

const htmlurl = "https://enetdemo.rj.link/s2b2c/#/pages/instructions/instructions?userFlag=7397c4330cf458df506cffee491835ce_20524&companyCode=&accountId=15080062459&accessKey=mini_profile__native_app_0ae49d9f-cb90-4e50-a5f1-aff257e0fac7&staId=1780379126295-2d081c0f&appVersion=9.7.0&continent=&tz=-480&imControl=true&lang=zh&barHeight=37.84615384615385&platform=harmony";
const htmlurl1 = "https://www.baidu.com";

// 本地长 HTML：内容较长可滚动 + 多个输入框，用于模拟 H5 表单场景
const LOCAL_FORM_HTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, sans-serif; background: #f7f8fa; padding: 16px; }
        h2 { color: #333; margin: 20px 0 12px; font-size: 17px; }
        p { color: #666; font-size: 14px; line-height: 1.8; margin-bottom: 10px; }
        .form-item { background: #fff; border-radius: 8px; padding: 12px 14px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.05); }
        .form-item label { display:block; font-size: 13px; color: #999; margin-bottom: 6px; }
        .form-item input, .form-item textarea {
            width: 100%; border: 1px solid #eee; border-radius: 6px;
            padding: 10px 12px; font-size: 15px; outline: none; background: #fafafa;
        }
        .form-item input:focus, .form-item textarea:focus { border-color: #32BAC0; background: #fff; }
        .form-item textarea { min-height: 80px; resize: none; }
        .btn {
            display:block; width:100%; height: 44px; line-height: 44px; text-align:center;
            background: #32BAC0; color:#fff; border:none; border-radius: 22px; font-size: 16px;
            margin: 10px 0 24px;
        }
        .block { margin-bottom: 16px; padding: 14px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3; }
        .block h3 { color:#1976d2; font-size: 15px; margin-bottom: 6px; }
        .footer { text-align:center; color:#bbb; font-size:12px; padding: 20px 0 40px; }
    </style>
</head>
<body>
    <h2>H5 表单区域（WebView 内部）</h2>
    <p>下方是 WebView 渲染的本地 HTML，内容较长且包含多个输入框，可在 WebView 内部滚动并聚焦输入。</p>

    <div class="form-item">
        <label>姓名</label>
        <input id="name" type="text" placeholder="请输入姓名" />
    </div>
    <div class="form-item">
        <label>手机号</label>
        <input id="phone" type="tel" placeholder="请输入手机号" />
    </div>
    <div class="form-item">
        <label>留言</label>
        <textarea id="msg" placeholder="请输入留言内容"></textarea>
    </div>

    <button class="btn" onclick="submitForm()">提交表单</button>

    <h2>说明文档</h2>
    <div class="block"><h3>第 1 段</h3><p>用于撑高页面高度的内容，测试 WebView 内部滚动。</p></div>
    <div class="block"><h3>第 2 段</h3><p>React Native WebView 嵌套在 ScrollView 中时，可通过固定 WebView 高度让其内部滚动。</p></div>
    <div class="block"><h3>第 3 段</h3><p>当 WebView 高度固定且内容超出时，触摸 WebView 内部会触发其自身滚动。</p></div>
    <div class="block"><h3>第 4 段</h3><p>触摸 WebView 外部的原生区域，则由外层 ScrollView 接管滚动。</p></div>
    <div class="block"><h3>第 5 段</h3><p>输入框聚焦时会唤起软键盘，可测试键盘遮挡与页面调整行为。</p></div>
    <div class="block"><h3>第 6 段</h3><p>继续填充内容以确保页面整体可滚动到底部。</p></div>
    <div class="block"><h3>第 7 段</h3><p>这是 WebView 内部的倒数第二段内容。</p></div>
    <div class="block"><h3>第 8 段</h3><p>WebView 内部内容结束。</p></div>

    <div class="footer">— WebView 内部底部 —</div>

    <script>
        function submitForm() {
            var data = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                msg: document.getElementById('msg').value
            };
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'submit', data: data }));
        }
    </script>
</body>
</html>
`;

// 原线上 URL 场景组件（保留为命名导出）
export function WebViewScreen() {
    return (
        <WebView
            style={{ 
				width: "100%", 
				height: "100%", 
				backgroundColor: "#00000000" 
			}}
            source={{ uri: htmlurl }}
            // source = { htmlContentt }
            // originWhitelist={['*']}
            // source={{ uri: 'resource://rawfile/faq_99.html' }}
            // usewebkit={true}
        />
    );
};

// 场景：ScrollView 包裹 WebView，WebView 内部为本地长 HTML（含输入框），可独立滚动
export default function WebViewScrollScreen() {
    const [nativeInput, setNativeInput] = useState('');

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.section}>
                <Text style={styles.title}>混合滚动场景演示</Text>
                <Text style={styles.desc}>
                    外层 ScrollView + 内嵌 WebView（本地长 HTML，含输入框）。WebView 固定高度，内部可独立滚动。
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>原生输入框（ScrollView 内）</Text>
                <TextInput
                    style={styles.nativeInput}
                    value={nativeInput}
                    onChangeText={setNativeInput}
                    placeholder="点击输入，测试键盘与滚动"
                />
            </View>

            <View style={styles.webviewWrap}>
                <WebView
                    style={styles.webview}
                    source={{ html: LOCAL_FORM_HTML }}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    onMessage={(e) => {
                        Alert.alert('收到 H5 消息', e.nativeEvent.data);
                    }}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>WebView 下方原生内容</Text>
                <Text style={styles.desc}>
                    继续向下滚动可验证外层 ScrollView 在 WebView 之外的滚动行为。
                </Text>
                <Button title="重置原生输入框" onPress={() => setNativeInput('')} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    section: { padding: 16, backgroundColor: '#fff', marginBottom: 10 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    desc: { fontSize: 13, color: '#666', lineHeight: 20 },
    label: { fontSize: 14, color: '#333', marginBottom: 8 },
    nativeInput: {
        borderWidth: 1, borderColor: '#ddd', borderRadius: 6,
        paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, backgroundColor: '#fafafa',
    },
    webviewWrap: {
        marginHorizontal: 16, marginBottom: 10, borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff',
    },
    webview: { width: width - 32, height: 500 },
});