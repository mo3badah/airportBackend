const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const TicketCancel = sequelize.define('ticket_cancel', {
    money_returned: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
},{
    timestamps: false
});


module.exports = TicketCancel