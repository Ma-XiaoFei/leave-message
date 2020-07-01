const fs = require('fs');
const Path = require('path');
function resolve(src){
    return Path.resolve(src)
}
fs.readFile(resolve('src/test.txt'), 'utf-8', function(err,res){
    // console.log(err)
    // console.log(res)
})
let da = fs.readFileSync('./src/test.txt', 'utf-8')
// console.log(da)

fs.readdir(resolve('src'), function(err,data){
    // console.log(err)
    // console.log(data)
})

fs.writeFile(resolve('src/test.txt'),'哈哈哈😄',function(){})

fs.writeFileSync(resolve('src/学习.js'), 'console.log(1000)')
