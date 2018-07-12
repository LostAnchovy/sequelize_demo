var express = require ('express');
var session = require ('express-session')
var app = express ();
var port = 3000;
var path = require('path');
var brcypt = require('bcrypt')
var Sequelize = require('sequelize');
var mysql = require('mysql2');
var bodyparser = require('body-parser');
const db = require('./config/db.config.js')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(require('./routes/routes.js'))


db.user.beforeCreate((user)=>{
    return brcypt.hash(user.password, 10).then( hash=>{
        user.password = hash
    }). catch((err)=>{
        res.send(501).send({error: 'can not hash password'})
    })
})
//hashes the password before it is put into the database

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
