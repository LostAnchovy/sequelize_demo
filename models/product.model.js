module.exports =(connection, Sequelize) =>{
    const Product = connection.define('products',{
        productname: {type: Sequelize.STRING},
        productdescription: {type: Sequelize.STRING},
        productimage: {type:Sequelize.BLOB},
    })
    return Product;
}