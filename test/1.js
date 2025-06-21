<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>跨平台文件顺序一致性解决方案</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        h1 {
            font-size: 2.8rem;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }
        @media (max-width: 768px) {
            .content {
                grid-template-columns: 1fr;
            }
        }
        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .card h2 {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            color: #4dabf7;
        }
        .code-container {
            background: rgba(0, 0, 0, 0.4);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            overflow-x: auto;
        }
        .code {
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.95rem;
            line-height: 1.5;
            white-space: pre;
        }
        .highlight {
            background-color: rgba(255, 215, 0, 0.2);
            border-left: 3px solid gold;
            padding: 2px 5px;
        }
        .comparison {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        th {
            background: rgba(255, 255, 255, 0.1);
            font-weight: 600;
        }
        tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.05);
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            opacity: 0.8;
            font-size: 0.9rem;
        }
        .platform-section {
            margin-bottom: 30px;
        }
        .platform-title {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .platform-icon {
            width: 32px;
            height: 32px;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
        }
        .file-list {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 15px;
            font-family: monospace;
            line-height: 1.8;
            max-height: 300px;
            overflow-y: auto;
        }
        .file-item {
            padding: 5px 10px;
            border-radius: 4px;
            margin: 2px 0;
        }
        .file-item:nth-child(odd) {
            background: rgba(255, 255, 255, 0.05);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>跨平台文件读取顺序一致性解决方案</h1>
            <p class="subtitle">
                确保在Windows上按照macOS的排序规则输出文件，同时保持macOS上的原生排序不变
            </p>
        </header>

        <div class="content">
            <div class="card">
                <h2>修改后的脚本</h2>
                <div class="code-container">
                    <div class="code">const fs = require('fs');
const path = require('path');

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

// 文件扩展名匹配规则
const ext = /((\.native)|(\.harmony\.js)|(\.native\.js)|(?<!\.android)\.js$|(\.harmony\.jsx)|(\.native\.jsx)|(\.jsx)|(\.harmony\.json)|(\.native\.json)|(\.json)|(\.harmony\.ts)|(\.native\.ts)|(\.ts)|(\.harmony\.tsx)|(\.native\.tsx)|(\.tsx))$/;

const ReadSDKFiles = (pathname, result = '') => {
  // 读取目录项
  let items = fs.readdirSync(pathname);
  
  // 在Windows上应用macOS排序规则
  if (process.platform === 'win32') {
    items.sort(macStyleSort);
  }
  
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

// 生成SDK入口文件
let result = ReadSDKFiles('./miot-sdk/');
result += `import 'miot';\n`;
result += `import 'react';\n`;
result += `import 'react-native';\n`;

fs.writeFileSync('./index.sdk.js', result);
console.log('SDK入口文件生成完成！');</div>
                </div>
                
                <h3>关键修改说明</h3>
                <ul style="padding-left: 20px; margin-top: 10px;">
                    <li>添加了 <span class="highlight">macStyleSort</span> 函数模拟macOS排序规则</li>
                    <li>仅在Windows平台应用自定义排序 (<span class="highlight">process.platform === 'win32'</span>)</li>
                    <li>保持macOS上的原生文件系统排序不变</li>
                    <li>递归时正确传递并返回result变量</li>
                </ul>
            </div>

            <div class="card">
                <h2>跨平台排序规则对比</h2>
                
                <div class="platform-section">
                    <div class="platform-title">
                        <div class="platform-icon">🍎</div>
                        <h3>macOS 排序规则</h3>
                    </div>
                    <div class="file-list">
                        <div class="file-item">.eslintrc.json</div>
                        <div class="file-item">Account.js</div>
                        <div class="file-item">Bluetooth.js</div>
                        <div class="file-item">ClassicBluetooth.js</div>
                        <div class="file-item">Device.js</div>
                        <div class="file-item">Entrance.js</div>
                        <div class="file-item">Host.js</div>
                        <div class="file-item">Package.js</div>
                        <div class="file-item">Properties.js</div>
                        <div class="file-item">Service.js</div>
                        <div class="file-item">index.js</div>
                        <div class="file-item">package.json</div>
                    </div>
                    <p>特点：隐藏文件优先 → 大写字母优先 → 小写字母在后</p>
                </div>
                
                <div class="platform-section">
                    <div class="platform-title">
                        <div class="platform-icon">🪟</div>
                        <h3>Windows 原生排序</h3>
                    </div>
                    <div class="file-list">
                        <div class="file-item">Account.js</div>
                        <div class="file-item">Bluetooth.js</div>
                        <div class="file-item">ClassicBluetooth.js</div>
                        <div class="file-item">Device.js</div>
                        <div class="file-item">Entrance.js</div>
                        <div class="file-item">Host.js</div>
                        <div class="file-item">Package.js</div>
                        <div class="file-item">Properties.js</div>
                        <div class="file-item">Service.js</div>
                        <div class="file-item">.eslintrc.json</div>
                        <div class="file-item">index.js</div>
                        <div class="file-item">package.json</div>
                    </div>
                    <p>特点：文件夹优先 → 字母顺序（不区分大小写）→ 隐藏文件无特殊位置</p>
                </div>
            </div>
        </div>

        <div class="comparison">
            <h2>macOS 风格排序算法详解</h2>
            <div class="code-container">
                <div class="code">function macStyleSort(a, b) {
  // 1. 隐藏文件优先处理
  const aIsHidden = a.startsWith('.');
  const bIsHidden = b.startsWith('.');
  
  if (aIsHidden && !bIsHidden) return -1;  // a是隐藏文件，b不是 → a排在前面
  if (!aIsHidden && bIsHidden) return 1;   // b是隐藏文件，a不是 → b排在前面
  
  // 2. 大小写敏感排序（大写字母优先）
  return a.localeCompare(b, undefined, {
    sensitivity: 'case',  // 区分大小写（'A'和'a'不同）
    numeric: true         // 智能识别数字（'10'排在'9'后面）
  });
}</div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>规则</th>
                        <th>说明</th>
                        <th>示例</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>隐藏文件优先</strong></td>
                        <td>以点(.)开头的文件排在最前面</td>
                        <td>.config → AFile → z