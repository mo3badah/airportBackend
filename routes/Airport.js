const express = require("express")
const router = express.Router()
const airport = require("../controllers/AirDetailsDB")
const validatorMW = require("../middlewares/AirportValidatorMV")
const validatosrMW = require("../middlewares/AirportsValidatorMW")
// login authentication
router.post("/",validatorMW, airport.postNewAirport)
router.post("/bulk",validatosrMW, airport.postNewAirports)

module.exports = router
