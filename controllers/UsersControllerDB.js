// import user model of db
const Client = require("../models/client");
const sequelize = require('sequelize')
const ClientPhone = require("../models/client_phone");
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
      return (
        res
          .status(400)
          .send(`user with this email: ${req.body.email} is already exist`)
      );

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
        phone: +req.body.phone
    })
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
      include: ClientPhone
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
    let user = await Client.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send(`user with this email: ${req.body.email} is already exist`);

    let salt = await bcrypt.genSalt(10);
    let hashPswd = await bcrypt.hash(req.body.password, salt);
    let newClient = new Client({
      fn: req.body.fn,
      ln: req.body.ln,
      age: req.body.age,
      flag: false,
      email: req.body.email,
      password: hashPswd,
    });
    await newClient.save();
    // send response
    res.status(200).send(newClient);
  } catch (e) {
    for (let err in e.errors) {
      console.log(e.errors[err].message);
    }
    res.status(400).send(`Can't Add user try again later...`);
  }
};
// update users
let updateToAdminClient = async (req, res) => {
  try {
    let updClient = await Client.updateOne(
      { email: req.body.email },
      {
        $set: {
          flag: true,
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
  updateToAdminClient,
  updateToClient,
  deleteClient,
};
