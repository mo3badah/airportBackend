const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Seats = require('./seats');
const Flight = require('./flight');

const ClassDetails = sequelize.define('class_details', {
    class_details_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    class: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    weight_limit: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    extra_luggage_price: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
}, {
    tableName: 'class_details',
    timestamps: false
});

ClassDetails.hasMany(Seats);
Seats.belongsTo(ClassDetails);

Flight.belongsToMany(ClassDetails, { through: 'flight_class_details' });
ClassDetails.belongsToMany(Flight, { through: 'flight_class_details' });

module.exports = ClassDetails;
