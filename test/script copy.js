const fs = require('fs');
const path = require('path');
const ext =
    /((\.native)|(\.harmony\.js)|(\.native\.js)|(?<!\.android)\.js$|(\.harmony\.jsx)|(\.native\.jsx)|(\.jsx)|(\.harmony\.json)|(\.native\.json)|(\.json)|(\.harmony\.ts)|(\.native\.ts)|(\.ts)|(\.harmony\.tsx)|(\.native\.tsx)|(\.tsx))$/;
// macOS风格的文件排序函数
function macStyleSort(a, b) {
  // 隐藏文件（以.开头）优先
  const aIsHidden = a.startsWith('.');
  const bIsHidden = b.startsWith('.');
  
  if (aIsHidden && !bIsHidden) return -1;
  if (!aIsHidden && bIsHidden) return 1;
  
  // 大小写敏感排序（大写字母优先）
  return a.localeCompare(b, undefined, {
    sensitivity: 'case',
    numeric: true
  });
}

const ReadSDKFiles = (pathname, result = '') => {
  // 读取目录项
  let items = fs.readdirSync(pathname);
  
  // 在Windows上应用macOS排序规则
  // if (process.platform === 'win32') {
    items.sort(macStyleSort);
  // }
  
  for (let item of items) {
    let name = path.join(pathname, item);
    const stat = fs.statSync(name);
    
    if (stat.isFile() && ext.test(name) && !/\.ios/.test(name)) {
      name = name.replace(/\\/g, '/');
      result += `import './${name}';\n`;
    } else if (stat.isDirectory()) {
      result = ReadSDKFiles(name, result);
    }
  }
  return result;
};

let result = ReadSDKFiles('./miot-sdk/');
result += `import 'miot'; \n`;
result += `import 'react'; \n`;
result += `import 'react-native'; \n`;
fs.writeFileSync('./index.sdk.js', result);