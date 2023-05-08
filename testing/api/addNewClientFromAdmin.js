const request = require('supertest');
const app = require('../app');
const { Client } = require('../models');

describe('POST /api/addNewClientFromAdmin', () => {
    const clientData = {
        Fname: 'John',
        Mname: 'Doe',
        Lname: 'Smith',
        email: 'johndoesmith@example.com',
        password: 'password123',
        country: 'USA',
        state: 'CA',
        street: '123 Main St',
        gender: 'M',
        birth: '1990-01-01',
        phone: '555-1234',
        passport: 'ABC123XYZ'
    };

    beforeEach(async () => {
        await Client.destroy({ where: { email: clientData.email } });
    });

    test('should add a new client', async () => {
        const res = await request(app)
            .post('/api/addNewClientFromAdmin')
            .send(clientData);

        expect(res.statusCode).toEqual(200);
        expect(res.text).toMatch(`${clientData.Fname} ${clientData.Lname} is added successfully`);
        const client = await Client.findOne({ where: { email: clientData.email } });
        expect(client).toBeDefined();
        expect(client.Fname).toEqual(clientData.Fname);
        expect(client.Mname).toEqual(clientData.Mname);
        expect(client.Lname).toEqual(clientData.Lname);
        expect(client.email).toEqual(clientData.email);
        expect(await client.checkPassword(clientData.password)).toBe(true);
        expect(client.country).toEqual(clientData.country);
        expect(client.state).toEqual(clientData.state);
        expect(client.street).toEqual(clientData.street);
        expect(client.gender).toEqual(clientData.gender);
        expect(client.birth.toISOString()).toEqual(new Date(clientData.birth).toISOString());
        const clientPhone = await client.getClientPhone();
        expect(clientPhone).toBeDefined();
        expect(clientPhone.phone).toEqual(parseInt(clientData.phone));
        const clientPassport = await client.getClientPassport();
        expect(clientPassport).toBeDefined();
        expect(clientPassport.passport).toEqual(clientData.passport);
    });

    test('should return 400 if client with same email already exists', async () => {
        await Client.create(clientData);
        const res = await request(app)
            .post('/api/addNewClientFromAdmin')
            .send(clientData);

        expect(res.statusCode).toEqual(400);
        expect(res.text).toMatch(`User with email ${clientData.email} already exists.`);
    });
});
