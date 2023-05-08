const Ajv = require("ajv").default;
const ajv = new Ajv();
// making schema
const schema = {
    type: 'object',
    properties: {
        AP_name: { type: 'string', maxLength: 40 },
        AP_city: { type: 'string', maxLength: 20 },
        AP_state: { type: 'string', maxLength: 20 },
        AP_country: { type: 'string', maxLength: 20 },
        AP_phone: { type: 'string', maxLength: 20 },
    },
    required: ['AP_name'],
    additionalProperties: false,
};
const validator = ajv.compile(schema)
module.exports = validator