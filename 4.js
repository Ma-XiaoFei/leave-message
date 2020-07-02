const fs = require('fs');
const http = require('http');
const Path = require('path');
const template = require('art-template');
let query = require('querystring')
let {
    Resolve,
    readFile
} = require('./src/utils')
const unify = require('./src/response');


http.createServer(function (req, res) {
    let url = req.url;
    let dataJson = fs.readFileSync('./mock/data.json');
    dataJson = JSON.parse(dataJson);
    if (url.indexOf('static') === 1) {
        unify(req, res);
        return
    }
    if (url === '/') res.end(template(Resolve('index.html'), {
        data:dataJson
    }));
    if (url === '/message' && req.method === 'GET') {
        readFile(Resolve('leave_message.html')).then(data => {
            res.end(data)
        })
        return;
    }
    if (url === '/message' && req.method === 'POST') {
        req.on('data',function(data){
            let time = new Date();
            data = query.parse(data.toString());
            data.date = `${time.getFullYear()}-${time.getMonth()+1 < 10 ? '0' + (time.getMonth()+1):time.getMonth()+1}-${time.getDate()< 10 ? '0' + time.getDate():time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
            dataJson.push(data)
            fs.writeFileSync('./mock/data.json', JSON.stringify(dataJson))

        })
        req.on('end', function(){
            res.writeHead(302,{
                "Location":"/"
            })
            res.end()
        })
        
        return;
    }


    res.end('404 not found')

}).listen(3000, function () {
    console.log('3000端口启动！！！')
})