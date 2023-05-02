const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const ClientPhone = sequelize.define('client_phone', {
    phone: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'client_phone',
    timestamps: false,
});
ClientPhone.belongsTo(require('./client'))

module.exports = ClientPhone;
