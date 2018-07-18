var express = require ('express');
var session = require ('express-session')
var app = express ();
var port = 3000;
var path = require('path');
var brcypt = require('bcrypt')
var passport = require('passport');
var Sequelize = require('sequelize');
var mysql = require('mysql2');
var passport = require('passport');
var Localstrategy = require('passport-local').Strategy
var bodyparser = require('body-parser');
const db = require('./config/db.config.js')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(require('./routes/routes.js'))

// passport.use( new Localstrategy, (username, password, done)=>{
//     db.user.findone({
//         where:{username: username}
//     },(err, user)=>{
//         if(err){
//             console.log('error finding user')
//         }
//         if(!user){
//             return done(null, false);
//         }
//         if(user.password != password){
//             return done(null, false);
//         }
//         return done(null, user)
//     })
// })

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) =>{
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
  });

passport.deserializeUser((user, done) =>{
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});  


db.user.beforeCreate((user)=>{
    return brcypt.hash(user.password, 10).then( hash=>{
        user.password = hash
    }). catch((err)=>{
        res.send(501).send({error: 'can not hash password'})
    })
})
// hashes the password before it is put into the database

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
// bring in express-session and provide connection token

app.set('view engine', 'ejs')
app.set('views', 'views')

//sets view engines

app.listen(`${port}`,()=> console.log(`listening on ${port}`))
