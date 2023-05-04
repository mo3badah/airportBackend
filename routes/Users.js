const express = require("express")
const router = express.Router()
const validator = require("../middlewares/UsersValidatorMW")
const {postNewClient, getAllClients, addNewClientFromAdmin, updateToAdminClient, updateToClient, deleteClient} = require("../controllers/UsersControllerDB");

// Registration route handler
// 1. we get the route to make a new user
// 2. we check validation of the data which sent to us from the form and try to make it ready
router.post("/",validator,postNewClient)
router.get("/",getAllClients)
router.post("/addNewClientFromAdmin",validator,addNewClientFromAdmin)
router.post("/updateToAdminClient",updateToAdminClient)
router.post("/updateToClient",updateToClient)
router.delete("/deleteClient/:email",deleteClient)

module.exports = router
