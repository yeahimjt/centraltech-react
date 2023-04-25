const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/ordersModel")

const createOrder = asyncHandler(async (req, res) => {
});

const getOrders = asyncHandler(async(req,res)=> {
    const {userId} = req.body;
    const usersOrders = await Order.find({userId: userId})
    console.log(usersOrders)
    if (usersOrders) {
        res.status(200).json(usersOrders)
    }
    else {
        res.status(400)
        throw new Error("No orders found.")
    }
});

module.exports = {createOrder, getOrders}