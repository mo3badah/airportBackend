const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const BiometricData = sequelize.define('biometric_data', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
    timestamps: false
});


module.exports = BiometricData;
