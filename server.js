var express = require ('express');
var app = express ();
var port = 3000
var Sequelize = require('sequelize');
var mysql = require('mysql2');
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

var connection = new Sequelize('test_db', 'root', 'root', {
    host:'localhost',
    dialect: 'mysql',
    port:'3306',
    operatorsAliases: false,
})

// Sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

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

// connection.sync(). then(()=>{
//     Pet.create({
//         firstname: 'oscar',
//         lastname: 'nguyen',
//         breed: 'corgi'
//     })
// })

// connects to the database and hardcodes in the fields by running connection.syc(). I need to get the form from from.ejs to enter into the database


// Pet.findOne().then(pets =>{
//     console.log(pets.get('firstname'))
// })

//creates a sequelize 

app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/form', (req, res)=>{
    res.render('form')
})

app.get('/petform', (req, res)=>{
    res.render('petform')
})


// app.post('/api/users', (req,res)=>{
//     User.create({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.lastname,
//     }). then((user)=>{
//         res.status(201).send(user)
//     }). catch((err)=>{
//         res.status(501).send({
//             erro: "could not add new user to the database"
//         })
//     })
// })

app.post('/api/pets', (req,res)=>{
    Pet.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        breed: req.body.breed,
    }). then((user)=>{
        res.redirect('/home')
    }). catch((err)=>{
        res.status(501).send({
            error: "could not add new user to the database"
        })
    })
})

app.post('/api/users', (req,res)=>{
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.lastname,
    }). then((user)=>{
        res.redirect('/')
    }). catch((err)=>{
        res.status(501).send({
            error: "could not add new user to the database"
        })
    })
})
// app.post('/api/users', (res,req)=>{
//     User.create({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//     }). then((user)=>{
//         res.redirect ('/')
//     }).catch((err)=>{
//         res.statusCode(501).send({
//             error: "could not add new user to the database"
//         })
//     })
// })

//my attempt at getting the user to be put into the database


app.get ('/' ,(req, res) =>{
    res.render('root')
})

app.get ('/home' ,(req, res) =>{
    res.render('home')
})

app.listen(`${port}`,()=> console.log(`listening on ${port}`))