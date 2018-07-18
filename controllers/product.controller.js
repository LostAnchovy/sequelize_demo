const db = require('../config/db.config.js');
const Product = require('../controllers/product.controller.js')

exports.create =(req,res)=>{
    Product.create({
        productname: req.body.productname,
        productdescription: req.body.productdescription,
        productimage: req.body.productimage,
    }). then((product)=>{
        res.json(product)
    }). catch((err)=>{
        res.status(501).send({error: 'problem entering product into database'})
    })
}

exports.findAll =(req, res) =>{
    Product.findAll(). then((products)=>{
        res.json(products)
    }).catch((err)=>{
        res.send(500).send({error:'could not retrieve user'})
    })
}