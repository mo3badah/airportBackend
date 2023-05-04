const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const {DataTypes} = require("sequelize");
const ClientPassport = require("./client_passport");
const ClientPhone = require('./client_phone')
const BiometricsData = require('./biometric_data')
const Ticket = require('./ticket')
const Employee = require('./employee')
const TicketCancel = require("./ticket_cancel");
const Payment = require("./payment");

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
    birth:{
        type : Sequelize.DATE,
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

Client.hasMany(Payment);
Payment.belongsTo(Client);
Client.hasMany(TicketCancel, { foreignKey: 'client_id' })
TicketCancel.belongsTo(Client, { foreignKey: 'client_id' });
Payment.hasMany(TicketCancel, { foreignKey: 'payment_id' })
TicketCancel.belongsTo(Payment, { foreignKey: 'payment_id' });

Client.hasMany(Ticket);
Ticket.belongsTo(Client);

Client.hasMany(ClientPassport);
ClientPassport.belongsTo(Client);

Client.hasMany(ClientPhone);
ClientPhone.belongsTo(Client);

Client.hasMany(BiometricsData);
BiometricsData.belongsTo(Client);

Employee.belongsToMany(Client, { through: 'client_employee' });
Client.belongsToMany(Employee, { through: 'client_employee' });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = Client