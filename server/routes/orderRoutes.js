const express = require("express");
const {createOrder, getOrders, getSpendings, allOrders, allOrdersTotal} = require("../controllers/orderController.js")

const router = express.Router();

router.post("/getOrderById", createOrder)
router.post("/getOrders", getOrders)
router.post('/getSpendings', getSpendings)
router.get('/allOrders', allOrders)
router.get('/allOrdersTotal', allOrdersTotal)
module.exports = router
