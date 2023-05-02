const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const BiometricData = sequelize.define('biometric_data', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    face: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    finger: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    iris: {
        type: DataTypes.BLOB,
        allowNull: true
    }
}, {
    tableName: 'biometric_data',
    timestamps: false
});

BiometricData.hasOne(require('./client'));

module.exports = BiometricData;
