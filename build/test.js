const fs = require('fs');
const path = require('path');

const str = fs.readFileSync(path.join(__dirname, './cn.html'), {
    encoding: 'utf-8'
});
console.log(str.replace(/{{CONTENT}}/g, '中国'))