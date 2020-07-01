//test get/post

const http = require('http');
const fs = require('fs')
const Path = require('path')
const url = require('url')
const template = require('art-template');
const unify = require('./src/response')

http.createServer((req, res) => {
    if (req.method === "POST"){
        req.on('data', function(d){
            console.log(d.toString())
            return;
        })
        req.on('end', ()=>{
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({ko:{koko:99}, ma:'xiaofei'}))
            return;
        })
        return;
    }
    console.log(req.url)
    console.log(req.url.indexOf('static'))
    if (req.url.indexOf('static') === 1) {
        unify(req,res);
        return;
    }
   
    let temstr = template(Path.resolve('./src/index.html'), {
        data:[{name:'xiaofei', value:'叩叩叩'}]
    })
   
    res.end(temstr)

}).listen(8080, function () {
    console.log('启动成功：8080')
})