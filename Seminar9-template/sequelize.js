const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/seminar9.db'
})


module.exports = sequelize;