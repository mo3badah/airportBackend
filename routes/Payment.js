const express = require('express');
const router = express.Router();
const payment = require('../controllers/PaymentControllerDB');
const vailatorMW = require('../middlewares/PaymentValidatorMW');

// Payment route handler
router.post("/", vailatorMW, payment.PostNewPayment);

module.exports = router;