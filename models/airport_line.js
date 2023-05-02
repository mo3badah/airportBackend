// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('./sequelize');
//
// const AirportLine = sequelize.define('airport_line', {
//     AL_id: {
//         type: DataTypes.STRING(10),
//         allowNull: false
//     },
//     AP_id: {
//         type: DataTypes.STRING(10),
//         allowNull: false
//     }
// }, {
//     tableName: 'airport_line',
//     timestamps: false,
//     indexes: [
//         {
//             name: 'AP_id',
//             fields: ['AP_id']
//         }
//     ]
// });
//
// AirportLine.belongsTo(Airline, { foreignKey: 'AL_id' });
// AirportLine.belongsTo(Airport, { foreignKey: 'AP_id' });
//
// module.exports = AirportLine;
