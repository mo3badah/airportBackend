const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const ClassDetails = sequelize.define('class_details', {
    class_details_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
ClassDetails.belongsTo(require('./flight'), {foreignKey: 'flight_no', targetKey: 'flight_no'});
ClassDetails.hasMany(require('./seats'))

module.exports = ClassDetails;
