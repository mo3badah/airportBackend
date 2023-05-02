// const { DataTypes } = require('sequelize');
// const sequelize = require('./sequelize');
//
// const Serving = sequelize.define('serving', {
//     SSN: {
//         type: DataTypes.STRING(10),
//         allowNull: false,
//         references: {
//             model: 'employee',
//             key: 'SSN'
//         }
//     },
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'client',
//             key: 'ID'
//         }
//     }
// },{
//     indexes: [
//         {
//             name: 'id_index',
//             fields: ['id']
//         }
//     ],
//     timestamps: false
// });
//
// Serving.belongsTo(require('./employee'), { foreignKey: 'SSN' });
// Serving.belongsTo(require('./client'), { foreignKey: 'id' });
//
// module.exports = Serving