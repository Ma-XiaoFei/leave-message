const express = require('express');
let fs = require('fs')
const app = express();
const port = 9000;
app.engine('html', require('express-art-template'));
app.use('/static', express.static('./src/static'));
app.get('/', (req,res)=>{
    res.render('./index.html', {
        data:[1,2]
    })
})

// app.get('/data/ji', function(req,res){
//     console.log(req,res)
//     res.redirect('/my')
// })
app.use(function(req,res,next){
   
    next()
})
app.get(/a/, (req,res)=>{ // 路由包含a都能进来
    // let data = fs.readFileSync('./src/static/images/2.pdf');
    // res.writeHead(200, {"Content-Type":"application/octet-stream"})  //下载文件响应头
    // res.end(data)
    res.json({success:true, data:[1,2,3]})
})

app.listen(port,function(e,r){
    console.log(`${port} running`)
})
