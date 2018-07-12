var express = require('express')
var router = express.Router()
var db = require('../config/db.config.js')

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


router.post('/api/pets', (req,res)=>{
    db.pet.create({
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

router.get('/api/pets', (req,res)=>{
    db.pet.findAll().then((pet)=>{
        res.json(pet)
    }).catch((err)=>{
        console.log('there was an error getting all the pets')
    })
})

// retrieves all pets

router.post('/api/products', (req,res)=>{
    db.product.create({
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

router.post('/api/users', (req,res)=>{
    db.user.create({
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

router.get('/api/products' ,(req, res) =>{
    db.product.findAll(). then((products)=>{
        res.json(products)
    }).catch((err)=>{
        res.send(500).send({error:'could not retrieve user'})
    })
})

// retrieves all users from database

router.get('/api/users' ,(req, res) =>{
    db.user.findAll(). then((users)=>{
        res.json(users)
    }).catch((err)=>{
        res.send(500).send({error:'could not retrieve user'})
    })
})

module.exports = router;