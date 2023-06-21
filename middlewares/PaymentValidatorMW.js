const validator = require("../util/PaymentValidator")

module.exports = (req,res,nxt)=>{
    let valid = validator(req.body)
    if (valid){
        nxt()
    }else {
        res.status(403).send("Please enter valid payment data")
    }
}