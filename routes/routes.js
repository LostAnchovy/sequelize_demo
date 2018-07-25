var express = require('express')
var router = express.Router()
var passport = require('passport');
var db = require('../config/db.config.js')
const user = require('../controllers/user.controller');
const pet = require('../controllers/pet.controller');
const product = require('../controllers/product.controller.js');
const fetch = require ('node-fetch')
const https =require('https')


router.get('/signup', (req, res)=>{
    res.render('signup')
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

router.get ('/success' ,(req, res) =>{
    res.render('success')
})

router.get('/update', (req,res)=>{
    res.render('update')
})
router.get ('/login' ,(req, res) =>{
    // fetch('https://api.github.com/users/github').then(response=>response.json())
    // .then(json=>console.log(json))
    // .catch(err=>{throw err}) 
    res.render('login')
  });
 

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login',
    successRedirect: '/success',
  }))

router.post('/api/pets', pet.create);
// creates pet and insert it into the database

router.get('/api/pets', pet.findAll)
// retrieves all pets

router.post('/api/products', product.create);
// creates the products

router.post('/api/signup', user.create);
   //creates user and puts into the database

router.get('/api/products', product.findAll); 

// retrieves all products from database

router.get('/api/users', user.findAll);
// retrieves all user from database

// router.put ('/api/users/edit', user.update);

router.put('/api/users/edit', (req,res)=>{
    db.user.update({
        where:{id:1},
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password        
    }).then((updatedUser)=>{
        res.json(updatedUser)
    }).catch(err=>{
        throw err
    })
})

router.get('/user/1', (req,res)=>{
    db.user.findAll({
        where:{id:4}
    }).then((user)=>{
        res.json(user)
    }).catch(err=>{
        throw err
    })
})

router.get('/logout', (req,res)=>{
    req.session.destroy();
    res.clearCookie('connect.sid',[])
    res.redirect('/')
})

module.exports = router;