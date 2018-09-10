var express = require('express');
var router = express.Router();
var admin = require('../routes/admin');
router.use('/admin',admin );
router.use('/blog', require(__dirname + '/blog'));
router.use('/signup', require(__dirname +'/signup'));
router.get('/', function(req, res)
{
    res.json(
         {
             "message": "this is homepage"
         }
     )
    
})

//router chat
router.get('/chat', async (req, res) => {
    res.render('blog/chat.ejs', {data: {data: false}})
})


module.exports = router;
