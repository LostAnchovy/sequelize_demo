const env = require('./env.js')
const Sequelize = require ('sequelize')

const connection = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
      }
})

const db = {}

db.Sequelize = Sequelize
db.connection = connection

// db.pet = require('../models/pet.model.js')(connection,Sequelize);
// db.product = require ('../models/product.model.js')(connection, Sequelize);
// db.user = require ('../models/user.model.js')(connection,Sequelize);

// import project models here


// Set the relationship between the models here

module.exports = db;