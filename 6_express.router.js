const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let index = require('./routes/index');
let about = require('./routes/about');
const port = 9000;
app.use('/src',express.static('./src'))

app.post('/message',function (req, res) {
    // res.setHeader('Content-Type', 'text/plain')
    // res.write('you posted:\n')
    console.log(req.body)
    res.end(JSON.stringify(req.body))
  })

// app.use('/',index)
// app.use('/about', about)

app.listen(9000, function(){
    console.log(`${port} running!`)
})
