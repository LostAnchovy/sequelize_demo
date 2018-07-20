const db = require('../config/db.config.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = db.user;


// exports.create =(req,res)=>{
//     User.create({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password,
//     }). then((user)=>{
//         res.json(user)
//     }). catch((err)=>{
//         res.status(501).send({
//             error: "could not add new user to the database"
//         })
//     })
// }

exports.create = (req, res, next)=>{
    User.findOne({
      where: {
       username: req.body.username
      }
    }).then((user)=>{
      if(!user){
        User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 10)
        }).then((user)=>{
          passport.authenticate("local", {failureRedirect:"/signup", successRedirect: "/success"})(req, res, next)
        })
      } else {
        res.send("user exists")
      }
    })
  }
  

exports.findAll =(req, res) =>{
    User.findAll(). then((users)=>{
        res.json(users)
    }).catch((err)=>{
        res.send(500).send({error:'could not retrieve user'})
    })
}
