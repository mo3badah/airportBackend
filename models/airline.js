const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Airline = sequelize.define('airline', {
    AL_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    AL_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    AL_three_letter_code: {
        type: DataTypes.STRING(3),
        allowNull: true,
    },
    AL_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    tableName: 'airline',
    timestamps: false,
});
Airline.hasMany(require('./airport'), {
    through: 'airport_line',
})
Airline.hasMany(require('./flight'), {
    foreignKey: 'AL_id',
})

module.exports = Airline;
