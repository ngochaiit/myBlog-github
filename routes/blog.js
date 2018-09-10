var express = require('express');
var router = express.Router();
import Post from "../models/Post";

/* GET blog interface */
router.get('/', async function(req, res, next) {
  try{
    const result = await Post.findAll(
      {
        attributes: ['id','title','content','author','created_at','updated_at']
      }
    );
    res.render('blog/index.ejs',{data: {result : result}});
  }
  catch(error)
  {
    res.render('blog/index.ejs', {data: {error: "get Post data is error"}})
  }
});



//get detail post:

router.get('/post/:id', async (req,res) => {
  try{
    const params = req.params;
    const posts = await Post.findOne(
      {
        attributes: ['id','title','content','author','created_at','updated_at'],
        where:
        {
          id: params.id,
        }
      }
    )
    console.log(posts);

  res.render('blog/post.ejs', {data: {posts: posts}});

  }
  catch(error)
  {
    res.json(
      {
        result: "fialed",
        data: {},
        message: `can not load the post website ${error}`
      }
    )
  }


})
//router about me
router.get('/aboutme', (req, res) =>
{
  try
  {
    res.render('blog/about.ejs', {data: {data: false}});

  }
  catch(error)
  {
    res.json(
      {
        result:'failed',
        data: {},
        message: `can not load about page ${error}`
      }
    )
  }
})

module.exports = router;