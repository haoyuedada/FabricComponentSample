import { webview } from '@kit.ArkWeb';
@Entry
@Component
struct Index {
  @State message: string = 'Hello World';
  private webviewController: webview.WebviewController = new webview.WebviewController();
  htmlStr: string = "data:text/html,\n" +
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
    "    <title>Document</title>\n" +
    "    <style>\n" +
    "        body {\n" +
    "            margin: 0;\n" +
    "            padding: 0;\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<div id='adaptive-wrapper'>\n" +
    "    <!DOCTYPE html>\n" +
    "    <html lang=\"zh-CN\">\n" +
    "\n" +
    "    <head>\n" +
    "        <meta charset=\"UTF-8\">\n" +
    "        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
    "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
    "        <title>Document</title>\n" +
    "        <style>\n" +
    "            img {\n" +
    "                max-width: 100% !important;\n" +
    "                width: 100% !important;\n" +
    "                min-width: 100% !important;\n" +
    "                display: block !important;\n" +
    "            }\n" +
    "\n" +
    "            body {\n" +
    "                user-select: none;\n" +
    "            }\n" +
    "        </style>\n" +
    "    </head>\n" +
    "\n" +
    "    <body>\n" +
    "        <div id=\"divName\">\n" +
    "            <style>\n" +
    "                *.richTextContent {\n" +
    "                    line-height: 1.42;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent,\n" +
    "                *.richTextContent * {}\n" +
    "\n" +
    "                *.richTextContent h1 {\n" +
    "                    font-size: 2.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h2 {\n" +
    "                    font-size: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h3 {\n" +
    "                    font-size: 1.17em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h4 {\n" +
    "                    font-size: 1.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h5 {\n" +
    "                    font-size: 0.83em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h6 {\n" +
    "                    font-size: 0.67em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent a {\n" +
    "                    text-decoration: underline;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent img {\n" +
    "                    max-width: 100.0%;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent blockquote,\n" +
    "                *.richTextContent h1,\n" +
    "                *.richTextContent h2,\n" +
    "                *.richTextContent h3,\n" +
    "                *.richTextContent h4,\n" +
    "                *.richTextContent h5,\n" +
    "                *.richTextContent h6,\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent p,\n" +
    "                *.richTextContent pre,\n" +
    "                *.richTextContent ul {\n" +
    "                    margin: 0;\n" +
    "                    padding: 0;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent ul {\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li,\n" +
    "                *.richTextContent ul li {\n" +
    "                    list-style-type: none;\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li {\n" +
    "                    counter-increment: list-0;\n" +
    "                }\n" +
    "            </style>\n" +
    "            <div class=\"richTextContent\">\n" +
    "                <p><img height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/573AD1C522507EC7FF5E65823D701A93.jpg\">\n" +
    "                </p>\n" +
    "                <p><a\n" +
    "                        href=\"https://m.vmall.com/portal/activity/index.html?isShowLayout=false&amp;pn=gjbt&amp;isSubtabFlat=true\"><img\n" +
    "                            height=\"auto\" width=\"100%\"\n" +
    "                            src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/2B9A0286D5B42C94E905B588381022B0.jpg\"></a>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "            <style>\n" +
    "                *.richTextContent {\n" +
    "                    line-height: 1.42;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent,\n" +
    "                *.richTextContent * {}\n" +
    "\n" +
    "                *.richTextContent h1 {\n" +
    "                    font-size: 2.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h2 {\n" +
    "                    font-size: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h3 {\n" +
    "                    font-size: 1.17em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h4 {\n" +
    "                    font-size: 1.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h5 {\n" +
    "                    font-size: 0.83em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h6 {\n" +
    "                    font-size: 0.67em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent a {\n" +
    "                    text-decoration: underline;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent img {\n" +
    "                    max-width: 100.0%;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent blockquote,\n" +
    "                *.richTextContent h1,\n" +
    "                *.richTextContent h2,\n" +
    "                *.richTextContent h3,\n" +
    "                *.richTextContent h4,\n" +
    "                *.richTextContent h5,\n" +
    "                *.richTextContent h6,\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent p,\n" +
    "                *.richTextContent pre,\n" +
    "                *.richTextContent ul {\n" +
    "                    margin: 0;\n" +
    "                    padding: 0;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent ul {\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li,\n" +
    "                *.richTextContent ul li {\n" +
    "                    list-style-type: none;\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li {\n" +
    "                    counter-increment: list-0;\n" +
    "                }\n" +
    "            </style>\n" +
    "            <div class=\"richTextContent\">\n" +
    "                <p><a href=\"https://m.vmall.com/portal/activity/index.html?isShowLayout=false&amp;pn=educationcenter\"><img\n" +
    "                            height=\"auto\" width=\"100%\"\n" +
    "                            src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/0CB7761F746D1E51A151C32EEEEBFA81.jpg\"></a>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "            <style>\n" +
    "                *.richTextContent {\n" +
    "                    line-height: 1.42;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent,\n" +
    "                *.richTextContent * {}\n" +
    "\n" +
    "                *.richTextContent h1 {\n" +
    "                    font-size: 2.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h2 {\n" +
    "                    font-size: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h3 {\n" +
    "                    font-size: 1.17em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h4 {\n" +
    "                    font-size: 1.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h5 {\n" +
    "                    font-size: 0.83em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h6 {\n" +
    "                    font-size: 0.67em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent a {\n" +
    "                    text-decoration: underline;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent img {\n" +
    "                    max-width: 100.0%;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent blockquote,\n" +
    "                *.richTextContent h1,\n" +
    "                *.richTextContent h2,\n" +
    "                *.richTextContent h3,\n" +
    "                *.richTextContent h4,\n" +
    "                *.richTextContent h5,\n" +
    "                *.richTextContent h6,\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent p,\n" +
    "                *.richTextContent pre,\n" +
    "                *.richTextContent ul {\n" +
    "                    margin: 0;\n" +
    "                    padding: 0;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent ul {\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li,\n" +
    "                *.richTextContent ul li {\n" +
    "                    list-style-type: none;\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li {\n" +
    "                    counter-increment: list-0;\n" +
    "                }\n" +
    "            </style>\n" +
    "            <div class=\"richTextContent\">\n" +
    "                <p><img height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/39A07ED0B784B3A09B75A56ED9391FA3.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/BB2CBA1A3F831674BA99AF583293ABB7.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/61DECDDE8FF4219593B05DB02809679C.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/E299C258CA168885A0520061E783C6DB.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/AF271D1DA5ED93946487A12EE04AED1B.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/78B1DBCCEF5CF2B7C53DDB1B9A9C3500.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/EDCBEAA005561D0F993F5A56A844980A.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/EE785B7F2538544A00E8B662004B8EC8.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/BA38172D87666F495C887AFD7A3D5C6B.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F12A3D65C58A918184860E12393FD18A.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/4FB982287B12372C2B850C401AE224D6.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/68CA1256F9B08EE4ED86B52A803EA447.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/5F59E9D5D809FA280C3ABB097D2BA6D3.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F0AA121058E0D62A82E388EAE0B7B08A.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/BA3787DE17CC3364812303ECB606B03A.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/DAAC789F2EF87539148E4B93A15DE12E.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/307252A5AC78190276C46B38B5394FBC.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/2FFA4EFE8071FE6BBBB1DC80977FBCE7.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/F3778C6FC1B2970449918901FF7381DD.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/EEFC4CD10B0AF1F626ACA2E51ECD3F26.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/8F2A842835046432DF35464756F3BFD8.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/271F5D5AD195B77EB38D460BCD050D17.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/21C979C239BBD86572A0FBFA35D9CB87.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/43355975E17DB2C334BAE5D06B4C24F7.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/631E5A7EB1230AD2A9E24DBDF3236D34.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/75E74C2F085D86724943DC1D51D162AC.png\">\n" +
    "                </p>\n" +
    "            </div>\n" +
    "            <style>\n" +
    "                *.richTextContent {\n" +
    "                    line-height: 1.42;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent,\n" +
    "                *.richTextContent * {}\n" +
    "\n" +
    "                *.richTextContent h1 {\n" +
    "                    font-size: 2.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h2 {\n" +
    "                    font-size: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h3 {\n" +
    "                    font-size: 1.17em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h4 {\n" +
    "                    font-size: 1.0em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h5 {\n" +
    "                    font-size: 0.83em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent h6 {\n" +
    "                    font-size: 0.67em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent a {\n" +
    "                    text-decoration: underline;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent img {\n" +
    "                    max-width: 100.0%;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent blockquote,\n" +
    "                *.richTextContent h1,\n" +
    "                *.richTextContent h2,\n" +
    "                *.richTextContent h3,\n" +
    "                *.richTextContent h4,\n" +
    "                *.richTextContent h5,\n" +
    "                *.richTextContent h6,\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent p,\n" +
    "                *.richTextContent pre,\n" +
    "                *.richTextContent ul {\n" +
    "                    margin: 0;\n" +
    "                    padding: 0;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol,\n" +
    "                *.richTextContent ul {\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li,\n" +
    "                *.richTextContent ul li {\n" +
    "                    list-style-type: none;\n" +
    "                    padding-left: 1.5em;\n" +
    "                }\n" +
    "\n" +
    "                *.richTextContent ol li {\n" +
    "                    counter-increment: list-0;\n" +
    "                }\n" +
    "            </style>\n" +
    "            <div class=\"richTextContent\">\n" +
    "                <p><img height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com//uomcdn/CN/pms/202408/FD08FA9EBAD849F5C7D0F2C5E90E5627.jpg\"><img\n" +
    "                        height=\"auto\" width=\"100%\"\n" +
    "                        src=\"https://res.vmallres.com/FssCdnProxy/vmall_product_uom/pmsCdn/C4585C879744FD652B03A29B8FA8FCCE.jpg\">\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div style=\"height:1px; width: 1px;\"></div>\n" +
    "    </body>\n" +
    "    <script type=\"text/javascript\">\n" +
    "        // 隐藏视频标签\n" +
    "        const spans = document.querySelectorAll('span');\n" +
    "        for (let j = 0; j < spans.length; j++) {\n" +
    "            const element = spans[j];\n" +
    "            if (element.innerText === '视频专用') {\n" +
    "                element.style.display = 'none';\n" +
    "            }\n" +
    "        }\n" +
    "        var links = document.querySelectorAll('a')\n" +
    "        Array.prototype.forEach.call(links, function (link) {\n" +
    "            link.addEventListener('click', function (evt) {\n" +
    "                evt.preventDefault();\n" +
    "                window.ReactNativeWebView.postMessage(JSON.stringify({ href: this.href }));\n" +
    "            })\n" +
    "        })\n" +
    "        // 视频标签点击发送事件\n" +
    "        const videos = document.querySelectorAll('cus');\n" +
    "        Array.prototype.forEach.call(videos, function (video) {\n" +
    "            video.addEventListener('click', function (e) {\n" +
    "                const path = this.attributes['data-video'].nodeValue;\n" +
    "                const parentEle = e.target.parentElement;\n" +
    "                const childrenEle = parentEle.children;\n" +
    "                let imgSrc = '';\n" +
    "                for (let i = 0; i < childrenEle.length; i++) {\n" +
    "                    const src = childrenEle[i].getAttribute('src');\n" +
    "                    if (src) {\n" +
    "                        imgSrc = src;\n" +
    "                    }\n" +
    "                }\n" +
    "                window.ReactNativeWebView.postMessage(JSON.stringify({ videoPath: path, imgSrc: imgSrc }));\n" +
    "            })\n" +
    "        })\n" +
    "        // 禁用拖拽\n" +
    "        document.querySelectorAll('img, a').forEach(el => {\n" +
    "            el.setAttribute('draggable', 'false');\n" +
    "        });\n" +
    "        // 反色处理\n" +
    "        document.addEventListener('message', (event) => {\n" +
    "            const { type, pattern } = JSON.parse(event.data);\n" +
    "            type === 'invert' && pattern?.forEach(item => {\n" +
    "                document.querySelectorAll(item.selector).forEach(el => {\n" +
    "                    el.style.setProperty(item.property, item.value, 'important');\n" +
    "                });\n" +
    "            });\n" +
    "        });\n" +
    "        // 图片加载失败时隐藏\n" +
    "        document.querySelectorAll('img').forEach(img => {\n" +
    "            img.onerror = () => {\n" +
    "                img.remove();\n" +
    "            };\n" +
    "        });\n" +
    "    </script>\n" +
    "\n" +
    "    </html>\n" +
    "</div>\n" +
    "<script>\n" +
    "    const meta = document.createElement(\"meta\");\n" +
    "    meta.setAttribute(\"name\", \"viewport\");\n" +
    "    meta.setAttribute(\"content\", \"width=device-width, user-scalable=no\");\n" +
    "    document.getElementsByTagName(\"head\")[0].appendChild(meta);\n" +
    "\n" +
    "    const wrapper = document.getElementById('adaptive-wrapper');\n" +
    "    if (wrapper) {\n" +
    "        let previousHeight = undefined;\n" +
    "        let previousWidth = undefined;\n" +
    "        let checkTimeout = undefined;\n" +
    "        let sameTimes = 0;\n" +
    "        const maxCheckTimes = 5;\n" +
    "        const checkInterval = 1000;\n" +
    "        const checkWebViewSize = () => {\n" +
    "            const result = wrapper.getBoundingClientRect();\n" +
    "            const height = (result.top + result.height) || wrapper.offsetHeight || document.documentElement.offsetHeight;\n" +
    "            const width = result.width || wrapper.offsetWidth || document.documentElement.offsetWidth;\n" +
    "            if (height !== previousHeight || width !== previousWidth) {\n" +
    "                previousHeight = height;\n" +
    "                previousWidth = width;\n" +
    "                sameTimes = 1;\n" +
    "                if (window.ReactNativeWebView?.postMessage) {\n" +
    "                    window.ReactNativeWebView.postMessage(JSON.stringify({ width, height }));\n" +
    "                }\n" +
    "            } else {\n" +
    "                sameTimes++;\n" +
    "            }\n" +
    "            if (sameTimes <= maxCheckTimes) {\n" +
    "                checkTimeout && clearTimeout(checkTimeout);\n" +
    "                const delay = sameTimes * checkInterval;\n" +
    "                checkTimeout = setTimeout(checkWebViewSize, delay);\n" +
    "            }\n" +
    "        };\n" +
    "        window.addEventListener('load', checkWebViewSize);\n" +
    "        window.addEventListener('resize', checkWebViewSize);\n" +
    "        checkWebViewSize();\n" +
    "    }\n" +
    "</script>\n" +
    "</html>";
  build() {
    Column() {
      Web({ src: this.htmlStr, controller: this.webviewController })
        .domStorageAccess(true)
    }
    .height('100%')
    .width('100%')
  }
}