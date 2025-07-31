const fs = require('fs');
const path = require('path');
const ext =
    /((\.native)|(\.harmony\.js)|(\.native\.js)|(?<!\.android)\.js$|(\.harmony\.jsx)|(\.native\.jsx)|(\.jsx)|(\.harmony\.json)|(\.native\.json)|(\.json)|(\.harmony\.ts)|(\.native\.ts)|(\.ts)|(\.harmony\.tsx)|(\.native\.tsx)|(\.tsx))$/;

const ReadSDKFiles = (pathname, result = '') => {
    const directory = fs.readdirSync(pathname);
    directory.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
    );
    for (let item of directory) {
        let name = path.join(pathname, item);
        const stat = fs.statSync(name);
        if (stat.isFile() && ext.test(name) && !/\.ios/.test(name)) {
            name = name.replace(/\\/g, '/');
            result += `import './${name}'; \n`;
        } else if (stat.isDirectory()) {
            result += ReadSDKFiles(name);
        }
    }
    return result;
};

let result = ReadSDKFiles('./miot-sdk/');
result += `import 'miot'; \n`;
result += `import 'react'; \n`;
result += `import 'react-native'; \n`;
fs.writeFileSync('./index.sdk.js', result);