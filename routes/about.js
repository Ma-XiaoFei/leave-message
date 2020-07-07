const express = require('express');
const router = express.Router();


router.get('/', function(req,res,next){
    console.log('-==============')
    res.send('about')
})

router.get('/message/:id', (req,res,next)=>{
    console.log(req.params)
    res.send('about/message')
})

module.exports = router