const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Flight = sequelize.define('flight', {
    flight_no: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    take_off_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    take_off_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    city_from: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    city_to: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: true
    }
});


module.exports = Flight