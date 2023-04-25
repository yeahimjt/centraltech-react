const express = require("express");
const {createOrder} = require("../controllers/orderController.js")

const router = express.Router();

router.post("/getOrderById", createOrder)
module.exports = router
