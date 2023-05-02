const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const {DataTypes} = require("sequelize");

const Client = sequelize.define('client', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    birth: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    Fname: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    Mname: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    Lname: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    country: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    state: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    street:{
        type : Sequelize.STRING(45),
        allowNull : true
    },
    gender:{
        type : Sequelize.STRING(45),
        allowNull : true
    },
    fullName: {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.Fname} ${this.Mname} ${this.Lname}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    },
    age: {
        // this function to get the age from the birthdate without further calculations for every time
        type: Sequelize.VIRTUAL,
        get() {
            let today = new Date();
            let birthDate = new Date(this.birth);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    },
    // set full address data from the street and state and country
    fullAddress: {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.street}, ${this.state}, ${this.country}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    }
});
// this client model is connected to another model biometric_data one to one
Client.belongsTo(require('./biometric_data'));
// this client model is connected to another model payment one to many
Client.hasMany(require('./payment'));
// this client model is connected to another model employee many to many
Client.belongsToMany(require('./employee'), {through: 'client_employee'}
    );
// is connected to another model ticket one to many and have some attributes on relation are class extra kilo date_of_booking WBags source destination
Client.hasMany(require('./ticket'), {foreignKey: 'id'});
Client.hasMany(require('./ticket_cancel'))
Client.hasMany(require('./client_passport'));
Client.hasMany(require('./client_phone'));

module.exports = Client