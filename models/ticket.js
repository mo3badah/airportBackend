const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Ticket = sequelize.define('ticket', {
    ticket_number: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    time_of_booking: {
        type: DataTypes.TIME,
        allowNull: true
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    }
});

Ticket.belongsTo(require('./client'), { foreignKey: 'id' });
Ticket.belongsTo(require('./payment'), { foreignKey: 'payment_id' });
Ticket.belongsTo(require('./flight'));
Ticket.belongsTo(require('./seats'));
Ticket.hasOne(require('./ticket_cancel'));

module.exports = Ticket