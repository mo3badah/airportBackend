const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Airport = require("./airport");

const Employee = sequelize.define('employee', {
    SSN: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    Fname: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    Lname: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    Mname: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    sex: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    job_title: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    salary: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
});

Employee.belongsTo(Employee, { foreignKey: 'sup_ssn' });

Airport.hasMany(Employee)
Employee.belongsTo(Airport)


module.exports = Employee
