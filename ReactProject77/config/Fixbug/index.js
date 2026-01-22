
const path = require('path');
const fs = require("fs");
const map = new Map();

// 修复metro打包时，动态导入语法(import())包裹default的问题
map.set("node_modules/metro-runtime/src/modules/asyncRequire.js", "asyncRequire.js");

module.exports = {
  findContent(mpath) {
    const real = map.get(mpath);
    return real ? fs.readFileSync(path.join(__dirname, real)) : null;
  },
};
