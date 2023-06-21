const Payment = require('../models/payment');

let PostNewPayment = async (req, res) => {
    try {
        // check if the payment is already exist
        let payment = await Payment.findOne({ where: { card_number: req.body.card_number } });
        if (payment){
            return res.status(400).send(`Payment with this card number: ${req.body.card_number} is already exist`);
        }
        let newPayment = await Payment.create({
            card_number: req.body.card_number,
            card_holder_name: req.body.card_holder_name,
            card_expiry_date: req.body.card_expiry_date,
            card_cvv: req.body.card_cvv
        }
        );
        res.status(200).send(`Ok payment with card number: ${req.body.card_number} is added`);
    } catch (e) {
        for (let err in e.errors) {
            console.log(e.errors[err].message);
        }
        res.status(403).send("Bad Request... Please retry again");
    }
}


module.exports = { PostNewPayment }