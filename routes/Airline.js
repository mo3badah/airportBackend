const express = require("express")
const router = express.Router()
const airline = require("../controllers/AirDetailsDB")
const validatorMW = require("../middlewares/AirlineValidatorMV")
const validatorsMW = require("../middlewares/AirlinesValidatorMV");
// login authentication
router.post("/",validatorMW, airline.postNewAirline)
router.post("/bulk",validatorsMW, airline.postNewAirlines)

module.exports = router