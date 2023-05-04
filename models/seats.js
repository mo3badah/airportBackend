const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Seats = sequelize.define('seats', {
    seat_no: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: false,
    }
})


module.exports = Seats;