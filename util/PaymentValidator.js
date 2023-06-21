const Ajv = require('ajv');
const ajv = new Ajv();
// making schema
const schema = {
    "type": "object",
    "properties": {
        "card_number": {
            "type": "string",
            "minLength": 16,
            "maxLength": 16
        },
        "card_holder_name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "card_expiry_date": {
            "type": "string",
            "minLength": 1,
            "maxLength": 10
        },
        "card_cvv": {
            "type": "number",
            "minLength": 3,
            "maxLength": 3
        }
    },
    "required": ["card_number", "card_holder_name", "card_expiry_date", "card_cvv"],
}
const validator = ajv.compile(schema);
module.exports = validator;