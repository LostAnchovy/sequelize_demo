module.exports = (connection,Sequelize)=>{
    const Pet = connection.define('pets',{
        firstname: {type: Sequelize.STRING},
        lastname:{type: Sequelize.STRING},
        breed:{type: Sequelize.STRING}
    })
    return Pet;
}
