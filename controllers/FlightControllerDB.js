// import user model of db
const Flight = require("../models/flight");
const Airport= require("../models/airport");
const FlightAirport = require("../models/FlightAirports");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const Airline = require("../models/airline");
const Stops = require("../models/stops");
const Types = require("../models/type");
const ClassDetails = require("../models/class_details");
const Seats = require("../models/seats");
const {all} = require("express/lib/application");
// let flight_number = require("../util/flightNameGen");

async function createNewFlight(flight) {
    // create flight number from module ==> util/flightNameGen.js
  let prefix = Math.floor(Math.random() * 100) + 1; // Generate a random prefix between 1 and 100
  let suffix = Math.random().toString(36).substring(3, 6).toUpperCase(); // Generate a random alphanumeric suffix
  let flight_number = `${prefix}${suffix}`;
  // create flight stops
  let stops = flight.stops;
  let noOfStops = stops.length;
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
  // get the type of the flight
  let type = await Types.findOne({
    where: { flight_type: flight.type },
  });
  if (!type) {
    type = {no_of_first_class_seats: 12, no_of_economical_seats: 24, no_of_business_seats: 144}
  }else {
    type.addFlight(newFlight);
  }
  if (noOfStops > 0) {
    stops.forEach( async (stop)=> {
      let airport = await Airport.findOne({
        where: { AP_name: stop.airport_name },
      });
      let newStop = await Stops.create({
        date: stop.date,
        time: stop.time,
        airport_id: airport.AP_id,
        duration: stop.duration,
      });
        newFlight.addStops(newStop);
    });
  }
  // create seats
  let no_of_economical_seats = type.no_of_economical_seats;
  let no_of_business_seats = type.no_of_business_seats;
  let no_of_first_class_seats = type.no_of_first_class_seats;
  let businessSeats = generateBusinessSeats(no_of_business_seats);
  let economiSeats = generateEconomiSeats(no_of_economical_seats);
  let firstClassSeats = generateFirstClassSeats(no_of_first_class_seats);
  // create classes
  if (class_details.length > 0) {
    class_details.forEach(async (class_detail) =>{
      let newClasses = await ClassDetails.create({
        class: class_detail.class,
        price: class_detail.price,
        weight_limit: class_detail.weight_limit,
        extra_luggage_price: class_detail.extra_luggage_price,
      });
      newFlight.addClass_details(newClasses);
      switch (class_detail.class) {
        case "business":
          businessSeats.forEach(async (seat) => {
            let newSeat = await Seats.create({
              seat_no: seat
            });
            newClasses.addSeats(newSeat);
          });
          break;
        case "economy":
          economiSeats.forEach(async (seat) => {
            let newSeat = await Seats.create({
              seat_no: seat
            });
            newClasses.addSeats(newSeat);
          });
          break;
        default:
          firstClassSeats.forEach(async (seat) => {
            let newSeat = await Seats.create({
              seat_no: seat
            });
            newClasses.addSeats(newSeat);
          });
          break;
      }
    });
  }
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
let updateFlight = async (req, res) => {

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
let getAllFlights = async (req, res) => {
  try {
    let flights = await Flight.findAll({ exclude: ["createdAt", "updatedAt"], include: [{model: Airline},{model: Airport}] });
    if (!flights) return res.status(404).send("Flights data are not found...");
    flights = flights.map( async (flight) => {
      let airportTo = await Airport.findOne({
        attributes: ["AP_city"],
        where: { AP_id: flight["airports"][0]["flightAirports"]["airportTo"] },
      });
        return {
            flight_number: flight.flight_number,
            take_off_time: flight.take_off_time,
            take_off_date: flight.take_off_date,
            status: flight.status,
            duration: flight.duration,
            no_of_stops: flight.no_of_stops,
            airline_name: flight.airline.AL_name,
            airportFrom: flight.airports[0].AP_city,
            airportTo: airportTo.AP_city,
        };
    }
    );
    let flightsData = await Promise.all(flights);
    res.send(flightsData);
  } catch (e) {
    for (let err in e.errors) {
      console.log(e.errors[err].message);
    }
    res.status(404).send("Flights data are not found...");
  }
}
let getFlightFromTo = async (req, res) => {
    try {
        let flights = await FlightAirport.findAll({
          // include: [{model: Airport}]
        });
        if (!flights) return res.status(404).send("Flights data are not found...");
        res.send(flights);
    } catch (e) {
        for (let err in e.errors) {
        console.log(e.errors[err].message);
        }
        res.status(404).send("Flights data are not found...");
    }
}

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

//generate First Class Seats
function generateFirstClassSeats(numSeats) {
  const seatLetters = ['A', 'B', 'C']; // Letters representing seat rows
  const seatsPerRow = Math.ceil(numSeats / seatLetters.length); // Number of seats per row

  let seats = [];
  let currentIndex = 1;

  for (let i = 0; i < numSeats; i++) {
    const letterIndex = i % seatLetters.length;
    const row = currentIndex + seatLetters[letterIndex] ;

    if (seats.includes(row)) {
      currentIndex++; // If the seat is already assigned, increment the index to the next row
      i--; // Decrement i to repeat the current iteration with the updated index
      continue;
    }

    seats.push(row);

    // Increment the index for every seatsPerRow iterations
    if ((i + 1) % seatsPerRow === 0) {
      currentIndex++;
    }
  }

  return seats;
}
// generate business seats
function generateBusinessSeats(numSeats) {
  const seatLetters = ['A', 'B', 'C', 'D']; // Letters representing seat rows
  const seatsPerRow = Math.ceil(numSeats / seatLetters.length); // Number of seats per row

  let seats = [];
  let currentIndex = 1;

  for (let i = 0; i < numSeats; i++) {
    const letterIndex = i % seatLetters.length;
    const row = currentIndex + seatLetters[letterIndex] ;

    if (seats.includes(row)) {
      currentIndex++; // If the seat is already assigned, increment the index to the next row
      i--; // Decrement i to repeat the current iteration with the updated index
      continue;
    }

    seats.push(row);

    // Increment the index for every seatsPerRow iterations
    if ((i + 1) % seatsPerRow === 0) {
      currentIndex++;
    }
  }

  return seats;
}

function generateEconomiSeats(numSeats) {
  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F']; // Letters representing seat rows
  const seatsPerRow = Math.ceil(numSeats / seatLetters.length); // Number of seats per row

  let seats = [];
  let currentIndex = 1;

  for (let i = 0; i < numSeats; i++) {
    const letterIndex = i % seatLetters.length;
    const row =currentIndex + seatLetters[letterIndex] ;

    if (seats.includes(row)) {
      currentIndex++; // If the seat is already assigned, increment the index to the next row
      i--; // Decrement i to repeat the current iteration with the updated index
      continue;
    }

    seats.push(row);

    // Increment the index for every seatsPerRow iterations
    if ((i + 1) % seatsPerRow === 0) {
      currentIndex++;
    }
  }

  return seats;
}

module.exports = {
  postNewFlight,
  postNewFlights,
  getAllFlights,
  getFlightFromTo
};
