var express = require('express');
var router = express.Router();
router.use('/admin', require(__dirname +'/admin'));
router.use('/blog', require(__dirname + '/blog'));
router.use('/signup', require(__dirname +'/signup'));
router.get('/', function(req, res)
{
    // res.json(
    //     {
    //         "message": "this is homepage"
    //     }
    // )
    
})


module.exports = router;
