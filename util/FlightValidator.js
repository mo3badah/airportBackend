const Ajv = require("ajv").default;
const ajv = new Ajv();
// making schema
const schema = {
    "type": "object",
    "properties": {
        "take_off_time": {
            "type": "string",
        },
        "take_off_date": {
            "type": "string",
        },
        "status": {
            "type": "string",
            "minLength": 1,
            "maxLength": 20
        },
        "duration": {
            "type": "string",
        },
        "airportFrom": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
        },
        "airportTo": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
        },
        "airline_name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 40
        },
        "stops": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "date": {
                        "type": "string",
                    },
                    "time": {
                        "type": "string",
                    },
                    "airport_name": {
                        "type": "string",
                    },
                    "duration": {
                        "type": "string",
                    }
                }
            }
        },
        "type":{
            "type": "string",
            "minLength": 1,
            "maxLength": 10
    },
        "class_details": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "class": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 20
                    },
                    "price": {
                        "type": "number",
                    },
                    "weight_limit": {
                        "type": "number"
                    },
                    "extra_luggage_price": {
                        "type": "number"
                    }
                }
            }
        }
    },
    "required": ["take_off_time", "take_off_date", "status", "duration", "airportFrom", "airportTo"]
};
const validator = ajv.compile(schema)
module.exports = validator