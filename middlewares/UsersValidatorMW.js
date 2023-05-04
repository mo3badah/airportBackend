const validator = require("../util/UserValidator")
const {re} = require("@babel/core/lib/vendor/import-meta-resolve");

module.exports = (req,res,nxt)=>{
    // req.body.password = req.body.password[0]
    console.log(req.body)
    req.body.phone = +req.body.phone
    console.log(req.body.phone)
    let valid = validator(req.body)
    if (valid){
        req.vlaid = 1
        nxt()
    }else {
        res.status(403).send("Forbidden command... \n please review validation settings.")
    }
}
