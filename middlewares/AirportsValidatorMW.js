const validator = require("../util/AirportValidator")

let postNewAirports = async (req, res, nxt) => {
    try {
        let airportsData = req.body;
        // loop of the airports data with every airport to pass to validator and get the not compatible airports
        let notCompatibleAirports = [];
        for (let i = 0; i < airportsData.length; i++) {
            let airport = airportsData[i];
            let valid = validator(airport);
            if (!valid) {
                notCompatibleAirports.push(airport);
            }
        }
        // if there is not compatible airports return 400
        if (notCompatibleAirports.length > 0) {
            return res.status(400).send(notCompatibleAirports);
        }
        nxt()
    } catch (e) {
        console.log(e);
        res.status(400).send('Bad Request...');
    }
};

module.exports = postNewAirports;