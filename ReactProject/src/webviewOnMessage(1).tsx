import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Dimensions, ScrollView } from 'react-native';
const demo = require('./index.html')
class RichText extends Component<any, any> {
        constructor(props: any) {
                super(props);
                this.state = {
                        webViewheight: 0,
                        richContent: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
        <title>Document</title>
    </head>
     <body style="background-color: yellow;">
        <div style="width:80%"><style>*.richTextContent {
        line-height: 1.42;
        white-space: pre-wrap;
        word-wrap: break-word;
}
*.richTextContent, *.richTextContent * {
}
*.richTextContent h1 {
        font-size: 2.0em;
}
*.richTextContent h2 {
        font-size: 1.5em;
}
*.richTextContent h3 {
        font-size: 1.17em;
}
*.richTextContent h4 {
        font-size: 1.0em;
}
*.richTextContent h5 {
        font-size: 0.83em;
}
*.richTextContent h6 {
        font-size: 0.67em;
}
*.richTextContent a {
        text-decoration: underline;
}
*.richTextContent img {
        max-width: 100.0%;
}
*.richTextContent blockquote, *.richTextContent h1, *.richTextContent h2, *.richTextContent h3, *.richTextContent h4, *.richTextContent h5, *.richTextContent h6, *.richTextContent ol, *.richTextContent p, *.richTextContent pre, *.richTextContent ul {
        margin: 0;
        padding: 0;
}
*.richTextContent ol, *.richTextContent ul {
        padding-left: 3.0em;
}
</style><div class="richTextContent" style='color:#000000E6;font-size:16px;zoom:1;'><video width="100%"
          height=auto
          style="object-fit:contain;background-color: #000;max-height:720px;min-height:180px;"   
          controls
          controlslist="nodownload"
          poster=https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/7277c0f0f52b47a094826c0b02286adb.png
          preload=metadata
        >
          <source src=https://download-bds.vmall.com/irs/pgc/video/000000004c82bed6ffffffffcfe3348b.mp4 type="video/mp4" />
        </video> <p><strong style="font-size: 36.0px;"> 背影pad</strong></p> <p>我与父亲不额相见 已二年余了，我最不能忘记的是他的背影。<br>那年冬天，祖母死了，父亲的差使1也交卸了，正是祸不单行的日子。我从北京到徐州，打算跟着父亲奔丧2回家。到徐州见着父亲，看见满院狼藉3的东西，又想起祖母，不 禁簌簌地流下眼泪。父亲说：“事已如此，不必难过，好在天无绝人之路！”<br>回家变卖典质4，父亲还了亏空；又借钱办了丧事。这些日子，家中光景很是惨澹5，一半为了丧事，一半为了父亲赋闲6。丧事完毕，父亲要 到南京谋事，我也要回北京念书，我们便同行。<br>到南京时，有朋友约去游逛，勾留7了一日；第二日上午便须渡江到浦口，下午上车北去。父亲因为事忙，本已说定不送我，叫旅馆里一个熟识的茶房8陪我同去。他再三嘱咐茶房，甚是仔细。但他终于不放心，怕茶房不妥帖9；颇踌躇10了一会。其实我那年已二十岁，北京已来往过两三次，是没有什么要紧的了。他踌躇了一会，终于决定还是自己送我去。我再三劝他不必去；他只说：“不要紧，他们去不好！”<br>我们过了江，进了车站。我买票，他忙着照看行李。行李太多，得向脚夫11行些小费才可过去。他便又忙着和他们讲价钱。我那时真是聪明过分，总觉他说话不大漂亮，非自己插嘴不可，但他终 于讲定了价钱；就送我上车。他给我拣定了靠车门的一张椅子；我将他给我做的紫毛大衣铺好座位。他嘱我路 上小心，夜里要警醒些，不要受凉。又嘱托茶房好好照应我。我心里暗笑他的迂；他们只认得钱，托他们只是 白托！而且我这样大年纪的人，难道还不能料理自己么？我现在想想，我那时真是太聪明了。<br>我说道：“爸爸，你走吧。”他往车外看了看，说：“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事 些。我本来要去的，他不肯，只好让他去。我看见他戴着黑布小帽，穿着黑布大马褂12，深青布棉袍，蹒跚13 地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易了。他用两手攀着上 面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我的泪很快地流下来了 。我赶紧拭干了泪。怕他看见，也怕别人看见。我再向外看时，他已抱了朱红的橘子往回走了。过铁道时，他 先将橘子散放在地上，自己慢慢爬下，再抱起橘子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一 股脑儿放在我的皮大衣上。于是扑扑衣上的泥土，心里很轻松似的。过一会儿说：“我走了，到那边来信！”我 望着他走出去。他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再 找不着了，我便进来坐下，我的眼泪又来了。</p> <p><a href="https://m-sit.vmall.hwcloudtest.cn/portal/seckill/index.html?pageId=7933"> <img alt="父亲送子过程" id="pastedImage-6664" src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202207/8A3425594F362F643F7C0AEDB4F4F419.png"> </a> <img alt="父亲送子过程" id="pastedImage-7293" src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202207/0657200F1314062A437268FC4BB45CBC.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/b9760ce153ce4049abb9f300e61de1f4.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/cd587c914b384d1ba41049d9782d19a8.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/5a25ddd362e040b9a38377d8d1cf1ff0.png"></p> <p>近几年来，父亲和我都是东奔西走，家中光景是一日不如一日。他少年出外谋生，独力支持，做了许多大事。哪知老境却如此颓唐！他触目伤怀，自然情不能自已。情郁于中，自然要发之于外；家庭琐屑便往往触他之 怒。他待我渐渐不同往日。但最近两年不见，他终于忘却我的不好，只是惦记着我，惦记着我的儿子。我北来 后，他写了一信给我，信中说道：“我身体平安，惟膀子疼痛厉害，举箸14提笔，诸多不便，大约大去之期15不远矣。”我读到此处，在晶莹的泪光中，又看见那肥胖的、青布棉袍黑布马褂的背影。唉！我不知何时再能与他相见！</p> <p><span style="font-size: 16.0px;"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202211/7FDF8B6B6F7110EC5E5AF76E0D13017C.png" style="max-width: 100.0%;font-size: 16.0px;"> <strong style="font-size: 36.0px;">背影竖屏</strong><img src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202211/A7A161FF4BFD5D442B1E0D7278F5CD28.png" style="max-width: 100.0%;font-size: 16.0px;"> </span></p> <p><img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/4b6b04c5d49042a9a04eba4e1852efc6.gif"></p> <p><strong style="font-size: 24.0px;"> 一、商城真的好棒棒 </strong></p> <p><a href="https://m-sit.vmall.hwcloudtest.cn/portal/seckill/index.html?pageId=7933"> product six </a> 拳打 <span style="color: rgb(0,102,204);"> 阿里 </span> ， <u> 脚踢 </u> <span style="background-color: rgb(230,0,0);"> 京东。 </span></p> <p><span style="border: 1.0px solid;"> 大中华地区部 </span> ， <em> 最牛 </em> 电商。</p></div></div>
    </body>
    </html>`,
                };
        }
        getBasicHtml = () => {
                return `
    (function () {
      var height = null;
      var richTextContent=document.querySelectorAll('div.richTextContent')[0];
      var richTextContentFontsize = window.getComputedStyle(richTextContent).fontSize.replace('px','')

      // 监听滚动事件
      window.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;
        console.log("test web scrolly: ", scrollPosition)
      });
      
      function changeHeight() {
        if (richTextContent.scrollHeight != height) {
          height = richTextContent.scrollHeight;
          if (window.postMessage) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: 'setHeight',
                height: height
              }),
            );
          }
        }
      }
      changeHeight()
      setInterval(changeHeight, 100);
    })();
    `;
        };
        onMessage = (event: any) => {
                const { type, height } = JSON.parse(event.nativeEvent.data);
                console.log('test web height: ', height)
                if (type === 'setHeight' && height > 0) {
                        this.setState({
                                webViewheight: height,
                        });
                }
        };
        componentDidMount() {
                Dimensions.addEventListener("change", this.onChange);
        }
        onChange = ({ window, screen }) => {
                this.setState({
                        richContent: screen.width > screen.height ? `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
        <title>Document</title>
    </head>
     <body style="background-color: yellow;">
        <div style="width:80%"><style>*.richTextContent {
        line-height: 1.42;
        white-space: pre-wrap;
        word-wrap: break-word;
}
*.richTextContent, *.richTextContent * {
}
*.richTextContent h1 {
        font-size: 2.0em;
}
*.richTextContent h2 {
        font-size: 1.5em;
}
*.richTextContent h3 {
        font-size: 1.17em;
}
*.richTextContent h4 {
        font-size: 1.0em;
}
*.richTextContent h5 {
        font-size: 0.83em;
}
*.richTextContent h6 {
        font-size: 0.67em;
}
*.richTextContent a {
        text-decoration: underline;
}
*.richTextContent img {
        max-width: 100.0%;
}
*.richTextContent blockquote, *.richTextContent h1, *.richTextContent h2, *.richTextContent h3, *.richTextContent h4, *.richTextContent h5, *.richTextContent h6, *.richTextContent ol, *.richTextContent p, *.richTextContent pre, *.richTextContent ul {
        margin: 0;
        padding: 0;
}
*.richTextContent ol, *.richTextContent ul {
        padding-left: 3.0em;
}
</style><div class="richTextContent" style='color:#000000E6;font-size:16px;zoom:1;'><video width="100%"
          height=auto
          style="object-fit:contain;background-color: #000;max-height:720px;min-height:180px;"   
          controls
          controlslist="nodownload"
          poster=https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/7277c0f0f52b47a094826c0b02286adb.png
          preload=metadata
        >
          <source src=https://download-bds.vmall.com/irs/pgc/video/000000004c82bed6ffffffffcfe3348b.mp4 type="video/mp4" />
        </video> <p><strong style="font-size: 36.0px;"> 背影 </strong></p> <p>我与父亲不相见已二 年余了，我最不能忘记的是他的背影。</p> <p>那年冬天，祖母死了，父亲的差使1也交卸了，正是祸不单行的日子。我从北京到徐州，打算跟着父亲奔丧2回家。到徐州见着父亲，看见满院狼藉3的东西，又想起祖母，不 禁簌簌地流下眼泪。父亲说：“事已如此，不必难过，好在天无绝人之路！”</p> <p>回家变卖典质4，父亲还了亏空；又借钱办了丧事。这些日子，家中光景很是惨澹5，一半为了丧事，一半为了父亲赋闲6。丧事完毕，父 亲要到南京谋事，我也要回北京念书，我们便同行。</p> <p>到南京时，有朋友约去游逛，勾留7了一日；第二日上午便须渡江到浦口，下午上车北去。父亲因为事忙，本已说定不送我，叫旅馆里一个熟识的茶房8陪我同去。他再三嘱咐茶房，甚是仔细。但他终于不放心，怕茶房不妥帖9；颇踌躇10了一会。其实我那年已二十岁，北京已来往过两三次，是没有什么要紧的了。他踌躇了一会，终于决定还是自己送我去。我再三劝他不必去；他 只说：“不要紧，他们去不好！”</p> <p>我们过了江，进了车站。我买票，他忙着照看行李。行李太多，得向 脚夫11行些小费才可过去。他便又忙着和他们讲价钱。我那时真是聪明过分，总觉他说话不大漂亮，非自己插 嘴不可，但他终于讲定了价钱；就送我上车。他给我拣定了靠车门的一张椅子；我将他给我做的紫毛大衣铺好 座位。他嘱我路上小心，夜里要警醒些，不要受凉。又嘱托茶房好好照应我。我心里暗笑他的迂；他们只认得 钱，托他们只是白托！而且我这样大年纪的人，难道还不能料理自己么？我现在想想，我那时真是太聪明了。</p> <p>我说道：“爸爸，你走吧。”他往车外看了看，说：“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子 ，走过去自然要费事些。我本来要去的，他不肯，只好让他去。我看见他戴着黑布小帽，穿着黑布大马褂12， 深青布棉袍，蹒跚13地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易 了。他用两手攀着上面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我 的泪很快地流下来了。我赶紧拭干了泪。怕他看见，也怕别人看见。 <span style="color: rgb(230,0,0);"> 我再向外看时，他已抱了朱红的橘子往回走了。过铁道时，他先将橘子散放在地上，自己慢慢爬下，再抱起橘 子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一股脑儿放在我的皮大衣上 </span> 。于是扑扑衣上的泥土，心里很轻松似的。过一会儿说：“我走了，到那边来信！”我望着他走出去。他走了几步，回过头看 见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又 来了。</p> <p><a href="https://m-sit.vmall.hwcloudtest.cn/portal/seckill/index.html?pageId=7933"> <img alt="父亲送子过程" id="pastedImage-6664" src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202207/8A3425594F362F643F7C0AEDB4F4F419.png"> </a> <img alt="父亲送子过程" id="pastedImage-7293" src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202207/0657200F1314062A437268FC4BB45CBC.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/b9760ce153ce4049abb9f300e61de1f4.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/cd587c914b384d1ba41049d9782d19a8.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/5a25ddd362e040b9a38377d8d1cf1ff0.png"></p> <p>近几年来，父亲和我都是东奔西走 ，家中光景是一日不如一日。他少年出外谋生，独力支持，做了许多大事。哪知老境却如此颓唐！他触目伤怀 ，自然情不能自已。情郁于中，自然要发之于外；家庭琐屑便往往触他之怒。他待我渐渐不同往日。但最近两 年不见，他终于忘却我的不好，只是惦记着我，惦记着我的儿子。我北来后，他写了一信给我，信中说道：“我身体平安，惟膀子疼痛厉害，举箸14提笔，诸多不便，大约大去之期15不远矣。”我读到此处，在晶莹的泪光中，又看见那肥胖的、青布棉袍黑布马褂的背影。唉！我不知何时再能与他相见！</p> <p><span style="font-size: 16.0px;"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202211/7FDF8B6B6F7110EC5E5AF76E0D13017C.png" style="max-width: 100.0%;font-size: 16.0px;"><strong style="font-size: 36.0px;">背影横屏</strong> <img src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202211/A7A161FF4BFD5D442B1E0D7278F5CD28.png" style="max-width: 100.0%;font-size: 16.0px;"> </span></p> <p><img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/4b6b04c5d49042a9a04eba4e1852efc6.gif"></p> <p><strong style="font-size: 24.0px;"> 一、商城真的好棒棒 </strong></p> <p><a href="https://m-sit.vmall.hwcloudtest.cn/portal/seckill/index.html?pageId=7933"> product six </a> 拳打 <span style="color: rgb(0,102,204);"> 阿里 </span> ， <u> 脚踢 </u> <span style="background-color: rgb(230,0,0);"> 京东。 </span></p> <p><span style="border: 1.0px solid;"> 大中华地区部 </span> ， <em> 最牛 </em> 电商。</p></div></div>  
    </body>
    </html>`: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
        <title>Document</title>
    </head>
     <body style="background-color: yellow;">
        <div style="width:80%"><style>*.richTextContent {
        line-height: 1.42;
        white-space: pre-wrap;
        word-wrap: break-word;
}
*.richTextContent, *.richTextContent * {
}
*.richTextContent h1 {
        font-size: 2.0em;
}
*.richTextContent h2 {
        font-size: 1.5em;
}
*.richTextContent h3 {
        font-size: 1.17em;
}
*.richTextContent h4 {
        font-size: 1.0em;
}
*.richTextContent h5 {
        font-size: 0.83em;
}
*.richTextContent h6 {
        font-size: 0.67em;
}
*.richTextContent a {
        text-decoration: underline;
}
*.richTextContent img {
        max-width: 100.0%;
}
*.richTextContent blockquote, *.richTextContent h1, *.richTextContent h2, *.richTextContent h3, *.richTextContent h4, *.richTextContent h5, *.richTextContent h6, *.richTextContent ol, *.richTextContent p, *.richTextContent pre, *.richTextContent ul {
        margin: 0;
        padding: 0;
}
*.richTextContent ol, *.richTextContent ul {
        padding-left: 3.0em;
}
</style><div class="richTextContent" style='color:#000000E6;font-size:16px;zoom:1;'><video width="100%"
          height=auto
          style="object-fit:contain;background-color: #000;max-height:720px;min-height:180px;"   
          controls
          controlslist="nodownload"
          poster=https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/7277c0f0f52b47a094826c0b02286adb.png
          preload=metadata
        >
          <source src=https://download-bds.vmall.com/irs/pgc/video/000000004c82bed6ffffffffcfe3348b.mp4 type="video/mp4" />
        </video> <p><strong style="font-size: 36.0px;"> 背影pad</strong></p> <p>我与父亲不额相见 已二年余了，我最不能忘记的是他的背影。<br>那年冬天，祖母死了，父亲的差使1也交卸了，正是祸不单行的日子。我从北京到徐州，打算跟着父亲奔丧2回家。到徐州见着父亲，看见满院狼藉3的东西，又想起祖母，不 禁簌簌地流下眼泪。父亲说：“事已如此，不必难过，好在天无绝人之路！”<br>回家变卖典质4，父亲还了亏空；又借钱办了丧事。这些日子，家中光景很是惨澹5，一半为了丧事，一半为了父亲赋闲6。丧事完毕，父亲要 到南京谋事，我也要回北京念书，我们便同行。<br>到南京时，有朋友约去游逛，勾留7了一日；第二日上午便须渡江到浦口，下午上车北去。父亲因为事忙，本已说定不送我，叫旅馆里一个熟识的茶房8陪我同去。他再三嘱咐茶房，甚是仔细。但他终于不放心，怕茶房不妥帖9；颇踌躇10了一会。其实我那年已二十岁，北京已来往过两三次，是没有什么要紧的了。他踌躇了一会，终于决定还是自己送我去。我再三劝他不必去；他只说：“不要紧，他们去不好！”<br>我们过了江，进了车站。我买票，他忙着照看行李。行李太多，得向脚夫11行些小费才可过去。他便又忙着和他们讲价钱。我那时真是聪明过分，总觉他说话不大漂亮，非自己插嘴不可，但他终 于讲定了价钱；就送我上车。他给我拣定了靠车门的一张椅子；我将他给我做的紫毛大衣铺好座位。他嘱我路 上小心，夜里要警醒些，不要受凉。又嘱托茶房好好照应我。我心里暗笑他的迂；他们只认得钱，托他们只是 白托！而且我这样大年纪的人，难道还不能料理自己么？我现在想想，我那时真是太聪明了。<br>我说道：“爸爸，你走吧。”他往车外看了看，说：“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事 些。我本来要去的，他不肯，只好让他去。我看见他戴着黑布小帽，穿着黑布大马褂12，深青布棉袍，蹒跚13 地走到铁道边，慢慢探身下去，尚不大难。可是他穿过铁道，要爬上那边月台，就不容易了。他用两手攀着上 面，两脚再向上缩；他肥胖的身子向左微倾，显出努力的样子。这时我看见他的背影，我的泪很快地流下来了 。我赶紧拭干了泪。怕他看见，也怕别人看见。我再向外看时，他已抱了朱红的橘子往回走了。过铁道时，他 先将橘子散放在地上，自己慢慢爬下，再抱起橘子走。到这边时，我赶紧去搀他。他和我走到车上，将橘子一 股脑儿放在我的皮大衣上。于是扑扑衣上的泥土，心里很轻松似的。过一会儿说：“我走了，到那边来信！”我 望着他走出去。他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再 找不着了，我便进来坐下，我的眼泪又来了。</p> <p><a href="https://m-sit.vmall.hwcloudtest.cn/portal/seckill/index.html?pageId=7933"> <img alt="父亲送子过程" id="pastedImage-6664" src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202207/8A3425594F362F643F7C0AEDB4F4F419.png"> </a> <img alt="父亲送子过程" id="pastedImage-7293" src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202207/0657200F1314062A437268FC4BB45CBC.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/b9760ce153ce4049abb9f300e61de1f4.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/cd587c914b384d1ba41049d9782d19a8.png"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/5a25ddd362e040b9a38377d8d1cf1ff0.png"></p> <p>近几年来，父亲和我都是东奔西走，家中光景是一日不如一日。他少年出外谋生，独力支持，做了许多大事。哪知老境却如此颓唐！他触目伤怀，自然情不能自已。情郁于中，自然要发之于外；家庭琐屑便往往触他之 怒。他待我渐渐不同往日。但最近两年不见，他终于忘却我的不好，只是惦记着我，惦记着我的儿子。我北来 后，他写了一信给我，信中说道：“我身体平安，惟膀子疼痛厉害，举箸14提笔，诸多不便，大约大去之期15不远矣。”我读到此处，在晶莹的泪光中，又看见那肥胖的、青布棉袍黑布马褂的背影。唉！我不知何时再能与他相见！</p> <p><span style="font-size: 16.0px;"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202211/7FDF8B6B6F7110EC5E5AF76E0D13017C.png" style="max-width: 100.0%;font-size: 16.0px;"> <img src="https://rescdn-sit.vmall.hwcloudtest.cn/uomcdn/CN/cms/202211/A7A161FF4BFD5D442B1E0D7278F5CD28.png" style="max-width: 100.0%;font-size: 16.0px;"> </span></p> <p><img src="https://rescdn-sit.vmall.hwcloudtest.cn//uomcdn/CN/cms/202405/4b6b04c5d49042a9a04eba4e1852efc6.gif"></p> <p><strong style="font-size: 24.0px;"> 一、商城真的好棒棒 </strong></p> <p><a href="https://m-sit.vmall.hwcloudtest.cn/portal/seckill/index.html?pageId=7933"> product six </a> 拳打 <span style="color: rgb(0,102,204);"> 阿里 </span> ， <u> 脚踢 </u> <span style="background-color: rgb(230,0,0);"> 京东。 </span></p> <p><span style="border: 1.0px solid;"> 大中华地区部 </span> ， <em> 最牛 </em> 电商。</p></div></div>
    </body>
    </html>`});
        };
        // 滑动之后再横竖屏
        render() {
                const { richContent } = this.state;
                return (
                        <ScrollView>
                                <WebView
                                        style={[
                                                {
                                                        backgroundColor: 'yellow',
                                                        height: this.state.webViewheight,

                                                },
                                        ]}
                                        // injectedJavaScriptObject={dosomething}
                                        javaScriptEnabled={true}
                                        decelerationRate="normal"
                                        startInLoadingState={false}
                                        scalesPageToFit={false}
                                        originWhitelist={['*']}
                                        source={{ html: richContent }}
                                        bounces={false}
                                        scrollEnabled={true}
                                        showsHorizontalScrollIndicator={true}
                                        showsVerticalScrollIndicator={false}
                                        contentInset={{ top: 0, left: 0 }}
                                        onMessage={this.onMessage}
                                        injectedJavaScript={this.getBasicHtml()}
                                        cacheEnabled={false}
                                        cacheMode={'LOAD_NO_CACHE'}
                                        domStorageEnabled={true}
                                        textZoom={100}
                                        forceDarkOn={false}
                                        ignoreSilentHardwareSwitch={true} 
                                        />
                        </ScrollView>
                );
        }
}
export default RichText;
