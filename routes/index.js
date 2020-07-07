const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.get('/', function(req,res,next){
    res.json({data:{a:'n'}})
})
router.post('/', (req,res)=>{
    console.log(req.body)
    res.send(req.body)
})
router.get('/a', function(req,res){
    res.send('aaaaa')

})


module.exports = router;