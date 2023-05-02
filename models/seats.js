const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Seats = sequelize.define('seats', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    seat_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    }
})

Seats.belongsTo(require('./class_details'))
Seats.hasOne(require('./ticket'))
module.exports = Seats;