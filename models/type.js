const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Type = sequelize.define('type', {
    flight_type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    no_of_first_class_seats: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    no_of_economical_seats: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    no_of_business_seats: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});
module.exports = Type;