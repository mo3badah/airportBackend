const validator = require("../util/UpdateClientValidator")
const {re} = require("@babel/core/lib/vendor/import-meta-resolve");
const {awrap} = require("../dist");
const moment = require('moment');


module.exports = async (req, res, nxt) => {
    // req.body.password = req.body.password[0]
    // parse date from string to date object
    req.body.phone = +req.body.phone
    let valid = validator(req.body)
    if (valid) {
        req.vlaid = 1
        nxt()
    } else {
        res.status(403).send("Forbidden command... \n please Enter Valid Id.")
    }
}
