// import user model of db
const Client = require("../models/client");
const sequelize = require("sequelize");
const ClientPhone = require("../models/client_phone");
const ClientPassport = require("../models/client_passport");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { json } = require("express");
const Innovation = require("../models/InnovationModelDB");

let postNewClient = async (req, res) => {
  // check if user founded or not
  try {
    let user = await Client.findOne({ where: { email: req.body.email } });
    if (user)
      return res
        .status(400)
        .send(`user with this email: ${req.body.email} is already exist`);

    let salt = await bcrypt.genSalt(10);
    let hashPswd = await bcrypt.hash(req.body.password, salt);
    let newClient = await Client.create({
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      country: req.body.country,
      email: req.body.email,
      password: hashPswd,
    });
    let newClientPhone = await ClientPhone.create({
      phone: +req.body.phone,
    });
    await newClientPhone.setClient(newClient);
    const token = jwt.sign(
      { userId: `${newClient.id}` },
      "myJsonWebTokenSecretKeyIsHere"
    );
    // send response
    res.header("x-auth-token", token);
    res
      .status(200)
      .send(
        `Ok user: ${req.body.fn} ${req.body.ln} registered with email: ${req.body.email}`
      );
  } catch (e) {
    for (let err in e.errors) {
      console.log(e.errors[err].message);
    }
    res.status(400).send(`Bad Request...`);
  }
};
let getAllClients = async (req, res) => {
  try {
    let users = await Client.findAll({
      include: ClientPhone,
    });
    if (!users) return res.status(404).send("Clients data are not found...");
    res.send(users);
  } catch (e) {
    for (let err in e.errors) {
      console.log(e.errors[err].message);
    }
    res.status(404).send("Clients data are not found...");
  }
};
let addNewClientFromAdmin = async (req, res) => {
  // check if user founded or not
  try {
    let user = await Client.findOne({ where: { email: req.body.email } });
    if (user)
      return res
        .status(400)
        .send(`user with this email: ${req.body.email} is already exist`);
    let salt = await bcrypt.genSalt(10);
    let hashPswd = await bcrypt.hash(req.body.password, salt);
    let newClient = await Client.create({
      Fname: req.body.Fname,
      Mname: req.body.Mname,
      Lname: req.body.Lname,
      email: req.body.email,
      password: hashPswd,
      country: req.body.country,
      state: req.body.state,
      street: req.body.street,
      gender: req.body.gender,
      birth: req.body.birth,
    });
    let newClientPhone = await ClientPhone.create({
      phone: +req.body.phone,
    });
    let newClientPassport = await ClientPassport.create({
      passport: req.body.passport,
    });
    await newClientPhone.setClient(newClient);
    await newClientPassport.setClient(newClient);
    // send response
    res.status(200).send(newClient.fullName + " is added successfully");
  } catch (e) {
    for (let err of e.errors) {
      console.log(e.errors[err].message);
    }
    res.status(400).send(`Can't Add user try again later...`);
  }
};
// update users
let editNewClient = async (req, res) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashPswd = await bcrypt.hash(req.body.password, salt);
    let updClient = await Client.update(
        {
          Fname: req.body.Fname,
          Mname: req.body.Mname,
          Lname: req.body.Lname,
          email: req.body.email,
          password: hashPswd,
          country: req.body.country,
          state: req.body.state,
          street: req.body.street,
          birth: req.body.birth,
          gender: req.body.gender
        },
        { where: { id: req.body.id } }
    );
    console.log(updClient)
    if (req.body.phone){
      let updPhone = await ClientPhone.update(
          {
            phone: +req.body.phone,
          },
          { where: { clientId: req.body.id } }
      );
      console.log(updPhone)
      if (updPhone[0] === 0) await ClientPhone.create({
        phone: +req.body.phone,
        clientId: req.body.id
      });
    }
    if (req.body.passport){
      let updPassport = await ClientPassport.update(
          {
            passport: req.body.passport,
          },
          { where: { clientId: req.body.id } }
      );
        console.log(updPassport)
        if (updPassport[0] === 0) await ClientPassport.create({
            passport: req.body.passport,
            clientId: req.body.id
        }
        );
    }
    if (!updClient)
      return res
        .status(404)
        .send(`Client with email ${req.body.email} is not found to be updated`);
    res.send(updClient);
  } catch (e) {
    for (let err in e.errors) {
      console.log(e.errors[err].message);
    }
    res
      .status(404)
      .send(`Client with email ${req.body.email} is not found to be updated`);
  }
};
let updateToClient = async (req, res) => {
  try {
    let updClient = await Client.updateOne(
      { email: req.body.email },
      {
        $set: {
          flag: false,
        },
      },
      { returnOriginal: false }
    );
    if (!updClient)
      return res
        .status(404)
        .send(`Client with email ${req.body.email} is not found to be updated`);
    res.send(updClient);
  } catch (e) {
    for (let err in e.errors) {
      console.log(e.errors[err].message);
    }
    res
      .status(404)
      .send(`Client with email ${req.body.email} is not found to be updated`);
  }
};
// delete Innovation
let deleteClient = async (req, res) => {
  try {
    let delClient = await Client.findOneAndRemove({ email: req.params.email });
    if (!delClient)
      return res
        .status(404)
        .send(`user with email ${req.params.email} is not found to be deleted`);
    res.send(`deleted successfully : ` + delClient);
  } catch (e) {
    for (let err in e.errors) {
      console.log(e.errors[err].message);
    }
    res
      .status(404)
      .send(`user with email ${req.params.email} is not found to be deleted`);
  }
};
module.exports = {
  postNewClient,
  getAllClients,
  addNewClientFromAdmin,
  editNewClient,
  updateToClient,
  deleteClient,
};
