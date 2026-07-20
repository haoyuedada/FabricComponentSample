import React, { useMemo } from 'react';
import { WebView } from 'react-native-webview';

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

// https://enetdemo.rj.link/s2b2c/#/pages/instructions/instructions?userFlag=7397c4330cf458df506cffee491835ce_20524&companyCode=&accountId=15080062459&accessKey=mini_profile__native_app_0ae49d9f-cb90-4e50-a5f1-aff257e0fac7&staId=1780379126295-2d081c0f&appVersion=9.7.0&continent=&tz=-480&imControl=true&lang=zh&barHeight=37.84615384615385&platform=harmony
export default function WebViewScreen() {
    return (
        <WebView
            style={{ width: 300, height: 300, backgroundColor: "#00000000" }}
            // source={{ html: htmlContentt }}
			source = { htmlContentt }
            originWhitelist={['*']}
            // source={{ uri: 'resource://rawfile/faq_99.html' }}
            usewebkit={true}
        />
    );
};