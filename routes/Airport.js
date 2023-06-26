const express = require("express")
const router = express.Router()
const airport = require("../controllers/AirDetailsDB")
const validatorMW = require("../middlewares/AirportValidatorMV")
const validatorsMW = require("../middlewares/AirportsValidatorMW")
// login authentication
router.post("/",validatorMW, airport.postNewAirport)
router.post("/bulk",validatorsMW, airport.postNewAirports)
router.get("/", airport.getAllAirports)

module.exports = router
