const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/ordersModel")
const User = require("../models/userModel");
const Product = require('../models/productModel')
const createOrder = asyncHandler(async (req, res) => {
});

const allOrdersTotal = asyncHandler(async(req,res)=> {
    const usersOrders = await Order.aggregate(
        [
          {
            $group:
              {
                _id: null,
                total: { $sum: "$total" },
                saved: { $sum: "$saved" }   
            },
                
          }
        ]
     )
     if (usersOrders) {
        console.log('i here')
         console.log(usersOrders)
         res.status(200).json({usersOrders})
     }
});

const allOrders = asyncHandler(async(req,res)=> {
    const usersOrders = await Order.find({})
    if (usersOrders) {
        res.status(200).json(usersOrders)
    }
    else {
        res.status(400)
        throw new Error("No orders found.")
    }
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
const getSpendings = asyncHandler(async(req,res)=> {
    const {userId} = req.body;
    const userSpending = await User.findById(userId)
    if (userSpending) {
        res.status(200).json({
            total: userSpending.total,
            total_saved: userSpending.total_saved})
    }
})

module.exports = {createOrder,allOrders, getOrders, getSpendings, allOrdersTotal}