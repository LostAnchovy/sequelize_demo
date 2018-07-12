var express = require ('express');
var session = require ('express-session')
var app = express ();
var port = 3000;
var path = require('path');
var brcypt = require('bcrypt')
var Sequelize = require('sequelize');
var mysql = require('mysql2');
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const db = require('./config/db.config.js')

db.connection.sync()
.then(()=>console.log('database has been synced'))
.catch((err)=>console.log('Error creating database'))

//======================Models========================//
//Models that have been build out by hand in the test_db. Sequelize also adds backend validations which i have incorporated into the code below under validate.
const User = db.connection.define('user', {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len:{
                args:[1,50],
                msg: 'please enter a ttile with at least 10 characters'
            }
        }
    },
    lastname:{type: Sequelize.STRING,},
    email:{type: Sequelize.STRING},
    password:{type: Sequelize.STRING},
})

const Pet = db.connection.define('pets',{
    firstname: {type: Sequelize.STRING},
    lastname:{type: Sequelize.STRING},
    breed:{type: Sequelize.STRING}
})

const Product = db.connection.define('products',{
    productname: {type: Sequelize.STRING},
    productdescription: {type: Sequelize.STRING},
    productimage: {type:Sequelize.BLOB},
})

//======================Models========================//

User.beforeCreate((user)=>{
    return brcypt.hash(user.password, 10).then( hash=>{
        user.password = hash
    }). catch((err)=>{
        res.send(501).send({error: 'can not hash password'})
    })
})
//hashes the password before it is put into the database

// connection.sync()
// .then(()=>console.log('database has been synced'))
// .catch((err)=>console.log('Error creating database'))
// connects to the database and provide handers and console.logs

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
// bring in express-session and provide connection token

//==================== ejs routes ===============//
app.get('/form', (req, res)=>{
    res.render('form')
})
app.get('/petform', (req, res)=>{
    res.render('petform')
})

app.get ('/productform' ,(req, res) =>{
    res.render('productform')
})

app.get ('/' ,(req, res) =>{
    res.render('root')
})

app.get ('/home' ,(req, res) =>{
    res.render('home')
})
//==================== ejs routes ===============//

app.post('/api/pets', (req,res)=>{
    Pet.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        breed: req.body.breed,
    }). then((pet) =>{
        res.json(pet)
    }). catch((err)=>{
        res.status(501).send({
            error: "could not add new user to the database"
        })
    })
})

// creates pet and insert it into the database

app.get('/api/pets', (req,res)=>{
    Pet.findAll().then((pet)=>{
        res.json(pet)
    }).catch((err)=>{
        console.log('there was an error getting all the pets')
    })
})

// retrieves all pets

app.post('/api/products', (req,res)=>{
    Product.create({
        productname: req.body.productname,
        productdescription: req.body.productdescription,
        productimage: req.body.productimage,
    }). then((product)=>{
        res.json(product)
    }). catch((err)=>{
        res.status(501).send({error: 'problem entering product into database'})
    })
})

// creates the products

app.post('/api/users', (req,res)=>{
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }). then((user)=>{
        res.json(user)
    }). catch((err)=>{
        res.status(501).send({
            error: "could not add new user to the database"
        })
    })
})

//creates user and puts into the database

app.get('/api/products' ,(req, res) =>{
    Product.findAll(). then((products)=>{
        res.json(products)
    }).catch((err)=>{
        res.send(500).send({error:'could not retrieve user'})
    })
})

// retrieves all users from database

app.get('/api/users' ,(req, res) =>{
    User.findAll(). then((users)=>{
        res.json(users)
    }).catch((err)=>{
        res.send(500).send({error:'could not retrieve user'})
    })
})

//retrieves all users from the database


app.set('view engine', 'ejs')
app.set('views', 'views')

//sets view engines

app.listen(`${port}`,()=> console.log(`listening on ${port}`))
