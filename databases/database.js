const Sequelize = require('sequelize');
const sequelize = new Sequelize(
'login',//db name
'postgres', //userName
'123',
{
    dialect: 'postgres',
    host: 'localhost',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    }

}
);
 const Op = Sequelize.Op;
 module.exports = {
     sequelize,
     Op
 }
