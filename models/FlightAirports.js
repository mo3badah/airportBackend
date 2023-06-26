const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
// make flightairport table which have flightNumber and airportCodeFrom and airportCodeTo as foreign key
const FlightAirports = sequelize.define(
    "flightAirports",
    {
        airportTo: DataTypes.UUID,
    },
    {
        timestamps: false,
    }
);

module.exports = FlightAirports;