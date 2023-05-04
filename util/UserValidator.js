const Ajv = require("ajv").default
const ajv = new Ajv()
// making schema
const schema = {
    "type": "object",
    "properties":{
        "Fname":{"type":"string", "pattern":"^[A-Za-z][a-z]*$"},
        "Lname":{"type":"string", "pattern":"^[A-Za-z][a-z]*$"},
        "email":{"type":"string", "pattern":".+@.+\..+"},
        "password":{"type":"string"},
        "country": {"type": "string"},
        "phone": {"type": "number", "pattern":"^[0-9]{10}$"}
    },
    "required":["Fname","Lname","email","password"]
}
const validator = ajv.compile(schema)
module.exports = validator
