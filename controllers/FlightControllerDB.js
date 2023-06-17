// import user model of db
const Flight = require("../models/flight");
const Airport = require("../models/airport");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const Airline = require("../models/airline");
const Stops = require("../models/stops");
const Types = require("../models/type");
const ClassDetails = require("../models/class_details");
// let flight_number = require("../util/flightNameGen");

async function createNewFlight(flight) {
    // create flight number from module ==> util/flightNameGen.js
  let prefix = Math.floor(Math.random() * 100) + 1; // Generate a random prefix between 1 and 100
  let suffix = Math.random().toString(36).substring(3, 6).toUpperCase(); // Generate a random alphanumeric suffix
  let flight_number = `${prefix}${suffix}`;
  // create flight stops
  let stops = flight.stops;
  let noOfStops = stops.length;
  // get the type of the flight
  let type = await Types.findOne({
      where: { type: flight.type },
  });
  if (!type) {
    type = {"no_of_economical_seats": 24, "no_of_business_seats": 144}
  }
  // get class details
  let class_details = flight.class_details;
  let newFlight = await Flight.create({
      flight_number: flight_number,
      take_off_time: flight.take_off_time,
      take_off_date: flight.take_off_date,
      status: flight.status,
      duration: flight.duration,
      no_of_stops: noOfStops,
    });
  if (noOfStops > 0) {
    stops.forEach(stop => async () =>{
      let newStop = await Stops.create({
        flight_id: newFlight.id,
        date: stop.date,
        time: stop.time,
        airport_id: stop.airport_id,
        duration: stop.duration,
      });
    });
  }
  // create classes
  let newClassesEco = await ClassDetails.create({
    flightId: newFlight.id,
    class: class_details[0].class,

  })
  // get all the airports from the request
    let airportFrom = await Airport.findOne({
      where: { AP_name: flight.airportFrom },
    });
    let airportTo = await Airport.findOne({
      where: { AP_name: flight.airportTo },
      select: ['AP_id'],
    });
    let airline_id = await Airline.findOne({
      where: { AL_name: flight.airline_name },
    });
    // Add the airports to the flight record
    await airline_id.addFlight(newFlight);
    await newFlight.addAirport(airportFrom,{through: {airportTo: airportTo.AP_id}} );
}
let postNewFlight = async (req, res) => {
    try {
        let flight = req.body;
        await createNewFlight(flight);
        res.status(200).send("Flight has been created successfully");
    } catch (e) {
        console.log(e);
        res.status(400).send("Bad Request...");
    }
};
let postNewFlights = async (req, res) => {
  try {
    let FlightsData = req.body; // Assuming the request body contains an array of flights
    // Create and save the new flights
    FlightsData.forEach(async flight => await createNewFlight(flight));
    // Send success response
    res.status(200).send('Flights have been created successfully');
  } catch (e) {
    console.log(e);
    res.status(400).send('Bad Request...');
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
  postNewFlight,
  postNewFlights,
};
