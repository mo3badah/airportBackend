const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Flight = require('./flight');

const Airline = sequelize.define('airline', {
    AL_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    AL_name: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    AL_three_letter_code: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
        unique: true
    },
    AL_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    tableName: 'airline',
    timestamps: false,
});

Airline.hasMany(Flight)
Flight.belongsTo(Airline)

module.exports = Airline;
