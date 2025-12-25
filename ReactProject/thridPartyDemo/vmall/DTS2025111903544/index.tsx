import React, { useState } from 'react';
import AdaptiveWebView from './AdaptiveWebView';
import { View } from 'react-native';

/**
 * 商品详情
 * @param props
 * @constructor
 */
const DetailsShow = (props: any) => {
  console.log(`ysh 222222`);
  const [scale, setScale] = useState(1);
  const heightAttr = { height: scale * 345 || 0 };
  const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
      img {
        max-width: 100% !important;
        width: 100% !important;
        min-width:100% !important;
        display: block !important;
      }
      body {
        user-select: none;
      }
      </style>
  </head>
  <body>
  <div id="divName"><style>*.richTextContent {
	line-height: 1.42;
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
	padding-left: 1.5em;
}
*.richTextContent ol li, *.richTextContent ul li {
	list-style-type: none;
	padding-left: 1.5em;
}
*.richTextContent ol li {
	counter-increment: list-0;
}
</style><div class="richTextContent"><p><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/573AD1C522507EC7FF5E65823D701A93.jpg"></p> <p><a href="https://m.vmall.com/portal/activity/index.html?isShowLayout=false&amp;pn=gjbt&amp;isSubtabFlat=true"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/2B9A0286D5B42C94E905B588381022B0.jpg"></a></p></div><style>*.richTextContent {
	line-height: 1.42;
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
	padding-left: 1.5em;
}
*.richTextContent ol li, *.richTextContent ul li {
	list-style-type: none;
	padding-left: 1.5em;
}
*.richTextContent ol li {
	counter-increment: list-0;
}
</style><div class="richTextContent"><p><a href="https://m.vmall.com/portal/activity/index.html?isShowLayout=false&amp;pn=educationcenter"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/0CB7761F746D1E51A151C32EEEEBFA81.jpg"></a></p></div><style>*.richTextContent {
	line-height: 1.42;
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
	padding-left: 1.5em;
}
*.richTextContent ol li, *.richTextContent ul li {
	list-style-type: none;
	padding-left: 1.5em;
}
*.richTextContent ol li {
	counter-increment: list-0;
}
</style><div class="richTextContent"><p><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/39A07ED0B784B3A09B75A56ED9391FA3.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/BB2CBA1A3F831674BA99AF583293ABB7.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/61DECDDE8FF4219593B05DB02809679C.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/E299C258CA168885A0520061E783C6DB.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/AF271D1DA5ED93946487A12EE04AED1B.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/78B1DBCCEF5CF2B7C53DDB1B9A9C3500.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/EDCBEAA005561D0F993F5A56A844980A.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/EE785B7F2538544A00E8B662004B8EC8.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/BA38172D87666F495C887AFD7A3D5C6B.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F12A3D65C58A918184860E12393FD18A.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/4FB982287B12372C2B850C401AE224D6.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/68CA1256F9B08EE4ED86B52A803EA447.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/5F59E9D5D809FA280C3ABB097D2BA6D3.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F0AA121058E0D62A82E388EAE0B7B08A.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/BA3787DE17CC3364812303ECB606B03A.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/DAAC789F2EF87539148E4B93A15DE12E.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/307252A5AC78190276C46B38B5394FBC.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/2FFA4EFE8071FE6BBBB1DC80977FBCE7.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F3778C6FC1B2970449918901FF7381DD.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/EEFC4CD10B0AF1F626ACA2E51ECD3F26.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/8F2A842835046432DF35464756F3BFD8.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/271F5D5AD195B77EB38D460BCD050D17.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/21C979C239BBD86572A0FBFA35D9CB87.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/43355975E17DB2C334BAE5D06B4C24F7.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/631E5A7EB1230AD2A9E24DBDF3236D34.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/75E74C2F085D86724943DC1D51D162AC.png"></p></div><style>*.richTextContent {
	line-height: 1.42;
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
	padding-left: 1.5em;
}
*.richTextContent ol li, *.richTextContent ul li {
	list-style-type: none;
	padding-left: 1.5em;
}
*.richTextContent ol li {
	counter-increment: list-0;
}
</style><div class="richTextContent"><p><img height="auto" width="100%" src="https://res.vmallres.com//uomcdn/CN/pms/202408/FD08FA9EBAD849F5C7D0F2C5E90E5627.jpg"><img height="auto" width="100%" src="https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/C4585C879744FD652B03A29B8FA8FCCE.jpg"></p></div></div>
  <div style="height:1px; width: 1px;"></div>
  </body>
   <script type="text/javascript">
    // 隐藏视频标签
    const spans = document.querySelectorAll('span');
    for (let j = 0; j < spans.length; j++) {
      const element = spans[j];
      if (element.innerText === '视频专用') {
        element.style.display = 'none';
      }
    }
    var links = document.querySelectorAll('a')
    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener('click', function (evt) {
         evt.preventDefault();
         window.ReactNativeWebView.postMessage(JSON.stringify({href : this.href}));
      })
    })
    // 视频标签点击发送事件
    const videos = document.querySelectorAll('cus');
    Array.prototype.forEach.call(videos, function (video) {
      video.addEventListener('click', function (e) {
        const path = this.attributes['data-video'].nodeValue;
        const parentEle = e.target.parentElement;
        const childrenEle = parentEle.children;
        let imgSrc = '';
        for (let i = 0; i < childrenEle.length; i++) {
          const src = childrenEle[i].getAttribute('src');
          if (src) {
            imgSrc = src;
          }
        }
        window.ReactNativeWebView.postMessage(JSON.stringify({videoPath : path, imgSrc: imgSrc}));
      })
    })
    // 禁用拖拽
    document.querySelectorAll('img, a').forEach(el => {
      el.setAttribute('draggable', 'false');
    });
    // 反色处理
    document.addEventListener('message', (event) => {
      const { type, pattern } = JSON.parse(event.data);
      type === 'invert' && pattern?.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
          el.style.setProperty(item.property, item.value, 'important');
        });
      });
    });
    // 图片加载失败时隐藏
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
      };
    });
   </script>
  </html>
  `
  console.log(`ysh 11111111111`);
  
  return (
    <>
      <View style={[{ width: 345, ...heightAttr }]}>
        <AdaptiveWebView
          style={[
            {
              width: 345,
              backgroundColor: 'transparent',
              marginTop: 1,
            },
          ]}
          content={html}
          onSizeChange={(size: any) => {
            if (size?.height && size?.width) {
              // 单独适配mate XS2默认大小下的问题
              if (Math.abs(345 - size.width) < 1) {
                setScale(size.height / 345);
              } else {
                setScale(size.height / size.width);
              }
            }
          }}
          androidLayerType={'none'}
          scalesPageToFit={false}
          scrollEnabled={false}
          allowsLinkPreview={true}
          onShouldStartLoadWithRequest={(event: any) => {
            return true;
          }}
          onMessage={(event: any) => {
          }}
          // 该属性用于禁止商详跟随手机系统设置字体大小缩放
          textZoom={100}
          onLoadEnd={() => {}}
        />
      </View>
    </>
  );
};
export default DetailsShow;
