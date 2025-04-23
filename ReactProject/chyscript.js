const { execSync } = require("child_process");
console.log(`目录为目录: ${process.cwd()}`);
// execSync("npm run dev", { 
//     cwd: './assets',
//     stdio: "inherit" 
// });
// execSync("ls -la").toString();
const output = execSync("npm run dev", { 
    cwd: './assets',
    stdio: "inherit" 
});
console.log(output);
// npm run dev
// const { execSync } = require('child_process');

// try {
//     // 假设当前目录结构下有一个名为 subdir 的子目录
//     // 相对路径相对于当前 Node.js 进程的工作目录
//     const relativePath = './assets';

//     // 执行命令，设置 cwd 为相对路径
//     const result = execSync('ls', { 
//         cwd: './assets' ,
//         stdio: "inherit" 
//     });

//     // 输出命令执行结果
//     console.log(result);
// } catch (error) {
//     console.error(`命令执行出错: ${error.message}`);
// }    