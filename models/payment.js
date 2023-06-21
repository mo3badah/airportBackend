const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Payment = sequelize.define('payment', {
    card_number: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        allowNull: false
    },
    card_holder_name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    card_expiry_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    card_cvv: {
        type: DataTypes.STRING(3),
        allowNull: true
    }
},{timestamps: false});



module.exports = Payment