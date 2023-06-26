const validator = require("../util/EmployeeValidator");


module.exports = async (req, res, nxt) => {
    req.body.phone = +req.body.phone
    let valid = validator(req.body)
    if (valid) {
        req.vlaid = 1
        nxt()
    }else {
        res.status(403).send("Forbidden command... \n please review validation settings.")
    }
}