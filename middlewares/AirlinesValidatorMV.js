const validator = require("../util/AirlineValidator")

let postNewAirlines = async (req, res, nxt) => {
    try {
        let airlinesData = req.body;
        // loop of the airlines data with every airline to pass to validator and get the not compatible airlines
        let notCompatibleAirlines = [];
        for (let i = 0; i < airlinesData.length; i++) {
            let airline = airlinesData[i];
            let valid = validator(airline);
            if (!valid) {
                notCompatibleAirlines.push(airline);
            }
        }
        // if there is not compatible airlines return 400
        if (notCompatibleAirlines.length > 0) {
            return res.status(400).send(notCompatibleAirlines);
        }
        nxt()
    } catch (e) {
        console.log(e);
        res.status(400).send('Bad Request...');
    }
};

module.exports = postNewAirlines;