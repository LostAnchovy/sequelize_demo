const db = require('../config/db.config.js');
const Pet = db.pet

exports.findAll =(req,res)=>{
    Pet.findAll().then((pet)=>{
        res.json(pet)
    }).catch((err)=>{
        console.log('there was an error getting all the pets')
    })
}

exports.create =(req,res)=>{
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
}
