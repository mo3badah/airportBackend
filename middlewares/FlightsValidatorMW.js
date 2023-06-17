const validator = require("../util/FlightValidator")

let postNewFlights = async (req, res, nxt) => {
    try {
        let flightsData = req.body;
        // loop of the flights data with every flight to pass to validator and get the not compatible flights
        let notCompatibleFlights = [];
        for (let i = 0; i < flightsData.length; i++) {
            let flight = flightsData[i];
            let valid = validator(flight);
            if (!valid) {
                notCompatibleFlights.push(flight);
            }
        }
        // if there aren't compatible flights return 400
        if (notCompatibleFlights.length > 0) {
            return res.status(400).send(notCompatibleFlights);
        }
        nxt()
    } catch (e) {
        console.log(e);
        res.status(400).send('not compatible flights data...');
    }
};

module.exports = postNewFlights;