const Ajv = require("ajv").default;
const ajv = new Ajv();
const schema = {
    type: "object",
    properties: {
        SSN: { type: "string" },
        password: { type: "string" },
    },
    required: ["SSN", "password"],
}

const validator = ajv.compile(schema);
module.exports = validator;