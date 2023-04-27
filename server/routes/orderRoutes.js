const express = require("express");
const {createOrder, getOrders, getSpendings, allOrders} = require("../controllers/orderController.js")

const router = express.Router();

router.post("/getOrderById", createOrder)
router.post("/getOrders", getOrders)
router.post('/getSpendings', getSpendings)
router.get('/allOrders', allOrders)
module.exports = router
