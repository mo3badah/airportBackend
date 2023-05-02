const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Airport = sequelize.define('airport', {
    AP_id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    AP_name: {
        type: DataTypes.STRING(20),
        allowNull: true
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
    tableName: 'airport',
    timestamps: false
});
Airport.hasMany(require('./employee'), {foreignKey: 'AP_id'})
Airport.hasMany(require('./airline'), {
    through: 'airport_line',
})
module.exports = Airport;
