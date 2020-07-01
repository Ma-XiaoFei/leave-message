const http = require('http');
const fs = require('fs');
const Path = require('path');
function resolve(path){
    return Path.resolve(path)
}
const server = http.createServer();

server.on('request', function(req,res){
    console.log(req.url)
    if (req.url === '/my'){
        let data = fs.readFileSync(resolve('src/index.html'),'utf-8')
        res.end(data);
    }
    res.end('404  not found');
})
server.listen(9000, function(){
    console.log('服务启动9000端口启动成功')
})