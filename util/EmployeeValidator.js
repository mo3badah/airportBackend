const Ajv = require("ajv").default;
const ajv = new Ajv();
const schema = {
    type: "object",
    properties: {
        Fname: { type: "string", pattern: "^[A-Za-z][a-z]*$" },
        Mname: { type: "string", pattern: "^[A-Za-z][a-z]*$" },
        Lname: { type: "string", pattern: "^[A-Za-z][a-z]*$" },
        email: { type: "string", pattern: ".+@.+..+" },
        password: { type: "string" },
        gender: { type: "string" },
        birth: { type: "string" },
        phone: { type: "number", pattern: "^[0-9]{10}$" },
        salary: { type: "number" },
        job_title: { type: "string" },
        address: { type: "string" },
        sup_ssn: { type: "string" },
        airport_name: { type: "string" },
    },
    required: ["Fname", "Lname", "email", "password"],
}

const validator = ajv.compile(schema);
module.exports = validator;