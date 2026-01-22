// 用于压缩打包后的产物
const fs = require('fs');
const archiver = require('archiver');

function zipFolder(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => resolve({ bytes: archive.pointer() }));
        output.on('end', () => { }); // 可选

        archive.on('warning', err => {
            if (err.code === 'ENOENT') console.warn(err);
            else reject(err);
        });
        archive.on('error', err => reject(err));

        archive.pipe(output);
        archive.directory(sourceDir, false); // 第二个参数为 false 表示把目录内容放到根里
        archive.finalize();
    });
}

// 用法
zipFolder('../NativeProject/entry/src/main/resources/rawfile/all', '../NativeProject/entry/src/main/resources/rawfile/all.zip')
    .then(r => console.log('all压缩完成, 字节数:', r.bytes))
    .catch(console.error);

zipFolder('../NativeProject/entry/src/main/resources/rawfile/split', '../NativeProject/entry/src/main/resources/rawfile/split.zip')
    .then(r => console.log('split压缩完成, 字节数:', r.bytes))
    .catch(console.error);
