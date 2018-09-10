var express = require('express');
var router = express.Router();

import Post from "../models/Post";
import User from "../models/User";

/* GET users listing. */
router.get('/',async function(req, res, next) {
  if(req.session.userLogin)
  {
    try{
  
      const posts = await Post.findAll(
        {
          attributes: ['id','title','content','author','created_at','updated_at']
        }
      );
      res.render("dashboard.ejs", {data: {posts: posts} });
     }
     catch(error)
     {
      res.render("dashboard.ejs", {data: {error: "Get Post data is error"}});
     }
  }
  else
  {
    res.redirect('login');
  }
 
 
 
});

//insert database
router.post('/post/new', async function(req,res)
{
  let params = req.body;
  let timeUpdate = new Date();
  params.created_at = timeUpdate;
  params.updated_at = timeUpdate;

  try{
    let newPost = await Post.create(
      {
        title: params.title,
        content: params.content,
        author: params.author,
        created_at: params.created_at,
        updated_at: params.updated_at,
      },
      {
        fields: ["title", "content","author","create_at","updated_at"]
      }
    );
    console.log(newPost);
    if(newPost)
    {
     
      res.json(
        {
          result: 'ok',
          data: newPost,
          message: `Insert a new post successfull`
        }
      );
    }
    else
    {
      res.json(
        {
          result: 'failed',
          data: {},
          message: `Insert a new post failed`
        }
      );
    }
  }
  catch(error)
  {
    res.json(
      {
        result: "failed",
        data: {},
        message: `Insert a new post failed. Error: ${error}`
      }
    )
  }

});
  
//router post news:
router.get("/post/new", async function(req, res)
{
  if(req.session.userLogin)
  {
    res.render("admin/new.ejs",{data: {error:false}});
  }
  else
  {
    res.redirect('/login');
  }
 
})

//router delete
router.delete('/', async (req,res) => 
{
  const params = req.body.id;
  console.log(req.body);
  try
  {
    let deleteRows = await Post.destroy(
      {
        where: {
          id: params,

        }

      }
    );
    // res.render("dashboard.ejs", {data: {error:false}});
    res.json({
      result: 'ok',
      message: 'Delete a post successfully',
      count: deleteRows,
});
  }
  catch(error)
  {
    res.json(
      {
        result: "failed",
        data: {},
        message: `delete a post failed. Error: ${error}`
      }
    );

  }

})
//router edit

router.get("/post/edit/:id", async function(req, res)
{
  if(req.session.userLogin)
  {
    const params = req.params;
  const id = params.id;
  
  res.render("admin/edit.ejs",{data: {data: params}});
  }
  else
  {
    res.redirect('/login');
  }
})

//edit database

router.put("/post/edit/:id", async(req, res) =>
{
  const params = req.body;
  const id = params.id;
  const title = params.title;
  const author = params.author;
  const content = params.content;
  console.log(title);
  console.log(id);
  try{
    let editPost = await Post.findOne(
      {
        attributes: ['id','title','content','author','created_at','updated_at'],
        where:
        {
          id: id,
        }

      }
    );
   
    if(editPost)
    {
      
         editPost.update(
          {
            title: title ? title : editPost.title,
            content: content ? content : editPost.content,
            author: author ? author : editPost.author,
           

          }
        );
      
      res.json(
        {
          result: "ok",
          data: editPost,
          massage: "Update a post successfully"
        
        }
      );
    } 
    else
    {
      res.json(
        {
          result: 'fail',
          data: {},
          message: "cannot find a Post to update"
        }
      )
    }
    

  }
  catch(error)
  {
    res.json(
      {
        result: 'failed',
        data:{},
        message: `can not update a Post. Error: ${error}`
      }
    )
  }
});
//router get User:

router.get('/user', async (req, res) =>
{
  if(req.session.userLogin)
  {
    try{
      const users = await User.findAll(
        {
          attributes: ["id", "name", "email", "password"]
        }
      )
      if(users.length > 0)
      {
        res.render("admin/user.ejs", {data: {users: users} });
      }
      else
      {
        res.render("admin/user.ejs", {data: {error: "there is no users in this database"} });
      }
    }
    catch(error)
    {
      res.render("admin/user.ejs", {data: {error: "Get Post data is error"}});
    }
  }
  else
  {
    res.redirect('/login');
  }

})
          

module.exports = router;
