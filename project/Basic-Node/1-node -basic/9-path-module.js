const path = require('path')
//returns the path seperator
console.log(path.sep);

//shows the path of the test.txt
const filePath = path.join('/content','subfolder','test.txt');
console.log(filePath);
//prints the base
const base = path.basename(filePath);
console.log(base);

//returns the absolute path 
const absolute = path.resolve(__dirname,'conten','subfolder','test.txt');
console.log(absolute);