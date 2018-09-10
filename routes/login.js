var express = require('express');
var router = express.Router();
var deHashPassword = require('../helper/helper').deHashPassword;

import User from '../models/User';
//sign in
router.get('/', async function(req, res)
{
  res.render('login.ejs', {data: {}});
});
router.post('/', async function(req,res)
{
    try{
      let param = req.body;
      if(param.name.trim().length == 0)
      {
        res.render('login.ejs',{data: {error: "name account is required"}});
      }
     else if(param.password.trim().length == 0)
      {
        res.render('login.ejs',{data: {error: "please enter your password"}});
      }
      else
      {
        let userLogin = await User.findOne(
          {
            attributes: ["name", "password"],
            where: {
              name: param.name,
            }
          }
        );

        let dePassword = await deHashPassword(param.password, userLogin.password);
        
        if(userLogin && dePassword)
        {
          // res.json(
          //   {
          //     result: 'ok',
          //     data: userLogin[0],
          //     message: `Login user successully`
            
          //   }
          // );
          req.session.userLogin = userLogin;
          console.log(req.session);
          console.log("idiot");
          res.redirect("/admin");
         
        }
        else
        {
          res.render('login.ejs',{data: {error: "Your name account or your password is wrong"}})
          console.log(dePassword);
        }
        

      }

    }
    catch(error)
    {
      res.json(
        {
          result: "failed",
          data: {},
          message: `Session login is failed. Error: ${error}`,
        }
      )
        
    }

});
module.exports = router;