const db = ('../config/db.config.js')
const brcypt = require('bcrypt')
const Sequelize = require('sequelize')

module.exports = (connection, Sequelize) =>{
    const User = connection.define('user', {
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
        username:{type: Sequelize.STRING},
        password:{type: Sequelize.STRING},
    })
    return User;
}
