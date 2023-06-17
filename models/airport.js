const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Airline = require('./airline');
const Flight = require('./flight');

const Airport = sequelize.define('airport', {
    AP_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    AP_name: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true
    },
    AP_city: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    AP_state: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    AP_country: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    AP_phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    timestamps: false
});
// make flightairport table which have flightNumber and airportCodeFrom and airportCodeTo as foreign key
const FlightAirports = sequelize.define('flightAirports',{
    airportTo: DataTypes.UUID,
},{
    timestamps: false
});
// Define associations
Flight.belongsToMany(Airport, { through: FlightAirports, foreignKey: 'flightId' });
Airport.belongsToMany(Flight, { through: FlightAirports, foreignKey: 'airportFrom' });


Airport.belongsToMany(Airline, {through: 'airport_line'})
Airline.belongsToMany(Airport, {through: 'airport_line'})


module.exports = Airport
