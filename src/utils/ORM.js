const Sequelize = require('sequelize')

const MySequelize = new Sequelize('poverty_alleviation','root','123456',{
    host:'localhost',
    port:'3306',
    dialect:'mysql',
    pool:{
        max:20,
        min:5,
        idle:10000,
    }
})

module.exports = MySequelize