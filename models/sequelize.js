const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('GraduationProject', 'root', 'Password123#@!', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
