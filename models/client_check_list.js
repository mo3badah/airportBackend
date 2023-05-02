const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const ClientCheckList = sequelize.define('client_check_list', {
    pasport_number: {
        type: Sequelize.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    fname: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    mnane: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    lname: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    birth:{
        type : Sequelize.DATEONLY,
        allowNull : true
    },
    sex:{
        type : Sequelize.STRING(10),
        allowNull : true
    },
    black_or_gray:{
        type : Sequelize.BOOLEAN,
        allowNull : true
    }
});

module.exports = ClientCheckList;
