const express = require("express");
const {createOrder, getOrders} = require("../controllers/orderController.js")

const router = express.Router();

router.post("/getOrderById", createOrder)
router.post("/getOrders", getOrders)
module.exports = router
