var express = require ('express');
var app = express ();
var port = 3000
var Sequelize = require('sequelize');
var mysql = require('mysql2');
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const connection = new Sequelize('test_db', 'root', 'root', {
    host:'localhost',
    dialect: 'mysql',
    port:'3306',
    operatorsAliases: false,
})

// Models that have been build out by hand in the test_db. If you do npm run it will build out the database with these forms
const User = connection.define('user', {
    firstname: {type: Sequelize.STRING},
    lastname:{type: Sequelize.STRING},
    email:{type: Sequelize.STRING}
})

const Pet = connection.define('pets',{
    firstname: {type: Sequelize.STRING},
    lastname:{type: Sequelize.STRING},
    breed:{type: Sequelize.STRING}
})

connection.sync(). then(()=>{
    Pet.create({
        firstname: 'oscar',
        lastname: 'nguyen',
        breed: 'corgi'
    })
})

// connects to the database and hardcodes in the fields by running connection.syc(). I need to get the form from from.ejs to enter into the database


//creates a sequelize 

app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/form', (req, res)=>{
    res.render('form')
})

// app.post ('/api/users', (req,res)=>{
//     connection.sync() .then (()=>{
//         User.create({
//             firstname =req.body.firstname,
//             lastname = req.body.lastname,
//             email = req.body.email,
//         })
//     })
//     console.log(user)
// })

//my attempt at getting the user to be put into the database


app.get ('/' ,(req, res) =>{
    res.render('root')
})

app.get ('/home' ,(req, res) =>{
    res.render('home')
})

app.listen(`${port}`,()=> console.log(`listening on ${port}`))