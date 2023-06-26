const Ajv = require("ajv").default;
const ajv = new Ajv();
const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        Fname: { type: "string", pattern: "^[A-Za-z][a-z]*$" },
        Mname: { type: "string", pattern: "^[A-Za-z][a-z]*$" },
        Lname: { type: "string", pattern: "^[A-Za-z][a-z]*$" },
        email: { type: "string", pattern: ".+@.+..+" },
        password: { type: "string" },
        country: { type: "string" },
        state: { anyOf: [{ type: "string" }, { type: "null" }] },
        street: { type: "string" },
        gender: { type: "string" },
        birth: { type: "string"
            // , isDate: true
        },
        phone: { type: "number", pattern: "^[0-9]{10}$" },
        passport: { type: "string" },
    },
    required: ["id"],
};
const validator = ajv.compile(schema);
module.exports = validator;
