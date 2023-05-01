const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/ordersModel")
var ObjectId = require('mongodb').ObjectId;

const getUsers = asyncHandler(async(req,res)=>{
  const users = await User.find({})
  if (users){
    res.status(200).json({users})
  }else{
    res.status(400)
    throw new Error("Could not get users")
  }
})

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username  || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data us not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ username });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Update user
//@route POST /api/users/update
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const {userId, username, email, password} = req.body;
  const user = await User.findById(userId);

  // If user exists
  if (user) {
    user._id = userId
    user.username = username || user.username
    user.email =  email || user.email
    if (req.body.password) {
      user.password =
        await bcrypt.hash(password,10)
        || user.password
    }
    const updatedUser = await user.save();
    const accessToken = jwt.sign(
      {
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          id: updatedUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).json({ accessToken });
  }
  else {
    res.status(404)
    throw new Error("user not found!")
  }

});

//@desc Delete user
//@route DELETE /api/users/delete
//@access public

const deleteUser = asyncHandler(async (req, res) => {
  const {userId} = req.body
  console.log(userId)
  const objId = new ObjectId(userId)
  console.log(objId)
  const user = await User.findByIdAndDelete({_id: objId})
  if (user) {
    console.log(user)
    res.status(200)
    res.set("Connection", "close");
    res.json({message: "User successfully deleted!"});
  }
  else {
    res.status(404)
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  console.log("here")
    res.json(req.user);
});

const getProfile = asyncHandler (async(req,res)=> {
  const {userId} = req.body;
  const profileInfo = await User.find({_id:userId}, 'saved cart orders past_orders')
  if (profileInfo) {
      const products = await Product.find({_id: profileInfo[0].saved})
      res.status(200).json(profileInfo[0].saved)
  }
})


const purchaseCart = asyncHandler(async(req,res)=> {
  const {userId, cart} = req.body;
  var original = cart.reduce((total, items)=>total+(Number(items.price)),0)
  var shipping = 8
  var tax = cart.reduce((total,item)=>total+(Number(item.sale) ? Number(item.sale) : Number(item.price)),0)*0.10
  var sales = Math.round(cart?.reduce((total,item)=>total+(Number(item.sale) ? Number(item.price)-Number(item.sale) : 0),0))
  var actual = cart.reduce((total,item)=>total+(Number(item.sale) ? Number(item.sale) : Number(item.price)),0)+tax+shipping
  var saved = Math.round(cart?.reduce((total,item)=>total+(Number(item.sale) ? Number(item.price)-Number(item.sale) : 0),0))
  console.log('Cart',cart)
  const products = await Product.find({_id: cart})
  let names=[] 
  let category=[]
  products.map((item,index) => {names[index]=item.name; category[index]=item.category})
  console.log('Names',names)
  const createOrder = await Order.create({
    fulfilled: false,
    items_id: cart,
    items_name: names,
    items_category: category,
    userId: userId,
    total: Number(actual),
    saved: Number(sales),
  })

  if (createOrder) {
    const updatedUser = await User.findByIdAndUpdate(userId, {$push: {orders: createOrder._id}})

    if (updatedUser) {
      const updateUser = await User.findByIdAndUpdate(userId, {cart: []},)
      const updateUserTotal = await User.findByIdAndUpdate(userId, {$inc: {total: actual, total_saved: sales}})
      res.status(200).json(updateUserTotal.orders)
    } 
    else {
      res.status(400)
      throw new Error("Updating user failed.")
    }
  }
  else {
    res.status(400)
    throw new Error("Creating new order failed.")
  }
})

const removeCartItem = asyncHandler(async(req,res)=> {
  const {userId, id} = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, {$pull: {cart: id}})
  if (updatedUser) {
    res.status(200).json(updatedUser)
  }
  else {
    res.status(400)
    throw new Error("Removing item from cart failed.")
  }
})

module.exports = {registerUser, loginUser, updateUser, currentUser ,deleteUser, getProfile, purchaseCart, removeCartItem, getUsers}
