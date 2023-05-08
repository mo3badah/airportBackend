const Ajv = require("ajv").default;
const ajv = new Ajv();
// making schema
const schema = {
    type: 'object',
    properties: {
        AL_name: { type: 'string', maxLength: 40 },
        AL_three_letter_code: { type: 'number', maxLength: 3 },
        AL_phone: { type: 'string', maxLength: 20 },
    },
    required: ['AL_name', 'AL_three_letter_code'],
    additionalProperties: false,
};
const validator = ajv.compile(schema);
module.exports = validator;
