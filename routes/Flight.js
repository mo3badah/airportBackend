const express = require("express")
const router = express.Router()
const flight = require("../controllers/FlightControllerDB")
const validatorMW = require("../middlewares/FlightValidatorMV")
const validatorsMW = require("../middlewares/FlightsValidatorMW")
// login authentication
router.post("/",validatorMW, flight.postNewFlight)
router.post("/bulk",validatorsMW, flight.postNewFlights)

module.exports = router

