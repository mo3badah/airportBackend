const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const TicketCancel = sequelize.define('ticket_cancel', {
    time_of_cancel: {
        type: DataTypes.TIME,
        allowNull: true
    },
    money_returned: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
},{
    timestamps: false
});

TicketCancel.belongsTo(require('./client'), { foreignKey: 'id' });
TicketCancel.belongsTo(require('./ticket'), { foreignKey: 'ticket_number' });
TicketCancel.belongsTo(require('./payment'), { foreignKey: 'payment_id' });

module.exports = TicketCancel