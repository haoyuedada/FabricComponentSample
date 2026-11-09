import React from 'react'; 
import SvgUri from './lib/react-native-svg-uri'; 

const data = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="&#231;&#129;&#175;&#229;&#133;&#137;&#228;&#184;&#142;&#229;&#163;&#176;&#233;&#159;&#179;">
<g id="Group 2090051947" opacity="0.8">
<path id="&#230;&#164;&#173;&#229;&#156;&#134;&#229;&#189;&#162;" d="M21.6749 15.0003C21.4772 13.8791 20.9515 12.8418 20.1642 12.0194C19.377 11.197 18.3635 10.6265 17.2521 10.3801C16.1406 10.1337 14.981 10.2224 13.9199 10.635C12.8589 11.0477 11.944 11.7656 11.291 12.6982C10.638 13.6308 10.2762 14.7361 10.2514 15.8743C10.2265 17.0125 10.5398 18.1325 11.1515 19.0926C11.7632 20.0528 12.6458 20.81 13.6879 21.2685C14.73 21.7271 15.8846 21.8663 17.0057 21.6686" stroke="black" stroke-width="1.8" stroke-linecap="round"/>
<path id="Vector 4742" d="M16.0059 5.63867L16.0059 6.78991" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector 4743" d="M16.0059 25.21L16.0059 26.3612" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector 4744" d="M6.79492 16H5.64368" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector 4745" d="M23.332 8.67334L22.518 9.48739" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector 4746" d="M9.49414 22.5122L8.68009 23.3263" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector 4747" d="M9.49414 9.48779L8.68009 8.67375" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector" d="M22.0415 18.3346H20.3263V22.0706H22.0415L25.604 24.334C25.9291 24.5406 26.3542 24.307 26.3542 23.9218V16.4891C26.3542 16.1042 25.9296 15.8706 25.6044 16.0767L22.0415 18.3346Z" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</g>
</svg>
`;
export const ScreenSound = ({ width: a, height: b, fill: c, fillAll: d, stroke: e, strokeAll: f }) =>/* #__PURE__ */{
    console.log("ScreenSound rendered with props:", { width: a, height: b, fill: c, fillAll: d, stroke: e, strokeAll: f });
    return React.createElement(SvgUri, { svgXmlData: data, width: a, height: b, fill: c, fillAll: d, stroke: '#FFFFFF', strokeAll: f })
}
