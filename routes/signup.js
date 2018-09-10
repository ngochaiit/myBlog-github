var express = require('express');
var router = express.Router();
var getHashPassword = require('../helper/helper').getHashPassword;

import User from '../models/User';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup.ejs', {data: {}});
});
router.post('/', async function(req, res)
{
  const user = req.body;
  
  
  if(user.name.trim().length == 0)
  {
    res.render('signup.ejs', {data: {error: 'Name is required', XXX:2}});
  }
  if(user.email.trim().length == 0)
  {
    res.render('signup.ejs', {data: {error: 'Email is required', XXX:1}});
  }
  if(user.password != user.repassword && user.repassword.trim().length != 0)
  {
    res.render('signup.ejs', {data: {error: "Password is not match"}});
    
  }

  //insert to DB
  try{
    let password = await getHashPassword(user.password);
    console.log(`password = ${password}`);
    
    let newUser = await User.create(
      {
        name: user.name,
        email: user.email,
        password: password,

      },
      {
        fields: ["name", "email","password"]
      }
    );
console.log(user);
    if(newUser)
    {
      newUser.password = "not show"
      res.redirect("/login");

      res.json(
        {
          result: 'ok',
          data: newUser,
          message: `Insert a new Users successfull`
        }
      )
      res.redirect("/signin");
    }
    else
    {
      res.json(
        {
          result: 'failed',
          data: {},
          message: `Insert a new Users failed`
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
        message: `Insert a new User failed. Error: ${error}`
      }
    )
  }

});

module.exports = router;
