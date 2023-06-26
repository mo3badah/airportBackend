const express = require("express")
const router = express.Router()
const {postNewEmployee, getAllEmployees, adminLogin} = require("../controllers/EmployeeControllerDB")
const validator = require("../middlewares/EmployeeValidatorMW")
const auth = require("../middlewares/EmployeeLoginValidatorMW")


router.post("/",validator,postNewEmployee)
router.get("/",getAllEmployees)
router.post("/login",auth, adminLogin)

module.exports = router