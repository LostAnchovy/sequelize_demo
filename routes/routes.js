var express = require('express')
var router = express.Router()
var passport = require('passport');
// var passportlocal = require('passport-local')
var db = require('../config/db.config.js')
const user = require('../controllers/user.controller')
const pet = require('../controllers/pet.controller')
const product = require('../controllers/product.controller.js')

router.get('/form', (req, res)=>{
    res.render('form')
})
router.get('/petform', (req, res)=>{
    res.render('petform')
})

router.get ('/productform' ,(req, res) =>{
    res.render('productform')
})

router.get ('/' ,(req, res) =>{
    res.render('root')
})

router.get ('/home' ,(req, res) =>{
    res.render('home')
})
router.get ('/login' ,(req, res) =>{
    res.render('login')
})

router.post('/api/pets', pet.create);
// creates pet and insert it into the database

router.get('/api/pets', pet.findAll)
// retrieves all pets

router.post('/api/products', product.create);
// creates the products

router.post('/api/users', user.create);
   //creates user and puts into the database

router.get('/api/products', product.findAll); 

// retrieves all products from database

router.get('/api/users', user.findAll);
// retrieves all user from database

module.exports = router;