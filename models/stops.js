const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Stops = sequelize.define('stops', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    airport_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        refrences:{
            model: 'airport',
            key: "id"
        }
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false,
    }
});
module.exports = Stops;