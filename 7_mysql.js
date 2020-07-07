const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyPaser = require('body-parser');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'xiaofei',
    database : 'student'
})
connection.connect();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*")
    next();
})

app.get('/p', function(req,res){
    let data = JSON.stringify({a:99,n:[1,'3']});
    connection.query(`update students set name='${data}'`, function(err, result, filed){

    console.log(err);
    res.send('99')
})
})
app.get('/', function(req,res){
    connection.query('select name from students', function(err, result, filed){
        console.log()
        if (err) return;
        let data = [];
        result.forEach(y => {
            console.log(y)
            data.push(JSON.parse(y.name))
        });
        console.log(data)
        res.json(data);
    })

   
})
app.get('/post', function(req,res){
    connection.query('insert into `students`(`name`,`age`,`desc`, `like`)VALUES("马晓飞", "18","是好", "hello")')
    res.json({success:true})
})
app.get('/m', function(rq,res){
    let data = JSON.stringify({a:999,b:[1,2,3,'4']});
    console.log(`insert into students(name,age)values('${data}',9)`)
    connection.query(`insert into students(name,age)values('${data}',9)`, function(err,result){
        console.log(err,result)
    })
    res.send('success');
})


app.listen(8080, function(){
    console.log('8080 running')
})