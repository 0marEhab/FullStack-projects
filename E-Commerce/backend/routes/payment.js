const express = require("express");

const paymentController = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-order", paymentController.createOrder);
// router.post("/webhook/paymob", paymentController.handlePaymobWebhook);  afterDeploy
module.exports = router;
